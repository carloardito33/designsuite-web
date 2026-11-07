export const it = {
  localeName: "Italiano",
  switchLanguage: "Cambia lingua",

  meta: {
    siteTitleDefault: "Designsuite — Affitti di Design a Milano e in Salento",
    siteTitleTemplate: "%s | Designsuite",
    siteDescription:
      "Ville con piscina in Salento e appartamenti di design a Milano. Quattro proprietà selezionate per un soggiorno che non dimenticherai.",
    privacyTitle: "Privacy Policy",
    privacyDescription:
      "Informativa sul trattamento dei dati personali ai sensi del Regolamento UE 2016/679 (GDPR).",
    termsTitle: "Termini e Condizioni",
    termsDescription:
      "Termini e condizioni di utilizzo del sito e di locazione turistica breve delle strutture DesignSuite.",
    prenotaTitle: "Prenota",
    guestInfoTitle: "Informazioni ospiti",
  },

  nav: {
    milano: "Milano",
    salento: "Salento",
    contatti: "Contatti",
    book: "Prenota",
  },

  hero: {
    eyebrow: "Milano · Puglia · Salento",
    titleLine1: "Quando il design",
    titleLine2: "diventa casa.",
    subtitle:
      "Appartamenti e ville di lusso curati in ogni dettaglio. Dall’eleganza urbana di Milano alla magia del Salento, ogni residenza è un’esperienza unica.",
    cta: "Scopri le residenze",
  },

  trust: [
    { strong: "4.9 / 5.0", span: "200+ recensioni" },
    { strong: "Airbnb Superhost", span: "Certificato" },
    { strong: "4 residenze", span: "Milano e Salento" },
    { strong: "Check-in flessibile", span: "Sempre disponibili" },
    { strong: "Booking Award", span: "Ospitalità eccellente" },
  ],

  residences: {
    eyebrow: "Le nostre residenze",
    title: "Dal centro di Milano al cuore del Salento",
    salento: {
      name: "Puglia · Salento",
      desc: "Il mare, gli ulivi, il silenzio. Le nostre ville nel Salento sono esperienze uniche nel cuore della Puglia più autentica.",
      cardLocation: "Salento · Puglia",
    },
    milano: {
      name: "Milano",
      desc: "Design, cultura e gastronomia. Le nostre suite a Porta Romana sono il punto di partenza ideale per esplorare la Milano che conta.",
      cardLocation: "Milano · Porta Romana",
    },
    tagUpToGuests: "Fino a {n} ospiti",
    tagIdealFor2: "Ideale per 2",
    tagUpTo4: "Fino a 4",
  },

  card: {
    discover: "Scopri →",
    priceFrom: "da €{n}",
    perNight: "a notte",
  },

  why: [
    {
      number: "4.9",
      title: "Valutazione media",
      desc: "Ogni residenza curata nei minimi dettagli per un soggiorno impeccabile.",
    },
    {
      number: "500+",
      title: "Ospiti soddisfatti",
      desc: "Ospitalità d’eccellenza riconosciuta da Airbnb e Booking.com.",
    },
    {
      number: "4",
      title: "Residenze esclusive",
      desc: "Due nel cuore di Milano, due nella meraviglia del Salento.",
    },
    {
      number: "24h",
      title: "Assistenza continua",
      desc: "Sempre disponibili prima, durante e dopo il soggiorno.",
    },
  ],

  property: {
    guests: "{n} ospiti",
    bedroomOne: "camera da letto",
    bedroomMany: "camere da letto",
    bathroomOne: "bagno",
    bathroomMany: "bagni",
    cinLine: "CIN (Codice Identificativo Nazionale): {cin} · Locatore: {owner}",
    amenities: "Dotazioni",
    services: "Servizi",
    bookTitle: "Prenota o richiedi disponibilità",
    bookBody:
      "Prenota online senza commissioni con conferma immediata, oppure scrivici su WhatsApp per una risposta personalizzata.",
    bookOnline: "Prenota online",
    whatsapp: "WhatsApp",
    bookNote: "Prenotazione diretta disponibile senza commissioni.",
    gallery: "Galleria",
    backSalento: "Tutte le proprietà in Salento",
    backMilano: "Tutti gli appartamenti a Milano",
  },

  booking: {
    eyebrow: "Prenotazione diretta",
    title: "Verifica disponibilità",
    close: "Chiudi",
  },

  prenota: {
    eyebrow: "Prenota la tua residenza",
    title: "Verifica disponibilità",
    body: "Seleziona le date e prenota direttamente. Nessuna commissione, conferma immediata.",
  },

  galleryUi: {
    photoAlt: "{name} — foto {n}",
    prevPhotoAlt: "{name} — foto precedente",
    dialogLabel: "Galleria {name}",
    closeGallery: "Chiudi galleria",
    prevPhoto: "Foto precedente",
    nextPhoto: "Foto successiva",
  },

  footer: {
    tagline: "Il lusso è nei dettagli.",
    phone: "Telefono",
    email: "Email",
    social: "Social",
    badgeSuperhost: "✦ Airbnb Superhost",
    badgeBooking: "✦ Booking.com Award",
    rights: "© {year} Designsuite. Tutti i diritti riservati.",
    privacy: "Privacy Policy",
    terms: "Termini e Condizioni",
  },

  guestInfo: {
    stepAlt: "{property} — passo {n}",
    sectionStepAlt: "{property} — {section} {n}",
    footer: "Pagina informativa per gli ospiti di {property}. Assistenza:",
    support: "WhatsApp +39 335 6810 310",
  },
} as const;
