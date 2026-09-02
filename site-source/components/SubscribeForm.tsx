"use client";

import { FormEvent, useState } from "react";
import { useFormStartedAt } from "./useFormStartedAt";

export function SubscribeForm() {
  const [status, setStatus] = useState("");
  const [sending, setSending] = useState(false);
  const { getStartedAt, restart } = useFormStartedAt();

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSending(true);
    setStatus("");
    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form));

    try {
      const response = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ ...data, startedAt: getStartedAt() }),
      });
      if (!response.ok) throw new Error();
      form.reset();
      setStatus("Вы в списке. Спасибо!");
      restart();
    } catch {
      setStatus("Не получилось отправить. Попробуйте позже.");
    } finally {
      setSending(false);
    }
  }

  return (
    <form className="subscribe-form" onSubmit={submit}>
      <label>
        <span className="sr-only">Email или Telegram</span>
        <input name="contact" placeholder="Email или @username" maxLength={160} required />
      </label>
      <input className="honeypot" name="website" tabIndex={-1} autoComplete="off" />
      <button type="submit" disabled={sending} aria-label="Подписаться">
        {sending ? "…" : "→"}
      </button>
      {status && <small role="status">{status}</small>}
    </form>
  );
}
