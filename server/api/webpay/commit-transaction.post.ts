/* eslint-disable camelcase */
import transbankSdk from 'transbank-sdk'
import { getDomainId } from "../../ailoo-domain"

const { WebpayPlus, Options, IntegrationApiKeys, IntegrationCommerceCodes, Environment } = transbankSdk

export default defineEventHandler(async event => {
  const { token } = await readBody(event)

  if (!token) {
    throw createError({
      statusCode: 400,
      message: 'Token is required',
    })
  }

  try {

    const tx = new WebpayPlus.Transaction(new Options(
      IntegrationCommerceCodes.WEBPAY_PLUS,
      IntegrationApiKeys.WEBPAY,
      Environment.Integration,
    ))

    const response = await tx.commit(token)

    // Response codes:
    // 0 = Approved
    // -1 to -8 = Rejected (different error types)
    const success = response.response_code === 0

    const config = useRuntimeConfig()
    if(success){
      const confirmRet = $fetch(`${config.public.w3BaseUrl}/${getDomainId()}/checkout/payment-result`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',

          },
          body: {
            orderId: response.buy_order,
            amount: response.amount,
            success: success,
            data: response,
          },
        })
    }



    return {
      success,
      buyOrder: response.buy_order,
      amount: response.amount,
      authorizationCode: response.authorization_code,
      cardNumber: response.card_detail?.card_number,
      transactionDate: response.transaction_date,
      responseCode: response.response_code,
      paymentTypeCode: response.payment_type_code,
      installmentsNumber: response.installments_number,
      status: response.status,
    }
  } catch (error) {
    console.error('Commit transaction error:', error)

    throw createError({
      statusCode: error.statusCode || 500,
      message: error.message || 'Error confirming Webpay transaction',
    })
  }
})
