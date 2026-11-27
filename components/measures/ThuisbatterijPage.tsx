import Image from "next/image";
import Link from "next/link";
import { titelOvergang } from "@/lib/overgang";
import { FotoOvergang } from "@/components/FotoOvergang";
import { JsonLd } from "@/components/SeoSchema";
import { SITE_URL, ENERGIESCAN_HREF } from "@/lib/seo";
import { CONTACT } from "@/lib/content/contact";
import { SIGENSTOR } from "@/lib/content/thuisbatterij-producten";
import { Button } from "@/components/ds/core/Button";
import { Icon } from "@/components/ds/core/Icon";
import { WhatsAppTrackedButton } from "@/components/regio/WhatsAppTrackedButton";
import { RegioBreadcrumb, RegioMain, H2 } from "@/components/regio/RegioBlokken";
import { AdviseurFoto, ADVISEUR_FOTO } from "@/components/regio/VerhaalSecties";
import {
  EYEBROW, SECTIE_BASE, LEAD, TEKST, WIT_BLOK, GRIJS_BLOK, HERO_H1, HERO_INTRO, GijsWatermark,
  RASTER, RASTER_CEL, TEKSTLINK, H3_GROOT, KAARTKOP, KAARTTEKST, Kop,
} from "@/components/regio/regio-template-styles";
import regioStyles from "@/components/regio/regio.module.css";
import { ArtikelKaarten } from "@/components/kennis/ArtikelKaarten";
import { MeasureSectionNav } from "@/components/measures/MeasureSectionNav";
import { MeasureRegioLink } from "@/components/measures/MeasureRegioLink";
import { ThuisbatterijInstallatieAnimatie } from "@/components/measures/ThuisbatterijInstallatieAnimatie";
import { FAQAccordion, type FAQItem } from "@/components/measures/FAQAccordion";
import { TechnicalDetails, TechnicalDetailRow } from "@/components/measures/TechnicalDetails";
import { GoogleScore } from "@/components/reviews/GoogleScore";
import { GoogleReviewsSectie } from "@/components/reviews/GoogleReviewsSectie";
import type { MEASURE_PAGES } from "@/lib/content/measure-pages";

type MeasurePageItem = (typeof MEASURE_PAGES)[number];

// Thuisbatterijpagina in de stijl van de warmtepomp- en ketelpagina (27-11-2026), met het
// waarschuwingsblok "Pas op met mooie beloftes" van Max.
//
// BRONNEN:
// - "alle_brochures_in_1.pdf" (p. 2-3): plaatsing in één dag (ThuisbatterijInstallatieAnimatie)
//   en de voorwaarden voor en tijdens de installatie (VOORWAARDEN_VOOR/_TIJDENS).
// - "Sigenergy Infoblad.pdf": productkenmerken, werkmodi, veiligheid en de onderdelen
//   (EMS/batterijpakket/EV-oplader/batterij-PCS/PV-omvormer), zie lib/content/thuisbatterij-producten.ts.
// - thuisbatterij-uitlegvisual-v3.png: door Gijs aangeleverde uitlegvisual (stappen 1 t/m 6).
//
// INHOUDELIJKE AFSPRAKEN:
// - Het infoblad bevat geen capaciteit (kWh), afmetingen, prijs of garantie: niet op de pagina.
// - Geen besparingen, terugverdientijden of prijzen.
// - Geen subsidiesectie: er is geen thuisbatterij-specifieke regeling in de bronnen.
// - Back-up nooit als belofte: niet iedere thuisbatterij ondersteunt dit.

const SECTIE = `${SECTIE_BASE} ${regioStyles.opkomen}`;

