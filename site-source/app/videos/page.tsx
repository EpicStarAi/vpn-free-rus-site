import { VpnAdPage, vpnAdMetadata } from "@/components/VpnAdPage";

export const metadata = vpnAdMetadata("Видео", "Видеораздел сокращён. Основной продукт — FREE RUS VPN.");

export default function Page() {
  return (
    <VpnAdPage
      eyebrow="Видео · переход"
      title="Видео"
      text="Видеораздел сокращён. Основной продукт — FREE RUS VPN."
      points={["Короткий переход", "CTA на FREE RUS VPN"]}
    />
  );
}
