<script setup lang="ts">
import Widget from "@/views/pages/home/widget.vue"
import BlogArticleProducts from "@/views/pages/blog/blog-article-products.vue"
import BlogBreadcrumbs from "@/views/pages/blog/blog-breadcrumbs.vue"
import BlogArticleShare from "@/views/pages/blog/blog-article-share.vue"
import BlogCommentForm from "@/pages/moto-blog/blog-comment-form.vue"

const props = defineProps({ id: { type: Number } })

const title = ref({ name: "", description: "" })

useSeoMeta({
  title: () =>  title.value?.name || 'Loading Product...',
  ogTitle: () => title.value?.name,
  description: () => title.value?.description,
  ogDescription: () => title.value?.description,
})


const blogStore = useBlogStore()

await blogStore.fetchArticle(props.id)

if(blogStore.article){
  title.value.name = blogStore.article?.name
  title.value.description = blogStore.previewText || ''
}


</script>

<template>
  <div v-if="blogStore.article">
    <BlogBreadcrumbs />

    <article>
      <header class="article-header">
        <h1
          class="entry-title single-title"
          itemprop="headline"
        >
          {{ blogStore.article?.name }}
        </h1>
        <div class="entry-date-category-share">
          <p class="posts-date-category single">
            <img src="/content/images/assets/icons/planet-biker-g.svg">
            <a
              class="parent-category"
              href="/moto-blog/planeta-motero/"
            >
              Planeta motero </a>
            <span class="date">
              <span class="bull">●</span> {{ blogStore.article.createDate }}
            </span>
          </p>
          <BlogArticleShare :entry="blogStore.article" />
        </div>
      </header>
      <div class="post-content-container">
        <main
          id="main"
          role="main"
        >
          <div
            :id="`post-${blogStore.article?.id}`"
            class="planet-biker type-planet-biker status-publish has-post-thumbnail hentry category-rutas"
            role="article"
          >
            <section
              class="entry-content"
              itemprop="articleBody"
            >
              <div
                v-if="blogStore.youtubeVideo"
                class="youtube-video-container"
              >
                <iframe
                  loading="lazy"
                  class="youtube-video lazyloaded"
                  :src="blogStore.youtubeVideo"
                  allowfullscreen=""
                />
              </div>

              <div
                v-else
                class="featured-image"
              >
                <img
                  class="attachment-full size-full wp-post-image "
                  :src="blogStore.previewImage"
                >
              </div>


              <Widget
                v-for="widget in blogStore.article.widgets"
                :key="widget.id"
                :widget="widget"
              />
            </section>
          </div>
        </main>
      </div>
    </article>

    <BlogArticleProducts :article="blogStore.article" />
    <BlogCommentForm v-if="blogStore.article" :post-id="blogStore.article?.id" />
  </div>
</template>

<style>
#blog-wrapper .entry-content p {
  margin: 20px 0px;
}
#blog-wrapper .entry-content  p {
  color: #000;
}
#blog-wrapper .entry-content  p {
  padding: 0 25px;
  font-size: 15px;
  line-height: 1.8;
}


</style>

