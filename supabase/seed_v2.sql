-- Gestionale Designsuite — modelli di messaggio e guida ospiti (importati da Smoobu, 7 nov 2026)
-- Da eseguire dopo schema_v2.sql. Rieseguibile: aggiorna i testi esistenti per chiave.

-- ---------------------------------------------------------------------------
-- Modelli di messaggio
-- Variabili: {{guest_name}} {{property}} {{check_in}} {{check_out}} {{nights}} {{guests}}
--            {{checkin_link}} {{guide_link}} {{access_code}} {{lockbox_code}} {{arrival_time}}
--            {{address}} {{wifi_ssid}} {{wifi_password}} {{review_link}} {{host_phone}} {{host_email}}
-- ---------------------------------------------------------------------------
insert into public.message_templates (key, name, trigger, days_offset, send_hour, channels, only_if_contact, sort_order, subject_it, subject_en, body_it, body_en) values
(
  'booking_confirmation', 'Conferma prenotazione', 'on_booking', 0, 10, '{direct,manual}', false, 10,
  'Conferma della tua prenotazione a {{property}}',
  'Booking confirmation for {{property}}',
  E'Ciao {{guest_name}},\n\ngrazie per aver prenotato con noi! Non vediamo l''ora di accoglierti a {{property}}.\nLa prenotazione per {{guests}} ospiti è confermata: arrivo {{check_in}}, partenza {{check_out}}.\n\nPer qualsiasi dettaglio puoi scrivermi a {{host_email}} o su WhatsApp al {{host_phone}}.\n\nA presto!\nCarlo',
  E'Hi {{guest_name}},\n\nthank you so much for booking with us! We look forward to welcoming you at {{property}}.\nYour booking for {{guests}} guests is confirmed: check-in on {{check_in}}, check-out on {{check_out}}.\n\nYou can contact me at {{host_email}} or via WhatsApp at {{host_phone}} for any details you may need.\n\nSee you soon!\nCarlo'
),
(
  'checkin_request', 'Richiesta check in online', 'before_arrival', 7, 10, '{direct,manual,airbnb,booking,vrbo,other}', false, 20,
  'Check in online per il tuo soggiorno a {{property}}',
  'Online check-in for your stay at {{property}}',
  E'Ciao {{guest_name}},\n\nsto organizzando il tuo arrivo a {{property}} ({{check_in}} → {{check_out}}). In Italia la registrazione degli ospiti è obbligatoria: puoi farla comodamente online da qui, ci vogliono due minuti:\n{{checkin_link}}\n\nSai già a che ora arriverai?\n\nResto a disposizione per qualsiasi domanda, anche su WhatsApp al {{host_phone}}.\n\nA presto!\nCarlo',
  E'Hi {{guest_name}},\n\nI am organizing your arrival at {{property}} ({{check_in}} → {{check_out}}). Guest registration is mandatory in Italy: you can complete it online here, it takes two minutes:\n{{checkin_link}}\n\nDo you already know what time you will arrive?\n\nI remain at your disposal for any questions, also on WhatsApp at {{host_phone}}.\n\nSee you soon!\nCarlo'
),
(
  'arrival_info', 'Informazioni di arrivo e guida', 'before_arrival', 2, 10, '{direct,manual,airbnb,booking,vrbo,other}', false, 30,
  'Tutto pronto per il tuo arrivo a {{property}}',
  'All set for your arrival at {{property}}',
  E'Ciao {{guest_name}},\n\nmancano pochi giorni al tuo soggiorno a {{property}} ({{check_in}} → {{check_out}}). Qui trovi la guida con tutto quello che serve:\n{{guide_link}}\n\n- come raggiungere e accedere alla casa\n- il codice di accesso: {{access_code}}\n- wifi: rete {{wifi_ssid}}, password {{wifi_password}}\n- regole della casa e consigli su bar e ristoranti\n\nCheck in dalle {{arrival_time}}. Se non hai ancora fatto il check in online, puoi farlo qui: {{checkin_link}}\n\nBuona giornata e a presto!\nCarlo',
  E'Hi {{guest_name}},\n\nyour stay at {{property}} ({{check_in}} → {{check_out}}) is just a few days away. Here is your guide with everything you need:\n{{guide_link}}\n\n- how to reach and access the apartment\n- your access code: {{access_code}}\n- wifi: network {{wifi_ssid}}, password {{wifi_password}}\n- house rules and bar and restaurant recommendations\n\nCheck-in from {{arrival_time}}. If you have not completed the online check-in yet, you can do it here: {{checkin_link}}\n\nHave a nice day and see you soon!\nCarlo'
),
(
  'review_request', 'Richiesta recensione', 'before_departure', 1, 17, '{direct,manual,airbnb,booking,vrbo,other}', false, 40,
  'Grazie per il tuo soggiorno a {{property}}',
  'Thanks for your stay at {{property}}',
  E'Ciao {{guest_name}},\n\nspero che il soggiorno a {{property}} ti sia piaciuto! Mi farebbe molto piacere sapere com''è andata: le recensioni sono importantissime, mi aiutano a migliorare e a far conoscere la casa ad altri ospiti.\n\nPuoi lasciare un commento sul portale che hai usato per prenotare oppure sul mio profilo Google:\n{{review_link}}\n\nGrazie del tempo e della gentilezza, ogni parere è prezioso!\n\nCiao\nCarlo',
  E'Hi {{guest_name}},\n\nI hope your stay at {{property}} was enjoyable! I''d really love to hear how it went: reviews are incredibly important to me, as they help me improve and share the place with other guests.\n\nYou can leave a comment either on the booking portal you used or on my Google profile:\n{{review_link}}\n\nThank you so much for your time and kindness, every feedback is precious!\n\nCiao\nCarlo'
),
(
  'checkin_completed', 'Conferma check in ricevuto', 'on_checkin_completed', 0, 10, '{direct,manual,airbnb,booking,vrbo,other}', true, 50,
  'Check in ricevuto, grazie!',
  'Check-in received, thank you!',
  E'Ciao {{guest_name}},\n\nabbiamo ricevuto i dati per la registrazione: grazie! Due giorni prima dell''arrivo ti manderò la guida della casa con le istruzioni di accesso.\n\nA presto,\nCarlo',
  E'Hi {{guest_name}},\n\nwe have received your registration details, thank you! Two days before your arrival I will send you the house guide with the access instructions.\n\nSee you soon,\nCarlo'
),
(
  'balance_confirmation', 'Conferma ricezione saldo (Salento)', 'manual', 0, 10, '{direct,manual}', false, 60,
  'Saldo ricevuto: la tua prenotazione a {{property}} è confermata',
  'Balance received: your booking at {{property}} is confirmed',
  E'Ciao {{guest_name}},\n\nabbiamo ricevuto il saldo del tuo soggiorno in Salento, grazie mille!\nLa prenotazione a {{property}} per {{guests}} ospiti è confermata ({{check_in}} → {{check_out}}).\n\nCi sentiremo qualche giorno prima dell''arrivo per organizzare il check in. Nel frattempo, per qualsiasi cosa, scrivimi a {{host_email}} o su WhatsApp al {{host_phone}}.\n\nA presto,\nCarlo',
  E'Hi {{guest_name}},\n\nwe have received the final payment for your stay in Salento, thank you very much!\nYour booking at {{property}} for {{guests}} guests is now confirmed ({{check_in}} → {{check_out}}).\n\nWe''ll get in touch a few days before your arrival to coordinate your check-in. In the meantime, feel free to contact me at {{host_email}} or via WhatsApp at {{host_phone}}.\n\nBest regards and see you soon,\nCarlo'
),
(
  'contract', 'Contratto di affitto breve (Porta Romana 2)', 'manual', 0, 10, '{direct,manual,airbnb,booking,vrbo,other}', false, 70,
  'Contratto di affitto breve',
  'Short-term rental contract',
  E'Ciao {{guest_name}},\n\nqui trovi il contratto di affitto breve da firmare online per il soggiorno dal {{check_in}}:\nhttps://eu.jotform.com/sign/233533854194057/invite/01hj3v8hy727c9f99ca370bcf9?check-in={{check_in}}\n\nGrazie,\nCarlo',
  E'Hi {{guest_name}},\n\nhere is the short-term rental contract to sign online for your stay from {{check_in}}:\nhttps://eu.jotform.com/sign/233533854194057/invite/01hj3v8hy727c9f99ca370bcf9?check-in={{check_in}}\n\nThank you,\nCarlo'
),
(
  'quote', 'Preventivo', 'manual', 0, 10, '{direct,manual}', false, 80,
  'Preventivo soggiorno a {{property}} dal {{check_in}} al {{check_out}}',
  'Quotation for your stay at {{property}} from {{check_in}} to {{check_out}}',
  E'Gentile {{guest_name}},\n\ngrazie per l''interesse per {{property}}. Confermo la disponibilità dal {{check_in}} al {{check_out}} per {{guests}} ospiti.\n\nPrezzo totale: [importo] (pulizie finali incluse).\n\nPer confermare basta rispondere a questa email: ti invio le istruzioni per il pagamento.\n\nA presto,\nCarlo Ardito\n{{host_phone}}\nwww.designsuite.it',
  E'Dear {{guest_name}},\n\nthank you so much for inquiring about {{property}}. I confirm availability from {{check_in}} to {{check_out}} for {{guests}} guests.\n\nTotal price: [amount] (final cleaning included).\n\nTo confirm, just reply to this email and I will send you the payment instructions.\n\nBest regards,\nCarlo Ardito\n{{host_phone}}\nwww.designsuite.it'
)
on conflict (key) do update set
  name = excluded.name, trigger = excluded.trigger, days_offset = excluded.days_offset, send_hour = excluded.send_hour,
  channels = excluded.channels, only_if_contact = excluded.only_if_contact, sort_order = excluded.sort_order,
  subject_it = excluded.subject_it, subject_en = excluded.subject_en, body_it = excluded.body_it, body_en = excluded.body_en;

