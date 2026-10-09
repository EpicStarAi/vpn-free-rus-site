"use client";

import { FormEvent, useState } from "react";

const plans = {
  trial: { label: "Тест 3 дня", price: "0 ₽", start: "trial" },
  month: { label: "Первый месяц", price: "99 Stars", start: "buy_month" },
  year: { label: "Годовой доступ", price: "1 199 Stars", start: "buy_year" },
} as const;

export function VpnPilotForm() {
  const [plan, setPlan] = useState<keyof typeof plans>("trial");

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    window.location.assign(`https://t.me/FREE_RUS_VPN_BOT?start=${plans[plan].start}`);
  }

  return (
    <form className="vpn-pilot-form" onSubmit={submit}>
      <div><span>Корзина FREE RUS VPN</span><h2>Оформить доступ</h2></div>
      <label><span>Тариф</span><select value={plan} onChange={(event) => setPlan(event.target.value as keyof typeof plans)}>
        {Object.entries(plans).map(([key, item]) => <option key={key} value={key}>{item.label} — {item.price}</option>)}
      </select></label>
      <div className="vpn-cart-total"><span>Стоимость доступа</span><strong>{plans[plan].price}</strong></div>
      <label className="consent-check"><input type="checkbox" required /><span>Согласен с <a href="/privacy">политикой конфиденциальности</a></span></label>
      <button className="button button-primary" type="submit">Открыть бота</button>
      <small>Оплата проходит в Telegram Stars. До оплаты бот покажет итоговую сумму в Stars и условия доступа.</small>
    </form>
  );
}
