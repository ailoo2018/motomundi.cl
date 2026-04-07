<script setup>
import { ref, computed } from 'vue'

useHead({
  title: 'Formulario de Contácto | Motomundi',
})

const categories = [
  {
    id: 'stock',
    label: 'Disponibilidad y Stock',
    short: 'Stock',
    icon: 'tabler-package',
    description: 'Existencia de productos, tallas y artículos en tiendas'
  },
  {
    id: 'productos',
    label: 'Información de Productos',
    short: 'Productos',
    icon: 'tabler-helmet',
    description: 'Especificaciones técnicas, compatibilidad y medidas'
  },
  {
    id: 'pedido',
    label: 'Estado de Pedido',
    short: 'Pedido',
    icon: 'tabler-truck-delivery',
    description: 'Seguimiento de compras y reclamos por retrasos'
  },
  {
    id: 'internacional',
    label: 'Envíos Internacionales',
    short: 'Internacional',
    icon: 'tabler-world',
    description: 'Despachos a Latam'
  },
  {
    id: 'sucursales',
    label: 'Servicio al Cliente',
    short: 'Sucursales',
    icon: 'tabler-building-store',
    description: 'Ubicaciones, horarios y políticas'
  },
  {
    id: 'postventa',
    label: 'Post-venta y Errores',
    short: 'Post-venta',
    icon: 'tabler-refresh-alert',
    description: 'Incidentes tras recibir tu pedido'
  }
]

const form = ref({
  nombre: '',
  email: '',
  telefono: '',
  categoria: '',
  consulta: ''
})

const formValid = ref(false)
const loading = ref(false)
const success = ref(false)
const error = ref(false)

const selectedCategory = computed(() =>
  categories.find(c => c.id === form.value.categoria)
)

const nameRules = [
  v => !!v || 'El nombre es requerido',
  v => (v && v.length >= 3) || 'Mínimo 3 caracteres'
]
const emailRules = [
  v => !!v || 'El email es requerido',
  v => /.+@.+\..+/.test(v) || 'Email inválido'
]
const phoneRules = [
  v => !!v || 'El teléfono es requerido'
]
const categoryRules = [
  v => !!v || 'Selecciona una categoría'
]
const messageRules = [
  v => !!v || 'La consulta es requerida',
  v => (v && v.length >= 10) || 'Mínimo 10 caracteres'
]

const submitForm = async () => {
  if (!formValid.value) return
  loading.value = true
  error.value = false
  success.value = false
  try {
    await $fetch('/api/contact', {
      method: 'POST',
      body: form.value
    })
    success.value = true
    resetForm()
    window.scrollTo({ top: 0, behavior: 'smooth' })
  } catch (e) {
    error.value = true
    console.error('Error sending form:', e)
  } finally {
    loading.value = false
  }
}

const resetForm = () => {
  form.value = { nombre: '', email: '', telefono: '', categoria: '', consulta: '' }
}

const selectCategory = (id) => {
  form.value.categoria = id
}
</script>

