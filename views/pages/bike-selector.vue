<script setup>
const enableSearch = ref(false)
const enableModels = ref(false)
const enableYears = ref(false)

const selectedBrand = ref()
const selectedModel = ref()
const selectedYear = ref()

watch(selectedBrand, () => {
  if(selectedBrand.value) {
    enableModels.value = true
  }else{
    enableModels.value = false
  }
})

watch(selectedModel, () => {
  if(selectedBrand.value) {
    enableYears.value = true
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

const marcas = [
  { id: 1, name: "BMW" },
  { id: 2, name: "Aprilia" },
]

const models = [
  { id: 1, name: "BMW GS1200" },
  { id: 2, name: "Aprilia Shiver 750" },
]

const years = [
  { id: 2019, name: "2019" },
  { id: 2020, name: "2020" },
]
</script>

<template>
  <div
    class="mt-8"
    style="padding-right: 12px;"
  >
    <VForm>
      <VRow>
        <VCol
          cols="12"
          class="ma-0 pa-0 pb-2"
        >
          <VSelect
            v-model="selectedBrand"
            :items="marcas"
            item-title="name"
            item-value="id"
            return-object
            attach
            :menu-props="{ translateY: '0' }"
            placeholder="SELECCIONE MARCA"
          >
            <template #prepend-inner>
              <div class="step-number">
                1
              </div>
            </template>
          </VSelect>
        </VCol>
        <VCol
          cols="12"
          class="ma-0 pa-0 pb-2"
        >
          <VSelect
            v-model="selectedModel"
            :items="models"
            item-title="name"
            :disabled="!enableModels"
            item-value="id"
            return-object
            attach
            placeholder="SELECCIONE MODELO"
          >
            <template #prepend-inner>
              <div class="step-number">
                2
              </div>
            </template>
          </VSelect>
        </VCol>
        <VCol
          cols="12"
          class="ma-0 pa-0 pb-2"
        >
          <VSelect
            v-model="selectedYear"
            :items="years"
            :disabled="!enableYears"
            item-title="name"
            item-value="id"
            return-object
            attach
            placeholder="SELECCIONE AÑOS"
          >
            <template #prepend-inner>
              <div class="step-number">
                3
              </div>
            </template>
          </VSelect>
        </VCol>

        <VCol
          cols="12"
          class="ma-0 pa-0  pb-2"
        >
          <VBtn
            class="button mc expanded sm"
            :disabled="!enableSearch"
            :rounded="0"
            color="#c74044"
            style="margin-top: 8px; width:100%;"
            ng-click="filterMotorbikeProducts($event)"
            data-base-url="/accesorios-moto"
          >
            Buscar
          </VBtn>
        </VCol>
      </vrow>
    </VForm>
  </div>
</template>

<style>
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

/* Optional: Highlight the number when the field is filled */
.v-field--has-placeholder .step-number {
  background-color: black; /* Vuetify primary blue */
  color: white;
}
</style>

