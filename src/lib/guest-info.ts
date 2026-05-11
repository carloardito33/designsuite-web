export type GuestInfoStep = {
  image: string;
  caption?: string;
  captionEn?: string;
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
    steps: [
      {
        image: "/images/info/suite-porta-romana-accesso/1-ingresso.jpg",
        caption:
          "Se la reception è chiusa, utilizza la chiave o chiama Carlo al +39 335 6810 310",
        captionEn:
          "If the reception is closed, use the key or call Carlo at +39 335 6810 310",
      },
      {
        image: "/images/info/suite-porta-romana-accesso/2-corridoio.jpg",
        caption:
          "Percorri il corridoio di fronte fino in fondo, poi prendi l'ascensore a destra (1° piano)",
        captionEn:
          "Walk down the corridor in front to the end, then take the lift on the right (1st floor)",
      },
      {
        image: "/images/info/suite-porta-romana-accesso/3-ascensore.jpg",
        caption: "Usciti dall'ascensore, gira a sinistra",
        captionEn: "Once out of the lift, turn left",
      },
      {
        image: "/images/info/suite-porta-romana-accesso/4-corridoio.jpg",
        caption: "Prosegui lungo il corridoio",
        captionEn: "Continue along the corridor",
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
          "Quando esci dall'appartamento puoi chiuderlo con il pulsante “lucchetto”; in alternativa la serratura si chiude da sola dopo 2 minuti",
        captionEn:
          "When you leave the apartment you can lock it with the “padlock” button; otherwise the lock closes automatically after 2 minutes",
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
        image: "/images/info/suite-porta-romana-contatore/1-ascensore.webp",
        caption: "Prendi l'ascensore",
        captionEn: "Take the lift",
      },
      {
        image: "/images/info/suite-porta-romana-contatore/2-ascensore.webp",
        caption: "Premi il pulsante per il piano -1",
        captionEn: "Press the button for floor -1",
      },
      {
        image:
          "/images/info/suite-porta-romana-contatore/3-locale-contatori.webp",
        caption: "Uscito dall'ascensore: il locale contatori",
        captionEn: "Exit the lift: the meter room",
      },
      {
        image: "/images/info/suite-porta-romana-contatore/4-contatore.webp",
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
      "Separa i rifiuti negli appositi sacchetti e portali nei contenitori condominiali.",
    introEn: "Sort your waste and place it in the condominium bins.",
    steps: [
      {
        image:
          "/images/info/suite-porta-romana-spazzatura/1-indifferenziata.webp",
        caption: "Indifferenziata",
        captionEn: "Non-recyclable",
      },
      {
        image: "/images/info/suite-porta-romana-spazzatura/2-organico.webp",
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
    footnote: "I contenitori si trovano negli spazi condominiali.",
    footnoteEn: "The bins are located in the condominium areas.",
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
        image: "/images/info/suite-porta-romana-2-accesso/2-portone.webp",
        caption: "Entra dal portone",
        captionEn: "Enter through the main door",
      },
      {
        image: "/images/info/suite-porta-romana-2-accesso/3-scale.webp",
        caption: "Sali per le scale (o prendi l'ascensore)",
        captionEn: "Go up the stairs (or take the lift)",
      },
      {
        image: "/images/info/suite-porta-romana-2-accesso/4-porta.webp",
        caption: "La porta dell'appartamento",
        captionEn: "The apartment door",
      },
    ],
  },
];

export function getGuestInfoPage(slug: string): GuestInfoPage | undefined {
  return guestInfoPages.find((p) => p.slug === slug);
}
