<script setup lang="ts">
import { computed, onBeforeUnmount, ref, watch } from 'vue'
import { RouterLink } from 'vue-router'
import SiteShell from '@/components/site/SiteShell.vue'
import { CLASSES, PLAYABLE_CLASSES, RACES } from '@/data/classes'

const NUMBER_WORDS = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten', 'eleven', 'twelve']
const playableWord = NUMBER_WORDS[PLAYABLE_CLASSES] ?? String(PLAYABLE_CLASSES)
const racesWord = NUMBER_WORDS[RACES.length] ?? String(RACES.length)
const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1)

const selectedId = ref<string | null>(null)
const selected = computed(() => CLASSES.find((c) => c.id === selectedId.value) ?? null)
const closeBtn = ref<HTMLButtonElement | null>(null)
let opener: HTMLElement | null = null

const open = (id: string, event: Event) => {
  opener = event.currentTarget as HTMLElement
  selectedId.value = id
}
const close = () => {
  selectedId.value = null
  opener?.focus()
}
const onKey = (e: KeyboardEvent) => {
  if (e.key === 'Escape') close()
}

// While the class sheet is open: Escape closes it, the page behind does not scroll.
watch(selected, (c) => {
  if (c) {
    window.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    setTimeout(() => closeBtn.value?.focus())
  } else {
    window.removeEventListener('keydown', onKey)
    document.body.style.overflow = ''
  }
})
onBeforeUnmount(() => {
  window.removeEventListener('keydown', onKey)
  document.body.style.overflow = ''
})
</script>

<template>
  <SiteShell title="Classes and Races">
    <header class="page-head">
      <p class="eyebrow">Classes</p>
      <h1 class="page-title">Choose Your <span class="gold">Class</span></h1>
      <p class="page-intro">
        {{ capitalize(playableWord) }} classes built on the 5th edition rules, and the Warlock coming soon.
        Tap one to discover how it plays.
      </p>
    </header>

    <div class="class-grid">
      <button
        v-for="c in CLASSES"
        :key="c.id"
        type="button"
        class="class-card"
        :class="{ soon: c.comingSoon }"
        :aria-label="`${c.name}${c.comingSoon ? ' (coming soon)' : ''}: show details`"
        @click="open(c.id, $event)"
      >
        <img :src="c.image" :alt="`Portrait of a ${c.name.toLowerCase()}`" loading="lazy" width="512" height="512" />
        <span class="class-name">{{ c.name }}</span>
        <span v-if="c.comingSoon" class="badge">Coming soon</span>
      </button>
    </div>

    <section class="more-subs">
      <h2 class="more-title">More subclasses coming</h2>
      <p>
        Today every class has one subclass. We are working on new subclasses for every class: they will
        appear here as soon as they are ready.
        <RouterLink to="/roadmap" class="inline-link">See the roadmap →</RouterLink>
      </p>
    </section>

    <header class="page-head races-head">
      <p class="eyebrow">Races</p>
      <h2 class="page-title small">Choose Your <span class="gold">Race</span></h2>
      <p class="page-intro">{{ capitalize(racesWord) }} races to build your hero from.</p>
    </header>

    <div class="race-grid">
      <div v-for="r in RACES" :key="r.id" class="race-card">
        <img :src="r.image" :alt="`Portrait of a ${r.name.toLowerCase()}`" loading="lazy" width="512" height="512" />
        <div class="race-body">
          <h3 class="race-name">{{ r.name }}</h3>
          <p class="race-desc">{{ r.description }}</p>
        </div>
      </div>
    </div>

    <Transition name="sheet">
      <div v-if="selected" class="overlay" @click.self="close">
        <div class="sheet" role="dialog" aria-modal="true" :aria-labelledby="`sheet-${selected.id}`">
          <button ref="closeBtn" type="button" class="close" aria-label="Close" @click="close">×</button>
          <img class="sheet-img" :src="selected.image" :alt="`Portrait of a ${selected.name.toLowerCase()}`" />
          <div class="sheet-body">
            <p v-if="selected.comingSoon" class="badge static">Coming soon</p>
            <h2 :id="`sheet-${selected.id}`" class="sheet-title">{{ selected.name }}</h2>
            <p class="sheet-desc">{{ selected.description }}</p>
            <dl class="facts">
              <dt>Key abilities</dt>
              <dd>{{ selected.attributes }}</dd>
              <dt>{{ selected.comingSoon ? 'Subclass at launch' : 'Subclass available today' }}</dt>
              <dd>
                <strong>{{ selected.subclass.name }}</strong>: {{ selected.subclass.text }}
              </dd>
            </dl>
          </div>
        </div>
      </div>
    </Transition>
  </SiteShell>
