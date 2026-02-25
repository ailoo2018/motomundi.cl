<script setup lang="ts">

import {
  IconUser,
  IconPhone,
  IconCake,
  IconGenderBigender,
  IconMotorbike,
  IconCompass,
  IconBike,
  IconMountain,
  IconTrekking,
  IconVinyl,
  IconLock,
  IconLockPlus,
  IconLockCheck,
  IconDeviceFloppy,
  IconX,
  IconEye,
  IconEyeOff,
  IconAlertTriangle,
  IconCheck,
  IconChevronDown,
  IconChevronUp,
  IconShieldLock,
  IconInfoCircle,
  IconBrandTabler,
  IconStar,
} from '@tabler/icons-vue'

definePageMeta({
  alias: '/cuenta/perfil',
  layout: 'account',
  middleware: 'auth' // Must match the filename (auth.ts)
})


import { useProfileForm } from '~/composables/useProfileForm'

const {
  profileForm,
  passwordForm,
  isFormValid,
  isDirty,
  saving,
  form,
  passwordExpanded,
  passwordSaving,
  passwords,
  showCurrentPw,
  showNewPw,
  showConfirmPw,
  passwordStrength,
  showSuccessSnackbar,
  showErrorSnackbar,
  showCancelDialog,
  showDraftBanner,
  showSuccessPasswordSnackbar,
  ridingStyles,
  validateFirstName,
  validateLastName,
  validatePhone,
  validateDateOfBirth,
  validateRidingStyles,
  validateNewPassword,
  validateConfirmPassword,
  validateCurrentPassword,
  onPhoneInput,
  toggleRidingStyle,
  isStyleSelected,
  handleSave,
  handleCancel,
  discardChanges,
  handlePasswordChange,
} = useProfileForm()

const ridingStyleIcons: Record<string, any> = {
  sport: IconMotorbike,
  cafe_racer: IconVinyl,
  touring: IconCompass,
  urban: IconBike,
  motocross: IconMountain,
  adventure: IconTrekking,
}

const genderOptions = [
  { title: 'Masculino', value: 'male' },
  { title: 'Femenino', value: 'female' },
  { title: 'Otro', value: 'other' },
  { title: 'Prefiero no indicar', value: 'undisclosed' },
]

const ridingStylesError = computed(() =>
  form.ridingStyles.length === 0 ? 'Selecciona al menos un estilo' : ''
)
</script>

