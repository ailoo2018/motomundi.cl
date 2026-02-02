<script setup lang="ts">

import BlogArticle from "@/views/pages/blog/blog-article.vue";
import BlogPosts from "@/views/pages/blog/blog-posts.vue";

definePageMeta({
  layout: "blog",
  public: true,

})

const route = useRoute()


const slugArray = Array.isArray(route.params.slug)
  ? route.params.slug
  : [route.params.slug].filter(Boolean)

const path = `moto-blog/${slugArray.join('/')}`


const { data: config, error } = await useFetch(`/api/friendlyurl`, {
  method: "GET",
  query: { path }
})
console.log(`Mapping ${path}:`, config.value)


</script>

<template>

  <BlogPosts v-if="config.query?.categoryId" :category-id="config.query?.categoryId" />
  <BlogArticle v-if="config.query?.id > 0" :id="config.query?.id" />
</template>

<style scoped lang="scss">

</style>
