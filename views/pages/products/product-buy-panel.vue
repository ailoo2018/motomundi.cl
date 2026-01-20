<script setup>
import Financing from "@/pages/products/detail/financing.vue"
import { useProductsUtils } from "@/composables/useProductsUtils"
import ProductVariantSelector from "@/views/pages/products/detail/product-variant-selector.vue"
import CompositeVariantSelector from "@/views/pages/products/detail/composite-variant-selector.vue"
import { ProductType } from "@/models/products"

const props = defineProps(
  {
    product: {
      type: Object,
      required: true,
    },
  },
)

const emit = defineEmits(['update:size', 'update:color', 'add-to-cart'])

const selectedProductItem = ref()
const selectedProductItems = ref([])

const prodUtil = useProductsUtils()

const selectedSize = ref({ id: 0 })
const selectedColor = ref({ id: 0 })

const addToCart = itemsToAdd => {

  if(props.product.type === ProductType.Simple) {
    let productItemId = null

    if(selectedProductItem.value){
      productItemId = selectedProductItem.value.id
    }

    if(!productItemId && !prodUtil.requiresFeatureSelect(props.product)){
      productItemId = props.product.productItems[0].id
    }

    if(!productItemId){
      alert("Debe seleccionar variantes")
      return

    }

    emit('addToCart',  {
      productItemId: productItemId,
      quantity: 1,
    } ) // { productItemId: productItem.id, quantity: 1 }
  }else{

    const pits = selectedProductItems.value.filter(f => f.productItemId > 0).map( s => s.productItemId)
    if(pits.length !== props.product.composite.length){
      alert(`Debe seleccionar variantes ${pits.length} vs ${props.product.composite.length}`)
      return

    }


    emit('addToCart', pits.map(pit => { return { "quantity": 1, "productItemId": pit } }))
  }
}

const price = computed(() => {
  return props.product.minPrice
})

onMounted(() => {
  var colorFeature = props.product.features.find(f => f.type === 1)
  if (colorFeature) {
    selectedColor.value = colorFeature

  }
})
</script>

<template>
  <div
    v-if="product"
    class="product-buy-panel ng-scope"
  >
    <!-- buy-panel -->
    <div class="row">
      <div class="col s12">
        <div class="product-buy-panel__price">
          <div class="product-buy__header">
            <div class="product-tags">
              <span class="tag-wrapper">
                <span class="tag product-tag product-tag--old product-tag--new ng-scope">
                  <span class="discount">Novedad</span>
                </span>
              </span>
              <span class="tag-wrapper" />
            </div>
          </div>
          <!-- price -->
          <div class="product-buy__price">
            <span
              class="product-price product-price__offer ng-binding"
              style="font-size: 55px;"
            >{{ formatMoney(price) }}</span>
          </div>
          <!-- /price -->
          <button
            class="seen-cheaper-button"
            ng-click="page.showSeenCheaperForm = !page.showSeenCheaperForm"
          >
            ¿Lo has visto más barato?
          </button>

          <Financing />
        </div>
        <div

          class="price-bottom__checks"
          style="margin-bottom: 20px;"
        >
          <span class="free-shipping"><svg
            width="10"
            height="8"
            xmlns="http://www.w3.org/2000/svg"
            class="icon sprite-line-icons"
          ><use href="/content/images/svg/0b25363450c5afe3b3f9ba7fe4f4173b.svg#i-icon-check" /></svg>
            Envío $4.900 todo Chile
          </span>
          <div>
            <svg
              width="10"
              height="8"
              xmlns="http://www.w3.org/2000/svg"
              class="icon sprite-line-icons"
            >
              <use
                href="/content/images/svg/0b25363450c5afe3b3f9ba7fe4f4173b.svg#i-icon-check"
                xlink:href="/content/images/svg/0b25363450c5afe3b3f9ba7fe4f4173b.svg#i-icon-check"
              />
            </svg>
            <a

              href="/terminos-y-condiciones-precio-minimo-garantizado"
              data-dr="true"
              class="mtc-link"
              rel="nofollow"
            >
              Precio mínimo garantizado
            </a>
          </div>
        </div>
      </div>
    </div>
    <!-- buy-panel -->


    <!-- normal product -->

    <ProductVariantSelector
      v-if="product.type === 0"
      v-model="selectedProductItem"
      :product="product"
    />
    <!-- normal product -->

    <!-- composite product -->

    <CompositeVariantSelector
      v-if="product.type === 1"
      v-model="selectedProductItems"
      :product="product"
    />

    <!-- /composite product -->


    <!-- addToCart -->
    <div
      class="row"
      style="margin-bottom: 25px;"
    >
      <div class="col s12">
        <div class="product-buy-panel__shipping-options" />
      </div>
    </div>
    <div class="row">
      <div class="col s12">
        <div class="product-buy-panel__buttons">
          <button
            class="buy-button"
            @click="addToCart"
          >
            <div class="blocked-by-country">
              Este producto no se puede enviar a
              <strong>z</strong>
            </div>
            <span>
              <svg
                width="22"
                height="24"
                xmlns="http://www.w3.org/2000/svg"
                class="icon sprite-line-icons"
              ><use href="/content/images/svg/0b25363450c5afe3b3f9ba7fe4f4173b.svg#i-icon-shopping-bag" /></svg>
              Añadir a la cesta
            </span>
          </button>

          <div class="add-to-favs__product-page">
            <button
              ng-class="isWished(product.id) ? 'wished' : ''"
              class="add-to-favs"
              ng-click="addRemoveToWishList(product.id, $event);"
            >
              <svg
                width="29"
                height="24"
                xmlns="http://www.w3.org/2000/svg"
                class="add icon sprite-line-icons"
              >
                <title >Añadir a favoritos</title>
                <use
                  href="/content/images/svg/0b25363450c5afe3b3f9ba7fe4f4173b.svg#i-icon-favorite"
                />
              </svg>
            </button>
          </div>

          <!-- ngIf: page.showAddToCartWarning -->
        </div>
      </div>
    </div>
    <!-- /addToCart -->
  </div><!-- end ngIf: product -->
