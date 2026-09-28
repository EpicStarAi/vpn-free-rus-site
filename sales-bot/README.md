# FREE RUS Telegram Stars sales bot

This service makes Telegram Stars invoices and delivers an AmneziaWG config only after Telegram sends `successful_payment`.

## Prices

- test: 3 days, free
- first month: 99 Stars
- following month: 199 Stars
- year: 1,199 Stars

## Install

```bash
sudo useradd --system --home /nonexistent --shell /usr/sbin/nologin free-rus-bot
sudo install -d -o free-rus-bot -g free-rus-bot -m 700 /opt/free-rus-sales-bot /etc/free-rus-sales-bot /var/lib/free-rus-sales-bot
sudo install -o free-rus-bot -g free-rus-bot -m 700 sales-bot/app.py /opt/free-rus-sales-bot/app.py
sudo install -m 644 sales-bot/free-rus-sales-bot.service /etc/systemd/system/free-rus-sales-bot.service
sudo install -o free-rus-bot -g free-rus-bot -m 600 sales-bot/bot.env.example /etc/free-rus-sales-bot/bot.env
sudo nano /etc/free-rus-sales-bot/bot.env
sudo systemctl daemon-reload
sudo systemctl enable --now free-rus-sales-bot
sudo systemctl status free-rus-sales-bot --no-pager
```

Copy `FREE_RUS_PROVISIONER_TOKEN` locally from the provisioner env file. Never put either token in source control or chat.

## Site deep links

- trial: `https://t.me/FREE_RUS_VPN_BOT?start=trial`
- first month: `https://t.me/FREE_RUS_VPN_BOT?start=buy_month`
- year: `https://t.me/FREE_RUS_VPN_BOT?start=buy_year`

Telegram requires digital services sold in bots to use Stars (`XTR`). The bot validates `successful_payment` before calling the VPN provisioner.

## Delivery recovery and diagnostics

- `/trial` starts a free trial; `/access`, `/retry`, and `/start access` resend the existing unexpired configuration for the same Telegram user.
- The bot answers private chats only. Callback acknowledgement failure does not discard the requested action.
- After provisioning, a private outbox stores the configuration with mode 0600 inside `$FREE_RUS_BOT_DATA/pending` (directory 0700). The file is removed after Telegram confirms delivery; subsequent sends use Telegram's file_id. The SQLite database contains identifiers and delivery state, not configuration text.
- A failed Telegram upload can be retried without issuing another VPN peer. Restrict service data/backups to the bot account and root. Do not commit, export, or log the outbox.
- Payment owner, currency, amount and charge are checked. A repeated successful_payment does not create a second peer. Provisioning failure after payment preserves the paid order for support; do not charge again.
- Polling offsets persist across restarts. Logs contain error classes and update IDs, not exception bodies, tokens or configurations.
- Legacy trial records created before the delivery outbox do not contain a recoverable file. The bot sends a support response rather than silently claiming to resend it.

Tests without network or real credentials:

```bash
python3 -m unittest discover -s sales-bot/tests -v
```

## Incident fixed on 2026-09-28

The live provisioner was holding its own SQLite write lock after a failed insertion. All four existing records were revoked, but the old schema required every historical address to remain unique. Reusing a revoked address triggered an error and the failing transaction was never closed.

The fix migrates the address constraint to a partial unique index for active clients and closes/rolls back database connections on every path. Six provisioner regressions and twelve bot tests pass. On the server, two diagnostic access-create/revoke cycles passed; they reused the same revoked address and left the existing peer set unchanged. Both diagnostic peers were revoked. The bot's `/trial` and `/access` commands were confirmed through Telegram getMyCommands.

The old code and SQLite snapshots were backed up in a root-only directory on the VPN host before restart. Do not restore an old database after new customer accesses have been issued: that would discard their state. Backward-compatible code rollback should preserve the current data.

Mini App handoff is fixed separately on the repository's main branch (client/): Telegram 7+ requires explicit WebApp.close after openTelegramLink. It is independent of the VPS service update.
