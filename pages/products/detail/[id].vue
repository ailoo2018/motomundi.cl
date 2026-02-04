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

definePageMeta({
  //  layout: 'motomundi',
  public: true,
})



const { isMobile, isTablet, isDesktop } = useDevice()
const store = useConfigStore()
const productForm = ref()
const showVideoDialog = ref(false)
const blogArticle = ref()
const loading = ref(false)

const route = useRoute()

console.log("router: " + route.params.id)

// --- ID EXTRACTION LOGIC ---
const productId = computed(() => {
  // Case A: Direct hit on /products/detail/2993400
  if (route.params.id) return route.params.id

  // Case B: Friendly URL /motocicleta/2993400-some-name
  // route.params.slug is an array due to the '+' in config
  const slugValue = Array.isArray(route.params.slug)
    ? route.params.slug[0]
    : route.params.slug

  if (slugValue) {
    // Extract everything before the first hyphen
    return slugValue.split('-')[0]
  }

  return null
})



const productCarousel = ref()
const currentVideoId = ref()

const cartStore = useCartStore();

const { data: product, pending } = await useFetch(() => `/api/product/${productId.value}`)

const onShowVideo = videoId => {
  console.log("showVideo: " + videoId)
  currentVideoId.value = videoId
  showVideoDialog.value = true
}

const addToCart = async item => {

  loading.value = true
  try {
    const wuid = useGuestUser().value

    let cartItem = null
    if(product.value.type === ProductType.Simple){
      cartItem = {
        wuid: wuid,
        type: 0, // cart item product
        quantity: item.quantity,
        productItemId: item.productItemId,
      }
    }else{
      cartItem =  {
        wuid: wuid,
        type: 0, // cart item product
        quantity: 1,
        productItemId: product.value.productItems[0].id,
        packContents: item,
      }
    }


    await cartStore.add(cartItem)


    window.location = "/cart"

  }catch(e){
    alert("error: " + e.message)
  }finally{
    loading.value = false
  }
}

const onSelectedColor = color => {
  // ref="productCarousel"
  console.log("onSelectedColor", color)
  productCarousel.value.selectSlideByProductColor(color)
}



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
            :loading="loading"
            @update:color="onSelectedColor"
            @add-to-cart="addToCart"
          />
        </div>



      </section>

      <Packs :product="product" />

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
            :src="`https://www.youtube.com/embed/${currentVideoId}`"
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

<style scoped lang="scss">
</style>
