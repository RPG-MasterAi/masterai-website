<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useHead } from '@unhead/vue'
import { RouterLink } from 'vue-router'
import { STORE } from '@/data/links'
import { REVIEWS } from '@/data/reviews'
import { usePageMeta } from '@/data/seo'
import trailer720 from '@/assets/trailer/trailer-720-audio.mp4'
import trailer480 from '@/assets/trailer/trailer-480-audio.mp4'
import trailerPoster from '@/assets/trailer/trailer-poster.webp'
import appStoreBadge from '@/assets/badges/app-store-badge.svg'
import googlePlayBadge from '@/assets/badges/google-play-badge.png'

// Landing page for the Google Ads video campaign (Marco, 2026-10-21): the same spot as the ad,
// the store buttons on top of it, a few lines and reviews below, a way home at the bottom.
// No menu on purpose: one page, one thing to do. Kept out of search results and of the sitemap.
// Store clicks are counted by src/data/ads.ts like on every other page.
//
// Our own video file, not a YouTube player: YouTube sets Google cookies for every visitor,
// Europeans included (Toby, 2026-10-20), and shows its title and suggested videos on top.
// Browsers only autoplay muted videos, so it starts silent with a sound button.
//
// The store badges are the official ones, unaltered (Apple and Google forbid changing them);
// the wooden sign around them is ours. Karen's carved signs will replace the CSS wood.

// The Realm Crier (the players' newspaper) gets its link here once it is published.
const GAZZETTA_URL = ''

// Phones see their own store first; computers see both. The device is marked on <html> by a small
// script in <head>, before the page is drawn: done by Vue after loading, phones saw both buttons
// for a moment and then one vanished (Marco, 2026-10-21). The CSS below hides the other store.
// `data-cfasync="false"` keeps Cloudflare's Rocket Loader from delaying it.
// iPadOS reports itself as a Mac: a Mac with a touch screen is an iPad.
const MARK_DEVICE = `(function(){var u=navigator.userAgent,d=/iPhone|iPad|iPod/.test(u)||(/Macintosh/.test(u)&&navigator.maxTouchPoints>1)?'ios':/Android/.test(u)?'android':'';if(d)document.documentElement.setAttribute('data-device',d)})()`

const video = ref<HTMLVideoElement | null>(null)
const soundOn = ref(false)
let heardFromStart = false

// The first time the sound is turned on, the spot starts over, so the story is heard from the top.
const toggleSound = () => {
  const v = video.value
  if (!v) return
  soundOn.value = !soundOn.value
  v.muted = !soundOn.value
  if (soundOn.value && !heardFromStart) {
    heardFromStart = true
    v.currentTime = 0
  }
  v.play().catch(() => {})
}

usePageMeta(() => ({
  title: 'Your AI Dungeon Master — Free on iPhone and Android',
  description:
    'Play solo DnD 5e adventures with an AI Game Master: say what your character does in your own words and the story answers.',
  noindex: true
}))
useHead({
  script: [{ innerHTML: MARK_DEVICE, 'data-cfasync': 'false', tagPriority: 'critical' }]
})

onMounted(() => {
  document.body.classList.add('site-full')
  // Arriving from another page of the site, the <head> script may not have run: mark it here too.
  new Function(MARK_DEVICE)()
})
// `site-full` is removed by App.vue once this page has faded out, not here.
</script>