<template>
  <v-container class="profile-container py-8" max-width="860">

    <!-- ── Breadcrumb ─────────────────────────────────────────────────────── -->
    <div class="breadcrumb mb-6">
      <span class="breadcrumb__link">Inicio</span>
      <span class="breadcrumb__sep">›</span>
      <span class="breadcrumb__link">Mi Cuenta</span>
      <span class="breadcrumb__sep">›</span>
      <span class="breadcrumb__current">Mi Perfil</span>
    </div>

    <!-- ── Page Header ────────────────────────────────────────────────────── -->
    <div class="page-header mb-8">
      <div class="page-header__accent" />
      <div>
        <h1 class="page-header__title">MI PERFIL</h1>
        <p class="page-header__subtitle">
          Gestiona tu información personal y preferencias de conducción
        </p>
      </div>
      <div class="page-header__logo-mark">
        <IconMotorbike :size="48" class="logo-mark-icon" />
      </div>
    </div>

    <!-- ── Draft Banner ───────────────────────────────────────────────────── -->
    <v-alert
      v-if="false && showDraftBanner"
      type="info"
      variant="tonal"
      closable
      class="mb-6 draft-banner"
      @click:close="showDraftBanner = false"
    >
      <template #prepend>
        <IconInfoCircle :size="20" />
      </template>
      <strong>Borrador recuperado.</strong> Tienes cambios sin guardar de tu última sesión.
    </v-alert>

    <!-- ── Main Form ──────────────────────────────────────────────────────── -->
    <v-form
      ref="profileForm"
      v-model="isFormValid"
      validate-on="blur"
      @submit.prevent="handleSave"
    >

      <!-- ════════════════════════════════════════════════════════════════════
           SECTION 1 — Personal Information
      ════════════════════════════════════════════════════════════════════ -->
      <div class="section-card mb-6">
        <div class="section-card__header">
          <div class="section-card__icon-wrap">
            <IconUser :size="22" />
          </div>
          <div>
            <h2 class="section-card__title">INFORMACIÓN PERSONAL</h2>
            <p class="section-card__subtitle">Tu identidad en Motomundi</p>
          </div>
        </div>

        <div class="section-card__body">
          <v-row>
            <!-- First name -->
            <v-col cols="12" sm="6">
              <v-text-field
                v-model="form.firstName"
                label="Nombre *"
                :rules="[validateFirstName]"
                variant="outlined"
                color="primary"
                bg-color="surface"
                density="comfortable"
                autocomplete="given-name"
                aria-label="Nombre"
              >
                <template #prepend-inner>
                  <IconUser :size="18" class="field-icon" />
                </template>
              </v-text-field>
            </v-col>

            <!-- Last name -->
            <v-col cols="12" sm="6">
              <v-text-field
                v-model="form.lastName"
                label="Apellido *"
                :rules="[validateLastName]"
                variant="outlined"
                color="primary"
                bg-color="surface"
                density="comfortable"
                autocomplete="family-name"
                aria-label="Apellido"
              >
                <template #prepend-inner>
                  <IconUser :size="18" class="field-icon" />
                </template>
              </v-text-field>
            </v-col>

            <!-- Phone -->
            <v-col cols="12" sm="7">
              <v-text-field
                :model-value="form.phone"
                label="Teléfono *"
                :rules="[validatePhone]"
                variant="outlined"
                color="primary"
                bg-color="surface"
                density="comfortable"
                placeholder="9 XXXX XXXX"
                autocomplete="tel"
                aria-label="Teléfono"
                hint="Formato chileno: +56 9 XXXX XXXX"
                persistent-hint
                @input="onPhoneInput"
              >
                <template #prepend-inner>
                  <span class="phone-prefix">+56</span>
                  <IconPhone :size="18" class="field-icon ml-1" />
                </template>
              </v-text-field>
            </v-col>

            <!-- Date of birth -->
            <v-col cols="12" sm="5">
              <v-text-field
                v-model="form.dateOfBirth"
                label="Fecha de nacimiento"
                :rules="[validateDateOfBirth]"
                variant="outlined"
                color="primary"
                bg-color="surface"
                density="comfortable"
                type="date"
                :max="new Date().toISOString().split('T')[0]"
                autocomplete="bday"
                aria-label="Fecha de nacimiento"
                hint="Opcional · Debes tener al menos 16 años"
                persistent-hint
              >
                <template #prepend-inner>
                  <IconCake :size="18" class="field-icon" />
                </template>
              </v-text-field>
            </v-col>

            <!-- Gender -->
            <v-col cols="12">
              <p class="field-label mb-2">
                <IconGenderBigender :size="16" class="mr-1 field-icon" />
                Género <span class="optional-tag">Opcional · Mejora recomendaciones de talla</span>
              </p>
              <div class="gender-chips">
                <button
                  v-for="opt in genderOptions"
                  :key="opt.value"
                  type="button"
                  :class="['gender-chip', { 'gender-chip--active': form.gender === opt.value }]"
                  :aria-pressed="form.gender === opt.value"
                  @click="form.gender = form.gender === opt.value ? '' : opt.value"
                >
                  {{ opt.title }}
                </button>
              </div>
            </v-col>
          </v-row>
        </div>
      </div>

      <!-- ════════════════════════════════════════════════════════════════════
           SECTION 2 — Riding Style
      ════════════════════════════════════════════════════════════════════ -->
      <div class="section-card mb-6" :class="{ 'section-card--error': ridingStylesError }">
        <div class="section-card__header">
          <div class="section-card__icon-wrap">
            <IconMotorbike :size="22" />
          </div>
          <div>
            <h2 class="section-card__title">ESTILO DE CONDUCCIÓN</h2>
            <p class="section-card__subtitle">
              Selecciona todo lo que aplique · Mínimo 1 requerido
            </p>
          </div>
        </div>

        <div class="section-card__body">
          <div class="riding-grid">
            <v-tooltip
              v-for="style in ridingStyles"
              :key="style.id"
              :text="style.description"
              location="top"
              max-width="220"
            >
              <template #activator="{ props }">
                <button
                  v-bind="props"
                  type="button"
                  :class="['riding-chip', { 'riding-chip--active': isStyleSelected(style.id) }]"
                  :aria-pressed="isStyleSelected(style.id)"
                  :aria-label="`${style.label}: ${style.description}`"
                  @click="toggleRidingStyle(style.id)"
                >
                  <div class="riding-chip__icon">
                    <component :is="ridingStyleIcons[style.id]" :size="28" />
                  </div>
                  <span class="riding-chip__label">{{ style.label }}</span>
                  <div v-if="isStyleSelected(style.id)" class="riding-chip__check">
                    <IconCheck :size="14" />
                  </div>
                </button>
              </template>
            </v-tooltip>
          </div>

          <!-- Validation message -->
          <Transition name="fade">
            <p v-if="ridingStylesError" class="riding-error mt-3">
              <IconAlertTriangle :size="14" class="mr-1" />
              {{ ridingStylesError }}
            </p>
          </Transition>
        </div>
      </div>

      <!-- ════════════════════════════════════════════════════════════════════
           SECTION 3 — Password Change (Progressive Disclosure)
      ════════════════════════════════════════════════════════════════════ -->
      <div class="section-card mb-8">
        <!-- Collapsed header — always visible -->
        <button
          type="button"
          class="section-card__header section-card__header--toggle w-100"
          :aria-expanded="passwordExpanded"
          aria-controls="password-panel"
          @click="passwordExpanded = !passwordExpanded"
        >
          <div class="section-card__icon-wrap">
            <IconShieldLock :size="22" />
          </div>
          <div class="flex-grow-1 text-left">
            <h2 class="section-card__title">CAMBIAR CONTRASEÑA</h2>
            <p class="section-card__subtitle">
              {{ passwordExpanded ? 'Haz clic para cerrar' : 'Expande para actualizar tu contraseña' }}
            </p>
          </div>
          <div class="toggle-chevron">
            <component :is="passwordExpanded ? IconChevronUp : IconChevronDown" :size="20" />
          </div>
        </button>

        <!-- Expanded body -->
        <Transition name="slide-down">
          <div v-if="passwordExpanded" id="password-panel" class="section-card__body">
            <v-form ref="passwordForm" validate-on="blur">
              <v-row>
                <!-- Current password -->
                <v-col cols="12">
                  <v-text-field
                    v-model="passwords.current"
                    label="Contraseña actual *"
                    :type="showCurrentPw ? 'text' : 'password'"
                    :rules="[validateCurrentPassword]"
                    variant="outlined"
                    color="primary"
                    bg-color="surface"
                    density="comfortable"
                    autocomplete="current-password"
                  >
                    <template #prepend-inner>
                      <IconLock :size="18" class="field-icon" />
                    </template>
                    <template #append-inner>
                      <button type="button" class="pw-toggle" :aria-label="showCurrentPw ? 'Ocultar' : 'Mostrar'" @click="showCurrentPw = !showCurrentPw">
                        <component :is="showCurrentPw ? IconEyeOff : IconEye" :size="18" />
                      </button>
                    </template>
                  </v-text-field>
                </v-col>

                <!-- New password -->
                <v-col cols="12" sm="6">
                  <v-text-field
                    v-model="passwords.new"
                    label="Nueva contraseña *"
                    :type="showNewPw ? 'text' : 'password'"
                    :rules="[validateNewPassword]"
                    variant="outlined"
                    color="primary"
                    bg-color="surface"
                    density="comfortable"
                    autocomplete="new-password"
                    hint="Mínimo 8 caracteres, mayúscula, número y símbolo"
                    persistent-hint
                  >
                    <template #prepend-inner>
                      <IconLockPlus :size="18" class="field-icon" />
                    </template>
                    <template #append-inner>
                      <button type="button" class="pw-toggle" :aria-label="showNewPw ? 'Ocultar' : 'Mostrar'" @click="showNewPw = !showNewPw">
                        <component :is="showNewPw ? IconEyeOff : IconEye" :size="18" />
                      </button>
                    </template>
                  </v-text-field>

                  <!-- Password strength meter -->
                  <Transition name="fade">
                    <div v-if="passwords.new" class="strength-meter mt-2">
                      <div class="strength-meter__bars">
                        <div
                          v-for="i in 4"
                          :key="i"
                          :class="[
                            'strength-bar',
                            i <= passwordStrength.score ? `strength-bar--${passwordStrength.color}` : '',
                          ]"
                        />
                      </div>
                      <span :class="`strength-label text-${passwordStrength.color}`">
                        {{ passwordStrength.label }}
                      </span>
                    </div>
                  </Transition>
                </v-col>

                <!-- Confirm password -->
                <v-col cols="12" sm="6">
                  <v-text-field
                    v-model="passwords.confirm"
                    label="Confirmar contraseña *"
                    :type="showConfirmPw ? 'text' : 'password'"
                    :rules="[validateConfirmPassword]"
                    variant="outlined"
                    color="primary"
                    bg-color="surface"
                    density="comfortable"
                    autocomplete="new-password"
                  >
                    <template #prepend-inner>
                      <IconLockCheck :size="18" class="field-icon" />
                    </template>
                    <template #append-inner>
                      <button type="button" class="pw-toggle" :aria-label="showConfirmPw ? 'Ocultar' : 'Mostrar'" @click="showConfirmPw = !showConfirmPw">
                        <component :is="showConfirmPw ? IconEyeOff : IconEye" :size="18" />
                      </button>
                    </template>
                  </v-text-field>
                </v-col>

                <!-- Change password action -->
                <v-col cols="12" class="d-flex justify-end">
                  <v-btn
                    type="button"
                    variant="tonal"
                    color="primary"
                    :loading="passwordSaving"
                    size="large"
                    class="pw-submit-btn"
                    @click="handlePasswordChange"
                  >
                    <template #prepend>
                      <IconShieldLock :size="18" />
                    </template>
                    Actualizar Contraseña
                  </v-btn>
                </v-col>
              </v-row>
            </v-form>
          </div>
        </Transition>
      </div>

      <!-- ── Privacy note ────────────────────────────────────────────────── -->
      <p class="privacy-note mb-6">
        <IconInfoCircle :size="14" class="mr-1" />
        Tu información es protegida según nuestra
        <a href="/privacidad" class="privacy-link">Política de Privacidad</a>.
        No compartimos tus datos con terceros.
      </p>

      <!-- ════════════════════════════════════════════════════════════════════
           Form Actions
      ════════════════════════════════════════════════════════════════════ -->
      <div class="form-actions">
        <v-btn
          type="submit"
          color="primary"
          size="x-large"
          :loading="saving"
          :disabled="!isDirty || saving"
          class="save-btn"
          :title="isDirty ? 'Guardar cambios (Ctrl+S)' : 'No hay cambios'"
        >
          <template #prepend>
            <IconDeviceFloppy :size="20" />
          </template>
          Guardar Cambios
        </v-btn>

        <v-btn
          type="button"
          variant="outlined"
          size="x-large"
          :disabled="saving"
          class="cancel-btn"
          @click="handleCancel"
        >
          <template #prepend>
            <IconX :size="18" />
          </template>
          Descartar
        </v-btn>

        <p class="keyboard-hint">
          <kbd>Ctrl</kbd> + <kbd>S</kbd> para guardar
        </p>
      </div>
    </v-form>

    <!-- ══════════════════════════════════════════════════════════════════════
         Dialogs & Snackbars
    ══════════════════════════════════════════════════════════════════════ -->

    <!-- Cancel confirmation dialog -->
    <v-dialog v-model="showCancelDialog" max-width="420" persistent>
      <v-card class="confirm-dialog">
        <v-card-title class="confirm-dialog__title">
          <IconAlertTriangle :size="24" class="mr-2 text-warning" />
          ¿Descartar cambios?
        </v-card-title>
        <v-card-text class="confirm-dialog__body">
          Tienes cambios sin guardar. Si descartás ahora, perderás toda la información modificada.
        </v-card-text>
        <v-card-actions class="confirm-dialog__actions">
          <v-btn variant="text" @click="showCancelDialog = false">
            Seguir editando
          </v-btn>
          <v-btn color="error" variant="flat" @click="discardChanges">
            Descartar todo
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Success snackbar -->
    <v-snackbar
      v-model="showSuccessSnackbar"
      color="success"
      location="bottom right"
      :timeout="4000"
      rounded="lg"
    >
      <div class="d-flex align-center gap-2">
        <IconCheck :size="20" />
        <span><strong>¡Perfil guardado!</strong> Tu información ha sido actualizada.</span>
      </div>
    </v-snackbar>

    <!-- Password success snackbar -->
    <v-snackbar
      v-model="showSuccessPasswordSnackbar"
      color="success"
      location="bottom right"
      :timeout="4000"
      rounded="lg"
    >
      <div class="d-flex align-center gap-2">
        <IconShieldLock :size="20" />
        <span><strong>¡Contraseña actualizada!</strong> Ya puedes usar tu nueva clave.</span>
      </div>
    </v-snackbar>

    <!-- Error snackbar -->
    <v-snackbar
      v-model="showErrorSnackbar"
      color="error"
      location="bottom right"
      :timeout="5000"
      rounded="lg"
    >
      <div class="d-flex align-center gap-2">
        <IconAlertTriangle :size="20" />
        <span><strong>Error al guardar.</strong> Intenta nuevamente en unos segundos.</span>
      </div>
    </v-snackbar>

  </v-container>
