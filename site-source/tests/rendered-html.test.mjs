import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import test from "node:test";

const root = new URL("../", import.meta.url);

test("contains the finished Russian site and no starter preview", async () => {
  const [page, natashaPage, editorialHome, editorialFeedApi, pricingPage, layout, data, corporateData, influencerData, blogPage, packageJson] = await Promise.all([
    readFile(new URL("app/page.tsx", root), "utf8"),
    readFile(new URL("app/natasha/page.tsx", root), "utf8"),
    readFile(new URL("components/EditorialHome.tsx", root), "utf8"),
    readFile(new URL("app/api/editorial-feed/route.ts", root), "utf8"),
    readFile(new URL("app/pricing/page.tsx", root), "utf8"),
    readFile(new URL("app/layout.tsx", root), "utf8"),
    readFile(new URL("data/site.ts", root), "utf8"),
    readFile(new URL("data/corporate.ts", root), "utf8"),
    readFile(new URL("data/influencers.ts", root), "utf8"),
    readFile(new URL("app/blog/page.tsx", root), "utf8"),
    readFile(new URL("package.json", root), "utf8"),
  ]);

  assert.match(layout, /<html lang="ru">/);
  assert.match(page, /FreeRUS — медиа, AI-агенты и цифровые продукты/);
  assert.match(page, /href="\/natasha"/);
  assert.match(page, /href="\/ai-agents"/);
  assert.match(natashaPage, /<EditorialHome \/>/);
  assert.match(editorialHome, /Наташа Фри/);
  assert.match(editorialHome, /\/api\/editorial-feed/);
  assert.match(editorialFeedApi, /EDITORIAL_FEED_TOKEN/);
  assert.match(editorialFeedApi, /EDITORIAL_FEED_FILE/);
  assert.match(editorialHome, /AI-платформа/);
  assert.match(editorialHome, /Подтвердить за 1 ₽/);
  assert.match(editorialHome, /Карты — только через лицензированный контур/);
  assert.match(editorialHome, /HIDE MY NAME VPN/);
  assert.match(editorialHome, /Партнёр FreeRUS/);
  assert.match(pricingPage, /Сначала проверка за 1 ₽, потом тариф/);
  assert.match(blogPage, /Наташа Фри/);
  assert.match(data, /vpn-marketing-promises/);
  assert.match(corporateData, /Подготовка инфраструктуры/);
  assert.match(corporateData, /Стоимость рассчитывается после аудита задач и инфраструктуры/);
  assert.match(influencerData, /FreeRUS Platform/);
  assert.match(influencerData, /Агентский проект/);
  assert.match(influencerData, /Редакционный кабинет/);
  assert.match(influencerData, /Медиа-контур/);
  assert.doesNotMatch(`${page}${natashaPage}${editorialHome}${editorialFeedApi}${layout}${packageJson}`, /codex-preview|react-loading-skeleton/i);
  await assert.rejects(access(new URL("app/_sites-preview/SkeletonPreview.tsx", root)));
});

test("contains deployable output, forms, migration and social card", async () => {
  const [
    leadRoute,
    teamRoute,
    businessRoute,
    vpnPilotRoute,
    migration,
    teamMigration,
    corporateMigration,
    aiPage,
    vpnPage,
    vpnForm,
  ] = await Promise.all([
    readFile(new URL("app/api/leads/route.ts", root), "utf8"),
    readFile(new URL("app/api/team-request/route.ts", root), "utf8"),
    readFile(new URL("app/api/business-request/route.ts", root), "utf8"),
    readFile(new URL("app/api/vpn-pilot/route.ts", root), "utf8"),
    readFile(new URL("drizzle/0000_material_inhumans.sql", root), "utf8"),
    readFile(new URL("drizzle/0001_premium_emma_frost.sql", root), "utf8"),
    readFile(new URL("drizzle/0002_magenta_hiroim.sql", root), "utf8"),
    readFile(new URL("app/ai-agents/page.tsx", root), "utf8"),
    readFile(new URL("app/epic-vpn/page.tsx", root), "utf8"),
    readFile(new URL("components/VpnPilotForm.tsx", root), "utf8"),
  ]);

  assert.match(leadRoute, /INSERT OR IGNORE INTO contacts/);
  assert.match(teamRoute, /INSERT INTO team_requests/);
  assert.match(businessRoute, /INSERT INTO business_requests/);
  assert.match(vpnPilotRoute, /INSERT INTO vpn_pilot_requests/);
  assert.match(migration, /CREATE TABLE `contacts`/);
  assert.match(teamMigration, /CREATE TABLE `team_requests`/);
  assert.match(corporateMigration, /CREATE TABLE `business_requests`/);
  assert.match(corporateMigration, /CREATE TABLE `vpn_pilot_requests`/);
  assert.match(aiPage, /DraftFly Approval Center/);
  assert.match(aiPage, /Approve/);
  assert.match(vpnPage, /партнёрский VPN-проект FreeRUS/);
  assert.match(vpnForm, /не является покупкой/);
  await Promise.all([
    access(new URL("dist/server/index.js", root)),
    access(new URL("public/og.png", root)),
    access(new URL("public/og-ai-team.png", root)),
    access(new URL("app/sitemap.ts", root)),
    access(new URL("app/not-found.tsx", root)),
  ]);
});
