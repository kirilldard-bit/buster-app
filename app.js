const tg = window.Telegram.WebApp;

tg.ready();
tg.expand();

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
  document.getElementById('nodeValue'];

// ===== CITIES =====

const russianCities = [

'Москва',
'Санкт-Петербург',
'Новосибирск',
'Екатеринбург',
'Казань',
'Нижний Новгород',
'Челябинск',
'Самара',
'Омск',
'Ростов-на-Дону',
'Уфа',
'Красноярск',
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
'Курск',
'Ставрополь',
'Улан-Удэ',
'Сочи',
'Тверь',
'Магнитогорск',
'Брянск',
'Иваново',
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
'Петрозаводск',
'Нижневартовск',
'Новороссийск',
'Йошкар-Ола',
'Таганрог',
'Сыктывкар',
'Нальчик',
'Шахты',
'Дзержинск',
'Орск',
'Благовещенск',
'Ангарск',
'Братск',
'Подольск',
'Химки',
'Королёв',
'Мытищи',
'Люберцы',
'Балашиха',
'Домодедово',
'Одинцово',
'Красногорск',
'Раменское',
'Коломна',
'Серпухов',
'Пушкино',
'Щёлково',
'Жуковский',
'Реутов',
'Долгопрудный',
'Видное',
'Электросталь',
'Ногинск',
'Клин',
'Дубна',
'Обнинск'

];

// ===== TARIFFS =====

const tariffs = [

'Эконом',
'Комфорт',
'Комфорт+'

];

// ===== DROPDOWN =====

function setupDropdown(input, items) {

  const wrapper =
    document.createElement('div');

  wrapper.style.position =
    'relative';

  input.parentNode.insertBefore(
    wrapper,
    input
  );

  wrapper.appendChild(input);

  const dropdown =
    document.createElement('div');

  dropdown.style.position =
    'absolute';

  dropdown.style.top =
    '58px';

  dropdown.style.left =
    '0';

  dropdown.style.width =
    '100%';

  dropdown.style.background =
    '#111';

  dropdown.style.border =
    '1px solid rgba(255,255,255,0.08)';

  dropdown.style.borderRadius =
    '16px';

  dropdown.style.zIndex =
    '999';

  dropdown.style.maxHeight =
    '220px';

  dropdown.style.overflowY =
    'auto';

  dropdown.style.display =
    'none';

  wrapper.appendChild(dropdown);

  function renderItems(filter = '') {

    dropdown.innerHTML = '';

    const filtered = items.filter(
      item =>
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

      option.style.color =
        'white';

      option.addEventListener(
        'click',
        () => {

          input.value = item;

          dropdown.style.display =
            'none';

          if (input === cityInput) {

            routeValue.textContent =
              transliterate(item);

            updateNode();

          }

        }
      );

      dropdown.appendChild(option);

    });

  }

  input.addEventListener(
    'focus',
    () => {

      renderItems(input.value);

      dropdown.style.display =
        'block';

    }
  );

  input.addEventListener(
    'input',
    () => {

      renderItems(input.value);

    }
  );

  document.addEventListener(
    'click',
    e => {

      if (!wrapper.contains(e.target)) {

        dropdown.style.display =
          'none';

      }

    }
  );

}

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
    height:100vh;
    background:black;
    display:flex;
    flex-direction:column;
    justify-content:center;
    align-items:center;
    color:white;
    padding:30px;
    box-sizing:border-box;
    text-align:center;
  ">

    <img
      src="./assets/map.png"
      style="
        width:220px;
        border-radius:24px;
        margin-bottom:30px;
      "
    />

    <div style="
      font-size:36px;
      font-weight:800;
    ">
      BUSTER PREMIUM
    </div>

    <div style="
      margin-top:20px;
      opacity:0.7;
      line-height:1.5;
    ">
      Для доступа необходима
      активная подписка
    </div>

    <div style="
      margin-top:40px;
      font-size:48px;
      font-weight:800;
    ">
      490₽
    </div>

    <div style="
      opacity:0.5;
      margin-top:5px;
    ">
      в месяц
    </div>

    <button
      onclick="openPayment()"
      style="
        margin-top:40px;
        width:100%;
        max-width:320px;
        height:60px;
        border:none;
        border-radius:18px;
        background:#7c3aed;
        color:white;
        font-size:18px;
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

