<script setup lang="ts">
import emptyImage from "@images/empty-image.avif"


const props = defineProps({
  cartItem: { type: Object, required: true },
})

const cartStore = useCartStore()
const wuid = useGuestUser().value // Access your guest ID

const increment = () => {
  cartStore.updateQuantity(wuid, props.cartItem.id, props.cartItem.quantity + 1)
}

const decrement = () => {
  if (props.cartItem.quantity > 1) {
    cartStore.updateQuantity(wuid, props.cartItem.id, props.cartItem.quantity - 1)
  }
}

const removeCartItem = () => {
  cartStore.removeItem(props.cartItem)
}
</script>

<template>
  <div class="cart__product">
    <div class="cart-item ">
      <!-- single product -->
      <article class="cart-product__wrapper">
        <a :href="cartItem.product.url" class="cart-product mtc-link">

          <span class="product-image-wrapper">
            <VImg

              :src="getImageUrl(cartItem.image, 150, getDomainId()) || emptyImage"
              :alt="cartItem.name"
              class="cdn-img"
            >          
              <template #error>
                <VImg
                  :src="emptyImage"

                  class="cdn-img ma-2"
                />
              </template>
            </VImg>
          </span>

          <div class="cart-product__info ml-2">
            <h1 class="cart-product__name">{{ cartItem.description }}</h1>


            <!-- color -->
            <p
              v-if="cartItem.color"
              class="cart-product__details"
            >
              <span class="cart-product__size">
                Color: {{ cartItem.color.name }}
              </span>
            </p>
            <!-- size -->
            <p
              v-if="cartItem.size"
              class="cart-product__details"
            >
              <span class="cart-product__size">
                Talla: {{ cartItem.size.name }}
              </span>
            </p>
            <p class="cart-product__price">
              <span class="tag-wrapper">
                <span
                  v-if="cartItem.discountPercent > 0"
                  class="tag product-tag product-tag--old product-tag--sales"
                >
                  <span class="discount">Rebajas -{{ cartItem.discountPercent }}%</span>
                </span>
                <span
                  v-if="cartItem.coupon != null"
                  class="tag product-tag product-tag--old product-tag--sales"
                >
                  <span class="discount">{{ cartItem.coupon.name }}
                    -{{ formatMoney(cartItem.couponDiscount) }}
                  </span>
                </span>

              </span>

              <span class="price"> {{ formatMoney(cartItem.price) }}</span>
              <span
                v-if="cartItem.discount > 0"
                class="product-old-price strike ml-2"
              >

                {{ formatMoney(cartItem.oldPrice) }}
              </span>
            </p>
          </div>
        </a>
        <div class="cart-product__tools">
          <div class="cart-product__quantity">
            <div class="quantity-buttons">
              <button
                class="increase"
                @click="increment"
              >
                <svg
                  class="sprite-line-icons"
                  width="14"
                  height="14"
                >
                  <use href="/content/svg/motomundi.svg#i-icon-angle-up" />
                </svg>
              </button>
              <button
                class="decrease"
                @click="decrement"
              >
                <svg
                  class="sprite-line-icons"
                  width="14"
                  height="14"
                >
                  <use href="/content/svg/motomundi.svg#i-icon-angle-down" />
                </svg>
              </button>
            </div>
            <input
              v-model="cartItem.quantity"
              class="remove-arrows"
              type="number"
              min="1"
              step="1"
            >
          </div>
          <button
            class="cart-product__remove ml-3"
            tabindex="-1"
            @click="removeCartItem"
          >
            <svg
              class="sprite-line-icons"
              width="9"
              height="9"
            >
              <title>Cross icon</title>
              <use href="/content/svg/motomundi.svg#i-icon-cross" />
            </svg>
            <span class="d-none d-md-inline">Eliminar</span>
          </button>
        </div>
      </article>
      <!-- /single product -->
    </div>
    <span
      class="cart-product__error"
      style="display: none;"
    >false</span>
  </div>
  <div
    class="spinner-container"
    ng-if="cartItem.isLoading"
  >
    <div class="spinner" />
  </div>
</template>
