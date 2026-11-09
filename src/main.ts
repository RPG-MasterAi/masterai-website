import './assets/main.css'
// Fonts served by the site itself, not by fonts.googleapis.com (2026-10-21, Toby): loading them from
// Google sent every visitor's IP address to Google, Europeans included. Same families and weights as before.
import '@fontsource/cinzel/400.css'
import '@fontsource/cinzel/600.css'
import '@fontsource/cinzel/700.css'
import '@fontsource/cinzel/900.css'
import '@fontsource/cinzel-decorative/400.css'
import '@fontsource/cinzel-decorative/700.css'
import '@fontsource/cinzel-decorative/900.css'
import '@fontsource/crimson-text/400.css'
import '@fontsource/crimson-text/600.css'
import '@fontsource/crimson-text/700.css'
import '@fontsource/crimson-text/400-italic.css'

import { ViteSSG } from 'vite-ssg'
import { createPinia } from 'pinia'

import App from './App.vue'
import { routes, scrollBehavior } from './router'
import { startAds } from './data/ads'

// vite-ssg builds every page as real HTML (what Google and link previews read), then the
// browser takes over as before (2026-10-16).
export const createApp = ViteSSG(
  App,
  { routes, scrollBehavior, base: import.meta.env.BASE_URL },
  ({ app }) => {
    app.use(createPinia())
    // Google Ads measurement, US visitors only (src/data/ads.ts). Started here, in the browser,
    // before the page is hydrated: on a slow phone that is a second earlier than App's onMounted.
    if (!import.meta.env.SSR) startAds()
  }
)
