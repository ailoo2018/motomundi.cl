<script setup>
import ProductListItem from "@/views/pages/products/list/product-list-item.vue"

const { isMobile, isTablet, isDesktop } = useDevice()

const props = defineProps({
  widget: {
    type: Object,
    required: true,
  },
})

const collectionId = computed(() => props.widget.configuration.collection.id)

const { data: rs, pending } = await useFetch(`/api/product/collection`, {
  query: { collectionId, limit: 30 },
  key: `products-fetch-${collectionId.value}`,
})

const products = computed(() => {
  const rawProducts = rs.value?.products || []

  if (rawProducts.length === 0) return []

  // Create a shallow copy to avoid mutating the original fetched data
  const shuffled = [...rawProducts]

  // Fisher-Yates Shuffle Algorithm
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));

    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }

  // 3. Return only the first 10
  return shuffled.slice(0, 4)
})
</script>

<template>
  <div
    :id="`home-block-${widget.id}`"
    class="block-container"
  >
    <section
      class="show-products-block"
      section="home"
      :title="widget.configuration.title"
    >
      <div class="container">
        <div class="row">
          <div class="col s12 l12">
            <section class="product-list__title">
              <h2>{{ widget.configuration.title }}</h2>
              <a
                href="{{widget.configuration.collection.url}}"
                class="button button--primary hide-on-small-and-down mtc-link"
              >
                <span>Ver todo</span>
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
              </a>
            </section>
            <section class="home-products-list">
              <div class="product-list">
                <div>
                  <div class="row products content-section-banner has-banner">
                    <div
                      data-promotion-id="bannerList"
                      class="col s6 m8 lc5 banner banner-list banner--2x1"
                    >
                      <a
                        :href="widget.configuration.bannerLink"
                        class="search-results__banner mtc-link banner__theme--light"
                      >
                        <div class="banner__container">
                          <span
                            v-if="widget.configuration.bannerImage"
                            class="banner__image"
                          >

                            <img
                              :src="getBaseCDN() + widget.configuration.bannerImage"
                              srcset=""
                              alt="Promo banner"
                              class="cdn-img"
                            >

                          </span>
                          <span class="banner__background">
                            <img
                              :src="getBaseCDN() + widget.configuration.backgroundImage"
                              srcset=""
                              alt="Promo banner"
                              class="cdn-img"
                            >

                          </span>
                        </div>

                      </a>
                    </div>

                    <div
                      v-for="(product, index) in products"
                      class="col s6 m4 lc5 "
                    >
                      <ProductListItem v-if="isMobile ? index < 4 : index < 3" :product="product" />
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.block-container {
  background-color: rgb(245, 245, 245);
}
.row .col {
  box-sizing: border-box;
  padding: 0 .375rem;
}
.block-container {
  background-color: rgb(245, 245, 245);
}
.container {
  max-width: 1280px;
  width: 95%;
  margin: 0px auto;
}

/******** product list ***/



.product-list__title {
  align-items: center;
  display: flex;
  justify-content: space-between;
  margin: 70px 0px 50px;
}

.product-list__title h2 {
  font-size: 36px;
  font-weight: 900;
  text-transform: uppercase;
  margin: 0px;
}
.button.button--primary {
  background-color: #d6001c;
  border-color: #d6001c;
  color: #fff;
}
.button .sprite-line-icons {
  transition: all .2s ease-in-out;
  vertical-align: -2px;
}
.button.button--primary use {
  stroke: #fff;
}
.product-list__title {
  align-items: center;
  display: flex;
  justify-content: space-between;
  margin: 70px 0px 50px;
}
.home-products-list .products {
  position: relative;
}
.show-products-block .row {
  margin-bottom: 0px;
}
.button {
  background: none;
  border: 2px solid #000;
  box-sizing: border-box;
  color: #000;
  display: inline-block;
  font-size: 10px;
  font-weight: 700;
  letter-spacing: .5px;
  overflow: hidden;
  padding: 13px 25px;
  position: relative;
  text-align: center;
  text-transform: uppercase;
  transition: all .2s ease-in-out;
  z-index: 1;
}
.block-container {
  background-color: rgb(245, 245, 245);
}
.banner__image {
  z-index: 1;
}
.home-products-list .products {
  position: relative;
}
.product-list .products.has-banner {
  display: grid;
  grid-auto-flow: dense;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  grid-template-rows: auto;
}

.product-list .products.has-banner > .col {
  justify-self: stretch;
  width: 100% !important;
}




.product-list .products.has-banner .col.banner.banner--2x1 {
  align-self: stretch;
  min-height: 376px;
  grid-column: span 2;
  grid-row: 1;
}



.product-list .products.has-banner .col.banner {
  height: calc(100% - 15px);
}
.search-results__banner {
  background-color: transparent;
  box-sizing: border-box;
  display: block;
  height: 100%;
  position: relative;
  text-align: center;
  border-radius: 6px;
  overflow: hidden;
  padding: 20px 5px;
  transition: 0.45s ease-out;
}
.search-results__banner .banner__image .cdn-img {
  max-height: 350px;
  max-width: 95%;
  width: auto;
}
.banner__background .cdn-img {
  background-color: rgb(245, 245, 245);
  height: 100%;
  left: 0px;
  object-fit: cover;
  object-position: center center;
  position: absolute;
  top: 0px;
  width: 100%;
  z-index: 0;
}

.banner__image {
  z-index: 1;
  position: relative;
}
.search-results__banner .banner__container {
  align-items: center;
  flex-direction: column;
  height: 100%;
  justify-content: center;
  display: flex !important;
}

.search-results__banner .banner__image .cdn-img {
  max-height: 350px;
  max-width: 95%;
  width: auto;
}

.home-products-list .row .col {
  margin-bottom: 10px;
}
.product-list .products.has-banner .col.banner {
  height: calc(100% - 15px);
}

@media only screen and (max-width: 600px) {
  .product-list__title h2 {
    font-size: 26px;
    margin-bottom: 10px;
  }

  .product-list .products.has-banner {
    grid-template-columns: 1fr 1fr;
  }
  .home-products-list .product-list .products.has-banner .col.banner.banner--2x1 {
    grid-column: 1 / span 2;
  }
}
</style>
