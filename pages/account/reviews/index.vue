<script setup>
import { ref, computed } from 'vue'
import ReviewForm from "@/pages/account/reviews/review-form.vue"
import { extractYoutubeId, getDataImageUrl } from "@core/utils/formatters.js"

definePageMeta({
  alias: '/cuenta/evaluaciones',
  layout: 'account',
  middleware: 'auth', // Must match the filename (auth.ts)
})


// ─── State ───────────────────────────────────────────────────
const expandedId = ref(null)
const hoverRating = ref(0)
const snackbar = ref(false)
const loading = ref(false)

const ratingLabels = ['Muy malo', 'Malo', 'Regular', 'Bueno', '¡Excelente!']

const proTags = ['Buena calidad', 'Fácil de instalar', 'Duradero', 'Buen precio', 'Como en la foto']
const conTags = ['Instalación difícil', 'Calidad mejorable', 'Llegó tarde', 'Embalaje deficiente']

// ─── Mock Data ───────────────────────────────────────────────
const wuid = useGuestUser().value

const { data, refresh } = await useFetch("/api/account/reviews",
  { key: "reviews-" + wuid },
)

const pendingProducts = computed( () => {
  return data.value?.pending
})

const reviewedProducts = computed( () => {
  return data.value?.reviewed
})

const getVideoThumb = videoUrl => {
  const id = extractYoutubeId(videoUrl)
  
  return `https://img.youtube.com/vi/${id}/hqdefault.jpg`
}

// ─── Computed ─────────────────────────────────────────────────
const averageRating = computed(() => {
  if (!reviewedProducts.value?.length) return '—'
  const avg = reviewedProducts.value.reduce((s, p) => s + p.review.rating, 0) / reviewedProducts.value.length
  
  return avg.toFixed(1)
})

const onRated = () => {
  loading.value = true
  try {
    refresh()
  }finally{
    loading.value = false
  }
}

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

const deleteReview = async id => {

  await $fetch("/api/account/reviews/" + id, {
    method: "DELETE",
  }  )

  await refresh()

  // data.value.reviewed = data.value.reviewed.filter(p => p.review.id !== id)
}
</script>

