import type { Metadata } from "next";
import { VideoCard } from "@/components/VideoCard";
import { videos } from "@/data/site";

export const metadata: Metadata = {
  title: "Видео",
  description:
    "Короткие видео Наташи Фри о приватности, цифровой безопасности и технологиях.",
};

export default function VideosPage() {
  return (
    <main id="main" className="inner-page video-page">
      <section className="page-hero section-shell">
        <span className="eyebrow eyebrow-light">Наташа Фри объясняет</span>
        <h1>Видео без воды</h1>
        <p>
          Вертикальные разборы для Shorts, Reels и TikTok — и полные выпуски,
          когда теме нужна глубина.
        </p>
      </section>
      <section className="section-shell listing-section">
        <div className="video-grid video-grid-page">
          {videos.map((video, index) => (
            <VideoCard key={video.title} video={video} index={index} />
          ))}
        </div>
        <div className="editor-note">
          <span>Для редакции</span>
          <p>
            Карточки подготовлены для ссылок на YouTube и собственные
            видеофайлы. Источник ролика можно заменить в единой структуре данных
            без изменения страницы.
          </p>
        </div>
      </section>
    </main>
  );
}
