<script setup>
import { register } from 'swiper/element/bundle'
import { getBaseCDN } from "@core/utils/formatters.js"

const props = defineProps({
  widget: {
    type: Object,
    required: true,
  },
})

const { isMobile, isTablet, isDesktop } = useDevice()
/*
const deviceType = useState('device-type', () => {
  const event = useRequestEvent()
  return event?.context.deviceType || 'desktop'
})
const isMobile = computed(() => deviceType.value === 'mobile')
*/



const swiperEl = ref(null)
const activeIndex = ref(0)
const swiperReady = ref(false) // 👈 new

const firstImage = computed(() => props.widget.configuration.images?.[0])

const goToSlide = index => {
  if (swiperEl.value && swiperEl.value.swiper) {
    swiperEl.value.swiper.slideTo(index)
    activeIndex.value = index
  }
}

const getBgImg = (img, origin) => {
  if (isMobile && img.imagePathSmall && img.imagePathSmall.length > 0) {
    return {
      backgroundImage: `url('${getBaseCDN()}${img.imagePathSmall}')`,
      backgroundSize: "auto 500px",
    }
  }

  return {
    backgroundImage: `url('${getBaseCDN()}${img.imagePath}')`,
  }
}

onMounted(async () => {
  await nextTick()
  if (swiperEl.value) {
    swiperEl.value.addEventListener('swiper-slidechange', e => {
      activeIndex.value = e.detail[0].activeIndex
    })

    // Hide placeholder once swiper reports it's ready
    swiperEl.value.addEventListener('swiper-init', () => {
      swiperReady.value = true
    })

    // Fallback: if swiper-init never fires, reveal after short delay
    setTimeout(() => { swiperReady.value = true }, 800)
  }
})

register()
</script>

<template>
  <div
    id="home-block-0"
    class="block-container"
  >
    <section class="carousel-block">
      <!-- 👇 Static first-image placeholder shown before Swiper is ready -->

      <div
        v-if="!swiperReady && firstImage"
        class="swiper-placeholder"
      >
        <a :href="firstImage.link">
          <div
            class="slide slide__theme--dark slide__layout--single-image slide__layout--right"
            :style="getBgImg(firstImage)"
          >
            <div class="container">
              <div class="slide__content">
                <div
                  v-if="firstImage.slideImage"
                  class="slide__single-image"
                >
                  <span>
                    <img
                      v-if="firstImage.showForegroundMobile"
                      :src="getBaseCDN() + firstImage.slideImage"
                      class="cdn-img carrusel-fg-image"
                    >
                  </span>
                </div>
                <div class="slide__main">
                  <p class="slide__title" />
                  <div class="slide__countdown-button center">
                    <span
                      v-if="firstImage.buttonTitle && !isMobile"
                      class="slide__button button--skewed"
                    >
                      {{ firstImage.buttonTitle }}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </a>
      </div>
      <!-- /placeholder -->

      <ClientOnly>
        <swiper-container
          ref="swiperEl"
          events-prefix="swiper-"
          :style="{ visibility: swiperReady ? 'visible' : 'hidden', height: swiperReady ? 'auto' : '0' }"
        >
          <swiper-slide
            v-for="img in widget.configuration.images"
            :key="img.slideImage"
          >
            <div class="swiper-slide">
              <a :href="img.link">
                <span class="mtc-link">
                  <div
                    class="slide slide__theme--dark slide__layou--single-image slide__layout--right"
                    :style="getBgImg(img)"
                  >
                    <div class="container">
                      <div class="slide__content">
                        <div
                          v-if="img.slideImage"
                          class="slide__single-image"
                        >
                          <span>
                            <img
                              v-if="!isMobile || img.showForegroundMobile"
                              :src="getBaseCDN() + img.slideImage"
                              class="cdn-img carrusel-fg-image"
                            >
                          </span>
                        </div>
                        <div class="slide__main">
                          <p class="slide__title" />
                          <div class="slide__countdown-button center">
                            <div
                              v-if="img.countdownDate"
                              class="countdown__container"
                              style="background-color: rgb(0, 0, 0);"
                            >
                              <!-- countdown markup unchanged -->
                            </div>
                            <span
                              v-if="img.buttonTitle && !isMobile"
                              class="slide__button button--skewed"
                            >
                              {{ img.buttonTitle }}
                              <svg
                                width="12"
                                height="12"
                                xmlns="http://www.w3.org/2000/svg"
                                class="icon sprite-line-icons"
                              >
                                <title>Right arrow</title>
                                <use
                                  href="/content/svg/motomundi.svg#i-icon-arrow-right-tail"
                                  xlink:href="/content/svg/motomundi.svg#i-icon-arrow-right-tail"
                                />
                              </svg>
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </span>
              </a>
            </div>
          </swiper-slide>
        </swiper-container>
      </ClientOnly>

      <div class="swiper-slide-selector__container">
        <div
          v-for="(img, index) in widget.configuration.images"
          :key="index"
          class="swiper-slide-selector"
          :class="{ active: index === activeIndex }"
          @click="goToSlide(index)"
        >
          <span :title="img.sliderButtonTitle">{{ img.sliderButtonTitle }}</span>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>


