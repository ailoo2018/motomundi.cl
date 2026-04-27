<script setup lang="ts">
// ── Meta ──────────────────────────────────────────────────
import ShareComponent from "@/views/pages/products/share-component.vue"
import Breadcrumbs from "@/views/pages/products/breadcrumbs.vue"
import ProductImagesCarousel from "@/views/pages/products/product-images-carousel.vue"
import ProductDescription from "@/views/pages/products/detail-v2/product-description.vue"
import { getDomainId, getImageUrl, getYouTubeThumbnail } from "@core/utils/formatters"
import PreProductBanner from "@/views/pages/products/detail-v2/pre-product-banner.vue"
import ProductRating from "@/views/pages/products/detail/product-rating.vue"
import Recommend from "@/views/pages/products/recommend.vue"
import ProductVariantSelector from "@/views/pages/products/detail-v2/product-variant-selector.vue"
import { useGuestUser } from "@/composables/useGuestUser"
import { ProductType } from "@/models/products"
import { useProductsUtils } from "@/composables/useProductsUtils"
import Packs from "@/views/pages/products/detail-v2/packs.vue"
import DataSheet from "@/views/pages/products/detail/data-sheet.vue"
import RelatedBlog from "@/views/pages/products/detail/related-blog.vue"
import ProductBuyPanel from "@/views/pages/products/product-buy-panel.vue"
import ProductComplements from "@/views/pages/products/product-complements.vue"
import StorePickup from "@/views/pages/products/detail/store-pickup.vue"
import { useWishlistStore } from "@/stores/wishlist"
import SeenCheaperForm from "@/views/pages/products/detail/seen-cheaper-form.vue"

const deviceType = useState('device-type', () => {
  // This function only runs on the SERVER during the first request
  const event = useRequestEvent()
  
  return event?.context.deviceType || 'desktop'
})

const isMobile = computed(() => deviceType.value === 'mobile')

const productHelper = useProductsUtils()

const isInStock = computed(() => {
  return productHelper.isInStock(product.value)
})


const route = useRoute()

const productId = computed(() => {
  if (route.params.id) return route.params.id
  const slugValue = Array.isArray(route.params.slug) ? route.params.slug[0] : route.params.slug

  return slugValue ? slugValue.split('-')[0] : null
})


const { data: product, pending } = await useFetch(`/api/product/${productId.value}`, {
  // Use a unique key based on the STABLE computed value
  key: `product-data-${productId.value}`,
  lazy: true,

})


useHead({ title: product.value?.fullName + ' – Motomundi' })

useSeoMeta({
  title: () => product.value?.name || 'Loading Product...',
  ogTitle: () => product.value?.name,
  description: () => product.value?.fullName,
  ogDescription: () => product.value?.fullName,
  ogImage: () => product.value && product.value.image ? getImageUrl(product.value.image, 600, getDomainId()) : null, // Optional: set social sharing image
})

const wishStore = useWishlistStore()

const localIsWished = computed(() => {
  // Assuming your store has a state or getter named 'items' or 'wishlist'
  // logic: return true if the current product.id is in the store's list
  return wishStore.isWished(product.value.id)
})

const addRemoveToWishList = async () => {
  const isWished = await wishStore.toggleItem(product.value.id)
}

const isNotFound = ref(false)
const selectedProductItem = ref()
const selectedProductItems = ref([])
const error = ref('')
const productCarousel = ref()
const currentVideoId = ref()
const showVideoDialog = ref(false)
const selectedVariant = ref()
const loading = ref(false)
const productSlider = ref()
const showSeenCheaperForm = ref(false)

const { formatCurrency, selectedCountryData } = useCurrencyConverter()
const iso = computed(() => { return selectedCountryData.value.iso?.toLowerCase() })

const onShowVideo = videoId => {
  console.log("showVideo: " + videoId)
  currentVideoId.value = videoId
  showVideoDialog.value = true
}

const { handleImageError } = useHandleImageError()

const showSizeChart = ref(false)
const selectedSizeChart = ref()


const onSelectedVariant = pit =>
{
  console.log("onSelectedVariant " + JSON.stringify(pit))
  selectedVariant.value = pit
  error.value = null

  if(!(pit.quantityInStock > 0))
    error.value = "Product sin stock"
}

const isAvailable = computed(() =>{
  return selectedVariant.value?.quantityInStock > 0
})



const onShowSizeChart = sizeChart => {
  selectedSizeChart.value = sizeChart
  showSizeChart.value = true
}

const price = computed(() => {

  if(selectedProductItem.value) {
    return selectedProductItem.value.price.price
  }


  if(product.value.productItems && product.value.productItems.length > 0){
    return product.value.productItems[0].price.price
  }

  return product.value.minPrice
})


// ── Slider ────────────────────────────────────────────────
const activeSlide = ref(0)

