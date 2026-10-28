// Google Ads measurement for the US-only video campaign that sends people to the site
// (Marco, 2026-10-18, via Jim: "tag Google solo per i visitatori USA, nessun banner").
// Plan: F:\Dev\Ufficio\marketing\ADS\CAMPAGNA-SITO-CINEMATICO.md
//
// - The Google tag loads only for visitors in the United States. The country comes from
//   Cloudflare (`/cdn-cgi/trace`, the same network that serves the site); if it cannot be read,
//   the tag does not load. Nobody outside the US gets Google cookies, so no banner is needed.
// - A click on a store button counts as a conversion, with the platform (android / iphone).
// - Visitors who came from the ad (`utm_source=google` in the first address) get store links
//   that carry the campaign, so Play Console and App Store Connect count the installs. The
//   campaign is kept in memory only, never in cookies or storage: it lasts while the visitor
//   moves between pages, and is gone on reload.

// ── To fill in (Jim sends them once the conversion action and the Apple link exist). ──
// While AW_ID is empty the tag never loads, wherever the visitor is.
// Conversion action "Clic pulsante store - sito rpgmaster.ai", created by Jim in Google Ads (2026-10-21).
const AW_ID = 'AW-16577658336'
const CONVERSION_LABEL = '1MwKCNvV-qQdEOD76-A9'
// Campaign link generated in App Store Connect (with `pt=` and `ct=sito_cinematico`). Empty: the
// iPhone button keeps the normal App Store link.
const IOS_CAMPAIGN_URL = ''

const ANDROID_REFERRER = 'utm_source=google&utm_medium=demandgen&utm_campaign=sito_cinematico'
const AD_COUNTRIES = ['US']

let fromAd = false
let tagReady = false

type Platform = 'android' | 'iphone'

const platformOf = (href: string): Platform | null => {
  if (href.startsWith('https://play.google.com/')) return 'android'
  if (href.startsWith('https://apps.apple.com/')) return 'iphone'
  return null
}

// The store address for a visitor who came from the ad; null keeps the link as it is.
const campaignHref = (href: string, platform: Platform) => {
  if (platform === 'android') {
    const url = new URL(href)
    url.searchParams.set('referrer', ANDROID_REFERRER)
    return url.toString()
  }
  return IOS_CAMPAIGN_URL || null
}

const visitorCountry = async () => {
  try {
    const res = await fetch('/cdn-cgi/trace', { cache: 'no-store' })
    if (!res.ok) return null
    return (await res.text()).match(/^loc=([A-Z]{2})$/m)?.[1] ?? null
  } catch {
    return null
  }
}

const loadTag = () => {
  const w = window as unknown as { dataLayer: unknown[]; gtag: (...args: unknown[]) => void }
  w.dataLayer = w.dataLayer || []
  w.gtag = function gtag() {
    // gtag.js reads the `arguments` object itself, not an array.
    w.dataLayer.push(arguments)
  }
  w.gtag('js', new Date())
  w.gtag('config', AW_ID)
  const script = document.createElement('script')
  script.async = true
  script.src = `https://www.googletagmanager.com/gtag/js?id=${AW_ID}`
  document.head.appendChild(script)
  tagReady = true
}

const onClick = (event: MouseEvent) => {
  const link = (event.target as Element | null)?.closest?.('a')
  if (!link) return
  const platform = platformOf(link.href)
  if (!platform) return
  if (fromAd) {
    const href = campaignHref(link.href, platform)
    // Set just before the browser follows the link, so the page itself keeps today's links.
    if (href) link.href = href
  }
  if (tagReady && CONVERSION_LABEL) {
    const w = window as unknown as { gtag: (...args: unknown[]) => void }
    w.gtag('event', 'conversion', {
      send_to: `${AW_ID}/${CONVERSION_LABEL}`,
      platform,
      transport_type: 'beacon'
    })
  }
}

let started = false

// Called once, in the browser, after the first page is on screen (App.vue).
export const startAds = async () => {
  if (started) return
  started = true
  fromAd = new URLSearchParams(window.location.search).get('utm_source') === 'google'
  // Capture phase: runs before the link is followed, whatever component the button is in.
  document.addEventListener('click', onClick, true)
  if (!AW_ID) return
  // The published privacy policy (section 9.3) promises to honour the Global Privacy Control signal:
  // a browser that sends it never gets the tag (Toby, 2026-10-21).
  if ((navigator as Navigator & { globalPrivacyControl?: boolean }).globalPrivacyControl === true) return
  const country = await visitorCountry()
  if (country && AD_COUNTRIES.includes(country)) loadTag()
}
