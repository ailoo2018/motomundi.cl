<script setup lang="ts">
import ProductsList from "@/views/pages/products/list/products-list.vue"

const route = useRoute()
const query = route.query

console.log("insile products/list/index")
</script>

<template>
  <ProductsList :injected-query="query"/>
</template>

<style scoped lang="scss">

</style>
