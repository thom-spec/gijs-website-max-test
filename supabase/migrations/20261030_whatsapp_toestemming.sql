-- WhatsApp-toestemming bij de energiescan-aanvraag.
--
-- De bewoner vinkt op de aanvraagstap zelf aan of Gijs ook via WhatsApp contact
-- mag opnemen (staat standaard uit). Leeg (null) = aanvraag van vóór dit veld.
-- Zolang deze kolom nog niet bestaat, slaat de site de aanvraag gewoon op zonder
-- dit veld (zie schrijfMetOntbrekendeKolommen) en staat het antwoord wel in de
-- interne mail. Het moment van toestemming is created_at van dezelfde rij.
alter table public.energiescanaanvraag
  add column if not exists whatsapp_toestemming boolean;

comment on column public.energiescanaanvraag.whatsapp_toestemming is
  'Bewoner gaf bij de aanvraag actief toestemming om via WhatsApp benaderd te worden (null = aanvraag van voor dit veld).';
