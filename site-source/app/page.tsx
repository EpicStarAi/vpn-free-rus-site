import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "FreeRUS — медиа, AI-агенты и цифровые продукты",
  description:
    "Главная витрина FreeRUS: редакционный проект Наташа Фри RUS, AI-агенты для бизнеса, цифровизация, соцмедиа и партнёрский VPN.",
};

const ecosystemCards = [
  {
    href: "/natasha",
    eyebrow: "Медиа / редакция",
    title: "Наташа Фри RUS",
    text:
      "Независимый редакционный кабинет: новости, первоисточники, авторские разборы и спокойная аналитика без лишнего шума.",
    cta: "Открыть медиа",
    points: ["Новости и источники", "Авторская колонка", "Закрытые разборы"],
  },
  {
    href: "/ai-agents",
    eyebrow: "Платформа / AI-агенты",
    title: "AI-агенты для бизнеса",
    text:
      "Виртуальные сотрудники, approval-center, CRM, контент, соцмедиа и управляемая автоматизация с подтверждением владельца.",
    cta: "Открыть платформу",
    points: ["AI-аудит проекта", "Контент и CRM", "Ручное подтверждение"],
  },
] as const;

const supportCards = [
  ["Digital-контур", "Продажи, маркетинг, соцсети и автоматизация процессов."],
  ["VPN-партнёр", "Отдельный VPN-проект как спонсорский и инфраструктурный слой."],
  ["Простые действия", "Ссылка на сайт или соцсеть → кабинет → проверка → AI-разбор."],
] as const;

export default function HomePage() {
  return (
    <main id="main" className="freerus-hub">
      <section className="freerus-hub-hero">
        <div className="section-shell freerus-hub-hero-grid">
          <div className="freerus-hub-copy">
            <span className="corp-powered">Powered by EPIC☠VPN AI</span>
            <span className="eyebrow eyebrow-light">FreeRUS ecosystem</span>
            <h1>
              <span>Медиа</span>
              <span>AI-агенты</span>
              <span>цифровой кабинет</span>
            </h1>
            <p>
              FreeRUS теперь работает как единая витрина: с одной стороны —
              редакционный голос Наташи Фри, с другой — агентская платформа для
              бизнеса, соцмедиа, аналитики и автоматизации.
            </p>
            <div className="freerus-hub-actions">
              <Link className="button button-primary" href="/natasha">
                Наташа Фри RUS
              </Link>
              <Link className="button button-ghost" href="/ai-agents">
                AI-агенты
              </Link>
            </div>
          </div>

          <aside className="freerus-hub-status" aria-label="Структура проекта">
            <span>01 / вход</span>
            <strong>Клиент выбирает сценарий</strong>
            <p>
              Читать медиа, заказать AI-разбор, подключить соцмедиа-контур или
              перейти к партнёрскому VPN.
            </p>
            <div>
              <small>Главная</small>
              <small>Медиа</small>
              <small>Платформа</small>
              <small>VPN</small>
            </div>
          </aside>
        </div>
      </section>

      <section className="section-shell freerus-ecosystem-section" aria-labelledby="ecosystem-title">
        <div className="corp-section-title">
          <span className="eyebrow">Два основных входа</span>
          <h2 id="ecosystem-title">Выберите, с чего начать</h2>
          <p>
            Главная не подменяет продукты. Она разводит посетителя по понятным
            сценариям: редакция Наташи или рабочая AI-платформа.
          </p>
        </div>

        <div className="freerus-ecosystem-grid">
          {ecosystemCards.map((card) => (
            <Link className="freerus-ecosystem-card" href={card.href} key={card.href}>
              <span>{card.eyebrow}</span>
              <h3>{card.title}</h3>
              <p>{card.text}</p>
              <ul>
                {card.points.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
              <strong>{card.cta} →</strong>
            </Link>
          ))}
        </div>
      </section>

      <section className="section-shell freerus-support-section" aria-label="Дополнительные направления">
        {supportCards.map(([title, text]) => (
          <article key={title}>
            <span>{title}</span>
            <p>{text}</p>
          </article>
        ))}
      </section>
    </main>
  );
}
