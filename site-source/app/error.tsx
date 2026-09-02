"use client";

export default function ErrorPage({ reset }: { reset: () => void }) {
  return (
    <main id="main" className="system-page">
      <span className="system-code">500</span>
      <span className="eyebrow">Сигнал прервался</span>
      <h1>Что-то пошло не так</h1>
      <p>Мы уже знаем, как неприятно видеть такую страницу. Попробуйте ещё раз.</p>
      <button className="button button-primary" type="button" onClick={reset}>
        Повторить
      </button>
    </main>
  );
}
