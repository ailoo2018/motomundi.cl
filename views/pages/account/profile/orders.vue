<script setup>
import { ref, computed, onMounted } from 'vue'
import { formatDate as fmtDate } from '@core/utils/formatters.js'

// ─── Props / Emits ────────────────────────────────────────────────────────────
const props = defineProps({
  /**
   * userId: used to fetch invoices for this specific user.
   * If null/undefined, component will fetch from the logged-in user context.
   */
  userId: {
    type: [Number, String],
    default: null,
  },

  /** pageSize: how many invoices per page */
  pageSize: {
    type: Number,
    default: 10,
  },
})

definePageMeta({
  layout: 'account',
  middleware: 'auth', // Must match the filename (auth.ts)
})

// ─── State ────────────────────────────────────────────────────────────────────
const invoices  = ref([])
const totalCount = ref(0)
const loading   = ref(false)
const expandedId = ref(null)
const currentPage = ref(1)

const filters = ref({
  dateFrom: formatInputDate(new Date(2000, new Date().getMonth(), 1)),
  dateTo: formatInputDate(new Date()),
  channel: '',
})

// ─── Computed ────────────────────────────────────────────────────────────────
const totalPages = computed(() => Math.ceil(totalCount.value / props.pageSize))

const visiblePages = computed(() => {
  const pages = []
  const total = totalPages.value
  const curr  = currentPage.value
  if (total <= 7) {
    for (let i = 1; i <= total; i++) pages.push(i)
  } else {
    pages.push(1)
    if (curr > 3) pages.push('...')
    for (let i = Math.max(2, curr - 1); i <= Math.min(total - 1, curr + 1); i++) pages.push(i)
    if (curr < total - 2) pages.push('...')
    pages.push(total)
  }

  return pages
})

// ─── Methods ─────────────────────────────────────────────────────────────────
function formatInputDate(date) {
  return date.toISOString().split('T')[0]
}

function formatDate(dateStr) {
  if (!dateStr) return '—'
  const d = new Date(dateStr)

  return d.toLocaleDateString('es-CL', { day: '2-digit', month: 'short', year: 'numeric' })
}

function formatCLP(amount) {
  if (amount == null) return '—'

  return new Intl.NumberFormat('es-CL', {
    style: 'currency',
    currency: 'CLP',
    minimumFractionDigits: 0,
  }).format(Math.round(amount))
}

function toggleExpand(id) {
  expandedId.value = expandedId.value === id ? null : id
}

function onImgError(e) {
  e.target.src = '/images/product-placeholder.png'
}

async function fetchInvoices() {
  loading.value = true
  try {
    const params = new URLSearchParams({
      from: filters.value.dateFrom,
      to: filters.value.dateTo,
      page: currentPage.value,
      pageSize: props.pageSize,
      ...(filters.value.channel && { channel: filters.value.channel }),
      ...(props.userId           && { userId: props.userId }),
    })


    const res  = await fetch(`/api/account/latest-orders`)
    const data = await res.json()

    invoices.value   = data.orders  ?? []
    totalCount.value = data.totalCount ?? 0
  } catch (err) {
    console.error('Error fetching invoices:', err)
    invoices.value = []
  } finally {
    loading.value = false
  }
}

function applyFilters() {
  currentPage.value = 1
  expandedId.value  = null
  fetchInvoices()
}

