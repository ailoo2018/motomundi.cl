<script setup>
const enableSearch = ref(false)
const enableModels = ref(false)
const enableYears = ref(false)

const selectedBrand = ref()
const selectedModel = ref()
const selectedYear = ref()

const router = useRouter()
const models = ref([])
const years = ref([])

const props = defineProps({
  asRow: {
    type: Boolean,
    default: false,
  }
})

watch(selectedBrand, async () => {
  if(selectedBrand.value) {

    const modelsRs = await $fetch("/api/motorcycles/models?brandId=" + selectedBrand.value.id)
    models.value = modelsRs

    enableModels.value = true
  }else{
    enableModels.value = false
  }
})

watch(selectedModel, async () => {
  if(selectedBrand.value) {
    enableYears.value = true
    const yearsRs = await $fetch("/api/motorcycles/years", {
      query: { brandId: selectedBrand.value.id, modelId: selectedModel.value.id }
    })
    years.value = yearsRs
  }else{
    enableYears.value = false
  }
})

watch(selectedYear, () => {
  if(selectedBrand.value) {
    enableSearch.value = true
  }else{
    enableSearch.value = false
  }
})




const marcas = await $fetch("/api/motorcycles/manufacturers", {
  key: 'motorcycles-manufacturers'
})


const filterMotorbikeProducts = () => {
  console.log("filterMotorbikeProducts")
  router.push({
    path: '/products/list',
    query: {
      bikeManufacturer: selectedBrand.value?.id,
      bikeModel: selectedModel.value?.id,
      bikeYear: selectedYear.value?.id,
    },
  })
}
</script>

<template>
  <div
    class="bike-selector-wrapper"
    style="padding-right: 12px;"
  >

    <VForm>

      <div :class="asRow ? 'responsive-grid-row' : 'responsive-grid'">
        <div class="grid-item">
          <VSelect
            v-model="selectedBrand"
            :items="marcas"
            item-title="name"
            item-value="id"
            return-object
            attach
            class="w-100"
            style="min-width: 200px"
            :menu-props="{ translateY: '0' }"
            placeholder="SELECCIONE MARCA"
          >
            <template #prepend-inner>
              <div class="step-number">
                1
              </div>
            </template>
          </VSelect>
        </div>
        <div class="grid-item" >
          <VSelect
            v-model="selectedModel"
            :items="models"
            item-title="name"
            :disabled="!enableModels"
            item-value="id"
            return-object
            attach
            placeholder="SELECCIONE MODELO"
            class="w-100"
            style="min-width: 200px"
          >
            <template #prepend-inner>
              <div class="step-number">
                2
              </div>
            </template>
          </VSelect>
        </div>
        <div class="grid-item"        >
          <VSelect
            v-model="selectedYear"
            :items="years"
            :disabled="!enableYears"
            item-title="name"
            item-value="id"
            return-object
            attach
            placeholder="SELECCIONE AÑOS"
            class="w-100"
            style="min-width: 200px"
          >
            <template #prepend-inner>
              <div class="step-number">
                3
              </div>
            </template>
          </VSelect>
        </div>
        <div class="grid-item">
          <VBtn
            class="button mc expanded sm w-100"
            :disabled="!enableSearch"
            :rounded="0"
            color="#c74044"
            @click="filterMotorbikeProducts"
          >
            Buscar
          </VBtn>
        </div>
      </div>
    </VForm>
  </div>
</template>

<style >

/* 1. Define the container context */
.bike-selector-wrapper {
  container-type: inline-size;
  container-name: bikeSelector;
  width: 100%;
}

/* 2. Default Mobile/Small Container Style (Vertical) */
.responsive-grid {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.responsive-grid-row {
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  gap: 12px;
}

.responsive-grid-row  .grid-item {
  flex: 1; /* Distributes 25% width to each of the 4 items */
  min-width: 0;
}

@container bikeSelector (min-width: 600px) {
  .responsive-grid {
    flex-direction: row;
    align-items: flex-start;
  }

  .grid-item {
    flex: 1; /* Distributes 25% width to each of the 4 items */
    min-width: 0;
  }
}

/*
input.v-input__control{
  border: 1px solid black;
  border-radius: 0px;
}
*/

.bike-search .h3 {
  display: block;
  font-size: 14px;
  font-weight: 900;
  line-height: 16px;
  margin: 0 auto 20px;
  text-align: left;
  text-transform: uppercase;
}

/* Styling for the step circle */
.step-number {
  background-color: #000;
  color: #fff;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 10px;
  font-weight: bold;
  margin-right: 8px;
}


.v-field--has-placeholder .step-number {
  background-color: black; /* Vuetify primary blue */
  color: white;
}
</style>

