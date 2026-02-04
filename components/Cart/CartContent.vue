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
const loading = ref(false)

onMounted(async () => {

/*  loading.value = true
  try {
    const wuid = useGuestUser().value
    await cartStore.fetchCart(wuid)
  }finally{
    loading.value = false
  }*/
})

</script>

<template>
  <div class="cart__content">
<!--    <div class="spinner-container" v-if="loading">
      <div class="spinner"></div>
    </div>-->
    <ul class="cart-items">
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

<style  lang="scss">

#shop-cart .cart-product .cart-product__info .cart-product__name {
  display: block;
  font-size: 14px;
  font-weight: 700;
  line-height: 1.1em;
  margin: 0;
  text-transform: uppercase;
}

#shop-cart .cart-product .cart-product__info .cart-product__price .product-old-price.strike {
  font-size: 11px;
  opacity: .4;
  text-decoration: line-through;
  text-align: left;
}

#shop-cart .cart-product .cart-product__info .cart-product__price .tag-wrapper {
  position: relative;
  top: -1px;
}

#shop-cart .cart-product .cart-product__info .cart-product__price .tag-wrapper .tag.product-tag {
  display: inline-block;
  line-height: 1.2em;
  margin-bottom: 0;
  padding: 1px 5px;
  white-space: nowrap;
}


.tag.product-tag.product-tag--old {
  color: #fff;
}

.tag.product-tag.product-tag--crazydays, .tag.product-tag.product-tag--offer, .tag.product-tag.product-tag--sales {
  background-color: #d6001c;
}

#shop-cart .cart__content, #shop-cart .cart__content * {
  box-sizing: border-box;
  margin-bottom: 0;
}

#shop-cart .product-image-wrapper  {
  min-width: 100px;
}


.cart-product{
  align-items: center;
  display: flex;
  flex-grow: 1;
}

.cart-product li .mtc-link, li > a {
  align-items: center;
  display: flex;
  flex-grow: 1;

}

.cart-product>span {
  flex: 0 0 80px;
  font-size: 12px;
  height: auto;
  margin-right: 10px;
  text-transform: uppercase;
  width: 80px;
}

#shop-cart li>a, li .mtc-link {
  font-weight: 400;
  padding: 0;
  text-transform: none;
}
#shop-cart .cart-product .cart-product__info .cart-product__details {
  display: block;
  line-height: 1.2em;
  margin-top: 4px;
}

#shop-cart .cart-product .cart-product__info {
  flex-grow: 1;
  font-size: 13px;
  margin: 0;
  max-width: 425px;
}
#shop-cart .cart-product .cart-product__info .cart-product__details .cart-product__size {
  align-items: center;
  display: inline-flex;
  gap: 8px;
}

#shop-cart .cart-product .cart-product__info {
  flex-grow: 1;
  font-size: 13px;
  margin: 0;
  max-width: 425px;
}

#shop-cart .cart-product .cart-product__info .cart-product__price {
  display: block;
  font-size: 14px;
  font-weight: 600;
  margin: 3px 0 0;
  text-transform: uppercase;
  text-align: left;
}

#shop-cart ul.cart-items li {
  border-bottom: 1px solid #ccc;
  padding: 15px 4px;
}


@media (max-width: 992px) {
  #shop-cart .cart-product .cart-product__info .cart-product__price .tag-wrapper .tag.product-tag {
    font-size: 10px;
  }
  #shop-cart .cart-product {
    margin: 10px 0;
  }

  #shop-cart .product-image-wrapper  {
    min-width: 70px;
  }


  #shop-cart ul.cart-items li {
    border-bottom: 1px solid #ccc;
    padding: 15px 20px;
  }
  #shop-cart .tag-wrapper {
    display: block;
  }
  .user-menu__cart-content ul li {
    padding: 15px 20px;
  }
}
</style>
