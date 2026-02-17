export const useRemoteLog = () => {
  const logToFile = async (message: string, data?: any) => {
    // We use $fetch to send the data to our server route
    await $fetch('/api/log', {
      method: 'POST',
      body: {
        message,
        data,
        timestamp: new Date().toISOString(),
        url: window.location.href
      }
    })
  }

  return { logToFile }
}
