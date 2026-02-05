<script setup>
import { ref } from 'vue'
import { useCheckoutStore } from '~/stores/checkout'
import CheckoutStepper from '~/components/CheckoutStepper.vue'
import CustomerInformation from '~/components/CustomerInformation.vue'
import Shipping from '~/components/Shipping.vue'
import Payment from '~/components/Payment.vue'
import CartSummary from "~/components/CartSummary.vue"
import Empty from "~/components/Empty.vue"
import { useCartStore } from "@/stores/cart.js"
import { useGuestUser } from "@/composables/useGuestUser.js"
import { getHeader } from "h3"

useHead({
  link: [
    { rel: 'stylesheet', href: '/css/checkout.css' },
  ],
})


definePageMeta({
  layout: 'default',
  public: true,

})

const { isMobile } = useDevice()

// This will switch the layout reactively on the client/server
if (isMobile) {
  setPageLayout('blank')
} else {
  setPageLayout('default')
}


const isLoading = ref(false)

const updateLoading = val => {
  isLoading.value = val
}


const checkoutStore = useCheckoutStore()
const currentStep = ref(1)

const customerInformation = ref(null)
const cartSummary = ref(null)
const shipping = ref(null)
const paymentPanel = ref(null)

const error = ref('')
const route = useRoute()
const router = useRouter()

const config = useRuntimeConfig()
const isCollapsed = ref(true)


checkoutStore.loadFromLocalStorage()

if (route.query && route.query.step) {
  currentStep.value = Number(route.query.step) || 1
}


const nextStep = async () => {

  error.value = ""

  if (currentStep.value === 1) {
    const errMsg = await customerInformation.value.validate()
    if (errMsg) {
      error.value = errMsg

      return
    }
    const custInfo = await customerInformation.value.getCustomerInfo()
  }
  if (currentStep.value === 2) {

    const errMsg = await shipping.value.validate()
    if (errMsg) {
      error.value = errMsg

      return
    }

    const shippingMethod = shipping.value.getShippingInfo()
  }

  if (currentStep.value === 3) {
    const errMsg = paymentPanel.value.validate()

    if (errMsg) {
      error.value = errMsg

      return
    }
    await paymentPanel.value.pay()

  }

  if (currentStep.value < 3) currentStep.value++

  checkoutStore.step = currentStep.value
  checkoutStore.saveToLocalStorage()
  router.push({
    path: '/checkout',
    query: { step: (currentStep.value).toString() },
  })

}

const prevStep = () => {

  if (currentStep.value == 2) {
    // save to cache
    const shippingMethod = shipping.value.getShippingInfo()
  }

  error.value = ""
  if (currentStep.value > 1) currentStep.value--


  checkoutStore.step = currentStep.value
  checkoutStore.saveToLocalStorage()
  router.push({
    path: '/checkout',
    query: { step: (currentStep.value).toString() },
  })

}


const handleAcceptPolicyChange = isAccepted => {
  console.log("handleAcceptPolicyChange", isAccepted)
  if (!isAccepted) {
    error.value = "Por favor, acepta las condiciones de compra para continuar"
  } else {
    error.value = ""
  }
}


const handlePayMercadoPagoApi = mpData => {
  console.log("handlePayMercadoPagoApi", mpData)
  createOrder(mpData)
}

const handleCartSummaryCollapse = newVal => {
  console.log("handleCartSummaryCollapse", newVal)
  isCollapsed.value = newVal
}

const form = ref(null)


provide('loading', {
  isLoading,
  updateLoading,
})


/********************************* CHECKOUT SERVICE ************************************/

const checkoutInfo = ref({
  total: 0,
  oldPrice: 0,
  discount: 0,
  shippingMethod: null,
})

const observers = []
const loading = ref(false)
const cart = ref({})
const coupon = ref(null)
const couponDiscount = ref(0)
const isCartEmpty = ref(false)

provide('checkoutService', {

  observers,
  checkoutInfo,
  currentStep,
  error,
  loading,
  cart,
  coupon,
  isCartEmpty,
  couponDiscount,

  next: async () => {
    await nextStep()
  },
  prev: async () => {
    await prevStep()
  },

  setError: err => {
    error.value = err
  },

  setLoading: isLoading => {
    loading.value = isLoading
  },

  setShippingMethod: async shipMethod => {
    cartSummary.value.getCart()
    checkoutInfo.value.shippingMethod = shipMethod
    console.log("setShippingMethod", shipMethod)
  },

  setCart: c => {
    console.log("CheckoutServcice:setCart", c)

    cart.value = c
    isCartEmpty.value = c.items.length === 0
    coupon.value = c.coupon
    couponDiscount.value = c.couponDiscount
    checkoutInfo.value.total = c.total
    checkoutInfo.value.oldPrice = c.oldPrice
    checkoutInfo.value.discount = c.discount

    console.log("CheckoutServcice:couponDiscount", couponDiscount)

  },

  couponAdded: async coupon => {
    cartSummary.value.getCart()
  },
  attach: observer => {
    observers.push(observer)
  },
})

/******************** /END CheckoutService ********************/

const handleCartEmpty = val => {
  console.log("handleCartEmpty", val)
  isCartEmpty.value = val
}

const cartStore = useCartStore()
const wuid = useGuestUser().value

onMounted(async () => {
  cartStore.fetchCart(wuid)

})
</script>

