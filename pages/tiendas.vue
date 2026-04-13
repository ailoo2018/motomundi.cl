<script setup lang="ts">
import StoreLocator from "@/views/pages/stores/store-locator.vue"


useHead({
  title: 'Nuestras Tiendas | Motomundi',
})



const { data } = await useFetch("/api/stores/list", {
  key: 'stores',
})
</script>

<template>
  <StoreLocator
    v-if="data"
    :facilities="data.facilities"
  />
</template>

