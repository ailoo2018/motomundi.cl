<script setup>
import { ref } from 'vue'

const form = ref({
  nombre: '',
  email: '',
  telefono: '',
  consulta: ''
})

const formValid = ref(false)
const loading = ref(false)
const success = ref(false)
const error = ref(false)

const nameRules = [
  v => !!v || 'El nombre es requerido',
  v => v.length >= 3 || 'El nombre debe tener al menos 3 caracteres'
]

const emailRules = [
  v => !!v || 'El email es requerido',
  v => /.+@.+\..+/.test(v) || 'Debe ser un email válido'
]

const phoneRules = [
  v => !!v || 'El teléfono es requerido'
]

const messageRules = [
  v => !!v || 'La consulta es requerida',
  v => v.length >= 10 || 'La consulta debe tener al menos 10 caracteres'
]

const submitForm = async () => {
  if (!formValid.value) return

  loading.value = true
  error.value = false
  success.value = false

  try {
    // Aquí va tu llamada real al API
    const response = await $fetch('/api/contact', {
      method: 'POST',
      body: form.value
    })

    success.value = true
    resetForm()

    // Scroll to top to show success message
    window.scrollTo({ top: 0, behavior: 'smooth' })
  } catch (e) {
    error.value = true
    console.error('Error sending form:', e)
  } finally {
    loading.value = false
  }
}

const resetForm = () => {
  form.value = {
    nombre: '',
    email: '',
    telefono: '',
    consulta: ''
  }
}
</script>

