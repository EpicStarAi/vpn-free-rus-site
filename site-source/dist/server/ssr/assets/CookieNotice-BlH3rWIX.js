import { T as __toESM, t as require_jsx_runtime, y as require_react } from "../index.js";
import { t as Link } from "./link-CpgkKxO2.js";
//#region components/CookieNotice.tsx
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var import_jsx_runtime = require_jsx_runtime();
var key = "ibo-cookie-choice";
function CookieNotice() {
	const [visible, setVisible] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		const timer = window.setTimeout(() => {
			setVisible(!window.localStorage.getItem(key));
		}, 0);
		return () => window.clearTimeout(timer);
	}, []);
	function choose(value) {
		window.localStorage.setItem(key, value);
		window.dispatchEvent(new CustomEvent("ibo-consent", { detail: value }));
		setVisible(false);
	}
	if (!visible) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
		className: "cookie-notice",
		"aria-label": "Настройки аналитики",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Только полезные cookie" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: ["Сайт хранит ваш выбор и, с согласия, считает обезличенные просмотры без рекламного профилирования. ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
			href: "/privacy",
			children: "Подробнее"
		})] })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "cookie-actions",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				onClick: () => choose("declined"),
				children: "Только необходимые"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				onClick: () => choose("accepted"),
				children: "Разрешить аналитику"
			})]
		})]
	});
}
//#endregion
export { CookieNotice };
