<script setup lang="ts">
import {ref, computed, reactive} from 'vue'
import {ProductFeatureType} from '@/models/products'

const props = defineProps({
  product: {
    type: Object,
    required: true,
  },
})

// --- Model ---
const isShow = defineModel({type: Boolean, default: false})

// --- Feature filters ---
const sizes = computed(() => props.product.features.filter((f: any) => f.type === ProductFeatureType.Size) || [])
const colors = computed(() => props.product.features.filter((f: any) => f.type === ProductFeatureType.Color) || [])

// --- Form state ---
const form = reactive({
  cheaperSize: '',
  cheaperColor: '',
  url: '',
  price: '',
  name: '',
  telephone: '',
  email: '',
  gdprAccepted: false,
})

// --- Validation errors ---
const errors = reactive({
  url: '',
  price: '',
  name: '',
  telephone: '',
  email: '',
  gdprAccepted: '',
})

// --- Submission state ---
const isSubmitting = ref(false)
const submitSuccess = ref(false)
const submitError = ref('')

// --- Validators ---
function validateUrl(value: string): string {
  if (!value.trim()) return 'Este campo es obligatorio'
  try {
    new URL(value)
  } catch {
    return 'Introduce una URL válida'
  }
  return ''
}

function validateRequired(value: string): string {
  return value.trim() ? '' : 'Este campo es obligatorio'
}

function validateEmail(value: string): string {
  if (!value.trim()) return 'Este campo es obligatorio'
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ? '' : 'Introduce un email válido'
}

function validatePhone(value: string): string {
  if (!value.trim()) return 'Este campo es obligatorio'
  return /^[+\d\s\-()]{7,}$/.test(value) ? '' : 'Introduce un teléfono válido'
}

function validateForm(): boolean {
  errors.url = validateUrl(form.url)
  errors.price = validateRequired(form.price)
  errors.name = validateRequired(form.name)
  errors.telephone = validatePhone(form.telephone)
  errors.email = validateEmail(form.email)
  errors.gdprAccepted = form.gdprAccepted ? '' : 'Debes aceptar las condiciones'

  return Object.values(errors).every(e => e === '')
}

// --- Live validation on blur ---
function onBlurUrl() {
  errors.url = validateUrl(form.url)
}

function onBlurPrice() {
  errors.price = validateRequired(form.price)
}

function onBlurName() {
  errors.name = validateRequired(form.name)
}

function onBlurTelephone() {
  errors.telephone = validatePhone(form.telephone)
}

function onBlurEmail() {
  errors.email = validateEmail(form.email)
}

// --- Submit ---
async function sendSeenCheaper() {
  submitSuccess.value = false
  submitError.value = ''

  if (!validateForm()) return

  isSubmitting.value = true

  try {
    // Simulated API call
    const rs = await $fetch("/api/product/seen-cheaper", {
      method: 'POST',
      body: {
        url: form.url,
        price: form.price,
        name: form.name,
        telephone: form.telephone,
        email: form.email,
        productId: props.product.id,
        size: form.cheaperSize || 0,
        color: form.cheaperColor || 0,
      }
    })

    // Simulate occasional server error for demo purposes:
    // if (Math.random() < 0.2) throw new Error('Server error')

    console.log('Form submitted:', {...form})
    submitSuccess.value = true

    // Reset form after success
    Object.assign(form, {
      cheaperSize: '', cheaperColor: '',
      url: '', price: '',
      name: '', telephone: '', email: '',
      gdprAccepted: false,
    })
  } catch (err: any) {
    submitError.value = 'Ha ocurrido un error. Por favor, inténtalo de nuevo.'
  } finally {
    isSubmitting.value = false
  }
}
</script>

