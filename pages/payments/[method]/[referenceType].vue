<script setup>
import PaymentResult from "@/views/pages/payments/payment-result.vue"

const route = useRoute()
const loading = ref(true)
const result = ref(null)

const methdodMap = {
  webpay: 8,
  mercadopago: 15,
  dlocal: 19,
}


const method = route.params.method
const referenceType = route.params.referenceType

onMounted(async () => {

  let token = ""
  let referenceId = ""
  if(method === "mercadopago"){
    token = route.query.payment_id
  }else if(method === "dlocal"){
    referenceId = route.query.referenceId
  }else if(method === "webpay"){
    token = route.query.token_ws
  }

  if(!token){
    referenceId = route.query.referenceId
  }


  console.log("return token is : " + token + " reference: " + referenceId)

  try {
    console.log("this should only be called once:")
    if(token && token.length > 0 ) {
      result.value = await $fetch('/api/payments/confirm-payment', {
        method: 'POST',
        key: '' + token,
        body: {
          authorizationCode: token,
          paymentMethodId: methdodMap[method],
          referenceType: referenceType,
        },
      })
    }else{
      result.value = await $fetch('/api/payments/confirm-status', {
        method: 'POST',
        key: '' + token,
        body: {
          referenceId: referenceId,
          referenceType: referenceType,
          paymentMethodId: methdodMap[method],
        },
      })
    }

    console.log("Result: " + result.value.success)
  } catch (error) {
    result.value = { success: false, error: error.message, message: error.message }
  } finally {
    loading.value = false
  }

  try {
    const cartStore = useCartStore()

    await cartStore.emptyCart()
  }finally{

  }

})

</script>

<template>
  <PaymentResult
    :result="result"
    :loading="loading"
  />
</template>

<style scoped>
/* Styling for Monospaced font in Auth Code */
.font-mono {
  font-family: 'Courier New', Courier, monospace;
}
/* Ensure icons align well with Vuetify list items */
.ti {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  vertical-align: middle;
}
</style>
