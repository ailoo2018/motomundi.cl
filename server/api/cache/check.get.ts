// server/api/__cache_check.get.ts
import { hash } from 'ohash'

export default defineEventHandler(async (event) => {
  const query = getQuery(event)


  const path = (query.path as string) ?? '/'
  const storage = useStorage('cache')

  // Nitro's key format for route rules cache:
  // nitro:handlers:<hash of { url, ...varyValues }>
  // Simpler: just search for keys containing path segments
  const allKeys = await storage.getKeys('nitro:handlers')

  const results = await Promise.all(
    allKeys.map(async (key) => {
      const item = await storage.getItem(key) as any
      const cachedUrl = item?.value?.headers?.['x-original-path']
        ?? item?.integrity
        ?? key

      return { key, item }
    })
  )

  // Try to find your route
  // The key contains a hash, so brute-check the stored values
  const matches = results.filter(({ item }) => {
    try {
      const body = JSON.stringify(item)
      return body.includes(path)
    } catch { return false }
  })

  return {
    path,
    found: matches.length > 0,
    keys: matches.map(m => m.key),
  }
})
