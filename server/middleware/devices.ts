// server/middleware/device.ts
export default defineEventHandler(event => {
  const userAgent = getHeader(event, 'user-agent') || ''
  const isMobile = /mobile/i.test(userAgent)

  event.node.req.headers['x-device-type'] = isMobile ? 'mobile' : 'desktop'

  event.context.deviceType = isMobile ? 'mobile' : 'desktop'
})
