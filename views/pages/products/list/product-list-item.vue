<script setup lang="ts">
import emptyImage from "@images/empty-image.avif"
import AddToFavsBtn from "@/components/AddToFavsBtn.vue"
import {useCurrencyConverter} from "@/composables/useCurrencyConverter";
import {computed} from "vue";
import { useBlackFridayCountdown } from "@/composables/useBlackFridayCountdown";

const { formatCurrency, selectedCountryData } = useCurrencyConverter()
const iso = computed (() => selectedCountryData.value?.iso?.toLowerCase() )
const props = defineProps(
  {
    product: {
      type: Object,
      required: true,
    },
    showButton: {
      type: Boolean,
      required: false,
      default: () => false,
    },
    showMiniatures: {
      type: Boolean,
      default: () => true,
    },
  },
)

//const isWished = ref(props.product.isWished)
const localIsWished = ref(props.product?.isWished ?? false)

// Shared Black Friday countdown (one timer for all cards). Ticks only in the browser;
// SSR renders "--" placeholders so server and client markup match.
// isBlackFriday is configured in utils/blackFridayConfig.ts
const { isBlackFriday, isExpired: bfExpired, hmsUnits: bfVisibleUnits } = useBlackFridayCountdown()
const showBfClock = computed(() => isBlackFriday && !bfExpired.value)

const wishListStore = useWishlistStore()
if(wishListStore.isWished(props.product.id)) {
  console.log(`product: ${props.product.id} is wished`)
  localIsWished.value = true;
}

watch(() => props.product.isWished, (newVal) => {
  localIsWished.value = newVal ?? false
})

const onClickMiniture = img => {
  props.product.image = img.image
}

const imageError = ref(false)

const handleImageError = (imageId, origin, product) => {

  console.log(`handleImageError: ${imageId}, origin: ${origin}, product: ${product?.name}`)

  $fetch("/api/images/sizes", {
    method: "POST",
    headers: {
      'Content-Type': 'application/json',
    },
    body: {
      imageId: imageId
    }
  })

}

watch(() => props.product.image, () => {
  imageError.value = false
})

const miniatures = computed(() => {
  if (!props.product?.images) return []

  // Create a Map where colorId is the key
  // This ensures only one image per colorId exists
  const uniqueImagesMap = new Map()

  props.product.images
    .filter(img => img.colorId > 0)
    .forEach(img => {
      // If you want the FIRST image found for that color, use:
      if (!uniqueImagesMap.has(img.colorId)) {
        uniqueImagesMap.set(img.colorId, img)
      }
    })

  const uniqueImages = Array.from(uniqueImagesMap.values())
  if (!uniqueImages || uniqueImages.length <= 1) {
    return []
  }


  return uniqueImages
})

// Show at most 4 color miniatures; the rest are summarised in a "+N" tile
const MAX_MINIATURES = 4
const visibleMiniatures = computed(() => miniatures.value.slice(0, MAX_MINIATURES))
const hiddenMiniaturesCount = computed(() => Math.max(0, miniatures.value.length - MAX_MINIATURES))

const getAvlSizes = (p) => {

  return p.sizes;

}

const onToggleWishlist = async (val: boolean) => {

  console.log("product-list-item::onToggleWishlist", val)
  localIsWished.value = val

  try {
    await useWishlistStore().toggleItem(props.product.id)
  }catch(err){
    console.error("Failed to update wishlist", err)
  }
}

const formatName = name => {
  if(!name)
    return ""

  if(name.length > 35)
    return name.substring(0, 32) + "..."
  return name.substring(0, 35)
}
</script>