<template>
  <div class="contact-page">
    <VContainer class="pa-0 ma-0 w-100">
      <!-- Header -->
      <VRow justify="center" class="main-content" style="margin: auto" >
        <VCol cols="12" >
          <h1 class="page-title mb-0" style="border-left: 5px solid #d6001c; padding: 10px">
            Atención al Cliente
          </h1>

        </VCol>
      </VRow>

      <!-- Success Alert -->
      <VRow v-if="success" justify="center" class="mb-6">
        <VCol cols="12" lg="10">
          <VAlert
            type="success"
            variant="tonal"
            closable
            prominent
            @click:close="success = false"
          >
            <template #prepend>
              <VIcon icon="tabler-circle-check" size="32" />
            </template>
            <VAlertTitle class="text-h6 mb-2">
              ¡Gracias por contactarnos!
            </VAlertTitle>
            <div>Hemos recibido tu consulta y te responderemos pronto.</div>
          </VAlert>
        </VCol>
      </VRow>

      <!-- Error Alert -->
      <VRow v-if="error" justify="center" class="mb-6">
        <VCol cols="12" lg="10">
          <VAlert
            type="error"
            variant="tonal"
            closable
            prominent
            @click:close="error = false"
          >
            <template #prepend>
              <VIcon icon="tabler-alert-circle" size="32" />
            </template>
            <VAlertTitle class="text-h6 mb-2">
              Error al enviar el mensaje
            </VAlertTitle>
            <div>Por favor, intenta nuevamente.</div>
          </VAlert>
        </VCol>
      </VRow>

      <!-- Main Grid -->
      <VRow class="main-content">
        <!-- Contact Information -->
        <VCol cols="12" lg="4">
          <div class="contact-info-section">
            <!-- Por Teléfono -->
            <VCard class="info-card mb-6">
              <VCardText class="pa-7">
                <div class="d-flex align-center mb-5">
                  <VIcon
                    icon="tabler-phone"
                    size="28"
                    class="info-icon mr-3"
                  />
                  <h3 class="info-title">Por Teléfono</h3>
                </div>

                <div class="contact-item mb-4">
                  <div class="contact-label">CENTRAL</div>
                  <div class="contact-value">
                    <a href="tel:+56226660690">+562 2666 0690</a>
                  </div>
                </div>

                <div class="contact-item mb-4">
                  <div class="contact-label">WhatsApp</div>
                  <div class="contact-value">
                    <a
                      href="https://wa.me/56952245020"
                      target="_blank"
                      class="whatsapp-link"
                    >
                      +56 9 5224 5020
                    </a>
                  </div>
                </div>

                <div class="contact-item mb-4">
                  <div class="contact-label">Neumáticos</div>
                  <div class="contact-value">
                    <a href="tel:+56226660690,47">+562 2666 0690 Anexo 47</a>
                  </div>
                </div>

                <div class="schedule">
                  <VIcon icon="tabler-clock" size="16" class="mr-1" />
                  De lunes a viernes de 9 a 18:30h
                </div>
              </VCardText>
            </VCard>

            <!-- En las Tiendas -->
            <VCard class="info-card mb-6">
              <VCardText class="pa-7">
                <div class="d-flex align-center mb-5">
                  <VIcon
                    icon="tabler-map-pin"
                    size="28"
                    class="info-icon mr-3"
                  />
                  <h3 class="info-title">En las Tiendas</h3>
                </div>

                <p class="info-text mb-4">
                  Disponemos de <strong class="text-accent">8 tiendas físicas</strong> con grandes espacios destinados al mundo de la Moto.
                </p>

                <p class="info-text mb-5">
                  Nos encontrarás en <strong>Santiago, Viña del Mar, Concepción y La Serena</strong>.
                </p>

                <NuxtLink to="/tiendas" class="stores-link">
                  Ver Ubicaciones y Horarios
                  <VIcon icon="tabler-arrow-right" size="18" class="ml-1" />
                </NuxtLink>
              </VCardText>
            </VCard>

            <!-- Por Email -->
            <VCard class="info-card">
              <VCardText class="pa-7">
                <div class="d-flex align-center mb-5">
                  <VIcon
                    icon="tabler-mail"
                    size="28"
                    class="info-icon mr-3"
                  />
                  <h3 class="info-title">Contáctanos por Email</h3>
                </div>

                <p class="info-text">
                  Completa el formulario a la derecha y nos pondremos en contacto contigo lo antes posible.
                </p>
              </VCardText>
            </VCard>
          </div>
        </VCol>

        <!-- Contact Form -->
        <VCol cols="12" lg="8">
          <VCard class="form-card" elevation="8">
            <VCardText class="pa-8 pa-md-10">
              <h2 class="form-title mb-2">
                Envíanos tu Consulta
              </h2>
              <p class="form-subtitle mb-8">
                Responderemos en un plazo máximo de 24-48 horas
              </p>

              <VForm v-model="formValid" @submit.prevent="submitForm">
                <!-- Nombre -->
                <div class="form-group mb-6">
                  <label for="nombre" class="form-label">
                    Nombre <span class="required">*</span>
                  </label>
                  <VTextField
                    id="nombre"
                    v-model="form.nombre"
                    :rules="nameRules"
                    variant="outlined"
                    placeholder="Tu nombre completo"
                    density="comfortable"
                    hide-details="auto"
                    required
                  />
                </div>

                <!-- Email -->
                <div class="form-group mb-6">
                  <label for="email" class="form-label">
                    Email <span class="required">*</span>
                  </label>
                  <VTextField
                    id="email"
                    v-model="form.email"
                    :rules="emailRules"
                    variant="outlined"
                    placeholder="tu@email.com"
                    type="email"
                    density="comfortable"
                    hide-details="auto"
                    required
                  />
                </div>

                <!-- Teléfono -->
                <div class="form-group mb-6">
                  <label for="telefono" class="form-label">
                    Teléfono <span class="required">*</span>
                  </label>
                  <VTextField
                    id="telefono"
                    v-model="form.telefono"
                    :rules="phoneRules"
                    variant="outlined"
                    placeholder="+56 9 XXXX XXXX"
                    type="tel"
                    density="comfortable"
                    hide-details="auto"
                    required
                  />
                </div>

                <!-- Consulta -->
                <div class="form-group mb-8">
                  <label for="consulta" class="form-label">
                    Consulta <span class="required">*</span>
                  </label>
                  <VTextarea
                    id="consulta"
                    v-model="form.consulta"
                    :rules="messageRules"
                    variant="outlined"
                    placeholder="Escribe aquí tu consulta o mensaje..."
                    rows="6"
                    hide-details="auto"
                    required
                  />
                </div>

                <!-- Submit Button -->
                <VBtn
                  type="submit"
                  color="primary"
                  size="x-large"
                  block
                  :loading="loading"
                  :disabled="!formValid"
                  class="submit-btn"
                >
                  <span class="submit-text">Enviar Consulta</span>
                </VBtn>
              </VForm>
            </VCardText>
          </VCard>
        </VCol>
      </VRow>
    </VContainer>
  </div>
