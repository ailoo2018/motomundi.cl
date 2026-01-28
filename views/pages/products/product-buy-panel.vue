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
          <span class="free-shipping">
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
          </span>
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
</style>