-- Il contratto riguarda solo Suite Porta Romana 2
update public.message_templates set property_ids = array(select id from public.properties where slug = 'suite-porta-romana-2') where key = 'contract';
-- Il saldo riguarda le ville in Salento
update public.message_templates set property_ids = array(select id from public.properties where region = 'salento') where key = 'balance_confirmation';

-- ---------------------------------------------------------------------------
-- Guida ospiti
-- ---------------------------------------------------------------------------
delete from public.guide_sections;

-- Comuni a tutte le case
insert into public.guide_sections (property_id, key, icon, title_it, title_en, body_it, body_en, sort_order) values
(null, 'host', 'host', 'Il tuo host', 'Your host',
 '<p>Ciao! Sono Carlo e sono davvero contento di darti il benvenuto a {{property}} dal {{check_in}} al {{check_out}}. Per qualsiasi domanda scrivimi su WhatsApp al {{host_phone}} o a {{host_email}}.</p>',
 '<p>Hi! I''m Carlo and I''m really happy to welcome you to {{property}} from {{check_in}} to {{check_out}}. For any questions do not hesitate to contact me via WhatsApp at {{host_phone}} or by email at {{host_email}}.</p>', 10),
(null, 'checkin', 'checkin', 'Check in online', 'Online check-in',
 '<p>In Italia la registrazione degli ospiti è obbligatoria. Se non l''hai ancora fatta, compila il check in online: <a href="{{checkin_link}}">apri il modulo</a>.</p>',
 '<p>Guest registration is mandatory in Italy. If you have not done it yet, please complete the online check-in: <a href="{{checkin_link}}">open the form</a>.</p>', 15),
