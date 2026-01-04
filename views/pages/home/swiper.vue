<script setup>
import { register } from 'swiper/element/bundle'
import { getBaseCDN } from "@core/utils/formatters.js"

const props = defineProps({
  widget: {
    type: Object,
    required: true,
  },
})

const getBgImg = img =>{
  return {
    backgroundImage: `url('${getBaseCDN()}${img.imagePath}')`,
  }
}


register()
</script>

<template>

  <ClientOnly>
    <swiper-container events-prefix="swiper-">
      <swiper-slide
        v-for="img in widget.configuration.images"

        :key="img.slideImage"
      >
        <div class="swiper-slide">
          <a :href="img.link">
            <span
              data-dr="true"
              class="mtc-link"
            >
              <div
                data-promotion-position="idx"
                class="slide slide__theme--dark slide__layou--single-image slide__layout--right"
                :style="getBgImg(img)"
              >
                <div class="container">
                  <div class="slide__content">

                    <!-- if slide img -->
                    <div
                      v-if="img.slideImage"
                      class="slide__single-image"
                    >
                      <span>
                        <!-- IsMMobile $requestHelper.IsMobile  ShowFG: $img.showForegroundMobile -->
                        <img
                          :src="getBaseCDN() + img.slideImage"
                          class="cdn-img carrusel-fg-image"
                        >
                      </span>
                    </div>
                    <!-- /end if -->

                    <div class="slide__main">
                      <p class="slide__title" />
                      <!-- countdown -->
                      <div class="slide__countdown-button center">
                        <div
                          v-if="img.countdownDate"
                          class="countdown__container"
                          style="background-color: rgb(0, 0, 0);"
                        >
                          <div
                            class="countdown"
                            data-end-date="$img.countdownDate"
                          >
                            <div class="countdown-days">
                              00
                              <span class="countdown-text">días</span>
                            </div>
                            <div class="countdown__dots"> : </div>
                            <div class="countdown-hours">
                              00
                              <span class="countdown-text">horas</span>
                            </div>
                            <div class="countdown__dots"> : </div>
                            <div class="countdown-minutes">
                              00
                              <span class="countdown-text">minutos</span>
                            </div>
                            <div class="countdown__dots"> : </div>
                            <div class="countdown-seconds">
                              00
                              <span class="countdown-text">segundos</span>
                            </div>
                          </div>

                        </div>




                        <span
                          v-if="img.buttonTitle"
                          class="slide__button button&#45;&#45;skewed"
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
                      <!-- /countdown -->
                    </div>
                  </div>
                </div>
              </div>
            </span>
          </a>
          <!--
            <a href="/condiciones-generales.html" rel="nofollow" target="_blank"
            class="slide__conditions">
            Ver condiciones
            </a>
          -->
        </div>
      </swiper-slide>
    </swiper-container>
  </ClientOnly>
</template>


<style scoped>
.swiper-slide {
  flex-shrink: 0;
  height: 100%;
  position: relative;
  transition-property: -webkit-transform;
  transition-property: transform;
  transition-property: transform,-webkit-transform;
  width: 100%;
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
  max-width: 50%;
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
.slide .slide__content .slide__single-image {
  height: auto;
  max-height: 300px;
  max-width: 100%;
  text-align: center;
  width: 560px;
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
  background-color: rgba(0, 0, 0, 0.8);
  color: rgb(255, 255, 255);
}
.slide.slide__theme--dark .slide__button use {
  stroke: rgb(255, 255, 255);
}

@media (min-width: 700px) {
  .widget-114930 .slide[data-promotion-position="3"].slide__layout--right .container {
    align-items: center;
    margin-left: 70px;
  }
}

</style>