</template>

<style scoped>
/* ─── Google Font import ────────────────────────────────────────────────── */
@import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@400;600;700;800&family=Barlow:wght@400;500;600&display=swap');

/* ─── Root tokens — Light Theme ─────────────────────────────────────────── */
.profile-container {
  --color-primary:        #DC2626;
  --color-primary-dark:   #b91c1c;
  --color-primary-muted:  rgba(220, 38, 38, 0.08);
  --color-primary-muted2: rgba(220, 38, 38, 0.15);
  --color-surface:        #ffffff;
  --color-surface-2:      #ffffff;
  --color-surface-3:      #f8f7f6;
  --color-border:         rgba(0, 0, 0, 0.10);
  --color-border-active:  rgba(220, 38, 38, 0.40);
  --color-text:           #1a1a1a;
  --color-text-muted:     #6b6b6b;
  --color-shadow:         rgba(0, 0, 0, 0.07);
  --radius-card: 12px;
  --radius-chip: 8px;
  font-family: 'Barlow', sans-serif;

}

/* ─── Breadcrumb ────────────────────────────────────────────────────────── */
.breadcrumb {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 13px;
}
.breadcrumb__link {
  color: var(--color-text-muted);
  cursor: pointer;
  transition: color 0.15s;
}
.breadcrumb__link:hover { color: var(--color-primary); }
.breadcrumb__sep { color: var(--color-text-muted); }
.breadcrumb__current { color: var(--color-text); font-weight: 600; }

