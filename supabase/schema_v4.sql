-- Lingua dell'ospite: qualsiasi codice (it, en, de, fr, es, ...). Guida e messaggi restano
-- in italiano per 'it' e in inglese per tutte le altre.
alter table public.bookings drop constraint if exists bookings_guest_lang_check;
alter table public.bookings add constraint bookings_guest_lang_check check (guest_lang ~ '^[a-z]{2,8}$');