</template>

<style  lang="scss">
.product-wrapper.product-detail .swatch.color-value.selected, .product-wrapper.product-detail .swatch.size-value.selected {
  border-color: #000;
}

/* product info */
.product-buy-panel__price {
  background-color: #f5f5f5;
  padding: 50px 30px 30px;
  position: relative;
  text-align: center;
}

.product-buy__header {
  align-items: center;
  display: flex;
  height: 46px;
  justify-content: space-between;
  margin: -50px -30px 10px;
}

.product-tags {
  display: flex;
  flex-wrap: wrap;
}

.product-buy__header .product-tags {
  flex: 0 0 100% !important;
  width: 100%;
}

.tag.product-tag.product-tag--new {
  background-color: #e68931;
}

.tag.product-tag.product-tag--old {
  color: #fff;
}

.product-tags .tag.product-tag {
  color: #fff;
  font-size: 11px;
  font-weight: 700;
  margin-right: 1px;
  padding: 5px 15px;
  text-transform: uppercase;
  margin-bottom: 1px;
}

.product-buy__header {
  align-items: center;
  display: flex;
  height: 46px;
  justify-content: space-between;
  margin: -50px -30px 10px;
}

.product-price {
  display: block;
  font-size: 55px;
  font-weight: 900;
}

.product-price__offer {
  color: #d6001c;
}

.seen-cheaper-button {
  font-size: 9px;
  font-weight: 600;
  padding: 8px 10px;
  text-transform: uppercase;
}

.product-buy__price {
  align-items: baseline;
  display: flex;
  justify-content: center;
}


.buy-button {
  align-self: stretch;
  background-color: #41a334 !important;
  border: 0;
  color: #fff;
  flex: 0 0 75%;
  font-weight: 800;
  overflow: hidden;
  position: relative;
  text-transform: uppercase !important;
}

.buy-button .blocked-by-country {
  -webkit-animation: blocked-by-country 1s linear both;
  animation: blocked-by-country 1s linear both;
  background-color: #ffae02;
  bottom: 10%;
  color: #684700;
  display: block;
  display: none;
  font-size: 10px;
  font-weight: 600;
  left: 0;
  padding: 12px 8px;
  position: absolute;
  right: 0;
}

.buy-button svg {
  margin-right: 5px;
  vertical-align: -3px;
}

