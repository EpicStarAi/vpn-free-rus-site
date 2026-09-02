import type { Metadata } from "next";
import { GuideExplorer } from "@/components/GuideExplorer";
import { guides } from "@/data/site";

export const metadata: Metadata = {
  title: "Инструкции",
  description:
    "Пошаговые инструкции по цифровой безопасности, приватности, сетям и защите аккаунтов.",
};

export default function InstructionsPage() {
  return (
    <main id="main" className="inner-page">
      <section className="page-hero section-shell">
        <span className="eyebrow">База знаний</span>
        <h1>Понятные инструкции</h1>
        <p>
          Находим причину, объясняем последствия и показываем безопасный порядок
          действий.
        </p>
      </section>
      <section className="section-shell listing-section">
        <GuideExplorer initialGuides={guides} />
      </section>
    </main>
  );
}
