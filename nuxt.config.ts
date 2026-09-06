import tailwindcss from '@tailwindcss/vite'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-01',
  devtools: { enabled: true },

  modules: ['@nuxt/content', '@nuxtjs/seo'],

  css: ['~/assets/css/main.css'],

  // Use bare component names (<JsonLd>, <Callout>, <Faq>) regardless of the
  // sub-directory they live in — matches the names used in markdown content.
  components: [{ path: '~/components', pathPrefix: false }],

  vite: {
    plugins: [tailwindcss()],
  },

  // ---------------------------------------------------------------------------
  // Site identity — single source of truth for canonicals, sitemap, OG, schema.
  // Override SITE_URL per environment (Cloudflare Pages env var) for previews.
  // ---------------------------------------------------------------------------
  site: {
    url: process.env.NUXT_PUBLIC_SITE_URL || 'https://rescuejourney.co.uk',
    name: 'Rescue Journey',
    description:
      'Practical, honest guidance for UK adopters bringing rescue dogs home from Romania, Cyprus, Bulgaria, Greece and Spain.',
    defaultLocale: 'en-GB',
  },

  content: {
    build: {
      markdown: {
        highlight: {
          theme: 'github-light',
          langs: ['bash', 'yaml', 'markdown'],
        },
        // Auto-generate anchor links on headings for deep-linking.
        anchorLinks: { depth: 3, exclude: [1] },
        // Table of contents data for the "On this page" rail.
        toc: { depth: 2, searchDepth: 3 },
      },
    },
  },

  // @nuxtjs/seo sub-modules ----------------------------------------------------
  // Canonicals + OG/Twitter fallbacks are handled by seo-utils.
  // We drive ALL JSON-LD through our own <JsonLd> component (see CLAUDE.md),
  // so the auto schema-org module is disabled to avoid duplicate graphs.
  schemaOrg: { enabled: false },

  // Dynamic OG image generation needs a headless browser at build time.
  // We ship a single static fallback OG image instead — keeps the Cloudflare
  // build Chromium-free, fast, and Lighthouse-friendly.
  ogImage: { enabled: false },

  sitemap: {
    // Exclude legal/utility pages from the sitemap crawl if desired later.
    xslColumns: [
      { label: 'URL', width: '75%' },
      { label: 'Last Modified', select: 'sitemap:lastmod', width: '25%' },
    ],
  },

  robots: {
    // Static hosting — allow everything, point at the sitemap.
    disallow: [],
  },

  // ---------------------------------------------------------------------------
  // Static generation → Cloudflare Pages (fully prerendered, no runtime/D1).
  // `nuxt generate` outputs to .output/public (aliased dist). See README.
  // ---------------------------------------------------------------------------
  nitro: {
    prerender: {
      crawlLinks: true,
      failOnError: false,
      routes: ['/', '/sitemap.xml', '/robots.txt'],
    },
  },

  app: {
    head: {
      htmlAttrs: { lang: 'en-GB' },
      // charset + viewport are set by Nuxt defaults — don't repeat them.
      link: [{ rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' }],
      // Set the theme before first paint (no flash of the wrong theme).
      script: [
        {
          tagPosition: 'head',
          innerHTML:
            "(function(){try{var s=localStorage.getItem('theme');var d=s?s:(window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light');document.documentElement.setAttribute('data-theme',d);}catch(e){}})();",
        },
      ],
    },
  },
})
