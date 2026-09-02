import { T as __toESM, c as usePathname, t as require_jsx_runtime, y as require_react } from "../index.js";
import { t as siteConfig } from "./site-DZI9i1H-.js";
import { t as Link } from "./link-CpgkKxO2.js";
//#region components/Logo.tsx
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var import_jsx_runtime = require_jsx_runtime();
function Logo() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
		className: "logo",
		href: "/",
		"aria-label": "Интернет без ограничений RUS",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "logo-top",
				children: "ИНТЕРНЕТ"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
				className: "logo-bottom",
				children: [
					"БЕЗ ",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", {
						"aria-hidden": "true",
						children: "●"
					}),
					" ОГРАНИЧЕНИЙ ",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: "RUS" })
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "logo-powered",
				children: "Powered by EPIC☠️VPN AI"
			})
		]
	});
}
//#endregion
//#region components/SiteHeader.tsx
var navigation = [
	["Услуги", "/#services"],
	["Наташа", "/natasha"],
	["Соцсети", "/social-media"],
	["AI-агенты", "/ai-agents"],
	["VPN FREE RUS", "/epic-vpn"],
	["Кейсы", "/cases"],
	["Тарифы", "/pricing"],
	["Медиа", "/blog"],
	["О компании", "/about"]
];
function SiteHeader() {
	const [open, setOpen] = (0, import_react.useState)(false);
	const pathname = usePathname();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("header", {
		className: "site-header",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "header-inner",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Logo, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
					className: open ? "main-nav is-open" : "main-nav",
					"aria-label": "Основная навигация",
					children: navigation.map(([label, href]) => {
						return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							href,
							className: (href === "/#services" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`)) ? "active" : void 0,
							onClick: () => setOpen(false),
							children: label
						}, href);
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
					className: "header-telegram",
					href: siteConfig.social.telegram,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						"aria-hidden": "true",
						children: "↗"
					}), " Telegram"]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					className: open ? "menu-toggle is-open" : "menu-toggle",
					type: "button",
					"aria-label": open ? "Закрыть меню" : "Открыть меню",
					"aria-expanded": open,
					onClick: () => setOpen((value) => !value),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {})]
				})
			]
		})
	});
}
//#endregion
export { SiteHeader };