// ===== SAVE USER =====

async function saveUserData() {

  try {

    const payload = {

      telegram_id:
        telegramUserId,

      city:
        cityInput.value,

      tariff:
        tariffInput.value,

      rating:
        ratingInput.value

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
        'Сохранено'
      );

    }

  } catch (err) {

    console.log(err);

  }

}

// ===== SETTINGS EXTRA =====

setTimeout(() => {

  const userIdBlock =
    document.createElement('div');

  userIdBlock.style.marginTop =
    '24px';

  userIdBlock.style.padding =
    '18px';

  userIdBlock.style.borderRadius =
    '18px';

  userIdBlock.style.background =
    'rgba(255,255,255,0.03)';

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
    '#7c3aed';

  saveButton.style.color =
    'white';

  saveButton.style.fontSize =
    '16px';

  saveButton.style.fontWeight =
    '700';

  saveButton.onclick =
    async () => {

      await saveUserData();

    };

  settingsScreen.appendChild(
    saveButton
  );

}, 600);

// ===== LOGIC =====

let enabled = false;

let seconds = 0;

let interval = null;

const translitMap = {

'а':'a','б':'b','в':'v',
'г':'g','д':'d','е':'e',
'ё':'e','ж':'zh','з':'z',
'и':'i','й':'y','к':'k',
'л':'l','м':'m','н':'n',
'о':'o','п':'p','р':'r',
'с':'s','т':'t','у':'u',
'ф':'f','х':'h','ц':'ts',
'ч':'ch','ш':'sh','щ':'sch',
'ъ':'','ы':'y','ь':'',
'э':'e','ю':'yu','я':'ya'

};

function transliterate(text) {

  return text
    .toLowerCase()
    .split('')
    .map(
      char =>
        translitMap[char] || char
    )
    .join('');

}

function formatTime(sec) {

  const hrs =
    String(
      Math.floor(sec / 3600)
    ).padStart(2, '0');

  const mins =
    String(
      Math.floor((sec % 3600) / 60)
    ).padStart(2, '0');

  const secs =
    String(sec % 60)
      .padStart(2, '0');

  return `${hrs}:${mins}:${secs}`;

}

function updateNode() {

  const city =
    cityInput.value || 'NODE';

  nodeValue.textContent =
    transliterate(city)
      .substring(0, 3)
      .toUpperCase() + '-02';

}

powerButton.addEventListener(
  'click',
  () => {

    enabled = !enabled;

    if (enabled) {

      powerButton.classList.remove('off');
      powerButton.classList.add('on');

      buttonIcon.textContent = '✓';

      statusText.textContent =
        'CONNECTED';

      statusValue.textContent =
        'ACTIVE';

      // FIXED COLOR

      statusValue.style.color =
        '#8b5cf6';

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
        'OFFLINE';

      // FIXED COLOR

      statusValue.style.color =
        '#ffffff';

      clearInterval(interval);

    }

  }
);

// ===== TABS =====

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

  homeTab.classList.remove(
    'active'
  );

  historyTab.classList.remove(
    'active'
  );

  settingsTab.classList.remove(
    'active'
  );

}

homeTab.addEventListener(
  'click',
  () => {

    hideAllScreens();

    homeScreen.classList.add(
      'active-screen'
    );

    homeTab.classList.add(
      'active'
    );

  }
);

historyTab.addEventListener(
  'click',
  () => {

    hideAllScreens();

    historyScreen.classList.add(
      'active-screen'
    );

    historyTab.classList.add(
      'active'
    );

  }
);

settingsTab.addEventListener(
  'click',
  () => {

    hideAllScreens();

    settingsScreen.classList.add(
      'active-screen'
    );

    settingsTab.classList.add(
      'active'
    );

  }
);

// ===== START =====

checkSubscription();

updateNode();