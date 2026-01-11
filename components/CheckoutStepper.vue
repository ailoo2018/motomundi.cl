<template>
  <ol class="steps">
    <li class="step " :class="{ 'active' : currentStep === 1}">
      Datos
    </li>
    <li class="step" :class="{ 'active' : currentStep === 2}">
      Envío
    </li>
    <li class="step" :class="{ 'active' : currentStep === 3}">
      Pago
    </li>
  </ol>

  <!--
    <div class="checkout-stepper">
      <div
          v-for="step in steps"
          :key="step.id"
          :class="['step', { 'active': step.id === currentStep, 'completed': step.id < currentStep }]"
      >
        <div class="step-number">{{ step.id }}</div>
        <div class="step-label">{{ step.label }}</div>
      </div>
    </div>
  -->
</template>

<script setup>
import {ref} from 'vue'

const props = defineProps({
  currentStep: {
    type: Number,
    required: true,
    validator: (value) => [1, 2, 3].includes(value)
  }
})

const steps = ref([
  {id: 1, label: 'Datos'},
  {id: 2, label: 'Envío'},
  {id: 3, label: 'Pago'}
])
</script>

<style scoped>


.steps{
  --circle-size: 24px;
  --border-size: 2px;
  --spacing: 10px;
  box-sizing: border-box;
  counter-reset: num;
  display: flex;
  margin: 0 auto;
  padding: 0;
  width: 100%;
}

.step {
  box-sizing: border-box;
  cursor: pointer;
  display: flex;
  flex: 1;
  flex-direction: column;
  font-size: 13px;
  font-weight: 300;
  text-align: center;
  text-transform: uppercase;

}

.step.active:after, .step.active~.step {
  cursor: default;
  opacity: .3;
}

.steps, .steps .step, .steps .step:after, .steps .step:before {
  transition: all .4s ease;
}
.step:before, .step:not(:last-child):after {
  background-color: #000;
  box-sizing: border-box;
}

.step:not(:last-child):after {
  content: "";
  height: 2px;
  left: calc(50% + var(--circle-size)/2 + var(--spacing));
  order: -1;
  position: relative;
  top: calc(var(--circle-size)/2);
  width: calc(100% - var(--circle-size) - var(--spacing)*2);
}



.step:before {
  border: var(--border-size) solid #000;
  border-radius: 50%;
  color: #fff;
  content: counter(num) " ";
  counter-increment: num;
  display: block;
  font-weight: 600;
  height: var(--circle-size);
  line-height: calc(var(--circle-size) - var(--border-size)*2);
  margin: 0 auto 5px;
  width: var(--circle-size);
}


.step.active:before, .step.active ~ .step:before {
  background: #fff;
  color: #000;
}

.step:not(:last-child):after {
  content: "";
  height: 2px;
  left: calc(50% + var(--circle-size) / 2 + var(--spacing));
  order: -1;
  position: relative;
  top: calc(var(--circle-size) / 2);
  width: calc(100% - var(--circle-size) - var(--spacing) * 2);
}

.step:before, .step:not(:last-child):after {
  background-color: #000;
  box-sizing: border-box;
}
.steps, .steps .step, .steps .step:after, .steps .step:before {
  transition: all .4s ease;
}

</style>