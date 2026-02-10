/*

    await $fetch(baseUrl + `/api/convert`,
      {
        method: "GET",
        headers: {
          'Authorization': `Bearer ${process.env.JWT_SECRET}`,
        },
        query: {
          from: "CLP",
          to: to,
          amount: 1,
        },
      })

 */

export const currencyClient = {

  exchangeRate: async(from, to) => {

    const config = useRuntimeConfig()
    const baseUrl = config.public.w3BaseUrl


    const data = await $fetch(baseUrl + `/api/convert`,
      {
        method: "GET",
        headers: {
          'Authorization': `Bearer ${process.env.JWT_SECRET}`,
        },
        query: {
          from: from,
          to: to,
          amount: 1,
        },
      })

    return data.rate
  },
}
