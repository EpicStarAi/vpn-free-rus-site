import Link from "next/link";
import type { Video } from "@/data/site";

export function VideoCard({ video, index }: { video: Video; index: number }) {
  return (
    <article className={`video-card video-${index + 1}`}>
      <div className="video-art">
        <span className="video-format">{video.format}</span>
        <span className="video-orbit" aria-hidden="true" />
        <span className="video-monogram" aria-hidden="true">
          NF
        </span>
        <Link className="play-button" href={video.href} aria-label={`Смотреть: ${video.title}`}>
          ▶
        </Link>
        <span className="video-duration">{video.duration}</span>
      </div>
      <h3>{video.title}</h3>
      <Link className="video-link" href={video.href}>
        Полный выпуск <span aria-hidden="true">↗</span>
      </Link>
    </article>
  );
}
