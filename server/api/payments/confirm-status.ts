import { getDomainId } from "../../ailoo-domain"

export default defineEventHandler(async event => {
  const config = useRuntimeConfig()
  const body = await readBody(event)
  const { referenceId, referenceType, paymentMethodId } = body

  let url = ""

  try {

    url = `${config.public.w3BaseUrl}/${getDomainId()}/checkout/payment-status`

    const confirmRet = await $fetch(url,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: {
          referenceId: referenceId,
          referenceType: referenceType,
          paymentMethodId: paymentMethodId,
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
