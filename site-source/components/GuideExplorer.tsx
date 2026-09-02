"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import type { Guide } from "@/data/site";

export function GuideExplorer({
  initialGuides,
  compact = false,
}: {
  initialGuides: Guide[];
  compact?: boolean;
}) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("Все");
  const categories = ["Все", ...new Set(initialGuides.map((guide) => guide.category))];
  const normalized = query.trim().toLocaleLowerCase("ru");

  const visible = useMemo(
    () =>
      initialGuides.filter((guide) => {
        const inCategory = category === "Все" || guide.category === category;
        const inSearch =
          !normalized ||
          `${guide.title} ${guide.description} ${guide.category}`
            .toLocaleLowerCase("ru")
            .includes(normalized);
        return inCategory && inSearch;
      }),
    [category, initialGuides, normalized],
  );

  return (
    <div className="guide-explorer">
      <div className="guide-tools">
        <label className="search-field">
          <span aria-hidden="true">⌕</span>
          <span className="sr-only">Поиск по инструкциям</span>
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Найти инструкцию"
          />
        </label>
        <div className="filter-row" aria-label="Фильтр по категориям">
          {categories.map((item) => (
            <button
              key={item}
              type="button"
              className={item === category ? "active" : undefined}
              onClick={() => setCategory(item)}
            >
              {item}
            </button>
          ))}
        </div>
      </div>
      <div className="guide-grid">
        {visible.slice(0, compact ? 6 : undefined).map((guide, index) => (
          <article className="guide-card" key={guide.slug}>
            <div className="guide-number">{String(index + 1).padStart(2, "0")}</div>
            <span className="guide-category">{guide.category}</span>
            <h3>{guide.title}</h3>
            <p>{guide.description}</p>
            <div className="guide-meta">
              <span>{guide.time}</span>
              <span>{guide.level}</span>
            </div>
            <Link href={`/instructions/${guide.slug}`} aria-label={`Открыть: ${guide.title}`}>
              <span aria-hidden="true">→</span>
            </Link>
          </article>
        ))}
      </div>
      {visible.length === 0 && (
        <div className="empty-state">
          <strong>Ничего не нашлось</strong>
          <p>Попробуйте другой запрос или сбросьте выбранную категорию.</p>
          <button type="button" onClick={() => { setQuery(""); setCategory("Все"); }}>
            Сбросить фильтры
          </button>
        </div>
      )}
    </div>
  );
}
