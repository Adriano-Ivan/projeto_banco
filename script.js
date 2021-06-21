"use strict";

// Buttons
const logAccountButton = document.querySelector(".enter_account_button");
const transferMoneyButton = document.querySelector(".send-money-button");
const loanMoneyButton = document.querySelector(".loan-money-button");
const closeAccountButton = document.querySelector(".close-account-button");
const sortValuesButton = document.querySelector(".sort-values-button");

// Elements
const movementsArea = document.querySelector(".movements");
const totalDeposits = document.querySelector(".deposits-total span");
const totalWithdrawals = document.querySelector(".withdrawals-total span");
const totalInterest = document.querySelector(".interest-total span");
const balanceArea = document.querySelector(".balance");
const welcomeArea = document.querySelector(".welcome");
const valueBalanceArea = document.querySelector(".value-balance");

// Inputs
const loginInput = document.querySelector(".username");
const idInput = document.querySelector(".id-user");
const transferUserInput = document.querySelector("#receiver-name");
const valueTransferInput = document.querySelector("#value-money-transfer");
const loanUserInput = document.querySelector("#username-loan");
const valueLoanInput = document.querySelector("#value-money-loan");
const closeUserInput = document.querySelector("#username-now");
const closePinUserInput = document.querySelector("#pin-user");

// Functions
const displayMovements = function (movs) {
  movementsArea.innerHTML = "";

  movs.forEach(function (mov, i) {
    const type = mov > 0 ? "deposit" : "withdrawal";

    const html = `<div class="movement">
    <div class="${type}_date">
      <div class="${type}">${i + 1} ${type}</div>
      <div class="date">17/05/2020</div>
    </div>
    <div class="value">R$${mov}</div>
  </div>`;

    movementsArea.insertAdjacentHTML("afterbegin", html);
  });
};

const calcDisplayBalance = function (acc) {
  acc.balance = acc.movements.reduce((ac, mov) => ac + mov, 0);
  valueBalanceArea.textContent = `R$ ${acc.balance}`;
};

const calcDisplaySummary = function (acc) {
  const incomes = acc.movements
    .filter((mov) => mov > 0)
    .reduce((ac, mov) => ac + mov, 0);
  totalDeposits.textContent = `R$ ${incomes}`;

  const out = acc.movements
    .filter((mov) => mov < 0)
    .reduce((ac, mov) => ac + mov, 0);
  totalWithdrawals.textContent = `R$ ${Math.abs(out)}`;

  const interest = acc.movements
    .filter((mov) => mov > 0)
    .map((deposit) => (deposit * acc.interestRate) / 100)
    .filter((interest, i, arr) => {
      //console.log(arr);
      return interest >= 1;
    })
    .reduce((ac, interest) => ac + interest, 0);
  totalInterest.textContent = `R$ ${interest}`;
};

displayMovements(account1.movements);
calcDisplayBalance(account1);
calcDisplaySummary(account1);
