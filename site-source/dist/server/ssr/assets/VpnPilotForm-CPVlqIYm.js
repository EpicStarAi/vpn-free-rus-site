import { T as __toESM, t as require_jsx_runtime, y as require_react } from "../index.js";
//#region components/VpnPilotForm.tsx
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var import_jsx_runtime = require_jsx_runtime();
var plans = {
	trial: {
		label: "Тест 3 дня",
		rubles: "0 ₽",
		start: "trial"
	},
	month: {
		label: "Первый месяц",
		rubles: "149 ₽",
		start: "buy_month"
	},
	year: {
		label: "Годовой доступ",
		rubles: "1 490 ₽",
		start: "buy_year"
	}
};
function VpnPilotForm() {
	const [plan, setPlan] = (0, import_react.useState)("trial");
	function submit(event) {
		event.preventDefault();
		window.location.assign(`https://t.me/FREE_RUS_VPN_BOT?start=${plans[plan].start}`);
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
		className: "vpn-pilot-form",
		onSubmit: submit,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Корзина VPN FREE RUS" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "Оформить доступ" })] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Тариф" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
				value: plan,
				onChange: (event) => setPlan(event.target.value),
				children: Object.entries(plans).map(([key, item]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("option", {
					value: key,
					children: [
						item.label,
						" — ",
						item.rubles
					]
				}, key))
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "vpn-cart-total",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "К оплате на сайте" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: plans[plan].rubles })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
				className: "consent-check",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					type: "checkbox",
					required: true
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["Согласен с ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
					href: "/privacy",
					children: "политикой конфиденциальности"
				})] })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				className: "button button-primary",
				type: "submit",
				children: "Перейти к оплате"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: "Оплата проходит в Telegram Stars. До оплаты бот покажет итоговую сумму в Stars и условия доступа." })
		]
	});
}
//#endregion
export { VpnPilotForm };
