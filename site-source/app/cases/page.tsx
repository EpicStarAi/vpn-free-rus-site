import { VpnAdPage, vpnAdMetadata } from "@/components/VpnAdPage";

export const metadata = vpnAdMetadata(
  "Кейсы",
  "Полные кейсы временно свёрнуты. Смотрите FREE RUS VPN — рабочий сервис с тестом на 3 дня.",
);

export default function Page() {
  return (
    <VpnAdPage
      eyebrow="Кейсы · переход"
      title="Кейсы"
      text="Полные кейсы временно свёрнуты. Смотрите FREE RUS VPN — рабочий сервис с тестом на 3 дня."
      points={[
    "Анонс",
    "Главный CTA — VPN"
      ]}
    />
  );
}