<template>
  <div class="contact-page">
    <VContainer fluid class="pa-0">

      <!-- ─── HERO ─── -->
      <section class="hero">
        <div class="hero-bg" />
        <div class="hero-overlay" />
        <div class="hero-content">
          <div class="hero-eyebrow">MotoMundi · Soporte</div>
          <h1 class="header-title">Atención<br><em>al Cliente</em></h1>
          <p class="header-sub">Responderemos en un plazo de 24–48 horas hábiles</p>
        </div>
      </section>

      <!-- ── ALERTS ──────────────────────────────────── -->
      <VRow v-if="success || error" justify="center" class="px-4 mt-6">
        <VCol cols="12" lg="10">
          <VAlert
            v-if="success"
            type="success"
            variant="tonal"
            closable
            @click:close="success = false"
            class="rounded-0 alert-custom"
          >
            <VAlertTitle class="text-uppercase font-weight-bold">¡Consulta recibida!</VAlertTitle>
            Nos pondremos en contacto contigo pronto.
          </VAlert>
          <VAlert
            v-if="error"
            type="error"
            variant="tonal"
            closable
            @click:close="error = false"
            class="rounded-0 alert-custom"
          >
            <VAlertTitle class="text-uppercase font-weight-bold">Error al enviar</VAlertTitle>
            Por favor intenta nuevamente.
          </VAlert>
        </VCol>
      </VRow>

      <!-- ── MAIN GRID ───────────────────────────────── -->
      <VRow class="main-grid px-2 px-md-6 mt-0" no-gutters>

        <!-- LEFT: Contact Info -->
        <VCol cols="12" lg="4" class="info-col pa-3 pa-md-4">

          <div class="info-block">
            <div class="info-block-icon">
              <VIcon icon="tabler-phone" size="22" />
            </div>
            <div>
              <p class="info-block-title">Por Teléfono</p>
              <div class="contact-row">
                <span class="contact-lbl">Central</span>
                <a href="tel:+56226660690" class="contact-val">+562 2666 0690</a>
              </div>
              <div class="contact-row">
                <span class="contact-lbl">WhatsApp</span>
                <a href="https://wa.me/56952245020" target="_blank" class="contact-val whatsapp">
                  +56 9 5224 5020
                </a>
              </div>
              <div class="contact-row">
                <span class="contact-lbl">Neumáticos</span>
                <a href="tel:+56226660690,47" class="contact-val">+562 2666 0690 · Anexo 47</a>
              </div>
              <p class="schedule-note">
                <VIcon icon="tabler-clock" size="14" class="mr-1" />
                Lun–Vie · 09:00 – 18:30 h
              </p>
            </div>
          </div>

          <div class="divider-line" />

          <div class="info-block">
            <div class="info-block-icon">
              <VIcon icon="tabler-map-pin" size="22" />
            </div>
            <div>
              <p class="info-block-title">En nuestras Tiendas</p>
              <p class="info-desc">
                <strong>8 tiendas físicas</strong> en Santiago, Viña del Mar,
                Concepción y La Serena.
              </p>
              <NuxtLink to="/tiendas" class="cta-link">
                Ver ubicaciones y horarios
                <VIcon icon="tabler-arrow-right" size="16" class="ml-1" />
              </NuxtLink>
            </div>
          </div>

          <div class="divider-line" />

          <div class="info-block">
            <div class="info-block-icon">
              <VIcon icon="tabler-mail" size="22" />
            </div>
            <div>
              <p class="info-block-title">Por Formulario</p>
              <p class="info-desc">
                Completa el formulario con tu consulta y te responderemos a la brevedad.
              </p>
            </div>
          </div>

        </VCol>

        <!-- RIGHT: Form -->
        <VCol cols="12" lg="8" class="form-col pa-3 pa-md-4">
          <div class="form-card">

            <div class="form-header">
              <h2 class="form-title">Envíanos tu consulta</h2>
            </div>

            <VForm v-model="formValid" @submit.prevent="submitForm" class="form-body">

              <!-- ── CATEGORY SELECTOR ──────────── -->
              <div class="field-group">
                <label class="field-label">
                  Tipo de consulta <span class="req">*</span>
                </label>
                <p class="field-hint">Selecciona la categoría que mejor describe tu consulta</p>

                <div class="category-grid">
                  <button
                    v-for="cat in categories"
                    :key="cat.id"
                    type="button"
                    class="cat-card"
                    :class="{ 'cat-card--active': form.categoria === cat.id }"
                    @click="selectCategory(cat.id)"
                  >
                    <VIcon :icon="cat.icon" size="24" class="cat-icon" />
                    <span class="cat-label">{{ cat.short }}</span>
                    <span class="cat-desc">{{ cat.description }}</span>
                  </button>
                </div>

                <!-- Hidden field for validation -->
                <VTextField
                  v-model="form.categoria"
                  :rules="categoryRules"
                  class="hidden-field"
                  hide-details="auto"
                  density="compact"
                />
                <div v-if="!form.categoria && formValid === false" class="cat-error">
                </div>
              </div>

              <!-- ── PERSONAL FIELDS (2-col on md+) ── -->
              <VRow class="field-row" no-gutters>
                <VCol cols="12" md="6" class="pr-md-3">
                  <div class="field-group">
                    <label class="field-label">Nombre <span class="req">*</span></label>
                    <VTextField
                      v-model="form.nombre"
                      :rules="nameRules"
                      variant="outlined"
                      placeholder="Tu nombre completo"
                      density="comfortable"
                      hide-details="auto"
                      class="mm-input"
                    />
                  </div>
                </VCol>
                <VCol cols="12" md="6" class="pl-md-3 mt-5 mt-md-0">
                  <div class="field-group">
                    <label class="field-label">Teléfono <span class="req">*</span></label>
                    <VTextField
                      v-model="form.telefono"
                      :rules="phoneRules"
                      variant="outlined"
                      placeholder="+56 9 XXXX XXXX"
                      type="tel"
                      density="comfortable"
                      hide-details="auto"
                      class="mm-input"
                    />
                  </div>
                </VCol>
              </VRow>

              <!-- ── EMAIL ──────────────────────── -->
              <div class="field-group mt-5">
                <label class="field-label">Email <span class="req">*</span></label>
                <VTextField
                  v-model="form.email"
                  :rules="emailRules"
                  variant="outlined"
                  placeholder="tu@email.com"
                  type="email"
                  density="comfortable"
                  hide-details="auto"
                  class="mm-input"
                />
              </div>

              <!-- ── MESSAGE ────────────────────── -->
              <div class="field-group mt-5">
                <label class="field-label">
                  Consulta <span class="req">*</span>
                </label>
                <p v-if="selectedCategory" class="field-hint">
                  {{ selectedCategory.label }}: {{ selectedCategory.description }}
                </p>
                <VTextarea
                  v-model="form.consulta"
                  :rules="messageRules"
                  variant="outlined"
                  placeholder="Describe tu consulta con el mayor detalle posible..."
                  rows="5"
                  hide-details="auto"
                  class="mm-input"
                />
              </div>

              <!-- ── SUBMIT ──────────────────────── -->
              <VBtn
                type="submit"
                size="x-large"
                block
                :loading="loading"
                :disabled="!formValid"
                class="submit-btn mt-8"
              >
                <VIcon icon="tabler-send" size="20" class="mr-2" />
                Enviar Consulta
              </VBtn>

              <p class="privacy-note">
                <VIcon icon="tabler-lock" size="13" class="mr-1" />
                Tus datos son tratados de forma confidencial y no serán compartidos con terceros.
              </p>

            </VForm>
          </div>
        </VCol>

      </VRow>
    </VContainer>
  </div>
