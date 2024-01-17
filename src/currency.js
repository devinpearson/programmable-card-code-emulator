"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.currencyCodeToName =
  exports.currencyNameMap =
  exports.CurrencyCode =
    void 0;
var CurrencyCode;
(function (CurrencyCode) {
  CurrencyCode["AED"] = "aed";
  CurrencyCode["AFA"] = "afa";
  CurrencyCode["ALL"] = "all";
  CurrencyCode["AMD"] = "amd";
  CurrencyCode["ANG"] = "ang";
  CurrencyCode["AOA"] = "aoa";
  CurrencyCode["ARS"] = "ars";
  CurrencyCode["AUD"] = "aud";
  CurrencyCode["AWG"] = "awg";
  CurrencyCode["AZM"] = "azm";
  CurrencyCode["BAM"] = "bam";
  CurrencyCode["BBD"] = "bbd";
  CurrencyCode["BDT"] = "bdt";
  CurrencyCode["BGN"] = "bgn";
  CurrencyCode["BHD"] = "bhd";
  CurrencyCode["BIF"] = "bif";
  CurrencyCode["BMD"] = "bmd";
  CurrencyCode["BND"] = "bnd";
  CurrencyCode["BOB"] = "bob";
  CurrencyCode["BRL"] = "brl";
  CurrencyCode["BSD"] = "bsd";
  CurrencyCode["BTN"] = "btn";
  CurrencyCode["BWP"] = "bwp";
  CurrencyCode["BYR"] = "byr";
  CurrencyCode["BZD"] = "bzd";
  CurrencyCode["CAD"] = "cad";
  CurrencyCode["CDF"] = "cdf";
  CurrencyCode["CHF"] = "chf";
  CurrencyCode["CLP"] = "clp";
  CurrencyCode["CNY"] = "cny";
  CurrencyCode["COP"] = "cop";
  CurrencyCode["CRC"] = "crc";
  CurrencyCode["CSD"] = "csd";
  CurrencyCode["CUP"] = "cup";
  CurrencyCode["CVE"] = "cve";
  CurrencyCode["CYP"] = "cyp";
  CurrencyCode["CZK"] = "czk";
  CurrencyCode["DJF"] = "djf";
  CurrencyCode["DKK"] = "dkk";
  CurrencyCode["DOP"] = "dop";
  CurrencyCode["DZD"] = "dzd";
  CurrencyCode["EEK"] = "eek";
  CurrencyCode["EGP"] = "egp";
  CurrencyCode["ERN"] = "ern";
  CurrencyCode["ETB"] = "etb";
  CurrencyCode["EUR"] = "eur";
  CurrencyCode["FJD"] = "fjd";
  CurrencyCode["FKP"] = "fkp";
  CurrencyCode["GBP"] = "gbp";
  CurrencyCode["GEL"] = "gel";
  CurrencyCode["GGP"] = "ggp";
  CurrencyCode["GHC"] = "ghc";
  CurrencyCode["GIP"] = "gip";
  CurrencyCode["GMD"] = "gmd";
  CurrencyCode["GNF"] = "gnf";
  CurrencyCode["GTQ"] = "gtq";
  CurrencyCode["GYD"] = "gyd";
  CurrencyCode["HKD"] = "hkd";
  CurrencyCode["HNL"] = "hnl";
  CurrencyCode["HRK"] = "hrk";
  CurrencyCode["HTG"] = "htg";
  CurrencyCode["HUF"] = "huf";
  CurrencyCode["IDR"] = "idr";
  CurrencyCode["ILS"] = "ils";
  CurrencyCode["IMP"] = "imp";
  CurrencyCode["INR"] = "inr";
  CurrencyCode["IQD"] = "iqd";
  CurrencyCode["IRR"] = "irr";
  CurrencyCode["ISK"] = "isk";
  CurrencyCode["JEP"] = "jep";
  CurrencyCode["JMD"] = "jmd";
  CurrencyCode["JOD"] = "jod";
  CurrencyCode["JPY"] = "jpy";
  CurrencyCode["KES"] = "kes";
  CurrencyCode["KGS"] = "kgs";
  CurrencyCode["KHR"] = "khr";
  CurrencyCode["KMF"] = "kmf";
  CurrencyCode["KPW"] = "kpw";
  CurrencyCode["KRW"] = "krw";
  CurrencyCode["KWD"] = "kwd";
  CurrencyCode["KYD"] = "kyd";
  CurrencyCode["KZT"] = "kzt";
  CurrencyCode["LAK"] = "lak";
  CurrencyCode["LBP"] = "lbp";
  CurrencyCode["LKR"] = "lkr";
  CurrencyCode["LRD"] = "lrd";
  CurrencyCode["LSL"] = "lsl";
  CurrencyCode["LTL"] = "ltl";
  CurrencyCode["LVL"] = "lvl";
  CurrencyCode["LYD"] = "lyd";
  CurrencyCode["MAD"] = "mad";
  CurrencyCode["MDL"] = "mdl";
  CurrencyCode["MGA"] = "mga";
  CurrencyCode["MKD"] = "mkd";
  CurrencyCode["MMK"] = "mmk";
  CurrencyCode["MNT"] = "mnt";
  CurrencyCode["MOP"] = "mop";
  CurrencyCode["MRO"] = "mro";
  CurrencyCode["MTL"] = "mtl";
  CurrencyCode["MUR"] = "mur";
  CurrencyCode["MVR"] = "mvr";
  CurrencyCode["MWK"] = "mwk";
  CurrencyCode["MXN"] = "mxn";
  CurrencyCode["MYR"] = "myr";
  CurrencyCode["MZM"] = "mzm";
  CurrencyCode["NAD"] = "nad";
  CurrencyCode["NGN"] = "ngn";
  CurrencyCode["NIO"] = "nio";
  CurrencyCode["NOK"] = "nok";
  CurrencyCode["NPR"] = "npr";
  CurrencyCode["NZD"] = "nzd";
  CurrencyCode["OMR"] = "omr";
  CurrencyCode["PAB"] = "pab";
  CurrencyCode["PEN"] = "pen";
  CurrencyCode["PGK"] = "pgk";
  CurrencyCode["PHP"] = "php";
  CurrencyCode["PKR"] = "pkr";
  CurrencyCode["PLN"] = "pln";
  CurrencyCode["PYG"] = "pyg";
  CurrencyCode["QAR"] = "qar";
  CurrencyCode["ROL"] = "rol";
  CurrencyCode["RUB"] = "rub";
  CurrencyCode["RWF"] = "rwf";
  CurrencyCode["SAR"] = "sar";
  CurrencyCode["SBD"] = "sbd";
  CurrencyCode["SCR"] = "scr";
  CurrencyCode["SDD"] = "sdd";
  CurrencyCode["SEK"] = "sek";
  CurrencyCode["SGD"] = "sgd";
  CurrencyCode["SHP"] = "shp";
  CurrencyCode["SIT"] = "sit";
  CurrencyCode["SKK"] = "skk";
  CurrencyCode["SLL"] = "sll";
  CurrencyCode["SOS"] = "sos";
  CurrencyCode["SPL"] = "spl";
  CurrencyCode["SRD"] = "srd";
  CurrencyCode["STD"] = "std";
  CurrencyCode["SVC"] = "svc";
  CurrencyCode["SYP"] = "syp";
  CurrencyCode["SZL"] = "szl";
  CurrencyCode["THB"] = "thb";
  CurrencyCode["TJS"] = "tjs";
  CurrencyCode["TMM"] = "tmm";
  CurrencyCode["TND"] = "tnd";
  CurrencyCode["TOP"] = "top";
  CurrencyCode["TRL"] = "trl";
  CurrencyCode["TRY"] = "try";
  CurrencyCode["TTD"] = "ttd";
  CurrencyCode["TVD"] = "tvd";
  CurrencyCode["TWD"] = "twd";
  CurrencyCode["TZS"] = "tzs";
  CurrencyCode["UAH"] = "uah";
  CurrencyCode["UGX"] = "ugx";
  CurrencyCode["USD"] = "usd";
  CurrencyCode["UYU"] = "uyu";
  CurrencyCode["UZS"] = "uzs";
  CurrencyCode["VEB"] = "veb";
  CurrencyCode["VND"] = "vnd";
  CurrencyCode["VUV"] = "vuv";
  CurrencyCode["WST"] = "wst";
  CurrencyCode["XAF"] = "xaf";
  CurrencyCode["XAG"] = "xag";
  CurrencyCode["XAU"] = "xau";
  CurrencyCode["XCD"] = "xcd";
  CurrencyCode["XDR"] = "xdr";
  CurrencyCode["XOF"] = "xof";
  CurrencyCode["XPD"] = "xpd";
  CurrencyCode["XPF"] = "xpf";
  CurrencyCode["XPT"] = "xpt";
  CurrencyCode["YER"] = "yer";
  CurrencyCode["ZAR"] = "zar";
  CurrencyCode["ZMK"] = "zmk";
  CurrencyCode["ZWD"] = "zwd";
  // Unknown handler
  CurrencyCode["ZZZ"] = "zzz";
})(CurrencyCode || (exports.CurrencyCode = CurrencyCode = {}));
exports.currencyNameMap = {
  aed: "United Arab Emirates, Dirhams",
  afa: "Afghanistan, Afghanis",
  all: "Albania, Leke",
  amd: "Armenia, Drams",
  ang: "Netherlands Antilles, Guilders (Florins)",
  aoa: "Angola, Kwanza",
  ars: "Argentina, Pesos",
  aud: "Australia, Dollars",
  awg: "Aruba, Guilders (Florins)",
  azm: "Azerbaijan, Manats",
  bam: "Bosnia and Herzegovina, Convertible Marka",
  bbd: "Barbados, Dollars",
  bdt: "Bangladesh, Taka",
  bgn: "Bulgaria, Leva",
  bhd: "Bahrain, Dinars",
  bif: "Burundi, Francs",
  bmd: "Bermuda, Dollars",
  bnd: "Brunei Darussalam, Dollars",
  bob: "Bolivia, Bolivianos",
  brl: "Brazil, Brazil Real",
  bsd: "Bahamas, Dollars",
  btn: "Bhutan, Ngultrum",
  bwp: "Botswana, Pulas",
  byr: "Belarus, Rubles",
  bzd: "Belize, Dollars",
  cad: "Canada, Dollars",
  cdf: "Congo/Kinshasa, Congolese Francs",
  chf: "Switzerland, Francs",
  clp: "Chile, Pesos",
  cny: "China, Yuan Renminbi",
  cop: "Colombia, Pesos",
  crc: "Costa Rica, Colones",
  csd: "Serbia, Dinars",
  cup: "Cuba, Pesos",
  cve: "Cape Verde, Escudos",
  cyp: "Cyprus, Pounds",
  czk: "Czech Republic, Koruny",
  djf: "Djibouti, Francs",
  dkk: "Denmark, Kroner",
  dop: "Dominican Republic, Pesos",
  dzd: "Algeria, Algeria Dinars",
  eek: "Estonia, Krooni",
  egp: "Egypt, Pounds",
  ern: "Eritrea, Nakfa",
  etb: "Ethiopia, Birr",
  eur: "Euro Member Countries, Euro",
  fjd: "Fiji, Dollars",
  fkp: "Falkland Islands (Malvinas), Pounds",
  gbp: "United Kingdom, Pounds",
  gel: "Georgia, Lari",
  ggp: "Guernsey, Pounds",
  ghc: "Ghana, Cedis",
  gip: "Gibraltar, Pounds",
  gmd: "Gambia, Dalasi",
  gnf: "Guinea, Francs",
  gtq: "Guatemala, Quetzales",
  gyd: "Guyana, Dollars",
  hkd: "Hong Kong, Dollars",
  hnl: "Honduras, Lempiras",
  hrk: "Croatia, Kuna",
  htg: "Haiti, Gourdes",
  huf: "Hungary, Forint",
  idr: "Indonesia, Rupiahs",
  ils: "Israel, New Shekels",
  imp: "Isle of Man, Pounds",
  inr: "India, Rupees",
  iqd: "Iraq, Dinars",
  irr: "Iran, Rials",
  isk: "Iceland, Kronur",
  jep: "Jersey, Pounds",
  jmd: "Jamaica, Dollars",
  jod: "Jordan, Dinars",
  jpy: "Japan, Yen",
  kes: "Kenya, Shillings",
  kgs: "Kyrgyzstan, Soms",
  khr: "Cambodia, Riels",
  kmf: "Comoros, Francs",
  kpw: "Korea (North), Won",
  krw: "Korea (South), Won",
  kwd: "Kuwait, Dinars",
  kyd: "Cayman Islands, Dollars",
  kzt: "Kazakhstan, Tenge",
  lak: "Laos, Kips",
  lbp: "Lebanon, Pounds",
  lkr: "Sri Lanka, Rupees",
  lrd: "Liberia, Dollars",
  lsl: "Lesotho, Maloti",
  ltl: "Lithuania, Litai",
  lvl: "Latvia, Lati",
  lyd: "Libya, Dinars",
  mad: "Morocco, Dirhams",
  mdl: "Moldova, Lei",
  mga: "Madagascar, Ariary",
  mkd: "Macedonia, Denars",
  mmk: "Myanmar (Burma), Kyats",
  mnt: "Mongolia, Tugriks",
  mop: "Macau, Patacas",
  mro: "Mauritania, Ouguiyas",
  mtl: "Malta, Liri",
  mur: "Mauritius, Rupees",
  mvr: "Maldives (Maldive Islands), Rufiyaa",
  mwk: "Malawi, Kwachas",
  mxn: "Mexico, Pesos",
  myr: "Malaysia, Ringgits",
  mzm: "Mozambique, Meticais",
  nad: "Namibia, Dollars",
  ngn: "Nigeria, Nairas",
  nio: "Nicaragua, Cordobas",
  nok: "Norway, Krone",
  npr: "Nepal, Nepal Rupees",
  nzd: "New Zealand, Dollars",
  omr: "Oman, Rials",
  pab: "Panama, Balboa",
  pen: "Peru, Nuevos Soles",
  pgk: "Papua New Guinea, Kina",
  php: "Philippines, Pesos",
  pkr: "Pakistan, Rupees",
  pln: "Poland, Zlotych",
  pyg: "Paraguay, Guarani",
  qar: "Qatar, Rials",
  rol: "Romania, Lei",
  rub: "Russia, Rubles",
  rwf: "Rwanda, Rwanda Francs",
  sar: "Saudi Arabia, Riyals",
  sbd: "Solomon Islands, Dollars",
  scr: "Seychelles, Rupees",
  sdd: "Sudan, Dinars",
  sek: "Sweden, Kronor",
  sgd: "Singapore, Dollars",
  shp: "Saint Helena, Pounds",
  sit: "Slovenia, Tolars",
  skk: "Slovakia, Koruny",
  sll: "Sierra Leone, Leones",
  sos: "Somalia, Shillings",
  spl: "Seborga, Luigini",
  srd: "Suriname, Dollars",
  std: "São Tome and Principe, Dobras",
  svc: "El Salvador, Colones",
  syp: "Syria, Pounds",
  szl: "Swaziland, Emalangeni",
  thb: "Thailand, Baht",
  tjs: "Tajikistan, Somoni",
  tmm: "Turkmenistan, Manats",
  tnd: "Tunisia, Dinars",
  top: "Tonga, Pa’anga",
  trl: "Turkey, Liras (obsolete)",
  try: "Turkey, New Lira",
  ttd: "Trinidad and Tobago, Dollars",
  tvd: "Tuvalu, Tuvalu Dollars",
  twd: "Taiwan, New Dollars",
  tzs: "Tanzania, Shillings",
  uah: "Ukraine, Hryvnia",
  ugx: "Uganda, Shillings",
  usd: "United States of America, Dollars",
  uyu: "Uruguay, Pesos",
  uzs: "Uzbekistan, Sums",
  veb: "Venezuela, Bolivares",
  vnd: "Viet Nam, Dong",
  vuv: "Vanuatu, Vatu",
  wst: "Samoa, Tala",
  xaf: "Communauté Financière Africaine, Francs",
  xag: "Silver, Ounces",
  xau: "Gold, Ounces",
  xcd: "East Caribbean Dollars",
  xdr: "International Monetary Fund (IMF) Special Drawing Rights",
  xof: "Communauté Financière Africaine, Francs",
  xpd: "Palladium Ounces",
  xpf: "Comptoirs Français du Pacifique Francs",
  xpt: "Platinum, Ounces",
  yer: "Yemen, Rials",
  zar: "South Africa, Rand",
  zmk: "Zambia, Kwacha",
  zwd: "Zimbabwe, Zimbabwe Dollars",
  // Unknown handler
  zzz: "Unknown Currency",
};
/** Convert a currency code to a currency name */
const currencyCodeToName = (currencyCode) => {
  const currencyName = exports.currencyNameMap[currencyCode];
  return currencyName || CurrencyCode.ZZZ;
};
exports.currencyCodeToName = currencyCodeToName;
