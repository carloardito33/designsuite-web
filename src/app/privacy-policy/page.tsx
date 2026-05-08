import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Informativa sul trattamento dei dati personali ai sensi del GDPR.",
};

export default function PrivacyPolicy() {
  return (
    <div className="pt-16 max-w-3xl mx-auto px-6 py-20">
      <h1 className="font-serif text-4xl font-light text-[var(--charcoal)] mb-8">
        Privacy Policy
      </h1>
      <div className="text-[var(--charcoal)]/75 space-y-4 leading-relaxed text-sm">
        <p>Titolare del trattamento: DesignSuite — carlo@designsuite.it</p>
        <p>
          I dati personali raccolti tramite questo sito (nome, email, numero di
          telefono) vengono utilizzati esclusivamente per rispondere alle
          richieste degli utenti e gestire le prenotazioni. Non vengono ceduti
          a terzi né utilizzati per scopi di marketing senza consenso esplicito.
        </p>
        <p>
          L&apos;utente può esercitare i propri diritti ai sensi del Regolamento
          UE 2016/679 (GDPR) scrivendo all&apos;indirizzo email del titolare.
        </p>
        <p className="text-xs text-[var(--charcoal)]/40">
          Ultimo aggiornamento: maggio 2026
        </p>
      </div>
    </div>
  );
}
