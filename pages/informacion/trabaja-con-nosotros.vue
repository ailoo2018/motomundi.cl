<script setup>
import {
  IconMotorbike,
  IconHelmet,
  IconUsers,
  IconTrophy,
  IconHeartHandshake,
  IconRocket,
  IconUser,
  IconMail,
  IconPhone,
  IconMapPin,
  IconBriefcase,
  IconBuilding,
  IconUpload,
  IconFileCheck,
  IconSend,
  IconShieldLock,
  IconRefresh,
  IconCircleCheck,
} from '@tabler/icons-vue'

useHead({
  title: "Trabaja con Nostros",
})


// ─── Benefits ───────────────────────────────────────────────────────────────
const benefits = [
  {
    icon: IconHeartHandshake,
    title: 'Cultura de comunidad',
    desc: 'Trabajamos en equipo, nos apoyamos y celebramos juntos. El espíritu moto está en todo lo que hacemos.',
    featured: false,
  },
  {
    icon: IconRocket,
    title: 'Crecimiento real',
    desc: 'Capacitación continua, planes de carrera y oportunidades concretas para desarrollarte como profesional.',
    featured: true,
  },
  {
    icon: IconTrophy,
    title: 'Beneficios exclusivos',
    desc: 'Descuentos en productos, acceso anticipado a nuevas colecciones y beneficios pensados para quienes aman las motos.',
    featured: false,
  },
  {
    icon: IconUsers,
    title: 'Equipo diverso e inclusivo',
    desc: 'Valoramos cada perspectiva y promovemos activamente la igualdad de oportunidades en todos nuestros procesos.',
    featured: false,
  },
]

// ─── Values ─────────────────────────────────────────────────────────────────
const values = [
  {
    title: 'Pasión auténtica',
    desc: 'No vendemos accesorios; vivimos el mundo de las motos. Esa energía se siente en cada interacción con el cliente.',
  },
  {
    title: 'Excelencia en el servicio',
    desc: 'Nos esforzamos por superar expectativas en cada punto de contacto, desde la tienda hasta el despacho a domicilio.',
  },
  {
    title: 'Integridad y respeto',
    desc: 'Actuamos con transparencia, cuidamos a nuestro equipo y construimos relaciones de largo plazo con clientes y colaboradores.',
  },
  {
    title: 'Innovación continua',
    desc: 'Nos reinventamos constantemente para ofrecer la mejor experiencia de compra en el mercado chileno.',
  },
]

// ─── Form options ────────────────────────────────────────────────────────────
const areas = ['Tienda / Venta', 'Administración', 'Logística y Bodega', 'Marketing', 'Tecnología', 'Servicio al Cliente']

const locations = [
  'Oficina Las Condes',
  'Tienda Santiago Centro',
  'Tienda Las Condes',
  'Tienda Viña del Mar',
  'Tienda La Serena',
  'Tienda Concepción',
  'Tienda Outlet Quilicura',
  'Bodega Quilicura',
]

// ─── Form state ──────────────────────────────────────────────────────────────
const formRef = ref(null)
const formValid = ref(false)
const loading = ref(false)
const submitted = ref(false)
const dragOver = ref(false)
const fileInput = ref(null)
const successRef = ref(null)

const form = reactive({
  name: '',
  email: '',
  phone: '',
  comuna: '',
  area: null,
  location: null,
  file: null,
  message: '',
  gdpr: false,
})

const rules = {
  required: v => !!v || 'Este campo es obligatorio',
  email: v => /.[^\n\r@\u2028\u2029]*@.+\..+/.test(v) || 'Ingresa un correo válido',
}

// ─── File helpers ─────────────────────────────────────────────────────────────
function handleFileChange(e) {
  const file = e.target.files?.[0]
  if (file) form.file = file
}

function handleDrop(e) {
  dragOver.value = false

  const file = e.dataTransfer.files?.[0]
  if (file) form.file = file
}

function removeFile() {
  form.file = null
  if (fileInput.value) fileInput.value.value = ''
}

