export type Link = { label: string; url: string };

export type Entry = {
  slug: string;
  name: string;
  /** One plain sentence: what it is, and for whom. */
  line: string;
  /** Longer body copy, used on the detail page. */
  body?: string[];
  year: string;
  role: string;
  status?: string;
  stack: string[];
  links: Link[];
  /** Path under /public, when a real preview exists. */
  image?: string;
  gallery?: string[];
  facts?: { term: string; detail: string }[];
};

export type Register = {
  id: string;
  title: string;
  blurb: string;
  entries: Entry[];
};

/* ------------------------------------------------------------------ */
/* 1 — Ventures                                                        */
/* ------------------------------------------------------------------ */

const ventures: Entry[] = [
  {
    slug: "conversia",
    name: "Conversia",
    line: "An AI avatar platform where a 3D character listens, reasons over your documents, and answers out loud.",
    body: [
      "Conversia started from a simple observation: most business chatbots are a text box bolted onto a website, and people do not trust them. Giving the assistant a face, a voice and a body changes how long someone is willing to stay in the conversation.",
      "The platform runs a real-time pipeline — speech in, retrieval over the customer's own documents, a language model, then speech and lip-sync back out. The avatar is driven by a viseme rig: nine mouth shapes mapped to phoneme classes, blended against eyelid, brow and jaw morph targets so the face moves with the audio rather than on a loop.",
      "It ships as three surfaces — the avatar frontend, an Express backend that owns retrieval and model calls, and a marketing site — so a customer can embed the assistant or use it hosted.",
    ],
    year: "2024 — now",
    role: "Founder, full-stack",
    status: "In development",
    stack: ["Next.js", "React", "Three.js", "Express", "Qdrant", "PostgreSQL"],
    facts: [
      { term: "Avatar rig", detail: "Nine visemes for lip-sync, blended with eyelid, brow and jaw morph targets" },
      { term: "Retrieval", detail: "Qdrant vector store over the customer's own documents" },
      { term: "Surfaces", detail: "Avatar frontend, Express API, marketing site" },
    ],
    links: [],
  },
  {
    slug: "bantoo",
    name: "Bantoo",
    line: "Point-of-sale and ERP for Indonesian small businesses, with a laundry vertical built on top of it.",
    body: [
      "Bantoo is counter software for shops that have outgrown a cash drawer and a notebook but cannot justify enterprise ERP. It handles sales, inventory, customers and staff from one screen that works on a cheap Android tablet.",
      "The backend is a modular Laravel application — each business capability is its own module, so a new vertical gets added rather than merged in. Permata Laundry is the first of those: it reuses the same accounts and database as the core POS, but gives laundry operators the workflow they actually run, from intake ticket to pickup.",
      "Around the product sit a CRM for the sales pipeline and a payment service, each running independently so one failing does not take the till down with it.",
    ],
    year: "2024 — now",
    role: "Founder, full-stack",
    status: "In development",
    stack: ["Laravel", "React", "Next.js", "MySQL", "OAuth"],
    facts: [
      { term: "Architecture", detail: "Modular Laravel backend, OAuth-secured API, React counter app" },
      { term: "Verticals", detail: "Core POS, Permata Laundry, CRM, payment service" },
      { term: "Built for", detail: "Indonesian retail and service SMEs" },
    ],
    links: [],
  },
  {
    slug: "conversia-map",
    name: "Conversia Map",
    line: "Turns a mall's floor-plan drawings into a map shoppers can search, with walking routes that cross floors by escalator.",
    body: [
      "Malls already have floor plans; they are just drawings. Conversia Map reads them. You upload one SVG per floor and the app identifies tenants, walkways and escalators by their fill colour — so a building goes from a static PDF to a navigable map without anyone redrawing it.",
      "There are two surfaces. The editor is a canvas that works the way designers expect: a structure panel on the left, a floating tool pill for select, entry, add-POI and connect, and a properties panel on the right. Operators name tenants, colour them, attach hours and contact details and menus, drop points of interest, and link escalators between levels.",
      "The viewer is what shoppers get — a directory they can search and filter, a find-nearest for things like toilets and ATMs, and a walking route that steps from one floor to the next through the escalator links the operator drew.",
    ],
    year: "2025",
    role: "Founder, full-stack",
    status: "Early build",
    stack: ["Next.js 15", "React 19", "TypeScript", "SVG parsing"],
    facts: [
      { term: "Input", detail: "One colour-coded floor-plan SVG per level" },
      { term: "Editor", detail: "Canvas for authoring tenants, points of interest and escalator links" },
      { term: "Routing", detail: "Cross-floor walking routes through escalators" },
    ],
    links: [],
  },
  {
    slug: "conversia-web-design",
    name: "Conversia Web Design",
    line: "The studio arm — company profiles and product sites built for Indonesian businesses, one client at a time.",
    body: [
      "The studio is where the product work pays for itself. Clinics, watch retailers, reflexology studios, travel operators and non-profits come in needing a site that loads fast on a mid-range Android phone over a patchy connection, and that their own staff can keep current.",
      "Every site ships on the same foundation — Next.js with the App Router, statically prerendered where the content allows — with typography and layout designed per client rather than dropped into a template. The seven sites in the next register are all studio work.",
    ],
    year: "2023 — now",
    role: "Founder, designer and developer",
    status: "Taking clients",
    stack: ["Next.js", "TypeScript", "Tailwind CSS", "Design"],
    facts: [
      { term: "Delivered", detail: "Seven client sites, listed under Client work" },
      { term: "Focus", detail: "Company profiles, catalogues and campaign sites" },
      { term: "Constraint", detail: "Fast on a mid-range Android phone over a slow connection" },
    ],
    links: [],
  },
  {
    slug: "cryptobot",
    name: "CryptoBot",
    line: "A configuration desk for an automated trading bot, wired to Binance, Bybit and Bitget.",
    body: [
      "Signal bots usually hide their risk settings behind a Telegram command syntax nobody remembers. CryptoBot puts the whole configuration on screen: connect an exchange, pick spot or futures, choose a strategy, and see exactly what the bot will do before it does it.",
      "Two strategies are supported. SL Plus runs a trailing stop only, sized as a share of the portfolio. TP Levels takes a single take-profit, either from a labelled preset or from take-profit and stop-loss percentages you type yourself — no hardcoded numbers buried in the code.",
      "Position sizing is stated explicitly, as a percentage of portfolio or a fixed dollar amount, because the difference between those two is the difference between a bad week and a blown account.",
    ],
    year: "2024 — now",
    role: "Founder, full-stack",
    status: "Live",
    stack: ["React", "Next.js", "Node.js", "MongoDB", "Exchange APIs"],
    image: "/work/cryptobot-site.png",
    facts: [
      { term: "Exchanges", detail: "Binance, Bybit and Bitget — spot and futures" },
      { term: "Strategies", detail: "SL Plus trailing stop; TP Levels with preset or custom percentages" },
      { term: "Sizing", detail: "Percentage of portfolio, or a fixed dollar amount" },
    ],
    links: [{ label: "cryptobot.id", url: "https://www.cryptobot.id/" }],
  },
  {
    slug: "luxquant",
    name: "LuxQuant",
    line: "A quantitative terminal that reads crypto, tokenized equities and on-chain flow as one market.",
    body: [
      "Traders watch crypto in one window, equities in another, and on-chain activity in a third — then try to hold the correlation in their head. LuxQuant Terminal puts all of it on one screen: crypto, tokenized TradFi, on-chain movement, and AI research over the top.",
      "The terminal streams live market data through a FastAPI backend, with Redis in front of PostgreSQL so a chart redraw does not become a database query. The frontend is React and Recharts, translated for the several languages its traders actually read.",
      "Sign-in runs through Telegram, Google or Discord rather than a password, because that is where the trading audience already is. That same session carries into CryptoBot: after login, LuxQuant signs a short-lived JWT that CryptoBot exchanges for its own token, so a trader moves from reading a signal to configuring the bot that acts on it without logging in twice.",
    ],
    year: "2025 — now",
    role: "Founder, full-stack",
    status: "Live",
    stack: ["React", "Vite", "Tailwind CSS", "FastAPI", "PostgreSQL", "Redis", "Docker"],
    image: "/work/luxquant-site.png",
    facts: [
      { term: "Coverage", detail: "Crypto, tokenized TradFi, on-chain, AI research" },
      { term: "Sign-in", detail: "Telegram, Google or Discord — no passwords" },
      { term: "Paired with", detail: "CryptoBot, via a signed JWT token exchange" },
      { term: "Serving", detail: "FastAPI and Redis in front of PostgreSQL" },
    ],
    links: [{ label: "luxquant.tw", url: "https://luxquant.tw/login" }],
  },
];

