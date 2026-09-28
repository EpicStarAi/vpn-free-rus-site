import Link from "next/link";
import { Logo } from "./Logo";

export function SiteFooter() {
  return (
    <footer className="vpn-sales-footer">
      <div className="section-shell">
        <div><Logo /><p>VPN для Android и Windows.</p><span>© 2026 FREE RUS VPN</span></div>
        <div className="vpn-sales-footer-links"><a href="https://t.me/FREE_RUS_VPN_BOT">Telegram-бот</a><a href="mailto:internetbezogranicheniy@gmail.com">internetbezogranicheniy@gmail.com</a><Link href="/privacy">Конфиденциальность</Link><Link href="/terms">Пользовательское соглашение</Link><Link href="/refunds">Правила возврата</Link></div>
      </div>
    </footer>
  );
}
