<script setup lang="ts">
import BlogArticle from "@/views/pages/blog/blog-article.vue"
import BlogPosts from "@/views/pages/blog/blog-posts.vue"

definePageMeta({
  layout: "blog",
  public: true,
})

const route = useRoute()

const slugArray = Array.isArray(route.params.slug)
  ? route.params.slug
  : [route.params.slug].filter(Boolean)

// ✅ Top-level useFetch → SSR executes this, Vue renders the right component
const { data, error } = await useFetch(`/api/blog/${slugArray.join('/')}`, {
  server: true,
  key: `moto-blog-${slugArray.join('-')}`,
})

if (error.value) {
  throw createError({ statusCode: error.value.statusCode ?? 404 })
}
</script>

<template>
  <BlogArticle v-if="data?.type === 'article'" :id="data.id" />
  <BlogPosts v-else-if="data?.type === 'category'" :query="data" />
</template>

