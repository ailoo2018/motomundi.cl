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
  lazy: true,
  server: false,
  query: {
    productId: props.productId,
  },
  default: () => [],
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


const router = useRouter()


register()
</script>

<template>
  <div
    v-if="complements?.length > 0"
    class="row"
  >
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
              :simulate-touch="false"
            >
              <swiper-slide
                v-for="product in complements"
                :key="product.id"

              >
                <ProductListItem
                  :product="product"
                  :show-miniatures="false"
                />
              </swiper-slide>
            </swiper-container>
          </ClientOnly>
        </section>
      </aside>
    </div>
  </div>
</template>

<style scoped>
h2 {
  font-size: 24px;
  font-weight: 900;
  line-height: 26.2px;
  margin-bottom: 30px;
  text-transform: uppercase;
}



.strike {
  -webkit-text-decoration: line-through;
  text-decoration: line-through;
}

.button {
  background: none;
  border: 2px solid #000;
  box-sizing: border-box;
  color: #000;
  display: inline-block;
  font-size: 10px;
  font-weight: 700;
  letter-spacing: .5px;
  overflow: hidden;
  padding: 13px 25px;
  position: relative;
  text-align: center;
  text-transform: uppercase;
  transition: all .2s ease-in-out;
  z-index: 1;
}

.button.button--primary {
  background-color: #d6001c;
  border-color: #d6001c;
  color: #fff;
}

.button .sprite-line-icons {
  transition: all .2s ease-in-out;
  vertical-align: -2px;
}

svg:not(:root) {
  overflow: hidden;
}

.button .sprite-line-icons use {
  stroke: #000;
  stroke-width: 1;
  transition: all .2s ease-in-out;
}
.button.button--primary use {
  stroke: #fff;
}
.button--primary svg {
  display: inline-block;
  margin-left: 5px;
  vertical-align: -2px;
}

.sprite-line-icons use {
  fill-rule: evenodd;
  fill: none;
  stroke: #2a2a2a;
  stroke-width: 1.5;
  stroke-linecap: round;
  stroke-linejoin: round;
}

/* Target the web component before it's "defined" or initialized */
swiper-container:not(.swiper-initialized) {
  display: flex;
  overflow: hidden;
  gap: 20px; /* Match your :space-between */
}

swiper-container:not(.swiper-initialized) swiper-slide {
  width: 20%; /* For 5 slides per view (100 / 5) */
  flex-shrink: 0;
}

/* Container to allow absolute positioning of buttons relative to the slider */
.product-list {
  position: relative;
}

.swiper-nav-wrapper {
  position: absolute;
  top: 45%;
  width: 100%;
  display: flex;
  justify-content: space-between;
  z-index: 10;
  pointer-events: none; /* Allows clicks to pass through the wrapper to the buttons */
  transform: translateY(-50%);
}

.carousel-content--nav {
  pointer-events: auto; /* Re-enable clicks for the buttons */
  cursor: pointer;
}


/* Container to allow absolute positioning of buttons relative to the slider */
.product-list {
  position: relative;
}
@media only screen and (max-width: 600px) {
  .product-list__title h2 {
    font-size: 26px;
    /*    margin-bottom: 10px;*/
  }
}

:deep(.product-list-item) {
  cursor: pointer;
}

:deep(.product-list-item a) {
  cursor: pointer;
}
</style>
