import { T as __toESM, c as usePathname, y as require_react } from "../index.js";
//#region components/Analytics.tsx
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var key = "ibo-cookie-choice";
function Analytics() {
	const pathname = usePathname();
	(0, import_react.useEffect)(() => {
		let sent = false;
		const send = () => {
			if (sent || window.localStorage.getItem(key) !== "accepted") return;
			sent = true;
			const body = JSON.stringify({ path: pathname });
			if (navigator.sendBeacon) navigator.sendBeacon("/api/analytics", new Blob([body], { type: "application/json" }));
			else fetch("/api/analytics", {
				method: "POST",
				headers: { "content-type": "application/json" },
				body,
				keepalive: true
			});
		};
		send();
		window.addEventListener("ibo-consent", send);
		return () => window.removeEventListener("ibo-consent", send);
	}, [pathname]);
	return null;
}
//#endregion
export { Analytics };
