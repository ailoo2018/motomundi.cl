import { getDomainId } from "~/server/ailoo-domain"
import { getReturnUrl, processPayment } from "~/services/gateways/gateway"

export default defineEventHandler(async event => {
  let url = ""

  try {
    const config = useRuntimeConfig()
    const baseUrl = config.public.w3BaseUrl
    const body = await readBody(event)

    const wuid  = getCookie(event, "guest_id")

    url = `${baseUrl}/${getDomainId()}/checkout/coupon`

    return await $fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: {
        code: body.code,
        wuid,
      },
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
