<script setup>
import Coupon from "~/components/Cart/Coupon.vue"
import { useGuestUser } from "@/composables/useGuestUser.js"
import CartContent from "@/components/Cart/CartContent.vue"

const props = defineProps({
  isCollapsed: {
    type: Boolean,
    required: true,
  },
})

const emit = defineEmits(['cartEmpty', 'nextStep', 'collapse'])

const { isMobile } = useDevice()

const { isLoading, updateLoading } = inject('loading')
const checkoutService = inject('checkoutService')
const { cart, coupon } = inject('checkoutService')
const config = useRuntimeConfig()
const isCollapsed = ref(false)

const baseUrl = config.public.LEGACY_URL

if (props.isCollapsed != null) {
  isCollapsed.value = props.isCollapsed
}

watch(props, newValue => {
  isCollapsed.value = newValue.isCollapsed
  console.log("isCollapsed in CartSummary", isCollapsed.value)
})

watch(isCollapsed, newValue => {
  emit("collapse", newValue)
})

watch(() => cart, newValue => {
  console.log("cart change", cart)
}, { deep: true })

watch(() => coupon, newValue => {
  console.log("coupon changed!!!", coupon)
})


const updateQuanity = async item => {
  try {
    const { data, error: fetchError } = await useFetch(config.public.LEGACY_URL + '/Cart/ChangeQuantity.rails', {
      credentials: 'include',
      method: 'POST',
      body: {
        id: item.id,
        quantity: item.quantity,
      },
      headers: {
        'Content-Type': 'application/json',
      },
    })


    if (data.value) {
      cart.value = data.value.cart
    }

  } catch (e) {
    console.log(e)
  }
}

const increase = async item => {
  console.log("increase", item)
  item.quantity++
  await updateQuanity(item)
}

const decrease = async item => {
  if (item.quantity > 1) {
    item.quantity--
    await updateQuanity(item)
  }

}

const removeItem = async item => {
  // call rest
  cart.value.items = cart.value.items.filter(it => {
    return it.id !== item.id
  })
  item.quantity = 0
  await updateQuanity(item)
  console.log("removed item")

  if (cart.value.items.length === 0)
    emit('cartEmpty', true)
}

const quantityChanged = async (item, qty) => {
  console.log("quantityChanged", item)
  var quantity = parseInt(qty)
  if (item.quantity !== quantity) {
    item.quantity = quantity
    await updateQuanity(item)
  }
}

const cartStore = useCartStore()
const wuid = useGuestUser().value

onMounted(async () => {
  updateLoading(true)

  await cartStore.fetchCart(wuid)
  cart.value = cartStore.cart

  updateLoading(false)

})

const handleNextStep = async () => {
  emit("nextStep")
}

const getCart = async () => {}

defineExpose({ getCart })
</script>

