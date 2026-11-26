<script setup>
import { useBlackFridayCountdown } from "@/composables/useBlackFridayCountdown"

// Black Friday urgency strip for the product detail page.
// Uses the same shared timer as the product cards (ends 28/11/2026 23:59:59 Chile)
// and hides itself once the campaign is over.
const { isExpired, hmsUnits } = useBlackFridayCountdown()
</script>

<template>
  <div
    v-if="!isExpired"
    class="bf-pdp-clock"
    role="timer"
    aria-live="off"
  >
    <svg
      class="bf-pdp-clock__icon"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      aria-hidden="true"
    >
      <circle cx="12" cy="13" r="8" />
      <path d="M12 9v4l2.5 2.5" />
      <path d="M5 3 2 6" />
      <path d="m22 6-3-3" />
      <path d="M6.4 19.4 5 21" />
      <path d="M17.6 19.4 19 21" />
    </svg>

    <div class="bf-pdp-clock__text">
      <span class="bf-pdp-clock__eyebrow">Black Friday</span>
      <span class="bf-pdp-clock__label">Esta oferta termina en</span>
    </div>

    <div class="bf-pdp-clock__time">
      <template
        v-for="(unit, i) in hmsUnits"
        :key="unit.key"
      >
        <span class="bf-pdp-clock__unit">{{ unit.value }}<small>{{ unit.key }}</small></span>
        <span
          v-if="i < hmsUnits.length - 1"
          class="bf-pdp-clock__sep"
          aria-hidden="true"
        >:</span>
      </template>
    </div>
  </div>
</template>

<style scoped>
.bf-pdp-clock {
  display: flex;
  align-items: center;
  gap: 12px;
  box-sizing: border-box;
  padding: 10px 14px;
  border-radius: 8px;
  background: #f3d3d6;
  border-inline-start: 4px solid #d6001c;
  color: #111;
  font-family: 'Barlow Condensed', Barlow, sans-serif;
  line-height: 1;
}

.bf-pdp-clock__icon {
  flex: 0 0 auto;
  animation: bf-pdp-ring 2.4s ease-in-out infinite;
  block-size: 30px;
  color: #d6001c;
  inline-size: 30px;
  transform-origin: 50% 55%;
}

.bf-pdp-clock__text {
  display: flex;
  flex: 1 1 auto;
  flex-direction: column;
  gap: 3px;
  min-inline-size: 0;
}

.bf-pdp-clock__eyebrow {
  color: #d6001c;
  font-size: 12px;
  font-weight: 800;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}

.bf-pdp-clock__label {
  font-size: 16px;
  font-weight: 700;
  text-transform: uppercase;
}

.bf-pdp-clock__time {
  display: inline-flex;
  flex: 0 0 auto;
  align-items: baseline;
  gap: 3px;
  font-size: 28px;
  font-variant-numeric: tabular-nums;
  font-weight: 800;
  white-space: nowrap;
}

.bf-pdp-clock__unit small {
  margin-inline-start: 1px;
  color: #d6001c;
  font-size: 0.6em;
  font-weight: 800;
}

.bf-pdp-clock__sep {
  color: #d6001c;
  opacity: 0.6;
}

/* Small "ring" every few seconds to draw the eye without being noisy */
@keyframes bf-pdp-ring {
  0%, 86%, 100% { transform: rotate(0); }
  88% { transform: rotate(-12deg); }
  90% { transform: rotate(12deg); }
  92% { transform: rotate(-8deg); }
  94% { transform: rotate(8deg); }
}

@media (prefers-reduced-motion: reduce) {
  .bf-pdp-clock__icon { animation: none; }
}

@media (max-width: 400px) {
  .bf-pdp-clock {
    gap: 8px;
    padding: 8px 10px;
  }

  .bf-pdp-clock__icon {
    block-size: 24px;
    inline-size: 24px;
  }

  .bf-pdp-clock__label {
    font-size: 13px;
  }

  .bf-pdp-clock__time {
    font-size: 22px;
  }
}
</style>
