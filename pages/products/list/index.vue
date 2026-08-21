<script setup lang="ts">
import ProductsList from "@/views/pages/products/list/products-list.vue"

const route = useRoute()
const query = computed(() => route.query )

console.log("inside products/list/index: ", query.value)
</script>

<template>
  <ProductsList :injected-query="query"/>
</template>

