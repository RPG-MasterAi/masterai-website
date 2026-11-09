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
// True once it is known whether this visit gets the tag (US, no GPC) or not.
let decided = false
// A store click made before that was known (country still being read, or the page not running yet):
// kept in this page's memory only, sent as soon as the tag is in, dropped if the visit gets no tag.
// One click is enough: the conversion is "clicked a store button" (analysis 09/11, proposal 2).
let pending: Platform | null = null

// Resolves when the tag question is over: no tag for this visit, or gtag.js loaded (or failed).
// /play waits for it before fetching its video, so the video never competes with the tag.
let settle: () => void = () => {}
export const adsSettled = new Promise<void>((resolve) => {
  settle = resolve
})

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

// ── Clicks made before the site's JavaScript is running (/play only) ──
// On a slow phone the pre-rendered store buttons are on screen a second or more before the page is
// running, and a click in that time was never counted, nor did the Play link get its referrer
// (analysis 09/11). This small script goes in the <head> of /play (PlayView.vue, with
// `data-cfasync="false"` like MARK_DEVICE). It sends nothing and stores nothing: it only notes in a
// variable of the page which store was clicked (not with GPC), and gives the link the same campaign
// address as onClick below. startAds then takes over: it reads the click and switches the script off.
// Written here so that it uses the same constants as the rest of this file.
const EARLY_KEY = '__masteraiStoreClick'
type EarlyClick = { p: Platform | ''; off: () => void }

export const EARLY_CLICK = `(function(){var w=window,K=${JSON.stringify(EARLY_KEY)};if(w[K])return;` +
  `var R=${JSON.stringify(ANDROID_REFERRER)},I=${JSON.stringify(IOS_CAMPAIGN_URL)},G=navigator.globalPrivacyControl===true,` +
  `A=new URLSearchParams(location.search).get('utm_source')==='google';` +
  `function h(e){var t=e.target,a=t&&t.closest&&t.closest('a');if(!a)return;var s=a.href,` +
  `p=s.indexOf('https://play.google.com/')===0?'android':s.indexOf('https://apps.apple.com/')===0?'iphone':'';if(!p)return;` +
  `if(A){if(p==='android'){var u=new URL(s);u.searchParams.set('referrer',R);a.href=u.toString()}else if(I)a.href=I}` +
  `if(!G)w[K].p=p}` +
  `w[K]={p:'',off:function(){document.removeEventListener('click',h,true)}};document.addEventListener('click',h,true)})()`

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
  script.onload = script.onerror = () => settle()
  document.head.appendChild(script)
  tagReady = true
}

const sendConversion = (platform: Platform) => {
  const w = window as unknown as { gtag: (...args: unknown[]) => void }
  w.gtag('event', 'conversion', {
    send_to: `${AW_ID}/${CONVERSION_LABEL}`,
    platform,
    transport_type: 'beacon'
  })
}

// The tag question is answered: `withTag` only for a US visitor without GPC. A click kept while
// waiting is sent now if the tag is in (queued by gtag until gtag.js arrives), otherwise forgotten.
const decide = (withTag: boolean) => {
  if (withTag) {
    loadTag()
    if (pending && CONVERSION_LABEL) sendConversion(pending)
  } else {
    settle()
  }
  pending = null
  decided = true
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
  if (!CONVERSION_LABEL) return
  if (tagReady) sendConversion(platform)
  else if (!decided) pending = platform
}

let started = false

// Called in the browser as soon as the site's JavaScript runs (main.ts), before the page is
// hydrated: the country is read and the click listener is in place a little earlier. The older
// call in App.vue's onMounted then does nothing; it is left there because editing App.vue changes
// its style id, and with it the HTML of every page.
export const startAds = async () => {
  if (started) return
  started = true
  fromAd = new URLSearchParams(window.location.search).get('utm_source') === 'google'
  // A click already noted by the early script of /play (EARLY_CLICK) becomes the pending click.
  // The marker left behind keeps that script from starting again (e.g. /play opened from another page).
  const w = window as unknown as Record<string, EarlyClick | undefined>
  const early = w[EARLY_KEY]
  w[EARLY_KEY] = { p: '', off: () => {} }
  if (early) {
    early.off()
    if (early.p) pending = early.p
  }
  // Capture phase: runs before the link is followed, whatever component the button is in.
  document.addEventListener('click', onClick, true)
  // The published privacy policy (section 9.3) promises to honour the Global Privacy Control signal:
  // a browser that sends it never gets the tag (Toby, 2026-10-21).
  if (!AW_ID || (navigator as Navigator & { globalPrivacyControl?: boolean }).globalPrivacyControl === true) {
    decide(false)
    return
  }
  const country = await visitorCountry()
  decide(!!country && AD_COUNTRIES.includes(country))
}
