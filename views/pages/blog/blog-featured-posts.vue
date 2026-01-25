<script setup>
import BlogGridItem from "@/views/pages/blog/blog-grid-item.vue"

const { data: featured } = await useFetch("/api/blog/featured-posts?limit=2", {
  key: "featured-posts-2",
})
</script>

<template>
  <div class="featured-posts-container">
    <span v-for="fb in featured.entries">
      <BlogGridItem
        :entry="fb"
        class="grid-item big-post comparison type-comparison status-publish has-post-thumbnail hentry category-cascos product_type-cascos-integrales"
      />
    </span>
  </div>
</template>

