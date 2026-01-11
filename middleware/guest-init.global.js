// middleware/guest-init.global.js
export default defineNuxtRouteMiddleware((to, from) => {
  // This trigger the composable logic above
  const guestId = useGuestUser();

  // You can now access guestId.value anywhere in your app
});
