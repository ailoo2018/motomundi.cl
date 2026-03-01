import redis from '../../utils/redis'

export default defineEventHandler(async event => {
  try {
    const key = "test"
    const data = await redis.get(key)

    if (!data) {
      return { data: null, message: "Key not found or expired" }
    }

    return { key, data, env: process.env.REDIS_URL }
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to get Redis value',
    })
  }
})
