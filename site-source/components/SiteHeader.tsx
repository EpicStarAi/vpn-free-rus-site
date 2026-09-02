"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { siteConfig } from "@/data/site";
import { Logo } from "./Logo";

const navigation = [
  ["Услуги", "/#services"],
  ["Наташа", "/natasha"],
  ["Соцсети", "/social-media"],
  ["AI-агенты", "/ai-agents"],
  ["VPN FREE RUS", "/epic-vpn"],
  ["Кейсы", "/cases"],
  ["Тарифы", "/pricing"],
  ["Медиа", "/blog"],
  ["О компании", "/about"],
] as const;

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="site-header">
      <div className="header-inner">
        <Logo />
        <nav className={open ? "main-nav is-open" : "main-nav"} aria-label="Основная навигация">
          {navigation.map(([label, href]) => {
            const active = href === "/#services"
              ? pathname === "/"
              : pathname === href || pathname.startsWith(`${href}/`);

            return (
              <Link
                key={href}
                href={href}
                className={active ? "active" : undefined}
                onClick={() => setOpen(false)}
              >
                {label}
              </Link>
            );
          })}
        </nav>
        <a className="header-telegram" href={siteConfig.social.telegram}>
          <span aria-hidden="true">↗</span> Telegram
        </a>
        <button
          className={open ? "menu-toggle is-open" : "menu-toggle"}
          type="button"
          aria-label={open ? "Закрыть меню" : "Открыть меню"}
          aria-expanded={open}
          onClick={() => setOpen((value) => !value)}
        >
          <span />
          <span />
        </button>
      </div>
    </header>
  );
}
