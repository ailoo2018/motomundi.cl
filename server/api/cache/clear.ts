import { getDomainId } from "../../ailoo-domain"

export default defineEventHandler(async (event) => {
  try {

    let w3ClearRs = null

    const config = useRuntimeConfig()
    const baseUrl = config.public.w3BaseUrl

    w3ClearRs = await $fetch(`${baseUrl}/${getDomainId()}/refresh`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })


    const redisUrl = process.env.REDIS_URL

    if (!redisUrl) {
      throw createError({ statusCode: 500, message: 'REDIS_URL not found' })
    }


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


    var rs =  {
      w3ClearRs: w3ClearRs,
      status: 'success',
      totalDeleted
    };

    return rs
  } catch (e: any) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Manual cache clear failed',
      data: e.message
    });
  }
});
