<script setup lang="ts">
import { ref, computed } from 'vue'
import OrderShippingAddress from "@/views/pages/account/orders/OrderShippingAddress.vue";
import OrderReturn from "@/views/pages/account/orders/OrderReturn.vue";

definePageMeta({
  layout: 'account',
  middleware: 'auth',
})

const route = useRoute()
const { data, error, pending } = useFetch('/api/account/orders/' + route.params.id)
const order = data

// ── Helpers ──────────────────────────────────────────────────────────────────

const getStatusDescription = (statusId: number) =>
  useOrderStatus().getOrderStatusDescription(statusId)

/** Maps a status ID to the stepper step index (0-based) */
const currentStep = computed(() => {
  const id = order.value?.state
  if (!id) return 0
  if (id <= 1)  return 0  // Confirmado
  if (id <= 3)  return 1  // En preparación
  if (id <= 5)  return 2  // En camino
  return 3                  // Entregado
})

const steps = [
  { icon: 'tabler-circle-check',     label: 'Confirmado'     },
  { icon: 'tabler-package',          label: 'En preparación' },
  { icon: 'tabler-truck-delivery',   label: 'En camino'      },
  { icon: 'tabler-home-check',       label: 'Entregado'      },
]

const copied = ref(false)
const copyTracking = async () => {
  if (!order.value?.trackingId) return
  await navigator.clipboard.writeText(order.value.trackingId)
  copied.value = true
  setTimeout(() => (copied.value = false), 2000)
}
</script>

