<script setup lang="ts">
definePageMeta({
  alias: '/cuenta/evaluaciones/exito',
  layout: 'account',
  middleware: 'auth',
})

useHead({
  title: 'Evaluación Recibida - Gracias por tu Opinión',
})

const router = useRouter()

// Animation state
const mounted = ref(false)

onMounted(() => {
  setTimeout(() => {
    mounted.value = true
  }, 100)
})

const goToProducts = () => {
  router.push('/')
}

const goToAccount = () => {
  router.push('/cuenta/perfil')
}

const viewMyReviews = () => {
  router.push('/account/reviews')
}
</script>

<template>
  <div class="review-success-page">
    <section class="success-container">
      <VRow justify="center">
        <VCol
          cols="12"
          md="10"
          lg="8"
          xl="6"
        >
          <!-- Success Card -->
          <div
            class="success-card"
            :class="{ 'card-enter': mounted }"
          >
            <!-- Icon Section -->
            <div class="icon-wrapper">
              <div class="icon-circle">
                <div class="icon-circle-inner">
                  <VIcon
                    icon="tabler-circle-check"
                    class="success-icon"
                    size="64"
                  />
                </div>
              </div>

              <!-- Decorative particles -->
              <div class="particle particle-1" />
              <div class="particle particle-2" />
              <div class="particle particle-3" />
              <div class="particle particle-4" />
            </div>

            <!-- Content Section -->
            <div class="content-section">
              <h1 class="success-title">
                ¡Gracias por tu Opinión!
              </h1>

              <p class="success-subtitle">
                Tu evaluación ha sido recibida exitosamente
              </p>

              <div class="info-box">
                <VIcon
                  icon="tabler-info-circle"
                  class="info-icon"
                  size="20"
                />
                <div class="info-text">
                  <strong>Estamos revisando tu evaluación</strong>
                  <p>
                    Nuestro equipo verificará tu opinión antes de publicarla.
                    Este proceso normalmente toma entre 24 y 48 horas.
                    Te notificaremos cuando esté visible para otros usuarios.
                  </p>
                </div>
              </div>

              <!-- Stats/Benefits -->
              <div class="benefits-grid">
                <div class="benefit-item">
                  <div class="benefit-icon-wrapper">
                    <VIcon
                      icon="tabler-users"
                      size="24"
                    />
                  </div>
                  <div class="benefit-text">
                    <div class="benefit-title">
                      Ayudas a la Comunidad
                    </div>
                    <div class="benefit-description">
                      Tu opinión ayuda a otros compradores
                    </div>
                  </div>
                </div>

                <div class="benefit-item">
                  <div class="benefit-icon-wrapper">
                    <VIcon
                      icon="tabler-star"
                      size="24"
                    />
                  </div>
                  <div class="benefit-text">
                    <div class="benefit-title">
                      Calidad Garantizada
                    </div>
                    <div class="benefit-description">
                      Verificamos todas las evaluaciones
                    </div>
                  </div>
                </div>

                <div class="benefit-item">
                  <div class="benefit-icon-wrapper">
                    <VIcon
                      icon="tabler-bell"
                      size="24"
                    />
                  </div>
                  <div class="benefit-text">
                    <div class="benefit-title">
                      Te Notificaremos
                    </div>
                    <div class="benefit-description">
                      Cuando tu review sea publicada
                    </div>
                  </div>
                </div>
              </div>

              <!-- Action Buttons -->
              <div class="action-buttons">
                <VBtn
                  color="primary"
                  size="large"
                  variant="flat"
                  rounded="lg"
                  class="action-btn primary-btn"
                  @click="goToProducts"
                >
                  <VIcon
                    icon="tabler-shopping-bag"
                    start
                  />
                  Seguir Comprando
                </VBtn>

                <VBtn
                  color="default"
                  size="large"
                  variant="outlined"
                  rounded="lg"
                  class="action-btn secondary-btn"
                  @click="viewMyReviews"
                >
                  <VIcon
                    icon="tabler-message-circle"
                    start
                  />
                  Mis Evaluaciones
                </VBtn>
              </div>

              <!-- Secondary Action -->
              <div class="secondary-action">
                <VBtn
                  variant="text"
                  color="primary"
                  @click="goToAccount"
                >
                  Volver a Mi Cuenta
                  <VIcon
                    icon="tabler-arrow-right"
                    end
                  />
                </VBtn>
              </div>
            </div>
          </div>
        </VCol>
      </VRow>
    </section>
  </div>
