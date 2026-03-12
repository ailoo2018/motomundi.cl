export default defineNitroPlugin(nitroApp => {
  // Intercept errors to ensure they are logged as structured JSON
  nitroApp.hooks.hook('error', async (error, { event }) => {
    const errorLog = {
      timestamp: new Date().toISOString(),
      level: 'error',
      message: error.message,
      stack: error.stack,
      url: event?.path,
      method: event?.method,
      isNuxtError: true,
    }

    // Printing stringified JSON to console.error
    // Azure will capture this in the 'stderr' stream
    console.error(JSON.stringify(errorLog))
  })
})
