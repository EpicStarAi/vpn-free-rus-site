import Link from "next/link";
import { corporateConfig, corporateServices } from "@/data/corporate";
import { siteConfig } from "@/data/site";
import { Logo } from "./Logo";
import { SubscribeForm } from "./SubscribeForm";

const companyLinks = [
  ["О компании", "/about"],
  ["Кейсы", "/cases"],
  ["Тарифы", "/pricing"],
  ["Блог и медиа", "/blog"],
  ["Контакты", "/contacts"],
] as const;

const legalLinks = [
  ["Политика конфиденциальности", "/privacy"],
  ["Пользовательское соглашение", "/terms"],
  ["Правила возврата", "/refunds"],
  ["Редакционная политика", "/editorial-policy"],
  ["Дисклеймер", "/disclaimer"],
] as const;

export function SiteFooter() {
  return (
    <footer className="site-footer corp-footer">
      <div className="section-shell footer-top">
        <div className="footer-brand">
          <Logo />
          <p>
            Продажи, маркетинг, социальные сети и AI в одном управляемом
            цифровом контуре.
          </p>
          <strong>{corporateConfig.city}. {corporateConfig.geography}</strong>
          <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>
        </div>
        <div className="footer-links">
          <strong>Услуги</strong>
          {corporateServices.map((service) => (
            <Link key={service.slug} href={`/${service.slug}`}>{service.shortTitle}</Link>
          ))}
          <Link href="/ai-agents">AI-агенты</Link>
          <Link href="/epic-vpn">EPIC☠️VPN AI</Link>
        </div>
        <div className="footer-links">
          <strong>Компания</strong>
          {companyLinks.map(([label, href]) => <Link key={href} href={href}>{label}</Link>)}
          <strong className="footer-legal-title">Документы</strong>
          {legalLinks.map(([label, href]) => <Link key={href} href={href}>{label}</Link>)}
        </div>
        <div className="footer-subscribe">
          <strong>Digital без шума</strong>
          <p>Новые разборы, инструкции и статус пилота EPIC☠️VPN AI.</p>
          <SubscribeForm />
          <div className="footer-social-list">
            {Object.entries(siteConfig.social).map(([name, href]) => (
              <a key={name} href={href}>{name}</a>
            ))}
          </div>
        </div>
      </div>
      <div className="section-shell footer-bottom">
        <span>© 2026 ИНТЕРНЕТ БЕЗ ОГРАНИЧЕНИЙ RUS</span>
        <p>
          Материалы сайта имеют информационный характер. Условия услуг,
          доступность платформ и стоимость определяются после аудита.
        </p>
      </div>
    </footer>
  );
}