</template>

<style scoped>
.review-success-page {
  min-height: calc(100vh - 200px);
  display: flex;
  align-items: center;
  padding: 3rem 0;
}

.success-container {
  position: relative;
}

.success-card {
  background: white;
  border-radius: 24px;
  padding: 3rem 2rem;
  box-shadow:
    0 4px 6px rgba(0, 0, 0, 0.02),
    0 12px 24px rgba(0, 0, 0, 0.04),
    0 24px 48px rgba(0, 0, 0, 0.06);
  position: relative;
  overflow: hidden;
  opacity: 0;
  transform: translateY(30px);
  transition: all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.success-card.card-enter {
  opacity: 1;
  transform: translateY(0);
}

.success-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: linear-gradient(90deg, #4caf50 0%, #66bb6a 100%);
  animation: slideIn 0.6s ease-out 0.3s backwards;
}

@keyframes slideIn {
  from {
    transform: translateX(-100%);
  }
  to {
    transform: translateX(0);
  }
}

/* Icon Section */
.icon-wrapper {
  position: relative;
  display: flex;
  justify-content: center;
  margin-bottom: 2.5rem;
  height: 140px;
}

.icon-circle {
  width: 120px;
  height: 120px;
  background: linear-gradient(135deg, #e8f5e9 0%, #c8e6c9 100%);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  animation: scaleIn 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) 0.2s backwards;
  box-shadow:
    0 8px 16px rgba(76, 175, 80, 0.15),
    0 0 0 12px rgba(76, 175, 80, 0.05);
  position: relative;
  z-index: 2;
}

.icon-circle-inner {
  width: 100px;
  height: 100px;
  background: linear-gradient(135deg, #4caf50 0%, #66bb6a 100%);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  animation: pulse 2s ease-in-out infinite;
}

@keyframes scaleIn {
  from {
    transform: scale(0);
    opacity: 0;
  }
  to {
    transform: scale(1);
    opacity: 1;
  }
}

@keyframes pulse {
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
}

.success-icon {
  color: white !important;
  animation: checkAppear 0.4s ease-out 0.5s backwards;
}

@keyframes checkAppear {
  from {
    transform: scale(0) rotate(-180deg);
    opacity: 0;
  }
  to {
    transform: scale(1) rotate(0deg);
    opacity: 1;
  }
}

/* Decorative Particles */
.particle {
  position: absolute;
  border-radius: 50%;
  animation: float 3s ease-in-out infinite;
  opacity: 0;
  animation: particleFade 0.6s ease-out forwards;
}

.particle-1 {
  width: 12px;
  height: 12px;
  background: linear-gradient(135deg, #4caf50, #66bb6a);
  top: 20px;
  left: 30%;
  animation-delay: 0.3s;
}

.particle-2 {
  width: 8px;
  height: 8px;
  background: linear-gradient(135deg, #66bb6a, #81c784);
  top: 40px;
  right: 25%;
  animation-delay: 0.4s;
}

.particle-3 {
  width: 10px;
  height: 10px;
  background: linear-gradient(135deg, #81c784, #a5d6a7);
  bottom: 30px;
  left: 25%;
  animation-delay: 0.5s;
}

.particle-4 {
  width: 6px;
  height: 6px;
  background: linear-gradient(135deg, #a5d6a7, #c8e6c9);
  bottom: 20px;
  right: 30%;
  animation-delay: 0.6s;
}

@keyframes particleFade {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 0.6;
    transform: translateY(0);
  }
}

@keyframes float {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
}

/* Content Section */
.content-section {
  text-align: center;
  animation: fadeInUp 0.6s ease-out 0.4s backwards;
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

.success-title {
  font-size: 2rem;
  font-weight: 700;
  color: #1a1a1a;
  margin-bottom: 0.75rem;
  letter-spacing: -0.02em;
  line-height: 1.2;
}

.success-subtitle {
  font-size: 1.125rem;
  color: #666;
  margin-bottom: 2rem;
  font-weight: 400;
}

/* Info Box */
.info-box {
  background: linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%);
  border: 1px solid #90caf9;
  border-radius: 16px;
  padding: 1.5rem;
  margin-bottom: 2.5rem;
  display: flex;
  gap: 1rem;
  text-align: left;
  animation: fadeInUp 0.6s ease-out 0.6s backwards;
}

.info-icon {
  color: #1976d2 !important;
  flex-shrink: 0;
  margin-top: 0.25rem;
}

.info-text {
  flex: 1;
}

.info-text strong {
  display: block;
  color: #1565c0;
  margin-bottom: 0.5rem;
  font-size: 0.95rem;
  font-weight: 600;
}

.info-text p {
  color: #424242;
  margin: 0;
  font-size: 0.875rem;
  line-height: 1.6;
}

/* Benefits Grid */
.benefits-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2.5rem;
}

.benefit-item {
  display: flex;
  gap: 1rem;
  align-items: flex-start;
  padding: 1.25rem;
  background: #fafafa;
  border-radius: 12px;
  transition: all 0.3s ease;
  animation: fadeInUp 0.6s ease-out backwards;
}

.benefit-item:nth-child(1) {
  animation-delay: 0.7s;
}

.benefit-item:nth-child(2) {
  animation-delay: 0.8s;
}

.benefit-item:nth-child(3) {
  animation-delay: 0.9s;
}

.benefit-item:hover {
  background: #f5f5f5;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
}

.benefit-icon-wrapper {
  width: 48px;
  height: 48px;
  background: linear-gradient(135deg, #4caf50 0%, #66bb6a 100%);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  box-shadow: 0 4px 8px rgba(76, 175, 80, 0.2);
}

.benefit-icon-wrapper .v-icon {
  color: white !important;
}

.benefit-text {
  text-align: left;
}

.benefit-title {
  font-weight: 600;
  color: #1a1a1a;
  font-size: 0.95rem;
  margin-bottom: 0.25rem;
}

.benefit-description {
  font-size: 0.8125rem;
  color: #666;
  line-height: 1.4;
}

/* Action Buttons */
.action-buttons {
  display: flex;
  gap: 1rem;
  justify-content: center;
  margin-bottom: 1.5rem;
  flex-wrap: wrap;
  animation: fadeInUp 0.6s ease-out 1s backwards;
}

.action-btn {
  min-width: 200px;
  font-weight: 600;
  letter-spacing: 0.01em;
  transition: all 0.3s ease;
}

.primary-btn {
  background: linear-gradient(135deg, #4caf50 0%, #66bb6a 100%) !important;
  box-shadow: 0 4px 12px rgba(76, 175, 80, 0.3);
}

.primary-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(76, 175, 80, 0.4);
}

.secondary-btn {
  border-width: 2px;
}

.secondary-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

/* Secondary Action */
.secondary-action {
  animation: fadeInUp 0.6s ease-out 1.1s backwards;
}

/* Responsive */
@media (max-width: 768px) {
  .success-card {
    padding: 2rem 1.5rem;
  }

  .success-title {
    font-size: 1.5rem;
  }

  .success-subtitle {
    font-size: 1rem;
  }

  .benefits-grid {
    grid-template-columns: 1fr;
  }

  .action-buttons {
    flex-direction: column;
  }

  .action-btn {
    width: 100%;
  }

  .icon-circle {
    width: 100px;
    height: 100px;
  }

  .icon-circle-inner {
    width: 80px;
    height: 80px;
  }

  .success-icon {
    font-size: 48px !important;
  }
}

/* Dark mode support */
@media (prefers-color-scheme: dark) {
  .review-success-page {
    background:
      radial-gradient(circle at 20% 30%, rgba(76, 175, 80, 0.08) 0%, transparent 50%),
      radial-gradient(circle at 80% 70%, rgba(76, 175, 80, 0.08) 0%, transparent 50%),
      linear-gradient(180deg, #1a1a1a 0%, #121212 100%);
  }

  .success-card {
    background: #1e1e1e;
    box-shadow:
      0 4px 6px rgba(0, 0, 0, 0.3),
      0 12px 24px rgba(0, 0, 0, 0.4),
      0 24px 48px rgba(0, 0, 0, 0.5);
  }

  .success-title {
    color: #ffffff;
  }

  .success-subtitle {
    color: #b0b0b0;
  }

  .info-box {
    background: linear-gradient(135deg, #1a2332 0%, #243447 100%);
    border-color: #2d4a6d;
  }

  .info-text strong {
    color: #64b5f6;
  }

  .info-text p {
    color: #b0b0b0;
  }

  .benefit-item {
    background: #2a2a2a;
  }

  .benefit-item:hover {
    background: #333333;
  }

  .benefit-title {
    color: #ffffff;
  }

  .benefit-description {
    color: #b0b0b0;
  }
}
</style>
