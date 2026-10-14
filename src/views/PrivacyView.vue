<script setup lang="ts">
import LegalPage from '@/components/site/LegalPage.vue'
import privacyPolicy from '@/assets/privacy.md?raw'
</script>

<template>
  <LegalPage title="Privacy Policy" :source="privacyPolicy" />
</template>
