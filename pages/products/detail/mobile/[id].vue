<script setup>
/* eslint-disable camelcase */
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
import ProductComplements from "@/views/pages/products/product-complements.vue"

definePageMeta({
  public: true,

})


const { isMobile, isTablet, isDesktop } = useDevice()
const store = useConfigStore()
const showVideoDialog = ref(false)
const loading = ref(false)
const productCarousel = ref()
const currentVideoId = ref()

const route = useRoute()
const router = useRouter()

console.log("router: " + route.params.id)

const productId = computed(() => {
  if (route.params.id) return route.params.id
  const slugValue = Array.isArray(route.params.slug) ? route.params.slug[0] : route.params.slug

  return slugValue ? slugValue.split('-')[0] : null
})



const cartStore = useCartStore()

const { data: product, pending } = await useFetch(`/api/product/${productId.value}`, {
  // Use a unique key based on the STABLE computed value
  key: `product-data-${productId.value}`,
  lazy: true,

})

useSeoMeta({
  title: () => product.value?.name || 'Loading Product...',
  ogTitle: () => product.value?.name,
  description: () => product.value?.fullName,
  ogDescription: () => product.value?.fullName,
  ogImage: () => product.value && product.value.image ? getImageUrl(product.value.image, 600, getDomainId()) : null, // Optional: set social sharing image
})


console.log("ogImage: " + (product.value && product.value.image ? getBaseCDN() + getImageUrl(product.value.image, 600, getDomainId()) : null))

const onShowVideo = videoId => {
  console.log("showVideo: " + videoId)
  currentVideoId.value = videoId
  showVideoDialog.value = true
}

const addToCartGEvent = () => {
  try {
    window.dataLayer.push({ ecommerce: null })

    let category = null
    if (product.value.parentCategories?.length > 0) {
      category = product.value.parentCategories[0]
    }

    window.dataLayer.push({
      event: 'add_to_cart',
      ecommerce: {
        currency: 'CLP',
        value: Number(product.price),
        items: [
          {
            item_id: product.value.id,
            item_name: product.value.name,
            item_brand: product.value.brand?.name || '',
            item_category: category?.name || '',
            price: Number(product.value.minPrice),
            quantity: 1, // Or your quantity ref
          },
        ],
      },
    })

    console.log("addToCartGEvent success")
  } catch (e) {
    console.error("Error addToCartGEvent", e)
  }
}

const addToCart = async item => {

  loading.value = true
  try {
    const wuid = useGuestUser().value

    addToCartGEvent()
    await nextTick()
    let cartItem = null
    if (product.value.type === ProductType.Simple) {
      cartItem = {
        wuid: wuid,
        type: 0, // cart item product
        quantity: item.quantity,
        productItemId: item.productItemId,
      }
    } else {
      cartItem = {
        wuid: wuid,
        type: 0, // cart item product
        quantity: 1,
        productItemId: product.value.productItems[0].id,
        packContents: item,
      }
    }


    await cartStore.add(cartItem, wuid)


    window.location = "/cart"

  } catch (e) {
    alert("error: " + e.message)
  } finally {
    loading.value = false
  }
}

const onSelectedColor = color => {
  // ref="productCarousel"
  console.log("onSelectedColor", color)
  productCarousel.value.selectSlideByProductColor(color)
}


onMounted(() => {

  if (product.value) {


    // 1. Clear previous ecommerce data (important for SPAs)
    window.dataLayer.push({ ecommerce: null })


    // 2. Push the new product view
    let category = null
    if (product.value.parentCategories?.length > 0) {
      category = product.value.parentCategories[0]
    }

    const gprod = {
      event: 'view_item',
      ecommerce: {
        currency: 'CLP',
        value: Number(product.value.minPrice), // Total value of the view
        items: [
          {
            item_id: product.value.id,
            item_name: product.value.name,
            item_brand: product.value.brand?.name || "",
            item_category: category?.name || '',
            price: Number(product.value.minPrice),
            quantity: 1,
          },
        ],
      },
    }

    console.log("view_item", gprod)

    window.dataLayer.push(gprod)
  }
})

const goToReviews = () => {
  document.getElementById('product-reviews')?.scrollIntoView({ behavior: 'smooth' })
}

</script>

<template>
  <div
    v-if="error"
    class="container"
    style="padding: 60px 20px; text-align: center;"
  >
    <VIcon
      icon="tabler-package-off"
      size="64"
      color="grey"
    />
    <h2 style="margin-top: 16px; color: #555;">
      Producto no encontrado
    </h2>
    <p style="color: #888;">
      El producto que buscas no existe o ya no está disponible.
    </p>
    <VBtn
      color="primary"
      style="margin-top: 20px;"
      @click="router.push('/')"
    >
      Volver al inicio
    </VBtn>
  </div>

  <article style="min-height: 600px">
    <div
      v-if="product"
      class="container product"
    >
      <section class="row product-main ml-sm-0  ml-md-2">
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
                    <div class="title-rating" v-if="product.totalReviews > 0">
                      <div class="title-rating__stars">
                        <VRating
                          size="x-small"
                          density="compact"
                          color="primary"
                          style="margin:0; padding:0; top: -10px;left: -2px;position: relative;"
                          half-increments
                          :model-value="product.rating / 2"
                          readonly
                        />

                      </div>
                      <span class="title-rating__divider">·</span>
                      <a

                        class="title-rating__link"
                        href="#product-reviews"
                        @click.prevent="goToReviews()"
                      >
                        Leer {{product.totalReviews}} evaluaciones
                      </a>
                    </div>
                  </h1>

                  <a
                    v-if="!isMobile"
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

          <ShareComponent/>
          <!-- /share -->

          <ProductImagesCarousel
            ref="productCarousel"
            :product="product"
            @on-show-video="onShowVideo"
          />
        </div>

        <div class="col s12 m5 l5">
          <PreProductBanner/>

          <ProductBuyPanel
            :product="product"
            :loading="loading"
            @update:color="onSelectedColor"
            @add-to-cart="addToCart"
          />
        </div>
      </section>

      <Packs :product="product"/>

      <ProductComplements :product-id="product?.id"/>

      <!-- product-description-container -->
      <VRow class=" product-description-container mt-10">
        <VCol
          cols="12"
          md="7"
        >
          <ProductDescription :description="product?.description"/>
        </VCol>


        <!-- ficha-tecnica -->
        <VCol
          cols="12"
          md="5"
        >
          <!-- blog -->
          <RelatedBlog
            v-if="product?.relatedBlogArticle"
            :article="product.relatedBlogArticle"
          />
          <!-- /blog -->
          <DataSheet :product="product"/>
        </VCol>
        <!-- /ficha-tecnica -->
      </VRow>
      <!-- /product-description-container -->


      <!-- recommend -->
      <Recommend :product="product"/>

      <div id="product-reviews">
        <ProductRating
          v-if="product && product.id"
          :key="product.id"
          :product="product"
        />
      </div>
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

<style>
.title-rating {
  display: flex;
  align-items: center;
  gap: 4px;
  margin-top: 0px;
  flex-wrap: wrap;
}

.title-rating__stars {
  display: flex;
  align-items: center;
  gap: 4px;
}


.title-rating__divider {
  color: #B21915;
  font-size: 0.9rem;
  position: relative;
  top: -7px;
}

.title-rating__link {
  font-size: 0.82rem;
  text-transform: none;
  text-decoration: none;
  position: relative;
  top: -1px;
  border-bottom: 1px solid transparent;
  transition: border-color 0.15s;
  min-height: unset;

}
</style>
