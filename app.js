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
  document.getElementById('tariffInput');

const ratingInput =
  document.getElementById('ratingInput');

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

    console.log(
      'SENDING USER:',
      payload
    );

    alert(
      'ОТПРАВКА:\n' +
      JSON.stringify(payload, null, 2)
    );

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

    alert(
      'STATUS: ' + response.status
    );

    const result =
      await response.json();

    alert(
      JSON.stringify(result)
    );

    if (response.ok && result.success) {

      tg.showAlert(
        'ДАННЫЕ СОХРАНЕНЫ'
      );

      console.log(
        'USER SAVED'
      );

    } else {

      tg.showAlert(
        'ОШИБКА СОХРАНЕНИЯ'
      );

      console.error(
        'SAVE FAILED',
        result
      );

    }

  } catch (err) {

    console.error(
      'SAVE USER ERROR:',
      err
    );

    alert(
      'FETCH ERROR:\n' + err.message
    );

  }

}

let enabled = false;

let seconds = 0;

let interval = null;

let pingInterval = null;

let consoleInterval = null;

let nodeInterval = null;

const logs = [

  'secure tunnel initialized...',
  'routing package established...',
  'node synchronization complete...',
  'latency optimization enabled...',
  'route encrypted successfully...',
  'system heartbeat detected...',
  'proxy channel updated...',
  'dynamic node allocation active...',
  'network mask injected...',
  'secure route confirmed...',
  'packet stream stabilized...',
  'endpoint verified...',
  'secure dns route applied...',
  'traffic rerouted successfully...'

];

const translitMap = {

  'а':'a','б':'b','в':'v','г':'g',
  'д':'d','е':'e','ё':'e','ж':'zh',
  'з':'z','и':'i','й':'y','к':'k',
  'л':'l','м':'m','н':'n','о':'o',
  'п':'p','р':'r','с':'s','т':'t',
  'у':'u','ф':'f','х':'h','ц':'ts',
  'ч':'ch','ш':'sh','щ':'sch',
  'ъ':'','ы':'y','ь':'',
  'э':'e','ю':'yu','я':'ya'
};

function transliterate(text) {

  const transliterated = text
    .toLowerCase()
    .split('')
    .map(char =>
      translitMap[char] || char
    )
    .join('');

  return transliterated.charAt(0).toUpperCase() +
    transliterated.slice(1);
}

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

function randomPing() {

  return Math.floor(
    Math.random() * (127 - 13 + 1)
  ) + 13;
}

function randomNodeNumber() {

  return String(
    Math.floor(Math.random() * 9) + 1
  ).padStart(2, '0');
}

function generateNode(city) {

  const latin =
    transliterate(city);

  const clean =
    latin
      .replace(/[^a-zA-Z]/g, '')
      .substring(0, 3)
      .toUpperCase();

  return `${clean}-${randomNodeNumber()}`;
}

function updateNode() {

  const city =
    cityInput.value.trim();

  if (city.length > 0) {

    nodeValue.textContent =
      generateNode(city);
  }

}

fetch(BACKEND_URL)
  .then(res => res.text())
  .then(data => {

    console.log(
      'BACKEND STATUS:',
      data
    );

  })
  .catch(err => {

    console.error(
      'BACKEND ERROR:',
      err
    );

  });