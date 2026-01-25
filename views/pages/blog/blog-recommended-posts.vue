<script setup lang="ts">
import { onMounted } from "vue"
import { register } from "swiper/element"

const { data: featured } = useFetch("/api/blog/featured-posts", {
  method: "GET",
  key: "blog-featured-posts",
})

const swiperBreakpoints = {
  320: { slidesPerView: 2, spaceBetween: 10 },
  640: { slidesPerView: 3, spaceBetween: 10 },
  1024: { slidesPerView: 3, spaceBetween: 10 },
  1280: { slidesPerView: 3, spaceBetween: 10 },
}


onMounted(() => {
  register()
})
</script>

<template>
  <div
    class="slider-featured-posts-container"
    ng-non-bindable
  >
    <div class="we-recommend">
      <div class="slider-arrows">
        <span
          class="prev slick-arrow"
          style="display: inline-block;"
        >
          <img
            src="https://cf-cdn-blog.motocard.com/assets/icons/previous-w.svg"
            class="lazyloaded"
            
          ><noscript>
            <img src="https://cf-cdn-blog.motocard.com/assets/icons/previous-w.svg"></noscript>
        </span>
        <span
          class="next slick-arrow"
          style="display: inline-block;"
        >
          <img
            src="https://cf-cdn-blog.motocard.com/assets/icons/next-w.svg"
            class="lazyloaded"
            
          ><noscript>
            <img src="https://cf-cdn-blog.motocard.com/assets/icons/next-w.svg"></noscript>
        </span>
      </div>
      Te  recomendamos...
    </div>
    <ClientOnly>
      <div class="slider-home slider-featured-posts slick-initialized slick-slider">
        <div
          v-if="featured"
          aria-live="polite"
          class="slick-list draggable"
        >
          <swiper-container
            class="slick-track owl-carousel swiper-container"
            role="listbox"
            :breakpoints="swiperBreakpoints"
          >
            <swiper-slide
              v-for="r in featured.entries"
              :key="r.id"
            >
              <article
                class="swiper-slide slider-featured-post large-4 post-35352 comparison type-comparison status-publish has-post-thumbnail hentry  slick-slide"
                tabindex="-1"
                role="option"
                aria-describedby="slick-slide07"
                data-slick-index="-3"
                aria-hidden="true"
              >
                <header>
                  <a
                    href="/$linkHelper.GetUrl($r)"
                    tabindex="-1"
                  >
                    <div class="img-wrapper">

                      <img
                        :src="`https://www.motomundi.cl${r.previewImage}`"
                        class="attachment-big-grid size-big-grid lazyloaded"
                        alt="Estos son los mejores cascos de motocross"
                      >
                    </div>
                  </a>
                  <div
                    class="title-container"
                    style="height: 115px;"
                  >
                    <span class="category">
                      <a
                        class="parent-category"
                        href="/$linkHelper.GetUrl($r)"
                        tabindex="-1"
                      >
                        Comparativas y rankings
                      </a>
                    </span>
                    <a
                      href="/$linkHelper.GetUrl($r)"
                      tabindex="-1"
                    >
                      <h2 class="post-title">{{r.title}}</h2>
                    </a>
                  </div>
                </header>
              </article>
            </swiper-slide>
          </swiper-container>
        </div>
      </div>
    </ClientOnly>
  </div>
</template>
