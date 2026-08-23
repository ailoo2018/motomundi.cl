<template>
  <section class="sr7-hero">
    <!-- Background image -->
    <div class="sr7-hero__bg" :style="{ backgroundImage: `url(${bgImage})` }" />
    <!-- Directional scrim: keeps the helmet visible, darkens toward the text -->
    <div class="sr7-hero__scrim" :class="`sr7-hero__scrim--${align}`" />

    <div class="sr7-hero__container" fluid>
      <div class="sr7-hero__content" :class="`sr7-hero__content--${align}`">
        <!-- Signature element: telemetry-style corner frame around the copy block -->
        <div class="sr7-hero__frame" :class="`sr7-hero__frame--${align}`">
          <span class="sr7-hero__corner sr7-hero__corner--tl" />
          <span class="sr7-hero__corner sr7-hero__corner--br" />

          <div class="sr7-hero__eyebrow">
            <VIcon icon="tabler-flag-filled" size="14" class="sr7-hero__eyebrow-icon" />
            <span>Nuevo en Chile</span>
          </div>

          <h1 class="sr7-hero__title">
            {{title}}
          </h1>


          <p class="sr7-hero__subtitle">
            {{subtitle}}
          </p>

          <a :href="link" class="btn-primary">
            {{ buttonText }}
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <line x1="5" y1="12" x2="19" y2="12"></line>
              <polyline points="12 5 19 12 12 19"></polyline>
            </svg>
          </a>

        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
defineProps({
  bgImage: {
    type: String,
    default: '/cms/home/sena-sa30.jpg',
  },
  ctaColor: {
    type: String,
    default: '#BD0019',
  },
  align: {
    type: String,
    default: 'left',
    validator: (value) => ['left', 'center', 'right'].includes(value),
  },
})


const title = 'Conexión Sin Límites en Cada Ruta'
const subtitle = 'El nuevo SENA SA30 redefine la comunicación sobre dos ruedas. Gracias a su tecnología Mesh Intercom de última generación y sonido de alta definición, mantén a tu grupo conectado al instante con la máxima estabilidad y claridad cristalina.'
const buttonText = "Ver Más"
const link = '/motocicleta/3414710-intercomunicadores-sena-sa30'


defineEmits(['ver-casco'])
</script>

<style scoped>
/* Display face: condensed + bold, reads like a racing numberplate.
   Body face: a quiet grotesque for legibility over photography.
   Both loaded globally via nuxt.config (see notes at bottom of file). */

.sr7-hero {
  position: relative;
  width: 100%;
  height: min(600px, 100vh);
  max-height: 600px;
  overflow: hidden;
  isolation: isolate;
}

.sr7-hero__bg {
  position: absolute;
  inset: 0;
  background-size: cover;
  background-position: center;
  z-index: 0;
}

/* Directional scrim: darkens the side where the copy lives while
   keeping the helmet legible on the opposite side. Flips direction
   based on alignment; for center, darkens both edges evenly. */
.sr7-hero__scrim {
  position: absolute;
  inset: 0;
  z-index: 1;
}

.sr7-hero__scrim--right {
  background: linear-gradient(
    90deg,
    rgba(10, 10, 10, 0) 0%,
    rgba(10, 10, 10, 0.35) 45%,
    rgba(10, 10, 10, 0.82) 78%,
    rgba(10, 10, 10, 0.92) 100%
  );
}

.sr7-hero__scrim--left {
  background: linear-gradient(
    270deg,
    rgba(10, 10, 10, 0) 0%,
    rgba(10, 10, 10, 0.35) 45%,
    rgba(10, 10, 10, 0.82) 78%,
    rgba(10, 10, 10, 0.92) 100%
  );
}

.sr7-hero__scrim--center {
  background: linear-gradient(
    180deg,
    rgba(10, 10, 10, 0.55) 0%,
    rgba(10, 10, 10, 0.25) 30%,
    rgba(10, 10, 10, 0.25) 70%,
    rgba(10, 10, 10, 0.6) 100%
  );
}

.sr7-hero__container {
  position: relative;
  z-index: 2;
  height: 100%;
  display: flex;
  align-items: center;
  padding: 0 clamp(20px, 6vw, 72px) clamp(28px, 5vh, 56px);
}

.sr7-hero__content {
  width: 100%;
  display: flex;
}

.sr7-hero__content--left {
  justify-content: flex-start;
}

.sr7-hero__content--center {
  justify-content: center;
}

.sr7-hero__content--right {
  justify-content: flex-end;
}

.sr7-hero__frame {
  position: relative;
  max-width: 460px;
  width: 100%;
  padding: 20px 24px 24px 20px;
  display: flex;
  flex-direction: column;
}

.sr7-hero__frame--left {
  text-align: left;
  align-items: flex-start;
}

.sr7-hero__frame--center {
  text-align: center;
  align-items: center;
}

.sr7-hero__frame--right {
  text-align: right;
  align-items: flex-end;
}

/* Telemetry-style corner brackets — a nod to Alpinestars' track HUD/data
   readouts, kept thin and quiet so it frames rather than decorates. */
.sr7-hero__corner {
  position: absolute;
  width: 22px;
  height: 22px;
  border-color: rgba(245, 245, 240, 0.55);
}
.sr7-hero__corner--tl {
  top: 0;
  left: 0;
  border-top: 2px solid;
  border-left: 2px solid;
  border-color: inherit;
}
.sr7-hero__corner--br {
  bottom: 0;
  right: 0;
  border-bottom: 2px solid #bd0019;
  border-right: 2px solid #bd0019;
}

.sr7-hero__eyebrow {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-family: 'Inter', system-ui, sans-serif;
  font-size: 13px;
  font-weight: 600;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: #bd0019;
  margin-bottom: 10px;
}

.sr7-hero__eyebrow-icon {
  color: #bd0019;
}

.sr7-hero__title {
  font-family: 'Barlow Condensed', 'Oswald', system-ui, sans-serif;
  font-weight: 700;
  font-size: 2.5em;
  line-height: 0.95;
  letter-spacing: 0.01em;
  text-transform: uppercase;
  color: #f5f5f0;
  margin: 0 0 14px;
}

.sr7-hero__subtitle {
  font-family: 'Inter', system-ui, sans-serif;
  font-size: clamp(0.9rem, 1.4vw, 1.05rem);
  line-height: 1.45;
  color: rgba(245, 245, 240, 0.82);
  max-width: 40ch;
  margin: 0 0 22px;
}

.sr7-hero__frame--center .sr7-hero__subtitle {
  margin-left: auto;
  margin-right: auto;
}

.sr7-hero__cta {
  font-family: 'Inter', system-ui, sans-serif;
  font-weight: 600;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: #f5f5f0 !important;
}

@media (max-width: 600px) {
  .sr7-hero__frame {
    max-width: 100%;
  }
  .sr7-hero__subtitle {
    max-width: none;
  }
}

.btn-primary {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background-color: #d6001c;
  padding: 14px 28px;
  font-size: 0.9rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  text-decoration: none;
  border-radius: 4px;
  transition: all 0.2s ease;
  border-color: #d6001c;
  color: #FFFFFF;
}

.btn-primary:hover, .btn-primary:focus {
  background-color: #d6001c;
  border-color: #d6001c;
  color: #FFFFFF;
}
</style>
