<script setup>
import { computed, onMounted, onUnmounted, ref } from 'vue'

const props = defineProps({
  // Optional CMS widget payload (kept for compatibility with the home componentMap)
  widget: {
    type: Object,
    default: null,
  },

  // Black Friday start: 27/11/2026 00:00 Chile (America/Santiago, UTC-3 in November)
  startsAt: {
    type: String,
    default: '2026-11-27T00:00:00-03:00',
  },
  link: {
    type: String,
    default: '/outlet',
  },
})

const targetMs = new Date(props.startsAt).getTime()

// `now` stays null during SSR so server and client render the same markup
const now = ref(null)
let timer = null

const tick = () => {
  now.value = Date.now()
  if (now.value >= targetMs && timer) {
    clearInterval(timer)
    timer = null
  }
}

onMounted(() => {
  tick()
  if (now.value < targetMs)
    timer = setInterval(tick, 1000)
})

onUnmounted(() => {
  if (timer)
    clearInterval(timer)
})

const isLive = computed(() => now.value !== null && now.value >= targetMs)

const pad = n => String(n).padStart(2, '0')

const countdown = computed(() => {
  if (now.value === null)
    return [
      { label: 'Días', value: '--' },
      { label: 'Horas', value: '--' },
      { label: 'Min', value: '--' },
      { label: 'Seg', value: '--' },
    ]

  const diff = Math.max(0, targetMs - now.value)
  const totalSeconds = Math.floor(diff / 1000)

  return [
    { label: 'Días', value: pad(Math.floor(totalSeconds / 86400)) },
    { label: 'Horas', value: pad(Math.floor((totalSeconds % 86400) / 3600)) },
    { label: 'Min', value: pad(Math.floor((totalSeconds % 3600) / 60)) },
    { label: 'Seg', value: pad(totalSeconds % 60) },
  ]
})
</script>

<template>
  <section
    class="bf-hero"
    :class="{ 'bf-hero--live': isLive }"
    aria-label="Black Friday Motomundi"
  >
    <div class="bf-hero__bg" />
    <div class="bf-hero__overlay" />
    <div class="bf-hero__accent-bar" />

    <div class="bf-hero__inner">
      <!-- Copy + countdown -->
      <div class="bf-hero__content">
        <div class="bf-hero__eyebrow">
          <img
            src="/logo-motomundi.png"
            alt="Motomundi"
            class="bf-hero__logo"
            width="200"
            height="28"
          >
          <span
            class="bf-tag"
            :class="{ 'bf-tag--live': isLive }"
          >
            {{ isLive ? 'Activo ahora' : '27 · Noviembre · 2026' }}
          </span>
        </div>

        <h2 class="bf-hero__heading">
          <span class="bf-hero__heading-black">Black</span>
          <span class="bf-hero__heading-friday">Friday</span>
        </h2>

        <p class="bf-hero__sub">
          <template v-if="isLive">
            Ya comenzó. Cascos, chaquetas, guantes y botas con los mejores precios del año.
          </template>
          <template v-else>
            Cascos, chaquetas, guantes y botas con los mejores precios del año. Prepárate, la cuenta regresiva ya empezó.
          </template>
        </p>

        <!-- Countdown -->
        <div
          v-if="!isLive"
          class="bf-countdown"
          role="timer"
          aria-live="off"
        >
          <template
            v-for="(unit, i) in countdown"
            :key="unit.label"
          >
            <div class="bf-countdown__unit">
              <span class="bf-countdown__value">{{ unit.value }}</span>
              <span class="bf-countdown__label">{{ unit.label }}</span>
            </div>
            <span
              v-if="i < countdown.length - 1"
              class="bf-countdown__sep"
              aria-hidden="true"
            >:</span>
          </template>
        </div>

        <div
          v-else
          class="bf-live"
        >
          <span class="bf-live__dot" />
          <span>Black Friday en vivo</span>
        </div>

        <NuxtLink
          :to="link"
          class="bf-hero__cta"
        >
          <span class="bf-hero__cta-text">{{ isLive ? 'Comprar ahora' : 'Ver ofertas' }}</span>
          <span class="bf-hero__cta-arrow">
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M4 10H16M11 5L16 10L11 15"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </span>
        </NuxtLink>
      </div>

      <!-- Foreground gear illustration -->
      <NuxtLink
        :to="link"
        class="bf-hero__visual"
        tabindex="-1"
        aria-hidden="true"
      >
        <img
          src="/cms/home/black-friday-gear.svg"
          alt=""
          class="bf-hero__gear"
          width="900"
          height="760"
          loading="lazy"
        >
      </NuxtLink>
    </div>

    <div class="bf-hero__accent-bar bf-hero__accent-bar--bottom" />
  </section>
