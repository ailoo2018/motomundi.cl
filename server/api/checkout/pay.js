/* eslint-disable camelcase */
import { getDomainId } from "@/server/ailoo-domain"
import transbankSdk from 'transbank-sdk'
import { MercadoPagoConfig, Preference } from 'mercadopago'

const { WebpayPlus } = transbankSdk

const WEBPAY = 8
const MERCADO_PAGO = 15

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


    if(body.paymentMethod.gateway === WEBPAY){
      const commerceCode = config.public.webPayCommerceCode
      const apiKey = config.public.webPayApiKey


      let tx;

      if(process.env.NODE_ENV === 'production') {
        tx = WebpayPlus.Transaction.buildForProduction(commerceCode, apiKey)
      }else{
        tx = WebpayPlus.Transaction.buildForIntegration(commerceCode, apiKey)
      }

      const sessionId = `session-${Date.now()}`
      const orderId = order.id
      const amount = order.total


      // Use the configured base URL from runtime config
      const returnUrl = `${config.public.baseUrl}/payment/webpay/result`



      const response = await tx.create(
        `${orderId}`,
        sessionId,
        amount,
        returnUrl,
      )

      return {
        orderId: orderId,
        token: response.token,
        paymentUrl: response.url,
      }


    }else if(body.paymentMethod.gateway === MERCADO_PAGO){
      
      const client = new MercadoPagoConfig({
        accessToken: config.mercadopagoAccessToken, // Add this to your runtimeConfig
        options: { timeout: 5000 },
      })

      const preference = new Preference(client)

      // 2. Prepare the order data
      const orderId = order.id
      const amount = order.total

      let baseUrl = config.public.baseUrl
      if(!baseUrl.startsWith("https")){
        baseUrl = "https://example.com"
      }

      // 3. Create the preference
      const pref = {
        body: {
          items: [
            {
              id: `${orderId}`,
              title: `Orden #${orderId}`,
              quantity: 1,
              unit_price: Number(amount),
              currency_id: 'CLP', // Required for Chile
            },
          ],
          back_urls: {
            success: `${baseUrl}/payment/mercadopago/result`,
            failure: `${baseUrl}/payment/mercadopago/result`,
            pending: `${baseUrl}/payment/mercadopago/result`,
          },
          auto_return: 'approved',
          external_reference: `${orderId}`, // Useful for reconciling with your DB later
          notification_url: `${baseUrl}/api/webhooks/mercadopago`, // Optional: for IPN
        },
      }


      const response = await preference.create(pref)

      return {
        orderId: orderId,
        paymentUrl: response.init_point,
        preferenceId: response.id,
      }
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