.product-buy-panel__buttons {
  align-content: stretch;
  align-items: center;
  display: flex;
  flex-direction: row;
  height: 80px;
  justify-content: center;
  position: relative;
}

.buy-button svg use {
  stroke: #fff;
  stroke-width: 1.2;
}

.add-to-favs__product-page, .add-to-favs__product-sticky {
  align-items: center;
  align-self: stretch;
  display: flex;
  justify-content: center;
}

.add-to-favs__product-page {
  background-color: #f5f5f5;
  flex: 0 0 25%;
}

.add-to-favs__product-page .add-to-favs, .add-to-favs__product-sticky .add-to-favs {
  opacity: 1 !important;
  position: static !important;
  -webkit-transform: scale(1) !important;
  transform: scale(1) !important;
}

.add-to-favs svg {
  height: 24px;
  transition: all .2s ease;
  width: 29px;
}

.add-to-favs svg use {
  stroke: #bfbfbf;
}

.buy-button > span {
  position: relative;
  z-index: 2;
}

.buy-button:after {
  background-color: #49b63a;
  content: "";
  height: 100%;
  left: -45%;
  position: absolute;
  top: 0;
  -webkit-transform: skew(50deg);
  transform: skew(50deg);
  -webkit-transform-origin: top left;
  transform-origin: top left;
  transition: all .2s ease-in-out;
  width: 0;
  z-index: 1;
}

.product-wrapper.product-detail .swatch.color-value.selected, .product-wrapper.product-detail .swatch.size-value.selected {
  border-color: #000;
}

.product-sizes__header {
  align-items: stretch;
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
}

.product-wrapper.product-detail .swatch-tile-container {
  display: flex;
  flex-wrap: wrap;
}

.product-wrapper.product-detail .swatch.color-value, .product-wrapper.product-detail .swatch.size-value {
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid #d6d6d6;
  border-radius: 3px;
  background-size: 50px 50px;
  background-repeat: no-repeat;
  background-position: 50% 50%;
}

.product-wrapper.product-detail .swatch.color-value, .product-wrapper.product-detail .swatch.size-value {
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid #d6d6d6;
  border-radius: 3px;
  background-size: 50px 50px;
  background-repeat: no-repeat;
  background-position: 50% 50%;
}


.product-wrapper.product-detail .swatch.color-value, .product-wrapper.product-detail .swatch.size-value {
  width: 66px;
  height: 66px;
}

.product-wrapper.product-detail .swatch-tile-container.color-tile {
  width: 100%;
  /* width: calc(100% + (12px * 4)); */
  margin: 0 -20px;
  padding: 0 20px;
  overflow-x: unset;
  flex-wrap: wrap;
}


.size_guide_button span {
  align-items: center;
  display: flex;
  gap: 5px;
}

.free-shipping {
  align-items: center;
  display: flex;
  font-size: 11px;
  justify-content: center;
}

.price-bottom__checks > * a {
  color: #000;
}

.price-bottom__checks {
  border-top: 1px solid #fff;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  line-height: 1.2em;
  margin: 12px 0 0;
}

.price-bottom__checks > * {
  font-size: 11px;
  font-weight: 700;
  margin: 0 7px;
  padding: 0;
  text-transform: uppercase;
}

.product-sizes__header {
  align-items: stretch;
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
}

.size_guide_button {
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

[type=checkbox]:checked, [type=checkbox]:not(:checked), [type=radio]:checked, [type=radio]:not(:checked) {
  opacity: 0;
  pointer-events: none;
  position: absolute;
}


#reviews button, input, optgroup, select, textarea {
  border-radius: 0;
  box-sizing: border-box !important;
  color: #000;
  font-family: system, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
  font-weight: 500;
  outline: none;
}

button, input, optgroup, select, textarea {
  border-radius: 0;
  box-sizing: border-box !important;
  color: #000;
  font-family: system, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
  font-weight: 500;
  outline: none;
}

.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  border: 0;
}


.product-sizes__header h2 {
  font-size: 11px;
  line-height: 14px;
  margin: 10px 0;
  text-transform: uppercase;
}

li .mtc-link, li > a {
  color: #000;
  display: inline-block;
  font-size: 12px;
  font-weight: 500;
  letter-spacing: 0;
  /* line-height: 1.05em; */
  padding: 6px 18px;
  text-transform: uppercase;
}


