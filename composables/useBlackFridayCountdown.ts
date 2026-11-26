import { computed, onMounted, onUnmounted, ref } from 'vue'
import { useState } from '#imports'
import { BLACK_FRIDAY } from '@/utils/blackFridayConfig'

// Settings (on/off switch, start and end dates) live in utils/blackFridayConfig.ts
const startMs = new Date(BLACK_FRIDAY.startsAt).getTime()
const endMs = new Date(BLACK_FRIDAY.endsAt).getTime()

// One clock shared by every card: a single setInterval no matter how many cards are mounted.
// `now` is only ever set in the browser (onMounted), so on the server it stays null.
const now = ref<number | null>(null)
let timer: ReturnType<typeof setInterval> | null = null
let subscribers = 0

const stop = () => {
  if (timer) {
    clearInterval(timer)
    timer = null
  }
}

const tick = () => {
  now.value = Date.now()
  if (now.value >= endMs)
    stop()
}

const pad = (n: number) => String(n).padStart(2, '0')

export const useBlackFridayCountdown = () => {
  // Per-instance flag so the first client render matches the server HTML,
  // even when the shared clock is already running.
  const mounted = ref(false)

  // Server render time, sent to the browser in the Nuxt payload, so the first
  // client render decides "is it Black Friday?" exactly like the server did.
  const ssrNow = useState<number>('bf-ssr-now', () => Date.now())

  onMounted(() => {
    mounted.value = true
    subscribers++
    tick()
    // No ticking at all when the campaign is switched off
    if (BLACK_FRIDAY.enabled && !timer && now.value! < endMs)
      timer = setInterval(tick, 1000)
  })

  onUnmounted(() => {
    subscribers = Math.max(0, subscribers - 1)
    if (subscribers === 0)
      stop()
  })

  const current = computed(() => (mounted.value ? now.value : null))

  const isExpired = computed(() => current.value !== null && current.value >= endMs)

  // d/h/m/s left until `targetMs`; "--" placeholders until mounted (SSR-safe)
  const unitsUntil = (targetMs: number) => {
    if (current.value === null) {
      return [
        { key: 'd', value: '--' },
        { key: 'h', value: '--' },
        { key: 'm', value: '--' },
        { key: 's', value: '--' },
      ]
    }

    const totalSeconds = Math.floor(Math.max(0, targetMs - current.value) / 1000)

    return [
      { key: 'd', value: pad(Math.floor(totalSeconds / 86400)) },
      { key: 'h', value: pad(Math.floor((totalSeconds % 86400) / 3600)) },
      { key: 'm', value: pad(Math.floor((totalSeconds % 3600) / 60)) },
      { key: 's', value: pad(totalSeconds % 60) },
    ]
  }

  // Time left until Black Friday ends (product cards / product page)
  const units = computed(() => unitsUntil(endMs))

  // Time left until Black Friday starts (home hero teaser)
  const startUnits = computed(() => unitsUntil(startMs))

  // Hours, minutes, seconds only: days are folded into the hours (e.g. 3d 4h -> 76h)
  const hmsUnits = computed(() => {
    const [d, h, m, sec] = units.value
    const hours = d.value === '--' ? '--' : pad(Number(d.value) * 24 + Number(h.value))

    return [{ key: 'h', value: hours }, m, sec]
  })

  // Black Friday is active only when switched on in utils/blackFridayConfig.ts AND startsAt <= now < endsAt.
  // Uses the server time until mounted, then the live shared clock.
  // 'off' (switched off) | 'upcoming' (before startsAt) | 'live' | 'ended' (after endsAt)
  const phase = computed<'off' | 'upcoming' | 'live' | 'ended'>(() => {
    if (!BLACK_FRIDAY.enabled)
      return 'off'
    const t = current.value ?? ssrNow.value
    if (t < startMs)
      return 'upcoming'

    return t < endMs ? 'live' : 'ended'
  })

  const isBlackFriday = computed(() => phase.value === 'live')

  return { phase, isBlackFriday, isExpired, units, hmsUnits, startUnits }
}
