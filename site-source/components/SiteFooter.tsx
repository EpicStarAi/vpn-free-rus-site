import Link from "next/link";
import { siteConfig } from "@/data/site";
import { Logo } from "./Logo";
import { SubscribeForm } from "./SubscribeForm";

const productLinks = [
  ["VPN FREE RUS", "/epic-vpn"],
  ["Тест 3 дня", "https://t.me/FREE_RUS_VPN_BOT?start=trial"],
  ["Тарифы", "/epic-vpn#plans"],
] as const;

const companyLinks = [
  ["О проекте", "/about"],
  ["Наташа Фри", "/natasha"],
  ["AI-агенты", "/ai-agents"],
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
            Главный продукт — VPN FREE RUS. Остальные разделы ведут к подключению
            или кратко рассказывают о экосистеме.
          </p>
          <strong>Москва. Работаем онлайн.</strong>
          <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>
        </div>
        <div className="footer-links">
          <strong>VPN</strong>
          {productLinks.map(([label, href]) =>
            href.startsWith("http") ? (
              <a key={href} href={href}>{label}</a>
            ) : (
              <Link key={href} href={href}>{label}</Link>
            ),
          )}
        </div>
        <div className="footer-links">
          <strong>Разделы</strong>
          {companyLinks.map(([label, href]) => (
            <Link key={href} href={href}>{label}</Link>
          ))}
          <strong className="footer-legal-title">Документы</strong>
          {legalLinks.map(([label, href]) => (
            <Link key={href} href={href}>{label}</Link>
          ))}
        </div>
        <div className="footer-subscribe">
          <strong>Статус VPN FREE RUS</strong>
          <p>Инструкции по подключению и новости сервиса.</p>
          <SubscribeForm />
        </div>
      </div>
      <div className="section-shell footer-bottom">
        <span>© 2026 VPN FREE RUS · ИНТЕРНЕТ БЕЗ ОГРАНИЧЕНИЙ RUS</span>
        <p>
          Основной продукт сайта — VPN. Прочие страницы носят информационный и
          рекламный характер.
        </p>
      </div>
    </footer>
  );
}
