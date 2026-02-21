<template>
  <VContainer
    fluid
    class="account-reviews pa-0"
  >
    <!-- Header -->
    <div class="page-header px-6 py-8">
      <div class="d-flex align-center gap-3 mb-1">
        <div class="header-icon-wrap">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
class="tabler-icon"
          >
            <path
              stroke="none"
              d="M0 0h24v24H0z"
              fill="none"
            /><path d="M12 17.75l-6.172 3.245l1.179 -6.873l-5 -4.867l6.9 -1l3.086 -6.253l3.086 6.253l6.9 1l-5 4.867l1.179 6.873z" />
          </svg>
        </div>
        <h1 class="page-title">
          Mis Reseñas
        </h1>
      </div>
      <p class="page-subtitle">
        Comparte tu experiencia con los productos que has comprado
      </p>
    </div>

    <VContainer
      max-width="1100"
      class="px-4 pb-10"
    >
      <!-- Stats Bar -->
      <div class="stats-bar mb-8">
        <VCard>
          <VCardText>
        <div class="stat-item">
          <span class="stat-number">{{ pendingProducts.length }}</span>
          <span class="stat-label">Por reseñar</span>
        </div>
          </VCardText>
        </VCard>
        <div class="stat-divider" />
        <div class="stat-item">
          <span class="stat-number">{{ reviewedProducts.length }}</span>
          <span class="stat-label">Reseñados</span>
        </div>
        <div class="stat-divider" />
        <div class="stat-item">
          <span class="stat-number">{{ averageRating }}</span>
          <span class="stat-label">Puntuación media</span>
        </div>
      </div>

      <!-- ─────────────────── PENDING REVIEWS ─────────────────── -->
      <section class="mb-10">
        <div class="section-header mb-5">
          <div class="section-badge pending-badge">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2.5"
              stroke-linecap="round"
stroke-linejoin="round"
            ><path
              stroke="none"
              d="M0 0h24v24H0z"
              fill="none"
            /><path d="M12 8v4l3 3" /><circle
              cx="12"
              cy="12"
              r="9"
            /></svg>
            Pendientes
          </div>
          <h2 class="section-title">
            Productos por reseñar
          </h2>
          <p class="section-desc">
            Ayuda a la comunidad compartiendo tu opinión
          </p>
        </div>

        <div
          v-if="pendingProducts.length === 0"
          class="empty-state"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="40"
            height="40"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="1.5"
            stroke-linecap="round"
stroke-linejoin="round"
          ><path
            stroke="none"
            d="M0 0h24v24H0z"
            fill="none"
          /><path d="M5 12l5 5l10 -10" /></svg>
          <p>¡Todo al día! No tienes productos pendientes de reseña.</p>
        </div>

        <div
          v-else
          class="products-grid"
        >
          <div
            v-for="product in pendingProducts"
            :key="product.id"
            class="product-card pending-card"
            :class="{ 'is-expanded': expandedId === product.id }"
          >
            <!-- Card top -->
            <div class="card-top">
              <div class="product-img-wrap">
                <img
                  :src="product.image"
                  :alt="product.name"
                  class="product-img"
                >
                <div class="purchase-badge">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="12"
                    height="12"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