</template>

<style scoped>
/* ── SECTION ───────────────────────────────────────────────────── */
.bf-hero {
  position: relative;
  display: flex;
  overflow: hidden;
  flex-direction: column;
  background: #070707;
  font-family: Barlow, 'Barlow Condensed', sans-serif;
  min-block-size: 560px;
}

.bf-hero__bg {
  position: absolute;
  background-image: url('/cms/home/black-friday-bg.svg');
  background-position: center;
  background-size: cover;
  inset: 0;
}

.bf-hero__overlay {
  position: absolute;
  z-index: 1;
  background: linear-gradient(100deg, rgba(7, 7, 7, 0.85) 0%, rgba(7, 7, 7, 0.45) 50%, rgba(7, 7, 7, 0) 100%);
  inset: 0;
}

.bf-hero__accent-bar {
  position: absolute;
  z-index: 3;
  background: #d6001c;
  block-size: 4px;
  inset-block-start: 0;
  inset-inline: 0;
}

.bf-hero__accent-bar--bottom {
  background: rgba(214, 0, 28, 0.4);
  block-size: 2px;
  inset-block: auto 0;
}

/* ── LAYOUT ────────────────────────────────────────────────────── */
.bf-hero__inner {
  position: relative;
  z-index: 2;
  display: grid;
  flex: 1;
  align-items: center;
  box-sizing: border-box;
  padding: 3.5rem 2rem;
  margin: 0 auto;
  gap: 2rem;
  grid-template-columns: minmax(0, 1fr) minmax(0, 1.1fr);
  inline-size: 100%;
  max-inline-size: 1300px;
}

.bf-hero__content {
  max-inline-size: 560px;
}

/* ── EYEBROW ───────────────────────────────────────────────────── */
.bf-hero__eyebrow {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.75rem 1rem;
  margin-block-end: 1.5rem;
}

.bf-hero__logo {
  box-sizing: content-box;
  padding: 0.4rem 0.75rem;
  border-radius: 4px;
  background: #fff;
  block-size: 20px;
  inline-size: auto;
}

.bf-tag {
  padding: 0.3rem 0.9rem;
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 999px;
  backdrop-filter: blur(4px);
  background: rgba(255, 255, 255, 0.1);
  color: rgba(255, 255, 255, 0.8);
  font-family: 'Barlow Condensed', sans-serif;
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 0.2em;
  text-transform: uppercase;
}

.bf-tag--live {
  border-color: #d6001c;
  animation: bf-pulse 2.5s ease-in-out infinite;
  background: #d6001c;
  color: #fff;
}

@keyframes bf-pulse {
  0%,
  100% { box-shadow: 0 0 0 0 rgba(214, 0, 28, 0.5); }
  50% { box-shadow: 0 0 0 8px rgba(214, 0, 28, 0); }
}

/* ── HEADING ───────────────────────────────────────────────────── */
.bf-hero__heading {
  margin: 0 0 1rem;
  color: #fff;
  font-family: 'Barlow Condensed', Barlow, sans-serif;
  font-size: clamp(3.25rem, 7.5vw, 6.5rem);
  font-weight: 900;
  letter-spacing: -0.01em;
  line-height: 0.88;
  text-transform: uppercase;
}

.bf-hero__heading-black,
.bf-hero__heading-friday {
  display: block;
}

.bf-hero__heading-friday {
  color: #d6001c;
}

.bf-hero__sub {
  margin: 0 0 1.75rem;
  color: rgba(255, 255, 255, 0.7);
  font-size: 1.05rem;
  line-height: 1.6;
  max-inline-size: 460px;
}

/* ── COUNTDOWN ─────────────────────────────────────────────────── */
.bf-countdown {
  display: flex;
  align-items: flex-start;
  gap: 0.5rem;
  margin-block-end: 2rem;
}

.bf-countdown__unit {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0.7rem 0.4rem 0.55rem;
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 6px;
  backdrop-filter: blur(6px);
  background: rgba(255, 255, 255, 0.06);
  border-block-start: 3px solid #d6001c;
  min-inline-size: 76px;
}

.bf-countdown__value {
  color: #fff;
  font-family: 'Barlow Condensed', sans-serif;
  font-size: 2.6rem;
  font-variant-numeric: tabular-nums;
  font-weight: 900;
  line-height: 1;
}

