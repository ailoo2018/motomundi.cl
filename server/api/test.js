
export default defineEventHandler(async event => {
  const config = useRuntimeConfig()

  return {
    webPayCommerceCode: config.webPayCommerceCode,
    webPayApiKey: config.webPayApiKey,
    mercadopagoAccessToken: config.mercadopagoAccessToken,
    env: process.env.NODE_ENV || 'development',
    MERCADO_PAGO_ACCESS_TOKEN: process.env.MERCADO_PAGO_ACCESS_TOKEN,
    WEBPAY_COMMERCE_CODE: process.env.WEBPAY_COMMERCE_CODE || '-',
    WEBPAY_API_KEY: process.env.WEBPAY_API_KEY || '-',
    DLOCAL_GO_API_KEY: config.dlocalApiKey || null,
    NUXT_DLOCAL_GO_API_KEY: config.dlocalApiKey || null,
    TEST: config.test || null,
    TEST2: config.test2 || null,
  }
})
