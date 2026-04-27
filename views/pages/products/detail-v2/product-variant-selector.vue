<script setup lang="ts">
import { ProductHelper } from "@/models/products"
import { useProductsUtils } from "@/composables/useProductsUtils.js"
import NotifyWhenAvailable from "@/views/pages/products/detail/notify-when-available.vue"
import StorePickup from "@/views/pages/products/detail/store-pickup.vue";


const props = defineProps(
  {
    product: {
      type: Object,
      required: true,
    },
  },
)

const emit = defineEmits(['update:size', 'update:color', 'add-to-cart', 'selected-variant', 'show-size-chart'])

const prodUtil = useProductsUtils()

const useComboForSize = props.product.features.some(f => f.type === 0 && f.name.length > 6)

const hasSinglePrice = ref(true)
let prc = 0
for (var pit of props.product.productItems) {
  if (prc === 0) {
    prc = pit.price.price
  }
  if (prc !== pit.price.price) {
    hasSinglePrice.value = false
    break
  }
}


const selectedProductItem = defineModel({
  type: Object,
})

const selectedSize = ref({ id: 0 })
const selectedColor = ref({ id: 0 })
const showNotifyWhenAvailable = ref(false)

const openNotifyWhenAvailable = () => {
  showNotifyWhenAvailable.value = true

}


if (useComboForSize)
  selectedSize.value = null

const getColorImageUrl = colorId => {
  var image = props.product.images.find(img => img.colorId === colorId)
  if (!image) {
    return getImageUrl(props.product.image, 600, getDomainId())
  }

  return getImageUrl(image.image, 600, getDomainId())

}

const onShowSizeChart = () => {
  console.log("showSizeChart: " + props.product.sizeChart)
  emit("show-size-chart", props.product.sizeChart)
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
  } catch (e) {
    console.error(e)

    return false
  }
}

const selectColor = color => {
  console.log("ProductVariantSelector::selectColor " + color)
  selectedColor.value = color

  if (sizes.value?.length > 0 && !isSizeAvailable(selectedSize.value)) {
    selectedSize.value = { id: 0 }
  }


  updateModel()
  emit('update:color', color)
}

const onSelectSize = size => {
  showNotifyWhenAvailable.value = false
  selectedSize.value = size

  /**
   * selectedSize.value = size
   * updateModel()
   * emit('update:size', size)
   */
}

const setSizeProps = item => {
  const available = isSizeAvailable(item)

  return {
    disabled: !available,
    subtitle: !available ? 'Agotado' : '',

    // You can even add custom classes here
    class: !available ? 'opacity-50' : '',
  }
}

watch(selectedSize, size => {
  updateModel()
  emit('update:size', size)
})


const updateModel = () => {
  try {
    const sizeId = selectedSize.value.id
    const colorId = selectedColor.value.id


    /*
        if(colorId > 0){
          console.log("Emit update:color")
          emit('update:color', selectedColor.value)
        }
    */


    let productItem

    if (!ProductHelper.requiresFeatureSelect(props.product)) {
      productItem = props.product.productItems[0]
    } else {
      productItem = prodUtil.findProductItemByFeatures(props.product, colorId, sizeId)
    }

    console.log("updateModel" + JSON.stringify(productItem))
    selectedProductItem.value = productItem
  } catch (e) {
    console.error(e)
    selectedProductItem.value = null
  }
}

watch(selectedProductItem, () => {
  // console.log("ProductVariantSelector::updateModel" + JSON.stringify(selectedProductItem))
  emit("selected-variant", selectedProductItem.value)
})

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


const colors = computed(() => {
  return props.product.features.filter(f => f.type === 1)
})

const sizes = ref([])


const hasColors = props.product.features.filter(f => f.type === 1).length > 1


for (var f of props.product.features) {
  if (f.type !== 0)
    continue

  let name = f.name.toLowerCase() === "tamaño unico" ? 'OS' : f.name

  if (useComboForSize && !hasSinglePrice.value && !hasColors) {
    name += " - " + formatMoney(props.product.productItems.find(pit => pit.sizeId === f.id).price.price)
  }

  f.description = name

  sizes.value.push(f)


}

onMounted(() => {
  var colorFeature = props.product.features.find(f => f.type === 1)
  if (colorFeature) {
    selectedColor.value = colorFeature
  }
})
</script>

