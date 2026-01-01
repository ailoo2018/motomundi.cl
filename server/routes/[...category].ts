export default defineEventHandler(async (event) => {
  return sendRedirect(event, '/pages/products/list', 302);
});
