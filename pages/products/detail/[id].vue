<script setup>
import { useConfigStore } from "@core/stores/config"

import ShareComponent from "@/views/pages/products/share-component.vue"
import Breadcrumbs from "@/views/pages/products/breadcrumbs.vue"
import ProductImagesCarousel from "@/views/pages/products/product-images-carousel.vue"
import ProductBuyPanel from "@/views/pages/products/product-buy-panel.vue"
import PreProductBanner from "@/views/pages/products/pre-product-banner.vue"
import Recommend from "@/views/pages/products/recommend.vue"

const store = useConfigStore()
const productForm = ref()

const route = useRoute()

const config = useRuntimeConfig()

const { data: product, pending } = await useFetch(`/api/product/${route.params.id}`)


store.skin = 'default'
definePageMeta({
  layout: 'motomundi',
  public: true,

})
</script>

<template>


  <article v-if="product">
    <div class="container product">
      <section class="row product-main ">
        <div
          class="col s12 m7 l7"
          style="padding-right: 20px;"
        >
          <div class="s12">
            <div>
              <Breadcrumbs />

              <!-- product-title -->
              <div class="product-title">
                <div class="product-title__container">
                  <h1>
                    {{product.brand.name}}
                    <strong>{{product.name}}</strong>
                  </h1>
                  <a
                    href="/hjc"
                    data-dr="true"
                    class="mtc-link"
                  >
                    <span>
                      <img
                        onerror="this.style.display='none'"
                        :src="`/content/images/brands/${product.brand.id}.webp`"
                        srcset=""
                        alt="HJC"
                        width="98"
                        height="50"
                        class="cdn-img"
                      >
                    </span>
                  </a>
                </div>
              </div>
              <!-- /product-title -->
            </div>
          </div>

          <ShareComponent />
          <!-- /share -->

          <ProductImagesCarousel :product="product" />
        </div>

        <div class="col s12 m5 l5">
          <PreProductBanner />
          <ProductBuyPanel :product="product" />
        </div>

        <div class="packs-container" />

        <div
          tabindex="-1"
          class="pswp"
          role="dialog"
          aria-hidden="true"
        >
          <div class="pswp__bg" />
          <div class="pswp__scroll-wrap">
            <div class="pswp__container">
              <div class="pswp__item" />
              <div class="pswp__item" />
              <div class="pswp__item" />
            </div>
            <div class="pswp__ui pswp__ui--hidden">
              <div class="pswp__top-bar">
                <div class="pswp__counter" />
                <button
                  title="Close (Esc)"
                  class="pswp__button pswp__button--close"
                />
                <button
                  title="Share"
                  class="pswp__button pswp__button--share"
                />
                <button
                  title="Toggle fullscreen"
                  class="pswp__button pswp__button--fs"
                />
                <button
                  title="Zoom in/out"
                  class="pswp__button pswp__button--zoom"
                />

                <div class="pswp__preloader">
                  <div class="pswp__preloader__icn">
                    <div class="pswp__preloader__cut">
                      <div class="pswp__preloader__donut" />
                    </div>
                  </div>
                </div>
              </div>
              <div class="pswp__share-modal pswp__share-modal--hidden pswp__single-tap">
                <div class="pswp__share-tooltip" />
              </div>
              <button
                title="Previous (arrow left)"
                class="pswp__button pswp__button--arrow--left"
              />
              <button
                title="Next (arrow right)"
                class="pswp__button pswp__button--arrow--right"
              />
              <div class="pswp__caption">
                <div class="pswp__caption__center" />
              </div>
            </div>
          </div>
        </div>
      </section>


      <Recommend :product="product" />

    </div>
  </article>
</template>

<style scoped lang="scss">
.container {
  margin: 0 auto;
  max-width: 1280px;
  width: 95%;
}

.row:after {
  clear: both;
  content: "";
  display: table;
}

.product-main {
  background-color: #fff;
  padding-top: 15px;
  /* margin: 0 0 0 16px; */
  margin: 0;
}


.product .share-on__networks.show {
  visibility: visible;
}

.row .col.s11, .row .col.s12 {
  left: auto;
  margin-left: auto;
  right: auto;
}

.product-title .product-title__container {
  align-items: center;
  display: flex;
  justify-content: space-between;
}

.product-title h1 {
  font-size: 24px;
  font-weight: 400;
  line-height: 29px;
  margin: 8px 0;
  max-width: 85%;
  text-transform: uppercase;
}

.product-title a {
  flex: 0 1 auto;
  min-height: 40px;
  width: auto;
}

.share-on__container {
  position: relative;
}


.row .col {
  box-sizing: border-box;
  float: left;
  min-height: 1px;
  padding: 0 .375rem;
}

a, span.mtc-link {
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  color: #d6001c;
  cursor: pointer;
  -webkit-text-decoration: none;
  text-decoration: none;
}

.row .col.s12 {
  width: 100%;
}


img {
  max-width: 100%;
}

.product img {
  display: inline-block;
  vertical-align: middle;
  max-width: 100%;
  height: auto;
  -ms-interpolation-mode: bicubic;
}



@media only screen and (min-width: 993px) {
  .row .col.l5, .row .col.l6 {
    left: auto;
    margin-left: auto;
    right: auto;
  }
}

@media only screen and (min-width: 993px) {
  .row .col.l5 {
    width: 41.6666666667%;
  }
}

@media only screen and (min-width: 993px) {
  .row .col.l7, .row .col.l8 {
    left: auto;
    margin-left: auto;
    right: auto;
  }
}

@media only screen and (min-width: 601px) {
  .row .col.m7, .row .col.m8 {
    left: auto;
    margin-left: auto;
    right: auto;
  }
}

@media only screen and (min-width: 993px) {
  .row .col.l7, .row .col.l8 {
    left: auto;
    margin-left: auto;
    right: auto;
  }
}

@media only screen and (min-width: 993px) {
  .row .col.l7 {
    width: 58.3333333333%;
  }
}
</style>
