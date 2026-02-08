export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const body = await readBody(event); // Expecting order details

  const response = await $fetch('https://api.sandbox.oscato.com/api/lists', {
    method: 'POST',
    headers: {
      'Authorization': `Basic ${Buffer.from(config.payoneerUser + ':' + config.payoneerToken).toString('base64')}`,
      'Content-Type': 'application/vnd.optile.payment.enterprise-v1-extensible+json',
    },
    body: {
      transactionId: `order_${Date.now()}`,
      country: 'US',
      customer: { email: "jcfuentes@ailoo.cl" },
      payment: {
        amount: 100,
        currency: 'USD',
        reference: 'Store Purchase'
      },
      style: { language: 'en_US' },
      callback: {
        returnUrl: 'https://yourstore.com/checkout/success',
        cancelUrl: 'https://yourstore.com/checkout/cancel',
        notificationUrl: 'https://yourstore.com/api/payoneer/webhook'
      }
    }
  });

  return response; // Contains the 'links.self' or 'listId'
});