<template>
  <div class="play">
    <!-- ═══ VIDEO WITH THE STORE SIGNS ON TOP ═══ -->
    <section class="hero">
      <video
        ref="video"
        class="hero-video"
        :poster="trailerPoster"
        autoplay
        muted
        loop
        playsinline
        preload="auto"
      >
        <source :src="trailer480" type="video/mp4" media="(max-width: 720px)" />
        <source :src="trailer720" type="video/mp4" />
      </video>
      <div class="hero-shade" />

      <RouterLink to="/" class="brand" aria-label="MasterAI home">
        <span class="brand-master">MASTER</span><span class="brand-ai">AI</span>
      </RouterLink>
      <button type="button" class="sound-btn" :aria-pressed="soundOn" @click="toggleSound">
        <span aria-hidden="true">{{ soundOn ? '🔊' : '🔇' }}</span>
        {{ soundOn ? 'Sound on' : 'Tap for sound' }}
      </button>

      <div class="hero-content">
        <h1 class="hero-title">Your AI <span class="gold">Dungeon Master</span></h1>
        <p class="hero-subtitle">Free on iPhone and Android</p>

        <div class="signs device-signs">
          <a
            :href="STORE.ios"
            class="sign sign-ios"
            aria-label="Download MasterAI on the App Store"
          >
            <span class="sign-word">Download</span>
            <img :src="appStoreBadge" alt="Download on the App Store" class="badge" width="150" height="50" />
          </a>
          <a
            :href="STORE.android"
            class="sign sign-android"
            aria-label="Get MasterAI on Google Play"
          >
            <span class="sign-word">Download</span>
            <img :src="googlePlayBadge" alt="Get it on Google Play" class="badge" width="168" height="50" />
          </a>
        </div>
        <p class="also also-ios">Also on <a :href="STORE.android">Android</a></p>
        <p class="also also-android">Also on <a :href="STORE.ios">iPhone</a></p>
      </div>
    </section>

    <!-- ═══ WHAT IT IS ═══ -->
    <section class="about">
      <div class="gold-divider" />
      <h2 class="about-title">Your Story, <span class="gold">Your Words</span></h2>
      <p class="about-text">
        MasterAI is a Game Master in your pocket for solo DnD 5e adventures. Say what your character
        does in your own words, roll the dice, and the story answers — with artwork for every scene,
        from level 1 to 20.
      </p>
      <p class="proof"><strong>100K+</strong> downloads · <strong>2,100+</strong> reviews on Google Play</p>
    </section>

    <!-- ═══ REVIEWS ═══ -->
    <section class="reviews">
      <div v-for="(r, i) in REVIEWS" :key="i" class="review-card">
        <div class="review-stars">{{ '★'.repeat(r.stars) }}{{ '☆'.repeat(5 - r.stars) }}</div>
        <p class="review-text">"{{ r.text }}"</p>
        <p class="review-author">— {{ r.author }}</p>
      </div>
    </section>

    <!-- ═══ ONE MORE TIME, THE STORES ═══ -->
    <section class="again">
      <div class="signs both">
        <a :href="STORE.ios" class="sign" aria-label="Download MasterAI on the App Store">
          <span class="sign-word">Download</span>
          <img :src="appStoreBadge" alt="Download on the App Store" class="badge" width="150" height="50" />
        </a>
        <a :href="STORE.android" class="sign" aria-label="Get MasterAI on Google Play">
          <span class="sign-word">Download</span>
          <img :src="googlePlayBadge" alt="Get it on Google Play" class="badge" width="168" height="50" />
        </a>
      </div>
    </section>

    <!-- ═══ BOTTOM: THE WAY HOME, AND WHAT THE LAW ASKS ═══ -->
    <footer class="foot">
      <nav class="foot-links">
        <RouterLink to="/" class="foot-main">Visit rpgmaster.ai</RouterLink>
        <a v-if="GAZZETTA_URL" :href="GAZZETTA_URL" class="foot-main">The Realm Crier</a>
      </nav>
      <nav class="foot-legal">
        <RouterLink to="/privacy">Privacy Policy</RouterLink>
        <RouterLink to="/tos">Terms of Service</RouterLink>
        <RouterLink to="/privacy#choices">Your Privacy Choices</RouterLink>
        <RouterLink to="/support">Support</RouterLink>
      </nav>
      <!-- Company details required by Italian law; same wording as SiteFooter. -->
      <p class="company">
        © 2026 MasterAI · MASTERAI S.R.L.S. · Via degli Aceri 77, 00172 Rome ·
        Italy Tax Code / VAT Number: 17291571002 · Share Capital: €500.00 fully paid
      </p>
    </footer>
  </div>
</template>

<!-- Global, but only while this page is mounted (body.site-full); same reset as SiteShell,
     repeated here because this page does not use SiteShell. -->
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

/* Which store a phone sees: MARK_DEVICE sets data-device on <html> before the page is drawn.
   Global on purpose (a scoped rule cannot look at <html>); every selector starts at .play. */
