import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
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
      path: '/adventures/:slug',
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
    }
  ],
  // A new page opens from the top; back/forward returns where you were; #anchors still work.
  scrollBehavior(to, _from, savedPosition) {
    if (savedPosition) return savedPosition
    if (to.hash) return { el: to.hash, top: 80 }
    return { top: 0 }
  }
})

export default router
