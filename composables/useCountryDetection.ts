// composables/useCountryDetection.js

export interface Country {
  name: string;
  currency: string;
  symbol: string;
  flag: string;
  iso: string;
  hasDecimals: boolean;
}

export const COUNTRY_DATA : any = {
  AR: { name: 'Argentina',      currency: 'ARS', symbol: '$',   flag: '🇦🇷', iso: "AR", hasDecimals: false },
  BO: { name: 'Bolivia',        currency: 'BOB', symbol: 'Bs.', flag: '🇧🇴', iso: "BO", hasDecimals: true },
  BR: { name: 'Brasil',         currency: 'BRL', symbol: 'R$',  flag: '🇧🇷', iso: "BR", hasDecimals: true },
  CL: { name: 'Chile',          currency: 'CLP', symbol: '$',   flag: '🇨🇱', iso: "CL", hasDecimals: false },
  CO: { name: 'Colombia',       currency: 'COP', symbol: '$',   flag: '🇨🇴', iso: "CO", hasDecimals: false },
  CR: { name: 'Costa Rica',     currency: 'CRC', symbol: '₡',   flag: '🇨🇷', iso: "CR", hasDecimals: false },
  EC: { name: 'Ecuador',        currency: 'USD', symbol: '$',   flag: '🇪🇨', iso: "EC", hasDecimals: true },
  SV: { name: 'El Salvador',    currency: 'USD', symbol: '$',   flag: '🇸🇻', iso: "SV", hasDecimals: true },
  ES: { name: 'España',         currency: 'EUR', symbol: '€',   flag: '🇪🇸', iso: "ES", hasDecimals: true },
  US: { name: 'Estados Unidos', currency: 'USD', symbol: '$',   flag: '🇺🇸', iso: "US", hasDecimals: true },
  GT: { name: 'Guatemala',      currency: 'GTQ', symbol: 'Q',   flag: '🇬🇹', iso: "GT", hasDecimals: false },
  HN: { name: 'Honduras',       currency: 'HNL', symbol: 'L',   flag: '🇭🇳', iso: "HN", hasDecimals: true },
  MX: { name: 'México',         currency: 'MXN', symbol: '$',   flag: '🇲🇽', iso: "MX", hasDecimals: false },
  NI: { name: 'Nicaragua',      currency: 'NIO', symbol: 'C$',  flag: '🇳🇮', iso: "NI", hasDecimals: true },
  PA: { name: 'Panamá',         currency: 'PAB', symbol: 'B/.', flag: '🇵🇦', iso: "PA", hasDecimals: true },
  PY: { name: 'Paraguay',       currency: 'PYG', symbol: '₲',   flag: '🇵🇾', iso: "PY", hasDecimals: false },
  PE: { name: 'Perú',           currency: 'PEN', symbol: 'S/',  flag: '🇵🇪', iso: "PE", hasDecimals: true },
  PR: { name: 'Puerto Rico',    currency: 'USD', symbol: '$',   flag: '🇵🇷', iso: "PR", hasDecimals: true },
  DO: { name: 'República Dominicana', currency: 'DOP', symbol: 'RD$', flag: '🇩🇴', iso: "DO", hasDecimals: true },
  UY: { name: 'Uruguay',        currency: 'UYU', symbol: '$',   flag: '🇺🇾', iso: "UY", hasDecimals: true },
  VE: { name: 'Venezuela',      currency: 'VES', symbol: 'Bs.', flag: '🇻🇪', iso: "VE", hasDecimals: true },
}
export const DEFAULT_COUNTRY = 'CL'
export const COOKIE_NAME     = 'mm_country'
export const CURRENCY_COOKIE_NAME     = 'mm_currency'
export const COOKIE_DAYS     = 365


export function useCountryDetection() {

  // These will now persist from Server to Client correctly
  const showPopup = useState('country_show_popup', () => false)
  const detectedCountry = useState('country_detected', () => null)
  const isLoading = useState('country_is_loading', () => false)

  // For non-reactive flags that don't affect UI, a simple variable is fine
  // but keep it inside or use a state if it affects logic flow
  const detectionRan = useState('country_detection_ran', () => false)

  // Nuxt's useCookie — reactive & SSR-safe
  const countryCookie = useCookie(COOKIE_NAME, {
    maxAge: COOKIE_DAYS * 24 * 60 * 60,
    path: '/',
    sameSite: 'lax',
  })
  const currencyCookie = useCookie(CURRENCY_COOKIE_NAME, {
    maxAge: COOKIE_DAYS * 24 * 60 * 60,
    path: '/',
    sameSite: 'lax',
  })

  const selectedCountry = computed(
    () => countryCookie.value ?? DEFAULT_COUNTRY,
  )

  const selectedCountryData = computed(
    () => COUNTRY_DATA[selectedCountry.value] ?? COUNTRY_DATA[DEFAULT_COUNTRY],
  )

  const detectedCountryData = computed(
    () => COUNTRY_DATA[detectedCountry.value] ?? null,
  )

  async function detectCountry() {
    if (!import.meta.client) return
    if (countryCookie.value) return
    if (detectionRan.value) return  // ✅ .value added
    detectionRan.value = true

    isLoading.value = true
    try {
      const res  = await fetch('https://ipapi.co/json/')
      const data = await res.json()
      const code = data.country_code?.toUpperCase()

      if (code && code !== DEFAULT_COUNTRY && COUNTRY_DATA[code]) {
        detectedCountry.value = code
        setTimeout(() => { showPopup.value = true }, 3000)
      }
    } catch (e) {
      console.warn('[CountryDetection] Could not detect country:', e)
    } finally {
      isLoading.value = false
    }
  }


  function acceptDetectedCountry() {
    if (!detectedCountry.value) return
    changeCountry(detectedCountry.value)  // ✅ typo fixed
    showPopup.value = false
  }

  function keepDefaultCountry() {
    changeCountry(DEFAULT_COUNTRY)
    showPopup.value     = false
  }

  function getCountryCurrency(code: string){
    return COUNTRY_DATA[code]?.currency || "CLP"
  }
  function getCountryData(code: string) : Country {
    return COUNTRY_DATA[code] || null
  }

  function changeCountry(code: string) {
    if (COUNTRY_DATA[code]) {
      countryCookie.value = code
      currencyCookie.value = getCountryCurrency(code)
    }
  }

  function getCountryFlag () : string
  {
    return `/content/images/flags/${selectedCountryData.value.iso?.toLowerCase()}.png`
  }

  function dismissPopup() {
    showPopup.value = false
  }

  return {
    showPopup,
    detectedCountry,
    detectedCountryData,
    selectedCountry,
    selectedCountryData,
    isLoading,
    detectCountry,
    acceptDetectedCountry,
    keepDefaultCountry,
    changeCountry,
    dismissPopup,
    getCountryData,
    getCountryFlag,
    COUNTRY_DATA,
    DEFAULT_COUNTRY,
  }
}
