export default defineEventHandler((event) => {
  const ua = getHeader(event, 'user-agent') || ''
  const deviceType = ua.match(/Mobile|Android|iPhone|iPad/) ? 'mobile' : 'desktop'

  // Set a simplified header that Nitro can vary on
  event.node.res.setHeader('x-device-type', deviceType)
})