(null, 'wifi', 'wifi', 'WiFi', 'WiFi',
 '<p>Rete: <strong>{{wifi_ssid}}</strong><br>Password: <strong>{{wifi_password}}</strong></p>',
 '<p>Network: <strong>{{wifi_ssid}}</strong><br>Password: <strong>{{wifi_password}}</strong></p>', 40);

-- Milano
with p as (select id, slug from public.properties where region = 'milano')
insert into public.guide_sections (property_id, key, icon, title_it, title_en, body_it, body_en, sort_order)
select p.id, 'reach', 'map', 'Come raggiungere il palazzo', 'How to reach the building',
 '<p><strong>Dall''aeroporto di Linate</strong><br>Il sistema più semplice è il taxi (circa 15 €). In alternativa la metropolitana M4.</p><p><strong>Dall''aeroporto di Malpensa</strong><br>Taxi circa 114 €. In alternativa Malpensa Express fino a Centrale o Cadorna, poi metropolitana gialla M3 fino a Porta Romana.</p><p><strong>Dalla Stazione Centrale</strong><br>Metropolitana gialla M3 fino a Porta Romana, poi 3 minuti a piedi.</p>',
 '<p><strong>From Linate Airport</strong><br>The easiest way is a taxi (around €15). Alternatively, take metro line M4.</p><p><strong>From Malpensa Airport</strong><br>Taxi around €114. Alternatively, take the Malpensa Express to Centrale or Cadorna, then the yellow metro M3 to Porta Romana.</p><p><strong>From the Central Station</strong><br>Yellow metro M3 to Porta Romana, then a 3-minute walk.</p>', 20
