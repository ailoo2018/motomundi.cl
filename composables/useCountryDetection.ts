// composables/useCountryDetection.js

export interface Country {
  name: string;
  currency: string;
  symbol: string;
  flag: string;
  iso: string;
  hasDecimals: boolean;
}

export const COUNTRY_DATA = {
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

// ── Singleton state (shared across all calls to useCountryDetection) ──────────
// Defined outside the function so every component reads the SAME refs,
// not isolated copies. This is what fixes the "showPopup is always false" bug.
const showPopup       = ref(false)
const detectedCountry = ref(null)
const isLoading       = ref(false)
let   detectionRan    = false   // prevents duplicate fetch on hot-reload
// ─────────────────────────────────────────────────────────────────────────────

export function useCountryDetection() {
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

  /** Fetch visitor country via ipapi.co (free, no key needed) */
  async function detectCountry() {
    // Only run on the client
    if (!import.meta.client) return

    // Already has a saved preference → respect it, no popup
    if (countryCookie.value) return

    // Don't fetch again if already running / already ran
    if (detectionRan) return
    detectionRan = true

    isLoading.value = true
    try {
      const res  = await fetch('https://ipapi.co/json/')
      const data = await res.json()
      const code = data.country_code?.toUpperCase()

      if (code && code !== DEFAULT_COUNTRY && COUNTRY_DATA[code]) {
        detectedCountry.value = code

        // Show popup after 3 seconds
        setTimeout(() => {
          showPopup.value = true
        }, 3000)
      }
    } catch (e) {
      // Silently fail — no popup on network error
      console.warn('[CountryDetection] Could not detect country:', e)
    } finally {
      isLoading.value = false
    }
  }

  function acceptDetectedCountry() {
    if (!detectedCountry.value) return
    changeCountr(detectedCountry.value)
    showPopup.value     = false
  }

  function keepDefaultCountry() {
    changeCountry(DEFAULT_COUNTRY)
    showPopup.value     = false
  }

  function getCountryCurrency(code){
    return COUNTRY_DATA[code]?.currency || "CLP"
  }
  function getCountryData(code) : Country {
    return COUNTRY_DATA[code] || null
  }

  function changeCountry(code) {
    if (COUNTRY_DATA[code]) {
      countryCookie.value = code
      currencyCookie.value = getCountryCurrency(code)
    }
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
    COUNTRY_DATA,
    DEFAULT_COUNTRY,
  }
}
