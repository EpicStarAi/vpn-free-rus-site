import { mkdir, readFile, rename, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fallbackEditorialUpdates, type EditorialUpdate } from "@/data/editorial-feed";

type EditorialFeedFile = {
  updatedAt: string;
  items: EditorialUpdate[];
};

const fallbackFeed: EditorialFeedFile = {
  updatedAt: "2026-08-22T00:00:00.000Z",
  items: fallbackEditorialUpdates,
};

function getFeedFilePath() {
  return resolve(process.env.EDITORIAL_FEED_FILE ?? ".editorial-feed.json");
}

function json(data: unknown, init?: ResponseInit) {
  return Response.json(data, {
    ...init,
    headers: {
      "Cache-Control": "no-store",
      ...(init?.headers ?? {}),
    },
  });
}

function getAuthToken(request: Request) {
  const header = request.headers.get("authorization") ?? "";
  return header.startsWith("Bearer ") ? header.slice("Bearer ".length).trim() : "";
}

function text(value: unknown, maxLength: number) {
  return typeof value === "string" ? value.trim().slice(0, maxLength) : "";
}

function sanitizeUrl(value: unknown) {
  const href = text(value, 500);
  try {
    const url = new URL(href);
    return url.protocol === "https:" || url.protocol === "http:" ? url.toString() : "";
  } catch {
    return "";
  }
}

function sanitizeUpdate(value: unknown): EditorialUpdate | null {
  if (!value || typeof value !== "object") return null;
  const record = value as Record<string, unknown>;
  const update: EditorialUpdate = {
    time: text(record.time, 12),
    title: text(record.title, 180),
    agency: text(record.agency, 80),
    sourceType: text(record.sourceType, 80),
    sourceDate: text(record.sourceDate, 40),
    verifiedAt: text(record.verifiedAt, 40),
    sourceLabel: text(record.sourceLabel, 120),
    href: sanitizeUrl(record.href),
    why: text(record.why, 500),
  };

  if (!update.time || !update.title || !update.agency || !update.href || !update.why) {
    return null;
  }

  update.sourceType ||= "Источник";
  update.sourceDate ||= new Date().toLocaleDateString("ru-RU", { timeZone: "Europe/Moscow" });
  update.verifiedAt ||= new Date().toLocaleString("ru-RU", {
    timeZone: "Europe/Moscow",
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
  update.sourceLabel ||= new URL(update.href).hostname;

  return update;
}

async function readFeed(): Promise<{ feed: EditorialFeedFile; source: "live" | "fallback" }> {
  try {
    const raw = await readFile(getFeedFilePath(), "utf8");
    const parsed = JSON.parse(raw) as Partial<EditorialFeedFile>;
    const items = Array.isArray(parsed.items)
      ? parsed.items.map(sanitizeUpdate).filter((item): item is EditorialUpdate => Boolean(item))
      : [];

    if (items.length === 0) return { feed: fallbackFeed, source: "fallback" };
    return {
      feed: {
        updatedAt: typeof parsed.updatedAt === "string" ? parsed.updatedAt : new Date().toISOString(),
        items,
      },
      source: "live",
    };
  } catch {
    return { feed: fallbackFeed, source: "fallback" };
  }
}

async function writeFeed(items: EditorialUpdate[]) {
  const filePath = getFeedFilePath();
  await mkdir(dirname(filePath), { recursive: true });
  const payload: EditorialFeedFile = {
    updatedAt: new Date().toISOString(),
    items: items.slice(0, 30),
  };
  const tempPath = `${filePath}.${process.pid}.tmp`;
  await writeFile(tempPath, `${JSON.stringify(payload, null, 2)}\n`, "utf8");
  await rename(tempPath, filePath);
  return payload;
}

export async function GET() {
  const { feed, source } = await readFeed();
  return json({ ...feed, source });
}

export async function POST(request: Request) {
  const expectedToken = process.env.EDITORIAL_FEED_TOKEN;
  if (!expectedToken) {
    return json({ message: "Editorial feed token is not configured." }, { status: 503 });
  }
  if (getAuthToken(request) !== expectedToken) {
    return json({ message: "Unauthorized." }, { status: 401 });
  }

  let body: Record<string, unknown>;
  try {
    body = (await request.json()) as Record<string, unknown>;
  } catch {
    return json({ message: "Некорректный JSON." }, { status: 400 });
  }

  const rawItems = Array.isArray(body.items) ? body.items : body.item ? [body.item] : [];
  const items = rawItems.map(sanitizeUpdate).filter((item): item is EditorialUpdate => Boolean(item));
  if (items.length === 0) {
    return json({ message: "Нет валидных новостей для публикации." }, { status: 400 });
  }

  const feed = await writeFeed(items);
  return json({ ok: true, ...feed });
}

export async function OPTIONS() {
  return new Response(null, {
    status: 204,
    headers: {
      "Access-Control-Allow-Headers": "authorization, content-type",
      "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
      "Access-Control-Allow-Origin": "*",
      "Cache-Control": "no-store",
    },
  });
}
