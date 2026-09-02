import { t as require_jsx_runtime } from "../index.js";
//#region app/error.tsx
var import_jsx_runtime = require_jsx_runtime();
function ErrorPage({ reset }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		id: "main",
		className: "system-page",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "system-code",
				children: "500"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "eyebrow",
				children: "Сигнал прервался"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", { children: "Что-то пошло не так" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Мы уже знаем, как неприятно видеть такую страницу. Попробуйте ещё раз." }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				className: "button button-primary",
				type: "button",
				onClick: reset,
				children: "Повторить"
			})
		]
	});
}
//#endregion
export { ErrorPage as default };