.play .also { display: none; }
html[data-device='ios'] .play .device-signs .sign-android,
html[data-device='android'] .play .device-signs .sign-ios { display: none; }
html[data-device='ios'] .play .also-ios,
html[data-device='android'] .play .also-android { display: block; }
html[data-device] .play .device-signs .badge { height: 60px; }
html[data-device] .play .device-signs .sign-word { font-size: 20px; }
@media (max-width: 480px) {
  html[data-device] .play .device-signs .badge { height: 54px; }
}
</style>

<style scoped>
.play {
  background: #0a0a0f;
  color: #e8e0d0;
  font-family: 'Crimson Text', Georgia, serif;
  overflow-x: hidden;
}
.gold { color: #c9a84c; }
.play a { text-decoration: none; }
.play a:hover { background-color: transparent; }

/* ── hero ── */
.hero { position: relative; height: 100vh; height: 100svh; min-height: 520px; overflow: hidden; }
.hero-video { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; }
.hero-shade {
  position: absolute; inset: 0; pointer-events: none;
  background: linear-gradient(to bottom, rgba(10, 10, 15, 0.45) 0%, rgba(10, 10, 15, 0) 22%, rgba(10, 10, 15, 0) 45%, rgba(10, 10, 15, 0.75) 78%, #0a0a0f 100%);
}
.brand { position: absolute; top: 20px; left: 24px; z-index: 2; }
.brand-master {
  font-family: 'Cinzel Decorative', serif; font-size: 20px; font-weight: 900;
  color: #c9a84c; letter-spacing: 2px;
}
.brand-ai { font-family: 'Cinzel', serif; font-size: 16px; color: #8b2500; letter-spacing: 1px; margin-left: 8px; }
.sound-btn {
  position: absolute; top: 16px; right: 20px; z-index: 2;
  display: inline-flex; align-items: center; gap: 8px;
  padding: 10px 16px; border: 1px solid rgba(201, 168, 76, 0.6); border-radius: 999px;
  background: rgba(10, 10, 15, 0.6); backdrop-filter: blur(6px);
  color: #e8e0d0; font-family: 'Cinzel', serif; font-size: 12px; letter-spacing: 1px;
  text-transform: uppercase; cursor: pointer;
}
.sound-btn:hover { border-color: #c9a84c; color: #c9a84c; }

.hero-content {
  position: absolute; left: 0; right: 0; bottom: 6%; z-index: 2;
  text-align: center; padding: 0 16px;
}
.hero-title {
  font-family: 'Cinzel Decorative', serif; font-size: clamp(28px, 5vw, 60px); font-weight: 900;
  line-height: 1.1; margin: 0 0 10px; color: #fff;
  text-shadow: 0 2px 30px rgba(0, 0, 0, 0.9);
}
.hero-subtitle {
  font-family: 'Cinzel', serif; font-size: clamp(13px, 1.8vw, 20px); letter-spacing: 5px;
  text-transform: uppercase; color: rgba(232, 224, 208, 0.9); margin: 0 0 24px;
  text-shadow: 0 2px 16px rgba(0, 0, 0, 0.9);
}
.also { margin: 14px 0 0; font-size: 15px; color: #a89070; }
.also a { color: #c9a84c; text-decoration: underline; }

/* ── the wooden signs (CSS until Karen's carved artwork arrives) ── */
.signs { display: flex; gap: 22px; justify-content: center; flex-wrap: wrap; }
.sign {
  position: relative; display: inline-flex; flex-direction: column; align-items: center; gap: 8px;
  padding: 14px 26px 18px;
  background:
    repeating-linear-gradient(92deg, rgba(0, 0, 0, 0.08) 0 2px, transparent 2px 9px),
    repeating-linear-gradient(88deg, rgba(255, 210, 150, 0.06) 0 1px, transparent 1px 13px),
    linear-gradient(180deg, #8a5a30 0%, #6e4422 55%, #573417 100%);
  border: 3px solid #2e1a0b; border-radius: 8px;
  box-shadow:
    inset 0 0 0 2px rgba(255, 214, 150, 0.15),
    inset 0 -8px 14px rgba(0, 0, 0, 0.4),
    0 10px 26px rgba(0, 0, 0, 0.65);
  transition: transform 0.25s, box-shadow 0.25s;
}
/* Two iron nails in the top corners. */
.sign::before, .sign::after {
  content: ''; position: absolute; top: 8px; width: 7px; height: 7px; border-radius: 50%;
  background: radial-gradient(circle at 35% 35%, #c9c2b4, #4a4a4a 70%);
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.6);
}
.sign::before { left: 9px; }
.sign::after { right: 9px; }
.sign:hover { transform: translateY(-3px) rotate(-0.6deg); box-shadow: inset 0 0 0 2px rgba(255, 214, 150, 0.2), inset 0 -8px 14px rgba(0, 0, 0, 0.4), 0 14px 32px rgba(201, 168, 76, 0.35); }
/* Letters cut into the wood: dark, with the light catching the lower edge. */
.sign-word {
  font-family: 'Cinzel Decorative', serif; font-weight: 900; font-size: 17px; letter-spacing: 3px;
  text-transform: uppercase; color: #2b1608;
  text-shadow: 0 1px 0 rgba(255, 214, 150, 0.45), 0 -1px 0 rgba(0, 0, 0, 0.35);
}
/* Both badges at the same height, as Apple's guidelines ask when they sit side by side. */
.badge { display: block; height: 50px; width: auto; }

/* ── what it is ── */
.about { max-width: 760px; margin: 0 auto; padding: 56px 20px 24px; text-align: center; }
.gold-divider {
  width: 120px; height: 1px; margin: 0 auto 32px;
  background: linear-gradient(90deg, transparent, #c9a84c, transparent);
}
.about-title { font-family: 'Cinzel Decorative', serif; font-size: clamp(24px, 3.5vw, 38px); margin: 0 0 18px; }
.about-text { font-size: 19px; line-height: 1.7; color: #a89070; margin: 0 0 18px; }
.proof { font-family: 'Cinzel', serif; font-size: 14px; letter-spacing: 1px; color: #8a7e6e; margin: 0; }
.proof strong { color: #c9a84c; }

/* ── reviews ── */
.reviews {
  max-width: 1100px; margin: 0 auto; padding: 32px 20px;
  display: flex; gap: 20px; justify-content: center; flex-wrap: wrap;
}
.review-card {
  background: rgba(20, 20, 30, 0.6); border: 1px solid rgba(201, 168, 76, 0.12);
  padding: 24px; border-radius: 4px; flex: 1 1 280px; max-width: 340px;
}
.review-stars { color: #c9a84c; font-size: 16px; letter-spacing: 2px; margin-bottom: 10px; }
.review-text { font-size: 15px; line-height: 1.7; color: #a89070; font-style: italic; margin: 0 0 12px; }
.review-author { font-family: 'Cinzel', serif; font-size: 12px; color: #5a5a5a; letter-spacing: 1px; margin: 0; }

.again { padding: 24px 20px 56px; }

/* ── bottom ── */
.foot {
  border-top: 1px solid rgba(201, 168, 76, 0.12);
  padding: 32px 20px 40px; text-align: center;
}
.foot-links { display: flex; gap: 14px; justify-content: center; flex-wrap: wrap; margin-bottom: 20px; }
.foot-main {
  display: inline-flex; padding: 12px 26px; border: 1px solid rgba(201, 168, 76, 0.5);
  color: #c9a84c; font-family: 'Cinzel', serif; font-size: 13px; letter-spacing: 2px; text-transform: uppercase;
}
.play .foot-main:hover { background: rgba(201, 168, 76, 0.1); border-color: #c9a84c; }
.foot-legal { display: flex; gap: 22px; justify-content: center; flex-wrap: wrap; margin-bottom: 14px; }
.foot-legal a { color: #6b6b6b; font-size: 13px; }
.play .foot-legal a:hover { color: #c9a84c; }
.company { font-size: 11px; line-height: 1.6; color: #555; letter-spacing: 0.5px; margin: 0 auto; max-width: 760px; }

@media (max-width: 480px) {
  .brand { top: 16px; left: 16px; }
  .brand-master { font-size: 16px; letter-spacing: 1px; }
  .brand-ai { font-size: 13px; margin-left: 6px; }
  .sound-btn { top: 12px; right: 12px; padding: 8px 12px; font-size: 11px; }
  .hero-subtitle { letter-spacing: 3px; margin-bottom: 18px; }
  .signs { gap: 14px; }
  .sign { padding: 12px 18px 14px; }
  .badge { height: 42px; }
}
</style>
