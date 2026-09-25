/**
 * Build-output checks — the SEO non-negotiables from CLAUDE.md, enforced on
 * every generated page. Reads `.output/public` (run `npm run check`, which
 * generates first). Skips with a note if the site hasn't been generated.
 *
 * No browser, no extra dependencies: plain file reads + regex.
 */
import { describe, it, expect } from 'vitest'
import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs'
import { join, relative } from 'node:path'

const SITE = 'https://rescuejourney.co.uk'
const OUT = join(__dirname, '..', '.output', 'public')
const built = existsSync(join(OUT, 'index.html'))

// SPA fallbacks written by Nitro, not real pages.
const FALLBACKS = new Set(['200.html', '404.html'])

function walk(dir: string): string[] {
  return readdirSync(dir).flatMap((name) => {
    const full = join(dir, name)
    return statSync(full).isDirectory() ? walk(full) : [full]
  })
}

/** "guides/transport-day.html" -> "/guides/transport-day"; "index.html" -> "/" */
function routeOf(file: string): string {
  const rel = relative(OUT, file).replace(/\\/g, '/').replace(/\.html$/, '')
  if (rel === 'index') return '/'
  return '/' + rel.replace(/\/index$/, '')
}

/** Does a site-relative URL resolve to something we generated? */
function resolves(url: string): boolean {
  const path = decodeURI(url.split(/[?#]/)[0]!)
  if (path === '/') return existsSync(join(OUT, 'index.html'))
  const clean = path.replace(/\/$/, '')
  return [clean, `${clean}.html`, `${clean}/index.html`].some((p) => {
    const f = join(OUT, p)
    return existsSync(f) && statSync(f).isFile()
  })
}

const pages = built
  ? walk(OUT)
      .filter((f) => f.endsWith('.html'))
      .filter((f) => !FALLBACKS.has(relative(OUT, f)))
      .map((file) => ({ file, route: routeOf(file), html: readFileSync(file, 'utf8') }))
  : []

const all = (re: RegExp, s: string) => [...s.matchAll(re)]

describe.skipIf(!built)('generated pages', () => {
  it('found the generated site', () => {
    expect(pages.length).toBeGreaterThan(10)
  })

  describe.each(pages.map((p) => [p.route, p] as const))('%s', (_route, page) => {
    const { html, route } = page

    it('has exactly one <h1>', () => {
      expect(all(/<h1[\s>]/g, html)).toHaveLength(1)
    })

    it('has a non-empty <title> and meta description', () => {
      expect(html).toMatch(/<title>[^<]{5,}<\/title>/)
      expect(html).toMatch(/<meta name="description" content="[^"]{20,}"/)
    })

    it('has exactly one self-referencing canonical', () => {
      const canon = all(/<link rel="canonical" href="([^"]+)"/g, html)
      expect(canon).toHaveLength(1)
      expect(canon[0]![1]).toBe(route === '/' ? `${SITE}/` : `${SITE}${route}`)
    })

    it('is indexable and has an OG image', () => {
      expect(html).toMatch(/<meta name="robots" content="index, follow/)
      expect(html).toMatch(/<meta property="og:image" content="https:\/\/[^"]+"/)
    })

    it('has only valid JSON-LD', () => {
      const blocks = all(/<script[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g, html)
      for (const [, json] of blocks) {
        const data = JSON.parse(json!)
        const nodes = Array.isArray(data) ? data : data['@graph'] ?? [data]
        for (const node of nodes) expect(node['@type'], `JSON-LD node on ${route}`).toBeTruthy()
      }
    })

    it('has no broken internal links or images', () => {
      const refs = [
        ...all(/\shref="(\/[^"]*)"/g, html).map((m) => m[1]!),
        ...all(/\ssrc="(\/[^"]*)"/g, html).map((m) => m[1]!),
      ].filter((u) => !u.startsWith('//') && !u.startsWith('/_nuxt/') && !u.startsWith('/__'))
      const broken = [...new Set(refs)].filter((u) => !resolves(u))
      expect(broken, `broken links on ${route}`).toEqual([])
    })
  })
})

describe.skipIf(!built)('site files', () => {
  const sitemap = built ? readFileSync(join(OUT, 'sitemap.xml'), 'utf8') : ''
  const locs = all(/<loc>([^<]+)<\/loc>/g, sitemap).map((m) => m[1]!)

  it('sitemap lists every generated page', () => {
    const missing = pages.map((p) => (p.route === '/' ? `${SITE}/` : `${SITE}${p.route}`)).filter((u) => !locs.includes(u))
    expect(missing).toEqual([])
  })

  it('every sitemap URL is a generated page', () => {
    const orphans = locs.filter((u) => !resolves(u.replace(SITE, '') || '/'))
    expect(orphans).toEqual([])
  })

  it('robots.txt allows crawling and points at the sitemap', () => {
    const robots = readFileSync(join(OUT, 'robots.txt'), 'utf8')
    expect(robots).toMatch(/^Allow: \/$/m)
    expect(robots).toContain(`Sitemap: ${SITE}/sitemap.xml`)
  })

  it('the static OG fallback image exists', () => {
    expect(existsSync(join(OUT, 'og-default.svg'))).toBe(true)
  })
})

describe.skipIf(built)('generated pages', () => {
  it.skip('skipped: run `npm run check` to generate the site and test the output', () => {})
})
