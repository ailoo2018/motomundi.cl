<script setup>
const props = defineProps({
  cart: {
    type: Object,
  },
})


const cartStore = useCartStore()


const checkout = async cart => {
  await navigateTo('/checkout')
}

const totalItems =  computed( () => {
  if(cartStore.cart && cartStore.cart.totalItems > 0) {
    return cartStore.cart.totalItems
  }

  let total = 0;
  for(var item of cartStore.cart.items){
    total = total + item.quantity
  }

  return total
})

const itemsTotal = computed(() => {
  let total = 0;
  for(var item of cartStore.cart.items){
    total = total + (item.quantity*item.price)
  }

  return total

})

const getTotalPoints = () => {
  return 0
}
</script>

<template>
  <aside class="cart__summary">
    <div class="cart-summary collapsed show-free-shipping">
      <div
        id="cart-summary__content"
        class="cart-summary__content"
      >
        <div class="cart-summary__content-body">
          <h2>Resumen de pedido</h2>
          <div class="free-shipping-indicator free no-animated">
            <p
              v-if="cart.shipping?.cost == 0"
              class="free-shipping_notice"
            >
              <svg
                class="sprite-line-icons"
                width="23"
                height="22"
              >
                <use href="/content/svg/motomundi.svg#i-icon-checkout-shipping" />
              </svg>
              <span><strong>Envío gratis</strong> disponible para tu pedido!</span>
            </p>
            <p
              v-if="cart.shipping?.cost > 0"
              class="free-shipping_notice"
            >
              <svg
                class="sprite-line-icons"
                width="23"
                height="22"
              >
                <use href="/content/svg/motomundi.svg#i-icon-checkout-shipping" />
              </svg>
              <span><strong>Tarifa fija de {{ cart.shipping?.cost }}</strong> disponible para tu pedido!</span>
            </p>
            <div
              class="free-shipping_progress-bar"
              style="background-color: rgb(238, 238, 238);"
            >
              <div
                class="free-shipping_progress-bar-fill"
                style="clip-path: inset(0px calc(0%) 0px 0px);"
              />
            </div>
          </div>
          <div class="cart-summary__totals">
            <div class="totals__item">
              <span class="item__label">{{ totalItems }} artículos</span>
              <span class="item__price">{{ formatMoney( itemsTotal ) }}</span>
            </div>
            <div class="totals__item">
              <span class="item__label">Envío</span>
              <span
                v-if="cart.shipping?.cost == 0"
                class="item__price"
              >Gratis</span>
              <span
                v-if="cart.shipping?.cost > 0"
                class="item__price"
              >{{ formatMoney(cart.shipping?.cost) }}</span>
            </div>
            <div class="totals__item totals__item&#45;&#45;total">
              <span class="item__label">Total</span>
              <span class="item__price"><span id="cart-total">{{ formatMoney( cart.total ) }}</span>
                <span
                  v-if="cart.oldPrice > cart.total"
                  class="totals__item&#45;&#45;old-total"
                >{{ cart.oldPrice }}</span>
              </span>
            </div>
          </div>
          <div class="motocoins-claim cart-summary__motocoins">
            <VIcon class="tabler-coin-monero-filled" color="primary"></VIcon>
            <div class="motocoins-claim__info">
              <span class="motocoins-claim__amount">
                Acumula <strong style="font-weight: 500">{{ formatMoney( cart.points ) }} mundipesos</strong> con esta compra.
              </span>
            </div>
          </div>
          <div class="cart-summary__actions">
            <button
              type="button"
              class="cart-buy-button button&#45;&#45;skewed"
              @click="checkout(cart)"
            >
              <span>
                <svg
                  class="sprite-line-icons"
                  width="17"
                  height="18"
                >
                  <use href="/content/svg/motomundi.svg#icon-shopping-bag" /></svg>
                Finalizar compra
              </span>
            </button>
            <button
              class="cart-paypal-button"
              style="margin-top: 4px;display:none;"
            >
              <svg
                width="17"
                height="20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M16.475 5.9c-1.215 5.217-4.92 6.1-9.897 6.1l-1.5 8h2.747c.5 0 .71-.341.802-.821.685-4.331.59-3.622.651-4.3.06-.378.386-.879.77-.879 3.65 0 6.07-1.055 6.81-4.842.262-1.347.176-2.386-.383-3.258M5.134 11.86L4.01 18H.535c-.329 0-.58-.402-.529-.726L2.602.751A.892.892 0 0 1 3.484 0h6.234c3.69 0 6.176 1.401 5.601 5.054C14.313 11.56 8.737 11 6.2 11c-.44 0-.996.428-1.065.86"
                  fill="#FFF"
                  fill-rule="evenodd"
                />
              </svg>
              <span> Pagar con MercadoPago</span>
            </button>
          </div>
          <div class="d-flex gap-2 financing" v-if="cart.financing">
            <span class="financing__description">
              <span>Desde <strong>{{ formatMoney(cart.financing.cuota ) }}</strong> sin intereses (0% TAE)</span>
            </span>
            <span class="d-flex gap-1 financing__logos">
              <span>
                <img
                  alt="webpay"
                  class="v-lazy-image v-lazy-image-loaded cdn-img"
                  :src="'/content/assets/logos/webpay.png'"
                >
              </span>
              <span>
                <img
                  alt="paypal"
                  class="v-lazy-image v-lazy-image-loaded cdn-img"
                  :src="'/content/assets/images/financing/financing-mercadopago.svg'"
                >
              </span>
            </span>
          </div>
          <a
            class="cart-summary__conditions-link mtc-link"
            data-dr="true"
            href="/terminos-y-condiciones"
          >Condiciones de la compra</a>
        </div>
      </div>
    </div>
  </aside>
