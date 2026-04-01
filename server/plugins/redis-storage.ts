// /server/plugins/redis-storage.ts
import redisDriver from 'unstorage/drivers/redis'

export default defineNitroPlugin(async () => {

  const redisUrl = process.env.REDIS_URL

  if (!redisUrl) {
    console.warn('⚠️ REDIS_URL not set, using default fs/memory cache')
    return
  }
  const storage = useStorage() as any

  try {

    await storage.unmount('cache', true)
    storage.mount('cache', redisDriver({
      url: process.env.REDIS_URL,
      base: 'w3:',
      ttl: 600,
      useUnlink: false,
      retryStrategy: (times) => Math.min(times * 50, 2000),

      // Add these:
      keepAlive: 5000,          // send TCP keepalive every 5s
      connectTimeout: 3000,     // fail fast instead of hanging 10s+
      lazyConnect: false,       // connect immediately at startup
      enableOfflineQueue: true, // queue commands during reconnect
      maxRetriesPerRequest: 3,  // don't retry forever
    }))

    console.log('✅ Redis cache driver mounted')
  } catch (e: any) {
    console.error('❌ Failed to mount Redis:', e.message)
  }
})
