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
import Seo2 from "@/views/pages/home/seo2.vue"
import EmbajadoresHome from "@/views/pages/home/embajadores-home.vue"
import BikeSearch from "@/views/pages/home/bike-search.vue"
import YoutubeLatest from "@/views/pages/home/youtube-latest.vue"
import CafeRacerCategories from "@/views/pages/home/cafe-racer-categories.vue"
import CafeRacerBrandsBlock from "@/views/pages/home/cafe-racer-brands-block.vue"
import OffRoadCategories from "@/views/pages/home/OffRoadCategories.vue"
import BrandsBlockMx from "@/views/pages/home/BrandsBlockMx.vue"
import OutletPromo from "@/views/pages/home/outlet-promo.vue"
import LifestyleCategories from "@/views/pages/home/lifestyle-categories.vue"

import Himalaya from "@/views/pages/home/himalaya.vue"

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
  EmbajadoresHome,
  OutletPromo,
  Kidult: Himalaya,

  //  Seo2,
  BikeSearch,
  CafeRacerCategories,
  YoutubeLatest,
  CafeRacerBrandsBlock,
  OffRoadCategories,
  BrandsBlockMx,
  LifestyleCategories,
}

const { isMobile } = useDevice()
const store = useConfigStore()

if(isMobile.value)
  componentMap.Seo2 = Seo2

store.skin = 'default'



const { setDepartment } = useDepartment()

setDepartment(props.wccId)

const { data: homeRs, pending } = await useFetch(`/api/home/home?id=` + props.wccId, {
  key: `home-data-unique-key-` + props.wccId,
  onResponseError({ response }) {
    console.error('[SSR Fetch Error]:', response.status, response._data)
  },
})

const widgets = computed( () => {
  return homeRs.value?.widgets.filter(w =>  !(isMobile && w.name === "SEO") )
})
</script>

<template>
  <VAlert v-if="false">
    <ul>
      <li v-for="widget in widgets">
        {{ widget.id }} {{ widget.component }}
        <span v-if="widget.id == 114930" />
      </li>
    </ul>
  </VAlert>



  <Component
    :is="componentMap[widget.component]"
    v-for="widget in widgets"
    :key="widget.id"
    :widget="widget"
  />

  <Himalaya />

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
