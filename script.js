"use strict";

// Buttons
const logAccountButton = document.querySelector(".enter_account_button");
const transferMoneyButton = document.querySelector(".send-money-button");
const loanMoneyButton = document.querySelector(".loan-money-button");
const closeAccountButton = document.querySelector(".close-account-button");
const sortValuesButton = document.querySelector(".sort-values-button");

// Elements
const movementsArea = document.querySelector(".movements");
const totalDeposits = document.querySelector(".deposits-total");
const totalWithdrawals = document.querySelector(".withdrawals-total");
const totalInterests = document.querySelector(".interest-total");
const balanceArea = document.querySelector(".balance");

// Inputs
const loginInput = document.querySelector(".username");
const idInput = document.querySelector(".id-user");
const transferUserInput = document.querySelector("#receiver-name");
const valueTransferInput = document.querySelector("#value-money-transfer");
const loanUserInput = document.querySelector("#username-loan");
const valueLoanInput = document.querySelector("#value-money-loan");
const closeUserInput = document.querySelector("#username-now");
const closePinUserInput = document.querySelector("#pin-user");
