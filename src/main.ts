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

// vite-ssg builds every page as real HTML (what Google and link previews read), then the
// browser takes over as before (2026-10-16).
export const createApp = ViteSSG(
  App,
  { routes, scrollBehavior, base: import.meta.env.BASE_URL },
  ({ app }) => {
    app.use(createPinia())
  }
)
