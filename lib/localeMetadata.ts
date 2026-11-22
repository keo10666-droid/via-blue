import { headers } from "next/headers";
const BASE_URL = "https://viabluetours.com";
const LOCALES = ["de", "fr", "ro", "ru"] as const;
type Locale = "en" | (typeof LOCALES)[number];
const SEO_COPY: Record<string, Record<Locale, [string, string]>> = {
  "/": {
    "en": [
      "Hurghada Tours & Private Transfers",
      "Discover Hurghada excursions, Red Sea boat trips, snorkeling, desert safaris and private transfers across Egypt with Via Blue."
    ],
    "de": [
      "Hurghada Ausflüge & private Transfers",
      "Entdecken Sie Ausflüge in Hurghada, Bootstouren im Roten Meer, Schnorcheln, Wüstensafaris und private Transfers mit Via Blue."
    ],
    "fr": [
      "Excursions à Hurghada et transferts privés",
      "Découvrez les excursions à Hurghada, les sorties en bateau en mer Rouge, le snorkeling, les safaris dans le désert et les transferts privés avec Via Blue."
    ],
    "ro": [
      "Excursii în Hurghada și transferuri private",
      "Descoperiți excursii în Hurghada, plimbări cu barca în Marea Roșie, snorkeling, safari în deșert și transferuri private cu Via Blue."
    ],
    "ru": [
      "Экскурсии в Хургаде и частные трансферы",
      "Откройте экскурсии в Хургаде, морские прогулки по Красному морю, снорклинг, сафари по пустыне и частные трансферы с Via Blue."
    ]
  },
  "/about": {
    "en": [
      "About Via Blue | Hurghada Tourism & Transfers",
      "Meet Via Blue, a Hurghada-based tourism and transportation company offering Red Sea excursions, private transfers and local travel support in Egypt."
    ],
    "de": [
      "Über Via Blue | Tourismus & Transfers in Hurghada",
      "Lernen Sie Via Blue kennen – Ihr lokaler Anbieter für Ausflüge am Roten Meer, private Transfers und Reisebetreuung in Hurghada, Ägypten."
    ],
    "fr": [
      "À propos de Via Blue | Excursions et transferts à Hurghada",
      "Découvrez Via Blue, votre spécialiste local des excursions en mer Rouge, des transferts privés et des services touristiques à Hurghada, en Égypte."
    ],
    "ro": [
      "Despre Via Blue | Turism și transferuri în Hurghada",
      "Descoperiți Via Blue, compania locală din Hurghada pentru excursii la Marea Roșie, transferuri private și servicii turistice în Egipt."
    ],
    "ru": [
      "О Via Blue | Туризм и трансферы в Хургаде",
      "Познакомьтесь с Via Blue — местной туристической компанией в Хургаде, предлагающей экскурсии по Красному морю и частные трансферы в Египте."
    ]
  },
  "/contact": {
    "en": [
      "Contact Via Blue | Hurghada Tours & Transfers",
      "Contact Via Blue to plan Hurghada excursions, Red Sea experiences and private airport or hotel transfers in Egypt."
    ],
    "de": [
      "Kontakt Via Blue | Ausflüge & Transfers in Hurghada",
      "Kontaktieren Sie Via Blue und planen Sie Ausflüge in Hurghada, Erlebnisse am Roten Meer sowie private Flughafen- und Hoteltransfers in Ägypten."
    ],
    "fr": [
      "Contacter Via Blue | Excursions et transferts à Hurghada",
      "Contactez Via Blue pour organiser vos excursions à Hurghada, vos activités en mer Rouge et vos transferts privés depuis l'aéroport ou votre hôtel."
    ],
    "ro": [
      "Contact Via Blue | Excursii și transferuri în Hurghada",
      "Contactați Via Blue pentru excursii în Hurghada, experiențe la Marea Roșie și transferuri private de la aeroport sau hotel în Egipt."
    ],
    "ru": [
      "Связаться с Via Blue | Экскурсии и трансферы в Хургаде",
      "Свяжитесь с Via Blue, чтобы спланировать экскурсии в Хургаде, отдых на Красном море и частные трансферы из аэропорта или отеля."
    ]
  },
  "/tours": {
    "en": [
      "Hurghada Tours & Excursions",
      "Discover the best tours and excursions in Hurghada, Egypt, including Red Sea boat trips, islands, snorkeling, diving, desert safaris and day tours."
    ],
    "de": [
      "Ausflüge und Touren in Hurghada",
      "Entdecken Sie Ausflüge in Hurghada: Bootstouren zu Inseln, Schnorcheln, Tauchen, Wüstensafaris und Tagesausflüge in Ägypten."
    ],
    "fr": [
      "Excursions et activités à Hurghada",
      "Découvrez les excursions à Hurghada : sorties en bateau vers les îles, snorkeling, plongée, safaris dans le désert et excursions à la journée en Égypte."
    ],
    "ro": [
      "Tururi și excursii în Hurghada",
      "Descoperiți excursii în Hurghada: plimbări cu barca spre insule, snorkeling, scufundări, safari în deșert și excursii de o zi în Egipt."
    ],
    "ru": [
      "Туры и экскурсии в Хургаде",
      "Откройте экскурсии в Хургаде: морские прогулки к островам, снорклинг, дайвинг, сафари по пустыне и поездки по Египту."
    ]
  },
  "/transfers": {
    "en": [
      "Hurghada Airport & Hotel Transfers",
      "Book private airport, hotel and inter-hotel transfers across Hurghada, Sahl Hasheesh, Makadi Bay, El Gouna, Soma Bay and Safaga."
    ],
    "de": [
      "Flughafen- und Hoteltransfers in Hurghada",
      "Buchen Sie private Flughafen-, Hotel- und Hotel-zu-Hotel-Transfers in Hurghada, Sahl Hasheesh, Makadi Bay, El Gouna, Soma Bay und Safaga."
    ],
    "fr": [
      "Transferts aéroport et hôtels à Hurghada",
      "Réservez des transferts privés depuis l'aéroport, entre hôtels et dans Hurghada, Sahl Hasheesh, Makadi Bay, El Gouna, Soma Bay et Safaga."
    ],
    "ro": [
      "Transferuri de la aeroport și hotel în Hurghada",
      "Rezervați transferuri private de la aeroport, între hoteluri și în Hurghada, Sahl Hasheesh, Makadi Bay, El Gouna, Soma Bay și Safaga."
    ],
    "ru": [
      "Трансферы из аэропорта и отелей Хургады",
      "Закажите частный трансфер из аэропорта, между отелями и по Хургаде, Сахл-Хашиш, Макади-Бей, Эль-Гуне, Сома-Бей и Сафаге."
    ]
  },
  "/luxury-tours": {
    "en": [
      "Private Luxury Tours in Egypt",
      "Explore private Egypt experiences from Hurghada, including Luxor and Cairo tours, Red Sea boat charters and private desert adventures."
    ],
    "de": [
      "Private Luxustouren in Ägypten",
      "Erleben Sie private Ägypten-Ausflüge ab Hurghada: Luxor und Kairo, exklusive Bootstouren im Roten Meer und private Wüstenabenteuer."
    ],
    "fr": [
      "Circuits privés de luxe en Égypte",
      "Vivez des expériences privées au départ de Hurghada : Louxor, Le Caire, sorties exclusives en mer Rouge et aventures dans le désert."
    ],
    "ro": [
      "Tururi private de lux în Egipt",
      "Descoperiți experiențe private din Hurghada: Luxor și Cairo, excursii exclusive cu barca pe Marea Roșie și aventuri în deșert."
    ],
    "ru": [
      "Индивидуальные VIP-туры по Египту",
      "Откройте частные поездки из Хургады: Луксор и Каир, прогулки на частной яхте по Красному морю и приключения в пустыне."
    ]
  },
  "/sim-card": {
    "en": [
      "Egypt SIM Card & Mobile Data",
      "Stay connected in Egypt with a local SIM card, 25 GB mobile data and calls, with airport pickup or hotel delivery."
    ],
    "de": [
      "SIM-Karte für Ägypten",
      "Bleiben Sie in Ägypten verbunden: lokale SIM-Karte mit 25 GB Datenvolumen und Telefonie, Abholung am Flughafen oder Lieferung ins Hotel."
    ],
    "fr": [
      "Carte SIM pour l'Égypte",
      "Restez connecté en Égypte avec une carte SIM locale, 25 Go de données et des appels, à récupérer à l'aéroport ou à recevoir à l'hôtel."
    ],
    "ro": [
      "Cartelă SIM pentru Egipt",
      "Rămâneți conectat în Egipt cu o cartelă SIM locală, 25 GB de internet și apeluri, cu preluare de la aeroport sau livrare la hotel."
    ],
    "ru": [
      "SIM-карта и мобильный интернет в Египте",
      "Оставайтесь на связи в Египте с местной SIM-картой, 25 ГБ интернета и звонками, с получением в аэропорту или доставкой в отель."
    ]
  }
};
export async function getLocalizedAlternates(pathname: string) {
 const h = await headers(); const requested = h.get("x-via-blue-locale");
 const locale: Locale = LOCALES.includes(requested as (typeof LOCALES)[number]) ? requested as (typeof LOCALES)[number] : "en";
 const suffix = pathname === "/" ? "" : pathname;
 const canonicalPath = locale === "en" ? suffix || "/" : `/${locale}${suffix}`;
 return { canonical: `${BASE_URL}${canonicalPath}` };
}
export async function getLocalizedSeo(pathname: string) {
 const h = await headers(); const requested = h.get("x-via-blue-locale");
 const locale: Locale = LOCALES.includes(requested as (typeof LOCALES)[number]) ? requested as (typeof LOCALES)[number] : "en";
 const copy = SEO_COPY[pathname]?.[locale] ?? SEO_COPY[pathname]?.en;
 return { ...(copy ? { title: copy[0], description: copy[1] } : {}), alternates: await getLocalizedAlternates(pathname) };
}
