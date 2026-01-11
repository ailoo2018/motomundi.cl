<script setup>
import { useGuestUser } from "@/composables/useGuestUser.js"
import CartItemProduct from "@/views/pages/cart/cart-item-product.vue"
import CartSummary from "@/views/pages/cart/cart-summary.vue"

const loadingCart = ref(false)
const cartStore = useCartStore()
const wuid = useGuestUser().value


// Fetch once on mount
onMounted(() => {
  cartStore.fetchCart(wuid)
})
</script>

<template>
  <main id="shop-cart">
    <div
      v-if="loadingCart"
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
      v-if="(!loadingCart) && (!cartStore.cart || !cartStore.cart.items || cartStore.cart.items.length === 0)"
      style="padding: 10px 10px;"
    >
      <div class="checkout__empty-content">
        <h2>Carro de Compra</h2>
        <p>
          Vaya, parece que no hay nada por aquí... <br>
          ¡Haz click más abajo para poder ver todas nuestras ofertas!
        </p>
        <a
          href="/"
          data-dr="false"
          class="button button--filled nuxt-link-active mtc-link"
        >
          Continuar comprando
        </a>
      </div>
    </section>
    <!-- /cart empty -->

    <span v-if="cartStore.cart && cartStore.cart.items">
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
              </li>

            </ul>
            <ul />
            <ul class="insurances-list" />
          </div>
        </main>


        <CartSummary :cart="cartStore.cart" />




      </div>
    </span>
  </main>
</template>

<style scoped lang="scss">
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
