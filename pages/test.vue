<script setup lang="ts">

import ProductRating from "@/views/pages/products/detail/product-rating.vue";

definePageMeta({
  public: true,
  layout: 'blank',
})

// This will tell you if the component runs on server, client, or both
console.log("setup running on:", import.meta.server ? "SERVER" : "CLIENT")

const { data: product } = await useFetch(`/api/product/3192276`)

console.log("after useFetch, data:", product.value ? "HAS DATA" : "NULL")
</script>

<template>
  <VContainer class="w-100 d-flex " style="background-color: white">
    <VRow>
      <VCol>
        <h1>Test Page</h1>

        <ProductRating :product="product" />


      </VCol>
    </VRow>
  </VContainer>
</template>

<style scoped lang="scss">

</style>
