import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Termini e Condizioni",
  description: "Termini e condizioni di utilizzo del sito e delle strutture DesignSuite.",
};

export default function TerminiCondizioni() {
  return (
    <div className="pt-16 max-w-3xl mx-auto px-6 py-20">
      <h1 className="font-serif text-4xl font-light text-[var(--charcoal)] mb-8">
        Termini e Condizioni
      </h1>
      <div className="text-[var(--charcoal)]/75 space-y-4 leading-relaxed text-sm">
        <p>
          L&apos;utilizzo del presente sito e la prenotazione delle strutture
          DesignSuite sono soggetti ai seguenti termini e condizioni.
        </p>
        <p>
          Le prenotazioni sono confermate solo a seguito di comunicazione
          scritta e versamento dell&apos;acconto richiesto. Il check-in e
          check-out avvengono negli orari concordati. È vietato fumare
          all&apos;interno delle strutture.
        </p>
        <p>
          Il numero massimo di ospiti è quello indicato per ciascuna proprietà.
          DesignSuite si riserva il diritto di risolvere il contratto in caso
          di violazione delle presenti condizioni, senza rimborso.
        </p>
        <p className="text-xs text-[var(--charcoal)]/40">
          Ultimo aggiornamento: maggio 2026
        </p>
      </div>
    </div>
  );
}