const VOORWAARDEN_VOOR = [
  "Zorg voor voldoende parkeergelegenheid zo dicht mogelijk bij je woning.",
  "Er wordt een omvormer geplaatst; zorg voor voldoende werkruimte hiervoor.",
  "Het installatieteam moet vaak door het huis naar boven; zorg dat dit overal toegankelijk is.",
  "Zorg dat er een toilet beschikbaar is voor het installatieteam.",
];
const VOORWAARDEN_TIJDENS = [
  "Blijf je thuis werken? Het monteren kan wat lawaai met zich meebrengen.",
  "Er worden gaten geboord door de gevels voor het aanleggen van kabels.",
  "Kabels lopen naar de meterkast, zoveel mogelijk uit het zicht (niet altijd te garanderen).",
  "Het systeem wordt werkend opgeleverd; wees aanwezig voor de app-uitleg.",
];

const VOORDELEN = [
  { icon: "sun", title: "Zelf opgewekte stroom bewaren", text: "Bewaar zonnestroom om op een later moment te gebruiken." },
  { icon: "battery-charging", title: "Elektrisch voertuig opladen", text: "Het systeem is V2X-ready. Met een geschikte auto en de benodigde systeemonderdelen kun je je EV vanuit de batterij laden." },
  { icon: "shield-check", title: "Mogelijke back-up bij storing", text: "Afhankelijk van je systeem en aansluiting; niet elke thuisbatterij ondersteunt dit." },
  { icon: "leaf", title: "Mogelijk een kleinere koolstofvoetafdruk", text: "Minder afhankelijk van het elektriciteitsnet op piekmomenten. Of je CO₂ bespaart, hangt af van hoe en wanneer de batterij laadt en waar die stroom vandaan komt." },
];

const ONDERDELEN = [
  { icon: "cpu", title: "Slimme aansturing", technisch: "EMS", text: "Regelt wanneer stroom wordt gebruikt of opgeslagen." },
  { icon: "battery-full", title: "Thuisbatterij", technisch: "Batterijpakket", text: "Hier wordt de elektriciteit opgeslagen." },
  { icon: "car", title: "Elektrische auto laden", technisch: "EV-oplader", text: "De installatie kan worden gekoppeld aan het laden van een elektrische auto." },
  { icon: "zap", title: "Stroom omzetten", technisch: "Batterij-PCS", text: "Maakt de opgeslagen stroom bruikbaar voor de woning." },
  { icon: "sun", title: "Zonnestroom bruikbaar maken", technisch: "PV-omvormer", text: "Verbindt de batterij met je zonnepanelen." },
];

const PAST_HET = [
  "Je energiegebruik en wat je wilt bereiken",
  "Voldoende werkruimte voor de omvormer",
  "Of een back-upfunctie mogelijk en wenselijk is",
  "De locatie en bereikbaarheid van de meterkast",
];

// Bestaande, goedgekeurde Gijs-foto's: dezelfde beelden als op de betreffende maatregelpagina's.
const ANDERE_STAPPEN = [
  { titel: "Zonnepanelen", tekst: "Met zonnepanelen wek je zelf stroom op. Hoe meer je daarvan direct gebruikt, hoe minder je hoeft op te slaan.", href: "/maatregelen/zonnepanelen",
    foto: "/images/maatregelen/zonnepanelen/zonnepanelen-schuin-dak.jpg", alt: "Zonnepanelen op het schuine pannendak van een woning" },
  { titel: "Warmtepomp", tekst: "Een warmtepomp verbruikt zelf stroom. Daarmee kun je meer van je eigen zonnestroom benutten.", href: "/maatregelen/warmtepomp",
    foto: "/images/maatregelen/warmtepomp/warmtepomp-hero.png", alt: "Een installateur van Gijs plaatst een warmtepomp tegen de gevel van een woning" },
  { titel: "Dakisolatie", tekst: "Met dakisolatie houd je warmte binnen, zodat je minder energie nodig hebt om je huis warm te houden.", href: "/maatregelen/dakisolatie",
    foto: "/images/maatregelen/dakisolatie/57bfad47-7c34-4f85-80dd-7b3f2f1bf8a4.png", alt: "Dakisolatie wordt tussen de dakconstructie aangebracht" },
  { titel: "Isolatieglas", tekst: "Isolatieglas vermindert warmteverlies en verhoogt het comfort bij het raam.", href: "/maatregelen/isolatieglas",
    foto: "/images/maatregelen/glas/isolatieglas.png", alt: "Monteur van Gijs plaatst isolatieglas in een raam" },
];

