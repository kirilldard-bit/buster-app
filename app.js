const tg = window.Telegram.WebApp;

tg.ready();
tg.expand();

setTimeout(() => {
  startLocationTracking();
}, 1000);

if (tg.disableVerticalSwipes) {
    tg.disableVerticalSwipes();
}

const telegramUser = tg.initDataUnsafe?.user;

const telegramUserId =
  telegramUser?.id || "UNKNOWN";

const BACKEND_URL =
  'https://bus-backend-production-1f45.up.railway.app';

// ===== ELEMENTS =====

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

const statsTab =
  document.getElementById('statsTab');

const settingsTab =
  document.getElementById('settingsTab');

  const aiScreen =
  document.getElementById(
    'aiScreen'
  );

const aiChat =
  document.getElementById(
    'aiChat'
  );

const aiInput =
  document.getElementById(
    'aiInput'
  );

const sendAiMessage =
  document.getElementById(
    'sendAiMessage'
  );

const aiFloatingButton =
  document.getElementById(
    'aiFloatingButton'
  );

const homeScreen =
  document.getElementById('homeScreen');

const historyScreen =
  document.getElementById('historyScreen');

const statsScreen =
  document.getElementById('statsScreen');

const settingsScreen =
  document.getElementById('settingsScreen');

  const ordersScreen =
  document.getElementById(
    'ordersScreen'
  );

  const analyticsScreen =
  document.getElementById(
    'analyticsScreen'
  );

const openAnalytics =
  document.getElementById(
    'openAnalytics'
  );

const districtAnalytics =
  document.getElementById(
    'districtAnalytics'
  );

const openOrdersHistory =
  document.getElementById(
    'openOrdersHistory'
  );

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

const orderButton =
  document.getElementById('orderButton');

const resetStatsButton =
  document.getElementById('resetStatsButton');

const economTime =
  document.getElementById('economTime');

const comfortTime =
  document.getElementById('comfortTime');

const comfortPlusTime =
  document.getElementById('comfortPlusTime');

  const analyticsContainer =
  document.getElementById(
    'analyticsContainer'
  );

// ===== CITY LIBRARY =====

