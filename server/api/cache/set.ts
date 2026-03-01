import redis from '../../utils/redis'

export default defineEventHandler(async event => {
  try {
    const key = "test"
    const value = "hello world"
    const secondsInHour = 3600

    // SETEX: key, seconds, value
    await redis.setex(key, secondsInHour, value)

    return { success: true, message: `Value set for key: ${key}`, env: process.env.REDIS_URL }
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to set Redis value',
    })
  }
})