function formatSize(bytes) {
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`
  
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
}

// ─── Submit ───────────────────────────────────────────────────────────────────
async function submitForm() {
  const { valid } = await formRef.value.validate()
  if (!valid || !form.file || !form.gdpr) return

  loading.value = true

  try {
    const payload = new FormData()

    payload.append('name',     form.name)
    payload.append('email',    form.email)
    payload.append('phone',    form.phone)
    payload.append('comuna',   form.comuna)
    payload.append('area',     form.area)
    payload.append('location', form.location)
    payload.append('message',  form.message)
    payload.append('gdpr',     String(form.gdpr))
    payload.append('cv',       form.file, form.file.name)

    const res = await fetch('/api/contact/work-with-us', {
      method: 'POST',
      body: payload,

      // Do NOT set Content-Type — the browser sets it automatically
      // with the correct multipart boundary when using FormData
    })

    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}))
      throw new Error(errorData.message ?? `Error ${res.status}`)
    }

    submitted.value = true

    await nextTick() // wait for the success element to mount
    successRef.value?.scrollIntoView({ behavior: 'smooth', block: 'center' })
  } catch (err) {
    console.error('[work-with-us]', err)

    // Surface the error however your app handles it, e.g.:
    // toast.error('Hubo un problema al enviar tu postulación. Inténtalo de nuevo.')
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="trabaja-page">
    <!-- ═══════════════════════════════════════ HERO ═══════════════════════════════════════ -->
    <section class="hero">
      <div class="hero-bg" />
      <div class="hero-overlay" />
      <VContainer class="hero__inner">
        <VRow align="center">
          <VCol
            cols="12"
            md="7"
          >
            <p class="hero__eyebrow">
              Únete al equipo
            </p>
            <h1 class="hero__title">
              Trabaja con<br>
              <span class="hero__title--highlight">Motomundi</span>
            </h1>
            <p class="hero__subtitle">
              Somos la comunidad motera más grande de Chile y buscamos personas apasionadas
              que quieran hacer historia junto a nosotros. Si vives y respiras el mundo de
              las motos, este es tu lugar.
            </p>
            <div class="hero__stats">
              <div class="stat">
                <span class="stat__number">+17</span>
                <span class="stat__label">Años de trayectoria</span>
              </div>
              <div class="stat__divider" />
              <div class="stat">
                <span class="stat__number">8</span>
                <span class="stat__label">Tiendas en Chile</span>
              </div>
              <div class="stat__divider" />
              <div class="stat">
                <span class="stat__number">+80</span>
                <span class="stat__label">Personas en el equipo</span>
              </div>
            </div>
          </VCol>
        </VRow>
      </VContainer>
    </section>

    <!-- ══════════════════════════════════ POR QUÉ MOTOMUNDI ═══════════════════════════════ -->
    <section class="why-us">
      <VContainer>
        <div class="section-header">
          <span class="section-header__tag">¿Por qué elegirnos?</span>
          <h2 class="section-header__title">
            Más que un trabajo,<br>una forma de vida
          </h2>
        </div>

        <VRow
          class="mt-10"
          :gutter="0"
        >
          <VCol
            v-for="(benefit, i) in benefits"
            :key="i"
            cols="12"
            sm="6"
            lg="3"
          >
            <div
              class="benefit-card"
              :class="{ 'benefit-card--featured': benefit.featured }"
            >
              <div class="benefit-card__icon-wrap">
                <component
                  :is="benefit.icon"
                  :size="28"
                  stroke-width="1.5"
                />
              </div>
              <h3 class="benefit-card__title">
                {{ benefit.title }}
              </h3>
              <p class="benefit-card__desc">
                {{ benefit.desc }}
              </p>
            </div>
          </VCol>
        </VRow>
      </VContainer>
    </section>

    <!-- ════════════════════════════════════ VALORES ══════════════════════════════════════ -->
    <section class="values">
      <VContainer>
        <VRow
          align="center"
          :gutter="0"
        >
          <VCol
            cols="12"
            md="5"
          >
            <div
              class="values__visual"
            >
              <div style="height:800px;">
                <iframe
                  class="video-iframe"
                  src="https://www.youtube.com/embed/9bxuxHH6n-E"
                  title="Motomundi celebra 100.000 suscriptores en YouTube"
                  frameborder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowfullscreen
                />
              </div>
            </div>
          </VCol>
          <VCol
            cols="12"
            md="7"
          >
            <span class="section-header__tag">Nuestros valores</span>
            <h2 class="values__title">
              Lo que nos mueve<br>como equipo
            </h2>
            <div class="value-list">
              <div
                v-for="(value, i) in values"
                :key="i"
                class="value-item"
              >
                <div class="value-item__number">
                  0{{ i + 1 }}
                </div>
                <div>
                  <h4 class="value-item__title">
                    {{ value.title }}
                  </h4>
                  <p class="value-item__desc">
                    {{ value.desc }}
                  </p>
                </div>
              </div>
            </div>
          </VCol>
        </VRow>
      </VContainer>
    </section>

    <!-- ════════════════════════════════════ FORMULARIO ══════════════════════════════════ -->
    <section
      id="postula"
      class="form-section"
    >
      <VContainer>
        <div class="form-wrapper">
          <!-- Éxito -->
          <Transition name="fade">
            <div
              v-if="submitted"
              ref="successRef"
              class="success-state"
            >
              <div class="success-state__icon-wrap">
                <IconCircleCheck
                  :size="56"
                  stroke-width="1.5"
                />
              </div>
              <h3 class="success-state__title">
                ¡Postulación enviada!
              </h3>
              <p class="success-state__desc">
                Gracias por tu interés en unirte a Motomundi. Revisaremos tu información
                y nos pondremos en contacto contigo a la brevedad.
              </p>
              <VBtn
                variant="outlined"
                class="btn-secondary mt-4"
                @click="submitted = false"
              >
                <IconRefresh
                  :size="18"
                  class="mr-2"
                /> Enviar otra postulación
              </VBtn>
            </div>
          </Transition>

          <template v-if="!submitted">
            <div class="form-wrapper__header">
              <span class="section-header__tag">Postula ahora</span>
              <h2 class="form-wrapper__title">
                Cuéntanos sobre ti
              </h2>
              <p class="form-wrapper__subtitle">
                Completa el formulario y adjunta tu CV. Revisamos todas las postulaciones
                con el cuidado que merece cada candidato.
              </p>
            </div>

            <VForm
              ref="formRef"
              v-model="formValid"
              @submit.prevent="submitForm"
            >
              <VRow>
                <!-- Nombre -->
                <VCol
                  cols="12"
                  sm="6"
                >
                  <label class="field-label">Nombre y Apellidos <span class="required">*</span></label>
                  <VTextField
                    v-model="form.name"
                    :rules="[rules.required]"
                    placeholder="¿Cómo te llamas?"
                    variant="outlined"
                    density="comfortable"
                    class="custom-field"
                    hide-details="auto"
                    :prepend-inner-icon="IconUser"
                  />
                </VCol>

                <!-- Email -->
                <VCol
                  cols="12"
                  sm="6"
                >
                  <label class="field-label">Correo electrónico <span class="required">*</span></label>
                  <VTextField
                    v-model="form.email"
                    :rules="[rules.required, rules.email]"
                    placeholder="tu@correo.com"
                    type="email"
                    variant="outlined"
                    density="comfortable"
                    class="custom-field"
                    hide-details="auto"
                    :prepend-inner-icon="IconMail"
                  />
                </VCol>

                <!-- Teléfono -->
                <VCol
                  cols="12"
                  sm="6"
                >
                  <label class="field-label">Teléfono <span class="required">*</span></label>
                  <VTextField
                    v-model="form.phone"
                    :rules="[rules.required]"
                    placeholder="+56 9 XXXX XXXX"
                    type="tel"
                    variant="outlined"
                    density="comfortable"
                    class="custom-field"
                    hide-details="auto"
                    :prepend-inner-icon="IconPhone"
                  />
                </VCol>

                <!-- Comuna -->
                <VCol
                  cols="12"
                  sm="6"
                >
                  <label class="field-label">Comuna <span class="required">*</span></label>
                  <VTextField
                    v-model="form.comuna"
                    :rules="[rules.required]"
                    placeholder="¿En qué comuna vives?"
                    variant="outlined"
                    density="comfortable"
                    class="custom-field"
                    hide-details="auto"
                    :prepend-inner-icon="IconMapPin"
                  />
                </VCol>

                <!-- Área de interés -->
                <VCol
                  cols="12"
                  sm="6"
                >
                  <label class="field-label">Área de interés <span class="required">*</span></label>
                  <VSelect
                    v-model="form.area"
                    :rules="[rules.required]"
                    :items="areas"
                    placeholder="Selecciona un área"
                    variant="outlined"
                    density="comfortable"
                    class="custom-field"
                    hide-details="auto"
                    :prepend-inner-icon="IconBriefcase"
                  />
                </VCol>

                <!-- Ubicación -->
                <VCol
                  cols="12"
                  sm="6"
                >
                  <label class="field-label">Ubicación preferida <span class="required">*</span></label>
                  <VSelect
                    v-model="form.location"
                    :rules="[rules.required]"
                    :items="locations"
                    placeholder="Selecciona una ubicación"
                    variant="outlined"
                    density="comfortable"
                    class="custom-field"
                    hide-details="auto"
                    :prepend-inner-icon="IconBuilding"
                  />
                </VCol>

                <!-- CV Upload -->
                <VCol cols="12">
                  <label class="field-label">Currículum Vitae <span class="required">*</span></label>
                  <div
                    class="file-drop"
                    :class="{ 'file-drop--active': dragOver, 'file-drop--filled': form.file }"
                    @dragover.prevent="dragOver = true"
                    @dragleave="dragOver = false"
                    @drop.prevent="handleDrop"
                    @click="$refs.fileInput.click()"
                  >
                    <input
                      ref="fileInput"
                      type="file"
                      accept=".pdf,.doc,.docx,.odt"
                      class="file-drop__input"
                      @change="handleFileChange"
                    >
                    <div
                      v-if="!form.file"
                      class="file-drop__content"
                    >
                      <IconUpload
                        :size="32"
                        stroke-width="1.5"
                        class="file-drop__icon"
                      />
                      <p class="file-drop__title">
                        Arrastra tu CV aquí
                      </p>
                      <p class="file-drop__hint">
                        o haz clic para buscar — PDF, DOC, DOCX (máx. 10 MB)
                      </p>
                    </div>
                    <div
                      v-else
                      class="file-drop__content"
                    >
                      <IconFileCheck
                        :size="32"
                        stroke-width="1.5"
                        class="file-drop__icon file-drop__icon--success"
                      />
                      <p class="file-drop__title">
                        {{ form.file.name }}
                      </p>
                      <p class="file-drop__hint">
                        {{ formatSize(form.file.size) }} —
                        <span
                          class="file-drop__remove"
                          @click.stop="removeFile"
                        >Eliminar</span>
                      </p>
                    </div>
                  </div>
                </VCol>

                <!-- Mensaje adicional -->
                <VCol cols="12">
                  <label class="field-label">Cuéntanos algo más <span class="optional">(opcional)</span></label>
                  <VTextarea
                    v-model="form.message"
                    placeholder="¿Por qué quieres unirte a Motomundi? Cuéntanos lo que quieras..."
                    variant="outlined"
                    density="comfortable"
                    class="custom-field"
                    hide-details="auto"
                    rows="4"
                    no-resize
                  />
                </VCol>

                <!-- RGPD / Aceptación -->
                <VCol cols="12">
                  <div class="gdpr-block">
                    <VCheckbox
                      v-model="form.gdpr"
                      :rules="[rules.required]"
                      hide-details="auto"
                      density="compact"
                      class="gdpr-checkbox"
                    >
                      <template #label>
                        <span class="gdpr-block__check-label">
                          Acepto que Motomundi contacte conmigo vía email y/o teléfono
                          para gestionar mi postulación.
                        </span>
                      </template>
                    </VCheckbox>

                    <div class="gdpr-block__legal">
                      <IconShieldLock
                        :size="14"
                        class="gdpr-block__legal-icon"
                      />
                      Tus datos serán tratados por <strong>Motomundi SpA</strong> con el único fin de
                      participar en nuestros procesos de selección vigentes o futuros. No serán
                      compartidos con terceros salvo obligación legal. Puedes ejercer tus derechos de
                      acceso, rectificación y supresión escribiéndonos en cualquier momento.
                      Consulta nuestra
                      <a
                        href="/politica-de-privacidad"
                        class="gdpr-block__link"
                      >política de privacidad</a>.
                    </div>
                  </div>
                </VCol>

                <!-- Submit -->
                <VCol cols="12">
                  <VBtn
                    type="submit"
                    :loading="loading"
                    :disabled="!formValid || !form.file || !form.gdpr"
                    class="btn-primary"
                    size="large"
                    block
                  >
                    <IconSend
                      :size="20"
                      class="mr-2"
                    />
                    Enviar postulación
                  </VBtn>
                </VCol>
              </VRow>
            </VForm>
          </template>
        </div>
      </VContainer>
    </section>
  </div>
</template>

<style scoped>
/* ═══════════════════════════════════ TOKENS ════════════════════════════════ */
:root,
.trabaja-page {
  --brand: #B21915;
  --brand-dark: #8a1210;
  --brand-light: #f9e5e5;
  --ink: #111111;
  --ink-mid: #444444;
  --ink-light: #888888;
  --border: #e5e5e5;
  --bg-off: #f7f7f7;
  --radius: 4px;
  --radius-lg: 12px;
}

.trabaja-page {
  color: var(--ink);
  background: #fff;
}

/* ═══════════════════════════════════ HERO ══════════════════════════════════ */
.hero {
  position: relative;
  background: var(--ink);
  color: #fff;
  padding: 80px 0 72px;
  overflow: hidden;
}

.hero-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(
      to right,
      rgba(10, 10, 10, 0.9) 0%,
      rgba(10, 10, 10, 0.72) 55%,
      rgba(0, 0, 0, 0.25) 100%
  );
}

.hero-bg {
  position: absolute;
  inset: 0;
  background-image: url('/cms/workwithus.jpg');
  background-size: cover;
  background-position: center 35%;
  transform: scale(1.03);
  transition: transform 8s ease;
}
.hero:hover .hero-bg { transform: scale(1); }


.hero__accent {
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, #1a0a0a 0%, var(--ink) 50%, #1e1e1e 100%);
}

.hero__accent::before {
  content: '';
  position: absolute;
  right: -60px;
  top: -80px;
  width: 500px;
  height: 500px;
  border-radius: 50%;
  border: 80px solid rgba(178, 25, 21, 0.12);
}

.hero__accent::after {
  content: '';
  position: absolute;
  left: 30%;
  bottom: -120px;
  width: 240px;
  height: 240px;
  border-radius: 50%;
  border: 1px solid rgba(178, 25, 21, 0.18);
}

.hero__inner {
  position: relative;
  z-index: 1;
}

.hero__eyebrow {
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--brand);
  margin-bottom: 16px;
}

.hero__title {
  font-size: clamp(40px, 6vw, 72px);
  font-weight: 800;
  line-height: 1.03;
  letter-spacing: -0.03em;
  margin-bottom: 24px;
  color: #fff;
}

.hero__title--highlight {
  color: var(--brand);
}

.hero__subtitle {
  font-size: 17px;
  line-height: 1.7;
  color: rgba(255, 255, 255, 0.7);
  max-width: 500px;
  margin-bottom: 40px;
}

.hero__stats {
  display: flex;
  align-items: center;
  gap: 28px;
  flex-wrap: wrap;
}

.stat {
  display: flex;
  flex-direction: column;
}

.stat__number {
  font-size: 28px;
  font-weight: 800;
  color: #fff;
  letter-spacing: -0.03em;
}

.stat__label {
  font-size: 11px;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.45);
  margin-top: 2px;
}

.stat__divider {
  width: 1px;
  height: 36px;
  background: rgba(255, 255, 255, 0.15);
}

/* Badge visual */
.hero__badge {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 14px;
  width: 200px;
  height: 200px;
  border-radius: 50%;
  border: 1px solid rgba(178, 25, 21, 0.4);
  justify-content: center;
  background: rgba(178, 25, 21, 0.06);
  box-shadow: 0 0 80px rgba(178, 25, 21, 0.2);
}

.hero__badge-icon {
  color: var(--brand);
}

.hero__badge-text {
  font-size: 13px;
  font-weight: 600;
  text-align: center;
  line-height: 1.4;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.6);
}

/* ═══════════════════════════════ WHY US ════════════════════════════════════ */
.why-us {
  padding: 88px 0;
  background: #fff;
}

.section-header {
  text-align: center;
}

.section-header__tag {
  display: inline-block;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: var(--brand);
  padding: 5px 14px;
  border: 1px solid var(--brand);
  border-radius: 100px;
  margin-bottom: 16px;
}

.section-header__title {
  font-size: clamp(28px, 4vw, 44px);
  font-weight: 800;
  letter-spacing: -0.03em;
  line-height: 1.1;
  color: var(--ink);
}

/* Benefit cards */
.benefit-card {
  height: 100%;
  padding: 32px 28px;
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  transition: box-shadow 0.2s, transform 0.2s, border-color 0.2s;
  background: #fff;
  margin: 8px;
}

.benefit-card:hover {
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.08);
  transform: translateY(-4px);
  border-color: transparent;
}


.benefit-card__icon-wrap {
  width: 52px;
  height: 52px;
  border-radius: 12px;
  background: var(--brand-light);
  color: var(--brand);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
}

.benefit-card__title {
  font-size: 17px;
  font-weight: 700;
  margin-bottom: 10px;
  letter-spacing: -0.01em;
}

.benefit-card__desc {
  font-size: 14px;
  line-height: 1.65;
  color: var(--ink-mid);
}

/* ═══════════════════════════════ VALUES ════════════════════════════════════ */
.values {
  padding: 88px 0;
  background: var(--bg-off);
}

.values__visual {
  position: relative;
  width: 460px;
  height: 500px;
  margin: 0 auto 40px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.values__ring {
  position: absolute;
  inset: 0;
  border-radius: 50%;
  border: 1px solid var(--border);
}

.values__ring--2 {
  inset: 24px;
  border-color: rgba(178, 25, 21, 0.25);
}

.values__icon {
  color: var(--brand);
  position: relative;
  z-index: 1;
}

.values__title {
  font-size: clamp(26px, 3.5vw, 40px);
  font-weight: 800;
  letter-spacing: -0.03em;
  line-height: 1.1;
  margin: 12px 0 32px;
  color: var(--ink);
}

.value-list {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.value-item {
  display: flex;
  gap: 20px;
  align-items: flex-start;
}

.value-item__number {
  font-size: 11px;
  font-weight: 800;
  letter-spacing: 0.1em;
  color: var(--brand);
  min-width: 28px;
  padding-top: 3px;
}

.value-item__title {
  font-size: 15px;
  font-weight: 700;
  margin-bottom: 4px;
  letter-spacing: -0.01em;
}

.value-item__desc {
  font-size: 13px;
  line-height: 1.65;
  color: var(--ink-mid);
  margin: 0;
}

/* ════════════════════════════ FORM SECTION ═════════════════════════════════ */
.form-section {
  padding: 88px 0 100px;
  background: #fff;
}

.form-wrapper {
  max-width: 720px;
  margin: 0 auto;
  background: #fff;
  border: 1px solid var(--border);
  border-radius: 16px;
  padding: 56px 48px;
  box-shadow: 0 2px 48px rgba(0, 0, 0, 0.04);
}

@media (max-width: 600px) {
  .form-wrapper {
    padding: 32px 20px;
  }
}

.form-wrapper__header {
  margin-bottom: 40px;
}

.form-wrapper__title {
  font-size: 32px;
  font-weight: 800;
  letter-spacing: -0.03em;
  margin: 12px 0 10px;
}

.form-wrapper__subtitle {
  font-size: 15px;
  line-height: 1.65;
  color: var(--ink-mid);
  margin: 0;
}

/* Field labels */
.field-label {
  display: block;
  font-size: 13px;
  font-weight: 600;
  color: var(--ink);
  margin-bottom: 6px;
  letter-spacing: 0.01em;
}

.required {
  color: var(--brand);
}

.optional {
  color: var(--ink-light);
  font-weight: 400;
}

/* Vuetify field overrides */
.custom-field :deep(.v-field) {
  border-radius: var(--radius);
}

.custom-field :deep(.v-field--focused .v-field__outline) {
  color: var(--brand) !important;
}

/* File drop */
.file-drop {
  border: 2px dashed var(--border);
  border-radius: var(--radius-lg);
  padding: 40px 24px;
  cursor: pointer;
  transition: border-color 0.2s, background 0.2s;
  text-align: center;
}

.file-drop:hover,
.file-drop--active {
  border-color: var(--brand);
  background: var(--brand-light);
}

.file-drop--filled {
  border-style: solid;
  border-color: #22c55e;
  background: #f0fdf4;
}

.file-drop__input {
  display: none;
}

.file-drop__content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
}

.file-drop__icon {
  color: var(--ink-light);
}

.file-drop__icon--success {
  color: #22c55e;
}

.file-drop__title {
  font-size: 15px;
  font-weight: 600;
  color: var(--ink);
  margin: 0;
}

.file-drop__hint {
  font-size: 13px;
  color: var(--ink-light);
  margin: 0;
}

.file-drop__remove {
  color: var(--brand);
  cursor: pointer;
  text-decoration: underline;
}

/* GDPR */
.gdpr-block {
  background: var(--bg-off);
  border-radius: var(--radius-lg);
  padding: 20px 20px 20px 16px;
}

.gdpr-block__check-label {
  font-size: 14px;
  font-weight: 500;
  color: var(--ink);
  line-height: 1.5;
}

.gdpr-block__legal {
  font-size: 12px;
  line-height: 1.7;
  color: var(--ink-light);
  margin-top: 14px;
  display: flex;
  gap: 8px;
  align-items: flex-start;
}

.gdpr-block__legal-icon {
  margin-top: 2px;
  flex-shrink: 0;
  color: var(--ink-light);
}

.gdpr-block__link {
  color: var(--brand);
  text-decoration: underline;
}

.gdpr-checkbox :deep(.v-selection-control__input) {
  color: var(--brand);
}

/* Buttons */
.btn-primary {
  background: var(--brand) !important;
  color: #fff !important;
  font-weight: 700 !important;
  font-size: 15px !important;
  letter-spacing: 0.02em !important;
  border-radius: var(--radius) !important;
  height: 52px !important;
  box-shadow: 0 4px 20px rgba(178, 25, 21, 0.3) !important;
  transition: opacity 0.2s, transform 0.15s !important;
}

.btn-primary:hover:not(:disabled) {
  opacity: 0.9;
  transform: translateY(-1px);
}

.btn-secondary {
  border-color: var(--brand) !important;
  color: var(--brand) !important;
  font-weight: 700 !important;
  border-radius: var(--radius) !important;
}

/* Success state */
.success-state {
  text-align: center;
  padding: 40px 0;
}

.success-state__icon-wrap {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: #f0fdf4;
  color: #22c55e;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 24px;
}

.success-state__title {
  font-size: 26px;
  font-weight: 800;
  letter-spacing: -0.02em;
  margin-bottom: 12px;
}

.success-state__desc {
  font-size: 15px;
  line-height: 1.7;
  color: var(--ink-mid);
  max-width: 400px;
  margin: 0 auto;
}

/* Transition */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.35s;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.video-iframe {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
</style>
