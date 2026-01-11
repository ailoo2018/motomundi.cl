<script setup lang="ts">
interface PaymentResult {
  success: boolean
  buyOrder: string
  amount: number
  authorizationCode: string
  cardNumber: string
  transactionDate: string
  responseCode: number
  paymentTypeCode?: string
  installmentsNumber?: number
}

const route = useRoute()
const loading = ref(true)
const result = ref<PaymentResult | null>(null)

onMounted(async () => {
  const token = route.query.token_ws as string
  if (!token) {
    loading.value = false
    return
  }

  try {
    result.value = await $fetch('/api/webpay/commit-transaction', {
      method: 'POST',
      body: { token }
    })
  } catch (error) {
    result.value = { success: false, buyOrder: '', amount: 0, authorizationCode: '', cardNumber: '', transactionDate: '', responseCode: -1 }
  } finally {
    loading.value = false
  }
})

const formatCurrency = (n: number) => new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP' }).format(n)

const formatDate = (dateString: string) => {
  if (!dateString) return 'N/A'
  return new Date(dateString).toLocaleString('es-CL', {
    dateStyle: 'medium',
    timeStyle: 'short'
  })
}

const getPaymentType = (code?: string) => {
  const types: Record<string, string> = {
    'VD': 'Venta Débito', 'VN': 'Venta Normal', 'VC': 'Venta en cuotas',
    'SI': '3 cuotas sin interés', 'VP': 'Venta Prepago'
  }
  return types[code || ''] || 'Tarjeta'
}
</script>

<template>
  <v-container class="fill-height bg-grey-lighten-4 py-12">
    <v-row justify="center">
      <v-col cols="12" sm="8" md="6" lg="5">

        <v-card v-if="loading" class="text-center pa-10 rounded-xl" elevation="2">
          <v-progress-circular indeterminate color="primary" size="64" width="6" class="mb-4" />
          <h2 class="text-h5 font-weight-bold">Validando Pago</h2>
          <p class="text-body-1 text-grey-darken-1">Por favor no cierres esta ventana...</p>
        </v-card>

        <v-card v-else-if="result?.success" class="rounded-xl overflow-hidden" elevation="4">
          <div class="bg-success pa-8 text-center text-white">
            <v-avatar color="white" size="70" class="mb-4 shadow-sm">
              <i class="ti ti-circle-check text-success" style="font-size: 48px;"></i>
            </v-avatar>
            <h1 class="text-h4 font-weight-black" style="color: white">¡Pago Recibido!</h1>
            <p class="text-subtitle-1 opacity-90" style="color: white">Tu transacción ha sido autorizada</p>
          </div>

          <v-card-text class="pa-8">
            <v-list lines="one" class="bg-transparent">
              <v-list-item class="px-0 py-2">
                <template v-slot:prepend><i class="ti ti-hash mr-4 text-grey"></i></template>
                <v-list-item-title class="text-grey-darken-1">Orden de Compra</v-list-item-title>
                <template v-slot:append><span class="font-weight-bold text-uppercase">{{ result.buyOrder }}</span></template>
              </v-list-item>

              <v-divider />

              <v-list-item class="px-0 py-2">
                <template v-slot:prepend><i class="ti ti-currency-dollar mr-4 text-grey"></i></template>
                <v-list-item-title class="text-grey-darken-1">Monto Total</v-list-item-title>
                <template v-slot:append><span class="text-h6 font-weight-black text-primary">{{ formatCurrency(result.amount) }}</span></template>
              </v-list-item>

              <v-divider />

              <v-list-item class="px-0 py-2">
                <template v-slot:prepend><i class="ti ti-credit-card mr-4 text-grey"></i></template>
                <v-list-item-title class="text-grey-darken-1">Tarjeta</v-list-item-title>
                <template v-slot:append><span class="font-weight-medium">•••• {{ result.cardNumber }}</span></template>
              </v-list-item>

              <v-divider />

              <v-list-item class="px-0 py-2">
                <template v-slot:prepend><i class="ti ti-calendar-event mr-4 text-grey"></i></template>
                <v-list-item-title class="text-grey-darken-1">Fecha</v-list-item-title>
                <template v-slot:append><span class="text-body-2">{{ formatDate(result.transactionDate) }}</span></template>
              </v-list-item>

              <v-divider />

              <v-list-item class="px-0 py-2">
                <template v-slot:prepend><i class="ti ti-shield-check mr-4 text-grey"></i></template>
                <v-list-item-title class="text-grey-darken-1">Autorización</v-list-item-title>
                <template v-slot:append><span class="text-body-2 font-mono">{{ result.authorizationCode }}</span></template>
              </v-list-item>
            </v-list>

            <div class="mt-8 d-flex flex-column ga-3">
              <v-btn color="primary" block size="large" rounded="lg" variant="flat" to="/" class="text-none">
                Continuar comprando
              </v-btn>
              <v-btn color="grey-lighten-4" block size="large" rounded="lg" variant="flat" class="text-none" @click="downloadReceipt">
                <template v-slot:prepend><i class="ti ti-download mr-1"></i></template>
                Guardar Comprobante
              </v-btn>
            </div>
          </v-card-text>
        </v-card>

        <v-card v-else class="rounded-xl overflow-hidden" elevation="4">
          <div class="bg-error pa-8 text-center text-white">
            <v-avatar color="white" size="70" class="mb-4 shadow-sm">
              <i class="ti ti-circle-x text-error" style="font-size: 48px;"></i>
            </v-avatar>
            <h1 class="text-h4 font-weight-black">Pago Fallido</h1>
            <p class="text-subtitle-1 opacity-90">La transacción no pudo completarse</p>
          </div>

          <v-card-text class="pa-8">
            <v-alert type="error" variant="tonal" class="mb-6 rounded-lg" border="start">
              Hubo un problema con tu medio de pago. Por favor intenta nuevamente o usa una tarjeta distinta.
            </v-alert>

            <div class="d-flex flex-column ga-3">
              <v-btn color="error" block size="large" rounded="lg" variant="flat" to="/checkout" class="text-none">
                Reintentar Pago
              </v-btn>
              <v-btn variant="text" block to="/" color="grey-darken-1" class="text-none">
                <template v-slot:prepend><i class="ti ti-arrow-left mr-1"></i></template>
                Volver al inicio
              </v-btn>
            </div>
          </v-card-text>
        </v-card>

      </v-col>
    </v-row>
  </v-container>
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
