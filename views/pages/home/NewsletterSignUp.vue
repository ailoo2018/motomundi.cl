<script setup lang="ts">
// NewsletterSignup.vue — motomundi.cl
// Nuxt 4.3.1 compatible component

const email = ref('')
const firstName = ref('')
const status = ref<'idle' | 'loading' | 'success' | 'error'>('idle')
const errorMessage = ref('')

const isValidEmail = (val: string) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val)

async function handleSubmit() {
  if (!firstName.value.trim()) {
    errorMessage.value = 'Ingresa tu nombre para continuar.'
    return
  }
  if (!isValidEmail(email.value)) {
    errorMessage.value = 'Ingresa un correo electrónico válido.'
    return
  }

  errorMessage.value = ''
  status.value = 'loading'

  // Replace this with your actual API call / newsletter provider
  await new Promise((r) => setTimeout(r, 1600))

  // Simulate success (swap for real endpoint)
  status.value = 'success'
}

function reset() {
  email.value = ''
  firstName.value = ''
  status.value = 'idle'
  errorMessage.value = ''
}
</script>

<template>
  <section class="mm-newsletter">
    <!-- Speed-line background decoration -->
    <div class="mm-bg" aria-hidden="true">
      <div class="mm-stripe" v-for="i in 6" :key="i" />
    </div>

    <div class="mm-inner">
      <!-- Eyebrow -->
      <p class="mm-eyebrow">
        <span class="mm-dot" />MOTOMUNDI · NEWSLETTER
      </p>

      <!-- Heading block -->
      <Transition name="fade-up" appear>
        <div v-if="status !== 'success'" class="mm-heading-block">
          <h2 class="mm-headline">
            El mundo moto<br />
            <em>en tu casilla.</em>
          </h2>
          <p class="mm-sub">
            Pruebas exclusivas, lanzamientos antes que nadie y las rutas que vale la pena recorrer — directo a tu correo, sin ruido.
          </p>
        </div>
      </Transition>

      <!-- Success state -->
      <Transition name="fade-up">
        <div v-if="status === 'success'" class="mm-success">
          <div class="mm-success-icon" aria-hidden="true">✓</div>
          <h3 class="mm-success-title">¡Bienvenido a la manada!</h3>
          <p class="mm-success-body">
            {{ firstName }}, ya eres parte de la comunidad Motomundi.<br />
            Revisa tu bandeja — algo bueno viene en camino.
          </p>
          <button class="mm-ghost-btn" @click="reset">Suscribir otro correo</button>
        </div>
      </Transition>

      <!-- Form -->
      <Transition name="fade-up">
        <div v-if="status !== 'success'" class="mm-form-wrap">
          <div class="mm-field-row">
            <div class="mm-field">
              <label for="mm-name" class="mm-label">Tu nombre</label>
              <input
                id="mm-name"
                v-model="firstName"
                type="text"
                autocomplete="given-name"
                placeholder="ej. Rodrigo"
                class="mm-input"
                :disabled="status === 'loading'"
                @keyup.enter="handleSubmit"
              />
            </div>

            <div class="mm-field mm-field--email">
              <label for="mm-email" class="mm-label">Correo electrónico</label>
              <input
                id="mm-email"
                v-model="email"
                type="email"
                autocomplete="email"
                placeholder="tu@correo.cl"
                class="mm-input"
                :disabled="status === 'loading'"
                @keyup.enter="handleSubmit"
              />
            </div>
          </div>

          <Transition name="shake">
            <p v-if="errorMessage" class="mm-error" role="alert">
              ⚠ {{ errorMessage }}
            </p>
          </Transition>

          <button
            class="mm-cta"
            :class="{ 'mm-cta--loading': status === 'loading' }"
            :disabled="status === 'loading'"
            @click="handleSubmit"
          >
            <span v-if="status !== 'loading'" class="mm-cta-text">
              QUIERO ESTAR AL DÍA
              <svg class="mm-arrow" viewBox="0 0 24 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M0 6H22M17 1L23 6L17 11" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </span>
            <span v-else class="mm-spinner" aria-label="Enviando…" />
          </button>

          <p class="mm-disclaimer">
            Sin spam. Sin ventas. Puedes darte de baja cuando quieras.<br />
            Al suscribirte aceptas nuestra
            <a href="/privacidad" class="mm-link">política de privacidad</a>.
          </p>
        </div>
      </Transition>
    </div>
  </section>
