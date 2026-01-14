
export const useLoggedInUser = () => {
  // Max age of 30 days
  const userId = useCookie('user_id', {
    maxAge: 60 * 60 * 24 * 30,
    sameSite: 'lax'
  });

  // Assign a value if it's the user's first visit
  if (!guestId.value) {
    guestId.value = uuidv4();
  }

  return userId;
};
