import Link from "next/link";

export default function NotFound() {
  return (
    <main id="main" className="system-page">
      <span className="system-code">404</span>
      <span className="eyebrow">Пакет потерялся по дороге</span>
      <h1>Такой страницы нет</h1>
      <p>
        Адрес мог измениться или в ссылке опечатка. Главная страница точно
        отвечает.
      </p>
      <Link className="button button-primary" href="/">Вернуться на главную</Link>
    </main>
  );
}
