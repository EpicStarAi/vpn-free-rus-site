"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import {
  type Influencer,
  influencerFilters,
  influencers,
} from "@/data/influencers";
import { useFormStartedAt } from "./useFormStartedAt";

type DialogState =
  | { type: "demo"; influencer: Influencer }
  | { type: "request" }
  | null;

export function AIInfluencerCatalog() {
  const [filter, setFilter] = useState<(typeof influencerFilters)[number]>("Все");
  const [selected, setSelected] = useState<string[]>([]);
  const [dialog, setDialog] = useState<DialogState>(null);
  const [formState, setFormState] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [formMessage, setFormMessage] = useState("");
  const { getStartedAt } = useFormStartedAt();

  const visible = useMemo(
    () =>
      filter === "Все"
        ? influencers
        : influencers.filter((influencer) => influencer.filters.includes(filter)),
    [filter],
  );

  const selectedInfluencers = influencers.filter((item) => selected.includes(item.id));

  useEffect(() => {
    const close = (event: KeyboardEvent) => {
      if (event.key === "Escape") setDialog(null);
    };
    window.addEventListener("keydown", close);
    return () => window.removeEventListener("keydown", close);
  }, []);

  function toggle(id: string) {
    setSelected((current) =>
      current.includes(id) ? current.filter((item) => item !== id) : [...current, id],
    );
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setFormState("sending");
    setFormMessage("");
    const form = event.currentTarget;
    const payload = Object.fromEntries(new FormData(form));

    try {
      const response = await fetch("/api/team-request", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          ...payload,
          roles: selectedInfluencers.map((item) => item.role),
          startedAt: getStartedAt(),
        }),
      });
      const result = (await response.json()) as { message?: string };
      if (!response.ok) throw new Error(result.message || "Не удалось отправить заявку.");
      setFormState("success");
      setFormMessage("Заявка принята. Мы уточним задачу и доступный рабочий контур.");
      form.reset();
      setSelected([]);
    } catch (error) {
      setFormState("error");
      setFormMessage(error instanceof Error ? error.message : "Попробуйте ещё раз.");
    }
  }

  return (
    <div className="ai-catalog">
      <div className="ai-filter-row" aria-label="Фильтр AI-инфлюенсеров">
        {influencerFilters.map((item) => (
          <button
            key={item}
            type="button"
            className={filter === item ? "active" : undefined}
            onClick={() => setFilter(item)}
          >
            {item}
          </button>
        ))}
      </div>

      <div className="ai-grid">
        {visible.map((influencer) => {
          const isSelected = selected.includes(influencer.id);
          return (
            <article className="ai-card" key={influencer.id}>
              <div className={`ai-avatar avatar-${influencer.accent}`} aria-hidden="true">
                <span>{influencer.initials}</span>
                <i />
              </div>
              <div className="ai-card-topline">
                <span>{influencer.mode}</span>
                <span>{influencer.turnaround}</span>
              </div>
              <h3>{influencer.name}</h3>
              <strong>{influencer.role}</strong>
              <p>{influencer.tagline}</p>
              <dl className="ai-card-facts">
                <div>
                  <dt>Языки</dt>
                  <dd>{influencer.languages.join(" · ")}</dd>
                </div>
                <div>
                  <dt>Отрасли</dt>
                  <dd>{influencer.industries.join(" · ")}</dd>
                </div>
                <div>
                  <dt>Каналы</dt>
                  <dd>{influencer.channels.join(" · ")}</dd>
                </div>
              </dl>
              <div className="ai-tasks">
                {influencer.tasks.slice(0, 3).map((task) => (
                  <span key={task}>{task}</span>
                ))}
              </div>
              <div className="ai-card-actions">
                <button
                  type="button"
                  className={isSelected ? "ai-add selected" : "ai-add"}
                  onClick={() => toggle(influencer.id)}
                >
                  {isSelected ? "В команде ✓" : "Добавить в команду"}
                </button>
                <button
                  type="button"
                  className="ai-demo"
                  onClick={() => setDialog({ type: "demo", influencer })}
                >
                  Посмотреть демо
                </button>
              </div>
            </article>
          );
        })}
      </div>

      {selected.length > 0 && (
        <aside className="team-builder" aria-label="Собранная команда">
          <div>
            <span>Ваша команда</span>
            <strong>{selectedInfluencers.map((item) => item.name).join(", ")}</strong>
          </div>
          <button type="button" onClick={() => { setFormState("idle"); setDialog({ type: "request" }); }}>
            Обсудить запуск · {selected.length}
          </button>
        </aside>
      )}

      {dialog && (
        <div className="dialog-backdrop" role="presentation" onMouseDown={() => setDialog(null)}>
          <section
            className="ai-dialog"
            role="dialog"
            aria-modal="true"
            aria-label={dialog.type === "demo" ? `Демо: ${dialog.influencer.name}` : "Заявка на AI-команду"}
            onMouseDown={(event) => event.stopPropagation()}
          >
            <button className="dialog-close" type="button" onClick={() => setDialog(null)} aria-label="Закрыть">
              ×
            </button>
            {dialog.type === "demo" ? (
              <>
                <span className="eyebrow">Демонстрационный контур</span>
                <h2>{dialog.influencer.name}</h2>
                <p>{dialog.influencer.tagline}</p>
                <div className="demo-output">
                  <span>Примеры результата</span>
                  {dialog.influencer.examples.map((example, index) => (
                    <article key={example}>
                      <b>{String(index + 1).padStart(2, "0")}</b>
                      <strong>{example}</strong>
                      <small>Черновик → проверка владельца → действие</small>
                    </article>
                  ))}
                </div>
                <button
                  className="button button-primary"
                  type="button"
                  onClick={() => {
                    if (!selected.includes(dialog.influencer.id)) toggle(dialog.influencer.id);
                    setDialog(null);
                  }}
                >
                  Добавить в команду
                </button>
              </>
            ) : (
              <>
                <span className="eyebrow">Диагностика проекта</span>
                <h2>Соберём рабочий контур</h2>
                <p>
                  Сначала уточним страну работы, площадки, роли и уровень доступа.
                  Никаких автоматических публикаций без согласования.
                </p>
                <div className="selected-team-list">
                  {selectedInfluencers.map((item) => (
                    <span key={item.id}>{item.name} · {item.role}</span>
                  ))}
                </div>
                <form className="team-request-form" onSubmit={submit}>
                  <label>
                    <span>Имя</span>
                    <input name="name" maxLength={80} required />
                  </label>
                  <label>
                    <span>Компания или проект</span>
                    <input name="company" maxLength={120} required />
                  </label>
                  <label>
                    <span>Email или Telegram</span>
                    <input name="contact" maxLength={160} required />
                  </label>
                  <label className="honeypot" aria-hidden="true">
                    <span>Сайт</span>
                    <input name="website" tabIndex={-1} autoComplete="off" />
                  </label>
                  <label className="consent-check">
                    <input name="consent" type="checkbox" required />
                    <span>Согласен с <a href="/privacy">политикой конфиденциальности</a></span>
                  </label>
                  <button className="button button-primary" type="submit" disabled={formState === "sending"}>
                    {formState === "sending" ? "Отправляем…" : "Запросить консультацию"}
                  </button>
                  {formMessage && <p className={`form-message ${formState}`} role="status">{formMessage}</p>}
                </form>
              </>
            )}
          </section>
        </div>
      )}
    </div>
  );
}
