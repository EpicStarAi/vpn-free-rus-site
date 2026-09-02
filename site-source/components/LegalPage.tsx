import Link from "next/link";

export function LegalPage({
  title,
  updated,
  sections,
}: {
  title: string;
  updated: string;
  sections: readonly (readonly [string, string])[];
}) {
  return (
    <main id="main" className="inner-page legal-page">
      <section className="page-hero section-shell">
        <span className="eyebrow">Документы проекта</span>
        <h1>{title}</h1>
        <p>Последнее обновление: {updated}</p>
      </section>
      <article className="legal-content">
        {sections.map(([heading, text]) => (
          <section key={heading}>
            <h2>{heading}</h2>
            <p>{text}</p>
          </section>
        ))}
        <Link className="back-link" href="/">← Вернуться на главную</Link>
      </article>
    </main>
  );
}