const russianCities = [

'Москва',
'Санкт-Петербург',
'Новосибирск',
'Екатеринбург',
'Казань',
'Нижний Новгород',
'Челябинск',
'Самара',
'Уфа',
'Ростов-на-Дону',
'Красноярск',
'Омск',
'Воронеж',
'Пермь',
'Волгоград',
'Краснодар',
'Саратов',
'Тюмень',
'Тольятти',
'Ижевск',
'Барнаул',
'Ульяновск',
'Иркутск',
'Хабаровск',
'Ярославль',
'Владивосток',
'Махачкала',
'Томск',
'Оренбург',
'Кемерово',
'Новокузнецк',
'Рязань',
'Астрахань',
'Набережные Челны',
'Пенза',
'Липецк',
'Киров',
'Чебоксары',
'Тула',
'Калининград',
'Балашиха',
'Курск',
'Севастополь',
'Ставрополь',
'Улан-Удэ',
'Тверь',
'Магнитогорск',
'Иваново',
'Брянск',
'Сочи',
'Белгород',
'Сургут',
'Владимир',
'Архангельск',
'Чита',
'Калуга',
'Смоленск',
'Волжский',
'Курган',
'Орёл',
'Владикавказ',
'Череповец',
'Мурманск',
'Саранск',
'Вологда',
'Тамбов',
'Стерлитамак',
'Грозный',
'Якутск',
'Кострома',
'Нижневартовск',
'Новороссийск',
'Таганрог',
'Комсомольск-на-Амуре',
'Йошкар-Ола',
'Нальчик',
'Шахты',
'Дзержинск',
'Братск',
'Орск',
'Ангарск',
'Энгельс',
'Старый Оскол',
'Благовещенск',
'Псков',
'Петрозаводск',
'Сызрань',
'Прокопьевск',
'Норильск',
'Рыбинск',
'Волгодонск',
'Абакан',
'Бийск',
'Уссурийск',
'Альметьевск',
'Южно-Сахалинск',
'Армавир',
'Балаково',
'Норильск',
'Миасс',
'Златоуст',
'Копейск',
'Пятигорск',
'Химки',
'Подольск',
'Королёв',
'Мытищи',
'Люберцы',
'Электросталь',
'Коломна',
'Домодедово',
'Серпухов',
'Одинцово',
'Щёлково',
'Жуковский',
'Раменское',
'Орехово-Зуево',
'Долгопрудный',
'Реутов',
'Видное',
'Ногинск',
'Пушкино',
'Дмитров',
'Березники',
'Каменск-Уральский',
'Нефтекамск',
'Салават',
'Октябрьский',
'Первоуральск',
'Невинномысск',
'Новочеркасск',
'Батайск',
'Новомосковск',
'Елец',
'Кисловодск',
'Ессентуки',
'Дербент',
'Каспийск',
'Назрань',
'Майкоп',
'Керчь',
'Евпатория',
'Симферополь',
'Феодосия',
'Ялта',
'Анапа',
'Геленджик',
'Туапсе',
'Северодвинск',
'Находка',
'Артём',
'Надым',
'Ноябрьск',
'Новый Уренгой',
'Когалым',
'Мегион',
'Лангепас',
'Урай',
'Салехард',
'Губкин',
'Железногорск',
'Новотроицк',
'Ленинск-Кузнецкий',
'Киселёвск',
'Юрга',
'Междуреченск',
'Бердск',
'Искитим',
'Обнинск',
'Клин',
'Гатчина',
'Выборг',
'Тихвин',
'Кингисепп',
'Великий Новгород',
'Боровичи',
'Ковров',
'Муром',
'Александров',
'Глазов',
'Воткинск',
'Серов',
'Асбест',
'Тобольск',
'Ишим',
'Зеленодольск',
'Елабуга',
'Нижнекамск',
'Бугуруслан',
'Бузулук',
'Канск',
'Ачинск',
'Минусинск',
'Лесосибирск',
'Усть-Илимск',
'Саяногорск',
'Горно-Алтайск',
'Кызыл',
'Биробиджан',
'Петропавловск-Камчатский',
'Елизово',
'Магадан',
'Великие Луки',
'Каменск-Шахтинский',
'Азов',
'Новошахтинск',
'Гуково',
'Белорецк',
'Туймазы',
'Кумертау',
'Ишимбай',
'Новоалтайск',
'Рубцовск',
'Клинцы',
'Россошь',
'Ухта',
'Воркута',
'Печора',
'Инта',
'Котлас',
'Каменка',
'Саров',
'Арзамас',
'Бор',
'Кстово',
'Павлово',
'Выкса',
'Заречный',
'Железногорск',
'Новокуйбышевск',
'Чапаевск',
'Отрадный',
'Бугуруслан',
'Белебей',
'Кинешма',
'Шуя',
'Троицк',
'Снежинск',
'Озерск',
'Сатка',
'Кыштым',
'Апатиты',
'Кандалакша',
'Мончегорск',
'Губкинский',
'Лабытнанги'
];

const majorCityNames = {
  'Москва': 'Moscow',
  'Санкт-Петербург': 'Saint Petersburg',
  'Нижний Новгород': 'Nizhny Novgorod',
  'Ростов-на-Дону': 'Rostov-on-Don',
  'Новосибирск': 'Novosibirsk',
  'Екатеринбург': 'Yekaterinburg',
  'Краснодар': 'Krasnodar',
  'Казань': 'Kazan',
  'Самара': 'Samara',
  'Уфа': 'Ufa',
  'Челябинск': 'Chelyabinsk',
  'Пермь': 'Perm',
  'Воронеж': 'Voronezh',
  'Красноярск': 'Krasnoyarsk',
  'Тюмень': 'Tyumen',
  'Сочи': 'Sochi'
};

const majorCityCodes = {
  'Москва': 'MSK',
  'Санкт-Петербург': 'SPB',
  'Новосибирск': 'OVB',
  'Екатеринбург': 'SVX',
  'Казань': 'KZN',
  'Краснодар': 'KRD',
  'Сочи': 'AER',
  'Самара': 'KUF',
  'Уфа': 'UFA',
  'Ростов-на-Дону': 'ROV',
  'Челябинск': 'CEK',
  'Красноярск': 'KJA',
  'Тюмень': 'TJM'
};