from p;

insert into public.guide_sections (property_id, key, icon, title_it, title_en, body_it, body_en, sort_order)
select id, 'find', 'key', 'Come trovare l''appartamento', 'How to find the apartment',
 '<ul><li>Portone di Via Muratori 13: puoi entrare negli orari di portineria (8:30-12:30 e 13:30-17:30; il sabato solo al mattino).</li><li>Se la portineria è chiusa, chiama Carlo al {{host_phone}} e attendi davanti al portone.</li><li>Per raggiungere l''appartamento segui le <a href="https://www.designsuite.it/info/suite-porta-romana-accesso">indicazioni con le foto</a>.</li></ul>',
 '<ul><li>Main door at Via Muratori 13: you can enter during concierge hours (8:30-12:30 and 13:30-17:30; Saturdays mornings only).</li><li>If the concierge is closed, call Carlo at {{host_phone}} and wait in front of the door.</li><li>To reach the apartment follow the <a href="https://www.designsuite.it/info/suite-porta-romana-accesso">directions with photos</a>.</li></ul>', 25
from public.properties where slug = 'suite-porta-romana';

insert into public.guide_sections (property_id, key, icon, title_it, title_en, body_it, body_en, sort_order)
select id, 'find', 'key', 'Come trovare l''appartamento', 'How to find the apartment',
 '<ul><li>Portone di Via Burlamacchi 11: puoi entrare negli orari di portineria (8:30-18:00).</li><li>Se la portineria è chiusa, chiama Carlo al {{host_phone}} e attendi davanti al portone.</li><li>Per raggiungere l''appartamento segui le <a href="https://www.designsuite.it/info/suite-porta-romana-2-accesso">indicazioni con le foto</a>.</li></ul>',
 '<ul><li>Main door at Via Burlamacchi 11: you can enter during concierge hours (8:30-18:00).</li><li>If the concierge is closed, call Carlo at {{host_phone}} and wait in front of the door.</li><li>To reach the apartment follow the <a href="https://www.designsuite.it/info/suite-porta-romana-2-accesso">directions with photos</a>.</li></ul>', 25
from public.properties where slug = 'suite-porta-romana-2';

with p as (select id from public.properties where region = 'milano')
insert into public.guide_sections (property_id, key, icon, title_it, title_en, body_it, body_en, sort_order)
select p.id, 'access_code', 'lock', 'Codice di accesso', 'Access code',
 '<p>Questo è il tuo codice di accesso: <strong>{{access_code}}</strong> ✅<br>È valido dal {{check_in}} al {{check_out}}. La serratura si chiude da sola 2 minuti dopo la chiusura della porta.</p>',
 '<p>This is your access code: <strong>{{access_code}}</strong> ✅<br>It is valid from {{check_in}} until {{check_out}}. The lock closes automatically 2 minutes after the door is closed.</p>', 30
from p;

insert into public.guide_sections (property_id, key, icon, title_it, title_en, body_it, body_en, sort_order)
select id, 'parking', 'car', 'Parcheggio', 'Parking',
 '<p>In zona Porta Romana i parcheggi in strada sono riservati ai residenti (strisce gialle) o a pagamento orario (strisce blu).</p><p>Suite Porta Romana dispone di un box privato a 50 metri dal palazzo: costo extra 20 € al giorno, da prenotare prima del check in. <a href="https://www.designsuite.it/info/suite-porta-romana-box">Indicazioni per raggiungerlo</a>.</p>',
 '<p>In the Porta Romana area street parking is reserved for residents (yellow lines) or paid by the hour (blue lines).</p><p>Suite Porta Romana has a private garage 50 metres from the building: extra cost €20 per day, to be booked before check-in. <a href="https://www.designsuite.it/info/suite-porta-romana-box">Directions</a>.</p>', 50
from public.properties where slug = 'suite-porta-romana';

