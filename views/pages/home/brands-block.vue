<script setup lang="ts">
import { register } from "swiper/element/bundle"
import { onMounted } from "vue"

// Breakpoints must be passed as a stringified JSON object for Web Components
const swiperBreakpoints = {
  320: { slidesPerView: 1.2, spaceBetween: 10 },
  640: { slidesPerView: 2.5, spaceBetween: 10 },
  1024: { slidesPerView: 3.5, spaceBetween: 10 },
  1280: { slidesPerView: 5, spaceBetween: 10 },
}

onMounted(() => {
  register()
})
</script>

<template>
  <div id="home-block-11" class="block-container">
    <aside block-id="2412" block-name="Moto outstanding brands" section="home" class="brands-block">
      <div class="container">
        <div class="row">
          <div class="col s12 l12">
            <h2>Marcas destacadas</h2>
            <div class="swiper-container brands-block__container swiper-container-initialized swiper-container-horizontal swiper-container-pointer-events">

              <ClientOnly>
                <swiper-container
                  :breakpoints="swiperBreakpoints"
                  class="brands-container owl-carousel swiper-wrapper"
                >
                  <swiper-slide class="brand swiper-slide swiper-slide-prev">
                    <img src="https://cf-cdn.motocard.com/cdn-cgi/image/w=270,h=340,q=91,fit=cover,f=auto/brands/road/bg-77.jpg" loading="lazy" class="background">
                    <h3>
                      <a href="/alpinestars"><img src="https://cf-cdn.motocard.com/brands/logo-77.svg" alt="alpinestars" loading="lazy" class="logo"></a>
                    </h3>
                  </swiper-slide>

                  <swiper-slide class="brand">
                    <img src="https://cf-cdn.motocard.com/cdn-cgi/image/w=270,h=340,q=91,fit=cover,f=auto/brands/road/bg-78.jpg" loading="lazy" class="background">
                    <h3>
                      <a href="/shoei"><img src="https://cf-cdn.motocard.com/brands/logo-78.svg" alt="shoei" loading="lazy" class="logo"></a>
                    </h3>
                  </swiper-slide>

                  <swiper-slide class="brand">
                    <img src="https://cf-cdn.motocard.com/cdn-cgi/image/w=270,h=340,q=91,fit=cover,f=auto/brands/road/bg-79.jpg" loading="lazy" class="background">
                    <h3>
                      <a href="/dainese"><img src="https://cf-cdn.motocard.com/brands/logo-79.svg" alt="dainese" loading="lazy" class="logo"></a>
                    </h3>
                  </swiper-slide>

                  <swiper-slide class="brand">
                    <img src="https://cf-cdn.motocard.com/cdn-cgi/image/w=270,h=340,q=91,fit=cover,f=auto/brands/road/bg-82.jpg" loading="lazy" class="background">
                    <h3>
                      <a href="/agv"><img src="https://cf-cdn.motocard.com/brands/logo-82.svg" alt="agv" loading="lazy" class="logo"></a>
                    </h3>
                  </swiper-slide>

                  <swiper-slide class="brand">
                    <img src="https://cf-cdn.motocard.com/cdn-cgi/image/w=270,h=340,q=91,fit=cover,f=auto/brands/road/bg-86.jpg" loading="lazy" class="background">
                    <h3>
                      <a href="/kappa"><img src="https://cf-cdn.motocard.com/brands/logo-86.svg" alt="givi" loading="lazy" class="logo"></a>
                    </h3>
                  </swiper-slide>

                  <swiper-slide class="brand">
                    <img src="https://cf-cdn.motocard.com/cdn-cgi/image/w=270,h=340,q=91,fit=cover,f=auto/brands/road/bg-106.jpg" loading="lazy" class="background">
                    <h3>
                      <a href="/shark"><img src="https://cf-cdn.motocard.com/brands/logo-106.svg" alt="shark" loading="lazy" class="logo"></a>
                    </h3>
                  </swiper-slide>

                  <swiper-slide class="brand">
                    <img src="https://cf-cdn.motocard.com/cdn-cgi/image/w=270,h=340,q=91,fit=cover,f=auto/brands/road/bg-293.jpg" loading="lazy" class="background">
                    <h3>
                      <a href="/hjc"><img src="https://cf-cdn.motocard.com/brands/logo-293.svg" alt="hjc" loading="lazy" class="logo"></a>
                    </h3>
                  </swiper-slide>

                  <swiper-slide class="brand">
                    <img src="https://cf-cdn.motocard.com/cdn-cgi/image/w=270,h=340,q=91,fit=cover,f=auto/brands/road/bg-83.jpg" loading="lazy" class="background">
                    <h3>
                      <a href="/arai"><img src="https://cf-cdn.motocard.com/brands/logo-83.svg" alt="arai" loading="lazy" class="logo"></a>
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
