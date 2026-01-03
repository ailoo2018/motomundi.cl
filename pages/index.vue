<script setup>
import { useConfigStore } from '@core/stores/config'
import Swiper from "@/views/pages/home/swiper.vue"
import AddedValues from "@/views/pages/home/added-values.vue"
import HomeCategories from "@/views/pages/home/home-categories.vue"
import ScrollingText from "@/views/pages/home/scrolling-text.vue"
import FeaturedProducts from "@/views/pages/home/featured-products.vue"
import Dummy from "@/views/pages/home/dummy.vue"
import SingleBanner from "@/views/pages/home/single-banner.vue"

const componentMap = {
  Swiper,
  AddedValues,
  HomeCategories,
  ScrollingText,
  FeaturedProducts,
  Dummy,
  SingleBanner,
}

const store = useConfigStore()

store.skin = 'default'
definePageMeta({
  layout: 'motomundi',
  public: true,

})

const activeSectionId = ref()
const refSwiper = ref()
const refAddedValues = ref()
const refCategories = ref()
const refScrollingText = ref()
const refFeaturedProducts = ref()

const config = useRuntimeConfig()
const cmsUrl = config.public.cmsBaseUrl
const productsUrl = config.public.productsBaseUrl

const home = ref()



const { data: homeRs, pending } = await useFetch(`/api/home/home?id=10018`, {
  key: `home-data-unique-key  `,
  onResponseError({ response }) {
    console.error('[SSR Fetch Error]:', response.status, response._data)
  },
})

home.value = homeRs.value;


useIntersectionObserver([

], ([{ isIntersecting, target }]) => {
  if (isIntersecting)
    activeSectionId.value = target.id
}, { threshold: 0.25 })
</script>

<template>


  <Component
    :is="componentMap[widget.component]"
    v-for="widget in home?.widgets || []"

    :key="widget.id"
    :widget="widget"
  />

</template>

<style lang="scss">
@media (max-width: 960px) and (min-width: 600px) {
  .landing-page-wrapper {
    .v-container {
      padding-inline: 2rem !important;
    }
  }
}

@media (min-width: 960px) {
  .v-container {
    width: 90%;
    min-width: 800px;
    max-width: 1300px;

  }
}

.main-content {
  width: 90%;
  min-width: 800px;
  max-width: 1300px;
  margin: auto;
  background-color: white;
}
</style>
