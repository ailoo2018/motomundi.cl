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



#shop-cart h1 {
  margin:0;
}

#shop-cart li .mtc-link, li > a{
  padding: 0
}


#shop-cart .price {
  font-weight: 700;
  font-size: 1.1em
}

@media only screen and (min-width: 601px) {
  #shop-cart .cart__product .cart-product img {
    /*
    height: 120px;
    width: 120px;
    */
  }
}

.bike-selector-wrapper {
  container-type: inline-size;
  container-name: imageContainer;
  width: 100%;
}

@container imageContainer (max-width: 700px) {
  #shop-cart .responsive-grid {
    flex-direction: row;
    align-items: flex-start;
  }

  #shop-cart .grid-item {
    flex: 1; /* Distributes 25% width to each of the 4 items */
    min-width: 0;
  }
}

#shop-cart h1 {
  font-size: 1.2em;
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
