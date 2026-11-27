import type { ReactNode } from "react";

// Gegroepeerde staafgrafiek (geen stapeling) zonder externe library: op desktop verticale staven
// per categorie naast elkaar, op mobiel horizontale staven onder elkaar zodat de labels leesbaar
// blijven. As begint altijd bij nul; elke staaf toont zijn exacte waarde. De bijbehorende HTML-tabel
// blijft op de pagina staan (zelfde databron), deze grafiek is ondersteuning.
//
// Kleuren alleen uit het design system. Gevalideerd met de dataviz-validator (kleurenblind-
// onderscheid ≥ 13): cv-ketel --grey-400, hybride --accent-500, volledig elektrisch --accent-800.

export type Reeks = { naam: string; kleur: string };
export type Categorie = { label: string; waarden: number[] };

export function StaafVergelijking({
  titel, reeksen, categorieen, max, stappen, formaat, asFormaat = formaat, onderschrift,
}: {
  titel: string;
  reeksen: Reeks[];
  categorieen: Categorie[];
  max: number;
  stappen: number[];
  formaat: (n: number) => string;
  asFormaat?: (n: number) => string;
  onderschrift?: ReactNode;
}) {
  const pct = (n: number) => `${(n / max) * 100}%`;
  const omschrijving = `${titel}. ` + categorieen
    .map(c => `${c.label}: ` + reeksen.map((r, i) => `${r.naam} ${formaat(c.waarden[i])}`).join(", "))
    .join("; ");

  return (
    <figure className="m-0 rounded-[var(--radius-lg)] border border-[var(--border-default)] bg-white p-5 sm:p-7">
      <figcaption className="mb-4 text-[17px] font-semibold leading-snug tracking-[-0.01em] text-[var(--gijs-donkergroen)]">{titel}</figcaption>

      <ul className="mb-6 flex flex-wrap gap-x-5 gap-y-2 p-0 text-[14px] text-zinc-700" aria-hidden>
        {reeksen.map(r => (
          <li key={r.naam} className="flex list-none items-center gap-2">
            <span className="inline-block size-3 rounded-[3px]" style={{ background: r.kleur }} />
            {r.naam}
          </li>
        ))}
      </ul>

      <div role="img" aria-label={omschrijving}>
        {/* Desktop: verticaal, gegroepeerd per categorie. */}
        <div className="hidden sm:flex gap-3" aria-hidden>
          <div className="relative h-64 w-14 shrink-0 text-right text-[12px] tabular-nums text-zinc-500">
            {stappen.map(s => (
              <span key={s} className="absolute right-0 translate-y-1/2 whitespace-nowrap" style={{ bottom: pct(s) }}>{asFormaat(s)}</span>
            ))}
          </div>
          <div className="flex-1">
            <div className="relative h-64">
              {stappen.map(s => (
                <div key={s} className={"absolute inset-x-0 border-t " + (s === 0 ? "border-[var(--border-strong)]" : "border-dashed border-[var(--border-default)]")} style={{ bottom: pct(s) }} />
              ))}
              <div className="absolute inset-0 flex">
                {categorieen.map(c => (
                  <div key={c.label} className="flex flex-1 items-end justify-center gap-[2px] px-[6%]">
                    {c.waarden.map((w, i) => (
                      <div key={reeksen[i].naam} className="relative flex h-full max-w-16 flex-1 flex-col justify-end" title={`${c.label}, ${reeksen[i].naam}: ${formaat(w)}`}>
                        <span className="mb-1 whitespace-nowrap text-center text-[13px] font-semibold tabular-nums text-zinc-700">{formaat(w)}</span>
                        <div className="rounded-t-[4px]" style={{ height: pct(w), background: reeksen[i].kleur }} />
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
            <div className="mt-2 flex">
              {categorieen.map(c => (
                <span key={c.label} className="flex-1 px-1 text-center text-[14px] font-medium leading-snug text-zinc-700">{c.label}</span>
              ))}
            </div>
          </div>
        </div>

        {/* Mobiel: horizontaal, per categorie de staven onder elkaar. */}
        <ul className="sm:hidden flex flex-col gap-5 p-0" aria-hidden>
          {categorieen.map(c => (
            <li key={c.label} className="list-none">
              <p className="mb-1.5 text-[15px] font-semibold text-[var(--gijs-donkergroen)]">{c.label}</p>
              <div className="flex flex-col gap-[2px] border-l border-[var(--border-strong)]">
                {c.waarden.map((w, i) => (
                  <div key={reeksen[i].naam} className="flex items-center gap-2">
                    <div className="h-4 rounded-r-[4px]" style={{ width: `calc(${pct(w)} * 0.72)`, background: reeksen[i].kleur }} />
                    <span className="whitespace-nowrap text-[13px] font-semibold tabular-nums text-zinc-700">{formaat(w)}</span>
                  </div>
                ))}
              </div>
            </li>
          ))}
        </ul>
      </div>

      {onderschrift && <div className="mt-5 text-[13px] leading-relaxed text-zinc-500">{onderschrift}</div>}
    </figure>
  );
}
