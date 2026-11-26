import { computed, onMounted, onUnmounted, ref } from 'vue'
import { BLACK_FRIDAY } from '@/utils/blackFridayConfig'

// Settings (on/off switch and end date) live in utils/blackFridayConfig.ts
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

  onMounted(() => {
    mounted.value = true
    subscribers++
    tick()
    if (!timer && now.value! < endMs)
      timer = setInterval(tick, 1000)
  })

  onUnmounted(() => {
    subscribers = Math.max(0, subscribers - 1)
    if (subscribers === 0)
      stop()
  })

  const current = computed(() => (mounted.value ? now.value : null))

  const isExpired = computed(() => current.value !== null && current.value >= endMs)

  const units = computed(() => {
    if (current.value === null) {
      return [
        { key: 'd', value: '--' },
        { key: 'h', value: '--' },
        { key: 'm', value: '--' },
        { key: 's', value: '--' },
      ]
    }

    const totalSeconds = Math.floor(Math.max(0, endMs - current.value) / 1000)

    return [
      { key: 'd', value: pad(Math.floor(totalSeconds / 86400)) },
      { key: 'h', value: pad(Math.floor((totalSeconds % 86400) / 3600)) },
      { key: 'm', value: pad(Math.floor((totalSeconds % 3600) / 60)) },
      { key: 's', value: pad(totalSeconds % 60) },
    ]
  })

  // Hours, minutes, seconds only: days are folded into the hours (e.g. 3d 4h -> 76h)
  const hmsUnits = computed(() => {
    const [d, h, m, sec] = units.value
    const hours = d.value === '--' ? '--' : pad(Number(d.value) * 24 + Number(h.value))

    return [{ key: 'h', value: hours }, m, sec]
  })

  // Campaign switch from utils/blackFridayConfig.ts
  const isBlackFriday = BLACK_FRIDAY.enabled

  return { isBlackFriday, isExpired, units, hmsUnits }
}
