# FREE RUS MVP deployment checklist

## What is included

- Telegram Stars checkout in `@FREE_RUS_VPN_BOT`;
- automatic VPN configuration issuance after a successful payment;
- one free three-day trial per Telegram account;
- a **My access** section and one-month renewal flow;
- private provisioning API bound to localhost;
- automatic hourly removal of expired VPN peers.

## Server update

Run on the VPN server after pulling the `codex/pilot-sales-offer` branch:

```bash
cd /root/free-rus-vpn-deploy
git pull origin codex/pilot-sales-offer
sudo install -o root -g free-rus-bot -m 750 sales-bot/app.py /opt/free-rus-sales-bot/app.py
sudo install -m 644 systemd/free-rus-provisioner-expire.service /etc/systemd/system/free-rus-provisioner-expire.service
sudo install -m 644 systemd/free-rus-provisioner-expire.timer /etc/systemd/system/free-rus-provisioner-expire.timer
sudo systemctl daemon-reload
sudo systemctl enable --now free-rus-provisioner-expire.timer
sudo systemctl restart free-rus-sales-bot
sudo systemctl status free-rus-sales-bot free-rus-provisioner-expire.timer --no-pager
```

## Acceptance check

1. Send `/start` to the sales bot and open **My access**.
2. Use a new Telegram account for the free-trial test.
3. Complete one real Stars purchase before marketing the paid tariff publicly.
4. Confirm that the bot sends the configuration file and **My access** displays the expiry date.
5. Check the expiry task manually:

```bash
sudo systemctl start free-rus-provisioner-expire.service
sudo systemctl status free-rus-provisioner-expire.service --no-pager
```

The bot cannot recover a lost VPN configuration from storage by design: private client keys are not retained. The support route handles replacement after verification.
