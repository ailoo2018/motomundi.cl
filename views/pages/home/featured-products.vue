<script setup lang="ts">
/* eslint-disable camelcase */
import { ref, onMounted } from 'vue'
import { SwiperSlide } from "swiper/vue"
import { register } from 'swiper/element/bundle'

const props = defineProps({
  widget: {
    type: Object,
    required: true,
  },
})

const widgetId = props.widget.id
const collectionId = computed(() => props.widget.configuration.collection.id)

const getCollectionUrl = w => {
  return "/" + w.url
}

const { data: rs, pending } = await useFetch(`/api/product/collection`, {
  query: { collectionId, limit: 30 },
  key: `products-fetch-${collectionId.value}`, // Explicit key helps hydration

})

console.log("key:" + `products-fetch-${widgetId}-${collectionId.value}`)

const url = computed(() => { return rs.value?.url })

const products = computed(() => {
  const rawProducts = rs.value?.products || []

  if (rawProducts.length === 0) return []

  // Create a shallow copy to avoid mutating the original fetched data
  const shuffled = [...rawProducts]

  // Fisher-Yates Shuffle Algorithm
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));

    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }

  // 3. Return only the first 10
  return shuffled.slice(0, 10)
})


const swiperBreakpoints = {
  320: { slidesPerView: 2, spaceBetween: 10 },
  640: { slidesPerView: 2, spaceBetween: 10 },
  1024: { slidesPerView: 4, spaceBetween: 10 },
  1280: { slidesPerView: 5, spaceBetween: 10 },
}

const styles = [
  `
        .swiper-button-next, .swiper-button-prev{
background-color: rgba(0, 0, 0, .6);
    height: 40px;
    padding: 0;
    text-align: center;
    width: 40px;
        }
        `,
]

// Initialize Swiper Custom Elements
register()
</script>

<template>

  <div
    :id="`home-block-${widget.id}`"
    class="block-container"
  >
    <section class="show-products-block">
      <VContainer class="v-container">
        <div class="row">
          <div class="col s12 l12">
            <section class="product-list__title d-flex align-center justify-space-between">
              <h2>
                {{ widget.configuration.collection.name }}
              </h2>
              <a
                :href="url"
                data-dr="true"
                class="button button--primary hide-on-small-and-down mtc-link"
              >
                <span>Ver todo</span>
                <svg
                  width="12"
                  height="12"
                  xmlns="http://www.w3.org/2000/svg"
                  class="icon sprite-line-icons"
                >
                  <title>Right arrow</title>
                  <use
                    href="/content/svg/motomundi.svg#i-icon-arrow-right-tail"
                    xlink:href="/content/svg/motomundi.svg#i-icon-arrow-right-tail"
                  />
                </svg>
              </a>
            </section>

            <section class="home-products-list">
              <div class="product-list">
                <div class="row products margin-top">
                  <ClientOnly>
                    <swiper-container
                      events-prefix="swiper-"
                      navigation="true"
                      :breakpoints="swiperBreakpoints"
                      class="pb-10"
                      :inject-styles="[
                        `
        .swiper-button-next, .swiper-button-prev{
          border: none;
  height: 25px;
  width: 25px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.3s;
          background-color: rgba(0, 0, 0, .6) !important;
          color: #fff !important;
          padding-inline: 0.45rem !important;
          padding-block: 0.45rem !important;


        }
        .swiper-button-next svg, .swiper-button-prev svg{
        height: 10px; width: 10px;
        }
        `,
                      ]"
                    >
                      <swiper-slide
                        v-for="product in products"
                        :key="product.id"
                      >
                        <article class="item with-countdown">
                          <section :data-id="product.id">
                            <button class="add-to-favs ">
                              <svg
                                data-v-45b081c0=""
                                width="29"
                                height="24"
                                xmlns="http://www.w3.org/2000/svg"
                                class="add icon sprite-line-icons"
                              >
                                <title data-v-45b081c0="">Añadir a favoritos</title>
                                <use
                                  data-v-45b081c0=""
                                  href="/content/svg/motomundi.svg#i-icon-favorite"
                                  xlink:href="/content/svg/motomundi.svg#i-icon-favorite"
                                />
                              </svg>
                            </button>
                            <a
                              :href="product.url"
                              data-dr="true"
                              class="mtc-link"
                            >
                              <div class="product-tags">
                                <span
                                  v-if="product.price?.discount > 0"
                                  class="tag-wrapper"
                                >
                                  <span class="tag product-tag product-tag--old product-tag--offer">
                                    <span class="discount">-{{ formatPercent((1 - product.price.price / product.price.base_price))
                                    }}</span>
                                  </span>
                                </span>
                              </div>
                              <span class="product-image">
                                <img
                                  :src="getImageUrl(product.image, 300, getDomainId())"
                                  class="cdn-img v-lazy-image v-lazy-image-loaded"
                                  :alt="product.name"
                                  style="max-width: 100%"
                                >
                                <noscript />
                              </span>
                            </a>
                            <section class="item__info">
                              <a
                                :href="product.url"
                                data-dr="true"
                                class="mtc-link"
                              >
                                <div class="item__name">
                                  <!-- <span class="item__sizes">Tallas: Talla única</span> -->
                                  <span class="item__rating">
                                    <span class="rating-block">
                                      <span>
                                        <img
                                          src="/content/images/stars/8.webp"
                                          class="cdn-img v-lazy-image v-lazy-image-loaded"
                                          alt="8"
                                          width="68"
                                          height="12"
                                          srcset=""
                                        > <noscript />
                                      </span>
                                    </span>
                                  </span>
                                  <h3 class="heading-tag">
                                    <span>{{ product.brand.name }}</span>
                                    <strong>{{ product.name }} </strong>
                                  </h3>
                                </div>
                              </a>
                              <a
                                :href="product.url"
                                data-dr="true"
                                class="item__price-info mtc-link"
                              >
                                <span class="item__bottom">
                                  <span class="item__price">{{ formatMoney(product.price.price) }}</span>
                                  <span
                                    v-if="product.price.discount > 0"
                                    class="item__old-price strike"
                                  >{{ formatMoney(product.price.base_price) }}</span>


                                  <span v-if="product.videos && product.videos.length > 0">
                                    <img src="/content/images/youtube_icon.svg">
                                  </span>

                                </span>
                              </a>
                            </section>
                          </section>
                        </article>
                      </swiper-slide>
                    </swiper-container>
                  </ClientOnly>
                </div>
              </div>
            </section>
          </div>
        </div>
      </VContainer>
    </section>
  </div>