export function ThuisbatterijPage({ item }: { item: MeasurePageItem }) {
  const startScanHref = "/woning?maatregel=" + item.id;

  const faqItems: FAQItem[] = [
    { question: "Wat is een thuisbatterij?", answer: "Een thuisbatterij slaat elektriciteit op, zodat je deze op een later moment kunt gebruiken. Je energiegebruik en wat je wilt bereiken vormen het vertrekpunt voor het advies." },
    { question: "Welke thuisbatterij gebruikt Gijs?", answer: "Gijs plaatst een modulaire en stapelbare thuisbatterij." },
    { question: "Heb ik met een thuisbatterij altijd stroom bij een storing?", answer: item.answer },
    { question: "Kan ik mijn elektrische auto opladen vanuit de thuisbatterij?", answer: "De thuisbatterij die Gijs plaatst is V2X-ready: het systeem is voorbereid op bidirectioneel laden en ontladen. Of dat bij jou werkt, hangt af van je auto en van de benodigde systeemonderdelen. Gijs bekijkt dit met je tijdens de energiescan." },
    { question: "Wat betekent V2X?", answer: "V2X staat voor bidirectioneel laden en ontladen. Een geschikte elektrische auto kan dan niet alleen stroom opladen, maar ook weer terugleveren, bijvoorbeeld aan je woning. Dat kan alleen als de auto dit ondersteunt en de benodigde systeemonderdelen aanwezig zijn." },
    { question: "Is er subsidie voor een thuisbatterij?", answer: "Nee, er is geen landelijke ISDE-subsidie voor thuisbatterijen. De ISDE-regeling geldt onder meer wel voor isolatie en warmtepompen." },
    { question: "Werkt de thuisbatterij samen met zonnepanelen?", answer: "Ja. De batterij slaat je zelf opgewekte zonnestroom op en regelt automatisch wanneer die wordt opgeslagen of gebruikt, zodat je energieverbruik thuis wordt gecompenseerd met je eigen zonne-energie." },
    { question: "Hoe verloopt de installatie?", answer: "Gijs plaatst de thuisbatterij in één dag: aankomst, uitleg, voorbereiding, de batterij plaatsen en aansluiten, het systeem instellen en controleren, en opleveren." },
    { question: "Wat moet ik regelen voordat de installatie begint?", answer: "Gijs bespreekt dit vooraf met je, zodat je weet waar je aan toe bent. Een paar praktische punten:", punten: VOORWAARDEN_VOOR },
    { question: "Wat gebeurt er tijdens de installatie?", answer: "Goed om te weten voor de dag zelf:", punten: VOORWAARDEN_TIJDENS },
  ];

  return (
    <RegioMain>
      <RegioBreadcrumb crumbs={[
        { naam: "Home", url: "/" },
        { naam: "Maatregelen", url: "/maatregelen" },
        { naam: "Thuisbatterij", url: "/maatregelen/" + item.slug },
      ]} />

      {/* Het FAQPage-schema komt uit FAQAccordion zelf, dus niet hier nogmaals. */}
      <JsonLd data={{
        "@context": "https://schema.org",
        "@type": "Service",
        name: "Thuisbatterij plaatsen",
        serviceType: "Plaatsen van een thuisbatterij",
        description: "Gijs kijkt onafhankelijk of een thuisbatterij bij je woning past en verzorgt ook de plaatsing: één aanspreekpunt van advies tot oplevering.",
        url: SITE_URL + "/maatregelen/" + item.slug,
        provider: { "@id": SITE_URL + "/#organization" },
        areaServed: { "@type": "Country", name: "Nederland" },
      }} />

      <header className="pt-2 lg:pt-6 mb-14 md:mb-20">
        <p className={EYEBROW + " mb-4"}>Thuisbatterij</p>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 lg:items-stretch">
          <div className="flex flex-col gap-5">
            <h1 className={HERO_H1} style={titelOvergang("maatregel-" + item.slug)}>Thuisbatterij voor jouw woning</h1>
            <p className={HERO_INTRO}>
              Een thuisbatterij slaat elektriciteit op, zodat je die later kunt gebruiken. Je energiegebruik en wat je
              wilt bereiken vormen het vertrekpunt voor het advies. Gijs kijkt eerst of een thuisbatterij bij je woning
              past en regelt daarna ook de plaatsing.
            </p>
            <GoogleScore />
            <div className="flex flex-wrap items-center gap-3">
              <WhatsAppTrackedButton plaats="maatregelpagina_hero" href={ENERGIESCAN_HREF} size="lg" iconRight="arrow-right">Vraag een gratis energiescan aan</WhatsAppTrackedButton>
            </div>
            <p className="text-[15px] leading-relaxed text-[var(--text-muted)]">
              <Link href="/contact" className={TEKSTLINK}>Neem contact op</Link>, of bel{" "}
              <a href={CONTACT.phoneHref} className={TEKSTLINK}>{CONTACT.phone}</a>.
            </p>
          </div>
          <figure className="m-0 group/hero">
            <FotoOvergang id={"maatregel-" + item.slug}>
              <div className="relative aspect-[3/2] lg:aspect-auto lg:h-full overflow-hidden rounded-[var(--radius-xl)] bg-[var(--grey-050)]">
                <Image src="/images/maatregelen/thuisbatterij/thuisbatterij-hero-v2.png"
                  alt="Een Gijs-installateur sluit een thuisbatterij aan" fill priority
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover transition-transform duration-700 ease-out will-change-transform group-hover/hero:scale-[1.03]" />
              </div>
            </FotoOvergang>
          </figure>
        </div>
      </header>

      <MeasureSectionNav tweeRegelsMobiel sections={[
        { id: "waarom-gijs", label: "Waarom Gijs" },
        { id: "wat-is-het", label: "Wat is het?" },
        { id: "voordelen", label: "Voordelen" },
        { id: "plaatsen", label: "Plaatsen" },
        { id: "let-op", label: "Let op" },
        { id: "de-thuisbatterij", label: "De thuisbatterij" },
        { id: "veelgestelde-vragen", label: "Vragen" },
      ]} />

      <section id="waarom-gijs" className={SECTIE + " mt-8 lg:mt-12"}>
        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)] gap-8 lg:gap-14 items-stretch">
          <div className="flex flex-col gap-4 max-w-3xl">
            <p className={EYEBROW}>Waarom Gijs?</p>
            <h2 className={H2}>Waarom een thuisbatterij via Gijs?</h2>
            <p className={TEKST}>
              Of een thuisbatterij bij je past, hangt af van je energiegebruik en wat je wilt bereiken. Daar hoef je zelf
              niet technisch uit te komen. Tijdens een energiescan aan huis bekijkt een adviseur van Gijs hoe je stroom
              opwekt en gebruikt, en bespreekt welke oplossing past. Soms levert een andere maatregel meer op, en dat
              hoor je dan ook.
            </p>
            <p className={TEKST}>
              Kies je voor een thuisbatterij? Dan verzorgen we ook de plaatsing. Je hebt één aanspreekpunt, van het advies
              tot de oplevering.
            </p>
          </div>

          <aside aria-labelledby="naud-titel" className="flex flex-col gap-5 rounded-[var(--radius-lg)] bg-[var(--accent-100)] p-6 sm:p-8">
            <div className="flex items-center gap-4">
              <AdviseurFoto src={ADVISEUR_FOTO.naud.src} alt={ADVISEUR_FOTO.naud.alt} className="size-20 sm:size-24" />
              <h3 id="naud-titel" className="text-[19px] font-semibold leading-snug tracking-[-0.015em] text-[var(--gijs-donkergroen)]">Naud helpt je graag!</h3>
            </div>
            <p className="text-[15px] leading-relaxed text-zinc-700 [text-wrap:pretty]">
              Hij komt bij je thuis langs, kijkt samen met je naar je woning en vertelt je eerlijk wat er mogelijk is, ook
              als een andere stap eerst slimmer is.
            </p>
            <p className="text-[15px] leading-relaxed text-zinc-700 [text-wrap:pretty]">
              Hij kijkt onafhankelijk naar jouw woning, is je aanspreekpunt en geeft je advies. Hierbij regelt hij ook de
              uitvoering.
            </p>
            <div className="mt-auto flex flex-wrap items-center gap-x-4 gap-y-2">
              <WhatsAppTrackedButton plaats="maatregelpagina_waarom_gijs" href={ENERGIESCAN_HREF} size="md" iconRight="arrow-right">Vraag een gratis energiescan aan</WhatsAppTrackedButton>
              <p className="text-[15px] text-zinc-700">
                of <Link href="/contact" className={TEKSTLINK}>neem contact op</Link>
              </p>
            </div>
          </aside>
        </div>

        <div className="mt-14 lg:mt-16">
          <h3 className={H3_GROOT}>Soms is een andere stap slimmer</h3>
          <p className={LEAD + " mt-3 mb-8"}>We kijken wat jouw woning nodig heeft en kunnen die maatregelen ook voor je uitvoeren.</p>
          {/* Onder 480px compact: kleine foto links, tekst rechts, zodat vier kaarten geen lange strook worden. */}
          <ul className="grid grid-cols-1 min-[480px]:grid-cols-2 lg:grid-cols-4 gap-3 min-[480px]:gap-4 lg:gap-5">
            {ANDERE_STAPPEN.map(stap => (
              <li key={stap.titel} className="flex flex-row min-[480px]:flex-col overflow-hidden rounded-[var(--radius-lg)] border border-[var(--border-default)] bg-white">
                <div className="relative w-28 shrink-0 min-[480px]:w-auto min-[480px]:aspect-[4/3] bg-[var(--grey-050)]">
                  <Image src={stap.foto} alt={stap.alt} fill sizes="(max-width: 480px) 112px, (max-width: 1024px) 50vw, 25vw" className="object-cover" />
                </div>
                <div className="flex flex-1 flex-col gap-1.5 min-[480px]:gap-2 p-4 min-[480px]:p-5">
                  <h4 className={KAARTKOP}>{stap.titel}</h4>
                  <p className={KAARTTEKST}>{stap.tekst}</p>
                  <Link href={stap.href} className="mt-auto inline-flex items-center gap-1 pt-1 text-[15px] font-semibold text-[var(--accent-700)] no-underline hover:text-[var(--gijs-donkergroen)]">
                    Lees meer<span className="sr-only"> over {stap.titel.toLowerCase()}</span> <Icon name="arrow-right" size="sm" />
                  </Link>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <GoogleReviewsSectie className={SECTIE} titel="Ervaringen met Gijs"
        intro="Lees hoe andere woningeigenaren de begeleiding, het advies en de uitvoering door Gijs hebben ervaren." />

      <section id="wat-is-het" className={SECTIE}>
        <div className={GRIJS_BLOK}>
          <div className="grid gap-10 lg:grid-cols-2 lg:items-start mb-10">
            <div className="flex flex-col gap-4">
              <div className="flex">
                <div className="flex flex-col gap-4">
                  <p className={EYEBROW}>Uitleg</p>
                  <h2 className={H2}>Wat is een thuisbatterij?</h2>
                </div>
                <GijsWatermark />
              </div>
              <p className={LEAD}>Zie een thuisbatterij als een voorraadkast voor je eigen stroom.</p>
              <p className={TEKST}>
                Een thuisbatterij bewaart elektriciteit, bijvoorbeeld zelf opgewekte zonnestroom die je niet meteen
                gebruikt. Die opgeslagen stroom kun je later alsnog in je woning gebruiken. Het systeem regelt automatisch
                wanneer stroom wordt opgeslagen of gebruikt. Gijs plaatst hiervoor een modulaire thuisbatterij. Samen met{" "}
                <Link href="/maatregelen/zonnepanelen" className={TEKSTLINK}>zonnepanelen</Link> en een{" "}
                <Link href="/maatregelen/warmtepomp" className={TEKSTLINK}>hybride warmtepomp</Link> gebruik je zo meer van
                je eigen stroom.
              </p>
            </div>

            <ul className="grid grid-cols-2 gap-3 sm:gap-4">
              {ONDERDELEN.map((deel, i) => (
                <li key={deel.title} className={WIT_BLOK + " flex flex-col gap-2 !p-5" + (i === ONDERDELEN.length - 1 ? " col-span-2" : "")}>
                  <Icon name={deel.icon} size="md" className="text-[var(--accent-700)]" />
                  <p className={KAARTKOP}>{deel.title}</p>
                  <p className="text-[14px] leading-relaxed text-[var(--text-muted)]">{deel.text}</p>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-[var(--radius-lg)] overflow-hidden bg-white max-w-[1000px] mx-auto">
            <Image
              src="/images/maatregelen/thuisbatterij/thuisbatterij-uitlegvisual-v3.png"
              alt="Schema van een thuisbatterijsysteem: 1 zonnepanelen wekken stroom op, 2 regelaar verdeelt de stroom, 3 thuisbatterij slaat stroom op voor later gebruik, 4 omvormer maakt stroom bruikbaar, 5 meterkast verdeelt stroom, 6 apparaten in huis gebruiken de stroom"
              width={2761}
              height={1216}
              quality={100}
              sizes="(max-width: 1024px) 100vw, 1000px"
              className="w-full h-auto"
            />
          </div>

          {/* Past het bij mij: wat Gijs tijdens de energiescan beoordeelt. */}
          <div className="mt-10 flex flex-col gap-6 rounded-[var(--radius-lg)] bg-white p-6 sm:p-8 md:flex-row md:items-center md:gap-10">
            <div className="flex flex-col gap-2 md:flex-1">
              <h3 className={KAARTKOP}>Past een thuisbatterij bij mijn woning?</h3>
              <p className={KAARTTEKST}>Tijdens de energiescan beoordeelt Gijs samen met jou onder meer het volgende:</p>
            </div>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:flex-[1.6]">
              {PAST_HET.map(punt => (
                <li key={punt} className="flex items-start gap-2.5 text-[15px] leading-relaxed text-[var(--text-muted)]">
                  <Icon name="check" size="sm" className="mt-1 shrink-0 text-[var(--accent-600)]" />
                  <span>{punt}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section id="voordelen" className={SECTIE}>
        <Kop eyebrow="Voordelen" titel="Wat kan een thuisbatterij voor je doen?" />
        <ul className={RASTER + " gap-4 lg:gap-5"}>
          {VOORDELEN.map((v, i) => (
            <li key={v.title} className={"flex flex-col gap-3 rounded-[var(--radius-lg)] border border-[var(--border-default)] bg-white p-6 sm:p-8 " + RASTER_CEL(VOORDELEN.length, i)}>
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--surface-tint)] text-[var(--accent-700)]">
                <Icon name={v.icon} size="md" />
              </span>
              <h3 className={KAARTKOP}>{v.title}</h3>
              <p className={KAARTTEKST}>{v.text}</p>
            </li>
          ))}
        </ul>
      </section>

      <section id="plaatsen" className={SECTIE}>
        <Kop eyebrow="Thuisbatterij laten plaatsen" titel="Een thuisbatterij laten plaatsen: hoe werkt dat?"
          lead="Gijs plaatst de thuisbatterij in één dag, volgens een vaste aanpak. Zo weet je precies wat je kunt verwachten." />
        <ThuisbatterijInstallatieAnimatie />
      </section>

      {/* Waarschuwingsblok (tekst van Max, 27-11-2026): rustig, binnen de huisstijl, geen alarmkleur. */}
      <section id="let-op" className={SECTIE}>
        <div className="rounded-[var(--radius-xl)] border border-[var(--border-default)] bg-[var(--surface-tint)] px-6 py-9 sm:px-10 lg:px-12 lg:py-11">
          <div className="flex flex-col gap-4 max-w-3xl">
            <span className="flex h-11 w-11 items-center justify-center rounded-full bg-white text-[var(--accent-700)]">
              <Icon name="shield-alert" size="md" />
            </span>
            <p className={EYEBROW}>Let op</p>
            <h2 className={H2}>Pas op met mooie beloftes over thuisbatterijen</h2>
            <p className={TEKST}>
              Een thuisbatterij kan interessant zijn, maar niet iedere woning heeft er financieel voordeel van. Wees daarom
              voorzichtig met aanbieders die een gegarandeerd rendement of een opvallend korte terugverdientijd beloven. De
              werkelijke opbrengst hangt onder andere af van je stroomverbruik, zonnepanelen, energiecontract en de kosten
              van de batterij.
            </p>
            <p className={TEKST}>
              In het nieuws verschijnen regelmatig verhalen over consumenten die veel geld betalen voor een thuisbatterij op
              basis van verwachtingen die achteraf niet worden waargemaakt. Laat je daarom niet onder druk zetten om direct
              te tekenen en vraag altijd om een duidelijke berekening van de verwachte besparing.
            </p>
            <p className={TEKST}>
              <strong className="text-[var(--gijs-donkergroen)]">Bij Gijs kijken we eerst of een thuisbatterij daadwerkelijk bij jouw woning past.</strong>{" "}
              Soms levert slimmer gebruik van je eigen zonnestroom of een andere verduurzamingsmaatregel meer op. Zo voorkom
              je dat je investeert in iets wat onvoldoende oplevert.
            </p>
            <div className="mt-2">
              <WhatsAppTrackedButton plaats="maatregelpagina_let_op" href={ENERGIESCAN_HREF} size="md" iconRight="arrow-right">Vraag een gratis energiescan aan</WhatsAppTrackedButton>
            </div>
          </div>
        </div>
      </section>

      <section id="de-thuisbatterij" className={SECTIE}>
        <Kop eyebrow="Product" titel="De thuisbatterij van Gijs" lead="Gijs plaatst een modulaire en stapelbare thuisbatterij." />
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.1fr] gap-8 lg:gap-10 items-center mb-8">
          <div className="rounded-[var(--radius-lg)] overflow-hidden bg-[var(--grey-050)]">
            <Image src={SIGENSTOR.image} alt={SIGENSTOR.imageAlt} width={791} height={441} quality={100}
              sizes="(max-width: 1024px) 100vw, 50vw" className="w-full h-auto" />
          </div>
          <div>
            <p className="text-[17px] font-semibold tracking-[-0.01em] text-[var(--accent-700)]">{SIGENSTOR.merk}</p>
            <h3 className={H3_GROOT}>{SIGENSTOR.naam}</h3>
            <p className={TEKST + " mt-1"}>{SIGENSTOR.ondertitel}</p>
          </div>
        </div>

        <TechnicalDetails id="technische-gegevens">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-2">
            <div>
              <h4 className="font-bold text-[var(--gijs-donkergroen)] mb-3">Kenmerken</h4>
              <ul className="flex flex-col gap-2 text-sm text-zinc-700">
                {SIGENSTOR.kenmerken.map(k => (
                  <li key={k} className="flex items-start gap-2">
                    <Icon name="check" size="sm" className="mt-0.5 text-[var(--accent-700)] shrink-0" />
                    <span>{k}</span>
                  </li>
                ))}
              </ul>
              <p className="text-sm text-zinc-500 mt-4">
                {SIGENSTOR.levenscyclus}
                <br />
                <span className="text-xs">{SIGENSTOR.levenscyclusNoot}</span>
              </p>
            </div>
            <div>
              <h4 className="font-bold text-[var(--gijs-donkergroen)] mb-3">Onderdelen</h4>
              <ul className="flex flex-col gap-2">
                {ONDERDELEN.map(deel => <TechnicalDetailRow key={deel.technisch} label={deel.title} value={deel.technisch} />)}
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-[var(--gijs-donkergroen)] mb-3">Werkmodi</h4>
              <ul className="flex flex-col gap-3">
                {SIGENSTOR.werkmodi.map(modus => (
                  <li key={modus.titel}>
                    <p className="font-semibold text-sm text-zinc-800">{modus.titel}</p>
                    <p className="text-sm text-zinc-600">{modus.tekst}</p>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-[var(--gijs-donkergroen)] mb-3">Veiligheid</h4>
              <ul className="flex flex-col gap-2 text-sm text-zinc-700">
                {SIGENSTOR.veiligheid.map(v => (
                  <li key={v} className="flex items-start gap-2">
                    <Icon name="shield-check" size="sm" className="mt-0.5 text-[var(--accent-700)] shrink-0" />
                    <span>{v}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </TechnicalDetails>
      </section>

      <section id="kennis" className={SECTIE}>
        <Kop eyebrow="Kennis" titel="Thuisbatterij, salderen en nettarieven" />
        <ArtikelKaarten slugs={["salderen-stopt-2027-thuisbatterij", "zonnepanelen-rendabel-zonder-salderen", "dynamische-nettarieven-2029"]} />
      </section>

      <section id="veelgestelde-vragen" className={SECTIE}>
        <h2 className={H2 + " mb-8 max-w-3xl"}>Veelgestelde vragen over thuisbatterijen</h2>
        <div className="max-w-3xl">
          <FAQAccordion items={faqItems} className="[&_.gijs-accordion__trigger]:py-6 [&_.gijs-accordion__trigger]:text-base md:[&_.gijs-accordion__trigger]:text-lg" />
          <Link href="/kennis#veelgestelde-vragen" className="mt-6 text-[15px] font-semibold text-[var(--accent-700)] hover:text-[var(--gijs-donkergroen)] inline-flex items-center gap-1 no-underline">
            Bekijk alle veelgestelde vragen <Icon name="arrow-right" size="sm" />
          </Link>
        </div>
      </section>

      <section className={`scroll-mt-52 ${regioStyles.opkomen}`}>
        <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between rounded-[var(--radius-xl)] bg-[var(--surface-tint)] px-6 py-7 sm:px-10 sm:py-8 transition-all duration-500 ease-out hover:-translate-y-1 hover:shadow-[0_8px_30px_-8px_rgba(0,0,0,0.08)]">
          <p className="max-w-xl text-[clamp(16px,0.95rem+0.2vw,18px)] leading-[1.6] text-zinc-700 [text-wrap:pretty]">
            Past een thuisbatterij bij jouw woning? Bespreek gratis en vrijblijvend wat er mogelijk is.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 self-start shrink-0">
            <Button href={startScanHref} variant="accent" size="md" iconRight="arrow-right">Ik wil mijn woning verduurzamen</Button>
            <WhatsAppTrackedButton plaats="maatregelpagina_afsluiting" href={ENERGIESCAN_HREF} size="md" iconRight="arrow-right" variant="secondary">Vraag een gratis energiescan aan</WhatsAppTrackedButton>
          </div>
        </div>
      </section>

      <MeasureRegioLink />
    </RegioMain>
  );
}
