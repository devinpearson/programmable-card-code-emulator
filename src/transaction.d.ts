import { Merchant } from "./merchant";
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
export declare const createTransaction: (currencyCode: string, centsAmount: number, merchantCode: string, merchantName: string, merchantCity: string, countryCode: string) => Transaction;
//# sourceMappingURL=transaction.d.ts.map