<template>
  <VContainer
    fluid
    class="account-reviews pa-0 ma-0 w-100"
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
      class="px-2 pb-10"
    >
      <!-- Stats Bar -->
      <div class="stats-bar mb-8">
        <div class="stat-item">
          <span class="stat-number">{{ pendingProducts?.length }}</span>
          <span class="stat-label">Por reseñar</span>
        </div>
        <div class="stat-divider" />
        <div class="stat-item">
          <span class="stat-number">{{ reviewedProducts?.length }}</span>
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
          v-if="loading"
          class="w-100 d-flex justify-center pa-10"
        >
          <VProgressCircular
            indeterminate
            color="primary"
            size="40"
          />
        </div>
        <div
          v-if="pendingProducts?.length === 0"
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
          v-else-if="!loading"
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
                <a :href="getProductUrl(product.product)">
                  <img
                    :src="getImageUrl(product.product.image, 300, getDomainId())"
                    :alt="product.product.fullName"
                    class="product-img"
                  >
                </a>
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
                <span class="product-category">{{ product.product.parentCategories[0]?.name }}</span>
                <h3 class="product-name">
                  {{ product.product.fullName }}
                </h3>
                <div class="product-meta">
                  <span class="order-num">Factura #{{ product.invoiceNumber }}</span>
                  <span class="dot">·</span>
                  <span class="purchase-date">{{ formatDate(product.invoiceDate) }} </span>
                </div>
                <div class="product-price">
                  {{ formatMoney(product.price) }}
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
                  stroke-linecap="round"
                  stroke-linejoin="round"
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
                  stroke-linecap="round"
                  stroke-linejoin="round"
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
              <ReviewForm
                v-if="expandedId === product.id"
                :product="product.product"
                :invoice-id="product.invoiceId"
                :product-item-id="product.productItemId"
                @on-rated="onRated"
                @on-cancel="toggleExpand(product.id)"
              />
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
          v-if="reviewedProducts?.length === 0"
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
              <a :href="getProductUrl(product.product)">
                <img
                  :src="getImageUrl(product.product.image, 300, getDomainId())"
                  :alt="product.product.fullName"
                  class="reviewed-img"
                >

              </a>


              <div class="reviewed-product-info">
                <span class="product-category">{{ product.product.parentCategories[0].name }}</span>
                <h3 class="reviewed-name">
                  {{ product.product.fullName }}
                </h3>
                <span class="order-num">Pedido #{{ product.invoiceNumber }}</span>


                <div
                  class="purchase-badge"
                  style="position:relative"
                >
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
            </div>

            <div class="reviewed-content-side">
              <div class="reviewed-header">
                <VRating
                  readonly
                  color="#F59E0B"
                  :model-value="product.review.rating / 2"
                />


                <span class="review-date">{{ formatDate(product.review?.date) }}</span>
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
                  {{ product.review?.likes }} útil
                </div>
              </div>
              <h4 class="review-title">
                {{ product.review?.title }}
              </h4>
              <p class="review-body">
                {{ product.review?.body }}
              </p>
              <div style="border-top: 1px solid #ccc;margin-top: 10px;padding-top: 15px;">
                <div>
                  <VCol v-if="product.review?.videoUrl">
                    <div class="thumbnail-wrapper">
                      <img
                        :src="getVideoThumb(product.review?.videoUrl)"
                        alt="Vista previa del video"
                        class="thumbnail-img"
                      >
                      <div class="thumbnail-play-icon">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 68 48"
                          width="68"
                          height="48"
                        >
                          <path
                            d="M66.52 7.74c-.78-2.93-2.49-5.41-5.42-6.19C55.79.13 34 0 34 0S12.21.13 6.9 1.55c-2.93.78-4.63 3.26-5.42 6.19C.06 13.05 0 24 0 24s.06 10.95 1.48 16.26c.78 2.93 2.49 5.41 5.42 6.19C12.21 47.87 34 48 34 48s21.79-.13 27.1-1.55c2.93-.78 4.64-3.26 5.42-6.19C67.94 34.95 68 24 68 24s-.06-10.95-1.48-16.26z"
                            fill="#f00"
                          />
                          <path
                            d="M45 24 27 14v20"
                            fill="#fff"
                          />
                        </svg>
                      </div>
                    </div>
                  </VCol>
                </div>
                <div
                  v-if="product.review?.configuration?.images"
                  class="review-images v-row ml-1"
                >
                  <VCol
                    v-for="(image, index) in product.review?.configuration?.images"
                    :key="index"
                    cols="6"
                    sm="6"
                    md="3"
                    class="mr-5"
                  >
                    <div
                      class="review-file-upload"
                      :style="{ backgroundImage: `url(${getImageUrl(image.id, 300, getDomainId())})` }"
                    />
                  </VCol>
                </div>
              </div>
              <div
                v-if="product.review?.pros?.length || product.review?.cons?.length"
                class="review-tags-row"
              >
                <span
                  v-for="t in product.review?.pros"
                  :key="t"
                  class="mini-tag pro-mini"
                >+ {{ t }}</span>
                <span
                  v-for="t in product.review?.cons"
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
                  @click="deleteReview(product.review.id)"
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


<style>
/* ─── Base ─────────────────────────────────────────── */
.account-reviews {
/*  background: #F4F6F9;*/
  min-height: 100vh;
  font-family: 'Barlow', sans-serif;
  color: #1E293B;
}

/* ─── Page Header ──────────────────────────────────── */
.page-header {
  /*background: linear-gradient(135deg, #ffffff 0%, #F8FAFC 60%, #EEF2F7 100%);*/
  border-bottom: 1px solid #E2E8F0;
}
.header-icon-wrap {
  width: 40px;
  height: 40px;
  border-radius: 5px;
  background: #d6001c;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  flex-shrink: 0;
  box-shadow: 0 4px 12px rgba(230,58,46,0.25);
}
.page-title {
  font-family: 'Barlow Condensed', sans-serif;
  font-size: 2rem;
  font-weight: 700;
  letter-spacing: 0.02em;
  color: #0F172A;
  margin: 0;
}
.page-subtitle {
  color: #94A3B8;
  font-size: 0.95rem;
  margin: 0;
  padding-left: 52px;
}

