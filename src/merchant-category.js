"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.merchantCategoryFromKey =
  exports.merchantCategoryFromCode =
  exports.merchantCategories =
    void 0;
exports.merchantCategories = [
  {
    code: "7623",
    key: "ac_refrigeration_repair",
    name: "A/C, Refrigeration Repair",
  },
  {
    code: "8931",
    key: "accounting_bookkeeping_services",
    name: "Accounting/Bookkeeping Services",
  },
  { code: "7311", key: "advertising_services", name: "Advertising Services" },
  {
    code: "763",
    key: "agricultural_cooperative",
    name: "Agricultural Cooperative",
  },
  {
    code: "4511",
    key: "airlines_air_carriers",
    name: "Airlines, Air Carriers",
  },
  {
    code: "4582",
    key: "airports_flying_fields",
    name: "Airports, Flying Fields",
  },
  { code: "4119", key: "ambulance_services", name: "Ambulance Services" },
  {
    code: "7996",
    key: "amusement_parks_carnivals",
    name: "Amusement Parks/Carnivals",
  },
  { code: "5937", key: "antique_reproductions", name: "Antique Reproductions" },
  { code: "5932", key: "antique_shops", name: "Antique Shops" },
  { code: "7998", key: "aquariums", name: "Aquariums" },
  {
    code: "8911",
    key: "architectural_surveying_services",
    name: "Architectural/Surveying Services",
  },
  {
    code: "5971",
    key: "art_dealers_and_galleries",
    name: "Art Dealers and Galleries",
  },
  {
    code: "5970",
    key: "artists_supply_and_craft_shops",
    name: "Artists Supply and Craft Shops",
  },
  {
    code: "7531",
    key: "auto_body_repair_shops",
    name: "Auto Body Repair Shops",
  },
  { code: "7535", key: "auto_paint_shops", name: "Auto Paint Shops" },
  { code: "7538", key: "auto_service_shops", name: "Auto Service Shops" },
  {
    code: "5531",
    key: "auto_and_home_supply_stores",
    name: "Auto and Home Supply Stores",
  },
  {
    code: "6011",
    key: "automated_cash_disburse",
    name: "Automated Cash Disburse",
  },
  {
    code: "5542",
    key: "automated_fuel_dispensers",
    name: "Automated Fuel Dispensers",
  },
  {
    code: "8675",
    key: "automobile_associations",
    name: "Automobile Associations",
  },
  {
    code: "5533",
    key: "automotive_parts_and_accessories_stores",
    name: "Automotive Parts and Accessories Stores",
  },
  {
    code: "5532",
    key: "automotive_tire_stores",
    name: "Automotive Tire Stores",
  },
  {
    code: "9223",
    key: "bail_and_bond_payments",
    name: "Bail and Bond Payments (payment to the surety for the bond, not the actual bond paid to the government agency)",
  },
  { code: "5462", key: "bakeries", name: "Bakeries" },
  { code: "7929", key: "bands_orchestras", name: "Bands, Orchestras" },
  {
    code: "7230",
    key: "barber_and_beauty_shops",
    name: "Barber and Beauty Shops",
  },
  {
    code: "7995",
    key: "betting_casino_gambling",
    name: "Betting/Casino Gambling",
  },
  { code: "5940", key: "bicycle_shops", name: "Bicycle Shops" },
  {
    code: "7932",
    key: "billiard_pool_establishments",
    name: "Billiard/Pool Establishments",
  },
  { code: "5551", key: "boat_dealers", name: "Boat Dealers" },
  {
    code: "4457",
    key: "boat_rentals_and_leases",
    name: "Boat Rentals and Leases",
  },
  { code: "5942", key: "book_stores", name: "Book Stores" },
  {
    code: "5192",
    key: "books_periodicals_and_newspapers",
    name: "Books, Periodicals, and Newspapers",
  },
  { code: "7933", key: "bowling_alleys", name: "Bowling Alleys" },
  { code: "4131", key: "bus_lines", name: "Bus Lines" },
  {
    code: "8244",
    key: "business_secretarial_schools",
    name: "Business/Secretarial Schools",
  },
  {
    code: "7278",
    key: "buying_shopping_services",
    name: "Buying/Shopping Services",
  },
  {
    code: "4899",
    key: "cable_satellite_and_other_pay_television_and_radio",
    name: "Cable, Satellite, and Other Pay Television and Radio",
  },
  {
    code: "5946",
    key: "camera_and_photographic_supply_stores",
    name: "Camera and Photographic Supply Stores",
  },
  {
    code: "5441",
    key: "candy_nut_and_confectionery_stores",
    name: "Candy, Nut, and Confectionery Stores",
  },
  { code: "7512", key: "car_rental_agencies", name: "Car Rental Agencies" },
  { code: "7542", key: "car_washes", name: "Car Washes" },
  {
    code: "5511",
    key: "car_and_truck_dealers_new_used",
    name: "Car and Truck Dealers (New & Used) Sales, Service, Repairs Parts and Leasing",
  },
  {
    code: "5521",
    key: "car_and_truck_dealers_used_only",
    name: "Car and Truck Dealers (Used Only) Sales, Service, Repairs Parts and Leasing",
  },
  { code: "1750", key: "carpentry_services", name: "Carpentry Services" },
  {
    code: "7217",
    key: "carpet_upholstery_cleaning",
    name: "Carpet/Upholstery Cleaning",
  },
  { code: "5811", key: "caterers", name: "Caterers" },
  {
    code: "8398",
    key: "charitable_and_social_service_organizations_fundraising",
    name: "Charitable and Social Service Organizations - Fundraising",
  },
  {
    code: "5169",
    key: "chemicals_and_allied_products",
    name: "Chemicals and Allied Products (Not Elsewhere Classified)",
  },
  {
    code: "5641",
    key: "chidrens_and_infants_wear_stores",
    name: "Chidrens and Infants Wear Stores",
  },
  { code: "8351", key: "child_care_services", name: "Child Care Services" },
  {
    code: "8049",
    key: "chiropodists_podiatrists",
    name: "Chiropodists, Podiatrists",
  },
  { code: "8041", key: "chiropractors", name: "Chiropractors" },
  {
    code: "5993",
    key: "cigar_stores_and_stands",
    name: "Cigar Stores and Stands",
  },
  {
    code: "8641",
    key: "civic_social_fraternal_associations",
    name: "Civic, Social, Fraternal Associations",
  },
  {
    code: "7349",
    key: "cleaning_and_maintenance",
    name: "Cleaning and Maintenance",
  },
  { code: "7296", key: "clothing_rental", name: "Clothing Rental" },
  {
    code: "8220",
    key: "colleges_universities",
    name: "Colleges, Universities",
  },
  {
    code: "5046",
    key: "commercial_equipment",
    name: "Commercial Equipment (Not Elsewhere Classified)",
  },
  { code: "5139", key: "commercial_footwear", name: "Commercial Footwear" },
  {
    code: "7333",
    key: "commercial_photography_art_and_graphics",
    name: "Commercial Photography, Art and Graphics",
  },
  {
    code: "4111",
    key: "commuter_transport_and_ferries",
    name: "Commuter Transport, Ferries",
  },
  {
    code: "4816",
    key: "computer_network_services",
    name: "Computer Network Services",
  },
  { code: "7372", key: "computer_programming", name: "Computer Programming" },
  { code: "7379", key: "computer_repair", name: "Computer Repair" },
  {
    code: "5734",
    key: "computer_software_stores",
    name: "Computer Software Stores",
  },
  {
    code: "5045",
    key: "computers_peripherals_and_software",
    name: "Computers, Peripherals, and Software",
  },
  {
    code: "1771",
    key: "concrete_work_services",
    name: "Concrete Work Services",
  },
  {
    code: "5039",
    key: "construction_materials",
    name: "Construction Materials (Not Elsewhere Classified)",
  },
  {
    code: "7392",
    key: "consulting_public_relations",
    name: "Consulting, Public Relations",
  },
  {
    code: "8241",
    key: "correspondence_schools",
    name: "Correspondence Schools",
  },
  { code: "5977", key: "cosmetic_stores", name: "Cosmetic Stores" },
  { code: "7277", key: "counseling_services", name: "Counseling Services" },
  { code: "7997", key: "country_clubs", name: "Country Clubs" },
  { code: "4215", key: "courier_services", name: "Courier Services" },
  {
    code: "9211",
    key: "court_costs",
    name: "Court Costs, Including Alimony and Child Support - Courts of Law",
  },
  {
    code: "7321",
    key: "credit_reporting_agencies",
    name: "Credit Reporting Agencies",
  },
  { code: "4411", key: "cruise_lines", name: "Cruise Lines" },
  { code: "5451", key: "dairy_products_stores", name: "Dairy Products Stores" },
  {
    code: "7911",
    key: "dance_hall_studios_schools",
    name: "Dance Hall, Studios, Schools",
  },
  {
    code: "7273",
    key: "dating_escort_services",
    name: "Dating/Escort Services",
  },
  {
    code: "8021",
    key: "dentists_orthodontists",
    name: "Dentists, Orthodontists",
  },
  { code: "5311", key: "department_stores", name: "Department Stores" },
  { code: "7393", key: "detective_agencies", name: "Detective Agencies" },
  {
    code: "5964",
    key: "direct_marketing_catalog_merchant",
    name: "Direct Marketing - Catalog Merchant",
  },
  {
    code: "5965",
    key: "direct_marketing_combination_catalog_and_retail_merchant",
    name: "Direct Marketing - Combination Catalog and Retail Merchant",
  },
  {
    code: "5967",
    key: "direct_marketing_inbound_telemarketing",
    name: "Direct Marketing - Inbound Telemarketing",
  },
  {
    code: "5960",
    key: "direct_marketing_insurance_services",
    name: "Direct Marketing - Insurance Services",
  },
  {
    code: "5969",
    key: "direct_marketing_other",
    name: "Direct Marketing - Other",
  },
  {
    code: "5966",
    key: "direct_marketing_outbound_telemarketing",
    name: "Direct Marketing - Outbound Telemarketing",
  },
  {
    code: "5968",
    key: "direct_marketing_subscription",
    name: "Direct Marketing - Subscription",
  },
  {
    code: "5962",
    key: "direct_marketing_travel",
    name: "Direct Marketing - Travel",
  },
  { code: "5310", key: "discount_stores", name: "Discount Stores" },
  { code: "8011", key: "doctors", name: "Doctors" },
  { code: "5963", key: "door_to_door_sales", name: "Door-To-Door Sales" },
  {
    code: "5714",
    key: "drapery_window_covering_and_upholstery_stores",
    name: "Drapery, Window Covering, and Upholstery Stores",
  },
  { code: "5813", key: "drinking_places", name: "Drinking Places" },
  {
    code: "5912",
    key: "drug_stores_and_pharmacies",
    name: "Drug Stores and Pharmacies",
  },
  {
    code: "5122",
    key: "drugs_drug_proprietaries_and_druggist_sundries",
    name: "Drugs, Drug Proprietaries, and Druggist Sundries",
  },
  { code: "7216", key: "dry_cleaners", name: "Dry Cleaners" },
  {
    code: "5099",
    key: "durable_goods",
    name: "Durable Goods (Not Elsewhere Classified)",
  },
  { code: "5309", key: "duty_free_stores", name: "Duty Free Stores" },
  {
    code: "5812",
    key: "eating_places_restaurants",
    name: "Eating Places, Restaurants",
  },
  { code: "8299", key: "educational_services", name: "Educational Services" },
  { code: "5997", key: "electric_razor_stores", name: "Electric Razor Stores" },
  {
    code: "5065",
    key: "electrical_parts_and_equipment",
    name: "Electrical Parts and Equipment",
  },
  { code: "1731", key: "electrical_services", name: "Electrical Services" },
  {
    code: "7622",
    key: "electronics_repair_shops",
    name: "Electronics Repair Shops",
  },
  { code: "5732", key: "electronics_stores", name: "Electronics Stores" },
  {
    code: "8211",
    key: "elementary_secondary_schools",
    name: "Elementary, Secondary Schools",
  },
  {
    code: "7361",
    key: "employment_temp_agencies",
    name: "Employment/Temp Agencies",
  },
  { code: "7394", key: "equipment_rental", name: "Equipment Rental" },
  {
    code: "7342",
    key: "exterminating_services",
    name: "Exterminating Services",
  },
  {
    code: "5651",
    key: "family_clothing_stores",
    name: "Family Clothing Stores",
  },
  { code: "5814", key: "fast_food_restaurants", name: "Fast Food Restaurants" },
  {
    code: "6012",
    key: "financial_institutions",
    name: "Financial Institutions",
  },
  {
    code: "9222",
    key: "fines_government_administrative_entities",
    name: "Fines - Government Administrative Entities",
  },
  {
    code: "5718",
    key: "fireplace_fireplace_screens_and_accessories_stores",
    name: "Fireplace, Fireplace Screens, and Accessories Stores",
  },
  { code: "5713", key: "floor_covering_stores", name: "Floor Covering Stores" },
  { code: "5992", key: "florists", name: "Florists" },
  {
    code: "5193",
    key: "florists_supplies_nursery_stock_and_flowers",
    name: "Florists Supplies, Nursery Stock, and Flowers",
  },
  {
    code: "5422",
    key: "freezer_and_locker_meat_provisioners",
    name: "Freezer and Locker Meat Provisioners",
  },
  {
    code: "5983",
    key: "fuel_dealers_non_automotive",
    name: "Fuel Dealers (Non Automotive)",
  },
  {
    code: "7261",
    key: "funeral_services_crematories",
    name: "Funeral Services, Crematories",
  },
  {
    code: "7641",
    key: "furniture_repair_refinishing",
    name: "Furniture Repair, Refinishing",
  },
  {
    code: "5712",
    key: "furniture_home_furnishings_and_equipment_stores_except_appliances",
    name: "Furniture, Home Furnishings, and Equipment Stores, Except Appliances",
  },
  {
    code: "5681",
    key: "furriers_and_fur_shops",
    name: "Furriers and Fur Shops",
  },
  { code: "1520", key: "general_services", name: "General Services" },
  {
    code: "5947",
    key: "gift_card_novelty_and_souvenir_shops",
    name: "Gift, Card, Novelty, and Souvenir Shops",
  },
  {
    code: "5231",
    key: "glass_paint_and_wallpaper_stores",
    name: "Glass, Paint, and Wallpaper Stores",
  },
  {
    code: "5950",
    key: "glassware_crystal_stores",
    name: "Glassware, Crystal Stores",
  },
  { code: "7992", key: "golf_courses_public", name: "Golf Courses - Public" },
  {
    code: "9399",
    key: "government_services",
    name: "Government Services (Not Elsewhere Classified)",
  },
  {
    code: "5411",
    key: "grocery_stores_supermarkets",
    name: "Grocery Stores, Supermarkets",
  },
  { code: "5251", key: "hardware_stores", name: "Hardware Stores" },
  {
    code: "5072",
    key: "hardware_equipment_and_supplies",
    name: "Hardware, Equipment, and Supplies",
  },
  {
    code: "7298",
    key: "health_and_beauty_spas",
    name: "Health and Beauty Spas",
  },
  {
    code: "5975",
    key: "hearing_aids_sales_and_supplies",
    name: "Hearing Aids Sales and Supplies",
  },
  { code: "1711", key: "heating_plumbing_a_c", name: "Heating, Plumbing, A/C" },
  {
    code: "5945",
    key: "hobby_toy_and_game_shops",
    name: "Hobby, Toy, and Game Shops",
  },
  {
    code: "5200",
    key: "home_supply_warehouse_stores",
    name: "Home Supply Warehouse Stores",
  },
  { code: "8062", key: "hospitals", name: "Hospitals" },
  {
    code: "7011",
    key: "hotels_motels_and_resorts",
    name: "Hotels, Motels, and Resorts",
  },
  {
    code: "5722",
    key: "household_appliance_stores",
    name: "Household Appliance Stores",
  },
  {
    code: "5085",
    key: "industrial_supplies",
    name: "Industrial Supplies (Not Elsewhere Classified)",
  },
  {
    code: "7375",
    key: "information_retrieval_services",
    name: "Information Retrieval Services",
  },
  { code: "6399", key: "insurance_default", name: "Insurance - Default" },
  {
    code: "6300",
    key: "insurance_underwriting_premiums",
    name: "Insurance Underwriting, Premiums",
  },
  {
    code: "9950",
    key: "intra_company_purchases",
    name: "Intra-Company Purchases",
  },
  {
    code: "5944",
    key: "jewelry_stores_watches_clocks_and_silverware_stores",
    name: "Jewelry Stores, Watches, Clocks, and Silverware Stores",
  },
  { code: "780", key: "landscaping_services", name: "Landscaping Services" },
  { code: "7211", key: "laundries", name: "Laundries" },
  {
    code: "7210",
    key: "laundry_cleaning_services",
    name: "Laundry, Cleaning Services",
  },
  {
    code: "8111",
    key: "legal_services_attorneys",
    name: "Legal Services, Attorneys",
  },
  {
    code: "5948",
    key: "luggage_and_leather_goods_stores",
    name: "Luggage and Leather Goods Stores",
  },
  {
    code: "5211",
    key: "lumber_building_materials_stores",
    name: "Lumber, Building Materials Stores",
  },
  { code: "6010", key: "manual_cash_disburse", name: "Manual Cash Disburse" },
  {
    code: "4468",
    key: "marinas_service_and_supplies",
    name: "Marinas, Service and Supplies",
  },
  {
    code: "1740",
    key: "masonry_stonework_and_plaster",
    name: "Masonry, Stonework, and Plaster",
  },
  { code: "7297", key: "massage_parlors", name: "Massage Parlors" },
  { code: "8099", key: "medical_services", name: "Medical Services" },
  {
    code: "8071",
    key: "medical_and_dental_labs",
    name: "Medical and Dental Labs",
  },
  {
    code: "5047",
    key: "medical_dental_ophthalmic_and_hospital_equipment_and_supplies",
    name: "Medical, Dental, Ophthalmic, and Hospital Equipment and Supplies",
  },
  {
    code: "8699",
    key: "membership_organizations",
    name: "Membership Organizations",
  },
  {
    code: "5611",
    key: "mens_and_boys_clothing_and_accessories_stores",
    name: "Mens and Boys Clothing and Accessories Stores",
  },
  {
    code: "5691",
    key: "mens_womens_clothing_stores",
    name: "Mens, Womens Clothing Stores",
  },
  { code: "5051", key: "metal_service_centers", name: "Metal Service Centers" },
  {
    code: "5699",
    key: "miscellaneous_apparel_and_accessory_shops",
    name: "Miscellaneous Apparel and Accessory Shops",
  },
  {
    code: "5599",
    key: "miscellaneous_auto_dealers",
    name: "Miscellaneous Auto Dealers",
  },
  {
    code: "7399",
    key: "miscellaneous_business_services",
    name: "Miscellaneous Business Services",
  },
  {
    code: "5499",
    key: "miscellaneous_food_stores",
    name: "Miscellaneous Food Stores - Convenience Stores and Specialty Markets",
  },
  {
    code: "5399",
    key: "miscellaneous_general_merchandise",
    name: "Miscellaneous General Merchandise",
  },
  {
    code: "7299",
    key: "miscellaneous_general_services",
    name: "Miscellaneous General Services",
  },
  {
    code: "5719",
    key: "miscellaneous_home_furnishing_specialty_stores",
    name: "Miscellaneous Home Furnishing Specialty Stores",
  },
  {
    code: "2741",
    key: "miscellaneous_publishing_and_printing",
    name: "Miscellaneous Publishing and Printing",
  },
  {
    code: "7999",
    key: "miscellaneous_recreation_services",
    name: "Miscellaneous Recreation Services",
  },
  {
    code: "7699",
    key: "miscellaneous_repair_shops",
    name: "Miscellaneous Repair Shops",
  },
  {
    code: "5999",
    key: "miscellaneous_specialty_retail",
    name: "Miscellaneous Specialty Retail",
  },
  { code: "5271", key: "mobile_home_dealers", name: "Mobile Home Dealers" },
  {
    code: "7832",
    key: "motion_picture_theaters",
    name: "Motion Picture Theaters",
  },
  {
    code: "4214",
    key: "motor_freight_carriers_and_trucking",
    name: "Motor Freight Carriers and Trucking - Local and Long Distance, Moving and Storage Companies, and Local Delivery Services",
  },
  { code: "5592", key: "motor_homes_dealers", name: "Motor Homes Dealers" },
  {
    code: "5013",
    key: "motor_vehicle_supplies_and_new_parts",
    name: "Motor Vehicle Supplies and New Parts",
  },
  {
    code: "5571",
    key: "motorcycle_shops_and_dealers",
    name: "Motorcycle Shops and Dealers",
  },
  {
    code: "5561",
    key: "motorcycle_shops_dealers",
    name: "Motorcycle Shops, Dealers",
  },
  {
    code: "5733",
    key: "music_stores_musical_instruments_pianos_and_sheet_music",
    name: "Music Stores-Musical Instruments, Pianos, and Sheet Music",
  },
  {
    code: "5994",
    key: "news_dealers_and_newsstands",
    name: "News Dealers and Newsstands",
  },
  { code: "6051", key: "non_fi_money_orders", name: "Non-FI, Money Orders" },
  {
    code: "6540",
    key: "non_fi_stored_value_card_purchase_load",
    name: "Non-FI, Stored Value Card Purchase/Load",
  },
  {
    code: "5199",
    key: "nondurable_goods",
    name: "Nondurable Goods (Not Elsewhere Classified)",
  },
  {
    code: "5261",
    key: "nurseries_lawn_and_garden_supply_stores",
    name: "Nurseries, Lawn and Garden Supply Stores",
  },
  { code: "8050", key: "nursing_personal_care", name: "Nursing/Personal Care" },
  {
    code: "5021",
    key: "office_and_commercial_furniture",
    name: "Office and Commercial Furniture",
  },
  { code: "8043", key: "opticians_eyeglasses", name: "Opticians, Eyeglasses" },
  {
    code: "8042",
    key: "optometrists_ophthalmologist",
    name: "Optometrists, Ophthalmologist",
  },
  {
    code: "5976",
    key: "orthopedic_goods_prosthetic_devices",
    name: "Orthopedic Goods - Prosthetic Devices",
  },
  { code: "8031", key: "osteopaths", name: "Osteopaths" },
  {
    code: "5921",
    key: "package_stores_beer_wine_and_liquor",
    name: "Package Stores-Beer, Wine, and Liquor",
  },
  {
    code: "5198",
    key: "paints_varnishes_and_supplies",
    name: "Paints, Varnishes, and Supplies",
  },
  { code: "7523", key: "parking_lots_garages", name: "Parking Lots, Garages" },
  { code: "4112", key: "passenger_railways", name: "Passenger Railways" },
  { code: "5933", key: "pawn_shops", name: "Pawn Shops" },
  {
    code: "5995",
    key: "pet_shops_pet_food_and_supplies",
    name: "Pet Shops, Pet Food, and Supplies",
  },
  {
    code: "5172",
    key: "petroleum_and_petroleum_products",
    name: "Petroleum and Petroleum Products",
  },
  { code: "7395", key: "photo_developing", name: "Photo Developing" },
  { code: "7221", key: "photographic_studios", name: "Photographic Studios" },
  {
    code: "5044",
    key: "photographic_photocopy_microfilm_equipment_and_supplies",
    name: "Photographic, Photocopy, Microfilm Equipment, and Supplies",
  },
  {
    code: "7829",
    key: "picture_video_production",
    name: "Picture/Video Production",
  },
  {
    code: "5131",
    key: "piece_goods_notions_and_other_dry_goods",
    name: "Piece Goods, Notions, and Other Dry Goods",
  },
  {
    code: "5074",
    key: "plumbing_heating_equipment_and_supplies",
    name: "Plumbing, Heating Equipment, and Supplies",
  },
  {
    code: "8651",
    key: "political_organizations",
    name: "Political Organizations",
  },
  {
    code: "9402",
    key: "postal_services_government_only",
    name: "Postal Services - Government Only",
  },
  {
    code: "5094",
    key: "precious_stones_and_metals_watches_and_jewelry",
    name: "Precious Stones and Metals, Watches and Jewelry",
  },
  { code: "8999", key: "professional_services", name: "Professional Services" },
  {
    code: "4225",
    key: "public_warehousing_and_storage",
    name: "Public Warehousing and Storage - Farm Products, Refrigerated Goods, Household Goods, and Storage",
  },
  {
    code: "7338",
    key: "quick_copy_repro_and_blueprint",
    name: "Quick Copy, Repro, and Blueprint",
  },
  { code: "4011", key: "railroads", name: "Railroads" },
  {
    code: "6513",
    key: "real_estate_agents_and_managers_rentals",
    name: "Real Estate Agents and Managers - Rentals",
  },
  { code: "5735", key: "record_stores", name: "Record Stores" },
  {
    code: "7519",
    key: "recreational_vehicle_rentals",
    name: "Recreational Vehicle Rentals",
  },
  {
    code: "5973",
    key: "religious_goods_stores",
    name: "Religious Goods Stores",
  },
  {
    code: "8661",
    key: "religious_organizations",
    name: "Religious Organizations",
  },
  {
    code: "1761",
    key: "roofing_siding_sheet_metal",
    name: "Roofing/Siding, Sheet Metal",
  },
  {
    code: "7339",
    key: "secretarial_support_services",
    name: "Secretarial Support Services",
  },
  {
    code: "6211",
    key: "security_brokers_dealers",
    name: "Security Brokers/Dealers",
  },
  { code: "5541", key: "service_stations", name: "Service Stations" },
  {
    code: "5949",
    key: "sewing_needlework_fabric_and_piece_goods_stores",
    name: "Sewing, Needlework, Fabric, and Piece Goods Stores",
  },
  {
    code: "7251",
    key: "shoe_repair_hat_cleaning",
    name: "Shoe Repair/Hat Cleaning",
  },
  { code: "5661", key: "shoe_stores", name: "Shoe Stores" },
  {
    code: "7629",
    key: "small_appliance_repair",
    name: "Small Appliance Repair",
  },
  { code: "5598", key: "snowmobile_dealers", name: "Snowmobile Dealers" },
  {
    code: "1799",
    key: "special_trade_services",
    name: "Special Trade Services",
  },
  { code: "2842", key: "specialty_cleaning", name: "Specialty Cleaning" },
  { code: "5941", key: "sporting_goods_stores", name: "Sporting Goods Stores" },
  {
    code: "7032",
    key: "sporting_recreation_camps",
    name: "Sporting/Recreation Camps",
  },
  { code: "7941", key: "sports_clubs_fields", name: "Sports Clubs/Fields" },
  {
    code: "5655",
    key: "sports_and_riding_apparel_stores",
    name: "Sports and Riding Apparel Stores",
  },
  { code: "5972", key: "stamp_and_coin_stores", name: "Stamp and Coin Stores" },
  {
    code: "5111",
    key: "stationary_office_supplies_printing_and_writing_paper",
    name: "Stationary, Office Supplies, Printing and Writing Paper",
  },
  {
    code: "5943",
    key: "stationery_stores_office_and_school_supply_stores",
    name: "Stationery Stores, Office, and School Supply Stores",
  },
  { code: "5996", key: "swimming_pools_sales", name: "Swimming Pools Sales" },
  { code: "4723", key: "t_ui_travel_germany", name: "TUI Travel - Germany" },
  { code: "5697", key: "tailors_alterations", name: "Tailors, Alterations" },
  {
    code: "9311",
    key: "tax_payments_government_agencies",
    name: "Tax Payments - Government Agencies",
  },
  {
    code: "7276",
    key: "tax_preparation_services",
    name: "Tax Preparation Services",
  },
  { code: "4121", key: "taxicabs_limousines", name: "Taxicabs/Limousines" },
  {
    code: "4812",
    key: "telecommunication_equipment_and_telephone_sales",
    name: "Telecommunication Equipment and Telephone Sales",
  },
  {
    code: "4814",
    key: "telecommunication_services",
    name: "Telecommunication Services",
  },
  { code: "4821", key: "telegraph_services", name: "Telegraph Services" },
  { code: "5998", key: "tent_and_awning_shops", name: "Tent and Awning Shops" },
  { code: "8734", key: "testing_laboratories", name: "Testing Laboratories" },
  {
    code: "7922",
    key: "theatrical_ticket_agencies",
    name: "Theatrical Ticket Agencies",
  },
  { code: "7012", key: "timeshares", name: "Timeshares" },
  {
    code: "7534",
    key: "tire_retreading_and_repair",
    name: "Tire Retreading and Repair",
  },
  { code: "4784", key: "tolls_bridge_fees", name: "Tolls/Bridge Fees" },
  {
    code: "7991",
    key: "tourist_attractions_and_exhibits",
    name: "Tourist Attractions and Exhibits",
  },
  { code: "7549", key: "towing_services", name: "Towing Services" },
  {
    code: "7033",
    key: "trailer_parks_campgrounds",
    name: "Trailer Parks, Campgrounds",
  },
  {
    code: "4789",
    key: "transportation_services",
    name: "Transportation Services (Not Elsewhere Classified)",
  },
  {
    code: "4722",
    key: "travel_agencies_tour_operators",
    name: "Travel Agencies, Tour Operators",
  },
  { code: "7511", key: "truck_stop_iteration", name: "Truck StopIteration" },
  {
    code: "7513",
    key: "truck_utility_trailer_rentals",
    name: "Truck/Utility Trailer Rentals",
  },
  {
    code: "2791",
    key: "typesetting_plate_making_and_related_services",
    name: "Typesetting, Plate Making, and Related Services",
  },
  { code: "5978", key: "typewriter_stores", name: "Typewriter Stores" },
  {
    code: "9405",
    key: "u_s_federal_government_agencies_or_departments",
    name: "U.S. Federal Government Agencies or Departments",
  },
  {
    code: "5137",
    key: "uniforms_commercial_clothing",
    name: "Uniforms, Commercial Clothing",
  },
  {
    code: "5931",
    key: "used_merchandise_and_secondhand_stores",
    name: "Used Merchandise and Secondhand Stores",
  },
  { code: "4900", key: "utilities", name: "Utilities" },
  { code: "5331", key: "variety_stores", name: "Variety Stores" },
  { code: "742", key: "veterinary_services", name: "Veterinary Services" },
  {
    code: "7993",
    key: "video_amusement_game_supplies",
    name: "Video Amusement Game Supplies",
  },
  { code: "7994", key: "video_game_arcades", name: "Video Game Arcades" },
  {
    code: "7841",
    key: "video_tape_rental_stores",
    name: "Video Tape Rental Stores",
  },
  {
    code: "8249",
    key: "vocational_trade_schools",
    name: "Vocational/Trade Schools",
  },
  { code: "7631", key: "watch_jewelry_repair", name: "Watch/Jewelry Repair" },
  { code: "7692", key: "welding_repair", name: "Welding Repair" },
  { code: "5300", key: "wholesale_clubs", name: "Wholesale Clubs" },
  { code: "5698", key: "wig_and_toupee_stores", name: "Wig and Toupee Stores" },
  { code: "4829", key: "wires_money_orders", name: "Wires, Money Orders" },
  {
    code: "5631",
    key: "womens_accessory_and_specialty_shops",
    name: "Womens Accessory and Specialty Shops",
  },
  {
    code: "5621",
    key: "womens_ready_to_wear_stores",
    name: "Womens Ready-To-Wear Stores",
  },
  {
    code: "5935",
    key: 'wrecking_and_salvage_yards"',
    name: "Wrecking and Salvage Yards",
  },
];
/** Find a merchant category by code */
const merchantCategoryFromCode = (code) => {
  const mc = exports.merchantCategories.find((mc) => mc.code === code);
  return (
    mc || { code: "0000", key: "unknown_category", name: "Unknown Category" }
  );
};
exports.merchantCategoryFromCode = merchantCategoryFromCode;
/** Find a merchant category by key */
const merchantCategoryFromKey = (key) => {
  return exports.merchantCategories.find((mc) => mc.key === key);
};
exports.merchantCategoryFromKey = merchantCategoryFromKey;
