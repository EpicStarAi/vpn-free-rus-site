import Link from "next/link";
import type { Post } from "@/data/site";

export function ArticleCard({
  post,
  featured = false,
}: {
  post: Post;
  featured?: boolean;
}) {
  return (
    <article className={featured ? "article-card featured" : "article-card"}>
      <Link
        className={`article-visual visual-${post.accent}`}
        href={`/articles/${post.slug}`}
        aria-label={`Читать: ${post.title}`}
      >
        <span className="visual-grid" aria-hidden="true" />
        <b>{post.visual}</b>
        <small>{post.tags[0]}</small>
      </Link>
      <div className="article-body">
        <div className="article-meta">
          <span>{post.category}</span>
          <time dateTime={post.date}>{post.displayDate}</time>
        </div>
        <h3>
          <Link href={`/articles/${post.slug}`}>{post.title}</Link>
        </h3>
        <p>{post.description}</p>
        <div className="article-footer">
          <span className="fact-check">✓ Факты проверены</span>
          <Link href={`/articles/${post.slug}`}>
            Читать <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>
    </article>
  );
}
