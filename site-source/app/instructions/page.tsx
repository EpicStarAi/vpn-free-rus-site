import { VpnAdPage, vpnAdMetadata } from "@/components/VpnAdPage";

export const metadata = vpnAdMetadata("Инструкции", "Инструкции по VPN — на странице /epic-vpn и в Telegram-боте.");

export default function Page() {
  return (
    <VpnAdPage
      eyebrow="Инструкции · переход"
      title="Инструкции"
      text="Инструкции по VPN — на странице /epic-vpn и в Telegram-боте."
      points={["Короткий переход", "CTA на VPN FREE RUS"]}
    />
  );
}
