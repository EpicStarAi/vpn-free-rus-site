"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Logo } from "./Logo";

const TRIAL = "https://t.me/FREE_RUS_VPN_BOT?start=trial";

const navigation = [
  ["Тарифы", "/#plans"],
  ["Подключение", "/#connect"],
  ["Скачать", "/#download"],
  ["Вопросы", "/#faq"],
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
            const pathOnly = href.split("#")[0];
            const active = !href.includes("#") && (
              pathOnly === "/"
                ? pathname === "/"
                : pathname === pathOnly || pathname.startsWith(`${pathOnly}/`));

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
        <a className="header-telegram" href={TRIAL}>
          <span aria-hidden="true">↗</span> Тест VPN
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