</template>

<style scoped>
/* ─── Tokens ─────────────────────────────────────────────────── */
.mm-newsletter {
  --red: #d6001c;
  --red-dark: #a80016;
  --black: #0a0a0a;
  --off-black: #111111;
  --panel: #161616;
  --border: rgba(255, 255, 255, 0.08);
  --text: #f0ece6;
  --muted: #888;
  --font-display: 'Bebas Neue', 'Arial Black', sans-serif;
  --font-body: 'DM Sans', 'Helvetica Neue', sans-serif;

  position: relative;
  background-color: var(--off-black);
  color: var(--text);
  padding: 5rem 1.5rem 4rem;
  overflow: hidden;
  font-family: var(--font-body);
  isolation: isolate;
}

/* ─── Background speed-lines ─────────────────────────────────── */
.mm-bg {
  position: absolute;
  inset: 0;
  display: flex;
  gap: 0;
  pointer-events: none;
  z-index: 0;
}

.mm-stripe {
  flex: 1;
  border-left: 1px solid var(--border);
  opacity: 0.5;
}

.mm-stripe:nth-child(1) { opacity: 0.15; }
.mm-stripe:nth-child(6) { opacity: 0.15; }

/* Red accent glow at top */
.mm-newsletter::before {
  content: '';
  position: absolute;
  top: -120px;
  left: 50%;
  transform: translateX(-50%);
  width: 600px;
  height: 260px;
  background: radial-gradient(ellipse, rgba(214, 0, 28, 0.22) 0%, transparent 70%);
  pointer-events: none;
  z-index: 0;
}

/* Diagonal red slash at bottom-right */
.mm-newsletter::after {
  content: '';
  position: absolute;
  bottom: -40px;
  right: -40px;
  width: 280px;
  height: 280px;
  background: var(--red);
  clip-path: polygon(60% 0%, 100% 0%, 100% 100%, 100% 100%);
  opacity: 0.12;
  pointer-events: none;
  z-index: 0;
}

/* ─── Inner container ────────────────────────────────────────── */
.mm-inner {
  position: relative;
  z-index: 1;
  max-width: 760px;
  margin: 0 auto;
}

/* ─── Eyebrow ─────────────────────────────────────────────────── */
.mm-eyebrow {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.72rem;
  font-weight: 600;
  letter-spacing: 0.2em;
  color: var(--red);
  text-transform: uppercase;
  margin: 0 0 1.5rem;
}

.mm-dot {
  display: inline-block;
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: var(--red);
  animation: pulse 1.8s ease-in-out infinite;
}

@keyframes pulse {
  0%, 100% { opacity: 1; transform: scale(1); }
  50% { opacity: 0.4; transform: scale(0.7); }
}

/* ─── Headline ───────────────────────────────────────────────── */
.mm-heading-block { margin-bottom: 2.5rem; }

.mm-headline {
  font-family: var(--font-display);
  font-size: clamp(3.2rem, 9vw, 6rem);
  font-weight: 400;
  line-height: 0.92;
  letter-spacing: -0.01em;
  margin: 0 0 1.25rem;
  text-transform: uppercase;
  color: var(--text);
}

.mm-headline em {
  font-style: normal;
  color: var(--red);
  -webkit-text-fill-color: var(--red);
}

.mm-sub {
  font-size: 1.05rem;
  line-height: 1.65;
  color: #b0a9a0;
  max-width: 520px;
  margin: 0;
}

/* ─── Form ───────────────────────────────────────────────────── */
.mm-form-wrap { display: flex; flex-direction: column; gap: 1rem; }

.mm-field-row {
  display: grid;
  grid-template-columns: 1fr 1.6fr;
  gap: 0.75rem;
}

@media (max-width: 560px) {
  .mm-field-row { grid-template-columns: 1fr; }
}

.mm-field { display: flex; flex-direction: column; gap: 0.4rem; }

.mm-label {
  font-size: 0.72rem;
  font-weight: 600;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--muted);
}

