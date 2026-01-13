<script setup>


import PaymentResult from "@/views/pages/payments/payment-result.vue"

const route = useRoute()
const loading = ref(true)
const result = ref(null)

onMounted(async () => {
  const token = route.query.token_ws
  if (!token) {
    loading.value = false
    return
  }

  try {
    result.value = await $fetch('/api/payments/confirm-payment', {
      method: 'POST',
      body: {
        token,
        gateway: 8 }
    })

    console.log("Result: " + result.value.success)
  } catch (error) {
    result.value = { success: false, error: error.message, message: error.message }
  } finally {
    loading.value = false
  }
})

const getPaymentType = (code) => {
  const types =  {
    'VD': 'Venta Débito', 'VN': 'Venta Normal', 'VC': 'Venta en cuotas',
    'SI': '3 cuotas sin interés', 'VP': 'Venta Prepago'
  }
  return types[code || ''] || 'Tarjeta'
}
</script>

<template>
  <PaymentResult :result="result" :loading="loading" />
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
