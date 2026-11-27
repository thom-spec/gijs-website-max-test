import Link from "next/link";
import Image from "next/image";
import { JsonLd } from "@/components/SeoSchema";
import { SITE_URL, ENERGIESCAN_HREF } from "@/lib/seo";
import { DAK_PRODUCTS, DAK_VERGELIJKING, DAK_KEUZEHULP } from "@/lib/content/dakisolatie-products";
import { ArtikelKaarten } from "@/components/kennis/ArtikelKaarten";
import { CONTACT } from "@/lib/content/contact";
import { Card } from "@/components/ds/core/Card";
import { Button } from "@/components/ds/core/Button";
import { WhatsAppTrackedButton } from "@/components/regio/WhatsAppTrackedButton";
import { MeasureCta } from "@/components/measures/MeasureCta";
import { Icon } from "@/components/ds/core/Icon";
import { MeasureHero } from "@/components/measures/MeasureHero";
import { MeasureSectionNav } from "@/components/measures/MeasureSectionNav";
import { MaterialCard } from "@/components/measures/MaterialCard";
import { DakisolatieInstallatieAnimatie } from "@/components/measures/DakisolatieInstallatieAnimatie";
import { FAQAccordion, type FAQItem } from "@/components/measures/FAQAccordion";
import { FeatureList } from "@/components/measures/FeatureList";
import { FotoStrook, type StrookFoto } from "@/components/measures/FotoStrook";
import { HOOFDSTUK_MB, HOOFDSTUK_DIVIDER } from "@/components/measures/sectionRhythm";
import { SubsidieSectie } from "@/components/measures/SubsidieSectie";
import { MeasureRegioLink } from "@/components/measures/MeasureRegioLink";
import type { MEASURE_PAGES } from "@/lib/content/measure-pages";

type MeasurePageItem = (typeof MEASURE_PAGES)[number];

// Dakisolatiepagina, gebouwd op de spouwmuurisolatiepagina als template
// (zelfde structuur, componenten, spacing en stijl — zie
// components/measures/SpouwmuurisolatiePage.tsx). Alleen de inhoud gaat
// over dakisolatie.
//
// Bronnen: drie Gijs-productbladen (HR WoodFibre, HR TimberWool, HR Gijs-Roof), zie
// lib/content/dakisolatie-products.ts. Subsidie loopt via SubsidieSectie (geen bedragen uit de bladen).
//
// SEO-ronde 27-11-2026 (Max): GSC-zoekvragen "beste dakisolatie", "welke dakisolatie (gebruiken)",
// "dakisolatie voordelen/laten plaatsen/subsidie". Toegevoegd: keuze-intro, technische vergelijking,
// keuzehulp, aandachtspunten, "beste investering"-overgang, kennisartikelen en FAQ. Geen materiaal
// als winnaar, geen isolatiewaarden of besparingen per materiaal (geen gevalideerde gegevens).
//
// HR NatuWool en HR IcyFoam staan wel genoemd in de bestaande Gijs-content
// (measure-details.ts), maar de enige aangetroffen bronbladen hiervoor
// waren lege cloud-only placeholders (0 bytes) — geen bruikbare inhoud.
// Daarom bewust niet als materiaalkaart opgenomen (zie DAK_PRODUCTS).
//
// UITLEGVISUAL-VERVANGING: de afbeelding bij "Wat is dakisolatie?" is
// vervangen door de nieuw aangeleverde dakisolatie-uitlegvisual.png
// ("dakisolatie v.2.1.png" uit de aangeleverde ZIP, 5969×2744) — vervangt
// de eerdere Dakisolatie_voorbeeld.png (verwijderd, nergens anders
// gebruikt). Bevat de nummering/legenda (dakpannen/isolatiemateriaal/
// dakconstructie/binnenafwerking) al zelf; volle contentbreedte, geen
// crop (was eerder een vaste 4:3-crop met object-cover).
// CORRECTIE: de opdrachtgever leverde daarna een gecorrigeerde versie aan
// ("1.png" in productbladen, zelfde 5969×2744) — het leidinglijntje van
// label "1" wees in de eerdere export net naast de dakpannen (in de
// witruimte erboven) in plaats van ernaar toe. Geverifieerd via een
// pixel-diff tussen beide bestanden (enige verschilregio: rond label 1/
// "Dakpannen"); de rest van de afbeelding is ongewijzigd. Deze
// gecorrigeerde versie vervangt het eerdere bestand onder dezelfde naam.
//
// UITVOERINGSVISUAL — PROCES V2: deze sectie toonde eerder 6 losse SVG's
// (proces.zip) via het gedeelde UitvoeringStappen-component. De
// opdrachtgever leverde een volledig nieuwe, definitieve set aan ("proces
// v2"-map, submap "dakisolatie stappen") die de vorige set overal
// vervangt: elk bestand bevat nu icoon + nummerbadge + titel + een korte
// uitlegzin (voorheen alleen icoon + badge + titel, geen uitleg). Alle 6
// bestanden zijn hernoemd naar dakisolatie-stap-1.svg t/m -stap-6.svg
// (zie public/images/maatregelen/dakisolatie/proces/); de vorige set (stap-1.svg t/m
// stap-6.svg) is verwijderd. Titels en uitlegzinnen zijn ongewijzigd
// overgenomen zoals aangeleverd (niet herschreven).
// Aanvullende voorwaarden — pagina 2 van de drie productbladen (wording
// verschilt per blad; hier samengevat op de gemeenschappelijke thema's).
// In twee groepen verdeeld: wat de woning/omgeving beschikbaar moet
// hebben (links) en wat er tijdens de uitvoering zelf gebeurt (rechts).
const VOORWAARDEN_LINKS = [
  "De te isoleren oppervlakken zijn voor aanvang van de werkzaamheden goed bereikbaar",
  "Zolderruimtes, vliering en knieschotten zijn voor aanvang van de werkzaamheden leeggemaakt",
  "Het dak is asbestvrij",
];
const VOORWAARDEN_RECHTS = [
  "Het isolatiemateriaal wordt aan de binnenzijde van het dak aangebracht",
  "Waar een folie- en lattenconstructie wordt gebruikt, is deze bedoeld om de isolatie op zijn plek te houden",
  "De (eind)afwerking is, afhankelijk van de toepassing, voor rekening van de opdrachtgever",
];