</template>


<style scoped>
/* ── TOKENS ─────────────────────────────────────────── */
.contact-page {
  --brand: #B21A15;
  --brand-dark: #8a1210;
  --brand-light: rgba(178,26,21,0.08);
  --text: #111;
  --muted: #666;
  --white: #fff;
  --border: #e0e0e0;
  --radius: 4px;
}

.v-container {
  width: 100%;
}


@media (min-width: 960px) {
  .v-container {
    width: 100%;
  }
}

/* ── BASE ────────────────────────────────────────────── */
.contact-page {
  min-height: 100vh;
  background: #fff;

}

/* ─── HERO ─── */
.hero {
  position: relative;
  min-height: 500px;
  display: flex;
  align-items: flex-end;
  overflow: hidden;
}
.hero-bg {
  position: absolute;
  inset: 0;
  background-image: url('/cms/contact-us.jpg');
  background-size: cover;
  background-position: center 45%;
  transform: scale(1.0);
  transition: transform 8s ease;
}

.hero h1 em {
  color: #B21A15;
  font-style: normal;
}

.hero:hover .hero-bg { transform: scale(1); }
.hero-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(to right, rgba(10,10,10,0.92) 0%, rgba(10,10,10,0.55) 55%, rgba(0,0,0,0.15) 100%);
}
.hero-content {
  position: relative;
  z-index: 2;
  padding: 64px 72px;
  max-width: 700px;
}
.hero-eyebrow {
  display: inline-block;
  background: var(--red);
  color: var(--white);
  font-family: 'Barlow Condensed', sans-serif;
  font-weight: 700;
  font-size: 0.7rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  padding: 5px 14px;
  margin-bottom: 22px;
}
.hero h1 {
  font-family: 'Barlow Condensed', sans-serif;
  font-weight: 900;
  font-size: clamp(3.2rem, 6vw, 5.5rem);
  line-height: 0.95;
  color: #fff;
  text-transform: uppercase;
  letter-spacing: -0.01em;
  margin-bottom: 24px;
}

