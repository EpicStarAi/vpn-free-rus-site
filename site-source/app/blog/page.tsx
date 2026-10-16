import { VpnAdPage, vpnAdMetadata } from "@/components/VpnAdPage";

export const metadata = vpnAdMetadata(
  "Медиа",
  "Медиа-раздел оставлен как короткий переход. Для доступа в сеть используйте FREE RUS VPN.",
);

export default function Page() {
  return (
    <VpnAdPage
      eyebrow="Медиа · переход"
      title="Медиа FREE RUS VPN"
      text="Медиа-раздел оставлен как короткий переход. Для доступа в сеть используйте FREE RUS VPN."
      points={[
    "Короткий вход",
    "Дальше к VPN"
      ]}
    />
  );
}
