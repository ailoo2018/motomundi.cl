<script setup lang="ts">
import BlogArticle from "@/views/pages/blog/blog-article.vue"
import BlogPosts from "@/views/pages/blog/blog-posts.vue"

definePageMeta({
  layout: "blog",
  public: true,
})

const query = ref({ id: 0 })
const route = useRoute()


const slugArray = Array.isArray(route.params.slug)
  ? route.params.slug
  : [route.params.slug].filter(Boolean)

const path = `moto-blog/${slugArray.join('/')}`


if(path.includes("search")){
  console.log("Path is search")
  query.value = {
    sword: route.query.sword,
  }


}else {
  const { data: config, error } = await useFetch(`/api/friendlyurl`, {
    method: "GET",
    query: { path },
  })

  console.log(`Mapping ${path}:`, config.value)

  query.value = config.value?.query || {}
}
</script>

<template>
  <BlogArticle
    v-if="query?.id > 0"
    :id="query?.id"
  />
  <BlogPosts
    v-else
    :query="query"
  />
</template>


