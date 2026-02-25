<script setup>
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
import { useProfileForm } from "@/composables/useProfileForm.js"


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

  validateNewPassword,
  validateConfirmPassword,
  validateCurrentPassword,
  passwordError,

  handlePasswordChange,

} = useProfileForm()
</script>

<template>
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
        <h2 class="section-card__title">
          CAMBIAR CONTRASEÑA
        </h2>
        <p class="section-card__subtitle">
          {{ passwordExpanded ? 'Haz clic para cerrar' : 'Expande para actualizar tu contraseña' }}
        </p>
      </div>
      <div class="toggle-chevron">
        <component
          :is="passwordExpanded ? IconChevronUp : IconChevronDown"
          :size="20"
        />
      </div>
    </button>

    <!-- Expanded body -->
    <Transition name="slide-down">
      <div
        v-if="passwordExpanded"
        id="password-panel"
        class="section-card__body"
      >
        <VForm
          ref="passwordForm"
          validate-on="blur"
        >
          <VRow>
            <!-- Current password -->
            <VCol cols="12">
              <VTextField
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
                  <IconLock
                    :size="18"
                    class="field-icon"
                  />
                </template>
                <template #append-inner>
                  <button
                    type="button"
                    class="pw-toggle"
                    :aria-label="showCurrentPw ? 'Ocultar' : 'Mostrar'"
                    @click="showCurrentPw = !showCurrentPw"
                  >
                    <component
                      :is="showCurrentPw ? IconEyeOff : IconEye"
                      :size="18"
                    />
                  </button>
                </template>
              </VTextField>
            </VCol>

            <!-- New password -->
            <VCol
              cols="12"
              sm="6"
            >
              <VTextField
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
                  <IconLockPlus
                    :size="18"
                    class="field-icon"
                  />
                </template>
                <template #append-inner>
                  <button
                    type="button"
                    class="pw-toggle"
                    :aria-label="showNewPw ? 'Ocultar' : 'Mostrar'"
                    @click="showNewPw = !showNewPw"
                  >
                    <component
                      :is="showNewPw ? IconEyeOff : IconEye"
                      :size="18"
                    />
                  </button>
                </template>
              </VTextField>

              <!-- Password strength meter -->
<!--
              <Transition name="fade">
                <div
                  v-if="passwords.new"
                  class="strength-meter mt-2"
                >
                  <div class="strength-meter__bars">
                    <div
                      v-for="i in 4"
                      :key="i"
                      class="strength-bar"
                      :class="[
                        i <= passwordStrength.score ? `strength-bar&#45;&#45;${passwordStrength.color}` : '',
                      ]"
                    />
                  </div>
                  <span :class="`strength-label text-${passwordStrength.color}`">
                    {{ passwordStrength.label }}
                  </span>
                </div>
              </Transition>
-->
            </VCol>

            <!-- Confirm password -->
            <VCol
              cols="12"
              sm="6"
            >
              <VTextField
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
                  <IconLockCheck
                    :size="18"
                    class="field-icon"
                  />
                </template>
                <template #append-inner>
                  <button
                    type="button"
                    class="pw-toggle"
                    :aria-label="showConfirmPw ? 'Ocultar' : 'Mostrar'"
                    @click="showConfirmPw = !showConfirmPw"
                  >
                    <component
                      :is="showConfirmPw ? IconEyeOff : IconEye"
                      :size="18"
                    />
                  </button>
                </template>
              </VTextField>
            </VCol>

            <VCol v-if="passwordError" cols="12">
              <VAlert color="warning" >
                <VIcon class="tabler-alert-circle"/>
                Error al tratar de actualizar clave: {{passwordError}}
              </VAlert>
            </VCol>

            <!-- Change password action -->
            <VCol
              cols="12"
              class="d-flex justify-end"
            >
              <VBtn
                type="button"
                variant="tonal"
                color="primary"
                :loading="passwordSaving"
                size="large"
                rounded="0"
                @click="handlePasswordChange"
              >
                <template #prepend>
                  <IconShieldLock :size="18" />
                </template>
                Actualizar Contraseña
              </VBtn>
            </VCol>
          </VRow>
        </VForm>
      </div>
    </Transition>
  </div>
</template>

<style scoped>
/* ─── Root tokens — Light Theme ─────────────────────────────────────────── */

/* ─── Breadcrumb ────────────────────────────────────────────────────────── */

/* ─── Page Header ───────────────────────────────────────────────────────── */

/* ─── Section Card ──────────────────────────────────────────────────────── */
.section-card {
  background: var(--color-surface-2);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-card);
  overflow: hidden;
  transition: border-color 0.2s, box-shadow 0.2s;
  box-shadow: 0 1px 4px var(--color-shadow), 0 4px 16px rgba(0, 0, 0, 0.04);
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

.section-card__header--toggle {
  cursor: pointer;
  background: #fafaf9;
  border: none;
  color: inherit;
  transition: background 0.15s;
}

.section-card__header--toggle:hover {
  background: #f4f2f0;
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

.toggle-chevron {
  color: var(--color-text-muted);
  margin-left: auto;
  display: flex;
}

/* ─── Field shared ──────────────────────────────────────────────────────── */
.field-icon {
  color: var(--color-text-muted);
}

/* ─── Phone ─────────────────────────────────────────────────────────────── */

/* ─── Gender chips ──────────────────────────────────────────────────────── */

/* ─── Riding style chips ────────────────────────────────────────────────── */
@media (max-width: 480px) {
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

.pw-toggle:hover {
  color: var(--color-text);
}

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
  background: rgba(0, 0, 0, 0.10);
  transition: background 0.3s;
}

.pw-submit-btn {
  font-family: 'Barlow Condensed', sans-serif;
  letter-spacing: 0.04em;
}

/* ─── Privacy note ──────────────────────────────────────────────────────── */

/* ─── Form actions ──────────────────────────────────────────────────────── */
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
}

/* ─── Confirm dialog ────────────────────────────────────────────────────── */


/* ─── Draft banner ──────────────────────────────────────────────────────── */

/* ─── Transitions ───────────────────────────────────────────────────────── */
</style>