stroke-linejoin="round"
                  ><path
                    stroke="none"
                    d="M0 0h24v24H0z"
                    fill="none"
                  /><path d="M5 12l5 5l10 -10" /></svg>
                  Comprado
                </div>
              </div>
              <div class="product-info">
                <span class="product-category">{{ product.category }}</span>
                <h3 class="product-name">
                  {{ product.name }}
                </h3>
                <div class="product-meta">
                  <span class="order-num">Pedido #{{ product.orderId }}</span>
                  <span class="dot">·</span>
                  <span class="purchase-date">{{ product.purchaseDate }}</span>
                </div>
                <div class="product-price">
                  ${{ product.price.toLocaleString() }}
                </div>
              </div>
              <button
                class="review-toggle-btn"
                @click="toggleExpand(product.id)"
              >
                <svg
                  v-if="expandedId !== product.id"
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2.5"
stroke-linecap="round" stroke-linejoin="round"
                ><path
                  stroke="none"
                  d="M0 0h24v24H0z"
                  fill="none"
                /><path d="M12 17.75l-6.172 3.245l1.179 -6.873l-5 -4.867l6.9 -1l3.086 -6.253l3.086 6.253l6.9 1l-5 4.867l1.179 6.873z" /></svg>
                <svg
                  v-else
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2.5"
stroke-linecap="round" stroke-linejoin="round"
                ><path
                  stroke="none"
                  d="M0 0h24v24H0z"
                  fill="none"
                /><path d="M6 15l6 -6l6 6" /></svg>
                {{ expandedId === product.id ? 'Cancelar' : 'Reseñar' }}
              </button>
            </div>

            <!-- Review Form (Expanded) -->
            <Transition name="slide-down">
              <div
                v-if="expandedId === product.id"
                class="review-form"
              >
                <div class="form-divider" />

                <!-- Star Rating -->
                <div class="rating-section mb-4">
                  <label class="form-label">Tu puntuación</label>
                  <div class="star-selector">
                    <button
                      v-for="n in 5"
                      :key="n"
                      class="star-btn"
                      :class="{ active: n <= (product.draftRating || 0), hover: n <= hoverRating }"
                      @mouseenter="hoverRating = n"
                      @mouseleave="hoverRating = 0"
                      @click="product.draftRating = n"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="28"
                        height="28"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        stroke="currentColor"
                        stroke-width="1.5"
stroke-linecap="round" stroke-linejoin="round"
                      ><path
                        stroke="none"
                        d="M0 0h24v24H0z"
                        fill="none"
                      /><path d="M12 17.75l-6.172 3.245l1.179 -6.873l-5 -4.867l6.9 -1l3.086 -6.253l3.086 6.253l6.9 1l-5 4.867l1.179 6.873z" /></svg>
                    </button>
                    <span
                      v-if="product.draftRating"
                      class="rating-label-text"
                    >{{ ratingLabels[product.draftRating - 1] }}</span>
                  </div>
                </div>

                <!-- Title -->
                <div class="mb-4">
                  <label class="form-label">Título de tu reseña</label>
                  <input
                    v-model="product.draftTitle"
                    class="form-input"
                    placeholder="Resume tu experiencia en una frase..."
                    maxlength="80"
                  >
                </div>

                <!-- Body -->
                <div class="mb-5">
                  <label class="form-label">Tu reseña</label>
                  <textarea
                    v-model="product.draftBody"
                    class="form-textarea"
                    placeholder="¿Qué te pareció el producto? ¿Lo recomendarías?"
                    rows="4"
                    maxlength="600"
                  />
                  <div class="char-count">
                    {{ (product.draftBody || '').length }}/600
                  </div>
                </div>

                <!-- Pros / Cons quick picks -->
                <div class="quick-tags mb-5">
                  <div class="tags-col">
                    <span class="tags-header pro">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="13"
                        height="13"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2.5"
stroke-linecap="round" stroke-linejoin="round"
                      ><path
                        stroke="none"
                        d="M0 0h24v24H0z"
                        fill="none"
                      /><path d="M12 5l0 14" /><path d="M5 12l14 0" /></svg>
                      Pros
                    </span>
                    <div class="tag-list">
                      <button
                        v-for="tag in proTags"
                        :key="tag"
                        class="tag-chip pro-chip"
                        :class="{ selected: (product.selectedProTags || []).includes(tag) }"
                        @click="toggleTag(product, 'selectedProTags', tag)"
                      >
                        {{ tag }}
                      </button>
                    </div>
                  </div>
                  <div class="tags-col">
                    <span class="tags-header con">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="13"
                        height="13"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2.5"