/* ------------------------------------------------------------------ */
/* 2 — Client work                                                     */
/* ------------------------------------------------------------------ */

const clients: Entry[] = [
  {
    slug: "eden-clinic",
    name: "Eden Clinic",
    line: "A bilingual site for an aesthetic clinic, so patients can read every treatment in Indonesian or English.",
    body: [
      "Eden Clinic needed one site that serves two audiences without either feeling like a translation. Every route exists in Indonesian and English, with the language carried in the URL, so a patient can send a friend a link in the language they read.",
      "The content is treatment-led: what a procedure is, what it costs, how long it takes, and who performs it — the four questions that decide whether someone books.",
    ],
    year: "2025",
    role: "Designer and developer",
    status: "Live",
    stack: ["Next.js", "TypeScript", "Tailwind CSS"],
    image: "/work/edenclinic-site.png",
    links: [{ label: "edenclinic.co.id", url: "https://www.edenclinic.co.id/id" }],
  },
  {
    slug: "watchgoods",
    name: "WatchGoods",
    line: "A catalogue and company profile for a two-counter watch shop, prerendered so every page opens instantly.",
    body: [
      "A watch shop sells on detail — reference numbers, movement, case size, condition. The catalogue carries that detail without burying it, and every route is statically prerendered, so a customer standing at the counter comparing a listing on their phone is never waiting on a server.",
    ],
    year: "2025",
    role: "Designer and developer",
    status: "Live",
    stack: ["Next.js 16", "React 19", "TypeScript", "Tailwind v4"],
    image: "/work/watchgoods-site.png",
    links: [{ label: "Open the site", url: "https://watch-goods-one.vercel.app/" }],
  },
  {
    slug: "nusa-travel",
    name: "Nusa Travel",
    line: "A field guide to East Nusa Tenggara — Komodo, Flores, Sumba and Timor — with the islands rendered in 3D.",
    body: [
      "Most travel sites for eastern Indonesia sell packages. This one explains the place first: which island, which season, what you will actually see, and what it takes to get there.",
      "The islands are rendered in three dimensions with react-three-fiber, so the geography of an archipelago — how far Sumba really is from Flores — reads at a glance instead of as a list of names.",
      "It is a rebuild of the 2023 WebIFest competition entry, reconstructed on Next.js 15 and React 19.",
    ],
    year: "2025",
    role: "Designer and developer",
    status: "Live",
    stack: ["Next.js 15", "React 19", "Tailwind v4", "react-three-fiber"],
    image: "/work/nusatravel-site.png",
    links: [{ label: "Open the site", url: "https://nusatravel.vercel.app/" }],
  },
  {
    slug: "nuattime",
    name: "Nuat Time",
    line: "A site for a Thai reflexology studio in Pantai Indah Kapuk, paced to feel like the room it describes.",
    body: [
      "Nuat Time is a reflexology and oil massage studio at Ruko Golf Island, PIK. The site has one job: convince someone who has never had reflexology that this is a place they would be comfortable walking into.",
      "So it moves slowly — a gate that opens into the space, then treatments, rates, and how to visit, with photography carrying most of the argument. First built in 2023 as a freelance commission, and rebuilt in 2025 on Next.js 15.",
    ],
    year: "2023, rebuilt 2025",
    role: "Designer and developer",
    status: "Live",
    stack: ["Next.js 15", "TypeScript", "App Router"],
    image: "/work/nuattime-site.png",
    gallery: [
      "/work/nuattime-site.png",
      "/work/nuattime-site-2.png",
      "/work/nuattime-site-3.png",
      "/work/nuattime-site-4.png",
    ],
    links: [{ label: "Open the site", url: "https://nuattime.vercel.app/" }],
  },
  {
    slug: "oceaneed",
    name: "OceanNeed.id",
    line: "A fundraising site for Indonesian coastal clean-ups that shows a donor exactly where the money goes.",
    body: [
      "OceanNeed raises money for beach and coastal clean-ups across Indonesia. The design problem is trust: a donor wants to know which beach, on what date, and what was actually pulled out of the water.",
      "So campaigns lead with location and outcome rather than with a donation button, and the donation flow sits at the end of that argument instead of interrupting it.",
    ],
    year: "2025",
    role: "Designer and developer",
    status: "Live",
    stack: ["Next.js", "TypeScript", "Tailwind CSS"],
    image: "/work/oceaneed-site.png",
    gallery: ["/work/oceaneed-site.png", "/work/oceaneed-site-2.png", "/work/oceaneed-site-3.png"],
    links: [{ label: "Open the site", url: "https://oceaneedid.vercel.app/" }],
  },
  {
    slug: "geovest",
    name: "GeoVest",
    line: "A map that answers whether a Jakarta property is worth buying, by layering demographics and flood risk over it.",
    body: [
      "Property listings tell you the size and the price. They do not tell you that the street floods, or that the surrounding population is ageing out of the market you are betting on.",
      "GeoVest puts those layers on one interactive map of Jakarta — population by age, income and religion, infrastructure, and flood visibility, each one toggleable with its own opacity. Click a region or a property and you get the numbers behind it: population statistics, area, specifications, pricing.",
    ],
    year: "2025",
    role: "Full-stack developer",
    status: "In development",
    stack: ["Next.js", "GeoJSON", "Python", "Map layers"],
    links: [],
  },
  {
    slug: "marble-hall",
    name: "Marble Hall Gallery",
    line: "A white-marble museum you walk through in the browser, holding three interactive exhibits.",
    body: [
      "An experiment in whether a gallery can be a website rather than a grid of images. You walk a marble hall in first person, and each room holds a different three.js exhibit — a school of fish, an orbiting planet, a third piece — approached the way you would approach a sculpture.",
    ],
    year: "2025",
    role: "Designer and developer",
    status: "Experiment",
    stack: ["Next.js", "three.js", "WebGL"],
    links: [],
  },
];

