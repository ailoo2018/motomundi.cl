<script setup>
import Financing from "@/pages/products/detail/financing.vue"
import { useProductsUtils } from "@/composables/useProductsUtils"
import ProductVariantSelector from "@/views/pages/products/detail/product-variant-selector.vue"
import CompositeVariantSelector from "@/views/pages/products/detail/composite-variant-selector.vue"
import { ProductType } from "@/models/products"
import StorePickup from "@/views/pages/products/detail/store-pickup.vue"

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

const addToCart = itemsToAdd => {

  if (props.product.type === ProductType.Simple) {
    let productItemId = null

    if (selectedProductItem.value) {
      productItemId = selectedProductItem.value.id
    }

    if (!productItemId && !prodUtil.requiresFeatureSelect(props.product)) {
      productItemId = props.product.productItems[0].id
    }

    if (!productItemId) {
      alert("Debe seleccionar variantes")

      return

    }

    emit('addToCart', {
      productItemId: productItemId,
      quantity: 1,
    }) // { productItemId: productItem.id, quantity: 1 }
  } else {

    const pits = selectedProductItems.value.filter(f => f.productItemId > 0).map(s => s.productItemId)
    if (pits.length !== props.product.composite.length) {
      alert(`Debe seleccionar variantes ${pits.length} vs ${props.product.composite.length}`)

      return
    }

    emit('addToCart', pits.map(pit => {
      return { "quantity": 1, "productItemId": pit }
    }))
  }
}

const price = computed(() => {

  if(props.product.productItems && props.product.productItems.length > 0){
    return props.product.productItems[0].price.price
  }

  return props.product.minPrice
})

const selectedVariant = ref()

const onSelectedVariant = pit =>
{
  selectedVariant.value = pit

}
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
              <span
                v-if="product.isNew"
                class="tag-wrapper"
              >
                <span class="tag product-tag product-tag--old product-tag--new">
                  <span class="discount">Novedad</span>
                </span>
              </span>

              <span class="tag-wrapper">
                <span
                  v-if="product.discountPercent > 0"
                  class="tag product-tag product-tag--old product-tag--sales"
                >
                  <span class="discount">Rebajas -{{ Math.round(product.discountPercent) }}%</span>
                </span>
              </span>
            </div>
          </div>
          <!-- discount -->
          <div
            v-if="product.hasDiscount"
            class="product-discount"
          >
            <span class="product-old-price strike">{{ formatMoney(product.minPrice) }}</span>
            <span class="product-savings"> {{ formatMoney(product.discountAmount) }} de ahorro. </span>
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
      @selected-variant="onSelectedVariant"
    />
    <!-- normal product -->

    <!-- composite product -->

    <CompositeVariantSelector
      v-if="product.type === 1"
      v-model="selectedProductItems"
      :product="product"
    />

    <!-- /composite product -->

    <!-- shipping-options -->
    <div
      class="row"
      ng-if="page.showShippingOptions"
    >
      <div class="col s12">
        <div class="product-buy-panel__shipping-options">
          <div
            style="display:none;"
            class="stock-check"
          >
            <div
              class="shipping-options__container"
              ng-click="showShippingDialog()"
            >
              <div class="shipping-options__content">
                <p class="shipping-options__heading">
                  <svg
                    width="16"
                    height="14"
                    xmlns="http://www.w3.org/2000/svg"
                    class="icon sprite-line-icons"
                  >
                    <use
                      href="/content/images/svg/5a3436bd5fabb67d5b4db2b6a90371b1.svg#i-av-free-shipping"
                      xlink:href="/content/images/svg/5a3436bd5fabb67d5b4db2b6a90371b1.svg#i-av-free-shipping"
                    />
                  </svg>
                  <span>Entrega a domicilio</span>
                </p>
                <div class="shipping-options__body">
                  <div class="shipping-options__option">
                    <p>
                      <span>En Proveedor: Envío dentro de <strong>3 días hábiles</strong>.</span>
                    </p>
                  </div>
                </div>
              </div>
              <div class="shipping-options__actions">
                <button>
                  Comprobar
                  <svg
                    width="12"
                    height="14"
                    xmlns="http://www.w3.org/2000/svg"
                    class="icon sprite-line-icons"
                  >
                    <use
                      href="/content/images/svg/5a3436bd5fabb67d5b4db2b6a90371b1.svg#i-icon-angle-right"
                      xlink:href="/content/images/svg/5a3436bd5fabb67d5b4db2b6a90371b1.svg#i-icon-angle-right"
                    />
                  </svg>
                </button>
              </div>
            </div>
            <!-- modal popup -->
            <div
              class="modal-wrapper shipping-options__modal"
              style="display: none;"
            >
              <div class="modal-backdrop" />
              <div
                role="dialog"
                class="modal"
              >
                <div class="modal__close-cont">
                  <button
                    class="modal__close"
                    ng-click="hideShippingDialog()"
                  >
                    <svg
                      width="9"
                      height="9"
                      xmlns="http://www.w3.org/2000/svg"
                      class="icon sprite-line-icons"
                    >
                      <use
                        href="/content/images/svg/5a3436bd5fabb67d5b4db2b6a90371b1.svg#i-icon-cross"
                        xlink:href="/content/images/svg/5a3436bd5fabb67d5b4db2b6a90371b1.svg#i-icon-cross"
                      />
                    </svg>
                  </button>
                </div>
                <header class="modal-header">
                  <div><h1>Comprueba tu código postal</h1></div>
                </header>
                <section class="modal-body">
                  <div>
                    <p>
                      Introduce tu código postal para ver la fecha de entrega
                      aproximada
                    </p>
                    <div class="form-group">
                      <input
                        type="text"
                        placeholder="Tu código postal"
                        class="text"
                      >
                      <button
                        type="button"
                        class="button"
                      >
                        <span>Comprobar</span>
                      </button>
                    </div>
                  </div>
                </section>
              </div>
            </div>
            <!-- /modal popup -->
          </div>
          <StorePickup
            v-if="selectedVariant"
            :product-item-id="selectedVariant.id"
          />
        </div>
      </div>
    </div>
    <!-- /shipping-options -->


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
                <title>Añadir a favoritos</title>
                <use href="/content/images/svg/0b25363450c5afe3b3f9ba7fe4f4173b.svg#i-icon-favorite" />
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

<style>
.product-old-price {
  font-size: 14px;
  opacity: .4;
}

.product-savings {
  font-size: 14px;
  font-weight: 700;
  margin-left: 4px;
}

.tag.product-tag.product-tag--crazydays, .tag.product-tag.product-tag--offer, .tag.product-tag.product-tag--sales {
  background-color: #d6001c;
}
</style>

