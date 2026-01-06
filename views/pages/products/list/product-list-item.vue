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
      default: () => false,
    },
  },
)
</script>


<template>
  <article class="item">
    <section>
      <button
        class="add-to-favs "
        ng-click="addRemoveToWishList(3306268, $event);"
      >
        <svg
          class="add icon sprite-line-icons"
          height="24"
          width="29"
          xmlns="http://www.w3.org/2000/svg"
        >
          <title>Añadir a favoritos</title>
          <use
            href="/content/svg/motomundi.svg#i-icon-favorite"
            xlink:href="/content/svg/motomundi.svg#i-icon-favorite"
          />
        </svg>
      </button>
      <a
        class="mtc-link"
        data-dr="true"
        :href="props.product.url"
      >
        <div class="product-tags" />
        <div class="special-tag" />
        <span class="product-image">

          <VImg
            max-width="232"

            :src="getImageUrl( product.image, 300, getDomainId())"
            :alt="product.name"
            class="cdn-img mb-1"
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


      </a>
      <section>
        <div class="prod-list-miniatures" />
      </section>

      <section class="item__info">
        <a
          class="mtc-link"
          data-dr="true"
          :href="props.product.url"
        >
          <div class="item__name">
            <span class="item__sizes">
              <!-- Tallas: XS, S, M, L, XL, XXL -->
            </span>
            <span class="item__rating">
              <span class="rating-block">
                <span>
                  <img
                    alt="10"
                    class="cdn-img v-lazy-image v-lazy-image-loaded"
                    height="12"
                    src="/content/images/stars/10.webp"
                    srcset="/content/images/stars/10.webp 1x, /content/images/stars/10.webp 2x"
                    width="68"
                  >
                  <noscript />
                </span>
              </span>
            </span>
            <h3 class="heading-tag">
              <span>{{product.brand.name }}</span>
              <strong>{{product.name  }}</strong>
            </h3>
          </div>
        </a>

        <a
          class="item__price-info mtc-link"
          data-dr="true"
          :href="props.product.url"
        >
          <span class="item__bottom">
            <span
              class="item__price"
              style="font-size: 14px;"
            >
              {{ formatMoney( product.minPrice ) }}
            </span>
            <span class="pr-2">
              <img src="/content/images/youtube_icon.svg">
            </span>
          </span>
        </a>
      </section>
    </section>
  </article>
</template>

<style scoped scss>
.item > div, .item > section {
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

.product-tags {
  display: flex;
  flex-wrap: wrap;
}

.special-tag {
  box-sizing: border-box;
  display: flex;
  height: 100%;
  justify-content: center;
  position: absolute;
  right: -5px;
  top: 0;
  -webkit-writing-mode: vertical-lr;
  -ms-writing-mode: tb-lr;
  writing-mode: vertical-lr;
}

.item img {
  display: block;
  margin-bottom: 4px;
  max-width: 300px;
  width: 100%;
}


.item {
  position: relative;
  border: 1px solid #d8d8d8;
  box-sizing: border-box;
  height: 100%;
  padding: 40px 5px 20px;
}

.product-list .products .item {
  background-color: #fff;
  margin-bottom: 5px;
}

.prod-list-miniatures {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding-top: 4px;
  gap: 3px;
}

.item .item__name {
  justify-content: flex-end;
  margin: 35px 0 15px;
  position: relative;
}

.rating-block {
  display: inline-block;
  overflow: hidden;
}

.item .item__rating .rating-block {
  -webkit-transform: scale(.8);
  transform: scale(.8);
  -webkit-transform-origin: left;
  transform-origin: left;
}
.item .item__sizes {
  bottom: 2px;
  color: gray;
  font-size: 10px;
  left: 0;
  opacity: 0;
  overflow: hidden;
  position: absolute;
  right: 0;
  text-overflow: ellipsis;
  -webkit-transform: translateX(5%);
  transform: translateX(5%);
  -webkit-transform-origin: left center;
  transform-origin: left center;
  transition: opacity .2s ease-out, -webkit-transform .2s ease-out;
  transition: transform .2s ease-out, opacity .2s ease-out;
  transition: transform .2s ease-out, opacity .2s ease-out, -webkit-transform .2s ease-out;
  white-space: nowrap;
}
.item img {
  display: block;
  margin-bottom: 4px;
  max-width: 300px;
  width: 100%;
}


.item .rating-block img {
  display: block;
  height: 12px;
  width: 68px;
}
.item .item__sizes {
  color: #999;
  display: block;
  font-size: 9px;
}

.item .item__sizes, .item h1 {
  font-weight: 500;
  overflow: hidden;
  text-overflow: ellipsis;
}

.item__price {
  color: #000;
  font-size: 14px;
  font-weight: 800;
  line-height: 20px;
}

.item__bottom {
  position: relative;
}

.item__bottom {
  align-items: center;
  border-top: 1px solid #d8d8d8;
  display: block;
  display: flex;
  justify-content: space-between;
  margin-top: 6px;
  padding-top: 6px;

}

.item .heading-tag strong {
  display: block;
  font-size: 13px;
  font-weight: 700;
}

@media only screen and (min-width: 993px) {
  .row .col.lc5 .item .item__info .item__name {
    margin: 0 0 15px;
  }
}


@media only screen and (min-width: 993px) {
  .row .col.lc5 .item .item__info {
    padding: 0 10px;
  }
}
</style>

