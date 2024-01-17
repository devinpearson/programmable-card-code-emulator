import { Merchant } from "./merchant";
import { countryFromString } from "./country";

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