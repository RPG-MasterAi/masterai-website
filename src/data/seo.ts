import { useHead } from '@unhead/vue'
import { useRoute } from 'vue-router'
import { STORE } from './links'
import ogDefault from '@/assets/og-image.jpg'
import logo from '@/assets/logo-512.webp'

// What Google and link previews (Discord, WhatsApp, X) read about each page (2026-10-16).
// The pages are pre-rendered at build time (vite-ssg), so these tags are in the HTML itself.

export const SITE_URL = 'https://rpgmaster.ai'
export const SITE_NAME = 'MasterAI'

// Asset imports are site paths ("/assets/x.jpg"); previews need the full address.
const absolute = (path: string) => (path.startsWith('http') ? path : SITE_URL + path)

export interface PageMeta {
  // Shown in the browser tab and as the search result title, followed by " — MasterAI".
  title: string
  // The snippet under the result: one or two sentences, under ~160 characters.
  description: string
  image?: string
  imageAlt?: string
  type?: 'website' | 'article'
  // Pages that must not appear in search results (the "not found" page).
  noindex?: boolean
}

export const usePageMeta = (meta: () => PageMeta) => {
  const route = useRoute()
  const url = () => SITE_URL + (route.path === '/' ? '/' : route.path.replace(/\/$/, ''))
  const title = () => `${meta().title} — ${SITE_NAME}`
  const image = () => absolute(meta().image ?? ogDefault)

  useHead({
    title,
    // No canonical address for the "not found" page: it answers at any address.
    link: () => (meta().noindex ? [] : [{ rel: 'canonical', href: url() }]),
    meta: [
      { name: 'description', content: () => meta().description },
      { name: 'robots', content: () => (meta().noindex ? 'noindex' : 'index, follow') },
      { property: 'og:type', content: () => meta().type ?? 'website' },
      { property: 'og:site_name', content: SITE_NAME },
      { property: 'og:title', content: title },
      { property: 'og:description', content: () => meta().description },
      { property: 'og:url', content: url },
      { property: 'og:image', content: image },
      { property: 'og:image:alt', content: () => meta().imageAlt ?? 'MasterAI, the AI Game Master for DnD adventures' },
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: title },
      { name: 'twitter:description', content: () => meta().description },
      { name: 'twitter:image', content: image }
    ]
  })
}

// Structured data for the homepage: the app with its two stores, and the company behind it.
export const HOME_STRUCTURED_DATA = [
  {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE_NAME,
    url: SITE_URL + '/'
  },
  {
    '@context': 'https://schema.org',
    '@type': 'MobileApplication',
    name: SITE_NAME,
    url: SITE_URL + '/',
    description:
      'An AI Game Master for solo DnD 5e adventures: describe what your character does in your own words and the story answers.',
    applicationCategory: 'GameApplication',
    operatingSystem: 'Android, iOS',
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
    downloadUrl: [STORE.android, STORE.ios],
    publisher: { '@type': 'Organization', name: 'MasterAI S.R.L.S.' }
  },
  {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'MasterAI S.R.L.S.',
    url: SITE_URL + '/',
    logo: absolute(logo),
    email: 'info@rpgmaster.ai'
  }
]
