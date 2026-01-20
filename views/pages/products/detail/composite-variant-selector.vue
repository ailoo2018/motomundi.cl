<script setup lang="ts">
import { ProductFeatureType } from "@/models/products"

const selectedPit = defineModel({
  type: Object,
})


const props = defineProps(
  {
    product: {
      type: Object,
      required: true,
    },
  },
)

const getAvlSizes = product => {
  return product.features.filter(f => f.type === ProductFeatureType.Size)
}

const getAvlColors = product => {
  return product.features.filter(f => f.type === ProductFeatureType.Size)
}
</script>

<template>
  <span
    v-if="product.type === 1"
    id="composite-product"
  >

    <div class="row">
      <div class="col s12">
        <div class="product-sizes mt-5">
          <div
            v-for="assoc in product.composite"
            class="item mb-5"
          >

            <div class="product-sizes__header">
              <h2>
                <a
                  class="mtc-link"
                  data-dr="true"
                  :href="assoc.product.url"
                >
                  {{ assoc.product.fullName }}</a>
              </h2>
            </div>

            <div class="product-size__body">
              <div class="product-size__select d-flex gap-1">
                <div class="size-guide-wrapper" style="flex:0;">
                  <div>
                    <button
                      id="size-guide-button"
                      type="button"
                      class="size_guide_button"
                      style="min-width: 130px; height: 38px; padding: 0px;"
                    >
                      <span>
                        <svg
                          class="sprite-line-icons"
                          width="18"
                          height="8"
                        >
                          <use href="/content/images/svg/0b25363450c5afe3b3f9ba7fe4f4173b.svg#i-icon-rule" />
                        </svg>
                        Guía de tallas
                      </span>
                    </button>
                  </div>
                </div>
                <VSelect 
                  :items="getAvlSizes(assoc.product)"
                  item-title="name"
                  item-id="id"
                  :rounded="0"
                  return-object
                />

              </div>
              <div
                class="cart-product__error"
                ng-if="assoc.selectedSizeError && assoc.selectedSizeError.length > 0"
              >
                {{ assoc.selectedSizeError }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </span>
</template>
<style >

#composite-product .product-sizes .item .product-sizes__header {
  align-items: center;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 8px;
  height: 100%;
}
#composite-product .product-sizes .item .product-sizes__header h2 {
  font-size: 11px;
  line-height: 14px;
  margin: 0;
  text-transform: uppercase;
}
#composite-product .product-sizes .item .product-sizes__header h2 a {
  color: #000;
}

#composite-product .product-sizes .item .product-size__select .size-guide-wrapper, #composite-product .product-sizes .item .product-size__select .size-guide-wrapper > div {
  display: inline-block;
  flex: 0;
}

#composite-product .product-sizes .item .product-size__select .size-guide-wrapper, #composite-product .product-sizes .item .product-size__select .size-guide-wrapper > div {
  display: inline-block;
  flex: 1;
}

#composite-product .size_guide_button {
  align-items: center;
  background-color: #e7e7e7;
  color: #000;
  display: flex;
  font-size: 11px;
  gap: 5px;
  justify-content: center;
  line-height: 14px;
  padding: 10px 12px !important;
  text-transform: uppercase;
  white-space: nowrap;
}
</style>

