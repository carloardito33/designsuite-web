-- Istruzione per il tastierino: dopo le cifre va premuto il tasto di conferma (spunta).
-- Guida ospiti, sezione "Codice di accesso" delle case di Milano.
update public.guide_sections set
  body_it = '<p>Questo è il tuo codice di accesso: <strong>{{access_code}}</strong></p><p><strong>Importante:</strong> dopo aver digitato le cifre premi il tasto con la <strong>spunta ✓</strong> in basso a destra sul tastierino, altrimenti la porta non si apre.</p><p>Il codice è valido dalle 11:00 del {{check_in}} alle 16:00 del {{check_out}}. La serratura si chiude da sola 2 minuti dopo la chiusura della porta.</p>',
  body_en = '<p>This is your access code: <strong>{{access_code}}</strong></p><p><strong>Important:</strong> after typing the digits press the <strong>✓ (check) key</strong> at the bottom right of the keypad, otherwise the door will not open.</p><p>The code is valid from 11:00 on {{check_in}} until 16:00 on {{check_out}}. The lock closes automatically 2 minutes after the door is closed.</p>'
where key = 'access_code'
  and property_id in (select id from public.properties where region = 'milano');

-- Messaggio "Informazioni di arrivo e guida": stessa avvertenza accanto al codice.
update public.message_templates set
  body_it = replace(body_it, E'- il codice di accesso: {{access_code}}\n', E'- il codice di accesso: {{access_code}} (dopo le cifre premi il tasto ✓ sul tastierino)\n'),
  body_en = replace(body_en, E'- your access code: {{access_code}}\n', E'- your access code: {{access_code}} (after the digits press the ✓ key on the keypad)\n')
where key = 'arrival_info';
