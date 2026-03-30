<script setup>
const activeTab = ref('notBought')
const submitted = ref(false)
const loading = ref(false)
const error = ref('')

// ─── FORM STATE ───────────────────────────────────────────────────────────────
const notBought = reactive({
  product: '', brand: '', size: '', ourPrice: '', otherPrice: '',
  link: '', storeName: '', city: '',
  name: '', email: '', phone: '', notes: '', legal: false,
})

const bought = reactive({
  orderNumber: '', purchaseDate: '', product: '', size: '',
  paidPrice: '', otherPrice: '',
  link: '', storeName: '', city: '',
  name: '', email: '', phone: '', notes: '', legal: false,
})

// ─── ERRORS ───────────────────────────────────────────────────────────────────
const errors = reactive({
  nb: {
    product: '', brand: '', size: '', ourPrice: '', otherPrice: '',
    link: '', storeName: '', city: '',
    name: '', email: '', phone: '', legal: '',
  },
  b: {
    orderNumber: '', purchaseDate: '', product: '', size: '',
    paidPrice: '', otherPrice: '',
    link: '', storeName: '', city: '',
    name: '', email: '', phone: '', legal: '',
  },
})

// ─── HELPERS ──────────────────────────────────────────────────────────────────
function clearError(form, field) {
  errors[form][field] = ''
}

function isValidEmail(val) {
  return /^[^\s@]+@[^\s@][^\s.@]*\.[^\s@]+$/.test(val)
}

function isValidUrl(val) {
  try {
    new URL(val)

    return true
  } catch {
    return false
  }
}

function isValidPhone(val) {
  // Chilean mobile / landline — loose check: digits, spaces, +, -, ()
  return /^[+\d][\d\s\-().]{6,19}$/.test(val.trim())
}

// ─── VALIDATION ───────────────────────────────────────────────────────────────
function validateNotBought() {
  const e = errors.nb
  const f = notBought
  let ok = true

  const req = (key, label) => {
    if (!String(f[key]).trim()) {
      e[key] = `${label} es obligatorio`
      ok = false
    } else e[key] = ''
  }

  req('product', 'El producto')
  req('brand', 'La marca')
  req('size', 'La talla / color')
  req('storeName', 'El nombre de la tienda')
  req('city', 'La ciudad')
  req('name', 'El nombre')

  // Numeric prices
  if (!String(f.ourPrice).trim()) {
    e.ourPrice = 'El precio en Motomundi es obligatorio'
    ok = false
  } else if (Number(f.ourPrice) <= 0) {
    e.ourPrice = 'Ingresa un precio válido'
    ok = false
  } else e.ourPrice = ''

  if (!String(f.otherPrice).trim()) {
    e.otherPrice = 'El precio de la otra tienda es obligatorio'
    ok = false
  } else if (Number(f.otherPrice) <= 0) {
    e.otherPrice = 'Ingresa un precio válido'
    ok = false
  } else if (Number(f.otherPrice) >= Number(f.ourPrice)) {
    e.otherPrice = 'El precio de la otra tienda debe ser menor al nuestro'
    ok = false
  } else e.otherPrice = ''

  // URL
  if (!f.link.trim()) {
    e.link = 'El enlace es obligatorio'
    ok = false
  } else if (!isValidUrl(f.link)) {
    e.link = 'Ingresa una URL válida (ej: https://...)'
    ok = false
  } else e.link = ''

  // Email
  if (!f.email.trim()) {
    e.email = 'El correo es obligatorio'
    ok = false
  } else if (!isValidEmail(f.email)) {
    e.email = 'Ingresa un correo electrónico válido'
    ok = false
  } else e.email = ''

  // Phone
  if (!f.phone.trim()) {
    e.phone = 'El teléfono es obligatorio'
    ok = false
  } else if (!isValidPhone(f.phone)) {
    e.phone = 'Ingresa un número de teléfono válido'
    ok = false
  } else e.phone = ''

  // Legal
  if (!f.legal) {
    e.legal = 'Debes aceptar para continuar'
    ok = false
  } else e.legal = ''

  return ok
}

