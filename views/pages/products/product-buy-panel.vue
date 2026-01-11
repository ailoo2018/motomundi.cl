<script setup>
import Financing from "@/pages/products/detail/financing.vue"
import { useProductsUtils } from "@/composables/useProductsUtils.js"


const props = defineProps(
  {
    product: {
      type: Object,
      required: true,
    },
  },
)

const emit = defineEmits(['update:size', 'update:color', 'add-to-cart'])
const isShowCbo = ref(false)
const prodUtil = useProductsUtils()
const showSizeChart = ref(false)
const selectedSize = ref({ id: 0})
const selectedColor = ref({ id: 0})

const addToCart = () => {
  const sizeId = selectedSize.value.id
  const colorId = selectedColor.value.id


  const productItem = prodUtil.findProductItemByFeatures(product.value, colorId, sizeId)



  emit('addToCart', { productItemId: productItem.id, quantity: 1 })
}

const getColorImageUrl = colorId => {
  var image = product.value.images.find(img => img.colorId === colorId)
  if(!image){
    return getImageUrl(product.value.image, 600, getDomainId())
  }

  return getImageUrl(image.image, 600, getDomainId())

}

const selectColor = color => {
  selectedColor.value = color
  emit('update:color', color)
}

const onSelectSize = size => {
  selectedSize.value = size
  emit('update:size', size)
}

const isColorAvailable = color => {
  if(!color)
    return false

  const selectedSizeId = selectedSize.value ? selectedSize.value.id : 0

  const prodItems = product.value.productItems.filter(pit => (selectedSizeId === 0 || pit.sizeId === selectedSizeId) &&  pit.colorId === color.id)
  if(prodItems){
    return prodItems.some(pit => pit.quantityInStock > 0)
  }

  return false
}

const isSizeAvailable = size => {


  if(!size)
    return false

  const selectedColorId = selectedColor.value ? selectedColor.value.id : 0


  const prodItems = product.value.productItems.filter(pit => (pit.colorId === selectedColorId || selectedColorId === 0) && size.id === pit.sizeId)
  if(prodItems.length > 0){
    return prodItems.some(pit => pit.quantityInStock > 0)
  }


  return false
}


const product = ref(props.product)

const colors = computed(() => {
  return product?.value.features.filter(f => f.type === 1)
})

const sizes = computed(() => {
  return product?.value.features.filter(f => f.type === 0)
})

onMounted(() => {
  var colorFeature = product.value.features.find(f => f.type === 1)
  if(colorFeature){
    selectedColor.value = colorFeature

  }
});
</script>

