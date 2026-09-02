import { T as __toESM, t as require_jsx_runtime, y as require_react } from "../index.js";
import { t as useFormStartedAt } from "./useFormStartedAt-CaVnbIjQ.js";
//#region components/SubscribeForm.tsx
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var import_jsx_runtime = require_jsx_runtime();
function SubscribeForm() {
	const [status, setStatus] = (0, import_react.useState)("");
	const [sending, setSending] = (0, import_react.useState)(false);
	const { getStartedAt, restart } = useFormStartedAt();
	async function submit(event) {
		event.preventDefault();
		setSending(true);
		setStatus("");
		const form = event.currentTarget;
		const data = Object.fromEntries(new FormData(form));
		try {
			if (!(await fetch("/api/subscribe", {
				method: "POST",
				headers: { "content-type": "application/json" },
				body: JSON.stringify({
					...data,
					startedAt: getStartedAt()
				})
			})).ok) throw new Error();
			form.reset();
			setStatus("Вы в списке. Спасибо!");
			restart();
		} catch {
			setStatus("Не получилось отправить. Попробуйте позже.");
		} finally {
			setSending(false);
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
		className: "subscribe-form",
		onSubmit: submit,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "sr-only",
				children: "Email или Telegram"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
				name: "contact",
				placeholder: "Email или @username",
				maxLength: 160,
				required: true
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
				className: "honeypot",
				name: "website",
				tabIndex: -1,
				autoComplete: "off"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "submit",
				disabled: sending,
				"aria-label": "Подписаться",
				children: sending ? "…" : "→"
			}),
			status && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", {
				role: "status",
				children: status
			})
		]
	});
}
//#endregion
export { SubscribeForm };
