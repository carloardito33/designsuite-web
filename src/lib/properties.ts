import type { Locale } from "@/i18n/config";

/** Fields that have a translated variant per locale. */
export type LocalizedPropertyContent = {
  shortDescription: string;
  subtitle: string;
  description: string[];
  amenities: string[];
  services: string[];
  metaTitle: string;
  metaDescription: string;
};

export type Property = {
  slug: string;
  region: "salento" | "milano";
  /** Proper noun — not translated. */
  name: string;
  /** Town + area — not translated. */
  location: string;
  address: string;
  owner: string;
  cin: string;
  mapsUrl?: string;
  smoobuApartmentId?: string;
  guests: number;
  bedrooms: number;
  bathrooms: number;
  heroImage: string;
  cardImage: string;
  gallery: string[];
  i18n: Record<Locale, LocalizedPropertyContent>;
};

/** A property flattened for a single locale (translated fields hoisted to the top level). */
export type LocalizedProperty = Omit<Property, "i18n"> & LocalizedPropertyContent;

export const properties: Property[] = [
  {
    slug: "bosco-degli-ulivi",
    region: "salento",
    name: "Bosco degli Ulivi",
    location: "Morciano di Leuca, Salento",
    address: "Via Murge snc, 73040 Morciano di Leuca (LE)",
    owner: "Rosanna Tarricone",
    cin: "IT075050C200037136",
    mapsUrl: "https://maps.app.goo.gl/LTJLdXiiC21gnq8p7",
    smoobuApartmentId: "1894201",
    guests: 6,
    bedrooms: 3,
    bathrooms: 2,
    heroImage:
      "https://globaluserfiles.com/media/306267_712352695c0f3e5acecd399797c4c4be0693d83c.jpeg/v1/w_1920,h_1080/712352695c0f3e5acecd399797c4c4be0693d83c.jpg",
    cardImage:
      "https://globaluserfiles.com/media/306267_07ffa1e4971eb1607073ec37abbfb6b8be9e0489.jpeg/v1/w_1200,h_800/dsc_7571.jpeg",
    gallery: [
      "https://globaluserfiles.com/media/306267_07ffa1e4971eb1607073ec37abbfb6b8be9e0489.jpeg/v1/w_1200,h_800/dsc_7571.jpeg",
      "https://globaluserfiles.com/media/306267_0f46825e4400702f1fdfe11f341ef93824ac437d.jpeg/v1/w_1200,h_800/dsc_7684.jpeg",
      "https://globaluserfiles.com/media/306267_3dc7eff5d8ad2fcbb9e3d49fe638f07f1cc3535a.jpeg/v1/w_1200,h_800/dsc_2961.jpeg",
      "https://globaluserfiles.com/media/306267_84c44883ae80f6e4be60d2e2ae5189c7c22e145a.jpeg/v1/w_1200,h_800/dsc_2991.jpeg",
      "https://globaluserfiles.com/media/306267_5d134bcf13e70adf808dd3109ef092ea0e847678.jpeg/v1/w_1200,h_800/dsc_3026.jpeg",
      "https://globaluserfiles.com/media/306267_bb923b858d95878a76d7b1cfbed141557493abbb.jpeg/v1/w_1200,h_800/dsc_3013.jpeg",
      "https://globaluserfiles.com/media/306267_910c8e3a8464b5c1439c44ef5b97ad73fe91fd54.jpeg/v1/w_1200,h_800/img_5559.jpeg",
      "https://globaluserfiles.com/media/306267_a2866125935934d02fa426e638e25fc9cf940299.jpeg/v1/w_1200,h_800/img_5539.jpeg",
      "https://globaluserfiles.com/media/306267_d7131fe3920fc37892d11c5a2ee73ef41cb74cf4.jpeg/v1/w_1200,h_800/img_5529.jpeg",
      "https://globaluserfiles.com/media/306267_fc9112f0c46c6ec939689fad8dad305cb61bc10c.jpeg/v1/w_1200,h_800/img_5545.jpeg",
    ],
    i18n: {
      it: {
        shortDescription:
          "Rifugio tra ulivi secolari con piscina 12×4 a pochi minuti dalle spiagge del Sud Salento",
        subtitle:
          "Rifugio tra ulivi secolari con piscina 12×4 a pochi minuti dalle spiagge del Sud Salento",
        description: [
          "Bosco degli Ulivi è un rifugio esclusivo, immerso tra ulivi secolari e pensato per chi cerca bellezza, pace e autenticità. Progettata da un rinomato architetto, questa dimora contemporanea si trova a pochi minuti dalle incantevoli spiagge del sud-ovest del Salento.",
          "Protagonista su riviste e libri di architettura, la villa combina linee essenziali, materiali naturali e dettagli studiati con cura, dando vita alla casa estiva mediterranea che tutti vorremmo abitare almeno una volta.",
          "Accoglie fino a 6 ospiti in ambienti luminosi e armoniosi: tre camere da letto, due bagni (uno ensuite e uno nella zona giorno), una lavanderia, un soggiorno e una cucina a vista perfettamente integrata. Ogni elemento, dagli elettrodomestici di classe A agli arredi e tessili selezionati, è pensato per offrire un'esperienza di comfort autentico e rilassato.",
          "All'esterno, la vita si sposta sotto il cielo: una cucina attrezzata per cene all'aperto, un tavolo in pietra per condividere momenti speciali, una zona living dove lasciarsi avvolgere dal silenzio della natura e un solarium a bordo piscina, dove il tempo sembra fermarsi.",
        ],
        amenities: [
          "Piscina 12×4 m",
          "3 camere da letto (2 matrimoniali, 1 doppia flessibile)",
          "2 bagni con doccia (1 en-suite)",
          "Cucina esterna attrezzata",
          "Living esterno",
          "Tavolo in pietra per cene all'aperto",
          "Solarium a bordo piscina",
          "Barbecue",
          "Doccia esterna",
          "Lavanderia",
          "Lavatrice",
          "Lavastoviglie",
          "Forno a microonde",
          "Macchina caffè Nespresso",
          "Bollitore",
          "Tostapane",
          "TV satellitare",
          "WiFi ad alta velocità",
          "Aria condizionata",
          "Riscaldamento",
          "Parcheggio privato",
        ],
        services: [
          "Pulizia settimanale inclusa",
          "Pulizia giornaliera (su richiesta)",
          "Pulizia esterna a giorni alterni",
          "Cuoco privato (su richiesta)",
        ],
        metaTitle:
          "Bosco degli Ulivi — Villa con Piscina 12×4 a Morciano di Leuca, Salento",
        metaDescription:
          "Villa di charme progettata da architetto, immersa tra ulivi secolari nel Sud Salento. Piscina 12×4 m, 3 camere, 2 bagni, fino a 6 ospiti. A pochi minuti dalle spiagge.",
      },
      en: {
        shortDescription:
          "A retreat among centuries-old olive trees with a 12×4 pool, minutes from the beaches of southern Salento",
        subtitle:
          "A retreat among centuries-old olive trees with a 12×4 pool, minutes from the beaches of southern Salento",
        description: [
          "Bosco degli Ulivi is an exclusive retreat, set among centuries-old olive trees and designed for those seeking beauty, peace and authenticity. Conceived by a renowned architect, this contemporary residence sits just minutes from the enchanting beaches of south-western Salento.",
          "Featured in architecture magazines and books, the villa combines clean lines, natural materials and carefully studied details, bringing to life the Mediterranean summer house we would all love to live in at least once.",
          "It welcomes up to 6 guests in bright, harmonious spaces: three bedrooms, two bathrooms (one en-suite and one in the living area), a laundry room, a living room and a fully integrated open kitchen. Every element, from the class-A appliances to the selected furnishings and textiles, is designed to offer an experience of genuine, relaxed comfort.",
          "Outdoors, life moves under the open sky: a kitchen equipped for al fresco dinners, a stone table for sharing special moments, a living area where you can be wrapped in the silence of nature, and a poolside solarium where time seems to stand still.",
        ],
        amenities: [
          "12×4 m swimming pool",
          "3 bedrooms (2 doubles, 1 flexible twin)",
          "2 bathrooms with shower (1 en-suite)",
          "Equipped outdoor kitchen",
          "Outdoor living area",
          "Stone table for al fresco dining",
          "Poolside solarium",
          "Barbecue",
          "Outdoor shower",
          "Laundry room",
          "Washing machine",
          "Dishwasher",
          "Microwave oven",
          "Nespresso coffee machine",
          "Kettle",
          "Toaster",
          "Satellite TV",
          "High-speed WiFi",
          "Air conditioning",
          "Heating",
          "Private parking",
        ],
        services: [
          "Weekly cleaning included",
          "Daily cleaning (on request)",
          "Outdoor cleaning every other day",
          "Private chef (on request)",
        ],
        metaTitle:
          "Bosco degli Ulivi — Villa with 12×4 Pool in Morciano di Leuca, Salento",
        metaDescription:
          "Architect-designed charming villa set among centuries-old olive trees in southern Salento. 12×4 m pool, 3 bedrooms, 2 bathrooms, up to 6 guests. Minutes from the beaches.",
      },
    },
  },
  {
    slug: "villa-crea",
    region: "salento",
    name: "Villa Crea",
    location: "Castrignano del Capo, Salento",
    address: "SC Mattara, Marina di Felloniche, 73040 Castrignano del Capo (LE)",
    owner: "Carlo Ardito",
    cin: "IT075019C200065154",
    mapsUrl: "https://maps.app.goo.gl/RRobRbgUPwahZ6jp6",
    smoobuApartmentId: "1894199",
    guests: 8,
    bedrooms: 4,
    bathrooms: 3,
    heroImage: "/images/villa-crea/01-IMG_3955.jpg",
    cardImage: "/images/villa-crea/01-IMG_3955.jpg",
    gallery: [],
    i18n: {
      it: {
        shortDescription:
          "Rifugio di charme con piscina 15×3 vista mare a pochi km da Santa Maria di Leuca",
        subtitle:
          "Rifugio di charme con piscina 15×3 vista mare a pochi km da Santa Maria di Leuca",
        description: [
          "Villa CREA è un rifugio di charme con una piscina mozzafiato affacciata sul mare cristallino del Salento, a pochi chilometri da Santa Maria di Leuca, là dove la Puglia tocca il suo punto più estremo. Progettata dall'architetto Zanaroli, la villa accoglie fino a 8 ospiti in un'atmosfera di raffinata semplicità.",
          "Dispone di quattro camere da letto, tre bagni (due ensuite e uno esterno), una lavanderia, un ampio soggiorno e una cucina a vista perfettamente integrata. Gli elettrodomestici di classe A+, insieme ad arredi e tessili selezionati con cura, offrono un'esperienza di comfort totale, in equilibrio tra eleganza e funzionalità. La villa è dotata di un impianto fotovoltaico, nel rispetto dell'ambiente e con un occhio alla sostenibilità.",
          "All'esterno, la grande area living ospita una cucina attrezzata, un tavolo in pietra per pranzi e cene all'aperto, e un comodo divano su cui abbandonarsi al silenzio del paesaggio. Il tramonto sul mare, visto da Villa CREA. Un'emozione che non si dimentica.",
        ],
        amenities: [
          "Piscina 15×3 m con vista mare",
          "4 camere da letto (2 matrimoniali, 2 doppie flessibili)",
          "3 bagni con doccia (2 en-suite, 1 esterno)",
          "Cucina esterna attrezzata",
          "Living esterno",
          "Tavolo in pietra per cene all'aperto",
          "Barbecue",
          "Doccia esterna",
          "Frigorifero esterno",
          "Lavanderia",
          "Lavatrice",
          "Lavastoviglie",
          "Forno a microonde",
          "Macchina caffè Nespresso",
          "Bollitore",
          "Tostapane",
          "TV satellitare",
          "WiFi ad alta velocità",
          "Aria condizionata",
          "Riscaldamento",
          "Impianto fotovoltaico",
          "Parcheggio privato",
        ],
        services: [
          "Pulizia settimanale inclusa",
          "Pulizia giornaliera (su richiesta)",
          "Pulizia esterna a giorni alterni",
          "Cuoco privato (su richiesta)",
        ],
        metaTitle:
          "Villa Crea — Piscina 15×3 Vista Mare a Castrignano del Capo, Salento",
        metaDescription:
          "Villa di charme progettata da Zanaroli con piscina 15×3 m affacciata sul mare del Salento. 4 camere, 4 bagni, fino a 8 ospiti. Impianto fotovoltaico. A pochi km da Santa Maria di Leuca.",
      },
      en: {
        shortDescription:
          "A charming retreat with a 15×3 sea-view pool, a few km from Santa Maria di Leuca",
        subtitle:
          "A charming retreat with a 15×3 sea-view pool, a few km from Santa Maria di Leuca",
        description: [
          "Villa CREA is a charming retreat with a breathtaking pool overlooking the crystal-clear sea of Salento, a few kilometres from Santa Maria di Leuca, where Puglia reaches its southernmost tip. Designed by the architect Zanaroli, the villa welcomes up to 8 guests in an atmosphere of refined simplicity.",
          "It has four bedrooms, three bathrooms (two en-suite and one outdoor), a laundry room, a spacious living room and a fully integrated open kitchen. The class-A+ appliances, together with carefully selected furnishings and textiles, offer an experience of complete comfort, balancing elegance and function. The villa is fitted with a photovoltaic system, respecting the environment with an eye to sustainability.",
          "Outdoors, the large living area features an equipped kitchen, a stone table for al fresco lunches and dinners, and a comfortable sofa where you can surrender to the silence of the landscape. Sunset over the sea, seen from Villa CREA. An emotion you won't forget.",
        ],
        amenities: [
          "15×3 m swimming pool with sea view",
          "4 bedrooms (2 doubles, 2 flexible twins)",
          "3 bathrooms with shower (2 en-suite, 1 outdoor)",
          "Equipped outdoor kitchen",
          "Outdoor living area",
          "Stone table for al fresco dining",
          "Barbecue",
          "Outdoor shower",
          "Outdoor fridge",
          "Laundry room",
          "Washing machine",
          "Dishwasher",
          "Microwave oven",
          "Nespresso coffee machine",
          "Kettle",
          "Toaster",
          "Satellite TV",
          "High-speed WiFi",
          "Air conditioning",
          "Heating",
          "Photovoltaic system",
          "Private parking",
        ],
        services: [
          "Weekly cleaning included",
          "Daily cleaning (on request)",
          "Outdoor cleaning every other day",
          "Private chef (on request)",
        ],
        metaTitle:
          "Villa Crea — 15×3 Sea-View Pool in Castrignano del Capo, Salento",
        metaDescription:
          "Charming villa designed by Zanaroli with a 15×3 m pool overlooking the Salento sea. 4 bedrooms, 4 bathrooms, up to 8 guests. Photovoltaic system. A few km from Santa Maria di Leuca.",
      },
    },
  },
  {
    slug: "suite-porta-romana",
    region: "milano",
    name: "Suite Porta Romana",
    location: "Porta Romana, Milano",
    address: "Via Lodovico Muratori 13, 20135 Milano",
    owner: "Rosanna Tarricone",
    cin: "IT015146C2QP4BXVAW",
    mapsUrl: "https://maps.app.goo.gl/HeYwR8qa8BU67beF8",
    smoobuApartmentId: "2502833",
    guests: 4,
    bedrooms: 1,
    bathrooms: 1,
    heroImage: "/images/suite-porta-romana/00-Esterno.jpg",
    cardImage: "/images/suite-porta-romana/02-Soggiorno%201.jpg",
    gallery: [
      "https://globaluserfiles.com/media/306267_cf2ec89f0a52955ee9f84712a7a5c857a87c8821.jpeg/v1/w_1200,h_800/soggiorno%201.jpeg",
      "https://globaluserfiles.com/media/306267_1aa0ed02f2b4065cab2645edc631a772352e1d60.jpeg/v1/w_1200,h_800/letto%201.jpeg",
      "https://globaluserfiles.com/media/306267_45f626fe88d70186c504321df241790e72c75d76.jpeg/v1/w_1200,h_800/cucina-3.jpeg",
      "https://globaluserfiles.com/media/306267_3fadb0b85386880b86c60a8f122a181d5d1b85d0.jpeg/v1/w_1200,h_800/bagno%202.jpeg",
      "https://globaluserfiles.com/media/306267_59c8417ca8bf29504b68b5481d525e615dc0bbf3.jpeg/v1/w_1200,h_800/esterno.jpeg",
      "https://globaluserfiles.com/media/306267_d5cd11ffe276cdab59f470a9b1b6d630e143c67e.jpeg/v1/w_1200,h_800/soggiorno%202.jpeg",
      "https://globaluserfiles.com/media/306267_a2a5b4bcd0932e4d4f6344d06c75b1239e85be63.jpeg/v1/w_1200,h_800/letto%203.jpeg",
      "https://globaluserfiles.com/media/306267_5e2f956e9f5ab67d676b1f9dda761ac804e463e6.jpeg/v1/w_1200,h_800/colazione%204.jpeg",
      "https://globaluserfiles.com/media/306267_6016570632bb85750f8243a680b7477ec9afc290.jpeg/v1/w_1200,h_800/soggiorno%204.jpeg",
      "https://globaluserfiles.com/media/306267_17089a398a990ac89fdcaec1a43991300b43f6fe.jpeg/v1/w_1200,h_800/pranzo%204.jpeg",
    ],
    i18n: {
      it: {
        shortDescription: "Appartamento di design con terrazzo in Porta Romana",
        subtitle: "Appartamento di design con terrazzo in Porta Romana",
        description: [
          "Suite Porta Romana è un appartamento completamente ristrutturato da architetto, situato in Via Muratori 13, nel cuore del quartiere Porta Romana a Milano, uno degli indirizzi più ambiti per chi visita la città.",
          "Al primo piano di un palazzo moderno con portineria, l'appartamento è un bilocale luminoso composto da camera, soggiorno e bagno, con finiture e materiali di qualità. Il terrazzo privato offre uno spazio esterno raro a questa distanza dal centro.",
          "La metropolitana M3 (Porta Romana) è a pochi minuti a piedi. Ristoranti, bar, mercati e supermercati a portata di mano. Tutto il necessario è incluso: WiFi ad alta velocità, lavatrice, lavastoviglie, aria condizionata, riscaldamento autonomo, TV.",
        ],
        amenities: [
          "Terrazzo privato",
          "1 camera da letto",
          "1 bagno",
          "Palazzo moderno con portineria",
          "Metro M3 a 3 minuti",
          "WiFi ad alta velocità",
          "Lavatrice",
          "Lavastoviglie",
          "Aria condizionata",
          "Riscaldamento autonomo",
          "TV",
          "Biancheria da letto e bagno inclusa",
        ],
        services: ["Check-in flessibile", "Parcheggio privato (su richiesta)"],
        metaTitle:
          "Suite Porta Romana — Appartamento di Design con Terrazzo a Milano",
        metaDescription:
          "Appartamento di design ristrutturato da architetto in Porta Romana, Milano. Terrazzo privato, portineria, metro M3 a 3 minuti. Fino a 4 ospiti.",
      },
      en: {
        shortDescription: "Design apartment with a terrace in Porta Romana",
        subtitle: "Design apartment with a terrace in Porta Romana",
        description: [
          "Suite Porta Romana is a fully architect-renovated apartment located on Via Muratori 13, in the heart of Milan's Porta Romana district — one of the most sought-after addresses for visitors to the city.",
          "On the first floor of a modern building with a concierge, the apartment is a bright one-bedroom flat with a bedroom, living room and bathroom, finished with quality materials. The private terrace offers outdoor space that is rare this close to the centre.",
          "The M3 underground line (Porta Romana) is a few minutes' walk away. Restaurants, bars, markets and supermarkets are within easy reach. Everything you need is included: high-speed WiFi, washing machine, dishwasher, air conditioning, independent heating, TV.",
        ],
        amenities: [
          "Private terrace",
          "1 bedroom",
          "1 bathroom",
          "Modern building with concierge",
          "M3 metro 3 minutes away",
          "High-speed WiFi",
          "Washing machine",
          "Dishwasher",
          "Air conditioning",
          "Independent heating",
          "TV",
          "Bed and bath linen included",
        ],
        services: ["Flexible check-in", "Private parking (on request)"],
        metaTitle:
          "Suite Porta Romana — Design Apartment with Terrace in Milan",
        metaDescription:
          "Architect-renovated design apartment in Porta Romana, Milan. Private terrace, concierge, M3 metro 3 minutes away. Up to 4 guests.",
      },
    },
  },
  {
    slug: "suite-porta-romana-2",
    region: "milano",
    name: "Suite Porta Romana 2",
    location: "Porta Romana, Milano",
    address: "Via Francesco Burlamacchi 11, 20135 Milano",
    owner: "Carlo Ardito",
    cin: "IT015146C2Y9TJUBD6",
    mapsUrl: "https://maps.app.goo.gl/kYRrsSW8tkU15jFk8",
    smoobuApartmentId: "1894203",
    guests: 4,
    bedrooms: 1,
    bathrooms: 1,
    heroImage: "/images/suite-porta-romana-2/00-Foto%20Apertura%20quadrata.jpg",
    cardImage: "/images/suite-porta-romana-2/06-Soggiorno%201.jpg",
    gallery: [
      "https://globaluserfiles.com/media/306267_3837a41cec59826f434447d7854001f1f5c843ac.jpeg/v1/w_1200,h_800/soggiorno%201.jpeg",
      "https://globaluserfiles.com/media/306267_b188cd9c54a393c75f5b3caa077332d816092d82.jpeg/v1/w_1200,h_800/letto%201.jpeg",
      "https://globaluserfiles.com/media/306267_41cdb11548722a729c1630e112ca8a4ddb5b71e8.jpeg/v1/w_1200,h_800/cucina%201.jpeg",
      "https://globaluserfiles.com/media/306267_05b051ae18099971682adcb89dc58944f8c3b3e2.jpeg/v1/w_1200,h_800/bagno%201.jpeg",
      "https://globaluserfiles.com/media/306267_7e06e11388ed820ed996eadc485759cd4073d9c3.jpeg/v1/w_1200,h_800/esterno.jpeg",
      "https://globaluserfiles.com/media/306267_ccb7e994dc0e9dd68496d940eefa18d89993beb6.jpeg/v1/w_1200,h_800/soggiorno%202.jpeg",
      "https://globaluserfiles.com/media/306267_6edacaa9743b9854b5230d6579453f4c423b92c6.jpeg/v1/w_1200,h_800/letto%202.jpeg",
      "https://globaluserfiles.com/media/306267_8e6ab777b27b5aaf2811ba77b21afca5d93a4b60.jpeg/v1/w_1200,h_800/bagno%202.jpeg",
      "https://globaluserfiles.com/media/306267_648f4fbf59d3157a161fdfd0077195a0fd416a20.jpeg/v1/w_1200,h_800/soggiorno%203.jpeg",
      "https://globaluserfiles.com/media/306267_00e65785616951251e5f8686cecc05d830b4d6df.jpeg/v1/w_1200,h_800/divano.jpeg",
    ],
    i18n: {
      it: {
        shortDescription:
          "Secondo appartamento di design nel cuore di Porta Romana",
        subtitle: "Secondo appartamento di design nel cuore di Porta Romana",
        description: [
          "Suite Porta Romana 2 è il secondo appartamento del portfolio DesignSuite nel quartiere Porta Romana di Milano. Completamente ristrutturato da architetto con finiture contemporanee e materiali selezionati, è un bilocale luminoso composto da camera, soggiorno e bagno, pensato per offrire il massimo comfort durante il soggiorno in città.",
          "L'appartamento è equipaggiato con tutto il necessario per sentirsi a casa: doppia TV, WiFi ad alta velocità, lavatrice, asciugatrice, lavastoviglie, aria condizionata e riscaldamento autonomo.",
          "La metropolitana M3 (linea gialla) è a pochi minuti a piedi, garantendo un accesso rapido a qualsiasi punto di Milano, dal Duomo ai Navigli, da Brera alla Fiera. Il quartiere Porta Romana è uno dei più vivaci e ben serviti della città, con una ricca offerta di ristoranti, caffetterie, mercati e negozi.",
        ],
        amenities: [
          "1 camera da letto",
          "1 bagno",
          "Metro M3 a pochi minuti",
          "Doppia TV",
          "WiFi ad alta velocità",
          "Lavatrice e asciugatrice",
          "Lavastoviglie",
          "Aria condizionata",
          "Riscaldamento autonomo",
          "Biancheria da letto e bagno inclusa",
        ],
        services: ["Check-in flessibile"],
        metaTitle: "Suite Porta Romana 2 — Appartamento Moderno a Milano",
        metaDescription:
          "Appartamento moderno ristrutturato da architetto nel quartiere Porta Romana, Milano. Tutti i comfort, metro M3 a pochi minuti. Fino a 4 ospiti.",
      },
      en: {
        shortDescription: "A second design apartment in the heart of Porta Romana",
        subtitle: "A second design apartment in the heart of Porta Romana",
        description: [
          "Suite Porta Romana 2 is the second apartment in the DesignSuite portfolio in Milan's Porta Romana district. Fully architect-renovated with contemporary finishes and selected materials, it is a bright one-bedroom flat with a bedroom, living room and bathroom, designed for maximum comfort during your stay in the city.",
          "The apartment is equipped with everything you need to feel at home: two TVs, high-speed WiFi, washing machine, tumble dryer, dishwasher, air conditioning and independent heating.",
          "The M3 underground line (yellow line) is a few minutes' walk away, giving quick access to anywhere in Milan — from the Duomo to the Navigli, from Brera to the Fiera. The Porta Romana district is one of the liveliest and best-served in the city, with a rich choice of restaurants, cafés, markets and shops.",
        ],
        amenities: [
          "1 bedroom",
          "1 bathroom",
          "M3 metro a few minutes away",
          "Two TVs",
          "High-speed WiFi",
          "Washing machine and tumble dryer",
          "Dishwasher",
          "Air conditioning",
          "Independent heating",
          "Bed and bath linen included",
        ],
        services: ["Flexible check-in"],
        metaTitle: "Suite Porta Romana 2 — Modern Apartment in Milan",
        metaDescription:
          "Modern architect-renovated apartment in the Porta Romana district, Milan. All comforts, M3 metro a few minutes away. Up to 4 guests.",
      },
    },
  },
];

export const HERO_IMAGE =
  "https://globaluserfiles.com/media/306267_3175d3ea75c4c407c9175b53de454ac5a9c01a46.jpeg/v1/w_1920,h_1080/3175d3ea75c4c407c9175b53de454ac5a9c01a46.jpg";

export const WHATSAPP_URL = "https://wa.me/393356810310";
export const EMAIL = "carlo@designsuite.it";

export function getProperty(slug: string): Property | undefined {
  return properties.find((p) => p.slug === slug);
}

export function propertiesByRegion(region: Property["region"]): Property[] {
  return properties.filter((p) => p.region === region);
}

export function localizeProperty(p: Property, lang: Locale): LocalizedProperty {
  const { i18n, ...rest } = p;
  return { ...rest, ...i18n[lang] };
}

export function getLocalizedProperty(
  slug: string,
  lang: Locale,
): LocalizedProperty | undefined {
  const p = getProperty(slug);
  return p ? localizeProperty(p, lang) : undefined;
}
