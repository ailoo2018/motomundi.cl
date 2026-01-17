<script setup>
import { useConfigStore } from "@core/stores/config"

import ShareComponent from "@/views/pages/products/share-component.vue"
import Breadcrumbs from "@/views/pages/products/breadcrumbs.vue"
import ProductImagesCarousel from "@/views/pages/products/product-images-carousel.vue"
import ProductBuyPanel from "@/views/pages/products/product-buy-panel.vue"
import PreProductBanner from "@/views/pages/products/pre-product-banner.vue"
import Recommend from "@/views/pages/products/recommend.vue"
import { useGuestUser } from "@/composables/useGuestUser.js"
import RelatedBlog from "@/views/pages/products/detail/related-blog.vue"
import ProductDescription from "@/views/pages/products/detail/product-description.vue"
import DataSheet from "@/views/pages/products/detail/data-sheet.vue"
import Packs from "@/views/pages/products/detail/packs.vue"

const store = useConfigStore()
const productForm = ref()
const showVideoDialog = ref(false)
const blogArticle = ref()

const route = useRoute()

const config = useRuntimeConfig()

const productCarousel = ref()

const { data: product, pending } = await useFetch(`/api/product/${route.params.id}`)

const onShowVideo = videoId => {
  console.log("showVideo: " + videoId)
  showVideoDialog.value = true
}

const addToCart = async item => {
  const wuid = useGuestUser().value

  const { data: product } = await useFetch(`/api/cart/add`, {
    method: "POST",
    body: JSON.stringify({
      wuid: wuid,
      type: 0,
      quantity: item.quantity,
      productItemId: item.productItemId,
    }),
  },
  )

  await navigateTo('/cart')
}

const onSelectedColor = color => {
  // ref="productCarousel"
  console.log("onSelectedColor", color)
  productCarousel.value.selectSlideByProductColor(color)
}

store.skin = 'default'
definePageMeta({
  layout: 'motomundi',
  public: true,

})
</script>

<template>
  <article v-if="product">
    <div class="container product">
      <section class="row product-main ">
        <div
          class="col s12 m7 l7"
          style="padding-right: 20px;"
        >
          <div class="s12">
            <div>
              <Breadcrumbs />

              <!-- product-title -->
              <div class="product-title">
                <div class="product-title__container">
                  <h1>
                    {{ product.brand.name }}
                    <strong>{{ product.name }}</strong>
                  </h1>
                  <a
                    href="/hjc"
                    data-dr="true"
                    class="mtc-link"
                  >
                    <span>
                      <img
                        onerror="this.style.display='none'"
                        :src="`/content/images/brands/${product.brand.id}.webp`"
                        srcset=""
                        alt="HJC"
                        width="98"
                        height="50"
                        class="cdn-img"
                      >
                    </span>
                  </a>
                </div>
              </div>
              <!-- /product-title -->
            </div>
          </div>

          <ShareComponent />
          <!-- /share -->

          <ProductImagesCarousel
            ref="productCarousel"
            :product="product"
            @on-show-video="onShowVideo"
          />
        </div>

        <div class="col s12 m5 l5">
          <PreProductBanner />
          <ProductBuyPanel
            :product="product"
            @update:color="onSelectedColor"
            @add-to-cart="addToCart"
          />
        </div>

        <Packs :product="product"/>
      </section>


      <!-- product-description-container -->
      <VRow class="row product-description-container mt-10">
        <VCol cols="12" md="7">
          <ProductDescription :description="product.description" />
        </VCol>


        <!-- ficha-tecnica -->
        <VCol cols="12" md="5" >
          <!-- blog -->
          <RelatedBlog v-if="blogArticle" />
          <!-- /blog -->
          <DataSheet :product="product" />
        </VCol>
        <!-- /ficha-tecnica -->
      </VRow>
      <!-- /product-description-container -->


      <Recommend :product="product" />
    </div>
  </article>

  <VDialog
    v-model="showVideoDialog"
    max-width="800"
  >
    <VCard>
      <VCardTitle class="d-flex justify-space-between pa-2">
        <h1 class="pa-2">
          {{ product.fullName }}}
        </h1>
        <div>
          <VBtn
            icon="tabler-x"
            variant="text"
            @click="showVideoDialog = false"
          />
        </div>
      </VCardTitle>

      <VCardText class="pa-1">
        <div class="video-container">
          <iframe
            src="https://www.youtube.com/embed/npaJwfAZzQE"
            title="YouTube video player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerpolicy="strict-origin-when-cross-origin"
            allowfullscreen
          />
        </div>
      </VCardText>
    </VCard>
  </VDialog>
</template>

<style  lang="scss">
h2 {
  text-align: center;
}

.video-container {
  position: relative;
  padding-bottom: 56.25%; /* 16:9 Aspect Ratio */
  height: 0;
  overflow: hidden;

  iframe {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
}

.container {
  margin: 0 auto;
  max-width: 1280px;
  width: 95%;
}

.row:after {
  clear: both;
  content: "";
  display: table;
}

.product-main {
  background-color: #fff;
  padding-top: 15px;
  /* margin: 0 0 0 16px; */
  margin: 0;
}


.product .share-on__networks.show {
  visibility: visible;
}

.row .col.s11, .row .col.s12 {
  left: auto;
  margin-left: auto;
  right: auto;
}

.product-title .product-title__container {
  align-items: center;
  display: flex;
  justify-content: space-between;
}

.product-title h1 {
  font-size: 24px;
  font-weight: 400;
  line-height: 29px;
  margin: 8px 0;
  max-width: 85%;
  text-transform: uppercase;
}

.product-title a {
  flex: 0 1 auto;
  min-height: 40px;
  width: auto;
}

.share-on__container {
  position: relative;
}


.row .col {
  box-sizing: border-box;
  float: left;
  min-height: 1px;
  padding: 0 .375rem;
}

a, span.mtc-link {
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  color: #d6001c;
  cursor: pointer;
  -webkit-text-decoration: none;
  text-decoration: none;
}

.row .col.s12 {
  width: 100%;
}


img {
  max-width: 100%;
}

.product img {
  display: inline-block;
  vertical-align: middle;
  max-width: 100%;
  height: auto;
  -ms-interpolation-mode: bicubic;
}


@media only screen and (min-width: 993px) {
  .row .col.l5, .row .col.l6 {
    left: auto;
    margin-left: auto;
    right: auto;
  }
}

@media only screen and (min-width: 993px) {
  .row .col.l5 {
    width: 41.6666666667%;
  }
}

@media only screen and (min-width: 993px) {
  .row .col.l7, .row .col.l8 {
    left: auto;
    margin-left: auto;
    right: auto;
  }
}

@media only screen and (min-width: 601px) {
  .row .col.m7, .row .col.m8 {
    left: auto;
    margin-left: auto;
    right: auto;
  }
}

@media only screen and (min-width: 993px) {
  .row .col.l7, .row .col.l8 {
    left: auto;
    margin-left: auto;
    right: auto;
  }
}

@media only screen and (min-width: 993px) {
  .row .col.l7 {
    width: 58.3333333333%;
  }
}


.product-description-container {
  background-color: #fff;
  margin: 13px;
}
</style>
