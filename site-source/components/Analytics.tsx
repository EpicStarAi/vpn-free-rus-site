"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

const key = "ibo-cookie-choice";

export function Analytics() {
  const pathname = usePathname();

  useEffect(() => {
    let sent = false;
    const send = () => {
      if (sent || window.localStorage.getItem(key) !== "accepted") return;
      sent = true;
      const body = JSON.stringify({ path: pathname });
      if (navigator.sendBeacon) {
        navigator.sendBeacon("/api/analytics", new Blob([body], { type: "application/json" }));
      } else {
        void fetch("/api/analytics", {
          method: "POST",
          headers: { "content-type": "application/json" },
          body,
          keepalive: true,
        });
      }
    };
    send();
    window.addEventListener("ibo-consent", send);
    return () => window.removeEventListener("ibo-consent", send);
  }, [pathname]);

  return null;
}
