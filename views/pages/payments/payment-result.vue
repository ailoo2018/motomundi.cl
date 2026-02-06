<script setup lang="ts">
const props = defineProps({
  result: {
    type: Object,
    required: true,
  },
  loading: {
    type: Boolean,
  },
})

const cardData = computed( () => {
  if(props.result && props.result.responseData && props.result.responseData.card_detail){
    return props.result.responseData.card_detail.card_number
  }
  return ""
})

</script>

<template>
  <VContainer class="fill-height bg-grey-lighten-4 py-12">
    <VRow justify="center">
      <VCol
        cols="12"
        sm="8"
        md="8"
        lg="8"
      >
        <VCard
          v-if="loading"
          class="text-center pa-10"
          rounded="0"
          elevation="2"
        >
          <VProgressCircular
            indeterminate
            color="primary"
            size="64"
            width="6"
            class="mb-4"
          />
          <h2 class="text-h5 font-weight-bold">
            Validando Pago
          </h2>
          <p class="text-body-1 text-grey-darken-1">
            Por favor no cierres esta ventana...
          </p>
        </VCard>

        <VCard
          v-else-if="result?.success"
          class=" overflow-hidden"
          rounded="0"
          elevation="4"
        >
          <div class="bg-success pa-8 text-center text-white">
            <VAvatar
              color="white"
              size="70"
              class="mb-4 shadow-sm"
            >
              <VIcon
                class="tabler-circle-check text-white "
                size="48"
              />
            </VAvatar>
            <h1
              class="text-h4 font-weight-black"
              style="color: white"
            >
              ¡Pago Recibido!
            </h1>
            <p
              class="text-subtitle-1 opacity-90"
              style="color: white"
            >
              Tu transacción ha sido autorizada
            </p>
          </div>

          <VCardText class="pa-8">
            <VList
              lines="one"
              class="bg-transparent"
            >
              <VListItem class="px-0 py-2">
                <template #prepend>
                  <i class="ti ti-hash mr-4 text-grey" />
                </template>
                <VListItemTitle class="text-grey-darken-1">
                  Orden de Compra
                </VListItemTitle>
                <template #append>
                  <span class="font-weight-bold text-uppercase">{{ result.referenceId }}</span>
                </template>
              </VListItem>

              <VDivider />

              <VListItem class="px-0 py-2">
                <template #prepend>
                  <i class="ti ti-currency-dollar mr-4 text-grey" />
                </template>
                <VListItemTitle class="text-grey-darken-1">
                  Monto Total
                </VListItemTitle>
                <template #append>
                  <span class="text-h6 font-weight-black text-primary">{{ formatMoney(result.transactionAmount) }}</span>
                </template>
              </VListItem>

              <VDivider />

              <VListItem class="px-0 py-2">
                <template #prepend>
                  <i class="ti ti-credit-card mr-4 text-grey" />
                </template>
                <VListItemTitle class="text-grey-darken-1">
                  Tarjeta
                </VListItemTitle>
                <template #append>
                  <span class="font-weight-medium">•••• {{ cardData }}</span>
                </template>
              </VListItem>

              <VDivider />

              <VListItem class="px-0 py-2">
                <template #prepend>
                  <i class="ti ti-calendar-event mr-4 text-grey" />
                </template>
                <VListItemTitle class="text-grey-darken-1">
                  Fecha
                </VListItemTitle>
                <template #append>
                  <span class="text-body-2">{{ formatDate(new Date()) }}</span>
                </template>
              </VListItem>

              <VDivider />

              <VListItem class="px-0 py-2">
                <template #prepend>
                  <i class="ti ti-shield-check mr-4 text-grey" />
                </template>
                <VListItemTitle class="text-grey-darken-1">
                  Autorización
                </VListItemTitle>
                <template #append>
                  <span class="text-body-2 font-mono">{{ result.authorizationCode }}</span>
                </template>
              </VListItem>
            </VList>

            <div class="mt-8 d-flex flex-column ga-3">
              <VBtn
                color="primary"
                block
                size="large"
                rounded="0"
                variant="flat"
                to="/"
                class="text-none"
              >
                Continuar comprando
              </VBtn>
              <VBtn
                color="grey-lighten-4"
                block
                size="large"
                rounded="0"
                variant="flat"
                class="text-none"
                @click="downloadReceipt"
              >
                <template #prepend>
                  <i class="ti ti-download mr-1" />
                </template>
                Guardar Comprobante
              </VBtn>
            </div>
          </VCardText>
        </VCard>

        <VCard
          v-else
          class="overflow-hidden"
          rounded="0"
          elevation="4"
        >
          <div class="bg-primary    pa-8 text-center text-white">
            <VAvatar
              color="white"
              size="70"
              class="mb-4 shadow-sm"
            >
              <VIcon
                class="tabler-alert-circle-filled text-white"
                size="40"
                style="font-size: 48px;"
              />
            </VAvatar>
            <h1
              class="text-h4 font-weight-black"
              style="color: white;"
            >
              Pago Fallido
            </h1>
            <p
              class="text-subtitle-1 opacity-90"
              style="color: white;"
            >
              La transacción no pudo completarse
            </p>
          </div>

          <VCardText class="pa-8">
            <VAlert
              type="error"
              variant="tonal"
              class="mb-6 rounded-lg"
              border="start"
            >
              Hubo un problema con tu medio de pago. Por favor intenta nuevamente o usa una tarjeta distinta.
            </VAlert>

            <div class="d-flex flex-column ga-3">
              <VBtn
                color="primary"
                block
                size="large"
                rounded="0"
                variant="flat"
                to="/checkout"
                class="text-none"
              >
                Reintentar Pago
              </VBtn>
              <VBtn
                variant="text"
                block
                to="/"
                rounded="0"
                color="grey-darken-1"
                class="text-none"
              >
                <template #prepend>
                  <i class="ti ti-arrow-left mr-1" />
                </template>
                Volver al inicio
              </VBtn>
            </div>
          </VCardText>
        </VCard>
      </VCol>
    </VRow>
  </VContainer>
</template>

<style scoped>
/* Styling for Monospaced font in Auth Code */
.font-mono {
  font-family: 'Courier New', Courier, monospace;
}

/* Ensure icons align well with Vuetify list items */
.ti {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  vertical-align: middle;
}
</style>

