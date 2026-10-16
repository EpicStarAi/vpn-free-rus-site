import { VpnAdPage, vpnAdMetadata } from "@/components/VpnAdPage";

export const metadata = vpnAdMetadata(
  "AI-команда",
  "Раздел сведён к короткому анонсу. Основной продукт — FREE RUS VPN.",
);

export default function Page() {
  return (
    <VpnAdPage
      eyebrow="Платформа · переход"
      title="AI-команда"
      text="Раздел сведён к короткому анонсу. Основной продукт — FREE RUS VPN."
      points={[
    "Краткий анонс",
    "Переход к VPN"
      ]}
    />
  );
}
