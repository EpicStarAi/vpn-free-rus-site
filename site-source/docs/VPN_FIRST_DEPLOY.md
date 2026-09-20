# VPN-first freerus.site

## Что изменилось
- Главная — VPN FREE RUS (тест + тарифы).
- Навигация и футер сфокусированы на VPN.
- Страницы услуг/медиа/AI сокращены до коротких переходов с CTA на VPN.
- `/epic-vpn` без ломки checkout через `@FREE_RUS_VPN_BOT`.

## Сборка
```bash
cd site-source
npm ci
npm test   # или npm run build
```

## Публикация
1. Залить релиз в `/opt/freerus-site/releases/<sha>` на Contabo.
2. Обновить symlink `current`.
3. Задеплоить Cloudflare Worker (`vinext` / wrangler) тем же пайплайном, что и раньше.
4. Проверить: `curl -I https://freerus.site/` и `/epic-vpn`.
