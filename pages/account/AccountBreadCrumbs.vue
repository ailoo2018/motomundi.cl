<script setup>

</script>

<template>
  <div class="breadcrumb mb-6">
    <span class="breadcrumb__link">Inicio</span>
    <span class="breadcrumb__sep">›</span>
    <span class="breadcrumb__link">Mi Cuenta</span>
    <span class="breadcrumb__sep">›</span>
    <span class="breadcrumb__current">Mi Perfil</span>
  </div>
</template>
<style scoped>
/* ─── Root tokens — Light Theme ─────────────────────────────────────────── */

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

.breadcrumb__link:hover {
  color: var(--color-primary);
}

.breadcrumb__sep {
  color: var(--color-text-muted);
}

.breadcrumb__current {
  color: var(--color-text);
  font-weight: 600;
}


@media (max-width: 480px) {
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
}
</style>
