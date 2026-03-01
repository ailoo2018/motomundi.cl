export default defineEventHandler(async (event) => {
  // Protect this endpoint


  /*
  const { secret } = await readBody(event)
    if (secret !== process.env.CACHE_CLEAR_SECRET) {
      throw createError({ statusCode: 401, message: 'Unauthorized' })
    }
  */

  const storage = useStorage('cache')
  const keys = await storage.getKeys()

  for(var key of keys){
    try {
      await storage.removeItem(key)
    }catch(error){
      console.error("Unable to delete key: " + key + " " + error.message, error)
    }
  }
//  await Promise.all(keys.map(key => storage.removeItem(key)))

  console.log('storage getMounted: ' + storage?.getMount("cache")?.driver?.name)


  return {
    success: true,
    driver: storage?.getMount("cache")?.driver?.name,
    cleared: keys.length,
    keys: keys,
  }
})
