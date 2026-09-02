"use client";

import { FormEvent, useState } from "react";
import { corporateServices } from "@/data/corporate";
import { useFormStartedAt } from "./useFormStartedAt";

export function BusinessLeadForm({
  initialService = "",
  compact = false,
}: {
  initialService?: string;
  compact?: boolean;
}) {
  const [state, setState] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [message, setMessage] = useState("");
  const { getStartedAt, restart } = useFormStartedAt();

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setState("sending");
    setMessage("");
    const form = event.currentTarget;
    const payload = Object.fromEntries(new FormData(form));

    try {
      const response = await fetch("/api/business-request", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ ...payload, startedAt: getStartedAt() }),
      });
      const result = (await response.json()) as { message?: string };
      if (!response.ok) throw new Error(result.message || "Не удалось отправить заявку.");
      setState("success");
      setMessage(
        "Заявка принята. Команда изучит задачу и свяжется с вами для первичного аудита.",
      );
      form.reset();
      restart();
    } catch (error) {
      setState("error");
      setMessage(error instanceof Error ? error.message : "Попробуйте ещё раз.");
    }
  }

  return (
    <form className={compact ? "business-form is-compact" : "business-form"} onSubmit={submit}>
      <div className="business-form-heading">
        <span>Первичный аудит</span>
        <h2>Расскажите о задаче</h2>
        <p>
          Достаточно короткого описания. Команда уточнит детали, доступы и
          возможный состав рабочего контура.
        </p>
      </div>

      <div className="business-form-grid">
        <label>
          <span>Имя *</span>
          <input name="name" maxLength={80} autoComplete="name" required />
        </label>
        <label>
          <span>Компания *</span>
          <input name="company" maxLength={120} autoComplete="organization" required />
        </label>
        <label>
          <span>Telegram</span>
          <input name="telegram" maxLength={100} placeholder="@username" />
        </label>
        <label>
          <span>Телефон</span>
          <input name="phone" type="tel" maxLength={40} autoComplete="tel" />
        </label>
        <label>
          <span>Email</span>
          <input name="email" type="email" maxLength={160} autoComplete="email" />
        </label>
        <label>
          <span>Интересующая услуга *</span>
          <select name="service" defaultValue={initialService} required>
            <option value="" disabled>Выберите направление</option>
            {corporateServices.map((service) => (
              <option key={service.slug} value={service.slug}>{service.shortTitle}</option>
            ))}
            <option value="ai-agents">AI-агенты</option>
            <option value="epic-vpn">Пилот EPIC☠️VPN AI</option>
            <option value="complex">Комплексный digital-отдел</option>
          </select>
        </label>
        <label>
          <span>Количество социальных сетей</span>
          <select name="socialCount" defaultValue="0">
            <option value="0">Не требуется / пока не знаю</option>
            <option value="1">Одна площадка</option>
            <option value="2-3">2–3 площадки</option>
            <option value="4-6">4–6 площадок</option>
            <option value="7+">7 и более</option>
          </select>
        </label>
        <label>
          <span>Есть ли CRM?</span>
          <select name="hasCrm" defaultValue="unknown">
            <option value="yes">Да</option>
            <option value="no">Нет</option>
            <option value="unknown">Не знаю / нужно проверить</option>
          </select>
        </label>
        <label className="business-form-task">
          <span>Краткое описание задачи *</span>
          <textarea
            name="task"
            rows={5}
            maxLength={1500}
            placeholder="Что сейчас не работает и какой процесс хотите систематизировать?"
            required
          />
        </label>
        <label className="honeypot" aria-hidden="true">
          <span>Должность</span>
          <input name="position" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <p className="contact-hint">Укажите хотя бы один контакт: Telegram, телефон или email.</p>
      <label className="consent-check business-consent">
        <input name="consent" type="checkbox" required />
        <span>
          Согласен на обработку данных и с{" "}
          <a href="/privacy">политикой конфиденциальности</a>
        </span>
      </label>
      <button className="button button-primary" type="submit" disabled={state === "sending"}>
        {state === "sending" ? "Отправляем…" : "Получить консультацию"}
      </button>
      {message && <p className={`form-message ${state}`} role="status">{message}</p>}
    </form>
  );
}
