/* eslint-disable camelcase */
import transbankSdk from 'transbank-sdk'

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
    /*
    const tx = new WebpayPlus.Transaction(new Options(
      IntegrationCommerceCodes.WEBPAY_PLUS,
      IntegrationApiKeys.WEBPAY,
      Environment.Integration
    ))

    const response = await tx.commit(token)
*/
    const response = {
      response_code: 0,
      amount: 1000,
      authorization_code: "123",
      transactionDate: new Date(),
      responseCode: 0,
      paymentTypeCode: "TC",
      installmentsNumber: 3,
      stauts: 0,
    }


    // Response codes:
    // 0 = Approved
    // -1 to -8 = Rejected (different error types)
    const success = response.response_code === 0





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