<template>
  <div
    v-if="isShow"
    class="seen-cheaper-form row"
  >
    <!-- Close button -->
    <button
      type="button"
      aria-label="Cerrar"
      class="close-button"
      @click="isShow = false"
    >
      <svg height="14" width="14" xmlns="http://www.w3.org/2000/svg">
        <g stroke="#000" stroke-width="2" fill="none" fill-rule="evenodd" stroke-linecap="round"
           stroke-linejoin="round"
        >
          <path d="M13 1L1 13M1 1l12 12"/>
        </g>
      </svg>
    </button>

    <div class="col s12">
      <span class="h3">¿Lo has visto más barato? <strong>Te lo igualamos</strong></span>

      <!-- Success message -->
      <div v-if="submitSuccess" class="success-banner">
        ✅ ¡Solicitud enviada! Recibirás un código de descuento en tu email en breve.
      </div>

      <!-- Error message -->
      <div v-if="submitError" class="error-banner">
        ⚠️ {{ submitError }}
      </div>

      <form novalidate @submit.prevent="sendSeenCheaper" class="">
        <VContainer v-if="!submitSuccess">
          <!-- Block 1: Product features -->
          <div class="form-block v-row pb-8 ">
          <span class="h4 v-col v-col-12 v-col-sm-12">
            {{ product.brand.name }} <strong>{{ product.name }}</strong>
            <small>Selecciona la talla que has visto más barata.</small>
          </span>

            <div v-if="sizes.length > 0" class="input-field v-col v-col-sm-12">
              <VSelect
                v-model="form.cheaperSize"

                name="cheaperSize"
                rounded="0"
                :items="sizes"
                item-title="name"
                item-value="id"
                label="Talla"
              />
            </div>

            <div v-if="colors.length > 0" class="input-field v-col-12 v-col v-col-sm-12 ">
              <VSelect
                v-model="form.cheaperColor"
                name="cheaperColor"
                rounded="0"
                :items="colors"
                item-title="name"
                item-value="id"
                label="Color"
              />
            </div>
          </div>

          <!-- Block 2: URL & price -->
          <div class="form-block pb-5">
          <span class="h4">
            ¿Dónde lo has visto más barato?
            <small>Pega aquí el enlace a la página del producto.</small>
          </span>

            <div class="v-row mb-2">
              <div class="input-field v-col v-col-12 v-col-sm-12 v-col-md-8 v-col-lg-8">
                <VTextField
                  id="urlInput"
                  v-model="form.url"
                  name="urlInput"
                  rounded="0"
                  type="url"
                  placeholder="http://"
                  label="Sitio web"
                  :class="{ invalid: !!errors.url }"
                  :error-messages="errors.url"
                  @blur="onBlurUrl"
                />
                <span v-if="errors.url" class="helper-text error-text">{{ errors.url }}</span>
              </div>

              <div class="input-field v-col v-col-12 v-col-sm12 v-col-md-4 v-col-lg-4">
                <VTextField
                  id="price"
                  v-model="form.price"
                  name="price"
                  rounded="0"
                  type="number"
                  min="0"
                  placeholder="Precio"
                  label="Precio"
                  :class="{ invalid: !!errors.price }"
                  :error-messages="errors.price"
                  @blur="onBlurPrice"
                />

                <span v-if="errors.price" class="helper-text error-text">{{ errors.price }}</span>
              </div>
            </div>
          </div>

          <!-- Block 3: Personal data -->
          <div class="form-block">
            <div class="v-row">
              <div class="v-col v-col-sm-12">
              <span class="h4">
                Tus Datos
                <small>Enviaremos un código de descuento a tu <em>email.</em></small>
              </span>
              </div>

              <div class="input-field v-col v-col-12 v-col-sm-12">
                <AppTextField
                  id="name"
                  v-model="form.name"
                  type="text"
                  name="name"
                  placeholder="Tu Nombre"
                  label="Tu Nombre"
                  :class="{ invalid: !!errors.name }"
                  :error-messages="errors.name"
                  @blur="onBlurName"
                />
                <span v-if="errors.name" class="helper-text error-text">{{ errors.name }}</span>
              </div>

              <div class="input-field v-col v-col-12 v-col-sm-12 v-col-md-6 v-col-lg-6">
                <AppTextField
                  id="telephone"
                  v-model="form.telephone"
                  type="tel"
                  name="telephone"
                  rounded="0"
                  placeholder="Tu teléfono"
                  label="Tu teléfono"
                  :class="{ invalid: !!errors.telephone }"
                  :error-messages="errors.telephone"
                  @blur="onBlurTelephone"
                />
                <span v-if="errors.telephone" class="helper-text error-text">{{ errors.telephone }}</span>
              </div>

              <div class="input-field v-col v-col-12 v-col-sm-12 v-col-md-6 v-col-lg-6">
                <AppTextField
                  id="noticeemail"
                  v-model="form.email"
                  type="email"
                  name="noticeemail"
                  rounded="0"
                  placeholder="Tu correo electrónico"
                  label="Tu correo electrónico"
                  :class="{ invalid: !!errors.email }"
                  :error-messages="errors.email"
                  @blur="onBlurEmail"
                />
                <span v-if="errors.email" class="helper-text error-text">{{ errors.email }}</span>
              </div>
            </div>

            <!-- GDPR -->
            <div class="row gdpr-row">
              <div class="v-col v-col-12 v-col-sm-12 no-padding-bottom">
                <div class="gdpr-legal-text mt-4">
                  <label for="gdpr-legal-accept-minimum-price" class="mc-checkbox-label d-flex gap-3">
                    <VCheckbox
                      id="gdpr-legal-accept-minimum-price"
                      v-model="form.gdprAccepted"
                      type="checkbox"
                      name="gdpr-legal-accept-minimum-price"
                      class="filled-in mr-3"
                    />
                    <span>
                    <small>
                      Al enviar este formulario aceptas recibir comunicaciones vía e-mail y teléfono
                      para poder atender a tu consulta.
                      <a href="#">Más información…</a>
                    </small>
                  </span>
                  </label>
                  <span v-if="errors.gdprAccepted" class="helper-text error-text gdpr-error">
                  {{ errors.gdprAccepted }}
                </span>
                </div>
              </div>
            </div>
          </div>

          <!-- Block 4: Submit -->
          <div class="form-block send-form">
            <button
              id="send-minimum-price"
              type="submit"
              :disabled="isSubmitting"
              :class="{ loading: isSubmitting }"
            >
              <span v-if="isSubmitting">Enviando…</span>
              <span v-else>Enviar</span>
            </button>
            <small>
              <a
                href="/terminos-y-condiciones-precio-minimo-garantizado"
                data-dr="true"
                class="mtc-link"
                rel="nofollow"
              >* Ver condiciones…</a>
            </small>
          </div>

        </VContainer>
      </form>
    </div>
  </div>
