<script setup lang="ts">
import { ProductHelper } from "@/models/products"
import { useProductsUtils } from "@/composables/useProductsUtils.js"


const prodUtil = useProductsUtils()

const props = defineProps(
  {
    product: {
      type: Object,
      required: true,
    },
  },
)

const emit = defineEmits(['update:size', 'update:color', 'add-to-cart'])

const selectedProductItem = defineModel({
  type: Object,
})

const selectedSize = ref({ id: 0 })
const selectedColor = ref({ id: 0 })
const isShowCbo = ref(false)
const showSizeChart = ref(false)


const getColorImageUrl = colorId => {
  var image = props.product.images.find(img => img.colorId === colorId)
  if (!image) {
    return getImageUrl(props.product.image, 600, getDomainId())
  }

  return getImageUrl(image.image, 600, getDomainId())

}

const isColorAvailable = color => {
  try {
    if (!color)
      return false

    const selectedSizeId = selectedSize.value ? selectedSize.value.id : 0

    const prodItems = props.product.productItems.filter(pit => (selectedSizeId === 0 || pit.sizeId === selectedSizeId) && pit.colorId === color.id)
    if (prodItems) {
      return prodItems.some(pit => pit.quantityInStock > 0)
    }

    return false
  }catch(e){
    console.error(e)
    return false
  }
}

const selectColor = color => {
  selectedColor.value = color
  updateModel()
  emit('update:color', color)
}

const onSelectSize = size => {
  selectedSize.value = size
  updateModel()
  emit('update:size', size)
}

const updateModel = () => {
  try {
    const sizeId = selectedSize.value.id
    const colorId = selectedColor.value.id


    let productItem

    if (!ProductHelper.requiresFeatureSelect(props.product)) {
      productItem = props.product.productItems[0]
    } else {
      productItem = prodUtil.findProductItemByFeatures(props.product, colorId, sizeId)
    }

    selectedProductItem.value = productItem
  }catch(e){
    console.error(e)
    selectedProductItem.value = null
  }
}

const isSizeAvailable = size => {


  if (!size)
    return false

  const selectedColorId = selectedColor.value ? selectedColor.value.id : 0


  const prodItems = props.product.productItems.filter(pit => (pit.colorId === selectedColorId || selectedColorId === 0) && size.id === pit.sizeId)
  if (prodItems.length > 0) {
    return prodItems.some(pit => pit.quantityInStock > 0)
  }


  return false
}

console.log("sizes", props.product.features)

const colors = computed(() => {
  return props.product.features.filter(f => f.type === 1)
})

const sizes = computed(() => {
  return props.product.features.filter(f => f.type === 0).map(f1 => { return { id: f1.id, name: f1.name.toLowerCase() === "tamaño unico" ?  'OS' : f1.name }})
})
</script>

<template>
  <span v-if="product.type == 0">

    <!-- colors -->
    <div
      v-if="colors.length > 0"
      class="row ng-scope"
      style="margin-bottom: 16px;"
    >
      <div class="col s12">
        <div class="product-colors ">
          <div class="product-sizes__header">
            <h2>Elige tu color</h2>
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
    <!-- /colors -->

    <!-- sizes -->
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
                  <span
                    v-if="!isSizeAvailable(size)"
                    class="oosk__badge"
                  />
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
    </div>
  <!-- /sizes -->
  </span>
</template>


