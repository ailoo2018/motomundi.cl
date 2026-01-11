export default defineEventHandler(async event => {
  const { token } = await readBody(event)

  const COMMERCE_CODE = '597055555532'
  const API_KEY = '579B532A7440BB0C9079DED94D31EA1615BACEB56610332264630D42D0A36B1C'
  const URL = `https://webpay3gint.transbank.cl/rsenvios/v1.2/transactions/${token}`

  try {
    const result = await $fetch(URL, {
      method: 'PUT', // Webpay uses PUT to commit
      headers: {
        'Tbk-API-Key-Id': COMMERCE_CODE,
        'Tbk-API-Key-Secret': API_KEY,
        'Content-Type': 'application/json',
      },
    })

    // status 0 means Success
    if (result.status === 'AUTHORIZED' && result.response_code === 0) {
      return { success: true, data: result }
    }

    return { success: false, data: result }
  } catch (error) {
    return { success: false, error }
  }
})
