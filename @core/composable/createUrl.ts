import { stringifyQuery } from 'ufo'
import { computed } from "vue"

export const createUrl = (url, _options) => computed(() => {
  if (!_options?.query)
    return toValue(url)
  const _url = toValue(url)
  const _query = toValue(_options?.query)
  const queryObj = Object.fromEntries(Object.entries(_query).map(([key, val]) => [key, toValue(val)]))
  
  return `${_url}${queryObj ? `?${stringifyQuery(queryObj)}` : ''}`
})


