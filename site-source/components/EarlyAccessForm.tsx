"use client";

import { FormEvent, useState } from "react";
import { useFormStartedAt } from "./useFormStartedAt";

type FormState = "idle" | "sending" | "success" | "error";

export function EarlyAccessForm() {
  const [state, setState] = useState<FormState>("idle");
  const [message, setMessage] = useState("");
  const { getStartedAt, restart } = useFormStartedAt();

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setState("sending");
    setMessage("");
    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form));

    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ ...data, startedAt: getStartedAt() }),
      });
      const result = (await response.json()) as { message?: string };
      if (!response.ok) throw new Error(result.message || "Не удалось отправить форму");
      setState("success");
      setMessage("Готово. Сообщим вам, когда откроется ранний доступ.");
      form.reset();
      restart();
    } catch (error) {
      setState("error");
      setMessage(
        error instanceof Error
          ? error.message
          : "Не удалось отправить форму. Попробуйте ещё раз.",
      );
    }
  }

  return (
    <form className="early-form" onSubmit={submit}>
      <div className="form-heading">
        <span>Ранний доступ</span>
        <strong>Записаться на запуск</strong>
      </div>
      <label>
        <span>Имя или псевдоним</span>
        <input name="name" type="text" autoComplete="name" maxLength={80} required />
      </label>
      <label>
        <span>Email или Telegram</span>
        <input
          name="contact"
          type="text"
          autoComplete="email"
          maxLength={160}
          placeholder="@username или name@example.com"
          required
        />
      </label>
      <label>
        <span>Используемое устройство</span>
        <select name="device" defaultValue="" required>
          <option value="" disabled>Выберите устройство</option>
          <option value="phone">Телефон</option>
          <option value="computer">Компьютер</option>
          <option value="tv">Телевизор</option>
          <option value="several">Несколько устройств</option>
        </select>
      </label>
      <label className="honeypot" aria-hidden="true">
        <span>Компания</span>
        <input name="company" tabIndex={-1} autoComplete="off" />
      </label>
      <label className="consent-check">
        <input name="consent" type="checkbox" required />
        <span>
          Согласен с{" "}
          <a href="/privacy">политикой конфиденциальности</a>
        </span>
      </label>
      <button className="button button-primary" type="submit" disabled={state === "sending"}>
        {state === "sending" ? "Отправляем…" : "Записаться на запуск"}
      </button>
      {message && (
        <p className={`form-message ${state}`} role="status">
          {message}
        </p>
      )}
      <small>
        Без оплаты и обязательств. Не обещаем абсолютную анонимность или
        доступность всех ресурсов.
      </small>
    </form>
  );
}