insert into public.guide_sections (property_id, key, icon, title_it, title_en, body_it, body_en, sort_order)
select id, 'parking', 'car', 'Parcheggio', 'Parking',
 '<p>In zona Porta Romana i parcheggi in strada sono riservati ai residenti (strisce gialle) o a pagamento orario (strisce blu).</p><p>Suite Porta Romana 2 dispone di un box privato a 50 metri dal palazzo: costo extra 20 € al giorno, da prenotare prima del check in. <a href="https://www.designsuite.it/info/suite-porta-romana-2-box">Indicazioni per raggiungerlo</a>.</p>',
 '<p>In the Porta Romana area street parking is reserved for residents (yellow lines) or paid by the hour (blue lines).</p><p>Suite Porta Romana 2 has a private garage 50 metres from the building: extra cost €20 per day, to be booked before check-in. <a href="https://www.designsuite.it/info/suite-porta-romana-2-box">Directions</a>.</p>', 50
from public.properties where slug = 'suite-porta-romana-2';

insert into public.guide_sections (property_id, key, icon, title_it, title_en, body_it, body_en, sort_order)
select id, 'climate', 'thermometer', 'Clima', 'Heating and cooling',
 '<p>Il riscaldamento è a pannelli radianti a pavimento: dopo aver cambiato la temperatura serve un po'' di tempo perché l''ambiente la raggiunga. Il condizionamento estivo è ad aria.</p><p>Per impostare la temperatura tocca lo schermo del termostato e usa solo i pulsanti che compaiono. <strong>Non modificare le altre impostazioni</strong>: il sistema potrebbe smettere di funzionare.</p>',
 '<p>The heating system uses radiant floor panels, so after changing the temperature it takes some time for the room to reach it. Summer air conditioning uses air.</p><p>To set the temperature touch the thermostat screen and use only the buttons that appear. <strong>Do not change the other settings</strong>: the system may stop working.</p>', 60
from public.properties where slug = 'suite-porta-romana';

insert into public.guide_sections (property_id, key, icon, title_it, title_en, body_it, body_en, sort_order)
select id, 'climate', 'thermometer', 'Clima', 'Heating and cooling',
 '<p>La casa ha un riscaldamento a pavimento condominiale. Per aumentare la temperatura accendi il termostato, verifica che sia su "Riscald" e imposta la temperatura. Per l''aria condizionata imposta il termostato su "Raffred".</p>',
 '<p>The house has a shared underfloor heating system. To increase the temperature turn on the thermostat, make sure it is set to "Riscald" (heat) and set the temperature. For air conditioning set the thermostat to "Raffred" (cool).</p>', 60
from public.properties where slug = 'suite-porta-romana-2';

insert into public.guide_sections (property_id, key, icon, title_it, title_en, body_it, body_en, sort_order)
select id, 'garbage', 'trash', 'Spazzatura', 'Garbage',
 '<p>In casa trovi i contenitori per la raccolta differenziata: non riciclabile, organico, carta, plastica e metallo. <a href="https://www.designsuite.it/info/suite-porta-romana-spazzatura">Percorso per i contenitori condominiali</a>.</p>',
 '<p>In the apartment you will find recycling bins: non-recyclable, organic, paper, plastic and metal. <a href="https://www.designsuite.it/info/suite-porta-romana-spazzatura">Route to the building bins</a>.</p>', 70
from public.properties where slug = 'suite-porta-romana';

insert into public.guide_sections (property_id, key, icon, title_it, title_en, body_it, body_en, sort_order)
select id, 'garbage', 'trash', 'Spazzatura', 'Garbage',
 '<p>In casa trovi i contenitori per la raccolta differenziata: non riciclabile, organico, carta, plastica e metallo. <a href="https://www.designsuite.it/info/suite-porta-romana-2-spazzatura">Percorso per i contenitori condominiali</a>.</p>',
 '<p>In the apartment you will find recycling bins: non-recyclable, organic, paper, plastic and metal. <a href="https://www.designsuite.it/info/suite-porta-romana-2-spazzatura">Route to the building bins</a>.</p>', 70
from public.properties where slug = 'suite-porta-romana-2';

