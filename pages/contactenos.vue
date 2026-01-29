<template>
  <div class="contact-container">
    <div class="contact-wrapper">
      <!-- Header Section -->
      <div class="contact-header">
        <h1 class="title">Atención al Cliente</h1>
        <p class="subtitle">Estamos aquí para ayudarte</p>
      </div>

      <!-- Contact Methods Grid -->
      <div class="contact-methods">
        <!-- Phone Contact -->
        <div class="contact-card phone-card">
          <div class="card-icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
            </svg>
          </div>
          <h3 class="card-title">Por teléfono</h3>
          <p class="card-description">Llámanos según departamento:</p>

          <div class="phone-list">
            <div class="phone-item">
              <span class="phone-label">Central</span>
              <a href="tel:+56226660690" class="phone-number">+562 2666 0690</a>
            </div>
            <div class="phone-item">
              <span class="phone-label">Neumáticos</span>
              <a href="tel:+56226660690" class="phone-number">+562 2666 0690 Anexo 47</a>
            </div>
          </div>

          <p class="availability">De lunes a viernes de 9 a 18:30h</p>
        </div>

        <!-- WhatsApp Contact -->
        <div class="contact-card whatsapp-card">
          <div class="card-icon whatsapp-icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
            </svg>
          </div>
          <h3 class="card-title">WhatsApp</h3>
          <a href="https://wa.me/56952245020" class="whatsapp-number" target="_blank" rel="noopener noreferrer">
            +56 9 5224 5020
          </a>
          <p class="card-description">Chatea con nosotros</p>
        </div>

        <!-- Stores Info -->
        <div class="contact-card stores-card">
          <div class="card-icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
              <circle cx="12" cy="10" r="3"></circle>
            </svg>
          </div>
          <h3 class="card-title">En las tiendas Motomundi</h3>
          <p class="card-description">
            Disponemos de 6 tiendas físicas con grandes espacios destinados al mundo de la Moto.
            Nos encontrarás en Santiago, Viña del Mar, Concepción y La Serena.
          </p>
          <a href="/tiendas" class="stores-link">Ver tiendas y horarios →</a>
        </div>
      </div>

      <!-- Contact Form Section -->
      <div class="form-section">
        <div class="form-header">
          <h2 class="form-title">Contáctanos por email</h2>
          <p class="form-description">Completa el formulario y te responderemos a la brevedad</p>
        </div>

        <form @submit.prevent="handleSubmit" class="contact-form" novalidate>
          <div class="form-row">
            <div class="form-group" :class="{ 'has-error': errors.name, 'has-value': formData.name }">
              <label for="name" class="form-label">
                Nombre completo <span class="required">*</span>
              </label>
              <input
                id="name"
                v-model="formData.name"
                type="text"
                class="form-input"
                :class="{ 'error': errors.name }"
                @blur="validateField('name')"
                @input="clearError('name')"
                required
                autocomplete="name"
              />
              <span v-if="errors.name" class="error-message">{{ errors.name }}</span>
            </div>

            <div class="form-group" :class="{ 'has-error': errors.email, 'has-value': formData.email }">
              <label for="email" class="form-label">
                Email <span class="required">*</span>
              </label>
              <input
                id="email"
                v-model="formData.email"
                type="email"
                class="form-input"
                :class="{ 'error': errors.email }"
                @blur="validateField('email')"
                @input="clearError('email')"
                required
                autocomplete="email"
              />
              <span v-if="errors.email" class="error-message">{{ errors.email }}</span>
            </div>
          </div>

          <div class="form-group" :class="{ 'has-error': errors.phone, 'has-value': formData.phone }">
            <label for="phone" class="form-label">
              Teléfono <span class="required">*</span>
            </label>
            <input
              id="phone"
              v-model="formData.phone"
              type="tel"
              class="form-input"
              :class="{ 'error': errors.phone }"
              placeholder="+56 9 1234 5678"
              @blur="validateField('phone')"
              @input="clearError('phone')"
              required
              autocomplete="tel"
            />
            <span v-if="errors.phone" class="error-message">{{ errors.phone }}</span>
          </div>

          <div class="form-group" :class="{ 'has-error': errors.message, 'has-value': formData.message }">
            <label for="message" class="form-label">
              Tu consulta <span class="required">*</span>
            </label>
            <textarea
              id="message"
              v-model="formData.message"
              class="form-textarea"
              :class="{ 'error': errors.message }"
              rows="5"
              @blur="validateField('message')"
              @input="clearError('message')"
              required
            ></textarea>
            <span v-if="errors.message" class="error-message">{{ errors.message }}</span>
          </div>

          <div class="form-actions">
            <button
              type="submit"
              class="submit-button"
              :disabled="isSubmitting"
              :class="{ 'submitting': isSubmitting }"
            >
              <span v-if="!isSubmitting">Enviar consulta</span>
              <span v-else class="loading-text">
                <span class="spinner"></span>
                Enviando...
              </span>
            </button>
          </div>

          <!-- Success Message -->
          <transition name="fade">
            <div v-if="showSuccess" class="success-message">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
              ¡Mensaje enviado! Te responderemos pronto.
            </div>
          </transition>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'

