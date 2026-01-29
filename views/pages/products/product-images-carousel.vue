<script setup>
import { SwiperSlide } from "swiper/vue"
import { register } from "swiper/element"
import { getImageUrl, getDomainId, getYouTubeThumbnail } from "@core/utils/formatters"
import ProductThumbs from "@/pages/products/detail/product-thumbs.vue"

const props = defineProps(
  {
    product: {
      type: Object,
      required: true,
    },
  },
)

const emit = defineEmits(['onShowVideo'])

const product = ref(props.product)
const mainSwiperRef = ref(null) // Ref for the main swiper element
const activeIndex = ref(0)

// Function to navigate
const slideTo = index => {
  console.log("slideTo: " + index)

  const swiperEl = mainSwiperRef.value
  if (swiperEl && swiperEl.swiper) {
    swiperEl.swiper.slideTo(index)
  }
}


const slideToAndShowView = ( index, video) => {
  slideTo(index)

  emit("onShowVideo", video.videoId)
}

const showVideo = video => {
  emit("onShowVideo", video.videoId)
}

// Sync active index when swiper moves
const onSlideChange = e => {
  console.log("onSlideChange")

  const [swiper] = e.detail

  activeIndex.value = swiper.activeIndex
}



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


const onClickThumb = (index, img) => {
  if(img.type === "video"){
    slideToAndShowView(index, img)
  }else {
    slideTo(index)
  }
}


onMounted(() => {
  // Check if videos exist and slide to index 1 on load
  if (product.value?.videos?.length > 0) {
    // We use nextTick or a small timeout because Swiper Element
    // initialization can sometimes be asynchronous
    nextTick(() => {
      slideTo(1)
    })
  }
})


/**
 * Finds an image index based on a color property
 * and slides the swiper to that position.
 */
const selectSlideByProductColor = colorValue => {

  let idx = 0
  for(var img of images.value){
    if(img.type === "image" && img.colorId === colorValue.id){
      slideTo(idx)
      break
    }
    idx++
  }

}

// CRITICAL: Export the function to the parent
defineExpose({
  selectSlideByProductColor,
})

register()
</script>

<template>
  <!-- carousel -->

  <div class="product-photo carousel-content__wrapper">
    <div
      class="product__notice"
      style="display: none;"
    >
      <button>
        <svg
          width="15"
          height="12"
          xmlns="http://www.w3.org/2000/svg"
          class="icon sprite-line-icons"
        >
          <use
            href="/content/images/svg/0b25363450c5afe3b3f9ba7fe4f4173b.svg#i-icon-alert"
            xlink:href="/content/images/svg/0b25363450c5afe3b3f9ba7fe4f4173b.svg#i-icon-alert"
          />
        </svg>
        Importante
      </button>
      <div class="product__notice-text">
        4
        <p />
      </div>
    </div>
    <div class="carousel-content_sizer">
      <div class="carousel-content">
        <ClientOnly>
          <swiper-container
            ref="mainSwiperRef"
            events-prefix="swiper-"
            navigation="true"
            class="pb-10"
            @swiper-slidechange="onSlideChange"
          >
            <swiper-slide
              v-for="image in images"
              :key="image.id"
            >
              <div class="easyzoom easyzoom--overlay">
                <a
                  v-if="image.type === 'image'"
                  :href="image.url"
                  ng-click="showImageZoom($index, $event);"
                >

                  <img

                    :alt="product.brand.name + product.name"
                    :src="getImageUrl(image.image, 600, getDomainId())"
                  >

                </a>

                <a @click="showVideo(image)">
                  <img
                    v-if="image.type === 'video'"
                    style="width: 100%"

                    :alt="product.brand.name + product.name"
                    :src="image.url"
                  >
                </a>
              </div>
            </swiper-slide>
          </swiper-container>
        </ClientOnly>

        <ul class="product-media-nav">
          <li
            v-for="(img, index) in images"
          >
            <button
              v-if="img.type === 'image'"
              :id="`carousel-nav-dot-${img.id}`"
              class="product-media-dot"
              data-type="image"
              :data-index="`image-${index}`"
              :data-nav-index="index"
              :class="{ 'current': activeIndex === index }"
              @click="slideTo(index)"
            />
            <button
              v-if="img.type === 'video'"
              :class="{ 'current': activeIndex === index }"
              @click="slideTo( index)"
            >
              <svg
                width="18"
                height="13"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M6.96 9.011l4.542-2.464-4.543-2.5v4.964zM8.691.485c1.055 0 2.07.017 3.046.053.976.035 1.694.065 2.154.088l.69.036.151.018c.101.011.174.023.219.035.045.012.118.024.219.035.1.012.19.042.269.09.078.046.168.088.27.123.1.036.195.1.285.195.09.095.18.183.27.266a.806.806 0 01.15.177c.057.083.147.278.27.585a4 4 0 01.253.993c.044.426.084.875.117 1.347.034.473.05.851.05 1.135v1.737c.012.957-.044 1.915-.167 2.872a4.24 4.24 0 01-.236.975c-.112.295-.213.502-.303.62l-.135.16a1.979 1.979 0 01-.269.266 1.101 1.101 0 01-.286.177c-.09.036-.18.077-.27.124a.8.8 0 01-.268.089l-.59.089c-1.57.13-3.533.195-5.889.195l-3.382-.071a41.488 41.488 0 01-1.868-.071l-.807-.089a10.98 10.98 0 01-.505-.089c-.112-.023-.275-.094-.488-.212a1.926 1.926 0 01-.522-.408.806.806 0 01-.151-.177c-.056-.083-.146-.278-.27-.585a4 4 0 01-.252-.993A39.844 39.844 0 01.33 8.923C.296 8.45.28 8.072.28 7.788V6.051c-.011-.957.045-1.915.168-2.872a3.96 3.96 0 01.539-1.595l.134-.16c.09-.106.18-.195.27-.266.09-.07.185-.136.285-.195.101-.059.191-.1.27-.124L2.214.75c.1-.035.174-.047.219-.035.045.012.117 0 .218-.035.101-.036.152-.042.152-.018C4.373.544 6.337.485 8.693.485z"
                  fill-rule="nonzero"
                />
              </svg>
            </button>
          </li>
        </ul>
      </div>
    </div>
  </div>
  <!-- /carousel -->

  <!-- product-thumbs -->
  <ProductThumbs @on-click="onClickThumb" :product="product"/>

  <!-- /product-thumbs -->
