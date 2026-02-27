<script setup lang="ts">
import { CartItemType } from "@/models/cart"

const props = defineProps({
  cartItem: { type: Object, required: true },
})

const cartStore = useCartStore()
const wuid = useGuestUser().value // Access your guest ID


const removeCartItem = () => {
  cartStore.removeItem(props.cartItem)
}
</script>

<template>
  <div
    v-if="cartItem.type === CartItemType.Coupon"
    class="cart__coupon"
  >
    <div class="cart-item ">
      <article class="cart-product__wrapper d-flex justify-space-between">
        <div class="d-flex">
          <span
            class="product-image-wrapper d-flex justify-center "
            style="width:150; margin-right: 10px"
          >
            <VIcon
              class="tabler-ticket"
              size="60"
              color="success"
            />
          </span>
          <div>
            <h1 class="cart-product__name font-weight-bold">
              {{ cartItem.coupon?.name }}
            </h1>
            <p class="cart-product__details mt-1">
              {{ cartItem.coupon.description }}
            </p>
            <p class="cart-product__price">


              <span class="price" style="color: #b21a15"> ({{ formatMoney(Math.abs(cartItem.price)) }})</span>
              <span
                v-if="cartItem.discount > 0"
                class="product-old-price strike ml-2"
              >

                {{ formatMoney(cartItem.oldPrice) }}
              </span>
            </p>
          </div>
        </div>
        <div class="cart-product__tools">
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
    </div>
  </div>
</template>


