import type { Country } from './country.js';
import type { MerchantCategory } from './merchant-category.js';

export interface Merchant {
  category: MerchantCategory;
  name: string;
  city: string;
  country: Country;
}
