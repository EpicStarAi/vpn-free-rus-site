import { env } from "cloudflare:workers";

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = (await request.json()) as Record<string, unknown>;
  } catch {
    return Response.json({ message: "Некорректный запрос." }, { status: 400 });
  }

  if (body.position) return Response.json({ ok: true });

  const name = typeof body.name === "string" ? body.name.trim().slice(0, 80) : "";
  const telegram = typeof body.telegram === "string" ? body.telegram.trim().slice(0, 100) : "";
  const email = typeof body.email === "string" ? body.email.trim().slice(0, 160) : "";
  const clientType = typeof body.clientType === "string" ? body.clientType : "";
  const devices = Number(body.devices);
  const startedAt = typeof body.startedAt === "number" ? body.startedAt : 0;

  if (Date.now() - startedAt < 800) {
    return Response.json({ message: "Пожалуйста, заполните форму вручную." }, { status: 400 });
  }
  if (
    !name ||
    !telegram ||
    !email ||
    !["private", "business"].includes(clientType) ||
    !Number.isInteger(devices) ||
    devices < 1 ||
    devices > 10000
  ) {
    return Response.json({ message: "Проверьте заполнение полей." }, { status: 400 });
  }
  if (body.consent !== "on") {
    return Response.json(
      { message: "Нужно согласие на обработку персональных данных." },
      { status: 400 },
    );
  }

  try {
    await env.DB.prepare(
      `INSERT INTO vpn_pilot_requests
       (name, telegram, email, client_type, devices)
       VALUES (?, ?, ?, ?, ?)`,
    )
      .bind(name, telegram, email, clientType, devices)
      .run();
    return Response.json({ ok: true });
  } catch {
    return Response.json(
      { message: "Сервис временно недоступен. Попробуйте чуть позже." },
      { status: 503 },
    );
  }
}