.bf-countdown__label {
  margin-block-start: 0.35rem;
  color: rgba(255, 255, 255, 0.5);
  font-size: 0.68rem;
  font-weight: 600;
  letter-spacing: 0.14em;
  text-transform: uppercase;
}

.bf-countdown__sep {
  color: #d6001c;
  font-family: 'Barlow Condensed', sans-serif;
  font-size: 2.2rem;
  font-weight: 900;
  line-height: 1;
  padding-block-start: 0.75rem;
}

/* ── LIVE STATE ────────────────────────────────────────────────── */
.bf-live {
  display: inline-flex;
  align-items: center;
  padding: 0.6rem 1.1rem;
  border: 1px solid rgba(214, 0, 28, 0.5);
  border-radius: 6px;
  background: rgba(214, 0, 28, 0.15);
  color: #fff;
  font-family: 'Barlow Condensed', sans-serif;
  font-size: 1.1rem;
  font-weight: 700;
  gap: 0.6rem;
  letter-spacing: 0.14em;
  margin-block-end: 2rem;
  text-transform: uppercase;
}

.bf-live__dot {
  border-radius: 50%;
  animation: bf-pulse 1.6s ease-in-out infinite;
  background: #ff2a40;
  block-size: 10px;
  inline-size: 10px;
}

/* ── CTA ───────────────────────────────────────────────────────── */
.bf-hero__cta {
  display: inline-flex;
  overflow: hidden;
  align-items: center;
  border-radius: 4px;
  text-decoration: none;
}

.bf-hero__cta-text {
  padding: 0.95rem 1.9rem;
  background: #d6001c;
  color: #fff;
  font-family: 'Barlow Condensed', sans-serif;
  font-size: 1rem;
  font-weight: 700;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  transition: background 0.2s;
}

.bf-hero__cta-arrow {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.95rem 1rem;
  background: #a5001a;
  color: #fff;
  transition: background 0.2s, transform 0.2s;
}

.bf-hero__cta:hover .bf-hero__cta-text { background: #b5001a; }

.bf-hero__cta:hover .bf-hero__cta-arrow {
  background: #d6001c;
  transform: translateX(3px);
}

/* ── VISUAL ────────────────────────────────────────────────────── */
.bf-hero__visual {
  display: flex;
  align-items: center;
  justify-content: center;
}

.bf-hero__gear {
  animation: bf-float 5s ease-in-out infinite;
  block-size: auto;
  inline-size: 100%;
  max-inline-size: 680px;
}

@keyframes bf-float {
  0%,
  100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
}

@media (prefers-reduced-motion: reduce) {
  .bf-hero__gear,
  .bf-tag--live,
  .bf-live__dot { animation: none; }
}

/* ── RESPONSIVE ────────────────────────────────────────────────── */
@media (max-width: 960px) {
  .bf-hero__inner {
    padding: 2.5rem 1.25rem 3rem;
    gap: 0.5rem;
    grid-template-columns: minmax(0, 1fr);
    text-align: center;
  }

  .bf-hero__overlay {
    background: linear-gradient(180deg, rgba(7, 7, 7, 0.2) 0%, rgba(7, 7, 7, 0.55) 45%, rgba(7, 7, 7, 0.9) 100%);
  }

  /* Gear first on small screens, copy below */
  .bf-hero__visual {
    order: -1;
  }

  .bf-hero__gear {
    max-inline-size: 460px;
  }

  .bf-hero__content {
    margin: 0 auto;
  }

  .bf-hero__eyebrow,
  .bf-countdown {
    justify-content: center;
  }

  .bf-hero__sub {
    margin-inline: auto;
  }
}

@media (max-width: 480px) {
  .bf-hero__heading {
    font-size: clamp(2.75rem, 16vw, 4rem);
  }

  .bf-hero__sub {
    font-size: 0.95rem;
  }

  .bf-countdown {
    gap: 0.3rem;
  }

  .bf-countdown__unit {
    padding: 0.55rem 0.2rem 0.45rem;
    min-inline-size: 0;
    flex: 1;
  }

  .bf-countdown__value {
    font-size: 1.9rem;
  }

  .bf-countdown__sep {
    font-size: 1.6rem;
    padding-block-start: 0.6rem;
  }

  .bf-countdown__label {
    font-size: 0.6rem;
    letter-spacing: 0.1em;
  }

  .bf-hero__cta {
    justify-content: center;
    inline-size: 100%;
  }

  .bf-hero__cta-text {
    flex: 1;
  }
}
</style>
