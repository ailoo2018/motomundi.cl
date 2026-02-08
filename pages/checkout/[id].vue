
<script setup>
import { ref, computed } from 'vue'
import { PaymentMethods } from "@/models/index.js"

// Props - allow parent component to pass data
const props = defineProps({
  items: {
    type: Array,
    default: () => [
      {
        name: 'Casco Integral HJC i70',
        description: 'Talla: L | Color: Negro Mate',
        quantity: 1,
        price: 189990,
        image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop',
      },
      {
        name: 'Guantes Alpinestars SMX-1 Air V2',
        description: 'Talla: M | Color: Negro/Rojo',
        quantity: 1,
        price: 49990,
        image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=400&fit=crop',
      },
      {
        name: 'Aceite Motul 7100 10W-40',
        description: 'Sintético 4T | 4 Litros',
        quantity: 2,
        price: 59980,
        image: 'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=400&h=400&fit=crop',
      },
    ],
  },
  shippingCost: {
    type: Number,
    default: 5000,
  },
})

const route = useRoute()

const selectedCountry = ref()
const selectedCurrency = ref()

const countries = [
  { id: "AR", name: "Argentina" },
  { id: "BR", name: "Brazil" },
  { id: "CL", name: "Chile" },
  { id: "CO", name: "Colombia" },
]

const currenciesMap = {
  "AR": ["ARS", "USD"],
  "BR": ["BRL", "USD"],
  "CL": ["CLP", "USD"],
  "CO": ["COL", "USD"],
}

const currencies = computed(() => {
  if(selectedCountry.value) {
    return currenciesMap[selectedCountry.value]
  }

  return ["USD", "EUR"]
})


const webpayToken = ref("")
const webpayUrl = ref("")
const webpayForm = ref(null)
const error = ref()

const invoiceId = parseInt(route.params.id)
console.log("checkout quick: " + invoiceId)

const invoice = await $fetch("/api/invoices/" + invoiceId, {
  key: 'find-invoice-' + invoiceId,
})

console.log("invoice: " + invoice)

// Emits - allow parent component to listen to events
const emit = defineEmits(['payment-selected', 'payment-processed'])

definePageMeta({
  layout: 'blank',
  public: true,

})

const shipping = ref(props.shippingCost)

// Payment methods
const paymentMethods = ref([
  {
    id: 15,
    name: 'MercadoPago',
    description: 'Tarjetas de crédito y débito',
    color: '#009EE3',
  },
  {
    id: 8,
    name: 'WebPay',
    description: 'Transbank - Tarjetas chilenas',
    color: '#00A84F',
  },
  {
    id: 19,
    name: 'Compras Internacionales',
    description: 'DLocal - Compras Internacionales',
    color: '#006cfa',
  },
])

const selectedPayment = ref(null)

// Computed properties
const subtotal = computed(() => {
  return props.items.reduce((sum, item) => sum + item.price, 0)
})

const total = computed(() => {
  return subtotal.value + shipping.value
})

const buttonText = computed(() => {
  if (!selectedPayment.value) {
    return 'Selecciona un método de pago'
  }
  const method = paymentMethods.value.find(m => m.id === selectedPayment.value)
  
  return `Pagar con ${method?.name}`
})


const selectPayment = methodId => {
  selectedPayment.value = methodId
//  emit('payment-selected', methodId)
}

const processPayment = async () => {
  if (!selectedPayment.value) {
    alert('Por favor selecciona un método de pago')
    
    return
  }

  const method = paymentMethods.value.find(m => m.id === selectedPayment.value)

  const rq = {
    paymentMethodId: method.id,
    referenceId: "invoice-" + invoiceId,
    country: selectedCountry.value || null,
    currency: selectedCurrency.value || "CLP",
  }

  const { data, error: fetchError } = await useFetch( '/api/invoices/pay-invoice', {
    credentials: 'include',
    method: 'POST',
    headers: {},
    body: JSON.stringify(rq),
    async onResponseError({ response }) {
      const errorData = response._data  // or response.body

      console.log('Error data:', errorData)
      if(errorData)
        alert("Error " + errorData.message )
    },
  })

  if (fetchError.value) {
    error.value = (fetchError.value)

    return
  }

  if (data.value.error != null) {
    error.value = (data.value.error)

    return
  }

  window.location = data.value.paymentUrl


}
</script>

