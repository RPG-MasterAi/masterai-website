<script setup lang="ts">
import { onBeforeUnmount, onMounted, reactive, ref } from 'vue'
import { RouterLink } from 'vue-router'
import SiteFooter from '@/components/site/SiteFooter.vue'
import { ADVENTURES } from '@/data/adventures'
import { CLASSES, PLAYABLE_CLASSES, RACES } from '@/data/classes'
import { DISCORD, SITE_NAV, STORE } from '@/data/links'
import { HOME_STRUCTURED_DATA, usePageMeta } from '@/data/seo'
import { useHead } from '@unhead/vue'
import trailer720 from '@/assets/trailer/trailer-720.mp4'
import trailer480 from '@/assets/trailer/trailer-480.mp4'
import trailerPoster from '@/assets/trailer/trailer-poster.webp'

// ═══════════════════════════════════════════
// rpgmaster.ai homepage — BG3-inspired design
// Ported from the React prototype (rpgmaster-homepage.jsx) on 2026-10-01.
// How It Works stays hidden (Marco, 2026-09-30) until there is a proper guide.
// Classes & Races came back on 2026-10-02 with the app's own artwork, as a
// teaser of the /classes page; the adventures teaser leads to /adventures.
// Store and Discord links live in src/data/links.ts.
// ═══════════════════════════════════════════

// The first three adventures on the homepage; the rest is one click away.
const ADVENTURE_TEASER = ADVENTURES.slice(0, 3)

const STATS = [
  // Google Play listing, read 2026-10-15: "100K+ Downloads", "2.2K reviews" (2.11K in the page data).
  // Rounded down so it stays true; App Store reviews not added (counted per country).
  { value: '100K+', label: 'Downloads' },
  { value: '2,100+', label: 'Reviews' },
  // What the public app offers today (classes marked comingSoon are not counted).
  { value: String(PLAYABLE_CLASSES), label: 'Classes' },
  { value: String(RACES.length), label: 'Races' },
  { value: '20', label: 'Max Level' }
]

const FEATURES = [
  {
    icon: '🧠',
    title: 'AI Game Master',
    desc: 'A specially trained AI becomes your personal Dungeon Master, remembering your adventures and crafting unique stories.'
  },
  {
    icon: '⚔️',
    title: 'Free Text Combat',
    desc: 'Describe your actions in natural language. No menus, no limits — just your imagination and the dice.'
  },
  {
    icon: '🎨',
    title: 'AI Image Generation',
    desc: 'Every scene comes alive with AI-generated artwork. See your adventures unfold visually.'
  },
  {
    icon: '📈',
    title: 'Level 1 to 20',
    desc: `Full progression system across ${PLAYABLE_CLASSES} classes. Unlock abilities, grow stronger, shape your legend.`
  }
]

const REVIEWS = [
  { stars: 5, text: 'Overall this is great, it has good memory for AI. It feels like my own story. An overall great AI D&D replica for solo RPG.', author: 'Play Store User' },
  { stars: 5, text: "Amazing game. The AI tracks your decisions well and the storytelling is fun. Really feels like you're living the adventure.", author: 'Play Store User' },
  { stars: 4, text: 'I really love this app. The game is great fun, the AI tracks your decisions well and the storytelling is engaging and immersive.', author: 'Play Store User' }
]

usePageMeta(() => ({
  title: 'AI Dungeon Master for Solo DnD Adventures',
  description:
    'Play solo DnD 5e adventures with an AI Game Master: say what your character does in your own words and the story answers. Free on Android and iPhone.'
}))
useHead({
  script: [{ type: 'application/ld+json', innerHTML: JSON.stringify(HOME_STRUCTURED_DATA) }]
})

const navVisible = ref(false)
const visible = reactive<Record<string, boolean>>({})

// Sections that fade in when scrolled into view. A plain `ref="..."` only
// collects into an array inside v-for, so each section registers itself.
const sectionEls: HTMLElement[] = []
const registerSection = (el: unknown) => {
  if (el instanceof HTMLElement && !sectionEls.includes(el)) sectionEls.push(el)
}

const onScroll = () => {
  navVisible.value = window.scrollY > window.innerHeight * 0.7
}

// The brand is the link home; on the homepage itself it goes back to the top.
const toTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })

