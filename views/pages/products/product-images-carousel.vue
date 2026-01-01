<script setup lang="ts">
import { SwiperSlide } from "swiper/vue"
import { register } from "swiper/element"
import {getImageUrl, getDomainId} from "@core/utils/formatters";


const props = defineProps(
  {
    product: {
      type: Object,
      required: true,
    },
  },
)


// Configuration for breakpoints (Responsive 5 slides)
const swiperBreakpoints = {
  320: { slidesPerView: 1.2, spaceBetween: 10 },
  640: { slidesPerView: 2.5, spaceBetween: 10 },
  1024: { slidesPerView: 5, spaceBetween: 10 },
  1280: { slidesPerView: 6, spaceBetween: 10 },
}

const product = ref(props.product)

console.log("product: " + JSON.stringify(product.value))

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
      <div class="product__notice-text">4
        <p />
      </div>
    </div>
    <div class="carousel-content_sizer">
      <div class="carousel-content">
        <ClientOnly>
          <swiper-container
            events-prefix="swiper-"
            navigation="true"

            class="pb-10"
            :inject-styles="[
              `
        .swiper-button-next, .swiper-button-prev{
          border: none;
  height: 25px;
  width: 25px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.3s;
          background-color: rgba(0, 0, 0, .6) !important;
          color: #fff !important;
          padding-inline: 0.45rem !important;
          padding-block: 0.45rem !important;
        }
        .swiper-button-next svg, .swiper-button-prev svg{
        height: 10px; width: 10px;
        }
        `,
            ]"
          >
            <swiper-slide
              v-for="image in product.images"
              :key="image.id"
            >
              <div class="easyzoom easyzoom--overlay">
                <a
                  :href="image.url"
                  ng-click="showImageZoom($index, $event);"
                >

                  <img
                    class=""
                    alt="HJC i71 Monocolor"
                    :src="getImageUrl(image.image, 600, getDomainId())"
                  >
                </a>
              </div>
            </swiper-slide>
          </swiper-container>
        </ClientOnly>

        <!-- dot-navigation -->
        <ul
          class="product-media-nav"
          style=""
        >
          <!-- ngRepeat: img in product.images -->
          <li
            ng-repeat="img in product.images"
            class="ng-scope"
          >
            <button
              id="carousel-nav-dot-1944232"
              class="product-media-dot current"
              data-type="image"
              data-index="image-0"
              data-nav-index="0"
            />
          </li><!-- end ngRepeat: img in product.images -->
          <li
            ng-repeat="img in product.images"
            class="ng-scope"
          >
            <button
              id="carousel-nav-dot-1944233"
              class="product-media-dot"
              data-type="image"
              data-index="image-1"
              data-nav-index="1"
            />
          </li><!-- end ngRepeat: img in product.images -->

          <!-- ngRepeat: video in product.ytVideos -->
          <li
            ng-repeat="video in product.ytVideos"
            class="ng-scope"
          >
            <button
              data-type="video"
              data-index="video-2"
              data-nav-index="2"
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
        <!-- dot-navigation -->
      </div>
    </div>
  </div>
  <!-- /carousel -->

  <!-- product-thumbs -->
  <section>
    <div class="row">
      <div class="col s12 l12">
        <div class="product-media">
          <div class="product-thumbs">
            <swiper-container
              events-prefix="swiper-"
              :breakpoints="swiperBreakpoints"
            >
              <swiper-slide v-for="img in product.images">
                <div>
                  <img
                    style="width: 110px; height: 110px; display: inline-block; opacity: 1;"
                    data-index="image-1"
                    :src="'https://www.motomundi.cl' + getImageUrl(img.image)"
                  >
                </div>
              </swiper-slide>
            </swiper-container>
            <div class="owl-nav disabled">
              <div class="owl-prev disabled">
                <button><i class="icon-previous" /></button>
              </div>
              <div class="owl-next disabled">
                <button><i class="icon-next" /></button>
              </div>
            </div>
            <div class="owl-dots disabled" />
          </div>
        </div>
      </div>
    </div>
  </section>
  <!-- /product-thumbs -->
</template>

<style scoped lang="scss">
.carousel-content__wrapper {
  position: relative;
}


</style>
