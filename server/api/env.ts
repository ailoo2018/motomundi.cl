import { getDomainId } from "../ailoo-domain.js"

export default defineEventHandler(async event => {

  try {

    const config = useRuntimeConfig()
    const token = getCookie(event, "accessToken")
    const wuid = getCookie(event, "guest_id")
    const userId = getCookie(event, "user_id")
    const wishList = getCookie(event, 'wishlist_items')

    const response = await fetch('https://api.ipify.org?format=json')
    const myip = await response.json()

    const baseUrl = config.public.baseUrl
    const dlocalApiUrl = config.dlocalApiUrl || process.env.DLOCAL_GO_BASE_URL || process.env.NUXT_DLOCAL_GO_BASE_URL
    const dlocalApiKey = config.dlocalApiKey ||  process.env.DLOCK_API_KEY || process.env.NUXT_DLOCAL_GO_API_KEY
    const dlocalSecretKey = config.dlocalSecretKey || process.env.DLOCAL_GO_SECRET_KEY || process.env.NUXT_DLOCAL_GO_SECRET_KEY
    const commerceCode   = process.env.WEBPAY_COMMERCE_CODE || ""

    return {
      myip: myip,
      NODE_ENV: process.env.NODE_ENV,
      WEBPAY_COMMERCE_CODE: process.env.WEBPAY_COMMERCE_CODE,
      MERCADO_PAGO_ACCESS_TOKEN: process.env.MERCADO_PAGO_ACCESS_TOKEN,


      nodeEnv: process.env.NODE_ENV,
      containerName: process.env.CONTAINER_APP_NAME || 'Local',
      revision: process.env.CONTAINER_APP_REVISION || 'N/A',

      apiEndpoint: process.env.ECOMMERCE_API_URL,
      region: process.env.AZURE_REGION || 'Unknown',

      REDIS_URL: process.env.REDIS_URL,

      //      WEBPAY_COMMERCE_CODE: process.env.WEBPAY_COMMERCE_CODE,
      //    MERCADO_PAGO_ACCESS_TOKEN: process.env.MERCADO_PAGO_ACCESS_TOKEN,

      accessToken: token,
      wishlist: wishList,
      dlocalApiUrl,
      dlocalApiKey,
      userId,
      wuid,
      baseUrl,
    }
  }catch(error){
    console.error('Error in friendly-url lookup:', error)
    console.error('Stack trace:', error.stack)
    throw createError({
      statusCode: error.statusCode || 500,
      message: error.message || 'Failed to lookup friendly URL',
    })

  }
})
