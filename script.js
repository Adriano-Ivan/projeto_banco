"use strict";

// Buttons
const logAccountButton = document.querySelector(".enter_account_button");
const transferMoneyButton = document.querySelector(".send-money-button");
const loanMoneyButton = document.querySelector(".loan-money-button");
const closeAccountButton = document.querySelector(".close-account-button");
const sortValuesButton = document.querySelector(".sort-values-button");

// Elements
const containerMain = document.querySelector("#container-main");
const movementsArea = document.querySelector(".movements");
const totalDeposits = document.querySelector(".deposits-total span");
const totalWithdrawals = document.querySelector(".withdrawals-total span");
const totalInterest = document.querySelector(".interest-total span");
const balanceArea = document.querySelector(".balance");
const welcomeArea = document.querySelector(".welcome h1");
const valueBalanceArea = document.querySelector(".value-balance");
const dateBalanceArea = document.querySelector(".show-date");
const timeLeftArea = document.querySelector(".time-logout span");

// Inputs
const loginInput = document.querySelector(".username");
const idInput = document.querySelector(".id-user");
const transferUserInput = document.querySelector("#receiver-name");
const valueTransferInput = document.querySelector("#value-money-transfer");
const loanUserInput = document.querySelector("#username-loan");
const valueLoanInput = document.querySelector("#value-money-loan");
const closeUserInput = document.querySelector("#username-now");
const closePinUserInput = document.querySelector("#pin-user");

// Variables
let actualAccount, verifyTimerSituation, sortedOrNot;
sortedOrNot = false;

// Functions

const startLogoutTimer = function () {
  let time = 120;

  const timer = function () {
    const minute = `${Math.trunc(time / 60)}`.padStart(2, 0);
    const seconds = `${time % 60}`.padStart(2, 0);

    timeLeftArea.textContent = `${minute}:${seconds}`;

    if (time === 0) {
      containerMain.style.opacity = 0;
      welcomeArea.textContent = "Log in to get started";
      clearInterval(executionTimer);
    }

    time--;
  };

  timer();
  const executionTimer = setInterval(timer, 1000);
  return executionTimer;
};

const formatDates = function (date, localeDefined) {
  const calcDaysPassed = (date1, date2) =>
    Math.round(Math.abs(date2 - date1) / (1000 * 60 * 60 * 24));

  const daysPassed = calcDaysPassed(new Date(), date);

  if (daysPassed === 0) return "Today";
  if (daysPassed === 1) return "Yesterday";
  if (daysPassed <= 7) return `${daysPassed} days ago`;
  /*
  const dateDay = `${date.getDate()}`.padStart(2, 0);
  const dateMonth = `${date.getMonth() + 1}`.padStart(2, 0);
  const dateYear = `${date.getFullYear()}`;
  */

  //const dateFormatted = `${dateDay}/${dateMonth}/${dateYear}`;

  return new Intl.DateTimeFormat(localeDefined).format(date);
};

const formatCurrency = function (value, currency, locale) {
  const currencyFormatted = new Intl.NumberFormat(locale, {
    style: "currency",
    currency: currency,
  }).format(Math.abs(value));
  return currencyFormatted;
};

const displayMovements = function (acc) {
  movementsArea.innerHTML = "";

  const movs = sortedOrNot
    ? acc.movements.slice().sort((a, b) => a - b)
    : acc.movements;

  movs.forEach(function (mov, i) {
    const type = mov > 0 ? "deposit" : "withdrawal";

    const dateFormatted = formatDates(
      new Date(acc.movementsDates[i]),
      actualAccount.locale
    );
    const movementFormatted = formatCurrency(mov, acc.currency, acc.locale);
    const html = `<div class="movement">
    <div class="${type}_date">
      <div class="${type}">${i + 1} ${type}</div>
      <div class="date">${dateFormatted}</div>
    </div>
    <div class="value">${movementFormatted}</div>
  </div>`;

    movementsArea.insertAdjacentHTML("afterbegin", html);
  });
};

const calcDisplayBalance = function (acc) {
  acc.balance = acc.movements.reduce((ac, mov) => ac + mov, 0);
  const valueFormattedToLocale = formatCurrency(
    acc.balance,
    acc.currency,
    acc.locale
  );
  valueBalanceArea.textContent = "";
  valueBalanceArea.textContent = `${valueFormattedToLocale}`;
  valueBalanceArea.style.fontSize = "24px";
  valueBalanceArea.style.color = "darkgreen";
};

