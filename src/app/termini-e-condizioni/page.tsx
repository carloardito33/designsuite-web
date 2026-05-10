import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Termini e Condizioni",
  description:
    "Termini e condizioni di utilizzo del sito e di locazione turistica breve delle strutture DesignSuite.",
};

export default function TerminiCondizioni() {
  return (
    <div className="pt-16 max-w-3xl mx-auto px-6 py-20">
      <h1 className="font-serif text-4xl font-light text-[var(--charcoal)] mb-3">
        Termini e Condizioni
      </h1>
      <p className="text-xs text-[var(--charcoal)]/50 mb-10">
        Condizioni generali di contratto di locazione ad uso turistico ai sensi
        dell&apos;art. 1, comma 2, lettera c) della Legge 9 dicembre 1998 n. 431
        e dell&apos;art. 4 del D.L. 24 aprile 2017 n. 50, convertito in Legge
        96/2017.
      </p>

      <div className="text-[var(--charcoal)]/80 leading-relaxed text-sm space-y-8">
        <section>
          <h2 className="font-serif text-xl font-light text-[var(--charcoal)] mb-3">
            1. Locatore
          </h2>
          <ul className="space-y-1">
            <li>
              <strong>Denominazione:</strong> [DA COMPILARE: ragione sociale o
              nome e cognome del locatore]
            </li>
            <li>
              <strong>Sede:</strong> [DA COMPILARE]
            </li>
            <li>
              <strong>P.IVA / C.F.:</strong> [DA COMPILARE]
            </li>
            <li>
              <strong>Iscrizione REA:</strong> [DA COMPILARE se applicabile]
            </li>
            <li>
              <strong>Email:</strong>{" "}
              <a
                href="mailto:carlo@designsuite.it"
                className="underline underline-offset-2"
              >
                carlo@designsuite.it
              </a>
            </li>
            <li>
              <strong>Telefono:</strong> +39 335 6810 310
            </li>
            <li>
              <strong>PEC:</strong> [DA COMPILARE se disponibile]
            </li>
          </ul>
        </section>

        <section>
          <h2 className="font-serif text-xl font-light text-[var(--charcoal)] mb-3">
            2. Codice Identificativo Nazionale (CIN)
          </h2>
          <p>
            Ai sensi dell&apos;art. 13-ter del D.L. 145/2023 (convertito con
            modificazioni dalla L. 191/2023), ogni unità destinata a locazione
            per finalità turistiche è identificata dal seguente CIN:
          </p>
          <ul className="mt-2 list-disc list-inside space-y-1">
            <li>
              <strong>Villa Crea</strong> — CIN: [DA COMPILARE: CIN Villa Crea]
            </li>
            <li>
              <strong>Bosco degli Ulivi</strong> — CIN: [DA COMPILARE: CIN
              Bosco]
            </li>
            <li>
              <strong>Suite Porta Romana</strong> — CIN: [DA COMPILARE: CIN
              Suite 1]
            </li>
            <li>
              <strong>Suite Porta Romana 2</strong> — CIN: [DA COMPILARE: CIN
              Suite 2]
            </li>
          </ul>
        </section>

        <section>
          <h2 className="font-serif text-xl font-light text-[var(--charcoal)] mb-3">
            3. Oggetto del contratto
          </h2>
          <p>
            Le presenti condizioni disciplinano il contratto di locazione ad uso
            turistico delle quattro strutture sopra identificate, della durata
            massima di 30 giorni consecutivi. Trattandosi di locazione
            turistica breve, il contratto non è soggetto all&apos;obbligo di
            registrazione presso l&apos;Agenzia delle Entrate (art. 4 D.L.
            50/2017). Il locatore applica il regime fiscale della cedolare
            secca, ove applicabile.
          </p>
        </section>

        <section>
          <h2 className="font-serif text-xl font-light text-[var(--charcoal)] mb-3">
            4. Procedura di prenotazione
          </h2>
          <ol className="list-decimal list-inside space-y-2">
            <li>
              L&apos;ospite invia richiesta di prenotazione tramite il sito
              (modulo Smoobu), WhatsApp, email o tramite portali partner
              (Airbnb, Booking.com, ecc.).
            </li>
            <li>
              Il locatore conferma la disponibilità e comunica il prezzo
              complessivo, comprensivo di eventuali servizi accessori.
            </li>
            <li>
              La prenotazione è perfezionata con il versamento di un acconto
              pari al [DA COMPILARE: % acconto, es. 30%] del prezzo totale,
              entro [DA COMPILARE: es. 48 ore] dalla conferma.
            </li>
            <li>
              Il saldo deve essere corrisposto entro [DA COMPILARE: es. 30
              giorni] prima del check-in. In caso di prenotazione effettuata a
              meno di [DA COMPILARE: es. 30] giorni dall&apos;arrivo è richiesto
              il pagamento dell&apos;intero importo in unica soluzione.
            </li>
            <li>
              Mezzi di pagamento accettati: bonifico bancario, carta di
              credito/debito tramite Smoobu, ovvero secondo le modalità del
              portale di prenotazione di provenienza.
            </li>
          </ol>
        </section>

        <section>
          <h2 className="font-serif text-xl font-light text-[var(--charcoal)] mb-3">
            5. Cancellazione e rimborsi
          </h2>
          <p>
            Politica di cancellazione applicata per le prenotazioni dirette:
          </p>
          <ul className="mt-2 list-disc list-inside space-y-1">
            <li>
              Cancellazione almeno [DA COMPILARE: es. 30] giorni prima
              dell&apos;arrivo: rimborso del [DA COMPILARE: es. 100%] della
              somma versata;
            </li>
            <li>
              Cancellazione tra [DA COMPILARE: es. 30 e 14] giorni prima:
              rimborso del [DA COMPILARE: es. 50%];
            </li>
            <li>
              Cancellazione a meno di [DA COMPILARE: es. 14] giorni
              dall&apos;arrivo o no-show: nessun rimborso.
            </li>
          </ul>
          <p className="mt-3">
            Per le prenotazioni effettuate tramite portali (Airbnb,
            Booking.com, ecc.) si applicano le condizioni di cancellazione del
            singolo portale.
          </p>
          <p className="mt-3 text-xs text-[var(--charcoal)]/60">
            Si segnala che, ai sensi dell&apos;art. 59, comma 1, lett. n) del
            D.Lgs. 206/2005 (Codice del Consumo), il contratto di locazione
            turistica è escluso dal diritto di recesso di 14 giorni previsto
            per i contratti conclusi a distanza.
          </p>
        </section>

        <section>
          <h2 className="font-serif text-xl font-light text-[var(--charcoal)] mb-3">
            6. Check-in e check-out
          </h2>
          <ul className="space-y-1">
            <li>
              <strong>Check-in:</strong> dalle ore [DA COMPILARE: es. 16:00] alle
              ore [DA COMPILARE: es. 20:00];
            </li>
            <li>
              <strong>Check-out:</strong> entro le ore [DA COMPILARE: es. 10:00].
            </li>
          </ul>
          <p className="mt-3">
            Eventuali check-in tardivi o check-out posticipati sono soggetti a
            disponibilità e potranno comportare un sovrapprezzo. Ai sensi
            dell&apos;art. 109 T.U.L.P.S. (R.D. 773/1931), al momento del
            check-in è obbligatoria l&apos;esibizione di un documento
            d&apos;identità valido per ciascun ospite (compresi i minori), i
            cui dati saranno comunicati al servizio Alloggiati Web della
            Questura.
          </p>
        </section>

        <section>
          <h2 className="font-serif text-xl font-light text-[var(--charcoal)] mb-3">
            7. Cauzione
          </h2>
          <p>
            È richiesta una cauzione di [DA COMPILARE: es. €500 per le ville
            in Salento e €300 per gli appartamenti a Milano], trattenuta
            mediante pre-autorizzazione su carta di credito al momento del
            check-in. La cauzione viene restituita entro 7 giorni dal
            check-out, previa verifica dello stato della struttura e
            dell&apos;assenza di danni.
          </p>
        </section>

        <section>
          <h2 className="font-serif text-xl font-light text-[var(--charcoal)] mb-3">
            8. Tassa di soggiorno
          </h2>
          <p>
            La tassa di soggiorno, ove applicabile, è dovuta in aggiunta al
            prezzo del soggiorno e va corrisposta direttamente in struttura al
            check-in (in contanti o secondo le modalità indicate). Importi
            aggiornati:
          </p>
          <ul className="mt-2 list-disc list-inside space-y-1">
            <li>
              <strong>Milano</strong> (Suite Porta Romana e Suite Porta Romana
              2): [DA VERIFICARE: importo tassa di soggiorno Milano 2026 in
              base alla categoria della struttura — indicativamente €4,50 a
              notte per persona, max 14 notti consecutive];
            </li>
            <li>
              <strong>Castrignano del Capo</strong> (Villa Crea): [DA
              VERIFICARE: se applicabile dal Comune];
            </li>
            <li>
              <strong>Morciano di Leuca</strong> (Bosco degli Ulivi): [DA
              VERIFICARE: se applicabile dal Comune].
            </li>
          </ul>
        </section>

        <section>
          <h2 className="font-serif text-xl font-light text-[var(--charcoal)] mb-3">
            9. Regole della casa
          </h2>
          <ul className="list-disc list-inside space-y-1">
            <li>È severamente vietato fumare all&apos;interno delle strutture;</li>
            <li>
              Il numero massimo di ospiti consentito è quello indicato nella
              scheda di ogni proprietà e non può essere superato in nessun
              caso;
            </li>
            <li>
              Non sono ammessi feste, eventi o riunioni con persone non
              registrate al soggiorno;
            </li>
            <li>
              È richiesto il rispetto delle ore di silenzio notturno (dalle
              22:00 alle 08:00);
            </li>
            <li>
              <strong>Animali domestici:</strong> [DA COMPILARE: ammessi /
              non ammessi / ammessi su richiesta con eventuale supplemento];
            </li>
            <li>
              È richiesta cura della struttura e un comportamento rispettoso
              degli arredi, dei vicini e dell&apos;ambiente circostante.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="font-serif text-xl font-light text-[var(--charcoal)] mb-3">
            10. Responsabilità per danni
          </h2>
          <p>
            L&apos;ospite è responsabile per ogni danno cagionato alla struttura
            e ai beni in essa contenuti durante il periodo di soggiorno, da
            parte propria, di accompagnatori o ospiti. Eventuali danni dovranno
            essere comunicati tempestivamente al locatore e saranno
            quantificati entro 7 giorni dal check-out. Il locatore potrà
            trattenere dalla cauzione gli importi corrispondenti, fatto salvo
            il risarcimento di danni eccedenti.
          </p>
        </section>

        <section>
          <h2 className="font-serif text-xl font-light text-[var(--charcoal)] mb-3">
            11. Forza maggiore
          </h2>
          <p>
            In caso di impossibilità sopravvenuta non imputabile alle parti
            (calamità naturali, provvedimenti delle autorità, eventi pandemici
            e simili) che impedisca lo svolgimento del soggiorno, le parti si
            impegnano a concordare in buona fede il rinvio della prenotazione
            ad altre date, ovvero il rimborso delle somme versate al netto di
            eventuali costi non recuperabili.
          </p>
        </section>

        <section>
          <h2 className="font-serif text-xl font-light text-[var(--charcoal)] mb-3">
            12. Legge applicabile e foro competente
          </h2>
          <p>
            Il presente contratto è regolato dalla legge italiana. Per qualunque
            controversia è competente in via esclusiva il Foro di [DA
            COMPILARE: es. Milano / Lecce], salvo che la controversia rientri
            nella competenza inderogabile del foro del consumatore ai sensi
            dell&apos;art. 33 del Codice del Consumo.
          </p>
        </section>

        <section>
          <h2 className="font-serif text-xl font-light text-[var(--charcoal)] mb-3">
            13. Risoluzione alternativa delle controversie
          </h2>
          <p>
            Ai sensi dell&apos;art. 14 del Regolamento UE 524/2013, si
            informano i consumatori della possibilità di accedere alla
            piattaforma europea ODR (Online Dispute Resolution) per la
            risoluzione extragiudiziale delle controversie all&apos;indirizzo:{" "}
            <a
              href="https://ec.europa.eu/consumers/odr"
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-2"
            >
              ec.europa.eu/consumers/odr
            </a>
            .
          </p>
        </section>

        <section>
          <h2 className="font-serif text-xl font-light text-[var(--charcoal)] mb-3">
            14. Contatti
          </h2>
          <p>
            Per qualsiasi richiesta relativa alle presenti condizioni o alla
            prenotazione, è possibile contattare il locatore ai recapiti
            indicati al punto 1, oppure tramite il modulo presente sul sito.
          </p>
        </section>

        <p className="text-xs text-[var(--charcoal)]/40 pt-6 border-t border-[var(--border)]">
          Ultimo aggiornamento: maggio 2026
        </p>
      </div>
    </div>
  );
}
