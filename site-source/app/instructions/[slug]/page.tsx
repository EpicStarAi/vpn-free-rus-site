import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { guides } from "@/data/site";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return guides.map((guide) => ({ slug: guide.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const guide = guides.find((item) => item.slug === slug);
  return guide ? { title: guide.title, description: guide.description } : {};
}

const steps = [
  ["Определите задачу", "Зафиксируйте, что именно не работает или что вы хотите защитить. Не меняйте сразу несколько настроек."],
  ["Проверьте базовые условия", "Обновите приложение и систему, убедитесь в правильности адреса и сохраните важные данные."],
  ["Меняйте по одному параметру", "После каждого действия проверяйте результат — так вы поймёте причину, а не получите случайный эффект."],
  ["Верните лишнее назад", "Не оставляйте отключённую защиту, тестовые разрешения или незнакомые приложения после проверки."],
];

export default async function GuidePage({ params }: Props) {
  const { slug } = await params;
  const guide = guides.find((item) => item.slug === slug);
  if (!guide) notFound();

  return (
    <main id="main" className="inner-page guide-page">
      <section className="page-hero section-shell">
        <Link className="back-link" href="/instructions">← Все инструкции</Link>
        <span className="eyebrow">{guide.category}</span>
        <h1>{guide.title}</h1>
        <p>{guide.description}</p>
        <div className="guide-meta guide-hero-meta">
          <span>{guide.time}</span>
          <span>{guide.level}</span>
          <span>Проверено редакцией</span>
        </div>
      </section>
      <section className="guide-steps">
        {steps.map(([title, text], index) => (
          <article key={title}>
            <span>{String(index + 1).padStart(2, "0")}</span>
            <div>
              <h2>{title}</h2>
              <p>{text}</p>
            </div>
          </article>
        ))}
        <aside>
          <strong>Важно</strong>
          <p>
            Названия пунктов меню зависят от устройства и версии приложения.
            Если действие касается аккаунта или платежей, сначала создайте
            резервную копию и проверьте официальный раздел помощи сервиса.
          </p>
        </aside>
      </section>
    </main>
  );
}
