# FREE RUS VPN Windows packaging correction

Targets the existing branded Qt client source, not an unmodified upstream checkout. The source previously compiled `FreeRusVPN.exe` but packaged AmneziaVPN shortcuts and registered a service name that did not match `SERVICE_NAME`.

## Changes

- Product, installer, shortcuts and file description: FREE RUS VPN, version 5.0.3.3.
- Executables: `FreeRusVPN.exe`, `FreeRusVPN-service.exe`; properly quoted service path.
- Separate Windows tunnel service `AmneziaWGTunnel$FreeRusVPN`.
- Installer does not uninstall or kill the user's separate Amnezia installation.
- No bundled default VPN profile; users import their personal `.conf` from the bot.
- FREE RUS launcher, About and installer icons; upstream licenses retained.

## Rebuild

1. Back up the existing branded source and apply `source.patch` with `git apply` from its root.
2. With Pillow installed, run `python brand-icons.py SOURCE_PATH BACKUP_PATH` to generate icons from `logo.png`.
3. Open an x64 MSVC Developer Command Prompt. Add Qt Installer Framework 4.7 `bin` to PATH.
4. Run `cmake -S SOURCE_PATH -B SOURCE_PATH/deploy/build -DAMNEZIAVPN_VERSION=5.0.3.3` with the existing Qt 6.10.1/Conan configuration.
5. Run `cmake --build SOURCE_PATH/deploy/build --parallel 6`, then `cpack -G IFW` from that build directory.
6. Set `FREERUS_PACKAGE_DIR` to the generated `_CPack_Packages/win64/IFW/FREE-RUS-VPN-Setup` directory and run `node --test installer.test.cjs`.

The distributable must contain the signed Microsoft Visual C++ redistributable. The FREE RUS installer itself is not Authenticode-signed: no publisher signing certificate was configured. No certificate or private VPN profile belongs in this repository.

Validation checks generated package metadata and real installer operations, then reads the compiled EXE's version resource. A clean-machine installation and real VPN connection remain manual device checks; this work does not install a VPN driver on the operator's computer.
