<script setup>
import { ref, computed, watch } from 'vue'
import { useAddressForm } from "@/composables/useAddressForm.js"
import { useRut } from "~/@core/utils/rut"
import { useCheckoutStore } from "@/stores/checkout.js"
import { useCountryDetection } from "@/composables/useCountryDetection.js"

const { formatRutInput, validateRut } = useRut()
const form = ref(null)


const {
  getAddress,
  setAddress,
  getAddresses,
  selectedAddress,
  selectedIdType,
  countryItems,
  selectedCountry,
  country,
  idNumber,
  name,
  surname,
  addressLine1,
  addressLine2,
  state,
  city,
  postalCode,
  comuna,

  isChile,
} = useAddressForm()


const checkoutStore = useCheckoutStore()
if (checkoutStore.customerInfo?.address)
  setAddress(checkoutStore.customerInf?.address)

// ─── Computed ─────────────────────────────────────────────────────────────────

const idTypeItems = computed(() =>
  country.value.idTypes.map(t => ({ title: t.label, value: t.value })),
)

const stateItems = computed(() =>
  country.value.states.map(s => ({ title: s, value: s })),
)

const reqRules = [
  v => !!v || 'Este campo es requerido',
]

const nameRules = [
  v => !!v || 'El nombre es requerido',
]

const surnameRules = [
  v => !!v || 'El apellido  es requerido',
]

const idTypeRules = [
  v => !!v || 'Selecciona el tipo de documento',
]

const idNumberRules = [
  v => !!v || `El número de ${selectedIdType.value || 'documento'} es requerido`,
  v => {
    if (!isChile.value) return true

    const isValid = validateRut(v)
    
    return isValid || "El RUT no es valido"
  },
]

const addressRules = [
  v => !!v || 'La dirección es requerida',
  v => (v && v.length >= 5) || 'Ingresa una dirección válida',
]

const stateRules = [
  v => !!v || `${country.value.stateLabel} es requerido`,
]

const cityRules = [
  v => !!v || `${country.value.cityLabel} es requerido`,
]

const postalRules = computed(() => [
  v => !country.value.hasPostalCode || !!v || `El ${country.value.postalCodeLabel} es requerido`,
])

const comunaRules = [
  v => !!v || 'La región / comuna es requerida',
]


const validate = async () => {
  const validate = await form.value.validate()

  if (!validate.valid) {
    // Scroll the first error into view so the user notices it immediately
    console.log("not valid")
    await nextTick()

    const firstError = document.querySelector('.v-field--error')

    firstError?.scrollIntoView({ behavior: 'smooth', block: 'center' })

    return 'Hay campos con errores. Por favor revísalos antes de continuar.'
  }

  return null
}

const handleRutInput = event => {
  console.log("handleRutInput: " + isChile.value, event)

  if (!isChile.value)
    return


  const input = event.target
  if (validateRut(input.value))
    idNumber.value = formatRutInput(input.value)
  else {
    idNumber.value = input.value
  }

}


onMounted(async () => {
  console.log("AddressForm::onMounted")

  const addresses = await getAddresses()

  if (checkoutStore.customerInfo?.address) {
    setAddress(checkoutStore.customerInfo.address)
  } else if (addresses?.length > 0) {
    setAddress(addresses[0])
  }

})


const getCustomerAddress = () => {
  console.log("getCustomerData")

  const countryData = useCountryDetection().getCountryData(country.value.code)

  checkoutStore.setCountryData(countryData)
  checkoutStore.saveToLocalStorage()

  return getAddress()
}

defineExpose({ getAddresses, getCustomerAddress, validate })
</script>

