import type { Metadata } from "next";
import { VpnDownloads } from "@/components/VpnDownloads";

export const metadata: Metadata = {
  title: { absolute: "VPN FREE RUS — VPN для Android и Windows" },
  description: "Попробуйте VPN FREE RUS 3 дня бесплатно. Первый месяц — 149 ₽. Приложения для Android и Windows, оформление через Telegram.",
};

const bot = "https://t.me/FREE_RUS_VPN_BOT";
const plans = [
  { name: "Попробовать", price: "0 ₽", period: "на 3 дня", note: "Один тест на Telegram-аккаунт.", action: "Попробовать бесплатно", start: "trial" },
  { name: "На месяц", price: "149 ₽", period: "за первый месяц", note: "Далее — 249 ₽ в месяц.", action: "Подключить на месяц", start: "buy_month" },
  { name: "На год", price: "1 490 ₽", period: "за 12 месяцев", note: "Для длительного доступа к VPN.", action: "Подключить на год", start: "buy_year" },
] as const;

export default function HomePage() {
  return (
    <main id="main" className="vpn-sales">
      <section className="vpn-sales-hero section-shell">
        <div>
          <p className="vpn-sales-label">VPN FREE RUS · Android и Windows</p>
          <h1>VPN для телефона<br />и компьютера</h1>
          <p className="vpn-sales-lead">Скачайте приложение и подключитесь по инструкции в Telegram. Начните с бесплатного теста — выберите тариф, когда проверите сервис.</p>
          <div className="vpn-sales-actions">
            <a className="button button-primary" href={`${bot}?start=trial`}>Попробовать 3 дня бесплатно</a>
            <a className="button button-ghost" href="#plans">Выбрать тариф</a>
          </div>
          <p className="vpn-sales-caption">Первый месяц — 149 ₽. Далее — 249 ₽/месяц.</p>
        </div>
        <aside className="vpn-sales-start" aria-label="Бесплатный тест VPN">
          <span>Начните с теста</span>
          <strong>3 дня за 0 ₽</strong>
          <p>Проверьте подключение на своём устройстве перед оплатой.</p>
          <ul><li>Приложения для Android и Windows</li><li>Доступ и инструкция в Telegram</li><li>Без оплаты на сайте</li></ul>
          <a href="#connect">Как подключиться <span aria-hidden="true">↓</span></a>
        </aside>
      </section>

      <section className="vpn-sales-section section-shell" id="plans" aria-labelledby="plans-title">
        <div className="vpn-sales-heading"><h2 id="plans-title">Выберите свой тариф</h2><p>Кнопка откроет бота с выбранным вариантом.</p></div>
        <div className="vpn-sales-plans">
          {plans.map((plan) => <article className={plan.start === "buy_month" ? "vpn-sales-plan is-featured" : "vpn-sales-plan"} key={plan.start}>
            <h3>{plan.name}</h3><p className="vpn-sales-price">{plan.price}</p><span>{plan.period}</span><p className="vpn-sales-plan-note">{plan.note}</p>
            <a className={plan.start === "buy_month" ? "button button-primary" : "button button-ghost"} href={`${bot}?start=${plan.start}`}>{plan.action}</a>
          </article>)}
        </div>
        <p className="vpn-sales-payment-note">Оплата проходит в Telegram Stars. Итоговую сумму в Stars и условия доступа бот покажет до оплаты.</p>
      </section>

      <section className="vpn-sales-section section-shell" id="connect" aria-labelledby="connect-title">
        <div className="vpn-sales-heading"><h2 id="connect-title">Как подключиться</h2></div>
        <ol className="vpn-sales-steps">
          <li><span>1</span><h3>Получите доступ</h3><p>Выберите бесплатный тест или тариф. Бот поможет оформить подключение.</p></li>
          <li><span>2</span><h3>Установите приложение</h3><p>Скачайте версию для Android или Windows по ссылкам ниже.</p></li>
          <li><span>3</span><h3>Включите VPN</h3><p>Завершите настройку по инструкции, которую получите в Telegram.</p></li>
        </ol>
      </section>

      <VpnDownloads />

      <section className="vpn-sales-section section-shell" id="faq" aria-labelledby="faq-title">
        <div className="vpn-sales-heading"><h2 id="faq-title">Частые вопросы</h2></div>
        <div className="vpn-sales-faq">
          <details><summary>Можно сначала попробовать бесплатно?</summary><p>Да. Тестовый доступ на 3 дня доступен один раз на Telegram-аккаунт. Нажмите «Попробовать 3 дня бесплатно» и следуйте подсказкам бота.</p></details>
          <details><summary>Как оплатить VPN?</summary><p>Выберите тариф. Откроется Telegram-бот, который покажет сумму в Stars и условия доступа до оплаты. Платёжные данные на этом сайте вводить не нужно.</p></details>
          <details><summary>На каких устройствах работает приложение?</summary><p>На странице доступны установщики для Android и Windows. Скачайте подходящий файл и завершите настройку по инструкции в боте.</p></details>
          <details><summary>Скачал приложение. Что дальше?</summary><p>Само скачивание не оформляет доступ к VPN. Откройте бота, выберите тест или тариф и выполните инструкцию по подключению.</p></details>
          <details><summary>Куда написать, если не получается подключиться?</summary><p>Начните с инструкции в <a href={bot}>боте FREE RUS VPN</a>. Если вопрос остался, напишите на <a href="mailto:internetbezogranicheniy@gmail.com">internetbezogranicheniy@gmail.com</a>.</p></details>
        </div>
      </section>
      <section className="vpn-sales-final section-shell"><h2>Проверьте VPN бесплатно</h2><p>Три дня, чтобы попробовать на своём устройстве.</p><a className="button button-primary" href={`${bot}?start=trial`}>Получить тест на 3 дня</a></section>
    </main>
  );
}
