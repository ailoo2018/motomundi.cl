// server/api/checkout.post.ts
export default defineEventHandler(async (event) => {
  // const config = useRuntimeConfig();
  const body = await readBody(event);

  const dlocalApiKey = process.env.DLOCK_API_KEY;
  const dlocalSecretKey = process.env.DLOCAL_GO_SECRET_KEY;

/*
  body.amount = 100;
  body.currency = "USD";
  body.country = "AR";
*/
  // In a real app, calculate total price server-side based on product IDs
  // to prevent client-side price tampering.
  const baseUrl = "https://www.motomundi.cl"// config.public.baseUrl || "localhost:3000"

  const orderData = {
    amount: body.amount, // e.g., 100.00
    currency: body.currency || 'USD',
    country: body.country, // e.g., 'BR', 'MX', 'AR'
    order_id: `order_${Date.now()}`,
    success_url: `${baseUrl}/success`,
    back_url: `${baseUrl}/cart`,
    notification_url: `${baseUrl}/api/webhooks/dlocal`,
  };

  try {
    const dlocalApiUrl = "https://api.dlocalgo.com"
    const response = await $fetch(`${dlocalApiUrl}/v1/payments`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${dlocalApiKey}:${dlocalSecretKey}`,
        'Content-Type': 'application/json',
      },
      body: orderData,
    });

    return response; // Contains the 'redirect_url'
  } catch (error: any) {
    throw createError({
      statusCode: error.response?.status || 500,
      statusMessage: 'dLocal Integration Error',
    });
  }
});
