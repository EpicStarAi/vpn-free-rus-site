import { vpnDownloads } from "@/data/downloads";

export function VpnDownloads() {
  return (
    <section className="section-shell vpn-downloads" id="download" aria-labelledby="vpn-download-title">
      <div className="corp-section-title">
        <span className="eyebrow">FREE RUS VPN / Приложения</span>
        <h2 id="vpn-download-title">Скачайте для своего устройства</h2>
        <p>Android и Windows. Скачивание установщика — первый шаг; доступ к VPN оформляется отдельно в Telegram.</p>
      </div>
      <div className="vpn-download-grid">
        {vpnDownloads.map((app) => (
          <article className="vpn-download-card" key={app.platform}>
            <div className="vpn-download-card-top"><span>{app.extension}</span><span>{app.size}</span></div>
            <h3>{app.platform}</h3>
            <p>{app.description}</p>
            <a className="button button-primary vpn-download-button" href={app.href}>
              Скачать для {app.platform} <span aria-hidden="true">↓</span>
            </a>
            <small>Файл {app.fileName} · загрузка с GitHub</small>
            <details>
              <summary>Как установить</summary>
              <p>{app.instructions}</p>
            </details>
          </article>
        ))}
      </div>
      <div className="vpn-download-next">
        <div><h3>Приложение установлено?</h3><p>Получите доступ и инструкцию по подключению в боте FREE RUS VPN. Новости и обновления — в <a href="https://t.me/INTERNET_BEZ_GRANIC_RUS">Telegram-канале FREE RUS</a>.</p></div>
        <a className="button button-ghost" href="https://t.me/FREE_RUS_VPN_BOT?start=trial">Открыть Telegram ↗</a>
      </div>
      <details className="vpn-download-help">
        <summary>Если скачивание не начинается</summary>
        <p>Проверьте папку загрузок и свободное место. Во встроенном браузере Telegram попробуйте открыть сайт в обычном браузере. Если GitHub недоступен или ссылка возвращает ошибку, напишите на <a href="mailto:internetbezogranicheniy@gmail.com">internetbezogranicheniy@gmail.com</a>.</p>
      </details>
    </section>
  );
}
