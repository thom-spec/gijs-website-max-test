// Bron: drie Gijs-productbladen (Google Drive, Marketing/Productbladen/Dakisolatie): pagina 3
// aanvullende voorwaarden, pagina 4 productblad. Teksten van Max (27-11-2026), gecontroleerd tegen
// die bladen:
// - "Informatie dakisolatie zonder afwerking (HR WoodFibre) met aanvullende voorwaarden.pdf"
// - "Informatie dakisolatie zonder afwerking (HR TimberWool) met aanvullende voorwaarden.pdf"
// - "Informatie dakisolatie (HR Gijs-Roof) met aanvullende voorwaarden.pdf"
// Bewust NIET overgenomen: lambda-, Rd- en Rc-waarden (de 0,030 W/mK in het Gijs-Roof-blad moet nog
// technisch gecontroleerd worden), subsidiebedragen en besparingen.
// De productafbeeldingen zijn crops uit die bladen (geen AI-beeld).
//
// HR NatuWool en HR IcyFoam staan wel in lib/content/measure-details.ts, maar daarvoor zijn geen
// bruikbare bronbladen gevonden; daarom geen materiaalkaart.
export const DAK_PRODUCTS = [
  {
    name: "Houtvezelisolatie",
    product: "HR WoodFibre",
    image: "/images/maatregelen/dakisolatie/woodfibre.png",
    alt: "Losse houtvezelisolatie (HR WoodFibre) om in te blazen in een holle dakconstructie",
    text: "Wordt jouw zolder in de zomer erg warm? Dan kan houtvezelisolatie een interessante oplossing zijn. Naast de warmte-isolerende eigenschappen beschikt houtvezel over een hoog warmteopslagvermogen, waardoor het kan bijdragen aan een aangenamere temperatuur tijdens warme zomerdagen. Het materiaal wordt ingeblazen in geschikte holle ruimtes, is dampopen, vochtregulerend en gemaakt van een hernieuwbare grondstof.",
    benefits: [
      "Hoog warmteopslagvermogen",
      "Warmte- en geluidsisolatie",
      "Dampopen en vochtregulerend",
      "Gemaakt van houtvezels",
      "Recyclebaar",
    ],
  },
  {
    name: "Inblaaswol",
    product: "HR TimberWool",
    image: "/images/maatregelen/dakisolatie/TimberWool.png",
    alt: "Inblaaswol van glaswolvlokken (HR TimberWool) voor het na-isoleren van een schuin dak",
    text: "HR TimberWool bestaat uit glaswolvlokken en is speciaal ontwikkeld voor het na-isoleren van schuine daken en houten verdiepingsvloeren. Naast het beperken van warmteverlies beschikt het materiaal over geluidsisolerende eigenschappen. Het isolatiemateriaal is bovendien onbrandbaar.",
    benefits: [
      "Warmte- en geluidsisolatie",
      "Onbrandbaar isolatiemateriaal (brandklasse A1)",
      "Ongevoelig voor vocht als materiaaleigenschap",
      "Geschikt voor inblaastoepassingen",
      "Toepasbaar bij een geschikte constructiediepte van 70 tot 350 millimeter",
    ],
  },
  {
    name: "Reflecterende folie-isolatie",
    product: "HR Gijs-Roof",
    image: "/images/maatregelen/dakisolatie/pif_folie_voorbeeld-removebg-preview.png",
    alt: "Reflecterende folie-isolatie (HR Gijs-Roof) van meerdere lagen aluminium met luchtkamers",
    text: "Heb je beperkte ruimte op zolder en wil je deze zoveel mogelijk behouden? Dan kan reflecterende folie-isolatie een interessante mogelijkheid zijn. HR Gijs-Roof bestaat uit meerdere lagen warmtereflecterend aluminium, die van elkaar worden gescheiden door luchtkamers. Het materiaal is flexibel, relatief dun en dampdicht. Of dit isolatiesysteem geschikt is voor jouw woning, hangt af van de bestaande dakconstructie en de volledige benodigde systeemopbouw.",
    benefits: [
      "Relatief dun isolatiemateriaal",
      "Flexibel",
      "Warmtereflecterend",
      "Dampdicht en vochtwerend",
      "Recyclebaar",
    ],
  },
];

// Technische vergelijking (tekst van Max). Volgorde van de kolommen = volgorde van DAK_PRODUCTS.
// "Niet gespecificeerd" = niet in het productblad genoemd, niet: het materiaal heeft het niet.
export const DAK_VERGELIJKING: { eigenschap: string; waarden: [string, string, string] }[] = [
  { eigenschap: "Materiaal", waarden: ["Houtvezels", "Glaswolvlokken", "Reflecterende aluminiumfolie met luchtkamers"] },
  { eigenschap: "Aanbrengmethode", waarden: ["Inblazen", "Inblazen", "Aanbrengen aan binnenzijde"] },
  { eigenschap: "Warmte-isolatie", waarden: ["Ja", "Ja", "Ja"] },
  { eigenschap: "Zomercomfort", waarden: ["Hoog warmteopslagvermogen", "Thermische isolatie", "Warmtereflecterend"] },
  { eigenschap: "Geluidsisolatie", waarden: ["Ja", "Ja", "Niet gespecificeerd"] },
  { eigenschap: "Vochteigenschappen materiaal", waarden: ["Dampopen en vochtregulerend", "Ongevoelig voor vocht", "Dampdicht en vochtwerend"] },
  { eigenschap: "Brandklasse materiaal", waarden: ["Niet gespecificeerd", "A1, onbrandbaar", "Niet gespecificeerd"] },
  { eigenschap: "Benodigde ruimte", waarden: ["Afhankelijk van dakopbouw", "Constructiediepte 70–350 mm", "Relatief dun materiaal"] },
  { eigenschap: "Hernieuwbare grondstof", waarden: ["Hout", "Niet gespecificeerd", "Niet gespecificeerd"] },
  { eigenschap: "Certificering vermeld in productblad", waarden: ["NaturePlus", "Eurofins Gold en DECLARE-label", "Niet productspecifiek vermeld"] },
];

// Keuzehulp vanuit de woningeigenaar (tekst van Max).
export const DAK_KEUZEHULP: { situatie: string; oplossing: string; waarom: string }[] = [
  { situatie: "Je zolder wordt in de zomer erg warm", oplossing: "HR WoodFibre", waarom: "Hoog warmteopslagvermogen" },
  { situatie: "Je wilt geluiden van buitenaf verminderen", oplossing: "HR WoodFibre of HR TimberWool", waarom: "Geluidsisolerende eigenschappen" },
  { situatie: "Je vindt brandveiligheid van het materiaal belangrijk", oplossing: "HR TimberWool", waarom: "Onbrandbaar materiaal, brandklasse A1" },
  { situatie: "Je hebt beperkte ruimte op zolder", oplossing: "HR Gijs-Roof", waarom: "Relatief dun isolatiemateriaal" },
  { situatie: "Je wilt isoleren met een hernieuwbare grondstof", oplossing: "HR WoodFibre", waarom: "Gemaakt van houtvezels" },
  { situatie: "Je hebt een bestaande holle dakconstructie", oplossing: "HR WoodFibre of HR TimberWool", waarom: "Geschikt voor inblaastoepassingen" },
];
