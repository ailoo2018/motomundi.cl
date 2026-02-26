/* eslint-disable camelcase */
import {getBaseUrl, type ProcessPaymentRq} from "@/services/gateways/gateway";
import {currencyClient} from "@/services/clients/currencyClient";

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

  let amount = rq.amount / 1.19
  if(rq.currency !== "CLP"){
    let exchangeRate = await currencyClient.exchangeRate("CLP", rq.currency);
    amount = amount * exchangeRate;
  }

  let order_id = `${rq.referenceId}-${Date.now()}`
  if(rq.referenceType === "invoice"){
    order_id = `invoice-${order_id}`
  }

  let fractions = 2
  if(rq.currency === "CLP"
    || rq.currency === "ARS"
    || rq.currency === "COL"
  ){
    fractions = 0
  }

  const orderData = {
    amount:  Number(amount).toFixed(fractions), // e.g., 100.00
    currency: rq.currency || 'USD',
    country: rq.country, // e.g., 'BR', 'MX', 'AR'
    order_id: order_id,
    success_url: `${returnUrl}?referenceId=${rq.referenceId}&referenceType=${rq.referenceType}`,
    back_url: baseUrl + "/checkout/" + (rq.referenceType === "invoice" ? rq.referenceId : "") ,
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
/*    DLOCAL_GO_BASE_URL: process.env.DLOCAL_GO_BASE_URL,
    NUXT_DLOCAL_GO_BASE_URL: process.env.NUXT_DLOCAL_GO_BASE_URL,
    dlocalApiUrl: config.dlocalApiKey,*/
  }
}
