/* eslint-disable camelcase */
import { getDomainId } from "@/server/ailoo-domain"
import transbankSdk from 'transbank-sdk'

const { WebpayPlus } = transbankSdk

export default defineEventHandler(async event => {
  let url = ""

  try {
    const config = useRuntimeConfig()
    const baseUrl = config.public.w3BaseUrl
    const body = await readBody(event)

    // 1. Your internal order creation
    url = `${baseUrl}/${getDomainId()}/checkout/create-order`

    const order = await $fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: body,
    })


    // Configure Webpay
    // For testing environment (Integration)

/*
    const options = new WebpayPlus.Options(
      '597055555532', // Commerce Code (Integration)
      '579B532A7440BB0C9079DED94D31EA1615BACEB56610332264630D42D0A36B1C', // API Key (Integration)
      WebpayPlus.IntegrationApiKeys.WEBPAY_PLUS // Environment
    )

*/



    const tx = WebpayPlus.Transaction.buildForIntegration('597055555532', '579B532A7440BB0C9079DED94D31EA1615BACEB56610332264630D42D0A36B1C')
    // WebpayPlus.buildForIntegration('597055555532', '579B532A7440BB0C9079DED94D31EA1615BACEB56610332264630D42D0A36B1C')

    // Or manually configure:
    // tx.commerceCode = '597055555532  ' // Test commerce code
    // tx.apiKey = '579B532A7440BB0C9079DED94D31EA1615BACEB56610332264630D42D0A36B1C' // Test API key
    // tx.environment = WebpayPlus.Environment.Integration

    const sessionId = `session-${Date.now()}`
    const orderId = order.id || order.orderId || Date.now()
    const amount = order.total || order.amount || 1000
    const COMMERCE_CODE = '597055555532'

    // Use the configured base URL from runtime config
    const returnUrl = `${config.public.baseUrl}/payment/result`



    const response = await tx.create(
      `oc-${orderId}}`,
      sessionId,
      amount,
      returnUrl,

    )

    return {
      orderId: orderId,
      token: response.token,
      paymentUrl: response.url,
    }

  } catch (error) {
    // If TBK returns an error, it's often in error.data
    console.error('Payment Error:', error)
    console.error('Payment Error Payload:', error.data)

    throw createError({
      statusCode: error.statusCode || 500,
      message: error.data?.error_message || error.message || 'Transbank Connection Failed',
    })
  }
})

// Alternative version if you want to use environment variable for return URL
/*
export default defineEventHandler(async event => {
  let url = ""

  try {
    const config = useRuntimeConfig()
    const baseUrl = config.public.w3BaseUrl
    const body = await readBody(event)

    // 1. Your internal order creation
    url = `${baseUrl}/${getDomainId()}/checkout/create-order`

    const order = await $fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: body,
    })

    // Configure Webpay for testing
    WebpayPlus.configureForTesting()

    const sessionId = `session-${Date.now()}`
    const orderId = order.id || order.orderId || Date.now()
    const amount = order.total || order.amount || 1000

    // Use the configured base URL from runtime config
    const returnUrl = `${config.public.baseUrl}/payment/result`

    const response = await WebpayPlus.Transaction.create(
      `order-${orderId}-${Date.now()}`,
      sessionId,
      amount,
      returnUrl,
    )

    return {
      orderId: orderId,
      token: response.token,
      paymentUrl: response.url,
    }

  } catch (error) {
    console.error('Payment Error:', error)
    console.error('Payment Error Payload:', error.data)

    throw createError({
      statusCode: error.statusCode || 500,
      message: error.data?.error_message || error.message || 'Transbank Connection Failed',
    })
  }
})
*/
