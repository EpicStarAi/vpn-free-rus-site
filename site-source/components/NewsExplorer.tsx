"use client";

import { useMemo, useState } from "react";
import type { Post } from "@/data/site";
import { ArticleCard } from "./ArticleCard";

export function NewsExplorer({ initialPosts }: { initialPosts: Post[] }) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("Все");
  const categories = ["Все", ...new Set(initialPosts.map((post) => post.category))];
  const normalized = query.trim().toLocaleLowerCase("ru");

  const visible = useMemo(
    () =>
      initialPosts.filter((post) => {
        const inCategory = category === "Все" || post.category === category;
        const searchable = `${post.title} ${post.description} ${post.category} ${post.tags.join(" ")}`;
        return (
          inCategory &&
          (!normalized || searchable.toLocaleLowerCase("ru").includes(normalized))
        );
      }),
    [category, initialPosts, normalized],
  );

  return (
    <div className="news-explorer">
      <div className="guide-tools">
        <label className="search-field">
          <span aria-hidden="true">⌕</span>
          <span className="sr-only">Поиск по материалам</span>
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Тема, категория или ключевое слово"
          />
        </label>
        <div className="filter-row" aria-label="Фильтр по категориям">
          {categories.map((item) => (
            <button
              key={item}
              type="button"
              className={category === item ? "active" : undefined}
              onClick={() => setCategory(item)}
            >
              {item}
            </button>
          ))}
        </div>
      </div>
      <p className="results-count">Материалов: {visible.length}</p>
      <div className="article-grid article-grid-listing">
        {visible.map((post) => (
          <ArticleCard key={post.slug} post={post} />
        ))}
      </div>
      {visible.length === 0 && (
        <div className="empty-state">
          <strong>По вашему запросу материалов пока нет</strong>
          <p>Измените формулировку или выберите другую категорию.</p>
        </div>
      )}
    </div>
  );
}
