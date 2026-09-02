import Link from "next/link";

export function Logo() {
  return (
    <Link className="logo" href="/" aria-label="Интернет без ограничений RUS">
      <span className="logo-top">ИНТЕРНЕТ</span>
      <span className="logo-bottom">
        БЕЗ <i aria-hidden="true">●</i> ОГРАНИЧЕНИЙ <b>RUS</b>
      </span>
      <span className="logo-powered">Powered by EPIC☠️VPN AI</span>
    </Link>
  );
}
