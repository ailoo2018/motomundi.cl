<script setup lang="ts">
interface PaymentResult {
  success: boolean
  buyOrder: string
  amount: number
  authorizationCode: string
  cardNumber: string
  transactionDate: string
  responseCode: number
  paymentTypeCode?: string
  installmentsNumber?: number
}

const route = useRoute()
const loading = ref(true)
const result = ref<PaymentResult | null>(null)

onMounted(async () => {
  const token = route.query.token_ws as string
  if (!token) {
    loading.value = false
    return
  }

  try {
    result.value = await $fetch('/api/payments/confirm-payment', {
      method: 'POST',
      body: { token }
    })
  } catch (error) {
    result.value = { success: false, buyOrder: '', amount: 0, authorizationCode: '', cardNumber: '', transactionDate: '', responseCode: -1 }
  } finally {
    loading.value = false
  }
})

const getPaymentType = (code?: string) => {
  const types: Record<string, string> = {
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