stroke-linecap="round" stroke-linejoin="round"
                      ><path
                        stroke="none"
                        d="M0 0h24v24H0z"
                        fill="none"
                      /><path d="M5 12l14 0" /></svg>
                      Contras
                    </span>
                    <div class="tag-list">
                      <button
                        v-for="tag in conTags"
                        :key="tag"
                        class="tag-chip con-chip"
                        :class="{ selected: (product.selectedConTags || []).includes(tag) }"
                        @click="toggleTag(product, 'selectedConTags', tag)"
                      >
                        {{ tag }}
                      </button>
                    </div>
                  </div>
                </div>

                <div class="form-actions">
                  <button
                    class="btn-cancel"
                    @click="toggleExpand(null)"
                  >
                    Cancelar
                  </button>
                  <button
                    class="btn-submit"
                    :disabled="!product.draftRating || !product.draftBody"
                    @click="submitReview(product)"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2.5"
stroke-linecap="round" stroke-linejoin="round"
                    ><path
                      stroke="none"
                      d="M0 0h24v24H0z"
                      fill="none"
                    /><path d="M10 14l11 -11" /><path d="M21 3l-6.5 18a.55 .55 0 0 1 -1 0l-3.5 -7l-7 -3.5a.55 .55 0 0 1 0 -1l18 -6.5" /></svg>
                    Publicar reseña
                  </button>
                </div>
              </div>
            </Transition>
          </div>
        </div>
      </section>

      <!-- ─────────────────── REVIEWED PRODUCTS ─────────────────── -->
      <section>
        <div class="section-header mb-5">
          <div class="section-badge reviewed-badge">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2.5"
              stroke-linecap="round"
stroke-linejoin="round"
            ><path
              stroke="none"
              d="M0 0h24v24H0z"
              fill="none"
            /><path d="M5 12l5 5l10 -10" /></svg>
            Publicadas
          </div>
          <h2 class="section-title">
            Reseñas publicadas
          </h2>
          <p class="section-desc">
            Tu historial de reseñas en Motomundi
          </p>
        </div>

        <div
          v-if="reviewedProducts.length === 0"
          class="empty-state"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="40"
            height="40"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="1.5"
            stroke-linecap="round"
stroke-linejoin="round"
          ><path
            stroke="none"
            d="M0 0h24v24H0z"
            fill="none"
          /><path d="M12 17.75l-6.172 3.245l1.179 -6.873l-5 -4.867l6.9 -1l3.086 -6.253l3.086 6.253l6.9 1l-5 4.867l1.179 6.873z" /></svg>
          <p>Aún no has publicado ninguna reseña.</p>
        </div>

        <div
          v-else
          class="reviewed-list"
        >
          <div
            v-for="product in reviewedProducts"
            :key="product.id"
            class="reviewed-card"
          >
            <div class="reviewed-product-side">
              <img
                :src="product.image"
                :alt="product.name"
                class="reviewed-img"
              >
              <div class="reviewed-product-info">
                <span class="product-category">{{ product.category }}</span>
                <h3 class="reviewed-name">
                  {{ product.name }}
                </h3>
                <span class="order-num">Pedido #{{ product.orderId }}</span>
              </div>
            </div>

            <div class="reviewed-content-side">
              <div class="reviewed-header">
                <div class="star-display">
                  <svg
                    v-for="n in 5"
                    :key="n"
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    :fill="n <= product.review.rating ? '#F59E0B' : 'none'"
                    stroke="#F59E0B"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  ><path
                    stroke="none"
                    d="M0 0h24v24H0z"
                    fill="none"
                  /><path d="M12 17.75l-6.172 3.245l1.179 -6.873l-5 -4.867l6.9 -1l3.086 -6.253l3.086 6.253l6.9 1l-5 4.867l1.179 6.873z" /></svg>
                </div>
                <span class="review-date">{{ product.review.date }}</span>
                <div class="review-helpful">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
