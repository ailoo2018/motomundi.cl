<script setup>
import PaymentResult from "@/views/pages/payments/payment-result.vue"

const route = useRoute()
const loading = ref(true)
const result = ref(null)


console.log('Script setup executed')



onMounted(async () => {
  const token = route.query.token_ws
  if (!token) {
    loading.value = false
    
    return
  }


  try {
    console.log("this should only be called once:")
    result.value = await $fetch('/api/payments/confirm-payment', {
      method: 'POST',
      key: '' + token,
      body: {
        token,
        gateway: 8 },
    })

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