/* ------------------------------------------------------------------ */
/* 3 — AI                                                              */
/* ------------------------------------------------------------------ */

export type Model = {
  slug: string;
  title: string;
  tagline: string;
  category: "Language" | "Audio" | "Vision" | "Multimodal" | "Generative";
  model: string;
  params: string;
};

export const models: Model[] = [
  { slug: "chat-llm", title: "Chat Language Model", tagline: "Streams an answer token by token on a laptop CPU.", category: "Language", model: "Qwen2.5-0.5B-Instruct", params: "494M" },
  { slug: "semantic-search", title: "Semantic Search", tagline: "Retrieves by meaning rather than by keyword.", category: "Language", model: "all-MiniLM-L6-v2", params: "22M" },
  { slug: "sentiment-analysis", title: "Sentiment Analysis", tagline: "Scores a sentence positive or negative, with confidence.", category: "Language", model: "DistilBERT SST-2", params: "67M" },
  { slug: "summarization", title: "Summarization", tagline: "Compresses an article to a length you control.", category: "Language", model: "BART-large-CNN", params: "406M" },
  { slug: "translation", title: "Translation", tagline: "Translates across 200 languages from a single model.", category: "Language", model: "NLLB-200-distilled", params: "615M" },
  { slug: "speech-to-text", title: "Speech to Text", tagline: "Transcribes a recording, with timestamps.", category: "Audio", model: "Whisper small", params: "244M" },
  { slug: "text-to-speech", title: "Text to Speech", tagline: "Speaks a sentence, offline after the first download.", category: "Audio", model: "MMS-TTS English", params: "36M" },
  { slug: "image-classification", title: "Image Classification", tagline: "Labels a photo and shows the top five confidences.", category: "Vision", model: "ViT-base-patch16", params: "86M" },
  { slug: "object-detection", title: "Object Detection", tagline: "Boxes the 91 COCO classes with no anchors and no NMS.", category: "Vision", model: "DETR-ResNet-50", params: "41M" },
  { slug: "image-captioning", title: "Image Captioning", tagline: "Describes a photo, or answers a question about it.", category: "Multimodal", model: "BLIP captioning base", params: "247M" },
  { slug: "image-generation", title: "Image Generation", tagline: "Text to image in one to four diffusion steps.", category: "Generative", model: "SD-Turbo", params: "865M" },
];