<template>
  <div
    class="checkout-container pa-md-8 pa-0"
    style="background: #fff;"
  >
    <VContainer class="pt-md-1">
      <Logo
        v-if="isMobile"
        class="mt-1"
      />
      <div class="d-flex align-center ga-0 checkout-stepper ">
        <h1
          v-if="!isMobile"
          class="text-h3  text-uppercase  d-flex align-center mb-0 text-no-wrap "
        >
          <VIcon
            icon="tabler-lock-filled"
            color="#000"
            size="30"
            class="me-2"
          />
          Checkout
        </h1>

        <CheckoutStepper
          class="flex-grow-1"
          :current-step="currentStep"
        />
      </div>
    </VContainer>

    <div v-if="!isCartEmpty">
      <VRow>
        <VCol
          cols="12"
          sm="12"
          md="7"
        >
          <main
            id="checkout__body"
            class="checkout__body"
          >
            <div class="steps__content">
              <VCard
                color="surface"
                class="mobile-plain-card"
              >
                <VCardText class="ma-0 pa-0">
                  <CustomerInformation
                    v-if="currentStep === 1"
                    ref="customerInformation"
                    @next="nextStep"
                  />
                  <Shipping
                    v-if="currentStep === 2"
                    ref="shipping"
                    @next="nextStep"
                    @prev="prevStep"
                  />
                  <Payment
                    v-if="currentStep === 3"
                    ref="paymentPanel"
                    @paid-with-mp-api="handlePayMercadoPagoApi"
                    @accept-policy="handleAcceptPolicyChange"
                    @prev="prevStep"
                    @submit="submitOrder"
                  />
                </VCardText>
              </VCard>
            </div>


            <StepActions
              class="hide-when-med mt-8"
              :is-desktop="true"
              :current-step="currentStep"
              :error="error"
              @next="nextStep"
              @prev="prevStep"
            />


            <div class="checkout__terms-and-conditions">
              <a
                href="https://www.motomundi.cl/terminos-y-condiciones?open=purchase-terms"
                data-dr="false"
                target="_blank"
                class="mtc-link"
              >
                Condiciones de la compra
              </a>
              <a
                href="/terminos-y-condiciones?open=privacy-policy"
                data-dr="false"
                target="_blank"
                class="mtc-link"
              >
                Política de privacidad
              </a>
            </div>
          </main>
        </VCol>
        <VCol
          cols="12"
          sm="12"
          md="5"
        >
          <div class="checkout__cart-summary">
            <!-- cart footer -->

            <CartSummaryFooter v-model="isCollapsed" />


            <CartSummary
              ref="cartSummary"
              :is-desktop="!isMobile"
              :is-collapsed="isCollapsed"
              @collapse="handleCartSummaryCollapse"
              @next-step="nextStep"
              @cart-empty="handleCartEmpty"
            />
          </div>
        </VCol>
      </VRow>
    </div>

    <div
      v-if="isCartEmpty"
      class="checkout container empty"
    >
      <Empty />
    </div>
  </div>


  <div
    v-if="isLoading"
    class="spinner-overlay"
  >
    <div class="spinner" />
  </div>
</template>


<style scoped>
.checkout-stepper h1{
  font-size: 1.4rem;
  text-transform: uppercase;
  display:inline;
  padding-left: 10px;
  border-left: 5px solid #c74044;
}
.v-card--variant-plain {
  opacity: 1;
}

/*
.checkout .checkout__terms-and-conditions {
  align-self: flex-start;
  font-size: 12px;
  padding: 5px 15px var(150px) 15px;
}
*/

.checkout__terms-and-conditions {
  align-self: flex-start;
  font-size: 12px;
  padding: 5px 15px 160px;
}

@media only screen and (min-width: 601px) {
  .checkout__terms-and-conditions {
    padding: 15px 30px;
  }
}

.checkout__terms-and-conditions .mtc-link {
  color: #747474;
  display: inline-block;
  margin-right: 5px;
  -webkit-text-decoration: underline;
  text-decoration: underline;
}


.spinner-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(255, 255, 255, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 8000;
}

.spinner {
  width: 32px;
  height: 32px;
  border: 4px solid #dfdfdf;
  border-top-color: #c74044;
  border-radius: 50%;
  animation: spin 0.6s cubic-bezier(0.61, 0.06, 0.55, 0.75) infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

/*.checkout-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}*/

@media only screen and (max-width: 600px) {
  .hide-when-med {
    display: none;
  }
}

.checkout .checkout__terms-and-conditions {
  align-self: flex-start;
  font-size: 12px;
  padding: 5px 15px 160px 15px;
}

.checkout .checkout__terms-and-conditions .mtc-link {
  color: #747474;
  display: inline-block;
  margin-right: 5px;
  -webkit-text-decoration: underline;
  text-decoration: underline;
}

@media only screen and (min-width: 601px) {
  .checkout .checkout__terms-and-conditions {
    padding: 15px 30px;
  }
}

/*@media only screen and (min-width: 601px) {
  .checkout:not(.empty) {
    display: grid;
    grid-template-columns: 66% 34%;
    grid-template-rows: auto;
  }
}*/

.steps__content {
  width: 100%;
  max-width: 800px;
  padding: 0px 0;


}

.data__login-message {
  background-color: #e9e9e9;
  margin: 7px auto 30px;
  padding: 20px;
  text-align: center;
}


.summary h2 {
  border-bottom: 1px solid #000;
  padding-bottom: 10px;
}

.actions-button .steps__errors {
  color: #f44a4a;
  font-size: 14px;
  line-height: 1.1em;
  text-align: center;
}

.actions-button .steps__errors {
  padding: 0 15px;
}

@media (max-width: 600px) {
  .mobile-plain-card {
    box-shadow: none !important;
    background-color: transparent !important;
    border: none !important;
  }
}
</style>
