import { getDomainId } from "@/server/ailoo-domain"
import {getReferenceId, getReturnUrl, processPayment, ProcessPaymentRq} from "@/services/gateways/gateway"



export default defineEventHandler(async event => {
  let url = ""

  try {
    const config = useRuntimeConfig()
    const baseUrl = config.public.w3BaseUrl
    const body = await readBody(event)


    let referenceId = getReferenceId( body.referenceId );
    let referenceType = "invoice"



    url = `${baseUrl}/${getDomainId()}/invoices/${referenceId}`
    const invoice = await $fetch(url, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },

    })


    const paymentMethodTypeId = body.paymentMethodId
    const amount = invoice.total
    const country =body.country
    const currency = body.currency || "CLP"

    const returnUrl = getReturnUrl(paymentMethodTypeId, "invoice")

    var rq : ProcessPaymentRq = {
      paymentMethodId: paymentMethodTypeId,
      referenceId: referenceId,
      referenceType: referenceType,
      amount: amount,
      currency: currency,
      returnUrl: returnUrl,
      country: country || "cl"
    }

    return await processPayment(rq)
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