const ai: Entry[] = [
  {
    slug: "ai-library",
    name: "AI Library",
    line: "Eleven models, each documented down to the memory it needs — and each with a demo you can actually run.",
    body: [
      "Reading about a model teaches you less than running one. The AI Library is a single folder that both documents and runs eleven models across language, audio, vision, multimodal and generative tasks.",
      "Each entry records the architecture in specifics — twenty-four decoder blocks, grouped-query attention, RoPE positions, a SwiGLU feed-forward — alongside the things that decide whether you can actually use it: download size, memory needed, whether a GPU helps, and tokens per second on CPU versus GPU.",
      "One command serves the catalogue. Clicking a model opens its sheet and a Run demo button that starts that project's Gradio app. Nothing calls an API and nothing needs a key — models download once from Hugging Face and run locally from then on.",
    ],
    year: "2025",
    role: "Author",
    status: "Eleven models",
    stack: ["Python", "PyTorch", "Transformers", "Gradio"],
    facts: [
      { term: "Coverage", detail: "Language, audio, vision, multimodal, generative" },
      { term: "Smallest", detail: "MMS-TTS, at 36M parameters" },
      { term: "Largest", detail: "SD-Turbo, at 865M UNet parameters" },
      { term: "Runs", detail: "Entirely local — no API keys, no cloud" },
    ],
    links: [],
  },
];