stroke-linejoin="round"
                  ><path
                    stroke="none"
                    d="M0 0h24v24H0z"
                    fill="none"
                  /><path d="M7 11v8a1 1 0 0 1 -1 1h-2a1 1 0 0 1 -1 -1v-7a1 1 0 0 1 1 -1h3a4 4 0 0 0 4 -4v-1a2 2 0 0 1 4 0v5h3a2 2 0 0 1 2 2l-1 5a2 3 0 0 1 -2 2h-7a3 3 0 0 1 -3 -3" /></svg>
                  {{ product.review.helpful }} útil
                </div>
              </div>
              <h4 class="review-title">
                {{ product.review.title }}
              </h4>
              <p class="review-body">
                {{ product.review.body }}
              </p>
              <div
                v-if="product.review.pros?.length || product.review.cons?.length"
                class="review-tags-row"
              >
                <span
                  v-for="t in product.review.pros"
                  :key="t"
                  class="mini-tag pro-mini"
                >+ {{ t }}</span>
                <span
                  v-for="t in product.review.cons"
                  :key="t"
                  class="mini-tag con-mini"
                >− {{ t }}</span>
              </div>
              <div class="reviewed-actions">
                <button class="action-link edit-link">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
stroke-linejoin="round"
                  ><path
                    stroke="none"
                    d="M0 0h24v24H0z"
                    fill="none"
                  /><path d="M7 7h-1a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-1" /><path d="M20.385 6.585a2.1 2.1 0 0 0 -2.97 -2.97l-8.415 8.385v3h3l8.385 -8.415z" /></svg>
                  Editar
                </button>
                <button
                  class="action-link delete-link"
                  @click="deleteReview(product.id)"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
stroke-linejoin="round"
                  ><path
                    stroke="none"
                    d="M0 0h24v24H0z"
                    fill="none"
                  /><path d="M4 7l16 0" /><path d="M10 11l0 6" /><path d="M14 11l0 6" /><path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" /><path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" /></svg>
                  Eliminar
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </VContainer>

    <!-- Success Snackbar -->
    <VSnackbar
      v-model="snackbar"
      :timeout="3000"
      color="success"
      location="bottom right"
      rounded="lg"
    >
      <div class="d-flex align-center gap-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2.5"
          stroke-linecap="round"
stroke-linejoin="round"
        ><path
          stroke="none"
          d="M0 0h24v24H0z"
          fill="none"
        /><path d="M5 12l5 5l10 -10" /></svg>
        ¡Reseña publicada con éxito!
      </div>
    </VSnackbar>
  </VContainer>
</template>

<script setup>
import { ref, computed } from 'vue'

definePageMeta({
  alias: '/cuenta/evaluaciones',
  layout: 'account',
  middleware: 'auth', // Must match the filename (auth.ts)
})


// ─── State ───────────────────────────────────────────────────
const expandedId = ref(null)
const hoverRating = ref(0)
const snackbar = ref(false)

const ratingLabels = ['Muy malo', 'Malo', 'Regular', 'Bueno', '¡Excelente!']

const proTags = ['Buena calidad', 'Fácil de instalar', 'Duradero', 'Buen precio', 'Como en la foto']
const conTags = ['Instalación difícil', 'Calidad mejorable', 'Llegó tarde', 'Embalaje deficiente']

// ─── Mock Data ───────────────────────────────────────────────
const pendingProducts = ref([
  {
    id: 1,
    name: 'Casco Shoei NXR2 Matte Black',
    category: 'Cascos',
    image: 'https://placehold.co/120x120/1a1a2e/e2e8f0?text=Casco',
    orderId: 'MM-4821',
    purchaseDate: '12 ene 2025',
    price: 289990,
    draftRating: 0,
    draftTitle: '',
    draftBody: '',
    selectedProTags: [],
    selectedConTags: [],
  },
  {
    id: 2,
    name: 'Guantes Alpinestars SP-8 V3',
    category: 'Protección',
    image: 'https://placehold.co/120x120/1a1a2e/e2e8f0?text=Guantes',
    orderId: 'MM-4821',
    purchaseDate: '12 ene 2025',
    price: 54990,
    draftRating: 0,
    draftTitle: '',
    draftBody: '',
    selectedProTags: [],
    selectedConTags: [],
  },
  {
    id: 3,
    name: 'Aceite Motul 7100 10W40 4T 1L',
    category: 'Lubricantes',
    image: 'https://placehold.co/120x120/1a1a2e/e2e8f0?text=Aceite',
    orderId: 'MM-5033',
    purchaseDate: '3 feb 2025',
    price: 18990,
    draftRating: 0,
    draftTitle: '',
    draftBody: '',
    selectedProTags: [],
    selectedConTags: [],
  },
])

