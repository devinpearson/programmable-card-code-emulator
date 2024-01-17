"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createTransaction = void 0;
const country_1 = require("./country");
const createTransaction = (
  currencyCode,
  centsAmount,
  merchantCode,
  merchantName,
  merchantCity,
  countryCode,
) => {
  let date = new Date();
  let dateString = date.toISOString();
  const country = (0, country_1.countryFromString)(countryCode.toUpperCase());
  return {
    accountNumber: "10000000000",
    dateTime: dateString,
    centsAmount: centsAmount,
    currencyCode: currencyCode.toLowerCase(),
    type: "card",
    reference: "simulation",
    card: {
      id: "2280000",
    },
    merchant: {
      category: {
        code: merchantCode,
        key: "bakeries",
        name: "Bakeries",
      },
      name: merchantName,
      city: merchantCity,
      country: country,
    },
  };
};
exports.createTransaction = createTransaction;
