"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "@phosphor-icons/react/dist/csr/ArrowRight";
import { ArrowSquareOut } from "@phosphor-icons/react/dist/csr/ArrowSquareOut";
import { CaretDown } from "@phosphor-icons/react/dist/csr/CaretDown";
import { CheckCircle } from "@phosphor-icons/react/dist/csr/CheckCircle";
import { CreditCard } from "@phosphor-icons/react/dist/csr/CreditCard";
import { EnvelopeSimple } from "@phosphor-icons/react/dist/csr/EnvelopeSimple";
import { FileText } from "@phosphor-icons/react/dist/csr/FileText";
import { ListChecks } from "@phosphor-icons/react/dist/csr/ListChecks";
import { MagnifyingGlass } from "@phosphor-icons/react/dist/csr/MagnifyingGlass";
import { NotePencil } from "@phosphor-icons/react/dist/csr/NotePencil";
import { PencilSimple } from "@phosphor-icons/react/dist/csr/PencilSimple";
import { Robot } from "@phosphor-icons/react/dist/csr/Robot";
import { Scales } from "@phosphor-icons/react/dist/csr/Scales";
import { Shield } from "@phosphor-icons/react/dist/csr/Shield";
import { ShieldCheck } from "@phosphor-icons/react/dist/csr/ShieldCheck";
import { fallbackEditorialUpdates, type EditorialUpdate } from "@/data/editorial-feed";
import { useEffect, useState } from "react";

const workPrinciples = [
  [ShieldCheck, "Проверяем первоисточники"],
  [Scales, "Сопоставляем факты"],
  [FileText, "Контекст прежде выводов"],
  [PencilSimple, "Исправляем ошибки публично"],
] as const;

const subscriptionBenefits = [
  "Пробный доступ после подтверждения карты",
  "AI-анализ сайта, проекта или соцсети",
  "Редакционный план и список слабых мест",
  "Подписка подключается только после выбора тарифа",
] as const;

const platformModules = [
  {
    title: "AI-аудит проекта",
    text: "Клиент вставляет ссылку на сайт, Telegram, VK, YouTube или другой публичный контур. Система собирает первичный профиль деятельности и показывает, что можно улучшить.",
  },
  {
    title: "Соцмедиа-управление",
    text: "Редакционный календарь, черновики постов, очередь согласования, публикации и понятные отчёты по каналам без ручной путаницы в чатах.",
  },
  {
    title: "Новостной портал",
    text: "Открытая лента, источники, регионы, категории и закрытые разборы для подписчиков. Медиа остаётся лицом продукта, а платформа становится рабочим кабинетом.",
  },
] as const;

const clientSteps = [
  ["01", "Вставить ссылку", "Сайт, проект, Telegram-канал, соцсеть или публичный профиль."],
  ["02", "Создать кабинет", "Минимальная регистрация, чтобы сохранить отчёт и историю действий."],
  ["03", "Подтвердить карту", "Пробное списание 1 ₽ для проверки платёжных данных и актуальности доступа."],
  ["04", "Получить AI-разбор", "Что делает проект, где слабые места, какие каналы подключить первыми."],
] as const;

const financeNotes = [
  "1 ₽ — не полноценная подписка, а подтверждение карты и пробного доступа.",
  "Виртуальные карты возможны только через банк, платёжного партнёра или BaaS-провайдера.",
  "Telegram-бот может быть интерфейсом для заявок, лимитов и уведомлений, но не самостоятельным эмитентом карт.",
] as const;

const partnerVpnPoints = [
  "Telegram Mini App, админ-панель и API живут в отдельном VPN-проекте.",
  "На FreeRUS показываем партнёрский вход и собираем заявки на ранний доступ.",
  "Подключение, оплата и выдача конфигураций не смешиваются с редакционным кабинетом.",
] as const;

const moscowTimeFormatter = new Intl.DateTimeFormat("ru-RU", {
  timeZone: "Europe/Moscow",
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
  hour12: false,
});

const moscowDateFormatter = new Intl.DateTimeFormat("ru-RU", {
  timeZone: "Europe/Moscow",
  weekday: "long",
  day: "numeric",
  month: "long",
  year: "numeric",
});

