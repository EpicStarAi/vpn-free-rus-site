import { VpnAdPage, vpnAdMetadata } from "@/components/VpnAdPage";

export const metadata = vpnAdMetadata(
  "Наташа Фри RUS",
  "Редакционный раздел сохранён как короткий переход. Главный продукт FreeRUS — VPN FREE RUS.",
);

export default function Page() {
  return (
    <VpnAdPage
      eyebrow="Медиа · переход"
      title="Наташа Фри RUS"
      text="Редакционный раздел сохранён как короткий переход. Главный продукт FreeRUS — VPN FREE RUS."
      points={[
    "Новости и разборы",
    "Короткий вход в экосистему",
    "Дальше — к VPN"
      ]}
    />
  );
}
