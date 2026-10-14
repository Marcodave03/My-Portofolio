# Marco Davincent Dermawan — portfolio

The portfolio site, rebuilt on **Next.js 16** (App Router), React 19, TypeScript
and Tailwind CSS v4. Every route is statically prerendered.

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm start        # serve the production build
```

## The design

The theme is carried over from the original Vite portfolio, because that look
is the one Marco wanted to keep: black on white, narrow Tahoma, a single
sky-blue accent, and a handful of devices that make the site feel like itself.

| Decision | What and why |
| --- | --- |
| Palette | Black `#000` on white `#fff`, one accent in sky-blue `#93c5fd`. Because blue-300 is a fill colour, not a text colour, `--accent-ink` (`#2563eb`) is used wherever the accent has to carry text or a hairline on white. Never white text on the blue. |
| Typeface | Tahoma with `font-stretch: narrower`, as the original set it — Verdana, Geneva and DejaVu Sans behind it for platforms without Tahoma. |
| Cursor | The 8px dot and 50px ring, rebuilt on a single `requestAnimationFrame` lerp instead of a tween library. The ring opens over anything clickable. Hidden until the pointer first moves, and never shown on touch or coarse pointers. |
| Section banner | Each section opens with its name set oversized, followed by a hairline running to the edge. An earlier version padded the word out with typographic hyphens and drifted it on scroll — at display size those hyphens read as heavy black slabs, and the drift clipped the word on narrow screens. The banner is also the heading, so the name is not set twice. |
| Pill | The capsule button: fills sky-blue from the left while a black disc carrying an arrow runs to the far edge and tips up 45°. Width-agnostic — the disc's travel is derived from a `--disc` custom property. |
| Page cover | The `#333` panel carrying the name of the route you landed on, wiping upward. Plays on arrival rather than on click, since App Router navigation is instant. |
| Rising circles | The original background, thinned from 270 nodes to twelve hairline shapes — the same effect at a fraction of the compositing cost. |
| Theme | One button in the header cycles light → dark → system. A single control means the header never changes width, so nothing shifts. The choice is stored in `localStorage` and applied by a small inline script before first paint, so choosing dark never costs you a white flash on the next visit. |

Every one of these is disabled under `prefers-reduced-motion`.

Both colour schemes ship. Light is the default, dark follows
`prefers-color-scheme`, and `data-theme` on the root element overrides either —
which is what the header toggle sets.

**One cascade rule matters here.** Tailwind v4 puts its utilities in a layer, and
unlayered CSS beats every layered rule. So element defaults (`p`, `h1`–`h6`, `a`)
live in `@layer base` and the named classes (`.expanded`, `.ui`, `.prose`,
`.sounding`, `.trace`) live in `@layer components` — otherwise a `block` or
`mt-6` written next to `.trace` silently does nothing. The two `.pill` hover
rules are deliberately left unlayered: they have to beat the `w-0` utility on
the fill element, or the button would never fill.

## Where things live

| Path | Contents |
| --- | --- |
| `data/portfolio.db` | **The content.** Every project, certificate, role, skill and profile field. This is the source of truth. |
| `lib/db.ts` | The SQLite connection, the schema, and small helpers (slugs, JSON columns, settings). |
| `lib/queries.ts` | Every read. `server-only`, so it can never be pulled into a client bundle. |
| `lib/seed.ts` | Copies `lib/content.ts` into the database on first run, then never again. |
| `lib/content.ts` | The original hand-written content. Now only a seed and the shared types — editing it changes nothing once seeded. |
| `lib/registers.ts` | Register ids and titles. Structure, not content, so it stays in code and is safe for client components. |
| `lib/auth.ts` | The admin password gate and its signed session cookie. |
| `app/(site)/` | The public site. Its layout carries the header, footer, cursor and page cover. |
| `app/admin/` | The CMS. Its own layout, so it inherits none of the site chrome. |
| `app/admin/actions.ts` | Every write. Each one checks the session, then revalidates the site. |
| `public/uploads/` | Certificate scans and screenshots added through the admin. |

## The admin

```bash
# One-time: set a password
echo "ADMIN_PASSWORD=something-long" > .env.local

npm run dev
# then open http://localhost:3000/admin
```

| Section | What you edit |
| --- | --- |
| **Projects** | Every register — ventures, client work, AI, organisation systems, hackathons. Write-up, links, key facts, images, ordering, and a published flag for drafts. |
| **Certificates** | Hackathon placings, competition results, publications and certifications, each with an optional issuer, link and uploaded scan. |
| **Experience** | Roles and programmes for the About page. |
| **About & profile** | Skill areas, plus your name, email and GitHub. |

Notes on how it behaves:

- **Changes show immediately.** Public pages stay statically rendered for speed;
  every save calls `revalidatePath`, so the affected pages are rebuilt on the
  next request rather than on the next deploy.
- **New projects get a page automatically.** `/work/[slug]` generates known
  slugs at build and renders anything added later on demand.
- **Drafts stay hidden.** Unticking *Published* keeps a project in the admin
  and out of the site.
- **Uploads** are stored under `public/uploads` with an extension taken from
  the allow-list rather than the filename, so a disguised file cannot pick its
  own type. PNG, JPEG, WebP, AVIF, GIF and PDF, up to 12 MB.
- **The database and uploads are tracked in git** — they are your content, and
  losing them is worse than binary diffs. Only SQLite's `-wal`/`-shm` journal
  files are ignored.

### If you deploy it

The database is a file on disk. That is right for running locally, and it is
also fine on a normal server or container with a persistent volume. It does
**not** work on a serverless host like Vercel, where the filesystem is
read-only and per-request — edits would vanish. For that, move the data to a
hosted Postgres or libSQL and keep `lib/queries.ts` as the seam; nothing above
it would need to change.

## The five registers

1. **Ventures** — Conversia, Bantoo, Conversia Map, Conversia Web Design,
   CryptoBot, LuxQuant.
2. **Client work** — Eden Clinic, WatchGoods, Nusa Travel, Nuat Time, OceanNeed.id
   shipped; GeoVest and Marble Hall Gallery listed as in progress.
3. **AI** — the AI Library and its eleven locally-run models.
4. **Organisation systems** — the BNEC platforms.
5. **Hackathons and recognition** — competition projects and where they placed.

## Adding a project

Add an `Entry` to the right array in `lib/content.ts`. A detail page, its
metadata and its static route are generated from that entry alone. Drop any
preview image in `public/work/` and reference it as `/work/<name>.png`.

Only entries with an `image` appear in the client-work preview grid; the rest
fall into the "Still in the workshop" list, so an unreleased project never shows
as an empty frame.

## Note on the folder

This app sits beside the previous Vite build, which still lives in the parent
folder. Nothing in that build was modified. `turbopack.root` is pinned in
`next.config.ts` because both projects carry a lockfile.