/* ------------------------------------------------------------------ */
/* 4 — Organisation systems                                            */
/* ------------------------------------------------------------------ */

const systems: Entry[] = [
  {
    slug: "mybnec-neo-2023",
    name: "NEO 2023",
    line: "The competition platform for the National English Olympics, run for 56 students selected from universities nationwide.",
    body: [
      "The National English Olympics runs on a deadline that does not move. The platform handles registration, the competition schedule and the participant record for 56 students selected from universities across Indonesia, with an administrative side the committee operates themselves during the event.",
    ],
    year: "2023",
    role: "Staff of Information Technology, BNEC",
    stack: ["Laravel", "PHP", "MySQL"],
    links: [],
  },
  {
    slug: "mybnec-rec-2023",
    name: "Recruitment 2023",
    line: "The member intake system for BNEC, carrying registration and correspondence for more than 600 applicants.",
    body: [
      "Every intake cycle BNEC receives hundreds of applications and has to move each one through registration, screening and notification without losing anybody. The frontend gives applicants a single clear path; the backend gives the committee a queue they can work through, and sends the correspondence — over 600 emails in the 2023 cycle.",
    ],
    year: "2023",
    role: "Staff of Information Technology, BNEC",
    stack: ["Vue 3", "Vite", "Laravel"],
    links: [],
  },
  {
    slug: "mybnec-neo-2022",
    name: "NEO 2022",
    line: "The first National English Olympics platform, and the system the 2023 rebuild learned from.",
    year: "2022",
    role: "Staff of Information Technology, BNEC",
    stack: ["Laravel", "PHP", "MySQL"],
    links: [],
  },
  {
    slug: "bnec-line-chatbot",
    name: "Line Chatbot",
    line: "A Line bot that answers member questions about events and schedules without a committee member on the other end.",
    year: "2023",
    role: "Developer",
    stack: ["Node.js", "Line Messaging API"],
    links: [],
  },
  {
    slug: "bnec-certificates",
    name: "NEO Certificates",
    line: "Generates and issues a participation certificate for every competitor, so nobody is laying out names by hand.",
    year: "2023",
    role: "Developer",
    stack: ["Automation", "PDF generation"],
    links: [],
  },
  {
    slug: "mybnec-se-als-2023",
    name: "SE ALS 2023",
    line: "The Special Event and ALS platform for the society's 2023 programme.",
    year: "2023",
    role: "Staff of Information Technology, BNEC",
    stack: ["Laravel", "PHP"],
    links: [],
  },
];

