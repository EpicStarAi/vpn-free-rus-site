import type { CorporateService } from "@/data/corporate";
import { VpnAdPage } from "./VpnAdPage";

export function ServicePage({ service }: { service: CorporateService }) {
  return (
    <VpnAdPage
      eyebrow={`Раздел · ${service.shortTitle}`}
      title={service.shortTitle}
      text={`${service.description} Сейчас основной продукт FreeRUS — VPN FREE RUS: тест на 3 дня и тарифы в Telegram.`}
      points={service.functions.slice(0, 3)}
    />
  );
}
