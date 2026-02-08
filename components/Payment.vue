<script setup>
/* eslint-disable camelcase */
import { ref } from "vue"
import BillingForm from "~/components/Payments/BillingForm.vue"
import { useCheckoutStore } from '~/stores/checkout'
import Coupon from "~/components/Cart/Coupon.vue"
import { useCartStore } from "@/stores/cart.js"

const emit = defineEmits(["acceptPolicy", "paid-with-mp-api"])
const paymentMethod = ref(0)
const selectedPayment = ref(0)
const billing = ref(null)
const form = ref(null)
const privacyPolicyAccept = ref(false)
const isAcceptPrivacyPolicy = ref(true)
const loading = ref(false)
const error = ref('')
const config = useRuntimeConfig()
const gateways = ref([])
const checkoutStore = useCheckoutStore()
const askForInvoice = ref(false)
const billingAddress = ref({})

const checkoutService = inject("checkoutService")
const { coupon } = checkoutService

const PaymentMethods = Object.freeze({
  Webpay: 8,
  PayPal: 10,
  MercadoPago: 15,
  TarjetaCredito: 18,
})

//const billingAddress = checkoutStore.billingAddress



const icons = {
  "8": {
    label: "Webpay",
    icons: ["/gateways/webpay.png"],
    comment: "Realiza pagos de forma segura a través de Webpay, compatible con bancos chilenos. Transacciones rápidas y confiables.",
  },
  "10": {
    label: "PayPal",
    icons: ["/gateways/checkout-paypal-express.svg"],
    comment: "Paga de manera rápida y segura con tu cuenta PayPal en dólares. No compartimos tu información financiera con el vendedor.",
  },
  "15": {
    label: "Mercado Pago",
    icons: ["/gateways/mercado_pago.png"],
    comment: "Paga con Mercado Pago y accede a varias opciones de financiación. Seguridad garantizada en todas tus compras.",
  },
  "18": {
    label: "Tarjeta de crédito",
    icons: [
      "/content/assets/icons/checkout-visa.svg",
      "/content/assets/icons/checkout-maestro.svg",
      "/content/assets/icons/checkout-mastercard.svg",
    ],
    comment: "Todo el proceso de pago se efectúa de forma segura a través del banco. Para facilitar futuras compras el banco puede guardar tu forma de pago. Motomundi no guarda los datos sensibles de tus tarjetas.",

  },

}



const onUpdateBillingAddress = async billingAddr => {
  billingAddress.value = billingAddr
  await getPaymentInfo() // save billing address to local
  console.log("Save billing address", checkoutStore.paymentInfo)
}


watch(privacyPolicyAccept, (newValue, oldValue) => {
  if (newValue) {
    isAcceptPrivacyPolicy.value = true
  }
  emit("acceptPolicy", isAcceptPrivacyPolicy.value)
})

const validate = () => {
  console.log("privacyPolicyAccept", privacyPolicyAccept.value)
  if (!privacyPolicyAccept.value) {
    isAcceptPrivacyPolicy.value = false
    
    return "Por favor, acepta las condiciones de compra para continuar"
  }

  if (selectedPayment.value === 0) {
    return "Por favor, seleccionar el medio de pago"
  }



  return null
}

const listPaymentMethods = async () => {

  loading.value = true
  error.value = null
  try {
    const response = await fetch( '/api/checkout/payment-methods')
    if (!response.ok) {
      throw new Error('Failed to fetch countries')
    }
    const data = await response.json()

    gateways.value = data.gateways

  } catch (err) {
    console.error('Error fetching countries:', err)
    error.value = 'Failed to load countries. Please try again later.'
  } finally {
    loading.value = false
  }

}



const getPaymentInfo = async () => {

  isAcceptPrivacyPolicy.value = true

  const payInfo = {
    gateway: selectedPayment.value,
    acceptPrivacy: isAcceptPrivacyPolicy.value,
    askForInvoice: askForInvoice.value,
    billingAddress: billingAddress.value,
  }

  checkoutStore.setPaymentInfo(payInfo)

  return payInfo
}
















/************************ MERCADO PAGO SCRIPT **********************/
let mercadoPagoPaymentData = null
const cardPaymentBrickController = ref(null)

// Function to load MercadoPago SDK
const loadMercadoPagoScript = () => {
  return new Promise((resolve, reject) => {
    const script = document.createElement('script')

    script.src = 'https://sdk.mercadopago.com/js/v2'
    script.onload = resolve
    script.onerror = reject
    document.body.appendChild(script)
  })
}

