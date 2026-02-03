<script setup lang="ts">
import emptyImage from "@images/empty-image.avif"
import AddToFavsBtn from "@/components/AddToFavsBtn.vue"


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
    showMiniatures: {
      type: Boolean,
      default: () => true,
    },
  },
)


const onClickMiniture = img => {
  props.product.image = img.image
}

const imageError = ref(false)

const handleImageError = () => {
  $fetch("/api/product/create-images?id=" + props.product.id)
  imageError.value = true
}

watch(() => props.product.image, () => {
  imageError.value = false
})

const miniatures = computed(() => {
  if (!props.product?.images) return []

  // Create a Map where colorId is the key
  // This ensures only one image per colorId exists
  const uniqueImagesMap = new Map()

  props.product.images
    .filter(img => img.colorId > 0)
    .forEach(img => {
      // If you want the FIRST image found for that color, use:
      if (!uniqueImagesMap.has(img.colorId)) {
        uniqueImagesMap.set(img.colorId, img)
      }
    })

  const uniqueImages = Array.from(uniqueImagesMap.values())
  if (uniqueImages.length <= 1) {
    return []
  }


  return uniqueImages
})
</script>


<template>
  <article class="item">
    <section>
      <AddToFavsBtn :product="product" />

      <a
        class="mtc-link"
        :href="product.url"
      >
        <div class="product-tags">
          <span
            v-if="product.discountPercent > 0"
            class="tag product-tag product-tag--old product-tag--sales"
          >
            <span class="discount">Oferta -{{ Math.round(product.discountPercent) }}%</span>
          </span>
          <span
            v-if="product.isNew"
            class="tag product-tag product-tag--old product-tag--new"
          >
            <span class="discount">Novedad</span>
          </span>
        </div>
        <div class="special-tag" />
        <span class="product-image">

          <VImg
            v-if="!imageError"
            max-width="232"
            :src="getImageUrl( product.image, 300, getDomainId())"
            :alt="product.name"
            class="cdn-img mb-1"
            @error="handleImageError"
          >
            <template #error>
              <VImg
                :src="emptyImage"
                :aspect-ratio="1"
                class="mx-auto rounded"
              />
            </template>
          </VImg>
          <VImg
            v-else
            :src="emptyImage"
            :aspect-ratio="1"
            class="mx-auto rounded"
            max-width="232"
          />
        </span>


      </a>
      <section v-if="showMiniatures">
        <div class="prod-list-miniatures">
          <div
            v-for="img in miniatures"
            class="prod-list-miniatures-item"
          >
            <img
              :title="img.colorName"
              :src="getImageUrl(img.image, 50, getDomainId())"
              :alt="img.colorName"
              @click="onClickMiniture(img)"
              @mouseenter="onClickMiniture(img)"
            >
          </div>
        </div>
      </section>

      <section class="item__info">
        <a
          class="mtc-link"
          :href="props.product.url"
        >
          <div class="item__name">
            <span class="item__sizes">
              <!-- Tallas: XS, S, M, L, XL, XXL -->
            </span>
            <span class="item__rating">
              <span class="rating-block">
                <VRating
                  readonly
                  :color="product.rating > 0 ? 'primary' : '#ccc'"
                  :model-value="product.rating === 0 ? 5 : product.rating / 2"
                />
              </span>
            </span>
            <h3 class="heading-tag">
              <span>{{ product.brand.name }}</span>
              <strong>{{ product.name }}</strong>
            </h3>
          </div>
        </a>

        <a
          class="item__price-info mtc-link"
          :href="props.product.url"
        >
          <span class="item__bottom">
            <span
              class="item__price"
              style="font-size: 14px;"
            >
              {{ formatMoney(product.minPrice -product.discountAmount) }}
              <span
                v-if="product.discountAmount > 0"
                class="item__old-price strike"
                style="font-size: 10px;"
              >
                {{ formatMoney(product.minPrice) }}
              </span>
            </span>
            <span
              v-if="product.videos && product.videos.length > 0"
              class="pr-2"
            >
              <img src="/content/images/youtube_icon.svg">
            </span>
          </span>
        </a>
      </section>
    </section>
  </article>
</template>

<style>
.strike {
  -webkit-text-decoration: line-through;
  text-decoration: line-through;
}

.item__old-price {
  color: #000;
  font-size: 10px;
  font-weight: 500;
  left: 0;
  line-height: 16px;
  opacity: .4;
  position: absolute;
  top: -1px;
}

article.item {
  position: relative;
  border: 1px solid #d8d8d8;
  box-sizing: border-box;
  height: 100%;
  padding: 15px 5px 10px;
}


.item .heading-tag {

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


.item__info {
  display: flex;
  flex-direction: column;
}

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
  position: absolute;
  z-index: 2;
  top: 10px;
  left: -2px;
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

.item .item__rating {
  height: 20px;
}

.item .item__rating .rating-block {
  -webkit-transform: scale(.7);
  transform: scale(.7);
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
  align-items: center;
  border-top: 1px solid #d8d8d8;
  display: block;
  display: flex;
  justify-content: space-between;
  margin-top: 6px;
  padding-top: 10px;

}

.item .heading-tag strong {
  display: block;
  font-size: 13px;
  font-weight: 700;
}

.prod-list-miniatures-item {
  cursor: pointer;
}


/**** tags ******/

.tag.product-tag.product-tag--crazydays, .tag.product-tag.product-tag--offer, .tag.product-tag.product-tag--sales {
  background-color: #d6001c;
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

@media (max-width: 993px) {
  article.item {
    position: relative;
    border: 1px solid #d8d8d8;
    box-sizing: border-box;
    height: 100%;
    padding: 6px;
  }

  .item .item__name {
    margin: 5px 0 0 0;
  }

  li .mtc-link, li > a {
    color: #000;
    display: inline-block;
    font-size: 12px;
    font-weight: 500;
    letter-spacing: 0;
    /* line-height: 1.05em; */
    padding: 6px;
    /*padding: 6px 18px;*/
    text-transform: uppercase;
  }
}
</style>

