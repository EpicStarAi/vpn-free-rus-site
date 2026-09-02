import { env } from "cloudflare:workers";

type TeamRequest = {
  name?: unknown;
  company?: unknown;
  contact?: unknown;
  roles?: unknown;
  website?: unknown;
  consent?: unknown;
  startedAt?: unknown;
};

export async function POST(request: Request) {
  let body: TeamRequest;
  try {
    body = (await request.json()) as TeamRequest;
  } catch {
    return Response.json({ message: "Некорректный запрос." }, { status: 400 });
  }

  if (body.website) return Response.json({ ok: true });

  const name = typeof body.name === "string" ? body.name.trim() : "";
  const company = typeof body.company === "string" ? body.company.trim() : "";
  const contact = typeof body.contact === "string" ? body.contact.trim() : "";
  const roles = Array.isArray(body.roles)
    ? body.roles.filter((role): role is string => typeof role === "string").slice(0, 9)
    : [];
  const startedAt = typeof body.startedAt === "number" ? body.startedAt : 0;

  if (Date.now() - startedAt < 800) {
    return Response.json({ message: "Пожалуйста, заполните форму вручную." }, { status: 400 });
  }
  if (
    !name ||
    name.length > 80 ||
    !company ||
    company.length > 120 ||
    !contact ||
    contact.length > 160 ||
    roles.length === 0
  ) {
    return Response.json({ message: "Проверьте поля и состав команды." }, { status: 400 });
  }
  if (body.consent !== "on") {
    return Response.json({ message: "Нужно согласие с политикой конфиденциальности." }, { status: 400 });
  }

  try {
    await env.DB.prepare(
      "INSERT INTO team_requests (name, company, contact, roles) VALUES (?, ?, ?, ?)",
    )
      .bind(name, company, contact, JSON.stringify(roles))
      .run();
    return Response.json({ ok: true });
  } catch {
    return Response.json(
      { message: "Сервис временно недоступен. Попробуйте чуть позже." },
      { status: 503 },
    );
  }
}