<template>
  <div
    class="product-buy-panel ng-scope"
    ng-if="product"
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
            >$229.900</span>
            <!-- ngIf: hasDiscount() -->
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
    <!-- ngIf: product.type == 0 -->
    <span
      ng-if="product.type == 0"
      class="ng-scope"
    >

      <!-- ngIf: product.colors.length > 0 -->
      <div
        v-if="colors.length > 0"
        class="row ng-scope"
        style="margin-bottom: 16px;"
      >
        <div class="col s12">
          <div class="product-colors ">
            <div class="product-sizes__header">
              <h2>Elige tu color {{ selectedColor }}</h2>
            </div>
            <div class="colors-form product-wrapper product-detail">
              <div class="color-tile swatch-tile-container product-data">
                <button
                  v-for="color in colors"
                  class="color-attribute"
                  :title="color.name"
                  :aria-label="color.name"
                  @click="selectColor(color)"
                >
                  <span
                    class="swatch color-value swatch-value selectable available"
                    :class="{ 'selected': selectedColor?.id === color.id, 'unavailable' : !isColorAvailable(color)}"
                    :style="`background-image: url(&quot;${getColorImageUrl(color.id, 600, getDomainId())}&quot;);`"
                  />
                  <span class="sr-only selected-assistive-text">selected</span>
                </button>

              </div>
            </div>

          </div>
        </div>
      </div>

      <!-- sizes -->

      <!-- ngIf: !product.isSimpleProduct -->
      <div
        v-if="!product.isSimpleProduct"
        class="row ng-scope"
        style="margin-top: 20px;"
      >
        <div class="col s12">
          <div class="product-sizes">
            <div class="product-sizes__header">
              <h2>Elige tu talla</h2>
              <!-- guia de tallas -->
              <div class="size-guide-wrapper">
                <div>
                  <button
                    id="size-guide-button"
                    type="button"
                    class="size_guide_button"
                    @click="showSizeChart = !showSizeChart"
                  >
                    <span>
                      <svg
                        width="18"
                        height="8"
                        xmlns="http://www.w3.org/2000/svg"
                        class="icon sprite-line-icons"
                      >
                        <use
                          href="/content/images/svg/0b25363450c5afe3b3f9ba7fe4f4173b.svg#i-icon-rule"
                          xlink:href="/content/images/svg/0b25363450c5afe3b3f9ba7fe4f4173b.svg#i-icon-rule"
                        /></svg>
                      Guía de tallas
                    </span>
                  </button>
                </div>
              </div>

            </div>


            <!-- sizes-form -->
            <div class="sizes-form">
              <div
                v-if="!isShowCbo"
                class="default-selector-container ng-scope"
              >
                <div
                  v-for="size in sizes"
                  class="radio ng-scope"
                >
                  <div
                    class="paack-2h-label"
                    style="display: none;"
                  >
                    2H
                  </div>
                  <input
                    :id="'size-' + size.id"
                    v-model="selectedSize"
                    :class="{ 'oosk': !isSizeAvailable(size)}"
                    :value="size"
                    :checked="selectedSize.id === size.id"
                    type="radio"
                  >
                  <label @click="onSelectSize(size)">
                    {{ size.name }}
                    <span v-if="!isSizeAvailable(size)" class="oosk__badge" />
                  </label>
                </div>
              </div>
            </div>


            <!-- oosk -->
            <div
              id="soofs"

              class="size-oosk"
              style="display: none;"
            >
              <button
                class="oosk__close"
                ng-click="hideOoskDialog()"
              >
                <svg

                  width="9"
                  height="9"
                  xmlns="http://www.w3.org/2000/svg"
                  class="icon sprite-line-icons"
                >
                  <use href="/content/images/svg/0b25363450c5afe3b3f9ba7fe4f4173b.svg#i-icon-cross" />
                </svg>
              </button>
              <div
                class="size-oosk__success"
                style="display: none;"
              >
                <img
                  src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+CjwhLS0gQ3JlYXRlZCB3aXRoIEtleXNoYXBlIC0tPgo8c3ZnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgaGVpZ2h0PSIyMCIgdmlld0JveD0iMCAwIDIwIDIwIiB3aWR0aD0iMjAiPgogICAgPHN0eWxlPgpAa2V5ZnJhbWVzIGEwX2RvIHsgMCUgeyBzdHJva2UtZGFzaG9mZnNldDogNDdweDsgYW5pbWF0aW9uLXRpbWluZy1mdW5jdGlvbjogY3ViaWMtYmV6aWVyKDAuNiwwLjA0LDAuOTgsMC4zMzUpOyB9IDc3Ljc3NzglIHsgc3Ryb2tlLWRhc2hvZmZzZXQ6IDBweDsgfSAxMDAlIHsgc3Ryb2tlLWRhc2hvZmZzZXQ6IDBweDsgfSB9CkBrZXlmcmFtZXMgYTFfZG8geyAwJSB7IHN0cm9rZS1kYXNob2Zmc2V0OiAxMnB4OyB9IDIyLjIyMjIlIHsgc3Ryb2tlLWRhc2hvZmZzZXQ6IDEycHg7IGFuaW1hdGlvbi10aW1pbmctZnVuY3Rpb246IGN1YmljLWJlemllcigwLjc4NSwwLjEzNSwwLjE1LDAuODYpOyB9IDEwMCUgeyBzdHJva2UtZGFzaG9mZnNldDogMHB4OyB9IH0KICAgIDwvc3R5bGU+CiAgICA8cGF0aCBmaWxsPSJub25lIiBzdHJva2U9IiM0MWEzMzUiIHN0cm9rZS1kYXNoYXJyYXk9IjQ3IDQ3IiBzdHJva2UtZGFzaG9mZnNldD0iNDciIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIgZD0iTTAsLTcuNUM0LjE0MjE0LC03LjUsNy41LC00LjE0MjE0LDcuNSwwQzcuNSw0LjE0MjE0LDQuMTQyMTQsNy41LDAsNy41Qy00LjE0MjE0LDcuNSwtNy41LDQuMTQyMTQsLTcuNSwwQy03LjUsLTQuMTQyMTQsLTQuMTQyMTQsLTcuNSwwLC03LjVaIiBzdHJva2Utd2lkdGg9IjEuMSIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMTAsMTApIHJvdGF0ZSg1Mi42KSIgc3R5bGU9ImFuaW1hdGlvbjogMC45cyBsaW5lYXIgYm90aCBhMF9kbzsiLz4KICAgIDxwYXRoIGQ9Ik0wLDNMMi41LDUuNUw4LDAiIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzQxYTMzNSIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBzdHJva2UtZGFzaGFycmF5PSIxMiAxMiIgc3Ryb2tlLWRhc2hvZmZzZXQ9IjEyIiBzdHJva2Utd2lkdGg9IjEuMSIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoNiw3LjI1KSIgc3R5bGU9ImFuaW1hdGlvbjogMC45cyBsaW5lYXIgYm90aCBhMV9kbzsiLz4KPC9zdmc+Cg=="
                  alt="Success"
                > <span class="h3">Hemos recibido tu correo correctamente.</span>
                <p>Te avisaremos en cuanto la talla vuelva a estar
                  disponible.</p>
                <button class="button button--secondary button--tiny">
                  Aceptar
                </button>
              </div>
              <div>
                <form class="ng-pristine ng-valid">
                  <span class="h3 ng-binding">
                    <svg
                      width="30"
                      height="24"
                      xmlns="http://www.w3.org/2000/svg"
                      class="icon sprite-line-icons"
                    ><title>Alert icon</title><use href="/content/images/svg/0b25363450c5afe3b3f9ba7fe4f4173b.svg#i-icon-alert" /></svg> Vaya, la  <span>talla </span>  se ha agotado. <br> ¿Te avisamos cuando esté disponible?</span>
                  <div class="size-oosk__email-form-fields">
                    <div class="input-field"><input
                      id="email"

                      type="email"
                      placeholder="Email"
                      class="validate"
                    >
                    </div>
                    <div class="input-field">
                      <button class="submit validate">
                        ¡Avisame!
                      </button>
                    </div>
                  </div>
                  <label style="display: none;">
                    <input
                      id="stock-subscribe-newsletter-check"
                      type="checkbox"
                    >
                    <span>
                      Autorizas a Motomundi SPA, para el tratamiento de tus datos personales y aceptas recibir comunicaciones comerciales vía email.
                      <a

                        href="/terminos-y-condiciones.html?open=privacy-policy"
                        data-dr="true"
                        class="mtc-link"
                        rel="nofollow"
                      >
                        Más información…
                      </a>
                    </span>
                  </label>
                  <div
                    class="size-oosk__similar"
                    style="display:none;"
                  >
                    <span class="h3">Disponible en la talla </span>
                    <div class="similar-products">
                      <div class="skeleton"><a />
                      </div>
                      <div class="skeleton"><a />
                      </div>
                      <div class="skeleton"><a />
                      </div>
                      <div class="skeleton"><a />
                      </div>
                    </div>
                    <div

                      class="similar-products"
                      style="display: none;"
                    />
                  </div>
                </form>
              </div>
            </div>
            <!-- /size-oosk -->
          </div>
        </div>
      </div><!-- end ngIf: !product.isSimpleProduct -->

      <!-- /sizes -->
    </span><!-- end ngIf: product.type == 0 -->
    <!-- normal product -->


    <!-- addToCart -->
    <div
      class="row"
      data-v-a812f618=""
      style="margin-bottom: 25px;"
    >
      <div
        class="col s12"
        data-v-a812f618=""
      >
        <div
          class="product-buy-panel__shipping-options"
          data-v-a812f618=""
        />
      </div>
    </div>
    <div class="row">
      <div class="col s12">
        <div class="product-buy-panel__buttons">
          <button

            class="buy-button"
            @click="addToCart()"
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
              data-v-1daaf0fa=""

              ng-class="isWished(product.id) ? 'wished' : ''"
              class="add-to-favs"
              ng-click="addRemoveToWishList(product.id, $event);"
            >
              <svg
                data-v-1daaf0fa=""
                width="29"
                height="24"
                xmlns="http://www.w3.org/2000/svg"
                class="add icon sprite-line-icons"
              >
                <title data-v-1daaf0fa="">Añadir a favoritos</title>
                <use
                  data-v-1daaf0fa=""
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

<style scoped lang="scss">
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
