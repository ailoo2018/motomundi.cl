import { v4 as uuidv4 } from 'uuid'

export const useGuestUser = () => {
  return useCookie('guest_id', {
    maxAge: 60 * 60 * 24 * 30,
    sameSite: 'lax',
  })
}
