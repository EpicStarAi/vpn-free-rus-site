import { VpnAdPage, vpnAdMetadata } from "@/components/VpnAdPage";

export const metadata = vpnAdMetadata(
  "Кейсы",
  "Полные кейсы временно свёрнуты. Смотрите FREE RUS VPN — рабочий сервис с тестом на 30 дней.",
);

export default function Page() {
  return (
    <VpnAdPage
      eyebrow="Кейсы · переход"
      title="Кейсы"
      text="Полные кейсы временно свёрнуты. Смотрите FREE RUS VPN — рабочий сервис с тестом на 30 дней."
      points={[
    "Анонс",
    "Главный CTA — VPN"
      ]}
    />
  );
}
