<script setup lang="ts">
import Swiper from "@/views/pages/home/swiper.vue"
import AddedValues from "@/views/pages/home/added-values.vue"
import HomeCategories from "@/views/pages/home/home-categories.vue"
import ScrollingText from "@/views/pages/home/scrolling-text.vue"
import FeaturedProducts from "@/views/pages/home/featured-products.vue"
import Dummy from "@/views/pages/home/dummy.vue"
import SingleBanner from "@/views/pages/home/single-banner.vue"
import BrandsBlock from "@/views/pages/home/brands-block.vue"
import Community from "@/views/pages/home/community.vue"
import FeaturedProductsWithBanner from "@/views/pages/home/featured-products-with-banner.vue"
import LatestEvents from "@/views/pages/home/latest-events.vue"
import Seo from "@/views/pages/home/seo.vue"
import BikeSearch from "@/views/pages/home/bike-search.vue"
import HtmlWidget from "@/views/pages/home/html-widget.vue"

const props = defineProps({
  widget: {
    type: Object
  }
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
  HtmlWidget,
}
</script>
<template>
  <Component
    :is="componentMap[widget.component]"
    :key="widget.id"
    :widget="widget"
  />
</template>
<style>

</style>