const reviewedProducts = ref([
  {
    id: 101,
    name: 'Moto Givi E55 Maxia 5',
    category: 'Baúles',
    image: 'https://placehold.co/80x80/1a1a2e/e2e8f0?text=Baúl',
    orderId: 'MM-3960',
    review: {
      rating: 5,
      title: 'El mejor baúl que he tenido',
      body: 'Excelente capacidad, el sistema de apertura es muy cómodo y la calidad del plástico es superior. Lo recomiendo 100% para viajes largos.',
      date: '18 nov 2024',
      helpful: 14,
      pros: ['Buena calidad', 'Fácil de instalar'],
      cons: [],
    },
  },
  {
    id: 102,
    name: 'Intercom Cardo Packtalk Edge',
    category: 'Comunicación',
    image: 'https://placehold.co/80x80/1a1a2e/e2e8f0?text=Cardo',
    orderId: 'MM-3701',
    review: {
      rating: 4,
      title: 'Muy buena calidad de audio',
      body: 'El sonido es espectacular. La app podría ser más intuitiva pero el producto en sí supera las expectativas. La batería dura perfectamente un día completo de ruta.',
      date: '5 oct 2024',
      helpful: 7,
      pros: ['Buen precio'],
      cons: ['Instalación difícil'],
    },
  },
])

// ─── Computed ─────────────────────────────────────────────────
const averageRating = computed(() => {
  if (!reviewedProducts.value.length) return '—'
  const avg = reviewedProducts.value.reduce((s, p) => s + p.review.rating, 0) / reviewedProducts.value.length
  
  return avg.toFixed(1)
})

// ─── Methods ──────────────────────────────────────────────────
function toggleExpand(id) {
  expandedId.value = expandedId.value === id ? null : id
  hoverRating.value = 0
}

function toggleTag(product, field, tag) {
  if (!product[field]) product[field] = []
  const idx = product[field].indexOf(tag)
  if (idx === -1) product[field].push(tag)
  else product[field].splice(idx, 1)
}

function submitReview(product) {
  reviewedProducts.value.unshift({
    id: product.id + 1000,
    name: product.name,
    category: product.category,
    image: product.image,
    orderId: product.orderId,
    review: {
      rating: product.draftRating,
      title: product.draftTitle || 'Mi reseña',
      body: product.draftBody,
      date: new Date().toLocaleDateString('es-CL', { day: 'numeric', month: 'short', year: 'numeric' }),
      helpful: 0,
      pros: product.selectedProTags,
      cons: product.selectedConTags,
    },
  })
  pendingProducts.value = pendingProducts.value.filter(p => p.id !== product.id)
  expandedId.value = null
  snackbar.value = true
}

