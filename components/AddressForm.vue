<script setup>
import ComunaAutocomplete from "~/components/ComunaAutocomplete.vue"
import { useRut } from "~/@core/utils/rut"


const props = defineProps({
  modelValue: {
    type: Object,
  },
  isCompany: {
    type: Boolean,
    required: false,
    default: false,
  },
})

const emit = defineEmits(['update:modelValue'])

const { formatRutInput, validateRut } = useRut()

const isCompanyInfo = ref(props.isCompany)


const address = ref({
  name: props.modelValue.name || '',
  surnames: props.modelValue.surnames || '',
  rut: props.modelValue.rut || '',
  address: props.modelValue.address || '',
  address2: props.modelValue.address2 || '',
  legalName: props.modelValue.legalName || '',
  type: props.modelValue.type || '',
  comuna: props.modelValue.comuna || null,
  postal_code: props.modelValue.postal_code || '',
})

console.log("AddressForm::address", address)

// Watch for changes in props to update local state
watch(() => props.modelValue, newValue => {
  console.log("AddressForm::watch", newValue)
  Object.assign(address.value, newValue)
  selectedComuna.value = address.value.comuna
}, { deep: true })

const updateModelValue = () => {
  emit('update:modelValue', { ...address.value })
}

const type = ref('customer')

if(props.config && props.config.type){
  type.value = props.config.type
}



console.log("props.address", props.address)

/*
watch(props, props => {
  address.value = structuredClone(toRaw(props.address))
  selectedComuna.value = address.value.comuna
  console.log("watch address", props.address)
})
*/

// const address = ref(structuredClone(toRaw(props.address)))
const selectedComuna = ref(null)
const form = ref(null)
const valid = ref(false)

const reqRules = [
  v => !!v || 'El campo es requerido',
]

const rutRules = [
  v =>  {
    if(!validateRut(v))
      return "El RUT no es valido"
  },
]


if(address.value.comuna){
  selectedComuna.value = address.value.comuna
}

const handleComunaSelection =  comuna => {
  console.log("Comuna selected", comuna)
  address.value.comuna = comuna
  updateModelValue()
}

const handleRutInput = event => {
  console.log("handleRutInput", event)

  const input = event.target
  if(validateRut(input.value))
    address.value.rut = formatRutInput(input.value)
  else{
    address.value.rut =input.value
  }
  updateModelValue()

//  isValid.value = validateRut(rut.value);
}

const getAddress = async () => {

  const { valid } = await form.value.validate()

  if (!valid) {
    return null
  }

  address.value.comuna = selectedComuna.value
  
  return address.value
}

const validate = async () => {
  const { valid, a, b, c } = await form.value.validate()
  if (!valid) {
    return "Hay errores en el formulario. Por favor, revisa los campos e inténtalo de nuevo."
  }

  return null
}


defineExpose({ getAddress, validate })
</script>

<template>
  <VForm
    ref="form"
    v-model="valid"
  >
    <div class="address-form form-fieldset">
      <div
        v-if="!isCompany"
        class="form-item half-width"
      >
        <div class="input__group">
          <VTextField
            v-model="address.name"
            label="Nombre *"
            :rules="reqRules"
            variant="solo"
            required
            @input="updateModelValue"
          />
        </div>
      </div>
      <div
        v-if="!isCompany"
        class="form-item half-width"
      >
        <div class="input__group">
          <VTextField
            v-model="address.surnames"
            label="Apellido *"
            :rules="reqRules"
            variant="solo"
            required
            @input="updateModelValue"
          />
        </div>
      </div>
      <div
        v-if="isCompany"
        class="form-item full-width"
      >
        <div class="input__group">
          <VTextField
            v-model="address.legalName"
            label="Razón Social *"
            :rules="reqRules"
            variant="solo"
            required
            @input="updateModelValue"
          />
        </div>
      </div>

      <div class="form-item full-width">
        <div class="input__group">
          <VTextField
            v-model="address.rut"
            label="RUT *"
            :rules="rutRules"
            variant="solo"
            required
            @input="handleRutInput"
          />
        </div>
      </div>
      <div class="form-item full-width">
        <div class="input__group">
          <VTextField
            v-model="address.address"
            label="Calle y Numero*"
            :rules="reqRules"
            variant="solo"
            required
            @input="updateModelValue"
          />
        </div>
      </div>
      <div class="form-item full-width">
        <div class="input__group ">
          <VTextField
            v-model="address.address2"
            label="Piso, puerta, otros (Opcional)"
            required
            variant="solo"
            style="background-color: white"
            @input="updateModelValue"
          />
        </div>
      </div>

      <div class="form-item half-width">
        <div class="input__group">
          <ComunaAutocomplete
            v-model="selectedComuna"
            variant="solo"
            :rules="reqRules"
            style="background-color: white"
            @update:model-value="handleComunaSelection"
          />
        </div>
      </div>

      <div class="form-item half-width">
        <div class="input__group">
          <VTextField
            v-model="address.postal_code"
            label="Código Postal (Opcional)"
            variant="solo"

            @input="updateModelValue"
          />
        </div>
      </div>
    </div>
  </VForm>
</template>

<style scoped>
.address-form__different-country.form-item.full-width {
  padding: 2px 0 10px 10px;
}
</style>
