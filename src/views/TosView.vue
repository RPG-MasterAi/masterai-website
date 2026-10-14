<script setup lang="ts">
import LegalPage from '@/components/site/LegalPage.vue'
import tos from '@/assets/tos.md?raw'
</script>

<template>
  <LegalPage title="Terms of Use" :source="tos" />
</template>
