import { T as __toESM, t as require_jsx_runtime, y as require_react } from "../index.js";
import { t as Link } from "./link-CpgkKxO2.js";
//#region components/ArticleCard.tsx
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var import_jsx_runtime = require_jsx_runtime();
function ArticleCard({ post, featured = false }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
		className: featured ? "article-card featured" : "article-card",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
			className: `article-visual visual-${post.accent}`,
			href: `/articles/${post.slug}`,
			"aria-label": `Читать: ${post.title}`,
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "visual-grid",
					"aria-hidden": "true"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: post.visual }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: post.tags[0] })
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "article-body",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "article-meta",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: post.category }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("time", {
						dateTime: post.date,
						children: post.displayDate
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					href: `/articles/${post.slug}`,
					children: post.title
				}) }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: post.description }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "article-footer",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "fact-check",
						children: "✓ Факты проверены"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						href: `/articles/${post.slug}`,
						children: ["Читать ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							"aria-hidden": "true",
							children: "→"
						})]
					})]
				})
			]
		})]
	});
}
//#endregion
//#region components/NewsExplorer.tsx
function NewsExplorer({ initialPosts }) {
	const [query, setQuery] = (0, import_react.useState)("");
	const [category, setCategory] = (0, import_react.useState)("Все");
	const categories = ["Все", ...new Set(initialPosts.map((post) => post.category))];
	const normalized = query.trim().toLocaleLowerCase("ru");
	const visible = (0, import_react.useMemo)(() => initialPosts.filter((post) => {
		const inCategory = category === "Все" || post.category === category;
		const searchable = `${post.title} ${post.description} ${post.category} ${post.tags.join(" ")}`;
		return inCategory && (!normalized || searchable.toLocaleLowerCase("ru").includes(normalized));
	}), [
		category,
		initialPosts,
		normalized
	]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "news-explorer",
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
							children: "Поиск по материалам"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "search",
							value: query,
							onChange: (event) => setQuery(event.target.value),
							placeholder: "Тема, категория или ключевое слово"
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "filter-row",
					"aria-label": "Фильтр по категориям",
					children: categories.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: category === item ? "active" : void 0,
						onClick: () => setCategory(item),
						children: item
					}, item))
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "results-count",
				children: ["Материалов: ", visible.length]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "article-grid article-grid-listing",
				children: visible.map((post) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArticleCard, { post }, post.slug))
			}),
			visible.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "empty-state",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "По вашему запросу материалов пока нет" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Измените формулировку или выберите другую категорию." })]
			})
		]
	});
}
//#endregion
export { NewsExplorer };
