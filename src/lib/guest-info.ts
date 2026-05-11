export type GuestInfoStep = {
  image: string;
  caption?: string;
  captionEn?: string;
};

export type GuestInfoSection = {
  title: string;
  titleEn?: string;
  notice?: string;
  noticeEn?: string;
  steps: GuestInfoStep[];
};

export type GuestInfoPage = {
  slug: string;
  property: string;
  category: string;
  categoryEn?: string;
  title: string;
  titleEn?: string;
  subtitle?: string;
  intro?: string;
  introEn?: string;
  notice?: string;
  noticeEn?: string;
  heroImage?: string;
  steps: GuestInfoStep[];
  footnote?: string;
  footnoteEn?: string;
  extraSections?: GuestInfoSection[];
};

export const guestInfoPages: GuestInfoPage[] = [
  {
    slug: "suite-porta-romana-accesso",
    property: "Suite Porta Romana",
    category: "Accesso",
    categoryEn: "Access",
    title: "Come raggiungere Suite Porta Romana",
    titleEn: "How to reach Suite Porta Romana",
    subtitle: "Via Lodovico Muratori 13, 20135 Milano — 1° piano",
    intro: "Segui le foto per arrivare all'appartamento.",
    introEn: "Follow the photos to reach the apartment.",
    heroImage: "/images/info/suite-porta-romana-accesso/1-ingresso.jpg",
    steps: [
      {
        image: "/images/info/suite-porta-romana-accesso/2-corridoio.jpg",
        caption:
          "Se la reception è chiusa, utilizza la chiave o chiama Carlo al +39 335 6810 310",
        captionEn:
          "If the reception is closed, use the key or call Carlo at +39 335 6810 310",
      },
      {
        image: "/images/info/suite-porta-romana-accesso/3-ascensore.jpg",
        caption:
          "Percorri il corridoio di fronte fino in fondo, poi prendi l'ascensore a destra (1° piano)",
        captionEn:
          "Walk down the corridor in front to the end, then take the lift on the right (1st floor)",
      },
      {
        image: "/images/info/suite-porta-romana-accesso/4-corridoio.jpg",
        caption: "Usciti dall'ascensore, gira a sinistra",
        captionEn: "Once out of the lift, turn left",
      },
      {
        image: "/images/info/suite-porta-romana-accesso/5-porta.jpg",
        caption: "La porta di Suite Porta Romana è in fondo",
        captionEn: "The door of Suite Porta Romana is at the end of the corridor",
      },
      {
        image: "/images/info/suite-porta-romana-accesso/6-tastierino.jpg",
        caption: "Digita il codice ricevuto per aprire la serratura",
        captionEn: "Enter the code you received to open the lock",
      },
      {
        image: "/images/info/suite-porta-romana-accesso/7-maniglia.jpg",
        caption:
          "Per aprire o chiudere la serratura, ruota il pomello o premi il pulsante centrale",
        captionEn:
          "To open or close the lock, turn the knob or press the central button",
      },
      {
        image: "/images/info/suite-porta-romana-accesso/8-chiave.jpg",
        caption:
          "All'interno dell'appartamento troverai la chiave per aprire il portone del palazzo",
        captionEn:
          "Inside the apartment you'll find the key to open the building's main door",
      },
      {
        image: "/images/info/suite-porta-romana-accesso/9-lucchetto.jpg",
        caption:
          "Quando esci dall'appartamento puoi chiuderlo premendo il pulsante “lucchetto” (cerchiato); in alternativa la serratura si chiude da sola dopo 2 minuti",
        captionEn:
          "When you leave the apartment you can lock it by pressing the “padlock” button (circled); otherwise the lock closes automatically after 2 minutes",
      },
    ],
  },
  {
    slug: "suite-porta-romana-contatore",
    property: "Suite Porta Romana",
    category: "Contatore elettrico",
    categoryEn: "Electricity meter",
    title: "Dove si trova il contatore elettrico",
    titleEn: "Where the electricity meter is",
    subtitle: "Via Lodovico Muratori 13, 20135 Milano",
    notice: "Scendere al piano -1",
    noticeEn: "Go down to floor -1",
    steps: [
      {
        image: "/images/info/suite-porta-romana-contatore/1-ascensore.jpg",
        caption: "Prendi l'ascensore indicato dalla freccia, in fondo al corridoio",
        captionEn: "Take the lift indicated by the arrow, at the end of the corridor",
      },
      {
        image: "/images/info/suite-porta-romana-contatore/2-ascensore.jpg",
        caption: "Entra nell'ascensore e premi il pulsante per il piano -1",
        captionEn: "Enter the lift and press the button for floor -1",
      },
      {
        image:
          "/images/info/suite-porta-romana-contatore/3-locale-contatori.jpg",
        caption:
          "Al piano -1 raggiungi la porta del “Locale contatori” (cerchiata)",
        captionEn: "On floor -1, reach the “meter room” door (circled)",
      },
      {
        image: "/images/info/suite-porta-romana-contatore/4-contatore.jpg",
        caption: "Il tuo contatore è quello cerchiato in rosso",
        captionEn: "Your meter is the one circled in red",
      },
    ],
  },
  {
    slug: "suite-porta-romana-spazzatura",
    property: "Suite Porta Romana",
    category: "Raccolta differenziata",
    categoryEn: "Waste collection",
    title: "Raccolta differenziata",
    titleEn: "Separate waste collection",
    subtitle: "Via Lodovico Muratori 13, 20135 Milano",
    intro:
      "Separa i rifiuti negli appositi sacchetti e portali nei contenitori condominiali al piano -1.",
    introEn:
      "Sort your waste in the proper bags and take it to the condominium bins on floor -1.",
    steps: [
      {
        image:
          "/images/info/suite-porta-romana-spazzatura/1-indifferenziata.jpg",
        caption: "Indifferenziata",
        captionEn: "Non-recyclable",
      },
      {
        image: "/images/info/suite-porta-romana-spazzatura/2-organico.jpg",
        caption: "Organico",
        captionEn: "Organic",
      },
      {
        image:
          "/images/info/suite-porta-romana-spazzatura/3-carta-plastica.webp",
        caption: "Carta e Plastica / metalli",
        captionEn: "Paper and Plastic / Metal",
      },
    ],
    extraSections: [
      {
        title: "Contenitori condominiali",
        titleEn: "Condominium containers",
        notice: "Scendere al piano -1",
        noticeEn: "Go down to floor -1",
        steps: [
          {
            image: "/images/info/suite-porta-romana-spazzatura/4-percorso-1.jpg",
            caption:
              "Prendi l'ascensore indicato dalla freccia, in fondo al corridoio",
            captionEn:
              "Take the lift indicated by the arrow, at the end of the corridor",
          },
          {
            image: "/images/info/suite-porta-romana-spazzatura/5-percorso-2.jpg",
            caption: "Entra nell'ascensore e premi il pulsante per il piano -1",
            captionEn: "Enter the lift and press the button for floor -1",
          },
          {
            image:
              "/images/info/suite-porta-romana-spazzatura/6-locale-contenitori.jpg",
            caption:
              "Al piano -1, i contenitori condominiali si trovano oltre la porta cerchiata in rosso",
            captionEn:
              "On floor -1, the condominium containers are beyond the door circled in red",
          },
        ],
      },
    ],
  },
  {
    slug: "suite-porta-romana-2-accesso",
    property: "Suite Porta Romana 2",
    category: "Accesso",
    categoryEn: "Access",
    title: "Come raggiungere Suite Porta Romana 2",
    titleEn: "How to reach Suite Porta Romana 2",
    subtitle: "Via Francesco Burlamacchi 11, 20135 Milano",
    intro: "Segui le foto per arrivare all'appartamento.",
    introEn: "Follow the photos to reach the apartment.",
    heroImage: "/images/info/suite-porta-romana-2-accesso/1-palazzo.webp",
    steps: [
      {
        image: "/images/info/suite-porta-romana-2-accesso/2-portone.jpg",
        caption:
          "Se la reception è chiusa, utilizza la chiave o chiama Carlo al +39 335 6810 310",
        captionEn:
          "If the reception is closed, use the key or call Carlo at +39 335 6810 310",
      },
      {
        image: "/images/info/suite-porta-romana-2-accesso/3-scale.jpg",
        caption: "Sali le scale che trovi nell'atrio del palazzo",
        captionEn: "Go up the stairs you find in the entrance hall",
      },
      {
        image: "/images/info/suite-porta-romana-2-accesso/4-porta.jpg",
        caption:
          "La porta di Suite Porta Romana 2 è la prima del corridoio (cerchiata)",
        captionEn:
          "The door of Suite Porta Romana 2 is the first in the corridor (circled)",
      },
      {
        image: "/images/info/suite-porta-romana-2-accesso/5-tastierino.jpg",
        caption: "Digita il codice ricevuto per aprire la serratura",
        captionEn: "Enter the code you received to open the lock",
      },
      {
        image: "/images/info/suite-porta-romana-2-accesso/6-serratura.jpg",
        caption:
          "Per aprire o chiudere la serratura, ruota il pomello o premi il pulsante centrale",
        captionEn:
          "To open or close the lock, turn the knob or press the central button",
      },
      {
        image: "/images/info/suite-porta-romana-2-accesso/7-chiave.jpg",
        caption:
          "All'interno dell'appartamento troverai la chiave per aprire il portone del palazzo",
        captionEn:
          "Inside the apartment you'll find the key to open the building's main door",
      },
      {
        image: "/images/info/suite-porta-romana-2-accesso/8-lucchetto.jpg",
        caption:
          "Quando esci dall'appartamento puoi chiuderlo premendo il pulsante “lucchetto” (cerchiato); in alternativa la serratura si chiude da sola dopo 2 minuti",
        captionEn:
          "When you leave the apartment you can lock it by pressing the “padlock” button (circled); otherwise the lock closes automatically after 2 minutes",
      },
    ],
  },
  {
    slug: "suite-porta-romana-2-contatore",
    property: "Suite Porta Romana 2",
    category: "Contatore elettrico",
    categoryEn: "Electricity meter",
    title: "Dove si trova il contatore elettrico",
    titleEn: "Where the electricity meter is",
    subtitle: "Via Francesco Burlamacchi 11, 20135 Milano",
    intro:
      "Il contatore si trova nel locale contatori, ai piani interrati del palazzo. Segui le foto.",
    introEn:
      "The meter is in the meter room, in the building's basement levels. Follow the photos.",
    steps: [
      {
        image: "/images/info/suite-porta-romana-2-contatore/0-chiave.jpg",
        caption:
          "Nell'appartamento, prendi la chiave del «Locale contatori» (gancio sotto il rilevatore di fumo)",
        captionEn:
          "In the apartment, take the «meter room» key (hook below the smoke detector)",
      },
      {
        image: "/images/info/suite-porta-romana-2-contatore/1-atrio.jpg",
        caption:
          "Dall'atrio del palazzo scendi verso la porta cerchiata, a mezza scala",
        captionEn:
          "From the building's entrance hall, go down toward the circled door, halfway down the stairs",
      },
      {
        image: "/images/info/suite-porta-romana-2-contatore/2-scale.jpg",
        caption: "Oltrepassata la porta, scendi le scale seguendo la freccia",
        captionEn: "Past the door, go down the stairs following the arrow",
      },
      {
        image: "/images/info/suite-porta-romana-2-contatore/3-porta-grigia.jpg",
        caption: "Apri la porta grigia (maniglia cerchiata)",
        captionEn: "Open the grey door (circled handle)",
      },
      {
        image: "/images/info/suite-porta-romana-2-contatore/4-corridoio.jpg",
        caption: "Scendi ancora e gira a destra verso la porta aperta",
        captionEn: "Go down further and turn right toward the open door",
      },
      {
        image: "/images/info/suite-porta-romana-2-contatore/5-porta-contatori.jpg",
        caption: "Questa è la porta del «Locale contatori»",
        captionEn: "This is the «meter room» door",
      },
      {
        image: "/images/info/suite-porta-romana-2-contatore/6-contatore.jpg",
        caption:
          "Il tuo contatore è quello con la targhetta «ARDITO - TARRICONE»",
        captionEn: "Your meter is the one labelled «ARDITO - TARRICONE»",
      },
    ],
    footnote: "Al termine, ricorda di riportare la chiave nell'appartamento.",
    footnoteEn: "When you're done, remember to return the key to the apartment.",
  },
];

export function getGuestInfoPage(slug: string): GuestInfoPage | undefined {
  return guestInfoPages.find((p) => p.slug === slug);
}