/* ------------------------------------------------------------------ */
/* 5 — Hackathons and recognition                                      */
/* ------------------------------------------------------------------ */

const hackathons: Entry[] = [
  {
    slug: "streamverse",
    name: "StreamVerse",
    line: "A creator platform on the Hedera network where the creator keeps ownership and gets paid directly.",
    body: [
      "Creators lose a share of everything they make to the platform that hosts it, and they do not own the audience they built. StreamVerse was our answer at the Hedera Hello Future hackathon: content minted on-chain, streamed from the platform, and paid for directly by the viewer with no intermediary taking a cut.",
      "I built the frontend — the streaming surface, the minting flow, and the analytics creators use to see what is earning.",
      "It finished in the top ten worldwide.",
    ],
    year: "2024",
    role: "Frontend developer",
    status: "Top 10 worldwide",
    stack: ["React", "Solidity", "Hedera", "Web3"],
    image: "/work/streamverse.png",
    gallery: ["/work/streamverse-1.png", "/work/streamverse-2.png", "/work/streamverse-3.png", "/work/streamverse-4.png"],
    facts: [
      { term: "Competition", detail: "Hedera Hello Future Hackathon, 2024" },
      { term: "Result", detail: "Top 10 winners" },
    ],
    links: [
      { label: "Live demo", url: "https://streamverse-testnet.vercel.app/" },
      { label: "GitHub", url: "https://github.com/Marcodave03/StreamVerse-Hedera-Frontend.git" },
      { label: "Walkthrough", url: "https://www.youtube.com/watch?v=Mlv9aaIK1ZI" },
      { label: "Pitch deck", url: "https://drive.google.com/file/d/1VDo_5y3BHKXPjUDTbfmYcTl6oaZVl5JX/view" },
    ],
  },
  {
    slug: "preform",
    name: "PreForm",
    line: "Mock job interviews with an AI that answers in real time, so the first interview you sit is not the real one.",
    body: [
      "Interview anxiety comes from unfamiliarity, and the only cure is repetition that most candidates cannot get. PreForm gives them an interviewer that is always available: it asks, listens, responds in real time, and afterwards tells you what was weak.",
      "Built for Microsoft Imagine Cup as a Flutter app running on both iOS and Android, with the conversation driven through the OpenAI API. Candidates choose the scenario, get feedback on each answer, and watch their performance move across sessions.",
    ],
    year: "2023",
    role: "UI/UX designer, app developer",
    status: "Imagine Cup",
    stack: ["Flutter", "Dart", "OpenAI API"],
    image: "/work/preform.png",
    gallery: ["/work/preform-1.png", "/work/preform-2.png", "/work/preform-3.png", "/work/preform-4.png", "/work/preform-5.png"],
    facts: [{ term: "Competition", detail: "Microsoft Imagine Cup AI Hackathon, 2023" }],
    links: [
      { label: "GitHub", url: "https://github.com/Marcodave03/Preform" },
      { label: "Walkthrough", url: "https://youtu.be/YnQpDJse2ug?si=zlSiZPvx3G1GZt_c" },
    ],
  },
  {
    slug: "bxplore",
    name: "Binus Xplore",
    line: "Indoor navigation for the BINUS Alam Sutera campus, designed so a disabled visitor can find their own way.",
    body: [
      "A campus is easy to navigate once you know it and disorienting before that — and for a visitor using a wheelchair, the shortest route and the usable route are rarely the same.",
      "Binus Xplore maps the Alam Sutera campus indoors and routes visitors through it independently, with accessibility treated as the primary case rather than an option buried in settings. Built in Swift through the iOS Foundation Program.",
      "It is the earliest version of the problem Conversia Map now solves for shopping centres.",
    ],
    year: "2023",
    role: "UI/UX designer, app developer",
    status: "iOS Foundation Program",
    stack: ["Swift", "iOS", "Geolocation"],
    image: "/work/bxplore.png",
    gallery: ["/work/bxplore-1.png", "/work/bxplore-2.png", "/work/bxplore-3.png", "/work/bxplore-4.png", "/work/bxplore-5.png"],
    facts: [{ term: "Programme", detail: "iOS Foundation Program, 2023" }],
    links: [
      { label: "GitHub", url: "https://github.com/Marcodave03/Binus-Xplore" },
      { label: "Pitch deck", url: "https://www.icloud.com/keynote/0fc03jYN5C1Q3G3eqyqFMtXXA" },
    ],
  },
  {
    slug: "careerspots",
    name: "CareerSpots",
    line: "A job platform that matches openings to what a candidate can do, instead of to keywords on a CV.",
    body: [
      "Job boards reward whoever games the keyword filter best. CareerSpots matches on skills and stated goals, so a career changer with the right ability is not filtered out for having had the wrong job title last.",
      "A full-stack build: search, a resume builder, and job alerts tuned to each candidate's profile.",
    ],
    year: "2023",
    role: "Full-stack developer",
    stack: ["React", "Node.js", "Express", "MySQL"],
    image: "/work/careerspot.png",
    gallery: ["/work/careerspot-1.png", "/work/careerspot-2.png", "/work/careerspot-3.png", "/work/careerspot-4.png"],
    links: [
      { label: "GitHub", url: "https://github.com/Marcodave03/CareerSpots" },
      { label: "Pitch deck", url: "https://drive.google.com/file/d/1JcNCqCtxSKYNW_zLe_2I601VF0jtEOik/view?usp=sharing" },
    ],
  },
  {
    slug: "nusatravel-2023",
    name: "NusaTravel",
    line: "The WebIFest competition entry that became the Nusa Travel site — a guide to Nusa Tenggara Timur.",
    body: [
      "Built for the WebIFest web design competition: a guide to Nusa Tenggara Timur covering Flores, the Komodo dragons, where to stay, and how to prepare for the trip.",
      "The idea outlived the competition. It was rebuilt in 2025 on Next.js and React 19, and now runs as a client site.",
    ],
    year: "2023",
    role: "UI/UX designer, frontend developer",
    status: "WebIFest",
    stack: ["React", "Web design"],
    image: "/work/nusatravel.png",
    gallery: ["/work/nusatravel-1.png", "/work/nusatravel-2.png", "/work/nusatravel-3.png", "/work/nusatravel-4.png"],
    links: [
      { label: "The 2025 rebuild", url: "https://nusatravel.vercel.app/" },
      { label: "GitHub", url: "https://github.com/Marcodave03/WebIFest" },
    ],
  },
  {
    slug: "healthygoods",
    name: "HealthyGoods",
    line: "An ordering app for nutritious food and the recipes to cook it with.",
    body: [
      "Eating well fails on logistics more often than on willpower — the ingredients are inconvenient and the recipe is somewhere else. HealthyGoods puts the order and the recipe in one place, with a shopping list that fills itself from whatever you chose to cook, and nutrition shown on every item.",
    ],
    year: "2023",
    role: "UI/UX designer",
    stack: ["Figma", "React", "Node.js"],
    image: "/work/healthygood.png",
    gallery: ["/work/healthygood-1.png", "/work/healthygood-2.png", "/work/healthygood-3.png", "/work/healthygood-4.png", "/work/healthygood-5.png"],
    links: [
      { label: "Figma file", url: "https://www.figma.com/design/68YDyFZtrS9W4Gs8M7yUCt/HealthyGoods?node-id=0-1&t=70Jkm0iDppgG7F9t-1" },
    ],
  },
];

