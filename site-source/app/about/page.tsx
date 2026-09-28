import { VpnAdPage, vpnAdMetadata } from "@/components/VpnAdPage";

export const metadata = vpnAdMetadata(
  "О проекте",
  "FREE RUS VPN — приложения для Android и Windows. Скачайте установщик и получите доступ и инструкцию по подключению в Telegram.",
);

export default function Page() {
  return (
    <VpnAdPage
      eyebrow="О проекте"
      title="О FREE RUS VPN"
      text="FREE RUS VPN — приложения для Android и Windows. Скачайте установщик и получите доступ и инструкцию по подключению в Telegram."
      points={[
    "FREE RUS VPN",
    "Telegram-бот",
    "Персональное подключение"
      ]}
    />
  );
}
