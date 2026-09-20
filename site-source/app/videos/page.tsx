import { VpnAdPage, vpnAdMetadata } from "@/components/VpnAdPage";

export const metadata = vpnAdMetadata("Видео", "Видеораздел сокращён. Основной продукт — VPN FREE RUS.");

export default function Page() {
  return (
    <VpnAdPage
      eyebrow="Видео · переход"
      title="Видео"
      text="Видеораздел сокращён. Основной продукт — VPN FREE RUS."
      points={["Короткий переход", "CTA на VPN FREE RUS"]}
    />
  );
}
