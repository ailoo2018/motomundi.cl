<script setup lang="ts">



const route = useRoute()

const password = ref('')
const confirmPassword = ref('')
const showPassword = ref(false)
const showConfirmPassword = ref(false)
const loading = ref(false)
const success = ref(false)
const formRef = ref()
const error = ref()

const passwordRules = [
  (v: string) => !!v || 'La contraseña es obligatoria',
  (v: string) => (v && v.length >= 6) || 'Mínimo 6 caracteres'
]

const confirmPasswordRules = [
  (v: string) => !!v || 'Confirma tu contraseña',
  (v: string) => v === password.value || 'Las contraseñas no coinciden'
]

const passwordStrength = computed(() => {
  const val = password.value
  if (!val) return 0
  let score = 0
  if (val.length >= 6) return 5

  return score
})


const resetPassword = async () => {
  const { valid } = await formRef.value.validate()
  if (!valid) return

  loading.value = true
  try {
    const hash = route.query.hash
    const email = route.query.email

    await $fetch('/api/login/reset-password', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: { hash, email, password: password.value }
    })

    success.value = true
  } catch (e) {
    error.value = e.data?.message || e.message
    // handle error
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="reset-page">


    <!-- Right form panel -->
    <div class="form-panel">
      <div class="form-wrapper">

        <!-- Success state -->
        <Transition name="fade">
          <div v-if="success" class="success-state">
            <div class="success-icon">
              <VIcon class="tabler-shield-check" size="40" />
            </div>
            <h2 class="success-title">¡Contraseña actualizada!</h2>
            <p class="success-text">Tu contraseña ha sido cambiada exitosamente. Ya puedes iniciar sesión.</p>
            <NuxtLink to="/login" class="btn-primary mt-6 d-inline-flex rounded-0">
              Ir al inicio de sesión
            </NuxtLink>
          </div>
        </Transition>

        <!-- Form state -->
        <Transition name="fade">
          <div v-if="!success">
            <div class="form-header">
              <div class="lock-icon">
                <VIcon class="tabler-lock-open" size="28" />
              </div>
              <h1 class="form-title">Nueva contraseña</h1>
              <p class="form-subtitle">
                Elige una contraseña segura para proteger tu cuenta de Motomundi.
              </p>
            </div>

            <VForm ref="formRef" @submit.prevent="resetPassword">

              <!-- Password field -->
              <div class="field-group">
                <label class="field-label">Nueva contraseña</label>
                <VTextField
                  v-model="password"
                  :type="showPassword ? 'text' : 'password'"
                  :rules="passwordRules"
                  :append-inner-icon="showPassword ? 'tabler-eye-off' : 'tabler-eye'"
                  placeholder="Mínimo 6 caracteres"
                  variant="outlined"
                  density="comfortable"
                  class="custom-field"
                  hide-details="auto"
                  @click:append-inner="showPassword = !showPassword"
                />
                <!-- Strength bar -->

              </div>

              <!-- Confirm password field -->
              <div class="field-group">
                <label class="field-label">Repite la contraseña</label>
                <VTextField
                  v-model="confirmPassword"
                  :type="showConfirmPassword ? 'text' : 'password'"
                  :rules="confirmPasswordRules"
                  :append-inner-icon="showConfirmPassword ? 'tabler-eye-off' : 'tabler-eye'"
                  placeholder="Repite tu nueva contraseña"
                  variant="outlined"
                  density="comfortable"
                  class="custom-field"
                  hide-details="auto"
                  @click:append-inner="showConfirmPassword = !showConfirmPassword"
                />
              </div>

              <VAlert v-if="error" color="warning" class="mb-4">
                <VIcon class="tabler-alert-circle"></VIcon> ERROR: {{error}}
              </VAlert>

              <!-- Submit -->
              <VBtn rounded="0" type="submit" class="btn-primary" :disabled="loading">
                <span v-if="!loading">
                  <VIcon name="tabler-lock" size="18" class="mr-2" />
                  Guardar nueva contraseña
                </span>
                <span v-else class="btn-loading">
                  <VIcon name="tabler:loader-2" size="18" class="spin mr-2" />
                  Guardando...
                </span>
              </VBtn>

            </VForm>

            <div class="back-link">
              <NuxtLink to="/login">
                <Icon name="tabler:arrow-left" size="15" />
                Volver al inicio de sesión
              </NuxtLink>
            </div>
          </div>
        </Transition>

      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
$red: #d6001c;
$red-dark: #b0001a;
$text: #111111;
$muted: #6b7280;
$border: #e5e7eb;

.reset-page {
  display: flex;
  /*min-height: 100vh;*/
  background: #fff;
  font-family: 'DM Sans', sans-serif;
}

/* ── Brand Panel ─────────────────────────────── */
.brand-panel {
  position: relative;
  width: 42%;
  background: $text;
  overflow: hidden;
  display: flex;
  align-items: flex-end;

  @media (max-width: 768px) {
    display: none;
  }

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background:
      repeating-linear-gradient(
          -45deg,
          transparent,
          transparent 40px,
          rgba(255,255,255,0.02) 40px,
          rgba(255,255,255,0.02) 41px
      );
  }

  &::after {
    content: '';
    position: absolute;
    bottom: -120px;
    right: -120px;
    width: 400px;
    height: 400px;
    border-radius: 50%;
    background: $red;
    opacity: 0.15;
  }
}

