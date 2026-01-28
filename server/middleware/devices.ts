// server/middleware/device.ts
export default defineEventHandler(event => {
  const userAgent = getHeader(event, 'user-agent') || ''
  const isMobile2 = /mobile/i.test(userAgent)

  // Set a custom header that we will vary the cache on
  event.node.req.headers['x-device-type'] = isMobile2 ? 'mobile' : 'desktop'
})
