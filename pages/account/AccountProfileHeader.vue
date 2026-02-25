<script setup>
import { IconMotorbike } from '@tabler/icons-vue'
</script>
<template>
  <div class="page-header mb-8">
    <div class="page-header__accent"/>
    <div>
      <h1 class="page-header__title">
        MI PERFIL
      </h1>
      <p class="page-header__subtitle">
        Gestiona tu información personal y preferencias de conducción
      </p>
    </div>
    <div class="page-header__logo-mark">
      <IconMotorbike
          :size="48"
          class="logo-mark-icon"
      />
    </div>
  </div>
</template>
<style scoped>
/* ─── Root tokens — Light Theme ─────────────────────────────────────────── */

/* ─── Breadcrumb ────────────────────────────────────────────────────────── */

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

.logo-mark-icon {
  color: var(--color-primary);
}

/* ─── Section Card ──────────────────────────────────────────────────────── */

/* ─── Field shared ──────────────────────────────────────────────────────── */

/* ─── Phone ─────────────────────────────────────────────────────────────── */

/* ─── Gender chips ──────────────────────────────────────────────────────── */

/* ─── Riding style chips ────────────────────────────────────────────────── */
@media (max-width: 480px) {
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
