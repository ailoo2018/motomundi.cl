import { v4 as uuidv4 } from 'uuid'

export const useWuid = () => {

  const setWuid = wuid => {
    const guestId = useCookie('guest_id', {
      maxAge: 60 * 60 * 24 * 30,
      sameSite: 'lax',
    })

    guestId.value = wuid
  }

  return { setWuid }
}
