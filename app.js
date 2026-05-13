const powerButton = document.getElementById('powerButton');
const buttonIcon = document.getElementById('buttonIcon');

const timerElement = document.getElementById('timer');
const statusElement = document.getElementById('statusText');
const pingElement = document.getElementById('pingValue');
const routeElement = document.getElementById('routeValue');
const nodeElement = document.getElementById('nodeValue');

const navButtons = document.querySelectorAll('.nav-btn');
const pages = document.querySelectorAll('.page');

const cityInput = document.getElementById('cityInput');
const tariffInput = document.getElementById('tariffInput');
const ratingInput = document.getElementById('ratingInput');

const consoleOutput = document.getElementById('consoleOutput');

let active = false;
let seconds = 0;
let timerInterval = null;
let pingInterval = null;
let nodeInterval = null;
let consoleInterval = null;

// =========================
// TIMER
// =========================

function formatTime(value) {
    return value.toString().padStart(2, '0');
}

function updateTimer() {

    seconds++;

    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;

    timerElement.textContent =
        `${formatTime(hrs)}:${formatTime(mins)}:${formatTime(secs)}`;
}

function resetTimer() {

    seconds = 0;

    timerElement.textContent = '00:00:00';
}

// =========================
// STATUS
// =========================

function setConnectedState() {

    statusElement.textContent = 'ACTIVE';
    statusElement.style.color = '#8b5cf6';

    powerButton.classList.add('active');
}

function setDisconnectedState() {

    statusElement.textContent = 'DISCONNECTED';
    statusElement.style.color = '#facc15';

    powerButton.classList.remove('active');
}

// =========================
// RANDOM PING
// =========================

function generatePing() {

    return Math.floor(Math.random() * (127 - 13 + 1)) + 13;
}

function startPingUpdates() {

    pingElement.textContent = '0ms';

    pingInterval = setInterval(() => {

        const ping = generatePing();

        pingElement.textContent = `${ping}ms`;

    }, 2000);
}

function stopPingUpdates() {

    clearInterval(pingInterval);

    pingElement.textContent = '0ms';
}

// =========================
// CITY / ROUTE / NODE
// =========================

function transliterate(text) {

    const map = {
        'а':'a','б':'b','в':'v','г':'g','д':'d',
        'е':'e','ё':'e','ж':'zh','з':'z','и':'i',
        'й':'y','к':'k','л':'l','м':'m','н':'n',
        'о':'o','п':'p','р':'r','с':'s','т':'t',
        'у':'u','ф':'f','х':'h','ц':'ts','ч':'ch',
        'ш':'sh','щ':'sch','ъ':'','ы':'y','ь':'',
        'э':'e','ю':'yu','я':'ya'
    };

    return text
        .toLowerCase()
        .split('')
        .map(char => map[char] || char)
        .join('');
}

function capitalize(text) {

    if (!text) return '';

    return text.charAt(0).toUpperCase() + text.slice(1);
}

function updateCityData() {

    const city = cityInput.value.trim();

    if (!city) {

        routeElement.textContent = 'Moscow';
        nodeElement.textContent = 'MSK-01';

        return;
    }

    const latin = transliterate(city);
    const formatted = capitalize(latin);

    routeElement.textContent = formatted;

    updateNode(formatted);
}

function updateNode(city) {

    const short = city.substring(0, 3).toUpperCase();

    const randomNumber = Math.floor(Math.random() * 9) + 1;

    nodeElement.textContent = `${short}-0${randomNumber}`;
}

function startNodeUpdates() {

    nodeInterval = setInterval(() => {

        const city = routeElement.textContent;

        updateNode(city);

    }, 3000);
}

function stopNodeUpdates() {

    clearInterval(nodeInterval);
}

// =========================
// HISTORY CONSOLE
// =========================

const consoleLines = [
    '[INFO] Initializing encrypted tunnel...',
    '[OK] Node synchronized successfully',
    '[INFO] Route optimization complete',
    '[INFO] Connection secured',
    '[OK] Session token updated',
    '[INFO] Loading transport layer...',
    '[OK] Ping stabilized',
    '[INFO] BUSTER core online',
    '[INFO] Monitoring packets...',
    '[OK] Remote endpoint accepted',
    '[INFO] Verifying network state...',
    '[OK] Secure relay connected'
];

function addConsoleLine() {

    const line = document.createElement('div');

    const randomText = consoleLines[
        Math.floor(Math.random() * consoleLines.length)
    ];

    const time = new Date().toLocaleTimeString();

    line.textContent = `[${time}] ${randomText}`;

    consoleOutput.prepend(line);

    if (consoleOutput.children.length > 25) {

        consoleOutput.removeChild(consoleOutput.lastChild);
    }
}

function startConsole() {

    addConsoleLine();

    consoleInterval = setInterval(() => {

        addConsoleLine();

    }, 1200);
}

function stopConsole() {

    clearInterval(consoleInterval);
}

// =========================
// POWER BUTTON
// =========================

powerButton.addEventListener('click', () => {

    active = !active;

    if (active) {

        setConnectedState();

        timerInterval = setInterval(updateTimer, 1000);

        startPingUpdates();
        startNodeUpdates();
        startConsole();

        buttonIcon.textContent = '■';

    } else {

        setDisconnectedState();

        clearInterval(timerInterval);

        stopPingUpdates();
        stopNodeUpdates();
        stopConsole();

        resetTimer();

        buttonIcon.textContent = '□';
    }
});

// =========================
// NAVIGATION
// =========================

navButtons.forEach(button => {

    button.addEventListener('click', () => {

        const target = button.dataset.page;

        navButtons.forEach(btn => {
            btn.classList.remove('active');
        });

        pages.forEach(page => {
            page.classList.remove('active');
        });

        button.classList.add('active');

        document
            .getElementById(target)
            .classList.add('active');
    });
});

// =========================
// SETTINGS INPUTS
// =========================

cityInput.addEventListener('input', updateCityData);

// =========================
// INIT
// =========================

setDisconnectedState();
updateCityData();