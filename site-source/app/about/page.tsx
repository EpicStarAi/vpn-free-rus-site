import { VpnAdPage, vpnAdMetadata } from "@/components/VpnAdPage";

export const metadata = vpnAdMetadata(
  "О проекте",
  "FreeRUS — витрина вокруг VPN FREE RUS. Другие направления работают как переходы и анонсы.",
);

export default function Page() {
  return (
    <VpnAdPage
      eyebrow="О проекте"
      title="FreeRUS · VPN в центре"
      text="FreeRUS — витрина вокруг VPN FREE RUS. Другие направления работают как переходы и анонсы."
      points={[
    "VPN FREE RUS",
    "Telegram-бот",
    "AmneziaWG"
      ]}
    />
  );
}
