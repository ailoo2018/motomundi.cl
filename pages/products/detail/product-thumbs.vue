<script setup lang="ts">
import {register} from "swiper/element"
import {getDomainId, getImageUrl, getYouTubeThumbnail} from "@core/utils/formatters"
import {useHandleImageError} from "@/composables/useHandleImageError";

const props = defineProps({
  product: {
    type: Object,
  },
})

const emit = defineEmits(['on-click'])
const product = ref(props.product)
const swiperEl = ref(null)
const hideNavigation = ref(false)
const {handleImageError} = useHandleImageError()

const images = computed(() => {
  if (!product.value)
    return []
  let imgs = []
  if (product.value.videos) {
    product.value.videos.forEach(video => {
      imgs.push({
        type: "video",
        videoId: video.url,
        urlThumb: getYouTubeThumbnail(video.url),
        url: getYouTubeThumbnail(video.url, "sddefault"),
      })
    })
  }
  product.value.images.map(img => {
    return {type: "image", ...img}
  }).forEach(i => imgs.push(i))
  return imgs
})

// Configuration for breakpoints
const swiperBreakpoints = {
  320: {slidesPerView: 3.5, spaceBetween: 10},
  640: {slidesPerView: 4, spaceBetween: 10},
  1024: {slidesPerView: 5, spaceBetween: 10},
  1280: {slidesPerView: 6, spaceBetween: 10},
}

const onClick = (index, img) => {
  emit("on-click", index, img)
}

const checkNavigation = () => {
  if (!swiperEl.value) return

  const swiper = swiperEl.value.swiper
  if (!swiper) return

  // Check if all slides fit in the visible area
  const totalSlides = images.value.length
  const slidesPerView = swiper.params.slidesPerView

  // Hide navigation if all slides are visible
  hideNavigation.value = totalSlides <= Math.floor(slidesPerView)
}

// Watch for product prop changes
watch(() => props.product, newProduct => {
  console.log("thumb product changed")
  product.value = newProduct
})

// Check navigation on mount and when images change
onMounted(() => {
  nextTick(() => {
    if (swiperEl.value) {
      swiperEl.value.addEventListener('swiper-init', checkNavigation)
      swiperEl.value.addEventListener('swiper-resize', checkNavigation)
    }
  })
})

watch(images, () => {
  nextTick(() => {
    checkNavigation()
  })
})

register()
</script>

<template>
  <section>
    <div class="row">
      <div class="col s12 l12">
        <div class="product-media">
          <div class="product-thumbs mb-5">
            <ClientOnly>
              <swiper-container
                v-if="images.length > 0"
                ref="swiperEl"
                id="miniatures"
                events-prefix="swiper-"
                :navigation="!hideNavigation"
                :breakpoints="{  320: { slidesPerView: 3.5, spaceBetween: 10 },  640: { slidesPerView: 4, spaceBetween: 10 },  1024: { slidesPerView: 5, spaceBetween: 10 },  1280: { slidesPerView: 6, spaceBetween: 10 },}"
                :class="{ 'hide-navigation': hideNavigation }"
              >
                <swiper-slide
                  v-for="(img, index) in images"
                  :key="index"
                >
                  <div v-if="img.type === 'image'">
                    <img
                      class="tmb-img"
                      :data-index="`image-${index}`"
                      :src="getImageUrl(img.image, 150, getDomainId())"
                      @click="onClick(index, img)"
                      @error="handleImageError(img.image)"
                    >
                  </div>
                  <div
                    v-if="img.type === 'video'"
                    class="video-thumb"
                    @click="onClick(index, img)"
                  >
                    <VImg
                      style="cursor:pointer; width: 100%; height: 100%;"
                      :src="img.urlThumb"
                      cover
                    />
                  </div>
                </swiper-slide>
              </swiper-container>
            </ClientOnly>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
.tmb-img {
  cursor: pointer;
  width: 110px;
  height: 110px;
  display: inline-block;
  opacity: 1;
}

@media (max-width: 960px) {
  .tmb-img {
    width: 100%;
    height: 100%;
  }
}

.product-media {
  /*max-height: 130px;*/
}

// Hide navigation buttons when not needed
swiper-container.hide-navigation::part(button-prev),
swiper-container.hide-navigation::part(button-next) {
  display: none !important;
}


swiper-container {
  --swiper-navigation-color: #ff0000; /* Changes arrow color */
  --swiper-navigation-size: 10px; /* Changes arrow size */
  --swiper-navigation-color: rgba(0, 0, 0, .6);
}

swiper-container::part(button-prev) {
  background-color: rgb(0, 0, 0, .6);
  color: white;
  padding: 12px;
  left: 5px;
}

swiper-container::part(button-next) {
  background-color: rgb(0, 0, 0, .55);
  color: white;
  padding: 12px;
  right: 5px;
  /*border: 2px solid red;*/
}

.video-thumb {
  display: flex;
  flex-direction: row;
  min-height: 110px;
  height: 100%;
  align-items: center;
  justify-content: center;
  @media (max-width: 960px) {
    min-height: 90px;

  }

}


</style>
