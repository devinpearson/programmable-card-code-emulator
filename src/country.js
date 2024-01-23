"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.countryFromAlpha3 =
  exports.countryFromString =
  exports.countryFromCode =
  exports.countries =
  exports.CountryCode =
    void 0;
/** Enum countaining all countries in Alpha-2 code format */
var CountryCode;
(function (CountryCode) {
  CountryCode["AF"] = "AF";
  CountryCode["AL"] = "AL";
  CountryCode["DZ"] = "DZ";
  CountryCode["AS"] = "AS";
  CountryCode["AD"] = "AD";
  CountryCode["AO"] = "AO";
  CountryCode["AI"] = "AI";
  CountryCode["AQ"] = "AQ";
  CountryCode["AG"] = "AG";
  CountryCode["AR"] = "AR";
  CountryCode["AM"] = "AM";
  CountryCode["AW"] = "AW";
  CountryCode["AU"] = "AU";
  CountryCode["AT"] = "AT";
  CountryCode["AZ"] = "AZ";
  CountryCode["BS"] = "BS";
  CountryCode["BH"] = "BH";
  CountryCode["BD"] = "BD";
  CountryCode["BB"] = "BB";
  CountryCode["BY"] = "BY";
  CountryCode["BE"] = "BE";
  CountryCode["BZ"] = "BZ";
  CountryCode["BJ"] = "BJ";
  CountryCode["BM"] = "BM";
  CountryCode["BT"] = "BT";
  CountryCode["BO"] = "BO";
  CountryCode["BQ"] = "BQ";
  CountryCode["BA"] = "BA";
  CountryCode["BW"] = "BW";
  CountryCode["BV"] = "BV";
  CountryCode["BR"] = "BR";
  CountryCode["IO"] = "IO";
  CountryCode["BN"] = "BN";
  CountryCode["BG"] = "BG";
  CountryCode["BF"] = "BF";
  CountryCode["BI"] = "BI";
  CountryCode["CV"] = "CV";
  CountryCode["KH"] = "KH";
  CountryCode["CM"] = "CM";
  CountryCode["CA"] = "CA";
  CountryCode["KY"] = "KY";
  CountryCode["CF"] = "CF";
  CountryCode["TD"] = "TD";
  CountryCode["CL"] = "CL";
  CountryCode["CN"] = "CN";
  CountryCode["CX"] = "CX";
  CountryCode["CC"] = "CC";
  CountryCode["CO"] = "CO";
  CountryCode["KM"] = "KM";
  CountryCode["CD"] = "CD";
  CountryCode["CG"] = "CG";
  CountryCode["CK"] = "CK";
  CountryCode["CR"] = "CR";
  CountryCode["HR"] = "HR";
  CountryCode["CU"] = "CU";
  CountryCode["CW"] = "CW";
  CountryCode["CY"] = "CY";
  CountryCode["CZ"] = "CZ";
  CountryCode["CI"] = "CI";
  CountryCode["DK"] = "DK";
  CountryCode["DJ"] = "DJ";
  CountryCode["DM"] = "DM";
  CountryCode["DO"] = "DO";
  CountryCode["EC"] = "EC";
  CountryCode["EG"] = "EG";
  CountryCode["SV"] = "SV";
  CountryCode["GQ"] = "GQ";
  CountryCode["ER"] = "ER";
  CountryCode["EE"] = "EE";
  CountryCode["SZ"] = "SZ";
  CountryCode["ET"] = "ET";
  CountryCode["FK"] = "FK";
  CountryCode["FO"] = "FO";
  CountryCode["FJ"] = "FJ";
  CountryCode["FI"] = "FI";
  CountryCode["FR"] = "FR";
  CountryCode["GF"] = "GF";
  CountryCode["PF"] = "PF";
  CountryCode["TF"] = "TF";
  CountryCode["GA"] = "GA";
  CountryCode["GM"] = "GM";
  CountryCode["GE"] = "GE";
  CountryCode["DE"] = "DE";
  CountryCode["GH"] = "GH";
  CountryCode["GI"] = "GI";
  CountryCode["GR"] = "GR";
  CountryCode["GL"] = "GL";
  CountryCode["GD"] = "GD";
  CountryCode["GP"] = "GP";
  CountryCode["GU"] = "GU";
  CountryCode["GT"] = "GT";
  CountryCode["GG"] = "GG";
  CountryCode["GN"] = "GN";
  CountryCode["GW"] = "GW";
  CountryCode["GY"] = "GY";
  CountryCode["HT"] = "HT";
  CountryCode["HM"] = "HM";
  CountryCode["VA"] = "VA";
  CountryCode["HN"] = "HN";
  CountryCode["HK"] = "HK";
  CountryCode["HU"] = "HU";
  CountryCode["IS"] = "IS";
  CountryCode["IN"] = "IN";
  CountryCode["ID"] = "ID";
  CountryCode["IR"] = "IR";
  CountryCode["IQ"] = "IQ";
  CountryCode["IE"] = "IE";
  CountryCode["IM"] = "IM";
  CountryCode["IL"] = "IL";
  CountryCode["IT"] = "IT";
  CountryCode["JM"] = "JM";
  CountryCode["JP"] = "JP";
  CountryCode["JE"] = "JE";
  CountryCode["JO"] = "JO";
  CountryCode["KZ"] = "KZ";
  CountryCode["KE"] = "KE";
  CountryCode["KI"] = "KI";
  CountryCode["KP"] = "KP";
  CountryCode["KR"] = "KR";
  CountryCode["KW"] = "KW";
  CountryCode["KG"] = "KG";
  CountryCode["LA"] = "LA";
  CountryCode["LV"] = "LV";
  CountryCode["LB"] = "LB";
  CountryCode["LS"] = "LS";
  CountryCode["LR"] = "LR";
  CountryCode["LY"] = "LY";
  CountryCode["LI"] = "LI";
  CountryCode["LT"] = "LT";
  CountryCode["LU"] = "LU";
  CountryCode["MO"] = "MO";
  CountryCode["MG"] = "MG";
  CountryCode["MW"] = "MW";
  CountryCode["MY"] = "MY";
  CountryCode["MV"] = "MV";
  CountryCode["ML"] = "ML";
  CountryCode["MT"] = "MT";
  CountryCode["MH"] = "MH";
  CountryCode["MQ"] = "MQ";
  CountryCode["MR"] = "MR";
  CountryCode["MU"] = "MU";
  CountryCode["YT"] = "YT";
  CountryCode["MX"] = "MX";
  CountryCode["FM"] = "FM";
  CountryCode["MD"] = "MD";
  CountryCode["MC"] = "MC";
  CountryCode["MN"] = "MN";
  CountryCode["ME"] = "ME";
  CountryCode["MS"] = "MS";
  CountryCode["MA"] = "MA";
  CountryCode["MZ"] = "MZ";
  CountryCode["MM"] = "MM";
  CountryCode["NA"] = "NA";
  CountryCode["NR"] = "NR";
  CountryCode["NP"] = "NP";
  CountryCode["NL"] = "NL";
  CountryCode["NC"] = "NC";
  CountryCode["NZ"] = "NZ";
  CountryCode["NI"] = "NI";
  CountryCode["NE"] = "NE";
  CountryCode["NG"] = "NG";
  CountryCode["NU"] = "NU";
  CountryCode["NF"] = "NF";
  CountryCode["MP"] = "MP";
  CountryCode["NO"] = "NO";
  CountryCode["OM"] = "OM";
  CountryCode["PK"] = "PK";
  CountryCode["PW"] = "PW";
  CountryCode["PS"] = "PS";
  CountryCode["PA"] = "PA";
  CountryCode["PG"] = "PG";
  CountryCode["PY"] = "PY";
  CountryCode["PE"] = "PE";
  CountryCode["PH"] = "PH";
  CountryCode["PN"] = "PN";
  CountryCode["PL"] = "PL";
  CountryCode["PT"] = "PT";
  CountryCode["PR"] = "PR";
  CountryCode["QA"] = "QA";
  CountryCode["MK"] = "MK";
  CountryCode["RO"] = "RO";
  CountryCode["RU"] = "RU";
  CountryCode["RW"] = "RW";
  CountryCode["RE"] = "RE";
  CountryCode["BL"] = "BL";
  CountryCode["SH"] = "SH";
  CountryCode["KN"] = "KN";
  CountryCode["LC"] = "LC";
  CountryCode["MF"] = "MF";
  CountryCode["PM"] = "PM";
  CountryCode["VC"] = "VC";
  CountryCode["WS"] = "WS";
  CountryCode["SM"] = "SM";
  CountryCode["ST"] = "ST";
  CountryCode["SA"] = "SA";
  CountryCode["SN"] = "SN";
  CountryCode["RS"] = "RS";
  CountryCode["SC"] = "SC";
  CountryCode["SL"] = "SL";
  CountryCode["SG"] = "SG";
  CountryCode["SX"] = "SX";
  CountryCode["SK"] = "SK";
  CountryCode["SI"] = "SI";
  CountryCode["SB"] = "SB";
  CountryCode["SO"] = "SO";
  CountryCode["ZA"] = "ZA";
  CountryCode["GS"] = "GS";
  CountryCode["SS"] = "SS";
  CountryCode["ES"] = "ES";
  CountryCode["LK"] = "LK";
  CountryCode["SD"] = "SD";
  CountryCode["SR"] = "SR";
  CountryCode["SJ"] = "SJ";
  CountryCode["SE"] = "SE";
  CountryCode["CH"] = "CH";
  CountryCode["SY"] = "SY";
  CountryCode["TW"] = "TW";
  CountryCode["TJ"] = "TJ";
  CountryCode["TZ"] = "TZ";
  CountryCode["TH"] = "TH";
  CountryCode["TL"] = "TL";
  CountryCode["TG"] = "TG";
  CountryCode["TK"] = "TK";
  CountryCode["TO"] = "TO";
  CountryCode["TT"] = "TT";
  CountryCode["TN"] = "TN";
  CountryCode["TR"] = "TR";
  CountryCode["TM"] = "TM";
  CountryCode["TC"] = "TC";
  CountryCode["TV"] = "TV";
  CountryCode["UG"] = "UG";
  CountryCode["UA"] = "UA";
  CountryCode["AE"] = "AE";
  CountryCode["GB"] = "GB";
  CountryCode["UM"] = "UM";
  CountryCode["US"] = "US";
  CountryCode["UY"] = "UY";
  CountryCode["UZ"] = "UZ";
  CountryCode["VU"] = "VU";
  CountryCode["VE"] = "VE";
  CountryCode["VN"] = "VN";
  CountryCode["VG"] = "VG";
  CountryCode["VI"] = "VI";
  CountryCode["WF"] = "WF";
  CountryCode["EH"] = "EH";
  CountryCode["YE"] = "YE";
  CountryCode["ZM"] = "ZM";
  CountryCode["ZW"] = "ZW";
  CountryCode["AX"] = "AX";
  // Unknown handler
  CountryCode["ZZ"] = "ZZ";
})(CountryCode || (exports.CountryCode = CountryCode = {}));
exports.countries = [
  { code: CountryCode.AF, alpha3: "AFG", name: "Afghanistan" },
  { code: CountryCode.AL, alpha3: "ALB", name: "Albania" },
  { code: CountryCode.DZ, alpha3: "DZA", name: "Algeria" },
  { code: CountryCode.AS, alpha3: "ASM", name: "American Samoa" },
  { code: CountryCode.AD, alpha3: "AND", name: "Andorra" },
  { code: CountryCode.AO, alpha3: "AGO", name: "Angola" },
  { code: CountryCode.AI, alpha3: "AIA", name: "Anguilla" },
  { code: CountryCode.AQ, alpha3: "ATA", name: "Antarctica" },
  { code: CountryCode.AG, alpha3: "ATG", name: "Antigua and Barbuda" },
  { code: CountryCode.AR, alpha3: "ARG", name: "Argentina" },
  { code: CountryCode.AM, alpha3: "ARM", name: "Armenia" },
  { code: CountryCode.AW, alpha3: "ABW", name: "Aruba" },
  { code: CountryCode.AU, alpha3: "AUS", name: "Australia" },
  { code: CountryCode.AT, alpha3: "AUT", name: "Austria" },
  { code: CountryCode.AZ, alpha3: "AZE", name: "Azerbaijan" },
  { code: CountryCode.BS, alpha3: "BHS", name: "Bahamas (the)" },
  { code: CountryCode.BH, alpha3: "BHR", name: "Bahrain" },
  { code: CountryCode.BD, alpha3: "BGD", name: "Bangladesh" },
  { code: CountryCode.BB, alpha3: "BRB", name: "Barbados" },
  { code: CountryCode.BY, alpha3: "BLR", name: "Belarus" },
  { code: CountryCode.BE, alpha3: "BEL", name: "Belgium" },
  { code: CountryCode.BZ, alpha3: "BLZ", name: "Belize" },
  { code: CountryCode.BJ, alpha3: "BEN", name: "Benin" },
  { code: CountryCode.BM, alpha3: "BMU", name: "Bermuda" },
  { code: CountryCode.BT, alpha3: "BTN", name: "Bhutan" },
  {
    code: CountryCode.BO,
    alpha3: "BOL",
    name: "Bolivia (Plurinational State of)",
  },
  {
    code: CountryCode.BQ,
    alpha3: "BES",
    name: "Bonaire, Sint Eustatius and Saba",
  },
  { code: CountryCode.BA, alpha3: "BIH", name: "Bosnia and Herzegovina" },
  { code: CountryCode.BW, alpha3: "BWA", name: "Botswana" },
  { code: CountryCode.BV, alpha3: "BVT", name: "Bouvet Island" },
  { code: CountryCode.BR, alpha3: "BRA", name: "Brazil" },
  {
    code: CountryCode.IO,
    alpha3: "IOT",
    name: "British Indian Ocean Territory (the)",
  },
  { code: CountryCode.BN, alpha3: "BRN", name: "Brunei Darussalam" },
  { code: CountryCode.BG, alpha3: "BGR", name: "Bulgaria" },
  { code: CountryCode.BF, alpha3: "BFA", name: "Burkina Faso" },
  { code: CountryCode.BI, alpha3: "BDI", name: "Burundi" },
  { code: CountryCode.CV, alpha3: "CPV", name: "Cabo Verde" },
  { code: CountryCode.KH, alpha3: "KHM", name: "Cambodia" },
  { code: CountryCode.CM, alpha3: "CMR", name: "Cameroon" },
  { code: CountryCode.CA, alpha3: "CAN", name: "Canada" },
  { code: CountryCode.KY, alpha3: "CYM", name: "Cayman Islands (the)" },
  {
    code: CountryCode.CF,
    alpha3: "CAF",
    name: "Central African Republic (the)",
  },
  { code: CountryCode.TD, alpha3: "TCD", name: "Chad" },
  { code: CountryCode.CL, alpha3: "CHL", name: "Chile" },
  { code: CountryCode.CN, alpha3: "CHN", name: "China" },
  { code: CountryCode.CX, alpha3: "CXR", name: "Christmas Island" },
  {
    code: CountryCode.CC,
    alpha3: "CCK",
    name: "Cocos (Keeling) Islands (the)",
  },
  { code: CountryCode.CO, alpha3: "COL", name: "Colombia" },
  { code: CountryCode.KM, alpha3: "COM", name: "Comoros (the)" },
  {
    code: CountryCode.CD,
    alpha3: "COD",
    name: "Congo (the Democratic Republic of the)",
  },
  { code: CountryCode.CG, alpha3: "COG", name: "Congo (the)" },
  { code: CountryCode.CK, alpha3: "COK", name: "Cook Islands (the)" },
  { code: CountryCode.CR, alpha3: "CRI", name: "Costa Rica" },
  { code: CountryCode.HR, alpha3: "HRV", name: "Croatia" },
  { code: CountryCode.CU, alpha3: "CUB", name: "Cuba" },
  { code: CountryCode.CW, alpha3: "CUW", name: "Curaçao" },
  { code: CountryCode.CY, alpha3: "CYP", name: "Cyprus" },
  { code: CountryCode.CZ, alpha3: "CZE", name: "Czechia" },
  { code: CountryCode.CI, alpha3: "CIV", name: "Côte d'Ivoire" },
  { code: CountryCode.DK, alpha3: "DNK", name: "Denmark" },
  { code: CountryCode.DJ, alpha3: "DJI", name: "Djibouti" },
  { code: CountryCode.DM, alpha3: "DMA", name: "Dominica" },
  { code: CountryCode.DO, alpha3: "DOM", name: "Dominican Republic (the)" },
  { code: CountryCode.EC, alpha3: "ECU", name: "Ecuador" },
  { code: CountryCode.EG, alpha3: "EGY", name: "Egypt" },
  { code: CountryCode.SV, alpha3: "SLV", name: "El Salvador" },
  { code: CountryCode.GQ, alpha3: "GNQ", name: "Equatorial Guinea" },
  { code: CountryCode.ER, alpha3: "ERI", name: "Eritrea" },
  { code: CountryCode.EE, alpha3: "EST", name: "Estonia" },
  { code: CountryCode.SZ, alpha3: "SWZ", name: "Eswatini" },
  { code: CountryCode.ET, alpha3: "ETH", name: "Ethiopia" },
  {
    code: CountryCode.FK,
    alpha3: "FLK",
    name: "Falkland Islands (the) [Malvinas]",
  },
  { code: CountryCode.FO, alpha3: "FRO", name: "Faroe Islands (the)" },
  { code: CountryCode.FJ, alpha3: "FJI", name: "Fiji" },
  { code: CountryCode.FI, alpha3: "FIN", name: "Finland" },
  { code: CountryCode.FR, alpha3: "FRA", name: "France" },
  { code: CountryCode.GF, alpha3: "GUF", name: "French Guiana" },
  { code: CountryCode.PF, alpha3: "PYF", name: "French Polynesia" },
  {
    code: CountryCode.TF,
    alpha3: "ATF",
    name: "French Southern Territories (the)",
  },
  { code: CountryCode.GA, alpha3: "GAB", name: "Gabon" },
  { code: CountryCode.GM, alpha3: "GMB", name: "Gambia (the)" },
  { code: CountryCode.GE, alpha3: "GEO", name: "Georgia" },
  { code: CountryCode.DE, alpha3: "DEU", name: "Germany" },
  { code: CountryCode.GH, alpha3: "GHA", name: "Ghana" },
  { code: CountryCode.GI, alpha3: "GIB", name: "Gibraltar" },
  { code: CountryCode.GR, alpha3: "GRC", name: "Greece" },
  { code: CountryCode.GL, alpha3: "GRL", name: "Greenland" },
  { code: CountryCode.GD, alpha3: "GRD", name: "Grenada" },
  { code: CountryCode.GP, alpha3: "GLP", name: "Guadeloupe" },
  { code: CountryCode.GU, alpha3: "GUM", name: "Guam" },
  { code: CountryCode.GT, alpha3: "GTM", name: "Guatemala" },
  { code: CountryCode.GG, alpha3: "GGY", name: "Guernsey" },
  { code: CountryCode.GN, alpha3: "GIN", name: "Guinea" },
  { code: CountryCode.GW, alpha3: "GNB", name: "Guinea-Bissau" },
  { code: CountryCode.GY, alpha3: "GUY", name: "Guyana" },
  { code: CountryCode.HT, alpha3: "HTI", name: "Haiti" },
  {
    code: CountryCode.HM,
    alpha3: "HMD",
    name: "Heard Island and McDonald Islands",
  },
  { code: CountryCode.VA, alpha3: "VAT", name: "Holy See (the)" },
  { code: CountryCode.HN, alpha3: "HND", name: "Honduras" },
  { code: CountryCode.HK, alpha3: "HKG", name: "Hong Kong" },
  { code: CountryCode.HU, alpha3: "HUN", name: "Hungary" },
  { code: CountryCode.IS, alpha3: "ISL", name: "Iceland" },
  { code: CountryCode.IN, alpha3: "IND", name: "India" },
  { code: CountryCode.ID, alpha3: "IDN", name: "Indonesia" },
  { code: CountryCode.IR, alpha3: "IRN", name: "Iran (Islamic Republic of)" },
  { code: CountryCode.IQ, alpha3: "IRQ", name: "Iraq" },
  { code: CountryCode.IE, alpha3: "IRL", name: "Ireland" },
  { code: CountryCode.IM, alpha3: "IMN", name: "Isle of Man" },
  { code: CountryCode.IL, alpha3: "ISR", name: "Israel" },
  { code: CountryCode.IT, alpha3: "ITA", name: "Italy" },
  { code: CountryCode.JM, alpha3: "JAM", name: "Jamaica" },
  { code: CountryCode.JP, alpha3: "JPN", name: "Japan" },
  { code: CountryCode.JE, alpha3: "JEY", name: "Jersey" },
  { code: CountryCode.JO, alpha3: "JOR", name: "Jordan" },
  { code: CountryCode.KZ, alpha3: "KAZ", name: "Kazakhstan" },
  { code: CountryCode.KE, alpha3: "KEN", name: "Kenya" },
  { code: CountryCode.KI, alpha3: "KIR", name: "Kiribati" },
  {
    code: CountryCode.KP,
    alpha3: "PRK",
    name: "Korea (the Democratic People's Republic of)",
  },
  { code: CountryCode.KR, alpha3: "KOR", name: "Korea (the Republic of)" },
  { code: CountryCode.KW, alpha3: "KWT", name: "Kuwait" },
  { code: CountryCode.KG, alpha3: "KGZ", name: "Kyrgyzstan" },
  {
    code: CountryCode.LA,
    alpha3: "LAO",
    name: "Lao People's Democratic Republic (the)",
  },
  { code: CountryCode.LV, alpha3: "LVA", name: "Latvia" },
  { code: CountryCode.LB, alpha3: "LBN", name: "Lebanon" },
  { code: CountryCode.LS, alpha3: "LSO", name: "Lesotho" },
  { code: CountryCode.LR, alpha3: "LBR", name: "Liberia" },
  { code: CountryCode.LY, alpha3: "LBY", name: "Libya" },
  { code: CountryCode.LI, alpha3: "LIE", name: "Liechtenstein" },
  { code: CountryCode.LT, alpha3: "LTU", name: "Lithuania" },
  { code: CountryCode.LU, alpha3: "LUX", name: "Luxembourg" },
  { code: CountryCode.MO, alpha3: "MAC", name: "Macao" },
  { code: CountryCode.MG, alpha3: "MDG", name: "Madagascar" },
  { code: CountryCode.MW, alpha3: "MWI", name: "Malawi" },
  { code: CountryCode.MY, alpha3: "MYS", name: "Malaysia" },
  { code: CountryCode.MV, alpha3: "MDV", name: "Maldives" },
  { code: CountryCode.ML, alpha3: "MLI", name: "Mali" },
  { code: CountryCode.MT, alpha3: "MLT", name: "Malta" },
  { code: CountryCode.MH, alpha3: "MHL", name: "Marshall Islands (the)" },
  { code: CountryCode.MQ, alpha3: "MTQ", name: "Martinique" },
  { code: CountryCode.MR, alpha3: "MRT", name: "Mauritania" },
  { code: CountryCode.MU, alpha3: "MUS", name: "Mauritius" },
  { code: CountryCode.YT, alpha3: "MYT", name: "Mayotte" },
  { code: CountryCode.MX, alpha3: "MEX", name: "Mexico" },
  {
    code: CountryCode.FM,
    alpha3: "FSM",
    name: "Micronesia (Federated States of)",
  },
  { code: CountryCode.MD, alpha3: "MDA", name: "Moldova (the Republic of)" },
  { code: CountryCode.MC, alpha3: "MCO", name: "Monaco" },
  { code: CountryCode.MN, alpha3: "MNG", name: "Mongolia" },
  { code: CountryCode.ME, alpha3: "MNE", name: "Montenegro" },
  { code: CountryCode.MS, alpha3: "MSR", name: "Montserrat" },
  { code: CountryCode.MA, alpha3: "MAR", name: "Morocco" },
  { code: CountryCode.MZ, alpha3: "MOZ", name: "Mozambique" },
  { code: CountryCode.MM, alpha3: "MMR", name: "Myanmar" },
  { code: CountryCode.NA, alpha3: "NAM", name: "Namibia" },
  { code: CountryCode.NR, alpha3: "NRU", name: "Nauru" },
  { code: CountryCode.NP, alpha3: "NPL", name: "Nepal" },
  { code: CountryCode.NL, alpha3: "NLD", name: "Netherlands (the)" },
  { code: CountryCode.NC, alpha3: "NCL", name: "New Caledonia" },
  { code: CountryCode.NZ, alpha3: "NZL", name: "New Zealand" },
  { code: CountryCode.NI, alpha3: "NIC", name: "Nicaragua" },
  { code: CountryCode.NE, alpha3: "NER", name: "Niger (the)" },
  { code: CountryCode.NG, alpha3: "NGA", name: "Nigeria" },
  { code: CountryCode.NU, alpha3: "NIU", name: "Niue" },
  { code: CountryCode.NF, alpha3: "NFK", name: "Norfolk Island" },
  {
    code: CountryCode.MP,
    alpha3: "MNP",
    name: "Northern Mariana Islands (the)",
  },
  { code: CountryCode.NO, alpha3: "NOR", name: "Norway" },
  { code: CountryCode.OM, alpha3: "OMN", name: "Oman" },
  { code: CountryCode.PK, alpha3: "PAK", name: "Pakistan" },
  { code: CountryCode.PW, alpha3: "PLW", name: "Palau" },
  { code: CountryCode.PS, alpha3: "PSE", name: "Palestine, State of" },
  { code: CountryCode.PA, alpha3: "PAN", name: "Panama" },
  { code: CountryCode.PG, alpha3: "PNG", name: "Papua New Guinea" },
  { code: CountryCode.PY, alpha3: "PRY", name: "Paraguay" },
  { code: CountryCode.PE, alpha3: "PER", name: "Peru" },
  { code: CountryCode.PH, alpha3: "PHL", name: "Philippines (the)" },
  { code: CountryCode.PN, alpha3: "PCN", name: "Pitcairn" },
  { code: CountryCode.PL, alpha3: "POL", name: "Poland" },
  { code: CountryCode.PT, alpha3: "PRT", name: "Portugal" },
  { code: CountryCode.PR, alpha3: "PRI", name: "Puerto Rico" },
  { code: CountryCode.QA, alpha3: "QAT", name: "Qatar" },
  { code: CountryCode.MK, alpha3: "MKD", name: "Republic of North Macedonia" },
  { code: CountryCode.RO, alpha3: "ROU", name: "Romania" },
  { code: CountryCode.RU, alpha3: "RUS", name: "Russian Federation (the)" },
  { code: CountryCode.RW, alpha3: "RWA", name: "Rwanda" },
  { code: CountryCode.RE, alpha3: "REU", name: "Réunion" },
  { code: CountryCode.BL, alpha3: "BLM", name: "Saint Barthélemy" },
  {
    code: CountryCode.SH,
    alpha3: "SHN",
    name: "Saint Helena, Ascension and Tristan da Cunha",
  },
  { code: CountryCode.KN, alpha3: "KNA", name: "Saint Kitts and Nevis" },
  { code: CountryCode.LC, alpha3: "LCA", name: "Saint Lucia" },
  { code: CountryCode.MF, alpha3: "MAF", name: "Saint Martin (French part)" },
  { code: CountryCode.PM, alpha3: "SPM", name: "Saint Pierre and Miquelon" },
  {
    code: CountryCode.VC,
    alpha3: "VCT",
    name: "Saint Vincent and the Grenadines",
  },
  { code: CountryCode.WS, alpha3: "WSM", name: "Samoa" },
  { code: CountryCode.SM, alpha3: "SMR", name: "San Marino" },
  { code: CountryCode.ST, alpha3: "STP", name: "Sao Tome and Principe" },
  { code: CountryCode.SA, alpha3: "SAU", name: "Saudi Arabia" },
  { code: CountryCode.SN, alpha3: "SEN", name: "Senegal" },
  { code: CountryCode.RS, alpha3: "SRB", name: "Serbia" },
  { code: CountryCode.SC, alpha3: "SYC", name: "Seychelles" },
  { code: CountryCode.SL, alpha3: "SLE", name: "Sierra Leone" },
  { code: CountryCode.SG, alpha3: "SGP", name: "Singapore" },
  { code: CountryCode.SX, alpha3: "SXM", name: "Sint Maarten (Dutch part)" },
  { code: CountryCode.SK, alpha3: "SVK", name: "Slovakia" },
  { code: CountryCode.SI, alpha3: "SVN", name: "Slovenia" },
  { code: CountryCode.SB, alpha3: "SLB", name: "Solomon Islands" },
  { code: CountryCode.SO, alpha3: "SOM", name: "Somalia" },
  { code: CountryCode.ZA, alpha3: "ZAF", name: "South Africa" },
  {
    code: CountryCode.GS,
    alpha3: "SGS",
    name: "South Georgia and the South Sandwich Islands",
  },
  { code: CountryCode.SS, alpha3: "SSD", name: "South Sudan" },
  { code: CountryCode.ES, alpha3: "ESP", name: "Spain" },
  { code: CountryCode.LK, alpha3: "LKA", name: "Sri Lanka" },
  { code: CountryCode.SD, alpha3: "SDN", name: "Sudan (the)" },
  { code: CountryCode.SR, alpha3: "SUR", name: "Suriname" },
  { code: CountryCode.SJ, alpha3: "SJM", name: "Svalbard and Jan Mayen" },
  { code: CountryCode.SE, alpha3: "SWE", name: "Sweden" },
  { code: CountryCode.CH, alpha3: "CHE", name: "Switzerland" },
  { code: CountryCode.SY, alpha3: "SYR", name: "Syrian Arab Republic" },
  { code: CountryCode.TW, alpha3: "TWN", name: "Taiwan (Province of China)" },
  { code: CountryCode.TJ, alpha3: "TJK", name: "Tajikistan" },
  { code: CountryCode.TZ, alpha3: "TZA", name: "Tanzania, United Republic of" },
  { code: CountryCode.TH, alpha3: "THA", name: "Thailand" },
  { code: CountryCode.TL, alpha3: "TLS", name: "Timor-Leste" },
  { code: CountryCode.TG, alpha3: "TGO", name: "Togo" },
  { code: CountryCode.TK, alpha3: "TKL", name: "Tokelau" },
  { code: CountryCode.TO, alpha3: "TON", name: "Tonga" },
  { code: CountryCode.TT, alpha3: "TTO", name: "Trinidad and Tobago" },
  { code: CountryCode.TN, alpha3: "TUN", name: "Tunisia" },
  { code: CountryCode.TR, alpha3: "TUR", name: "Turkey" },
  { code: CountryCode.TM, alpha3: "TKM", name: "Turkmenistan" },
  {
    code: CountryCode.TC,
    alpha3: "TCA",
    name: "Turks and Caicos Islands (the)",
  },
  { code: CountryCode.TV, alpha3: "TUV", name: "Tuvalu" },
  { code: CountryCode.UG, alpha3: "UGA", name: "Uganda" },
  { code: CountryCode.UA, alpha3: "UKR", name: "Ukraine" },
  { code: CountryCode.AE, alpha3: "ARE", name: "United Arab Emirates (the)" },
  {
    code: CountryCode.GB,
    alpha3: "GBR",
    name: "United Kingdom of Great Britain and Northern Ireland (the)",
  },
  {
    code: CountryCode.UM,
    alpha3: "UMI",
    name: "United States Minor Outlying Islands (the)",
  },
  {
    code: CountryCode.US,
    alpha3: "USA",
    name: "United States of America (the)",
  },
  { code: CountryCode.UY, alpha3: "URY", name: "Uruguay" },
  { code: CountryCode.UZ, alpha3: "UZB", name: "Uzbekistan" },
  { code: CountryCode.VU, alpha3: "VUT", name: "Vanuatu" },
  {
    code: CountryCode.VE,
    alpha3: "VEN",
    name: "Venezuela (Bolivarian Republic of)",
  },
  { code: CountryCode.VN, alpha3: "VNM", name: "Viet Nam" },
  { code: CountryCode.VG, alpha3: "VGB", name: "Virgin Islands (British)" },
  { code: CountryCode.VI, alpha3: "VIR", name: "Virgin Islands (U.S.)" },
  { code: CountryCode.WF, alpha3: "WLF", name: "Wallis and Futuna" },
  { code: CountryCode.EH, alpha3: "ESH", name: "Western Sahara" },
  { code: CountryCode.YE, alpha3: "YEM", name: "Yemen" },
  { code: CountryCode.ZM, alpha3: "ZMB", name: "Zambia" },
  { code: CountryCode.ZW, alpha3: "ZWE", name: "Zimbabwe" },
  { code: CountryCode.AX, alpha3: "ALA", name: "Åland Islands" },
  // Unknown handler
  { code: CountryCode.ZZ, alpha3: "ZZZ", name: "Unknown Country" },
];
/** Convert a country code to a country name */
const countryFromCode = (countryCode) => {
  const c = exports.countries.find((c) => c.code === countryCode);
  return c || { code: CountryCode.ZZ, alpha3: "ZZZ", name: "Unknown Country" };
};
exports.countryFromCode = countryFromCode;
const countryFromString = (countryCode) => {
  const cc = CountryCode[countryCode];
  const c = exports.countries.find((c) => c.code === cc);
  return c || { code: CountryCode.ZZ, alpha3: "ZZZ", name: "Unknown Country" };
};
exports.countryFromString = countryFromString;
/** Convert a country code to a Alpha-3 country code */
const countryFromAlpha3 = (alpha3) => {
  return exports.countries.find((c) => c.alpha3 === alpha3);
};
exports.countryFromAlpha3 = countryFromAlpha3;
