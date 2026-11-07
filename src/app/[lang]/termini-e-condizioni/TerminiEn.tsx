import { properties } from "@/lib/properties";

export function TerminiEn() {
  return (
    <div className="pt-16 max-w-3xl mx-auto px-6 py-20">
      <h1 className="font-serif text-4xl font-light text-[var(--charcoal)] mb-3">
        Terms &amp; Conditions
      </h1>
      <p className="text-xs text-[var(--charcoal)]/50 mb-10">
        General terms of the tourist-use rental contract pursuant to Article 1,
        paragraph 2, letter c) of Italian Law no. 431 of 9 December 1998 and to
        Article 4 of Decree-Law no. 50 of 24 April 2017, converted into Law
        96/2017.
      </p>

      <div className="text-[var(--charcoal)]/80 leading-relaxed text-sm space-y-8">
        <section>
          <h2 className="font-serif text-xl font-light text-[var(--charcoal)] mb-3">
            1. Landlords
          </h2>
          <p>
            &quot;DesignSuite&quot; is a trading name under which four
            properties, belonging to two distinct owners, are promoted. The
            rental contract for each property is entered into with the relevant
            landlord indicated below:
          </p>
          <div className="mt-3 space-y-3">
            <div>
              <p className="font-medium text-[var(--charcoal)]">
                Rosanna Tarricone
              </p>
              <p className="text-xs">
                Italian tax code TRRRNN67T70H501X — Via Francesco Burlamacchi 11,
                20135 Milan. Landlord of: <em>Bosco degli Ulivi</em> and{" "}
                <em>Suite Porta Romana</em>.
              </p>
            </div>
            <div>
              <p className="font-medium text-[var(--charcoal)]">Carlo Ardito</p>
              <p className="text-xs">
                Italian tax code RDTCRL66L16A662J — Via Francesco Burlamacchi 11,
                20135 Milan — certified email (PEC) carloardito@pec.it. Landlord
                of: <em>Villa Crea</em> and <em>Suite Porta Romana 2</em>.
              </p>
            </div>
          </div>
          <p className="mt-3 text-xs text-[var(--charcoal)]/60">
            Common contact details: email{" "}
            <a
              href="mailto:carlo@designsuite.it"
              className="underline underline-offset-2"
            >
              carlo@designsuite.it
            </a>{" "}
            — phone +39 335 6810 310. The management of bookings and of relations
            with guests is handled by Carlo Ardito, also on behalf of the other
            landlord. The landlords carry out the activity on a non-business
            basis, applying the Italian flat-rate tax regime (&quot;cedolare
            secca&quot;) at 21%.
          </p>
        </section>

        <section>
          <h2 className="font-serif text-xl font-light text-[var(--charcoal)] mb-3">
            2. Properties and National Identification Codes (CIN)
          </h2>
          <p>
            Pursuant to Article 13-ter of Decree-Law 145/2023 (converted with
            amendments by Law 191/2023), each unit intended for tourist rental is
            identified by the following CIN:
          </p>
          <table className="w-full text-xs mt-3 border border-[var(--border)]">
            <thead>
              <tr className="bg-[var(--beige)]">
                <th className="text-left p-2 border-b border-[var(--border)]">
                  Property
                </th>
                <th className="text-left p-2 border-b border-[var(--border)]">
                  Address
                </th>
                <th className="text-left p-2 border-b border-[var(--border)]">
                  CIN
                </th>
                <th className="text-left p-2 border-b border-[var(--border)]">
                  Landlord
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
            3. Subject of the contract
          </h2>
          <p>
            These terms govern the tourist-use rental contract of the four
            properties identified above, with a maximum duration of 30
            consecutive days. As a short-term tourist rental, the contract is not
            subject to the registration requirement with the Italian Revenue
            Agency (Art. 4 of Decree-Law 50/2017).
          </p>
        </section>

        <section>
          <h2 className="font-serif text-xl font-light text-[var(--charcoal)] mb-3">
            4. Booking and payment procedure
          </h2>
          <ol className="list-decimal list-inside space-y-2">
            <li>
              The guest sends a booking request via the website (Smoobu form),
              WhatsApp, email, or via partner portals (Airbnb, Booking.com,
              etc.).
            </li>
            <li>
              The landlord confirms availability and communicates the total price
              of the stay, including any additional services.
            </li>
            <li>
              The booking is finalised with the payment of a deposit equal to{" "}
              <strong>30% of the total price</strong> within the timeframe
              indicated at the time of confirmation.
            </li>
            <li>
              The <strong>balance</strong> must be paid by{" "}
              <strong>30 days before check-in</strong>. For bookings made less
              than 30 days before arrival, payment of the full amount in a single
              instalment is required.
            </li>
            <li>
              Accepted means of payment: bank transfer, credit/debit card, cash
              (within legal limits), or according to the terms of the booking
              portal of origin.
            </li>
          </ol>
        </section>

        <section>
          <h2 className="font-serif text-xl font-light text-[var(--charcoal)] mb-3">
            5. Cancellation and refunds
          </h2>
          <p>Cancellation policy applied to direct bookings:</p>
          <ul className="mt-2 list-disc list-inside space-y-1">
            <li>
              Cancellation notified <strong>at least 30 days before</strong> the
              arrival date: refund of <strong>100%</strong> of the amounts paid;
            </li>
            <li>
              Cancellation notified <strong>less than 30 days</strong> before
              arrival, or failure to show up (no-show):{" "}
              <strong>no refund</strong>.
            </li>
          </ul>
          <p className="mt-3">
            For bookings made through portals (Airbnb, Booking.com, etc.), the
            cancellation terms of the individual portal apply.
          </p>
          <p className="mt-3 text-xs text-[var(--charcoal)]/60">
            Pursuant to Article 59, paragraph 1, letter n) of Italian
            Legislative Decree 206/2005 (Consumer Code), the tourist rental
            contract is excluded from the 14-day right of withdrawal provided for
            distance contracts.
          </p>
        </section>

        <section>
          <h2 className="font-serif text-xl font-light text-[var(--charcoal)] mb-3">
            6. Check-in and check-out
          </h2>
          <ul className="space-y-1">
            <li>
              <strong>Check-in:</strong> from 4:00 p.m.;
            </li>
            <li>
              <strong>Check-out:</strong> by 10:00 a.m.
            </li>
          </ul>
          <p className="mt-3">
            Self check-in is available (key handover via a secure key box or
            welcome at the property, as communicated before arrival). Any late
            check-in or late check-out is subject to availability and may incur
            an additional charge. Pursuant to Article 109 of the Italian
            Consolidated Public Security Act (Royal Decree 773/1931), at check-in
            it is mandatory to present a valid identity document for each guest
            (including minors), whose data will be notified to the &quot;Alloggiati
            Web&quot; service of the Police Headquarters.
          </p>
        </section>

        <section>
          <h2 className="font-serif text-xl font-light text-[var(--charcoal)] mb-3">
            7. Security deposit
          </h2>
          <p>
            A security deposit is required to cover any damage, in the amount of:
          </p>
          <ul className="mt-2 list-disc list-inside space-y-1">
            <li>
              <strong>€ 1,000</strong> for the villas in Salento (Villa Crea,
              Bosco degli Ulivi);
            </li>
            <li>
              <strong>€ 100</strong> for the apartments in Milan (Suite Porta
              Romana, Suite Porta Romana 2).
            </li>
          </ul>
          <p className="mt-3">
            The deposit is held by means of a pre-authorisation on a credit card
            or paid by another method agreed at check-in, and is returned within
            7 days of check-out after verification of the condition of the
            property.
          </p>
        </section>

        <section>
          <h2 className="font-serif text-xl font-light text-[var(--charcoal)] mb-3">
            8. Tourist tax
          </h2>
          <p>
            Where required by the Municipality in which the property is located,
            the tourist tax is due in addition to the price of the stay and must
            be paid directly at the property at check-in:
          </p>
          <ul className="mt-2 list-disc list-inside space-y-1">
            <li>
              <strong>
                Suite Porta Romana and Suite Porta Romana 2 (Milan)
              </strong>
              : € 9.50 per person per night, according to the rate and terms set
              by the regulations of the Municipality of Milan;
            </li>
            <li>
              <strong>Bosco degli Ulivi (Morciano di Leuca)</strong>: € 1.30 per
              person per night, according to the municipal resolution in force;
            </li>
            <li>
              <strong>Villa Crea (Castrignano del Capo)</strong>: € 1.00 per
              person per night, according to the municipal resolution in force.
            </li>
          </ul>
          <p className="mt-3 text-xs text-[var(--charcoal)]/60">
            Children under 18 and the persons provided for by the individual
            municipal regulations are usually exempt.
          </p>
        </section>

        <section>
          <h2 className="font-serif text-xl font-light text-[var(--charcoal)] mb-3">
            9. House rules
          </h2>
          <ul className="list-disc list-inside space-y-1">
            <li>Smoking inside the properties is strictly prohibited;</li>
            <li>
              <strong>Pets are not allowed</strong> in any of the properties;
            </li>
            <li>
              The maximum number of guests allowed is the one indicated on each
              property&apos;s page and may not be exceeded under any
              circumstances;
            </li>
            <li>
              <strong>
                Parties, events, lunches or dinners with people not registered
                for the stay are not allowed
              </strong>
              ;
            </li>
            <li>
              Quiet night-time hours (from 10:00 p.m. to 8:00 a.m.) and the
              condominium regulations for the Milan properties must be respected;
            </li>
            <li>
              Guests are required to take care of the property, the furnishings
              and the items it contains, and to behave respectfully towards
              neighbours and the surrounding environment.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="font-serif text-xl font-light text-[var(--charcoal)] mb-3">
            10. Services
          </h2>
          <p>
            The final cleaning is included in the price of the stay. The
            mid-stay linen change is included according to the terms indicated
            for each property. Any extra services (private chef, babysitter,
            transfer, excursions) are available on request and at an additional
            cost, according to the rates communicated from time to time. In Milan
            parking is available in the paid public areas of the neighbourhood.
          </p>
        </section>

        <section>
          <h2 className="font-serif text-xl font-light text-[var(--charcoal)] mb-3">
            11. Liability for damage
          </h2>
          <p>
            The guest is responsible for any damage caused to the property and to
            the items it contains during the stay, whether by the guest, their
            companions or their guests. Any damage must be promptly notified to
            the landlord and will be quantified within 7 days of check-out. The
            landlord may withhold the corresponding amounts from the security
            deposit, without prejudice to compensation for any excess damage.
          </p>
        </section>

        <section>
          <h2 className="font-serif text-xl font-light text-[var(--charcoal)] mb-3">
            12. Force majeure
          </h2>
          <p>
            In the event of supervening impossibility not attributable to the
            parties (natural disasters, measures of the authorities, pandemic
            events and the like) that prevents the stay from taking place, the
            parties undertake to agree in good faith on postponing the booking to
            other dates, or on refunding the amounts paid net of any
            non-recoverable costs.
          </p>
        </section>

        <section>
          <h2 className="font-serif text-xl font-light text-[var(--charcoal)] mb-3">
            13. Applicable law and jurisdiction
          </h2>
          <p>
            This contract is governed by Italian law. For any dispute, the Court
            of Milan has exclusive jurisdiction, unless the dispute falls within
            the mandatory jurisdiction of the consumer&apos;s forum pursuant to
            Article 33 of the Italian Consumer Code.
          </p>
        </section>

        <section>
          <h2 className="font-serif text-xl font-light text-[var(--charcoal)] mb-3">
            14. Alternative dispute resolution
          </h2>
          <p>
            Pursuant to Article 14 of EU Regulation 524/2013, consumers are
            informed of the possibility of accessing the European ODR (Online
            Dispute Resolution) platform for the out-of-court resolution of
            disputes at:{" "}
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
            15. Contact
          </h2>
          <p>
            For any request relating to these terms or to a booking: email{" "}
            <a
              href="mailto:carlo@designsuite.it"
              className="underline underline-offset-2"
            >
              carlo@designsuite.it
            </a>{" "}
            — phone +39 335 6810 310 — or via the form on the website.
          </p>
        </section>

        <p className="text-xs text-[var(--charcoal)]/40 pt-6 border-t border-[var(--border)]">
          Last updated: May 2026
        </p>
      </div>
    </div>
  );
}
