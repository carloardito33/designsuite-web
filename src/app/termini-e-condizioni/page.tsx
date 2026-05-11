import type { Metadata } from "next";
import { properties } from "@/lib/properties";

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
            1. Locatori
          </h2>
          <p>
            &quot;DesignSuite&quot; è un nome commerciale sotto il quale sono
            promosse quattro strutture appartenenti a due distinti proprietari.
            Il contratto di locazione di ciascuna struttura è stipulato con il
            rispettivo locatore di seguito indicato:
          </p>
          <div className="mt-3 space-y-3">
            <div>
              <p className="font-medium text-[var(--charcoal)]">
                Rosanna Tarricone
              </p>
              <p className="text-xs">
                Codice Fiscale TRRRNN67T70H501X — Via Francesco Burlamacchi 11,
                20135 Milano. Locatore di: <em>Bosco degli Ulivi</em> e{" "}
                <em>Suite Porta Romana</em>.
              </p>
            </div>
            <div>
              <p className="font-medium text-[var(--charcoal)]">Carlo Ardito</p>
              <p className="text-xs">
                Codice Fiscale RDTCRL66L16A662J — Via Francesco Burlamacchi 11,
                20135 Milano — PEC carloardito@pec.it. Locatore di:{" "}
                <em>Villa Crea</em> e <em>Suite Porta Romana 2</em>.
              </p>
            </div>
          </div>
          <p className="mt-3 text-xs text-[var(--charcoal)]/60">
            Recapiti comuni: email{" "}
            <a
              href="mailto:carlo@designsuite.it"
              className="underline underline-offset-2"
            >
              carlo@designsuite.it
            </a>{" "}
            — telefono +39 335 6810 310. La gestione delle prenotazioni e dei
            rapporti con gli ospiti è curata da Carlo Ardito anche per conto
            dell&apos;altra locatrice. I locatori esercitano l&apos;attività in
            forma non imprenditoriale, con applicazione del regime della
            cedolare secca al 21%.
          </p>
        </section>

        <section>
          <h2 className="font-serif text-xl font-light text-[var(--charcoal)] mb-3">
            2. Strutture e Codici Identificativi Nazionali (CIN)
          </h2>
          <p>
            Ai sensi dell&apos;art. 13-ter del D.L. 145/2023 (convertito con
            modificazioni dalla L. 191/2023), ogni unità destinata a locazione
            per finalità turistiche è identificata dal seguente CIN:
          </p>
          <table className="w-full text-xs mt-3 border border-[var(--border)]">
            <thead>
              <tr className="bg-[var(--beige)]">
                <th className="text-left p-2 border-b border-[var(--border)]">
                  Struttura
                </th>
                <th className="text-left p-2 border-b border-[var(--border)]">
                  Indirizzo
                </th>
                <th className="text-left p-2 border-b border-[var(--border)]">
                  CIN
                </th>
                <th className="text-left p-2 border-b border-[var(--border)]">
                  Locatore
                </th>
              </tr>
            </thead>
            <tbody>
              {properties.map((p) => (
                <tr key={p.slug}>
                  <td className="p-2 border-b border-[var(--border)]">
                    {p.name}
                  </td>
                  <td className="p-2 border-b border-[var(--border)]">
                    {p.address}
                  </td>
                  <td className="p-2 border-b border-[var(--border)] whitespace-nowrap">
                    {p.cin}
                  </td>
                  <td className="p-2 border-b border-[var(--border)]">
                    {p.owner}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
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
            50/2017).
          </p>
        </section>

        <section>
          <h2 className="font-serif text-xl font-light text-[var(--charcoal)] mb-3">
            4. Procedura di prenotazione e pagamento
          </h2>
          <ol className="list-decimal list-inside space-y-2">
            <li>
              L&apos;ospite invia richiesta di prenotazione tramite il sito
              (modulo Smoobu), WhatsApp, email o tramite portali partner
              (Airbnb, Booking.com, ecc.).
            </li>
            <li>
              Il locatore conferma la disponibilità e comunica il prezzo
              complessivo del soggiorno, comprensivo di eventuali servizi
              accessori.
            </li>
            <li>
              La prenotazione si perfeziona con il versamento di un acconto pari
              al <strong>30% del prezzo totale</strong> entro le tempistiche
              indicate al momento della conferma.
            </li>
            <li>
              Il <strong>saldo</strong> deve essere corrisposto entro{" "}
              <strong>30 giorni prima del check-in</strong>. Per le prenotazioni
              effettuate a meno di 30 giorni dall&apos;arrivo è richiesto il
              pagamento dell&apos;intero importo in unica soluzione.
            </li>
            <li>
              Mezzi di pagamento accettati: bonifico bancario, carta di
              credito/debito, contanti (entro i limiti di legge), ovvero secondo
              le modalità del portale di prenotazione di provenienza.
            </li>
          </ol>
        </section>

        <section>
          <h2 className="font-serif text-xl font-light text-[var(--charcoal)] mb-3">
            5. Cancellazione e rimborsi
          </h2>
          <p>
            Politica di cancellazione applicata alle prenotazioni dirette:
          </p>
          <ul className="mt-2 list-disc list-inside space-y-1">
            <li>
              Cancellazione comunicata <strong>almeno 30 giorni prima</strong>{" "}
              della data di arrivo: rimborso del <strong>100%</strong> delle
              somme versate;
            </li>
            <li>
              Cancellazione comunicata a <strong>meno di 30 giorni</strong>{" "}
              dall&apos;arrivo, ovvero mancata presentazione (no-show):{" "}
              <strong>nessun rimborso</strong>.
            </li>
          </ul>
          <p className="mt-3">
            Per le prenotazioni effettuate tramite portali (Airbnb,
            Booking.com, ecc.) si applicano le condizioni di cancellazione del
            singolo portale.
          </p>
          <p className="mt-3 text-xs text-[var(--charcoal)]/60">
            Ai sensi dell&apos;art. 59, comma 1, lett. n) del D.Lgs. 206/2005
            (Codice del Consumo), il contratto di locazione turistica è escluso
            dal diritto di recesso di 14 giorni previsto per i contratti
            conclusi a distanza.
          </p>
        </section>

        <section>
          <h2 className="font-serif text-xl font-light text-[var(--charcoal)] mb-3">
            6. Check-in e check-out
          </h2>
          <ul className="space-y-1">
            <li>
              <strong>Check-in:</strong> dalle ore 16:00;
            </li>
            <li>
              <strong>Check-out:</strong> entro le ore 10:00.
            </li>
          </ul>
          <p className="mt-3">
            È disponibile il self check-in (consegna chiavi tramite cassetta di
            sicurezza o accoglienza in struttura, secondo quanto comunicato
            prima dell&apos;arrivo). Eventuali check-in tardivi o check-out
            posticipati sono soggetti a disponibilità e possono comportare un
            sovrapprezzo. Ai sensi dell&apos;art. 109 T.U.L.P.S. (R.D.
            773/1931), al momento del check-in è obbligatoria
            l&apos;esibizione di un documento d&apos;identità valido per
            ciascun ospite (compresi i minori), i cui dati saranno comunicati
            al servizio Alloggiati Web della Questura.
          </p>
        </section>

        <section>
          <h2 className="font-serif text-xl font-light text-[var(--charcoal)] mb-3">
            7. Cauzione
          </h2>
          <p>
            È richiesta una cauzione a garanzia di eventuali danni, di importo
            pari a:
          </p>
          <ul className="mt-2 list-disc list-inside space-y-1">
            <li>
              <strong>€ 1.000</strong> per le ville in Salento (Villa Crea,
              Bosco degli Ulivi);
            </li>
            <li>
              <strong>€ 100</strong> per gli appartamenti a Milano (Suite Porta
              Romana, Suite Porta Romana 2).
            </li>
          </ul>
          <p className="mt-3">
            La cauzione è trattenuta mediante pre-autorizzazione su carta di
            credito o versata secondo altra modalità concordata al momento del
            check-in, e viene restituita entro 7 giorni dal check-out previa
            verifica dello stato della struttura.
          </p>
        </section>

        <section>
          <h2 className="font-serif text-xl font-light text-[var(--charcoal)] mb-3">
            8. Tassa di soggiorno
          </h2>
          <p>
            Ove prevista dal Comune in cui si trova la struttura, la tassa di
            soggiorno è dovuta in aggiunta al prezzo del soggiorno e va
            corrisposta direttamente in struttura al check-in:
          </p>
          <ul className="mt-2 list-disc list-inside space-y-1">
            <li>
              <strong>
                Suite Porta Romana e Suite Porta Romana 2 (Milano)
              </strong>
              : € 9,50 per persona per notte, secondo la tariffa e le
              modalità previste dal regolamento del Comune di Milano;
            </li>
            <li>
              <strong>Bosco degli Ulivi (Morciano di Leuca)</strong>: € 1,30 per
              persona per notte, secondo la delibera comunale vigente;
            </li>
            <li>
              <strong>Villa Crea (Castrignano del Capo)</strong>: € 1,00 per
              persona per notte, secondo la delibera comunale vigente.
            </li>
          </ul>
          <p className="mt-3 text-xs text-[var(--charcoal)]/60">
            Sono di norma esenti i minori di 18 anni e i soggetti previsti dai
            singoli regolamenti comunali.
          </p>
        </section>

        <section>
          <h2 className="font-serif text-xl font-light text-[var(--charcoal)] mb-3">
            9. Regole della casa
          </h2>
          <ul className="list-disc list-inside space-y-1">
            <li>È severamente vietato fumare all&apos;interno delle strutture;</li>
            <li>
              <strong>Non sono ammessi animali domestici</strong> in nessuna
              delle strutture;
            </li>
            <li>
              Il numero massimo di ospiti consentito è quello indicato nella
              scheda di ogni proprietà e non può essere superato in nessun
              caso;
            </li>
            <li>
              <strong>
                Non sono ammessi feste, eventi, pranzi o cene con persone non
                registrate al soggiorno
              </strong>
              ;
            </li>
            <li>
              È richiesto il rispetto delle ore di silenzio notturno (dalle
              22:00 alle 08:00) e del regolamento di condominio per le strutture
              di Milano;
            </li>
            <li>
              È richiesta cura della struttura, degli arredi e dei beni in essa
              contenuti, nonché un comportamento rispettoso dei vicini e
              dell&apos;ambiente circostante.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="font-serif text-xl font-light text-[var(--charcoal)] mb-3">
            10. Servizi
          </h2>
          <p>
            Le pulizie finali sono incluse nel prezzo del soggiorno. Il cambio
            biancheria intermedio è incluso secondo le modalità indicate per
            ciascuna struttura. Eventuali servizi extra (cuoco privato,
            baby-sitter, transfer, escursioni) sono disponibili su richiesta e a
            pagamento, secondo le tariffe comunicate di volta in volta. A
            Milano il parcheggio è disponibile nelle aree pubbliche a
            pagamento della zona.
          </p>
        </section>

        <section>
          <h2 className="font-serif text-xl font-light text-[var(--charcoal)] mb-3">
            11. Responsabilità per danni
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
            12. Forza maggiore
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
            13. Legge applicabile e foro competente
          </h2>
          <p>
            Il presente contratto è regolato dalla legge italiana. Per
            qualunque controversia è competente in via esclusiva il Foro di
            Milano, salvo che la controversia rientri nella competenza
            inderogabile del foro del consumatore ai sensi dell&apos;art. 33
            del Codice del Consumo.
          </p>
        </section>

        <section>
          <h2 className="font-serif text-xl font-light text-[var(--charcoal)] mb-3">
            14. Risoluzione alternativa delle controversie
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
            15. Contatti
          </h2>
          <p>
            Per qualsiasi richiesta relativa alle presenti condizioni o alla
            prenotazione: email{" "}
            <a
              href="mailto:carlo@designsuite.it"
              className="underline underline-offset-2"
            >
              carlo@designsuite.it
            </a>{" "}
            — telefono +39 335 6810 310 — oppure tramite il modulo presente sul
            sito.
          </p>
        </section>

        <p className="text-xs text-[var(--charcoal)]/40 pt-6 border-t border-[var(--border)]">
          Ultimo aggiornamento: maggio 2026
        </p>
      </div>
    </div>
  );
}
