import { v4 as uuidv4 } from 'uuid';

export const useGuestUser = () => {
  // Max age of 30 days
  const guestId = useCookie('guest_id', {
    maxAge: 60 * 60 * 24 * 30,
    sameSite: 'lax'
  });

  // Assign a value if it's the user's first visit
  if (!guestId.value) {
    guestId.value = uuidv4();
  }

  return guestId;
};
