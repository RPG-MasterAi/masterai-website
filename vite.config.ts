import { fileURLToPath, URL } from 'node:url'
import { rmSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'

import { defineConfig } from 'vite'
import type { ViteSSGOptions } from 'vite-ssg'
import vue from '@vitejs/plugin-vue'

// Pre-rendering (vite-ssg, 2026-10-16): every page is written as its own HTML file, flat
// (`classes.html`, `adventures/god-king.html`), which Cloudflare Pages serves at `/classes`
// and `/adventures/god-king` without a trailing slash, the addresses already in use.
const SITE_URL = 'https://rpgmaster.ai'

// The full-screen pages get their body class from the page itself once it is running; the
// pre-rendered HTML needs it from the start, or main.css squeezes the page for a moment.
const bodyClass = (route: string) =>
  route === '/' ? 'home-full' : ['/about', '/support'].includes(route) ? '' : 'site-full'

// Cloudflare Rocket Loader (a zone setting, left on) runs the site's script only after the `load`
// event: on /play, the Google Ads landing page, store clicks made in those seconds were never
// counted (analysis 09/11). `data-cfasync="false"`, written before `src` as Cloudflare documents,
// tells Rocket Loader to leave the script alone. Only on /play: the other pages keep exactly the
// HTML they had (Marco, 09/11: no Cloudflare changes, fix it in the site, keep the rest as it is).
const NO_ROCKET_LOADER = ['/play']
const withoutRocketLoader = (html: string) => {
  const out = html.replace('<script type="module" crossorigin', '<script data-cfasync="false" type="module" crossorigin')
  if (out === html) throw new Error('vite.config.ts: main <script type="module"> not found, data-cfasync not added')
  return out
}

let pages: string[] = []
const NOT_IN_SITEMAP = ['/play']

const ssgOptions: ViteSSGOptions = {
  dirStyle: 'flat',
  formatting: 'none',
  includedRoutes(paths) {
    // A route like `/adventures/:slug(god-king|arcane-academy)` lists its own pages.
    const expanded = paths.flatMap((p) => {
      const m = p.match(/^(.*):\w+\(([^)]+)\)$/)
      if (m) return m[2].split('|').map((slug) => m[1] + slug)
      return p.includes(':') ? [] : [p]
    })
    pages = expanded
    return [...expanded, '/404']
  },
  onPageRendered(route, html) {
    const cls = bodyClass(route)
    if (cls) html = html.replace('<body>', `<body class="${cls}">`)
    return NO_ROCKET_LOADER.includes(route) ? withoutRocketLoader(html) : html
  },
  onFinished() {
    // Only needed during the build; it would otherwise be published with the site.
    rmSync(join('dist', 'ssr-manifest.json'), { force: true })
    // The pages Google should know about: all of them except the "not found" page and the ad
    // landing page (/play, noindex: it repeats the homepage for visitors coming from the ad).
    const urls = pages.filter((p) => !NOT_IN_SITEMAP.includes(p)).map((p) => `  <url><loc>${SITE_URL}${p}</loc></url>`).join('\n')
    writeFileSync(
      join('dist', 'sitemap.xml'),
      `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`
    )
  }
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  ssgOptions,
  // vue-markdown-render ships ES modules without saying so: Node 18 (the one on Cloudflare's
  // build image) refuses to load it during pre-rendering, so it is bundled in instead.
  ssr: { noExternal: ['vue-markdown-render'] }
})
