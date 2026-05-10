import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Informativa sul trattamento dei dati personali ai sensi del Regolamento UE 2016/679 (GDPR).",
};

export default function PrivacyPolicy() {
  return (
    <div className="pt-16 max-w-3xl mx-auto px-6 py-20">
      <h1 className="font-serif text-4xl font-light text-[var(--charcoal)] mb-3">
        Privacy Policy
      </h1>
      <p className="text-xs text-[var(--charcoal)]/50 mb-10">
        Informativa resa ai sensi degli artt. 13-14 del Regolamento UE 2016/679
        (GDPR) e del D.Lgs. 196/2003 come modificato dal D.Lgs. 101/2018.
      </p>

      <div className="text-[var(--charcoal)]/80 leading-relaxed text-sm space-y-8">
        <section>
          <h2 className="font-serif text-xl font-light text-[var(--charcoal)] mb-3">
            1. Titolare del trattamento
          </h2>
          <p>
            Il titolare del trattamento dei dati personali raccolti tramite il
            sito designsuite.it è:
          </p>
          <ul className="mt-2 space-y-1">
            <li>
              <strong>Denominazione:</strong> [DA COMPILARE: ragione sociale o
              nome e cognome del titolare]
            </li>
            <li>
              <strong>Sede legale:</strong> [DA COMPILARE: via, città, CAP]
            </li>
            <li>
              <strong>P.IVA / C.F.:</strong> [DA COMPILARE]
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
          <p className="mt-3 text-xs text-[var(--charcoal)]/60">
            Non è stato designato un Responsabile della Protezione dei Dati
            (DPO), non ricorrendone gli obblighi di legge.
          </p>
        </section>

        <section>
          <h2 className="font-serif text-xl font-light text-[var(--charcoal)] mb-3">
            2. Categorie di dati trattati
          </h2>
          <p>Possiamo trattare le seguenti categorie di dati personali:</p>
          <ul className="mt-2 list-disc list-inside space-y-1">
            <li>
              <strong>Dati di contatto:</strong> nome, cognome, indirizzo email,
              numero di telefono;
            </li>
            <li>
              <strong>Dati di prenotazione:</strong> date di soggiorno, numero
              di ospiti, richieste speciali;
            </li>
            <li>
              <strong>Dati identificativi degli ospiti:</strong> dati riportati
              sui documenti d&apos;identità, raccolti ai sensi dell&apos;art. 109
              T.U.L.P.S. (R.D. 773/1931) per la comunicazione obbligatoria al
              servizio Alloggiati Web della Polizia di Stato;
            </li>
            <li>
              <strong>Dati di pagamento:</strong> trattati direttamente dal
              fornitore di servizi di pagamento (Smoobu / circuiti bancari).
              Non vengono memorizzati sul nostro sito né dai nostri sistemi.
            </li>
            <li>
              <strong>Dati di navigazione:</strong> indirizzo IP, log del
              server, tipo di browser, pagine visitate, raccolti
              automaticamente.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="font-serif text-xl font-light text-[var(--charcoal)] mb-3">
            3. Finalità e base giuridica del trattamento
          </h2>
          <table className="w-full text-xs mt-2 border border-[var(--border)]">
            <thead>
              <tr className="bg-[var(--beige)]">
                <th className="text-left p-2 border-b border-[var(--border)]">
                  Finalità
                </th>
                <th className="text-left p-2 border-b border-[var(--border)]">
                  Base giuridica
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="p-2 border-b border-[var(--border)]">
                  Gestione della prenotazione e del contratto di locazione
                </td>
                <td className="p-2 border-b border-[var(--border)]">
                  Esecuzione di un contratto (art. 6, par. 1, lett. b GDPR)
                </td>
              </tr>
              <tr>
                <td className="p-2 border-b border-[var(--border)]">
                  Adempimenti fiscali, contabili e comunicazioni alle autorità
                  (Alloggiati Web, tassa di soggiorno)
                </td>
                <td className="p-2 border-b border-[var(--border)]">
                  Obbligo di legge (art. 6, par. 1, lett. c GDPR)
                </td>
              </tr>
              <tr>
                <td className="p-2 border-b border-[var(--border)]">
                  Risposta a richieste di informazioni e comunicazioni
                  pre-arrivo
                </td>
                <td className="p-2 border-b border-[var(--border)]">
                  Esecuzione di misure precontrattuali (art. 6, par. 1, lett. b
                  GDPR)
                </td>
              </tr>
              <tr>
                <td className="p-2 border-b border-[var(--border)]">
                  Invio di comunicazioni promozionali (newsletter, offerte)
                </td>
                <td className="p-2 border-b border-[var(--border)]">
                  Consenso (art. 6, par. 1, lett. a GDPR) — revocabile in
                  qualsiasi momento
                </td>
              </tr>
              <tr>
                <td className="p-2">
                  Accertamento, esercizio o difesa di un diritto in sede
                  giudiziaria
                </td>
                <td className="p-2">
                  Legittimo interesse del titolare (art. 6, par. 1, lett. f
                  GDPR)
                </td>
              </tr>
            </tbody>
          </table>
        </section>

        <section>
          <h2 className="font-serif text-xl font-light text-[var(--charcoal)] mb-3">
            4. Periodo di conservazione
          </h2>
          <ul className="list-disc list-inside space-y-1">
            <li>
              Dati di prenotazione e relativi documenti contabili: 10 anni dalla
              conclusione del contratto (art. 2220 c.c. e obblighi fiscali);
            </li>
            <li>
              Dati identificativi degli ospiti (Alloggiati Web): 5 anni;
            </li>
            <li>
              Dati raccolti per finalità di marketing: fino a revoca del
              consenso o per un massimo di 24 mesi;
            </li>
            <li>Log di navigazione del server: massimo 12 mesi.</li>
          </ul>
        </section>

        <section>
          <h2 className="font-serif text-xl font-light text-[var(--charcoal)] mb-3">
            5. Destinatari dei dati
          </h2>
          <p>
            I dati possono essere comunicati ai seguenti soggetti, in qualità di
            responsabili del trattamento o autonomi titolari:
          </p>
          <ul className="mt-2 list-disc list-inside space-y-1">
            <li>
              <strong>Smoobu GmbH</strong> (Berlino, Germania) — Channel manager
              e sistema di prenotazione;
            </li>
            <li>
              <strong>Vercel Inc.</strong> (USA) — Hosting del sito web;
            </li>
            <li>
              <strong>Google LLC</strong> (USA) — Servizi Google Maps e Google
              Fonts per la visualizzazione del sito;
            </li>
            <li>
              <strong>Portali di prenotazione</strong> (Airbnb, Booking.com,
              VRBO, ecc.) per le prenotazioni provenienti da tali canali;
            </li>
            <li>
              <strong>Pubbliche Autorità</strong>: Questura (Alloggiati Web),
              Comune (tassa di soggiorno), Agenzia delle Entrate;
            </li>
            <li>
              <strong>Consulenti professionali</strong>: commercialisti, legali,
              tecnici, ove necessario.
            </li>
          </ul>
          <p className="mt-3">
            L&apos;elenco aggiornato dei responsabili del trattamento è
            disponibile su richiesta scrivendo al titolare.
          </p>
        </section>

        <section>
          <h2 className="font-serif text-xl font-light text-[var(--charcoal)] mb-3">
            6. Trasferimento dati extra-UE
          </h2>
          <p>
            Alcuni fornitori (es. Vercel, Google) hanno sede negli Stati Uniti
            d&apos;America. Il trasferimento dei dati al di fuori dello Spazio
            Economico Europeo avviene sulla base di adeguate garanzie, in
            particolare:
          </p>
          <ul className="mt-2 list-disc list-inside space-y-1">
            <li>
              Adesione al <em>Data Privacy Framework</em> UE-USA (Decisione di
              adeguatezza della Commissione UE del 10 luglio 2023);
            </li>
            <li>
              Clausole Contrattuali Standard (SCC) adottate dalla Commissione
              UE.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="font-serif text-xl font-light text-[var(--charcoal)] mb-3">
            7. Diritti dell&apos;interessato
          </h2>
          <p>
            In qualsiasi momento puoi esercitare i diritti previsti dagli artt.
            15-22 del GDPR:
          </p>
          <ul className="mt-2 list-disc list-inside space-y-1">
            <li>diritto di accesso ai dati;</li>
            <li>diritto di rettifica;</li>
            <li>diritto alla cancellazione (oblio);</li>
            <li>diritto di limitazione del trattamento;</li>
            <li>diritto alla portabilità dei dati;</li>
            <li>
              diritto di opposizione al trattamento, in particolare quello a
              fini di marketing diretto;
            </li>
            <li>
              diritto di revocare il consenso prestato, senza pregiudicare la
              liceità del trattamento basato sul consenso prestato prima della
              revoca.
            </li>
          </ul>
          <p className="mt-3">
            Per esercitare tali diritti è sufficiente inviare una richiesta a{" "}
            <a
              href="mailto:carlo@designsuite.it"
              className="underline underline-offset-2"
            >
              carlo@designsuite.it
            </a>
            .
          </p>
        </section>

        <section>
          <h2 className="font-serif text-xl font-light text-[var(--charcoal)] mb-3">
            8. Reclamo all&apos;Autorità di controllo
          </h2>
          <p>
            Hai il diritto di proporre reclamo al Garante per la Protezione dei
            Dati Personali (
            <a
              href="https://www.garanteprivacy.it"
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-2"
            >
              www.garanteprivacy.it
            </a>
            ) qualora ritenga che il trattamento dei tuoi dati personali
            avvenga in violazione del GDPR.
          </p>
        </section>

        <section>
          <h2 className="font-serif text-xl font-light text-[var(--charcoal)] mb-3">
            9. Cookie
          </h2>
          <p>
            Il sito utilizza esclusivamente cookie tecnici necessari al suo
            funzionamento e cookie di sessione gestiti dai servizi integrati
            (Smoobu per la prenotazione, Google Maps per le mappe). Non vengono
            utilizzati cookie di profilazione né strumenti di analytics di
            terze parti.
          </p>
          <p className="mt-3 text-xs text-[var(--charcoal)]/60">
            [DA VERIFICARE: se in futuro verranno integrati Google Analytics,
            Meta Pixel o altri strumenti di tracciamento, sarà necessario
            implementare un banner di consenso conforme alle Linee Guida del
            Garante del 10/06/2021 e aggiornare la presente informativa.]
          </p>
        </section>

        <section>
          <h2 className="font-serif text-xl font-light text-[var(--charcoal)] mb-3">
            10. Conferimento dei dati
          </h2>
          <p>
            Il conferimento dei dati per le finalità di prenotazione,
            adempimenti contrattuali e di legge è obbligatorio: senza tali
            dati non sarà possibile dare seguito alla prenotazione. Il
            conferimento per finalità di marketing è facoltativo.
          </p>
        </section>

        <section>
          <h2 className="font-serif text-xl font-light text-[var(--charcoal)] mb-3">
            11. Trattamento di dati di minori
          </h2>
          <p>
            Il sito non si rivolge a minori di 16 anni. I dati di ospiti
            minorenni sono trattati esclusivamente nell&apos;ambito della
            prenotazione effettuata dai genitori o dai legali rappresentanti,
            che ne autorizzano implicitamente il trattamento per finalità di
            soggiorno e adempimenti di legge.
          </p>
        </section>

        <section>
          <h2 className="font-serif text-xl font-light text-[var(--charcoal)] mb-3">
            12. Modifiche alla presente informativa
          </h2>
          <p>
            La presente informativa può essere aggiornata in qualsiasi momento.
            Gli aggiornamenti saranno pubblicati su questa stessa pagina con
            indicazione della data dell&apos;ultima revisione.
          </p>
        </section>

        <p className="text-xs text-[var(--charcoal)]/40 pt-6 border-t border-[var(--border)]">
          Ultimo aggiornamento: maggio 2026
        </p>
      </div>
    </div>
  );
}