const moscowDatePartsFormatter = new Intl.DateTimeFormat("ru-RU", {
  timeZone: "Europe/Moscow",
  day: "2-digit",
  month: "2-digit",
  year: "numeric",
});

function getMoscowTime() {
  return moscowTimeFormatter.format(new Date());
}

function getMoscowDate() {
  const now = new Date();
  const label = moscowDateFormatter
    .format(now)
    .replace(/\sг\.$/, "");
  const [day, month, year] = moscowDatePartsFormatter.format(now).split(".");

  return {
    iso: `${year}-${month}-${day}`,
    label: `${label.charAt(0).toUpperCase()}${label.slice(1)}`,
  };
}

export function EditorialHome() {
  const [time, setTime] = useState("--:--:--");
  const [date, setDate] = useState({
    iso: "2026-08-22",
    label: "Суббота, 22 августа 2026",
  });
  const [updates, setUpdates] = useState<EditorialUpdate[]>(fallbackEditorialUpdates);
  const [feedSource, setFeedSource] = useState<"live" | "fallback">("fallback");
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    const updateClock = () => {
      setTime(getMoscowTime());
      setDate(getMoscowDate());
    };
    const frame = window.requestAnimationFrame(updateClock);
    const timer = window.setInterval(updateClock, 1000);
    return () => {
      window.cancelAnimationFrame(frame);
      window.clearInterval(timer);
    };
  }, []);

  useEffect(() => {
    let ignore = false;

    async function loadEditorialFeed() {
      try {
        const response = await fetch("/api/editorial-feed", {
          headers: { Accept: "application/json" },
          cache: "no-store",
        });
        if (!response.ok) return;

        const payload = (await response.json()) as {
          items?: EditorialUpdate[];
          source?: "live" | "fallback";
        };
        if (!ignore && Array.isArray(payload.items) && payload.items.length > 0) {
          setUpdates(payload.items);
          setFeedSource(payload.source === "live" ? "live" : "fallback");
        }
      } catch {
        // Fallback stays visible when the editorial feed is unavailable.
      }
    }

    loadEditorialFeed();
    return () => {
      ignore = true;
    };
  }, []);

  const primaryUpdates = updates.slice(0, 3);
  const secondaryUpdates = updates.slice(3);
  const visibleUpdates = expanded
    ? [...primaryUpdates, ...secondaryUpdates]
    : primaryUpdates;

  return (
    <main className="editorial-home" id="main">
      <header className="editorial-header">
        <Link className="editorial-brand" href="/" aria-label="Наташа Фри RUS — главная">
          НАТАША ФРИ RUS
        </Link>
        <span className="editorial-live" aria-label="Московское время">
          <i aria-hidden="true" />
          <time>{time} МСК</time>
        </span>
        <div className="editorial-header-actions">
          <Link className="editorial-search" href="/blog" aria-label="Открыть поиск по материалам">
            <MagnifyingGlass size={21} weight="regular" aria-hidden="true" />
          </Link>
          <Link className="editorial-subscribe" href="/pricing">
            ПОДПИСАТЬСЯ
          </Link>
        </div>
      </header>

      <div className="editorial-workspace">
        <aside className="editorial-author-panel" aria-labelledby="author-title">
          <div className="editorial-portrait">
            <Image
              src="/natasha-free.jpg"
              alt="Наташа Фри в редакционной студии"
              width={1024}
              height={1024}
              sizes="(max-width: 760px) 100vw, 320px"
              unoptimized
              priority
            />
          </div>
          <h1 id="author-title">Наташа Фри</h1>
          <p className="editorial-role">Медиаблогер. Редактор. Наблюдатель.</p>
          <p className="editorial-manifesto">
            Независимый взгляд на события без лишних слов — только то, что важно.
          </p>

          <section className="editorial-now" aria-labelledby="now-title">
            <h2 id="now-title">Сейчас в редакции</h2>
            <p><i aria-hidden="true" />{updates.length} материалов в ленте</p>
            <small>{feedSource === "live" ? "Лента подключена к API" : "Показан резервный выпуск"}</small>
          </section>

          <section className="editorial-method" aria-labelledby="method-title">
            <h2 id="method-title">Как мы работаем</h2>
            <ul>
              {workPrinciples.map(([Icon, label]) => (
                <li key={label}>
                  <Icon size={18} weight="regular" aria-hidden="true" />
                  <span>{label}</span>
                </li>
              ))}
            </ul>
          </section>
        </aside>

        <section className="editorial-desk" aria-labelledby="desk-title">
          <div className="editorial-desk-heading">
            <h2 id="desk-title">Сегодня в редакции</h2>
            <time dateTime={date.iso}>{date.label}</time>
          </div>

          <ol className="editorial-timeline">
            {visibleUpdates.map((update) => (
              <li key={`${update.time}-${update.title}`}>
                <time>{update.time}</time>
                <article>
                  <h3>{update.title}</h3>
                  <p className="editorial-source-meta">
                    {update.agency}<span>•</span>{update.sourceType}<span>•</span>{update.sourceDate}
                  </p>
                  <p className="editorial-verified">
                    <CheckCircle size={17} weight="fill" aria-hidden="true" />
                    Проверено <time>{update.verifiedAt}</time>
                  </p>
                  <a className="editorial-source-link" href={update.href} target="_blank" rel="noreferrer">
                    Источник: {update.sourceLabel}
                    <ArrowSquareOut size={16} weight="regular" aria-hidden="true" />
                  </a>
                  <div className="editorial-why">
                    <strong>Почему важно:</strong>
                    <p>{update.why}</p>
                  </div>
                </article>
              </li>
            ))}
          </ol>

          <button
            className="editorial-more"
            type="button"
            aria-expanded={expanded}
            onClick={() => setExpanded((value) => !value)}
            disabled={secondaryUpdates.length === 0}
          >
            {expanded ? "Скрыть дополнительные обновления" : "Показать ещё обновления"}
            <CaretDown size={17} weight="bold" aria-hidden="true" />
          </button>
        </section>

        <aside className="editorial-analysis" aria-labelledby="analysis-title">
          <span className="editorial-analysis-label"><i aria-hidden="true" />Открытый разбор</span>
          <h2 id="analysis-title">Что ставка 14% означает для экономики и вашего кошелька</h2>

          <div className="editorial-chart-row">
            <figure>
              <figcaption>Ключевая ставка ЦБ РФ, иллюстративная траектория</figcaption>
              <Image
                src="/freerus-key-rate-chart.webp"
                alt="Иллюстративный график изменения ключевой ставки до 14 процентов"
                width={900}
                height={450}
                sizes="(max-width: 980px) 100vw, 380px"
                unoptimized
                loading="eager"
              />
            </figure>
            <div className="editorial-analysis-source">
              <span>Источник</span>
              <strong>Банк России</strong>
              <small>Решение от 24.07.2026</small>
              <a href="https://www.cbr.ru/press/pr/?file=24072026_133000key.htm" target="_blank" rel="noreferrer">
                cbr.ru <ArrowSquareOut size={14} aria-hidden="true" />
              </a>
            </div>
          </div>

          <p className="editorial-analysis-copy">
            Снижение до 14% делает движение к более доступным кредитам заметнее,
            но не мгновенно: банки пересматривают условия постепенно, а регулятор
            по-прежнему оценивает инфляционные ожидания и бюджетные риски.
          </p>
          <a className="editorial-read-link" href="https://www.cbr.ru/dkp/mp_dec/decision_key_rate/summary_key_rate_05082026/" target="_blank" rel="noreferrer">
            Читать первоисточник <ArrowRight size={17} weight="bold" aria-hidden="true" />
          </a>

          <section className="editorial-membership" aria-labelledby="membership-title">
            <h3 id="membership-title">Пробный вход</h3>
            <ul>
              {subscriptionBenefits.map((benefit) => (
                <li key={benefit}>
                  <CheckCircle size={18} weight="regular" aria-hidden="true" />
                  {benefit}
                </li>
              ))}
            </ul>
            <Link className="editorial-price" href="/pricing">Подтвердить за 1 ₽</Link>
            <small>Платный тариф выбирается отдельно</small>
            <nav className="editorial-legal-links" aria-label="Условия подписки">
              <Link href="/terms">Условия</Link>
              <Link href="/refunds">Возвраты</Link>
              <Link href="/privacy">Конфиденциальность</Link>
            </nav>
          </section>
        </aside>
      </div>

      <section className="editorial-platform" aria-labelledby="platform-title">
        <div className="editorial-platform-head">
          <span>AI-платформа</span>
          <h2 id="platform-title">От медиа к личному кабинету для бизнеса</h2>
          <p>
            FreeRUS остаётся новостным и редакционным продуктом, но первый
            коммерческий сценарий становится проще: клиент даёт ссылку,
            подтверждает доступ и получает понятный разбор своей деятельности.
          </p>
        </div>
        <div className="editorial-platform-grid">
          {platformModules.map((module) => (
            <article key={module.title}>
              <Robot size={24} weight="regular" aria-hidden="true" />
              <h3>{module.title}</h3>
              <p>{module.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="editorial-client-flow" aria-labelledby="client-flow-title">
        <div>
          <span>Примитивные действия клиента</span>
          <h2 id="client-flow-title">Вся сложность прячется внутри системы</h2>
        </div>
        <ol>
          {clientSteps.map(([number, title, text]) => (
            <li key={number}>
              <span>{number}</span>
              <h3>{title}</h3>
              <p>{text}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="editorial-finance-note" aria-labelledby="finance-title">
        <CreditCard size={28} weight="regular" aria-hidden="true" />
        <div>
          <span>Платежи и карты</span>
          <h2 id="finance-title">Карты — только через лицензированный контур</h2>
          <p>
            Виртуальные платёжные карты можно проектировать как будущий модуль,
            но на публичном сайте корректнее показывать его как pre-launch
            функцию через партнёра. Первый релиз ограничиваем оплатой,
            подпиской, отчётами и Telegram-уведомлениями.
          </p>
          <ul>
            {financeNotes.map((note) => (
              <li key={note}>{note}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className="editorial-partner-ad" aria-labelledby="partner-vpn-title">
        <div className="editorial-partner-mark">
          <Shield size={34} weight="regular" aria-hidden="true" />
          <span>Партнёр FreeRUS</span>
        </div>
        <div className="editorial-partner-copy">
          <p>Спонсорский VPN-проект</p>
          <h2 id="partner-vpn-title">HIDE MY NAME VPN</h2>
          <strong>Защищённое подключение для личных устройств, удалённой работы и команд.</strong>
          <ul>
            {partnerVpnPoints.map((point) => (
              <li key={point}>{point}</li>
            ))}
          </ul>
        </div>
        <div className="editorial-partner-action">
          <span>Статус: ранний доступ</span>
          <Link href="/epic-vpn">Открыть VPN-раздел <ArrowRight size={17} weight="bold" aria-hidden="true" /></Link>
        </div>
      </section>

      <footer className="editorial-accountability">
        <section>
          <NotePencil size={23} weight="regular" aria-hidden="true" />
          <div>
            <h2>Исправления</h2>
            <p><time dateTime="2026-08-22">22.08.2026</time> — обновили дату редакционного выпуска и отметки проверки.</p>
            <Link href="/editorial-policy">Как мы фиксируем изменения <ArrowRight size={15} aria-hidden="true" /></Link>
          </div>
        </section>
        <section>
          <ListChecks size={23} weight="regular" aria-hidden="true" />
          <div>
            <h2>Редакционные принципы</h2>
            <p>Факты важнее мнений. Источник важнее заголовка. Выводы отделены от данных.</p>
            <Link href="/editorial-policy">Подробнее о принципах <ArrowRight size={15} aria-hidden="true" /></Link>
          </div>
        </section>
        <section>
          <EnvelopeSimple size={23} weight="regular" aria-hidden="true" />
          <div>
            <h2>Связаться с редакцией</h2>
            <p>Ваши наводки, документы и вопросы помогают делать материалы точнее.</p>
            <a href="mailto:internetbezogranicheniy@gmail.com">internetbezogranicheniy@gmail.com</a>
          </div>
        </section>
      </footer>
    </main>
  );
}