const calcDisplaySummary = function (acc) {
  const incomes = acc.movements
    .filter((mov) => mov > 0)
    .reduce((ac, mov) => ac + mov, 0);
  const incomesFormatted = formatCurrency(incomes, acc.currency, acc.locale);
  totalDeposits.textContent = `${incomesFormatted}`;

  const out = acc.movements
    .filter((mov) => mov < 0)
    .reduce((ac, mov) => ac + mov, 0);
  const outFormatted = formatCurrency(out, acc.currency, acc.locale);
  totalWithdrawals.textContent = `${outFormatted}`;

  const interest = acc.movements
    .filter((mov) => mov > 0)
    .map((deposit) => (deposit * acc.interestRate) / 100)
    .filter((interest, i, arr) => {
      //console.log(arr);
      return interest >= 1;
    })
    .reduce((ac, interest) => ac + interest, 0);
  const interestFormatted = formatCurrency(interest, acc.currency, acc.locale);
  totalInterest.textContent = `${interestFormatted}`;
};

const updateUI = function (acc) {
  displayMovements(acc);
  calcDisplaySummary(acc);
  calcDisplayBalance(acc);
};

// Sort

sortValuesButton.addEventListener("click", function () {
  sortedOrNot = !sortedOrNot;
  updateUI(actualAccount);
});
// Creation of users
const usernamesCreation = function (accs) {
  accs.forEach((acc) => {
    acc.usr = acc.owner
      .trim()
      .toLowerCase()
      .split(" ")
      .map((word) => word[0])
      .join("");
  });
};
usernamesCreation(accounts);

// Listeners
logAccountButton.addEventListener("click", function () {
  const userInput = loginInput.value;
  const id = idInput.value;

  actualAccount = accounts.find((acc) => acc.usr === userInput);
  if (actualAccount?.pin === Number(id)) {
    setTimeout(function () {
      containerMain.style.opacity = 100;
      welcomeArea.textContent = `Bem-vindo,  ${
        actualAccount.owner.split(" ")[0]
      }`;
      loginInput.value = "";
      idInput.value = "";
      const now = new Date();
      const options = {
        hour: "numeric",
        minute: "numeric",
        day: "numeric",
        month: "numeric",
        //weekday: "long",
        year: "numeric",
      };
      dateBalanceArea.textContent = `Last login: ${new Intl.DateTimeFormat(
        actualAccount.locale,
        options
      ).format(now)}`;
      loginInput.blur();
      loginInput.blur();

      if (verifyTimerSituation) clearInterval(verifyTimerSituation);
      verifyTimerSituation = startLogoutTimer();
      updateUI(actualAccount);
    }, 200);
  }
});

transferMoneyButton.addEventListener("click", function () {
  const receiver = accounts.find((acc) => acc.usr === transferUserInput.value);

  if (
    receiver &&
    Number(valueTransferInput.value) > 0 &&
    receiver.usr !== actualAccount.usr
  ) {
    setTimeout(function () {
      actualAccount.movements.push(-Number(valueTransferInput.value));
      actualAccount.movementsDates.push(new Date().toISOString());
      receiver.movements.push(Number(valueTransferInput.value));
      receiver.movementsDates.push(new Date().toISOString());
      transferUserInput.value = "";
      valueTransferInput.value = "";
      updateUI(actualAccount);
      clearInterval(verifyTimerSituation);
      verifyTimerSituation = startLogoutTimer();
    }, 500);
  }
});

loanMoneyButton.addEventListener("click", function () {
  const confirmUserName = loanUserInput.value;
  const valueOrdered = Number(valueLoanInput.value);
  console.log(valueOrdered);
  if (
    confirmUserName === actualAccount.usr &&
    actualAccount.movements.some((mov) => mov >= (valueOrdered * 10) / 100) &&
    valueOrdered > 0
  ) {
    setTimeout(function () {
      actualAccount.movements.push(valueOrdered);
      actualAccount.movementsDates.push(new Date().toISOString());
      updateUI(actualAccount);
      clearInterval(verifyTimerSituation);
      verifyTimerSituation = startLogoutTimer();
    }, 500);
  }

  loanUserInput.value = "";
  valueLoanInput.value = "";
});

closeAccountButton.addEventListener("click", function () {
  if (
    closeUserInput.value === actualAccount.usr &&
    Number(closePinUserInput.value) === actualAccount.pin
  ) {
    const indexAccount = accounts.findIndex(
      (acc) =>
        acc.usr === closeUserInput.value &&
        acc.pin === Number(closePinUserInput.value)
    );

    accounts.splice(indexAccount);

    containerMain.style.opacity = 0;
  }
});

/*
// UNIT, PERCENT, CURRENCY (STYLE OPTIONS FOR NUMBER FORMAT)
const num = 232323;
console.log(new Intl.NumberFormat("pt-BR").format(num));
console.log(new Intl.NumberFormat("en-US").format(num));
console.log(new Intl.NumberFormat("de-DE").format(num));
*/