.hero p {
  color: rgba(255,255,255,0.82);
  font-size: 1.05rem;
  font-weight: 300;
  max-width: 520px;
  line-height: 1.7;
}
.hero-content > * { animation: fadeUp 0.7s ease both; }
.hero-content > *:nth-child(1) { animation-delay: 0.1s; }
.hero-content > *:nth-child(2) { animation-delay: 0.25s; }
.hero-content > *:nth-child(3) { animation-delay: 0.4s; }
@keyframes fadeUp {
  from { opacity: 0; transform: translateY(24px); }
  to   { opacity: 1; transform: translateY(0); }
}


/* ── PAGE HEADER ─────────────────────────────────────── */
.page-header {
  position: relative;
  padding: 40px 24px 36px;
  border-bottom: 1px solid var(--border);
  overflow: hidden;
}

.header-accent {
  position: absolute;
  left: 0;
  top: 0;
  width: 6px;
  height: 100%;
  background: #B21A15;
}

.header-inner {
  max-width: 1280px;
  margin: 0 auto;
  padding-left: 20px;
}

.header-eyebrow {
  font-size: 0.7rem;
  letter-spacing: 3px;
  text-transform: uppercase;
  color: #B21A15;
  font-weight: 600;
  margin: 0 0 8px;
}

.header-title {
  font-size: clamp(2rem, 5vw, 3.2rem);
  font-weight: 900;
  text-transform: uppercase;
  letter-spacing: -0.5px;
  line-height: 1.05;
  color: #fff;
  margin: 0 0 12px;
}

.header-sub {
  font-size: 0.88rem;
  color: #666;
  margin: 0;
}

/* ── ALERTS ──────────────────────────────────────────── */
.alert-custom {
  border-left: 4px solid currentColor;
  font-size: 0.9rem;
}

/* ── MAIN GRID ───────────────────────────────────────── */
.main-grid {
  max-width: 1280px;
  margin: 24px auto 48px;
}

/* ── INFO COL ────────────────────────────────────────── */
.info-col {
  border-right: 1px solid var(--border);
}

@media (max-width: 1279px) {
  .info-col {
    border-right: none;
    border-bottom: 1px solid var(--border);
    padding-bottom: 32px !important;
    margin-bottom: 8px;
  }
}

.info-block {
  display: flex;
  gap: 16px;
  align-items: flex-start;
  padding: 20px 0;
}