<template>
  <span v-if="product.type == 0">

    <div
      v-if="colors.length > 0"
      class="variant-section mb-4"
    >
      <div class="variant-label mb-2">
        Color: <strong>{{ selectedColor?.name }}</strong>

      </div>
      <div class="d-flex gap-2 colors-form product-wrapper product-detail">


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

    <!-- Size selector -->
    <div class="variant-section mb-4">
      <div class="variant-label mb-2 d-flex justify-space-between">
        <div>
          Talla: <strong>{{ selectedSize?.name || '—' }}</strong>
        </div>
        <a
          class="size-guide-link ml-2"
          @click="onShowSizeChart"
        >
          <VIcon
            icon="tabler-ruler"
            size="13"
          />
          Guía de tallas
        </a>
      </div>
      <div class="sizes-form">
        <div
          v-if="!useComboForSize"
          class="default-selector-container"
        >
          <div
            v-for="size in sizes"
            class="radio"
            @click="isSizeAvailable(size) || openNotifyWhenAvailable(size)"
          >
            <div
              class="paack-2h-label"
              style="display: none;"
            >2H</div>
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
        <div v-else>
          <VSelect
            v-model="selectedSize"
            :items="sizes"
            :item-props="setSizeProps"
            placeholder="Seleccione talla"
            item-title="description"
            item-value="id"
            return-object
          />
        </div>
        <NotifyWhenAvailable
          v-model="showNotifyWhenAvailable"
          :product-item="selectedProductItem || 0"
        />
      </div>
      <div class="size-grid d-none">


        <!--
          <button
          v-for="size in sizes"
          :key="size.name"
          class="size-btn"
          :class="{
          'size-active': selectedSize.id === size.id,
          'size-soldout': !isSizeAvailable(size),
          'oosk': !isSizeAvailable(size)
          }"
          :disabled="!isSizeAvailable(size)"
          @click="onSelectSize(size)"

          >
          {{ size.name }}
          </button>
        -->
      </div>
      <div class="text-caption text-medium-emphasis mt-2 d-none">
        XS y XXL: disponibles solo en tienda física.
      </div>
    </div>


    <div class="availability-bar mb-4 d-none">
      <span class="avail-dot" />
      <span>
        <strong class="text-success">En stock</strong>
        — Ver disponibilidad por tienda
      </span>
    </div>
  </span>
  <span v-if="false && product.type == 0">


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
                  @click="onShowSizeChart"
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
              v-if="!useComboForSize"
              class="default-selector-container"
            >
              <div
                v-for="size in sizes"
                class="radio"
                @click="isSizeAvailable(size) || openNotifyWhenAvailable(size)"
              >
                <div
                  class="paack-2h-label"
                  style="display: none;"
                >2H</div>
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
            <div v-else>
              <VSelect
                v-model="selectedSize"
                :items="sizes"
                :item-props="setSizeProps"
                placeholder="Seleccione talla"
                item-title="description"
                item-value="id"
                return-object
              />
            </div>
          </div>

          <NotifyWhenAvailable
            v-model="showNotifyWhenAvailable"
            :product-item="selectedProductItem || 0"
          />
        </div>
      </div>
    </div>
    <!-- /sizes -->
  </span>
</template>

<style lang="scss">
/* ── Variants ────────────────────────────────────── */
.variant-label {
  font-family: 'Barlow Condensed', sans-serif;
  font-size: 13px;
  font-weight: 700;
  letter-spacing: .06em;
  text-transform: uppercase;
  color: #888;
}

.variant-label strong {
  color: black;
}
.color-swatch {
  width: 32px; height: 32px;
  border-radius: 50%;
  border: 3px solid transparent;
  outline: 2px solid #e0e0e0;
  cursor: pointer;
  transition: outline-color .2s, border-color .2s;
}

.color-swatch:hover { outline-color: #B21A15; }
.swatch-active { outline-color: #B21A15 !important; border-color: #fff; }

.size-grid { display: flex; gap: 6px; flex-wrap: wrap; }

.size-btn {
  font-family: 'Barlow Condensed', sans-serif;
  font-size: 14px;
  font-weight: 700;
  letter-spacing: .04em;
  padding: 7px 14px;
  border: 2px solid #e0e0e0;
  border-radius: 6px;
  background: #fff;
  color: #444;
  cursor: pointer;
  transition: border-color .2s, background .2s, color .2s;
  min-width: 46px;
  text-align: center;
}

.size-btn:hover:not(.size-soldout) { border-color: #B21A15; color: #B21A15; background: #fff0f0; }
.size-active { border-color: #B21A15 !important; background: #B21A15 !important; color: #fff !important; }
.size-soldout { opacity: .35; cursor: not-allowed; text-decoration: line-through; }

.size-guide-link {
  font-size: 12px;
  color: #B21A15;
  text-decoration: none;
  font-weight: 600;
}

/* ── Availability ────────────────────────────────── */
.availability-bar {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 14px;
  background: #f0fff5;
  border: 1px solid #b8f0cd;
  border-radius: 6px;
  font-size: 13px;
  color: #333;
}

.avail-dot {
  width: 10px; height: 10px;
  border-radius: 50%;
  background: #1a8a40;
  flex-shrink: 0;
  box-shadow: 0 0 0 3px rgba(26,138,64,.2);
  animation: pulse 2s infinite;
}


.radio input:checked.oosk + label:after {
  background-color: #ffae02 !important;
  border-color: #ffae02 !important;
  z-index: -1;
}

.radio input[type=radio]:checked.oosk + label .oosk__badge {
  background-color: #ffae02 !important;
}

.product-wrapper.product-detail .swatch.color-value.unavailable {
  cursor: not-allowed;
  opacity: 0.7;
  position: relative;
  overflow: hidden;

  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 141%;
    height: 2px;
    background-color: #CCCCCC;
    transform-origin: bottom left;
    transform: rotate(-45deg);
    pointer-events: none;
  }
}


.product-wrapper.product-detail .swatch-tile-container.color-tile {
  margin: 0;
  padding: 0;
}

button.color-attribute {
  padding-inline: 0;
}

.sizes-form {


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
    right: 0px;
    top: 0;
    transition: all .2s ease;
    width: 20px;
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

}
</style>
