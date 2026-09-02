import { T as __toESM, t as require_jsx_runtime, y as require_react } from "../index.js";
import { t as useFormStartedAt } from "./useFormStartedAt-CaVnbIjQ.js";
//#region data/influencers.ts
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var influencerFilters = [
	"Все",
	"Продажи",
	"SMM",
	"Новости",
	"Интернет-магазины",
	"Услуги",
	"Образование",
	"Дизайн",
	"Видео",
	"Поддержка клиентов",
	"Аналитика",
	"Проекты",
	"Редакционный кабинет"
];
var influencers = [
	{
		id: "freerus-agency-project",
		name: "FreeRUS Platform",
		initials: "FR",
		role: "Агентский проект",
		tagline: "Публичная витрина AI-агентства: AI-агенты, соцмедиа-управление, новости и партнёрский VPN-блок в одном контуре.",
		languages: ["Русский"],
		tasks: [
			"Витрина агентства",
			"AI-аудит проекта",
			"Подписочная воронка",
			"Партнёрские блоки"
		],
		industries: [
			"Digital",
			"Медиа",
			"AI-агентство",
			"Инфраструктура"
		],
		examples: [
			"Главная страница AI-агентов",
			"Карточка партнёрского VPN",
			"Путь клиента: ссылка → кабинет → отчёт"
		],
		channels: [
			"Сайт",
			"Telegram",
			"CRM",
			"Новости",
			"Личный кабинет"
		],
		mode: "Гибрид",
		turnaround: "Демо-проект",
		filters: [
			"Проекты",
			"SMM",
			"Новости",
			"Аналитика"
		],
		accent: "green"
	},
	{
		id: "freerus-editorial-cabinet",
		name: "Редакционный кабинет",
		initials: "RC",
		role: "Медиа-контур",
		tagline: "Рабочее место для новостей, источников, брифингов, авторских колонок и контроля редакционных правок.",
		languages: ["Русский"],
		tasks: [
			"Утренний брифинг",
			"Проверка источников",
			"Редакционный архив",
			"Политика исправлений"
		],
		industries: [
			"Медиа",
			"Новости",
			"Аналитика",
			"Авторские проекты"
		],
		examples: [
			"Лента материалов с источниками",
			"Карточка исправления",
			"Фрагмент платного разбора"
		],
		channels: [
			"Сайт",
			"Telegram",
			"Новости",
			"Email",
			"Архив"
		],
		mode: "Гибрид",
		turnaround: "Редакционный режим",
		filters: [
			"Редакционный кабинет",
			"Проекты",
			"Новости",
			"Аналитика"
		],
		accent: "blue"
	},
	{
		id: "natasha-free",
		name: "Наташа Фри",
		initials: "NF",
		role: "AI-ведущая",
		tagline: "Лицо бренда для новостей, объясняющих видео и регулярных рубрик.",
		languages: ["Русский", "Английский"],
		tasks: [
			"Новостные выпуски",
			"Короткие видео",
			"Презентация бренда",
			"Ответы аудитории"
		],
		industries: [
			"Медиа",
			"Технологии",
			"Образование"
		],
		examples: [
			"Сценарий еженедельного дайджеста",
			"Вертикальный видеоразбор",
			"Анонс продукта"
		],
		channels: [
			"YouTube",
			"Shorts",
			"Reels",
			"TikTok",
			"Telegram"
		],
		mode: "Гибрид",
		turnaround: "Первый черновик от 4 часов",
		filters: [
			"Новости",
			"Видео",
			"Образование"
		],
		accent: "blue"
	},
	{
		id: "mark-vector",
		name: "Марк Вектор",
		initials: "MV",
		role: "AI-SMM-менеджер",
		tagline: "Собирает контент-систему и адаптирует одну идею под несколько площадок.",
		languages: [
			"Русский",
			"Английский",
			"Испанский"
		],
		tasks: [
			"Контент-план",
			"Рубрикатор",
			"Адаптация постов",
			"План публикаций"
		],
		industries: [
			"Услуги",
			"E-commerce",
			"Образование"
		],
		examples: [
			"Контент-план на 30 дней",
			"Пакет постов для запуска",
			"Матрица рубрик"
		],
		channels: [
			"Telegram",
			"Instagram",
			"Facebook",
			"LinkedIn",
			"Pinterest"
		],
		mode: "AI",
		turnaround: "План от 2 часов",
		filters: [
			"SMM",
			"Интернет-магазины",
			"Услуги",
			"Образование"
		],
		accent: "cyan"
	},
	{
		id: "leya-text",
		name: "Лея Текст",
		initials: "LT",
		role: "AI-копирайтер",
		tagline: "Пишет в голосе бренда: от карточки товара до цепочки писем.",
		languages: [
			"Русский",
			"Английский",
			"Немецкий"
		],
		tasks: [
			"Посты",
			"Сценарии",
			"Письма",
			"Карточки товаров",
			"Ответы клиентам"
		],
		industries: [
			"E-commerce",
			"SaaS",
			"Экспертные услуги"
		],
		examples: [
			"Описание линейки товаров",
			"Welcome-цепочка",
			"Сценарий продающего видео"
		],
		channels: [
			"Сайт",
			"Email",
			"Telegram",
			"Соцсети",
			"CRM"
		],
		mode: "AI",
		turnaround: "Черновик от 30 минут",
		filters: [
			"Продажи",
			"SMM",
			"Интернет-магазины",
			"Услуги"
		],
		accent: "violet"
	},
	{
		id: "nika-pixel",
		name: "Ника Пиксель",
		initials: "NP",
		role: "AI-дизайнер",
		tagline: "Превращает бренд-систему в масштабируемый набор визуальных материалов.",
		languages: ["Русский", "Английский"],
		tasks: [
			"Обложки",
			"Баннеры",
			"Карточки товаров",
			"Шаблоны",
			"Иллюстрации"
		],
		industries: [
			"E-commerce",
			"Медиа",
			"Образование",
			"Услуги"
		],
		examples: [
			"Серия обложек",
			"Карточка маркетплейса",
			"Шаблоны для соцсетей"
		],
		channels: [
			"Сайт",
			"Соцсети",
			"Маркетплейсы",
			"Email",
			"Презентации"
		],
		mode: "Гибрид",
		turnaround: "Концепция от 4 часов",
		filters: [
			"Дизайн",
			"SMM",
			"Интернет-магазины",
			"Образование"
		],
		accent: "orange"
	},
	{
		id: "max-frame",
		name: "Макс Кадр",
		initials: "MK",
		role: "AI-видеопродюсер",
		tagline: "Ведёт ролик от идеи и раскадровки до субтитров и вариантов монтажа.",
		languages: ["Русский", "Английский"],
		tasks: [
			"Сценарии",
			"Раскадровки",
			"Субтитры",
			"Короткие ролики",
			"Монтажные версии"
		],
		industries: [
			"Медиа",
			"Образование",
			"SaaS",
			"E-commerce"
		],
		examples: [
			"Пакет из 10 Shorts",
			"Раскадровка демо",
			"Адаптация длинного выпуска"
		],
		channels: [
			"YouTube",
			"Shorts",
			"Reels",
			"TikTok",
			"Реклама"
		],
		mode: "Гибрид",
		turnaround: "Сценарий от 2 часов",
		filters: [
			"Видео",
			"Новости",
			"Образование",
			"Интернет-магазины"
		],
		accent: "red"
	},
	{
		id: "asya-lead",
		name: "Ася Лид",
		initials: "AL",
		role: "AI-менеджер продаж",
		tagline: "Собирает контекст обращения и готовит следующий шаг для оператора.",
		languages: ["Русский", "Английский"],
		tasks: [
			"Квалификация запросов",
			"Заполнение CRM",
			"Черновики ответов",
			"Follow-up"
		],
		industries: [
			"Услуги",
			"SaaS",
			"Образование",
			"E-commerce"
		],
		examples: [
			"Карточка квалифицированного лида",
			"Ответ на входящий запрос",
			"Follow-up после встречи"
		],
		channels: [
			"Email",
			"CRM",
			"Чат сайта",
			"Мессенджеры"
		],
		mode: "Гибрид",
		turnaround: "Черновик от 5 минут",
		filters: [
			"Продажи",
			"Поддержка клиентов",
			"Услуги",
			"Интернет-магазины"
		],
		accent: "green"
	},
	{
		id: "roman-metric",
		name: "Роман Метрика",
		initials: "RM",
		role: "AI-аналитик",
		tagline: "Связывает контент, обращения и продажи в отчёт с понятными действиями.",
		languages: ["Русский", "Английский"],
		tasks: [
			"Контент-аналитика",
			"Воронка обращений",
			"Рекламные показатели",
			"Рекомендации"
		],
		industries: [
			"E-commerce",
			"SaaS",
			"Медиа",
			"Услуги"
		],
		examples: [
			"Еженедельный отчёт",
			"Разбор воронки",
			"Список следующих экспериментов"
		],
		channels: [
			"CRM",
			"Аналитика",
			"Реклама",
			"Соцсети",
			"Email"
		],
		mode: "AI",
		turnaround: "Отчёт от 1 часа",
		filters: [
			"Аналитика",
			"Продажи",
			"SMM",
			"Интернет-магазины"
		],
		accent: "blue"
	},
	{
		id: "eva-reputation",
		name: "Ева Репутация",
		initials: "ER",
		role: "AI-репутационный менеджер",
		tagline: "Сортирует обратную связь и готовит спокойные ответы без эскалации.",
		languages: [
			"Русский",
			"Английский",
			"Французский"
		],
		tasks: [
			"Мониторинг упоминаний",
			"Классификация отзывов",
			"Черновики ответов",
			"Эскалация"
		],
		industries: [
			"Услуги",
			"E-commerce",
			"Образование",
			"Гостеприимство"
		],
		examples: [
			"Сводка отзывов",
			"Ответ на претензию",
			"Карта репутационных рисков"
		],
		channels: [
			"Карты",
			"Маркетплейсы",
			"Соцсети",
			"Служба поддержки"
		],
		mode: "Гибрид",
		turnaround: "Сводка от 30 минут",
		filters: [
			"Поддержка клиентов",
			"Аналитика",
			"Услуги",
			"Интернет-магазины"
		],
		accent: "violet"
	},
	{
		id: "human-specialist",
		name: "Живой специалист",
		initials: "H+",
		role: "Редактор и оператор",
		tagline: "Контролирует AI, принимает сложные решения и отвечает за финальный результат.",
		languages: ["По задаче и рынку"],
		tasks: [
			"Редактура",
			"Маркетинговая стратегия",
			"Дизайн-контроль",
			"Работа с клиентами"
		],
		industries: ["Подбирается под проект"],
		examples: [
			"Финальная редактура",
			"Разбор кампании",
			"Работа со спорным обращением"
		],
		channels: ["Все согласованные каналы"],
		mode: "Специалист",
		turnaround: "По SLA проекта",
		filters: [
			"Продажи",
			"SMM",
			"Новости",
			"Дизайн",
			"Видео",
			"Поддержка клиентов",
			"Аналитика"
		],
		accent: "silver"
	}
];
//#endregion
//#region components/AIInfluencerCatalog.tsx
var import_jsx_runtime = require_jsx_runtime();
function AIInfluencerCatalog() {
	const [filter, setFilter] = (0, import_react.useState)("Все");
	const [selected, setSelected] = (0, import_react.useState)([]);
	const [dialog, setDialog] = (0, import_react.useState)(null);
	const [formState, setFormState] = (0, import_react.useState)("idle");
	const [formMessage, setFormMessage] = (0, import_react.useState)("");
	const { getStartedAt } = useFormStartedAt();
	const visible = (0, import_react.useMemo)(() => filter === "Все" ? influencers : influencers.filter((influencer) => influencer.filters.includes(filter)), [filter]);
	const selectedInfluencers = influencers.filter((item) => selected.includes(item.id));
	(0, import_react.useEffect)(() => {
		const close = (event) => {
			if (event.key === "Escape") setDialog(null);
		};
		window.addEventListener("keydown", close);
		return () => window.removeEventListener("keydown", close);
	}, []);
	function toggle(id) {
		setSelected((current) => current.includes(id) ? current.filter((item) => item !== id) : [...current, id]);
	}
	async function submit(event) {
		event.preventDefault();
		setFormState("sending");
		setFormMessage("");
		const form = event.currentTarget;
		const payload = Object.fromEntries(new FormData(form));
		try {
			const response = await fetch("/api/team-request", {
				method: "POST",
				headers: { "content-type": "application/json" },
				body: JSON.stringify({
					...payload,
					roles: selectedInfluencers.map((item) => item.role),
					startedAt: getStartedAt()
				})
			});
			const result = await response.json();
			if (!response.ok) throw new Error(result.message || "Не удалось отправить заявку.");
			setFormState("success");
			setFormMessage("Заявка принята. Мы уточним задачу и доступный рабочий контур.");
			form.reset();
			setSelected([]);
		} catch (error) {
			setFormState("error");
			setFormMessage(error instanceof Error ? error.message : "Попробуйте ещё раз.");
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "ai-catalog",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "ai-filter-row",
				"aria-label": "Фильтр AI-инфлюенсеров",
				children: influencerFilters.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					className: filter === item ? "active" : void 0,
					onClick: () => setFilter(item),
					children: item
				}, item))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "ai-grid",
				children: visible.map((influencer) => {
					const isSelected = selected.includes(influencer.id);
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
						className: "ai-card",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: `ai-avatar avatar-${influencer.accent}`,
								"aria-hidden": "true",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: influencer.initials }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", {})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "ai-card-topline",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: influencer.mode }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: influencer.turnaround })]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: influencer.name }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: influencer.role }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: influencer.tagline }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
								className: "ai-card-facts",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", { children: "Языки" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", { children: influencer.languages.join(" · ") })] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", { children: "Отрасли" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", { children: influencer.industries.join(" · ") })] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", { children: "Каналы" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", { children: influencer.channels.join(" · ") })] })
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "ai-tasks",
								children: influencer.tasks.slice(0, 3).map((task) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: task }, task))
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "ai-card-actions",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									className: isSelected ? "ai-add selected" : "ai-add",
									onClick: () => toggle(influencer.id),
									children: isSelected ? "В команде ✓" : "Добавить в команду"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									className: "ai-demo",
									onClick: () => setDialog({
										type: "demo",
										influencer
									}),
									children: "Посмотреть демо"
								})]
							})
						]
					}, influencer.id);
				})
			}),
			selected.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
				className: "team-builder",
				"aria-label": "Собранная команда",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Ваша команда" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: selectedInfluencers.map((item) => item.name).join(", ") })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					onClick: () => {
						setFormState("idle");
						setDialog({ type: "request" });
					},
					children: ["Обсудить запуск · ", selected.length]
				})]
			}),
			dialog && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "dialog-backdrop",
				role: "presentation",
				onMouseDown: () => setDialog(null),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "ai-dialog",
					role: "dialog",
					"aria-modal": "true",
					"aria-label": dialog.type === "demo" ? `Демо: ${dialog.influencer.name}` : "Заявка на AI-команду",
					onMouseDown: (event) => event.stopPropagation(),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						className: "dialog-close",
						type: "button",
						onClick: () => setDialog(null),
						"aria-label": "Закрыть",
						children: "×"
					}), dialog.type === "demo" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "eyebrow",
							children: "Демонстрационный контур"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: dialog.influencer.name }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: dialog.influencer.tagline }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "demo-output",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Примеры результата" }), dialog.influencer.examples.map((example, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: String(index + 1).padStart(2, "0") }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: example }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: "Черновик → проверка владельца → действие" })
							] }, example))]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							className: "button button-primary",
							type: "button",
							onClick: () => {
								if (!selected.includes(dialog.influencer.id)) toggle(dialog.influencer.id);
								setDialog(null);
							},
							children: "Добавить в команду"
						})
					] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "eyebrow",
							children: "Диагностика проекта"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "Соберём рабочий контур" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Сначала уточним страну работы, площадки, роли и уровень доступа. Никаких автоматических публикаций без согласования." }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "selected-team-list",
							children: selectedInfluencers.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
								item.name,
								" · ",
								item.role
							] }, item.id))
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
							className: "team-request-form",
							onSubmit: submit,
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Имя" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									name: "name",
									maxLength: 80,
									required: true
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Компания или проект" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									name: "company",
									maxLength: 120,
									required: true
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Email или Telegram" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									name: "contact",
									maxLength: 160,
									required: true
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
									className: "honeypot",
									"aria-hidden": "true",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Сайт" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										name: "website",
										tabIndex: -1,
										autoComplete: "off"
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
									className: "consent-check",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										name: "consent",
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
									disabled: formState === "sending",
									children: formState === "sending" ? "Отправляем…" : "Запросить консультацию"
								}),
								formMessage && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: `form-message ${formState}`,
									role: "status",
									children: formMessage
								})
							]
						})
					] })]
				})
			})
		]
	});
}
//#endregion
export { AIInfluencerCatalog };
