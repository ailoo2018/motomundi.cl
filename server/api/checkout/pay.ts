/* eslint-disable camelcase */
import { getDomainId } from "@/server/ailoo-domain"
import {getReturnUrl, processPayment} from "@/services/gateways/gateway.ts"


export default defineEventHandler(async event => {
  let url = ""

  try {
     const config = useRuntimeConfig()
    const baseUrl = config.public.w3BaseUrl
    const body = await readBody(event)


    url = `${baseUrl}/${getDomainId()}/checkout/create-order`

    const order = await $fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: body,
    })



    const paymentMethodTypeId = body.paymentMethod.gateway
    const referenceId = order.id
    const currency = body.currency || "CLP"

    const amount = currency === "CLP" ? Math.round(order.total) : body.total

    const returnUrl = getReturnUrl(paymentMethodTypeId, "order")

    return await processPayment({
      referenceType: "order",
      paymentMethodId: paymentMethodTypeId,
      referenceId: referenceId,
      amount: amount,
      currency: currency,
      returnUrl: returnUrl,
      country: body.country || "CL",
    })

  } catch (error) {
    // If TBK returns an error, it's often in error.data
    console.error('Payment Error:', error)
    console.error('Payment Error Payload:', error.data)

    throw createError({
      statusCode: error.statusCode || 500,
      message: error.data?.error || error.data?.message || error.message || 'Transbank Connection Failed',
    })
  }
})
