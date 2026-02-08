import {processWebpay} from "@/services/gateways/webpay";
import {processMercadoPago} from "@/services/gateways/mercadopago";
import {processDLocal} from "@/services/gateways/dlocal";




export const Gateways = Object.freeze({
  WEBPAY: 8,
  MERCADO_PAGO: 15,
  DLOCAL: 19,
})

export interface ProcessPaymentRq {
  paymentMethodId: number,
  referenceId: any,
  referenceType: string,
  amount: number,
  currency: string,
  returnUrl: string,
  country: string

}

export async function processPayment(rq : ProcessPaymentRq): Promise<ProcessPaymentRq> {

  console.log(`${rq.paymentMethodId} = ${Gateways.WEBPAY}`)

  switch(rq.paymentMethodId){
    case 8:
      return await processWebpay(rq)
    case 15:
      return await processMercadoPago(rq)
    case 19:
      return await processDLocal(rq)
  }

  throw new Error("Payment Error: Payment Error Payload: " + rq.paymentMethodId)
}

export function getReturnUrl(paymentMethodId, referenceType){
  const config = useRuntimeConfig()
  return `${config.public.baseUrl}/payments/${getMethodType(paymentMethodId)}/${referenceType.toLowerCase()}`
}



const methodTypeMap = {
  "8": "webpay",
  "15": "mercadopago",
  "19": "dlocal",
}

function getMethodType(typeId){
  return methodTypeMap["" + typeId]
}

export function getBaseUrl(){
  const config = useRuntimeConfig();

  let baseUrl = config.public.baseUrl
  if(!baseUrl.startsWith("https")){
    baseUrl = "https://encourage-pending-david-town.trycloudflare.com"
  }


  return baseUrl
}

export function getReferenceId(refId) : number {
  if(refId.startsWith("invoice-")){
    refId = refId.replace("invoice-","")
  }

  if(refId.startsWith("order-")){
    refId = refId.replace("order-","")
  }

  const firstNumber: string = refId.split('-')[0];
  return parseInt(firstNumber, 10);
}


export function getReferenceType(refId) : string {
  if(refId.startsWith("invoice-")){
    return "invoice"
  }

  return "order"
}
