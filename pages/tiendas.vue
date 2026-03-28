<script setup lang="ts">
// ─── Data ────────────────────────────────────────────────────────────────────
import StoreLocator from "@/views/pages/stores/store-locator.vue";

const { data } = await useFetch("/api/stores/list", {
  key: 'stores',
})

</script>
<template>

  <StoreLocator v-if="data" :facilities="data.facilities"/>

</template>

