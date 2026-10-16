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
      default: "FREE RUS VPN",
      template: "%s — FREE RUS VPN",
    },
    description:
      "FREE RUS VPN: приложения для Android и Windows, инструкции по установке и доступ через Telegram.",
    applicationName: "FREE RUS VPN",
    alternates: {
      canonical: siteConfig.url,
    },
    keywords: ["FREE RUS VPN", "VPN Android", "VPN Windows", "скачать APK", "VPN для компьютера"],
    authors: [{ name: corporateConfig.brand }],
    icons: {
      icon: "/favicon.png",
    },
    openGraph: {
      type: "website",
      locale: "ru_RU",
      siteName: "FREE RUS VPN",
      title: "FREE RUS VPN — Android и Windows",
      description:
        "Приложения FREE RUS VPN для телефона и компьютера. Загрузка и подключение через Telegram.",
      images: [
        {
          url: new URL("/og.png", base).toString(),
          width: 1200,
          height: 630,
          alt: "FREE RUS VPN",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "FREE RUS VPN — Android и Windows",
      description: "Скачайте FREE RUS VPN для Android и Windows.",
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
              "FREE RUS VPN: приложения для Android и Windows, тарифы и помощь с подключением.",
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
            sameAs: ["https://t.me/FREE_RUS_VPN_BOT", "https://t.me/INTERNET_BEZ_GRANIC_RUS"],
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