/* ─── Page Header ───────────────────────────────────────────────────────── */
.page-header {
  display: flex;
  align-items: center;
  gap: 20px;
  position: relative;
  padding-left: 20px;
}
.page-header__accent {
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 4px;
  background: var(--color-primary);
  border-radius: 2px;
}
.page-header__title {
  font-family: 'Barlow Condensed', sans-serif;
  font-size: clamp(28px, 5vw, 40px);
  font-weight: 800;
  letter-spacing: 0.05em;
  color: var(--color-text);
  line-height: 1.1;
  margin: 0;
}
.page-header__subtitle {
  color: var(--color-text-muted);
  font-size: 14px;
  margin: 4px 0 0;
}
.page-header__logo-mark {
  margin-left: auto;
/*  opacity: 0.08;*/
}
.logo-mark-icon { color: var(--color-primary); }

/* ─── Section Card ──────────────────────────────────────────────────────── */
.section-card {
  background: var(--color-surface-2);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-card);
  overflow: hidden;
  transition: border-color 0.2s, box-shadow 0.2s;
  box-shadow: 0 1px 4px var(--color-shadow), 0 4px 16px rgba(0,0,0,0.04);
}
.section-card--error { border-color: rgba(220, 38, 38, 0.4); }

.section-card__header {
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 20px 24px;
  border-bottom: 1px solid var(--color-border);
  background: #fafaf9;
  cursor: default;
}
.section-card__header--toggle {
  cursor: pointer;
  background: #fafaf9;
  border: none;
  color: inherit;
  transition: background 0.15s;
}
.section-card__header--toggle:hover { background: #f4f2f0; }

.section-card__icon-wrap {
  width: 40px;
  height: 40px;
  border-radius: 8px;
  background: var(--color-primary-muted);
  border: 1px solid var(--color-border-active);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--color-primary);
  flex-shrink: 0;
}
.section-card__title {
  font-family: 'Barlow Condensed', sans-serif;
  font-size: 16px;
  font-weight: 700;
  letter-spacing: 0.08em;
  color: var(--color-text);
  margin: 0;
}
.section-card__subtitle {
  font-size: 12px;
  color: var(--color-text-muted);
  margin: 2px 0 0;
}