.info-block-icon {
  flex-shrink: 0;
  width: 40px;
  height: 40px;
  background: var(--brand-light);
  border: 1px solid rgba(178,26,21,0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #B21A15;
  border-radius: var(--radius);
}

.info-block-title {
  font-size: 0.7rem;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 2px;
  color: #B21A15;
  margin: 0 0 12px;
}

.contact-row {
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
}

.contact-lbl {
  font-size: 0.68rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 1.5px;
  color: #999;
}

.contact-val {
  font-size: 0.92rem;
  color: #111;
  text-decoration: none;
  transition: color 0.2s;
}
.contact-val:hover { color: #B21A15; }
.contact-val.whatsapp:hover { color: #25D366; }

.schedule-note {
  display: flex;
  align-items: center;
  font-size: 0.78rem;
  color: #888;
  font-style: italic;
  margin: 10px 0 0;
}

.info-desc {
  font-size: 0.88rem;
  color: #555;
  line-height: 1.6;
  margin: 0 0 12px;
}
.info-desc strong { color: #111; }

.cta-link {
  display: inline-flex;
  align-items: center;
  font-size: 0.72rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 1.5px;
  color: #B21A15;
  text-decoration: none;
  border-bottom: 2px solid #B21A15;
  padding-bottom: 2px;
  transition: opacity 0.2s, transform 0.2s;
}
.cta-link:hover { opacity: 0.75; transform: translateX(2px); }

.divider-line {
  height: 1px;
  background: var(--border);
  margin: 0;
}

/* ── FORM CARD ───────────────────────────────────────── */
.form-col {
  padding-left: 28px !important;
}
@media (max-width: 1279px) {
  .form-col { padding-left: 12px !important; }
}

.form-card {
  background: #fff;
}

.form-header {
  border-bottom: 2px solid #111;
  padding-bottom: 14px;
  margin-bottom: 28px;
}

.form-title {
  font-size: 0.75rem;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 3px;
  color: #111;
  margin: 0;
}

.form-body {
  display: flex;
  flex-direction: column;
}

/* ── FIELD GROUPS ────────────────────────────────────── */
.field-group {
  display: flex;
  flex-direction: column;
}

.field-label {
  font-size: 0.68rem;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 1.5px;
  color: #333;
  margin-bottom: 6px;
}

.field-hint {
  font-size: 0.78rem;
  color: #888;
  margin: 0 0 10px;
  font-style: italic;
}

.req { color: #B21A15; }

/* ── CATEGORY GRID ───────────────────────────────────── */
.category-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 8px;
  margin-bottom: 4px;
}

@media (max-width: 700px) {
  .category-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 400px) {
  .category-grid {
    grid-template-columns: 1fr 1fr;
    gap: 6px;
  }
}

.cat-card {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 6px;
  padding: 14px 12px 12px;
  background: #f9f9f9;
  border: 1.5px solid var(--border);
  border-radius: var(--radius);
  cursor: pointer;
  text-align: left;
  transition: border-color 0.18s, background 0.18s, box-shadow 0.18s;
  outline: none;
}

.cat-card:hover {
  border-color: #B21A15;
  background: var(--brand-light);
}

.cat-card--active {
  border-color: #B21A15;
  background: var(--brand-light);
  box-shadow: inset 3px 0 0 #B21A15;
}

.cat-icon {
  color: #B21A15;
  opacity: 0.7;
  transition: opacity 0.18s;
}
.cat-card--active .cat-icon,
.cat-card:hover .cat-icon {
  opacity: 1;
}

.cat-label {
  font-size: 0.72rem;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  color: #111;
  line-height: 1.2;
}

.cat-desc {
  font-size: 0.7rem;
  color: #888;
  line-height: 1.4;
  display: none;
}

@media (min-width: 960px) {
  .cat-desc { display: block; }
}

/* Hide the validation text field visually but keep it for form validation */
.hidden-field {
  height: 0;
  overflow: hidden;
  opacity: 0;
  pointer-events: none;
  margin: 0;
  padding: 0;
}

.hidden-field :deep(.v-field) { display: none; }
.hidden-field :deep(.v-messages) {
  display: block;
  padding-left: 0;
  margin-top: 4px;
  height: auto;
  opacity: 1;
  pointer-events: auto;
}

/* ── INPUTS ──────────────────────────────────────────── */
.mm-input :deep(.v-field) {
  border-radius: var(--radius);
}
.mm-input :deep(.v-field--focused .v-field__outline) {
  color: #B21A15;
}
.mm-input :deep(.v-field--focused) {
  --v-field-border-opacity: 1;
}

/* ── SUBMIT ──────────────────────────────────────────── */
.submit-btn {
  background: #B21A15 !important;
  color: #fff !important;
  font-size: 0.75rem !important;
  font-weight: 800 !important;
  letter-spacing: 3px !important;
  text-transform: uppercase !important;
  height: 54px !important;
  border-radius: var(--radius) !important;
  transition: background 0.2s, transform 0.1s !important;
}
.submit-btn:hover:not(:disabled) {
  background: #8a1210 !important;
}
.submit-btn:active { transform: scale(0.99); }

.privacy-note {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.72rem;
  color: #aaa;
  margin-top: 14px;
  text-align: center;
}
</style>