<template>
  <!-- VForm wrapper: required for form.validate() to reach all child fields -->
  <VForm
    ref="form"
    class="address-form"
    validate-on="submit"
  >
    {{ isChile }}

    <!-- ── Country ──────────────────────────────────────────── -->
    <VRow class="ma-0 pa-0 mt-4">
      <VCol
        cols="12"
        class="pa-0"
      >
        <VSelect
          v-model="selectedCountry"
          :items="countryItems"
          item-value="code"
          item-title="name"
          label="País *"
          variant="solo"
          :rules="reqRules"
          prepend-inner-icon="tabler-world"
          required
          return-object
        >
          <template #item="{ props, item }">
            <VListItem v-bind="props">
              <template #prepend>
                <img
                  class="mr-2"
                  :src="`/content/images/flags/${item.raw.value?.toLowerCase()}.png`"
                >
              </template>
              <VListItemSubtitle>Code: {{ item.raw.value }}</VListItemSubtitle>
            </VListItem>
          </template>
        </VSelect>
      </VCol>
    </VRow>

    <!-- ── Full name ─────────────────────────────────────────── -->
    <VRow class="ma-0 pa-0">
      <VCol
        cols="12"
        md="6"
        class="pa-0 pr-md-4"
      >
        <VTextField
          v-model="name"
          label="Nombre *"
          variant="solo"
          :rules="nameRules"
          required
          autocomplete="name"
        />
      </VCol>
      <VCol
        cols="12"
        md="6"
        class="pa-0 mt-2 mt-md-0"
      >
        <VTextField
          v-model="surname"
          label="Apellido *"
          variant="solo"
          :rules="surnameRules"
          required
        />
      </VCol>
    </VRow>

    <!-- ── ID type + number ──────────────────────────────────── -->
    <VRow class="ma-0 pa-0 mt-4">
      <VCol
        cols="12"
        md="4"
        class="pa-0 pr-md-2"
      >
        <VSelect
          v-model="selectedIdType"
          :items="idTypeItems"
          label="Tipo de documento *"
          variant="solo"
          :rules="idTypeRules"

          required
        />
      </VCol>
      <VCol
        cols="12"
        md="8"
        class="pa-0 mt-2 mt-md-0"
      >
        <VTextField
          v-model="idNumber"
          :label="`N° de ${selectedIdType || 'documento'} *`"
          :placeholder="country.idPlaceholder"
          variant="solo"
          :rules="idNumberRules"
          required
          autocomplete="off"
          @input="handleRutInput"
        />
      </VCol>
    </VRow>

    <!-- ── Address line 1 ────────────────────────────────────── -->
    <VRow class="ma-0 pa-0 mt-4">
      <VCol
        cols="12"
        class="pa-0"
      >
        <VTextField
          v-model="addressLine1"
          label="Dirección *"
          placeholder="Calle, número, colonia..."
          variant="solo"
          :rules="addressRules"
          required
          autocomplete="address-line1"
        />
      </VCol>
    </VRow>

    <!-- ── Address line 2 (optional) ─────────────────────────── -->
    <VRow class="ma-0 pa-0">
      <VCol
        cols="12"
        class="pa-0"
      >
        <VTextField
          v-model="addressLine2"
          :label="country.addressLine2Label"
          variant="solo"
          autocomplete="address-line2"
        />
      </VCol>
    </VRow>

    <!-- ── Chile: ComunaAutocomplete + optional postal code ──── -->
    <VRow
      v-if="isChile"
      class="ma-0 pa-0"
    >
      <VCol
        cols="12"
        md="12"
        class="pa-0 pr-md-2"
      >
        <ComunaAutocomplete
          v-model="comuna"
          :items="stateItems"
          :label="`${country.stateLabel} *`"
          variant="solo"
          :rules="comunaRules"
          required
          autocomplete="address-level1"
        />
      </VCol>
    </VRow>

    <!-- ── Other countries: state + city ─────────────────────── -->
    <VRow
      v-else
      class="ma-0 pa-0"
    >
      <VCol
        cols="12"
        md="6"
        class="pa-0 pr-md-2"
      >
        <VAutocomplete
          v-model="state"
          :items="stateItems"
          :label="`${country.stateLabel} *`"
          variant="solo"
          :rules="stateRules"
          required
          autocomplete="address-level1"
        />
      </VCol>
      <VCol
        cols="12"
        md="6"
        class="pa-0 mt-2 mt-md-0"
      >
        <VTextField
          v-model="city"
          :label="`${country.cityLabel} *`"
          variant="solo"
          :rules="cityRules"
          required
          autocomplete="address-level2"
        />
      </VCol>
    </VRow>

    <!-- ── Postal code for non-CL countries that require it ──── -->
    <VRow
      v-if="country.hasPostalCode && !isChile"
      class="ma-0 pa-0 mt-4"
    >
      <VCol
        cols="12"
        class="pa-0"
      >
        <VTextField
          v-model="postalCode"
          :label="`${country.postalCodeLabel} *`"
          variant="solo"
          :rules="postalRules"
          :required="country.hasPostalCode"
          autocomplete="postal-code"
        />
      </VCol>
    </VRow>
  </VForm>
</template>

<style scoped>
.address-form {
  width: 100%;
}

.address-form :deep(.v-row) {
  margin-bottom: 0 !important;
}

.address-form :deep(.v-col) {
  padding-bottom: 16px !important;
}
</style>
