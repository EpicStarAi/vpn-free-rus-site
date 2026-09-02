"use client";

import Link from "next/link";
import { useState } from "react";

const questions = [
  {
    title: "Что сейчас важнее всего?",
    options: [
      ["sales", "Не терять заявки и систематизировать продажи"],
      ["marketing", "Получать больше качественных обращений"],
      ["social-media", "Регулярно вести социальные сети"],
      ["digitalization", "Автоматизировать ручные процессы"],
    ],
  },
  {
    title: "Как устроена работа сейчас?",
    options: [
      ["none", "Всё держится на владельце"],
      ["team", "Есть команда, но нет единой системы"],
      ["contractors", "Работаем с разными подрядчиками"],
      ["system", "Есть процессы, нужно масштабирование"],
    ],
  },
  {
    title: "Сколько каналов участвует?",
    options: [
      ["one", "Один основной канал"],
      ["few", "2–3 канала"],
      ["many", "4 и более"],
      ["unknown", "Нужно определить на аудите"],
    ],
  },
] as const;

export function ProjectQuiz() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const current = questions[step];
  const result = answers[0] || "complex";
  const resultNames: Record<string, string> = {
    sales: "Системный отдел продаж",
    marketing: "Digital-маркетинг",
    "social-media": "Удалённая редакция",
    digitalization: "AI и автоматизация",
    complex: "Комплексный digital-отдел",
  };

  function choose(value: string) {
    const next = [...answers, value];
    setAnswers(next);
    setStep((currentStep) => currentStep + 1);
  }

  function reset() {
    setAnswers([]);
    setStep(0);
  }

  return (
    <div className="project-quiz">
      <div className="quiz-progress">
        <span>{step >= questions.length ? "Результат" : `Шаг ${step + 1} из ${questions.length}`}</span>
        <i style={{ width: `${Math.min(100, (step / questions.length) * 100)}%` }} />
      </div>
      {step < questions.length ? (
        <>
          <h3>{current.title}</h3>
          <div className="quiz-options">
            {current.options.map(([value, label]) => (
              <button key={value} type="button" onClick={() => choose(value)}>
                <span aria-hidden="true">→</span>
                {label}
              </button>
            ))}
          </div>
        </>
      ) : (
        <div className="quiz-result">
          <span className="eyebrow">Рекомендуемый старт</span>
          <h3>{resultNames[result] ?? resultNames.complex}</h3>
          <p>
            Предварительно стоит начать с аудита и пилота одного процесса.
            Точный состав определим после проверки каналов, данных и доступов.
          </p>
          <div>
            <Link className="button button-primary" href={`/contacts?service=${result}`}>
              Получить план аудита
            </Link>
            <button type="button" onClick={reset}>Пройти заново</button>
          </div>
        </div>
      )}
    </div>
  );
}