</template>

<style scoped>
.gold { color: #c9a84c; }
.page-head { max-width: 820px; margin: 0 auto; padding: 90px 20px 50px; text-align: center; }
.races-head { padding-top: 70px; }
.eyebrow {
  font-family: 'Cinzel', serif; font-size: 12px; letter-spacing: 4px; color: #c9a84c;
  text-transform: uppercase; margin: 0 0 12px;
}
.page-title {
  font-family: 'Cinzel Decorative', serif; font-size: clamp(30px, 5vw, 56px); font-weight: 900;
  line-height: 1.15; margin: 0 0 24px; color: #e8e0d0;
}
.page-title.small { font-size: clamp(26px, 4vw, 44px); }
.page-intro { color: #a89070; font-size: 19px; line-height: 1.7; margin: 0; }

/* ── classes ── */
.class-grid {
  max-width: 1200px; margin: 0 auto; padding: 0 20px;
  display: grid; grid-template-columns: repeat(auto-fill, minmax(170px, 1fr)); gap: 20px;
}
.class-card {
  position: relative; display: block; padding: 0; cursor: pointer; overflow: hidden;
  background: #14121e; border: 1px solid rgba(201, 168, 76, 0.2);
  font: inherit; color: inherit; transition: all 0.4s;
}
.class-card img { width: 100%; height: auto; aspect-ratio: 1; object-fit: cover; display: block; transition: transform 0.6s; }
.class-card::after {
  content: ''; position: absolute; inset: 0;
  background: linear-gradient(to bottom, transparent 55%, rgba(10, 10, 15, 0.92) 100%);
}
.class-card:hover, .class-card:focus-visible {
  border-color: #c9a84c; transform: translateY(-4px); box-shadow: 0 12px 40px rgba(0, 0, 0, 0.5);
  outline: none;
}
.class-card:hover img { transform: scale(1.05); }
.class-card.soon img { filter: grayscale(0.6) brightness(0.7); }
.class-name {
  position: absolute; left: 0; right: 0; bottom: 14px; z-index: 1; text-align: center;
  font-family: 'Cinzel', serif; font-size: 17px; font-weight: 700; letter-spacing: 2px;
  text-transform: uppercase; color: #e8e0d0;
}
.badge {
  position: absolute; top: 10px; right: 10px; z-index: 1;
  background: #8b2500; color: #f3e6c8; padding: 4px 10px;
  font-family: 'Cinzel', serif; font-size: 10px; letter-spacing: 2px; text-transform: uppercase;
}
.badge.static { position: static; display: inline-block; margin: 0 0 10px; }

.more-subs {
  max-width: 820px; margin: 48px auto 0; padding: 28px 30px; text-align: center;
  border: 1px dashed rgba(201, 168, 76, 0.4);
  background: rgba(201, 168, 76, 0.04);
}
.more-title {
  font-family: 'Cinzel', serif; font-size: 15px; letter-spacing: 4px; text-transform: uppercase;
  color: #c9a84c; margin: 0 0 10px;
}
.more-subs p { color: #a89070; margin: 0; font-size: 17px; }
.inline-link { color: #c9a84c; white-space: nowrap; }

/* ── races ── */
.race-grid {
  max-width: 1200px; margin: 0 auto; padding: 0 20px 40px;
  display: grid; grid-template-columns: repeat(auto-fill, minmax(340px, 1fr)); gap: 20px;
}
.race-card {
  display: flex; gap: 18px; align-items: center;
  background: linear-gradient(135deg, rgba(201, 168, 76, 0.05) 0%, rgba(20, 20, 30, 0.85) 100%);
  border: 1px solid rgba(201, 168, 76, 0.15); padding: 14px;
}
.race-card img { width: 104px; height: 104px; object-fit: cover; flex-shrink: 0; border: 1px solid rgba(201, 168, 76, 0.25); }
.race-name { font-family: 'Cinzel', serif; font-size: 17px; letter-spacing: 2px; text-transform: uppercase; color: #e8e0d0; margin: 0 0 6px; }
.race-desc { color: #8a7e6e; font-size: 15px; line-height: 1.55; margin: 0; }

/* ── class sheet ── */
.overlay {
  position: fixed; inset: 0; z-index: 200;
  background: rgba(5, 5, 8, 0.82); backdrop-filter: blur(6px);
  display: flex; align-items: center; justify-content: center; padding: 20px;
}
.sheet {
  position: relative; display: grid; grid-template-columns: 340px 1fr;
  max-width: 920px; width: 100%; max-height: calc(100vh - 40px); overflow: auto;
  background: #0f0e16; border: 1px solid rgba(201, 168, 76, 0.4);
  box-shadow: 0 30px 80px rgba(0, 0, 0, 0.7);
}
.sheet-img { width: 100%; height: 100%; object-fit: cover; display: block; min-height: 340px; }
.sheet-body { padding: 36px 36px 30px; }
.sheet-title {
  font-family: 'Cinzel Decorative', serif; font-size: 34px; font-weight: 900; color: #c9a84c;
  margin: 0 0 16px; line-height: 1.1;
}
.sheet-desc { color: #cfc4b0; font-size: 18px; line-height: 1.7; margin: 0 0 24px; }
.facts { margin: 0; border-top: 1px solid rgba(201, 168, 76, 0.2); padding-top: 18px; }
.facts dt {
  font-family: 'Cinzel', serif; font-size: 11px; letter-spacing: 3px; text-transform: uppercase;
  color: #8a7e6e; margin: 0 0 4px;
}
.facts dd { margin: 0 0 18px; color: #e8e0d0; font-size: 17px; line-height: 1.6; }
.facts strong { color: #e6c86e; }
.close {
  position: absolute; top: 10px; right: 12px; z-index: 2;
  width: 40px; height: 40px; border: 1px solid rgba(201, 168, 76, 0.4);
  background: rgba(10, 10, 15, 0.8); color: #c9a84c; font-size: 24px; line-height: 1; cursor: pointer;
}
.close:hover, .close:focus-visible { background: rgba(201, 168, 76, 0.15); outline: none; }

.sheet-enter-active, .sheet-leave-active { transition: opacity 0.25s; }
.sheet-enter-active .sheet, .sheet-leave-active .sheet { transition: transform 0.25s; }
.sheet-enter-from, .sheet-leave-to { opacity: 0; }
.sheet-enter-from .sheet, .sheet-leave-to .sheet { transform: translateY(16px); }

@media (max-width: 720px) {
  .page-head { padding: 56px 20px 36px; }
  .page-intro { font-size: 17px; }
  .class-grid { grid-template-columns: repeat(2, 1fr); gap: 12px; }
  .class-name { font-size: 14px; letter-spacing: 1px; }
  .more-subs { margin: 36px 20px 0; padding: 22px 18px; }
  .race-grid { grid-template-columns: 1fr; }
  .race-card img { width: 84px; height: 84px; }
  .overlay { padding: 0; align-items: flex-end; }
  .sheet { grid-template-columns: 1fr; max-height: 92vh; }
  .sheet-img { min-height: 0; height: 240px; object-position: center 20%; }
  .sheet-body { padding: 24px 22px 26px; }
  .sheet-title { font-size: 28px; }
}
</style>