<template>
  <VApp>
    <VMain class="quick-payment-page">
      <VContainer class="pa-4">
        <VCard
          class="mx-auto payment-container"
          max-width="600"
          elevation="10"

        >
          <!-- Header -->
          <VCardTitle class="header pa-8 text-center">
            <div class="w-100">
              <VImg
                src="https://www.motomundi.cl/logo-motomundi.png"
                alt="Motomundi"
                max-width="350"
                class="mx-auto mb-4"
                contain
              />
              <p
                class="text-subtitle-1 text-white mb-0"
                style="opacity: 0.95;"
              >
                Resumen de OC #{{invoice.number}}
              </p>
            </div>
          </VCardTitle>

          <!-- Content -->
          <VCardText class="pa-6 pa-sm-8">
            <!-- Products Section -->
            <div class="mb-8">
              <h2 class="section-title mb-4">
                Productos
              </h2>

              <div class="items-list">
                <VCard
                  v-for="(item, index) in invoice.items.filter(i => i.type === 0)"
                  :key="index"
                  class="item-card mb-3"
                  elevation="0"
                >
                  <VCardText class="pa-4">
                    <div class="d-flex align-start">

                      <img
                        :src="getImageUrl(item.productItem?.image, 300, getDomainId())"
                        :alt="item.name"
                        class="mr-3"
                        width="100"
                        height="100"
                      />

                      <div class="flex-grow-1">
                        <div class="item-name mb-1">
                          {{ item.product.fullName }}
                        </div>
                        <div class="item-description mb-1">
                          {{ item.productItem.name }}
                        </div>
                        <div class="item-quantity">
                          Cantidad: {{ item.quantity }}
                        </div>
                      </div>

                      <div class="item-price ml-4 flex-shrink-0">
                        {{ formatMoney(item.price, true) }}
                      </div>
                    </div>
                  </VCardText>
                </VCard>
              </div>
            </div>

            <!-- Summary -->
            <VCard
              class="summary-card mb-8"
              elevation="0"
              rounded="lg"
            >
              <VCardText class="pa-5">
                <div class="d-flex justify-space-between mb-3">
                  <span>Subtotal</span>
                  <span>{{ formatMoney(invoice.netTotal) }}</span>
                </div>
                <div class="d-flex justify-space-between mb-3">
                  <span>Envío</span>
                  <span>{{ formatMoney(invoice.shipping, true) }}</span>
                </div>
                <VDivider class="my-4" />
                <div class="d-flex justify-space-between summary-total">
                  <span class="font-weight-bold">Total</span>
                  <span class="font-weight-bold text-primary">{{ formatMoney(invoice.total) }}</span>
                </div>
              </VCardText>
            </VCard>

            <!-- Payment Methods -->
            <div class="mb-8">
              <h2 class="section-title mb-4">
                Método de Pago
              </h2>

              <VCard
                v-for="method in paymentMethods"
                :key="method.id"
                class="payment-option mb-3"
                :class="{ 'selected': selectedPayment === method.id }"
                elevation="0"
                rounded="lg"
                @click="selectPayment(method.id)"
              >
                <VCardText class="pa-5">
                  <div class="d-flex align-center">
                    <div class="payment-radio mr-4">
                      <div
                        v-if="selectedPayment === method.id"
                        class="radio-inner"
                      />
                    </div>

                    <div class="flex-grow-1">
                      <div class="payment-name mb-1">
                        {{ method.name }}
                      </div>
                      <div class="payment-description">
                        {{ method.description }}
                      </div>
                    </div>

                    <div class="payment-logo-container ml-4">
                      <VChip
                        :color="method.color"
                        variant="flat"
                        size="large"
                      >
                        <span class="font-weight-bold text-white">{{ method.name }}</span>
                      </VChip>
                    </div>
                  </div>


                  <div v-if="method.id === 19 && selectedPayment === 19">
                    <AppSelect
                      v-model="selectedCountry"
                      :items="countries"
                      item-title="name"
                      item-value="id"
                      label="País"
                      placecholder="Seleccione país"
                    />
                    <AppSelect
                      v-model="selectedCurrency"
                      :items="currencies"
                      label="Moneda"
                      placecholder="Seleccione moneda"
                    />
                  </div>

                </VCardText>
              </VCard>

            </div>


            <VAlert v-if="error" color="warning">
              {{error}}
            </VAlert>
            <!-- CTA Button -->
            <VBtn
              block
              size="x-large"
              color="primary"
              :disabled="!selectedPayment"
              rounded="0"
              elevation="4"
              @click="processPayment"
            >
              <IconLock
                class="mr-2"
                :size="20"
              />
              {{ buttonText }}
            </VBtn>

            <!-- Secure Badge -->
            <div class="secure-badge text-center mt-4">
              <IconShieldCheck
                class="mr-2"
                :size="16"
              />
              <span>Pago 100% seguro y encriptado</span>
            </div>
          </VCardText>

          <!-- Footer -->
          <VCardText class="footer text-center pa-5">
            <p class="mb-2">
              ¿Necesitas ayuda? Contáctanos al WhatsApp
            </p>
            <p class="mb-0">
              <a
                href="https://www.motomundi.cl"
                target="_blank"
                class="text-decoration-none"
              >
                www.motomundi.cl
              </a>
            </p>
          </VCardText>
        </VCard>
      </VContainer>
    </VMain>


  </VApp>
