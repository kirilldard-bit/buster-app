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

const routeValue =
  document.getElementById('routeValue');

const nodeValue =
  document.getElementById('nodeValue');

const settingsContainer =
  document.querySelector('.settings-container');

if (settingsContainer) {

  const telegramIdBlock =
    document.createElement('div');

  telegramIdBlock.style.marginTop =
    '24px';

  telegramIdBlock.style.padding =
    '14px';

  telegramIdBlock.style.borderRadius =
    '16px';

  telegramIdBlock.style.background =
    'rgba(255,255,255,0.04)';

  telegramIdBlock.style.border =
    '1px solid rgba(255,255,255,0.08)';

  telegramIdBlock.innerHTML = `
    <div style="
      font-size:12px;
      opacity:0.6;
      margin-bottom:6px;
      letter-spacing:1px;
    ">
      TELEGRAM ID
    </div>

    <div style="
      font-size:18px;
      font-weight:600;
      color:white;
      word-break:break-all;
    ">
      ${telegramUserId}
    </div>
  `;

  settingsContainer.appendChild(
    telegramIdBlock
  );

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

function addConsoleLine() {

  const line =
    document.createElement('div');

  line.classList.add('console-line');

  const currentTime =
    new Date().toLocaleTimeString('ru-RU');

  const randomLog =
    logs[
      Math.floor(Math.random() * logs.length)
    ];

  line.textContent =
    `[${currentTime}] ${randomLog}`;

  consoleWindow.prepend(line);

  const lines =
    document.querySelectorAll('.console-line');

  if (lines.length > 18) {

    lines[
      lines.length - 1
    ].remove();
  }
}

function hideAllScreens() {

  homeScreen.classList.remove(
    'active-screen'
  );

  historyScreen.classList.remove(
    'active-screen'
  );

  settingsScreen.classList.remove(
    'active-screen'
  );

  homeTab.classList.remove('active');

  historyTab.classList.remove('active');

  settingsTab.classList.remove('active');
}

homeTab.addEventListener('click', () => {

  hideAllScreens();

  homeScreen.classList.add(
    'active-screen'
  );

  homeTab.classList.add('active');
});

historyTab.addEventListener('click', () => {

  hideAllScreens();

  historyScreen.classList.add(
    'active-screen'
  );

  historyTab.classList.add('active');
});

settingsTab.addEventListener('click', () => {

  hideAllScreens();

  settingsScreen.classList.add(
    'active-screen'
  );

  settingsTab.classList.add('active');
});

cityInput.addEventListener('input', () => {

  const city =
    cityInput.value.trim();

  clearInterval(nodeInterval);

  if (city.length > 0) {

    const latinCity =
      transliterate(city);

    routeValue.textContent =
      latinCity;

    updateNode();

    nodeInterval = setInterval(() => {

      updateNode();

    }, 2000);

  } else {

    routeValue.textContent =
      'Moscow';

    nodeValue.textContent =
      'MSK-01';
  }

});

powerButton.addEventListener('click', () => {

  enabled = !enabled;

  if (enabled) {

    powerButton.classList.remove('off');

    powerButton.classList.add('on');

    buttonIcon.textContent = '✓';

    statusText.textContent =
      'CONNECTED';

    statusValue.textContent =
      'ACTIVE';

    statusValue.classList.remove(
      'disconnected'
    );

    statusValue.classList.add(
      'online'
    );

    glow.style.background =
      'radial-gradient(circle, rgba(139,92,246,0.35), transparent 70%)';

    interval = setInterval(() => {

      seconds++;

      timer.textContent =
        formatTime(seconds);

    }, 1000);

    pingValue.textContent =
      `${randomPing()}ms`;

    pingInterval = setInterval(() => {

      pingValue.textContent =
        `${randomPing()}ms`;

    }, 2000);

    addConsoleLine();

    consoleInterval = setInterval(() => {

      addConsoleLine();

    }, 1800);

  } else {

    powerButton.classList.remove('on');

    powerButton.classList.add('off');

    buttonIcon.textContent = '⏻';

    statusText.textContent =
      'DISCONNECTED';

    statusValue.textContent =
      'DISCONNECTED';

    statusValue.classList.remove(
      'online'
    );

    statusValue.classList.add(
      'disconnected'
    );

    glow.style.background =
      'radial-gradient(circle, rgba(255,196,0,0.18), transparent 70%)';

    clearInterval(interval);

    clearInterval(pingInterval);

    clearInterval(consoleInterval);
  }

});

fetch(BACKEND_URL)
  .then(res => res.json())
  .then(data => {

    console.log(
      'BACKEND STATUS:',
      data.status
    );

  })
  .catch(err => {

    console.error(
      'BACKEND ERROR:',
      err
    );

  });