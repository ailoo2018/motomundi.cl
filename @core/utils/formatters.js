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
export const formatDate = (value, formatting = { month: 'short', day: 'numeric', year: 'numeric' }) => {
  if (!value)
    return value
  
  return new Intl.DateTimeFormat('en-US', formatting).format(new Date(value))
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


export const formatMoney = (number, fmtzero) => {
  if (number === 0 && !fmtzero)
    return ""

  // Convert to thousands
  const inThousands = number

  // Create a formatter for Chilean Peso with 3 decimal places
  const formatter = new Intl.NumberFormat('es-CL', {
    style: 'currency',
    currency: 'CLP',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
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
  return "https://www.motomundi.cl"
}


export const getImageUrl = (guidString, width, domainId) => {
  // Validate input types
  if (typeof guidString !== 'string' || typeof width !== 'number') {
    return null
  }

  // Validate guidString format
  const guidRegex = /^[0-9a-f]{32}\.[a-z]+$/i
  if (!guidRegex.test(guidString)) {
    return null
  }

  // Validate width
  if (width <= 0 || !Number.isInteger(width)) {
    return null
  }

  // Split the string into guid and extension
  const [guid, extension] = guidString.split('.')

  // Extract the first two characters of the guid
  const firstChar = guid.charAt(0)
  const secondChar = guid.charAt(1)
  const thirdChar = guid.charAt(2)

  // Construct the new path
  return "https://www.motomundi.cl/content/products/" + domainId + `/${firstChar}/${secondChar}${thirdChar}/${guid}_${width}.${extension}`
}


export const getDataImageUrl = (guidString, width, domainId) => {
  let imageUrl = getImageUrl(guidString, width, domainId)
  return imageUrl
    .replace("/products/" + domainId, "/uploads/" + domainId + "/_data" )
    .replace("_600.", "_600_original.")
}