</template>

<style scoped>
.quick-payment-page {
  background: linear-gradient(135deg, #f5f5f5 0%, #e8e8e8 100%);
  min-height: 100vh;
}

.payment-container {
  overflow: hidden;
}

.header {
  background: #c74044 !important;
  color: white;
}

.section-title {
  font-size: 18px;
  font-weight: 600;
  color: #1a1a1a;
  padding-bottom: 8px;
  border-bottom: 2px solid #f0f0f0;
}

.item-card {
  background: #f9f9f9;
  transition: all 0.2s;
  cursor: default;
}

.item-card:hover {
  background: #f5f5f5;
  transform: translateX(4px);
}

.item-image {
  border: 1px solid #e0e0e0;
  background: white;
}

.item-name {
  font-weight: 600;
  font-size: 15px;
  color: #1a1a1a;
}

.item-description {
  font-size: 13px;
  color: #666;
}

.item-quantity {
  font-size: 13px;
  color: #888;
}

.item-price {
  font-weight: 700;
  font-size: 16px;
  color: #c74044;
  white-space: nowrap;
}

.summary-card {
  background: #f9f9f9;
}

.summary-total {
  font-size: 20px;
}

.text-primary {
  color: #c74044 !important;
}

.payment-option {
  border: 2px solid #e0e0e0;
  cursor: pointer;
  transition: all 0.3s;
}

.payment-option:hover {
  border-color: #c74044;
  background: #fff5f6 !important;
}

.payment-option.selected {
  border-color: #c74044;
  background: #fff5f6 !important;
  box-shadow: 0 4px 12px rgba(214, 0, 28, 0.15) !important;
}

.payment-radio {
  width: 24px;
  height: 24px;
  border: 2px solid #ccc;
  border-radius: 50%;
  position: relative;
  transition: all 0.3s;
  flex-shrink: 0;
}

.payment-option.selected .payment-radio {
  border-color: #c74044;
}

.radio-inner {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 12px;
  height: 12px;
  background: #c74044;
  border-radius: 50%;
}

.payment-name {
  font-weight: 600;
  font-size: 16px;
  color: #1a1a1a;
}

.payment-description {
  font-size: 13px;
  color: #666;
}

.secure-badge {
  display: flex;
  align-items: center;
  justify-content: center;
  color: #666;
  font-size: 13px;
}

.footer {
  color: #888;
  font-size: 13px;
  border-top: 1px solid #f0f0f0;
}

.footer a {
  color: #666;
}

.footer a:hover {
  color: rgb(var(--v-theme-primary));
}

/* Vuetify overrides */
:deep(.v-btn.v-btn--disabled) {
  background-color: #ccc !important;
}

:deep(.v-btn:not(.v-btn--disabled)) {
  background-color: var(--v-theme-primary) ;
}


@media (max-width: 600px) {
  .item-price {
    margin-left: 0 !important;
    width: 100%;
    text-align: right;
    margin-top: 8px;
  }

  .item-image {
    width: 70px !important;
    height: 70px !important;
  }
}
</style>
