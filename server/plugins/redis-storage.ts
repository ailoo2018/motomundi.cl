// server/api/cache/clear.post.ts
import Redis from 'ioredis'

export default defineEventHandler(async (event) => {



  const redisUrl = process.env.REDIS_URL

  if (!redisUrl) {
    throw createError({ statusCode: 500, message: 'REDIS_URL not found' })
  }

  // Create a temporary direct connection
  const redis = new Redis(redisUrl)

  try {
    // 1. Find all keys starting with your prefix
    // We use SCAN instead of KEYS to be production-safe
    let cursor = '0'
    let totalDeleted = 0
    const prefix = 'w3:*'

    do {
      // SCAN returns [nextCursor, keysArray]
      const [nextCursor, keys] = await redis.scan(cursor, 'MATCH', prefix, 'COUNT', 100)
      cursor = nextCursor

      if (keys.length > 0) {
        // 2. Use 'del' explicitly (NOT unlink)
        await redis.del(...keys)
        totalDeleted += keys.length
      }
    } while (cursor !== '0')

    // Clean up connection
    await redis.quit()

    return {
      status: 'success',
      message: `Manually cleared ${totalDeleted} keys using DEL command.`,
    }
  } catch (e: any) {
    await redis.quit()
    throw createError({
      statusCode: 500,
      statusMessage: 'Redis direct clear failed',
      data: e.message
    })
  }
})
