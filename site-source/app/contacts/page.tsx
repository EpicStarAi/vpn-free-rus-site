import type { Metadata } from "next";
import { BusinessLeadForm } from "@/components/BusinessLeadForm";
import { corporateConfig } from "@/data/corporate";
import { siteConfig } from "@/data/site";

export const metadata: Metadata = {
  title: "Контакты",
  description:
    "Digital-команда в Москве. Работаем удалённо с клиентами по всей России. Оставьте заявку на первичный аудит.",
};

export default async function ContactsPage({
  searchParams,
}: {
  searchParams: Promise<{ service?: string }>;
}) {
  const { service = "" } = await searchParams;
  return (
    <main id="main" className="corp-page contacts-page">
      <section className="corp-simple-hero">
        <div className="section-shell">
          <span className="eyebrow eyebrow-light">Контакты</span>
          <h1>Москва. Работаем по всей России.</h1>
          <p>
            Опишите задачу — продажи, маркетинг, социальные сети, CRM,
            автоматизация или пилот EPIC☠️VPN AI.
          </p>
        </div>
      </section>
      <section className="section-shell contacts-layout">
        <div className="contacts-card">
          <span>Центр управления</span>
          <h2>{corporateConfig.city}</h2>
          <p>{corporateConfig.geography}</p>
          <a href={`mailto:${corporateConfig.email}`}>{corporateConfig.email}</a>
          <a href={corporateConfig.telegram}>Написать в Telegram ↗</a>
          <div>
            {Object.entries(siteConfig.social).map(([name, href]) => (
              <a key={name} href={href}>{name}</a>
            ))}
          </div>
          <small>
            Встречи и формат взаимодействия согласуются после первичного
            контакта. Физический адрес на сайте не публикуется.
          </small>
        </div>
        <BusinessLeadForm initialService={service} compact />
      </section>
    </main>
  );
}