</template>

<style scoped>
.contact-page {
  min-height: 100vh;
  position: relative;
}

/* Header Styles */
.page-title {
  font-weight: 800;
  line-height: 1.2em;
  margin-bottom: 40px;
  margin-top: 12px;
  text-transform: uppercase;
  font-size: 1.5em;
}

.page-subtitle {
  font-size: 1rem;
  letter-spacing: 2px;
  text-transform: uppercase;
  margin-top: 8px;
}

/* Info Cards */
.info-card {
  border-left: 4px solid #d6001c;
  transition: all 0.3s ease;
  animation: fadeInLeft 0.6s ease-out backwards;
}

.info-card:nth-child(1) { animation-delay: 0.1s; }
.info-card:nth-child(2) { animation-delay: 0.2s; }
.info-card:nth-child(3) { animation-delay: 0.3s; }

.info-card:hover {
  transform: translateX(5px);
  border-left-width: 6px;

}

.info-icon {
  color: #d6001c;
}

.info-title {
  font-size: 1.0rem;
  font-weight: 600;
  color: #d6001c;
  text-transform: uppercase;
  letter-spacing: 1px;
  margin: 0;
}

.contact-item {
  margin-bottom: 16px;
}

.contact-label {
  font-weight: 600;
  color: #d6001c;
  text-transform: uppercase;
  font-size: 0.85rem;
  letter-spacing: 1px;
  margin-bottom: 4px;
  display: block;
  opacity: 0.9;
}

.contact-value {
  font-size: 1rem;
  display: block;
}

.contact-value a {
  color: rgb(var(--v-theme-on-surface));
  text-decoration: none;
  transition: color 0.3s ease;
}

.contact-value a:hover {
  color: #d6001c;
}

.whatsapp-link:hover {
  color: #25D366 !important;
}

.schedule {

  font-size: 0.95rem;
  font-style: italic;
  margin-top: 12px;
  display: flex;
  align-items: center;
}

.info-text {

  line-height: 1.7;
  margin: 0;
}

.info-text strong {
  color: rgb(var(--v-theme-on-surface));
}

.text-accent {
  color: #d6001c;
}

.stores-link {
  display: inline-flex;
  align-items: center;
  color: #d6001c;
  text-decoration: none;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 1px;
  font-size: 0.7rem;
  border-bottom: 2px solid #d6001c;
  padding-bottom: 2px;
  transition: all 0.3s ease;
}

.stores-link:hover {
  transform: translateY(-2px);
  opacity: 0.8;
}

/* Form Card */
.form-card {
  animation: fadeInRight 0.6s ease-out 0.2s backwards;
}

.form-title {
  font-size: 1.0rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 2px;

}

.form-subtitle {
  margin: 20px 0;
  font-size: 0.90rem;
}

.form-label {
  display: block;
  margin-bottom: 8px;
  font-weight: 500;
  text-transform: uppercase;
  font-size: 0.85rem;
  letter-spacing: 1px;

}

.required {
  color: #d6001c;
}

/* Submit Button */
.submit-btn {
  font-size: 1.2rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 2px;
  height: 56px !important;
  position: relative;
  overflow: hidden;
}

.submit-btn::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  width: 0;
  height: 0;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 50%;
  transform: translate(-50%, -50%);
  transition: width 0.6s ease, height 0.6s ease;
}

.submit-btn:hover::before {
  width: 300px;
  height: 300px;
}

.submit-text {
  position: relative;
  z-index: 1;
}

/* Animations */
@keyframes slideDown {
  from {
    opacity: 0;
    transform: translateY(-30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fadeInLeft {
  from {
    opacity: 0;
    transform: translateX(-30px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes fadeInRight {
  from {
    opacity: 0;
    transform: translateX(30px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

/* Responsive */
@media (max-width: 1280px) {
  .page-title {
    font-size: 3rem;
  }
}

@media (max-width: 960px) {
  .main-content {
    flex-direction: column-reverse;
  }

  .form-card {
    margin-bottom: 30px;
  }
}

@media (max-width: 600px) {
  .page-title {
    font-size: 2.5rem;
  }

  .info-card :deep(.v-card-text),
  .form-card :deep(.v-card-text) {
    padding: 24px !important;
  }
}
</style>