// Twee voordelen — de dakbrochures (WoodFibre/TimberWool/Gijs-Roof)
// ondersteunen geen gedeelde derde voordeelclaim: Wood-Fibre is dampopen,
// Gijs-Roof is juist dampdicht, en alleen TimberWool noemt onbrandbaar.
// In plaats van een generieke derde kaart ("lagere energievraag") te
// herhalen zoals bij spouw/vloer, blijft het bij twee sterke, dak-
// specifieke voordelen (zie instructie: liever twee sterke kaarten dan
// een derde niet-onderbouwde).
const VOORDELEN = [
  { icon: "thermometer", title: "Meer wooncomfort", text: "Een gelijkmatigere temperatuur in huis, ook via het dak." },
  { icon: "wind", title: "Minder warmteverlies via het dak", text: "Je woning verliest minder warmte via het dak." },
];

// Waar let je op bij het kiezen (tekst van Max, 27-11-2026; voorwaarden uit p. 3 van de productbladen).
const AANDACHTSPUNTEN = [
  { icon: "house", titel: "Bestaande dakconstructie", tekst: "Niet ieder dak is op dezelfde manier opgebouwd. Misschien is jouw dak nog nooit geïsoleerd, terwijl bij een andere woning al isolatie of folie aanwezig is. De bestaande dakopbouw bepaalt mede welke isolatiesystemen geschikt zijn." },
  { icon: "ruler", titel: "Beschikbare ruimte", tekst: "Gebruik je jouw zolder als slaapkamer, werkkamer of opslagruimte? Dan kan de beschikbare ruimte invloed hebben op je keuze. Kijk daarbij niet alleen naar de dikte van het isolatiemateriaal, maar ook naar de benodigde ruimte voor het volledige isolatiesysteem en de afwerking." },
  { icon: "shield-check", titel: "Staat van het dak", tekst: "Voordat je dak geïsoleerd kan worden, moet het waterdicht, constructief geschikt en vrij van asbest zijn. Eventuele lekkages of vochtproblemen moeten vooraf worden beoordeeld." },
  { icon: "paint-roller", titel: "Afwerking van de zolder", tekst: "Is jouw zolder al afgewerkt of wil je deze na het isoleren verder afwerken? Bij sommige isolatiesystemen blijven folie en houten latten zichtbaar. Bij het inblazen van isolatie achter bestaande afwerking kunnen vulopeningen nodig zijn. Bespreek daarom vooraf welke afwerking onderdeel is van de werkzaamheden." },
];

