<script setup lang="ts">
import emptyImage from "@images/empty-image.avif"
import AddToFavsBtn from "@/components/AddToFavsBtn.vue"
import {useCurrencyConverter} from "@/composables/useCurrencyConverter";
import {computed} from "vue";

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

const handleImageError = (imageId) => {

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
  if (uniqueImages.length <= 1) {
    return []
  }


  return uniqueImages
})

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
        class="mtc-link product-link"
        :to="product.url"
      >
        <div class="product-tags">
          <span
            v-if="product.discountPercent > 0"
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
            @error="handleImageError(product.image)"
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
            v-for="img in miniatures"
            class="prod-list-miniatures-item"
          >

            <img
              :key="img.image"
              :title="img.colorName"
              :src="getImageUrl(img.image, 50, getDomainId())"
              :alt="img.colorName"
              @error="handleImageError"
              @click="onClickMiniture(img)"
            />
          </div>
        </div>
      </section>
      <!-- /miniatures -->

      <section class="item__info">
        <NuxtLink
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

        <NuxtLink
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
</style>

