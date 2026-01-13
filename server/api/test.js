
export default defineEventHandler(async event => {
  const config = useRuntimeConfig()

  return {
    webPayCommerceCode: config.webPayCommerceCode,
    webPayApiKey: config.webPayApiKey,
    mercadopagoAccessToken: config.mercadopagoAccessToken,
  }
})
