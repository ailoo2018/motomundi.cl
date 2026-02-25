<script setup lang="ts">
import RidingStyle from "@/pages/account/RidingStyle.vue"
import {
  IconAlertTriangle,
  IconCake,
  IconCheck,
  IconDeviceFloppy,
  IconGenderBigender,
  IconInfoCircle,
  IconPhone,
  IconShieldLock,
  IconUser,
  IconX,
} from '@tabler/icons-vue'
import { useProfileForm } from '~/composables/useProfileForm'
import AccountPasswordChange from "@/pages/account/AccountPasswordChange.vue"
import AccountBreadCrumbs from "@/pages/account/AccountBreadCrumbs.vue"
import AccountProfileHeader from "@/pages/account/AccountProfileHeader.vue"


definePageMeta({
  alias: '/cuenta/perfil',
  layout: 'account',
  middleware: 'auth', // Must match the filename (auth.ts)
})



const {
  profileForm,
  isFormValid,
  isDirty,
  saving,
  form,
  showSuccessSnackbar,
  showErrorSnackbar,
  showCancelDialog,
  showDraftBanner,
  showSuccessPasswordSnackbar,
  validateFirstName,
  validateLastName,
  validatePhone,
  validateDateOfBirth,
  onPhoneInput,
  handleSave,
  handleCancel,
  discardChanges,
} = useProfileForm()

watch(() => isDirty.value, () => {
  console.log("!!!!!!!!!!!!!!!!!!configuration: isDirty: " + isDirty.value)
})

const genderOptions = [
  { title: 'Masculino', value: 'male' },
  { title: 'Femenino', value: 'female' },
  { title: 'Otro', value: 'other' },
  { title: 'Prefiero no indicar', value: 'undisclosed' },
]
</script>

<template>
  <VContainer
    class="profile-container pa-0 w-100 pa-md-5"
  >
<!--
    <AccountBreadCrumbs />
-->

    <AccountProfileHeader />

    <VAlert
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
    </VAlert>

    <!-- ── Main Form ──────────────────────────────────────────────────────── -->
    <VForm
      ref="profileForm"
      v-model="isFormValid"
      validate-on="blur"
      @submit.prevent="handleSave"
    >
      <div class="section-card mb-6">
        <div class="section-card__header">
          <div class="section-card__icon-wrap">
            <IconUser :size="22" />
          </div>
          <div>
            <h2 class="section-card__title">
              INFORMACIÓN PERSONAL
            </h2>
            <p class="section-card__subtitle">
              Tu identidad en Motomundi
            </p>
          </div>
        </div>

        <div class="section-card__body">
          <VRow>
            <!-- First name -->
            <VCol
              cols="12"
              sm="6"
            >
              <VTextField
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
                  <IconUser
                    :size="18"
                    class="field-icon"
                  />
                </template>
              </VTextField>
            </VCol>

            <!-- Last name -->
            <VCol
              cols="12"
              sm="6"
            >
              <VTextField
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
                  <IconUser
                    :size="18"
                    class="field-icon"
                  />
                </template>
              </VTextField>
            </VCol>

            <!-- Phone -->
            <VCol
              cols="12"
              sm="7"
            >
              <VTextField
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
                  <IconPhone
                    :size="18"
                    class="field-icon ml-1"
                  />
                </template>
              </VTextField>
            </VCol>

            <!-- Date of birth -->
            <VCol
              cols="12"
              sm="5"
            >
              <VTextField
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
                  <IconCake
                    :size="18"
                    class="field-icon"
                  />
                </template>
              </VTextField>
            </VCol>

            <!-- Gender -->
            <VCol cols="12">
              <p class="field-label mb-2">
                <IconGenderBigender
                  :size="16"
                  class="mr-1 field-icon"
                />
                Género <span class="optional-tag">Opcional · Mejora recomendaciones de talla</span>
              </p>
              <div class="gender-chips">
                <button
                  v-for="opt in genderOptions"
                  :key="opt.value"
                  type="button"
                  class="gender-chip"
                  :class="[{ 'gender-chip--active': form.gender === opt.value }]"
                  :aria-pressed="form.gender === opt.value"
                  @click="form.gender = form.gender === opt.value ? '' : opt.value"
                >
                  {{ opt.title }}
                </button>
              </div>
            </VCol>
          </VRow>
        </div>
      </div>


      <RidingStyle />

      <AccountPasswordChange />

      <!-- ── Privacy note ────────────────────────────────────────────────── -->
      <p class="privacy-note mb-6">
        <IconInfoCircle
          :size="14"
          class="mr-1"
        />
        Tu información es protegida según nuestra
        <a
          href="/privacidad"
          class="privacy-link"
        >Política de Privacidad</a>.
        No compartimos tus datos con terceros.
      </p>

      <div class="form-actions">

        <VBtn
          type="submit"
          color="primary"
          rounded="0"
          size="large"
          :loading="saving"
          :disabled="!isDirty || saving"

          :title="isDirty ? 'Guardar cambios (Ctrl+S)' : 'No hay cambios'"
        >
          <template #prepend>
            <IconDeviceFloppy :size="20" />
          </template>
          Guardar Cambios
        </VBtn>

        <VBtn
          type="button"
          rounded="0"
          variant="outlined"
          size="large"
          :disabled="saving"
          color="#000"
          @click="handleCancel"
        >
          <template #prepend>
            <IconX :size="18" />
          </template>
          Descartar
        </VBtn>

        <p class="keyboard-hint">
