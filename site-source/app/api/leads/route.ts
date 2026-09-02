import { env } from "cloudflare:workers";

type LeadRequest = {
  name?: unknown;
  contact?: unknown;
  device?: unknown;
  company?: unknown;
  consent?: unknown;
  startedAt?: unknown;
};

const devices = new Set(["phone", "computer", "tv", "several"]);

export async function POST(request: Request) {
  let body: LeadRequest;
  try {
    body = (await request.json()) as LeadRequest;
  } catch {
    return Response.json({ message: "Некорректный запрос." }, { status: 400 });
  }

  if (body.company) return Response.json({ ok: true });

  const name = typeof body.name === "string" ? body.name.trim() : "";
  const contact = typeof body.contact === "string" ? body.contact.trim() : "";
  const device = typeof body.device === "string" ? body.device : "";
  const startedAt = typeof body.startedAt === "number" ? body.startedAt : 0;

  if (Date.now() - startedAt < 800) {
    return Response.json({ message: "Пожалуйста, заполните форму вручную." }, { status: 400 });
  }
  if (!name || name.length > 80 || !contact || contact.length > 160 || !devices.has(device)) {
    return Response.json({ message: "Проверьте заполнение полей." }, { status: 400 });
  }
  if (body.consent !== "on") {
    return Response.json({ message: "Нужно согласие с политикой конфиденциальности." }, { status: 400 });
  }

  try {
    await env.DB.prepare(
      "INSERT OR IGNORE INTO contacts (kind, name, contact, device) VALUES (?, ?, ?, ?)",
    ).bind("early_access", name, contact, device).run();
    return Response.json({ ok: true });
  } catch {
    return Response.json(
      { message: "Сервис временно недоступен. Попробуйте чуть позже." },
      { status: 503 },
    );
  }
}
