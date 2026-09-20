import Link from "next/link";
import type { Metadata } from "next";

const TRIAL_URL = "https://t.me/FREE_RUS_VPN_BOT?start=trial";

export type VpnAdPageProps = {
  eyebrow: string;
  title: string;
  text: string;
  points?: string[];
};

export function vpnAdMetadata(title: string, description: string): Metadata {
  return {
    title,
    description: `${description} Основной продукт FreeRUS — VPN FREE RUS.`,
  };
}

export function VpnAdPage({ eyebrow, title, text, points = [] }: VpnAdPageProps) {
  return (
    <main id="main" className="freerus-hub">
      <section className="freerus-hub-hero">
        <div className="section-shell freerus-hub-hero-grid">
          <div className="freerus-hub-copy">
            <span className="corp-powered">Powered by EPIC☠VPN AI</span>
            <span className="eyebrow eyebrow-light">{eyebrow}</span>
            <h1>
              <span>{title}</span>
            </h1>
            <p>{text}</p>
            {points.length > 0 && (
              <ul className="corp-check-list" style={{ marginTop: "1rem" }}>
                {points.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
            )}
            <div className="freerus-hub-actions">
              <a className="button button-primary" href={TRIAL_URL}>
                Тест VPN 3 дня
              </a>
              <Link className="button button-ghost" href="/epic-vpn">
                Тарифы VPN FREE RUS
              </Link>
            </div>
          </div>
          <aside className="freerus-hub-status" aria-label="VPN FREE RUS">
            <span>Главный продукт</span>
            <strong>VPN FREE RUS</strong>
            <p>
              AmneziaWG-конфиг, оформление в Telegram, 3 дня бесплатно. Эта
              страница — короткий переход к VPN.
            </p>
            <div>
              <small>Тест</small>
              <small>Месяц</small>
              <small>Год</small>
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}
