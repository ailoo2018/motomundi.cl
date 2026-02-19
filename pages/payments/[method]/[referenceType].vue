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
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: 'purchase',
      ecommerce: purchase // GTM usually expects 'ecommerce' key for purchase events
    });
    console.log("Notified google: " + JSON.stringify(purchase))
  }catch(e){
    console.error("error trying to notify tagmanager", e)
  }
}

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
    let orderId = null
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

      orderId = result.value.referenceId

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

      orderId = result.value.referenceId
    }

    console.log("Result: " + result.value.success)

    console.log("about to notify tag manager: " + referenceType + " " + orderId)
    if(result.value.success && referenceType === "order" && orderId){
      await notifyTagManager(orderId)
    }

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
