import importlib.util
import ipaddress
import os
from pathlib import Path
import sqlite3
import tempfile
import unittest
from unittest.mock import patch

os.environ.setdefault("FREE_RUS_PROVISIONER_TOKEN", "test-only")
os.environ.setdefault("FREE_RUS_ENDPOINT", "test.invalid:1234")
spec = importlib.util.spec_from_file_location("provisioner_app", Path(__file__).parents[1] / "app.py")
app = importlib.util.module_from_spec(spec)
spec.loader.exec_module(app)

class ProvisionerTests(unittest.TestCase):
    def setUp(self):
        self.tmp = tempfile.TemporaryDirectory()
        self.addCleanup(self.tmp.cleanup)
        app.DATA_DIR = Path(self.tmp.name)
        app.DATABASE = app.DATA_DIR / "clients.sqlite3"
        app.CONFIG = app.DATA_DIR / "awg.conf"
        app.CONFIG.write_text("[Interface]\n")
        app.POOL = ipaddress.ip_network("10.8.0.0/24")

    def seed(self, con, id, address, revoked=None):
        con.execute("INSERT INTO clients VALUES(?,?,?,?,?,?,?,?)", (id, id, "123", address, "public-"+id, "2026-01-01", "2026-01-02", revoked))

    def test_migrates_old_schema_without_losing_history(self):
        with sqlite3.connect(app.DATABASE) as con:
            con.execute("CREATE TABLE clients(client_id TEXT PRIMARY KEY,label TEXT NOT NULL,telegram_id TEXT,address TEXT NOT NULL UNIQUE,public_key TEXT NOT NULL UNIQUE,created_at TEXT NOT NULL,expires_at TEXT NOT NULL,revoked_at TEXT)")
            self.seed(con, "old", "10.8.0.10", "2026-01-03")
        app.initialize_database()
        app.initialize_database()
        with sqlite3.connect(app.DATABASE) as con:
            self.seed(con, "new", "10.8.0.10")
            self.assertEqual(con.execute("SELECT COUNT(*) FROM clients").fetchone()[0], 2)
            with self.assertRaises(sqlite3.IntegrityError):
                self.seed(con, "collision", "10.8.0.10")

    def test_allocation_reserves_active_database_and_manual_peers(self):
        app.initialize_database()
        with sqlite3.connect(app.DATABASE) as con:
            self.seed(con, "expired", "10.8.0.10", "2026-01-03")
            self.seed(con, "active", "10.8.0.11")
        with patch.object(app, "command", return_value="manual 10.8.0.10/32"):
            self.assertEqual(str(app.next_address()), "10.8.0.12")
        with patch.object(app, "command", return_value=""):
            self.assertEqual(str(app.next_address()), "10.8.0.10")

    def test_failed_insert_does_not_leave_database_locked(self):
        app.initialize_database()
        with sqlite3.connect(app.DATABASE) as con:
            self.seed(con, "active", "10.8.0.10")
        with patch.object(app, "next_address", return_value=ipaddress.ip_address("10.8.0.11")), patch.object(app, "command", return_value="public-active"), patch.object(app, "client_config", return_value="fake-config"), patch.object(app, "append_peer") as append:
            with self.assertRaises(sqlite3.IntegrityError):
                app.provision({"label":"test", "ttl_days":3})
            append.assert_not_called()
        with sqlite3.connect(app.DATABASE, timeout=.1) as con:
            self.seed(con, "after-failure", "10.8.0.12")

    def test_peer_failure_rolls_back_and_releases_database(self):
        app.initialize_database()
        with patch.object(app, "next_address", return_value=ipaddress.ip_address("10.8.0.10")), patch.object(app, "command", return_value="fake-key"), patch.object(app, "client_config", return_value="fake-config"), patch.object(app, "append_peer", side_effect=RuntimeError("simulated failure")), patch.object(app, "remove_managed_block"):
            with self.assertRaises(RuntimeError):
                app.provision({"label":"test", "ttl_days":3})
        with sqlite3.connect(app.DATABASE, timeout=.1) as con:
            self.assertEqual(con.execute("SELECT COUNT(*) FROM clients").fetchone()[0], 0)
            self.seed(con, "after", "10.8.0.10")

    def test_removing_managed_peer_preserves_following_manual_peer(self):
        app.CONFIG.write_text("[Interface]\n# free-rus:owned\n[Peer]\nPublicKey = managed\n\n[Peer]\nPublicKey = manual\n")
        app.remove_managed_block("owned")
        self.assertEqual(app.CONFIG.read_text(), "[Interface]\n[Peer]\nPublicKey = manual\n")

    def test_unknown_and_already_revoked_client_release_connection(self):
        app.initialize_database()
        with sqlite3.connect(app.DATABASE) as con:
            self.seed(con, "revoked", "10.8.0.10", "2026-01-03")
        self.assertEqual(app.revoke("revoked")["status"], "already_revoked")
        with self.assertRaises(KeyError):
            app.revoke("missing")
        with sqlite3.connect(app.DATABASE, timeout=.1) as con:
            self.seed(con, "new", "10.8.0.10")

if __name__ == "__main__":
    unittest.main()
