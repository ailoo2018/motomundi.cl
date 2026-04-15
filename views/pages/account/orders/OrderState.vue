<script setup lang="ts">
const props = defineProps({
  order: {
    type: Object,
  },
})

const order = computed(() => props.order)


const steps = computed(() => {

  if(order.value?.shipmentMethodTypeId === 9){
    return  [
      { icon: 'tabler-circle-check',     label: 'Confirmado'     },
      { icon: 'tabler-package',          label: 'En preparación' },
      { icon: 'tabler-building-store',   label: 'Listo para retiro'      },
      { icon: 'tabler-home-check',       label: 'Entregado'      },
    ]

  }

  return  [
    { icon: 'tabler-circle-check',     label: 'Confirmado'     },
    { icon: 'tabler-package',          label: 'En preparación' },
    { icon: 'tabler-truck-delivery',   label: 'En camino'      },
    { icon: 'tabler-home-check',       label: 'Entregado'      },
  ]
})

/** Maps a status ID to the stepper step index (0-based) */
const currentStep = computed(() => {
  // 1. Extract the state, defaulting to a safe value if order is null
  const id =  order.value?.state

  // 2. Use a switch that actually maps different states to different steps
  switch (id) {
  case 0:
  case 1:
    return 0
  case 2:
    return 1 // Assuming state 2 is actually the second step
  case 3:
    return 2
  case 8:
    return 3
  case 9:
  case 10:
    return 4
  default:
    return 0 // Fallback for undefined or unknown states
  }
})
</script>

<template>
  <!-- Step tracker -->
  <div class="mm-steps">
    <div
      v-for="(step, i) in steps"
      :key="i"
      class="mm-step"
      :class="{
        'mm-step--done': i < currentStep,
        'mm-step--active': i === currentStep,
        'mm-step--pending': i > currentStep,
      }"
    >
      <!-- connector line -->
      <div
        v-if="i < steps.length - 1"
        class="mm-step__line"
        :class="{ 'mm-step__line--done': i < currentStep }"
      />

      <div class="mm-step__icon-wrap">
        <VIcon
          :icon="step.icon"
          size="18"
        />
      </div>
      <span class="mm-step__label">{{ step.label }}</span>
    </div>
  </div>
</template>

<style scoped>
/* ── Step tracker ────────────────────────────────────────────────── */
.mm-steps {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  position: relative;
  gap: 0;
}

.mm-step {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  z-index: 1;
}

.mm-step__line {
  position: absolute;
  top: 19px;
  left: 50%;
  width: 100%;
  height: 2px;
  background: #e0e0e0;
  z-index: 0;
}

.mm-step__line--done {
  background: #B21915;
}

.mm-step__icon-wrap {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px solid #e0e0e0;
  background: #fff;
  color: #bbb;
  transition: all 0.2s;
  position: relative;
  z-index: 2;
}

.mm-step--done .mm-step__icon-wrap {
  border-color: #B21915;
  background: #B21915;
  color: #fff;
}

.mm-step--active .mm-step__icon-wrap {
  border-color: #B21915;
  background: #fff;
  color: #B21915;
  box-shadow: 0 0 0 4px rgba(178, 25, 21, 0.12);
}

.mm-step__label {
  font-size: 0.7rem;
  font-weight: 600;
  text-align: center;
  margin-top: 6px;
  color: #aaa;
  line-height: 1.2;
}

.mm-step--done .mm-step__label,
.mm-step--active .mm-step__label {
  color: #B21915;
}
</style>
