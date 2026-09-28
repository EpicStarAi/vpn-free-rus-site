#!/usr/bin/env python3
"""Private AmneziaWG provisioning API for FREE RUS.

Run only on the VPN host as root. It never stores client private keys:
a generated config is returned once to the caller over authenticated localhost HTTP.
"""
from contextlib import closing
import datetime as dt
import fcntl
import hmac
import ipaddress
import json
import os
import re
import secrets
import sqlite3
import subprocess
import tempfile
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path

INTERFACE = os.getenv("FREE_RUS_INTERFACE", "awg0")
CONFIG = Path(os.getenv("FREE_RUS_CONFIG", "/etc/amnezia/amneziawg/awg0.conf"))
DATA_DIR = Path(os.getenv("FREE_RUS_DATA_DIR", "/var/lib/free-rus-vpn"))
DATABASE = DATA_DIR / "clients.sqlite3"
LOCK = DATA_DIR / "provisioner.lock"
TOKEN = os.environ["FREE_RUS_PROVISIONER_TOKEN"]
ENDPOINT = os.environ["FREE_RUS_ENDPOINT"]  # e.g. vpn.example.com:39547
POOL = ipaddress.ip_network(os.getenv("FREE_RUS_POOL", "10.8.0.0/24"))
BIND = os.getenv("FREE_RUS_BIND", "127.0.0.1")
PORT = int(os.getenv("FREE_RUS_PORT", "8786"))
SAFE_LABEL = re.compile(r"^[a-zA-Z0-9_-]{1,64}$")

def command(*args, input_text=None):
    result = subprocess.run(args, input=input_text, text=True, capture_output=True, check=False)
    if result.returncode:
        raise RuntimeError(result.stderr.strip() or "command failed")
    return result.stdout.strip()

def db():
    return sqlite3.connect(DATABASE, timeout=15)


def initialize_database():
    DATA_DIR.mkdir(parents=True, exist_ok=True)
    definition = """CREATE TABLE IF NOT EXISTS clients (
      client_id TEXT PRIMARY KEY, label TEXT NOT NULL, telegram_id TEXT,
      address TEXT NOT NULL, public_key TEXT NOT NULL UNIQUE,
      created_at TEXT NOT NULL, expires_at TEXT NOT NULL, revoked_at TEXT
    )"""
    with closing(db()) as con, con:
        con.execute("BEGIN IMMEDIATE")
        con.execute(definition)
        # Historic addresses may be reused after revocation, but active ones must be unique.
        legacy = False
        for index in con.execute("PRAGMA index_list(clients)").fetchall():
            if index[2] and not index[4]:
                columns = [row[2] for row in con.execute('PRAGMA index_info("' + index[1].replace('"', '""') + '")')]
                legacy = legacy or columns == ["address"]
        if legacy:
            con.execute("ALTER TABLE clients RENAME TO clients_legacy")
            con.execute(definition)
            con.execute("INSERT INTO clients SELECT * FROM clients_legacy")
            con.execute("DROP TABLE clients_legacy")
        con.execute("CREATE UNIQUE INDEX IF NOT EXISTS clients_active_address ON clients(address) WHERE revoked_at IS NULL")


def awg_config_values():
    values = {}
    for raw in CONFIG.read_text().splitlines():
        line = raw.strip()
        if "=" not in line: continue
        key, value = [x.strip() for x in line.split("=", 1)]
        if key.lower() in {"jc","jmin","jmax","s1","s2","h1","h2","h3","h4"}:
            values[key] = value
    required = {"Jc","Jmin","Jmax","S1","S2","H1","H2","H3","H4"}
    if not required.issubset(values):
        # Config keys may have a different case; normalise them.
        norm = {k.lower(): v for k, v in values.items()}
        values = {k: norm[k.lower()] for k in required if k.lower() in norm}
    if not required.issubset(values):
        raise RuntimeError("AmneziaWG obfuscation parameters missing from server config")
    return values

def used_addresses():
    used = set()
    output = command("awg", "show", INTERFACE, "allowed-ips")
    for line in output.splitlines():
        fields = line.split(maxsplit=1)
        if len(fields) != 2:
            continue
        for token in fields[1].replace(",", " ").split():
            try:
                network = ipaddress.ip_network(token, strict=False)
                if network.version == POOL.version:
                    used.update(ip for ip in POOL.hosts() if ip in network)
            except ValueError:
                continue
    with closing(db()) as con:
        used.update(ipaddress.ip_address(row[0]) for row in con.execute("SELECT address FROM clients WHERE revoked_at IS NULL"))
    return used


def next_address():
    used = used_addresses()
    for ip in list(POOL.hosts())[9:]:
        if ip not in used:
            return ip
    raise RuntimeError("VPN address pool is exhausted")


def client_config(private_key, psk, address):
    values = awg_config_values()
    server_public = command("awg", "show", INTERFACE, "public-key")
    params = "\n".join(f"{k} = {values[k]}" for k in ("Jc","Jmin","Jmax","S1","S2","H1","H2","H3","H4"))
    return f"""[Interface]
PrivateKey = {private_key}
Address = {address}/32
DNS = 1.1.1.1, 1.0.0.1
{params}

[Peer]
PublicKey = {server_public}
PresharedKey = {psk}
AllowedIPs = 0.0.0.0/0, ::/0
Endpoint = {ENDPOINT}
PersistentKeepalive = 25
"""

