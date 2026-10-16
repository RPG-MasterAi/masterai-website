<script setup lang="ts">
import LegalPage from '@/components/site/LegalPage.vue'
import privacyPolicy from '@/assets/privacy.md?raw'
</script>

<template>
  <LegalPage
    title="Privacy Policy"
    description="How MasterAI collects, uses and protects your personal data, and how to exercise your rights."
    :source="privacyPolicy"
  />
</template>
