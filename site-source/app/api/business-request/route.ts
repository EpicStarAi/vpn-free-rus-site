import { env } from "cloudflare:workers";

type BusinessRequest = Record<string, unknown>;

const allowedServices = new Set([
  "sales",
  "marketing",
  "social-media",
  "digitalization",
  "ai-agents",
  "epic-vpn",
  "complex",
]);

export async function POST(request: Request) {
  let body: BusinessRequest;
  try {
    body = (await request.json()) as BusinessRequest;
  } catch {
    return Response.json({ message: "Некорректный запрос." }, { status: 400 });
  }

  if (body.position) return Response.json({ ok: true });

  const text = (key: string, max: number) =>
    typeof body[key] === "string" ? body[key].trim().slice(0, max) : "";
  const name = text("name", 80);
  const company = text("company", 120);
  const telegram = text("telegram", 100);
  const phone = text("phone", 40);
  const email = text("email", 160);
  const service = text("service", 50);
  const socialCount = text("socialCount", 20);
  const hasCrm = text("hasCrm", 20);
  const task = text("task", 1500);
  const startedAt = typeof body.startedAt === "number" ? body.startedAt : 0;

  if (Date.now() - startedAt < 800) {
    return Response.json({ message: "Пожалуйста, заполните форму вручную." }, { status: 400 });
  }
  if (!name || !company || !allowedServices.has(service) || !task) {
    return Response.json({ message: "Проверьте обязательные поля." }, { status: 400 });
  }
  if (!telegram && !phone && !email) {
    return Response.json(
      { message: "Укажите Telegram, телефон или email для связи." },
      { status: 400 },
    );
  }
  if (body.consent !== "on") {
    return Response.json(
      { message: "Нужно согласие на обработку персональных данных." },
      { status: 400 },
    );
  }

  try {
    await env.DB.prepare(
      `INSERT INTO business_requests
       (name, company, telegram, phone, email, service, social_count, has_crm, task)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    )
      .bind(name, company, telegram || null, phone || null, email || null, service, socialCount, hasCrm, task)
      .run();
    return Response.json({ ok: true });
  } catch {
    return Response.json(
      { message: "Сервис временно недоступен. Попробуйте чуть позже." },
      { status: 503 },
    );
  }
}
