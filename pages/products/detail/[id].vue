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
import { ProductType } from "@/models/products.js"
import ProductRating from "@/views/pages/products/detail/product-rating.vue"

const { isMobile, isTablet, isDesktop } = useDevice()
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
  
  try {
    const wuid = useGuestUser().value

    let body = null
    if(product.value.type === ProductType.Simple){
      body = JSON.stringify({
        wuid: wuid,
        type: 0, // cart item product
        quantity: item.quantity,
        productItemId: item.productItemId,
      })
    }else{
      body = JSON.stringify( {
        wuid: wuid,
        type: 0, // cart item product
        quantity: 1,
        productItemId: product.value.productItems[0].id,
        packContents: item,
      })

    }

    const resAdd = await $fetch(`/api/cart/add`, {
      method: "POST",
      body: body,
    },
    )

    await navigateTo('/cart')
  }catch(e){
    alert("error: " + e.message)
  }
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
              <Breadcrumbs :product="product"/>

              <!-- product-title -->
              <div class="product-title">
                <div class="product-title__container">
                  <h1>
                    {{ product.brand.name }}
                    <strong>{{ product.name }}</strong>
                  </h1>
                  <a v-if="!isMobile"
                    :href="getBrandUrl(product.brand)"
                    class="mtc-link"
                  >
                    <span>
                      <img
                        onerror="this.style.display='none'"
                        :src="`/content/images/brands/${product.brand.id}.webp`"
                        srcset=""
                        :alt="product.brand.name"
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

        <Packs :product="product" />
      </section>


      <!-- product-description-container -->
      <VRow class="row product-description-container mt-10">
        <VCol
          cols="12"
          md="7"
        >
          <ProductDescription :description="product.description" />
        </VCol>


        <!-- ficha-tecnica -->
        <VCol
          cols="12"
          md="5"
        >
          <!-- blog -->
          <RelatedBlog v-if="blogArticle" />
          <!-- /blog -->
          <DataSheet :product="product" />
        </VCol>
        <!-- /ficha-tecnica -->
      </VRow>
      <!-- /product-description-container -->


      <Recommend :product="product" />

      <ProductRating :product="product" />
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

<style lang="scss">
#reviews h2 {
  font-size: 24px;
  font-weight: 900;
  line-height: 26.2px;
  margin-bottom: 30px;
  text-transform: uppercase;
}

#reviews .group-title {
  overflow: hidden;
  border-bottom: none;
  padding-bottom: 0;
  padding-left: 0;
  margin-right: 10px;
  margin-bottom: 25px;
}

.ratings-summary .rating-star-summary[data-v-0645f717] {
  color: #363636;
  cursor: pointer;
  margin-bottom: .4rem;
  overflow: hidden;
  text-transform: uppercase;
}

.ratings-summary .rating-star-summary > span[data-v-0645f717] {
  display: block;
  float: left;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: -.05rem;
  width: 28%;
}

.ratings-summary .rating-star-summary[data-v-0645f717] {
  color: #363636;
  cursor: pointer;
  margin-bottom: .4rem;
  overflow: hidden;
  text-transform: uppercase;
}

.ratings-summary .rating-star-summary > span[data-v-0645f717] {
  display: block;
  float: left;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: -.05rem;
  width: 28%;
}

.ratings-summary .rating-star-summary[data-v-0645f717] {
  color: #363636;
  cursor: pointer;
  margin-bottom: .4rem;
  overflow: hidden;
  text-transform: uppercase;
}

.ratings-summary .rating-outer[data-v-0645f717] {
  background-color: #f5f5f5;
  float: left;
  height: 16px;
  overflow: hidden;
  width: 70%;
}

.ratings-summary .rating-inner[data-v-0645f717] {
  background-color: #363636;
  height: 16px;
}

.ratings-summary .rating-star-summary[data-v-0645f717] {
  color: #363636;
  cursor: pointer;
  margin-bottom: .4rem;
  overflow: hidden;
  text-transform: uppercase;
}

/* /end left control */

.review-filters button.selected {
  background-color: #000;
  color: #fff;
}

.review-filters button {
  background-color: #f0f4f5;
  border-radius: 200px;
  font-size: 10px;
  font-weight: 500;
  margin: 3px;
  padding: .4rem .8rem;
  text-transform: uppercase;
}

.user-reviews[data-v-904907ba] {
  border-top: 1px solid #ebebeb;
  margin-top: 1.8rem;
  padding-top: 1.8rem;
}

.user-review-block .rating-aside[data-v-388dab7a] {
  align-items: center;
  display: flex;
  justify-content: space-between;
}

.rating-block {
  display: inline-block;
  overflow: hidden;
}


.account__user-avatar[data-v-9f685454] {
  border-radius: 200px;
  color: #fff;
  font-weight: 700;
  text-align: center;
  text-transform: uppercase;
}


.user-review-block h4[data-v-388dab7a] {
  align-items: center;
  display: flex;
  font-size: 13px;
  font-weight: 700;
  margin: 15px 0 8px;
}

.account__user-avatar img[data-v-9f685454] {
  border-radius: 200px;
  height: 100%;
  left: 0;
  position: absolute;
  width: 100%;
}

.user-review-block h4 span[data-v-388dab7a] {
  margin-left: 6px;
}

.user-review-block h4[data-v-388dab7a] {
  align-items: center;
  display: flex;
  font-size: 13px;
  font-weight: 700;
  margin: 15px 0 8px;
}

.user-review-block h4 svg[data-v-388dab7a] {
  margin-left: 4px;
  -webkit-transform: scale(.9);
  transform: scale(.9);
  -webkit-transform-origin: center right;
  transform-origin: center right;
}

.user-review-block p[data-v-388dab7a] {
  font-size: 14px;
  line-height: 20px;
}

.rating-version[data-v-0fe02913] {
  align-items: center;
  background-color: #f5f5f5;
  border-radius: 200px;
  color: #000;
  display: flex;
  font-size: .6rem;
  font-weight: 500;
  padding: 2px 12px;
  text-transform: uppercase;
}

.reviews-load-more[data-v-904907ba] {
  border-top: 1px solid #ebebeb;
  margin-top: 3rem;
  padding-top: 3rem;
}

#reviews .button {
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

#reviews button, input, optgroup, select, textarea {
  border-radius: 0;
  box-sizing: border-box !important;
  color: #000;
  font-family: system, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
  font-weight: 500;
  outline: none;
}

#reviews .empty-review {
  font-size: 14px;
  font-weight: 600;
  line-height: 1;
  padding: 135px 0;
  text-align: center;
  text-transform: uppercase;
}

#reviews .empty-review svg[data-v-904907ba] {
  display: block;
  height: auto;
  margin: 0 auto 1rem;
  width: 35px;
}

.rating-version span[data-v-0fe02913]:last-child {
  margin-left: 3px;
}

.ratings-summary .rating-selected[data-v-0645f717] {
  color: #d6001c;
}

.ratings-summary .rating-selected .rating-inner[data-v-0645f717] {
  background-color: #d6001c;
}

#reviews .review-filters button.selected {
  background-color: #000;
  color: #fff;
}

#reviews .review-filters button {
  background-color: #f0f4f5;
  border-radius: 200px;
  font-size: 10px;
  font-weight: 500;
  margin: 3px;
  padding: .4rem .8rem;
  text-transform: uppercase;
}

#reviews .user-reviews {
  border-top: 1px solid #ebebeb;
  margin-top: 1.8rem;
  padding-top: 1.8rem;
}
</style>