@media(max-width: 900px) {
  .swiper-placeholder {
    max-height: 400px;
  }
}
.swiper-slide {
  flex-shrink: 0;
  height: 100%;
  position: relative;
  transition-property: -webkit-transform;
  transition-property: transform;
  transition-property: transform,-webkit-transform;
  width: 100%;
}


@media only screen and (max-width: 600px) {
  .swiper-slide {
    flex-wrap: wrap;
    max-height: 400px;
    margin-bottom: 20px;
  }
}

.container {
  max-width: 1280px;
  width: 95%;
  margin: 0px auto;
}
.slide {
  align-items: center;
  background-repeat: no-repeat;
  background-size: cover;
  box-sizing: border-box;
  display: flex;
  min-height: 500px;
  width: 100%;
  background-position: 50% center;
  padding: 40px 0px;
}

.slide > .container {
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
}


.slide .slide__content {
  /*max-width: 50%;*/
  max-width: 100%;
}

@media (max-width: 900px){
  .slide .slide__content {
    max-width: 100%;
  }

}

.slide .slide__content .slide__single-image {
  height: auto;
  max-height: 300px;
  max-width: 100%;
  text-align: center;
  width: 560px;
}

.slide .slide__content .slide__single-image span {
  display: block;
  max-height: 100%;
  max-width: 100%;
}

.slide .slide__content .slide__single-image span .cdn-img {
  max-height: 286px;
}

.slide .slide__content .slide__main .slide__button {
  box-sizing: border-box;
  display: inline-block;
  font-size: 12px;
  font-weight: 500;
  letter-spacing: 1px;
  line-height: 1.1em;
  text-transform: uppercase;
  padding: 13px 20px;
  transition: 0.1s ease-in-out;
}

.slide .slide__content .slide__main .slide__countdown-button.center {
  justify-content: center;
}

.slide .slide__content .slide__main .slide__countdown-button {
  align-items: stretch;
  display: flex;
  justify-content: center;
  margin-top: 10px;
  gap: 10px;
}


.slide.slide__theme--dark .slide__button {
  background-color: rgba(0,0, 0, 0.8);
  color: rgb(255, 255, 255);
}
.slide.slide__theme--dark .slide__button use {
  stroke: rgb(255, 255, 255);
}



@media (min-width: 700px) {
  .owl-carousel .owl-stage-outer {
    max-height: 525px;
  }
  .carousel-block .swiper-slide-selector__container {
    margin-bottom: 0px;
  }
}



/**** swiper selector control ***/

.carousel-block .swiper-slide-selector__container {
  display: flex;
  /*margin-top: -37px;*/

  padding: 8px ;
  background-color: #0f0f0f;

  position: relative;
  z-index: 5;

}

@media only screen and (max-width: 992px) {
  .carousel-block .swiper-slide-selector__container {
    margin-top: -42px
  }
}

@media only screen and (max-width: 600px) {
  .carousel-block .swiper-slide-selector__container {
    display: none
  }
}

.carousel-block .swiper-slide-selector {
/*  background-color: rgba(223, 210, 210, 0.65);*/
  background-color: rgba(70, 25, 25, 0.65);
  box-sizing: border-box;
  color: #fff;
  cursor: pointer;
  flex: 1 1 auto;
  font-size: 11px;
  font-weight: 700;
  height: 35px;
  line-height: 35px;
  margin-right: 8px;
  /*margin-right: 2px;*/
  overflow: hidden;
  padding: 0 15px;
  text-align: center;
  text-overflow: ellipsis;
  text-transform: uppercase;
  transition: all .5s ease-out;
  white-space: nowrap
}

@media only screen and (max-width: 992px) {
  .carousel-block .swiper-slide-selector {
    font-size: 10px
  }
}

.carousel-block .swiper-slide-selector:last-child {
  margin-right: 0
}

.carousel-block .swiper-slide-selector:hover {
  background-color: #B21915;
}

.carousel-block .swiper-slide-selector.active {
  background-color: #B21915
}

.carousel-block .swiper-pagination {
  bottom: 10px
}
</style>