<template>
  <div
    class="cart-summary "
    :class="{ 'collapsed' : isCollapsed}"
  >
    <div
      id="cart-summary__content"
      class="cart-summary__content"
    >
      <div class="cart-summary__content-header">
        <span
          class="hide-details"
          @click="isCollapsed = !isCollapsed"
        >
          Ocultar detalles
          <svg
            width="9"
            height="8"
            xmlns="http://www.w3.org/2000/svg"
            class="icon sprite-line-icons"
          >
            <title>Ocultar detalles</title>
            <use
              href="/svg/ailoo.svg#i-icon-cross"
              xlink:href="/svg/ailoo.svg#i-icon-cross"
            />
          </svg>
        </span>
      </div>
      <div class="cart-summary__content-body">
        <VCard  class="mobile-plain-card">
          <VCardTitle>
            <h2 style="margin:4px">
              Resumen de pedido
            </h2>
          </VCardTitle>
          <VCardText>
            <div class="cart-summary__totals">
              <div class="totals__item">
                <span class="item__label">Subtotal</span>
                <span class="item__price">{{ formatMoney(cart.netTotal) }}</span>
              </div>
              <div class="totals__item">
                <span class="item__label">Impuestos (I.V.A.)</span>
                <span class="item__price">{{ formatMoney(cart.iva) }}</span>
              </div>
              <div class="totals__item">
                <span class="item__label">Envío</span>
                <span class="item__price">{{
                  cart.shipping && cart.shipping.cost > 0 ? formatMoney(cart.shipping.cost) : 'Gratis'
                }} </span>
              </div>
              <div class="totals__item totals__item--total">
                <span class="item__label">Total</span>
                <span class="item__price">
                  <span id="cart-total">{{ formatMoney(cart.total) }}</span>
                </span>
              </div>
            </div>
            <div class="motocoins-claim cart-summary__motocoins">
              <VIcon class="tabler-coin-monero-filled" color="primary"></VIcon>
              <div class="motocoins-claim__info">
                <span class="motocoins-claim__amount">Acumula <strong>{{ cart.points }} Mundipesos </strong> con esta compra.</span>
              </div>
            </div>
          </VCardText>
        </VCard>

        <VCard class="mt-4 mobile-plain-card">
          <VCardText>
            <Coupon
              v-model="coupon"

              :coupon-discount="couponDiscount"
            />
          </VCardText>
        </VCard>

        <VCard class="mt-4 mobile-plain-card">
          <VCardText>
            <div
              id="shop-cart"
              class="summary"
            >
              <h2>Mi cesta</h2>
              <CartContent />
            </div>
          </VCardText>
        </VCard>
      </div>
    </div>
  </div>
</template>

<style scoped>
input[type=number].remove-arrows {
  -moz-appearance: textfield;
}

input[type="number"]::-webkit-inner-spin-button,
input[type="number"]::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}


.cart-product__tools .cart-product__quantity .quantity-buttons button:active {
  background-color: #d6001c;
}

button:focus {
  background-color: transparent;
  outline: none;
}

.cart-product__tools .cart-product__quantity .quantity-buttons button:active use {
  stroke: #fff;
}

.cart-product__tools .cart-product__quantity .quantity-buttons button {
  align-items: center;
  background-color: #f5f5f5;
  display: flex;
  height: 48%;
  justify-content: center;
  padding: 0 6px;
}


a, button, span.mtc-link {
  transition: all .25s ease-out;
}

.cart-product__wrapper:hover .cart-product__remove {
  right: -24px;
}

.cart-product__tools .cart-product__remove:hover {
  background-color: #d6001c;
}

.cart-product__tools .cart-product__remove:hover svg {
  margin-right: 5px;
}

.cart-product__tools .cart-product__remove:hover use {
  stroke: #fff;
}

.cart-product__tools .cart-product__remove svg {
  -webkit-transform: scale(.8);
  transform: scale(.8);
  vertical-align: -1px;
  margin-right: 3px;
}

.cart-product__tools .cart-product__remove:hover {
  right: -38px !important;
}


.cart-product__tools .cart-product__remove span {
  display: none;
}

.cart-product__tools .cart-product__remove:hover span {
  display: inline-block;
  margin-right: 20px;
}

.cart-summary .cart-summary__content .cart-summary__motocoins {
  font-size: 16px;
  line-height: 1.3em;
  margin: 0 0 10px;
  padding: 10px 0;
}

.cart-summary .cart-summary__content .cart-summary__motocoins svg {
  top: 0;
}

