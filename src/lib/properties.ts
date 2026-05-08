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
      "Villa con piscina tra ulivi secolari nel Salento più autentico",
    subtitle:
      "Villa con piscina tra ulivi secolari nel Salento più autentico",
    description: [
      "Bosco degli Ulivi è una villa con piscina immersa tra ulivi secolari a Morciano di Leuca, nel cuore del Salento sud-occidentale. Progettata da un rinomato architetto e pubblicata su riviste e libri di architettura internazionale, la villa unisce linee essenziali, materiali naturali locali e un'attenzione ai dettagli che la distingue dalle case vacanze convenzionali.",
      "Disposta su un unico livello, accoglie fino a 6 ospiti in tre camere da letto, due bagni (uno ensuite), soggiorno aperto, cucina a vista e lavanderia. Gli elettrodomestici di classe A, la biancheria selezionata e gli arredi curati garantiscono un comfort autentico, lontano dall'hotel ma senza rinunciare a nulla.",
      "All'esterno, una cucina attrezzata per cene sotto le stelle, un tavolo in pietra locale, una zona lounge e un ampio solarium a bordo piscina dove il tempo sembra fermarsi. Le spiagge più belle del Salento sono a pochi minuti in auto.",
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
      "Piscina privata",
      "3 camere da letto",
      "2 bagni (1 ensuite)",
      "Cucina esterna attrezzata",
      "Solarium a bordo piscina",
      "Tavolo in pietra outdoor",
      "Zona living esterna",
      "Lavanderia",
      "Elettrodomestici classe A",
      "Biancheria da letto e bagno inclusa",
      "WiFi",
      "Aria condizionata",
      "Parcheggio privato",
    ],
    services: [
      "Pulizia settimanale inclusa",
      "Pulizia giornaliera (su richiesta)",
      "Pulizia esterna a giorni alterni",
    ],
    metaTitle:
      "Bosco degli Ulivi — Villa con Piscina a Morciano di Leuca, Salento",
    metaDescription:
      "Villa esclusiva con piscina a Morciano di Leuca, Salento. Progettata da architetto, 3 camere, fino a 6 ospiti. A pochi minuti dalle spiagge del Sud Salento.",
  },
  {
    slug: "villa-crea",
    region: "salento",
    name: "Villa Crea",
    location: "Castrignano del Capo, Salento",
    address: "SC Mattara, Castrignano del Capo (LE)",
    shortDescription: "Piscina affacciata sul mare a Santa Maria di Leuca",
    subtitle: "Piscina affacciata sul mare a Santa Maria di Leuca",
    description: [
      "Villa Crea è un rifugio di charme con piscina affacciata sul mare cristallino del Salento, situata a Castrignano del Capo, a pochi chilometri da Santa Maria di Leuca — il punto più a sud della Puglia, dove l'Adriatico incontra lo Ionio.",
      "Progettata dall'architetto Zanaroli, la villa accoglie fino a 8 ospiti in un'atmosfera di raffinata semplicità pugliese. Ogni ambiente è pensato per amplificare il rapporto con il paesaggio: luce, pietra, mare e cielo si fondono in un'unica esperienza visiva.",
      "L'ampia area outdoor ospita una cucina attrezzata, un tavolo in pietra locale per pranzi e cene all'aperto e un divano dove lasciarsi avvolgere dal silenzio del Salento profondo. Il tramonto sul mare visto dalla piscina di Villa Crea è un'emozione che non si dimentica.",
    ],
    guests: 8,
    bedrooms: 4,
    bathrooms: 3,
    heroImage:
      "https://globaluserfiles.com/media/306267_3175d3ea75c4c407c9175b53de454ac5a9c01a46.jpeg/v1/w_1920,h_1080/3175d3ea75c4c407c9175b53de454ac5a9c01a46.jpg",
    cardImage:
      "https://globaluserfiles.com/media/306267_0e8222c45b0a50f2f9c94d56b923a63508000476.jpeg/v1/w_1200,h_800/img_9785.jpeg",
    gallery: [
      "https://globaluserfiles.com/media/306267_0e8222c45b0a50f2f9c94d56b923a63508000476.jpeg/v1/w_1200,h_800/img_9785.jpeg",
      "https://globaluserfiles.com/media/306267_5fbc5f38db01f64ac5439215b57d81e70689a205.jpeg/v1/w_1200,h_800/img_9784.jpeg",
      "https://globaluserfiles.com/media/306267_e5bb8d80591039b52b5701814cb45fb9e7d1ba03.jpeg/v1/w_1200,h_800/img_9787.jpeg",
      "https://globaluserfiles.com/media/306267_294e1ca2e1e4a20e1bfe8805032d446378eb9c54.jpeg/v1/w_1200,h_800/img_4267.jpeg",
      "https://globaluserfiles.com/media/306267_3e7c9cc418ab3a9fd3d5195e35fba51218a4b848.jpeg/v1/w_1200,h_800/img_4266.jpeg",
      "https://globaluserfiles.com/media/306267_1603a1144e5ca1fd71b1d1396941aca8fb64a2e3.jpeg/v1/w_1200,h_800/img_4400.jpeg",
      "https://globaluserfiles.com/media/306267_8823c9e2a87bf0c73213d0eeefd55728b016f89b.jpeg/v1/w_1200,h_800/img_9751.jpeg",
      "https://globaluserfiles.com/media/306267_a1abd27dcdc82a976d00b6b9016e8c8c0626cddf.jpeg/v1/w_1200,h_800/img_9752.jpeg",
      "https://globaluserfiles.com/media/306267_c4d16aad85f9bd4835c37cdc31b76f83a6f0612e.jpeg/v1/w_1200,h_800/img_9753.jpeg",
      "https://globaluserfiles.com/media/306267_54387dd12b2fb5544d36eba0e77d43282b17b79a.jpeg/v1/w_1200,h_800/img_9757.jpeg",
    ],
    amenities: [
      "Piscina con vista mare",
      "4 camere da letto",
      "3 bagni",
      "Vista panoramica sul mare",
      "Cucina esterna attrezzata",
      "Tavolo in pietra outdoor",
      "Zona lounge esterna",
      "Biancheria da letto e bagno inclusa",
      "WiFi",
      "Aria condizionata",
      "Parcheggio privato",
    ],
    services: [
      "Pulizia settimanale inclusa",
      "Pulizia giornaliera (su richiesta)",
      "Pulizia esterna a giorni alterni",
      "Chef privato (su richiesta)",
    ],
    metaTitle:
      "Villa Crea — Piscina Vista Mare a Castrignano del Capo, Salento",
    metaDescription:
      "Villa di charme con piscina affacciata sul mare del Salento. Progettata da Zanaroli, fino a 8 ospiti. A pochi km da Santa Maria di Leuca, Puglia.",
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
      "Suite Porta Romana è un appartamento completamente ristrutturato da architetto, situato in Via Muratori 13, nel cuore del quartiere Porta Romana a Milano — uno degli indirizzi più ambiti per chi visita la città.",
      "Al primo piano di un palazzo storico con portineria, l'appartamento è composto da 4 ambienti luminosi con finiture moderne e materiali di qualità. Il terrazzo privato offre uno spazio esterno raro a questa distanza dal centro.",
      "La metropolitana M3 (Porta Romana) è a pochi minuti a piedi. Ristoranti, bar, mercati e supermercati a portata di mano. Tutto il necessario è incluso: WiFi ad alta velocità, lavatrice, lavastoviglie, aria condizionata, riscaldamento autonomo, TV.",
    ],
    guests: 4,
    bedrooms: 2,
    bathrooms: 2,
    heroImage:
      "https://globaluserfiles.com/media/306267_eb7a2a70c10be90e140696784a13451347f88e2e.jpeg/v1/w_1920,h_800/eb7a2a70c10be90e140696784a13451347f88e2e.jpg",
    cardImage:
      "https://globaluserfiles.com/media/306267_cf2ec89f0a52955ee9f84712a7a5c857a87c8821.jpeg/v1/w_1200,h_800/soggiorno%201.jpeg",
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
      "2 camere da letto",
      "2 bagni",
      "Palazzo storico con portineria",
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
      "La metropolitana M3 (linea gialla) è a pochi minuti a piedi, garantendo un accesso rapido a qualsiasi punto di Milano — dal Duomo ai Navigli, da Brera alla Fiera. Il quartiere Porta Romana è uno dei più vivaci e ben serviti della città, con una ricca offerta di ristoranti, caffetterie, mercati e negozi.",
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
