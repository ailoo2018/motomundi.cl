// server/plugins/redis-storage.ts
import redisDriver from 'unstorage/drivers/redis'

export default defineNitroPlugin(() => {
/*  const redisUrl = process.env.REDIS_URL

  if (!redisUrl) {
    console.warn('⚠️ REDIS_URL not set, using default fs/memory cache')
    return
  }


  const storage = useStorage() as any

  // Log what's currently mounted
  console.log('📦 Current mounts:', Object.keys(storage._mounts || {}))

  // Force remove the existing cache mount directly from internal map
  if (storage._mounts?.['cache:']) {
    delete storage._mounts['cache:']
    console.log('🗑️ Removed existing cache mount')
  }

  // Now mount Redis
  try {
    const driver = redisDriver({ url: redisUrl })
    storage.mount('cache', driver)
    console.log('✅ Redis cache driver mounted')
  } catch (e: any) {
    console.error('❌ Failed to mount Redis:', e.message)
  }*/
})
