<script setup lang="ts">
import SiteShell from '@/components/site/SiteShell.vue'
import { DISCORD } from '@/data/links'
import { ROADMAP } from '@/data/roadmap'
</script>

<template>
  <SiteShell
    title="Roadmap"
    description="What we are building next for MasterAI. No dates on purpose: each feature ships when it is ready."
  >
    <header class="page-head">
      <p class="eyebrow">Roadmap</p>
      <h1 class="page-title">What's <span class="gold">Coming</span></h1>
      <p class="page-intro">
        What we are building next for MasterAI. There are no dates here on purpose: each feature ships when
        it is ready, and plans can change along the way.
      </p>
    </header>

    <div class="stages">
      <section v-for="(stage, i) in ROADMAP" :key="stage.id" class="stage" :class="`stage-${i + 1}`">
        <div class="stage-head">
          <span class="stage-mark"><span>{{ i + 1 }}</span></span>
          <div>
            <h2 class="stage-title">{{ stage.title }}</h2>
            <p class="stage-intro">{{ stage.intro }}</p>
          </div>
        </div>
        <ul class="items">
          <li v-for="item in stage.items" :key="item.title" class="item">
            <h3 class="item-title">{{ item.title }}</h3>
            <p class="item-text">{{ item.text }}</p>
          </li>
        </ul>
      </section>
    </div>

    <p class="ask">
      Something you would love to see?
      <a :href="DISCORD" class="ask-link">Tell us on Discord →</a>
    </p>
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

.stages { max-width: 900px; margin: 0 auto; padding: 0 20px; display: flex; flex-direction: column; gap: 56px; }
.stage-head { display: flex; gap: 20px; align-items: center; margin-bottom: 22px; }
.stage-mark {
  flex-shrink: 0; width: 52px; height: 52px; display: grid; place-items: center;
  border: 1px solid #c9a84c; transform: rotate(45deg);
  font-family: 'Cinzel Decorative', serif; font-weight: 900; font-size: 20px; color: #c9a84c;
}
.stage-mark > span { transform: rotate(-45deg); line-height: 1; }
.stage-title {
  font-family: 'Cinzel', serif; font-size: clamp(20px, 2.6vw, 28px); font-weight: 700;
  color: #e8e0d0; margin: 0 0 4px; letter-spacing: 1px;
}
.stage-intro { color: #8a7e6e; margin: 0; font-size: 17px; font-style: italic; }

.items {
  list-style: none; margin: 0; padding: 0;
  display: grid; grid-template-columns: repeat(auto-fill, minmax(260px, 1fr)); gap: 16px;
}
.item {
  background: linear-gradient(135deg, rgba(201, 168, 76, 0.05) 0%, rgba(20, 20, 30, 0.85) 100%);
  border: 1px solid rgba(201, 168, 76, 0.15); border-top: 2px solid rgba(201, 168, 76, 0.6);
  padding: 20px 22px;
}
.stage-2 .item { border-top-color: rgba(201, 168, 76, 0.35); }
.stage-3 .item { border-top-color: rgba(139, 37, 0, 0.7); }
.item-title { font-family: 'Cinzel', serif; font-size: 16px; font-weight: 700; color: #e8e0d0; margin: 0 0 8px; letter-spacing: 1px; }
.item-text { color: #a89070; font-size: 16px; line-height: 1.6; margin: 0; }

.ask { text-align: center; color: #8a7e6e; padding: 64px 20px 20px; margin: 0; }
.ask-link { color: #c9a84c; white-space: nowrap; }

@media (max-width: 720px) {
  .page-head { padding: 56px 20px 36px; }
  .page-intro { font-size: 17px; }
  .stages { gap: 44px; }
  .stage-mark { width: 40px; height: 40px; font-size: 16px; }
  .items { grid-template-columns: 1fr; }
}
</style>
