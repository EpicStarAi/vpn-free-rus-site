import { T as __toESM, t as require_jsx_runtime, y as require_react } from "../index.js";
import { t as Link } from "./link-CpgkKxO2.js";
//#region components/ConfigurationCalculator.tsx
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var import_jsx_runtime = require_jsx_runtime();
var modules = [
	["sales", "Продажи и CRM"],
	["marketing", "Маркетинг"],
	["social", "Социальные сети"],
	["ai", "AI-агенты"],
	["analytics", "Аналитика"]
];
function ConfigurationCalculator() {
	const [selected, setSelected] = (0, import_react.useState)(["sales"]);
	const [channels, setChannels] = (0, import_react.useState)("1");
	const [integrations, setIntegrations] = (0, import_react.useState)("none");
	const profile = (0, import_react.useMemo)(() => {
		const score = selected.length + (channels === "4+" ? 2 : channels === "2-3" ? 1 : 0) + (integrations === "several" ? 2 : integrations === "one" ? 1 : 0);
		if (score <= 2) return [
			"Базовый пилот",
			"Одна проектная группа",
			"Аудит → настройка → контроль"
		];
		if (score <= 5) return [
			"Расширенный контур",
			"Несколько компетенций",
			"Нужна карта интеграций"
		];
		return [
			"Индивидуальный контур",
			"Кросс-функциональная команда",
			"Нужен технический аудит"
		];
	}, [
		channels,
		integrations,
		selected.length
	]);
	function toggle(value) {
		setSelected((current) => current.includes(value) ? current.filter((item) => item !== value) : [...current, value]);
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "configuration-calculator",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "calculator-controls",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("fieldset", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("legend", { children: "Нужные модули" }), modules.map(([value, label]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					type: "checkbox",
					checked: selected.includes(value),
					onChange: () => toggle(value)
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: label })] }, value))] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Количество рабочих каналов" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
					value: channels,
					onChange: (event) => setChannels(event.target.value),
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: "1",
							children: "Один"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: "2-3",
							children: "2–3"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: "4+",
							children: "4 и более"
						})
					]
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Интеграции" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
					value: integrations,
					onChange: (event) => setIntegrations(event.target.value),
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: "none",
							children: "Пока нет"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: "one",
							children: "Одна действующая система"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: "several",
							children: "Несколько систем"
						})
					]
				})] })
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "calculator-result",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Предварительная комплектация" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: profile[0] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: profile[1] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: profile[2] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", { children: selected.length ? selected.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: ["✓ ", modules.find(([value]) => value === item)?.[1]] }, item)) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Выберите хотя бы один модуль" }) }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: "Это не расчёт цены и не коммерческое предложение. Стоимость рассчитывается после аудита задач и инфраструктуры." }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					className: "button button-primary",
					href: "/contacts?service=complex",
					children: "Уточнить комплектацию"
				})
			]
		})]
	});
}
//#endregion
export { ConfigurationCalculator };
