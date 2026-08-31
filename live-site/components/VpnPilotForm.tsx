"use client";

import { FormEvent, useState } from "react";

const plans = {
  trial: { label: "Тест 3 дня", rubles: "0 ₽", start: "trial" },
  month: { label: "Первый месяц", rubles: "149 ₽", start: "buy_month" },
  year: { label: "Годовой доступ", rubles: "1 490 ₽", start: "buy_year" },
} as const;

export function VpnPilotForm() {
  const [plan, setPlan] = useState<keyof typeof plans>("trial");

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    window.location.assign(`https://t.me/FREE_RUS_VPN_BOT?start=${plans[plan].start}`);
  }

  return (
    <form className="vpn-pilot-form" onSubmit={submit}>
      <div><span>Корзина VPN FREE RUS</span><h2>Оформить доступ</h2></div>
      <label><span>Тариф</span><select value={plan} onChange={(event) => setPlan(event.target.value as keyof typeof plans)}>
        {Object.entries(plans).map(([key, item]) => <option key={key} value={key}>{item.label} — {item.rubles}</option>)}
      </select></label>
      <div className="vpn-cart-total"><span>К оплате на сайте</span><strong>{plans[plan].rubles}</strong></div>
      <label className="consent-check"><input type="checkbox" required /><span>Согласен с <a href="/privacy">политикой конфиденциальности</a></span></label>
      <button className="button button-primary" type="submit">Перейти к оплате</button>
      <small>Оплата проходит в Telegram Stars. До оплаты бот покажет итоговую сумму в Stars и условия доступа.</small>
    </form>
  );
}
