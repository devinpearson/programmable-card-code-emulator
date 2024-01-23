import { Merchant } from "./merchant";
import { merchantCategoryFromCode } from "./merchant-category";
import { countryFromString } from "./country";
import { currencyFromString } from "./currency";

export interface Transaction {
        accountNumber: string;
        dateTime: string;
        centsAmount: number;
        currencyCode: string;
        type: string;
        reference: string;
        card: {
          id: string;
        };
        merchant: Merchant;
    }
    
export const createTransaction = (
        currencyCode: string,
        centsAmount: number,
        merchantCode: string,
        merchantName: string,
        merchantCity: string,
        countryCode: string,
      ): Transaction => {
        let date = new Date();
        let dateString = date.toISOString();
        const country = countryFromString(countryCode.toUpperCase())
        const category = merchantCategoryFromCode(merchantCode);
        const cc = currencyFromString(currencyCode.toUpperCase());
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