// Echte foto's van zolders die Gijs heeft geïsoleerd (aangeleverd via Thom). Bewust de originelen:
// geen AI-bewerking, zodat het echte werkfoto's blijven. Het merk op de folie mag zichtbaar zijn (behalve
// bij de foto met reflecterende folie, zie daar).
const PRAKTIJK_FOTOS: StrookFoto[] = [
  { src: "/images/maatregelen/dakisolatie/praktijk/zolder-voor.jpg", label: "Voor", verhouding: 4 / 3, caption: "De zolder voordat Gijs begon.", alt: "Zolder met houten spanten en witte dakplaten, voor het isoleren" },
  { src: "/images/maatregelen/dakisolatie/praktijk/zolder-na.jpg", label: "Na", verhouding: 4 / 3, caption: "De folie en latten zitten erop, de isolatie zit erachter.", alt: "Dezelfde zolder na het isoleren, met folie en houten latten tegen het dak" },
  { src: "/images/maatregelen/dakisolatie/praktijk/inblazen.jpg", verhouding: 3 / 4, caption: "De isolatie wordt achter de folie ingeblazen.", alt: "Slang die isolatie achter de folie van het dak inblaast" },
  { src: "/images/maatregelen/dakisolatie/praktijk/inblazen-zolder.jpg", verhouding: 4 / 3, caption: "Inblazen via kleine openingen in de folie.", alt: "Zolder met bakstenen gevel en een inblaasslang tegen het geïsoleerde dak" },
  { src: "/images/maatregelen/dakisolatie/praktijk/dakraam.jpg", verhouding: 4 / 3, caption: "De folie sluit aan rond dakraam en schoorsteen.", alt: "Geïsoleerd dak met folie rond een dakraam en een witte schoorsteen" },
  // Op verzoek de versie waarin het merk op de folie met AI is weggehaald (Gemini); het origineel toont een merklogo.
  { src: "/images/maatregelen/dakisolatie/praktijk/reflecterende-folie.jpg", verhouding: 16 / 9, caption: "Bij een ander dak: reflecterende folie-isolatie.", alt: "Schuin dak aan de binnenzijde geïsoleerd met zilverkleurige reflecterende folie" },
  { src: "/images/maatregelen/dakisolatie/praktijk/tijdens-het-werk.jpg", verhouding: 4 / 3, caption: "Tijdens het werk op een zolder die in gebruik is.", alt: "Zolder tijdens het isoleren, met een kast, een bezem en slangen op de vloer" },
];

