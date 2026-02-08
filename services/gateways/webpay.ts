import transbankSdk from 'transbank-sdk'
import type {ProcessPaymentRq} from "@/services/gateways/gateway";

const { WebpayPlus } = transbankSdk

const TEST_COMMERCE_CODE='597055555532'


export async function processWebpay(rq : ProcessPaymentRq){
  const commerceCode = process.env.WEBPAY_COMMERCE_CODE
  const apiKey = process.env.WEBPAY_API_KEY
  let tx

  if(process.env.NODE_ENV === 'production' && commerceCode !== TEST_COMMERCE_CODE) {
    tx = WebpayPlus.Transaction.buildForProduction(commerceCode, apiKey)
  }else{
    tx = WebpayPlus.Transaction.buildForIntegration(commerceCode, apiKey)
  }

  let order_id = "" + rq.referenceId
  if(rq.referenceType === "invoice"){
    order_id = "invoice-" + rq.referenceId
  }

  const response = await tx.create(
    order_id,
    `session-${Date.now()}`,
    rq.amount,
    rq.returnUrl,
  )

  return {
    referenceId: rq.referenceId,
    token: response.token,
    paymentUrl: response.url + `?token_ws=${response.token}`,
  }

}
