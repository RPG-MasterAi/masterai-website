<script setup lang="ts">
import LegalPage from '@/components/site/LegalPage.vue'
import accountDeletion from '@/assets/account-deletion.md?raw'
</script>

<template>
  <LegalPage
    title="Account Deletion"
    description="How to delete your MasterAI account and its data, from the app or by email."
    :source="accountDeletion"
  />
</template>
