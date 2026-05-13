const tg = window.Telegram.WebApp;

tg.expand();

const telegramUser =
  tg.initDataUnsafe?.user;

console.log(
  'Telegram User:',
  telegramUser
);

async function checkAccess() {

  if (!telegramUser) {

    console.log(
      'No Telegram user'
    );

    return;
  }

  try {

    const response = await fetch(

      `https://buster-backend-production.up.railway.app/check-access?user=${telegramUser.id}`

    );

    const data =
      await response.json();

    console.log(
      'Backend response:',
      data
    );

  } catch (error) {

    console.log(
      'Backend connection error:',
      error
    );
  }
}

checkAccess();