function validateBought() {
  const e = errors.b
  const f = bought
  let ok = true

  const req = (key, label) => {
    if (!String(f[key]).trim()) {
      e[key] = `${label} es obligatorio`
      ok = false
    } else e[key] = ''
  }

  req('orderNumber', 'El número de pedido')
  req('product', 'El producto')
  req('size', 'La talla / color')
  req('storeName', 'El nombre de la tienda')
  req('city', 'La ciudad')
  req('name', 'El nombre')

  // Purchase date
  if (!f.purchaseDate) {
    e.purchaseDate = 'La fecha de compra es obligatoria'
    ok = false
  } else {
    const diff = (Date.now() - new Date(f.purchaseDate)) / 86_400_000
    if (diff < 0) {
      e.purchaseDate = 'La fecha no puede ser futura'
      ok = false
    } else if (diff > 30) {
      e.purchaseDate = 'Han pasado más de 30 días desde la compra'
      ok = false
    } else e.purchaseDate = ''
  }

  // Numeric prices
  if (!String(f.paidPrice).trim()) {
    e.paidPrice = 'El precio pagado es obligatorio'
    ok = false
  } else if (Number(f.paidPrice) <= 0) {
    e.paidPrice = 'Ingresa un precio válido'
    ok = false
  } else e.paidPrice = ''

  if (!String(f.otherPrice).trim()) {
    e.otherPrice = 'El precio de la otra tienda es obligatorio'
    ok = false
  } else if (Number(f.otherPrice) <= 0) {
    e.otherPrice = 'Ingresa un precio válido'
    ok = false
  } else if (Number(f.otherPrice) >= Number(f.paidPrice)) {
    e.otherPrice = 'El precio de la otra tienda debe ser menor al que pagaste'
    ok = false
  } else e.otherPrice = ''

  // URL
  if (!f.link.trim()) {
    e.link = 'El enlace es obligatorio'
    ok = false
  } else if (!isValidUrl(f.link)) {
    e.link = 'Ingresa una URL válida (ej: https://...)'
    ok = false
  } else e.link = ''

  // Email
  if (!f.email.trim()) {
    e.email = 'El correo es obligatorio'
    ok = false
  } else if (!isValidEmail(f.email)) {
    e.email = 'Ingresa un correo electrónico válido'
    ok = false
  } else e.email = ''

  // Phone
  if (!f.phone.trim()) {
    e.phone = 'El teléfono es obligatorio'
    ok = false
  } else if (!isValidPhone(f.phone)) {
    e.phone = 'Ingresa un número de teléfono válido'
    ok = false
  } else e.phone = ''

  // Legal
  if (!f.legal) {
    e.legal = 'Debes aceptar para continuar'
    ok = false
  } else e.legal = ''

  return ok
}

// ─── SUBMIT ───────────────────────────────────────────────────────────────────
async function submitForm(type) {
  error.value = ''

  const valid = type === 'notBought' ? validateNotBought() : validateBought()
  if (!valid) {
    // Scroll to first error
    await nextTick()
    document.querySelector('.pmg-field__error')?.scrollIntoView({ behavior: 'smooth', block: 'center' })

    return
  }

  loading.value = true

  const payload = { type, ...(type === 'notBought' ? notBought : bought) }

  try {
    await $fetch('/api/contact/price-match', { method: 'POST', body: payload })
    submitted.value = true
  } catch {
    error.value = 'Ocurrió un error al enviar tu solicitud. Por favor inténtalo de nuevo o contáctanos directamente.'
  } finally {
    loading.value = false
  }
}

// ─── RESET ────────────────────────────────────────────────────────────────────
function resetForm() {
  submitted.value = false
  error.value = ''
  Object.assign(notBought, {
    product: '', brand: '', size: '', ourPrice: '', otherPrice: '',
    link: '', storeName: '', city: '',
    name: '', email: '', phone: '', notes: '', legal: false,
  })
  Object.assign(bought, {
    orderNumber: '', purchaseDate: '', product: '', size: '',
    paidPrice: '', otherPrice: '',
    link: '', storeName: '', city: '',
    name: '', email: '', phone: '', notes: '', legal: false,
  })

  // Clear all errors
  Object.keys(errors.nb).forEach(k => errors.nb[k] = '')
  Object.keys(errors.b).forEach(k => errors.b[k] = '')
}

// ─── STATIC DATA ──────────────────────────────────────────────────────────────
const steps = [
  {
    icon: 'tabler-zoom-money',
    title: 'Encuentra el precio',
    desc: 'Localiza el mismo producto en otra tienda chilena a un precio inferior al nuestro.',
  },
  {
    icon: 'tabler-clipboard-text',
    title: 'Completa el formulario',
    desc: 'Ingresa los datos del producto y la tienda donde encontraste el mejor precio.',
  },
  {
    icon: 'tabler-checks',
    title: 'Validamos y te igualamos',
    desc: 'Verificamos la información y ajustamos el precio en un plazo máximo de 24 horas hábiles.',
  },
]

