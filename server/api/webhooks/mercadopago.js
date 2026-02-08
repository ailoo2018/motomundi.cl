import { confirmPayment } from "@/services/gateways/confirm-payment"
import { Gateways } from "@/services/gateways/gateway"


export default defineEventHandler(async event => {
  try {
    const query = getQuery(event)


    const body = await readBody(event)
    const authCode = body.data?.id || body.resource?.split('/').pop()
    const topic = body.type || query.topic


    if (topic === 'payment' && authCode) {
    
      try {
        await confirmPayment(Gateways.MERCADO_PAGO, authCode)
      }catch(e){
        console.log(e)
        console.log(e.stack)
      }

      return { received: true }

    }
  }catch(err1) {
    console.error("Error al recibir notificacion en webhook: ", err1 )
    if (err1.cause) {
      console.error('Error cause:', err1.cause)
    }
  }

  // Si recibimos otro tipo de notificación (ej. plan de suscripción) simplemente respondemos OK
  return { received: true }
})
