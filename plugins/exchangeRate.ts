import { useExchangeRate } from "@/composables/useExchange"

export default defineNuxtPlugin(async () => {
  const { fetchRates } = useExchangeRate()

  await fetchRates()
})
