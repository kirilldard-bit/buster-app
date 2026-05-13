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

const homeScreen =
  document.getElementById('homeScreen');

const historyScreen =
  document.getElementById('historyScreen');

let enabled = false;

let seconds = 0;

let interval = null;

let pingInterval = null;

let consoleInterval = null;

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

homeTab.addEventListener('click', () => {

  homeScreen.classList.add(
    'active-screen'
  );

  historyScreen.classList.remove(
    'active-screen'
  );

  homeTab.classList.add('active');

  historyTab.classList.remove(
    'active'
  );
});

historyTab.addEventListener('click', () => {

  historyScreen.classList.add(
    'active-screen'
  );

  homeScreen.classList.remove(
    'active-screen'
  );

  historyTab.classList.add('active');

  homeTab.classList.remove(
    'active'
  );
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