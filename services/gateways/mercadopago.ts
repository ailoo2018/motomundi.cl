import {MercadoPagoConfig, Preference} from "mercadopago";
import {getBaseUrl, type ProcessPaymentRq} from "@/services/gateways/gateway";

export async function processMercadoPago(rq : ProcessPaymentRq) {

  const client = new MercadoPagoConfig({
    accessToken: process.env.MERCADO_PAGO_ACCESS_TOKEN, // Add this to your runtimeConfig
    options: { timeout: 5000 },
  })

  const preference = new Preference(client)

  // 2. Prepare the order data
  const config = useRuntimeConfig();

  let baseUrl = getBaseUrl()

  let returnUrl = rq.returnUrl
  if(returnUrl.startsWith("http://localhost")){
    returnUrl = returnUrl.replace("http://localhost:3000", baseUrl)
  }


  let external_reference = rq.referenceId
  if(rq.referenceType === "invoice"){
    external_reference = "invoice-" + rq.referenceId
  }

  // 3. Create the preference
  const pref = {
    body: {
      items: [
        {
          id: `${rq.referenceId}`,
          title: `Orden #${rq.referenceId}`,
          quantity: 1,
          unit_price: Number(rq.amount),
          currency_id: 'CLP', // Required for Chile
        },
      ],
      back_urls: {
        success: returnUrl,
        failure: returnUrl,
        pending: returnUrl,
      },
      auto_return: 'approved',
      external_reference: external_reference,
      notification_url: `${baseUrl}/api/webhooks/mercadopago`, // Optional: for IPN
    },
  }

  const response = await preference.create(pref)

  return {
    referenceId: rq.referenceId,
    paymentUrl: response.init_point,
    preferenceId: response.id,
  }
}