</template>

<style lang="scss" scoped>
.product-list__title {
  align-items: center;
  display: flex;
  justify-content: space-between;
  margin: 70px 0px 50px;
}
.v-container{
  width: 100%;
  padding: 40px 20px;
}

.home-products-list .carousel-content--nav button:first-child, .home-products-list .carousel-content--nav button:last-child {
  background-color: rgba(0, 0, 0, .6);
  height: 40px;
  padding: 0;
  text-align: center;
  width: 40px;
}

.product-tags .tag.product-tag {
  color: #fff;
  font-size: 11px;
  font-weight: 700;
  margin-right: 1px;
  padding: 5px 15px;
  text-transform: uppercase;
}

.tag.product-tag.product-tag--crazydays, .tag.product-tag.product-tag--offer, .tag.product-tag.product-tag--sales {
  background-color: #d6001c;
}

.tag.product-tag.product-tag--old {
  color: #fff;
}

.item .heading-tag {
  border-bottom: 1px solid #d8d8d8;
  color: #000;
  display: flex;
  flex-direction: column;
  font-size: 10px;
  font-weight: 500;
  justify-content: flex-end;
  line-height: 13px;
  margin: 0;
  padding-bottom: 12px;
  text-transform: uppercase;
}

.item .heading-tag > span {
  color: #333;
  display: inline-block;
  font-weight: 300;
  font-size: 13px;
  line-height: 1.1;
  margin-bottom: 2px;
}

.item .heading-tag strong {
  display: block;
  font-size: 13px;
  font-weight: 700;
}

.block-container {
  background-color: #f5f5f5;
}

.product-list__title h2 {
  font-size: 36px;
  font-weight: 900;
  color: #000;
  margin: 0;
  text-transform: uppercase;
}


.product-list .products .item {
  background-color: #fff;
  margin-bottom: 5px;
}

.home-products-list .item:before {
  background: rgba(0, 0, 0, .025);
  bottom: 0;
  content: "";
  left: 0;
  pointer-events: none;
  position: absolute;
  right: 0;
  top: 0;
  z-index: 2;
}

.button.button--primary {
  background-color: #d6001c;
  border-color: #d6001c;
  color: #fff;
}

.item {
  border: 1px solid #d8d8d8;
  box-sizing: border-box;
  height: 100%;
  padding: 40px 5px 20px;
}

.item > div, .item > section {
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: space-between;
}

.add-to-favs {
  background-color: transparent;
  height: 24px;
  opacity: 0;
  padding: 0;
  position: absolute;
  right: 10px;
  top: 15px;
  -webkit-transform: scale(0);
  transform: scale(0);
  -webkit-transform-origin: center center;
  transform-origin: center center;
  transition: all .2s ease;
  width: 29px;
}

a, span.mtc-link {
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  color: #d6001c;
  cursor: pointer;
  -webkit-text-decoration: none;
  text-decoration: none;
}

.product-tags {
  left: 0;
  position: absolute;
  top: 12px;
}

.product-tags {
  display: flex;
  flex-wrap: wrap;
}


.item .item__info {
  padding: 0 20px;
}

.item .item__name {
  justify-content: flex-end;
  margin: 35px 0 15px;
  position: relative;
}

.item__bottom {
  align-items: center;
  /* border-top: 1px solid #d8d8d8; */
  display: block;
  display: flex;
  justify-content: space-between;
  margin-top: 6px;
  padding-top: 6px;
}

/* Styling to match your layout */
.text-truncate-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

swiper-container {
  width: 100%;
  height: 100%;
}

.product-card {
  transition: transform 0.2s;
}

.item__old-price {
  color: #000;
  font-size: 10px;
  font-weight: 500;
  left: 0;
  line-height: 16px;
  opacity: .4;
  position: absolute;
  top: -10px;
}

.item__price {
  color: #000;
  font-size: 14px;
  font-weight: 800;
  line-height: 20px;
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
    margin-bottom: 10px;
  }
}

</style>
