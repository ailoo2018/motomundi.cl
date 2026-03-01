export default defineEventHandler(async (event) => {
  if (process.env.NODE_ENV !== 'development') {
    throw createError({ statusCode: 403 })
  }

  const storage = useStorage('cache')
  const keys = await storage.getKeys()

  return { count: keys.length, keys }
})