def append_peer(client_id, public_key, psk, address):
    block = f"\n# free-rus:{client_id}\n[Peer]\nPublicKey = {public_key}\nPresharedKey = {psk}\nAllowedIPs = {address}/32\n"
    with CONFIG.open("a") as f:
        f.write(block)
        f.flush()
        os.fsync(f.fileno())
    command("awg", "set", INTERFACE, "peer", public_key, "preshared-key", "/dev/stdin", "allowed-ips", f"{address}/32", input_text=psk)

def remove_managed_block(client_id):
    marker = f"# free-rus:{client_id}"
    lines = CONFIG.read_text().splitlines(keepends=True)
    start = next((i for i, line in enumerate(lines) if line.strip() == marker), None)
    if start is None: return
    end = len(lines)
    own_peer_seen = False
    for i in range(start + 1, len(lines)):
        value = lines[i].strip()
        if value == "[Peer]":
            if own_peer_seen:
                end = i
                break
            own_peer_seen = True
        elif own_peer_seen and value.startswith("#"):
            end = i
            break
    fd, tmp = tempfile.mkstemp(dir=str(CONFIG.parent), prefix=".awg0.", text=True)
    with os.fdopen(fd, "w") as out:
        out.writelines(lines[:start] + lines[end:])
        out.flush(); os.fsync(out.fileno())
    os.replace(tmp, CONFIG)

def provision(body):
    label = str(body.get("label", "")).strip()
    if not SAFE_LABEL.fullmatch(label):
        raise ValueError("label must contain only letters, numbers, _ or -")
    ttl = int(body.get("ttl_days", 3))
    if not 1 <= ttl <= 365:
        raise ValueError("ttl_days must be 1..365")
    telegram_id = str(body.get("telegram_id", "")).strip() or None
    client_id = f"{label}-{secrets.token_hex(4)}"
    private = command("awg", "genkey")
    public = command("awg", "pubkey", input_text=private)
    psk = command("awg", "genpsk")
    address = next_address()
    created = dt.datetime.now(dt.timezone.utc)
    expires = created + dt.timedelta(days=ttl)
    config = client_config(private, psk, address)
    peer_attempted = False
    try:
        with closing(db()) as con, con:
            con.execute("INSERT INTO clients VALUES (?,?,?,?,?,?,?,NULL)", (client_id,label,telegram_id,str(address),public,created.isoformat(),expires.isoformat()))
            peer_attempted = True
            append_peer(client_id, public, psk, address)
    except Exception:
        # The transaction is rolled back and the connection closed before cleanup.
        if peer_attempted:
            try:
                command("awg", "set", INTERFACE, "peer", public, "remove")
            finally:
                remove_managed_block(client_id)
        raise
    return {"client_id":client_id,"address":str(address),"expires_at":expires.isoformat(),"config":config}

def revoke(client_id):
    with closing(db()) as con, con:
        row = con.execute("SELECT public_key, revoked_at FROM clients WHERE client_id=?", (client_id,)).fetchone()
        if not row:
            raise KeyError("client not found")
        if row[1]:
            return {"client_id":client_id,"status":"already_revoked"}
        command("awg", "set", INTERFACE, "peer", row[0], "remove")
        remove_managed_block(client_id)
        con.execute("UPDATE clients SET revoked_at=? WHERE client_id=?", (dt.datetime.now(dt.timezone.utc).isoformat(), client_id))
    return {"client_id":client_id,"status":"revoked"}


def expire():
    now = dt.datetime.now(dt.timezone.utc).isoformat()
    with closing(db()) as con:
        ids = [r[0] for r in con.execute("SELECT client_id FROM clients WHERE revoked_at IS NULL AND expires_at <= ?", (now,))]
    return {"revoked":[revoke(x)["client_id"] for x in ids]}

class Handler(BaseHTTPRequestHandler):
    def log_message(self, *_): pass
    def json(self, code, payload):
        data = json.dumps(payload, ensure_ascii=False).encode()
        self.send_response(code); self.send_header("Content-Type","application/json"); self.send_header("Content-Length",str(len(data))); self.end_headers(); self.wfile.write(data)
    def authorized(self):
        header = self.headers.get("Authorization", "")
        return hmac.compare_digest(header, "Bearer " + TOKEN)
    def do_GET(self):
        if self.path == "/health": return self.json(200, {"ok":True,"interface":INTERFACE})
        self.json(404, {"error":"not_found"})
    def do_POST(self):
        if not self.authorized(): return self.json(401, {"error":"unauthorized"})
        try:
            length = int(self.headers.get("Content-Length","0"))
            if length > 8192: raise ValueError("request too large")
            body = json.loads(self.rfile.read(length) or b"{}")
            with LOCK.open("a+") as lock:
                fcntl.flock(lock, fcntl.LOCK_EX)
                if self.path == "/v1/clients": result = provision(body)
                elif self.path == "/v1/maintenance/expire": result = expire()
                elif self.path.startswith("/v1/clients/") and self.path.endswith("/revoke"): result = revoke(self.path.split("/")[3])
                else: return self.json(404, {"error":"not_found"})
            self.json(200, result)
        except (ValueError, KeyError) as e: self.json(400, {"error":str(e)})
        except Exception as e: self.json(500, {"error":"provisioning_failed","detail":str(e)})

if __name__ == "__main__":
    DATA_DIR.mkdir(parents=True, exist_ok=True)
    with LOCK.open("a+") as lock:
        fcntl.flock(lock, fcntl.LOCK_EX)
        initialize_database()
    ThreadingHTTPServer((BIND, PORT), Handler).serve_forever()
