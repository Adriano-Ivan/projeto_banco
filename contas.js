const account1 = {
  owner: "Joe Tolbad",
  movements: [2000, 29, -234, 400, -23, -80, 295, 23],
  interestRate: 1.2,
  pin: 1111,
  movementsDates: [
    "2019-11-18T21:31:17.178Z",
    "2019-12-23T07:42:02.383Z",
    "2020-01-28T09:15:04.904Z",
    "2020-04-01T10:17:24.185Z",
    "2020-05-08T14:11:59.604Z",
    "2020-02-26T17:01:17.194Z",
    "2020-07-28T23:36:17.929Z",
    "2020-08-01T10:51:36.790Z",
  ],
  locale: "en-US",
  currency: "USD",
};
const account2 = {
  owner: "Amanda Jellis",
  movements: [23, -8, 298, 35, -29, -76, 245, 67, 29],
  interestRate: 0.7,
  pin: 2222,
  movementsDates: [
    "2019-11-18T21:31:17.178Z",
    "2019-12-23T07:42:02.383Z",
    "2020-01-28T09:15:04.904Z",
    "2020-03-01T10:17:24.185Z",
    "2020-05-08T14:11:59.604Z",
    "2020-05-26T17:01:17.194Z",
    "2020-02-28T23:36:17.929Z",
    "2020-08-01T10:51:36.790Z",
    "2020-08-01T10:51:36.790Z",
  ],
  locale: "UK",
  currency: "USD",
};
const account3 = {
  owner: "Julius Soray",
  movements: [560, -78, 23, 45, 21, -6, 79, 20],
  interestRate: 0.9,
  pin: 3333,
  movementsDates: [
    "2019-11-18T21:31:17.178Z",
    "2019-12-23T07:42:02.383Z",
    "2020-01-28T09:15:04.904Z",
    "2020-04-01T10:17:24.185Z",
    "2020-05-08T14:11:59.604Z",
    "2020-05-26T17:01:17.194Z",
    "2020-04-28T23:36:17.929Z",
    "2020-08-01T10:51:36.790Z",
  ],
  locale: "en-NZ",
  currency: "RUB",
};
const account4 = {
  owner: "Adriano Ivan",
  movements: [235, 580, -25, 26, 76, 24, -8, -50, -12],
  interestRate: 1.2,
  pin: 4444,
  movementsDates: [
    "2019-11-18T21:31:17.178Z",
    "2019-12-23T07:42:02.383Z",
    "2020-01-28T09:15:04.904Z",
    "2020-04-01T10:17:24.185Z",
    "2020-05-08T14:11:59.604Z",
    "2020-05-26T17:01:17.194Z",
    "2020-06-28T23:36:17.929Z",
    "2020-08-01T10:51:36.790Z",
    "2020-08-01T10:51:36.790Z",
  ],
  currency: "BRL",
  locale: navigator.language,
};

const accounts = [account1, account2, account3, account4];
