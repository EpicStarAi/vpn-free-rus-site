import { VpnAdPage, vpnAdMetadata } from "@/components/VpnAdPage";

export const metadata = vpnAdMetadata(
  "Медиа",
  "Медиа-раздел оставлен как короткий переход. Для доступа в сеть используйте VPN FREE RUS.",
);

export default function Page() {
  return (
    <VpnAdPage
      eyebrow="Медиа · переход"
      title="Медиа FreeRUS"
      text="Медиа-раздел оставлен как короткий переход. Для доступа в сеть используйте VPN FREE RUS."
      points={[
    "Короткий вход",
    "Дальше к VPN"
      ]}
    />
  );
}
