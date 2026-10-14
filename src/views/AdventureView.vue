<script setup lang="ts">
import { computed } from 'vue'
import { RouterLink } from 'vue-router'
import SiteShell from '@/components/site/SiteShell.vue'
import { ADVENTURES, findAdventure } from '@/data/adventures'
import { STORE } from '@/data/links'

const props = defineProps<{ slug: string }>()

const adventure = computed(() => findAdventure(props.slug))
const index = computed(() => ADVENTURES.findIndex((a) => a.slug === props.slug))
const next = computed(() => ADVENTURES[(index.value + 1) % ADVENTURES.length])

// Paragraphs may hold `inline code` (e.g. the `setting:` command): odd segments are code.
const segments = (text: string) => text.split('`')
</script>

<template>
  <SiteShell :title="adventure ? adventure.title : 'Adventure not found'">
    <template v-if="adventure">
      <header class="hero">
        <img class="hero-img" :src="adventure.hero" :alt="adventure.heroAlt" />
        <div class="hero-shade" />
        <div class="hero-text">
          <RouterLink to="/adventures" class="back">← All adventures</RouterLink>
          <h1 class="title">
            <!-- One unbreakable span per word: "God-King" must not split at the hyphen. -->
            <template v-for="(w, i) in adventure.title.split(' ')" :key="i"><span class="nw">{{ w }}</span>{{ ' ' }}</template>
          </h1>
          <p class="tagline">{{ adventure.tagline }}</p>
          <!-- A discreet way to the store for whoever is convinced before the bottom band. -->
          <p class="play-line">
            Play this adventure —
            <a :href="STORE.android" class="play-link">Google Play</a>
            <span class="sep">·</span>
            <a :href="STORE.ios" class="play-link">App Store</a>
          </p>
        </div>
      </header>

      <article class="body">
        <section v-for="s in adventure.sections" :key="s.heading" class="block">
          <h2 class="block-title">{{ s.heading }}</h2>
          <p v-for="(p, i) in s.paragraphs" :key="i" class="para">
            <template v-for="(seg, j) in segments(p)" :key="j">
              <code v-if="j % 2 === 1">{{ seg }}</code>
              <template v-else>{{ seg }}</template>
            </template>
          </p>
          <ul v-if="s.items" class="items">
            <li v-for="item in s.items" :key="item.name">
              <strong class="item-name">{{ item.name }}</strong>: {{ item.text }}
            </li>
          </ul>
        </section>

        <div v-if="adventure.gallery" class="gallery" :class="{ pair: adventure.gallery.length > 1 }">
          <figure v-for="g in adventure.gallery" :key="g.src" :class="{ tall: g.tall }">
            <img :src="g.src" :alt="g.alt" loading="lazy" />
            <figcaption v-if="g.caption">{{ g.caption }}</figcaption>
          </figure>
        </div>

        <aside class="best-for">
          <h2 class="block-title">Best for</h2>
          <p class="para">{{ adventure.bestFor }}</p>
        </aside>

        <nav class="next">
          <RouterLink to="/adventures" class="next-link">← All adventures</RouterLink>
          <RouterLink :to="`/adventures/${next.slug}`" class="next-link">{{ next.title }} →</RouterLink>
        </nav>
      </article>
    </template>

    <div v-else class="missing">
      <h1 class="title">This world is not on the map</h1>
      <p class="para">The adventure you are looking for does not exist, or has moved.</p>
      <RouterLink to="/adventures" class="next-link">See all adventures →</RouterLink>
    </div>
  </SiteShell>
</template>

