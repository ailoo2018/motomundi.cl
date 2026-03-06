<script setup>
import BlogNavigation from "@/layouts/blog/blog-navigation.vue"
import BlogFollowUsContainer from "@/layouts/blog/blog-follow-us-container.vue"
import BlogSocialMediaSidebar from "@/views/pages/blog/blog-social-media-sidebar.vue"
import BlogRelatedArticles from "@/views/pages/blog/blog-related-articles.vue"
import BlogArticlesRelatedProducts from "@/views/pages/blog/blog-articles-related-products.vue"

const ret = ref({ products: null })

const mostViewed= ref([])

const article =  useBlogStore().article

const { data: featured } = await useFetch("/api/blog/featured-posts?limit=4", {
  key: "blog-featured-4",
})
</script>

<template>
  <div class="right-content">
    <div class="menu-newsletter-conteiner">
      <BlogNavigation />
      <BlogFollowUsContainer />
    </div>

    <BlogArticlesRelatedProducts :article="article"/>
    <BlogRelatedArticles :article="article"/>


    <BlogSocialMediaSidebar />
  </div>
</template>

<style>
#blog-wrapper .right-content {
  width: 30%;
  float: right;
  padding-right: 33px;
}

#blog-wrapper .archive .right-content, #blog-wrapper .post-content .right-content, #blog-wrapper.paged .right-content {
  margin-top: 10px;
}
</style>

