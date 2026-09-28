(function () {
  const tg = window.Telegram && window.Telegram.WebApp;
  const inTelegram = Boolean(tg && ((tg.initData && tg.initData.length) || (tg.platform && tg.platform !== "unknown")));
  if (inTelegram) {
    try {
      tg.ready();
      tg.expand();
      if (tg.setHeaderColor) tg.setHeaderColor("#05070a");
      if (tg.setBackgroundColor) tg.setBackgroundColor("#05070a");
      document.documentElement.classList.add("in-telegram");
    } catch (e) {}
  }

  function showHandoff() {
    const status = document.querySelector("[data-handoff-status]");
    if (status) {
      status.hidden = false;
      status.textContent = "Открываем чат бота. Если появится кнопка «Запустить», нажмите её. Если ответа нет, закройте это окно и нажмите «Тест 3 дня» в сообщении бота или отправьте /trial.";
    }
  }

  function openTelegram(url) {
    if (inTelegram && typeof tg.openTelegramLink === "function") {
      try {
        tg.openTelegramLink(url);
      } catch (error) {
        window.location.href = url;
        return;
      }
      // Telegram 7+ leaves the Mini App open; reveal the destination chat.
      if (typeof tg.close === "function") {
        try { tg.close(); } catch (error) { /* The visible instructions remain. */ }
      }
      return;
    }
    window.location.href = url;
  }

  document.querySelectorAll("[data-bot-start]").forEach(function (el) {
    el.addEventListener("click", function (event) {
      if (!inTelegram) return; // Preserve ordinary links outside Telegram.
      event.preventDefault();
      showHandoff();
      const payload = el.getAttribute("data-bot-start") || "trial";
      openTelegram("https://t.me/FREE_RUS_VPN_BOT?start=" + encodeURIComponent(payload));
    });
  });

  document.querySelectorAll("[data-tg-link]").forEach(function (el) {
    el.addEventListener("click", function (event) {
      if (!inTelegram) return;
      const url = el.getAttribute("data-tg-link");
      if (!url) return;
      event.preventDefault();
      openTelegram(url);
    });
  });

  let installPrompt;
  const installButton = document.querySelector("[data-install]");
  if (installButton) {
    window.addEventListener("beforeinstallprompt", function (event) {
      event.preventDefault();
      installPrompt = event;
      installButton.hidden = false;
    });
    installButton.addEventListener("click", async function () {
      if (!installPrompt) return;
      installPrompt.prompt();
      await installPrompt.userChoice;
      installPrompt = null;
      installButton.hidden = true;
    });
  }

  if ("serviceWorker" in navigator) {
    window.addEventListener("load", function () {
      navigator.serviceWorker.register("sw.js").catch(function () {});
    });
  }
})();