function deleteReview(id) {
  reviewedProducts.value = reviewedProducts.value.filter(p => p.id !== id)
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@600;700&family=Barlow:wght@400;500;600&display=swap');

/* ─── Base ─────────────────────────────────────────── */
.account-reviews {

  min-height: 100vh;
  font-family: 'Barlow', sans-serif;

}

/* ─── Page Header ──────────────────────────────────── */
.page-header {
  /*background: linear-gradient(135deg, #0D0F14 0%, #ffffff 60%, #1a1f2e 100%);*/
  border-bottom: 1px solid rgba(255,255,255,0.06);
}
.header-icon-wrap {
  width: 40px;
  height: 40px;
  border-radius: 10px;
  background: linear-gradient(135deg, #E63A2E, #FF6B35);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #000;
  flex-shrink: 0;
}
.page-title {
  font-family: 'Barlow Condensed', sans-serif;
  font-size: 2rem;
  font-weight: 700;
  letter-spacing: 0.02em;
  color: #000;
  margin: 0;
}
.page-subtitle {
  color: #000;
  font-size: 0.95rem;
  margin: 0;
  padding-left: 52px;
}

/* ─── Stats Bar ────────────────────────────────────── */
.stats-bar {
  display: flex;
  align-items: center;
/*  background: #ffffff;*/
  border: 1px solid rgba(255,255,255,0.07);
  border-radius: 14px;
  padding: 20px 32px;
  gap: 0;
}
.stat-item {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
}
.stat-number {
  font-family: 'Barlow Condensed', sans-serif;
  font-size: 2rem;
  font-weight: 700;
  color: #E63A2E;
  line-height: 1;
}
.stat-label {
  font-size: 0.8rem;
  color: #000;
  text-transform: uppercase;
  letter-spacing: 0.06em;
}
.stat-divider {
  width: 1px;
  height: 40px;
  background: rgba(255,255,255,0.08);
  margin: 0 8px;
}

/* ─── Section Header ───────────────────────────────── */
.section-header { display: flex; flex-direction: column; gap: 4px; }
.section-badge {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  font-size: 0.72rem;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  padding: 4px 10px;
  border-radius: 20px;
  width: fit-content;
}
.pending-badge { background: rgba(230,58,46,0.15); color: #E63A2E; border: 1px solid rgba(230,58,46,0.3); }
.reviewed-badge { background: rgba(34,197,94,0.12); color: #22C55E; border: 1px solid rgba(34,197,94,0.25); }
.section-title {
  font-family: 'Barlow Condensed', sans-serif;
  font-size: 1.5rem;
  font-weight: 700;
  color: #000;
  margin: 0;
}
.section-desc { color: #000; font-size: 0.88rem; margin: 0; }

/* ─── Products Grid ────────────────────────────────── */
.products-grid { display: flex; flex-direction: column; gap: 12px; }

.product-card {
  background: #ffffff;
  border: 1px solid rgba(255,255,255,0.07);
  border-radius: 16px;
  overflow: hidden;
  transition: border-color 0.2s;
}
.product-card.is-expanded {
  border-color: rgba(230,58,46,0.4);
  box-shadow: 0 0 0 1px rgba(230,58,46,0.15);
}

.card-top {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 16px 20px;
}

.product-img-wrap { position: relative; flex-shrink: 0; }
.product-img {
  width: 80px;
  height: 80px;
  object-fit: cover;
  border-radius: 10px;
  background: #1E2435;
}
.purchase-badge {
  position: absolute;
  bottom: -6px;
  left: 50%;
  transform: translateX(-50%);
  background: #22C55E;
  color: #fff;
  font-size: 0.62rem;
  font-weight: 700;
  padding: 2px 7px;
  border-radius: 20px;
  white-space: nowrap;
  display: flex;
  align-items: center;
  gap: 3px;
}

.product-info { flex: 1; min-width: 0; }
.product-category {
  font-size: 0.72rem;
  color: #E63A2E;
  font-weight: 600;
  letter-spacing: 0.06em;
  text-transform: uppercase;
}
.product-name {
  font-family: 'Barlow Condensed', sans-serif;
  font-size: 1.1rem;
  font-weight: 700;
  color: #000;
  margin: 2px 0 4px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.product-meta {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 0.8rem;
  color: #000;
}
.dot { color: #000; }
.product-price {
  font-family: 'Barlow Condensed', sans-serif;
  font-size: 1rem;
  font-weight: 600;
  color: #000;
  margin-top: 4px;
}

.review-toggle-btn {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 9px 18px;
  background: linear-gradient(135deg, #E63A2E, #FF6B35);
  color: #fff;
  border: none;
  border-radius: 10px;
  font-family: 'Barlow', sans-serif;
  font-size: 0.85rem;
  font-weight: 600;
  cursor: pointer;
  transition: opacity 0.2s, transform 0.1s;
  white-space: nowrap;
  flex-shrink: 0;
}
.review-toggle-btn:hover { opacity: 0.88; transform: translateY(-1px); }
.review-toggle-btn:active { transform: translateY(0); }

/* ─── Review Form ──────────────────────────────────── */
.form-divider { height: 1px; background: rgba(255,255,255,0.06); margin: 0 20px; }
.review-form { padding: 20px; }

.form-label {
  display: block;
  font-size: 0.8rem;
  font-weight: 600;
  color: #000;
  text-transform: uppercase;
  letter-spacing: 0.07em;
  margin-bottom: 8px;
}

.star-selector { display: flex; align-items: center; gap: 4px; }
.star-btn {
  background: none;
  border: none;
  cursor: pointer;
  color: #2D3748;
  padding: 2px;
  transition: transform 0.15s, color 0.15s;
}
.star-btn:hover, .star-btn.hover, .star-btn.active { color: #F59E0B; transform: scale(1.15); }
.rating-label-text {
  font-size: 0.85rem;
  color: #F59E0B;
  font-weight: 600;
  margin-left: 8px;
}

.form-input, .form-textarea {
  width: 100%;
  background: #0D0F14;
  border: 1px solid rgba(255,255,255,0.1);
  border-radius: 10px;
  padding: 11px 14px;
  color: #000;
  font-family: 'Barlow', sans-serif;
  font-size: 0.95rem;
  outline: none;
  transition: border-color 0.2s;
  resize: none;
  box-sizing: border-box;
}
.form-input:focus, .form-textarea:focus { border-color: rgba(230,58,46,0.5); }
.form-input::placeholder, .form-textarea::placeholder { color: #000; }
.char-count { text-align: right; font-size: 0.75rem; color: #000; margin-top: 4px; }

/* ─── Quick Tags ───────────────────────────────────── */
.quick-tags { display: flex; gap: 20px; }
.tags-col { flex: 1; }
.tags-header {
  display: flex;
  align-items: center;
  gap: 5px;
  font-size: 0.75rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.07em;
  margin-bottom: 8px;
}
.tags-header.pro { color: #22C55E; }
.tags-header.con { color: #F87171; }
.tag-list { display: flex; flex-wrap: wrap; gap: 6px; }
.tag-chip {
  background: none;
  border: 1px solid rgba(255,255,255,0.1);
  border-radius: 20px;
  padding: 4px 12px;
  font-family: 'Barlow', sans-serif;
  font-size: 0.78rem;
  color: #000;
  cursor: pointer;
  transition: all 0.15s;
}
.pro-chip.selected, .pro-chip:hover { border-color: #22C55E; color: #22C55E; background: rgba(34,197,94,0.08); }
.con-chip.selected, .con-chip:hover { border-color: #F87171; color: #F87171; background: rgba(248,113,113,0.08); }

/* ─── Form Actions ─────────────────────────────────── */
.form-actions { display: flex; justify-content: flex-end; gap: 10px; }
.btn-cancel {
  background: none;
  border: 1px solid rgba(255,255,255,0.1);
  border-radius: 10px;
  padding: 9px 18px;
  color: #000;
  font-family: 'Barlow', sans-serif;
  font-size: 0.85rem;
  cursor: pointer;
  transition: all 0.15s;
}
.btn-cancel:hover { border-color: rgba(255,255,255,0.2); color: #000; }
.btn-submit {
  display: flex;
  align-items: center;
  gap: 7px;
  background: linear-gradient(135deg, #E63A2E, #FF6B35);
  border: none;
  border-radius: 10px;
  padding: 9px 22px;
  color: #fff;
  font-family: 'Barlow', sans-serif;
  font-size: 0.88rem;
  font-weight: 600;
  cursor: pointer;
  transition: opacity 0.2s;
}
.btn-submit:disabled { opacity: 0.35; cursor: not-allowed; }
.btn-submit:not(:disabled):hover { opacity: 0.88; }

/* ─── Reviewed Cards ───────────────────────────────── */
.reviewed-list { display: flex; flex-direction: column; gap: 12px; }

.reviewed-card {
  background: #ffffff;
  border: 1px solid rgba(255,255,255,0.07);
  border-radius: 16px;
  padding: 20px;
  display: flex;
  gap: 20px;
}

.reviewed-product-side {
  display: flex;
  gap: 14px;
  flex-shrink: 0;
  width: 220px;
  border-right: 1px solid rgba(255,255,255,0.06);
  padding-right: 20px;
}
.reviewed-img {
  width: 64px;
  height: 64px;
  object-fit: cover;
  border-radius: 10px;
  background: #1E2435;
  flex-shrink: 0;
}
.reviewed-product-info { display: flex; flex-direction: column; gap: 2px; }
.reviewed-name {
  font-family: 'Barlow Condensed', sans-serif;
  font-size: 1rem;
  font-weight: 700;
  color: #000;
  margin: 2px 0 0;
  line-height: 1.2;
}
.order-num { font-size: 0.75rem; color: #000000; }

.reviewed-content-side { flex: 1; min-width: 0; }
.reviewed-header {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 8px;
  flex-wrap: wrap;
}
.star-display { display: flex; gap: 2px; }
.review-date { font-size: 0.78rem; color: #000000; margin-left: auto; }
.review-helpful {
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 0.75rem;
  color: #000000;
}
.review-title {
  font-family: 'Barlow Condensed', sans-serif;
  font-size: 1.05rem;
  font-weight: 700;
  color: #000;
  margin: 0 0 6px;
}
.review-body {
  font-size: 0.88rem;
  color: #000;
  line-height: 1.6;
  margin: 0 0 10px;
}
.review-tags-row { display: flex; flex-wrap: wrap; gap: 6px; margin-bottom: 12px; }
.mini-tag {
  font-size: 0.72rem;
  font-weight: 600;
  padding: 3px 10px;
  border-radius: 20px;
}
.pro-mini { background: rgba(34,197,94,0.1); color: #22C55E; border: 1px solid rgba(34,197,94,0.2); }
.con-mini { background: rgba(248,113,113,0.1); color: #F87171; border: 1px solid rgba(248,113,113,0.2); }

.reviewed-actions { display: flex; gap: 14px; }
.action-link {
  display: flex;
  align-items: center;
  gap: 5px;
  background: none;
  border: none;
  font-family: 'Barlow', sans-serif;
  font-size: 0.8rem;
  cursor: pointer;
  padding: 0;
  transition: color 0.15s;
}
.edit-link { color: #000; }
.edit-link:hover { color: #000; }
.delete-link { color: #000; }
.delete-link:hover { color: #F87171; }

/* ─── Empty State ──────────────────────────────────── */
.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  padding: 48px;
  background: #ffffff;
  border: 1px dashed rgba(255,255,255,0.08);
  border-radius: 16px;
  color: #000;
  text-align: center;
}

/* ─── Transition ───────────────────────────────────── */
.slide-down-enter-active, .slide-down-leave-active {
  transition: all 0.28s cubic-bezier(0.4, 0, 0.2, 1);
  overflow: hidden;
}
.slide-down-enter-from, .slide-down-leave-to {
  max-height: 0;
  opacity: 0;
  transform: translateY(-8px);
}
.slide-down-enter-to, .slide-down-leave-from {
  max-height: 800px;
  opacity: 1;
  transform: translateY(0);
}

/* ─── Responsive ───────────────────────────────────── */
@media (max-width: 700px) {
  .reviewed-card { flex-direction: column; }
  .reviewed-product-side { width: auto; border-right: none; border-bottom: 1px solid rgba(255,255,255,0.06); padding-right: 0; padding-bottom: 14px; }
  .quick-tags { flex-direction: column; }
  .card-top { flex-wrap: wrap; }
  .review-toggle-btn { width: 100%; justify-content: center; }
  .stats-bar { padding: 16px; }
}
</style>
