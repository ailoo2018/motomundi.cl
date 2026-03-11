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


const maxRetries = 3
const delayMs = 8000 // 2 seconds between retries
let isSuccess = false

// Helper to wait between retries
const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))


const method = route.params.method
const referenceType = route.params.referenceType

const notifyTagManager = async orderId => {
  console.log("notifyTagManager")
  try {
    const order = await $fetch("/api/orders/" + orderId)
    if(!order)
      throw Error("Order not found: " + orderId)

    const purchase = {
      "transaction_id": "" + order.id,
      "affiliation": "store",
      "value": Number(order.total).toFixed(2),
      "currency": "CLP",
      "tax": Number(order.iva).toFixed(2),
      "shipping": Number(order.shipping).toFixed(2),
      "items": [],
    }


    // for order.items
    let i = 1
    for (var item of order.items) {
      try {
        if (!item.productItem)
          continue

        const purchaseItem = {
          "id": "" + item.productItem.product?.id || 0,
          "name": item.productItem.product?.fullName || "",
          "list_name": "Cart Items",
          "brand": item.productItem.product?.brand?.name || "",
          "category": item.productItem.product?.primaryCategory?.category?.name || "",
          "variant": item.productItem.description,
          "list_position": i,
          "quantity": item.quantity,
          "price": Number(item.unitPrice).toFixed(2),
        }

        purchase.items.push(purchaseItem)
        i++
      }catch(e){
        console.error("error proccesing item: " + item?.id, e)
      }
    }

    // To this:
    window.dataLayer = window.dataLayer || []
    window.dataLayer.push({
      event: 'purchase',
      ecommerce: purchase, // GTM usually expects 'ecommerce' key for purchase events
    })
    console.log("Notified google: " + JSON.stringify(purchase))
  }catch(e){
    console.error("error trying to notify tagmanager", e)
  }
}

onMounted(async () => {
  let token = route.query.payment_id || route.query.collection_id || ""
  let referenceId = route.query.referenceId || route.query.TBK_ORDEN_COMPRA || ""
  const webpayToken = route.query.token_ws

  // Normalizing variables for different gateways
  if (method === "webpay") token = webpayToken

  const paymentData = {
    authorizationCode: token,
    referenceId: referenceId,
    paymentMethodId: methdodMap[method],
    referenceType: referenceType,
  }

  try {
    // Strategy: Try to confirm, then fallback to status polling
    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      const endpoint = token ? '/api/payments/confirm-payment' : '/api/payments/confirm-status'

      try {
        const response = await $fetch(endpoint, {
          method: 'POST',
          body: paymentData,
        })

        if (response?.success) {
          result.value = response
          break // Success! Exit loop
        }
      } catch (e) {
        console.error(`Attempt ${attempt} failed:`, e)
      }

      if (attempt < maxRetries) await sleep(delayMs)
    }

    // Final check after loop
    if (result.value?.success) {
      const orderId = result.value.referenceId

      if (referenceType === "order" && orderId) {
        await notifyTagManager(orderId)

        const cartStore = useCartStore()

        await cartStore.emptyCart()
      }
    } else {
      result.value = { success: false, message: "No pudimos confirmar tu pago. Si ves el cargo en tu cuenta, contacta a soporte." }
    }

  } catch (error) {
    result.value = { success: false, message: error.message }
  } finally {
    loading.value = false
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
