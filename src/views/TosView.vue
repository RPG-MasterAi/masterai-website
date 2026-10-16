<script setup lang="ts">
import LegalPage from '@/components/site/LegalPage.vue'
import tos from '@/assets/tos.md?raw'
</script>

<template>
  <LegalPage
    title="Terms of Use"
    description="The terms and conditions for using the MasterAI app and website."
    :source="tos"
  />
</template>
