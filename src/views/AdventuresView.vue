<script setup lang="ts">
import { RouterLink } from 'vue-router'
import SiteShell from '@/components/site/SiteShell.vue'
import { ADVENTURES } from '@/data/adventures'
</script>

<template>
  <SiteShell title="Adventures">
    <header class="page-head">
      <p class="eyebrow">Adventures</p>
      <h1 class="page-title">Choose Your <span class="gold">World</span></h1>
      <p class="page-intro">
        Six worlds with their own rules, places and people, run for you by the Master scene after scene.
        And a seventh that you write yourself.
      </p>
    </header>

    <div class="grid">
      <RouterLink
        v-for="a in ADVENTURES"
        :key="a.slug"
        :to="`/adventures/${a.slug}`"
        class="card"
      >
        <div class="card-img">
          <img :src="a.card" :alt="a.heroAlt" loading="lazy" width="720" height="405" />
        </div>
        <div class="card-body">
          <h2 class="card-title">
            <template v-for="(w, i) in a.title.split(' ')" :key="i"><span class="nw">{{ w }}</span>{{ ' ' }}</template>
          </h2>
          <p class="card-tagline">{{ a.tagline }}</p>
          <span class="card-more">Discover the world →</span>
        </div>
      </RouterLink>
    </div>
  </SiteShell>
</template>

<style scoped>
.gold { color: #c9a84c; }
.page-head { max-width: 820px; margin: 0 auto; padding: 90px 20px 50px; text-align: center; }
.eyebrow {
  font-family: 'Cinzel', serif; font-size: 12px; letter-spacing: 4px; color: #c9a84c;
  text-transform: uppercase; margin: 0 0 12px;
}
.page-title {
  font-family: 'Cinzel Decorative', serif; font-size: clamp(30px, 5vw, 56px); font-weight: 900;
  line-height: 1.15; margin: 0 0 24px; color: #e8e0d0;
}
.page-intro { color: #a89070; font-size: 19px; line-height: 1.7; margin: 0; }

.grid {
  max-width: 1200px; margin: 0 auto; padding: 0 20px 40px;
  display: grid; grid-template-columns: repeat(auto-fill, minmax(320px, 1fr)); gap: 28px;
}
.card {
  display: flex; flex-direction: column;
  background: linear-gradient(135deg, rgba(201, 168, 76, 0.05) 0%, rgba(20, 20, 30, 0.85) 100%);
  border: 1px solid rgba(201, 168, 76, 0.15);
  color: inherit; transition: all 0.4s;
}
.card:hover { transform: translateY(-4px); border-color: rgba(201, 168, 76, 0.45); box-shadow: 0 12px 40px rgba(0, 0, 0, 0.5); }
.card-img { aspect-ratio: 16 / 9; overflow: hidden; }
.card-img img { width: 100%; height: 100%; object-fit: cover; display: block; transition: transform 0.6s; }
.card:hover .card-img img { transform: scale(1.04); }
.card-body { padding: 24px 26px 28px; display: flex; flex-direction: column; flex: 1; }
.card-title {
  font-family: 'Cinzel', serif; font-size: 20px; font-weight: 700; color: #e8e0d0;
  margin: 0 0 10px; letter-spacing: 1px; line-height: 1.3;
}
.nw { white-space: nowrap; }
.card-tagline { color: #8a7e6e; font-size: 16px; line-height: 1.6; font-style: italic; margin: 0 0 18px; flex: 1; }
.card-more { font-family: 'Cinzel', serif; font-size: 12px; letter-spacing: 2px; color: #c9a84c; text-transform: uppercase; }

@media (max-width: 720px) {
  .page-head { padding: 56px 20px 36px; }
  .page-intro { font-size: 17px; }
  .grid { grid-template-columns: 1fr; gap: 20px; }
}
</style>
