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
    description: `${description} FREE RUS VPN для Android и Windows.`,
  };
}

export function VpnAdPage({ eyebrow, title, text, points = [] }: VpnAdPageProps) {
  return (
    <main id="main" className="freerus-hub">
      <section className="freerus-hub-hero">
        <div className="section-shell freerus-hub-hero-grid">
          <div className="freerus-hub-copy">
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
                Тарифы FREE RUS VPN
              </Link>
            </div>
          </div>
          <aside className="freerus-hub-status" aria-label="FREE RUS VPN">
            <span>Главный продукт</span>
            <strong>FREE RUS VPN</strong>
            <p>
              Персональный профиль FREE RUS VPN, оформление в Telegram, 3 дня бесплатно. Эта
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
