<script setup lang="ts">
import VueMarkdown from 'vue-markdown-render'
import SiteShell from './SiteShell.vue'

// Frame of the legal pages (privacy, terms, account deletion), 2026-10-15 (Marco: "va aggiornata
// come questa"). Only the look changes: the text is the same markdown file, word for word, and the
// address of each page stays the same, because the app and the stores link to it.
defineProps<{ title: string; source: string }>()
</script>

<template>
  <SiteShell :title="title">
    <article class="legal">
      <VueMarkdown :source="source" :options="{ html: true, linkify: true, typographer: true }" />
    </article>
  </SiteShell>
</template>

<style scoped>
.legal {
  max-width: 820px; margin: 0 auto; padding: 56px 20px 40px;
  color: #cfc4b0; font-size: 17px; line-height: 1.75;
  overflow-wrap: anywhere;
}
.legal :deep(h1) {
  font-family: 'Cinzel Decorative', serif; font-size: clamp(28px, 4.5vw, 44px); font-weight: 900;
  line-height: 1.2; color: #e8e0d0; margin: 0 0 28px;
}
.legal :deep(h2) {
  font-family: 'Cinzel', serif; font-size: 20px; font-weight: 700; letter-spacing: 1px;
  color: #c9a84c; margin: 44px 0 14px; padding-top: 20px; border-top: 1px solid rgba(201, 168, 76, 0.15);
}
.legal :deep(h3), .legal :deep(h4) {
  font-family: 'Cinzel', serif; font-size: 16px; font-weight: 700; letter-spacing: 1px;
  color: #e8e0d0; margin: 28px 0 10px;
}
.legal :deep(p) { margin: 0 0 16px; }
.legal :deep(strong) { color: #e8e0d0; }
.legal :deep(a) { color: #c9a84c; text-decoration: underline; text-underline-offset: 3px; }
.legal :deep(a:hover) { color: #e6c86e; background-color: transparent; }
.legal :deep(ul), .legal :deep(ol) { margin: 0 0 18px; padding-left: 26px; }
.legal :deep(li) { margin: 0 0 8px; }
.legal :deep(blockquote) {
  margin: 0 0 18px; padding: 12px 20px; border-left: 2px solid rgba(201, 168, 76, 0.5);
  background: rgba(201, 168, 76, 0.05);
}
.legal :deep(table) { width: 100%; border-collapse: collapse; margin: 0 0 22px; font-size: 15px; display: block; overflow-x: auto; }
.legal :deep(th), .legal :deep(td) { border: 1px solid rgba(201, 168, 76, 0.2); padding: 8px 12px; text-align: left; vertical-align: top; }
.legal :deep(th) { color: #e8e0d0; background: rgba(201, 168, 76, 0.08); font-weight: 700; }
.legal :deep(hr) { border: 0; border-top: 1px solid rgba(201, 168, 76, 0.15); margin: 32px 0; }
.legal :deep(code) { font-family: Consolas, 'Courier New', monospace; font-size: 0.9em; color: #e6c86e; }

@media (max-width: 720px) {
  .legal { padding-top: 36px; font-size: 16px; }
}
</style>
