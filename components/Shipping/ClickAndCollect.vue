<script setup lang="ts">
import { ref } from "vue"
import AppSelect from "~/@core/components/app-form-elements/AppSelect.vue"
import { formatDeliveryDateRange, isEntre } from "../../@core/utils/formatters"

const props = defineProps({
  store: {
    type: Object,
    required: false,
    default: null,
  },
  pickupOption: {
    type: String,
    required: false,
  },
  shippingMethod: {
    type: Object,
    required: false,
  },
})

const emit = defineEmits(['storeSelected'])
const clickAndCollectStores = ref([])
const loading = ref(false)
const error = ref('')
const selectedStore = ref(null)
const config = useRuntimeConfig()
const pickupDate = ref('')
const loadingPickupDate = ref(false)
const selectedPickupOption = ref('')
const has2HourPickup = ref(false)


if(props.pickupOption){
  selectedPickupOption.value = props.pickupOption
  if(selectedPickupOption.value === 'pickup_in_2_hours')
    has2HourPickup.value = true
}

if(props.store && props.store.id > 0) {
  selectedStore.value = structuredClone(toRaw(props.store))
}

watch(selectedStore, async () => {
  console.log('Selected store: ' + selectedStore.value?.id)

  if(selectedStore.value && selectedStore.value.id > 0) {

    await getPickupDate(selectedStore.value.id)
  }

  emit('storeSelected', selectedStore.value, selectedPickupOption.value)
})


watch(selectedPickupOption, async () => {
  emit('storeSelected', selectedStore.value, selectedPickupOption.value)
})


const getPickupDate = async facilityId => {
  try {
    loadingPickupDate.value = true

    const data = await $fetch( '/api/checkout/pickup-date?facilityId=' + facilityId, {
      credentials: 'include',
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    })

    if (data) {
      pickupDate.value = data.description

      if(data.availableIn2Hours){
        selectedPickupOption.value = 'pickup_in_2_hours'
        has2HourPickup.value = true
      }else{
        selectedPickupOption.value = 'pickup_here'
        has2HourPickup.value = false
      }

    }
  }finally {
    loadingPickupDate.value = false
  }
}

const listStores = async () => {
  loading.value = true
  error.value = null
  try {
    const response = await fetch('/api/checkout/click-collect')
    if (!response.ok) {
      throw new Error('Failed to fetch countries')
    }
    const data = await response.json()

    clickAndCollectStores.value = data.stores
  } catch (err) {
    console.error('Error fetching countries:', err)
    error.value = 'Failed to load countries. Please try again later.'
  } finally {
    loading.value = false
  }
}


onMounted(() => {
  listStores()
})
</script>

<template>
  <div
    class="click-and-collect"
    show-address="true"
  >
    <div class="input__group">
      <div class="motomundi-select select--light select--small">
        <VSelect
          v-model="selectedStore"
          placeholder="Seleccione tienda"
          :items="clickAndCollectStores"
          item-value="id"
          item-title="title"

          class="custom-select"

          return-object
        >
          <template #selection="{ item }">
            <div style="overflow: hidden;white-space: nowrap;">
              <strong class="mr-2">{{ item ? item.raw.name : '' }} ({{ item.raw.comuna != null ? item.raw.comuna.name : '' }})</strong>
              <span>{{ item.raw.address }}</span>
            </div>
          </template>

          <template #item="{ props, item }">
            <VListItem v-bind="props">
              <VListItemSubtitle>{{ item.raw.address }}</VListItemSubtitle>
            </VListItem>
          </template>
        </VSelect>
      </div>
    </div>
    <div class="click-and-collect__selected-store">
      <div class="click-and-collect__options">
        <div
          class="input__group radio "
          :class="{ 'disabled' : !has2HourPickup}"
        >
          <input
            id="pickup_in_2_hours"
            v-model="selectedPickupOption"
            type="radio"
            name="click-and-collect__options"
            value="pickup_in_2_hours"
            :disabled="!has2HourPickup"
          > <label for="pickup_in_2_hours">Recogida express: En 2 horas*  {{ !has2HourPickup ? '(no disponible)' : '' }}</label>
        </div>
        <div class="input__group radio">
          <input
            id="pickup_here"
            v-model="selectedPickupOption"
            type="radio"

            name="click-and-collect__options"
            value="pickup_here"
          >
          <span v-if="loadingPickupDate">Cargando...</span>
          <label
            v-if="!loadingPickupDate"
            for="pickup_here"
          >Recógelo {{ isEntre( props.shippingMethod.eta ) }} <strong>{{ formatDeliveryDateRange( props.shippingMethod.eta ) }}</strong>.
            Te avisaremos cuando esté preparado.</label>
        </div>
      </div>
      <div class="click-and-collect__notice">
        <p>
          * Recogida express
          en 2 horas desde apertura de la tienda. Consulta los horarios de las tiendas
          <a
            href="https://www.motomundi.cl/tiendas/"
            target="_blank"
          >aquí</a>
        </p>
        <p style="display: none;">
          * Descuento en la próxima compra no válido para recogidas express
        </p>
      </div>
    </div>
    <div class="error" />
  </div>
</template>

<style scoped>
.custom-select{
  background-color: white;
  margin-bottom: 25px;
}

.v-field--variant-filled.v-field--focused .v-field__overlay {
  opacity: 1;
}

@media (hover: hover) {
  .v-field--variant-filled:hover .v-field__overlay {
    opacity: 1;
  }
}

@media (hover: hover) {
  .v-field--variant-filled:hover .v-field__overlay {
    opacity: 1;
  }
}

.v-field--variant-filled:hover .v-field__overlay {
  opacity: 1;
}
</style>