.radio input[type=radio]:checked + label, .radio input[type=radio]:not(:checked) + label {
  color: #000;
  cursor: pointer;
  display: block;
  font-weight: 500;
  line-height: 40px;
  position: absolute;
  text-align: center;
  width: 100%;
  z-index: 1;
}

.radio input[type=radio].oosk + label:before {
  background-color: hsla(0, 0%, 72%, .1);
  border-color: #ccc;
  box-shadow: inset 0 0 0 1px #eee;
}

.radio input[type=radio]:not(:checked) + label:after {
  opacity: 0;
  -webkit-transform: scale(0);
  transform: scale(0);
}

.radio input[type=radio].oosk + label .oosk__badge {
  background: #ccc url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxNCIgaGVpZ2h0PSIxMiI+PGcgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIiBzdHJva2U9IiNGRkYiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIgc3Ryb2tlLXdpZHRoPSIxLjIiPjxwYXRoIGQ9Ik0yLjIgMWg5LjZjLjY2IDAgMS4yLjU2MyAxLjIgMS4yNXY3LjVjMCAuNjg4LS41NCAxLjI1LTEuMiAxLjI1SDIuMkMxLjU0IDExIDEgMTAuNDM3IDEgOS43NXYtNy41QzEgMS41NjIgMS41NCAxIDIuMiAxWiIvPjxwYXRoIGQ9Ik0xMyAyLjI1IDcgNi42MjUgMSAyLjI1Ii8+PC9nPjwvc3ZnPg==") 50% no-repeat;
  display: block;
  height: 20px;
  position: absolute;
  right: -2px;
  top: 0;
  transition: all .2s ease;
  width: 25px;
}

.radio input[type=radio]:checked + label:after, .radio input[type=radio]:not(:checked) + label:after {
  background: #41a334;
  border: 1px solid #41a334;
  content: "";
  height: 100%;
  left: 0;
  position: absolute;
  top: 0;
  transition: all .2s ease;
  width: 100%;
  z-index: -1;
}

.radio input[type=radio]:checked + label, .radio input[type=radio]:not(:checked) + label {
  color: #000;
  cursor: pointer;
  display: block;
  font-weight: 500;
  line-height: 40px;
  position: absolute;
  text-align: center;
  width: 100%;
  z-index: 1;
}

.radio input[type=radio]:checked, .radio input[type=radio]:not(:checked) {
  left: -9999px;
  position: absolute;
}

[type=checkbox]:checked, [type=checkbox]:not(:checked), [type=radio]:checked, [type=radio]:not(:checked) {
  opacity: 0;
  pointer-events: none;
  position: absolute;
}

.default-selector-container {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  flex-flow: row wrap;
}

.radio {
  flex: 0 1 19%;
  height: 40px;
  margin: .5% 1% .5% 0;
  position: relative;
}

.radio .paack-2h-label {
  background-color: #00a8d6;
  color: #fff;
  font-size: 7px;
  font-weight: 800;
  padding: 2px 5px;
  position: absolute;
  right: 0;
  top: 0;
  z-index: 2;
}

.radio input[type=radio]:checked + label, .radio input[type=radio]:not(:checked) + label {
  color: #000;
  cursor: pointer;
  display: block;
  font-weight: 500;
  line-height: 40px;
  position: absolute;
  text-align: center;
  width: 100%;
  z-index: 1;
}

.radio input[type=radio]:checked + label:before, .radio input[type=radio]:not(:checked) + label:before {
  background: transparent;
  border: 1px solid #000;
  border-radius: 0;
  content: "";
  height: 100%;
  left: 0;
  position: absolute;
  top: 0;
  width: 100%;
}

.radio input[type=radio].oosk + label:before {
  background-color: hsla(0, 0%, 72%, .1);
  border-color: #ccc;
  box-shadow: inset 0 0 0 1px #eee;
}

.product-wrapper.product-detail .swatch.color-value.unavailable {
  cursor: not-allowed;
  opacity: 0.7;
}

.radio input[type=radio]:checked + label {
  color: #fff;
  font-weight: 600;
}

.radio input[type=radio]:checked + label:before {
  opacity: 0;
}
</style>
