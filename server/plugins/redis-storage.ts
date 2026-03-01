// server/plugins/redis-storage.ts
import redisDriver from 'unstorage/drivers/redis'

export default defineNitroPlugin(() => {
  const redisUrl = process.env.REDIS_URL

  if (!redisUrl) {
    console.warn('⚠️ REDIS_URL not set, using memory cache')
    
    return
  }

  console.log('✅ Mounting Redis cache driver')

  const storage = useStorage()

  try {
    storage.unmount('cache')
  } catch {
    // ignore if not mounted
  }

  const driver = redisDriver({ url: redisUrl })

  storage.mount('cache', driver)
})