const productImages = computed( () => {
  if(!product.value)
    return []

  let imgs = []


  product.value.images.map( img => { return  { type: "image", ...img } }).forEach(i => imgs.push(i))
  if(product.value.videos){
    product.value.videos.forEach(video =>{ imgs.push({
      type: "video",
      videoId: video.url,
      urlThumb: getYouTubeThumbnail(video.url),
      url: getYouTubeThumbnail(video.url, "sddefault"),
    }) })
  }

  return imgs
})

const onSelectedColor = color => {

  console.log("onSelectedColor", color)

  if(productCarousel.value) {
    productCarousel.value.selectSlideByProductColor(color)
  }

  let idx = 0
  for(var img of productImages.value){
    if(img.type === "image" && img.colorId === color.id){
      activeSlide.value = idx
      break
    }
    idx++
  }
}


/*watch(activeSlide, (newVal, oldVal) => {


  if(productImages.value?.length > newVal){
    if(productImages.value[newVal].type === 'video') {
      console.log("activeSlideChange" + newVal)
      onShowVideo(productImages.value[newVal].videoId)
    }
  }

})*/

const features = computed( () => {
  const ftrs = []
  const  p = product.value

  ftrs.push({ label: "Identificador", value: p.id })
  ftrs.push({ label: "Marca", value: p.brand.name })
  ftrs.push({ label: "Modelo", value: p.model?.name || '' })

  if(p.motorbikeVersion && p.motorbikeVersion.length > 0){
    let val = ""
    p.motorbikeVersion.forEach( v => { val = val + " " + v.name })

    ftrs.push({ label: "Modelo Motos", value: val })
  }

  var attrs = (p.tags ? p.tags.filter(t => t.type === "attribute" ) : [])
  for(var attr of attrs){
    ftrs.push({ label: attr.categoryName, value: attr.name })
  }


  return ftrs
})

// ── Reviews ───────────────────────────────────────────────
const ratingBars = [
  { stars: 5, pct: 74 },
  { stars: 4, pct: 18 },
  { stars: 3, pct: 5 },
  { stars: 2, pct: 2 },
  { stars: 1, pct: 1 },
]

const reviews = [
  {
    name: 'Carlos M.', date: '12 abr 2025', rating: 5,
    text: 'Increíble casco. Lo uso diario y en pista. El peso es notablemente menor a mi anterior AGV, y la ventilación es superior en todo. El visor es de primera calidad, sin distorsión.',
  },
  {
    name: 'Valentina R.', date: '3 mar 2025', rating: 5,
    text: 'Superó mis expectativas. Pedí la talla S según la guía de Motomundi y me quedó perfecta. El acabado de la fibra de carbono es espectacular.',
  },
  {
    name: 'Rodrigo F.', date: '18 ene 2025', rating: 4,
    text: 'Excelente casco, muy ligero y ventilado. Le saco una estrella porque la almohadilla de la mejilla izquierda me costó ajustar. En general estoy muy contento.',
  },
]




// ── Cart ──────────────────────────────────────────────────
const qty = ref(1)
const cartAdded = ref(false)


// ── Countdown timer ───────────────────────────────────────
let seconds = 2 * 3600 + 14 * 60 + 38
const countdown = ref('02:14:38')

onMounted(() => {
  if(!product.value){
    isNotFound.value = true
  }

  const interval = setInterval(() => {
    if (seconds <= 0) { clearInterval(interval)

      return }
    seconds--

    const h = String(Math.floor(seconds / 3600)).padStart(2, '0')
    const m = String(Math.floor((seconds % 3600) / 60)).padStart(2, '0')
    const s = String(seconds % 60).padStart(2, '0')

    countdown.value = `${h}:${m}:${s}`
  }, 1000)
})

// ── Trust items ───────────────────────────────────────────
const trustItems = [
  { icon: 'tabler-lock',         label: 'Pago 100% seguro',    sub: 'SSL cifrado' },
  { icon: 'tabler-arrow-back',   label: '30 días devolución',  sub: 'Sin preguntas' },
  { icon: 'tabler-tool',         label: 'Garantía 6 años',     sub: 'Shoei + Motomundi' },
  { icon: 'tabler-package',      label: 'Embalaje original',   sub: 'Caja Shoei sellada' },
]

const cartStore = useCartStore()

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


const prodUtil = useProductsUtils()


