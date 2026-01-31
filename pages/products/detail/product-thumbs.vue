<script setup lang="ts">
import { register } from "swiper/element"
import { getDomainId, getImageUrl, getYouTubeThumbnail } from "@core/utils/formatters"

const props = defineProps({
  product: {
    type: Object,
  },
})

const emit = defineEmits(['on-click'])

const product = ref(props.product)

const images = computed( () => {
  if(!product.value)
    return []

  let imgs = []
  if(product.value.videos){
    product.value.videos.forEach(video =>{ imgs.push({
      type: "video",
      videoId: video.url,
      urlThumb: getYouTubeThumbnail(video.url),
      url: getYouTubeThumbnail(video.url, "sddefault"),
    }) })
  }

  product.value.images.map( img => { return  { type: "image", ...img } }).forEach(i => imgs.push(i))


  return imgs
})

// Configuration for breakpoints (Responsive 5 slides)
const swiperBreakpoints = JSON.stringify({
  320: { slidesPerView: 3.5, spaceBetween: 10 },
  640: { slidesPerView: 4, spaceBetween: 10 },
  1024: { slidesPerView: 5, spaceBetween: 10 },
  1280: { slidesPerView: 6, spaceBetween: 10 },
})

const onClick = (index, img) => {
  emit("on-click", index, img)
}

register()
</script>

<template>
  <section>
    <div class="row">
      <div class="col s12 l12">
        <div class="product-media">
          <div class="product-thumbs mb-5">
            <swiper-container
              id="miniatures"
              events-prefix="swiper-"
              navigation="true"
              :breakpoints="swiperBreakpoints"
            >
              <swiper-slide v-for="(img, index) in images" :key="index">
                <div v-if="img.type === 'image'">
                  <img
                    class="tmb-img"
                    style=""
                    data-index="image-1"
                    :src="getImageUrl(img.image, 600, getDomainId())"
                    @click="onClick(index, img)"
                  >
                </div>
                <div
                  v-if="img.type === 'video'"
                  class="video-thumb "
                >
                  <img
                    v-if="img.type === 'video'"
                    style="cursor:pointer; width: 100%; height: 100%; display: inline-block; opacity: 1;"
                    :src="img.urlThumb"
                    @click="onClick( index, img)"
                  >
                </div>
              </swiper-slide>
            </swiper-container>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
.tmb-img {
  cursor:pointer;
  width: 110px; height: 110px;
  display: inline-block; opacity: 1;
}

@media (max-width: 960px) {
  .tmb-img {
    width: 100%;
    height: 100%;
  }
}
.product-media{
  max-height: 110px;
}
</style>
