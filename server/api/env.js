import { getDomainId } from "../ailoo-domain.js"

export default defineEventHandler(async (event) => {

  try {

    const token = getCookie(event, "accessToken")
    const wishList = getCookie(event, 'wishlist_items')
    return {
      NODE_ENV: process.env.NODE_ENV,
      WEBPAY_COMMERCE_CODE: process.env.WEBPAY_COMMERCE_CODE,
      MERCADO_PAGO_ACCESS_TOKEN: process.env.MERCADO_PAGO_ACCESS_TOKEN,
      accessToken: token,
      wishlist: wishList,
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
