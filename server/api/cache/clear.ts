import { getDomainId } from "../../ailoo-domain"

export default defineEventHandler(async (event) => {
  try {

    let w3ClearRs = null

    const config = useRuntimeConfig()
    const baseUrl = config.public.w3BaseUrl

    w3ClearRs = await $fetch(`${baseUrl}/${getDomainId()}/refresh`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    const storage = useStorage('cache');

    // 1. Get all keys (this driver is already scoped to 'w3:')
    const keys = await storage.getKeys();

    // 2. Manually delete each key.
    // storage.removeItem() uses the standard 'DEL' command,
    // avoiding the problematic 'UNLINK' command.
    await Promise.all(
      keys.map(key => storage.removeItem(key))
    );

    return {
      w3ClearRs: w3ClearRs,
      status: 'success',
      clearedCount: keys.length
    };
  } catch (e: any) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Manual cache clear failed',
      data: e.message
    });
  }
});
