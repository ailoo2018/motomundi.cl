<template>
  <section class="sr7-hero">
    <!-- Background image -->
    <div class="sr7-hero__bg" :style="{ backgroundImage: `url(${bgImage})` }" />
    <!-- Directional scrim: keeps the helmet visible, darkens toward the text -->
    <div class="sr7-hero__scrim" />

    <div class="sr7-hero__container" fluid>
      <div class="sr7-hero__content">
        <!-- Signature element: telemetry-style corner frame around the copy block -->
        <div class="sr7-hero__frame">
          <span class="sr7-hero__corner sr7-hero__corner--tl" />
          <span class="sr7-hero__corner sr7-hero__corner--br" />

          <div class="sr7-hero__eyebrow">
            <VIcon icon="tabler-flag-filled" size="14" class="sr7-hero__eyebrow-icon" />
            <span>Nuevo en Chile</span>
          </div>

          <h1 class="sr7-hero__title">
            Alpinestars R-7: ADN de Pista, Rendimiento Puro.
          </h1>

          <p class="sr7-hero__subtitle">
            Experimenta la combinación perfecta entre ligereza extrema, ventilación avanzada y seguridad sin precedentes. El casco definitivo para quienes buscan romper los límites en el asfalto.
          </p>

          <a href="/products/list?sword=alpinestars+s-r7" class="btn-primary">
            Ver cascos
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
    default: '/cms/alpinestars-sr7.jpg',
  },
  ctaColor: {
    type: String,
    default: '#BD0019',
  },
})

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

/* Darkens the right side (where copy lives) while keeping the
   helmet legible on the left — a directional scrim, not a flat tint. */
.sr7-hero__scrim {
  position: absolute;
  inset: 0;
  z-index: 1;
  background: linear-gradient(
    90deg,
    rgba(10, 10, 10, 0) 0%,
    rgba(10, 10, 10, 0.35) 45%,
    rgba(10, 10, 10, 0.82) 78%,
    rgba(10, 10, 10, 0.92) 100%
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
  justify-content: flex-end;
}

.sr7-hero__frame {
  position: relative;
  max-width: 460px;
  width: 100%;
  padding: 20px 24px 24px 20px;
  text-align: right;
  display: flex;
  flex-direction: column;
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

<!--
  NOTES FOR INTEGRATION
  ----------------------
  1. Fonts: this component assumes "Barlow Condensed" (display) and "Inter" (body)
     are available globally, e.g. via @nuxtjs/google-fonts module or a <link> in
     nuxt.config.ts:

       googleFonts: {
         families: {
           'Barlow Condensed': [600, 700],
           Inter: [400, 600],
         },
       }

  2. Tabler icons: requires the tabler icon set registered in Vuetify's icon
     aliases (e.g. via vuetify-plugin using @tabler/icons or the
     vuetify-nuxt-module iconfont: 'tabler' option). Icons used:
     "tabler-flag-filled" and "tabler-arrow-right".

  3. Image: swap bgImage prop or default path to match your CMS asset pipeline.
     Image should be shot/cropped with the helmet weighted left-of-center so the
     right-aligned copy sits over a clean, darker area — the scrim helps but a
     well-composed source image will always look better.

  4. Usage:
       <HeroSR7 @ver-casco="goToProduct" />
-->
