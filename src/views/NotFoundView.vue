<script setup lang="ts">
import { RouterLink } from 'vue-router'
import SiteShell from '@/components/site/SiteShell.vue'
import { SITE_NAV } from '@/data/links'

// Any address that is not a page (2026-10-16). Cloudflare Pages serves it from 404.html with
// status 404, so search engines stop treating made-up addresses as copies of the homepage.
</script>

<template>
  <SiteShell title="Page Not Found" description="This page does not exist on rpgmaster.ai." noindex>
    <header class="page-head">
      <p class="eyebrow">404</p>
      <h1 class="page-title">A Path That <span class="gold">Leads Nowhere</span></h1>
      <p class="page-intro">The page you are looking for does not exist, or it has moved.</p>
      <div class="links">
        <RouterLink to="/" class="link-main">Back to the homepage</RouterLink>
        <RouterLink v-for="item in SITE_NAV" :key="item.to" :to="item.to" class="link">
          {{ item.label }}
        </RouterLink>
      </div>
    </header>
  </SiteShell>
</template>

<style scoped>
.page-head { max-width: 760px; margin: 0 auto; padding: 96px 20px 40px; text-align: center; }
.eyebrow {
  font-family: 'Cinzel', serif; font-size: 12px; letter-spacing: 4px; color: #c9a84c;
  text-transform: uppercase; margin: 0 0 12px;
}
.gold { color: #c9a84c; }
.page-title {
  font-family: 'Cinzel Decorative', serif; font-size: clamp(30px, 5vw, 52px); font-weight: 900;
  line-height: 1.15; margin: 0 0 20px; color: #e8e0d0;
}
.page-intro { color: #a89070; font-size: 19px; line-height: 1.7; margin: 0 0 40px; }
.links { display: flex; gap: 14px; justify-content: center; flex-wrap: wrap; }
.link-main, .link {
  display: inline-flex; align-items: center; padding: 12px 26px;
  font-family: 'Cinzel', serif; font-size: 13px; letter-spacing: 2px; text-transform: uppercase;
}
.link-main { background: linear-gradient(135deg, #c9a84c 0%, #a8872a 100%); color: #0a0a0f; font-weight: 700; }
.link { color: #c9a84c; border: 1px solid rgba(201, 168, 76, 0.5); }
.link:hover { background: rgba(201, 168, 76, 0.1); border-color: #c9a84c; }

@media (max-width: 720px) {
  .page-head { padding-top: 64px; }
  .page-intro { font-size: 17px; }
}
</style>