/* ─── Stats Bar ────────────────────────────────────── */
.stats-bar {
  display: flex;
  align-items: center;
  background: #ffffff;
  border: 1px solid #E2E8F0;
  border-radius: 4px;
  padding: 20px 32px;
  gap: 0;
  box-shadow: 0 1px 4px rgba(0,0,0,0.05);
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
  color: #d6001c;
  line-height: 1;
}
.stat-label {
  font-size: 0.8rem;
  color: #94A3B8;
  text-transform: uppercase;
  letter-spacing: 0.06em;
}
.stat-divider {
  width: 1px;
  height: 40px;
  background: #E2E8F0;
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
.pending-badge { background: rgba(230,58,46,0.08); color: #C53030; border: 1px solid rgba(230,58,46,0.2); }
.reviewed-badge { background: rgba(22,163,74,0.08); color: #16A34A; border: 1px solid rgba(22,163,74,0.2); }
.section-title {
  font-family: 'Barlow Condensed', sans-serif;
  font-size: 1.5rem;
  font-weight: 700;
  color: #0F172A;
  margin: 0;
}
.section-desc { color: #94A3B8; font-size: 0.88rem; margin: 0; }

/* ─── Products Grid ────────────────────────────────── */
.products-grid { display: flex; flex-direction: column; gap: 12px; }

.product-card {
  background: #ffffff;
  border: 1px solid #E2E8F0;
  border-radius: 0px;
  overflow: hidden;
  transition: border-color 0.2s, box-shadow 0.2s;
  box-shadow: 0 1px 4px rgba(0,0,0,0.04);
}
.product-card.is-expanded {
  border-color: rgba(230,58,46,0.35);
  box-shadow: 0 0 0 3px rgba(230,58,46,0.08), 0 2px 8px rgba(0,0,0,0.06);
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
  background: #F1F5F9;
}
.purchase-badge {
  position: absolute;
  bottom: -6px;
  left: 50%;
  transform: translateX(-50%);
  background: #16A34A;
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
  color: #0F172A;
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
  color: #94A3B8;
}
.dot { color: #CBD5E1; }
.product-price {
  font-family: 'Barlow Condensed', sans-serif;
  font-size: 1rem;
  font-weight: 600;
  color: #475569;
  margin-top: 4px;
}

.review-toggle-btn {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 9px 18px;
  background: #d6001c;
  color: #fff;
  border: none;
  border-radius: 0px;
  font-family: 'Barlow', sans-serif;
  font-size: 0.85rem;
  font-weight: 600;
  cursor: pointer;
  transition: opacity 0.2s, transform 0.1s;
  white-space: nowrap;
  flex-shrink: 0;
  box-shadow: 0 3px 10px rgba(230,58,46,0.25);
}
.review-toggle-btn:hover { opacity: 0.88; transform: translateY(-1px); }
.review-toggle-btn:active { transform: translateY(0); }

/* ─── Review Form ──────────────────────────────────── */
.form-divider { height: 1px; background: #F1F5F9; margin: 0 20px; }
.review-form { padding: 20px; background: #FAFBFD; }

.form-label {
  display: block;
  font-size: 0.8rem;
  font-weight: 600;
  color: #64748B;
  text-transform: uppercase;
  letter-spacing: 0.07em;
  margin-bottom: 8px;
}

.star-selector { display: flex; align-items: center; gap: 4px; }
.star-btn {
  background: none;
  border: none;
  cursor: pointer;
  color: #CBD5E1;
  padding: 2px;
  transition: transform 0.15s, color 0.15s;
}
.star-btn:hover, .star-btn.hover, .star-btn.active { color: #E63A2E; transform: scale(1.15); }
.rating-label-text {
  font-size: 0.85rem;
  color: #E63A2E;
  font-weight: 600;
  margin-left: 8px;
}

.form-input, .form-textarea {
  width: 100%;
  background: #ffffff;
  border: 1px solid #E2E8F0;
  border-radius: 0px;
  padding: 11px 14px;
  color: #1E293B;
  font-family: 'Barlow', sans-serif;
  font-size: 0.95rem;
  outline: none;
  transition: border-color 0.2s, box-shadow 0.2s;
  resize: none;
  box-sizing: border-box;
}
.form-input:focus, .form-textarea:focus {
  border-color: rgba(230,58,46,0.4);
  box-shadow: 0 0 0 3px rgba(230,58,46,0.08);
}
.form-input::placeholder, .form-textarea::placeholder { color: #CBD5E1; }
.char-count { text-align: right; font-size: 0.75rem; color: #CBD5E1; margin-top: 4px; }

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
.tags-header.pro { color: #16A34A; }
.tags-header.con { color: #DC2626; }
.tag-list { display: flex; flex-wrap: wrap; gap: 6px; }
.tag-chip {
  background: #ffffff;
  border: 1px solid #E2E8F0;
  border-radius: 20px;
  padding: 4px 12px;
  font-family: 'Barlow', sans-serif;
  font-size: 0.78rem;
  color: #64748B;
  cursor: pointer;
  transition: all 0.15s;
}
.pro-chip.selected, .pro-chip:hover { border-color: #16A34A; color: #16A34A; background: rgba(22,163,74,0.06); }
.con-chip.selected, .con-chip:hover { border-color: #DC2626; color: #DC2626; background: rgba(220,38,38,0.06); }

/* ─── Form Actions ─────────────────────────────────── */
.form-actions { display: flex; justify-content: flex-end; gap: 10px; }
.btn-cancel {
  background: #ffffff;
  border: 1px solid #E2E8F0;
  border-radius: 10px;
  padding: 9px 18px;
  color: #64748B;
  font-family: 'Barlow', sans-serif;
  font-size: 0.85rem;
  cursor: pointer;
  transition: all 0.15s;
}
.btn-cancel:hover { border-color: #CBD5E1; color: #475569; background: #F8FAFC; }
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
  box-shadow: 0 3px 10px rgba(230,58,46,0.25);
}
.btn-submit:disabled { opacity: 0.35; cursor: not-allowed; box-shadow: none; }
.btn-submit:not(:disabled):hover { opacity: 0.88; }

/* ─── Reviewed Cards ───────────────────────────────── */
.reviewed-list { display: flex; flex-direction: column; gap: 12px; }

.reviewed-card {
  background: #ffffff;
  border: 1px solid #E2E8F0;
  /*border-radius: 16px;*/
  padding: 20px;
  display: flex;
  gap: 20px;
  box-shadow: 0 1px 4px rgba(0,0,0,0.04);
}

.reviewed-product-side {
  display: flex;
  gap: 14px;
  flex-shrink: 0;
  width: 220px;
  border-right: 1px solid #F1F5F9;
  padding-right: 20px;
}
.reviewed-img {
  width: 64px;
  height: 64px;
  object-fit: cover;
  border-radius: 10px;
  background: #F1F5F9;
  flex-shrink: 0;
}
.reviewed-product-info { display: flex; flex-direction: column; gap: 2px; }
.reviewed-name {
  font-family: 'Barlow Condensed', sans-serif;
  font-size: 1rem;
  font-weight: 700;
  color: #0F172A;
  margin: 2px 0 0;
  line-height: 1.2;
}
.order-num { font-size: 0.75rem; color: #94A3B8; }

.reviewed-content-side { flex: 1; min-width: 0; }
.reviewed-header {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 8px;
  flex-wrap: wrap;
}
.star-display { display: flex; gap: 2px; }
.review-date { font-size: 0.78rem; color: #94A3B8; margin-left: auto; }
.review-helpful {
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 0.75rem;
  color: #94A3B8;
}
.review-title {
  font-family: 'Barlow Condensed', sans-serif;
  font-size: 1.05rem;
  font-weight: 700;
  color: #0F172A;
  margin: 0 0 6px;
}
.review-body {
  font-size: 0.88rem;
  color: #64748B;
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
.pro-mini { background: rgba(22,163,74,0.08); color: #16A34A; border: 1px solid rgba(22,163,74,0.18); }
.con-mini { background: rgba(220,38,38,0.07); color: #DC2626; border: 1px solid rgba(220,38,38,0.18); }

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
.edit-link { color: #94A3B8; }
.edit-link:hover { color: #475569; }
.delete-link { color: #94A3B8; }
.delete-link:hover { color: #DC2626; }

/* ─── Empty State ──────────────────────────────────── */
.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  padding: 48px;
  background: #ffffff;
  border: 1.5px dashed #E2E8F0;
  border-radius: 0px;
  color: #CBD5E1;
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
  .reviewed-product-side { width: auto; border-right: none; border-bottom: 1px solid #F1F5F9; padding-right: 0; padding-bottom: 14px; }
  .quick-tags { flex-direction: column; }
  .card-top { flex-wrap: wrap; }
  .review-toggle-btn { width: 100%; justify-content: center; }
  .stats-bar { padding: 16px; }
}


.youtube-thumbnail-preview {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 6px;
}

.thumbnail-wrapper {
  position: relative;
  display: inline-block;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  cursor: pointer;
  max-width: 320px;
  width: 100%;
}

.thumbnail-img {
  display: block;
  width: 100%;
  aspect-ratio: 16 / 9;
  object-fit: cover;
}

.thumbnail-play-icon {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.2);
  transition: background 0.2s ease;
}

.thumbnail-wrapper:hover .thumbnail-play-icon {
  background: rgba(0, 0, 0, 0.35);
}

.thumbnail-caption {
  font-size: 0.75rem;
  color: rgba(0, 0, 0, 0.5);
  margin: 0;
}

.video-input-div {
  position: relative;

  font-size: 16px
}

.review-file-upload {
  background-size: cover;
  background-position: 50%;
  position: relative;
  overflow: hidden;
  border: 1px solid #bdbdbd;
  height: 155px;
  /*
  width: 145px;
  */
  text-align: center;
  border-radius: 3px;
  margin-bottom: 20px
}
</style>