/* ------------------------------------------------------------------ */

export const registers: Register[] = [
  {
    id: "ventures",
    title: "Ventures",
    blurb: "Products I own end to end — from the first line of the schema to the person paying for it.",
    entries: ventures,
  },
  {
    id: "clients",
    title: "Client work",
    blurb: "Sites built through the studio for clinics, retailers, operators and non-profits.",
    entries: clients,
  },
  {
    id: "ai",
    title: "AI",
    blurb: "Models pulled apart and made runnable — eleven of them, documented down to the memory they need.",
    entries: ai,
  },
  {
    id: "systems",
    title: "Organisation systems",
    blurb: "Platforms running competitions, intakes and correspondence for a student organisation of hundreds.",
    entries: systems,
  },
  {
    id: "hackathons",
    title: "Hackathons and recognition",
    blurb: "What got built under a deadline, and where it placed.",
    entries: hackathons,
  },
];

export const allEntries: Entry[] = registers.flatMap((r) => r.entries);

export function entryBySlug(slug: string) {
  for (const register of registers) {
    const entry = register.entries.find((e) => e.slug === slug);
    if (entry) return { entry, register };
  }
  return null;
}

/* ------------------------------------------------------------------ */
/* Recognition, career, skills                                         */
/* ------------------------------------------------------------------ */

