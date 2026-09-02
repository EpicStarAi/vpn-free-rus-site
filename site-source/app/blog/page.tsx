import type { Metadata } from "next";
import Link from "next/link";
import { NewsExplorer } from "@/components/NewsExplorer";
import { VideoCard } from "@/components/VideoCard";
import { posts, videos } from "@/data/site";

export const metadata: Metadata = {
  title: "Блог и медиа",
  description:
    "Новости, инструкции и разборы о социальных сетях, AI для бизнеса, автоматизации, маркетинге, продажах и цифровой безопасности.",
};

export default function BlogPage() {
  return (
    <main id="main" className="corp-page blog-page">
      <section className="corp-simple-hero">
        <div className="section-shell">
          <span className="eyebrow eyebrow-light">Блог и медиа</span>
          <h1>Digital без рекламного тумана</h1>
          <p>
            Короткие новости, инструкции, разборы инструментов и видео с
            виртуальной ведущей Наташей Фри.
          </p>
        </div>
      </section>
      <section className="section-shell blog-news-section">
        <NewsExplorer initialPosts={posts} />
      </section>
      <section className="blog-video-section">
        <div className="section-shell">
          <div className="corp-section-title">
            <span className="eyebrow eyebrow-light">Наташа Фри</span>
            <h2>Видео и короткие форматы</h2>
          </div>
          <div className="video-grid">
            {videos.map((video, index) => (
              <VideoCard key={video.title} video={video} index={index} />
            ))}
          </div>
          <Link className="text-link text-link-light" href="/videos">Все видео →</Link>
        </div>
      </section>
    </main>
  );
}
