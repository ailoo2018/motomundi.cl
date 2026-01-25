<script setup lang="ts">
import BlogMainPost from "@/views/pages/blog/blog-main-post.vue"
import BlogFeaturedPosts from "@/views/pages/blog/blog-featured-posts.vue"
import BlogRecommendedPosts from "@/views/pages/blog/blog-recommended-posts.vue"
import BlogPreviousPosts from "@/views/pages/blog/blog-previous-posts.vue"
import BlogRightContent from "@/layouts/blog/blog-right-content.vue"

definePageMeta({
  layout: false,
  public: true,

})

const currentPage = ref(1)
const totalPages = ref(10)
const showBlogMenu = ref(false)
</script>

<template>
  <NuxtLayout name="blog">
    <template #blog-top>
      <BlogMainPost v-if="currentPage === 1" />
      <BlogRecommendedPosts v-if="currentPage === 1" />
    </template>

    <template #default>
      <BlogFeaturedPosts v-if="currentPage === 1" />
      <div class="section-separator-title">
        <p>Artículos anteriores</p>
      </div>
      <main
        id="main previous-posts-main"
        role="main"
      >
        <BlogPreviousPosts />
      </main>

    </template>
  </NuxtLayout>
</template>

<style>
#blog-wrapper {
  font-family: "Open Sans", sans-serif;
  font-size: 16px;
  background-color: #f5f5f5;
  padding-bottom: 75px;
  color: #484848;
}

#blog-wrapper .inner-content {
  width: 100%;
  margin: 0 auto;
  max-width: 1400px;
  padding: 0 15px;
}

#blog-wrapper .left-content {
  width: 70%;
  padding: 0 40px 30px 40px;
  float: left;
}

#blog-wrapper .section-separator-title {
  font-size: 15px;
  text-transform: uppercase;
  color: #373737;
  font-weight: 800;
  margin: 45px 0;
  text-align: center;
  position: relative;
}

#blog-wrapper .section-separator-title p {
  display: inline-block;
  padding: 0 15px;
  background-color: #f5f5f5;
  position: relative;
  margin-bottom: 0;
  max-width: 80%;
}

#blog-wrapper .section-separator-title p {
  margin-top: 4px;
}

#blog-wrapper .section-separator-title:before {
  content: "";
  display: block;
  background-color: #cecece;
  width: 100%;
  height: 1px;
  position: absolute;
  top: 12px;
  left: 0;
}

.searchwp-live-search-results {
  opacity: 0;
  transition: opacity .25s ease-in-out;
  -moz-transition: opacity .25s ease-in-out;
  -webkit-transition: opacity .25s ease-in-out;
  height: 0;
  overflow: hidden;
  z-index: 9999;
  position: absolute;
  display: none;
}

.searchwp-live-search-results-showing {
  display: block;
  opacity: 1;
  height: auto;
  overflow: auto;
}

.searchwp-live-search-no-results {
  padding: 3em 2em 0;
  text-align: center;
}

.searchwp-live-search-no-min-chars:after {
  content: "Continue typing";
  display: block;
  text-align: center;
  padding: 2em 2em 0;
}
</style>


