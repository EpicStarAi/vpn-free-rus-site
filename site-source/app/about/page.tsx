import type { Metadata } from "next";
import Link from "next/link";
import { corporateConfig, operatingProcess } from "@/data/corporate";

export const metadata: Metadata = {
  title: "О компании",
  description:
    "Технологический и digital-центр в Москве: маркетинг, социальные сети, автоматизация продаж, AI-агенты и инфраструктурные сервисы.",
};

const principles = [
  ["Москва", "Центральное позиционирование и управление проектами"],
  ["Вся Россия", "Удалённая работа с клиентами и распределёнными командами"],
  ["Проектные команды", "Специалисты и AI-роли под конкретную задачу"],
  ["Прозрачная этапность", "План, статусы, согласования и регулярная отчётность"],
  ["Конфиденциальность", "Минимально необходимые доступы и правила обработки данных"],
  ["Ручной контроль", "Критические операции подтверждает ответственный сотрудник"],
];

export default function AboutPage() {
  return (
    <main id="main" className="corp-page">
      <section className="corp-simple-hero about-corp-hero">
        <div className="section-shell">
          <span className="eyebrow eyebrow-light">{corporateConfig.poweredBy}</span>
          <h1>Технологический центр для управляемого digital-бизнеса</h1>
          <p>
            ИНТЕРНЕТ БЕЗ ОГРАНИЧЕНИЙ RUS — технологический проект, объединяющий
            digital-маркетинг, удалённое ведение социальных сетей,
            автоматизацию продаж, AI-агентов и инфраструктурные сервисы для
            бизнеса.
          </p>
        </div>
      </section>
      <section className="section-shell about-corp-manifest">
        <blockquote>
          «Мы создаём управляемый цифровой контур, в котором контент, заявки,
          клиенты, сотрудники и аналитика связаны между собой».
        </blockquote>
        <div className="about-principle-grid">
          {principles.map(([title, text], index) => (
            <article key={title}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <h2>{title}</h2>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </section>
      <section className="corp-process-section">
        <div className="section-shell">
          <div className="corp-section-title">
            <span className="eyebrow eyebrow-light">Формат работы</span>
            <h2>Понятная этапность вместо чёрного ящика</h2>
          </div>
          <div className="corp-process-line">
            {operatingProcess.map(([number, title, description]) => (
              <article key={number}>
                <span>{number}</span>
                <strong>{title}</strong>
                <p>{description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="section-shell corp-service-cta">
        <div>
          <span className="eyebrow eyebrow-light">Связаться</span>
          <h2>Москва — центр управления. Работаем по всей России.</h2>
          <p>{corporateConfig.email}</p>
        </div>
        <Link className="button button-primary" href="/contacts">Получить консультацию</Link>
      </section>
    </main>
  );
}