</template>

<style>
.seen-cheaper-form {
  background-color: #fff;
  box-shadow: 0 0 25px 0 rgba(0, 0, 0, .45);
  left: .5rem;
  opacity: 1;
  position: absolute;
  right: .5rem;
  top: .9375rem;
  transform: scale(1);
  transform-origin: center center;
  transition: all .2s ease;
  z-index: 90;
  text-align: left;
}

.seen-cheaper-form .v-col {
  padding: 4px 4px;
}

.seen-cheaper-form label.v-label {
  font-size: 8px !important;
  text-transform: uppercase !important;
  font-weight: 600;
}


.seen-cheaper-form > .col.s12 {
  padding: 0;
}

.seen-cheaper-form .form-block {
  border-top: 1px solid #e6e6e6;
  padding: 10px 30px 0;
}

.seen-cheaper-form .form-block .input-field > label:not(.label-icon).active {
  transform: translateY(-2px) scale(1);
}

.seen-cheaper-form select {
  width: 100%;
}

.seen-cheaper-form span.h3 {
  display: block;
  font-size: 18px;
  font-weight: 900;
  margin: 25px 0;
  text-align: center;
  text-transform: uppercase;
}

.seen-cheaper-form span.h3 strong {
  color: #d6001c;
  display: block;
}

.seen-cheaper-form span.h4 {
  display: block;
  font-size: 14px;
  font-weight: 700;
  margin: 16px 0;
  text-align: center;
  text-transform: uppercase;
}

.seen-cheaper-form span.h4 small {
  display: block;
  font-weight: 500;
  margin-top: 3px;
  opacity: .5;
  text-transform: none;
}

.seen-cheaper-form .close-button {
  position: absolute;
  right: 5px;
  top: 10px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 4px;
}

.seen-cheaper-form .close-button svg {
  transform: scale(.7);
}

.seen-cheaper-form .gdpr-legal-text small {
  color: #000;
  display: block;
  font-size: 11px;
  line-height: 13px;
}

.gdpr-row {
  height: 100px;
}

.seen-cheaper-form .send-form {
  padding-bottom: 25px;
}

.seen-cheaper-form .send-form button {
  background-color: #eb0012;
  color: #fff;
  font-size: 12px;
  font-weight: 500;
  margin-bottom: 8px;
  padding: 10px 25px;
  text-transform: uppercase;
  border: none;
  cursor: pointer;
  transition: background-color 0.2s ease, opacity 0.2s ease;
}

.seen-cheaper-form .send-form button:hover:not(:disabled) {
  background-color: #b3000f;
}

.seen-cheaper-form .send-form button:disabled {
  opacity: 0.65;
  cursor: not-allowed;
}

.seen-cheaper-form .send-form a {
  display: block;
  font-size: 13px;
  font-weight: bold;
}

/* Validation */
.helper-text.error-text {
  color: #d6001c;
  font-size: 11px;
  display: block;
  margin-top: 2px;
}

.gdpr-error {
  margin-top: 4px;
}

/* Feedback banners */
.success-banner,
.error-banner {
  margin: 0 30px 16px;
  padding: 10px 16px;
  border-radius: 4px;
  font-size: 13px;
  font-weight: 500;
}

.success-banner {
  background-color: #e6f9ef;
  color: #1a7a45;
  border: 1px solid #a3d9b8;
}

.error-banner {
  background-color: #fde8ea;
  color: #b3000f;
  border: 1px solid #f5a3aa;
}

@media only screen and (max-width: 600px) {
  .seen-cheaper-form {
    /*    background-color: transparent;*/
    /*box-shadow: none;*/
    position: absolute;
    right: 0;
    left: 0;
    top: 0;
  }

  .seen-cheaper-form .close-button {
    /*display: none;*/
  }

  .seen-cheaper-form h3 {
    margin: 0 0 15px;
  }

  .seen-cheaper-form h4 {
    margin-top: 0;
  }

  .seen-cheaper-form .form-block {
    padding: 10px 5px 0;
  }
}

</style>