const renderCardPaymentBrick = async bricksBuilder => {
  const settings = {
    initialization: {
      amount: 100, // value of the payment to be processed
    },
    customization: {
      visual: {
        style: {
          theme: 'default', // 'default' |'dark' | 'bootstrap' | 'flat'
        },
      },
    },
    callbacks: {
      onSubmit: cardFormData => {
        console.log("Returned MP api", cardFormData)
        emit("paid-with-mp-api", cardFormData)
      },
      onReady: () => {
        console.log('Brick ready')
      },
      onError: error => {
        console.error('Brick error:', error)
      },
    },
  }

  cardPaymentBrickController.value = await bricksBuilder.create(
    'cardPayment',
    'cardPaymentBrick_container',
    settings,
  )
}

/************************ /MERCADO PAGO SCRIPT **********************/



// All refs are resolved and accessible
onMounted(async() => {
  await listPaymentMethods()

  console.log("customerInfo", checkoutStore.customerInfo)
  console.log("paymentInfo", checkoutStore.paymentInfo)

  // set billing address
  const paymentInfo = checkoutStore.paymentInfo
  if(paymentInfo && paymentInfo.billingAddress) {
    billingAddress.value = paymentInfo.billingAddress
  }else{
  //  billingAddress.value = checkoutStore.customerInfo.address
  }
  console.log("Billing address", billingAddress.value)

  try {
    await loadMercadoPagoScript()

    // @ts-ignore - MercadoPago will be available after script loads
    setTimeout(async() => {
      //      const mp = new MercadoPago('TEST-4d4904cc-f9b0-4aed-a4af-94036baa582a')
      // TODO: should get from server
      const mp = new MercadoPago('APP_USR-629d6da9-0d71-4b40-a90e-d6875e4a939e')
      const bricksBuilder = mp.bricks()

      await renderCardPaymentBrick(bricksBuilder)

    }, 1000)

  } catch (error) {
    console.error('Error initializing MercadoPago:', error)
  }

})

// Clean up when component unmounts
onUnmounted(() => {
  if (cardPaymentBrickController.value) {
    cardPaymentBrickController.value.unmount()
  }


})


const webpayToken = ref("")
const webpayUrl = ref("")
const webpayForm = ref(null)
const errors = checkoutService.error
const cartStore = useCartStore()

/**
 * Pay
 * @param mercadoPagoApiData
 * @returns {Promise<void>}
 */
const pay = async (mercadoPagoApiData = null) => {

  try {

    const wuid = useGuestUser().value
    const customerInfo = checkoutStore.customerInfo
    const shippingInfo = checkoutStore.shippingInfo
    const paymentInfo = await getPaymentInfo()



    console.log("paymentInfo", paymentInfo)
    console.log("shippingInfo", shippingInfo)
    console.log("customerInfo", customerInfo)

    if(!shippingInfo.address.phone)
      shippingInfo.address.phone = customerInfo.phone

    shippingInfo.address.comuna_id = shippingInfo.address.comuna.id

    checkoutService.setLoading(true)



    var rq = {
      "wuid": wuid,
      "addresses": {
        "selectedShipping": shippingInfo.address,
        "askForInvoice": paymentInfo.billingAddress && paymentInfo.billingAddress.rut && paymentInfo.billingAddress.rut.length > 0,
        "shipping": shippingInfo.address,
        "billing": paymentInfo.billingAddress,
      },
      "customerInformation": customerInfo,
      "shipmentInformation": shippingInfo,
      "createAccount": false,
      "subscribe": true,
      "notifyWhatsApp": true,
      "selectedCarrier": shippingInfo.carrierId,
      "paymentMethod": { gateway: paymentInfo.gateway },
      "pickupStore": shippingInfo.store,
      "selectedMapData": {
        "store_id": shippingInfo.store ? shippingInfo.store.id : 0,
      },
      "items": cartStore.cart.items,
      mercadoPagoPaymentData: mercadoPagoApiData,
    }


    const { data, error: fetchError } = await useFetch( '/api/checkout/pay', {
      credentials: 'include',
      method: 'POST',
      headers: {},
      body: JSON.stringify(rq),
      async onResponseError({ response }) {
        const errorData = response._data  // or response.body

        console.log('Error data:', errorData)
        if(errorData)
          alert("Error " + errorData.message )
      },
    })

    if (fetchError.value) {
      checkoutService.setError(fetchError.value)
      
      return
    }

    if (data.value.error != null) {
      checkoutService.setError(data.value.error)
      
      return
    }


    if (data.value) {

      window.location = data.value.paymentUrl

    } else {
      throw new Error('No data received from the server')
    }
  } catch (e) {
    console.error("error create order", e)
    alert(e.message)
    error.value = e.message
    checkoutService.setError(e.message)
  }finally{
    checkoutService.setLoading(false)
  }

}

// const coupon  = ref(null);

defineExpose({ getPaymentInfo, validate, pay })
</script>

