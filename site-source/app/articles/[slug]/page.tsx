import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArticleCard } from "@/components/ArticleCard";
import { posts } from "@/data/site";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = posts.find((item) => item.slug === slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.description,
    openGraph: {
      type: "article",
      title: post.title,
      description: post.description,
      publishedTime: post.date,
      tags: post.tags,
    },
  };
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;
  const post = posts.find((item) => item.slug === slug);
  if (!post) notFound();
  const related = posts.filter((item) => item.slug !== post.slug).slice(0, 2);

  return (
    <main id="main" className="inner-page article-page">
      <article>
        <header className="article-hero section-shell">
          <Link className="back-link" href="/news">← Все материалы</Link>
          <div className="article-meta">
            <span>{post.category}</span>
            <time dateTime={post.date}>{post.displayDate}</time>
            <span>{post.readTime}</span>
          </div>
          <h1>{post.title}</h1>
          <p>{post.description}</p>
          <div className="article-tags">
            {post.tags.map((tag) => <span key={tag}>#{tag}</span>)}
          </div>
          <div className={`article-cover visual-${post.accent}`}>
            <span className="visual-grid" aria-hidden="true" />
            <b>{post.visual}</b>
          </div>
        </header>
        <div className="article-content">
          <aside className="article-status">
            <span>✓</span>
            <div>
              <strong>Факты проверены</strong>
              <small>Редакционная проверка</small>
            </div>
          </aside>
          {post.content.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
          {post.checklist && (
            <div className="checklist">
              <h2>Короткий чек-лист</h2>
              {post.checklist.map((item) => <span key={item}>✓ {item}</span>)}
            </div>
          )}
          <div className="source-note">
            <strong>Как мы готовили материал</strong>
            <p>
              Рекомендации основаны на общих принципах цифровой безопасности и
              документации соответствующих сервисов. Важные настройки могут
              меняться — проверяйте названия пунктов в актуальной версии
              приложения.
            </p>
          </div>
        </div>
      </article>
      <section className="section-shell related-section">
        <div className="section-heading">
          <h2>Читайте дальше</h2>
        </div>
        <div className="article-grid">
          {related.map((item) => <ArticleCard key={item.slug} post={item} />)}
        </div>
      </section>
    </main>
  );
}
