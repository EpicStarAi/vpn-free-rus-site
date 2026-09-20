import { VpnAdPage, vpnAdMetadata } from "@/components/VpnAdPage";

export const metadata = vpnAdMetadata(
  "Контакты",
  "По VPN пишите в Telegram-бота FREE RUS VPN. Почта проекта — на сайте в подвале.",
);

export default function Page() {
  return (
    <VpnAdPage
      eyebrow="Контакты"
      title="Связь и поддержка"
      text="По VPN пишите в Telegram-бота FREE RUS VPN. Почта проекта — на сайте в подвале."
      points={[
    "Бот: @FREE_RUS_VPN_BOT",
    "Тест 3 дня",
    "Страница /epic-vpn"
      ]}
    />
  );
}
