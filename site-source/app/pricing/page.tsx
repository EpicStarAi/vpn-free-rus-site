import { VpnAdPage, vpnAdMetadata } from "@/components/VpnAdPage";

export const metadata = vpnAdMetadata(
  "Тарифы",
  "Актуальные цены VPN — на странице VPN FREE RUS и в Telegram-боте. Остальные услуги уточняются отдельно.",
);

export default function Page() {
  return (
    <VpnAdPage
      eyebrow="Тарифы · VPN"
      title="Тарифы проекта"
      text="Актуальные цены VPN — на странице VPN FREE RUS и в Telegram-боте. Остальные услуги уточняются отдельно."
      points={[
    "VPN: 0 ₽ / 3 дня",
    "149 ₽ первый месяц",
    "1 490 ₽ год"
      ]}
    />
  );
}
