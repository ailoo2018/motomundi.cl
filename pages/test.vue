<script setup lang="ts">
import BlogSearch from "@/views/pages/blog/blog-search.vue";

definePageMeta({
  public: true,
  layout: 'blank',
})

</script>

<template>
  <VContainer class="w-100 d-flex ">
    <VRow>
      <VCol>
        <h1>Test Page</h1>

        <BlogSearch />

      </VCol>
    </VRow>
  </VContainer>
</template>

<style scoped lang="scss">

</style>
