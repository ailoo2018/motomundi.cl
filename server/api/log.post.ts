export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  // Use the logger utility from the previous step
  logger.info('Client Log:', body)

  return { status: 'logged' }
})