.section-card__body {
  padding: 24px;
}

.toggle-chevron {
  color: var(--color-text-muted);
  margin-left: auto;
  display: flex;
}

/* ─── Field shared ──────────────────────────────────────────────────────── */
.field-icon { color: var(--color-text-muted); }
.field-label {
  font-size: 13px;
  color: var(--color-text-muted);
  display: flex;
  align-items: center;
}
.optional-tag {
  font-size: 11px;
  color: var(--color-text-muted);
  margin-left: 8px;
  font-style: italic;
}

/* ─── Phone ─────────────────────────────────────────────────────────────── */
.phone-prefix {
  font-size: 13px;
  font-weight: 600;
  color: var(--color-text-muted);
  margin-right: 4px;
  user-select: none;
}

/* ─── Gender chips ──────────────────────────────────────────────────────── */
.gender-chips {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}
.gender-chip {
  padding: 8px 18px;
  border-radius: 100px;
  border: 1px solid var(--color-border);
  background: var(--color-surface-3);
  color: var(--color-text-muted);
  font-family: 'Barlow', sans-serif;
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.15s;
}
.gender-chip:hover {
  border-color: var(--color-border-active);
  color: var(--color-text);
}
.gender-chip--active {
  background: var(--color-primary-muted);
  border-color: var(--color-primary);
  color: var(--color-primary);
  font-weight: 600;
}

