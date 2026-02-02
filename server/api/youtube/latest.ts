export default defineEventHandler(async event => {

  try {
    const config = useRuntimeConfig()
    const { videoId } = getQuery(event)

    // The API key is fetched here on the server
    const apiKey = config.youtubeApiKey
    const CHANNEL_ID = 'UClkc3m-0-ZFIqf1gBymlcUA' // Your Channel ID

    var data =  await $fetch('https://www.googleapis.com/youtube/v3/search', {
      timeout: 5000,
      query: {
        key: apiKey,
        channelId: CHANNEL_ID,
        part: 'snippet,id',
        order: 'date',
        maxResults: 3,
        type: 'video',
      },
    })


    return data;
  }catch(error){
    console.error('Error', error)
    console.error('Stack trace:', error.stack)
    throw createError({
      statusCode: error.statusCode || 500,
      message: error.message || 'Failed to list addreses',
    })
  }

})
