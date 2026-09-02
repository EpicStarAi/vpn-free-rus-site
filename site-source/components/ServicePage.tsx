import Link from "next/link";
import type { CorporateService } from "@/data/corporate";
import { corporateConfig } from "@/data/corporate";
import { JsonLd } from "./JsonLd";

export function ServicePage({ service }: { service: CorporateService }) {
  return (
    <main id="main" className={`corp-page service-page service-${service.accent}`}>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Service",
          name: service.title,
          description: service.seoDescription,
          provider: {
            "@type": "Organization",
            name: corporateConfig.brand,
            areaServed: ["Москва", "Россия"],
          },
          areaServed: ["Москва", "Россия"],
          serviceType: service.shortTitle,
        }}
      />

      <section className="corp-service-hero">
        <div className="section-shell">
          <Link className="corp-back-link" href="/#services">← Все направления</Link>
          <div className="corp-service-index">{service.icon}</div>
          <span className="eyebrow eyebrow-light">{service.eyebrow}</span>
          <h1>{service.title}</h1>
          <p>{service.description}</p>
          <div className="corp-hero-actions">
            <Link className="button button-primary" href={`/contacts?service=${service.slug}`}>
              {service.cta}
            </Link>
            <Link className="button button-ghost" href="/pricing">
              Посмотреть форматы работы
            </Link>
          </div>
        </div>
      </section>

      <section className="section-shell corp-service-functions">
        <div className="corp-section-title">
          <span className="eyebrow">Что берём на себя</span>
          <h2>Функции удалённого отдела</h2>
        </div>
        <div className="corp-function-grid">
          {service.functions.map((item, index) => (
            <article key={item}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <strong>{item}</strong>
            </article>
          ))}
        </div>
      </section>

      {service.slug === "social-media" && (
        <section className="section-shell platform-rules-note">
          <span>Рабочий принцип</span>
          <p>
            Работа с каждой платформой осуществляется с учётом её действующих
            правил, требований законодательства и ограничений доступа.
          </p>
        </section>
      )}

      <section className="corp-deliverables">
        <div className="section-shell corp-two-column">
          <div>
            <span className="eyebrow eyebrow-light">Результат этапа</span>
            <h2>Что получает клиент</h2>
            <p>
              Состав фиксируется после аудита. Вы видите ответственных, статусы,
              материалы, согласования и отчётность в едином рабочем контуре.
            </p>
          </div>
          <div className="corp-check-list">
            {service.deliverables.map((item) => (
              <span key={item}><i aria-hidden="true">✓</i>{item}</span>
            ))}
          </div>
        </div>
      </section>

      <section className="section-shell corp-stage-section">
        <div className="corp-section-title">
          <span className="eyebrow">Порядок работы</span>
          <h2>От диагностики до контроля</h2>
        </div>
        <div className="corp-stage-line">
          {service.stages.map((stage, index) => (
            <article key={stage}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <strong>{stage}</strong>
            </article>
          ))}
        </div>
      </section>

      <section className="section-shell corp-service-cta">
        <div>
          <span className="eyebrow eyebrow-light">Первый шаг</span>
          <h2>{service.cta}</h2>
          <p>
            Опишем текущую ситуацию, определим приоритетный участок и предложим
            реалистичный состав пилота без пустых обещаний.
          </p>
        </div>
        <Link className="button button-primary" href={`/contacts?service=${service.slug}`}>
          Оставить заявку
        </Link>
      </section>
    </main>
  );
}
