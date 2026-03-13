<script setup lang="ts">
import ProductListItem from "@/views/pages/products/list/product-list-item.vue"
import { SwiperSlide } from "swiper/vue"
import { register } from 'swiper/element/bundle'

const props = defineProps({
  productId: {
    type: Number,
    required: true,
  },
})



const { data } = useFetch("/api/product/complements", {
  key: "product-complements-" + props.productId,
  query: {
    productId: props.productId,
  },
})



const complements = computed(() => {
  return data.value?.products || []
})

const swiperBreakpoints = {
  320: { slidesPerView: 2, spaceBetween: 10 },
  640: { slidesPerView: 3, spaceBetween: 10 },
  1024: { slidesPerView: 4, spaceBetween: 10 },
  1280: { slidesPerView: 5, spaceBetween: 10 },
}


register()
</script>

<template>
  <div class="row">
    <div class="col s12">
      <aside class="related algolia-recommended">
        <section class="product-list px-4">
          <hgroup class="product-list__title">
            <h2 class="">
              COMBÍNALO CON
            </h2>
          </hgroup>
          <ClientOnly>
            <swiper-container
              events-prefix="swiper-"
              navigation="true"
              :prevent-clicks="false"
              :prevent-clicks-propagation="false"
              :touch-start-prevent-default="false"
              :breakpoints="swiperBreakpoints"
              class="product-swiper-container pb-10"

            >
              <swiper-slide
                v-for="product in complements"
                :key="product.id"
              >
                <ProductListItem :product="product" :show-miniatures="false" />
              </swiper-slide>
            </swiper-container>
          </ClientOnly>

        </section>
      </aside>
    </div>
  </div>
</template>

<style>

h2 {
  font-size: 24px;
  font-weight: 900;
  line-height: 26.2px;
  margin-bottom: 30px;
  text-transform: uppercase;
}

</style>
