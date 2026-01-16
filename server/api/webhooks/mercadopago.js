import { MercadoPagoConfig, Payment } from 'mercadopago'
import { getDomainId } from "@/server/ailoo-domain.js"

const MERCADO_PAGO = 15

export default defineEventHandler(async event => {
  try {
    const config = useRuntimeConfig()
    const query = getQuery(event)


    if(query)
      console.log(`!!!!!Webhook called: query: ${JSON.stringify(query)}`)

    const body = await readBody(event)
    console.log('!!!!!Webhook Body:', body)


    // Mercado Pago envía el ID del recurso en diferentes lugares según el tipo de notificación
    const id = body.data?.id || body.resource?.split('/').pop()
    const topic = body.type || query.topic

    console.log("topic is: " + topic + "  id is: " + id)

    // Solo nos interesan las notificaciones de pagos
    if (topic === 'payment' && id) {
      try {
        const client = new MercadoPagoConfig({
          accessToken: process.env.MERCADO_PAGO_ACCESS_TOKEN, // Add this to your runtimeConfig
        })

        const payment = new Payment(client)

        // 1. Obtener los detalles del pago desde la API oficial de Mercado Pago
        const paymentData = await payment.get({ id })

        const orderId = paymentData.external_reference
        const status = paymentData.status // 'approved', 'rejected', 'cancelled', etc.

        // 2. Lógica de negocio según el estado
        if (status === 'approved') {
          console.log(`💰 Pago aprobado para Orden: ${orderId}`)

          // ACTUALIZA TU BASE DE DATOS AQUÍ
          try {
            const confirmRet = await $fetch(`${config.public.w3BaseUrl}/${getDomainId()}/checkout/payment-result`,
              {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',

                },
                body: {
                  orderId: orderId,
                  paymentMethodType: MERCADO_PAGO,
                  paymentId: id,
                  token: null, // used in webpay
                },
              })

            console.log("CofnrimRet: ", confirmRet)
          } catch (e) {
            console.error(e)
            console.error(e.stack)
          }

        } else if (status === 'rejected') {
          console.log(`❌ Pago rechazado para Orden: ${orderId}`)

          // Opcional: marcar como fallida
        }

        // 3. SIEMPRE responder con 200 o 201 para que Mercado Pago deje de reintentar
        return { received: true }

      } catch (error) {
        console.error('Error procesando Webhook de MP:', error)

        // Log detailed error for debugging
        if (error.cause) {
          console.error('Error cause:', error.cause)
        }

        // Respondemos 200 igual para evitar que MP nos sature con reintentos si el error es de nuestra lógica
        return { received: true, error: 'Internal logic error' }
      }
    }
  }catch(err1) {
    console.error("Error al recibir notificacion en webhook: ", err1 )

    // Log detailed error for debugging
    if (err1.cause) {
      console.error('Error cause:', err1.cause)
    }

  }

  // Si recibimos otro tipo de notificación (ej. plan de suscripción) simplemente respondemos OK
  return { received: true }
})
