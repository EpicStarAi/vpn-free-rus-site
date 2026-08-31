document.querySelector('#pilot-form').addEventListener('submit', function (event) {
  event.preventDefault();
  const message = this.querySelector('.form-message');
  message.textContent = 'Открываем Telegram-бота — выберите «Старт», чтобы получить тестовый доступ.';
  window.setTimeout(() => window.open('https://t.me/INTERNET_BEZ_GRANIC_RUS_BOT', '_blank', 'noopener'), 350);
});