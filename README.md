# Rescue Journey — Nuxt content starter

A fully static Nuxt content site for UK adopters of overseas rescue dogs. Built
to rank: correct schema, canonicals, sitemap, clean semantic HTML, fast on
mobile. Also built to be **reused** — components are generic and
frontmatter-driven, so this repo doubles as a starter template for future
content sites.

## Stack

| Concern    | Choice                                              |
| ---------- | --------------------------------------------------- |
| Framework  | Nuxt 4 (static via `nuxt generate`)                 |
| Content    | Nuxt Content 3 (zod-typed collections)              |
| SEO        | `@nuxtjs/seo` (sitemap, robots, canonicals, OG)     |
| Styling    | Tailwind CSS 4 (via `@tailwindcss/vite`)            |
| Hosting    | Cloudflare Pages (static) + Cloudflare DNS          |

No database, no CMS, no auth. Content lives in `content/*.md`.

## Local development

```bash
npm install
npm run dev          # http://localhost:3000
npm run generate     # static build -> .output/public
npx serve .output/public   # preview the static output
```

`better-sqlite3` is a build-time dependency of Nuxt Content 3 (it builds the
content database during `generate`). It is **not** shipped to the browser —
the output is 100% static HTML/JS/CSS.

## Deploying to Cloudflare Pages

This is a **fully prerendered** site, so you do not need the `cloudflare-pages`
Nitro preset, Workers, or a D1 binding. Cloudflare just serves the static
files.

**Cloudflare Pages → Create project → connect the repo, then:**

| Setting                | Value                        |
| ---------------------- | ---------------------------- |
| Framework preset       | Nuxt.js (or None)            |
| Build command          | `npm run generate`           |
| Build output directory | `dist`  ← see note        |
| Node version           | `22` (set `NODE_VERSION=22`, or via `.nvmrc`) |

> **Output directory — important.** On Cloudflare, Nuxt auto-detects the
> environment and uses the `cloudflare-pages-static` Nitro preset, which emits
> to **`dist`**. So the Pages "Build output directory" must be **`dist`**, even
> though a *local* `npm run generate` produces `.output/public` (the local
> `static` preset). Setting `.output/public` in Pages fails with "Output
> directory not found".

**Environment variables (all environments):**

```
NUXT_PUBLIC_SITE_URL = https://rescuejourney.co.uk
NODE_VERSION         = 22
```

`NUXT_PUBLIC_SITE_URL` drives canonicals, the sitemap, OG URLs and JSON-LD. For
preview deployments you can point it at the `*.pages.dev` URL. The config also
falls back to `https://rescuejourney.co.uk` if the var is unset.

## Content model

Frontmatter is typed and validated at build time in `content.config.ts`. A file
that violates its schema fails the build. The field names are deliberately the
future database column names.

- `content/guides/*.md` → `/guides/<slug>`
- `content/rescues/*.md` → `/rescues/<slug>`
- `content/journal/*.md` → `/journal/<slug>`

URLs are flat and descriptive, with no dates in the path.

### Automatic internal linking

The internal link graph is a core feature, generated from frontmatter:

- A guide's `related: []` slugs render as titled links to those guides.
- A journal entry's `guidesReferenced: []` and `rescue:` render as links.
- A rescue profile auto-links to guides whose `countries` overlap its own.

## SEO

- **JSON-LD** is emitted only through the single `<JsonLd :schema="…" />`
  component, fed by typed builders in `app/composables/useSchema.ts`
  (Article, FAQPage, HowTo, BreadcrumbList, NGO, Person, WebSite).
- **Canonicals**, trailing-slash normalisation and title templating are handled
  by `@nuxtjs/seo`.
- **Per-page OG/Twitter** tags via `usePageSeo()`.
- **Sitemap** (`/sitemap.xml`) and **robots** (`/robots.txt`) are generated at
  build with `lastmod` from `updatedAt`/`lastReviewedAt`.

### Two things to replace before launch

1. **OG image** — `public/og-default.svg` is a placeholder. Facebook/Twitter
   render PNG/JPG reliably but **not SVG**. Replace it with a 1200×630 PNG at
   `public/og-default.png` and update `DEFAULT_OG_IMAGE` in
   `app/composables/usePageSeo.ts`.
2. **About photo** — `public/images/mike-and-barnie.svg` is a placeholder.
   Swap in a real photo (and keep the descriptive `alt` text).

Dynamic OG image generation (`nuxt-og-image`) is intentionally **disabled** to
keep the Cloudflare build Chromium-free and fast. Re-enable it in
`nuxt.config.ts` if you later want per-page generated images.

## Project structure

```
content/            guides/  rescues/  journal/   (markdown)
content.config.ts   typed zod collection schemas
app/
  components/
    seo/            JsonLd, Breadcrumbs
    content/        RescueCard, LastVerified, Disclosure, Callout, Faq
  composables/      useSchema (JSON-LD builders), usePageSeo
  layouts/          default
  pages/            index, guides/, rescues/, journal/, about, legal
  utils/            format (dates, labels)
  error.vue         404 / error page
public/             favicon, og image, images
```

Component names are **not** path-prefixed (see `components` in
`nuxt.config.ts`), so `<JsonLd>`, `<Callout>`, `<Faq>` work everywhere,
including inside markdown via MDC:

```md
::callout{type="warning"}
Rules change — always confirm on GOV.UK.
::
```

## Never break an indexed URL

The 404 page (`app/error.vue`) points visitors back into the site rather than
dead-ending. If a rescue asks to be removed, don't delete the file — replace
its body with a short "no longer listed" note so the URL keeps resolving. For
hard moves, add a `public/_redirects` file (Cloudflare Pages format).

## Editorial principles

**Stay in the niche.** This site covers **adopting rescue dogs from overseas
into the UK** — Romania, Cyprus, Bulgaria, Greece, Spain. That focus is the core
SEO asset (topical authority in an under-served niche), not a limitation.

- A rescue earns a profile only if it **imports dogs from overseas** — even if
  some of its dogs are already in UK foster/kennels. Do **not** add purely
  domestic UK rescues: it dilutes topical authority and drops the site into an
  unwinnable competitive pool (Dogs Trust, RSPCA, Battersea).
- A guide belongs here if it applies to an **imported** dog (titre / 21-day
  rule, transport, decompression, import insurance, per-country rules). Generic
  dog care with no import angle is out of scope.
- Test for anything new: *does this involve importing a dog from overseas?*
  Yes → include. No → leave out.

**The journal is real.** It is a first-person account published *as it happens*,
dated honestly. Never write journal entries describing events that haven't
occurred yet. Pre-arrival content (the wait, paperwork, choosing a rescue) is
on-niche and welcome; fabricated post-arrival content is not.

## Content accuracy

Guides are solid drafts but cover health/legal territory that changes.
**Fact-check against GOV.UK / APHA before publishing.** Rescue profiles must be
**verified against the rescue's own sources**; leave unknown fields null (they
render as "Not stated") rather than guessing, and set `lastVerifiedAt`.
