import transbankSdk from 'transbank-sdk'
import type {ProcessPaymentRq, ProcessPaymentRs} from "@/services/gateways/gateway";

const { WebpayPlus } = transbankSdk

const TEST_COMMERCE_CODE='597055555532'


export async function processWebpay(rq : ProcessPaymentRq) : Promise<ProcessPaymentRs>{

  const commerceCode: string = process.env.WEBPAY_COMMERCE_CODE || ""
  const apiKey: string = process.env.WEBPAY_API_KEY || ""

  try {
    let tx

    if (process.env.NODE_ENV === 'production' && commerceCode !== TEST_COMMERCE_CODE) {
      tx = WebpayPlus.Transaction.buildForProduction(commerceCode, apiKey)
    } else {
      tx = WebpayPlus.Transaction.buildForIntegration(commerceCode, apiKey)
    }

    let order_id = "" + rq.referenceId
    if (rq.referenceType === "invoice") {
      order_id = "invoice-" + rq.referenceId
    }

    const response = await tx.create(
      order_id,
      `session-${Date.now()}`,
      Math.round(rq.amount),
      rq.returnUrl,
    )

    return {
      referenceId: rq.referenceId,
      token: response.token,
      paymentUrl: response.url + `?token_ws=${response.token}`,
    }
  }catch(err){
    const error = err instanceof Error ? err : new Error(String(err))
    const data = (err as any)?.data?.message ?? ''

    const errMsg = `Error webpay: ${data} ${error.message} commerceCode: ${commerceCode} node_env: ${process.env.NODE_ENV}`

    const wrapped = new Error(errMsg)
    wrapped.cause = error  // ✅ preserves original stack via .cause (Node 16.9+)
    throw wrapped
  }

}
