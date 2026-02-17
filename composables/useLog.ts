export const useLog = () => {
  const log = async (message: string, data?: any) => {
    if (import.meta.server) {
      // SERVER SIDE: Direct access to Winston (via server utils)
      // Note: In Nuxt 3, server utils are technically only for /server
      // so we use a dynamic import or the logging API internally.
      const { logger } = await import('~/server/utils/logger')
      logger.info(message, data)
    }

    if (import.meta.client) {
      // CLIENT SIDE: Send to our API bridge
      console.log(messatge, data)
    }
  }

  return { log }
}
