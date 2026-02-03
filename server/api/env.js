import { getDomainId } from "../ailoo-domain.js"

export default defineEventHandler(async (event) => {

  try {


    return {
      NODE_ENV: process.env.NODE_ENV,
      WEBPAY_COMMERCE_CODE: process.env.WEBPAY_COMMERCE_CODE,
      MERCADO_PAGO_ACCESS_TOKEN: process.env.MERCADO_PAGO_ACCESS_TOKEN
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