let observer: IntersectionObserver | null = null

onMounted(() => {
  // The rest of the site keeps its own layout (main.css constrains #app);
  // only the homepage goes full-bleed, through this body class.
  document.body.classList.add('home-full')
  window.addEventListener('scroll', onScroll, { passive: true })
  onScroll()

  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) visible[entry.target.id] = true
      })
    },
    { threshold: 0.15 }
  )
  sectionEls.forEach((el) => observer?.observe(el))
})

// `home-full` is removed by App.vue once this page has faded out, not here.
onBeforeUnmount(() => {
  window.removeEventListener('scroll', onScroll)
  observer?.disconnect()
})
</script>

<template>
  <div class="home">
    <!-- ═══ NAVBAR ═══ -->
    <nav class="nav-bar" :class="navVisible ? 'visible' : 'hidden'">
      <a href="/" class="brand" aria-label="MasterAI home, back to the top" @click.prevent="toTop">
        <span class="brand-master">MASTER</span>
        <span class="brand-ai">AI</span>
      </a>
      <div class="nav-links">
        <RouterLink v-for="item in SITE_NAV" :key="item.to" :to="item.to" class="nav-link">
          {{ item.label }}
        </RouterLink>
      </div>
      <a href="#download" class="cta-btn cta-small">▶ Download</a>
    </nav>

    <!-- ═══ HERO — FULL SCREEN VIDEO ═══ -->
    <section class="hero-wrapper">
      <div class="hero-video-container">
        <!-- Our own file since 2026-10-18 (Marco): the YouTube embed showed the video title on top and
             set Google cookies for every visitor. Same spot ("solo sottotitoli.mp4", no captions),
             silent, 24 fps; phones get the lighter 480p file. -->
        <video :poster="trailerPoster" autoplay muted loop playsinline preload="auto" aria-hidden="true">
          <source :src="trailer480" type="video/mp4" media="(max-width: 720px)" />
          <source :src="trailer720" type="video/mp4" />
        </video>
      </div>
      <div class="hero-overlay" />
      <div class="hero-content">
        <h1 class="hero-title">MASTER<span class="gold">AI</span></h1>
        <p class="hero-subtitle">Your AI Dungeon Master — Anytime, Anywhere</p>
        <div class="button-row">
          <a :href="STORE.android" class="cta-btn" aria-label="Download MasterAI free on Google Play">
            <span class="play-icon">▶</span> Free on Android
          </a>
          <a :href="STORE.ios" class="cta-btn" aria-label="Download MasterAI free on the App Store">
            Free on iPhone
          </a>
          <a :href="DISCORD" class="cta-btn-outline">Join Discord</a>
        </div>
      </div>
      <div class="scroll-hint">⌄</div>
    </section>

    <!-- ═══ STATS BAR ═══ -->
    <section id="stats" :ref="registerSection" class="stats">
      <div class="stats-grid" :style="{ gridTemplateColumns: `repeat(${STATS.length}, minmax(0, 1fr))` }">
        <div
          v-for="(stat, i) in STATS"
          :key="stat.label"
          class="stat-item fade-up"
          :class="[`stagger-${i + 1}`, { visible: visible.stats }]"
        >
          <div class="stat-value">{{ stat.value }}</div>
          <div class="stat-label">{{ stat.label }}</div>
        </div>
      </div>
    </section>

    <!-- ═══ TAGLINE ═══ -->
    <section id="tagline" :ref="registerSection" class="tagline">
      <div class="ambient-glow glow-gold" />
      <div class="ambient-glow glow-red" />
      <div class="tagline-inner fade-up" :class="{ visible: visible.tagline }">
        <div class="gold-divider" style="margin-bottom: 40px" />
        <h2 class="tagline-title">
          Your Only Limitation Is<br /><span class="gold">Your Imagination</span>
        </h2>
        <p class="tagline-text">
          Carry a personal Game Master in your pocket. MasterAI offers you the thrill of a DnD
          session right from your phone — extraordinary text adventures powered by AI, at any time
          and place.
        </p>
        <div class="gold-divider" style="margin-top: 40px" />
      </div>
    </section>

    <!-- ═══ FEATURES ═══ -->
    <section id="features" :ref="registerSection" class="features">
      <div class="section-head fade-up" :class="{ visible: visible.features }">
        <p class="eyebrow">Powered by Advanced AI</p>
        <h2 class="section-title">Features</h2>
      </div>
      <div class="features-grid">
        <div
          v-for="(f, i) in FEATURES"
          :key="f.title"
          class="feature-card fade-up"
          :class="[`stagger-${i + 1}`, { visible: visible.features }]"
        >
          <div class="feature-icon">{{ f.icon }}</div>
          <h3 class="feature-title">{{ f.title }}</h3>
          <p class="feature-desc">{{ f.desc }}</p>
        </div>
      </div>
    </section>

    <!-- ═══ ADVENTURES ═══ -->
    <section id="adventures" :ref="registerSection" class="adventures">
      <div class="section-head fade-up" :class="{ visible: visible.adventures }">
        <p class="eyebrow">{{ ADVENTURES.length }} Worlds to Explore</p>
        <h2 class="section-title">Adventures</h2>
      </div>
      <div class="adv-grid">
        <RouterLink
          v-for="(a, i) in ADVENTURE_TEASER"
          :key="a.slug"
          :to="`/adventures/${a.slug}`"
          class="adv-card fade-up"
          :class="[`stagger-${i + 1}`, { visible: visible.adventures }]"
        >
          <img :src="a.card" :alt="a.heroAlt" loading="lazy" width="720" height="405" />
          <div class="adv-body">
            <h3 class="adv-title">
              <template v-for="(w, j) in a.title.split(' ')" :key="j"><span class="nw">{{ w }}</span>{{ ' ' }}</template>
            </h3>
            <p class="adv-tagline">{{ a.tagline }}</p>
          </div>
        </RouterLink>
      </div>
      <div class="more-row">
        <RouterLink to="/adventures" class="cta-btn-outline">See all {{ ADVENTURES.length }} adventures</RouterLink>
      </div>
    </section>

    <!-- ═══ CLASSES & RACES ═══ -->
    <section id="classes" :ref="registerSection" class="classes">
      <div class="section-head fade-up" :class="{ visible: visible.classes }">
        <p class="eyebrow">{{ PLAYABLE_CLASSES }} Classes · {{ RACES.length }} Races</p>
        <h2 class="section-title">Choose Your Hero</h2>
      </div>
      <div class="class-strip fade-up" :class="{ visible: visible.classes }">
        <RouterLink v-for="c in CLASSES" :key="c.id" to="/classes" class="class-tile" :title="c.name">
          <img :src="c.image" :alt="c.name" loading="lazy" width="512" height="512" />
          <span class="class-tile-name">{{ c.name }}</span>
        </RouterLink>
      </div>
      <div class="more-row">
        <RouterLink to="/classes" class="cta-btn-outline">Meet the classes and races</RouterLink>
      </div>
    </section>

    <!-- ═══ REVIEWS ═══ -->
    <section id="reviews" :ref="registerSection" class="reviews">
      <div class="section-head fade-up" :class="{ visible: visible.reviews }" style="margin-bottom: 40px">
        <p class="eyebrow">From Our Adventurers</p>
        <h2 class="section-title">Player Reviews</h2>
      </div>
      <div class="reviews-row">
        <div
          v-for="(r, i) in REVIEWS"
          :key="i"
          class="review-card fade-up"
          :class="[`stagger-${i + 1}`, { visible: visible.reviews }]"
        >
          <div class="review-stars">{{ '★'.repeat(r.stars) }}{{ '☆'.repeat(5 - r.stars) }}</div>
          <p class="review-text">"{{ r.text }}"</p>
          <p class="review-author">— {{ r.author }}</p>
        </div>
      </div>
    </section>

    <!-- ═══ FINAL CTA ═══ -->
    <!-- Anchor for the navbar Download button: it lands here, where both stores are offered. -->
    <span id="download" class="anchor" />
    <section id="final-cta" :ref="registerSection" class="final-cta">
      <div class="ambient-glow glow-center" />
      <div class="final-inner fade-up" :class="{ visible: visible['final-cta'] }">
        <div class="gold-divider" style="margin-bottom: 40px" />
        <h2 class="final-title">Ready to Write<br /><span class="gold">Your Legend?</span></h2>
        <p class="final-text">Join 100,000+ adventurers. Your story begins now.</p>
        <div class="button-row">
          <a :href="STORE.android" class="cta-btn cta-big" aria-label="Download MasterAI free on Google Play">
            <span class="play-icon-big">▶</span> Download Free on Android
          </a>
          <a :href="STORE.ios" class="cta-btn cta-big" aria-label="Download MasterAI free on the App Store">
            Download Free on iPhone
          </a>
        </div>
        <div class="discord-row">
          <a :href="DISCORD" class="footer-link" style="font-size: 14px">💬 Discord Community</a>
        </div>
        <div class="gold-divider" style="margin-top: 40px" />
      </div>
    </section>

    <!-- ═══ FOOTER ═══ -->
    <SiteFooter />
  </div>
