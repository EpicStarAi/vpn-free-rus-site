import { env } from "cloudflare:workers";

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = (await request.json()) as Record<string, unknown>;
  } catch {
    return new Response(null, { status: 400 });
  }

  const path = typeof body.path === "string" ? body.path.slice(0, 180) : "";
  if (!path.startsWith("/") || path.startsWith("/api/")) {
    return new Response(null, { status: 400 });
  }
  const day = new Date().toISOString().slice(0, 10);

  try {
    await env.DB.prepare(
      `INSERT INTO page_views (day, path, views) VALUES (?, ?, 1)
       ON CONFLICT(day, path) DO UPDATE SET views = views + 1`,
    ).bind(day, path).run();
    return new Response(null, { status: 204 });
  } catch {
    return new Response(null, { status: 503 });
  }
}
