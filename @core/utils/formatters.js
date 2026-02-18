import { isToday } from './helpers'

export const avatarText = value => {
  if (!value)
    return ''
  const nameArray = value.split(' ')

  return nameArray.map(word => word.charAt(0).toUpperCase()).join('')
}

// TODO: Try to implement this: https://twitter.com/fireship_dev/status/1565424801216311297
export const kFormatter = num => {
  const regex = /\B(?=(\d{3})+(?!\d))/g

  return Math.abs(num) > 9999 ? `${Math.sign(num) * +((Math.abs(num) / 1000).toFixed(1))}k` : Math.abs(num).toFixed(0).replace(regex, ',')
}

/**
 * Format and return date in Humanize format
 * Intl docs: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat/format
 * Intl Constructor: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat/DateTimeFormat
 * @param {string} value date to format
 * @param {Intl.DateTimeFormatOptions} formatting Intl object to format with
 */
export const formatDate = (value, formatting = { month: 'numeric', day: 'numeric', year: 'numeric' }) => {
  if (!value)
    return value

  return new Intl.DateTimeFormat('es-CL', formatting).format(new Date(value)).replaceAll("-", "/")
}

export const formatDateTime = (value, formatting = {
  month: 'numeric', day: 'numeric', year: '2-digit', hour: '2-digit',
  minute: '2-digit',
  second: '2-digit',
  hour12: false,
}) => {
  if (!value)
    return value

  return new Intl.DateTimeFormat('es-CL', formatting).format(new Date(value)).replaceAll("-", "/")
}


/**
 * Return short human friendly month representation of date
 * Can also convert date to only time if date is of today (Better UX)
 * @param {string} value date to format
 * @param {boolean} toTimeForCurrentDay Shall convert to time if day is today/current
 */
export const formatDateToMonthShort = (value, toTimeForCurrentDay = true) => {
  const date = new Date(value)
  let formatting = { month: 'short', day: 'numeric' }
  if (toTimeForCurrentDay && isToday(date))
    formatting = { hour: 'numeric', minute: 'numeric' }

  return new Intl.DateTimeFormat('en-US', formatting).format(new Date(value))
}
export const prefixWithPlus = value => value > 0 ? `+${value}` : value


export const formatMoney = (number, currency, fmtzero) => {
  if (number === 0 && !fmtzero)
    return ""

  // Convert to thousands
  const inThousands = number
  let decimals = 0
  if (currency === "USD")
    decimals = 2

  // Create a formatter for Chilean Peso with 3 decimal places
  const formatter = new Intl.NumberFormat('es-CL', {
    style: 'currency',
    currency: currency || 'CLP',
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  })

  // Format the number
  let formatted = formatter.format(inThousands)

  // Replace the currency symbol with $ and add K at the end
  formatted = formatted.replace('CLP', '$').replace(',', '.').trim()

  return formatted
}


export const formatPercent = (number, decimalPlaces = 0) => {
  return new Intl.NumberFormat('en-US', {
    style: 'percent',
    minimumFractionDigits: decimalPlaces,
    maximumFractionDigits: decimalPlaces,
  }).format(number)
}


export const getDomainId = () => {
  return 1
}

export const getBaseCDN = () => {
  return "https://cdn.motomundi.cl"
}


export const getImageUrl = (guidString, width, domainId) => {
  // Validate input types
  if (typeof guidString !== 'string' || typeof width !== 'number') {
    return "/images/empty-image.avif?v=1"
  }

  // Validate guidString format
  const guidRegex = /^[0-9a-f]{32}\.[a-z]+$/i
  if (!guidRegex.test(guidString)) {
    return "/images/empty-image.avif?v=1"
  }

  // Validate width
  if (width <= 0 || !Number.isInteger(width)) {
    return "/images/empty-image.avif?v=1"
  }

  // Split the string into guid and extension
  const [guid, extension] = guidString.split('.')

  // Extract the first two characters of the guid
  const firstChar = guid.charAt(0)
  const secondChar = guid.charAt(1)
  const thirdChar = guid.charAt(2)

  // Construct the new path
  return "https://cdn.motomundi.cl/content/products/" + domainId + `/${firstChar}/${secondChar}${thirdChar}/${guid}_${width}.${extension}`
}


export const getDataImageUrl = (guidString, width, domainId) => {
  let imageUrl = getImageUrl(guidString, width, domainId)

  return imageUrl
    .replace("/products/" + domainId, "/uploads/" + domainId + "/_data")
    .replace("_600.", "_600_original.")
}

export const getYouTubeThumbnail = (videoId, quality = 'default') => {
  const qualityMap = {
    max: 'maxresdefault',
    sd: 'sddefault',
    mq: 'mqdefault',
    default: 'default',
  }

  const suffix = qualityMap[quality] || qualityMap.max

  return `https://img.youtube.com/vi/${videoId}/${suffix}.jpg`
}


export function formatDeliveryDateRange(dateRange) {
  try {
    // Parse dates considering the timezone
    const fromDate = new Date(dateRange.from)
    const toDate = new Date(dateRange.to)

    // Add 4 days to each date for delivery estimation
    const deliveryFromDate = new Date(fromDate.setDate(fromDate.getDate()))
    const deliveryToDate = new Date(toDate.setDate(toDate.getDate()))

    // Format dates in Spanish
    const formatter = new Intl.DateTimeFormat('es', {
      day: 'numeric',
      month: 'long',
    })

    const fromDay = deliveryFromDate.getDate()
    const toDay = deliveryToDate.getDate()
    const month = formatter.format(deliveryToDate).split(' de')[1]

    // Check if both dates are the same
    if (fromDay === toDay) {
      return `${fromDay} de${month}`
    }

    return `${fromDay} y el ${toDay} de${month}`
  } catch (error) {
    console.error('Error formatting dates:', error)

    return 'Error al procesar las fechas'
  }
}


export function isEntre(eta) {
  if (eta.from !== eta.to)
    return " entre el "

  return " el "
}

export const formatChileanRUT = rut => {
  if (!rut) return ''

  // Remove all non-alphanumeric characters
  rut = rut.replace(/[^0-9k]/gi, '')

  // Separate the body from the verification digit
  let body = rut.slice(0, -1)
  let dv = rut.slice(-1).toUpperCase()

  body = body.replace(/\B(?=(\d{3})+(?!\d))/g, '.')

  // Return the formatted RUT
  return `${body}-${dv}`
}

function formatLink(str) {
  if (str == null)
    return ''

  str = str.trim().toLowerCase()
    .replace('/', ' ')
    .replace('&', 'y')
    .replace(',', ' ')
    .replace('á', 'a')
    .replace('é', 'e')
    .replace('í', 'i')
    .replace('ó', 'o')
    .replace('ú', 'u')
    .replace('ñ', 'n')
    .replace("'", "")
    .replace("mx-enduro", "motocross")

  str = str.replace(/\s+/g, " ").replace(/ /g, "-")
  str = str.replace(/[^\w.\- ]/g, "")

  return str.length > 255 ? str.substring(0, 254) : str
}

export const getBrandUrl = function (brand) {

  return "/" + formatLink(brand.name)
}

export const getProductUrl = function (product) {
  return "/motocicleta/" + formatLink(product.linkName)
}

export const getCategoryUrl = function (category) {
  let prefix = "/"

  if (category.linkName && category.linkName.length > 0) {
    return prefix + formatLink(category.linkName)
  }

  return prefix + formatLink(category.name)
}
