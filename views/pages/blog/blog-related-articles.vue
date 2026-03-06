<script setup lang="ts">
import { useBlogStore } from "@/stores/blog"

const blogStore = useBlogStore()



const { data }  = useFetch("/api/blog/articles/related", {
  method: "GET",
  query: {
    limit: 5,
    id: blogStore.article?.id || 0,
  },
})

const articles = computed(() => {
  return data.value?.entries || []
})

const getArticleImage = a => {
  return getBaseCDN() + a.previewImage
}
</script>

<template>
  <div class="recommended-most-viewed-container">
    <div class="recommended-posts mini-posts-container sidebar-block">
      <p class="sidebar-title">
        Te recomendamos
      </p>
      <div class="posts">
        <div
          v-for="r in articles"
          class="post-container"
        >
          <a :href="r.friendlyUrl">
            <div class="image-container">
              <div
                class="image rocket-lazyload lazyloaded"
                :style="`background-image: url('${getArticleImage(r)}');`"
              />
            </div>
            <div class="text-container">
              <div class="title">{{ r.title }}</div>
              <div class="date">{{ r.createDate }}</div>
            </div>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>


