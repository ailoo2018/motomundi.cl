<script setup lang="ts">

import {
  IconCompass,
  IconVinyl,
  IconSpeedBoat,
  IconBike,
  IconMountain,
  IconTrekking,

  IconAlertTriangle,
  IconCake,
  IconCheck,
  IconDeviceFloppy,
  IconGenderBigender,
  IconInfoCircle,
  IconMotorbike,
  IconX,
} from '@tabler/icons-vue'
import {useProfileForm} from "@/composables/useProfileForm";

const {
  saving,
  form,
  ridingStyles,
  toggleRidingStyle,
  isStyleSelected,
} = useProfileForm()


const ridingStyleIcons: Record<string, any> = {
  rsRace: IconMotorbike,
  rsCafeRacer: IconVinyl,
  rsSportTouring: IconCompass,
  rsScooter: IconBike,
  rsMX: IconMountain,
  rsAdv: IconTrekking,
}

const ridingStylesError = computed(() =>
  form.ridingStyles.length === 0 ? 'Selecciona al menos un estilo' : ''
)


</script>

<template>
  <div
    class="section-card mb-6"
    :class="{ 'section-card--error': ridingStylesError }"
  >
    <div class="section-card__header">
      <div class="section-card__icon-wrap">
        <IconMotorbike :size="22" />
      </div>
      <div>
        <h2 class="section-card__title">
          ESTILO DE CONDUCCIÓN
        </h2>
        <p class="section-card__subtitle">
          Selecciona todo lo que aplique · Mínimo 1 requerido
        </p>
      </div>
    </div>

    <div class="section-card__body">
      <div class="riding-grid">
        <VTooltip
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
              class="riding-chip"
              :class="[{ 'riding-chip--active': isStyleSelected(style.id) }]"
              :aria-pressed="isStyleSelected(style.id)"
              :aria-label="`${style.label}: ${style.description}`"
              @click="toggleRidingStyle(style.id)"
            >

              <div class="riding-chip__icon">

                <component
                  :is="ridingStyleIcons[style.id]"
                  :size="28"
                />
              </div>
              <span class="riding-chip__label">{{ style.label }}</span>
              <div
                v-if="isStyleSelected(style.id)"
                class="riding-chip__check"
              >
                <IconCheck :size="14" />
              </div>
            </button>
          </template>
        </VTooltip>
      </div>

      <!-- Validation message -->
      <Transition name="fade">
        <p
          v-if="ridingStylesError"
          class="riding-error mt-3"
        >
          <IconAlertTriangle
            :size="14"
            class="mr-1"
          />
          {{ ridingStylesError }}
        </p>
      </Transition>
    </div>
  </div>
</template>

<style scoped>

.section-card {
  background: var(--color-surface-2);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-card);
  overflow: hidden;
  transition: border-color 0.2s, box-shadow 0.2s;
  box-shadow: 0 1px 4px var(--color-shadow), 0 4px 16px rgba(0, 0, 0, 0.04);
}

.section-card--error {
  border-color: rgba(220, 38, 38, 0.4);
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

/* ─── Phone ─────────────────────────────────────────────────────────────── */

/* ─── Gender chips ──────────────────────────────────────────────────────── */

/* ─── Riding style chips ────────────────────────────────────────────────── */
.riding-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
  gap: 12px;
}

@media (max-width: 480px) {
  .riding-grid {
    grid-template-columns: repeat(2, 1fr);
  }
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
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.10);
}

.riding-chip__icon {
  line-height: 1;
}

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
