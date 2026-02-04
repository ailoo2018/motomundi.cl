<script setup lang="ts">
import {register} from "swiper/element"
import {getDomainId, getImageUrl, getYouTubeThumbnail} from "@core/utils/formatters"

const props = defineProps({
  product: {
    type: Object,
  },
})

const emit = defineEmits(['on-click'])
const product = ref(props.product)
const swiperEl = ref(null)
const hideNavigation = ref(false)

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
                      data-index="image-1"
                      :src="getImageUrl(img.image, 600, getDomainId())"
                      @click="onClick(index, img)"
                    >
                  </div>
                  <div
                    v-if="img.type === 'video'"
                    class="video-thumb"
                  >
                    <img
                      style="cursor:pointer; width: 100%; height: 100%; display: inline-block; opacity: 1;"
                      :src="img.urlThumb"
                      @click="onClick(index, img)"
                    >
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
</style>