insert into public.guide_sections (property_id, key, icon, title_it, title_en, body_it, body_en, sort_order)
select id, 'meter', 'zap', 'Contatore elettrico', 'Electricity meter',
 '<p>Se il contatore si stacca, <a href="https://www.designsuite.it/info/suite-porta-romana-contatore">segui queste indicazioni</a> per raggiungerlo e riarmarlo.</p>',
 '<p>If the meter goes offline, <a href="https://www.designsuite.it/info/suite-porta-romana-contatore">follow these directions</a> to reach it and switch it back on.</p>', 80
from public.properties where slug = 'suite-porta-romana';

insert into public.guide_sections (property_id, key, icon, title_it, title_en, body_it, body_en, sort_order)
select id, 'meter', 'zap', 'Contatore elettrico', 'Electricity meter',
 '<p>Se il contatore si stacca, <a href="https://www.designsuite.it/info/suite-porta-romana-2-contatore">segui queste indicazioni</a> per raggiungerlo e riarmarlo.</p>',
 '<p>If the meter goes offline, <a href="https://www.designsuite.it/info/suite-porta-romana-2-contatore">follow these directions</a> to reach it and switch it back on.</p>', 80
from public.properties where slug = 'suite-porta-romana-2';

with p as (select id from public.properties where region = 'milano')
insert into public.guide_sections (property_id, key, icon, title_it, title_en, body_it, body_en, sort_order)
select p.id, 'rules', 'list', 'Regole della casa', 'House rules',
 '<ul><li>Tratta la casa con lo stesso rispetto che avresti per la tua: ci siamo impegnati molto per renderla uno spazio piacevole.</li><li>Mantieni un buon livello di pulizia durante il soggiorno: renderà tutto più semplice al check out.</li><li>In caso di danni accidentali valuteremo insieme eventuali costi di riparazione.</li><li>Divertiti, ma tieni il rumore al minimo nelle ore notturne.</li><li>Leggi le regole all''inizio del soggiorno; se qualcosa non è chiaro, contattaci.</li><li><strong>Sicurezza</strong>: la serratura d''ingresso si chiude da sola 2 minuti dopo la chiusura della porta.</li><li><strong>Pulizie</strong>: l''appartamento è consegnato pulito con biancheria da letto, bagno e cucina. Pulizia e cambio biancheria sono settimanali e inclusi per soggiorni oltre la settimana. Pulizia extra 10 €/ora, cambio biancheria extra 15 € a persona.</li></ul>',
 '<ul><li>Please treat our house with the same respect as your own home: we put a lot of effort into making it a lovely space.</li><li>Keep a good level of cleanliness during your stay: it makes check-out much easier.</li><li>In case of accidental damage we will assess any repair costs together.</li><li>Have fun, but keep noise to a minimum at night.</li><li>Read the rules at the beginning of your stay; if anything is unclear, contact us.</li><li><strong>Security</strong>: the entrance lock closes automatically 2 minutes after the door is closed.</li><li><strong>Cleaning</strong>: the apartment is delivered clean with bed, bath and kitchen linen. Cleaning and linen change are weekly and included for stays longer than a week. Extra cleaning €10/hour, extra linen change €15 per person.</li></ul>', 90
from p;

with p as (select id from public.properties where region = 'milano')
insert into public.guide_sections (property_id, key, icon, title_it, title_en, body_it, body_en, sort_order)
select p.id, 'food', 'coffee', 'Bar e ristoranti', 'Bars and restaurants',
 '<p><strong>Bar</strong><br>Civico 11 (Via Burlamacchi 11) · Barbisa (Via Muratori 11) · Marla pasticceria (Corso Lodi 15)</p><p><strong>Ristoranti</strong><br>Pastamadre (Via Corio 8) · Casa Tua (Via Muratori 10) · Particolare (Via Tiraboschi 5) · Mi Babbo (Corso Lodi 19) · Giulio Pane Ojo (Via Muratori 10, cucina romana) · L''Amuri (Via Maestri Campionesi 30, siciliano) · Gatto Bianco (Via Friuli 75, pugliese) · Don Juan (Via Altaguardia 2, argentino) · Trippa (Via Vasari 1) · Bomaki (Via Corio 8, nippo brasiliano) · Barmare (Corso Lodi 12, pesce) · Cascina Cuccagna (Via Cuccagna 2) · Izu (Corso Lodi 27, sushi) · Berberè (Via Botta 4, pizza) · Lionello (Via Friuli 46, pizza) · Giannasi (Piazza Buozzi 2, pollo da asporto) · Al Garghet (Via Selvanesco 36, cotoletta alla milanese)</p>',
 '<p><strong>Bars</strong><br>Civico 11 (Via Burlamacchi 11) · Barbisa (Via Muratori 11) · Marla pastry shop (Corso Lodi 15)</p><p><strong>Restaurants</strong><br>Pastamadre (Via Corio 8) · Casa Tua (Via Muratori 10) · Particolare (Via Tiraboschi 5) · Mi Babbo (Corso Lodi 19) · Giulio Pane Ojo (Via Muratori 10, Roman cuisine) · L''Amuri (Via Maestri Campionesi 30, Sicilian) · Gatto Bianco (Via Friuli 75, Apulian) · Don Juan (Via Altaguardia 2, Argentinian) · Trippa (Via Vasari 1) · Bomaki (Via Corio 8, Japanese-Brazilian) · Barmare (Corso Lodi 12, fish) · Cascina Cuccagna (Via Cuccagna 2) · Izu (Corso Lodi 27, sushi) · Berberè (Via Botta 4, pizza) · Lionello (Via Friuli 46, pizza) · Giannasi (Piazza Buozzi 2, takeaway chicken) · Al Garghet (Via Selvanesco 36, Milanese cutlet)</p>', 100