function transliterateCity(text) {
  const map = {
    'А':'A','Б':'B','В':'V','Г':'G','Д':'D',
    'Е':'E','Ё':'E','Ж':'Zh','З':'Z','И':'I',
    'Й':'Y','К':'K','Л':'L','М':'M','Н':'N',
    'О':'O','П':'P','Р':'R','С':'S','Т':'T',
    'У':'U','Ф':'F','Х':'Kh','Ц':'Ts','Ч':'Ch',
    'Ш':'Sh','Щ':'Sch','Ъ':'','Ы':'Y','Ь':'',
    'Э':'E','Ю':'Yu','Я':'Ya',
    'а':'a','б':'b','в':'v','г':'g','д':'d',
    'е':'e','ё':'e','ж':'zh','з':'z','и':'i',
    'й':'y','к':'k','л':'l','м':'m','н':'n',
    'о':'o','п':'p','р':'r','с':'s','т':'t',
    'у':'u','ф':'f','х':'kh','ц':'ts','ч':'ch',
    'ш':'sh','щ':'sch','ъ':'','ы':'y','ь':'',
    'э':'e','ю':'yu','я':'ya'
  };

  return text
    .split('')
    .map(char => map[char] || char)
    .join('');
}

function getRouteName(city) {
  return majorCityNames[city] || transliterateCity(city);
}

function getNodeCode(city) {
  if (majorCityCodes[city]) {
    return majorCityCodes[city];
  }

  const latin = transliterateCity(city)
    .replace(/[^a-zA-Z]/g, '')
    .toUpperCase();

  return latin.substring(0, 3);
}

const tariffs = [

  'Эконом',
  'Комфорт',
  'Комфорт+'

];

// ===== DAILY STATS =====

let dailyStats = {

  economy: 0,
  comfort: 0,
  comfortPlus: 0,
  date: new Date().toLocaleDateString()

};

function loadStats() {

  const saved =
    localStorage.getItem('buster_stats');

  if (saved) {

    dailyStats =
      JSON.parse(saved);

  }

  const today =
    new Date().toLocaleDateString();

  if (dailyStats.date !== today) {

    resetStats();

  }

  updateStatsUI();

}

function saveStats() {

  localStorage.setItem(
    'buster_stats',
    JSON.stringify(dailyStats)
  );

}

function resetStats() {

  dailyStats = {

    economy: 0,
    comfort: 0,
    comfortPlus: 0,
    date: new Date().toLocaleDateString()

  };

  saveStats();

  updateStatsUI();

}

function updateStatsUI() {

  if (economTime) {

    economTime.textContent =
      formatTime(dailyStats.economy);

  }

  if (comfortTime) {

    comfortTime.textContent =
      formatTime(dailyStats.comfort);

  }

  if (comfortPlusTime) {

    comfortPlusTime.textContent =
      formatTime(dailyStats.comfortPlus);

  }

}

function addSecondToTariff() {

  const tariff =
    tariffInput.value.trim();

  if (tariff === 'Эконом') {

    dailyStats.economy++;

  }

  if (tariff === 'Комфорт') {

    dailyStats.comfort++;

  }

  if (tariff === 'Комфорт+') {

    dailyStats.comfortPlus++;

  }

  saveStats();

  updateStatsUI();

}
// ===== DROPDOWN =====