<template>
  <article class="item">
    <section>
      <AddToFavsBtn :is-wished="localIsWished" @toggle-wishlist="onToggleWishlist" />

      <NuxtLink
        :prefetch="false"
        class="mtc-link product-link"
        :to="product.url"
      >
        <div class="product-tags">
          <span
            v-if="product.discountPercent > 0 && isBlackFriday"
            class="tag product-tag product-tag--old custom-tag custom-tag-icon product-tag--black-friday"
          >
            <span class="discount">Black Friday -{{ Math.round(product.discountPercent) }}%</span>
          </span>
          <span
            v-else-if="product.discountPercent > 0"
            class="tag product-tag product-tag--old product-tag--sales"
          >
            <span class="discount">Oferta -{{ Math.round(product.discountPercent) }}%</span>
          </span>

          <span
            v-if="product.isNew"
            class="tag product-tag product-tag--old product-tag--new"
          >
            <span class="discount">Novedad</span>
          </span>
        </div>
        <div class="special-tag" />

        <!-- product-image -->
        <span class="product-image">

          <VImg
            v-if="!imageError"
            max-width="232"
            :src="getImageUrl( product.image, 300, getDomainId())"
            :alt="product.name"
            class="cdn-img mb-1 mx-auto"
            @error="handleImageError(product.image, 'product-image', product)"
          >
            <template #error>
              <VImg
                :src="emptyImage"
                :aspect-ratio="1"
                class="mx-auto rounded"
              />
            </template>
          </VImg>
          <VImg
            v-else
            :src="emptyImage"
            :aspect-ratio="1"
            class="mx-auto rounded"
            max-width="232"
          />
        </span>
        <!-- /product-image -->
      </NuxtLink>

      <!-- miniatures -->
      <section v-if="showMiniatures">
        <div class="prod-list-miniatures">

          <div
            v-for="img in visibleMiniatures"
            :key="img.image"
            class="prod-list-miniatures-item"
          >

            <img
              :key="img.image"
              :title="img.colorName"
              :src="getImageUrl(img.image, 50, getDomainId())"
              :alt="img.colorName"
              @error="handleImageError(img.image, 'miniture', product)"
              @click="onClickMiniture(img)"
            />
          </div>

          <!-- more colors cue -->
          <div
            v-if="hiddenMiniaturesCount > 0"
            class="prod-list-miniatures-item prod-list-miniatures-more"
          >
            <NuxtLink
              :prefetch="false"
              :to="product.url"
              :title="`Ver ${miniatures.length} colores`"
              :aria-label="`${hiddenMiniaturesCount} colores más, ver los ${miniatures.length} colores`"
            >
              +{{ hiddenMiniaturesCount }}
            </NuxtLink>
          </div>
        </div>
      </section>
      <!-- /miniatures -->

      <!-- Black Friday countdown -->
      <div
        v-if="product.discountPercent > 0 && showBfClock"
        class="bf-card-clock"
        role="timer"
        aria-live="off"
      >
        <svg
          class="bf-card-clock__icon"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          aria-hidden="true"
        >
          <circle cx="12" cy="13" r="8" />
          <path d="M12 9v4l2.5 2.5" />
          <path d="M5 3 2 6" />
          <path d="m22 6-3-3" />
          <path d="M6.4 19.4 5 21" />
          <path d="M17.6 19.4 19 21" />
        </svg>
        <span class="bf-card-clock__body">
          <span class="bf-card-clock__label">Oferta termina en:</span>
          <span class="bf-card-clock__time">
            <span
              v-for="unit in bfVisibleUnits"
              :key="unit.key"
              class="bf-card-clock__unit"
            >{{ unit.value }}<small>{{ unit.key }}</small></span>
          </span>
        </span>
      </div>
      <!-- /Black Friday countdown -->

      <section class="item__info">
        <NuxtLink
          :prefetch="false"
          class="mtc-linkaa"
          :to="product.url"
        >
          <div class="item__name">
            <span class="item__sizes">
              <!-- Tallas: XS, S, M, L, XL, XXL -->
            </span>
            <span class="item__rating">
              <span class="rating-block">
                <VRating
                  readonly
                  :color="product.rating > 0 ? 'primary' : '#ccc'"
                  :model-value="product.rating === 0 ? 5 : product.rating / 2"
                />
              </span>
            </span>
            <h3 class="heading-tag">
              <span>{{ product.brand.name }}  </span>
              <strong>{{ formatName( product.name ) }}</strong>
            </h3>
          </div>
        </NuxtLink>

        <div class="swatch-content" v-if="product.sizes && product.sizes.length > 1 && !product.sizes.some(s => s.name && s.name.length > 4)">
          <div class="swatch-wrap left swatchprimarywrap" style="visibility: visible;">
            <!-- check variants value to assign variant id to swatches -->


              <div
                v-for="size in product.sizes"
                :class="{ 'out-of-stock-option strike-outofstock-swatches': !size.isAvailable}"
                class="individual-option data-inventory-1  rect-design small-size in-stock-option">
                {{size.name}}
              </div>


          </div>
        </div>

        <NuxtLink
          :prefetch="false"
          class="item__price-info mtc-linkaa"
          :to="product.url"
        >
          <span class="item__bottom">

            <span
              class="item__price d-flex"
              style="font-size: 14px;"
            >
              <img :src="`/content/images/flags/${iso}.png`" style="margin-top: 5px; width: 15px; height: 10px; margin-right: 4px;">
              {{ formatCurrency( product.minPrice - product.discountAmount ) }}
              <span
                v-if="product.discountAmount > 0"
                class="item__old-price strike"
                style="font-size: 10px;"
              >


                {{ formatCurrency( product.minPrice ) }}
              </span>
            </span>
            <span
              v-if="product.videos && product.videos.length > 0"
              class="pr-2"
            >
              <img src="/content/images/youtube_icon.svg">
            </span>
          </span>
        </NuxtLink>
      </section>
    </section>
  </article>