.mm-input {
  background: var(--panel);
  border: 1px solid var(--border);
  border-radius: 4px;
  color: var(--text);
  font-family: var(--font-body);
  font-size: 1rem;
  padding: 0.85rem 1rem;
  outline: none;
  transition: border-color 0.2s, box-shadow 0.2s;
  width: 100%;
  box-sizing: border-box;
}

.mm-input::placeholder { color: #444; }

.mm-input:focus {
  border-color: var(--red);
  box-shadow: 0 0 0 3px rgba(214, 0, 28, 0.15);
}

.mm-input:disabled { opacity: 0.5; cursor: not-allowed; }

/* ─── Error ──────────────────────────────────────────────────── */
.mm-error {
  font-size: 0.85rem;
  color: #ff6070;
  margin: 0;
  padding: 0.6rem 0.9rem;
  background: rgba(214, 0, 28, 0.1);
  border-left: 3px solid var(--red);
  border-radius: 2px;
}

/* ─── CTA Button ─────────────────────────────────────────────── */
.mm-cta {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: var(--red);
  color: #fff;
  font-family: var(--font-display);
  font-size: 1.05rem;
  letter-spacing: 0.1em;
  padding: 1.05rem 2rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: background 0.2s, transform 0.15s;
  align-self: flex-start;
  min-width: 260px;
  min-height: 54px;
}

.mm-cta::before {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.12) 50%, transparent 100%);
  transform: translateX(-100%);
  transition: transform 0.5s ease;
}

.mm-cta:hover::before { transform: translateX(100%); }
.mm-cta:hover { background: var(--red-dark); transform: translateY(-2px); }
.mm-cta:active { transform: translateY(0); }
.mm-cta:disabled { opacity: 0.7; cursor: not-allowed; transform: none; }

.mm-cta-text {
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
}

.mm-arrow {
  width: 22px;
  height: auto;
  transition: transform 0.2s;
}

.mm-cta:hover .mm-arrow { transform: translateX(4px); }

/* ─── Loading spinner ─────────────────────────────────────────── */
.mm-spinner {
  display: block;
  width: 22px;
  height: 22px;
  border: 2px solid rgba(255,255,255,0.3);
  border-top-color: #fff;
  border-radius: 50%;
  animation: spin 0.7s linear infinite;
}

@keyframes spin { to { transform: rotate(360deg); } }

/* ─── Disclaimer ─────────────────────────────────────────────── */
.mm-disclaimer {
  font-size: 0.75rem;
  color: #555;
  line-height: 1.6;
  margin: 0;
}

.mm-link {
  color: var(--muted);
  text-decoration: underline;
  text-underline-offset: 2px;
  transition: color 0.2s;
}

.mm-link:hover { color: var(--text); }

/* ─── Success state ──────────────────────────────────────────── */
.mm-success {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 1rem;
  padding: 2.5rem 0;
}

.mm-success-icon {
  width: 52px;
  height: 52px;
  border-radius: 50%;
  background: var(--red);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  font-weight: 700;
  color: #fff;
  box-shadow: 0 0 30px rgba(214, 0, 28, 0.4);
}

.mm-success-title {
  font-family: var(--font-display);
  font-size: 2.5rem;
  font-weight: 400;
  text-transform: uppercase;
  margin: 0;
  letter-spacing: 0.02em;
}

.mm-success-body {
  font-size: 1rem;
  color: #b0a9a0;
  line-height: 1.7;
  margin: 0;
}

.mm-ghost-btn {
  margin-top: 0.5rem;
  background: transparent;
  border: 1px solid var(--border);
  color: var(--muted);
  font-family: var(--font-body);
  font-size: 0.85rem;
  padding: 0.6rem 1.2rem;
  border-radius: 4px;
  cursor: pointer;
  transition: border-color 0.2s, color 0.2s;
}

.mm-ghost-btn:hover { border-color: var(--muted); color: var(--text); }

/* ─── Transitions ────────────────────────────────────────────── */
.fade-up-enter-active {
  transition: opacity 0.5s ease, transform 0.5s ease;
}
.fade-up-enter-from {
  opacity: 0;
  transform: translateY(18px);
}

.shake-enter-active {
  animation: shake 0.35s ease;
}

@keyframes shake {
  0%, 100% { transform: translateX(0); }
  25% { transform: translateX(-6px); }
  75% { transform: translateX(6px); }
}
</style>