function setupDropdown(input, items) {

  const wrapper =
    document.createElement('div');

  wrapper.style.position = 'relative';

  input.parentNode.insertBefore(
    wrapper,
    input
  );

  wrapper.appendChild(input);

  const dropdown =
    document.createElement('div');

  dropdown.style.position = 'absolute';
  dropdown.style.top = '58px';
  dropdown.style.left = '0';
  dropdown.style.width = '100%';
  dropdown.style.background = '#111';
  dropdown.style.border =
    '1px solid rgba(255,255,255,0.08)';
  dropdown.style.borderRadius = '16px';
  dropdown.style.zIndex = '999';
  dropdown.style.maxHeight = '220px';
  dropdown.style.overflowY = 'auto';
  dropdown.style.display = 'none';
  dropdown.style.backdropFilter = 'blur(20px)';

  wrapper.appendChild(dropdown);

  function renderItems(filter = '') {

    dropdown.innerHTML = '';

    const filtered = items.filter(item =>
      item.toLowerCase().includes(
        filter.toLowerCase()
      )
    );

    filtered.forEach(item => {

      const option =
        document.createElement('div');

      option.innerText = item;

      option.style.padding =
        '14px 16px';

      option.style.cursor =
        'pointer';

      option.style.borderBottom =
        '1px solid rgba(255,255,255,0.04)';

      option.style.color =
        'white';

      option.addEventListener(
        'click',
        () => {

          input.value = item;

          dropdown.style.display =
            'none';

          if (input === cityInput) {

            updateRouteAndNode(item);

          }

        }
      );

      option.addEventListener(
        'mouseenter',
        () => {

          option.style.background =
            'rgba(108,60,255,0.15)';

        }
      );

      option.addEventListener(
        'mouseleave',
        () => {

          option.style.background =
            'transparent';

        }
      );

      dropdown.appendChild(option);

    });

  }

  renderItems();

  input.addEventListener(
    'input',
    () => {

      renderItems(input.value);

      dropdown.style.display =
        'block';

    }
  );

  input.addEventListener(
    'focus',
    () => {

      renderItems(input.value);

      dropdown.style.display =
        'block';

    }
  );

  document.addEventListener(
    'click',
    (e) => {

      if (!wrapper.contains(e.target)) {

        dropdown.style.display =
          'none';

      }

    }
  );

}

// ===== ROUTE & NODE =====

function updateRouteAndNode(city) {

  routeValue.textContent =
    getRouteName(city);

  const randomNumber =
    Math.floor(Math.random() * 9) + 1;

  nodeValue.textContent =
    `${getNodeCode(city)}-${randomNumber}`;

}

setupDropdown(cityInput, russianCities);

setupDropdown(tariffInput, tariffs);
setupDropdown(cityInput, russianCities);

setupDropdown(tariffInput, tariffs);

// ===== SUBSCRIPTION =====