</template>

<!-- Global, but only while the homepage is mounted (body.home-full).
     The other pages keep the layout from main.css untouched. -->
<style>
body.home-full {
  display: block;
  /* main.css also sets `place-items: center` on body (>= 1024px). Recent Chrome
     applies justify-items to block layout too, which shrinks #app to its
     content width (1100px) and leaves black bands on both sides. */
  place-items: normal;
  background: #0a0a0f;
}
body.home-full #app {
  max-width: none;
  margin: 0;
  padding: 0;
  display: block;
}
</style>

<style scoped>
.home {
  background: #0a0a0f;
  color: #e8e0d0;
  font-family: 'Crimson Text', Georgia, serif;
  font-size: 16px;
  line-height: normal;
  overflow-x: hidden;
}
.home * {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
.gold { color: #c9a84c; }
.red { color: #8b2500; }

/* main.css paints every link green with a green hover background: not here. */
.home a { text-decoration: none; }
.home a:hover { background-color: transparent; }

/* ── navbar ── */
.nav-bar {
  position: fixed; top: 0; left: 0; right: 0; z-index: 100;
  padding: 0 40px; height: 64px;
  display: flex; align-items: center; justify-content: space-between;
  transition: all 0.5s cubic-bezier(0.22, 1, 0.36, 1);
}
.nav-bar.visible {
  background: rgba(10, 10, 15, 0.92); backdrop-filter: blur(12px);
  border-bottom: 1px solid rgba(201, 168, 76, 0.2);
}
.nav-bar.hidden { background: transparent; }
.brand { display: flex; align-items: center; gap: 12px; }
.brand-master {
  font-family: 'Cinzel Decorative', serif; font-size: 20px; font-weight: 900;
  color: #c9a84c; letter-spacing: 2px;
}
.brand-ai {
  font-family: 'Cinzel', serif; font-size: 16px; font-weight: 400;
  color: #8b2500; letter-spacing: 1px;
}

/* ── hero ── */
.hero-wrapper { position: relative; width: 100%; height: 100vh; overflow: hidden; }
.hero-video-container {
  position: absolute; top: 50%; left: 50%;
  transform: translate(-50%, -50%);
  width: 100vw; height: 100vh; pointer-events: none;
}
.hero-video-container video {
  position: absolute; inset: 0;
  width: 100%; height: 100%;
  object-fit: cover;
}
.hero-overlay {
  position: absolute; inset: 0;
  background: linear-gradient(to bottom, rgba(10, 10, 15, 0.3) 0%, rgba(10, 10, 15, 0.1) 40%, rgba(10, 10, 15, 0.4) 70%, rgba(10, 10, 15, 1) 100%);
  z-index: 2;
}
.hero-content {
  position: absolute; bottom: 12%; left: 0; right: 0;
  z-index: 3; text-align: center; padding: 0 20px;
}
.hero-title {
  font-family: 'Cinzel Decorative', serif; font-size: clamp(36px, 6vw, 72px); font-weight: 900;
  color: #ffffff; text-shadow: 0 2px 40px rgba(0, 0, 0, 0.8), 0 0 80px rgba(201, 168, 76, 0.2);
  letter-spacing: 4px; margin-bottom: 16px; line-height: 1.1;
}
.hero-subtitle {
  font-family: 'Cinzel', serif; font-size: clamp(14px, 2vw, 22px); color: rgba(232, 224, 208, 0.8);
  letter-spacing: 6px; text-transform: uppercase; margin-bottom: 40px;
  text-shadow: 0 2px 20px rgba(0, 0, 0, 0.9);
}
.button-row { display: flex; gap: 16px; justify-content: center; flex-wrap: wrap; }
.play-icon { font-size: 18px; }
.play-icon-big { font-size: 20px; }
.scroll-hint {
  position: absolute; bottom: 24px; left: 50%; transform: translateX(-50%);
  z-index: 3; text-align: center; animation: bounce 2s infinite;
  color: rgba(201, 168, 76, 0.5); font-size: 24px;
}

/* ── buttons ── */
.cta-btn {
  display: inline-flex; align-items: center; gap: 12px;
  padding: 16px 40px;
  background: linear-gradient(135deg, #c9a84c 0%, #a8872a 100%);
  color: #0a0a0f; font-family: 'Cinzel', serif; font-weight: 700;
  font-size: 14px; letter-spacing: 3px; text-transform: uppercase;
  border: none; cursor: pointer;
  position: relative; overflow: hidden; transition: all 0.4s;
}
.cta-btn:hover { transform: translateY(-2px); box-shadow: 0 8px 32px rgba(201, 168, 76, 0.4); }
.cta-btn::before {
  content: ''; position: absolute; top: 0; left: -100%;
  width: 100%; height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
  transition: left 0.6s;
}
.cta-btn:hover::before { left: 100%; }
.cta-small { padding: 10px 24px; font-size: 11px; }
.cta-big { font-size: 14px; }
.cta-btn-outline {
  display: inline-flex; align-items: center; gap: 10px;
  padding: 14px 32px; background: transparent; color: #c9a84c;
  font-family: 'Cinzel', serif; font-weight: 600; font-size: 13px;
  letter-spacing: 2px; text-transform: uppercase;
  border: 1px solid rgba(201, 168, 76, 0.5); cursor: pointer; transition: all 0.3s;
}
.home .cta-btn-outline:hover { background: rgba(201, 168, 76, 0.1); border-color: #c9a84c; }

/* ── shared ── */
.gold-divider {
  width: 120px; height: 1px;
  background: linear-gradient(90deg, transparent, #c9a84c, transparent);
  margin: 0 auto;
}
.gold-divider-wide {
  width: 100%; height: 1px;
  background: linear-gradient(90deg, transparent, rgba(201, 168, 76, 0.3) 20%, rgba(201, 168, 76, 0.3) 80%, transparent);
}
.fade-up {
  opacity: 0; transform: translateY(40px);
  transition: opacity 0.8s cubic-bezier(0.22, 1, 0.36, 1), transform 0.8s cubic-bezier(0.22, 1, 0.36, 1);
}
.fade-up.visible { opacity: 1; transform: translateY(0); }
.stagger-1 { transition-delay: 0.1s; }
.stagger-2 { transition-delay: 0.2s; }
.stagger-3 { transition-delay: 0.3s; }
.stagger-4 { transition-delay: 0.4s; }
.ambient-glow { position: absolute; border-radius: 50%; filter: blur(120px); opacity: 0.15; pointer-events: none; }
.section-head { text-align: center; margin-bottom: 60px; }
.eyebrow {
  font-family: 'Cinzel', serif; font-size: 12px; letter-spacing: 4px; color: #c9a84c;
  text-transform: uppercase; margin-bottom: 12px;
}
.section-title { font-family: 'Cinzel', serif; font-size: clamp(28px, 3.5vw, 40px); font-weight: 700; }

/* ── stats ── */
.stats {
  background: linear-gradient(180deg, #0a0a0f 0%, #0f0f18 100%);
  border-top: 1px solid rgba(201, 168, 76, 0.15);
  border-bottom: 1px solid rgba(201, 168, 76, 0.15);
}
.stats-grid { max-width: 1000px; margin: 0 auto; display: grid; }
.stat-item { text-align: center; padding: 30px 20px; position: relative; }
.stat-item::after {
  content: ''; position: absolute; right: 0; top: 20%; height: 60%; width: 1px;
  background: linear-gradient(to bottom, transparent, rgba(201, 168, 76, 0.3), transparent);
}
.stat-item:last-child::after { display: none; }
.stat-value {
  font-family: 'Cinzel Decorative', serif; font-size: clamp(28px, 3.5vw, 42px); font-weight: 900;
  color: #c9a84c; line-height: 1; margin-bottom: 6px;
}
.stat-label {
  font-family: 'Cinzel', serif; font-size: 11px; letter-spacing: 3px;
  text-transform: uppercase; color: #6b6b6b;
}

/* ── tagline ── */
.tagline { padding: 120px 20px; text-align: center; position: relative; overflow: hidden; }
.glow-gold { width: 500px; height: 500px; background: #c9a84c; top: 20%; left: -10%; }
.glow-red { width: 400px; height: 400px; background: #8b2500; bottom: 10%; right: -5%; }
.tagline-inner { max-width: 800px; margin: 0 auto; position: relative; z-index: 1; }
.tagline-title {
  font-family: 'Cinzel Decorative', serif; font-size: clamp(24px, 4vw, 48px); font-weight: 700;
  color: #e8e0d0; line-height: 1.3; margin-bottom: 24px;
}
.tagline-text { font-size: 18px; line-height: 1.8; color: #a89070; max-width: 600px; margin: 0 auto; }

/* ── features ── */
.features { padding: 80px 20px 100px; max-width: 1200px; margin: 0 auto; }
.features-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 24px; }
.feature-card {
  background: linear-gradient(135deg, rgba(201, 168, 76, 0.05) 0%, rgba(20, 20, 30, 0.8) 100%);
  border: 1px solid rgba(201, 168, 76, 0.15); padding: 40px 30px;
  text-align: center; transition: all 0.4s; position: relative; overflow: hidden;
}
.feature-card::before {
  content: ''; position: absolute; top: 0; left: 0; right: 0; height: 2px;
  background: linear-gradient(90deg, transparent, #c9a84c, transparent);
  opacity: 0; transition: opacity 0.4s;
}
.feature-card:hover { transform: translateY(-4px); border-color: rgba(201, 168, 76, 0.4); box-shadow: 0 12px 40px rgba(0, 0, 0, 0.4); }
.feature-card:hover::before { opacity: 1; }
.feature-icon { font-size: 40px; margin-bottom: 20px; }
.feature-title {
  font-family: 'Cinzel', serif; font-size: 18px; font-weight: 700; color: #e8e0d0;
  margin-bottom: 12px; letter-spacing: 1px;
}
.feature-desc { font-size: 15px; line-height: 1.7; color: #8a7e6e; }

/* ── reviews ── */
.reviews { padding: 80px 20px; max-width: 1100px; margin: 0 auto; }
.reviews-row { display: flex; gap: 20px; justify-content: center; flex-wrap: wrap; }
.review-card {
  background: rgba(20, 20, 30, 0.6); border: 1px solid rgba(201, 168, 76, 0.1);
  padding: 28px; border-radius: 4px; min-width: 300px; max-width: 340px; flex-shrink: 0;
}
.review-stars { color: #c9a84c; font-size: 16px; margin-bottom: 12px; letter-spacing: 2px; }
.review-text { font-size: 14px; line-height: 1.7; color: #a89070; margin-bottom: 16px; font-style: italic; }
.review-author { font-size: 12px; color: #4a4a4a; font-family: 'Cinzel', serif; letter-spacing: 1px; }

/* ── final CTA ── */
.anchor { display: block; position: relative; top: -80px; }
.final-cta {
  padding: 120px 20px; text-align: center; position: relative; overflow: hidden;
  background: linear-gradient(180deg, #0a0a0f 0%, #14121e 50%, #0a0a0f 100%);
}
.glow-center { width: 600px; height: 600px; background: #c9a84c; top: 10%; left: 30%; }
.final-inner { position: relative; z-index: 1; }
.final-title {
  font-family: 'Cinzel Decorative', serif; font-size: clamp(28px, 4.5vw, 52px); font-weight: 900;
  margin-bottom: 16px; line-height: 1.2;
}
.final-text { font-size: 18px; color: #8a7e6e; max-width: 500px; margin: 0 auto 40px; }
.discord-row { margin-top: 24px; display: flex; gap: 24px; justify-content: center; }

/* ── navbar links ── */
.nav-links { display: flex; gap: 28px; margin-left: auto; margin-right: 28px; }
.nav-link {
  font-family: 'Cinzel', serif; font-size: 13px; letter-spacing: 2px; text-transform: uppercase;
  color: #a89070; transition: color 0.3s;
}
.home .nav-link:hover { color: #c9a84c; }

/* ── adventures teaser ── */
.adventures { padding: 80px 20px 60px; max-width: 1200px; margin: 0 auto; }
.adv-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 24px; }
.adv-card {
  display: block; color: inherit; overflow: hidden;
  background: rgba(20, 20, 30, 0.8); border: 1px solid rgba(201, 168, 76, 0.15);
  transition: border-color 0.4s, box-shadow 0.4s, opacity 0.8s cubic-bezier(0.22, 1, 0.36, 1), transform 0.8s cubic-bezier(0.22, 1, 0.36, 1);
}
.adv-card:hover { border-color: rgba(201, 168, 76, 0.45); box-shadow: 0 12px 40px rgba(0, 0, 0, 0.5); }
.adv-card img { width: 100%; height: auto; aspect-ratio: 16 / 9; object-fit: cover; display: block; }
.adv-body { padding: 20px 22px 24px; }
.adv-title { font-family: 'Cinzel', serif; font-size: 18px; font-weight: 700; color: #e8e0d0; margin-bottom: 8px; letter-spacing: 1px; }
.nw { white-space: nowrap; }
.adv-tagline { font-size: 15px; line-height: 1.6; color: #8a7e6e; font-style: italic; }
.more-row { display: flex; justify-content: center; margin-top: 36px; }

/* ── classes teaser ── */
.classes { padding: 60px 20px 80px; max-width: 1200px; margin: 0 auto; }
.class-strip { display: grid; grid-template-columns: repeat(6, 1fr); gap: 12px; }
.class-tile { position: relative; display: block; overflow: hidden; border: 1px solid rgba(201, 168, 76, 0.15); transition: border-color 0.4s; }
.class-tile:hover { border-color: #c9a84c; }
.class-tile img { width: 100%; height: auto; aspect-ratio: 1; object-fit: cover; display: block; transition: transform 0.6s; }
.class-tile:hover img { transform: scale(1.06); }
.class-tile::after { content: ''; position: absolute; inset: 0; background: linear-gradient(to bottom, transparent 55%, rgba(10, 10, 15, 0.9) 100%); }
.class-tile-name {
  position: absolute; left: 0; right: 0; bottom: 8px; z-index: 1; text-align: center;
  font-family: 'Cinzel', serif; font-size: 12px; font-weight: 700; letter-spacing: 1px;
  text-transform: uppercase; color: #e8e0d0;
}

@media (max-width: 860px) {
  /* The menu stays on tablets and phones (it used to disappear): tighter, then without Download. */
  .nav-links { gap: 16px; margin-right: 16px; }
  .nav-link { font-size: 12px; letter-spacing: 1px; }
  /* Five stats do not fit side by side on a phone (the last two ended off screen): 3 + 2. */
  .stats-grid { grid-template-columns: repeat(3, minmax(0, 1fr)) !important; }
  .stat-item { padding: 20px 8px; }
  .stat-item:nth-child(3)::after { display: none; }
  .class-strip { grid-template-columns: repeat(4, 1fr); }
}
@media (max-width: 720px) {
  /* As on the content pages: on a phone the menu wins, the hero already has the store buttons. */
  .cta-small { display: none; }
  .nav-links { gap: 14px; margin-right: 0; }
  .nav-link { font-size: 11px; }
}
@media (max-width: 380px) {
  .brand-ai { display: none; }
}
@media (max-width: 480px) {
  /* The Download button used to cover the MASTER AI brand on a 390px phone. */
  .nav-bar { padding: 0 16px; }
  .brand { gap: 8px; }
  .brand-master { font-size: 16px; letter-spacing: 1px; }
  .brand-ai { font-size: 13px; }
  .cta-small { padding: 9px 14px; letter-spacing: 1px; gap: 6px; }
  .class-strip { grid-template-columns: repeat(3, 1fr); gap: 8px; }
  .class-tile-name { font-size: 10px; }
}

@keyframes bounce {
  0%, 100% { transform: translateX(-50%) translateY(0); }
  50% { transform: translateX(-50%) translateY(8px); }
}
</style>
