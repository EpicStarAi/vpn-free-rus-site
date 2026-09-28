# FREE RUS VPN: загрузки 5.0.3.3

Рабочее приложение freerus.site находится в ветке codex/vpn-first-site, каталог site-source. Mini App vpn.freerus.site/client публикуется отдельно из main через GitHub Pages.

Релиз v5.0.3.3 заменяет ссылки на прежние файлы apps-2026-09-28. Исходный Windows-установщик имел старые метаданные AmneziaVPN и неверные имена ярлыка/службы. В новой версии исправлены установщик, FileDescription, значки, имя службы и туннеля. Встроенный общий профиль исключён из Windows и Android: клиент получает персональный .conf из бота.

- `FREE-RUS-VPN.apk`: 89440750 bytes; SHA-256 `2ed250a6f2b02ad347d2affc2959a8480b81a729d7afcf6955035d169e27cf73`.
- `FREE-RUS-VPN-Setup.exe`: 108853087 bytes; SHA-256 `8951f640b4e129fdaf4e53cbe14ed5f888fc53ee167fcbca5726a2a72d64a59b`.

APK: site.freerus.client, 5.0.3.3 / 2175, Android 9+, ARM64. Существующая подпись Android Debug сохранена для обновлений; APK остаётся отладочной сборкой. EXE не имеет Authenticode-подписи издателя. Microsoft Visual C++ Redistributable в пакете имеет действительную подпись.

Проверки: сборка/линтер сайта; два актуализированных теста лендинга; четыре сценария Mini App; два теста реальных операций установщика; свойства скомпилированного EXE; apksigner verify и aapt APK. Полная установка и VPN handshake на устройствах не выполнялись.

Перед публикацией проверять анонимный полный GET обоих файлов и совпадение SHA-256. Ссылки находятся в data/downloads.ts и являются обычными ссылками, работающими без JS. Правки исходников клиента и воспроизведение упаковки сохранены в ../windows-installer (от корня репозитория: windows-installer).

Деплой VPS — по docs/DEPLOYMENT_CHAIN.md, с прежней конфигурацией .openai/hosting.json и резервной копией current. Production ID и секреты в git не добавлять.
