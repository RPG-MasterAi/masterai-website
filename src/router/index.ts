import type { RouteRecordRaw, RouterScrollBehavior } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import { ADVENTURES } from '../data/adventures'

// Pages fade out before the next one fades in (App.vue). The scroll must wait for that:
// done right away, the page you are leaving jumps to its top and shows it for a moment
// (Marco, 2026-10-15). App.vue calls `pageLeft` when the old page is gone.
let afterLeave: (() => void) | null = null
export const pageLeft = () => {
  const run = afterLeave
  afterLeave = null
  run?.()
}

// The router itself is created by vite-ssg (main.ts), which pre-renders every page at build time.
export const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (About.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import('../views/AboutView.vue')
  },
  {
    path: '/privacy',
    name: 'privacy',
    component: () => import('../views/PrivacyView.vue'),
    // Legal pages in the new frame since 2026-10-15; same paths, the app and the stores link here.
    meta: { fullBleed: true }
  },
  {
    path: '/tos',
    name: 'TOS',
    component: () => import('../views/TosView.vue'),
    meta: { fullBleed: true }
  },
  {
    path: '/account-deletion',
    name: 'account-deletion',
    component: () => import('../views/AccountDeletionView.vue'),
    meta: { fullBleed: true }
  },
  {
    path: '/support',
    name: 'support',
    component: () => import('../views/SupportView.vue')
  },
  // Content pages (2026-10-02). `fullBleed`: they draw their own top bar and
  // footer, so App.vue hides the classic header, as on the homepage.
  {
    path: '/adventures',
    name: 'adventures',
    component: () => import('../views/AdventuresView.vue'),
    meta: { fullBleed: true }
  },
  {
    // Only the adventures that exist: any other slug is a "not found" page, as on the server.
    path: `/adventures/:slug(${ADVENTURES.map((a) => a.slug).join('|')})`,
    name: 'adventure',
    component: () => import('../views/AdventureView.vue'),
    props: true,
    meta: { fullBleed: true }
  },
  {
    path: '/classes',
    name: 'classes',
    component: () => import('../views/ClassesView.vue'),
    meta: { fullBleed: true }
  },
  {
    path: '/roadmap',
    name: 'roadmap',
    component: () => import('../views/RoadmapView.vue'),
    meta: { fullBleed: true }
  },
  // Landing page of the Google Ads video campaign (2026-10-21): not in the menu, not in search.
  {
    path: '/play',
    name: 'play',
    component: () => import('../views/PlayView.vue'),
    meta: { fullBleed: true }
  },
  // Any other address: a real "not found" page. The build writes it to 404.html, which
  // Cloudflare Pages serves with status 404 (before, every address answered with the home).
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: () => import('../views/NotFoundView.vue'),
    meta: { fullBleed: true }
  }
]

// A new page opens from the top; back/forward returns where you were; #anchors still work.
export const scrollBehavior: RouterScrollBehavior = (to, from, savedPosition) => {
  const position = savedPosition ?? (to.hash ? { el: to.hash, top: 80 } : { top: 0 })
  // No fade in these cases, so nothing to wait for: first load, an anchor on the same page,
  // or the same page with other data (one adventure to the next).
  if (!from.matched.length || to.path === from.path || to.matched[0] === from.matched[0]) return position
  return new Promise((resolve) => {
    afterLeave = () => requestAnimationFrame(() => resolve(position))
    // Safety net: if the fade never reports back, scroll anyway.
    setTimeout(pageLeft, 700)
  })
}
