import {processWebpay} from "@/services/gateways/webpay";
import {processMercadoPago} from "@/services/gateways/mercadopago";
import {processDLocal} from "@/services/gateways/dlocal";
import {processPaypal} from "@/services/gateways/paypal";




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

export interface ProcessPaymentRs {
  token?: string,
  paymentUrl?: string,
  referenceId?: string
  preferenceId?: string,
}


export async function processPayment(rq : ProcessPaymentRq): Promise<ProcessPaymentRs> {

  console.log(`${rq.paymentMethodId} = ${Gateways.WEBPAY}`)

  switch(rq.paymentMethodId){
    case 8:
      return await processWebpay(rq)
    case 10:
      return await processPaypal(rq)
    case 15:
      return await processMercadoPago(rq)
    case 19:
      return await processDLocal(rq)
  }

  throw new Error("Payment Error: Unknwon payment method: " + rq.paymentMethodId)
}

export function getReturnUrl(paymentMethodId : any, referenceType : any){
  const config = useRuntimeConfig()
  return `${config.public.baseUrl}/payments/${getMethodType(paymentMethodId)}/${referenceType.toLowerCase()}`
}



const methodTypeMap = new Map<string, string> ([
  ["8", "webpay"],
  ["15", "mercadopago"],
  ["19", "dlocal"],
  ["10", "paypal"],
])

function getMethodType(typeId : any) : string | undefined {
  return methodTypeMap.get(`${typeId}`)
}

export function getBaseUrl(){
  const config = useRuntimeConfig();
  let baseUrl = config.public.baseUrl


  if(!baseUrl.startsWith("https")){
    baseUrl = "https://appears-chair-cloud-skills.trycloudflare.com"
  }



  return baseUrl
}

export function getReferenceId(refId: any) : number {
  if(refId.startsWith("invoice-")){
    refId = refId.replace("invoice-","")
  }

  if(refId.startsWith("order-")){
    refId = refId.replace("order-","")
  }

  const firstNumber: string = refId.split('-')[0];
  return parseInt(firstNumber, 10);
}


export function getReferenceType(refId: any) : string {
  if(refId.startsWith("invoice-")){
    return "invoice"
  }

  return "order"
}
