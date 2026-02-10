/* eslint-disable camelcase */
import {getBaseUrl, type ProcessPaymentRq} from "@/services/gateways/gateway";

export async function processDLocal(rq : ProcessPaymentRq) {

  const config = useRuntimeConfig();
  const dlocalApiKey = config.dlocalApiKey ||  process.env.DLOCK_API_KEY || process.env.NUXT_DLOCAL_GO_API_KEY;
  const dlocalSecretKey = config.dlocalSecretKey || process.env.DLOCAL_GO_SECRET_KEY || process.env.NUXT_DLOCAL_GO_SECRET_KEY;

  // In a real app, calculate total price server-side based on product IDs
  // to prevent client-side price tampering.
  let baseUrl = getBaseUrl();

  let returnUrl = rq.returnUrl;
  if(returnUrl.startsWith("http://localhost")){
    returnUrl = returnUrl.replace("http://localhost:3000", baseUrl)
  }


  const orderData = {
    amount:  rq.amount, // e.g., 100.00
    currency: rq.currency || 'USD',
    country: rq.country, // e.g., 'BR', 'MX', 'AR'
    order_id: `${rq.referenceId}-${Date.now()}`,
    success_url: returnUrl,
    back_url: returnUrl,
    notification_url: `${baseUrl}/api/webhooks/dlocal`,
  }

  const dlocalApiUrl = "https://api.dlocalgo.com"

  const dlocalRs = await $fetch(`${dlocalApiUrl}/v1/payments`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${dlocalApiKey}:${dlocalSecretKey}`,
      'Content-Type': 'application/json',
    },
    body: orderData,
  }) // Contains the 'redirect_url'

  return {
    referenceId: rq.referenceId,
    token: "",
    paymentUrl: dlocalRs.redirect_url,
    DLOCAL_GO_BASE_URL: process.env.DLOCAL_GO_BASE_URL,
    NUXT_DLOCAL_GO_BASE_URL: process.env.NUXT_DLOCAL_GO_BASE_URL,
    dlocalApiUrl: config.dlocalApiKey,
  }
}
