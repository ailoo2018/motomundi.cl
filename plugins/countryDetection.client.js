// plugins/countryDetection.client.js
// Runs only on the client — boots the detection once the app is ready.

import { useCountryDetection } from '~/composables/useCountryDetection'

export default defineNuxtPlugin(() => {
  const { detectCountry } = useCountryDetection()
  detectCountry()
})