async function checkSubscription() {

  try {

    const response = await fetch(
      `${BACKEND_URL}/check-subscription/${telegramUserId}`
    );

    const result =
      await response.json();

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
      min-height:100vh;
      background:
linear-gradient(
rgba(0,0,0,0.88),
rgba(0,0,0,0.88)
),
url('./assets/map.png');

background-size:cover;
background-position:center;
background-repeat:no-repeat;
      display:flex;
      flex-direction:column;
      justify-content:center;
      align-items:center;
      padding:30px;
      box-sizing:border-box;
      color:white;
      font-family:sans-serif;
      text-align:center;
      overflow-y:auto;
    ">

      

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
margin-top:25px;
text-align:left;
max-width:320px;
font-size:15px;
line-height:1.8;
opacity:0.9;
">

<div>✓ AI-помощник для водителей</div>
<div>✓ Анализ погоды</div>
<div>✓ Анализ дорожной ситуации</div>
<div>✓ Статистика активности</div>
<div>✓ История использования</div>
<div>✓ Все будущие обновления</div>

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
  onclick="activateTrial()"
  style="
    margin-top:25px;
    width:100%;
    max-width:360px;
    height:60px;
    border:1px solid rgba(255,255,255,0.15);
    border-radius:18px;
    background:rgba(255,255,255,0.05);
    color:white;
    font-size:18px;
    font-weight:600;
  "
>
Попробовать бесплатно 1 час
</button>

      <button
        onclick="openPayment()"
        style="
          margin-top:25px;
          width:100%;
          max-width:360px;
          height:72px;
          border:none;
          border-radius:18px;
          background:#6c3cff;
          color:white;
          font-size:22px;
          font-weight:700;
        "
      >
        ОПЛАТИТЬ
      </button>

      <div class="payment-links">
  <a
onclick="Telegram.WebApp.openLink('https://buster-app-three.vercel.app/privacy.html')"
>
Политика
</a>
  <span>•</span>
<a
onclick="Telegram.WebApp.openLink('https://buster-app-three.vercel.app/oferta.html')"
>
Оферта
</a>
  <span>•</span>
  <a
onclick="Telegram.WebApp.openLink('https://buster-app-three.vercel.app/refund.html')"
>
Возврат
</a>
  <span>•</span>
  <a
onclick="Telegram.WebApp.openLink('https://buster-app-three.vercel.app/contacts.html')"
>
Контакты
</a>
</div>

<div class="payment-agreement">
  Нажимая кнопку «Оплатить», вы принимаете условия оферты и политики конфиденциальности.
</div>

    </div>

  `;

}

async function activateTrial() {

  try {

    const response = await fetch(
      `${BACKEND_URL}/activate-trial`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          telegram_id: telegramUserId
        })
      }
    );

    const result = await response.json();

    if (!result.success) {
      alert(
        result.error ||
        'Пробный период уже использован'
      );
      return;
    }

    alert(
      'Пробный доступ активирован на 1 час'
    );

    location.reload();

  } catch (err) {

    console.error(err);

    alert(
      'Ошибка активации пробного доступа'
    );

  }

}

function openPayment() {

  tg.showAlert(
    'Касса подключается'
  );

}

// ===== SAVE USER =====

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

    console.log(err);

  }

}

// ===== LOAD USER =====

async function loadUserData() {

  try {

    const response = await fetch(
      `${BACKEND_URL}/user/${telegramUserId}`
    );

    const result =
      await response.json();

    if (
      result.success &&
      result.user
    ) {

      cityInput.value =
        result.user.city || '';

        updateRouteAndNode(
         result.user.city
      );

      tariffInput.value =
        result.user.tariff || '';

      ratingInput.value =
        result.user.rating || '';

      console.log(
        'USER DATA LOADED:',
        result.user
      );

    }

  } catch (err) {

    console.log(
      'LOAD USER ERROR:',
      err
    );

  }

}

// ===== SAVE BUTTON + USER ID =====

setTimeout(() => {

  if (settingsScreen) {

    const userIdBlock =
      document.createElement('div');

    userIdBlock.style.marginTop =
      '20px';

    userIdBlock.style.marginBottom =
      '20px';

    userIdBlock.style.padding =
      '18px';

    userIdBlock.style.borderRadius =
      '18px';

    userIdBlock.style.background =
      'rgba(255,255,255,0.03)';

    userIdBlock.style.border =
      '1px solid rgba(255,255,255,0.05)';

    userIdBlock.innerHTML = `

      <div style="
        opacity:0.55;
        font-size:13px;
        margin-bottom:8px;
        letter-spacing:2px;
      ">
        USER ID
      </div>

      <div style="
        font-size:18px;
        font-weight:700;
        color:white;
      ">
        ${telegramUserId}
      </div>

    `;

    settingsScreen.appendChild(
      userIdBlock
    );

    const saveButton =
      document.createElement('button');

    saveButton.innerText =
      'СОХРАНИТЬ ДАННЫЕ';

   saveButton.style.marginTop =
  '14px';

saveButton.style.width =
  '100%';

saveButton.style.minHeight =
  '64px';

saveButton.style.padding =
  '0 24px';

saveButton.style.border =
  'none';

saveButton.style.borderRadius =
  '22px';

saveButton.style.background =
  'linear-gradient(135deg,#7c3aed,#6d28d9)';

saveButton.style.color =
  'white';

saveButton.style.fontSize =
  '18px';

saveButton.style.fontWeight =
  '800';

saveButton.style.letterSpacing =
  '1px';

saveButton.style.boxShadow =
  '0 0 35px rgba(124,58,237,0.55)';

saveButton.style.flexShrink =
  '0';

    saveButton.onclick =
      async () => {

        await saveUserData();

      };

    settingsScreen.appendChild(
      saveButton
    );

  }

}, 800);

loadUserData();

// ===== LOGIC =====

let enabled = false;

let seconds = 0;

let interval = null;

let pingInterval = null;

let consoleInterval = null;

let nodeInterval = null;

let currentLatitude = null;

let currentLongitude = null;

let currentDistrict = 'Неизвестно';

let locationInterval = null;

let waitingSessions = [];

const savedWaitingSessions =
  localStorage.getItem(
    'buster_waiting_sessions'
  );

if (savedWaitingSessions) {

  waitingSessions =
    JSON.parse(savedWaitingSessions);

}

function startLocationTracking() {

  if (locationInterval) {
  return;
}

  if (!navigator.geolocation) {

    console.log(
      'Geolocation not supported'
    );

    return;

  }

  updateLocation();

  setTimeout(() => {

  if (
    currentLatitude &&
    currentLongitude
  ) {

    detectDistrict(
      currentLatitude,
      currentLongitude
    );

  }

}, 2500);

  locationInterval = setInterval(() => {

    updateLocation();

  }, 20000);

}

function stopLocationTracking() {

  clearInterval(locationInterval);

}

function updateLocation() {

  navigator.geolocation.getCurrentPosition(

    (position) => {

      currentLatitude =
        position.coords.latitude;

      currentLongitude =
        position.coords.longitude;

      console.log(
        'GPS:',
        currentLatitude,
        currentLongitude
      );

      detectDistrict(
  currentLatitude,
  currentLongitude
);

    },

    (error) => {

      console.log(
        'GPS ERROR:',
        error
      );

    },

    {

      enableHighAccuracy: true,

      timeout: 10000,

      maximumAge: 5000

    }

  );

}

async function detectDistrict(lat, lng) {

  try {

    const response = await fetch(

  `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&zoom=16&addressdetails=1`,

  {

    headers: {

      'Accept': 'application/json',

      'User-Agent':
        'BUSTER/1.0'

    }

  }

);

    const data =
      await response.json();

currentDistrict =

  data.address.city_district ||

  data.address.suburb ||

  data.address.neighbourhood ||

  data.address.quarter ||

  data.address.borough ||

  data.address.town ||

  data.address.village ||

  data.address.city ||

  'Неизвестно';

    console.log(
      'DISTRICT:',
      currentDistrict
    );

  } catch (err) {

    console.log(
      'DISTRICT ERROR:',
      err
    );

  }

}

function renderAnalytics() {

  if (!analyticsContainer) return;

  analyticsContainer.innerHTML = '';

  const reversedSessions =
    [...waitingSessions].reverse();

  reversedSessions.forEach(session => {

    const card =
      document.createElement('div');

    card.classList.add(
      'analytics-card'
    );

    card.innerHTML = `

      <div class="analytics-title">
        ГОРОД
      </div>

      <div class="analytics-value">
        ${session.city || 'Неизвестно'}
      </div>

      <div class="analytics-divider"></div>

      <div class="analytics-title">
        РАЙОН
      </div>

      <div class="analytics-value">
        ${session.district || 'Неизвестно'}
      </div>

      <div class="analytics-divider"></div>

      <div class="analytics-title">
        ТАРИФ
      </div>

      <div class="analytics-value">
        ${session.tariff || 'Неизвестно'}
      </div>

      <div class="analytics-divider"></div>

      <div class="analytics-title">
        ВРЕМЯ ОЖИДАНИЯ
      </div>

      <div class="analytics-value">
        ${formatTime(session.wait_time || 0)}
      </div>

      <div class="analytics-divider"></div>

      <div class="analytics-title">
        ДАТА
      </div>

      <div class="analytics-value">
        ${session.date || 'Неизвестно'}
      </div>

    `;

    analyticsContainer.appendChild(
      card
    );

  });

}

function saveWaitingSession(waitTime) {

  const city =
    cityInput.value.trim();

  const tariff =
    tariffInput.value.trim();

  const waitingData = {

    city: city,

    district: currentDistrict,

    tariff: tariff,

    wait_time: waitTime,

    lat: currentLatitude,

    lng: currentLongitude,

    date:
      new Date().toLocaleDateString(),

    created_at:
      new Date().toISOString()

  };

  waitingSessions.push(
    waitingData
  );

  localStorage.setItem(

    'buster_sessions',

    JSON.stringify(waitingSessions)

  );

  renderAnalytics();

  console.log(
    'WAITING SAVED:',
    waitingData
  );

}

const logs = [

'GPS signal acquired...',
'Location synchronization completed...',
'District identified successfully...',
'Demand analysis started...',
'Local demand index updated...',
'Pickup activity recalculated...',
'Traffic density evaluated...',
'Route probability matrix updated...',
'AI recommendation prepared...',
'Weather data synchronized...',
'Weather impact calculated...',
'Driver activity profile updated...',
'Idle time statistics refreshed...',
'Demand forecast recalculated...',
'Nearby district comparison completed...',
'Traffic flow analysis completed...',
'Destination clusters updated...',
'High-demand corridor identified...',
'District priority recalculated...',
'Order probability model updated...',
'Regional activity metrics synchronized...',
'Peak-hour coefficient updated...',
'Route efficiency analysis completed...',
'Dynamic demand score refreshed...',
'Passenger activity trend evaluated...',
'Travel time matrix updated...',
'Operational analytics synchronized...',
'Local demand forecast prepared...',
'Driver positioning analysis completed...',
'District performance metrics updated...',
'Traffic situation reassessed...',
'Ride request probability recalculated...',
'Service area scan completed...',
'Weather-demand correlation updated...',
'Demand monitoring active...',
'Regional load balancing completed...',
'Order flow prediction updated...',
'District analytics synchronized...',
'Priority zone evaluation completed...',
'Live demand tracking active...'

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

    const randomNumber =
      Math.floor(Math.random() * 9) + 1;

    nodeValue.textContent =
      `${getNodeCode(city)}-${randomNumber}`;

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

}

function hideAllScreens() {

  aiScreen.classList.remove(
  'active-screen'
);

  analyticsScreen.classList.remove(
  'active-screen'
);

  ordersScreen.classList.remove(
  'active-screen'
);

  homeScreen.classList.remove(
    'active-screen'
  );

  historyScreen.classList.remove(
    'active-screen'
  );

  statsScreen.classList.remove(
    'active-screen'
  );

  settingsScreen.classList.remove(
    'active-screen'
  );

  homeTab.classList.remove('active');

  historyTab.classList.remove('active');

  statsTab.classList.remove('active');

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

statsTab.addEventListener('click', () => {

  hideAllScreens();

  statsScreen.classList.add(
    'active-screen'
  );

  statsTab.classList.add('active');

});

openOrdersHistory.addEventListener(
  'click',
  () => {

    hideAllScreens();

    ordersScreen.classList.add(
      'active-screen'
    );

  }
);

openAnalytics.addEventListener(
  'click',
  () => {

    hideAllScreens();

    analyticsScreen.classList.add(
      'active-screen'
    );

    renderDistrictAnalytics();

  }
);

settingsTab.addEventListener('click', () => {

  hideAllScreens();

  settingsScreen.classList.add(
    'active-screen'
  );

  settingsTab.classList.add('active');

});

powerButton.addEventListener('click', () => {

  enabled = !enabled;

  if (enabled) {

    startLocationTracking();

    powerButton.classList.remove('off');

    powerButton.classList.add('on');

    buttonIcon.textContent = '✓';

    statusText.textContent =
      'CONNECTED';

    statusValue.textContent =
      'ACTIVE';

    statusValue.style.color =
      '#8b5cf6';

    glow.style.background =
      'radial-gradient(circle, rgba(139,92,246,0.35), transparent 70%)';

    interval = setInterval(() => {

      seconds++;

      addSecondToTariff();

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

    stopLocationTracking();

    powerButton.classList.remove('on');

    powerButton.classList.add('off');

    buttonIcon.textContent = '⏻';

    statusText.textContent =
      'DISCONNECTED';

    statusValue.textContent =
      'DISCONNECTED';

    statusValue.style.color =
      'white';

    glow.style.background =
      'radial-gradient(circle, rgba(255,196,0,0.18), transparent 70%)';

    clearInterval(interval);

    clearInterval(pingInterval);

    clearInterval(consoleInterval);

  }

});

// ===== ORDER BUTTON =====

orderButton.addEventListener(
  'click',
  () => {

    enabled = false;

    powerButton.classList.remove('on');

    powerButton.classList.add('off');

    buttonIcon.textContent = '⏻';

    statusText.textContent =
      'DISCONNECTED';

    statusValue.textContent =
      'DISCONNECTED';

    statusValue.style.color =
      'white';

    clearInterval(interval);

    clearInterval(pingInterval);

    clearInterval(consoleInterval);

    const finalWaitTime =
    seconds;

    saveWaitingSession(
  finalWaitTime
);

seconds = 0;

timer.textContent =
  '00:00:00';

    stopLocationTracking();

    tg.showAlert(
      'Заказ получен'
    );

  }
);

// ===== RESET BUTTON =====

resetStatsButton.addEventListener(
  'click',
  () => {

    resetStats();

    waitingSessions = [];

localStorage.removeItem(
  'buster_waiting_sessions'
);

renderAnalytics();

    tg.showAlert(
      'Статистика сброшена'
    );

  }
);

// ===== START =====

loadStats();

renderAnalytics();

checkSubscription();

fetch(BACKEND_URL)
  .then(res => res.text())
  .then(data => {

    console.log(data);

  })
  .catch(err => {

    console.log(err);

  });

function getDistrictLevel(avg) {

  if (avg >= 0 && avg < 180) {

    return '⚡ ОЧЕНЬ ВЫСОКИЙ СПРОС';

  }

  if (avg >= 180 && avg < 360) {

    return '🟡 СРЕДНИЙ СПРОС';

  }

  if (avg >= 360 && avg < 720) {

    return '🟠 НИЗКИЙ СПРОС';

  }

  return '🔴 ОЧЕНЬ НИЗКИЙ СПРОС';

}

function getDistrictWaitType(avg) {

  if (avg >= 0 && avg < 180) {

    return 'НИЗКИЙ ПРОСТОЙ';

  }

  if (avg >= 180 && avg < 360) {

    return 'СРЕДНИЙ ПРОСТОЙ';

  }

  if (avg >= 360 && avg < 720) {

    return 'ДОЛГИЙ ПРОСТОЙ';

  }

  return 'КРИТИЧЕСКИЙ ПРОСТОЙ';

}

function renderDistrictAnalytics() {

  if (!districtAnalytics) return;

  districtAnalytics.innerHTML = '';

  const sessions =
    JSON.parse(
      localStorage.getItem(
        'buster_sessions'
      ) || '[]'
    );

  const grouped = {};

  sessions.forEach(session => {
    console.log(session);

    const district =
      session.district || 'Неизвестно';

    if (!grouped[district]) {

      grouped[district] = [];

    }

    grouped[district].push(
  session.waitTime ||
  session.wait_time ||
  0
);

  });

  Object.keys(grouped).forEach(
    district => {

      const waits =
        grouped[district];

      const avg =
        waits.reduce(
          (a, b) => a + b,
          0
        ) / waits.length;

      const percent =
        Math.min(
          avg / 10,
          100
        );

      const card =
        document.createElement('div');

      card.className =
        'analytics-card';

      card.innerHTML = `

        <div class="analytics-title">
          РАЙОН
        </div>

        <div class="analytics-value">
          ${district}
        </div>

        <div style="
          width:100%;
          height:14px;
          border-radius:999px;
          overflow:hidden;
          background:rgba(255,255,255,0.05);
          margin-bottom:18px;
        ">

          <div style="
            width:${percent}%;
            height:100%;
            background:linear-gradient(
              90deg,
              #7c3aed,
              #a855f7
            );
          ">
          </div>

        </div>

        <div class="analytics-title">
          ${getDistrictWaitType(avg)}
        </div>

        <div class="analytics-value">
          ${formatTime(
            Math.floor(avg)
          )}
        </div>

        <div class="analytics-title">
          УРОВЕНЬ
        </div>

        <div class="analytics-value">
          ${getDistrictLevel(avg)}
        </div>

      `;

      districtAnalytics.appendChild(
        card
      );

    }
  );

}

function addAiMessage(text) {

  const message =
    document.createElement('div');

  message.className =
    'ai-message';

  message.innerHTML = `

    <div class="ai-badge">
      AI
    </div>

    <div class="ai-text">
      ${text}
    </div>

  `;

  aiChat.appendChild(message);

}

sendAiMessage.addEventListener(
  'click',
  async () => {

    console.log('AI CLICK WORKS');

    const text =
      aiInput.value.trim();

    if (!text) return;

    const userMessage =
      document.createElement('div');

    userMessage.className =
      'ai-message';

    userMessage.innerHTML = `

      <div class="ai-badge">
        YOU
      </div>

      <div class="ai-text">
        ${text}
      </div>

    `;

    aiChat.appendChild(
      userMessage
    );

    aiInput.value = '';

    try {


      const response =
        await fetch(
          'https://bus-backend-production-1f45.up.railway.app/ai-chat',
          {
            

            method: 'POST',

            headers: {
              'Content-Type':
                'application/json'
            },

            body: JSON.stringify({
  message: text,
  district: currentDistrict,
  city: cityInput.value,
  latitude: currentLatitude,
  longitude: currentLongitude
})

          }
        );



      const data =
        await response.json();

      addAiMessage(
        data.reply
      );

    } catch (err) {

      addAiMessage(
        'Ошибка AI соединения'
      );

    }

  }
);

aiFloatingButton.addEventListener(
  'click',
  () => {

    hideAllScreens();

    aiScreen.classList.add(
      'active-screen'
    );

  }
);