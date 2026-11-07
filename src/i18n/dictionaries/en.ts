export const en = {
  localeName: "English",
  switchLanguage: "Switch language",

  meta: {
    siteTitleDefault: "Designsuite — Design Rentals in Milan and Salento",
    siteTitleTemplate: "%s | Designsuite",
    siteDescription:
      "Villas with pools in Salento and design apartments in Milan. Four hand-picked properties for a stay you won’t forget.",
    privacyTitle: "Privacy Policy",
    privacyDescription:
      "Information on the processing of personal data pursuant to EU Regulation 2016/679 (GDPR).",
    termsTitle: "Terms & Conditions",
    termsDescription:
      "Terms and conditions for the use of the website and for the short-term tourist rental of the DesignSuite properties.",
    prenotaTitle: "Book",
    guestInfoTitle: "Guest information",
  },

  nav: {
    milano: "Milan",
    salento: "Salento",
    contatti: "Contact",
    book: "Book",
  },

  hero: {
    eyebrow: "Milan · Puglia · Salento",
    titleLine1: "When design",
    titleLine2: "becomes home.",
    subtitle:
      "Luxury apartments and villas curated down to the last detail. From the urban elegance of Milan to the magic of Salento, every residence is a unique experience.",
    cta: "Discover the residences",
  },

  trust: [
    { strong: "4.9 / 5.0", span: "200+ reviews" },
    { strong: "Airbnb Superhost", span: "Certified" },
    { strong: "4 residences", span: "Milan and Salento" },
    { strong: "Flexible check-in", span: "Always available" },
    { strong: "Booking Award", span: "Outstanding hospitality" },
  ],

  residences: {
    eyebrow: "Our residences",
    title: "From the heart of Milan to the heart of Salento",
    salento: {
      name: "Puglia · Salento",
      desc: "The sea, the olive trees, the silence. Our villas in Salento are unique experiences in the heart of the most authentic Puglia.",
      cardLocation: "Salento · Puglia",
    },
    milano: {
      name: "Milan",
      desc: "Design, culture and food. Our suites in Porta Romana are the ideal starting point to explore the Milan that matters.",
      cardLocation: "Milan · Porta Romana",
    },
    tagUpToGuests: "Up to {n} guests",
    tagIdealFor2: "Ideal for 2",
    tagUpTo4: "Up to 4",
  },

  card: {
    discover: "Discover →",
    priceFrom: "from €{n}",
    perNight: "per night",
  },

  why: [
    {
      number: "4.9",
      title: "Average rating",
      desc: "Every residence cared for in the smallest details for a flawless stay.",
    },
    {
      number: "500+",
      title: "Happy guests",
      desc: "Outstanding hospitality recognised by Airbnb and Booking.com.",
    },
    {
      number: "4",
      title: "Exclusive residences",
      desc: "Two in the heart of Milan, two in the wonder of Salento.",
    },
    {
      number: "24h",
      title: "Continuous assistance",
      desc: "Always available before, during and after your stay.",
    },
  ],

  property: {
    guests: "{n} guests",
    bedroomOne: "bedroom",
    bedroomMany: "bedrooms",
    bathroomOne: "bathroom",
    bathroomMany: "bathrooms",
    cinLine: "CIN (National Identification Code): {cin} · Host: {owner}",
    amenities: "Amenities",
    services: "Services",
    bookTitle: "Book or request availability",
    bookBody:
      "Book online with no fees and instant confirmation, or message us on WhatsApp for a tailored reply.",
    bookOnline: "Book online",
    whatsapp: "WhatsApp",
    bookNote: "Direct booking available with no commission.",
    gallery: "Gallery",
    backSalento: "All properties in Salento",
    backMilano: "All apartments in Milan",
  },

  booking: {
    eyebrow: "Direct booking",
    title: "Check availability",
    close: "Close",
  },

  prenota: {
    eyebrow: "Book your residence",
    title: "Check availability",
    body: "Pick your dates and book directly. No fees, instant confirmation.",
  },

  galleryUi: {
    photoAlt: "{name} — photo {n}",
    prevPhotoAlt: "{name} — previous photo",
    dialogLabel: "{name} gallery",
    closeGallery: "Close gallery",
    prevPhoto: "Previous photo",
    nextPhoto: "Next photo",
  },

  footer: {
    tagline: "Luxury is in the details.",
    phone: "Phone",
    email: "Email",
    social: "Social",
    badgeSuperhost: "✦ Airbnb Superhost",
    badgeBooking: "✦ Booking.com Award",
    rights: "© {year} Designsuite. All rights reserved.",
    privacy: "Privacy Policy",
    terms: "Terms & Conditions",
  },

  guestInfo: {
    stepAlt: "{property} — step {n}",
    sectionStepAlt: "{property} — {section} {n}",
    footer: "Information page for guests of {property}. Support:",
    support: "WhatsApp +39 335 6810 310",
  },
} as const;
