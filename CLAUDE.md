# CLAUDE.md

UK content site helping people **adopt rescue dogs from overseas** (Romania,
Cyprus, Bulgaria, Greece, Spain). Written first-person by an adopter (Mike,
adopting Barnie from Romania via Pawprints to Freedom; due ~end Sep 2026).
Goals, in order: genuinely help adopters; rank in search; modest affiliate
income *later* (none currently).

Stack: Nuxt 4 (static `nuxt generate`), Nuxt Content 3 (typed zod collections),
`@nuxtjs/seo`, Tailwind 4. Deploys static to Cloudflare Pages at
**rescuejourney.co.uk**. See `README.md` for full setup, structure, deploy, and
the editorial principles.

## Non-negotiables

- **Niche discipline** — overseas-import angle only. A rescue earns a profile
  only if it imports dogs from overseas (UK foster/kennels are fine as long as
  the origin is overseas); guides must apply to imported dogs. No purely
  domestic UK rescue content — it dilutes topical authority and is unwinnable
  against Dogs Trust / RSPCA / Battersea. Full rule in README → Editorial
  principles.
- **The journal is real** — first-person, dated, published *as it happens*.
  Never fabricate events that haven't occurred. Pre-arrival content is welcome.
- **SEO correctness first** — all JSON-LD via the single `<JsonLd>` component +
  typed builders in `app/composables/useSchema.ts`; self-referencing canonicals;
  sitemap + robots; exactly one `<h1>` per page; static OG fallback image.
- **Verify, don't guess** — rescue facts come from the rescue's own sources;
  unknown fields stay `null` (render as "Not stated"); always set
  `lastVerifiedAt`.
- **Funding transparency** — currently no ads or affiliate income; if that
  changes, disclose on-page and update `/affiliate-disclosure`.
- **Fewer dependencies** — default to hand-rolled over adding a package.

## Frontmatter is the contract

Typed in `content.config.ts`; the field names are the future database columns.
Validated at build — a file that violates its schema fails the build.
