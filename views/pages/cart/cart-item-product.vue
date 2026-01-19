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
    <div class="cart-item">
      <!-- single product -->
      <article class="cart-product__wrapper">
        <a
          class="cart-product mtc-link"
          data-dr="true"
        >
          <span>

            <VImg
              width="120"
              height="120"
              :src="getImageUrl(cartItem.image, 300, getDomainId()) || emptyImage"
              :alt="cartItem.name"
              class="cdn-img"
            >          <template #error>
              <VImg
                :src="emptyImage"
                width="120"
                height="120"
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
                class="product-old-price strike"
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
            <span >Eliminar</span>
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


<style lang="scss">
@media only screen and (min-width: 601px) {
  #shop-cart .cart__product .cart-product img {
    height: 120px;
    width: 120px;
  }
}


#shop-cart .cart-product {
  align-items: center;
  display: flex;
  flex-grow: 1;
}

#shop-cart .cart-product__wrapper {
  align-items: stretch;
  -moz-column-gap: 10px;
  column-gap: 10px;
  display: flex;
  flex-grow: 1;
  flex-wrap: wrap;
  overflow: hidden;
  position: relative;
  row-gap: 4px;
}

input[type=number].remove-arrows {
  -moz-appearance: textfield;
}
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

.sprite-line-icons use {
  fill-rule: evenodd;
  fill: none;
  stroke: #2a2a2a;
  stroke-width: 1.5;
  stroke-linecap: round;
  stroke-linejoin: round;
}

#shop-cart .cart-product__tools .cart-product__remove svg {
  transform: scale(.8);
  vertical-align: -1px;
  margin-right: 4px;
}

#shop-cart .cart-product__tools .cart-product__remove {
  background-color: #f2f2f2;
  border-radius: 200px;
  color: #fff;
  font-size: 10px;
  height: 1.6rem;
  line-height: 1.6rem;
  margin: 0;
  padding: 0 13px 0 12px;
  text-transform: uppercase;
}

#shop-cart .cart-product__tools .cart-product__remove span {
  color: #000;
  display: inline-block;
}


#shop-cart .cart-product__tools .cart-product__quantity {
  display: inline-block;
  margin: 0 !important;
  position: relative;
}

#shop-cart .cart-product__tools input[type=number] {
  border: 1px solid #dbdbdb !important;
  color: #000;
  font-size: 14px;
  font-weight: 700;
  height: 2.4rem;
  margin: 0;
  max-width: 75px;
  min-width: 75px;
  padding: 10px 30px 10px 10px;
  text-align: center;
}

#shop-cart .cart-product__tools .cart-product__quantity {
  display: inline-block;
  margin: 0 !important;
  position: relative;
}

#shop-cart .cart-product__tools .cart-product__quantity .quantity-buttons {
  align-content: stretch;
  bottom: 1px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: absolute;
  right: 1px;
  top: 1px;
}
#shop-cart .cart-product__tools .cart-product__quantity .quantity-buttons button {
  align-items: center;
  background-color: #f5f5f5;
  display: flex;
  height: 48%;
  justify-content: center;
  padding: 0 6px;
}

#shop-cart .cart-product__tools .cart-product__quantity .quantity-buttons button {
  align-items: center;
  background-color: #f5f5f5;
  display: flex;
  height: 48%;
  justify-content: center;
  padding: 0 6px;
}
</style>
