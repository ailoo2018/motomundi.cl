export default defineEventHandler((event) => {
  const cookies = parseCookies(event)

  if (!cookies.guest_id) {
    setCookie(event, 'guest_id', uuidv4(), {
      maxAge: 60 * 60 * 24 * 30,
      sameSite: 'lax',
      httpOnly: false,
    })
  }
})
