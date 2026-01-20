<script setup lang="ts">
import emptyImage from "@images/empty-image.avif"

const props = defineProps(
  {
    product: {
      type: Object,
      required: true,
    },
    showButton: {
      type: Boolean,
      required: false,
      default: () => false
    }
  },
)


</script>

<template>
  <article class="item">
    <section>

      <button        
        class="add-to-favs"
      >
        <svg
          class="sprite-line-icons add"
          width="29"
          height="24"
        ><title>
           Añadir a favoritos</title>
          <use  />
        </svg>
      </button>
      <NuxtLink :to="props.product.url" class="mtc-link">

        <div class="product-tags" />
        <span class="product-image ">

          <VImg
            width="232"
            height="232"
            :src="'https://www.motomundi.cl' + product.imageUrl"
            :alt="product.name"
            class="cdn-img mt-3 "
          >
            <template #error>
              <VImg
                :src="emptyImage"
                :aspect-ratio="1"
                class="mx-auto rounded"
              />
            </template>
          </VImg>
        </span>
      </NuxtLink>
      <section class="item__info">
        <NuxtLink :to="props.product.url" class="mtc-link">
          <div class="item__name">
            <span class="item__rating">
              <span class="rating-block">
                <span>
                  <img
                    src="/content/images/stars/10.webp"
                    class="cdn-img v-lazy-image v-lazy-image-loaded"
                    alt="8"
                    width="68"
                    height="12"
                    srcset=""
                  > <noscript />
                </span>
              </span>
            </span>
            <h3 class="heading-tag">
              <span>{{product.brand.name}}</span>
              <strong>{{product.name}}</strong>
            </h3>
          </div>
        </NuxtLink>
        <NuxtLink :to="props.product.url" class="mtc-link">
          <span class="item__bottom">
            <span
              class="item__price"
              style="font-size: 14px;"
            >
              {{formatMoney(product.minPrice)}}
            </span>
          </span>
        </NuxtLink>
      </section>
      <div class="item__look" v-if="showButton">
        <button
          class="item__add-to-cart"
          onclick="window.location='{{props.product.url}}';"
        >
          <span>Añadir</span>
        </button>
      </div>
    </section>
  </article>
</template>

<style scoped lang="scss">
/* product item */
.product-list .products .item {
  background-color: #fff;
  margin-bottom: 5px;
}

.item > div, .item > section {
  align-items: stretch;
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: space-between;
}

.add-to-favs {
  background-color: transparent;
  height: 24px;
  opacity: 0;
  padding: 0;
  position: absolute;
  right: 10px;
  top: 15px;
  -webkit-transform: scale(0);
  transform: scale(0);
  -webkit-transform-origin: center center;
  transform-origin: center center;
  transition: all .2s ease;
  width: 29px;
}

.add-to-favs svg {
  height: 24px;
  transition: all .2s ease;
  width: 29px;
}

.product-tags {
  display: flex;
  flex-wrap: wrap;
}

.product img {
  display: inline-block;
  vertical-align: middle;
  max-width: 100%;
  height: auto;
  -ms-interpolation-mode: bicubic;
}

.item .item__info {
  padding: 0 20px;
}

.item .item__name {
  justify-content: flex-end;
  margin: 35px 0 15px;
  position: relative;
}

.item .item__rating .rating-block {
  -webkit-transform: scale(.8);
  transform: scale(.8);
  -webkit-transform-origin: left;
  transform-origin: left;
}

.rating-block {
  display: inline-block;
  overflow: hidden;
}

.item .rating-block img {
  display: block;
  height: 12px;
  width: 68px;
}
.item .heading-tag {
  border-bottom: 1px solid #d8d8d8;
  color: #000;
  display: flex;
  flex-direction: column;
  font-size: 10px;
  font-weight: 500;
  justify-content: flex-end;
  line-height: 13px;
  margin: 0;
  padding-bottom: 12px;
  text-transform: uppercase;
}
.item .heading-tag > span {
  color: #333;
  display: inline-block;
  font-weight: 300;
  line-height: 1.1;
  margin-bottom: 2px;
}
.item .heading-tag strong {
  display: block;
  font-size: 13px;
  font-weight: 700;
}

.item__bottom {
  align-items: center;
  position: relative;
  /* border-top: 1px solid #d8d8d8; */
  display: block;
  display: flex;
  justify-content: space-between;
  margin-top: 6px;
  padding-top: 6px;
}
.item__price {
  color: #000;
  font-size: 14px;
  font-weight: 800;
  line-height: 20px;
}

.item__look{
  align-items: center;
  display: flex;
  flex-direction: column;
  padding: 0 12px 12px;
}

.item__look .item__add-to-cart {
  align-items: center;
  background-color: #000;
  color: #fff;
  display: inline-flex;
  font-size: 11px;
  font-weight: 600;
  justify-content: center;
  letter-spacing: .5px;
  padding: 10px 16px;
  text-align: center;
  text-transform: uppercase;
  width: 100%;
}
.item{
  border: 1px solid #d8d8d8;
  box-sizing: border-box;
  height: 100%;
  overflow: hidden;
  padding: 0;
}
@media only screen and (min-width: 993px) {
  .row .col.lc5 .item {
    padding: 30px 5px 15px;
  }
}
</style>