const formData = reactive({
  name: '',
  email: '',
  phone: '',
  message: ''
})

const errors = reactive({
  name: '',
  email: '',
  phone: '',
  message: ''
})

const isSubmitting = ref(false)
const showSuccess = ref(false)

const validateField = (field) => {
  errors[field] = ''

  switch (field) {
  case 'name':
    if (!formData.name.trim()) {
      errors.name = 'El nombre es obligatorio'
    } else if (formData.name.trim().length < 2) {
      errors.name = 'El nombre debe tener al menos 2 caracteres'
    }
    break

  case 'email':
    if (!formData.email.trim()) {
      errors.email = 'El email es obligatorio'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = 'Ingresa un email válido'
    }
    break

  case 'phone':
    if (!formData.phone.trim()) {
      errors.phone = 'El teléfono es obligatorio'
    } else if (!/^[\d\s\+\-\(\)]+$/.test(formData.phone)) {
      errors.phone = 'Ingresa un teléfono válido'
    }
    break

  case 'message':
    if (!formData.message.trim()) {
      errors.message = 'La consulta es obligatoria'
    } else if (formData.message.trim().length < 10) {
      errors.message = 'La consulta debe tener al menos 10 caracteres'
    }
    break
  }
}

const clearError = (field) => {
  errors[field] = ''
}

const validateForm = () => {
  validateField('name')
  validateField('email')
  validateField('phone')
  validateField('message')

  return !Object.values(errors).some(error => error !== '')
}

const handleSubmit = async () => {
  if (!validateForm()) {
    return
  }

  isSubmitting.value = true

  try {
    // Aquí iría la llamada a tu API
    // await $fetch('/api/contact', {
    //   method: 'POST',
    //   body: formData
    // })

    // Simulación de envío
    await new Promise(resolve => setTimeout(resolve, 1500))

    // Mostrar mensaje de éxito
    showSuccess.value = true

    // Limpiar formulario
    Object.keys(formData).forEach(key => {
      formData[key] = ''
    })

    // Ocultar mensaje después de 5 segundos
    setTimeout(() => {
      showSuccess.value = false
    }, 5000)

  } catch (error) {
    console.error('Error al enviar el formulario:', error)
    // Aquí podrías mostrar un mensaje de error
  } finally {
    isSubmitting.value = false
  }
}
</script>

<style scoped>
/* CSS Variables */
:root {
  --primary-color: #dc2626;
  --primary-dark: #b91c1c;
  --primary-light: #fee2e2;
  --text-primary: #0a0a0a;
  --text-secondary: #525252;
  --text-muted: #737373;
  --border-color: #e5e5e5;
  --bg-white: #ffffff;
  --bg-gray: #fafafa;
  --whatsapp: #25d366;
  --whatsapp-dark: #1da851;
  --success: #16a34a;
  --error: #dc2626;
  --shadow-sm: 0 1px 2px 0 rgb(0 0 0 / 0.05);
  --shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.1);
  --shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.1);
  --radius-sm: 8px;
  --radius-md: 12px;
  --radius-lg: 16px;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.contact-container {
  min-height: 100vh;
  background: linear-gradient(135deg, #fafafa 0%, #f5f5f5 100%);
  padding: 3rem 1.5rem;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Noto Sans', Helvetica, Arial, sans-serif;
}

.contact-wrapper {
  max-width: 1200px;
  margin: 0 auto;
}

/* Header */
.contact-header {
  text-align: center;
  margin-bottom: 4rem;
  animation: fadeInDown 0.6s ease-out;
}

.title {
  font-size: 3rem;
  font-weight: 800;
  color: var(--text-primary);
  margin-bottom: 0.75rem;
  letter-spacing: -0.02em;
  background: linear-gradient(135deg, var(--primary-color) 0%, var(--primary-dark) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.subtitle {
  font-size: 1.25rem;
  color: var(--text-secondary);
  font-weight: 400;
}

/* Contact Methods Grid */
.contact-methods {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-bottom: 4rem;
}

.contact-card {
  background: var(--bg-white);
  border-radius: var(--radius-lg);
  padding: 2.5rem 2rem;
  box-shadow: var(--shadow-md);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  border: 1px solid var(--border-color);
  animation: fadeInUp 0.6s ease-out;
  animation-fill-mode: both;
}

.contact-card:nth-child(1) { animation-delay: 0.1s; }
.contact-card:nth-child(2) { animation-delay: 0.2s; }
.contact-card:nth-child(3) { animation-delay: 0.3s; }

.contact-card:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-lg);
  border-color: var(--primary-color);
}

.card-icon {
  width: 64px;
  height: 64px;
  border-radius: var(--radius-md);
  background: var(--primary-light);
  color: var(--primary-color);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1.5rem;
  transition: all 0.3s ease;
}

.whatsapp-icon {
  background: #dcfce7;
  color: var(--whatsapp);
}

.contact-card:hover .card-icon {
  transform: scale(1.1) rotate(5deg);
}

.card-title {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: 0.75rem;
}

.card-description {
  color: var(--text-secondary);
  line-height: 1.6;
  margin-bottom: 1.5rem;
}

/* Phone List */
.phone-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.phone-item {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.phone-label {
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--text-muted);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.phone-number {
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--primary-color);
  text-decoration: none;
  transition: color 0.2s ease;
}

.phone-number:hover {
  color: var(--primary-dark);
  text-decoration: underline;
}

.availability {
  font-size: 0.875rem;
  color: var(--text-muted);
  font-style: italic;
}

/* WhatsApp */
.whatsapp-number {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--whatsapp);
  text-decoration: none;
  margin-bottom: 0.5rem;
  transition: color 0.2s ease;
}