<!--          <kbd>Ctrl</kbd> + <kbd>S</kbd> para guardar-->
        </p>
      </div>
    </VForm>

    <!--
      ══════════════════════════════════════════════════════════════════════
      Dialogs & Snackbars
      ══════════════════════════════════════════════════════════════════════ 
    -->

    <!-- Cancel confirmation dialog -->
    <VDialog
      v-model="showCancelDialog"
      max-width="420"
      persistent
    >
      <VCard class="confirm-dialog">
        <VCardTitle class="confirm-dialog__title">
          <IconAlertTriangle
            :size="24"
            class="mr-2 text-warning"
          />
          ¿Descartar cambios?
        </VCardTitle>
        <VCardText class="confirm-dialog__body">
          Tienes cambios sin guardar. Si descartás ahora, perderás toda la información modificada.
        </VCardText>
        <VCardActions class="confirm-dialog__actions">
          <VBtn
            variant="text"
            @click="showCancelDialog = false"
          >
            Seguir editando
          </VBtn>
          <VBtn
            color="error"
            variant="flat"
            @click="discardChanges"
          >
            Descartar todo
          </VBtn>
        </VCardActions>
      </VCard>
    </VDialog>

    <!-- Success snackbar -->
    <VSnackbar
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
    </VSnackbar>

    <!-- Password success snackbar -->
    <VSnackbar
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
    </VSnackbar>

    <!-- Error snackbar -->
    <VSnackbar
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
    </VSnackbar>
  </VContainer>
</template>

<style scoped>
/* ─── Root tokens — Light Theme ─────────────────────────────────────────── */
.profile-container {
  --color-primary:        #b21a15;
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
  --radius-card: 0px;
  --radius-chip: 8px;
  font-family: 'Barlow', sans-serif;

}

/* ─── Breadcrumb ────────────────────────────────────────────────────────── */

/* ─── Page Header ───────────────────────────────────────────────────────── */

/* ─── Section Card ──────────────────────────────────────────────────────── */
.section-card {
  background: var(--color-surface-2);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-card);
  overflow: hidden;
  transition: border-color 0.2s, box-shadow 0.2s;
  box-shadow: 0 1px 4px var(--color-shadow), 0 4px 16px rgba(0,0,0,0.04);
}

.section-card__header {
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 20px 24px;
  border-bottom: 1px solid var(--color-border);
  background: #fafaf9;
  cursor: default;
}

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
@media (max-width: 480px) {
}

.riding-chip--active {
  border-color: var(--color-primary);
  background: var(--color-primary-muted);
  color: var(--color-primary);
  transform: translateY(-2px);
  box-shadow: 0 4px 20px rgba(220, 38, 38, 0.15);
}

/* ─── Password section ──────────────────────────────────────────────────── */

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
