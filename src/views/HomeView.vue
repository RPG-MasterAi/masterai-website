<script setup lang="ts">
import { onBeforeUnmount, onMounted, reactive, ref } from 'vue'
import { RouterLink } from 'vue-router'

// ═══════════════════════════════════════════
// rpgmaster.ai homepage — BG3-inspired design
// Ported from the React prototype (rpgmaster-homepage.jsx) on 2026-10-01.
// Sections hidden on Marco's request (2026-09-30) are not ported: How It Works,
// Classes & Races. They come back with real artwork and a proper guide.
// ═══════════════════════════════════════════

// Store links — single source of truth. Verified 2026-09-30.
// The App Store URL has no country code on purpose: Apple redirects each
// visitor to their own country store.
const STORE = {
  android: 'https://play.google.com/store/apps/details?id=ai.rpgmaster.masterai',
  ios: 'https://apps.apple.com/app/id6744970225'
}

const DISCORD = 'https://discord.gg/bPrEUFtjnp'

const STATS = [
  { value: '100K+', label: 'Downloads' },
  { value: '1,600+', label: 'Reviews' },
  { value: '12', label: 'Classes' },
  { value: '8', label: 'Races' },
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
    desc: 'Full progression system across 12 classes. Unlock abilities, grow stronger, shape your legend.'
  }
]

const REVIEWS = [
  { stars: 5, text: 'Overall this is great, it has good memory for AI. It feels like my own story. An overall great AI D&D replica for solo RPG.', author: 'Play Store User' },
  { stars: 5, text: "Amazing game. The AI tracks your decisions well and the storytelling is fun. Really feels like you're living the adventure.", author: 'Play Store User' },
  { stars: 4, text: 'I really love this app. The game is great fun, the AI tracks your decisions well and the storytelling is engaging and immersive.', author: 'Play Store User' }
]

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

onBeforeUnmount(() => {
  document.body.classList.remove('home-full')
  window.removeEventListener('scroll', onScroll)
  observer?.disconnect()
})
</script>

<template>
  <div class="home">
    <!-- ═══ NAVBAR ═══ -->
    <nav class="nav-bar" :class="navVisible ? 'visible' : 'hidden'">
      <div class="brand">
        <span class="brand-master">MASTER</span>
        <span class="brand-ai">AI</span>
      </div>
      <a href="#download" class="cta-btn cta-small">▶ Download</a>
    </nav>

    <!-- ═══ HERO — FULL SCREEN VIDEO ═══ -->
    <section class="hero-wrapper">
      <div class="hero-video-container">
        <iframe
          src="https://www.youtube.com/embed/XPVT_lPft3I?autoplay=1&mute=1&loop=1&playlist=XPVT_lPft3I&controls=0&showinfo=0&modestbranding=1&rel=0&disablekb=1&iv_load_policy=3&playsinline=1"
          title="RPGMaster AI Trailer"
          frameborder="0"
          allow="autoplay; encrypted-media"
          allowfullscreen
        />
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
      <div class="stats-grid" :style="{ gridTemplateColumns: `repeat(${STATS.length}, 1fr)` }">
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
          Carry a personal Game Master in your pocket. MasterAI offers you the thrill of a D&amp;D
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
    <footer class="footer">
      <div class="footer-grid">
        <div>
          <div class="footer-brand">MASTER<span class="red">AI</span></div>
          <p class="footer-tag">The ultimate AI-powered RPG.<br />Your imagination is the only limit.</p>
        </div>
        <div>
          <h4 class="footer-head">Connect</h4>
          <div class="footer-col">
            <a :href="DISCORD" class="footer-link">Discord</a>
            <a :href="STORE.android" class="footer-link">Google Play</a>
            <a :href="STORE.ios" class="footer-link">App Store</a>
            <RouterLink to="/support" class="footer-link">Support</RouterLink>
            <a href="mailto:Info@rpgmaster.ai" class="footer-link">Contact</a>
          </div>
        </div>
        <div>
          <h4 class="footer-head">Legal</h4>
          <div class="footer-col">
            <RouterLink to="/privacy" class="footer-link">Privacy Policy</RouterLink>
            <RouterLink to="/tos" class="footer-link">Terms of Service</RouterLink>
          </div>
        </div>
      </div>
      <div class="gold-divider-wide" />
      <div class="copyright">
        <p>© 2026 MasterAI — RPGMaster.ai. All rights reserved.</p>
      </div>
    </footer>
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
.hero-video-container iframe {
  position: absolute; top: 50%; left: 50%;
  width: 177.78vh; height: 56.25vw;
  min-width: 100%; min-height: 100%;
  transform: translate(-50%, -50%);
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

/* ── footer ── */
.footer { padding: 60px 20px 40px; border-top: 1px solid rgba(201, 168, 76, 0.1); max-width: 1200px; margin: 0 auto; }
.footer-grid {
  display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 40px; margin-bottom: 40px;
}
.footer-brand { font-family: 'Cinzel Decorative', serif; font-size: 20px; font-weight: 900; color: #c9a84c; margin-bottom: 16px; }
.footer-tag { font-size: 13px; line-height: 1.7; color: #4a4a4a; }
.footer-head {
  font-family: 'Cinzel', serif; font-size: 12px; letter-spacing: 3px; color: #6b6b6b;
  text-transform: uppercase; margin-bottom: 16px;
}
.footer-col { display: flex; flex-direction: column; gap: 10px; }
.footer-link { color: #6b6b6b; font-size: 13px; transition: color 0.3s; }
.home .footer-link:hover { color: #c9a84c; }
.copyright { text-align: center; padding-top: 24px; }
.copyright p { font-size: 12px; color: #333; letter-spacing: 1px; }

@keyframes bounce {
  0%, 100% { transform: translateX(-50%) translateY(0); }
  50% { transform: translateX(-50%) translateY(8px); }
}
</style>
