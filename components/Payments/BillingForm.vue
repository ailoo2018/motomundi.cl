<script setup lang="ts">
import {useCheckoutStore} from '~/stores/checkout'

const props = defineProps({
  modelValue: {
    type: Object,
    required: true,
  }
});

const emit = defineEmits(["updatedAddress"])

/*
const billingAddress = ref({
  name: props.modelValue.name || '',
  surnames: props.modelValue.surnames || '',
  rut: props.modelValue.rut || '',
  address: props.modelValue.address || '',
  address2: props.modelValue.address2 || '',
  legalName: props.modelValue.legalName || '',
  type: props.modelValue.type || '',
  comuna: props.modelValue.comuna || null,
  postalCode: props.modelValue.postalCode || '',

});
*/
const billingAddress = ref(structuredClone(toRaw(props.modelValue)))
const addressForm = ref(null)

watch(() => props.modelValue, (newValue) => {
  Object.assign(billingAddress.value, newValue);
}, { deep: true });

const updateModelValue = () => {
  emit('update:modelValue', { ...billingAddress.value });
};



const checkoutStore = useCheckoutStore()
const showBillingForm = ref(false)


if (!billingAddress.value) {
  billingAddress.value = checkoutStore.customerInfo.address;
}

const saveBillingAddress = async () => {

  const err = await addressForm.value.validate()
  if(err) {
//    alert(err)
    return
  }

  showBillingForm.value = false;
  emit("updatedAddress", billingAddress.value)
}

const getBillingAddress = () => {
  return billingAddress.value
}

const addressFormConfig = {
  type: "organization"
}

</script>

<template>


  <div class="payment__billing-info" >
    <h3>Datos de facturación </h3>
    <div class="billing-info__content padding-md mt-3" v-if="!billingAddress.rut">
      <VBtn class="full-width" @click="showBillingForm = true" style="width:100%">Solicitar Factura</VBtn>
    </div>

    <div class="billing-info__content" v-if="billingAddress.rut">

      <div>
        <div class="address__info">
          <div class="address__content">
            <p class="address__name">
              {{ billingAddress.legalName }}<span>, {{ billingAddress.rut }} </span>
            </p>
            <p class="address__address">
              {{ billingAddress.address }}, {{ billingAddress.comuna ? billingAddress.comuna.name : '' }}, Chile
            </p>
          </div>


          <button class="button button--light button--small address__modify" @click="showBillingForm = true">
            Cambiar
          </button>
        </div>



      </div>
    </div>
  </div>
  <div class="payment__billing-form " v-if="showBillingForm" :class="{ 'collapsed' : !showBillingForm }">

    <div class="billing-form__content">
      <AddressForm ref="addressForm" :is-company="true"  v-model="billingAddress" ></AddressForm>
      <div class="form-actions">
        <button class="button button--outline" @click="showBillingForm = false">
          Cancelar
        </button>
        <button class="button button--filled" @click="saveBillingAddress">
          Guardar
        </button>
      </div>
    </div>
    <div class="payment__overlay"></div>
  </div>

</template>

<style scoped>
.ask-invoice .input__group {
  display: flex;
  gap: 10px;
}

.ask-invoice input.styled-checkbox {
  margin-top: 4px;
}
</style>