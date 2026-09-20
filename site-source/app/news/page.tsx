import { VpnAdPage, vpnAdMetadata } from "@/components/VpnAdPage";

export const metadata = vpnAdMetadata("Новости", "Лента новостей сведена к короткому переходу. Для доступа в сеть — VPN FREE RUS.");

export default function Page() {
  return (
    <VpnAdPage
      eyebrow="Новости · переход"
      title="Новости"
      text="Лента новостей сведена к короткому переходу. Для доступа в сеть — VPN FREE RUS."
      points={["Короткий переход", "CTA на VPN FREE RUS"]}
    />
  );
}