export function DakisolatiePage({ item }: { item: MeasurePageItem }) {
  const title = "Dakisolatie";
  const sections = [
    { id: "wat-is-het", label: "Wat is het?" },
    { id: "voordelen", label: "Voordelen" },
    { id: "hoe-werkt-het", label: "Hoe werkt het?" },
    { id: "in-de-praktijk", label: "In de praktijk" },
    { id: "materialen", label: "Welke dakisolatie?" },
    { id: "aandachtspunten", label: "Waar let je op?" },
    { id: "subsidie", label: "Subsidie" },
    { id: "veelgestelde-vragen", label: "Veelgestelde vragen" },
  ];

  // FAQ herzien (zie eindverslag in de conversatie voor de volledige
  // broncontrole per vraag). "Hoe verloopt de uitvoering?" is verwijderd:
  // die vraag herhaalde vrijwel woordelijk de iconenrij direct erboven
  // (geen verdieping, pure dubbeling). "Is dakisolatie brandveilig?" is
  // toegevoegd — sourced uit lib/content/dakisolatie-products.ts (HR
  // TimberWool: "Onbrandbaar (brandklasse A1)"); de andere twee systemen
  // claimen dit niet, dus het antwoord noemt bewust alleen TimberWool en
  // beweert niets over WoodFibre/Gijs-Roof. Overige vragen behouden,
  // opnieuw geordend op klantprioriteit (geschiktheid → materialen →
  // voorbereiding → overige).
  const faqItems: FAQItem[] = [
    { question: "Wat is de beste dakisolatie?", answer: "Er is geen isolatiemateriaal dat voor iedere woning de beste keuze is. De dakconstructie, beschikbare ruimte, aanwezige isolatie en jouw persoonlijke wensen bepalen welk isolatiesysteem het meest geschikt is. Gijs werkt met houtvezelisolatie, inblaaswol en reflecterende folie-isolatie." },
    { question: "Is mijn dak geschikt voor dakisolatie?", answer: "Dat hangt af van de bestaande dakconstructie en de staat van het dak. Het dak moet waterdicht, constructief geschikt en vrij van asbest zijn. Gijs beoordeelt dit tijdens de energiescan." },
    { question: "Welke dakisolatie helpt tegen warmte in de zomer?", answer: "Houtvezelisolatie beschikt over een hoog warmteopslagvermogen en kan daardoor bijdragen aan een aangenamere binnentemperatuur tijdens warme zomerdagen. De uiteindelijke werking hangt af van de volledige dakconstructie." },
    { question: "Welke dakisolatie kan ik het beste gebruiken bij weinig ruimte?", answer: "Reflecterende folie-isolatie kan vanwege de relatief geringe materiaaldikte een interessante oplossing zijn. Of dit geschikt is voor jouw woning, hangt af van de bestaande dakconstructie en de benodigde ruimte voor het volledige isolatiesysteem." },
    { question: "Is dakisolatie brandveilig?", answer: "Dat hangt af van het gekozen materiaal. Inblaaswol is bijvoorbeeld onbrandbaar (brandklasse A1). Tijdens de energiescan bekijkt Gijs welk systeem bij jouw dak past." },
    { question: "Kan ik mijn dak isoleren als mijn zolder al is afgewerkt?", answer: "In sommige gevallen kan isolatiemateriaal via openingen in de bestaande afwerking worden ingeblazen. Of dit mogelijk is, hangt af van de dakconstructie en aanwezige isolatie. Houd er rekening mee dat herstel en afwerking afzonderlijke werkzaamheden kunnen zijn." },
    { question: "Wordt de binnenzijde afgewerkt?", answer: "Niet altijd. Bij sommige systemen blijft een folie- en lattenconstructie zichtbaar; de (eind)afwerking is dan voor rekening van de opdrachtgever." },
    { question: "Kan ik mijn dak beter isoleren als er al isolatie aanwezig is?", answer: "Dat hangt af van de aanwezige isolatie en de bestaande dakconstructie. Tijdens een energiescan bekijken we of aanvullende dakisolatie mogelijk is en voldoende meerwaarde heeft voor jouw woning." },
    {
      question: "Kan ik subsidie krijgen voor dakisolatie?",
      answer: "Voor dakisolatie kun je onder bepaalde voorwaarden subsidie ontvangen. Welke subsidies beschikbaar zijn voor jouw woning, ontdek je via de subsidiecheck van Gijs.",
      antwoord: <p>Voor dakisolatie kun je onder bepaalde voorwaarden subsidie ontvangen. Welke subsidies beschikbaar zijn voor jouw woning, ontdek je via de <Link href="/subsidiecheck" className="text-[var(--accent-700)] underline underline-offset-2 hover:text-[var(--gijs-donkergroen)]">subsidiecheck van Gijs</Link>.</p>,
    },
    { question: item.question, answer: item.answer },
    {
      question: "Wat moet ik voorbereiden en waar moet ik rekening mee houden?",
      answer: "Gijs bespreekt dit vooraf met je, zodat je weet waar je aan toe bent. Een paar praktische punten:",
      punten: [...VOORWAARDEN_LINKS, ...VOORWAARDEN_RECHTS],
    },
  ];

  const startScanHref = "/woning?maatregel=" + item.id;

  return (
    <main className="mx-auto px-6" style={{ maxWidth: "var(--container-wide)", paddingBottom: "var(--section-y)" }}>
      <JsonLd data={{
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
          { name: "Home", url: "/" },
          { name: "Maatregelen", url: "/maatregelen" },
          { name: title, url: "/maatregelen/" + item.slug },
        ].map((crumb, i) => ({ "@type": "ListItem", position: i + 1, name: crumb.name, item: SITE_URL + crumb.url })),
      }} />

      <nav aria-label="Broodkruimel" className="flex flex-wrap gap-2 text-sm py-6">
        <Link href="/" className="underline underline-offset-2">Home</Link>
        <span aria-hidden="true">/</span>
        <Link href="/maatregelen" className="underline underline-offset-2">Maatregelen</Link>
        <span aria-hidden="true">/</span>
        <span aria-current="page">{title}</span>
      </nav>

      <MeasureHero overgang={item.slug}
        label="Maatregel"
        title={title}
        subtitle="Meer wooncomfort, minder warmteverlies via het dak"
        intro="Gijs isoleert het dak aan de binnenzijde. Hieronder lees je hoe het werkt, welk systeem bij jouw dakconstructie past en hoe de uitvoering en de energiescan verlopen."
        primaryCta={{ label: "Ik wil mijn woning verduurzamen", href: startScanHref }}
        secondaryCta={{ label: "Vraag een gratis energiescan aan", href: "https://wa.me/31742340777?text=Ik%20wil%20graag%20een%20energiescan%20plannen" }}
        image="/images/maatregelen/dakisolatie/57bfad47-7c34-4f85-80dd-7b3f2f1bf8a4.png"
        imageAlt="Plaatsen van dakisolatie aan de binnenzijde van een woning"
        imageCaption="Isolatiemateriaal wordt tussen de dakconstructie aangebracht"
      />

      {/* Eén gedeelde wrapper om subnav + secties: geeft de sticky subnav
          een containing block met genoeg hoogte om daadwerkelijk te
          blijven "plakken" terwijl je door deze secties scrolt (een
          sticky element binnen een even hoge wrapper zou meteen weer
          "loslaten"). Stopt bewust vóór de laatste CTA-sectie. */}
      <div>
        <MeasureSectionNav sections={sections} />

        <section id="wat-is-het" className="scroll-mt-40 mt-12 mb-14">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:items-center">
        <div className="flex flex-col gap-4">
          <h2 className="text-[var(--fs-display-3)] font-bold text-[var(--gijs-donkergroen)]">Wat is dakisolatie?</h2>
          <p className="text-lg font-medium text-[var(--gijs-donkergroen)]">
            Zie dakisolatie als een muts voor je huis. Een isolatielaag bij het dak helpt de warmte beter binnen
            te houden.
          </p>
          <p className="text-zinc-600">
            Gijs isoleert het dak aan de binnenzijde. Het isolatiemateriaal komt tussen of tegen de bestaande
            dakconstructie. Gijs werkt hiervoor met houtvezel, isolatiewol of een
            reflecterend foliesysteem.
          </p>
          <p className="text-zinc-600">
            Bij sommige systemen blijft een folie- en lattenconstructie zichtbaar; de (eind)afwerking van de
            binnenzijde is dan een apart punt, voor rekening van de opdrachtgever.
          </p>
          <p className="text-zinc-600">
            Welk systeem past, hangt af van de bestaande dakconstructie en de staat van het dak. Daar hoef je zelf
            niet technisch uit te komen: tijdens een energiescan aan huis bekijkt een expert van Gijs je dak en
            bespreekt welke oplossing past.
          </p>
        </div>
        <div className="rounded-[var(--radius-card)] overflow-hidden bg-[var(--surface-muted)]">
          {/* PNG vervangen door SVG: zelfde crop/inhoud (ratio geverifieerd),
              de opdrachtgever heeft alleen de hoekafronding van de
              labels/badges aangepast (uitlegvisuals.zip). */}
          <Image
            src="/images/maatregelen/dakisolatie/dakisolatie-uitlegvisual.svg"
            alt="Uitleg van dakpannen, isolatiemateriaal, dakconstructie en binnenafwerking bij dakisolatie"
            width={5969}
            height={2744}
            quality={100}
            className="w-full h-auto"
          />
        </div>
        </div>

        <Card variant="tint" className="mt-8 flex flex-col md:flex-row md:items-center gap-6 !p-8">
          <div className="md:flex-1 flex flex-col gap-1">
            <h3 className="font-bold text-lg text-[var(--gijs-donkergroen)]">Past dakisolatie bij mijn woning?</h3>
            <p className="text-sm text-zinc-600">Tijdens de energiescan wordt beoordeeld welke toepassing bij de bestaande dakconstructie mogelijk is.</p>
          </div>
          <ul className="md:flex-[1.6] grid grid-cols-1 sm:grid-cols-3 gap-3">
            <li className="flex items-start gap-2 text-sm text-zinc-700">
              <Icon name="search" size="sm" className="mt-0.5 text-[var(--accent-600)] shrink-0" />
              <span>De bestaande dakconstructie en staat van het dak</span>
            </li>
            <li className="flex items-start gap-2 text-sm text-zinc-700">
              <Icon name="search" size="sm" className="mt-0.5 text-[var(--accent-600)] shrink-0" />
              <span>De bereikbaarheid en eventueel al aanwezige isolatie</span>
            </li>
            <li className="flex items-start gap-2 text-sm text-zinc-700">
              <Icon name="search" size="sm" className="mt-0.5 text-[var(--accent-600)] shrink-0" />
              <span>De eventuele binnenafwerking is een apart aandachtspunt</span>
            </li>
          </ul>
          <Button href={startScanHref} variant="accent" className="shrink-0">Ik wil mijn woning verduurzamen</Button>
        </Card>
      </section>

      <section id="voordelen" className="scroll-mt-40 mb-14">
        <h2 className="text-[var(--fs-display-3)] font-bold text-[var(--gijs-donkergroen)] mb-6">De voordelen</h2>
        <FeatureList columns={2} items={VOORDELEN} />
      </section>

      <section id="hoe-werkt-het" className={`scroll-mt-40 ${HOOFDSTUK_MB}`}>
        <h2 className="text-[var(--fs-display-3)] font-bold text-[var(--gijs-donkergroen)] mb-2">Hoe verloopt de uitvoering?</h2>
        <p className="text-zinc-600 mb-10 max-w-2xl">Gijs werkt volgens een vaste aanpak. Zo weet je precies wat je kunt verwachten.</p>
        <DakisolatieInstallatieAnimatie />
      </section>

      <section id="in-de-praktijk" className={`scroll-mt-40 ${HOOFDSTUK_MB}`}>
        <h2 className="text-[var(--fs-display-3)] font-bold text-[var(--gijs-donkergroen)] mb-2">Zo ziet het eruit</h2>
        <p className="text-zinc-600 mb-8 max-w-2xl">
          Foto&apos;s van zolders die Gijs aan de binnenzijde heeft geïsoleerd. De folie en latten blijven zichtbaar; de
          afwerking daarna is een apart punt.
        </p>
        <FotoStrook fotos={PRAKTIJK_FOTOS} />
      </section>

      <section id="materialen" className="scroll-mt-40 mb-14">
        <h2 className="text-[var(--fs-display-3)] font-bold text-[var(--gijs-donkergroen)] mb-3">Welke dakisolatie past bij jouw huis?</h2>
        <div className="flex flex-col gap-4 mb-8 max-w-3xl text-zinc-600">
          <p>
            Wil je jouw dak laten isoleren, maar weet je niet goed welk isolatiemateriaal je moet kiezen? Misschien wil je
            vooral besparen op je energierekening, wordt het in de zomer erg warm op zolder of heb je last van geluiden van
            buitenaf. Hoewel ieder isolatiemateriaal zijn eigen eigenschappen heeft, betekent dit niet dat het ene materiaal
            voor iedere woning beter is dan het andere. De beste dakisolatie is uiteindelijk de isolatie die aansluit bij
            jouw dakconstructie, beschikbare ruimte en persoonlijke wensen.
          </p>
          <p>
            Bij Gijs werken we met verschillende isolatiesystemen. We kijken daarom eerst naar jouw woning voordat we bepalen
            welk materiaal het meest geschikt is.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {DAK_PRODUCTS.map(product => (
            <MaterialCard
              key={product.name}
              name={product.name}
              description={product.text}
              benefits={product.benefits}
              image={product.image}
              imageAlt={product.alt}
              badge={product.product}
              className="!p-5 sm:!p-6"
            />
          ))}
        </div>

        {/* Technische vergelijking: desktop als tabel (zelfde stijl als op de warmtepomppagina), mobiel
            per materiaal een kaart. Eén bron: DAK_VERGELIJKING. */}
        <h3 className="mt-14 mb-2 font-bold text-2xl text-[var(--gijs-donkergroen)]">Verschillende soorten dakisolatie vergelijken</h3>
        <p className="text-zinc-600 mb-6 max-w-3xl">
          De eigenschappen hieronder komen uit de productbladen. Hoe goed een dak uiteindelijk isoleert, hangt af van de
          volledige dakconstructie en de uitvoering, niet alleen van het materiaal.
        </p>
        <div className="hidden md:block overflow-x-auto rounded-[var(--radius-lg)] border border-[var(--border-default)] bg-white">
          <table className="w-full text-left border-collapse">
            <caption className="sr-only">Vergelijking van HR WoodFibre, HR TimberWool en HR Gijs-Roof per eigenschap</caption>
            <thead>
              <tr className="border-b border-[var(--border-default)]">
                <th scope="col" className="px-5 py-3.5 text-sm font-bold text-[var(--gijs-donkergroen)]">Eigenschap</th>
                {DAK_PRODUCTS.map(p => (
                  <th key={p.product} scope="col" className="px-5 py-3.5 text-sm font-bold text-[var(--gijs-donkergroen)]">
                    {p.product}<span className="block text-[13px] font-medium text-zinc-500">{p.name}</span>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--border-default)]">
              {DAK_VERGELIJKING.map(r => (
                <tr key={r.eigenschap}>
                  <th scope="row" className="px-5 py-3 text-[15px] font-bold text-[var(--gijs-donkergroen)] align-top">{r.eigenschap}</th>
                  {r.waarden.map((w, i) => (
                    <td key={i} className={"px-5 py-3 text-[15px] align-top " + (w.startsWith("Niet ") ? "text-zinc-400" : "text-zinc-700")}>{w}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <ul className="md:hidden flex flex-col gap-4">
          {DAK_PRODUCTS.map((p, i) => (
            <li key={p.product} className="rounded-[var(--radius-lg)] border border-[var(--border-default)] bg-white px-5 py-4">
              <p className="font-bold text-[var(--gijs-donkergroen)]">{p.product}<span className="ml-2 text-[14px] font-medium text-zinc-500">{p.name}</span></p>
              <dl className="mt-2 divide-y divide-[var(--border-default)] text-[14px]">
                {DAK_VERGELIJKING.map(r => (
                  <div key={r.eigenschap} className="grid grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)] gap-3 py-2">
                    <dt className="text-zinc-600">{r.eigenschap}</dt>
                    <dd className={r.waarden[i].startsWith("Niet ") ? "text-zinc-400" : "text-zinc-800"}>{r.waarden[i]}</dd>
                  </div>
                ))}
              </dl>
            </li>
          ))}
        </ul>
        <p className="text-sm text-zinc-500 mt-3 max-w-3xl">
          Brandklasse, vochtgedrag en recyclebaarheid zijn eigenschappen van het materiaal zelf; hoe je dak uiteindelijk
          presteert, hangt af van de volledige dakopbouw. &quot;Niet gespecificeerd&quot; betekent dat het productblad deze
          eigenschap niet noemt, niet dat het materiaal de eigenschap mist. Geen van de drie is in het algemeen de beste keuze.
        </p>

        {/* Keuzehulp vanuit de woningeigenaar. Eén bron: DAK_KEUZEHULP. */}
        <h3 className="mt-14 mb-2 font-bold text-2xl text-[var(--gijs-donkergroen)]">Welke dakisolatie kun je het beste gebruiken?</h3>
        <p className="text-zinc-600 mb-6 max-w-3xl">
          Het beste isolatiemateriaal is afhankelijk van wat je wilt bereiken en de mogelijkheden van jouw woning. Onderstaand
          overzicht helpt je om de verschillende oplossingen met elkaar te vergelijken.
        </p>
        <div className="hidden sm:block overflow-x-auto rounded-[var(--radius-lg)] border border-[var(--border-default)] bg-white">
          <table className="w-full text-left border-collapse min-w-[560px]">
            <caption className="sr-only">Welke dakisolatie past bij welke situatie of wens</caption>
            <thead>
              <tr className="border-b border-[var(--border-default)]">
                <th scope="col" className="px-5 py-3.5 text-sm font-bold text-[var(--gijs-donkergroen)]">Jouw situatie of wens</th>
                <th scope="col" className="px-5 py-3.5 text-sm font-bold text-[var(--gijs-donkergroen)]">Interessante oplossing</th>
                <th scope="col" className="px-5 py-3.5 text-sm font-bold text-[var(--gijs-donkergroen)]">Waarom?</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--border-default)]">
              {DAK_KEUZEHULP.map(r => (
                <tr key={r.situatie}>
                  <th scope="row" className="px-5 py-3 text-[15px] font-semibold text-[var(--gijs-donkergroen)] align-top">{r.situatie}</th>
                  <td className="px-5 py-3 text-[15px] font-semibold text-[var(--accent-700)] align-top whitespace-nowrap">{r.oplossing}</td>
                  <td className="px-5 py-3 text-[15px] text-zinc-700 align-top">{r.waarom}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <ul className="sm:hidden divide-y divide-[var(--border-default)] rounded-[var(--radius-lg)] border border-[var(--border-default)] bg-white px-5">
          {DAK_KEUZEHULP.map(r => (
            <li key={r.situatie} className="py-4">
              <p className="font-semibold text-[var(--gijs-donkergroen)]">{r.situatie}</p>
              <p className="mt-1 text-[15px] font-semibold text-[var(--accent-700)]">{r.oplossing}</p>
              <p className="text-[14px] text-zinc-600">{r.waarom}</p>
            </li>
          ))}
        </ul>
        <div className="mt-6 flex flex-col gap-4 max-w-3xl">
          <p className="text-zinc-600">
            Hoewel een bepaald isolatiemateriaal goed bij jouw wensen kan aansluiten, betekent dit niet automatisch dat het
            geschikt is voor jouw dak. Ook de bestaande dakconstructie, aanwezige isolatie en beschikbare ruimte spelen een
            belangrijke rol. Tijdens een energiescan kijkt Gijs daarom welke oplossing daadwerkelijk bij jouw woning past.
          </p>
          <WhatsAppTrackedButton plaats="maatregelpagina_keuzehulp" href={ENERGIESCAN_HREF} variant="secondary" iconRight="arrow-right" className="self-start">Vraag een gratis energiescan aan</WhatsAppTrackedButton>
        </div>
      </section>

      <section id="aandachtspunten" className={`scroll-mt-40 ${HOOFDSTUK_MB}`}>
        <h2 className="text-[var(--fs-display-3)] font-bold text-[var(--gijs-donkergroen)] mb-6">Waar moet je op letten bij het kiezen van dakisolatie?</h2>
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-5">
          {AANDACHTSPUNTEN.map(a => (
            <li key={a.titel} className="flex flex-col gap-3 rounded-[var(--radius-lg)] border border-[var(--border-default)] bg-white p-6 sm:p-7">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--surface-tint)] text-[var(--accent-700)]">
                <Icon name={a.icon} size="md" />
              </span>
              <h3 className="font-bold text-lg text-[var(--gijs-donkergroen)]">{a.titel}</h3>
              <p className="text-[15px] leading-relaxed text-zinc-600">{a.tekst}</p>
            </li>
          ))}
        </ul>
      </section>

      <SubsidieSectie titel="Subsidie bij dakisolatie" extra={<>
        Voor ISDE-subsidie op dakisolatie geldt onder meer een minimum van 20 m² en een minimale Rd-waarde van 3,5. Bekijk
        de actuele{" "}
        <a href="https://www.rvo.nl/subsidies-financiering/isde/woningeigenaren/isolatiemaatregelen" target="_blank" rel="noopener noreferrer" className="underline text-[var(--accent-700)] hover:text-[var(--gijs-donkergroen)]">
          voorwaarden voor isolatiemaatregelen bij RVO<span className="sr-only"> (opent in nieuw tabblad)</span>
        </a>.
      </>} />

      <section id="beste-investering" className={`scroll-mt-40 ${HOOFDSTUK_MB}`}>
        <Card variant="tint" className="flex flex-col gap-4 !p-7 md:!p-10">
          <h2 className="text-[var(--fs-display-3)] font-bold text-[var(--gijs-donkergroen)]">Is dakisolatie de beste investering voor jouw woning?</h2>
          <div className="flex flex-col gap-4 max-w-3xl text-zinc-700">
            <p>
              Wanneer je jouw dak wilt isoleren, wil je natuurlijk dat deze investering zoveel mogelijk oplevert. Misschien
              verlies je echter meer warmte via je{" "}
              <Link href="/maatregelen/spouwmuurisolatie" className="underline text-[var(--accent-700)] hover:text-[var(--gijs-donkergroen)]">buitenmuren</Link>,{" "}
              <Link href="/maatregelen/vloerisolatie" className="underline text-[var(--accent-700)] hover:text-[var(--gijs-donkergroen)]">vloer</Link> of{" "}
              <Link href="/maatregelen/isolatieglas" className="underline text-[var(--accent-700)] hover:text-[var(--gijs-donkergroen)]">ramen</Link>{" "}
              en kun je beter beginnen met een andere isolatiemaatregel. Het is daarom belangrijk om niet alleen naar de
              mogelijkheden van je dak te kijken, maar naar jouw gehele woning.
            </p>
            <p>
              Tijdens een gratis energiescan brengt Gijs de verduurzamingsmogelijkheden van jouw woning in kaart. Blijkt
              dakisolatie een verstandige investering te zijn? Dan bekijken we welk isolatiesysteem het beste bij jouw
              dakconstructie en wensen past. Vervolgens kunnen we ook de uitvoering voor je verzorgen.
            </p>
            <p className="font-medium text-[var(--gijs-donkergroen)]">
              Zo investeer je niet zomaar in dakisolatie, maar in de maatregelen die voor jouw woning daadwerkelijk meerwaarde
              hebben.
            </p>
          </div>
          <Button href={startScanHref} variant="accent" iconRight="arrow-right" className="self-start mt-2">Ik wil mijn woning verduurzamen</Button>
        </Card>
      </section>

      <section id="kennis" className={`scroll-mt-40 ${HOOFDSTUK_MB}`}>
        <h2 className="text-[var(--fs-display-3)] font-bold text-[var(--gijs-donkergroen)] mb-6">Meer weten? Lees meer!</h2>
        <ArtikelKaarten slugs={["waarom-blijft-mijn-huis-koud", "vochtige-kruipruimte-isoleren", "uf-schuim-spouwmuurisolatie-risicos-alternatieven"]} compact />
      </section>

      <section id="veelgestelde-vragen" className={`scroll-mt-40 mb-10 sm:mb-14 lg:mb-16 ${HOOFDSTUK_DIVIDER}`}>
        <h2 className="text-[var(--fs-display-3)] font-bold text-[var(--gijs-donkergroen)] mb-6">Veelgestelde vragen</h2>
        <div className="grid grid-cols-1 md:grid-cols-[7fr_3fr] gap-8 items-start">
          <div>
            <FAQAccordion
              items={faqItems}
              className="[&_.gijs-accordion__trigger]:py-6 [&_.gijs-accordion__trigger]:text-base md:[&_.gijs-accordion__trigger]:text-lg"
            />
            <Link href="/kennis#veelgestelde-vragen" className="mt-4 text-sm font-semibold text-[var(--accent-700)] hover:text-[var(--gijs-donkergroen)] inline-flex items-center gap-1 no-underline">
              Bekijk alle veelgestelde vragen <Icon name="arrow-right" size="sm" />
            </Link>
          </div>
          <Card variant="tint" className="flex flex-col gap-4">
            <h3 className="font-bold text-lg text-[var(--gijs-donkergroen)]">Nog een vraag?</h3>
            <p className="text-sm text-zinc-600">
              Kom je er niet helemaal uit? Bespreek het tijdens een gratis energiescan of neem direct contact op.
            </p>
            <WhatsAppTrackedButton plaats="maatregelpagina_faq_kaart" href="https://wa.me/31742340777?text=Ik%20wil%20graag%20een%20energiescan%20plannen" variant="secondary">Vraag een gratis energiescan aan</WhatsAppTrackedButton>
            <a href={CONTACT.phoneHref} className="text-sm font-semibold text-[var(--green-800)] no-underline hover:underline">
              Bel {CONTACT.phone}
            </a>
          </Card>
        </div>
      </section>
      </div>

      <MeasureCta
        titel="Past dakisolatie bij jouw woning?"
        tekst="Je dak laten isoleren? Vraag gratis en vrijblijvend persoonlijk advies aan."
        primaryHref={startScanHref}
      />

      <MeasureRegioLink voorbeeld={[
        "Dakisolatie in je eigen gemeente? In Apeldoorn is 46% van de woningen gebouwd vóór 1975. Lees wat ",
        { tekst: "dakisolatie in Apeldoorn", href: "/regio/gelderland/apeldoorn#isoleren" },
        " daar betekent.",
      ]} regios={{
        kop: "Dakisolatie in de regio",
        links: [
          { tekst: "Dakisolatie in Kampen", href: "/regio/overijssel/kampen#isoleren" },
          { tekst: "Het dak isoleren in Almelo", href: "/regio/overijssel/almelo#isoleren" },
          { tekst: "Dakisolatie in Enschede", href: "/regio/overijssel/enschede#lokaal" },
          { tekst: "Bijisoleren van het dak in Zeewolde", href: "/regio/flevoland/zeewolde#isoleren" },
          { tekst: "Dak en spouw in Doetinchem", href: "/regio/gelderland/doetinchem#isoleren" },
        ],
      }} />
    </main>
  );
}
