export default defineEventHandler(async (event) => {

  const storage = useStorage('cache')
  const keys = await storage.getKeys()


  return {
    success: true,
    driver: storage?.getMount("cache")?.driver?.name,
    cleared: keys.length,
    keys: keys,
  }
})