<style scoped>
.hero { position: relative; height: min(72vh, 680px); min-height: 380px; overflow: hidden; }
.hero-img { width: 100%; height: 100%; object-fit: cover; display: block; }
.hero-shade {
  position: absolute; inset: 0;
  background: linear-gradient(to bottom, rgba(10, 10, 15, 0.15) 0%, rgba(10, 10, 15, 0.2) 45%, rgba(10, 10, 15, 0.85) 82%, #0a0a0f 100%);
}
.hero-text { position: absolute; left: 0; right: 0; bottom: 0; padding: 0 20px 44px; max-width: 900px; margin: 0 auto; }
.back {
  display: inline-block; margin-bottom: 18px;
  font-family: 'Cinzel', serif; font-size: 12px; letter-spacing: 2px; text-transform: uppercase; color: #c9a84c;
}
.title {
  font-family: 'Cinzel Decorative', serif; font-size: clamp(28px, 5vw, 56px); font-weight: 900;
  line-height: 1.15; margin: 0 0 14px; color: #fff; text-shadow: 0 2px 30px rgba(0, 0, 0, 0.9);
}
.nw { white-space: nowrap; }
.tagline { font-size: clamp(17px, 2vw, 21px); font-style: italic; color: #e8e0d0; margin: 0; text-shadow: 0 2px 16px rgba(0, 0, 0, 0.9); }
.play-line {
  margin: 18px 0 0; font-family: 'Cinzel', serif; font-size: 12px; letter-spacing: 2px; text-transform: uppercase;
  color: #b8ad98; text-shadow: 0 2px 12px rgba(0, 0, 0, 0.9);
}
.play-link { white-space: nowrap; color: #c9a84c; border-bottom: 1px solid rgba(201, 168, 76, 0.4); padding-bottom: 1px; }
.play-link:hover { color: #e6c86e; background-color: transparent; }
.sep { margin: 0 8px; color: #6b6b6b; }

.body { max-width: 780px; margin: 0 auto; padding: 40px 20px 20px; }
.block { margin-bottom: 40px; }
.block-title {
  font-family: 'Cinzel', serif; font-size: 14px; letter-spacing: 4px; text-transform: uppercase;
  color: #c9a84c; margin: 0 0 14px; font-weight: 700;
}
.para { color: #cfc4b0; font-size: 19px; line-height: 1.75; margin: 0 0 16px; }
.para code {
  font-family: Consolas, 'Courier New', monospace; font-size: 0.9em;
  background: rgba(201, 168, 76, 0.12); color: #e6c86e; padding: 1px 6px; border-radius: 3px;
}
.items { list-style: none; padding: 0; margin: 8px 0 0; border-left: 1px solid rgba(201, 168, 76, 0.3); }
.items li { color: #cfc4b0; font-size: 18px; line-height: 1.65; padding: 8px 0 8px 22px; position: relative; }
.items li::before {
  content: ''; position: absolute; left: -4px; top: 18px; width: 7px; height: 7px;
  background: #c9a84c; transform: rotate(45deg);
}
.item-name { color: #e8e0d0; font-weight: 700; }

.gallery { margin: 8px 0 44px; display: grid; gap: 20px; }
.gallery.pair { grid-template-columns: 1fr 1fr; }
.gallery figure { margin: 0; }
.gallery img { width: 100%; display: block; border: 1px solid rgba(201, 168, 76, 0.2); }
.gallery figcaption {
  font-family: 'Cinzel', serif; font-size: 12px; letter-spacing: 2px; text-transform: uppercase;
  color: #8a7e6e; text-align: center; margin-top: 10px;
}

.best-for {
  background: linear-gradient(135deg, rgba(201, 168, 76, 0.08) 0%, rgba(20, 20, 30, 0.85) 100%);
  border: 1px solid rgba(201, 168, 76, 0.25); padding: 28px 30px 14px; margin-bottom: 44px;
}

.next {
  display: flex; justify-content: space-between; gap: 16px; flex-wrap: wrap;
  border-top: 1px solid rgba(201, 168, 76, 0.15); padding-top: 24px;
}
.next-link { font-family: 'Cinzel', serif; font-size: 13px; letter-spacing: 2px; text-transform: uppercase; color: #c9a84c; }
.next-link:hover { color: #e6c86e; }

.missing { max-width: 700px; margin: 0 auto; padding: 120px 20px; text-align: center; }

@media (max-width: 720px) {
  .hero { height: 62vh; min-height: 340px; }
  .hero-text { padding-bottom: 28px; }
  .para { font-size: 18px; }
  .gallery.pair { grid-template-columns: 1fr; }
  .best-for { padding: 22px 20px 8px; }
}
</style>
