

<script setup lang="ts">
import { register } from "swiper/element/bundle"
import { onMounted } from "vue"

// Breakpoints must be passed as a stringified JSON object for Web Components
const swiperBreakpoints = {
  320: { slidesPerView: 1.2, spaceBetween: 10 },
  640: { slidesPerView: 2.5, spaceBetween: 10 },
  1024: { slidesPerView: 3.5, spaceBetween: 10 },
  1280: { slidesPerView: 4.5, spaceBetween: 10 },
}

onMounted(() => {
  register()
})
</script>


<template>
  <div class="block-container">
    <aside
      section="home"
      class="brands-block"
    >
      <div class="container">
        <div class="row">
          <div class="col s12 l12">
            <h2>
              Marcas destacadas
            </h2>
            <div class="swiper-container brands-block__container swiper-container-initialized swiper-container-horizontal swiper-container-pointer-events">
              <ClientOnly>
                <swiper-container
                  :breakpoints="swiperBreakpoints"
                  class="brands-container owl-carousel swiper-wrapper"
                >
                  <swiper-slide class="brand swiper-slide swiper-slide-prev">
                    <img
                      class="background"
                      src="/content/images/brands-bg/alpinestars_mx_bg.jpg"
                    >
                    <h3>
                      <a href="/alpinestars">
                        <img
                          class="logo"
                          src="/content/assets/logos/logo-alpinestars.svg"
                          alt="alpinestars"
                        >
                      </a>
                    </h3>
                  </swiper-slide>

                  <swiper-slide class="brand swiper-slide swiper-slide-prev">
                    <img
                      class="background"
                      src="/content/images/brands-bg/fox_bg.jpg"
                      
                    >
                    <h3>
                      <a href="/fox">
                        <img
                          class="logo"
                          src="/content/assets/logos/logo-fox.svg"
                          alt="fox"
                        >
                      </a>
                    </h3>
                  </swiper-slide>

                  <swiper-slide class="brand swiper-slide swiper-slide-prev">
                    <img
                      class="background"
                      src="/content/images/brands-bg/leatt_bg.jpg"
                    >
                    <h3>
                      <a href="/leatt">
                        <img
                          class="logo"
                          src="/content/assets/logos/logo-leatt.svg"
                          alt="leatt"
                        >
                      </a>
                    </h3>
                  </swiper-slide>

                  <swiper-slide class="brand swiper-slide swiper-slide-prev">
                    <img
                      class="background"
                      src="/content/images/brands-bg/airoh_bg.jpg"
                    >
                    <h3>
                      <a href="/airoh">
                        <img
                          class="logo"
                          src="/content/assets/logos/logo-airoh.svg"
                          alt="airoh"
                        >
                      </a>
                    </h3>
                  </swiper-slide>

                  <swiper-slide class="brand swiper-slide swiper-slide-prev">
                    <img
                      class="background"
                      src="/content/images/brands-bg/thor_bg.jpg"
                    >
                    <h3>
                      <a href="/thor">
                        <img
                          class="logo"
                          src="/content/assets/logos/logo-thor.svg"
                          alt="thor"
                        >
                      </a>
                    </h3>
                  </swiper-slide>
                </swiper-container>
              </ClientOnly>
            </div>
          </div>
        </div>
      </div>
    </aside>
  </div>
</template>

<style scoped>
/* Swiper Element creates its own shadow DOM, but you can style the slides normally */
.container {
  max-width: 1280px;
  width: 95%;
  margin: 0px auto;
}
.brands-block h2 {
  font-size: 1.5em;
  font-weight: 900;
  text-align: center;
  text-transform: uppercase;
  margin: 30px 0px 50px;
}

.brands-block {
  background-color: rgb(245, 245, 245);
  padding: 40px 0px;
}
.brand {
  display: flex;
  flex-direction: column;
  position: relative;
}
.background {
  width: 100%;
  height: auto;
  display: block;
}
.brands-block__container .brands-container .brand {
  align-items: center;
  background-color: rgba(0, 0, 0, 0.024);
  background-repeat: no-repeat;
  background-size: cover;
  display: flex;
  flex-shrink: 0;
  height: 340px;
  justify-content: center;
  position: relative;
  width: 270px;
  background-position: 50% center;
}
.brands-block__container .brands-container .brand .background {
  filter: brightness(1);
  height: 100%;
  object-fit: cover;
  position: absolute;
  width: 100%;
}
.brands-block__container .brands-container .brand h3 {
  margin: 0px;
}
.brands-block__container .brand img.logo {
  display: block;
  filter: brightness(5);
  height: 95px;
  width: 203px;
}
</style>

