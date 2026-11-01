// FreeLine Portfolio — project catalogue.
// Edit this file to change what the portfolio shows. `live` can be set to a public URL
// once a project is exposed through a domain; leave it empty to show "Demo på begäran".
window.FREELINE_CONFIG = {
  contactEmail: '',          // e.g. 'hej@freeline.se' — the contact button is hidden while empty
  contactUrl: ''             // alternative to e-mail, e.g. a booking page
};

window.FREELINE_PROJECTS = [
  {
    id: 'launchengine',
    name: 'AI LaunchEngine',
    tagline: 'Från kodbas till lansering i fyra faser.',
    category: 'ai',
    status: 'live',
    year: 2026,
    accent: '#4fe3ff',
    description: 'En svit för att granska, paketera och lansera pilotprojekt. Pipelinen går från kodgranskning och härdning till Docker-paketering och marknadsföring i sociala kanaler — med white-label-studio och Stripe-intäkter i samma gränssnitt.',
    features: ['Fyrstegs-pipeline för audit → lansering', 'White-label-studio för kundvarianter', 'Stripe Connect i testläge', 'Licensaktivering och marknadsflöden'],
    stack: ['FastAPI', 'Stripe', 'Nginx', 'Docker'],
    live: ''
  },
  {
    id: 'swen-mission-hub',
    name: 'SWEN Mission Hub',
    tagline: 'Ledningskonsol för Sveriges nya beredskapsnät.',
    category: 'safety',
    status: 'live',
    year: 2026,
    accent: '#ff6f8f',
    description: 'Realtidskonsol för blåljusaktörer byggd kring 3GPP MCX-idéerna i SWEN. Fältenheter ansluter från mobilen och delar GPS, livevideo och push-to-talk-röst direkt till ledningsplatsen över WebSocket.',
    features: ['Push-to-talk med riktig mikrofonström', 'Livevideo från mobilens kamera', 'Taktisk karta med GPS-enheter', 'MCData-chatt och nödanrop', 'Mobil fältklient'],
    stack: ['Node.js', 'WebSocket', 'Web Audio', 'Leaflet'],
    live: ''
  },
  {
    id: 'exposure-watch',
    name: 'Exposure Watch',
    tagline: 'Synlighet utan kompromisser.',
    category: 'safety',
    status: 'live',
    year: 2026,
    accent: '#9b7bff',
    description: 'Ett kommandocenter för exponering och säkerhetsrisker. Fynd från skanningar hamnar i ett register med allvarlighetsgrad och mänsklig granskning — inget markeras som löst automatiskt.',
    features: ['Exponeringsregister med allvarlighetsgrad', 'Granskningskö med mänskligt beslut', 'Skanning av källkatalog (skrivskyddad)', 'Rapporter och revisionsspår'],
    stack: ['FastAPI', 'Python', 'Docker'],
    live: ''
  },
  {
    id: 'openpath',
    name: 'OpenPath',
    tagline: 'Din kompetens. Din nästa möjlighet.',
    category: 'society',
    status: 'live',
    year: 2026,
    accent: '#22c55e',
    description: 'FreeLines publika plattform för lärande, jobbspår och möjligheter. Korta moduler, sparade framsteg och en tydlig väg från kompetens till arbete eller samverkan.',
    features: ['Lärmoduler med sparade framsteg', 'Jobbspår och möjligheter', 'Samverkan mellan aktörer', 'Tillgänglig och mobilanpassad'],
    stack: ['HTML', 'JavaScript', 'Nginx'],
    live: ''
  },
  {
    id: 'problem-radar',
    name: 'Problem Radar',
    tagline: 'Du behöver inte lösa allt själv.',
    category: 'society',
    status: 'live',
    year: 2026,
    accent: '#f59e0b',
    description: 'En varm community-plattform där människor delar verkliga vardagsproblem, reagerar och hittar lösningar tillsammans. Mikroanimationer och delningsflöden gör det lätt att bidra.',
    features: ['Dela problem och idéer', 'Reaktioner och kommentarer', 'Delning till sociala kanaler', 'Lekfulla mikroanimationer'],
    stack: ['Python', 'JSON-lagring', 'Vanilla JS'],
    live: ''
  },
  {
    id: 'jobbspar',
    name: 'Jobbspår 2.0',
    tagline: 'Deltagarresor mot arbete — tydligt och tryggt.',
    category: 'society',
    status: 'demo',
    year: 2026,
    accent: '#4ade80',
    description: 'Isolerad prototyp för att följa deltagares väg mot arbete. Byggd med integritet först: endast fiktiva testprofiler, lokal åtkomst och lösenordsskyddad inloggning.',
    features: ['Deltagarprofiler och milstolpar', 'Inloggning med lokalt hemliga uppgifter', 'SQLite-databas lokalt', 'Godkänd endast för testdata'],
    stack: ['Python', 'SQLite'],
    live: ''
  },
  {
    id: 'energybridge',
    name: 'EnergyBridge',
    tagline: 'Gör energi till nya möjligheter.',
    category: 'data',
    status: 'live',
    year: 2026,
    accent: '#3b82f6',
    description: 'Förstå elkostnader, räkna på besparingsscenarier och koppla samman kompetens med energiuppdrag. Validerad indata och testad beräkningsmotor.',
    features: ['Elkostnadsscenarier', 'Matchning mot energijobb', 'Servervalidering av all indata', 'Automatiska röktester'],
    stack: ['FastAPI', 'Python', 'unittest'],
    live: ''
  },
  {
    id: 'snapchat-revenue',
    name: 'Revenue Intelligence',
    tagline: 'Gör din data till klarare insikter.',
    category: 'data',
    status: 'live',
    year: 2026,
    accent: '#d9f99d',
    description: 'Creators laddar upp sin egen Snapchat-export och får en månad-för-månad-rekonstruktion av intäkterna med tydlig spårbarhet. Varje belopp klassas som betalning, överenskommet, potentiell order eller oklart — belopp som inte kan verifieras markeras, inget gissas fram. Gratis förhandsvisning och engångsköp via Stripe.',
    features: ['Import av ZIP-exporter direkt i webbläsaren', 'Fyra bevisklasser per belopp', 'Månadstidslinje och CSV-export', 'Gratis förhandsvisning före betalning', 'Engångsköp via Stripe'],
    stack: ['React', 'Supabase', 'Stripe', 'Vercel'],
    live: ''
  },
  {
    id: 'arbitrage-pulse',
    name: 'Arbitrage Pulse',
    tagline: 'Hitta prisskillnader. I realtid.',
    category: 'data',
    status: 'prototype',
    year: 2026,
    accent: '#c084fc',
    description: 'Skannar prediktionsmarknader efter prisskillnader och visar hur en delta-neutral hedge skulle kunna se ut. Ett analys- och demoverktyg med live-data — ingen handel utförs och inget är finansiell rådgivning.',
    features: ['Live-data från Polymarket', 'Spread- och hedge-beräkning', 'Interaktiv vinstsimulator', 'Tydlig riskbeskrivning'],
    stack: ['React', 'Vite', 'Express'],
    live: ''
  },
  {
    id: 'b2b-revenue-agent',
    name: 'B2B Revenue Agent',
    tagline: 'Autonom prospektering med intäktskalkyl.',
    category: 'ai',
    status: 'prototype',
    year: 2026,
    accent: '#34d399',
    description: 'Ett agentflöde för B2B-prospektering: ICP-kvalificering, leadsdetaljer och outreach — kombinerat med en kalkylator som visar vad tjänsten kan vara värd per kund och affärsmodell.',
    features: ['Agentorkestrering av leads', 'ICP-matchning och detaljvy', 'Interaktiv intäktskalkylator', 'Tre paketerade affärsmodeller'],
    stack: ['React 19', 'Tailwind 4', 'Vite'],
    live: ''
  },
  {
    id: 'ai-continuity',
    name: 'AI Continuity',
    tagline: 'Håll alla projekt portabla.',
    category: 'ai',
    status: 'live',
    year: 2026,
    accent: '#4fe3ff',
    description: 'Ett lokalt projektregister med status, nästa steg och återställningspunkter. Inbyggd lokal AI via Ollama kan resonera över hela projektlistan — utan betalda API-nycklar och utan att data lämnar servern.',
    features: ['Projekttavla med filter och sök', 'Återställningspunkter per projekt', 'Lokal AI med projektkontext', 'JSON-export'],
    stack: ['FastAPI', 'SQLite', 'Ollama'],
    live: ''
  },
  {
    id: 'sim-control',
    name: 'SIM Control Center',
    tagline: 'Registerstatus är inte samma sak som nätverksstatus.',
    category: 'infra',
    status: 'live',
    year: 2026,
    accent: '#a3e635',
    description: 'Självhostat register för SIM-kort, organisationer och ansvariga personer. Ärligt byggt: appen visar aldrig ett kort som online utan en verifierad datakälla. Admin-token krävs för all data.',
    features: ['SIM-, person- och organisationsregister', 'Kontrollhistorik per kort', 'CSV-import och export', 'SMS-center', 'Token-skyddat API'],
    stack: ['FastAPI', 'PostgreSQL', 'Docker Compose'],
    live: ''
  },
  {
    id: 'server-hub',
    name: 'Server Hub',
    tagline: 'En startpunkt för hela ekosystemet.',
    category: 'infra',
    status: 'live',
    year: 2026,
    accent: '#22d3ee',
    description: 'Den centrala katalogen över alla FreeLine-appar, serververktyg och projekt — med sök, filter och status för varje tjänst.',
    features: ['Sökbar katalog över 18 tjänster', 'Statusfilter', 'Snabblänkar till administration'],
    stack: ['HTML', 'CSS', 'Nginx'],
    live: ''
  },
  {
    id: 'wsl-bridge',
    name: 'Universal AI Bridge',
    tagline: 'Säker relä mellan AI-assistent och server.',
    category: 'infra',
    status: 'live',
    year: 2026,
    accent: '#f472b6',
    description: 'En lokal-först relä där en assistent skickar strukturerade jobb via ett privat GitHub-repo och får resultat från servern. Inga öppna portar, inga tunnlar och inga godtyckliga skalkommandon.',
    features: ['Endast utgående HTTPS', 'Vitlistade jobbtyper', 'Resultat versionerade i Git', 'Körs som systemd-tjänst'],
    stack: ['Python', 'GitHub', 'systemd'],
    live: '',
    noShot: true
  },
  {
    id: 'kommunradar',
    name: 'Kommunradar',
    tagline: 'Offentliga upphandlingar i inkorgen varje morgon. Prova 7 dagar gratis.',
    category: 'data',
    status: 'live',
    year: 2026,
    accent: '#fbbf24',
    description: 'Hämtar varje svensk upphandling från EU:s databas TED och filtrerar fram öppna anbudsförfrågningar med län, kategori, sista anbudsdag och uppskattat värde. Prenumeranter får de nya affärer som matchar deras bransch mejlade varje morgon.',
    features: ['7 dagar gratis, sedan 990 kr/mån', 'Öppna upphandlingar uppdaterade dagligen', 'Live-sök i riktig data', 'Dagligt matchat mejlutskick'],
    stack: ['Python', 'TED API', 'GitHub Actions', 'Stripe'],
    live: 'https://kommunradar.online',
    livePayments: true  // tar emot riktiga betalningar → LIVE-box och länk under kortet
  },
  {
    id: 'liquidation-guard',
    name: 'Aave Liquidation Guard',
    tagline: 'Larm innan din position blir likviderad.',
    category: 'data',
    status: 'demo',
    year: 2026,
    accent: '#ef4444',
    description: 'Telegram-bot som bevakar användarens egna Aave v3-positioner på fem kedjor varje minut och larmar när health factor sjunker under 1,5 · 1,25 · 1,1. Endast läsning av offentlig on-chain-data — inga nycklar och inga signaturer. Engelska och svenska.',
    features: ['Ethereum, Arbitrum, Base, Optimism, Polygon', 'Tre larmnivåer', 'Gratis health factor-kontroll', 'Prenumeration via Stripe'],
    stack: ['Node.js', 'grammY', 'JSON-RPC', 'Stripe'],
    live: ''
  },
  {
    id: 'remake',
    name: 'RE:MAKE',
    tagline: 'Din nya hemsida. Klar på 30 sekunder.',
    category: 'data',
    status: 'demo',
    year: 2026,
    accent: '#ff4ecd',
    description: 'Företagare skriver sitt namn, väljer bransch och stil och ser direkt sin nya hemsida på dator och mobil — och kan köpa den på plats. Motorn bygger exklusiva sajter med riktiga bilder och fem designsystem. En byråstudio skapar säljlänkar till lokala företag, och hemsidan lämnas ut först när Stripe bekräftat betalningen.',
    features: ['Live-förhandsvisning av kundens egen hemsida', 'Fem designsystem och fem branscher', 'Köp direkt med verifierad Stripe-betalning', 'Byråstudio med säljlänkar och QR', 'Remix-marknadsplats med royalty'],
    stack: ['Python', 'JavaScript', 'Stripe', 'Android'],
    live: ''
  }
];

window.FREELINE_CATEGORIES = {
  all: 'Alla',
  ai: 'AI & automation',
  society: 'Samhälle & arbete',
  safety: 'Säkerhet & beredskap',
  data: 'Data & finans',
  infra: 'Infrastruktur'
};

window.FREELINE_STATUS = {
  live: 'I drift',
  demo: 'Demo',
  prototype: 'Prototyp'
};
