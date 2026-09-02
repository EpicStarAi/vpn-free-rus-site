import type { Metadata } from "next";
import Link from "next/link";
import { ConfigurationCalculator } from "@/components/ConfigurationCalculator";
import { projectPackages } from "@/data/corporate";

export const metadata: Metadata = {
  title: "Форматы работы и тарифы",
  description:
    "Пробное подтверждение карты за 1 ₽, AI-аудит проекта и пакеты digital-услуг после диагностики задач.",
};

export default function PricingPage() {
  return (
    <main id="main" className="corp-page">
      <section className="corp-simple-hero">
        <div className="section-shell">
          <span className="eyebrow eyebrow-light">Форматы сотрудничества</span>
          <h1>Сначала проверка за 1 ₽, потом тариф</h1>
          <p>
            Клиент подтверждает платёжные данные, получает первичный AI-разбор
            сайта, проекта или соцсети, а полноценный тариф выбирает только
            после понятной диагностики.
          </p>
        </div>
      </section>
      <section className="section-shell trial-section">
        <article className="trial-card">
          <span>Пробный вход</span>
          <h2>1 ₽ для подтверждения карты</h2>
          <p>
            Это не полноценная подписка и не обещание финансовых услуг.
            Списание нужно для проверки актуальности платёжных данных,
            сохранения отчёта и запуска первичного AI-аудита.
          </p>
          <Link className="button button-dark" href="/contacts?service=trial-audit">
            Запустить пробный аудит
          </Link>
        </article>
        <article className="trial-card trial-card-dark">
          <span>Что получает клиент</span>
          <h2>Ссылка → кабинет → отчёт</h2>
          <p>
            Вставляем сайт или соцсеть, определяем род деятельности,
            проверяем видимые каналы и показываем, какие действия стоит
            автоматизировать первыми.
          </p>
          <Link className="button button-light" href="/digitalization">
            Посмотреть цифровизацию
          </Link>
        </article>
      </section>
      <section className="section-shell package-section">
        <div className="package-grid">
          {projectPackages.map((pack) => (
            <article className={`package-card package-${pack.accent}`} key={pack.id}>
              <span>Формат</span>
              <h2>{pack.name}</h2>
              <p>{pack.audience}</p>
              <div>
                {pack.features.map((feature) => <strong key={feature}>✓ {feature}</strong>)}
              </div>
              <b>Стоимость после аудита</b>
              <Link className="button button-dark" href={`/contacts?service=${pack.id === "ai" ? "ai-agents" : "complex"}`}>
                Обсудить пакет
              </Link>
            </article>
          ))}
        </div>
      </section>
      <section className="configuration-section">
        <div className="section-shell">
          <div className="corp-section-title">
            <span className="eyebrow eyebrow-light">Конфигуратор</span>
            <h2>Предварительная комплектация проекта</h2>
            <p>Выберите модули — без автоматического обещания цены.</p>
          </div>
          <ConfigurationCalculator />
        </div>
      </section>
    </main>
  );
}