.brand-content {
  position: relative;
  z-index: 2;
  padding: 56px;
}

.brand-logo {
  font-size: 2.6rem;
  font-weight: 900;
  letter-spacing: -0.03em;
  line-height: 1;
  margin-bottom: 12px;

  .logo-moto {
    color: #fff;
  }

  .logo-mundi {
    color: $red;
  }
}

.brand-tagline {
  color: rgba(255,255,255,0.45);
  font-size: 1rem;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  font-weight: 500;
}

/* ── Form Panel ──────────────────────────────── */
.form-panel {
  flex: 1;
  display: flex;
/*  align-items: center;*/
  justify-content: center;
  padding: 48px 32px;
  background: #fff;
}

.form-wrapper {
  width: 100%;
  max-width: 420px;
}

/* ── Form Header ─────────────────────────────── */
.lock-icon {
  width: 56px;
  height: 56px;
  border-radius: 14px;
  background: rgba($red, 0.08);
  color: $red;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 24px;
}

.form-title {
  font-size: 1.75rem;
  font-weight: 800;
  color: $text;
  letter-spacing: -0.03em;
  margin-bottom: 10px;
  line-height: 1.15;
}

.form-subtitle {
  color: $muted;
  font-size: 0.925rem;
  line-height: 1.6;
  margin-bottom: 36px;
}

/* ── Field ───────────────────────────────────── */
.field-group {
  margin-bottom: 20px;
}

.field-label {
  display: block;
  font-size: 0.82rem;
  font-weight: 600;
  color: $text;
  margin-bottom: 7px;
  letter-spacing: 0.01em;
  text-transform: uppercase;
}

.custom-field {
  :deep(.v-field) {
    border-radius: 10px;
    font-size: 0.95rem;

    &:hover .v-field__outline {
      --v-field-border-opacity: 1;
    }
  }

  :deep(.v-field--focused .v-field__outline) {
    --v-field-border-width: 2px;
    color: $red !important;
  }
}

/* ── Strength Bar ────────────────────────────── */
.strength-bar-wrapper {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-top: 8px;
}

.strength-bar {
  flex: 1;
  height: 4px;
  background: $border;
  border-radius: 99px;
  overflow: hidden;
}

.strength-fill {
  height: 100%;
  border-radius: 99px;
  transition: width 0.35s ease, background 0.35s ease;
}

.strength-text {
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  min-width: 48px;
  text-align: right;
}

/* ── Hints ───────────────────────────────────── */
.hints {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 28px;
}

.hint {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  font-size: 0.78rem;
  color: #9ca3af;
  transition: color 0.25s;

  &.active {
    color: #22c55e;
  }
}

/* ── Button ──────────────────────────────────── */
.btn-primary {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 14px 24px;
  background: $red;
  color: #fff;
  border: none;
  border-radius: 10px;
  font-size: 0.9rem;
  font-weight: 700;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  cursor: pointer;
  transition: background 0.2s, transform 0.15s;
  text-decoration: none;

  &:hover:not(:disabled) {
    background: $red-dark;
    transform: translateY(-1px);
  }

  &:active:not(:disabled) {
    transform: translateY(0);
  }

  &:disabled {
    opacity: 0.65;
    cursor: not-allowed;
  }
}

.btn-loading {
  display: flex;
  align-items: center;
}

.spin {
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

/* ── Back link ───────────────────────────────── */
.back-link {
  margin-top: 24px;
  text-align: center;

  a {
    display: inline-flex;
    align-items: center;
    gap: 5px;
    font-size: 0.85rem;
    color: $muted;
    text-decoration: none;
    transition: color 0.2s;

    &:hover {
      color: $red;
    }
  }
}

/* ── Success ─────────────────────────────────── */
.success-state {
  text-align: center;
  padding: 16px 0;
}

.success-icon {
  width: 72px;
  height: 72px;
  background: rgba(34, 197, 94, 0.1);
  color: #22c55e;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 24px;
}

.success-title {
  font-size: 1.5rem;
  font-weight: 800;
  color: $text;
  letter-spacing: -0.02em;
  margin-bottom: 12px;
}

.success-text {
  color: $muted;
  font-size: 0.925rem;
  line-height: 1.6;
}

/* ── Transitions ─────────────────────────────── */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.35s ease, transform 0.35s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(12px);
}
</style>
