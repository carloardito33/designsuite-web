export type Property = {
  slug: string;
  region: "salento" | "milano";
  name: string;
  location: string;
  address: string;
  shortDescription: string;
  subtitle: string;
  description: string[];
  guests: number;
  bedrooms: number;
  bathrooms: number;
  heroImage: string;
  cardImage: string;
  gallery: string[];
  amenities: string[];
  services: string[];
  metaTitle: string;
  metaDescription: string;
};

export const properties: Property[] = [
  {
    slug: "bosco-degli-ulivi",
    region: "salento",
    name: "Bosco degli Ulivi",
    location: "Morciano di Leuca, Salento",
    address: "Via Murge snc, Morciano di Leuca (LE)",
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
  {
    slug: "villa-crea",
    region: "salento",
    name: "Villa Crea",
    location: "Castrignano del Capo, Salento",
    address: "SC Mattara, Castrignano del Capo (LE)",
    shortDescription:
      "Rifugio di charme con piscina 15×3 vista mare a pochi km da Santa Maria di Leuca",
    subtitle:
      "Rifugio di charme con piscina 15×3 vista mare a pochi km da Santa Maria di Leuca",
    description: [
      "Villa CREA è un rifugio di charme con una piscina mozzafiato affacciata sul mare cristallino del Salento, a pochi chilometri da Santa Maria di Leuca, là dove la Puglia tocca il suo punto più estremo. Progettata dall'architetto Zanaroli, la villa accoglie fino a 8 ospiti in un'atmosfera di raffinata semplicità.",
      "Dispone di quattro camere da letto, quattro bagni (due ensuite, uno nella zona giorno e uno esterno), una lavanderia, un ampio soggiorno e una cucina a vista perfettamente integrata. Gli elettrodomestici di classe A+, insieme ad arredi e tessili selezionati con cura, offrono un'esperienza di comfort totale, in equilibrio tra eleganza e funzionalità. La villa è dotata di un impianto fotovoltaico, nel rispetto dell'ambiente e con un occhio alla sostenibilità.",
      "All'esterno, la grande area living ospita una cucina attrezzata, un tavolo in pietra per pranzi e cene all'aperto, e un comodo divano su cui abbandonarsi al silenzio del paesaggio. Il tramonto sul mare, visto da Villa CREA. Un'emozione che non si dimentica.",
    ],
    guests: 8,
    bedrooms: 4,
    bathrooms: 4,
    heroImage: "/images/villa-crea/01-IMG_3955.jpg",
    cardImage: "/images/villa-crea/01-IMG_3955.jpg",
    gallery: [],
    amenities: [
      "Piscina 15×3 m con vista mare",
      "4 camere da letto (2 matrimoniali, 2 doppie flessibili)",
      "4 bagni con doccia (2 en-suite, 1 esterno)",
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
  {
    slug: "suite-porta-romana",
    region: "milano",
    name: "Suite Porta Romana",
    location: "Porta Romana, Milano",
    address: "Via Muratori 13, 20135 Milano",
    shortDescription: "Appartamento di design con terrazzo in Porta Romana",
    subtitle: "Appartamento di design con terrazzo in Porta Romana",
    description: [
      "Suite Porta Romana è un appartamento completamente ristrutturato da architetto, situato in Via Muratori 13, nel cuore del quartiere Porta Romana a Milano, uno degli indirizzi più ambiti per chi visita la città.",
      "Al primo piano di un palazzo moderno con portineria, l'appartamento è un bilocale luminoso composto da camera, soggiorno e bagno, con finiture e materiali di qualità. Il terrazzo privato offre uno spazio esterno raro a questa distanza dal centro.",
      "La metropolitana M3 (Porta Romana) è a pochi minuti a piedi. Ristoranti, bar, mercati e supermercati a portata di mano. Tutto il necessario è incluso: WiFi ad alta velocità, lavatrice, lavastoviglie, aria condizionata, riscaldamento autonomo, TV.",
    ],
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
    services: [
      "Check-in flessibile",
      "Parcheggio privato (su richiesta)",
    ],
    metaTitle:
      "Suite Porta Romana — Appartamento di Design con Terrazzo a Milano",
    metaDescription:
      "Appartamento di design ristrutturato da architetto in Porta Romana, Milano. Terrazzo privato, portineria, metro M3 a 3 minuti. Fino a 4 ospiti.",
  },
  {
    slug: "suite-porta-romana-2",
    region: "milano",
    name: "Suite Porta Romana 2",
    location: "Porta Romana, Milano",
    address: "Zona Porta Romana, 20135 Milano",
    shortDescription:
      "Secondo appartamento di design nel cuore di Porta Romana",
    subtitle: "Secondo appartamento di design nel cuore di Porta Romana",
    description: [
      "Suite Porta Romana 2 è il secondo appartamento del portfolio DesignSuite nel quartiere Porta Romana di Milano. Completamente ristrutturato da architetto con finiture contemporanee e materiali selezionati, si compone di 4 ambienti luminosi pensati per offrire il massimo comfort durante il soggiorno in città.",
      "L'appartamento è equipaggiato con tutto il necessario per sentirsi a casa: doppia TV, WiFi ad alta velocità, lavatrice, asciugatrice, lavastoviglie, aria condizionata e riscaldamento autonomo.",
      "La metropolitana M3 (linea gialla) è a pochi minuti a piedi, garantendo un accesso rapido a qualsiasi punto di Milano, dal Duomo ai Navigli, da Brera alla Fiera. Il quartiere Porta Romana è uno dei più vivaci e ben serviti della città, con una ricca offerta di ristoranti, caffetterie, mercati e negozi.",
    ],
    guests: 4,
    bedrooms: 2,
    bathrooms: 2,
    heroImage:
      "https://globaluserfiles.com/media/306267_d5f36eceb66f3349cb8ce760faade93c77523f68.jpeg/v1/w_1920,h_800/d5f36eceb66f3349cb8ce760faade93c77523f68.jpg",
    cardImage:
      "https://globaluserfiles.com/media/306267_3837a41cec59826f434447d7854001f1f5c843ac.jpeg/v1/w_1200,h_800/soggiorno%201.jpeg",
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
    amenities: [
      "2 camere da letto",
      "2 bagni",
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
