// server/plugins/redis-storage.ts
import redisDriver from 'unstorage/drivers/redis'

export default defineNitroPlugin(async () => {

/*
  const redisUrl = process.env.REDIS_URL

  if (!redisUrl) {
    console.warn('⚠️ REDIS_URL not set, using default fs/memory cache')
    return
  }


  const storage = useStorage() as any


  // Now mount Redis
  try {
    const driver = redisDriver({ url: redisUrl })
    const a = await storage.unmount('cache', true)
    const b= await storage.mount('cache', driver)
    console.log('✅ Redis cache driver mounted')
  } catch (e: any) {
    console.error('❌ Failed to mount Redis:', e.message)
  }*/
})
