// Ervaringscijfers van Gijs over gasbesparing en extra stroomverbruik bij een warmtepomp,
// aangeleverd door Naud (13-10-2026, per WhatsApp). Vervangt de eerdere, generieke
// Milieu Centraal-cijfers op de warmtepomppagina: dit zijn de vuistregels die Gijs zelf
// hanteert, en geven ronde, voorspelbare uitkomsten (zie de berekening hieronder).
//
// "Huidig verbruik" is het gemiddelde gas- en stroomverbruik van een woning vóór een
// warmtepomp. Dit zijn GEEN Milieu Centraal-cijfers; lib/content/milieu-centraal.ts blijft
// voor de woningscan (lib/energie-schatting.ts) het uitgangspunt, dit bestand alleen voor
// de uitleg op deze pagina.
import type { HouseType } from "../woning-types";

export type WarmtepompVerbruik = { gas: number; stroom: number };

export const WARMTEPOMP_HUIDIG_VERBRUIK: Record<HouseType, WarmtepompVerbruik> = {
  tussenwoning: { gas: 1200, stroom: 2500 },
  hoekwoning: { gas: 1400, stroom: 2500 },
  "twee-onder-een-kap": { gas: 1500, stroom: 3000 },
  vrijstaand: { gas: 1800, stroom: 3500 },
};

/** Welk deel van het huidige gasverbruik wegvalt, per verwarmingsvariant. */
export const WARMTEPOMP_GASBESPARING = {
  hybride: 0.6,
  hybrideMetVloerverwarming: 0.7,
  volledigElektrisch: 1,
} as const;

/** Stroom die erbij komt per jaar (kWh), ongeacht woningtype. */
export const WARMTEPOMP_STROOM_ERBIJ = {
  hybride: 2000,
  volledigElektrisch: 3500,
} as const;

/** Vastrechtkosten die vaak blijven lopen voor de gasaansluiting, ook bij (bijna) geen gasverbruik meer. */
export const GAS_VASTRECHT_PER_JAAR = 366;

// Indicatieve jaarlijkse besparing op de energierekening in euro's, aangeleverd door Max (27-11-2026).
// LET OP: een aparte set rekenvoorbeelden, NIET afgeleid van Nauds gasvuistregels hierboven: andere
// isolatie-uitgangspunten per systeem en bij volledig elektrisch inclusief vervallen vaste gaskosten.
// Tabel en grafiek op de warmtepomppagina lezen allebei uit dit object, zodat de cijfers gelijk blijven.
export const WARMTEPOMP_EURO_BESPARING: Record<HouseType, { hybride: number; volledigElektrisch: number }> = {
  tussenwoning: { hybride: 550, volledigElektrisch: 950 },
  hoekwoning: { hybride: 700, volledigElektrisch: 1100 },
  "twee-onder-een-kap": { hybride: 800, volledigElektrisch: 1250 },
  vrijstaand: { hybride: 1200, volledigElektrisch: 1650 },
};

export const WARMTEPOMP_EURO_UITGANGSPUNTEN = {
  gasprijsPerM3: 1.5,
  stroomprijsPerKwh: 0.21,
  peildatum: "november 2026",
} as const;
