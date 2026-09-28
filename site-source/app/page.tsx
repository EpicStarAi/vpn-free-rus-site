import type { Metadata } from "next";
import Link from "next/link";
import { VpnDownloads } from "@/components/VpnDownloads";

export const metadata: Metadata = {
  title: "FREE RUS VPN — приложения для Android и Windows",
  description:
    "Скачайте FREE RUS VPN для Android и Windows. Установщики, инструкции и оформление доступа через Telegram.",
};

const highlights = [
  ["01", "3 дня бесплатно", "Один тест на Telegram-аккаунт — без карты на сайте."],
  ["02", "AmneziaWG", "Персональный конфиг для телефона и ПК."],
  ["03", "Telegram Stars", "Оплата и выдача доступа прямо в боте."],
] as const;

const extras = [
  {
    href: "/natasha",
    title: "Наташа Фри RUS",
    text: "Редакционные материалы — как дополнительный вход к экосистеме.",
  },
  {
    href: "/ai-agents",
    title: "AI-агенты",
    text: "Короткий обзор платформы. Основной продукт — VPN.",
  },
  {
    href: "/sales",
    title: "Digital-услуги",
    text: "Продажи, маркетинг и соцсети — как рекламные переходы.",
  },
] as const;

const TRIAL = "https://t.me/FREE_RUS_VPN_BOT?start=trial";

export default function HomePage() {
  return (
    <main id="main" className="freerus-hub">
      <section className="freerus-hub-hero">
        <div className="section-shell freerus-hub-hero-grid">
          <div className="freerus-hub-copy">
            <span className="corp-powered">Powered by EPIC☠VPN AI</span>
            <span className="eyebrow eyebrow-light">VPN FREE RUS</span>
            <h1>
              <span>Интернет</span>
              <span>без ограничений</span>
              <span>на ваших устройствах</span>
            </h1>
            <p>
              FREE RUS VPN для Android и Windows. Скачайте приложение,
              затем получите доступ и инструкцию по подключению в Telegram.
            </p>
            <div className="freerus-hub-actions">
              <a className="button button-primary" href="#download">
                Скачать приложение
              </a>
              <a className="button button-ghost" href={TRIAL}>
                Получить тест 3 дня
              </a>
            </div>
          </div>

          <aside className="freerus-hub-status" aria-label="Статус VPN">
            <span>01 / старт</span>
            <strong>Сервис работает</strong>
            <p>
              Выберите тест или тариф → оплатите в боте Stars → получите
              AmneziaWG-конфиг.
            </p>
            <div>
              <small>0 ₽ · 3 дня</small>
              <small>149 ₽ · месяц</small>
              <small>1 490 ₽ · год</small>
            </div>
          </aside>
        </div>
      </section>

      <VpnDownloads />

      <section className="section-shell freerus-ecosystem-section" aria-labelledby="why-vpn">
        <div className="corp-section-title">
          <span className="eyebrow">Почему VPN FREE RUS</span>
          <h2 id="why-vpn">Коротко о подключении</h2>
          <p>Без лишней витрины: доступ, конфиг и поддержка в Telegram.</p>
        </div>
        <div className="freerus-ecosystem-grid">
          {highlights.map(([num, title, text]) => (
            <article className="freerus-ecosystem-card" key={title}>
              <span>{num}</span>
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
        <div className="freerus-hub-actions" style={{ marginTop: "1.5rem" }}>
          <Link className="button button-primary" href="/epic-vpn#checkout">
            Оформить доступ
          </Link>
        </div>
      </section>

      <section className="section-shell freerus-support-section" aria-label="Другие разделы">
        {extras.map((item) => (
          <article key={item.href}>
            <span>
              <Link href={item.href}>{item.title}</Link>
            </span>
            <p>{item.text}</p>
          </article>
        ))}
      </section>
    </main>
  );
}