<template>
  <!-- ─── Loading ─────────────────────────────────────────────────── -->
  <VContainer v-if="pending" class="mm-order pa-0 ma-0 d-flex align-center justify-center" style="min-height:300px">
    <VProgressCircular indeterminate color="#B21915" size="48" />
  </VContainer>

  <!-- ─── Error ────────────────────────────────────────────────────── -->
  <VContainer v-else-if="error" class="mm-order pa-0 ma-0 mb-4">
    <VAlert type="error" variant="tonal" border="start" border-color="#B21915" class="mt-6">
      <template #prepend>
        <VIcon icon="tabler-alert-triangle" />
      </template>
      No pudimos cargar los detalles de tu pedido. Intenta de nuevo más tarde.
    </VAlert>
  </VContainer>

  <!-- ─── Content ──────────────────────────────────────────────────── -->
  <VContainer v-else class="mm-order pa-0 ma-0 mb-8">

    <!-- Header -->
    <div class="mm-order__header mb-6">
      <div class="d-flex align-center gap-3 flex-wrap">
        <div class="mm-order__badge">
          <VIcon icon="tabler-receipt" size="18" />
        </div>
        <div>
          <h1 class="mm-order__title">Pedido #{{ order?.id }}</h1>
          <span class="mm-order__date text-medium-emphasis">
            {{ formatDate(order?.orderDate) }}
          </span>
        </div>
        <VSpacer />
        <VChip
          class="mm-order__status-chip"
          :color="currentStep >= 3 ? 'success' : '#B21915'"
          variant="tonal"
          size="small"
          label
        >
          <VIcon start :icon="steps[currentStep]?.icon" size="14" />
          {{ getStatusDescription(order?.state) }}
        </VChip>
      </div>
    </div>

    <VRow class="ga-0">

      <!-- ── LEFT COLUMN ─────────────────────────────────────────── -->
      <VCol cols="12" md="8" class="pr-md-5">

        <!-- Progress stepper -->
        <VCard class="mm-card mb-6" variant="outlined">
          <VCardText class="pa-5">
            <p class="mm-section-label mb-4">
              <VIcon icon="tabler-map-pin" size="15" class="mr-1" />
              Estado del envío
            </p>

            <!-- ETA -->
            <div v-if="order?.eta" class="mm-eta mb-5">
              <VIcon icon="tabler-calendar-time" size="16" color="#B21915" class="mr-1" />
              Entrega estimada:
              <strong>
                {{ formatDate(order.eta.from, { month: 'numeric', day: 'numeric', year: '2-digit' }) }}
                al {{ formatDate(order.eta.to, { month: 'numeric', day: 'numeric', year: '2-digit' }) }}
              </strong>
            </div>

            <!-- Step tracker -->
            <div class="mm-steps">
              <div
                v-for="(step, i) in steps"
                :key="i"
                class="mm-step"
                :class="{
                  'mm-step--done':    i < currentStep,
                  'mm-step--active':  i === currentStep,
                  'mm-step--pending': i > currentStep,
                }"
              >
                <!-- connector line -->
                <div v-if="i < steps.length - 1" class="mm-step__line" :class="{ 'mm-step__line--done': i < currentStep }" />

                <div class="mm-step__icon-wrap">
                  <VIcon :icon="step.icon" size="18" />
                </div>
                <span class="mm-step__label">{{ step.label }}</span>
              </div>
            </div>

            <!-- Order history journal -->
            <div v-if="order?.journals?.length" class="mm-journal mt-6">
              <p class="mm-section-label mb-3">
                <VIcon icon="tabler-history" size="15" class="mr-1" />
                Historial de eventos
              </p>
              <OrderHistory :journal="order.journals" />
            </div>
          </VCardText>
        </VCard>

        <!-- Shipping address -->
        <VCard class="mm-card mb-4" variant="outlined">
          <VCardText class="pa-5">
            <p class="mm-section-label mb-4">
              <VIcon icon="tabler-map-pin" size="15" class="mr-1" />
              Dirección de envío
            </p>
            <OrderShippingAddress :order="order" />
          </VCardText>
        </VCard>

        <!-- Products -->
        <VCard class="mm-card" variant="outlined">
          <VCardText class="pa-5">
            <p class="mm-section-label mb-4">
              <VIcon icon="tabler-package" size="15" class="mr-1" />
              Productos ({{ order?.items?.filter(i => i.type === 1).length }})
            </p>

            <div class="mm-products">
              <template v-for="item in order?.items" :key="item.id">

                <!-- Shipping item -->
                <div v-if="item.type === 111" class="mm-product-row mm-product-row--shipping">
                  <div class="mm-product-row__img-wrap mm-product-row__img-wrap--icon">
                    <VIcon icon="tabler-truck-delivery" color="#B21915" size="28" />
                  </div>
                  <div class="mm-product-row__info">
                    <span class="mm-product-row__name">Costo de envío</span>
                    <span class="mm-product-row__meta">{{ item.comment }}</span>
                  </div>
                  <div class="mm-product-row__price">
                    {{ formatMoney(item.subtotal) }}
                  </div>
                </div>

                <!-- Product item -->
                <a
                  v-if="item.type === 1"
                  :href="item.link"
                  class="mm-product-row mtc-link"
                >
                  <div class="mm-product-row__img-wrap">
                    <VImg
                      v-if="item.productItem"
                      :src="getImageUrl(item.productItem?.image, 150, getDomainId())"
                      :alt="item.productItem?.product?.fullName"
                      width="80"
                      height="80"
                      cover
                      class="rounded-lg"
                    />
                    <div v-else class="mm-product-row__img-placeholder">
                      <VIcon icon="tabler-photo-off" size="28" color="grey-lighten-1" />
                    </div>
                  </div>

                  <div class="mm-product-row__info">
                    <span class="mm-product-row__name">
                      {{ item.productItem?.product?.fullName ?? `${item.description} ${item.comment}` }}
                    </span>
                    <div class="mm-product-row__attrs">
                      <VChip v-if="item.size"  size="x-small" variant="tonal" class="mr-1">Talla: {{ item.size.name }}</VChip>
                      <VChip v-if="item.color" size="x-small" variant="tonal" class="mr-1">Color: {{ item.color.name }}</VChip>
                      <VChip size="x-small" variant="tonal">x{{ item.quantity }}</VChip>
                    </div>
                  </div>

                  <div class="mm-product-row__price">
                    {{ formatMoney(item.subtotal) }}
                  </div>
                </a>

              </template>
            </div>
          </VCardText>
        </VCard>

      </VCol>

      <!-- ── RIGHT COLUMN ───────────────────────────────────────── -->
      <VCol cols="12" md="4">

        <!-- Order details -->
        <VCard class="mm-card mb-4" variant="outlined">
          <VCardText class="pa-5">
            <p class="mm-section-label mb-4">
              <VIcon icon="tabler-info-circle" size="15" class="mr-1" />
              Detalles del pedido
            </p>

            <div class="mm-details-list">
              <div class="mm-details-row">
                <VIcon icon="tabler-calendar" size="15" class="mm-details-row__icon" />
                <span class="mm-details-row__key">Fecha</span>
                <span class="mm-details-row__val">{{ formatDate(order?.orderDate) }}</span>
              </div>
              <div class="mm-details-row">
                <VIcon icon="tabler-credit-card" size="15" class="mm-details-row__icon" />
                <span class="mm-details-row__key">Pago</span>
                <span class="mm-details-row__val">{{ order?.paymentMethod?.name }}</span>
              </div>
              <div class="mm-details-row">
                <VIcon icon="tabler-truck" size="15" class="mm-details-row__icon" />
                <span class="mm-details-row__key">Envío</span>
                <span class="mm-details-row__val">{{ order?.shipmentMethod?.description }}</span>
              </div>

              <!-- Tracking -->
              <div v-if="order?.trackingId" class="mm-details-row mm-details-row--tracking">
                <VIcon icon="tabler-map-search" size="15" class="mm-details-row__icon" />
                <span class="mm-details-row__key">Seguimiento</span>
                <div class="mm-details-row__val d-flex align-center gap-1">
                  <a
                    href="https://www.seur.com/miseur/mis-envios/"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="mm-tracking-link"
                  >{{ order.trackingId }}</a>
                  <VBtn
                    :icon="copied ? 'tabler-check' : 'tabler-copy'"
                    size="x-small"
                    variant="text"
                    :color="copied ? 'success' : 'default'"
                    @click.prevent="copyTracking"
                  />
                </div>
              </div>
            </div>
          </VCardText>
        </VCard>

        <!-- Order totals -->
        <VCard class="mm-card mb-4" variant="outlined">
          <VCardText class="pa-5">
            <p class="mm-section-label mb-4">
              <VIcon icon="tabler-receipt-2" size="15" class="mr-1" />
              Resumen del pedido
            </p>

            <div class="mm-totals">
              <div class="mm-totals__row">
                <span>Subtotal</span>
                <span>{{ formatMoney(order?.netTotal) }}</span>
              </div>
              <div class="mm-totals__row">
                <span>IVA (19%)</span>
                <span>{{ formatMoney(order?.iva) }}</span>
              </div>
              <div class="mm-totals__row">
                <span>Envío</span>
                <span v-if="order?.shipping > 0">{{ formatMoney(order.shipping) }}</span>
                <span v-else class="text-success">Gratis</span>
              </div>
              <div class="mm-totals__divider" />
              <div class="mm-totals__row mm-totals__row--total">
                <span>Total</span>
                <span>{{ formatMoney(order?.total) }}</span>
              </div>
            </div>
          </VCardText>
        </VCard>



        <!-- Returns -->
        <VCard class="mm-card mb-4" variant="outlined">
          <VCardText class="pa-5">
            <p class="mm-section-label mb-4">
              <VIcon icon="tabler-arrow-back-up" size="15" class="mr-1" />
              Devoluciones
            </p>
            <OrderReturn :order="order" />
          </VCardText>
        </VCard>

        <!-- Help -->
        <VCard class="mm-card mm-card--help" variant="outlined">
          <VCardText class="pa-5">
            <div class="d-flex align-start gap-3">
              <div class="mm-help-icon">
                <VIcon icon="tabler-headset" size="20" color="#B21915" />
              </div>
              <div>
                <p class="mm-section-label mb-1">¿Necesitas ayuda?</p>
                <p class="text-body-2 text-medium-emphasis mb-0">
                  Revisa nuestra sección de
                  <a href="/contactanos.html" class="mm-help-link">ayuda y atención al cliente</a>.
                </p>
              </div>
            </div>
          </VCardText>
        </VCard>

      </VCol>
    </VRow>
  </VContainer>
