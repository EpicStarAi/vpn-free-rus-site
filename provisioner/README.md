# FREE RUS VPN provisioner

Private service for issuing and revoking **AmneziaWG** client configurations on the existing VPN host.

## Security model

- Runs only on the VPN host and binds to `127.0.0.1:8786`; it is not publicly exposed.
- API requires a bearer token.
- Client private keys are returned exactly once in the API response and are **never written to SQLite**.
- Client records store only identifier, Telegram identifier, public key, assigned address, expiry and revoke state.
- The service serializes changes with a lock and creates no destructive changes to existing manual peers.
- Existing peer addresses `10.8.0.2` and `10.8.0.3` remain untouched; newly managed addresses begin at `.10`.

## Deploy on the VPN server

Run as root. Replace the hostname before starting. Do not paste the token into chat.

```bash
sudo install -d -m 700 /opt/free-rus-vpn/provisioner /etc/free-rus-vpn /var/lib/free-rus-vpn
sudo cp provisioner/app.py /opt/free-rus-vpn/provisioner/app.py
sudo chmod 700 /opt/free-rus-vpn/provisioner/app.py
sudo cp provisioner/provisioner.env.example /etc/free-rus-vpn/provisioner.env
sudo chmod 600 /etc/free-rus-vpn/provisioner.env
sudo cp systemd/free-rus-provisioner.service /etc/systemd/system/free-rus-provisioner.service
sudo systemctl daemon-reload
sudo systemctl enable --now free-rus-provisioner
curl http://127.0.0.1:8786/health
```

Generate a token directly on the server:

```bash
openssl rand -hex 32
```

Put the result in `/etc/free-rus-vpn/provisioner.env` as `FREE_RUS_PROVISIONER_TOKEN`.

## Local test

```bash
TOKEN='token-from-server-env'
curl -sS -X POST http://127.0.0.1:8786/v1/clients \
  -H "Authorization: Bearer $TOKEN" -H "Content-Type: application/json" \
  -d '{"label":"pilot-telegram-123","telegram_id":"123","ttl_days":3}'
```

Save the returned `config` only to a private file and send it to the corresponding user over the protected Telegram flow. Do not log it in n8n execution history.

## n8n integration

The API deliberately binds only to localhost, so **do not expose it publicly**. Make n8n call it through a restricted local SSH credential on the VPN host:

1. Use an SSH account limited to a fixed wrapper command, not root's general password.
2. The wrapper sends `curl` to `127.0.0.1:8786` with the token held on the host, not in n8n.
3. Store the generated config as binary/temporary data and send it immediately as a Telegram document.
4. On payment success call `POST /v1/clients`.
5. Every hour call `POST /v1/maintenance/expire` to revoke expired trials.

Before putting sales live, also restrict public RDP and the Docker-published database/Redis ports found in the audit.
