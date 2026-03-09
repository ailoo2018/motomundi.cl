const CACHE_DURATION_MS = 2 * 60 * 60 * 1000 // 2 hours

interface ExchangeRateResponse {
  result: string
  base_code: string
  time_last_update_unix: number
  time_next_update_unix: number
  conversion_rates: Record<string, number>
}

interface ExchangeRateCache {
  data: ExchangeRateResponse
  cachedAt: number
}

export const useExchangeRate = () => {
  const cache = useState<ExchangeRateCache | null>('exchange-rate-cache', () => null)
  const error = useState<string | null>('exchange-rate-error', () => null)
  const loading = useState<boolean>('exchange-rate-loading', () => false)

  const isCacheValid = (): boolean => {
    if (!cache.value) return false
    return Date.now() - cache.value.cachedAt < CACHE_DURATION_MS
  }

  const fetchRates = async (): Promise<void> => {
    if (isCacheValid()) return

    loading.value = true
    error.value = null

    try {
      const data = await $fetch<ExchangeRateResponse>('/api/currency/all')

      if (data.result !== 'success') {
        throw new Error('Failed to fetch exchange rates')
      }

      cache.value = {
        data,
        cachedAt: Date.now(),
      }
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Unknown error fetching exchange rates'
    } finally {
      loading.value = false
    }
  }

  const convertFromClp = (amount: number, to: string): number | null => {
    if (!cache.value?.data?.conversion_rates) return null

    const rates = cache.value.data.conversion_rates
    const fromRate = rates["CLP"]
    const toRate = rates[to.toUpperCase()]

    if (fromRate === undefined || toRate === undefined) {
      console.warn(`[useExchangeRate] Unknown currency code: ${!fromRate ? from : to}`)
      return null
    }

    // Convert: amount → base (CLP) → target currency
    const amountInBase = amount / fromRate
    return amountInBase * toRate
  }

  const convert = (amount: number, from: string, to: string): number | null => {
    if (!cache.value?.data?.conversion_rates) return null

    const rates = cache.value.data.conversion_rates
    const fromRate = rates[from.toUpperCase()]
    const toRate = rates[to.toUpperCase()]

    if (fromRate === undefined || toRate === undefined) {
      console.warn(`[useExchangeRate] Unknown currency code: ${!fromRate ? from : to}`)
      return null
    }

    // Convert: amount → base (CLP) → target currency
    const amountInBase = amount / fromRate
    return amountInBase * toRate
  }

  const rates = computed(() => cache.value?.data?.conversion_rates ?? null)
  const baseCurrency = computed(() => cache.value?.data?.base_code ?? null)
  const lastUpdated = computed(() =>
    cache.value?.data?.time_last_update_unix
      ? new Date(cache.value.data.time_last_update_unix * 1000)
      : null
  )

  return {
    rates,
    baseCurrency,
    lastUpdated,
    loading: readonly(loading),
    error: readonly(error),
    fetchRates,
    convert,
    convertFromClp,
  }
}
