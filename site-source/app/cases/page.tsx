import type { Metadata } from "next";
import Link from "next/link";
import { caseStudies } from "@/data/corporate";

export const metadata: Metadata = {
  title: "Кейсы",
  description:
    "Структура пилотных проектов по контенту, продажам и AI-автоматизации. Данные публикуются после согласования с клиентами.",
};

export default function CasesPage() {
  return (
    <main id="main" className="corp-page">
      <section className="corp-simple-hero">
        <div className="section-shell">
          <span className="eyebrow eyebrow-light">Практика внедрения</span>
          <h1>Кейсы без выдуманных цифр</h1>
          <p>
            Показываем задачу, исходную ситуацию, решение и инструменты. Цифры и
            названия клиентов публикуем только после согласования.
          </p>
        </div>
      </section>
      <section className="section-shell case-list">
        {caseStudies.map((item, index) => (
          <article key={item.id}>
            <header>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <div>
                <small>{item.type}</small>
                <h2>{item.title}</h2>
              </div>
              <b>{item.status}</b>
            </header>
            <div className="case-detail-grid">
              <div><span>Задача</span><p>{item.task}</p></div>
              <div><span>Исходная ситуация</span><p>{item.situation}</p></div>
              <div><span>Внедрённое решение</span><p>{item.solution}</p></div>
              <div><span>Используемые инструменты</span><p>{item.tools.join(" · ")}</p></div>
              <div><span>Достигнутый результат</span><p>{item.result}</p></div>
              <div><span>Срок реализации</span><p>{item.timeline}</p></div>
            </div>
          </article>
        ))}
        <div className="case-cta">
          <div>
            <strong>Обсудим ваш пилотный проект</strong>
            <span>Начнём с одного процесса и заранее определим критерии результата.</span>
          </div>
          <Link className="button button-primary" href="/contacts">Получить консультацию</Link>
        </div>
      </section>
    </main>
  );
}
