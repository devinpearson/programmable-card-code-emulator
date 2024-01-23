"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createTransaction = void 0;
const merchant_category_1 = require("./merchant-category");
const country_1 = require("./country");
const currency_1 = require("./currency");
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
  const category = (0, merchant_category_1.merchantCategoryFromCode)(
    merchantCode,
  );
  const cc = (0, currency_1.currencyFromString)(currencyCode.toUpperCase());
  return {
    accountNumber: "10000000000",
    dateTime: dateString,
    centsAmount: centsAmount,
    currencyCode: cc.toLowerCase(),
    type: "card",
    reference: "simulation",
    card: {
      id: "2280000",
    },
    merchant: {
      category: category,
      name: merchantName,
      city: merchantCity,
      country: country,
    },
  };
};
exports.createTransaction = createTransaction;
