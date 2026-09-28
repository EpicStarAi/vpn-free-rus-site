import { VpnAdPage, vpnAdMetadata } from "@/components/VpnAdPage";

export const metadata = vpnAdMetadata("Новости", "Лента новостей сведена к короткому переходу. Для доступа в сеть — FREE RUS VPN.");

export default function Page() {
  return (
    <VpnAdPage
      eyebrow="Новости · переход"
      title="Новости"
      text="Лента новостей сведена к короткому переходу. Для доступа в сеть — FREE RUS VPN."
      points={["Короткий переход", "CTA на FREE RUS VPN"]}
    />
  );
}
