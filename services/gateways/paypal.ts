import {getBaseUrl, type ProcessPaymentRq, type ProcessPaymentRs} from "@/services/gateways/gateway";


export async function processPaypal(rq : ProcessPaymentRq): Promise<ProcessPaymentRs> {

  const config = useRuntimeConfig()

  const clientId = config.paypalClientId || process.env.PAYPAL_CLIENT_ID
  const secret = config.paypalClientSecret || process.env.PAYPAL_CLIENT_SECRET
  const paypalApiUrl = config.paypalClientSecret || process.env.PAYPAL_API_URL
  // Get access token
  const authRes = await $fetch<{ access_token: string }>(
    `${paypalApiUrl}/v1/oauth2/token`,
    {
      method: 'POST',
      headers: {
        Authorization: `Basic ${Buffer.from(
          `${clientId}:${secret}`
        ).toString('base64')}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: 'grant_type=client_credentials',
    }
  )



  const amountValue = Number(rq.amount).toFixed(0)


  let baseUrl = getBaseUrl()
  let returnUrl = rq.returnUrl + "?referenceId=" + rq.referenceId
  if(returnUrl.startsWith("http://localhost")){
    returnUrl = returnUrl.replace("http://localhost:3000", baseUrl)
  }

  // Create the order
  const order = await $fetch<{
    id: string
    links: { href: string; rel: string; method: string }[]
  }>(
    `${paypalApiUrl}/v2/checkout/orders`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${authRes.access_token}`,
        'Content-Type': 'application/json',
      },
      body: {
        intent: 'CAPTURE',
        purchase_units: [
          {
            reference_id: rq.referenceType === "invoice" ? "invoice-" + rq.referenceId : rq.referenceId,
            amount: {
              currency_code: rq.currency,
              value: Number(amountValue),
            },
          },

        ],
        application_context: {
          return_url: returnUrl,  // after approval
          cancel_url: returnUrl,   // if user cancels
          brand_name: 'Motomundi',
          user_action: 'PAY_NOW',   // button says "Pay Now" instead of "Continue"
        },
      },
    }
  )

  const approvalUrl = order.links.find(l => l.rel === 'approve')?.href


  return {
    paymentUrl: approvalUrl, referenceId: "" +  order.id, token: ""
  };
}
