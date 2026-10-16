import './assets/main.css'

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