from p;

-- Salento
with p as (select id from public.properties where region = 'salento')
insert into public.guide_sections (property_id, key, icon, title_it, title_en, body_it, body_en, sort_order)
select p.id, 'access_code', 'lock', 'Come entrare', 'How to get in',
 '<p>Le chiavi sono nella cassetta di sicurezza all''ingresso. Combinazione: <strong>{{lockbox_code}}</strong>. Se preferisci, possiamo organizzare la consegna di persona: scrivimi su WhatsApp al {{host_phone}}.</p>',
 '<p>The keys are in the lockbox at the entrance. Combination: <strong>{{lockbox_code}}</strong>. If you prefer, we can arrange an in-person handover: message me on WhatsApp at {{host_phone}}.</p>', 30
from p;

with p as (select id from public.properties where region = 'salento')
insert into public.guide_sections (property_id, key, icon, title_it, title_en, body_it, body_en, sort_order)
select p.id, 'food', 'coffee', 'Bar e ristoranti', 'Bars and restaurants',
 '<p><strong>Bar</strong><br>Barlento (Piazza degli Eroi, Morciano di Leuca) · Il Pasticciotto (Via San Martino 82, Morciano di Leuca) · Bar Castrum (Via S. Giacomo 23, Castrignano del Capo) · Gelateria La Dolce Leuca (Via Cesare Battisti 11, Castrignano del Capo) · Bar del Moro (Via del Mare 2, San Gregorio di Patù: aperitivo al tramonto)</p><p><strong>Ristoranti</strong><br>Lo Scalo (Marina di Novaglie, +39 0833 533488) · Farmacia dei Sani (Piazza del Popolo 14, Ruffano, +39 339 8332514) · Farnari (Via Chiesa 10, Gemini, +39 376 0826793) · Sikalindi (SS 275 km 31, San Dana, +39 351 0487199) · Rua de li Travaj (Piazza Indipendenza 44, Patù, +39 349 0584531) · Sante le Muse (Strada Comunale Salve Morciano 3, Salve, +39 342 7911059)</p>',
 '<p><strong>Bars</strong><br>Barlento (Piazza degli Eroi, Morciano di Leuca) · Il Pasticciotto (Via San Martino 82, Morciano di Leuca) · Bar Castrum (Via S. Giacomo 23, Castrignano del Capo) · Gelateria La Dolce Leuca (Via Cesare Battisti 11, Castrignano del Capo) · Bar del Moro (Via del Mare 2, San Gregorio di Patù: sunset aperitifs)</p><p><strong>Restaurants</strong><br>Lo Scalo (Marina di Novaglie, +39 0833 533488) · Farmacia dei Sani (Piazza del Popolo 14, Ruffano, +39 339 8332514) · Farnari (Via Chiesa 10, Gemini, +39 376 0826793) · Sikalindi (SS 275 km 31, San Dana, +39 351 0487199) · Rua de li Travaj (Piazza Indipendenza 44, Patù, +39 349 0584531) · Sante le Muse (Strada Comunale Salve Morciano 3, Salve, +39 342 7911059)</p>', 100
from p;
