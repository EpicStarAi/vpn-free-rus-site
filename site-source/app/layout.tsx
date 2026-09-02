import type { Metadata, Viewport } from "next";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { Analytics } from "@/components/Analytics";
import { CookieNotice } from "@/components/CookieNotice";
import { JsonLd } from "@/components/JsonLd";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { corporateConfig } from "@/data/corporate";
import { siteConfig } from "@/data/site";
import "./globals.css";

function getRequestOrigin(requestHeaders: Headers) {
  const host =
    requestHeaders.get("x-forwarded-host") ??
    requestHeaders.get("host") ??
    "localhost:3000";
  const isLocalHost =
    host.includes("localhost") ||
    host.startsWith("127.0.0.1") ||
    host.includes(".internal");
  const protocol = isLocalHost
    ? "http"
    : requestHeaders.get("x-forwarded-proto") ?? "https";

  return { host, isLocalHost, protocol };
}

export const viewport: Viewport = {
  themeColor: "#080b0f",
  colorScheme: "dark",
};

export async function generateMetadata(): Promise<Metadata> {
  const requestHeaders = await headers();
  const { host, isLocalHost, protocol } = getRequestOrigin(requestHeaders);
  const base = isLocalHost ? new URL(`${protocol}://${host}`) : new URL(siteConfig.url);

  return {
    metadataBase: base,
    title: {
      default: "Интернет без ограничений RUS",
      template: "%s — Интернет без ограничений RUS",
    },
    description:
      "Digital-агентство и технологический центр в Москве: удалённый отдел продаж и маркетинга, ведение социальных сетей, CRM, AI-агенты и автоматизация бизнеса.",
    applicationName: "Интернет без ограничений RUS",
    alternates: {
      canonical: siteConfig.url,
    },
    keywords: [
      "digital-агентство Москва",
      "удалённый отдел маркетинга",
      "удалённый отдел продаж",
      "ведение социальных сетей Москва",
      "автоматизация бизнеса",
      "внедрение AI в бизнес",
      "настройка CRM",
      "AI-агенты для бизнеса",
      "создание Telegram-ботов",
      "digital-трансформация бизнеса",
      "контент для социальных сетей",
      "корпоративный VPN",
      "защищённая удалённая работа",
    ],
    authors: [{ name: corporateConfig.brand }],
    icons: {
      icon: "/favicon.png",
    },
    openGraph: {
      type: "website",
      locale: "ru_RU",
      siteName: "Интернет без ограничений RUS",
      title: "Интернет без ограничений RUS",
      description:
        "Ваш удалённый отдел продаж, маркетинга и цифровизации в Москве и по всей России.",
      images: [
        {
          url: new URL("/og.png", base).toString(),
          width: 1200,
          height: 630,
          alt: "Интернет без ограничений RUS",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "Интернет без ограничений RUS",
      description: "Продажи, маркетинг и AI в одном рабочем контуре.",
      images: [new URL("/og.png", base).toString()],
    },
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const requestHeaders = await headers();
  const { host, isLocalHost, protocol } = getRequestOrigin(requestHeaders);
  const normalizedHost = host.split(":")[0]?.toLowerCase() ?? host;
  const pathname = requestHeaders.get("x-forwarded-uri") ?? "/";

  if (!isLocalHost && (protocol !== "https" || normalizedHost === "www.freerus.site")) {
    redirect(`https://freerus.site${pathname}`);
  }

  const siteUrl = isLocalHost ? `${protocol}://${host}` : siteConfig.url;

  return (
    <html lang="ru">
      <body>
        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@type": "Organization",
            name: corporateConfig.brand,
            url: siteUrl,
            email: corporateConfig.email,
            description:
              "Технологический и digital-центр: продажи, маркетинг, социальные сети, CRM, AI и автоматизация бизнеса.",
            address: {
              "@type": "PostalAddress",
              addressLocality: "Москва",
              addressCountry: "RU",
            },
            areaServed: ["Москва", "Московская область", "Россия"],
            contactPoint: {
              "@type": "ContactPoint",
              contactType: "customer support",
              email: corporateConfig.email,
              availableLanguage: "Russian",
            },
            sameAs: Object.values(siteConfig.social),
          }}
        />
        <a className="skip-link" href="#main">
          Перейти к содержанию
        </a>
        <SiteHeader />
        {children}
        <SiteFooter />
        <CookieNotice />
        <Analytics />
      </body>
    </html>
  );
}
