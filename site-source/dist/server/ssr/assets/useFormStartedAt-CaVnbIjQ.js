import { T as __toESM, y as require_react } from "../index.js";
//#region components/useFormStartedAt.ts
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
function useFormStartedAt() {
	const startedAtRef = (0, import_react.useRef)(0);
	(0, import_react.useEffect)(() => {
		startedAtRef.current = Date.now();
	}, []);
	return {
		getStartedAt: (0, import_react.useCallback)(() => startedAtRef.current, []),
		restart: (0, import_react.useCallback)(() => {
			startedAtRef.current = Date.now();
		}, [])
	};
}
//#endregion
export { useFormStartedAt as t };
