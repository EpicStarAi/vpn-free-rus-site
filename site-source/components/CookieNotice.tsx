"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const key = "ibo-cookie-choice";

export function CookieNotice() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setVisible(!window.localStorage.getItem(key));
    }, 0);
    return () => window.clearTimeout(timer);
  }, []);

  function choose(value: "accepted" | "declined") {
    window.localStorage.setItem(key, value);
    window.dispatchEvent(new CustomEvent("ibo-consent", { detail: value }));
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <aside className="cookie-notice" aria-label="Настройки аналитики">
      <div>
        <strong>Только полезные cookie</strong>
        <p>
          Сайт хранит ваш выбор и, с согласия, считает обезличенные просмотры без
          рекламного профилирования. <Link href="/privacy">Подробнее</Link>
        </p>
      </div>
      <div className="cookie-actions">
        <button type="button" onClick={() => choose("declined")}>
          Только необходимые
        </button>
        <button type="button" onClick={() => choose("accepted")}>
          Разрешить аналитику
        </button>
      </div>
    </aside>
  );
}
