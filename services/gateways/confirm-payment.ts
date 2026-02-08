import {getDomainId} from "@/server/ailoo-domain";

export async function confirmPayment(paymentMethodId: number, authCode: string){
  const config = useRuntimeConfig();
  try {
    const confirmRet = await $fetch(`${config.public.w3BaseUrl}/${getDomainId()}/checkout/payment-result`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',

        },
        body: {
          paymentMethodId: paymentMethodId,
          authorizationCode: authCode,
        },
      })

    console.log("CofnrimRet: ", confirmRet)
  } catch (e) {
    console.error(e)
    console.error(e.stack)
  }

}
