import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import test from "node:test";
const root = new URL("../", import.meta.url);
const read = (path) => readFile(new URL(path, root), "utf8");

test("VPN entry points use one landing and actual bot prices", async () => {
  const [page, alias, header, layout] = await Promise.all([read("app/page.tsx"), read("app/epic-vpn/page.tsx"), read("components/SiteHeader.tsx"), read("app/layout.tsx")]);
  assert.match(layout, /<html lang="ru">/);
  assert.match(page, /VPN для телефона/);
  for (const price of ["99 Stars", "199 Stars", "1 199 Stars"]) assert.ok(page.includes(price));
  for (const start of ["trial", "buy_month", "buy_year"]) assert.ok(page.includes(start));
  assert.match(page, /\/access/);
  assert.match(page, /файл \.conf/);
  assert.doesNotMatch(page + header, /Наташа|AI-агенты|149 ₽|249 ₽|1 490 ₽/);
  assert.match(alias, /export \{ default, metadata \} from "\.\.\/page"/);
});

test("removed sections redirect to VPN and downloads stay available", async () => {
  for (const route of ["natasha", "ai-agents"]) assert.match(await read(`app/${route}/page.tsx`), /redirect\("\/"\)/);
  const downloads = await read("data/downloads.ts");
  assert.match(downloads, /FREE-RUS-VPN\.apk/);
  assert.match(downloads, /FREE-RUS-VPN-Setup\.exe/);
  for (const file of ["dist/server/index.js", "public/og.png", "app/not-found.tsx"]) await access(new URL(file, root));
});
