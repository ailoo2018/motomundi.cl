<script setup lang="ts">
import { register } from 'swiper/element/bundle'
import { getImageUrl } from "@core/utils/formatters"
import { SwiperSlide } from "swiper/vue"
import { ProductHelper } from "@/models/products"

const props = defineProps(
  {
    error: {
      type: String,
    },
  },
)

const colorSelect = ref(null)
const sizeSelect = ref(null)

const product = defineModel({
  type: Object,
})

product.value.selectedVariant = null

if(!ProductHelper.requiresFeatureSelect(product.value)){
  product.value.selectedVariant = product.value.productItems[0]
}


watch( () => props.error, () => {
  // determine which feature selection is missing
  console.log("error trying to submit, missing selection")
  if(ProductHelper.requiresColorSelect(product.value) && !selectedColor.value ){
    colorSelect.value.validate()
  }

  if(ProductHelper.requiresSizeSelect(product.value) && !selectedSize.value ){
    sizeSelect.value.validate()
  }



})


const selectedSize = ref()
const selectedColor = ref()

const onFeatureSelect = () => {
  const sizeId = (selectedSize.value && selectedSize.value.id > 0) ? selectedSize.value.id :  0
  const colorId = (selectedColor.value && selectedColor.value.id > 0) ? selectedColor.value.id : 0

  const pit = ProductHelper.getProductItemByFeatures(product.value, [colorId, sizeId])

  product.value.selectedVariant = null
  if(pit)
    product.value.selectedVariant = pit
}

const colors = computed(() => {
  if(!product?.value.features)
    return []

  return product?.value.features.filter(f => f.type === 1)
})

const sizes = computed(() => {
  if(!product?.value.features)
    return []

  return product?.value.features.filter(f => f.type === 0)
})


watch( selectedSize, () => {
  onFeatureSelect()
  console.log("size changed:" + product.value.selectedVariant)
})

watch( selectedColor, () => {
  onFeatureSelect()
  console.log("color changed:" + + product.value.selectedVariant)
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
          v-for="img in product.images"
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
          <strong>{{ product.fullName }}</strong>
        </p>
      </div>
      <div class="pack-item__description">
        <p>
          {{ product.fullName }}…
        </p>
        <a
          class="mtc-link nuxt-link-active nuxt-link-exact-active"
          data-dr="true"
          href="{{product.url}}"
        >
          <button>Leer más</button>
        </a>
      </div>
    </div>
    <div class="pack-item__size">
      <VSelect
        v-if="colors.length > 0"
        ref="colorSelect"
        v-model="selectedColor"
        class="pack-select-color mb-2"
        :items="colors"
        item-id="id"
        item-title="name"
        placeholder="Seleccione um color"
        :rules="[v => !!v || 'Requerido']"
        return-object
      />



      <VSelect
        v-if="sizes.length > 0"
        ref="sizeSelect"
        v-model="selectedSize"
        class="pack-select-size"
        :items="sizes"
        item-id="id"
        item-title="name"
        placeholder="Seleccione uma talla"
        :rules="[v => !!v || 'Requerido']"
        return-object
      />
    </div>
    <span class="pack-item__price">
      <span>
        <span
          v-if="product.discount > 0"
          class="strike"
        >
          {{ formatMoney(product.minPrice) }}
        </span>
        <strong>
          {{ formatMoney( product.minPrice - (product.discount ?? 0) ) }}
        </strong>
      </span>
    </span>
  </div>
</template>

<style scoped lang="scss">
#packmodal .pack-item__info {
  padding: 20px 30px;
}

#packmodal .pack-item__price, #packmodal .pack-item__price > span {
  align-items: center;
  display: flex;
  justify-content: center;
  gap: 8px;
}

#packmodal .pack-item__price .strike {
  color: rgb(214, 0, 28);
  display: inline-block;
  font-size: 13px;
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
