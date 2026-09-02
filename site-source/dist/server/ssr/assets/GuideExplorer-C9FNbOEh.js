import { T as __toESM, t as require_jsx_runtime, y as require_react } from "../index.js";
import { t as Link } from "./link-CpgkKxO2.js";
//#region components/GuideExplorer.tsx
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var import_jsx_runtime = require_jsx_runtime();
function GuideExplorer({ initialGuides, compact = false }) {
	const [query, setQuery] = (0, import_react.useState)("");
	const [category, setCategory] = (0, import_react.useState)("Все");
	const categories = ["Все", ...new Set(initialGuides.map((guide) => guide.category))];
	const normalized = query.trim().toLocaleLowerCase("ru");
	const visible = (0, import_react.useMemo)(() => initialGuides.filter((guide) => {
		const inCategory = category === "Все" || guide.category === category;
		const inSearch = !normalized || `${guide.title} ${guide.description} ${guide.category}`.toLocaleLowerCase("ru").includes(normalized);
		return inCategory && inSearch;
	}), [
		category,
		initialGuides,
		normalized
	]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "guide-explorer",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "guide-tools",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					className: "search-field",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							"aria-hidden": "true",
							children: "⌕"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "sr-only",
							children: "Поиск по инструкциям"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "search",
							value: query,
							onChange: (event) => setQuery(event.target.value),
							placeholder: "Найти инструкцию"
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "filter-row",
					"aria-label": "Фильтр по категориям",
					children: categories.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: item === category ? "active" : void 0,
						onClick: () => setCategory(item),
						children: item
					}, item))
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "guide-grid",
				children: visible.slice(0, compact ? 6 : void 0).map((guide, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
					className: "guide-card",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "guide-number",
							children: String(index + 1).padStart(2, "0")
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "guide-category",
							children: guide.category
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: guide.title }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: guide.description }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "guide-meta",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: guide.time }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: guide.level })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							href: `/instructions/${guide.slug}`,
							"aria-label": `Открыть: ${guide.title}`,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								"aria-hidden": "true",
								children: "→"
							})
						})
					]
				}, guide.slug))
			}),
			visible.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "empty-state",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Ничего не нашлось" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Попробуйте другой запрос или сбросьте выбранную категорию." }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: () => {
							setQuery("");
							setCategory("Все");
						},
						children: "Сбросить фильтры"
					})
				]
			})
		]
	});
}
//#endregion
export { GuideExplorer };
