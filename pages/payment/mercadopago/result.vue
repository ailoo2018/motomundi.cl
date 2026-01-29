<script setup>
import PaymentResult from "@/views/pages/payments/payment-result.vue"

const route = useRoute()
const config = useRuntimeConfig()

const paymentId = route.query.payment_id
const status = route.query.status // 'approved', 'pending', 'rejected'
const externalReference = route.query.external_reference // Tu orderId

const result = ref()
const loading = ref(true)

onMounted(async () => {
  try {
    if (status === 'approved') {

      result.value = await $fetch(`/api/payments/confirm-payment`, {
        method: 'POST',
        body: {
          orderId: externalReference,
          paymentId: paymentId,
          gateway: 15, //'mercadopago',
        },
      })

      console.log("Result: " + result.value.success)

      const cartStore = useCartStore()

      await cartStore.emptyCart()


    }
  } catch (error) {
    result.value = {
      success: false,
      message: error.message,
    }
  } finally {
    loading.value = false
  }
})
</script>

<template>
  <PaymentResult :result="result" :loading="loading" />
</template>

