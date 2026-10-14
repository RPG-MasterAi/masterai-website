<script setup lang="ts">
import { onBeforeUnmount, onMounted, watch } from 'vue'
import { RouterLink } from 'vue-router'
import { DISCORD, SITE_NAV, STORE } from '@/data/links'
import SiteFooter from './SiteFooter.vue'

// Frame of the content pages (adventures, classes, roadmap): same look as the
// homepage, a solid top bar, the download band and the footer.
// The legal and support pages keep their own layout and are not wrapped in this.

const props = defineProps<{ title: string }>()

// Each content page names itself in the browser tab and in search results;
// the old title comes back when the page is left.
let previousTitle = ''
watch(
  () => props.title,
  (t) => { document.title = `${t} — MasterAI` }
)

onMounted(() => {
  previousTitle = document.title
  document.title = `${props.title} — MasterAI`
  document.body.classList.add('site-full')
})
// `site-full` is removed by App.vue once this page has faded out, not here.
onBeforeUnmount(() => {
  document.title = previousTitle
})
</script>

<template>
  <div class="site">
    <nav class="site-nav">
      <RouterLink to="/" class="brand" aria-label="MasterAI home">
        <span class="brand-master">MASTER</span>
        <span class="brand-ai">AI</span>
      </RouterLink>
      <div class="nav-links">
        <RouterLink v-for="item in SITE_NAV" :key="item.to" :to="item.to" class="nav-link">
          {{ item.label }}
        </RouterLink>
      </div>
      <a href="#get-the-app" class="nav-cta">▶ Download</a>
    </nav>

    <main class="site-main">
      <slot />
    </main>

    <section id="get-the-app" class="get-app">
      <div class="gold-divider" />
      <h2 class="get-app-title">Ready to Write <span class="gold">Your Legend?</span></h2>
      <p class="get-app-text">MasterAI is free on Android and iPhone.</p>
      <div class="get-app-buttons">
        <a :href="STORE.android" class="store-btn" aria-label="Download MasterAI free on Google Play">▶ Free on Android</a>
        <a :href="STORE.ios" class="store-btn" aria-label="Download MasterAI free on the App Store">Free on iPhone</a>
        <a :href="DISCORD" class="store-btn-outline">Join Discord</a>
      </div>
    </section>

    <SiteFooter />
  </div>
</template>

<!-- Global, but only while a content page is mounted (body.site-full).
     Same reset as the homepage: main.css centers and narrows #app for the old pages. -->
<style>
body.site-full {
  display: block;
  place-items: normal;
  background: #0a0a0f;
}
body.site-full #app {
  max-width: none;
  margin: 0;
  padding: 0;
  display: block;
}
</style>

<style scoped>
.site {
  background: #0a0a0f;
  color: #e8e0d0;
  font-family: 'Crimson Text', Georgia, serif;
  font-size: 18px;
  line-height: 1.6;
  min-height: 100vh;
  overflow-x: hidden;
}
.site a { text-decoration: none; }
.site a:hover { background-color: transparent; }
.gold { color: #c9a84c; }

/* ── top bar ── */
.site-nav {
  position: sticky; top: 0; z-index: 100;
  height: 64px; padding: 0 40px;
  display: flex; align-items: center; gap: 32px;
  background: rgba(10, 10, 15, 0.92); backdrop-filter: blur(12px);
  border-bottom: 1px solid rgba(201, 168, 76, 0.2);
}
.brand { display: flex; align-items: baseline; gap: 10px; white-space: nowrap; }
.brand-master {
  font-family: 'Cinzel Decorative', serif; font-size: 20px; font-weight: 900;
  color: #c9a84c; letter-spacing: 2px;
}
.brand-ai { font-family: 'Cinzel', serif; font-size: 16px; color: #8b2500; letter-spacing: 1px; }
.nav-links { display: flex; gap: 28px; flex: 1; }
.nav-link {
  font-family: 'Cinzel', serif; font-size: 13px; letter-spacing: 2px; text-transform: uppercase;
  color: #a89070; transition: color 0.3s;
}
.nav-link:hover, .nav-link.router-link-active { color: #c9a84c; }
.nav-cta {
  padding: 10px 24px;
  background: linear-gradient(135deg, #c9a84c 0%, #a8872a 100%);
  color: #0a0a0f; font-family: 'Cinzel', serif; font-weight: 700;
  font-size: 11px; letter-spacing: 3px; text-transform: uppercase; white-space: nowrap;
}

.site-main { min-height: 60vh; }

/* ── download band ── */
.get-app {
  padding: 100px 20px; text-align: center;
  background: linear-gradient(180deg, #0a0a0f 0%, #14121e 50%, #0a0a0f 100%);
}
.gold-divider {
  width: 120px; height: 1px; margin: 0 auto 40px;
  background: linear-gradient(90deg, transparent, #c9a84c, transparent);
}
.get-app-title {
  font-family: 'Cinzel Decorative', serif; font-size: clamp(26px, 4vw, 44px); font-weight: 900;
  line-height: 1.2; margin: 0 0 16px; color: #e8e0d0;
}
.get-app-text { color: #8a7e6e; margin: 0 0 36px; }
.get-app-buttons { display: flex; gap: 16px; justify-content: center; flex-wrap: wrap; }
.store-btn {
  display: inline-flex; align-items: center; padding: 16px 36px;
  background: linear-gradient(135deg, #c9a84c 0%, #a8872a 100%);
  color: #0a0a0f; font-family: 'Cinzel', serif; font-weight: 700;
  font-size: 14px; letter-spacing: 3px; text-transform: uppercase; transition: all 0.4s;
}
.store-btn:hover { transform: translateY(-2px); box-shadow: 0 8px 32px rgba(201, 168, 76, 0.4); }
.store-btn-outline {
  display: inline-flex; align-items: center; padding: 14px 30px;
  color: #c9a84c; border: 1px solid rgba(201, 168, 76, 0.5);
  font-family: 'Cinzel', serif; font-weight: 600; font-size: 13px;
  letter-spacing: 2px; text-transform: uppercase; transition: all 0.3s;
}
.site .store-btn-outline:hover { background: rgba(201, 168, 76, 0.1); border-color: #c9a84c; }

/* ── phone ── */
@media (max-width: 720px) {
  .site-nav { padding: 0 16px; gap: 16px; }
  .brand-master { font-size: 16px; letter-spacing: 1px; }
  .brand-ai { font-size: 13px; }
  .nav-links { gap: 14px; justify-content: flex-end; }
  .nav-link { font-size: 11px; letter-spacing: 1px; }
  .nav-cta { display: none; }
}
@media (max-width: 380px) {
  .brand-ai { display: none; }
}
</style>
