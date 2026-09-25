(function () {
  const tg = window.Telegram && window.Telegram.WebApp;
  if (tg) {
    try {
      tg.ready();
      tg.expand();
      if (tg.setHeaderColor) tg.setHeaderColor("#05070a");
      if (tg.setBackgroundColor) tg.setBackgroundColor("#05070a");
      document.documentElement.classList.add("in-telegram");
    } catch (e) {}
  }

  function openBot(startPayload) {
    const url = "https://t.me/FREE_RUS_VPN_BOT" + (startPayload ? "?start=" + encodeURIComponent(startPayload) : "");
    if (tg && typeof tg.openTelegramLink === "function") {
      tg.openTelegramLink(url);
      return;
    }
    window.location.href = url;
  }

  document.querySelectorAll("[data-bot-start]").forEach(function (el) {
    el.addEventListener("click", function (event) {
      event.preventDefault();
      openBot(el.getAttribute("data-bot-start") || "trial");
    });
  });

  document.querySelectorAll("[data-tg-link]").forEach(function (el) {
    el.addEventListener("click", function (event) {
      const url = el.getAttribute("data-tg-link");
      if (!url) return;
      event.preventDefault();
      if (tg && typeof tg.openTelegramLink === "function") {
        tg.openTelegramLink(url);
      } else {
        window.location.href = url;
      }
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