</template>

<style scoped>
/* ── Layout ──────────────────────────────────────────────────────── */
.mm-order {
  max-width: 1100px;
}

/* ── Header ──────────────────────────────────────────────────────── */
.mm-order__header {
  border-bottom: 2px solid #B21915;
  padding-bottom: 16px;
}

.mm-order__badge {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 38px;
  height: 38px;
  background: #B21915;
  color: #fff;
  border-radius: 8px;
  flex-shrink: 0;
}

.mm-order__title {
  font-size: 1.35rem;
  font-weight: 700;
  letter-spacing: -0.02em;
  margin: 0;
  line-height: 1.2;
}

.mm-order__date {
  font-size: 0.8rem;
}

.mm-order__status-chip {
  font-weight: 600;
  letter-spacing: 0.03em;
  text-transform: uppercase;
  font-size: 0.7rem !important;
}

/* ── Cards ───────────────────────────────────────────────────────── */
.mm-card {
  border: 1px solid rgba(0, 0, 0, 0.1) !important;
  border-radius: 10px !important;
}

.mm-card--help {
  background: #fafafa !important;
}

/* ── Section labels ──────────────────────────────────────────────── */
.mm-section-label {
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: #B21915;
  display: flex;
  align-items: center;
  gap: 4px;
  margin: 0;
}

/* ── ETA ─────────────────────────────────────────────────────────── */
.mm-eta {
  font-size: 0.85rem;
  display: flex;
  align-items: center;
  gap: 4px;
}

/* ── Step tracker ────────────────────────────────────────────────── */
.mm-steps {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  position: relative;
  gap: 0;
}