export const recognition = [
  { year: "2024", title: "Top 10, Hedera Hello Future Hackathon", note: "StreamVerse, worldwide" },
  { year: "2024", title: "Published at ICITISEE 2024", note: "8th International Conference" },
  { year: "2024", title: "Top 100, INC Competitive Programming", note: "BINUS University" },
  { year: "2023", title: "WebIFest Web Design Competition", note: "NusaTravel" },
  { year: "2023", title: "Microsoft Imagine Cup AI Hackathon", note: "PreForm" },
  { year: "2022", title: "B-Startion Finalist", note: "Startup competition" },
  { year: "2022", title: "Techfest UX Competition", note: "" },
  { year: "2022", title: "Gematik VI UX Competition", note: "" },
  { year: "2021", title: "Compfest Traveloka Finalist", note: "" },
];

export const career = [
  {
    year: "2024",
    role: "Strategic Information Technology",
    org: "BCA Group",
    detail:
      "Worked on Emoji, an internal platform that scans documents with OCR and turns them into structured data, so a process that ran on paper stopped doing so. Built new frontend features and brought deprecated libraries back up to date.",
  },
  {
    year: "2024",
    role: "Lead, Core Competition Team",
    org: "UREEKA BINUS",
    detail:
      "Led 261 members: ran Laravel training, mentored teams into national and international competitions, and kept the record of what everyone won.",
  },
  {
    year: "2023 — 2024",
    role: "Staff of Information Technology",
    org: "BNEC",
    detail:
      "Built and ran the platforms behind the National English Olympics and member recruitment — a competition site for 56 selected students, and an intake system that carried more than 600 applicants.",
  },
  {
    year: "2023",
    role: "iOS Foundation Program",
    org: "BINUS University",
    detail:
      "Built Binus Xplore in Swift: indoor campus navigation designed around disabled visitors rather than retrofitted for them.",
  },
];

export const skills = [
  {
    area: "Product and design",
    detail:
      "I design the thing before I build it — research, wireframes, then an interface a first-time user can operate without being taught. Most of these projects started in Figma.",
  },
  {
    area: "Frontend",
    detail:
      "React and Next.js, TypeScript, Tailwind. Interfaces that stay fast and legible on a mid-range Android phone, because that is what most of my users are holding.",
  },
  {
    area: "Backend",
    detail:
      "Node and Express for real-time work, Laravel where a domain wants structure. Relational data in PostgreSQL and MySQL, vector data in Qdrant.",
  },
  {
    area: "Machine learning",
    detail:
      "Transformers and PyTorch, run locally rather than rented. Retrieval-augmented generation, speech, vision — and the arithmetic of what a model costs to serve.",
  },
];

export const stackList = [
  "React", "Next.js", "TypeScript", "Vue", "Tailwind CSS", "Node.js",
  "Express", "Laravel", "PHP", "ASP.NET", "Python", "PyTorch",
  "PostgreSQL", "MySQL", "Qdrant", "Socket.IO", "Three.js", "Flutter",
  "Swift", "Solidity",
];

export const profile = {
  name: "Marco Davincent Dermawan",
  email: "marcodave03@gmail.com",
  github: "https://github.com/Marcodave03",
};