/* ─── Riding style chips ────────────────────────────────────────────────── */
.riding-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
  gap: 12px;
}
@media (max-width: 480px) {
  .riding-grid { grid-template-columns: repeat(2, 1fr); }
}

.riding-chip {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
  padding: 20px 12px 16px;
  border-radius: var(--radius-chip);
  border: 1px solid var(--color-border);
  background: var(--color-surface-3);
  color: var(--color-text-muted);
  cursor: pointer;
  font-family: 'Barlow', sans-serif;
  transition: all 0.18s cubic-bezier(0.34, 1.56, 0.64, 1);
  text-align: center;
}
.riding-chip:hover {
  border-color: rgba(220, 38, 38, 0.3);
  color: var(--color-text);
  transform: translateY(-2px);
  box-shadow: 0 4px 16px rgba(0,0,0,0.10);
}
.riding-chip--active {
  border-color: var(--color-primary);
  background: var(--color-primary-muted);
  color: var(--color-primary);
  transform: translateY(-2px);
  box-shadow: 0 4px 20px rgba(220, 38, 38, 0.15);
}
.riding-chip__icon { line-height: 1; }
.riding-chip__label {
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.02em;
  line-height: 1.2;
}
.riding-chip__check {
  position: absolute;
  top: 8px;
  right: 8px;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: var(--color-primary);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
}