const conditions = [
  'Válido únicamente para compras realizadas en Chile (tienda online y física).',
  'El producto debe ser idéntico: misma marca, modelo, color y talla.',
  'La tienda comparada debe tener el producto en stock al momento de la solicitud.',
  'La tienda comparada debe ofrecer condiciones equivalentes de envío, cambio y devolución.',
  'Si ya compraste el producto, tienes hasta 30 días desde la fecha de compra para solicitar la igualación.',
  'No aplica para productos vendidos como parte de un pack o combo.',
  'Una vez aceptada la solicitud, no se admiten solicitudes posteriores sobre el mismo producto.',
]
</script>
<template>
  <div class="price-match-page">
    <!-- ─── HERO BANNER ─── -->
    <div class="pmg-hero">
      <div class="pmg-hero__accent" />
      <VContainer class="pmg-hero__content">
        <div class="pmg-hero__badge">
          <VIcon icon="tabler-shield-check" />
          GARANTÍA MOTOMUNDI
        </div>
        <h1 class="pmg-hero__title">
          Garantía de<br>
          <span class="pmg-hero__title--highlight">Precio Mínimo</span>
        </h1>
        <p class="pmg-hero__subtitle">
          Si encuentras el mismo producto más barato en otra tienda,<br class="d-none d-md-inline">
          te igualamos el precio. Así de simple.
        </p>
      </VContainer>
    </div>

    <VContainer class="pmg-body">
      <!-- ─── HOW IT WORKS CARDS ─── -->
      <div class="pmg-steps">
        <div
          v-for="(step, i) in steps"
          :key="i"
          class="pmg-step"
        >
          <div class="pmg-step__number">
            {{ i + 1 }}
          </div>
          <VIcon :class="`${step.icon} pmg-step__icon`" />
          <div class="pmg-step__text">
            <strong>{{ step.title }}</strong>
            <span>{{ step.desc }}</span>
          </div>
        </div>
      </div>

      <!-- ─── CONDITIONS ─── -->
      <VRow
        class="mt-6 mb-8"
        justify="center"
      >
        <VCol
          cols="12"
          md="10"
          lg="8"
        >
          <div class="pmg-conditions">
            <div class="pmg-conditions__header">
              <i class="ti ti-info-circle" />
              <h2>Condiciones de la garantía</h2>
            </div>
            <ul class="pmg-conditions__list">
              <li
                v-for="(c, i) in conditions"
                :key="i"
              >
                <i class="ti ti-check pmg-conditions__check" />
                <span>{{ c }}</span>
              </li>
            </ul>
            <div class="pmg-conditions__note">
              <i class="ti ti-alert-triangle" />
              <span>
                No se aceptan solicitudes sobre productos ofrecidos en Amazon, eBay, Mercado Libre
                u otras plataformas de marketplace. Motomundi se reserva el derecho de rechazar
                solicitudes en caso de detectar errores de stock o incidencias técnicas.
              </span>
            </div>
          </div>
        </VCol>
      </VRow>

      <!-- ─── FORM SECTION ─── -->
      <VRow justify="center">
        <VCol
          cols="12"
          md="10"
          lg="8"
        >
          <div class="pmg-form-card">
            <div class="pmg-form-card__header">
              <h2 style="color:white;">
                Solicitar igualación de precio
              </h2>
              <p>Completa el formulario y nos pondremos en contacto contigo a la brevedad.</p>
            </div>

            <!-- TABS -->
            <div class="pmg-tabs">
              <button
                class="pmg-tabs__btn"
                :class="{ 'pmg-tabs__btn--active': activeTab === 'notBought' }"
                @click="activeTab = 'notBought'"
              >
                <i class="ti ti-shopping-cart" />
                Aún no he comprado
              </button>
              <button
                class="pmg-tabs__btn"
                :class="{ 'pmg-tabs__btn--active': activeTab === 'bought' }"
                @click="activeTab = 'bought'"
              >
                <i class="ti ti-package" />
                Ya compré en Motomundi
              </button>
            </div>

            <!-- SUCCESS STATE -->
            <Transition name="fade">
              <div
                v-if="submitted"
                class="pmg-success"
              >
                <i class="ti ti-circle-check pmg-success__icon" />
                <h3>¡Solicitud enviada!</h3>
                <p>
                  Hemos recibido tu solicitud de igualación de precio. Nuestro equipo la revisará
                  y te contactará por email o teléfono dentro de las próximas 24 horas hábiles.
                </p>
                <button
                  class="pmg-btn pmg-btn--outline"
                  @click="resetForm"
                >
                  Enviar otra solicitud
                </button>
              </div>
            </Transition>

            <!-- FORMS -->
            <Transition name="fade">
              <div v-if="!submitted">
                <!-- TAB: NOT BOUGHT -->
                <VForm
                  v-if="activeTab === 'notBought'"
                  class="pmg-form"
                  novalidate
                  @submit.prevent="submitForm('notBought')"
                >
                  <!-- Product info -->
                  <fieldset class="pmg-fieldset">
                    <legend class="pmg-fieldset__legend">
                      <i class="ti ti-tag" />
                      Información del producto
                    </legend>
                    <div class="pmg-grid pmg-grid--2">
                      <div class="pmg-field pmg-grid--full">
                        <label for="nb-product">Producto <span class="req">*</span></label>
                        <input
                          id="nb-product"
                          v-model="notBought.product"
                          type="text"
                          placeholder="Ej: Casco AGV K6 S, Guantes Alpinestars SP-8..."
                          required
                        >
                        <span
                          v-if="errors.nb.product"
                          class="pmg-field__error"
                        >
                          <i class="tabler-alert-circle" />{{ errors.nb.product }}
                        </span>
                      </div>
                      <div class="pmg-field">
                        <label for="nb-brand">Marca <span class="req">*</span></label>
                        <input
                          id="nb-brand"
                          v-model="notBought.brand"
                          type="text"
                          placeholder="Ej: AGV, Alpinestars..."
                          required
                        >
                        <span
                          v-if="errors.nb.brand"
                          class="pmg-field__error"
                        >
                          <i class="tabler-alert-circle" />{{ errors.nb.brand }}
                        </span>
                      </div>
                      <div class="pmg-field">
                        <label for="nb-size">Talla / Color <span class="req">*</span></label>
                        <input
                          id="nb-size"
                          v-model="notBought.size"
                          type="text"
                          placeholder="Ej: L, Negro / Rojo..."
                          required
                        >
                        <span
                          v-if="errors.nb.size"
                          class="pmg-field__error"
                        >
                          <i class="tabler-alert-circle" />{{ errors.nb.size }}
                        </span>
                      </div>
                      <div class="pmg-field">
                        <label for="nb-price">Precio en Motomundi (CLP) <span class="req">*</span></label>
                        <input
                          id="nb-price"
                          v-model="notBought.ourPrice"
                          type="number"
                          placeholder="Ej: 89990"
                          min="0"
                          required
                        >
                        <span
                          v-if="errors.nb.ourPrice"
                          class="pmg-field__error"
                        >
                          <i class="tabler-alert-circle" />{{ errors.nb.ourPrice }}
                        </span>
                      </div>
                      <div class="pmg-field">
                        <label for="nb-other-price">Precio de la otra tienda (CLP) <span class="req">*</span></label>
                        <input
                          id="nb-other-price"
                          v-model="notBought.otherPrice"
                          type="number"
                          placeholder="Ej: 74990"
                          min="0"
                          required
                        >
                        <span
                          v-if="errors.nb.otherPrice"
                          class="pmg-field__error"
                        >
                          <i class="tabler-alert-circle" />{{ errors.nb.otherPrice }}
                        </span>
                      </div>
                    </div>
                  </fieldset>

                  <!-- Other store info -->
                  <fieldset class="pmg-fieldset">
                    <legend class="pmg-fieldset__legend">
                      <i class="ti ti-building-store" />
                      Información de la otra tienda
                    </legend>
                    <div class="pmg-grid pmg-grid--2">
                      <div class="pmg-field pmg-grid--full">
                        <label for="nb-link">Enlace al producto <span class="req">*</span></label>
                        <input
                          id="nb-link"
                          v-model="notBought.link"
                          type="url"
                          placeholder="https://..."
                          required
                        >
                        <span
                          v-if="errors.nb.link"
                          class="pmg-field__error"
                        >
                          <i class="tabler-alert-circle" />{{ errors.nb.link }}
                        </span>

                      </div>
                      <div class="pmg-field">
                        <label for="nb-store">Nombre de la tienda <span class="req">*</span></label>
                        <input
                          id="nb-store"
                          v-model="notBought.storeName"
                          type="text"
                          required
                        >
                        <span
                          v-if="errors.nb.storeName"
                          class="pmg-field__error"
                        >
                          <i class="tabler-alert-circle" />{{ errors.nb.storeName }}
                        </span>

                      </div>
                      <div class="pmg-field">
                        <label for="nb-city">Ciudad <span class="req">*</span></label>
                        <input
                          id="nb-city"
                          v-model="notBought.city"
                          type="text"
                          required
                        >
                        <span
                          v-if="errors.nb.city"
                          class="pmg-field__error"
                        >
                          <i class="tabler-alert-circle" />{{ errors.nb.city }}
                        </span>

                      </div>
                    </div>
                  </fieldset>

                  <!-- Contact info -->
                  <fieldset class="pmg-fieldset">
                    <legend class="pmg-fieldset__legend">
                      <i class="ti ti-user" />
                      Tus datos de contacto
                    </legend>
                    <div class="pmg-grid pmg-grid--2">
                      <div class="pmg-field pmg-grid--full">
                        <label for="nb-name">Nombre completo <span class="req">*</span></label>
                        <input
                          id="nb-name"
                          v-model="notBought.name"
                          type="text"
                          required
                        >
                        <span
                          v-if="errors.nb.name"
                          class="pmg-field__error"
                        >
                          <i class="tabler-alert-circle" />{{ errors.nb.name }}
                        </span>

                      </div>
                      <div class="pmg-field">
                        <label for="nb-email">Correo electrónico <span class="req">*</span></label>
                        <input
                          id="nb-email"
                          v-model="notBought.email"
                          type="email"
                          required
                        >
                        <span
                          v-if="errors.nb.email"
                          class="pmg-field__error"
                        >
                          <i class="tabler-alert-circle" />{{ errors.nb.email }}
                        </span>

                      </div>
                      <div class="pmg-field">
                        <label for="nb-phone">Teléfono <span class="req">*</span></label>
                        <input
                          id="nb-phone"
                          v-model="notBought.phone"
                          type="tel"
                          placeholder="+56 9 XXXX XXXX"
                          required
                        >
                        <span
                          v-if="errors.nb.phone"
                          class="pmg-field__error"
                        >
                          <i class="tabler-alert-circle" />{{ errors.nb.phone }}
                        </span>

                      </div>
                      <div class="pmg-field pmg-grid--full">
                        <label for="nb-notes">Comentarios adicionales</label>
                        <textarea
                          id="nb-notes"
                          v-model="notBought.notes"
                          rows="3"
                          placeholder="Cualquier información relevante que quieras agregar..."
                        />
                      </div>
                    </div>
                  </fieldset>

                  <div class="pmg-legal">
                    <label class="pmg-checkbox">
                      <input
                        v-model="notBought.legal"
                        type="checkbox"
                        required
                      >

                      <span class="pmg-checkbox__mark" />
                      <span>
                        Acepto recibir comunicaciones por email y teléfono para que Motomundi
                        pueda gestionar mi solicitud de igualación de precio.
                      </span>
                    </label>
                    <span
                      v-if="errors.nb.legal"
                      class="pmg-field__error"
                    >
                          <i class="tabler-alert-circle" />{{ errors.nb.legal }}
                        </span>

                    <p class="pmg-legal__text">
                      Tus datos serán tratados por Motomundi S.A. exclusivamente para atender
                      esta consulta y mejorar nuestro servicio. No serán cedidos a terceros
                      salvo obligación legal. Puedes ejercer tus derechos de acceso,
                      rectificación, cancelación y oposición consultando nuestra
                      <a href="/politica-de-privacidad">política de privacidad</a>.
                    </p>
                  </div>

                  <button
                    class="pmg-btn pmg-btn--primary"
                    type="submit"
                    :disabled="loading"
                  >
                    <i
                      v-if="loading"
                      class="ti ti-loader-2 spin"
                    />
                    <i
                      v-else
                      class="ti ti-send"
                    />
                    {{ loading ? 'Enviando...' : 'Enviar solicitud' }}
                  </button>

                </VForm>

                <!-- TAB: ALREADY BOUGHT -->
                <VForm
                  v-if="activeTab === 'bought'"
                  class="pmg-form"
                  novalidate
                  @submit.prevent="submitForm('bought')"
                >
                  <!-- Order info -->
                  <fieldset class="pmg-fieldset">
                    <legend class="pmg-fieldset__legend">
                      <i class="ti ti-receipt" />
                      Datos de tu compra en Motomundi
                    </legend>
                    <div class="pmg-grid pmg-grid--2">
                      <div class="pmg-field">
                        <label for="b-order">Nº de pedido / Boleta <span class="req">*</span></label>
                        <input
                          id="b-order"
                          v-model="bought.orderNumber"
                          type="text"
                          placeholder="Ej: 00123456"
                          required
                        >
                        <span
                          v-if="errors.b.orderNumber"
                          class="pmg-field__error"
                        >
                          <i class="tabler-alert-circle" />{{ errors.b.orderNumber }}
                        </span>

                      </div>
                      <div class="pmg-field">
                        <label for="b-purchase-date">Fecha de compra <span class="req">*</span></label>
                        <input
                          id="b-purchase-date"
                          v-model="bought.purchaseDate"
                          type="date"
                          required
                        >
                        <span
                          v-if="errors.b.purchaseDate"
                          class="pmg-field__error"
                        >
                          <i class="tabler-alert-circle" />{{ errors.b.purchaseDate }}
                        </span>
                      </div>
                      <div class="pmg-field pmg-grid--full">
                        <label for="b-product">Producto <span class="req">*</span></label>
                        <input
                          id="b-product"
                          v-model="bought.product"
                          type="text"
                          placeholder="Nombre exacto del producto comprado"
                          required
                        >
                        <span
                          v-if="errors.b.product"
                          class="pmg-field__error"
                        >
                          <i class="tabler-alert-circle" />{{ errors.b.product }}
                        </span>
                      </div>
                      <div class="pmg-field">
                        <label for="b-size">Talla / Color <span class="req">*</span></label>
                        <input
                          id="b-size"
                          v-model="bought.size"
                          type="text"
                          required
                        >
                        <span
                          v-if="errors.b.size"
                          class="pmg-field__error"
                        >
                          <i class="tabler-alert-circle" />{{ errors.b.size }}
                        </span>
                      </div>
                      <div class="pmg-field">
                        <label for="b-paid">Precio pagado (CLP) <span class="req">*</span></label>
                        <input
                          id="b-paid"
                          v-model="bought.paidPrice"
                          type="number"
                          min="0"
                          required
                        >
                        <span
                          v-if="errors.b.paidPrice"
                          class="pmg-field__error"
                        >
                          <i class="tabler-alert-circle" />{{ errors.b.paidPrice }}
                        </span>
                      </div>
                      <div class="pmg-field">
                        <label for="b-other-price">Precio de la otra tienda (CLP) <span class="req">*</span></label>
                        <input
                          id="b-other-price"
                          v-model="bought.otherPrice"
                          type="number"
                          min="0"
                          required
                        >
                        <span
                          v-if="errors.b.otherPrice"
                          class="pmg-field__error"
                        >
                          <i class="tabler-alert-circle" />{{ errors.b.otherPrice }}
                        </span>
                      </div>
                    </div>
                  </fieldset>

                  <!-- Other store info -->
                  <fieldset class="pmg-fieldset">
                    <legend class="pmg-fieldset__legend">
                      <i class="ti ti-building-store" />
                      Información de la otra tienda
                    </legend>
                    <div class="pmg-grid pmg-grid--2">
                      <div class="pmg-field pmg-grid--full">
                        <label for="b-link">Enlace al producto <span class="req">*</span></label>
                        <input
                          id="b-link"
                          v-model="bought.link"
                          type="url"
                          placeholder="https://..."
                          required
                        >
                        <span
                          v-if="errors.b.link"
                          class="pmg-field__error"
                        >
                          <i class="tabler-alert-circle" />{{ errors.b.link }}
                        </span>
                      </div>
                      <div class="pmg-field">
                        <label for="b-store">Nombre de la tienda <span class="req">*</span></label>
                        <input
                          id="b-store"
                          v-model="bought.storeName"
                          type="text"
                          required
                        >
                        <span
                          v-if="errors.b.storeName"
                          class="pmg-field__error"
                        >
                          <i class="tabler-alert-circle" />{{ errors.b.storeName }}
                        </span>
                      </div>
                      <div class="pmg-field">
                        <label for="b-city">Ciudad <span class="req">*</span></label>
                        <input
                          id="b-city"
                          v-model="bought.city"
                          type="text"
                          required
                        >
                      </div>
                    </div>
                  </fieldset>

                  <!-- Contact info -->
                  <fieldset class="pmg-fieldset">
                    <legend class="pmg-fieldset__legend">
                      <i class="ti ti-user" />
                      Tus datos de contacto
                    </legend>
                    <div class="pmg-grid pmg-grid--2">
                      <div class="pmg-field pmg-grid--full">
                        <label for="b-name">Nombre completo <span class="req">*</span></label>
                        <input
                          id="b-name"
                          v-model="bought.name"
                          type="text"
                          required
                        >
                        <span
                          v-if="errors.b.name"
                          class="pmg-field__error"
                        >
                          <i class="tabler-alert-circle" />{{ errors.b.name }}
                        </span>

                      </div>
                      <div class="pmg-field">
                        <label for="b-email">Correo electrónico <span class="req">*</span></label>
                        <input
                          id="b-email"
                          v-model="bought.email"
                          type="email"
                          required
                        >
                        <span
                          v-if="errors.b.email"
                          class="pmg-field__error"
                        >
                          <i class="tabler-alert-circle" />{{ errors.b.email }}
                        </span>

                      </div>
                      <div class="pmg-field">
                        <label for="b-phone">Teléfono <span class="req">*</span></label>
                        <input
                          id="b-phone"
                          v-model="bought.phone"
                          type="tel"
                          placeholder="+56 9 XXXX XXXX"
                          required
                        >
                        <span
                          v-if="errors.b.phone"
                          class="pmg-field__error"
                        >
                          <i class="tabler-alert-circle" />{{ errors.b.phone }}
                        </span>
                      </div>
                      <div class="pmg-field pmg-grid--full">
                        <label for="b-notes">Comentarios adicionales</label>
                        <textarea
                          id="b-notes"
                          v-model="bought.notes"
                          rows="3"
                          placeholder="Cualquier información relevante que quieras agregar..."
                        />
                      </div>
                    </div>
                  </fieldset>

                  <div class="pmg-legal">
                    <label class="pmg-checkbox">
                      <input
                        v-model="bought.legal"
                        type="checkbox"
                        required
                      >
                      <span class="pmg-checkbox__mark" />
                      <span>
                        Acepto recibir comunicaciones por email y teléfono para que Motomundi
                        pueda gestionar mi solicitud de igualación de precio.
                      </span>
                    </label>
                    <span
                      v-if="errors.b.legal"
                      class="pmg-field__error"
                    >
                          <i class="tabler-alert-circle" />{{ errors.b.legal }}
                        </span>
                    <p class="pmg-legal__text">
                      Tus datos serán tratados por Motomundi S.A. exclusivamente para atender
                      esta consulta y mejorar nuestro servicio. No serán cedidos a terceros
                      salvo obligación legal. Puedes ejercer tus derechos de acceso,
                      rectificación, cancelación y oposición consultando nuestra
                      <a href="/politica-de-privacidad">política de privacidad</a>.
                    </p>
                  </div>

                  <button
                    class="pmg-btn pmg-btn--primary"
                    type="submit"
                    :disabled="loading"
                  >
                    <i
                      v-if="loading"
                      class="ti ti-loader-2 spin"
                    />
                    <i
                      v-else
                      class="ti ti-send"
                    />
                    {{ loading ? 'Enviando...' : 'Enviar solicitud' }}
                  </button>
                </VForm>
              </div>
            </Transition>

            <!-- ERROR MESSAGE -->
            <Transition name="fade">
              <div
                v-if="error"
                class="pmg-error"
              >
                <VIcon class="tabler-alert-circle" />
                {{ error }}
              </div>
            </Transition>
          </div>
        </VCol>
      </VRow>
    </VContainer>
  </div>
