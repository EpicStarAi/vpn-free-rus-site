"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

const modules = [
  ["sales", "Продажи и CRM"],
  ["marketing", "Маркетинг"],
  ["social", "Социальные сети"],
  ["ai", "AI-агенты"],
  ["analytics", "Аналитика"],
] as const;

export function ConfigurationCalculator() {
  const [selected, setSelected] = useState<string[]>(["sales"]);
  const [channels, setChannels] = useState("1");
  const [integrations, setIntegrations] = useState("none");

  const profile = useMemo(() => {
    const score =
      selected.length +
      (channels === "4+" ? 2 : channels === "2-3" ? 1 : 0) +
      (integrations === "several" ? 2 : integrations === "one" ? 1 : 0);
    if (score <= 2) return ["Базовый пилот", "Одна проектная группа", "Аудит → настройка → контроль"];
    if (score <= 5) return ["Расширенный контур", "Несколько компетенций", "Нужна карта интеграций"];
    return ["Индивидуальный контур", "Кросс-функциональная команда", "Нужен технический аудит"];
  }, [channels, integrations, selected.length]);

  function toggle(value: string) {
    setSelected((current) =>
      current.includes(value)
        ? current.filter((item) => item !== value)
        : [...current, value],
    );
  }

  return (
    <div className="configuration-calculator">
      <div className="calculator-controls">
        <fieldset>
          <legend>Нужные модули</legend>
          {modules.map(([value, label]) => (
            <label key={value}>
              <input
                type="checkbox"
                checked={selected.includes(value)}
                onChange={() => toggle(value)}
              />
              <span>{label}</span>
            </label>
          ))}
        </fieldset>
        <label>
          <span>Количество рабочих каналов</span>
          <select value={channels} onChange={(event) => setChannels(event.target.value)}>
            <option value="1">Один</option>
            <option value="2-3">2–3</option>
            <option value="4+">4 и более</option>
          </select>
        </label>
        <label>
          <span>Интеграции</span>
          <select value={integrations} onChange={(event) => setIntegrations(event.target.value)}>
            <option value="none">Пока нет</option>
            <option value="one">Одна действующая система</option>
            <option value="several">Несколько систем</option>
          </select>
        </label>
      </div>
      <div className="calculator-result">
        <span>Предварительная комплектация</span>
        <h3>{profile[0]}</h3>
        <strong>{profile[1]}</strong>
        <p>{profile[2]}</p>
        <ul>
          {selected.length ? (
            selected.map((item) => (
              <li key={item}>✓ {modules.find(([value]) => value === item)?.[1]}</li>
            ))
          ) : (
            <li>Выберите хотя бы один модуль</li>
          )}
        </ul>
        <small>
          Это не расчёт цены и не коммерческое предложение. Стоимость
          рассчитывается после аудита задач и инфраструктуры.
        </small>
        <Link className="button button-primary" href="/contacts?service=complex">
          Уточнить комплектацию
        </Link>
      </div>
    </div>
  );
}
