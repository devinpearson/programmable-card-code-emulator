import { type MerchantCategory } from './merchant-category.js';
import { type Country } from './country.js';

export interface Merchant {
  category: MerchantCategory;
  name: string;
  city: string;
  country: Country;
}
