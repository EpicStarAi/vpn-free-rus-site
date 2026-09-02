import type { Metadata } from "next";
import { JsonLd } from "@/components/JsonLd";
import { VpnPilotForm } from "@/components/VpnPilotForm";
import { corporateConfig } from "@/data/corporate";

export const metadata: Metadata = {
  title: "VPN FREE RUS — защищённое подключение",
  description: "VPN FREE RUS: 3 дня бесплатно, понятные тарифы и оформление доступа через Telegram.",
};

const benefits = [
  ["01", "Защищённый канал", "Персональный AmneziaWG-конфиг для ваших устройств."],
  ["02", "Быстрый старт", "Тестовый доступ выдаётся в Telegram-боте."],
  ["03", "Понятная цена", "Тариф виден заранее — без ручной заявки и ожидания."],
  ["04", "Поддержка", "Поможем с подключением и вопросами по доступу."],
] as const;

const steps = [
  ["01", "Выберите тариф", "Соберите заказ на сайте: тест, месяц или год."],
  ["02", "Оплатите в Telegram", "Бот покажет защищённый счёт в Telegram Stars."],
  ["03", "Получите конфиг", "После успешной оплаты бот автоматически отправит доступ."],
] as const;

export default function EpicVpnPage() {
  return (
    <main id="main" className="free-vpn-page">
      <JsonLd data={{ "@context": "https://schema.org", "@type": "Service", name: "VPN FREE RUS", description: metadata.description, provider: { "@type": "Organization", name: corporateConfig.brand }, serviceType: "VPN-доступ для личных устройств", areaServed: "RU" }} />
      <section className="free-vpn-hero">
        <div className="free-vpn-shell free-vpn-hero-grid">
          <div className="free-vpn-hero-copy">
            <div className="free-vpn-status"><i /> VPN FREE RUS · сервис работает</div>
            <p className="free-vpn-kicker">VPN FREE RUS</p>
            <h1>Защищённое подключение. Уже доступно.</h1>
            <p className="free-vpn-lead">Начните с 3 дней бесплатно. Выберите тариф на сайте, а Telegram-бот оформит доступ и пришлёт персональный конфиг.</p>
            <div className="free-vpn-actions">
              <a className="free-vpn-primary" href="#checkout">Получить тест 3 дня</a>
              <a className="free-vpn-secondary" href="#plans">Посмотреть тарифы</a>
            </div>
            <div className="free-vpn-trust"><span>3 дня без оплаты</span><span>Несколько устройств</span><span>Поддержка в Telegram</span></div>
          </div>
          <div className="free-vpn-console" aria-label="Статус VPN FREE RUS">
            <div className="free-vpn-console-top"><span>VPN FREE RUS / SECURE LINK</span><b>ONLINE</b></div>
            <div className="free-vpn-orbit"><span>VPN</span></div>
            <dl><div><dt>Статус</dt><dd>Сервис работает</dd></div><div><dt>Тест</dt><dd>3 дня бесплатно</dd></div><div><dt>Подключение</dt><dd>Через Telegram-бота</dd></div></dl>
          </div>
        </div>
      </section>

      <section className="free-vpn-strip"><div className="free-vpn-shell free-vpn-benefits">
        {benefits.map(([number, title, text]) => <article key={title}><span>{number}</span><h2>{title}</h2><p>{text}</p></article>)}
      </div></section>

      <section className="free-vpn-dark-section"><div className="free-vpn-shell">
        <div className="free-vpn-heading free-vpn-heading-light"><p>Как получить доступ</p><h2>Три шага до VPN</h2></div>
        <div className="free-vpn-steps">{steps.map(([number, title, text]) => <article key={title}><span>{number}</span><div><h3>{title}</h3><p>{text}</p></div></article>)}</div>
      </div></section>

      <section className="free-vpn-section free-vpn-shell" id="plans">
        <div className="free-vpn-heading"><p>Тарифы</p><h2>Без мелкого шрифта</h2></div>
        <div className="free-vpn-plans">
          <article><span>ТЕСТ</span><h3>Пробный доступ</h3><p>Познакомьтесь с сервисом на своих устройствах.</p><strong>0 ₽ · 3 дня</strong></article>
          <article className="featured"><span>СТАРТ</span><h3>Первый месяц</h3><p>Специальная цена для первого периода подключения.</p><strong>149 ₽ · первый месяц</strong></article>
          <article><span>ВЫГОДНО</span><h3>Годовой</h3><p>Для тех, кто уже проверил сервис и хочет снизить стоимость месяца.</p><strong>1 490 ₽ · за год</strong></article>
        </div>
        <p className="free-vpn-price-note">После первого месяца — 249 ₽/месяц. Оплата проходит в Telegram Stars; точная сумма в Stars будет показана ботом до оплаты.</p>
      </section>

      <section className="free-vpn-access" id="checkout"><div className="free-vpn-shell free-vpn-access-grid">
        <div><p className="free-vpn-kicker">Оформление доступа</p><h2>Выберите тариф — бот завершит заказ</h2><p>Сайт формирует выбранный вариант, затем Telegram-бот покажет счёт в Stars и отправит конфиг после успешной оплаты.</p><aside>Тестовый доступ доступен один раз на Telegram-аккаунт. Реферальный бонус: +14 дней вам и другу после его первой оплаты.</aside></div>
        <VpnPilotForm />
      </div></section>
    </main>
  );
}
