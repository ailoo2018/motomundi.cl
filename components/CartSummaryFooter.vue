<script setup>
import {ref, watch} from "vue";
import {formatDeliveryDateRange, formatMoney} from "../@core/utils/formatters.js";
import {defineComponent} from "vue";

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: null
  },
})

watch(props, (newValue) => {
  isCollapsed.value = newValue.modelValue;
})

const isCollapsed = ref(true);

const { checkoutInfo } = inject("checkoutService");

const emit = defineEmits(['update:modelValue'])

const toggleCollapse= () => {
  isCollapsed.value = !isCollapsed.value
  emit('update:modelValue', isCollapsed.value)
}

const isEntre = (eta) => {
  if(eta.from != eta.to)
    return " entre el "
  return el
}

</script>

<template>


  <div class="cart-summary  " :class="{ 'collapsed' : isCollapsed}">
    <div id="cart-summary__footer" class="cart-summary__footer" style="">

      <div  class="cart-summary__shipping-time" v-if="checkoutInfo.shippingMethod && checkoutInfo.shippingMethod.type === 2">
        <svg  width="22" height="23" alt="Envío Express" xmlns="http://www.w3.org/2000/svg"
              class="icon sprite-line-icons">
          <use
              href="/svg/ailoo.svg#i-icon-checkout-express-shipping"
              xlink:href="/svg/ailoo.svg#i-icon-checkout-express-shipping"></use>
        </svg>
        <span >Recíbelo {{isEntre(checkoutInfo.shippingMethod.eta)}} <strong>{{ formatDeliveryDateRange(checkoutInfo.shippingMethod.eta) }}</strong>.</span>
      </div>
      <div  class="cart-summary__shipping-time" v-if="checkoutInfo.shippingMethod && checkoutInfo.shippingMethod.type === 1">
        <svg  width="22" height="23" alt="Click &amp; Collect"
              xmlns="http://www.w3.org/2000/svg" class="icon sprite-line-icons">
          <use
              href="/svg/ailoo.svg#i-icon-checkout-click-and-collect"
              xlink:href="/svg/ailoo.svg#i-icon-checkout-click-and-collect"></use>
        </svg>
        <span >Mañana</span>
      </div>


      <div class="cart-summary__info">
        <div class="cart-summary__amount">
          <span class="cart-summary__total">Total: </span>
          <strong>{{ formatMoney(checkoutInfo.total) }} </strong>
          <span class="cart-summary__old-amount" v-if="checkoutInfo.discount > 0">{{formatMoney(checkoutInfo.oldPrice)}}</span>
        </div>
        <span class="show-details" style="cursor: pointer;" @click="toggleCollapse">
                Ver detalles
                <svg width="14" height="14" xmlns="http://www.w3.org/2000/svg" class="icon sprite-line-icons">
            <title>Ver detalles</title>
            <use
                href="/svg/ailoo.svg#i-icon-angle-up"
                xlink:href="/svg/ailoo.svg#i-icon-angle-up"
            ></use>
          </svg>
              </span>
      </div>
      <StepActions :current-step="currentStep" @next="nextStep" @prev="prevStep" :error="error"></StepActions>
    </div>

  </div>
</template>

<style scoped>

.cart-summary__old-amount {
  margin-left: 4px
}

@media only screen and (max-width: 600px) {
  .cart-summary.collapsed.show-shipping-time .cart-summary__footer {
    padding: 8px 15px 12px;
  }
}

@media only screen and (max-width: 600px) {
  .cart-summary.collapsed .cart-summary__footer {
    border-top: 1px solid #dcdcdc;
    flex-direction: row;
  }
}


.cart-summary .cart-summary__footer .cart-summary__shipping-time {
  align-items: flex-start;
  display: flex;
  font-size: 14px;
  gap: 5px;
  padding: 0 0 5px;
}

.cart-summary .cart-summary__footer .cart-summary__shipping-time svg {
  flex: 0 0 auto;
  position: relative;
  scale: .9;
  top: -2px;
}

.cart-summary .cart-summary__footer .cart-summary__shipping-time {
  align-items: flex-start;
  display: flex;
  font-size: 14px;
  gap: 5px;
  padding: 0 0 5px;
}

</style>