function goToPage(page) {
  currentPage.value = page
  expandedId.value  = null
  fetchInvoices()
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

// ─── Lifecycle ────────────────────────────────────────────────────────────────
onMounted(fetchInvoices)
</script>

<template>
  <div class="invoices-page v-container">
    <!-- Header -->
    <div class="invoices-header">
      <div class="header-inner">
        <div class="header-title-block">
          <h1 class="header-title">
            Ultimás Ordenes
          </h1>
        </div>
        <div class="header-meta">
          <span class="total-count">{{ totalCount.toLocaleString('es-CL') }} documentos en total</span>
        </div>
      </div>
    </div>

    <!-- Loading State -->
    <div
      v-if="loading"
      class="state-loading"
    >
      <div
        v-for="i in 4"
        :key="i"
        class="skeleton-card"
      >
        <div class="sk-row">
          <div class="sk-block sk-num" />
          <div class="sk-block sk-date" />
          <div class="sk-block sk-total" />
        </div>
        <div class="sk-row">
          <div class="sk-block sk-img" />
          <div class="sk-block sk-img" />
        </div>
      </div>
    </div>

    <!-- Empty State -->
    <div
      v-else-if="!invoices.length"
      class="state-empty"
    >
      <div class="empty-icon">
        <svg
          width="48"
          height="48"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="1.2"
        ><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /><line
          x1="16"
          y1="13"
          x2="8"
          y2="13"
        /><line
          x1="16"
          y1="17"
          x2="8"
          y2="17"
        /><polyline points="10 9 9 9 8 9" /></svg>
      </div>
      <p class="empty-title">
        Sin boletas en este período
      </p>
      <p class="empty-sub">
        Ajusta los filtros para ver más resultados
      </p>
    </div>

    <!-- Invoice List -->
    <div
      v-else
      class="invoices-list"
    >
      <TransitionGroup
        name="invoice-fade"
        tag="div"
        class="list-inner"
      >
        <div
          v-for="invoice in invoices"
          :key="invoice.id"
          class="invoice-card"
          :class="{ 'is-open': expandedId === invoice.id }"
          @click="toggleExpand(invoice.id)"
        >
          <!-- Card Main Row -->
          <div class="card-main">
            <!-- Left: Doc number + type badge -->
            <div class="card-doc">
              <!--
                <div
                class="doc-badge"
                :class="invoice.isCreditNote ? 'badge-cn' : 'badge-boleta'"
                >
                {{ invoice.number }}
                </div>
              -->
              <div class="doc-info">
                <span class="doc-number">#{{ invoice.number }}</span>
                <span class="doc-channel mt-2">
                  <span
                    class="card-status "
                    :class="invoice.isPaid ? 'status-paid' : 'status-pending'"
                  >
                    {{ invoice.status }}
                  </span>
                </span>
              </div>
            </div>

            <!-- Center: Date + payment -->
            <div class="card-date-pay">
              <span class="card-date">{{ formatDate(invoice.documentDate) }}</span>
              <span class="card-payment">
                <VIcon class="tabler-cube-send" />
                {{ invoice.shipmentMethodType }}

              </span>
              <span class="card-payment">
                <VIcon class="tabler-calendar" />
                Entrega prevista: {{fmtDate(invoice.eta.from, { month: 'numeric', day: 'numeric', year: '2-digit' })}}
                a {{fmtDate(invoice.eta.to, { month: 'numeric', day: 'numeric', year: '2-digit' })}}
              </span>
            </div>

            <!-- Right: Total + status + products thumb -->
            <div class="card-right">
              <div class="card-products-thumb">
                <div
                  v-for="item in invoice.productItems.slice(0, 3)"
                  :key="item.id"
                  class="thumb-wrapper"
                >
                  <img
                    :src="getImageUrl( item.image, 150, getDomainId())"
                    :alt="item.product.fullName"
                    class="product-thumb"
                    loading="lazy"
                    @error="onImgError"
                  >
                </div>
                <div
                  v-if="invoice.productItems.length > 3"
                  class="thumb-more"
                >
                  +{{ invoice.productItems.length - 3 }}
                </div>
              </div>
              <div class="card-total-block">
                <span class="card-total">{{ formatCLP(invoice.total) }}</span>
              </div>
              <button
                class="card-chevron"
                :class="{ rotated: expandedId === invoice.id }"
                @click.stop="toggleExpand(invoice.id)"
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2.5"
                ><polyline points="6 9 12 15 18 9" /></svg>
              </button>
            </div>
          </div>

          <!-- Expanded Detail -->
          <Transition name="expand">
            <div
              v-if="expandedId === invoice.id"
              class="card-detail"
            >
              <div class="detail-divider" />
              <div class="detail-info">
                <div class="summary-row">
                  <span class="summary-label">Entrega prevista</span>
                  <span class="summary-value">10/12/26 a 16/19/23</span>
                </div>
              </div>

              <!-- Products grid -->
              <div class="detail-products">
                <h4 class="detail-section-title">
                  Productos
                </h4>
                <div class="products-grid">
                  <div
                    v-for="item in invoice.productItems"
                    :key="item.id"
                    class="product-row"
                  >
                    <div class="product-img-wrap">
                      <img
                        :src="getImageUrl( item.image, 150, getDomainId())"
                        :alt="item.product.fullName"
                        class="product-img"
                        loading="lazy"
                        @error="onImgError"
                      >
                    </div>
                    <div class="product-meta">
                      <span class="product-brand">{{ item.product.brand.name }}</span>
                      <span class="product-name">{{ item.product.fullName }}</span>
                      <div class="product-attrs">
                        <span
                          v-if="item.size"
                          class="attr-pill"
                        >{{ item.size.name }}</span>
                        <span
                          v-if="item.color"
                          class="attr-pill attr-color"
                        >{{ item.color.name }}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Totals summary -->
              <div class="detail-summary">
                <h4 class="detail-section-title">
                  Resumen
                </h4>
                <div class="summary-rows">
                  <div class="summary-row">
                    <span class="summary-label">Neto</span>
                    <span class="summary-value">{{ formatCLP(invoice.netTotal) }}</span>
                  </div>
                  <div class="summary-row">
                    <span class="summary-label">IVA (19%)</span>
                    <span class="summary-value">{{ formatCLP(invoice.iva) }}</span>
                  </div>
                  <div class="summary-row summary-total">
                    <span class="summary-label">Total</span>
                    <span class="summary-value">{{ formatCLP(invoice.total) }}</span>
                  </div>
                  <div class="summary-row">
                    <span class="summary-label">Vendedor</span>
                    <span class="summary-value summary-muted">{{ invoice.saleUser }}</span>
                  </div>
                  <div
                    v-if="invoice.description"
                    class="summary-row"
                  >
                    <span class="summary-label">Descripción</span>
                    <span class="summary-value summary-muted">{{ invoice.description }}</span>
                  </div>
                </div>
              </div>

              <!-- Actions -->
              <div class="detail-actions">
                <button
                  class="btn-action btn-primary"
                  @click="() => navigateTo('/account/orders/' + invoice.id)"
                >
                  <VIcon class="tabler-eye"/>

                  Ver Detalle
                </button>
                <button
                  v-if="invoice.isDigital"
                  class="btn-action btn-primary"
                  @click.stop
                >
                  <VIcon class="tabler-mail"/>
                  Enviar por email
                </button>
              </div>
            </div>
          </Transition>
        </div>
      </TransitionGroup>
    </div>

    <!-- Pagination -->
    <div
      v-if="totalPages > 1"
      class="pagination"
    >
      <button
        class="page-btn"
        :disabled="currentPage === 1"
        @click="goToPage(currentPage - 1)"
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2.5"
        ><polyline points="15 18 9 12 15 6" /></svg>
      </button>
      <div class="page-numbers">
        <button
          v-for="p in visiblePages"
          :key="p"
          class="page-btn page-num"
          :class="{ active: p === currentPage, ellipsis: p === '...' }"
          :disabled="p === '...'"
          @click="p !== '...' && goToPage(p)"
        >
          {{ p }}
        </button>
      </div>
      <button
        class="page-btn"
        :disabled="currentPage === totalPages"
        @click="goToPage(currentPage + 1)"
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2.5"
        ><polyline points="9 18 15 12 9 6" /></svg>
      </button>
      <span class="page-info">Página {{ currentPage }} de {{ totalPages }}</span>
    </div>
  </div>
</template>


<style scoped>
/* ─── Variables ──────────────────────────────────────────────────────────────── */
.invoices-page {
  --brand:        #B21A15;
  --brand-dark:   #8c1310;
  --brand-light:  #fdf2f2;
  --ink:          #1a1a1a;
  --ink-2:        #3d3d3d;
  --ink-3:        #6b6b6b;
  --line:         #e5e5e5;
  --bg:           #ffffff;
  --surface:      #f9f9f9;
  --radius-sm:    4px;
  --radius:       8px;
  --radius-lg:    12px;
  --shadow:       0 1px 3px rgba(0,0,0,.06), 0 1px 8px rgba(0,0,0,.04);
  --shadow-hover: 0 4px 16px rgba(0,0,0,.10);

  color: var(--ink);
  background: var(--bg);
  max-width: 900px;
  margin: 0 auto;
  padding: 0 16px 48px;
}

/* ─── Header ─────────────────────────────────────────────────────────────────── */
.invoices-header {
  padding: 32px 0 0;
}
.header-inner {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 20px;
}
.header-eyebrow {
  display: block;
  font-size: 11px;
  font-weight: 600;
  letter-spacing: .12em;
  text-transform: uppercase;
  color: var(--brand);
  margin-bottom: 4px;
}
.header-title {

  font-size: 32px;
  font-weight: 700;
  letter-spacing: -.01em;
  margin: 0;
  line-height: 1;
}
.total-count {
  font-size: 13px;
  color: var(--ink-3);
}

/* ─── Filters Bar ────────────────────────────────────────────────────────────── */
.filters-bar {
  background: var(--surface);
  border: 1px solid var(--line);
  border-radius: var(--radius);
  padding: 16px;
  margin-bottom: 24px;
}
.filters-inner {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  align-items: flex-end;
}
.filter-group {
  display: flex;
  flex-direction: column;
  gap: 4px;
  flex: 1 1 140px;
}
.filter-label {
  font-size: 11px;
  font-weight: 600;
  letter-spacing: .06em;
  text-transform: uppercase;
  color: var(--ink-3);
}
.filter-input {
  height: 36px;
  border: 1px solid var(--line);
  border-radius: var(--radius-sm);
  padding: 0 10px;

  font-size: 14px;
  color: var(--ink);
  background: var(--bg);
  transition: border-color .15s;
  outline: none;
  width: 100%;
  box-sizing: border-box;
}
.filter-input:focus {
  border-color: var(--brand);
  box-shadow: 0 0 0 3px rgba(178,26,21,.1);
}
.filter-select { cursor: pointer; }

.btn-filter {
  height: 36px;
  padding: 0 18px;
  background: var(--brand);
  color: #fff;
  border: none;
  border-radius: var(--radius-sm);

  font-size: 14px;
  font-weight: 600;
  letter-spacing: .04em;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 6px;
  transition: background .15s, transform .1s;
  flex-shrink: 0;
  align-self: flex-end;
}
.btn-filter:hover { background: var(--brand-dark); transform: translateY(-1px); }
.btn-filter:active { transform: translateY(0); }

/* ─── Skeleton ───────────────────────────────────────────────────────────────── */
.state-loading {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.skeleton-card {
  background: var(--surface);
  border: 1px solid var(--line);
  border-radius: var(--radius);
  padding: 18px;
  display: flex;
  flex-direction: column;
  gap: 14px;
}
.sk-row { display: flex; gap: 12px; align-items: center; }
.sk-block {
  background: linear-gradient(90deg, #ebebeb 25%, #f5f5f5 50%, #ebebeb 75%);
  background-size: 200% 100%;
  animation: shimmer 1.4s infinite;
  border-radius: 4px;
  height: 14px;
}
.sk-num   { width: 70px; }
.sk-date  { width: 90px; }
.sk-total { width: 80px; margin-left: auto; }
.sk-img   { width: 44px; height: 44px; border-radius: 6px; }

@keyframes shimmer {
  to { background-position: -200% 0; }
}

/* ─── Empty State ────────────────────────────────────────────────────────────── */
.state-empty {
  text-align: center;
  padding: 64px 24px;
  color: var(--ink-3);
}
.empty-icon {
  width: 72px;
  height: 72px;
  border-radius: 50%;
  background: var(--surface);
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 16px;
  border: 1px solid var(--line);
}
.empty-title { font-size: 17px; font-weight: 600; color: var(--ink-2); margin: 0 0 6px; }
.empty-sub   { font-size: 14px; margin: 0; }

/* ─── Invoice List ───────────────────────────────────────────────────────────── */
.list-inner {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

/* ─── Invoice Card ───────────────────────────────────────────────────────────── */
.invoice-card {
  background: var(--bg);
  border: 1px solid var(--line);
  border-radius: var(--radius);
  overflow: hidden;
  box-shadow: var(--shadow);
  cursor: pointer;
  transition: box-shadow .2s, border-color .2s, transform .15s;
}
.invoice-card:hover {
  box-shadow: var(--shadow-hover);
  border-color: #d0d0d0;
  transform: translateY(-1px);
}
.invoice-card.is-open {
  border-color: var(--brand);
  box-shadow: 0 0 0 1px var(--brand), var(--shadow-hover);
  transform: none;
}

/* Main row */
.card-main {
  display: grid;
  grid-template-columns: auto 1fr auto;
  align-items: center;
  padding: 14px 16px;
  gap: 12px;
}

/* Doc badge */
.card-doc {
  display: flex;
  align-items: center;
  gap: 10px;
}
.doc-badge {
  width: 38px;
  height: 38px;
  border-radius: var(--radius-sm);
  display: flex;
  align-items: center;
  justify-content: center;

  font-size: 11px;
  font-weight: 700;
  letter-spacing: .06em;
  flex-shrink: 0;
}
.badge-boleta { background: var(--brand-light); color: var(--brand); }
.badge-cn     { background: #fff3e0; color: #e65100; }

.doc-info { display: flex; flex-direction: column; }
.doc-number {

  font-size: 17px;
  font-weight: 700;
  color: var(--ink);
  line-height: 1.1;
}
.doc-channel {
  font-size: 11px;
  color: var(--ink-3);
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: .05em;
}

/* Date + payment center */
.card-date-pay {
  display: flex;
  flex-direction: column;
  gap: 3px;
}
.card-date {
  font-size: 14px;
  color: var(--ink-2);
  font-weight: 500;
}
.card-payment {
  font-size: 12px;
  color: var(--ink-3);
  display: flex;
  align-items: center;
  gap: 4px;
}

/* Right block */
.card-right {
  display: flex;
  align-items: center;
  gap: 16px;
}
.card-products-thumb {
  display: flex;
  align-items: center;
  gap: -6px;
}
.thumb-wrapper {
  width: 38px;
  height: 38px;
  border-radius: 6px;
  border: 2px solid #fff;
  overflow: hidden;
  margin-right: -8px;
  background: var(--surface);
  flex-shrink: 0;
  box-shadow: 0 0 0 1px var(--line);
}
.thumb-wrapper:first-child { margin-right: -8px; }
.product-thumb {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}
.thumb-more {
  width: 38px;
  height: 38px;
  border-radius: 6px;
  background: var(--surface);
  border: 1px solid var(--line);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 10px;
  font-weight: 700;
  color: var(--ink-3);
  margin-left: 2px;
  flex-shrink: 0;
}
.card-total-block {
  text-align: right;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 3px;
}
.card-total {

  font-size: 20px;
  font-weight: 700;
  color: var(--ink);
  white-space: nowrap;
}
.card-status {
  font-size: 11px;
  font-weight: 600;
  padding: 2px 8px;
  border-radius: 20px;
  letter-spacing: .04em;
}
.status-paid    { background: #e8f5e9; color: #2e7d32; }
.status-pending { background: #fff8e1; color: #f57f17; }

.card-chevron {
  background: none;
  border: none;
  cursor: pointer;
  padding: 4px;
  color: var(--ink-3);
  transition: transform .25s, color .15s;
  display: flex;
  align-items: center;
}
.card-chevron.rotated { transform: rotate(180deg); color: var(--brand); }
.card-chevron:hover   { color: var(--brand); }

/* ─── Card Detail ────────────────────────────────────────────────────────────── */
.detail-divider {
  height: 1px;
  background: var(--line);
  margin: 0 16px;
}
.card-detail {
  padding: 16px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: auto auto;
  gap: 20px;
}
.card-detail > .detail-divider {
  grid-column: 1 / -1;
  margin: 0;
}
.detail-section-title {

  font-size: 12px;
  font-weight: 700;
  letter-spacing: .1em;
  text-transform: uppercase;
  color: var(--ink-3);
  margin: 0 0 12px;
}

/* Products in detail */
.detail-products { grid-column: 1 / -1; }
.products-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 10px;
}
.product-row {
  display: flex;
  gap: 10px;
  align-items: flex-start;
  background: var(--surface);
  border-radius: var(--radius-sm);
  padding: 10px;
  border: 1px solid var(--line);
}
.product-img-wrap {
  width: 52px;
  height: 52px;
  border-radius: 6px;
  overflow: hidden;
  background: #fff;
  flex-shrink: 0;
  border: 1px solid var(--line);
}
.product-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}
.product-meta { flex: 1; min-width: 0; }
.product-brand {
  display: block;
  font-size: 10px;
  font-weight: 700;
  letter-spacing: .08em;
  text-transform: uppercase;
  color: var(--brand);
  margin-bottom: 2px;
}
.product-name {
  display: block;
  font-size: 13px;
  font-weight: 500;
  color: var(--ink);
  line-height: 1.3;
  margin-bottom: 6px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.product-attrs {
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
}
.attr-pill {
  font-size: 10px;
  font-weight: 600;
  padding: 2px 6px;
  border-radius: 20px;
  background: #fff;
  border: 1px solid var(--line);
  color: var(--ink-2);
  letter-spacing: .02em;
}
.attr-color { background: #f0f0f0; }

/* Summary */
.detail-summary {}
.summary-rows { display: flex; flex-direction: column; gap: 8px; }
.summary-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 13px;
}
.summary-label { color: var(--ink-3); }
.summary-value { font-weight: 600; color: var(--ink); }
.summary-muted { font-weight: 400; color: var(--ink-3); }
.summary-total .summary-label,
.summary-total .summary-value {

  font-size: 17px;
  font-weight: 700;
  color: var(--ink);
}
.summary-total { padding-top: 8px; border-top: 1px solid var(--line); margin-top: 2px; }

/* Actions */
.detail-actions {
  grid-column: 2;
  display: flex;
  gap: 8px;
  align-items: flex-end;
  justify-content: flex-end;
  flex-wrap: wrap;
}
.btn-action {
  height: 36px;
  padding: 0 16px;
  border-radius: var(--radius-sm);

  font-size: 13px;
  font-weight: 600;
  letter-spacing: .04em;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  transition: background .15s, transform .1s;
  border: 1px solid transparent;
}
.btn-action:hover  { transform: translateY(-1px); }
.btn-action:active { transform: none; }
.btn-secondary { background: var(--bg); border-color: var(--line); color: var(--ink-2); }
.btn-secondary:hover { background: var(--surface); border-color: #ccc; }
.btn-primary   { background: var(--brand); color: #fff; }
.btn-primary:hover { background: var(--brand-dark); }

/* ─── Pagination ─────────────────────────────────────────────────────────────── */
.pagination {
  display: flex;
  align-items: center;
  gap: 4px;
  justify-content: center;
  margin-top: 28px;
  flex-wrap: wrap;
}
.page-numbers { display: flex; gap: 4px; }
.page-btn {
  min-width: 36px;
  height: 36px;
  padding: 0 10px;
  border: 1px solid var(--line);
  background: var(--bg);
  border-radius: var(--radius-sm);
  cursor: pointer;

  font-size: 14px;
  color: var(--ink-2);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background .15s, border-color .15s;
}
.page-btn:hover:not(:disabled):not(.ellipsis) { background: var(--surface); border-color: #ccc; }
.page-btn:disabled { opacity: .35; cursor: not-allowed; }
.page-btn.active   { background: var(--brand); border-color: var(--brand); color: #fff; font-weight: 700; }
.page-btn.ellipsis { cursor: default; border-color: transparent; background: none; }
.page-info { font-size: 13px; color: var(--ink-3); margin-left: 8px; }

/* ─── Transitions ────────────────────────────────────────────────────────────── */
.expand-enter-active,
.expand-leave-active {
  transition: opacity .2s, max-height .3s ease;
  max-height: 600px;
  overflow: hidden;
}
.expand-enter-from,
.expand-leave-to {
  opacity: 0;
  max-height: 0;
}

.invoice-fade-enter-active { transition: opacity .3s, transform .3s; }
.invoice-fade-enter-from   { opacity: 0; transform: translateY(8px); }
.invoice-fade-leave-active { transition: opacity .2s; }
.invoice-fade-leave-to     { opacity: 0; }

/* ─── Responsive ─────────────────────────────────────────────────────────────── */
@media (max-width: 600px) {
  .invoices-page { padding: 0 12px 40px; }
  .header-title  { font-size: 26px; }

  .card-main {
    grid-template-columns: 1fr auto;
    grid-template-rows: auto auto;
    gap: 10px;
  }
  .card-doc      { grid-column: 1; grid-row: 1; }
  .card-date-pay { grid-column: 1; grid-row: 2; }
  .card-right    {
    grid-column: 2;
    grid-row: 1 / 3;
    flex-direction: column;
    align-items: flex-end;
    gap: 8px;
  }

  .card-total { font-size: 17px; }
  .card-products-thumb { display: none; }

  .card-detail {
    grid-template-columns: 1fr;
    padding: 12px;
  }
  .detail-actions { grid-column: 1; justify-content: flex-start; }

  .filters-inner { flex-direction: column; }
  .filter-group  { flex: unset; width: 100%; }
  .btn-filter    { width: 100%; justify-content: center; }

  .products-grid { grid-template-columns: 1fr; }
}

@media (min-width: 601px) and (max-width: 768px) {
  .card-products-thumb .thumb-wrapper:nth-child(n+3) { display: none; }
}
</style>
