<script setup>
import { useCountryDetection, COUNTRY_DATA, DEFAULT_COUNTRY } from '~/composables/useCountryDetection'

const {
  showPopup,
  detectedCountryData,
  acceptDetectedCountry,
  keepDefaultCountry,
  dismissPopup,
} = useCountryDetection()

const defaultCountryData = COUNTRY_DATA[DEFAULT_COUNTRY]
</script>

<template>

  <Teleport to="body">
    <Transition name="popup">
      <div
        v-if="showPopup"
        class="cp-overlay"
        role="dialog"
        aria-modal="true"
        :aria-label="`Cambiar país a ${detectedCountryData.name}`"
        @click.self="dismissPopup"
      >
        <div class="cp-card">

          <!-- Close button -->
          <button class="cp-close" aria-label="Cerrar" @click="dismissPopup">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M1 1l12 12M13 1L1 13" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
            </svg>
          </button>

          <!-- Globe pulse icon -->
          <div class="cp-icon-wrap">
            <div class="cp-pulse" />
            <div class="cp-icon">
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="10" stroke="#c74044" stroke-width="1.6"/>
                <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"
                      stroke="#c74044" stroke-width="1.6" stroke-linecap="round"/>
              </svg>
            </div>
          </div>

          <!-- Headline -->
          <p class="cp-eyebrow">Detección de ubicación</p>
          <h2 class="cp-title">
            ¿Vienes de {{ detectedCountryData.flag }} {{ detectedCountryData.name }}?
          </h2>

          <!-- Body -->
          <p class="cp-body">
            Hemos detectado que estás accediendo desde
            <strong>{{ detectedCountryData.name }}</strong>,
            pero actualmente te mostramos precios en
            <strong>{{ defaultCountryData.name }} ({{ defaultCountryData.symbol }})</strong>.
            ¿Deseas cambiar?
          </p>

          <!-- Divider -->
          <div class="cp-divider" />

          <!-- Actions -->
          <div class="cp-actions">
            <button class="cp-btn cp-btn--primary" @click="acceptDetectedCountry">
              <span class="cp-btn-flag"><img :src="`/content/images/flags/${detectedCountryData.iso?.toLowerCase()}.png`" /></span>
              Cambiar a {{ detectedCountryData.name }}
              <span class="cp-btn-currency">({{ detectedCountryData.symbol }})</span>
            </button>

            <button class="cp-btn cp-btn--ghost" @click="keepDefaultCountry">
              <span class="cp-btn-flag"><img :src="`/content/images/flags/${defaultCountryData.iso?.toLowerCase()}.png`" /></span>
              Continuar en {{ defaultCountryData.name }}
              <span class="cp-btn-currency">({{ defaultCountryData.symbol }})</span>
            </button>
          </div>

          <!-- Fine print -->
          <p class="cp-footnote">
            Puedes cambiar el país en cualquier momento desde la barra superior.
          </p>

        </div>
      </div>
    </Transition>
  </Teleport>
</template>


<style scoped>
/* ── Overlay ─────────────────────────────────────────── */
.cp-overlay {
  position: fixed;
  inset: 0;
  z-index: 9999;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  padding: 0 1rem 1.5rem;
  background: rgba(15, 10, 10, 0.45);
  backdrop-filter: blur(3px);
}

@media (min-width: 560px) {
  .cp-overlay {
    align-items: center;
    padding: 1.5rem;
  }
}

/* ── Card ─────────────────────────────────────────────── */
.cp-card {
  position: relative;
  background: #ffffff;
  /*border-radius: 20px;*/
  padding: 2rem 2rem 1.5rem;
  width: 100%;
  max-width: 420px;
  box-shadow:
    0 0 0 1px rgba(199, 64, 68, 0.08),
    0 8px 32px rgba(0, 0, 0, 0.14),
    0 2px 8px rgba(0, 0, 0, 0.08);
}

/* ── Close ────────────────────────────────────────────── */
.cp-close {
  position: absolute;
  top: 1rem;
  right: 1rem;
  width: 28px;
  height: 28px;
  border-radius: 50%;
  border: none;
  background: #f5f5f5;
  color: #999;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background 0.18s, color 0.18s;
}
.cp-close:hover {
  background: #fde8e9;
  color: #c74044;
}

/* ── Globe icon ───────────────────────────────────────── */
.cp-icon-wrap {
  position: relative;
  width: 52px;
  height: 52px;
  margin: 0 auto 1.1rem;
}
.cp-pulse {
  position: absolute;
  inset: 0;
  border-radius: 50%;
  background: rgba(199, 64, 68, 0.12);
  animation: pulse 2.4s ease-in-out infinite;
}
.cp-icon {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(199, 64, 68, 0.08);
  border-radius: 50%;
  border: 1.5px solid rgba(199, 64, 68, 0.2);
}
@keyframes pulse {
  0%, 100% { transform: scale(1);    opacity: 0.6; }
  50%       { transform: scale(1.35); opacity: 0;   }
}

/* ── Typography ───────────────────────────────────────── */
.cp-eyebrow {
  text-align: center;
  font-size: 0.7rem;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: #c74044;
  margin: 0 0 0.35rem;
}
.cp-title {
  font-size: 1.35rem;
  font-weight: 400;
  color: #1a1a1a;
  text-align: center;
  margin: 0 0 0.85rem;
  line-height: 1.3;
}
.cp-body {
  font-size: 0.88rem;
  line-height: 1.65;
  color: #555;
  text-align: center;
  margin: 0 0 1.1rem;
}
.cp-body strong {
  color: #222;
  font-weight: 600;
}

/* ── Divider ──────────────────────────────────────────── */
.cp-divider {
  height: 1px;
  background: linear-gradient(90deg, transparent, #e8e8e8 30%, #e8e8e8 70%, transparent);
  margin-bottom: 1.1rem;
}

/* ── Buttons ──────────────────────────────────────────── */
.cp-actions {
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
}
.cp-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.4rem;
  width: 100%;
  padding: 0.78rem 1rem;
  border-radius: 11px;
  border: none;
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  transition: transform 0.14s, box-shadow 0.14s, background 0.18s;
}
.cp-btn:active {
  transform: scale(0.97);
}
.cp-btn-flag {
  font-size: 1.05rem;
  line-height: 1;
}
.cp-btn-currency {
  font-weight: 400;
  opacity: 0.75;
  font-size: 0.82rem;
}

.cp-btn--primary {
  background: #c74044;
  color: #fff;
  box-shadow: 0 4px 16px rgba(199, 64, 68, 0.32);
}
.cp-btn--primary:hover {
  background: #b33438;
  box-shadow: 0 6px 20px rgba(199, 64, 68, 0.42);
  transform: translateY(-1px);
}

.cp-btn--ghost {
  background: #f8f8f8;
  color: #444;
  border: 1.5px solid #e8e8e8;
}
.cp-btn--ghost:hover {
  background: #f0f0f0;
  border-color: #d8d8d8;
}

/* ── Footnote ─────────────────────────────────────────── */
.cp-footnote {
  font-size: 0.72rem;
  color: #aaa;
  text-align: center;
  margin: 0.9rem 0 0;
}

/* ── Transition ───────────────────────────────────────── */
.popup-enter-active {
  transition: opacity 0.28s ease, transform 0.32s cubic-bezier(0.34, 1.56, 0.64, 1);
}
.popup-leave-active {
  transition: opacity 0.22s ease, transform 0.22s ease;
}
.popup-enter-from {
  opacity: 0;
  transform: translateY(28px) scale(0.96);
}
.popup-leave-to {
  opacity: 0;
  transform: translateY(16px) scale(0.97);
}
</style>