.checkout svg use {
  stroke-width: .8px;
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


@media only screen and (min-width: 601px) {
  .motocoins-claim {
    padding: 10px 0;
  }
}


.checkout h2 {
  font-size: 18px;
  font-weight: 700;
  margin: 5px 0 20px;
  padding: 0;
  text-transform: uppercase;
}

.summary h2 {
  border-bottom: 1px solid #000;
  padding-bottom: 10px;
}


input:not([type]):focus:not([readonly]), input[type=date]:not(.browser-default):focus:not([readonly]), input[type=datetime-local]:not(.browser-default):focus:not([readonly]), input[type=datetime]:not(.browser-default):focus:not([readonly]), input[type=email]:not(.browser-default):focus:not([readonly]), input[type=number]:not(.browser-default):focus:not([readonly]), input[type=password]:not(.browser-default):focus:not([readonly]), input[type=search]:not(.browser-default):focus:not([readonly]), input[type=tel]:not(.browser-default):focus:not([readonly]), input[type=text]:not(.browser-default):focus:not([readonly]), input[type=time]:not(.browser-default):focus:not([readonly]), input[type=url]:not(.browser-default):focus:not([readonly]), textarea.materialize-textarea:focus:not([readonly]) {
  border-bottom: 1px solid #41a334;
  box-shadow: 0 1px 0 0 #41a334;
}

.input__group input:not([type]), .input__group input[type=date]:not(.browser-default), .input__group input[type=datetime-local]:not(.browser-default), .input__group input[type=datetime]:not(.browser-default), .input__group input[type=email]:not(.browser-default), .input__group input[type=number]:not(.browser-default), .input__group input[type=password]:not(.browser-default), .input__group input[type=search]:not(.browser-default), .input__group input[type=tel]:not(.browser-default), .input__group input[type=text]:not(.browser-default), .input__group input[type=time]:not(.browser-default), .input__group input[type=url]:not(.browser-default), .input__group textarea {
  background-color: #fff;
  border-color: #d8d8d8;
  font-weight: 300;
  height: 45px;
  margin: 0;
  padding: 17px 10px 3px;
}


input:not([type]) + label:after, input[type=date]:not(.browser-default) + label:after, input[type=datetime-local]:not(.browser-default) + label:after, input[type=datetime]:not(.browser-default) + label:after, input[type=email]:not(.browser-default) + label:after, input[type=number]:not(.browser-default) + label:after, input[type=password]:not(.browser-default) + label:after, input[type=search]:not(.browser-default) + label:after, input[type=tel]:not(.browser-default) + label:after, input[type=text]:not(.browser-default) + label:after, input[type=time]:not(.browser-default) + label:after, input[type=url]:not(.browser-default) + label:after, textarea.materialize-textarea + label:after {
  content: "";
  display: block;
  left: 0;
  opacity: 0;
  position: absolute;
  top: 100%;
  transition: opacity .2s ease-out, color .2s ease-out;
}

.input__group input:not([type]):focus + label, .input__group input:not([type]):not(:placeholder-shown) + label, .input__group input[type=date]:not(.browser-default):focus + label, .input__group input[type=date]:not(.browser-default):not(:placeholder-shown) + label, .input__group input[type=datetime-local]:not(.browser-default):focus + label, .input__group input[type=datetime-local]:not(.browser-default):not(:placeholder-shown) + label, .input__group input[type=datetime]:not(.browser-default):focus + label, .input__group input[type=datetime]:not(.browser-default):not(:placeholder-shown) + label, .input__group input[type=email]:not(.browser-default):focus + label, .input__group input[type=email]:not(.browser-default):not(:placeholder-shown) + label, .input__group input[type=number]:not(.browser-default):focus + label, .input__group input[type=number]:not(.browser-default):not(:placeholder-shown) + label, .input__group input[type=password]:not(.browser-default):focus + label, .input__group input[type=password]:not(.browser-default):not(:placeholder-shown) + label, .input__group input[type=search]:not(.browser-default):focus + label, .input__group input[type=search]:not(.browser-default):not(:placeholder-shown) + label, .input__group input[type=tel]:not(.browser-default):focus + label, .input__group input[type=tel]:not(.browser-default):not(:placeholder-shown) + label, .input__group input[type=text]:not(.browser-default):focus + label, .input__group input[type=text]:not(.browser-default):not(:placeholder-shown) + label, .input__group input[type=time]:not(.browser-default):focus + label, .input__group input[type=time]:not(.browser-default):not(:placeholder-shown) + label, .input__group input[type=url]:not(.browser-default):focus + label, .input__group input[type=url]:not(.browser-default):not(:placeholder-shown) + label, .input__group textarea:focus + label, .input__group textarea:not(:placeholder-shown) + label {
  font-size: 12px;
  left: 7px;
  padding: 0 5px;
  top: 1px;
  -webkit-transform: translate(0);
  transform: translate(0);
}

.summary ul li .cart-product .cart-product__price .cart-product__discounts {
  flex-shrink: 0;
  order: 1;
  position: relative;
  top: 1px;

}

.cart-product .cart-product__info .cart-product__price .cart-product__discounts .discount {
  background-color: #d6001c;
  color: #fff;
  font-size: 10px;
  font-weight: 700;
  padding: 1px 5px;
  position: relative;
  top: -1px;
  white-space: nowrap;
}

.cart-product .cart-product__info .cart-product__price .tag-wrapper .tag.product-tag {
  display: inline;
  line-height: 1.2em;
  margin: 0 3px 0 0;
  padding: 1px 5px;
  white-space: nowrap;

}

.cart-product .cart-product__info .cart-product__price .product-old-price.strike {
  font-size: 11px;
  opacity: .4;
  -webkit-text-decoration: line-through;
  text-decoration: line-through;
  margin-left: 4px;
}

.cart-summary__content-header .hide-details {
  cursor: pointer;
}

button.button:hover {
  cursor: pointer;
}

button.button .actions__continue {

  background-color: black;
}

@media only screen and (min-width: 601px) and (max-width: 992px) {
  .cart-product__tools .cart-product__remove {
    float: right;
    height: 1.6rem;
    line-height: 1.6rem;
    padding: 0 13px 0 12px;
    position: static;
    -webkit-transform: none;
    transform: none;
  }
}

@media only screen and (min-width: 601px) and (max-width: 992px) {
  .cart-product__tools .cart-product__remove:hover span {
    color: #fff;
  }
}


@media only screen and (min-width: 601px) and (max-width: 992px) {
  .cart-product__tools .cart-product__remove:hover span, .cart-product__tools .cart-product__remove:hover svg {
    margin-right: 3px;
  }
}

@media only screen and (min-width: 601px) and (max-width: 992px) {
  .cart-product__tools .cart-product__remove span {
    color: #000;
    display: inline-block;
  }
}


@media only screen and (max-width: 600px) {
  .cart-summary .cart-summary__content {
    background: #fff;
    bottom: 0;
    height: 100vh;
    left: 0;
    overflow: scroll;
    position: fixed;
    right: 0;
    top: 0;
    transition: all .4s ease;
  }
}

@media only screen and (max-width: 600px) {
  .cart-summary.collapsed .cart-summary__content {
    top: 100%;
  }
}

/* pack  */
p.cart-product__content {
  margin-bottom: 10px;
}
.cart-product__content {
  color: #747474;
  font-size: 14px;
  margin: 10px 0;
}

@media only screen and (min-width: 601px) {
  .cart__product .cart-product img {
    height: 120px;
    width: 120px;
  }
}

.cart__content, #shop-cart .cart__content * {
  box-sizing: border-box;
  margin-bottom: 0;
}

.cart__content, #shop-cart .cart__content * {
  box-sizing: border-box;
  margin-bottom: 0;
}

@media only screen and (min-width: 601px) {
  .cart__product[data-v-c76e6286] .cart-product .mtc-link, .cart__product .cart-product > span {
    flex: 0 0 120px;
    width: 120px;
  }
}
li .mtc-link, #shop-cart li > a {
  font-weight: normal;
  padding: 0;
  text-transform: none;
}
.cart-product {
  align-items: center;
  display: flex;
  flex-grow: 1;
}

@media (max-width: 600px) {
  .mobile-plain-card {
    box-shadow: none !important;
    background-color: transparent !important;
    border: none !important;
  }
}

</style>
