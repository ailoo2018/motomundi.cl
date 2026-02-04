<script setup>
import { useGuestUser } from "@/composables/useGuestUser.js"
import CartItemProduct from "@/views/pages/cart/cart-item-product.vue"
import CartSummary from "@/views/pages/cart/cart-summary.vue"
import CartItemPack from "@/views/pages/cart/cart-item-pack.vue"
import { ProductType } from "@/models/products.js"

definePageMeta({
 // layout: 'motomundi',
  public: true,

})


const cartStore = useCartStore()
const wuid = useGuestUser().value
const hasFetched = ref(false)


const getProductType = product => {
  if(!product)
    return -1
  if(!product.type)
    return ProductType.Simple
  return product.type
}
// Fetch once on mount
onMounted(async () => {
  try {

    await cartStore.fetchCart(wuid)
  }finally{
    hasFetched.value = true
  }
})
</script>

<template>
  <main id="shop-cart">

    <div
      v-if="cartStore.loading || !hasFetched"
      class="pa-10 w-100 text-center "
    >
      <VProgressCircular
        indeterminate
        color="primary"
        size="64"
      />
    </div>
    <span v-else-if="hasFetched && cartStore.cart.items.length > 0"">
      <div
        class="cart container"
        style="margin-top:0px;padding-top:20px;"
      >
        <main class="cart__body">
          <header class="cart__title"><h1>Mi cesta </h1></header>

          <CartContent />
        </main>

        <CartSummary v-if="!cartStore.loading && cartStore.cart" :cart="cartStore.cart" />

      </div>
    </span>

    <!-- cart empty -->
    <section
      v-else-if="hasFetched && cartStore.cart.items.length === 0"
      class="text-center pa-10 "
    >
      <div class="checkout__empty-content" >
        <h2>Carro de Compra  </h2>
        <p>
          Vaya, parece que no hay nada por aquí... <br>
          ¡Haz click más abajo para poder ver todas nuestras ofertas!
        </p>
        <a
          href="/"
          class="button button--filled nuxt-link-active mtc-link mt-5"
        >
          Continuar comprando
        </a>
      </div>
    </section>
    <!-- /cart empty -->

  </main>
</template>

<style scoped lang="scss">


.spinner-container {
  /* Position the spinner container */
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;

  /* Center the spinner */
  display: flex;
  justify-content: center;
  align-items: center;

  /* Semi-transparent overlay */
  background-color: rgba(255, 255, 255, 0.8);
}

.spinner {
  width: 32px;
  height: 32px;
  border: 4px solid #e5e5e5;
  border-top: 4px solid #c74044;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

.button {
  background-color: #bd0019;
  border-color: #bd0019;
  box-shadow: inset 0 2px 4px 0 rgba(0, 0, 0, .3);
  color: #fff;

  box-sizing: border-box;
  display: inline-block;
  font-size: 10px;
  font-weight: 700;
  letter-spacing: .5px;
  overflow: hidden;
  padding: 13px 25px;
  position: relative;
  text-align: center;
  text-transform: uppercase;
  transition: all .2s ease-in-out;
  z-index: 1;
}

.button:active, .button:focus {
  background-color: #bd0019;
  border-color: #bd0019;
  box-shadow: inset 0 2px 4px 0 rgba(0, 0, 0, .3);
  color: #fff;
}


#shop-cart * {
  box-sizing: border-box;
}

#shop-cart .cart {
  display: grid;
  grid-template-areas: "cart"
        "summary"
        "cross-selling";
  grid-template-columns: 100%;
  grid-template-rows: auto;
  line-height: 1.2em;
  margin: 0 auto 16px;
  transition: opacity .6s ease;
  width: 100%;
}


#shop-cart .cart__content ul li {
  border-bottom: 1px solid #e4eaee;
  padding: 15px 0;
  position: relative;
}



#shop-cart li .mtc-link, #shop-cart li > a {
  font-weight: normal;
  padding: 0;
  text-transform: none;
}

#shop-cart .cart .cart__body {
  grid-area: cart;
  padding: 12px 15px;
  transition: all .4s ease;
}

#shop-cart .cart .cart__body .cart__title h1 {
  border-bottom: 1px solid #000;
  font-size: 18px;
  font-weight: 700;
  margin: 5px 0 10px;
  padding: 0 0 10px;
  text-transform: uppercase;
}

@media only screen and (min-width: 601px) {
  #shop-cart .cart {
    grid-template-areas:
        "cart summary"
        "cross-selling cross-selling";
    grid-template-columns: 66% 34%;
    margin: 24px auto;
  }
}
</style>
