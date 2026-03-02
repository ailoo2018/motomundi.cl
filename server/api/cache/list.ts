export default defineEventHandler(async event => {
  // Access the specific storage mount defined in your plugin
  const storage = useStorage('cache')

  // getKeys() returns an array of all keys available to this driver
  // Because you set 'base: "w3:"' in the driver, the driver
  // already knows to only look for keys starting with that prefix.
  const keys = await storage.getKeys()

  return {
    prefix: 'w3:',
    count: keys.length,
    keys: keys,
  }
})
