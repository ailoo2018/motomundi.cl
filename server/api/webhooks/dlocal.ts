import { confirmPayment } from "@/services/gateways/confirm-payment"
import {Gateways, getReferenceId} from "@/services/gateways/gateway"
import crypto from 'crypto'

export default defineEventHandler(async event => {

  try {

    const body = await readRawBody(event)
    const notification = JSON.parse(body)
    const authCode = notification.payment_id

    try {
      await confirmPayment(Gateways.DLOCAL, authCode)
    }catch(e){
      console.log(e)
      console.log(e.stack)
    }


    return {
      success: true,
      notificationId,
    }

  } catch (error) {
    console.error('Webhook processing error:', error)

    // Still return 200 to prevent retries for invalid requests
    if (error.statusCode === 400 || error.statusCode === 401) {
      throw error
    }

    // Return 200 for processing errors to prevent dLocal retries
    return {
      success: false,
      error: 'Processing error',
    }
  }

})

