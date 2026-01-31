<script setup lang="ts">

import {ProductType} from "@/models/products";
import CartItemPack from "@/views/pages/cart/cart-item-pack.vue";
import CartItemProduct from "@/views/pages/cart/cart-item-product.vue";

const getProductType = product => {
  if(!product)
    return -1
  if(!product.type)
    return ProductType.Simple
  return product.type
}

const cartStore = useCartStore()

</script>

<template>
  <div class="cart__content">
    <ul>
      <li v-for="(cartItem, index) in cartStore.cart.items" :key="cartItem.id">
        <CartItemProduct v-if="cartItem.type === 0 && getProductType(cartItem.product) === ProductType.Simple" :cartItem="cartItem"  />
        <CartItemPack v-if="cartItem.type === 3 || getProductType(cartItem.product) === ProductType.Composite" :cartItem="cartItem" />


        <div class="spinner-container" v-if="cartItem.loading">
          <div class="spinner"></div>
        </div>
      </li>

    </ul>
    <ul />
    <ul class="insurances-list" />
  </div>
</template>

<style scoped lang="scss">

</style>