const addToCartMobile = async item => {

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

const addToCart = itemsToAdd => {


  if (product.value.type === ProductType.Simple) {
    let productItemId = null

    if (selectedProductItem.value) {
      productItemId = selectedProductItem.value.id
    }

    if (!productItemId && !prodUtil.requiresFeatureSelect(product.value)) {
      productItemId = product.value.productItems[0].id
    }

    if (!productItemId) {
      error.value = ("Debe seleccionar variantes")

      return

    }

    doAddToCart( {
      productItemId: productItemId,
      quantity: 1,
    })
  } else {

    const pits = selectedProductItems.value.filter(f => f.productItemId > 0).map(s => s.productItemId)
    if (pits.length !== props.product.composite.length) {
      alert(`Debe seleccionar variantes ${pits.length} vs ${props.product.composite.length}`)

      return
    }

    doAddToCart({ "quantity": 1, "productItemId": pit })
  }
}

async function doAddToCart(item) {

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
        quantity: item.quantity || 1,
        productItemId: item.productItemId || 0,
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


/*
onMounted(() => {
  if(product.value) {
    var colorFeature = product.value.features.find(f => f.type === 1)
    if (colorFeature) {
      selectedColor.value = colorFeature
    }
  }
})
*/
</script>

<template>
  <VDialog v-model="showSizeChart">
    <DialogCloseBtn @click="showSizeChart = false" />
    <VCard :title="selectedSizeChart.name">
      <VCardText>
        <VImg :src="getBaseCDN() + selectedSizeChart.image" />
      </VCardText>
    </VCard>
  </VDialog>

  <!-- ============= SHOW VIDEO DIALOG ======================= -->
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

  <!-- error -->
  <div
    v-if="pending"
    class="container"
    style="padding: 60px 20px;"
  >
    <VSkeletonLoader type="image, article" />
  </div>
  <div
    v-else-if="!product"
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
      El producto que buscas no existe o ya no está disponible. pid: {{ product?.id }}
    </p>
    <VBtn
      color="primary"
      style="margin-top: 20px;"
      @click="router.push('/')"
    >
      Volver al inicio
    </VBtn>
  </div>
  <!-- /error -->

  <div v-if="isMobile">
    <article style="min-height: 600px">
      <div
        v-if="product"
        class="container product mobile"
      >
        <section class="row product-main ml-sm-0  ml-md-2">
          <div
            class="col s12 m7 l7"
            style="padding-right: 20px;"
          >
            <div class="s12">
              <div>
                <Breadcrumbs
                  v-if="product"
                  :product="product"
                />


                <!-- product-title -->
                <div class="product-title ">
                  <div class="product-title__container">
                    <h1>
                      {{ product.brand.name }}
                      <strong>{{ product.name }}</strong>
                      <div
                        v-if="product.totalReviews > 0"
                        class="title-rating"
                      >
                        <div class="title-rating__stars">
                          <VRating
                            size="x-small"
                            density="compact"
                            color="primary"
                            style="margin:0; padding:0; top: -4px;left: -2px;position: relative;"
                            half-increments
                            :model-value="product.rating / 2"
                            readonly
                          />
                        </div>
                        <span class="title-rating__divider">·</span>
                        <a

                          class="title-rating__link"
                          href="#product-reviews"
                          @click.prevent="goToReviews"
                        >
                          Leer {{ product.totalReviews }} evaluaciones
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
              @add-to-cart="addToCartMobile"
            />
          </div>
        </section>

        <VContainer>
          <div class="row pack-header">
            <div class="col s12">
              <h2>Packs ahorro</h2>
            </div>
          </div>
          <Packs :product="product" />
        </VContainer>
        <ProductComplements :product-id="product?.id" />

        <!-- product-description-container -->
        <VRow class=" product-description-container mt-10">
          <VCol
            cols="12"
            md="7"
          >
            <ProductDescription :description="product?.description" />
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
            <DataSheet :product="product" />
          </VCol>
          <!-- /ficha-tecnica -->
        </VRow>
        <!-- /product-description-container -->


        <!-- recommend -->
        <Recommend :product="product" />

        <div id="product-reviews">
          <ProductRating
            v-if="product && product.id"
            :key="product.id"
            :product="product"
          />
        </div>
      </div>
    </article>
  </div>
  <div v-else>
    <!-- ── BREADCRUMB ─────────────────────────────────────────── -->
    <div class="ml-2 pt-2">
      <Breadcrumbs :product="product" />
    </div>

    <!-- ── MAIN GRID ───────────────────────────────────────── -->
    <VContainer
      v-if="product"
      fluid
      class="pdp-container"
    >
      <VRow :gutter="0">
        <!-- ══ LEFT COLUMN ══════════════════════════════════ -->
        <VCol
          cols="12"
          md="7"
          lg="7"
          class="col-left"
        >
          <div class="slider-section">
            <div class="slider-badges">
              <VChip
                v-if="product.discountPercent > 0"
                color="error"
                size="small"
                label
                class="font-weight-bold"
              >
                –{{ product.discountPercent }}% OFF
              </VChip>
              <VChip
                v-if="product.isNew"
                color="black"
                size="small"
                label
                class="font-weight-bold text-white"
              >
                Nuevo
              </VChip>
            </div>

            <VCarousel
              ref="productSlider"
              v-model="activeSlide"
              :height="isMobile ? 340 : 720"
              hide-delimiter-background
              show-arrows="hover"
              delimiter-icon="tabler-minus"
              class="product-carousel rounded-lg"
            >
              <VCarouselItem
                v-for="(img, i) in productImages"
                :key="i"
                class="carousel-item-inner"
              >
                <div
                  class="slide-placeholder"
                  :class="{ 'slide-video' : img.type === 'video'}"
                >
                  <VImg
                    v-if="img.type === 'image'"
                    style="width:100%;"
                    :alt="product.brand.name + product.name"
                    :src="getImageUrl(img.image, 800, getDomainId())"
                    @error="handleImageError(img.image)"
                  />

                  <div
                    v-if="img.type === 'video'"
                    class="video-container"
                    style="width:100%;"
                  >
                    <iframe
                      :src="`https://www.youtube.com/embed/${img.videoId}`"
                      title="YouTube video player"
                      frameborder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      referrerpolicy="strict-origin-when-cross-origin"
                      allowfullscreen
                    />
                  </div>
                </div>
              </VCarouselItem>

              <template #prev="{ props }">
                <VBtn
                  icon
                  variant="elevated"
                  size="small"
                  class="slider-arrow"
                  v-bind="props"
                >
                  <VIcon icon="tabler-chevron-left" />
                </VBtn>
              </template>
              <template #next="{ props }">
                <VBtn
                  icon
                  variant="elevated"
                  size="small"
                  class="slider-arrow"
                  v-bind="props"
                >
                  <VIcon icon="tabler-chevron-right" />
                </VBtn>
              </template>
            </VCarousel>

            <!-- Thumbnails -->
            <div class="thumb-row mt-3">
              <div
                v-for="(img, i) in productImages"
                :key="i"
                class="thumb-item"
                :class="{ 'thumb-active': activeSlide === i, 'thumb-video' : img.type === 'video' }"
                @click="activeSlide = i"
              >
                <VImg
                  v-if="img.type === 'image'"
                  style="width:100%;"
                  :alt="product.brand.name + product.name"
                  :src="getImageUrl(img.image, 150, getDomainId())"
                  @error="handleImageError(img.image)"
                />
                <div v-if="img.type === 'video'" class="video-thumbnail-container">
                  <img
                    class="video-bg"
                    :alt="product.brand.name + ' ' + product.name"
                    :src="img.url"
                  >

                  <div class="icon-overlay" >

                    <VIcon
                      icon="tabler-brand-youtube-filled"
                      color="#FF0000"
                      size="20"
                    />

                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="content-section">
            <h2 class="section-title">
              Packs Ahorro
            </h2>
            <VDivider class="section-divider mb-5" />
            <Packs :product="product" />
          </div>
          <!-- DESCRIPTION -->
          <div class="content-section">
            <h2 class="section-title">
              Descripción del producto
            </h2>
            <VDivider class="section-divider mb-5" />
            <div class="description-body">
              <ProductDescription :description="product?.description" />
            </div>
          </div>

          <!-- FEATURES TABLE -->
          <div class="content-section">
            <h2 class="section-title">
              Especificaciones técnicas
            </h2>
            <VDivider class="section-divider mb-4" />

            <VTable
              density="compact"
              class="features-table rounded-lg"
            >
              <tbody>
                <tr
                  v-for="(feat, i) in features"
                  :key="i"
                >
                  <td class="feat-label">
                    {{ feat.label }}
                  </td>
                  <td class="feat-value">
                    {{ feat.value }}
                  </td>
                </tr>
              </tbody>
            </VTable>
          </div>

          <div
            v-if="product?.relatedBlogArticle"
            class="content-section"
          >
            <h2 class="section-title">
              Lee la review en nuestro blog
            </h2>
            <VDivider class="section-divider mb-5" />
            <RelatedBlog
              v-if="product?.relatedBlogArticle"
              :article="product.relatedBlogArticle"
            />
          </div>


          <!-- REVIEWS -->
          <div
            v-if="product"
            id="aaresenas"
            class="content-section d-none"
          >
            <h2 class="section-title">
              Opiniones de clientes
            </h2>
            <VDivider class="section-divider mb-5" />

            <!-- Rating summary -->
            <VRow
              align="center"
              class="mb-6"
              no-gutters
            >
              <VCol
                cols="auto"
                class="mr-6"
              >
                <div class="big-score">
                  {{ product?.rating / 2 }}
                </div>
                <div class="text-medium-emphasis text-caption font-weight-medium mt-1">
                  {{ product.totalReviews }} reseñas
                </div>
              </VCol>
              <VCol>
                <VRating
                  density="compact"
                  color="primary"
                  style="margin:0; padding:0; top: -3px;left: -2px;position: relative;"
                  half-increments
                  :model-value="product.rating / 2"
                  readonly
                />
              </VCol>
            </VRow>

            <!-- Review cards -->
            <div class="review-list d-none">
              <ProductRating :product="product" />
              <VCard
                v-for="(review, i) in reviews"
                :key="i"
                variant="tonal"
                color="grey-lighten-4"
                class="review-card mb-4 d-none"
                rounded="lg"
              >
                <VCardText class="pa-4">
                  <div class="d-flex justify-space-between align-start mb-1">
                    <span class="font-weight-semibold text-body-2">{{ review.name }}</span>
                    <span class="text-caption text-medium-emphasis">{{ review.date }}</span>
                  </div>
                  <VRating
                    :model-value="review.rating"
                    readonly
                    density="compact"
                    size="14"
                    active-color="amber-darken-1"
                    color="amber-darken-1"
                    class="mb-2"
                  />
                  <p class="text-body-2 text-medium-emphasis">
                    {{ review.text }}
                  </p>
                  <div class="d-flex align-center mt-2 gap-1">
                    <VIcon
                      icon="tabler-circle-check-filled"
                      size="14"
                      color="success"
                    />
                    <span class="text-caption text-success font-weight-semibold">Compra verificada</span>
                  </div>
                </VCardText>
              </VCard>
            </div>
          </div>
        </VCol>

        <!-- ══ RIGHT COLUMN (sticky) ════════════════════════ -->
        <VCol
          cols="12"
          md="5"
          lg="5"
        >
          <div class="sticky-col">
            <VCard
              elevation="3"
              rounded="lg"
              class="product-purchase-card"
            >
              <VCardText class="pa-6">
                <!-- Brand & Title -->
                <div class="brand-label mb-1">
                  {{ product.brand.name }} · Cascos Integrales
                </div>
                <h1 class="product-title mb-1">
                  {{ product.name }}
                </h1>
                <div class="sku-label mb-4">
                  SKU: {{ product.id }} · Ref. {{ product.id }}
                </div>

                <!-- Rating row -->
                <div class="d-flex align-center gap-2 mb-5  border-bottom">
                  <VRating
                    :model-value="product.rating / 2"
                    readonly
                    half-increments
                    style="margin:0; padding:0; top: -10px;left: -2px;position: relative;"
                    density="compact"
                    size=""
                    color="primary"
                  />
                  <span class="font-weight-bold text-body-2">{{ product.rating / 2 }}</span>
                  <a
                    href="#resenas"
                    class="text-caption text-error text-decoration-none"
                  >{{ product.totalReviews }} opiniones</a>
                  <VSpacer />
                  <a
                    href="#"
                    class="text-caption text-error text-decoration-none font-weight-semibold"
                  >
                    <VIcon
                      icon="tabler-message-circle-question"
                      size="14"
                      class="mr-1"
                    />
                    Preguntar
                  </a>
                </div>

                <!-- Price block -->
                <div class="price-block mb-5">
                  <div
                    v-if="product.hasDiscount"
                    class="d-flex align-center gap-2 mb-1"
                  >
                    <span class="price-original">{{ formatMoney(product.minPrice) }}</span>
                    <VChip
                      color="error"
                      size="x-small"
                      label
                      class="font-weight-bold"
                    >
                      –{{ product.discountPercent }}%
                    </VChip>
                  </div>
                  <div class="price-current">
                    {{ formatCurrency(price) }}
                    <span class="currency-flag">
                      <img :src="`/content/images/flags/${iso}.png`">
                    </span>
                    <button
                      class="seen-cheaper-button"
                      @click="showSeenCheaperForm = true"
                    >
                      ¿Lo has visto más barato?
                    </button>
                  </div>
                  <div class="price-sub mt-1">
                    IVA incluido · 12 cuotas sin interés desde <strong>{{ formatCurrency(price / 12) }}</strong>
                  </div>
                </div>
                <ClientOnly>
                  <SeenCheaperForm
                    v-model="showSeenCheaperForm"
                    :product="product"
                  />
                </ClientOnly>

                <!-- Promo banners -->

                <div class="promo-stack mb-5 d-none">
                  <div class="promo-item promo-red">
                    <VIcon
                      icon="tabler-bolt"
                      size="18"
                    />
                    <div>
                      <strong>Oferta Relámpago</strong> — Termina en
                      <strong>{{ countdown }}</strong>. ¡Solo 3 unidades!
                    </div>
                  </div>
                  <div class="promo-item promo-gold">
                    <VIcon
                      icon="tabler-credit-card"
                      size="18"
                    />
                    <div>
                      <strong>Hasta 36 cuotas sin interés</strong> con BancoEstado y Falabella
                    </div>
                  </div>
                  <div class="promo-item promo-green">
                    <VIcon
                      icon="tabler-gift"
                      size="18"
                    />
                    <div>
                      <strong>Gratis:</strong> kit limpieza de viseras (valor $12.990)
                    </div>
                  </div>
                  <div class="promo-item promo-dark">
                    <VIcon
                      icon="tabler-trophy"
                      size="18"
                    />
                    <div>
                      <strong>Club Mundi:</strong> Acumula <strong>4.000 puntos</strong>
                    </div>
                  </div>
                </div>

                <!-- Color selector -->
                <ProductVariantSelector
                  v-model="selectedProductItem"
                  :product="product"
                  @show-size-chart="onShowSizeChart"
                  @selected-variant="onSelectedVariant"
                  @update:color="onSelectedColor"
                />


                <!-- Delivery estimate -->
                <div class="delivery-row mb-4 d-none">
                  <VIcon
                    icon="tabler-truck-delivery"
                    size="20"
                  />
                  <div class="text-body-2">
                    <strong>Express:</strong> Martes 29 abr ·
                    <strong>Estándar:</strong> Miércoles 30 abr
                    <div class="text-caption text-medium-emphasis">
                      Envío gratis en este producto
                    </div>
                  </div>
                </div>

                <div>
                  <VAlert
                    v-if="error"
                    color="warning"
                    class="mb-2 pa-1"
                  >
                    <VIcon class="tabler-alert-circle" />
                    {{ error }}
                  </VAlert>

                  <VAlert
                    v-if="!isInStock"
                    color="warning"
                    class="mb-4"
                  >
                    <VIcon class="tabler-alert-circle" />

                    Actualmente no tenemos unidades disponibles de este artículo. Suscríbete a nuestra alerta de reposición y
                    serás el primero en recibir un correo en cuanto entre de nuevo en el almacén.
                  </VAlert>
                </div>

                <!-- Availability -->
                <div class="mb-2">
                  <StorePickup
                    v-if="selectedVariant || product.isSimpleProduct"
                    :product-item-id="selectedVariant?.id || product.productItems[0].id"
                  />
                </div>



                <!-- Qty + Add to cart -->
                <div class="d-flex gap-2 mb-3">
                  <div class="qty-control">
                    <VBtn
                      icon
                      size="small"
                      variant="text"
                      @click="qty = Math.max(1, qty - 1)"
                    >
                      <VIcon
                        icon="tabler-minus"
                        size="16"
                      />
                    </VBtn>
                    <span class="qty-value">{{ qty }}</span>
                    <VBtn
                      icon
                      size="small"
                      variant="text"
                      @click="qty = Math.min(10, qty + 1)"
                    >
                      <VIcon
                        icon="tabler-plus"
                        size="16"
                      />
                    </VBtn>
                  </div>



                  <VBtn

                    color="primary"
                    size="large"
                    class="add-to-cart-btn flex-grow-1"
                    :class="{ 'cart-success': cartAdded }"
                    :disabled="!isAvailable"
                    @click="addToCart"
                  >
                    <VIcon
                      :icon="cartAdded ? 'tabler-check' : 'tabler-shopping-cart'"
                      size="18"
                      class="mr-2"
                    />
                    {{ cartAdded ? '¡Agregado!' : 'Agregar al carrito' }}
                  </VBtn>
                </div>

                <VBtn
                  block
                  color="black"
                  size="large"
                  class="mb-3 d-none"
                >
                  <VIcon
                    icon="tabler-bolt"
                    size="16"
                    class="mr-2"
                  />
                  Comprar ahora
                </VBtn>



                <!-- Secondary actions -->
                <div class="d-flex gap-2 mb-5">
                  <VBtn
                    :variant="localIsWished ? 'flat' : 'outlined'"
                    size="small"
                    :color="localIsWished ? 'primary' : 'grey-darken-2'"
                    class="flex-1"
                    @click="addRemoveToWishList"
                  >
                    <VIcon
                      :icon="localIsWished ? 'tabler-heart-filled' : 'tabler-heart'"
                      size="15"
                      class="mr-1"
                    />
                    Favoritos
                  </VBtn>
                  <VBtn
                    variant="outlined"
                    size="small"
                    color="grey-darken-2"
                    class="flex-1"
                  >
                    <VIcon
                      icon="tabler-share-2"
                      size="15"
                      class="mr-1"
                    />
                    Compartir
                  </VBtn>
                  <VBtn
                    variant="outlined"
                    size="small"
                    color="grey-darken-2"
                    class="flex-1"
                  >
                    <VIcon
                      icon="tabler-scale"
                      size="15"
                      class="mr-1"
                    />
                    Comparar
                  </VBtn>
                </div>

                <VDivider class="mb-4" />

                <!-- Trust bar -->
                <div class="trust-grid">
                  <div
                    v-for="trust in trustItems"
                    :key="trust.label"
                    class="trust-item"
                  >
                    <VIcon
                      :icon="trust.icon"
                      size="20"
                      color="error"
                      class="trust-icon"
                    />
                    <div>
                      <div class="trust-title">
                        {{ trust.label }}
                      </div>
                      <div class="trust-sub">
                        {{ trust.sub }}
                      </div>
                    </div>
                  </div>
                </div>

                <PreProductBanner />
              </VCardText>
            </VCard>
          </div>
        </VCol>
      </VRow>
      <!-- === Recommend ================================== -->
      <VRow>
        <VCol cols="12">
          <Recommend :product="product" />
        </VCol>
      </VRow>
      <VRow>
        <VCol
          id="resenas"
          cols="12"
        >
          <ProductRating :product="product" />
        </VCol>
      </VRow>
    </VContainer>
  </div>
</template>


<style scoped>
/********************** mobile ***********************/

.product.mobile .product-title .product-title__container {
  align-items: center;
  display: flex;
  justify-content: space-between;
}


.product.mobile .product-title  .product-title__container  h1 {
  font-size: 24px;
  margin-block-end: .83em;
  margin-block-start: .83em;
}
.title-rating__link {
  border-bottom: 1px solid transparent;
  font-size: .82rem;
  min-height: unset;
  position: relative;
  text-decoration: none;
  text-transform: none;
  top: -6px;
  transition: border-color .15s;
}

.title-rating__divider {
  color: #b21915;
  font-size: .9rem;
  position: relative;
  top: -7px;
}
.title-rating, .title-rating__stars {
  align-items: center;
  display: flex;
  gap: 4px;
}

/********************** /mobile ***********************/

/* ── Layout ──────────────────────────────────────── */
.pdp-container {
  width: 100%;

}

.col-left {
  display: flex;
  flex-direction: column;
  gap: 48px;
}

.sticky-col {
  position: sticky;
  top: 10px;
}

/* ── Breadcrumb ──────────────────────────────────── */
.breadcrumb-bar {
  /*
  background: #f6f6f6;
  border-bottom: 1px solid #e0e0e0;
  */
  padding: 4px 10px 0;
}

/* ── Slider ──────────────────────────────────────── */
.slider-section { position: relative; }

.slider-badges {
  position: absolute;
  top: 14px; left: 14px;
  z-index: 2;
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.product-carousel {
  border: 1px solid #e0e0e0;
  background: #f6f6f6;
}

.carousel-item-inner { background: #f6f6f6; }

.slide-placeholder {
  width: 100%; height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  /*background: linear-gradient(135deg, #f0f0f0, #e4e4e4);*/
  background-color: white;
}

.slide-placeholder.slide-video {
  background-color: #000;
}

.slider-arrow {
  background: rgba(38,38,38,.92) !important;
  color: #000;
}

.thumb-row {
  display: flex;
  gap: 10px;
  overflow-x: auto;
}

.thumb-item {
  flex: 0 0 70px; height: 70px;
  border-radius: 8px;
  border: 2px solid #e0e0e0;
  display: flex; align-items: center; justify-content: center;
  cursor: pointer;
  background: #f6f6f6;
  transition: border-color .2s, box-shadow .2s;
}

.thumb-item.thumb-video {
  background: #000;
}


.thumb-item:hover { border-color: #B21A15; }
.thumb-active { border-color: #B21A15 !important; box-shadow: 0 0 0 2px #B21A15; }

/* ── Content sections ────────────────────────────── */
.content-section { display: flex; flex-direction: column; }

.section-title {
  font-family: 'Barlow Condensed', 'Arial Narrow', sans-serif;
  font-size: 20px;
  font-weight: 700;
  letter-spacing: .04em;
  text-transform: uppercase;
  color: #111;
  margin-bottom: 0;
}

.section-divider {
  border-color: #B21A15 !important;
  border-width: 2px !important;
  opacity: 1;
}

.description-body {
  color: #444;
  font-size: 15px;
  line-height: 1.75;
}

/* ── Features table ──────────────────────────────── */
.features-table {
  border: 1px solid #e0e0e0;
}
:deep(.features-table table) { width: 100%; }
:deep(.features-table tbody tr:nth-child(even) .feat-label) { background: #fafafa; }
:deep(.features-table tbody tr) { border-bottom: 1px solid #e0e0e0; }

.feat-label {
  /*font-family: 'Barlow Condensed', sans-serif;*/
  font-size: 12px;
  font-weight: 700;
  letter-spacing: .06em;
  text-transform: uppercase;
  color: #777;
  width: 38%;
  padding: 10px 14px !important;
  background: #fafafa;
}

.feat-value {
  font-size: 14px;
  font-weight: 500;
  color: #333;
  padding: 10px 14px !important;
}

/* ── Reviews ─────────────────────────────────────── */
.big-score {
  /*font-family: 'Barlow Condensed', sans-serif;*/
  font-size: 60px;
  font-weight: 800;
  line-height: 1;
  color: #111;
}

.bar-row {
  display: flex;
  align-items: center;
  margin-bottom: 4px;
  font-size: 12px;
  color: #888;
}

.bar-label { width: 28px; }
.bar-pct   { width: 32px; text-align: right; }

.review-card { border: 1px solid #e8e8e8 !important; }

/* ── Right column: product card ─────────────────── */
.product-purchase-card { overflow: visible; }

.brand-label {
 /* font-family: 'Barlow Condensed', sans-serif;*/
  font-size: 12px;
  font-weight: 700;
  letter-spacing: .1em;
  text-transform: uppercase;
  color: #B21A15;
}

.product-title {
 /* font-family: 'Barlow Condensed', sans-serif;*/
  font-size: 28px;
  font-weight: 800;
  line-height: 1.15;
  letter-spacing: -.01em;
  color: #111;
}

.sku-label {
  /*font-family: 'Barlow Condensed', sans-serif;*/
  font-size: 11px;
  letter-spacing: .06em;
  color: #aaa;
}

.border-bottom { border-bottom: 1px solid #e0e0e0; }

/* ── Price block ─────────────────────────────────── */
.price-block {
  background: linear-gradient(135deg, #1a1a1a, #2d2d2d);
  border-radius: 8px;
  padding: 16px 20px;
  position: relative;
  overflow: hidden;
}

.price-block::before {
  content: '';
  position: absolute; top: 0; left: 0; right: 0;
  height: 3px;
  background: #B21A15;
}

.price-original {
  font-family: 'Barlow Condensed', sans-serif;
  font-size: 15px;
  color: #888;
  text-decoration: line-through;
}

.price-current {
  font-family: 'Barlow Condensed', sans-serif;
  font-size: 38px;
  font-weight: 800;
  color: #fff;
  line-height: 1;
}

.price-sub {
  font-size: 12px;
  color: #999;
  font-style: italic;
}

/* ── Promo banners ───────────────────────────────── */
.promo-stack { display: flex; flex-direction: column; gap: 8px; }

.promo-item {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  padding: 9px 12px;
  border-radius: 6px;
  border-left: 3px solid;
  font-size: 13px;
  font-weight: 500;
}

.promo-red   { background: #fff0f0; border-color: #B21A15; color: #8e1410; }
.promo-gold  { background: #fffbf0; border-color: #f59e0b; color: #8a6000; }
.promo-green { background: #f0fff5; border-color: #1a8a40; color: #1a8a40; }
.promo-dark  { background: #f6f6f6; border-color: #555;    color: #444; }




@keyframes pulse {
  0%, 100% { box-shadow: 0 0 0 2px rgba(26,138,64,.2); }
  50%       { box-shadow: 0 0 0 5px rgba(26,138,64,.06); }
}

/* ── Delivery row ────────────────────────────────── */
.delivery-row {
  display: flex;
  gap: 10px;
  align-items: flex-start;
  padding: 10px 14px;
  background: #f6f6f6;
  border-radius: 6px;
  font-size: 13px;
  color: #444;
}

/* ── Qty control ─────────────────────────────────── */
.qty-control {
  display: flex;
  align-items: center;
  border: 2px solid #e0e0e0;
  border-radius: 6px;
  overflow: hidden;
  flex-shrink: 0;
}

.qty-value {
  font-family: 'Barlow Condensed', sans-serif;
  font-size: 16px;
  font-weight: 700;
  padding: 0 10px;
  min-width: 36px;
  text-align: center;
}

/* ── Add to cart ─────────────────────────────────── */
.add-to-cart-btn {
  transition: background .3s !important;
  @media(max-width: 900px){
    font-size:11px;
  }
}
.cart-success { background: #1a8a40 !important; }

/* ── Secondary actions ───────────────────────────── */
.flex-1 { flex: 1; }

/* ── Trust grid ──────────────────────────────────── */
.trust-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
}

.trust-item {
  display: flex;
  align-items: flex-start;
  gap: 8px;
}

.trust-icon { flex-shrink: 0; margin-top: 1px; }

.trust-title {
  font-size: 12px;
  font-weight: 700;
  color: #111;
  line-height: 1.3;
}

.trust-sub {
  font-size: 11px;
  color: #888;
}

.currency-flag {
  position: relative;
  top: -20px;
  left: 0px;
  padding: 0;
  margin: 0;
}

.seen-cheaper-button {
  @media(min-width: 900px) {
    font-size: 12px;
  }
}

.text-body-2{
  line-height: 0;
}



.video-thumbnail-container {
  position: relative; /* Reference point for the icon */
  display: inline-block;
  width: 100%;
  line-height: 0; /* Removes extra whitespace under the image */
}

.video-bg {
  width: 100%;
  height: auto;
  display: block;
}

.icon-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;

  /* Flexbox centering */
  display: flex;
  align-items: center;
  justify-content: center;

  /* Optional: slightly darken the image to make the icon pop */
  background-color: rgba(0, 0, 0, 0.1);
  pointer-events: none; /* Allows clicks to pass through to the image if needed */
}
</style>
