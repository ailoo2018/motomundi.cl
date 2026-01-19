<script setup>
import { useGuestUser } from "@/composables/useGuestUser.js"
import CartItemProduct from "@/views/pages/cart/cart-item-product.vue"
import CartSummary from "@/views/pages/cart/cart-summary.vue"
import CartItemPack from "@/views/pages/cart/cart-item-pack.vue"


const cartStore = useCartStore()
const wuid = useGuestUser().value


// Fetch once on mount
onMounted(async () => {
  try {

    await cartStore.fetchCart(wuid)
  }finally{

  }
})
</script>

<template>
  <main id="shop-cart">
    <div
      v-if="cartStore.loading"
      class="pa-10 w-100 text-center"
    >
      <VProgressCircular
        indeterminate
        color="primary"
        size="64"
      />
    </div>

    <!-- cart empty -->
    <section
      v-if="(!cartStore.loading) && (!cartStore.cart || !cartStore.cart.items || cartStore.cart.items.length === 0)"
      class="text-center pa-10 "

    >
      <div class="checkout__empty-content">
        <h2>Carro de Compra</h2>
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

    <span v-if="!cartStore.loading && cartStore.cart && cartStore.cart.items.length > 0">
      <div
        class="cart container"
        style="margin-top:0px;padding-top:20px;"
      >
        <main class="cart__body">
          <header class="cart__title"><h1>Mi cesta </h1></header>
          <div class="cart__content">
            <ul>
              <li v-for="(cartItem, index) in cartStore.cart.items" :key="cartItem.id">
                <CartItemProduct v-if="cartItem.type === 0" :cartItem="cartItem"  />
                <CartItemPack v-if="cartItem.type === 3" :cartItem="cartItem" />
              </li>

            </ul>
            <ul />
            <ul class="insurances-list" />
          </div>
        </main>


        <CartSummary v-if="!cartStore.loading && cartStore.cart" :cart="cartStore.cart" />




      </div>
    </span>
  </main>
</template>

<style scoped lang="scss">
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

#shop-cart .cart__content, #shop-cart .cart__content * {
  box-sizing: border-box;
  margin-bottom: 0;
}

#shop-cart .cart__content ul li {
  border-bottom: 1px solid #e4eaee;
  padding: 15px 0;
  position: relative;
}

#shop-cart .cart__content, #shop-cart .cart__content * {
  box-sizing: border-box;
  margin-bottom: 0;
}

#shop-cart .cart__content, #shop-cart .cart__content * {
  box-sizing: border-box;
  margin-bottom: 0;
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
  margin: 5px 0 20px;
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