</template>


<style>
/* ── Variables ── */
:root {
  --brand: #B21915;
  --brand-dark: #8a100d;
  --brand-light: #f9e8e8;
  --text: #1a1a1a;
  --text-muted: #6b7280;
  --border: #e5e7eb;
  --radius: 0px;
  --shadow: 0 4px 24px rgba(0, 0, 0, 0.07);
}

.price-match-page {
  color: var(--text);
  background: #fff;
}

/* ── HERO ── */
.pmg-hero {
  background: #1a1a1a;
  position: relative;
  overflow: hidden;
  padding: 72px 0 60px;
}

.pmg-hero__accent {
  position: absolute;
  top: 0;
  left: 0;
  width: 6px;
  height: 100%;
  background: var(--brand);
}

.pmg-hero__content {
  position: relative;
  z-index: 1;
}

.pmg-hero__badge {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  background: var(--brand);
  color: #fff;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  padding: 5px 12px;
  border-radius: 0px;
  margin-bottom: 20px;
}

.pmg-hero__title {
  font-size: clamp(40px, 6vw, 72px);
  font-weight: 800;
  line-height: 1;
  color: #fff;
  text-transform: uppercase;
  letter-spacing: -0.02em;
  margin: 0 0 20px;
}

.pmg-hero__title--highlight {
  color: var(--brand);
}