</template>

<style scoped lang="scss">
#shop-cart .cart-summary h2 {
  font-size: 18px;
  font-weight: 700;
  margin: 5px 0 20px;
  padding: 0 0 10px;
  text-align: left;
  text-transform: uppercase;
}

#shop-cart .free-shipping-indicator .free-shipping_notice svg {
  display: inline-block;
  margin-right: 2px;
  scale: .8;
  vertical-align: -6px;
}

#shop-cart .free-shipping-indicator .free-shipping_notice strong {
  font-weight: 700;
  white-space: nowrap;
}

#shop-cart .free-shipping-indicator .free-shipping_notice {
  font-size: 12px;
  font-weight: 300;
  line-height: .8em;
  margin: 0;
  overflow-x: hidden;
  padding: 0 2px 6px;
  text-align: left;
}

#shop-cart .cart-summary .cart-summary__content .cart-summary__totals {
  margin: 18px 0;
}

#shop-cart .cart-summary .cart-summary__content .cart-summary__motocoins {
  font-size: 16px;
  line-height: 1.3em;
  margin: 0 0 10px;
  padding: 10px 0;
}

.motocoins-claim {
  align-items: flex-start;
  display: flex;
  font-size: 12px;
  gap: 4px;
  justify-content: flex-start;
  line-height: 1.2em;
  padding: 2px 0;
}

#shop-cart .cart .cart__summary {
  grid-area: summary;
  padding: 12px 15px;
}

#shop-cart .financing span img {
  height: 20px;
  margin-right: 4px;
  max-width: 60px;
  vertical-align: -4px;
  width: auto;
}

#shop-cart .financing span {
  display: inline;
  vertical-align: middle;
}

#shop-cart .financing span {
  display: inline;
  vertical-align: middle;
}

#shop-cart .free-shipping-indicator .free-shipping_notice strong {
  font-weight: 700;
  white-space: nowrap;
}

#shop-cart .cart-summary .cart-summary__content .cart-summary__totals .totals__item {
  align-items: baseline;
  display: flex;
  justify-content: space-between;
  padding: 4px 0;
}

#shop-cart .item__price {
  color: #000;
  font-size: 14px;
  font-weight: normal;
  line-height: 20px;
}

#shop-cart .cart-summary .cart-summary__content .cart-summary__totals .totals__item.totals__item--total {
  border-top: 1px solid #d3d3d3;
  margin-top: 10px;
  padding-top: 10px;
}

#shop-cart .cart-summary .cart-summary__content .cart-summary__totals .totals__item.totals__item--total .item__label {
  font-weight: 700;
  text-transform: uppercase;
}

#shop-cart .cart-summary .cart-summary__content .cart-summary__totals .totals__item.totals__item--total .item__price {
  font-size: 18px;
  font-weight: 700;
}

#shop-cart .cart-buy-button, .cart-paypal-button {
  color: #fff;
  display: block;
  font-size: 12px;
  font-weight: 600;
  padding: 12px;
  text-align: center;
  text-transform: uppercase;
  width: 100%;
}

#shop-cart .cart-summary .financing {
  border-top: none;
  display: block;
  font-size: 16px;
  margin: 28px 0 20px;
}

#shop-cart .cart-summary .financing strong {
  font-size: 16px;
  font-weight: bold;
}

#shop-cart .cart-buy-button {
  background-color: #000;
}

</style>
