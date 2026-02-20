<script setup lang="ts">
definePageMeta({
  alias: '/cuenta/perfil',
  layout: 'account',
  middleware: 'auth', // Must match the filename (auth.ts)
})
const route = useRoute()
const addressId = route.query.id
const error = ref()
const address = ref({ id: 0 })

if(addressId > 0) {
  const {data} = useFetch("/api/account/addresses/" + addressId)

  watch(data, (val) => {
    if (val) address.value = { ...val }
  }, { immediate: true })

}




const loading = ref(false)


/*
const address = computed(() => {
  return data?.value || null
})
*/

// Validation Rules
const rules = {
  required: (value: any) => !!value || 'Este campo es obligatorio',
  min: (v: string) => v.length >= 3 || 'Mínimo 3 caracteres',
  phone: (v: string) => /^\+?[\d\s]{8,}$/.test(v) || 'Formato de teléfono inválido',
}

// Reference to the form instance
const addressForm = ref<any>(null)

const saveAddress = async () => {
  // Trigger Vuetify validation
  const { valid } = await addressForm.value.validate()

  if (valid) {

    try {
      error.value = null
      loading.value = true
      // Your API logic here...
      const result = await $fetch("/api/account/addresses/" + address.value.id, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: address.value
      })

      navigateTo("/account/addresses")
    }catch(e){
      error.value = e.message
    }finally{
      loading.value = false
    }
  } else {
    console.log("Form has errors")
  }
}


</script>

<template>
  <VContainer>

    <VAlert v-if="error" color="warning">
      {{error}}
    </VAlert>
    <div v-if="address != null" class=" account__content">
      <div class="account__content-block">
        <div class="account__content-block-title"  >
          <h1 class="account__title" >
            <svg width="30" height="30" xmlns="http://www.w3.org/2000/svg" class="icon sprite-line-icons"
                 >
              <use href="/content/svg/motomundi.svg#i-account-address"
                   xlink:href="/content/svg/motomundi.svg#i-account-address"
                   ></use>
            </svg>
            {{ address.id > 0 ? 'Actualizar dirección' : 'Añadir dirección' }}
          </h1>

        </div>
        <VForm ref="addressForm" @submit.prevent="saveAddress" class="address-form">

          <div class="account__content-block-content pb-3 mb-3" style="border-bottom: 1px solid #ccc;">
            <div class="input-field half">
              <AppTextField
                v-model="address.alias"
                label="Alias"
                placeholder="eje: Casa"
                :rules="[rules.required]"
              />
            </div>
          </div>

          <div class="account__content-block-content">
            <div class="input-field half">
              <AppTextField
                v-model="address.fname"
                label="Nombre"
                :rules="[rules.required]"
              />
            </div>
            <div class="input-field half">
              <AppTextField
                v-model="address.lname"
                label="Apellidos"
                :rules="[rules.required]"
              />
            </div>
            <div class="input-field half">
              <AppTextField
                v-model="address.rut"
                label="RUT / DNI"
                :rules="[rules.required]"
              />
            </div>
            <div class="input-field half">
              <AppTextField
                v-model="address.phone"
                label="Teléfono"
                :rules="[rules.required, rules.phone]"
              />
            </div>
            <div class="input-field">
              <AppTextField
                v-model="address.address"
                label="Dirección"
                :rules="[rules.required]"
              />
            </div>
            <div class="input-field">
              <AppTextField
                v-model="address.address2"
                label="Dirección 2"

              />
            </div>

            <div class="input-field two-third">
              <ComunaAutocomplete
                v-model="address.comuna"
                label="Comuna"
                placeholder="Comuna"
                variant="outlined"
                show-label
                :rules="[v => !!v || 'Selecciona una comuna']"
              />
            </div>

            <div class="input-field third">
              <AppTextField
                v-model="address.postalCode"
                label="Código Postal"
              />
            </div>
          </div>

          <div class="account__content-block-content mt-8">
            <VBtn variant="outlined" color="secondary" @click="navigateTo('/account/addresses')" rounded="0">
              Cancelar
            </VBtn>
            <VBtn
              type="submit"
              class="ml-2"
              color="#000"
              rounded="0"
              :loading="loading"
            >
              Guardar cambios
            </VBtn>
          </div>
        </VForm>
      </div>
    </div>
  </VContainer>
</template>
<style>
.account__content-block .account__content-block-title {
  align-items: flex-start;
  border-bottom: 1px solid #000;
  display: flex;
  justify-content: space-between;
  margin-bottom: 5px;
  padding-bottom: 5px;
}

.account__content-block .account__content-block-header {
  align-items: center;
  display: flex;
  justify-content: space-between;
  margin-bottom: 40px;
}

.address-form .account__content-block-content {
  display: flex;
  flex-wrap: wrap;
}

.address-form .account__content-block-content .input-field {
  box-sizing: border-box;
  flex-basis: 100%;
  padding-right: 10px;
  margin-top: 10px;
}

.address-form .account__content-block-content .input-field {
  box-sizing: border-box;
  flex-basis: 100%;
  padding-right: 10px;
}

@media only screen and (min-width: 601px) and (max-width: 992px) {
  .account__content-block .account__content-block-header {
    margin-bottom: 20px;
  }
}

@media only screen and (min-width: 601px) {
  .address-form .account__content-block-content .input-field.two-third {
    flex-basis: 66.66%;
  }
}

@media only screen and (min-width: 601px) {
  .address-form .account__content-block-content .input-field.third {
    flex-basis: 33.33%;
  }
}

@media only screen and (min-width: 601px) {
  .address-form .account__content-block-content .input-field.half {
    flex-basis: 50%;
  }
}

@media only screen and (min-width: 601px) {
  .account__content-block .account__content-block-title {
    border-bottom: none;
  }
}


.account span.btn.btn-default.form-control.ui-select-toggle {
  border: 1px solid black;
  width: 100%;
  height: 48px;
}
</style>