</template>

<style>

/* "+N" tile shown after the first 4 color miniatures */
.prod-list-miniatures-more {
  display: flex;
  align-items: center;
  justify-content: center;
}

.prod-list-miniatures-more a {
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  border: 1px solid #d8d8d8;
  border-radius: 4px;
  aspect-ratio: 1;
  background: #f4f4f4;
  color: #333;
  font-family: 'Barlow Condensed', Barlow, sans-serif;
  font-size: 15px;
  font-weight: 800;
  inline-size: 100%;
  max-inline-size: 44px;
  text-decoration: none;
  transition: background 0.15s, border-color 0.15s, color 0.15s;
}

.prod-list-miniatures-more a:hover {
  border-color: #d6001c;
  background: #fff;
  color: #d6001c;
}

/* ── Black Friday countdown on product cards ── */
/* Sizes scale with the card width (cqi units) so it fits any grid/carousel column */
.bf-card-clock {
  display: flex;
  flex: 0 0 auto;
  align-items: center;
  justify-content: center;
  gap: 6px;
  box-sizing: border-box;
  padding: 5px 6px;
  margin: 4px -5px 8px;
  background: #f3d3d6;
  color: #111;
  container-type: inline-size;
  font-family: 'Barlow Condensed', Barlow, sans-serif;
  line-height: 1;
  overflow: hidden;
  white-space: nowrap;
}

.bf-card-clock__icon {
  flex: 0 0 auto;
  color: #d6001c;
  block-size: clamp(18px, 7cqi, 22px);
  inline-size: clamp(18px, 7cqi, 22px);
}

.bf-card-clock__body {
  display: flex;
  flex-direction: column;
  gap: 2px;
  min-inline-size: 0;
}

.bf-card-clock__label {
  font-size: clamp(8px, 3cqi, 11px);
  font-weight: 700;
  letter-spacing: 0.02em;
  text-transform: uppercase;
}

.bf-card-clock__time {
  display: inline-flex;
  gap: 4px;
  font-size: clamp(16px, 4.6cqi, 16px);
  font-variant-numeric: tabular-nums;
  font-weight: 800;
}

.bf-card-clock__unit small {
  margin-inline-start: 1px;
  color: #d6001c;
  font-size: 0.75em;
  font-weight: 800;
}

.tag.product-tag.product-tag--black-friday {
  background-color: rgb(0, 0, 0);
  --customIcon: url('/content/images/icons/discount-tag.png');
  color: rgb(255, 255, 255);
}

.tag.product-tag.product-tag--black-fridayaaa {
  content: "";
  background-image: url('/content/images/icons/discount-tag.png') ;

  /* size, position, etc. */
}

.tag.product-tag.custom-tag-icon>span:before {
  background-image: var(--customIcon);
  background-position: 0 0;
  background-repeat: no-repeat;
  background-size: cover;
  content: "";
  display: inline-block;
  height: 12px;
  margin: 0 5px 0 0;
  vertical-align: middle;
  width: 12px;
}


.tag.product-tag.product-tag--crazydays, .tag.product-tag.product-tag--offer, .tag.product-tag.product-tag--sales {
  background-color: #d6001c;
}

.swatch-content {
  margin-top: 10px;
}
.swatch-wrap.swatchprimarywrap {
  display: flex;
  flex-wrap: wrap;
}
.individual-option.small-size {
  height: auto;
  width: 24px;
  line-height: 24px;
  font-size: 16px;
}
.individual-option.small-size.rect-design, .individual-option.small-size.rounded-rect-design {
  min-width: 24px;
}
.strike-outofstock-swatches {
  text-decoration: line-through;
}
.individual-option.out-of-stock-option {
  color: rgba(0, 0, 0, 0.16);
  border-color: rgba(0, 0, 0, 0.16);
  background-color: rgb(255, 255, 255);
}
.individual-option.rect-design.small-size
{
  width: auto;
  padding-left: 5px;
  padding-right: 5px;
}
.individual-option {
  z-index: 3;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  border: 1px solid rgb(61, 66, 70);
  line-height: 35px;
  margin: 0px 5px 5px 0px;
  color: rgb(61, 66, 70);
  border-color: rgb(61, 66, 70);
  background-color: rgb(255, 255, 255);
}

</style>

