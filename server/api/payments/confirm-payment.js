import { getDomainId } from "../../ailoo-domain"

export default defineEventHandler(async event => {
  const config = useRuntimeConfig()
  const body = await readBody(event)
  const { orderId, paymentId, token, gateway } = body



  try {
    const confirmRet = await $fetch(`${config.public.w3BaseUrl}/${getDomainId()}/checkout/payment-result`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',

        },
        body: {
          orderId: orderId ? orderId : 0,
          paymentMethodType: gateway,
          paymentId: paymentId ? paymentId : null,
          token: token ? token: null,
        },
      })

    if(confirmRet.success){
      return {
        ...confirmRet,
      }

    } else {
      console.warn(`⚠️ Intento de confirmación fallido para Orden ${orderId}. Estado: ${confirmRet?.error}`)
      
      return {
        success: false,
        message: 'El pago no está aprobado o los datos no coinciden',
      }
    }

  } catch (error) {
    const serverError = error.data
    
    return {
      success: false,
      message: serverError?.message || 'El pago no está aprobado o los datos no coinciden',
    }
  }
})
