// DP-5552183


import crypto from "crypto";

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const paymentId = "DP-5552183"

  // 1. Prepare Variables
  const xLogin = config.dlocalApiKey      // Your X-Login / API Key
  const xTransKey = config.dlocalSecretKey // Your X-Trans-Key
  const secretKey = config.dlocalSecretKey // Your Secret Key (often same as trans-key in GO)
  const xDate = new Date().toISOString()
  const url = `${config.dlocalApiUrl}/v1/payments/${paymentId}`

  // 2. Generate Signature
  // Formula: X-Login + X-Date + RequestBody (Empty string for GET)
  const dataToSign = xLogin + xDate + ""
  const signature = crypto
    .createHmac('sha256', secretKey)
    .update(dataToSign)
    .digest('hex')

  try {
    const data: any = await $fetch(url, {
      method: 'GET',
      headers: {
        'X-Date': xDate,
        'X-Login': xLogin,
        'X-Trans-Key': xTransKey,
        'X-Version': '2.1',
        'User-Agent': 'Nuxt-App',
        'Content-Type': 'application/json',
        // The Authorization header must be formatted exactly like this:
        'Authorization': `Bearer ${config.dlocalApiKey}:${config.dlocalSecretKey}`,
      }
    })

    console.log("Successfully fetched dLocal data:", data.status)
    return { success: true, status: data.status, data }

  } catch (error: any) {
    console.error('--- dLocal API Error ---')
    console.error('Status:', error.statusCode)
    console.error('Payload:', JSON.stringify(error.data, null, 2))

    throw createError({
      statusCode: error.statusCode || 500,
      message: error.data?.message || 'dLocal Request Failed',
    })
  }
})

