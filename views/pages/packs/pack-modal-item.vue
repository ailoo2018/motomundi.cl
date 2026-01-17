<script setup lang="ts">
import { register } from 'swiper/element/bundle'
import { getImageUrl } from "@core/utils/formatters"
import { SwiperSlide } from "swiper/vue"

const props = defineProps({
  packProd: {
    type: Object,
  },
})

register()
</script>

<template>
  <div class="pack-item">
    <button
      class="pack-item__change"
      style="display: none;"
    >
      <span>Cambiar producto</span>
    </button>

    <ClientOnly>
      <swiper-container
        class="container text-center pt-2"
        events-prefix="swiper-"
      >
        <swiper-slide
          v-for="img in packProd.images"
          :key="img.image"
        >
          <img
            class="cdn-img"
            width="150"
            height="150"

            style="width: 150px;height:150px;"
            :src="getImageUrl(img.image, 300, getDomainId())"
          >
        </swiper-slide>
      </swiper-container>
    </ClientOnly>


    <div class="pack-item__info">
      <button
        class="button small button--secondary"
        style="display: none;"
      >
        <span>Personalizar</span>
        <span style="display: none;">
          <svg
            class="sprite-line-icons"
            width="10"
            height="8"
          >
            <use href="/content/svg/motomundi.svg#i-icon-check" />
          </svg>
          Personalizado
        </span>
      </button>
      <div class="pack-item__name">
        <p>
          <strong>{{ packProd.productName }}</strong>
        </p>
      </div>
      <div class="pack-item__description">
        <p>
          {{ packProd.productName }}…
        </p>
        <a
          class="mtc-link nuxt-link-active nuxt-link-exact-active"
          data-dr="true"
          href="{{packProd.url}}"
        >
          <button>Leer más</button>
        </a>
      </div>
    </div>
    <div class="pack-item__size">
      <select
        v-if="packProd.availableColors?.length > 0"
        v-model="packProd.selectedColor.id"
        class="pack-select-color sm ng-pristine ng-untouched ng-valid ng-not-empty "
        ng-class="'selectPackColor' + pack.id + '_' + packProd.id "
        ng-options="option.id as option.name for option in packProd.availableColors"
        ng-change="onChangeColor(pack, packProd)"
        data-content="Antes de añadir a la cesta debes seleccionar un color"
        data-placement="right"
      >
        <option
          label="SELECCIONAR COLOR"
          value="id:0"
          selected="selected"
        >
          SELECCIONAR COLOR
        </option>
      </select>

      <select
        class="pack-select-size sm ng-pristine ng-untouched ng-valid ng-not-empty"
        ng-if="packProd.availableSizes.length > 0"
        ng-class="'selectPackSize' + selectedPack.id + '_' + packProd.id"
        ng-model="packProd.selectedSize.id"
        ng-options="option.id as option.name for option in packProd.availableSizes"
        ng-change="onChangeSize(selectedPack, packProd)"
        data-content="Antes de añadir a la cesta debes seleccionar una talla"
        data-placement="bottom"
      >
        <option
          label="SELECCIONAR TALLA"
          value="id:0"
          selected="selected"
        >
          SELECCIONAR TALLA
        </option>
      </select>
    </div>
    <span class="pack-item__price">
      <span>
        <span
          ng-if="packProd.discount > 0"
          class="strike"
        >
          {{ packProd.basePrice }}
        </span>
        <strong>
          {{ packProd.finalPrice }}
        </strong>
      </span>
    </span>
  </div>
</template>

<style  lang="scss">
#packmodal .pack-item__info {
  padding: 20px 30px;
}


#packmodal .pack-grid__item, #packmodal .pack-item {
  box-shadow: rgba(0, 0, 0, 0.07) 0px 58px 36px, rgba(0, 0, 0, 0.05) 0px 39px 33px, rgba(0, 0, 0, 0.04) 0px 16px 17px, rgba(0, 0, 0, 0.04) 0px 4px 10px, rgba(0, 0, 0, 0.03) 0px -2px 5px, rgba(0, 0, 0, 0.02) 0px -6px 2px;
  display: flex;
  flex-direction: column;
  font-weight: 500;
  height: 515px;
  max-height: 515px;
  max-width: 265px;
  position: relative;
  scroll-snap-align: center;
  background: rgb(255, 255, 255);
  border-width: 1px;
  border-style: solid;
  border-color: rgb(203, 203, 203);
  border-image: initial;
  border-radius: 9px;
  flex: 0 0 auto;
}

#packmodal .pack-item__size {
  margin-top: auto;
  justify-self: flex-end;
  width: 100%;
  padding: 20px 30px;
}

#packmodal .pack-item__price, #packmodal .pack-item__price > span {
  align-items: center;
  display: flex;
  justify-content: center;
}

#packmodal .pack-item__info {
  padding-bottom: 0px;
  text-align: left;
}




#packmodal .pack-item__price {
  background-color: rgb(245, 245, 245);
  border-bottom-left-radius: 9px;
  border-bottom-right-radius: 9px;
  justify-self: flex-end;
  text-align: center;
  width: 100%;
  overflow: hidden;
  padding: 15px;
}

#packmodal .pack-item__price, #packmodal .pack-item__price > span {
  align-items: center;
  display: flex;
  justify-content: center;
}
</style>
