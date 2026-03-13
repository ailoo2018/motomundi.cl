import { useExchangeRate } from "@/composables/useExchange.js"
import { useCountryDetection } from "@/composables/useCountryDetection.js"
import { computed } from "vue"

const LOCAL_CURR = "CLP"

function formatMoney(number, currency, symbol, showDecimals){
  if(!number)
    return ""
  if (number === 0 )
    return ""

  // Convert to thousands
  const inThousands = number
  let decimals = 0
  if (showDecimals)
    decimals = 2

  // Create a formatter for Chilean Peso with 3 decimal places
  const formatter = new Intl.NumberFormat('es-CL', {

    currency: currency || 'CLP',
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  })

  // Format the number
  let formatted = formatter.format(inThousands)

  // Replace the currency symbol with $ and add K at the end
  formatted = symbol + formatted.replace('CLP', '$').replace(',', '.').trim()

  return formatted
}


export function useCurrencyConverter() {
  const { convert: _convert } = useExchangeRate()
  const { selectedCountryData } = useCountryDetection()


  const getCurrentCurrency = () => {
    return selectedCountryData.value?.currency || "CLP"
  }

  const convert = (amount, opts = { isNet: false, decimals: 2 })  => {
    const currency = getCurrentCurrency()

    let hasDecimals = 0
    if(selectedCountryData.value){
      hasDecimals = selectedCountryData.value.hasDecimals
    }else if(opts && opts.decimals){
      hasDecimals = opts.decimals > 0
    }

    if (!currency) return amount // Fallback if data isn't loaded yet

    let converted = _convert(Number(amount), LOCAL_CURR, currency)
    if(currency !== "CLP" && !opts.isNet)
      converted = converted / 1.19

    return Number(converted).toFixed( hasDecimals ? 2 : 0 )
  }

  const formatToCurrentCurrency = (amount, currency) => {
    const currentCurrency = getCurrentCurrency()
    if(currentCurrency !== currency){
      const amountInCurrentCurrency = _convert(amount, currency, currentCurrency)

      return formatMoney(amountInCurrentCurrency, currentCurrency, selectedCountryData.value?.symbol)
    }
  }

  const formatCurrency = (amount, currency, opts) => {

    let amnt = amount
    if(currency != "CLP")
      amnt = convert(amount, opts )

    if(!currency)
      currency = selectedCountryData.value?.currency

    let formatDecimals = selectedCountryData.value?.hasDecimals || false



    return formatMoney(amnt, currency, selectedCountryData.value?.symbol, formatDecimals)
  }

  const iso = computed(() => { return selectedCountryData.value.iso?.toLowerCase() })

  return {
    convert,
    selectedCountryData,
    iso,
    formatCurrency,
    formatToCurrentCurrency,
  }
}
