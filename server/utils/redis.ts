import Redis from 'ioredis'

// Use an environment variable for the URL to keep it secure
// In Nuxt, you'd add REDIS_URL to your .env file
const redisUrl = process.env.REDIS_URL || 'redis://localhost:6379'

const redis = new Redis(redisUrl)

export default redis
