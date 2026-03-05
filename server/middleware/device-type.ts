export default defineEventHandler(event => {
  const userAgent = getHeader(event, 'user-agent') || ''
  const isMobile = /mobile/i.test(userAgent)

  setCookie(event, 'device-type', isMobile ? 'mobile' : 'desktop', {
    maxAge: 60 * 60,
    sameSite: 'lax'
  })
})
