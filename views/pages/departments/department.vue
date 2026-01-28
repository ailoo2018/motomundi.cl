<script setup>
import { useConfigStore } from '@core/stores/config'
import Swiper from "@/views/pages/home/swiper.vue"
import AddedValues from "@/views/pages/home/added-values.vue"
import HomeCategories from "@/views/pages/home/home-categories.vue"
import ScrollingText from "@/views/pages/home/scrolling-text.vue"
import FeaturedProducts from "@/views/pages/home/featured-products.vue"
import Dummy from "@/views/pages/home/dummy.vue"
import SingleBanner from "@/views/pages/home/single-banner.vue"
import BrandsBlock from "@/views/pages/home/brands-block.vue"
import FeaturedProductsWithBanner from "@/views/pages/home/featured-products-with-banner.vue"
import Community from "@/views/pages/home/community.vue"
import LatestEvents from "@/views/pages/home/latest-events.vue"
import Seo from "@/views/pages/home/seo.vue"
import BikeSearch from "@/views/pages/home/bike-search.vue"
import YoutubeLatest from "@/views/pages/home/youtube-latest.vue"

const props = defineProps({
  wccId: {
    type: Number,
  },
})



const componentMap = {
  Swiper,
  AddedValues,
  HomeCategories,
  ScrollingText,
  FeaturedProducts,
  Dummy,
  SingleBanner,
  BrandsBlock,
  Community,
  FeaturedProductsWithBanner,
  LatestEvents,
  Seo,
  BikeSearch,

}

const { isMobile } = useDevice()
const store = useConfigStore()

store.skin = 'default'

definePageMeta({
  layout: 'motomundi',
  public: true,

})

const activeSectionId = ref()

const config = useRuntimeConfig()



const { data: homeRs, pending } = await useFetch(`/api/home/home?id=` + props.wccId, {
  key: `home-data-unique-key`,
  onResponseError({ response }) {
    console.error('[SSR Fetch Error]:', response.status, response._data)
  },
})

const widgets = computed( () => {
  return homeRs.value?.widgets.filter(w =>  !(isMobile && w.name === "SEO") )
})


useIntersectionObserver([

], ([{ isIntersecting, target }]) => {
  if (isIntersecting)
    activeSectionId.value = target.id
}, { threshold: 0.25 })
</script>

<template>
  <div style="background-color: rgb(245, 245, 245)">
    <Component
      :is="componentMap[widget.component]"
      v-for="widget in widgets"
      :key="widget.id"
      :widget="widget"
    />
  </div>
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
</style>
