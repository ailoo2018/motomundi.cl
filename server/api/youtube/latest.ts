export default defineEventHandler(async event => {
  try {
    const config = useRuntimeConfig()
    const CHANNEL_ID = 'UClkc3m-0-ZFIqf1gBymlcUA'
    const CACHE_KEY = 'youtube:latest:videos'
    const CACHE_TTL = 60 * 60 * 12 // 24 hours in seconds

    // Try to get from cache first
    const cached = await useStorage().getItem(CACHE_KEY)

    if (cached) {
      const { data, timestamp } = cached
      const age = Date.now() - timestamp

      // Return cached if less than 24 hours old
      if (age < CACHE_TTL * 1000) {
        console.log('Serving from cache, age:', Math.floor(age / 1000 / 60), 'minutes')
        return data
      }
    }

    // Fetch fresh data
    const apiKey = config.youtubeApiKey
    const data = await $fetch('https://www.googleapis.com/youtube/v3/search', {
      timeout: 5000,
      query: {
        key: apiKey,
        channelId: CHANNEL_ID,
        part: 'snippet,id',
        order: 'date',
        maxResults: 10,
        type: 'video',
      },
    })

    data.timestamp = new Date()
    // Store in cache
    await useStorage().setItem(CACHE_KEY, {
      data,
      timestamp: Date.now()
    })


    console.log('Fetched fresh data from YouTube API')
    return data

  } catch(error) {
    console.error('Error calling youtube latest', error)
    throw createError({
      statusCode: error.statusCode || 500,
      message: error.message || 'Failed to fetch YouTube videos',
    })
  }
})
