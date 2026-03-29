// server/plugins/cache-headers.ts
export default defineNitroPlugin((nitroApp) => {
  // 1. Detect when Nuxt actually renders the HTML (Cache MISS)
  // This hook is completely skipped if the page is served from the Redis cache
  nitroApp.hooks.hook('render:html', (_html, { event }) => {
    event.context.__isCacheMiss = true
  })

  // 2. Intercept the response right before it's sent to the client
  // This runs on EVERY request, whether it was a hit or a miss
  nitroApp.hooks.hook('beforeResponse', (event) => {
    // Get the route rules applied to the current URL
    const rules = getRouteRules(event)

    // 3. Only append the header if this specific route is configured for caching
    if (rules.cache || rules.swr) {
      const cacheStatus = event.context.__isCacheMiss ? 'MISS' : 'HIT'
      setResponseHeader(event, 'X-Cache', cacheStatus)
    }
  })
})