<template>
  <div class="active">
    <div class="payment">
      <div class="payment__promo-code show-on-small-only">
        <div
          class="promo-code__heading"
          data-v-005af0e2=""
        >
          <h2 data-v-005af0e2="">
            ¿Tienes un código promocional o una tarjeta regalo?
          </h2>
        </div>
        <Coupon
          :model-value="coupon"
          style="padding: 10px 15px 20px;"
        />
      </div>

      <BillingForm
        ref="billing"
        v-model="billingAddress"
        @updated-address="onUpdateBillingAddress"
      />
      <VForm ref="form">
        <div class="payment__payment-methods">
          <VRadioGroup v-model="selectedPayment">
            <div>
              <div
                v-for="pm in gateways"
                class="payment-method"
                :class="{'current' : selectedPayment === pm.id }"
              >
                <div class="payment-method__heading input__group radio ">
                  <VRadio
                    :id="'addon-payments-' + pm.id"
                    :key="pm.id"
                    :value="pm.id"
                  />

                  <label :for="'addon-payments-' + pm.id">
                    <div class="payment-method__info">
                      <span class="payment-method__name"> {{
                        icons['' + pm.id] ? icons['' + pm.id].label : pm.name
                      }} </span>
                      <div
                        v-if="icons['' + pm.id]"
                        class="payment-method__icon"
                      >
                        <img
                          v-for="img in icons['' + pm.id].icons"
                          :key="img"
                          :src="img"
                          alt="{{pm.name}}"
                        >
                      </div>
                    </div>
                  </label>
                </div>

                <div
                  v-show="icons['' + pm.id].comment && selectedPayment === pm.id"
                  class="payment-method__body"
                >
                  <div>{{ icons['' + pm.id].comment }}</div>
                  <div v-if="pm.id=== 18">
                    <div
                      id="cardPaymentBrick_container"
                      class="mpbrick"
                    />
                  </div>
                </div>
              </div>
            </div>
          </VRadioGroup>
        </div>

        <div class="checkout__acceptance">
          <div class="input__group checkbox padding-md">
            <!--
              <VCheckbox
              v-model="privacyPolicyAccept"
              :rules="reqRules"
              :error-messages="errorMessages"
              hide-details
              />
            -->
            <input
              id="checkout-subscribe"
              v-model="privacyPolicyAccept"
              type="checkbox"
            >
            <label
              for="conditions-purchase"
              :class="{'error' : !isAcceptPrivacyPolicy} "
            >Acepto las
              <a
                target="_blank"
                href="https://www.motomundi.cl/terminos-y-condiciones?open=sales-terms"
              >condiciones</a>
              de compra de MOTOMUNDI SPA que incluyen el tratamiento de datos personales para ese fin.</label>
          </div>
          <div class="input__group checkbox padding-md">
            <input
              id="checkout-subscribe"
              type="checkbox"
              checked
            >
            <label for="checkout-subscribe">
              Quiero recibir comunicaciones comerciales por parte de MOTOMUNDI SPA vía e-mail.
            </label>
          </div>
        </div>
      </VForm>
    </div>
  </div>




  <form
    ref="webpayForm"
    :action="webpayUrl"
    method="post"
  >
    <input
      type="hidden"
      name="token_ws"
      :value="webpayToken"
    >
  </form>
  <form
    ref="mercadoPagoform"
    action=""
    method="post"
  >
    <input
      type="hidden"
      name="token_ws"
      value=""
    >
  </form>
</template>


<style scoped>
.payment__promo-code {
  margin: 10px 0;
  padding: 0 15px;
}


.payment__billing-form {
  position: relative;
  z-index: 90;
}

.padding-md {
  padding: 8px;
}

.padding-md input {
  margin-top: 3px;
}

.payment__billing-form.collapsed {
  padding: 0;
}

.payment__billing-form.collapsed .billing-form__content {
  height: 0;
  opacity: 0;
  visibility: hidden;
}

/* */


.payment-method .payment-method__info {
  align-items: center;
  display: flex;
  justify-content: space-between;
}

.payment-method .payment-method__info .payment-method__name {
  color: #000;
  font-size: 16px;
  font-weight: 700;
  margin: 0;
  padding-top: 7px;
}

.payment-method .payment-method__info .payment-method__icon {
  align-items: center;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-end;
}

.payment-method .payment-method__info .payment-method__icon img {
  height: 23px;
  max-width: 70px;
  width: auto;
}

.payment-method {
  border: 1px solid #d3d3d3;
  border-radius: 4px;
  cursor: pointer;
  margin: 10px;
  padding: 12px 12px;
}

.payment__billing-form.collapsed .billing-form__content {
  height: 0;
  opacity: 0;
  visibility: hidden;
}

.address__info {
  align-items: center;
  display: flex;
  gap: 10px;
  justify-content: space-between;
  padding: 7px 0;
}

.payment-method.current {
  background-color: #d9edd7;
  border-color: #96cd91;
  cursor: default;
}

.payment-method .payment-method__body {
  color: #666;
  font-size: 14px;
  padding-left: 10px;
}
.mpbrick {
  margin-top: 20px;
}
</style>