.mm-step {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  z-index: 1;
}

.mm-step__line {
  position: absolute;
  top: 19px;
  left: 50%;
  width: 100%;
  height: 2px;
  background: #e0e0e0;
  z-index: 0;
}

.mm-step__line--done {
  background: #B21915;
}

.mm-step__icon-wrap {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px solid #e0e0e0;
  background: #fff;
  color: #bbb;
  transition: all 0.2s;
  position: relative;
  z-index: 2;
}

.mm-step--done .mm-step__icon-wrap {
  border-color: #B21915;
  background: #B21915;
  color: #fff;
}

.mm-step--active .mm-step__icon-wrap {
  border-color: #B21915;
  background: #fff;
  color: #B21915;
  box-shadow: 0 0 0 4px rgba(178, 25, 21, 0.12);
}

.mm-step__label {
  font-size: 0.7rem;
  font-weight: 600;
  text-align: center;
  margin-top: 6px;
  color: #aaa;
  line-height: 1.2;
}

.mm-step--done .mm-step__label,
.mm-step--active .mm-step__label {
  color: #B21915;
}

/* ── Journal ─────────────────────────────────────────────────────── */
.mm-journal {
  border-top: 1px solid rgba(0, 0, 0, 0.07);
  padding-top: 16px;
}

/* ── Product rows ────────────────────────────────────────────────── */
.mm-products {
  display: flex;
  flex-direction: column;
  gap: 0;
}

.mm-product-row {
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 14px 0;
  border-bottom: 1px solid rgba(0, 0, 0, 0.06);
  text-decoration: none;
  color: inherit;
  transition: background 0.15s;
}

.mm-product-row:last-child {
  border-bottom: none;
  padding-bottom: 0;
}

.mm-product-row:hover {
  background: rgba(178, 25, 21, 0.03);
  border-radius: 8px;
}

.mm-product-row--shipping {
  opacity: 0.7;
}

.mm-product-row__img-wrap {
  width: 80px;
  height: 80px;
  flex-shrink: 0;
  border-radius: 8px;
  overflow: hidden;
  border: 1px solid rgba(0, 0, 0, 0.07);
}

.mm-product-row__img-wrap--icon {
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(178, 25, 21, 0.06);
}

.mm-product-row__img-placeholder {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f5f5f5;
}

.mm-product-row__info {
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.mm-product-row__name {
  font-size: 0.875rem;
  font-weight: 600;
  line-height: 1.35;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.mm-product-row__meta {
  font-size: 0.78rem;
  color: #777;
}

.mm-product-row__attrs {
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
}

.mm-product-row__price {
  font-size: 0.95rem;
  font-weight: 700;
  white-space: nowrap;
  color: #B21915;
  flex-shrink: 0;
}

/* ── Details list ────────────────────────────────────────────────── */
.mm-details-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.mm-details-row {
  display: flex;
  align-items: flex-start;
  gap: 8px;
  font-size: 0.85rem;
}

.mm-details-row__icon {
  color: #B21915;
  margin-top: 1px;
  flex-shrink: 0;
}

.mm-details-row__key {
  color: #777;
  min-width: 68px;
  flex-shrink: 0;
}

.mm-details-row__val {
  font-weight: 500;
}

.mm-tracking-link {
  color: #B21915;
  text-decoration: none;
  font-weight: 600;
  font-size: 0.82rem;
}

.mm-tracking-link:hover {
  text-decoration: underline;
}

/* ── Totals ──────────────────────────────────────────────────────── */
.mm-totals {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.mm-totals__row {
  display: flex;
  justify-content: space-between;
  font-size: 0.875rem;
  color: #444;
}

.mm-totals__divider {
  border-top: 1px solid rgba(0, 0, 0, 0.1);
  margin: 4px 0;
}

.mm-totals__row--total {
  font-size: 1rem;
  font-weight: 700;
  color: #111;
  letter-spacing: -0.01em;
}

.mm-totals__row--total span:last-child {
  color: #B21915;
}

/* ── Help card ───────────────────────────────────────────────────── */
.mm-help-icon {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: rgba(178, 25, 21, 0.08);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.mm-help-link {
  color: #B21915;
  font-weight: 600;
  text-decoration: none;
}

.mm-help-link:hover {
  text-decoration: underline;
}

/* ── Responsive ──────────────────────────────────────────────────── */
@media (max-width: 599px) {
  .mm-steps {
    gap: 0;
  }
  .mm-step__label {
    font-size: 0.62rem;
  }
  .mm-product-row__img-wrap {
    width: 60px;
    height: 60px;
  }
}
</style>
