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