.whatsapp-number:hover {
  color: var(--whatsapp-dark);
}

/* Stores Link */
.stores-link {
  display: inline-flex;
  align-items: center;
  color: var(--primary-color);
  font-weight: 600;
  text-decoration: none;
  margin-top: 1rem;
  transition: gap 0.2s ease;
}

.stores-link:hover {
  gap: 0.5rem;
  text-decoration: underline;
}

/* Form Section */
.form-section {
  background: var(--bg-white);
  border-radius: var(--radius-lg);
  padding: 3rem 2.5rem;
  box-shadow: var(--shadow-lg);
  border: 1px solid var(--border-color);
  animation: fadeInUp 0.6s ease-out 0.4s;
  animation-fill-mode: both;
}

.form-header {
  text-align: center;
  margin-bottom: 2.5rem;
}

.form-title {
  font-size: 2rem;
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: 0.5rem;
}

.form-description {
  color: var(--text-secondary);
  font-size: 1.125rem;
}

/* Form Styles */
.contact-form {
  max-width: 700px;
  margin: 0 auto;
}

.form-row {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin-bottom: 1.5rem;
}

.form-group {
  position: relative;
  margin-bottom: 1.5rem;
}

.form-label {
  display: block;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: 0.5rem;
  font-size: 0.9375rem;
  transition: color 0.2s ease;
}

.required {
  color: var(--error);
}

.form-input,
.form-textarea {
  width: 100%;
  padding: 0.875rem 1rem;
  font-size: 1rem;
  border: 2px solid var(--border-color);
  border-radius: var(--radius-sm);
  transition: all 0.2s ease;
  background: var(--bg-white);
  color: var(--text-primary);
  font-family: inherit;
}

.form-input:focus,
.form-textarea:focus {
  outline: none;
  border-color: var(--primary-color);
  box-shadow: 0 0 0 3px var(--primary-light);
}

.form-input.error,
.form-textarea.error {
  border-color: var(--error);
}

.form-input.error:focus,
.form-textarea.error:focus {
  box-shadow: 0 0 0 3px rgba(220, 38, 38, 0.1);
}

.form-textarea {
  resize: vertical;
  min-height: 120px;
}

.error-message {
  display: block;
  color: var(--error);
  font-size: 0.875rem;
  margin-top: 0.5rem;
  animation: slideDown 0.2s ease-out;
}

/* Form Actions */
.form-actions {
  margin-top: 2rem;
}

.submit-button {
  width: 100%;
  padding: 1rem 2rem;
  font-size: 1.125rem;
  font-weight: 600;
  color: white;
  background: linear-gradient(135deg, var(--primary-color) 0%, var(--primary-dark) 100%);
  border: none;
  border-radius: var(--radius-sm);
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 4px 6px -1px rgba(220, 38, 38, 0.3);
  position: relative;
  overflow: hidden;
}

.submit-button::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
  transition: left 0.5s ease;
}

.submit-button:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 10px 15px -3px rgba(220, 38, 38, 0.4);
}

.submit-button:hover:not(:disabled)::before {
  left: 100%;
}

.submit-button:active:not(:disabled) {
  transform: translateY(0);
}

.submit-button:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.loading-text {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
}

.spinner {
  width: 18px;
  height: 18px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-top-color: white;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

/* Success Message */
.success-message {
  margin-top: 1.5rem;
  padding: 1rem 1.5rem;
  background: #dcfce7;
  color: var(--success);
  border-radius: var(--radius-sm);
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-weight: 600;
  border: 1px solid #bbf7d0;
}

/* Animations */
@keyframes fadeInDown {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes slideDown {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

/* Transitions */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* Responsive */
@media (max-width: 768px) {
  .contact-container {
    padding: 2rem 1rem;
  }

  .title {
    font-size: 2rem;
  }

  .subtitle {
    font-size: 1rem;
  }

  .contact-methods {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }

  .form-section {
    padding: 2rem 1.5rem;
  }

  .form-title {
    font-size: 1.5rem;
  }

  .form-row {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 480px) {
  .contact-header {
    margin-bottom: 2rem;
  }

  .contact-card {
    padding: 2rem 1.5rem;
  }

  .form-section {
    padding: 1.5rem 1rem;
  }
}
</style>
