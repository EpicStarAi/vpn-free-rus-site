import type { Metadata } from "next";
import { NewsExplorer } from "@/components/NewsExplorer";
import { posts } from "@/data/site";

export const metadata: Metadata = {
  title: "Новости и разборы",
  description:
    "Проверенные материалы о цифровой безопасности, технологиях, социальных сетях, VPN и приватности.",
};

export default function NewsPage() {
  return (
    <main id="main" className="inner-page">
      <section className="page-hero section-shell">
        <span className="eyebrow">Редакционная лента</span>
        <h1>Новости и разборы</h1>
        <p>
          Без выдуманных сенсаций: объясняем, что произошло, как это работает и
          что действительно стоит сделать.
        </p>
      </section>
      <section className="section-shell listing-section">
        <NewsExplorer initialPosts={posts} />
      </section>
    </main>
  );
}
