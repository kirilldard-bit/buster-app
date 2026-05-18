const tg = window.Telegram.WebApp;

tg.ready();
tg.expand();

const telegramUser = tg.initDataUnsafe?.user;

const telegramUserId =
  telegramUser?.id || "UNKNOWN";

const BACKEND_URL =
  'https://bus-backend-production-1f45.up.railway.app';

const powerButton =
  document.getElementById('powerButton');

const buttonIcon =
  document.getElementById('buttonIcon');

const timer =
  document.getElementById('timer');

const statusText =
  document.getElementById('statusText');

const statusValue =
  document.getElementById('statusValue');

const pingValue =
  document.getElementById('pingValue');

const glow =
  document.querySelector('.circle-glow');

const consoleWindow =
  document.getElementById('consoleWindow');

const homeTab =
  document.getElementById('homeTab');

const historyTab =
  document.getElementById('historyTab');

const settingsTab =
  document.getElementById('settingsTab');

const homeScreen =
  document.getElementById('homeScreen');

const historyScreen =
  document.getElementById('historyScreen');

const settingsScreen =
  document.getElementById('settingsScreen');

const cityInput =
  document.getElementById('cityInput');

const tariffInput =
  document.querySelectorAll('input')[1];

const ratingInput =
  document.querySelectorAll('input')[2];

const routeValue =
  document.getElementById('routeValue');

const nodeValue =
  document.getElementById('nodeValue');

setTimeout(() => {

  if (settingsScreen) {

    const idBlock =
      document.createElement('div');

    idBlock.innerHTML = `
      <div style="
        margin-top:20px;
        padding:16px;
        border-radius:18px;
        background:rgba(255,255,255,0.04);
        border:1px solid rgba(255,255,255,0.08);
      ">
        <div style="
          font-size:12px;
          opacity:0.6;
          margin-bottom:8px;
          letter-spacing:1px;
        ">
          TELEGRAM ID
        </div>

        <div style="
          font-size:20px;
          font-weight:700;
          color:white;
        ">
          ${telegramUserId}
        </div>
      </div>
    `;

    settingsScreen.appendChild(idBlock);

    const saveButton =
      document.createElement('button');

    saveButton.innerText =
      'СОХРАНИТЬ ДАННЫЕ';

    saveButton.style.marginTop =
      '20px';

    saveButton.style.width =
      '100%';

    saveButton.style.height =
      '56px';

    saveButton.style.border =
      'none';

    saveButton.style.borderRadius =
      '18px';

    saveButton.style.background =
      '#6c3cff';

    saveButton.style.color =
      'white';

    saveButton.style.fontSize =
      '16px';

    saveButton.style.fontWeight =
      '700';

    saveButton.style.cursor =
      'pointer';

    saveButton.onclick =
      async () => {

        await saveUserData();

      };

    settingsScreen.appendChild(
      saveButton
    );

  }

}, 1000);

async function saveUserData() {

  try {

    const payload = {

      telegram_id: telegramUserId,

      city:
        cityInput?.value || '',

      tariff:
        tariffInput?.value || '',

      rating:
        ratingInput?.value || ''

    };

    const response = await fetch(
      `${BACKEND_URL}/save-user`,
      {

        method: 'POST',

        headers: {
          'Content-Type':
            'application/json'
        },

        body:
          JSON.stringify(payload)

      }
    );

    const result =
      await response.json();

    if (result.success) {

      tg.showAlert(
        'Успешно сохранено'
      );

    } else {

      tg.showAlert(
        'Ошибка сохранения'
      );

    }

  } catch (err) {

    console.error(err);

  }

}

async function checkSubscription() {

  try {

    const response = await fetch(
      `${BACKEND_URL}/check-subscription/${telegramUserId}`
    );

    const result =
      await response.json();

    console.log(
      'SUBSCRIPTION:',
      result
    );

    if (!result.active) {

      showSubscriptionScreen();

    }

  } catch (err) {

    console.log(err);

  }

}

function showSubscriptionScreen() {

  document.body.innerHTML = `

    <div style="
      width:100%;
      height:100vh;
      background:black;
      display:flex;
      flex-direction:column;
      justify-content:center;
      align-items:center;
      padding:30px;
      box-sizing:border-box;
      color:white;
      font-family:sans-serif;
      text-align:center;
    ">

      <img
        src="./assets/map.png"
        style="
          width:220px;
          border-radius:24px;
          margin-bottom:30px;
          box-shadow:0 0 40px rgba(108,60,255,0.45);
        "
      />

      <div style="
        font-size:34px;
        font-weight:800;
      ">
        BUSTER PREMIUM
      </div>

      <div style="
        margin-top:20px;
        opacity:0.75;
        line-height:1.5;
        font-size:17px;
      ">
        Для доступа к приложению
        необходима активная подписка.
      </div>

      <div style="
        margin-top:35px;
        font-size:44px;
        font-weight:800;
      ">
        490₽
      </div>

      <div style="
        opacity:0.55;
        margin-top:6px;
      ">
        в месяц
      </div>

      <button
        onclick="openPayment()"
        style="
          margin-top:40px;
          width:100%;
          max-width:320px;
          height:62px;
          border:none;
          border-radius:18px;
          background:#6c3cff;
          color:white;
          font-size:19px;
          font-weight:700;
        "
      >
        ОПЛАТИТЬ
      </button>

    </div>

  `;

}

function openPayment() {

  tg.showAlert(
    'Касса подключается'
  );

}

let enabled = false;

let seconds = 0;

let interval = null;

function formatTime(sec) {

  const hrs = String(
    Math.floor(sec / 3600)
  ).padStart(2, '0');

  const mins = String(
    Math.floor((sec % 3600) / 60)
  ).padStart(2, '0');

  const secs = String(
    sec % 60
  ).padStart(2, '0');

  return `${hrs}:${mins}:${secs}`;

}

powerButton?.addEventListener('click', () => {

  enabled = !enabled;

  if (enabled) {

    powerButton.classList.remove('off');

    powerButton.classList.add('on');

    buttonIcon.textContent = '✓';

    statusText.textContent =
      'CONNECTED';

    statusValue.textContent =
      'ACTIVE';

    interval = setInterval(() => {

      seconds++;

      timer.textContent =
        formatTime(seconds);

    }, 1000);

  } else {

    powerButton.classList.remove('on');

    powerButton.classList.add('off');

    buttonIcon.textContent = '⏻';

    statusText.textContent =
      'DISCONNECTED';

    statusValue.textContent =
      'DISCONNECTED';

    clearInterval(interval);

  }

});

checkSubscription();

fetch(BACKEND_URL)
  .then(res => res.text())
  .then(data => {

    console.log(
      'BACKEND STATUS:',
      data
    );

  })
  .catch(err => {

    console.error(err);

  });