.riding-error {
  display: flex;
  align-items: center;
  font-size: 12px;
  color: #ef5350;
}

/* ─── Password section ──────────────────────────────────────────────────── */
.pw-toggle {
  background: none;
  border: none;
  cursor: pointer;
  color: var(--color-text-muted);
  display: flex;
  align-items: center;
  padding: 4px;
  border-radius: 4px;
  transition: color 0.15s;
}
.pw-toggle:hover { color: var(--color-text); }

.strength-meter {
  display: flex;
  align-items: center;
  gap: 8px;
}
.strength-meter__bars {
  display: flex;
  gap: 4px;
  flex: 1;
}
.strength-bar {
  height: 4px;
  flex: 1;
  border-radius: 2px;
  background: rgba(0,0,0,0.10);
  transition: background 0.3s;
}
.strength-bar--error    { background: #ef5350; }
.strength-bar--warning  { background: #ff9800; }
.strength-bar--info     { background: #29b6f6; }
.strength-bar--success  { background: #66bb6a; }
.strength-label {
  font-size: 11px;
  font-weight: 600;
  min-width: 72px;
  text-align: right;
}

.pw-submit-btn { font-family: 'Barlow Condensed', sans-serif; letter-spacing: 0.04em; }

/* ─── Privacy note ──────────────────────────────────────────────────────── */
.privacy-note {
  font-size: 12px;
  color: var(--color-text-muted);
  display: flex;
  align-items: center;
  gap: 4px;
}
.privacy-link {
  color: var(--color-primary);
  text-decoration: none;
}
.privacy-link:hover { text-decoration: underline; }

/* ─── Form actions ──────────────────────────────────────────────────────── */
.form-actions {
  display: flex;
  align-items: center;
  gap: 16px;
  flex-wrap: wrap;
}
.save-btn {
  font-family: 'Barlow Condensed', sans-serif;
  font-size: 16px;
  font-weight: 700;
  letter-spacing: 0.06em;
  min-width: 200px;
}
.cancel-btn {
  font-family: 'Barlow Condensed', sans-serif;
  font-size: 16px;
  letter-spacing: 0.04em;
}
.keyboard-hint {
  font-size: 12px;
  color: var(--color-text-muted);
  margin-left: auto;
  margin-bottom: 0;
}
kbd {
  display: inline-flex;
  align-items: center;
  padding: 2px 6px;
  border: 1px solid var(--color-border);
  border-radius: 4px;
  font-size: 11px;
  font-family: monospace;
  background: #f4f2f0;
  color: var(--color-text-muted);
}
@media (max-width: 600px) {
  .form-actions { flex-direction: column; align-items: stretch; }
  .save-btn, .cancel-btn { width: 100%; }
  .keyboard-hint { display: none; }
}

/* ─── Confirm dialog ────────────────────────────────────────────────────── */
.confirm-dialog { background: #ffffff !important; }
.confirm-dialog__title {
  font-family: 'Barlow Condensed', sans-serif;
  font-size: 20px;
  font-weight: 700;
  display: flex;
  align-items: center;
  padding: 20px 24px 12px;
  color: var(--color-text);
}
.confirm-dialog__body {
  padding: 0 24px 16px;
  color: var(--color-text-muted);
  font-size: 14px;
}
.confirm-dialog__actions {
  padding: 12px 24px 20px;
  gap: 8px;
}

/* ─── Draft banner ──────────────────────────────────────────────────────── */
.draft-banner { border-left: 3px solid #29b6f6; }

/* ─── Transitions ───────────────────────────────────────────────────────── */
.fade-enter-active,
.fade-leave-active { transition: opacity 0.2s; }
.fade-enter-from,
.fade-leave-to { opacity: 0; }

.slide-down-enter-active,
.slide-down-leave-active {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  overflow: hidden;
}
.slide-down-enter-from,
.slide-down-leave-to {
  opacity: 0;
  max-height: 0;
  padding-top: 0;
  padding-bottom: 0;
}
.slide-down-enter-to,
.slide-down-leave-from { max-height: 600px; }
</style>
