export type GuestInfoStep = {
  image: string;
  caption?: string;
};

export type GuestInfoPage = {
  slug: string;
  property: string;
  category: string;
  title: string;
  subtitle?: string;
  intro?: string;
  notice?: string;
  heroImage?: string;
  steps: GuestInfoStep[];
  footnote?: string;
};

export const guestInfoPages: GuestInfoPage[] = [
  {
    slug: "suite-porta-romana-accesso",
    property: "Suite Porta Romana",
    category: "Accesso · Access",
    title: "Come raggiungere Suite Porta Romana",
    subtitle: "Via Lodovico Muratori 13, 20135 Milano",
    intro:
      "Segui le foto per arrivare all'appartamento. / Follow the photos to reach the apartment.",
    heroImage: "/images/info/suite-porta-romana-accesso/1-ingresso.webp",
    steps: [
      {
        image: "/images/info/suite-porta-romana-accesso/2-corridoio.webp",
        caption:
          "Entra dal portone e prosegui lungo il corridoio / Enter and walk along the corridor",
      },
      {
        image: "/images/info/suite-porta-romana-accesso/3-ascensore.webp",
        caption: "Prendi l'ascensore / Take the lift",
      },
      {
        image: "/images/info/suite-porta-romana-accesso/4-porta.webp",
        caption:
          "L'appartamento è al primo piano / The apartment is on the first floor",
      },
    ],
  },
  {
    slug: "suite-porta-romana-contatore",
    property: "Suite Porta Romana",
    category: "Contatore elettrico · Electricity meter",
    title: "Dove si trova il contatore elettrico",
    subtitle: "Via Lodovico Muratori 13, 20135 Milano",
    notice: "Scendere al piano -1 / Go down to floor -1",
    steps: [
      {
        image: "/images/info/suite-porta-romana-contatore/1-ascensore.webp",
        caption: "Prendi l'ascensore / Take the lift",
      },
      {
        image: "/images/info/suite-porta-romana-contatore/2-ascensore.webp",
        caption: "Premi il pulsante per il piano -1 / Press the button for floor -1",
      },
      {
        image:
          "/images/info/suite-porta-romana-contatore/3-locale-contatori.webp",
        caption: "Uscito dall'ascensore: il locale contatori / The meter room",
      },
      {
        image: "/images/info/suite-porta-romana-contatore/4-contatore.webp",
        caption:
          "Il tuo contatore è quello cerchiato in rosso / Your meter is the one circled in red",
      },
    ],
  },
  {
    slug: "suite-porta-romana-spazzatura",
    property: "Suite Porta Romana",
    category: "Raccolta differenziata · Waste collection",
    title: "Raccolta differenziata",
    subtitle: "Via Lodovico Muratori 13, 20135 Milano",
    intro:
      "Separa i rifiuti negli appositi sacchetti e portali nei contenitori condominiali. / Sort your waste and place it in the condominium bins.",
    steps: [
      {
        image: "/images/info/suite-porta-romana-spazzatura/1-indifferenziata.webp",
        caption: "Indifferenziata / Non-recyclable",
      },
      {
        image: "/images/info/suite-porta-romana-spazzatura/2-organico.webp",
        caption: "Organico / Organic",
      },
      {
        image: "/images/info/suite-porta-romana-spazzatura/3-carta-plastica.webp",
        caption: "Carta e Plastica / metalli — Paper and Plastic / Metal",
      },
    ],
    footnote:
      "I contenitori si trovano negli spazi condominiali. / The bins are located in the condominium areas.",
  },
  {
    slug: "suite-porta-romana-2-accesso",
    property: "Suite Porta Romana 2",
    category: "Accesso · Access",
    title: "Come raggiungere Suite Porta Romana 2",
    subtitle: "Via Francesco Burlamacchi 11, 20135 Milano",
    intro:
      "Segui le foto per arrivare all'appartamento. / Follow the photos to reach the apartment.",
    heroImage: "/images/info/suite-porta-romana-2-accesso/1-palazzo.webp",
    steps: [
      {
        image: "/images/info/suite-porta-romana-2-accesso/2-portone.webp",
        caption: "Entra dal portone / Enter through the main door",
      },
      {
        image: "/images/info/suite-porta-romana-2-accesso/3-scale.webp",
        caption: "Sali per le scale (o prendi l'ascensore) / Go up the stairs (or take the lift)",
      },
      {
        image: "/images/info/suite-porta-romana-2-accesso/4-porta.webp",
        caption: "La porta dell'appartamento / The apartment door",
      },
    ],
  },
];

export function getGuestInfoPage(slug: string): GuestInfoPage | undefined {
  return guestInfoPages.find((p) => p.slug === slug);
}