.pmg-hero__subtitle {
  font-size: 16px;
  color: #a0a0a0;
  line-height: 1.6;
  margin: 0;
}

/* ── BODY ── */
.pmg-body {
  padding-top: 48px;
  padding-bottom: 80px;
}

/* ── STEPS ── */
.pmg-steps {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 16px;
  margin-bottom: 40px;
}

.pmg-step {
  display: flex;
  align-items: flex-start;
  gap: 16px;
  background: #fafafa;
  border: 1px solid var(--border);
  border-radius: var(--radius);
  padding: 20px;
  position: relative;
}

.pmg-step__number {
  position: absolute;
  top: -10px;
  left: 16px;
  background: var(--brand);
  color: #fff;
  font-size: 11px;
  font-weight: 800;
  width: 22px;
  height: 22px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.pmg-step__icon {
  font-size: 28px;
  color: var(--brand);
  flex-shrink: 0;
  margin-top: 2px;
}

.pmg-step__text {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.pmg-step__text strong {
  font-size: 14px;
  font-weight: 700;
  color: var(--text);
}

.pmg-step__text span {
  font-size: 13px;
  color: var(--text-muted);
  line-height: 1.5;
}

/* ── CONDITIONS ── */
.pmg-conditions {
  background: var(--brand-light);
  border: 1px solid #f0c0bf;
  border-radius: var(--radius);
  padding: 28px 32px;
}

.pmg-conditions__header {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 18px;
}

.pmg-conditions__header i {
  font-size: 22px;
  color: var(--brand);
}

.pmg-conditions__header h2 {
  font-size: 17px;
  font-weight: 700;
  margin: 0;
}

.pmg-conditions__list {
  list-style: none;
  padding: 0;
  margin: 0 0 16px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.pmg-conditions__list li {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  font-size: 14px;
  line-height: 1.5;
}

.pmg-conditions__check {
  color: var(--brand);
  font-size: 16px;
  flex-shrink: 0;
  margin-top: 1px;
}

.pmg-conditions__note {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  background: rgba(178, 25, 21, 0.08);
  border-left: 3px solid var(--brand);
  border-radius: 0px;
  padding: 12px 14px;
  font-size: 13px;
  color: #6b1a18;
  line-height: 1.5;
}

.pmg-conditions__note i {
  font-size: 16px;
  flex-shrink: 0;
  margin-top: 1px;
  color: var(--brand);
}

/* ── FORM CARD ── */
.pmg-form-card {
  background: #fff;
  border: 1px solid var(--border);
  border-radius: 0;
  box-shadow: var(--shadow);
  overflow: hidden;
}

.pmg-form-card__header {
  background: #1a1a1a;
  color: #fff;
  padding: 28px 32px;
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.pmg-form-card__header i {
  font-size: 28px;
  color: var(--brand);
  margin-bottom: 4px;
}

.pmg-form-card__header h2 {
  font-size: 20px;
  font-weight: 700;
  margin: 0;
}

.pmg-form-card__header p {
  font-size: 14px;
  color: #a0a0a0;
  margin: 0;
}

/* ── TABS ── */
.pmg-tabs {
  display: flex;
  border-bottom: 1px solid var(--border);
}

.pmg-tabs__btn {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 16px 20px;
  font-size: 13px;
  font-weight: 600;
  color: var(--text-muted);
  background: #f9f9f9;
  border: none;
  border-bottom: 3px solid transparent;
  cursor: pointer;
  transition: all 0.18s ease;
  text-transform: uppercase;
  letter-spacing: 0.04em;
}

.pmg-tabs__btn:hover {
  color: var(--text);
  background: #f3f3f3;
}

.pmg-tabs__btn--active {
  color: var(--brand);
  background: #fff;
  border-bottom-color: var(--brand);
}

.pmg-tabs__btn i {
  font-size: 17px;
}

/* ── FORM ── */
.pmg-form {
  padding: 32px;
  display: flex;
  flex-direction: column;
  gap: 28px;
}

.pmg-fieldset {
  border: 1px solid var(--border);
  border-radius: var(--radius);
  padding: 20px 24px;
  position: relative;
}

.pmg-fieldset__legend {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 13px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  color: var(--brand);
  padding: 0 8px;
}

.pmg-fieldset__legend i {
  font-size: 16px;
}

.pmg-grid {
  display: grid;
  gap: 16px;
  margin-top: 16px;
}

.pmg-grid--2 {
  grid-template-columns: 1fr 1fr;
}

.pmg-grid--full {
  grid-column: 1 / -1;
}

@media (max-width: 600px) {
  .pmg-grid--2 {
    grid-template-columns: 1fr;
  }
}

.pmg-field {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.pmg-field label {
  font-size: 13px;
  font-weight: 600;
  color: var(--text);
}

.pmg-field input,
.pmg-field textarea,
.pmg-field select {
  padding: 10px 14px;
  border: 1.5px solid var(--border);
  border-radius: 0px;
  font-size: 14px;
  color: var(--text);
  background: #fff;
  transition: border-color 0.15s ease;
  width: 100%;
  box-sizing: border-box;
  font-family: inherit;
}

.pmg-field input:focus,
.pmg-field textarea:focus,
.pmg-field select:focus {
  outline: none;
  border-color: var(--brand);
  box-shadow: 0 0 0 3px rgba(178, 25, 21, 0.1);
}

.pmg-field textarea {
  resize: vertical;
  min-height: 80px;
}

.req {
  color: var(--brand);
}

/* ── LEGAL ── */
.pmg-legal {
  background: #f9f9f9;
  border: 1px solid var(--border);
  border-radius: 0px;
  padding: 16px 20px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.pmg-checkbox {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  cursor: pointer;
  font-size: 13px;
  line-height: 1.5;
}

.pmg-checkbox input[type='checkbox'] {
  margin-top: 2px;
  accent-color: var(--brand);
  width: 16px;
  height: 16px;
  flex-shrink: 0;
}

.pmg-legal__text {
  font-size: 12px;
  color: var(--text-muted);
  line-height: 1.5;
  margin: 0;
}

.pmg-legal__text a {
  color: var(--brand);
  text-decoration: underline;
}

/* ── BUTTON ── */
.pmg-btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 14px 28px;
  font-size: 14px;
  font-weight: 700;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  border-radius: 0px;
  border: 2px solid transparent;
  cursor: pointer;
  transition: all 0.18s ease;
  align-self: flex-start;
}

.pmg-btn--primary {
  background: var(--brand);
  color: #fff;
  border-color: var(--brand);
}

.pmg-btn--primary:hover:not(:disabled) {
  background: var(--brand-dark);
  border-color: var(--brand-dark);
}

.pmg-btn--primary:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.pmg-btn--outline {
  background: transparent;
  color: var(--brand);
  border-color: var(--brand);
}

.pmg-btn--outline:hover {
  background: var(--brand-light);
}

/* ── SUCCESS ── */
.pmg-success {
  padding: 56px 32px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 16px;
}

.pmg-success__icon {
  font-size: 64px;
  color: #22c55e;
}

.pmg-success h3 {
  font-size: 24px;
  font-weight: 800;
  margin: 0;
}

.pmg-success p {
  font-size: 15px;
  color: var(--text-muted);
  max-width: 460px;
  line-height: 1.6;
  margin: 0;
}

/* ── ERROR ── */
.pmg-error {
  display: flex;
  align-items: center;
  gap: 10px;
  margin: 0 32px 24px;
  background: #fef2f2;
  border: 1px solid #fecaca;
  border-radius: 0px;
  padding: 12px 16px;
  font-size: 14px;
  color: #991b1b;
}

.pmg-error i {
  font-size: 18px;
  flex-shrink: 0;
}

/* ── TRANSITIONS ── */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.25s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* ── SPIN ── */
@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.spin {
  animation: spin 0.8s linear infinite;
}

.pmg-field__error{
  color: #991b1b !important;
  font-weight: 400;
  background-color: #F9E8E8;
  padding: 2px;
}

.pmg-field__error i {
  margin: 0 3px;

}
</style>