</template>

<style  lang="scss">
swiper-slide {
  margin: auto 0
}

.product .video-thumb {
  position: relative;
  overflow: hidden;


}

.product .product-media-nav button.current svg, .product .product-media-nav button:active svg, .product .product-media-nav button:hover svg {
  fill: #c74044 !important;
}

.video-thumb > img{
  width: 108px; height: 108px; display: inline-block; opacity: 1;
  border-radius: 7px;
}

.product  .video-thumb:before {
  position: absolute;
  z-index: 5;
  top: 50%;
  left: 50%;
  display: block;
  width: 40px;
  height: 40px;
  content: "";
  transition: all .2s ease;
  transform: translate(-50%, -50%);
  pointer-events: none;
  border-radius: 200px;
  background: transparent url(/public/images/svg/video-thumb-play.svg) 50% no-repeat;
  background-size: 40px auto;
}

/* 1. Style the Circle */
swiper-container::part(button-prev),
swiper-container::part(button-next) {
  position: absolute;
  top: 50%;
  z-index: 10;
  cursor: pointer;

  /* The size of your circular background */
  width: 36px;
  height: 36px;
  margin-top: -16px; /* Half of height to perfectly center */

  border-radius: 50%;
  background-color: #a5a5a5;
  color: #a5a5a5;
  opacity: .6;

  display: flex;
  align-items: center;
  justify-content: center;

  /* Use padding to "squeeze" the internal SVG to a smaller size */
  padding: 2px 2px;
  box-sizing: border-box;
}


/* 2. Position Next Button */
swiper-container::part(button-next) {
  right: 0px;
  left: auto;
}

/* 3. Position Prev Button */
swiper-container::part(button-prev) {
  left: 5px;
}

/* Create the Custom Carret using ::after */
swiper-container::part(button-prev)::after{
  margin: 1px 8px 0 0;
}
swiper-container::part(button-next)::after {
  margin: 1px 4px 0 0;
}

swiper-container::part(button-prev)::after,
swiper-container::part(button-next)::after {
  content: "";
  width: 40px;
  height: 40px;
  background-color: white; /* This is the ICON color */

  /* This creates a clean "Carret" using a mask */
  -webkit-mask-repeat: no-repeat;
  mask-repeat: no-repeat;
  -webkit-mask-size: contain;
  mask-size: contain;
  -webkit-mask-position: center;
  mask-position: center;
}

/* Define the Left Carret Shape */
swiper-container::part(button-prev)::after {
  -webkit-mask-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='black' stroke-width='3' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='15 18 9 12 15 6'%3E%3C/polyline%3E%3C/svg%3E");
  mask-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='black' stroke-width='3' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='15 18 9 12 15 6'%3E%3C/polyline%3E%3C/svg%3E");
}

/* Define the Right Carret Shape */
swiper-container::part(button-next)::after {
  -webkit-mask-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='black' stroke-width='3' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='9 18 15 12 9 6'%3E%3C/polyline%3E%3C/svg%3E");
  mask-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='black' stroke-width='3' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='9 18 15 12 9 6'%3E%3C/polyline%3E%3C/svg%3E");
}


.carousel-content__wrapper {
  position: relative;
}
.product .product-media-nav {
  display: -ms-flexbox;
  display: flex;
  margin: 10px 0 30px;
  -ms-flex-pack: center;
  justify-content: center;
  -ms-flex-align: center;
  align-items: center;
}
.product .product-media-nav li {
  padding: 0 5px;
}

.product .product-media-dot {
  display: block;
  width: 11px;
  height: 11px;
  border-radius: 200px;
  background-color: #c3c3c3;
}

.product .product-media-dot.current, .product .product-media-dot:active, .product .product-media-dot:hover {
  background-color: #c74044;
}
</style>
