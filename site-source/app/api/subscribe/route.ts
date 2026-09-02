import { env } from "cloudflare:workers";

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = (await request.json()) as Record<string, unknown>;
  } catch {
    return Response.json({ ok: false }, { status: 400 });
  }

  if (body.website) return Response.json({ ok: true });
  const contact = typeof body.contact === "string" ? body.contact.trim() : "";
  const startedAt = typeof body.startedAt === "number" ? body.startedAt : 0;
  if (!contact || contact.length > 160 || Date.now() - startedAt < 800) {
    return Response.json({ ok: false }, { status: 400 });
  }

  try {
    await env.DB.prepare(
      "INSERT OR IGNORE INTO contacts (kind, contact) VALUES (?, ?)",
    ).bind("newsletter", contact).run();
    return Response.json({ ok: true });
  } catch {
    return Response.json({ ok: false }, { status: 503 });
  }
}
