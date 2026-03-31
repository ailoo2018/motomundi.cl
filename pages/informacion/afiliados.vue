<template>
  <div class="affiliate-page">
    <!-- ─── HERO ─────────────────────────────────────────────────── -->
    <section class="hero-section">
      <div
        class="hero-bg-pattern"
        aria-hidden="true"
      />
      <VContainer class="hero-container">
        <VRow
          align="center"
          justify="center"
        >
          <VCol
            cols="12"
            md="8"
            class="text-center"
          >
            <div class="hero-eyebrow">
              <VIcon icon="tabler-shield-star" />
              Programa Oficial
            </div>
            <h1 class="hero-title">
              Programa de<br>
              <span class="brand-text">Afiliados</span>
            </h1>
            <p class="hero-subtitle">
              Monetiza tu contenido recomendando el mejor equipamiento de motociclismo de Chile.
              Únete a nuestra red de creadores, blogueros e influencers y gana comisiones reales.
            </p>
            <div class="hero-actions">
              <VBtn
                size="x-large"
                class="apply-btn"
                rounded="pill"
                elevation="0"
                href="#aplicar"
              >
                <i class="ti tabler-rocket mr-2" />
                Postular Ahora
              </VBtn>
              <VBtn
                size="x-large"
                variant="outlined"
                class="learn-btn"
                rounded="pill"
                elevation="0"
                href="#como-funciona"
              >
                Cómo funciona
              </VBtn>
            </div>
          </VCol>
        </VRow>

        <!-- Stats strip -->
        <VRow
          justify="center"
          class="mt-10 stats-row"
        >
          <VCol
            v-for="stat in stats"
            :key="stat.label"
            cols="6"
            sm="3"
            class="stat-col text-center"
          >
            <div class="stat-number">
              {{ stat.number }}
            </div>
            <div class="stat-label">
              {{ stat.label }}
            </div>
          </VCol>
        </VRow>
      </VContainer>
    </section>

    <!-- ─── CÓMO FUNCIONA ─────────────────────────────────────────── -->
    <section
      id="como-funciona"
      class="section-how"
    >
      <VContainer>
        <div class="section-header text-center">
          <span class="section-tag">Proceso</span>
          <h2 class="section-title">
            ¿Cómo funciona?
          </h2>
          <p class="section-desc">
            Tres simples pasos te separan de comenzar a ganar comisiones.
          </p>
        </div>

        <VRow
          class="steps-row"
          justify="center"
        >
          <VCol
            v-for="(step, i) in steps"
            :key="i"
            cols="12"
            md="4"
            class="step-col"
          >
            <div class="step-card">
              <div class="step-number">
                {{ String(i + 1).padStart(2, '0') }}
              </div>
              <div class="step-icon-wrap">
                <i :class="`ti ${step.icon}`" />
              </div>
              <h3 class="step-title">
                {{ step.title }}
              </h3>
              <p class="step-desc">
                {{ step.description }}
              </p>
            </div>
            <div
              v-if="i < steps.length - 1"
              class="step-arrow"
              aria-hidden="true"
            >
              <i class="ti tabler-chevron-right" />
            </div>
          </VCol>
        </VRow>
      </VContainer>
    </section>

    <!-- ─── BENEFICIOS ────────────────────────────────────────────── -->
    <section class="section-benefits">
      <VContainer>
        <VRow
          align="center"
          justify="center"
        >
          <VCol
            cols="12"
            md="5"
            class="benefits-left"
          >
            <span class="section-tag">¿Por qué elegirnos?</span>
            <h2 class="section-title">
              Beneficios del<br>programa
            </h2>
            <p class="section-desc">
              Diseñado para que ganes dinero real sin complicaciones. Te entregamos todas las
              herramientas para tener éxito desde el primer día.
            </p>
            <div class="highlight-pills">
              <span class="pill">
                <VIcon icon="tabler-currency-dollar" /> Hasta 7% de comisión
              </span>
              <span class="pill">
                <VIcon icon="tabler-clock" /> Cookie de 14 días
              </span>
            </div>
          </VCol>

          <VCol
            cols="12"
            md="6"
            offset-md="1"
          >
            <div class="benefits-grid">
              <div
                v-for="benefit in benefits"
                :key="benefit.title"
                class="benefit-card"
              >
                <div class="benefit-icon">
                  <VIcon :icon="`${benefit.icon}`" />
                </div>
                <div>
                  <div class="benefit-title">
                    {{ benefit.title }}
                  </div>
                  <div class="benefit-text">
                    {{ benefit.text }}
                  </div>
                </div>
              </div>
            </div>
          </VCol>
        </VRow>
      </VContainer>
    </section>

    <!-- ─── COMISIÓN VISUAL ───────────────────────────────────────── -->
    <section class="section-commission">
      <VContainer>
        <div class="commission-banner">
          <div class="commission-left">
            <i
              class="ti tabler-chart-bar commission-icon"
              aria-hidden="true"
            />
            <div>
              <div class="commission-label">
                Comisión sobre ventas
              </div>
              <div class="commission-value">
                Hasta <strong>7%</strong>
              </div>
            </div>
          </div>
          <div class="commission-divider" />
          <div class="commission-right">
            <i
              class="ti tabler-cookie commission-icon"
              aria-hidden="true"
            />
            <div>
              <div class="commission-label">
                Duración de la cookie
              </div>
              <div class="commission-value">
                Hasta <strong>14 días</strong>
              </div>
            </div>
          </div>
        </div>
      </VContainer>
    </section>

    <!-- ─── PARA QUIÉN ────────────────────────────────────────────── -->
    <section class="section-who">
      <VContainer>
        <div class="section-header text-center">
          <span class="section-tag">Audiencia</span>
          <h2 class="section-title">
            ¿Quién puede unirse?
          </h2>
          <p class="section-desc">
            Si tienes una audiencia apasionada por las motos, este programa es para ti.
          </p>
        </div>

        <VRow justify="center">
          <VCol
            v-for="profile in profiles"
            :key="profile.title"
            cols="12"
            sm="6"
            md="3"
          >
            <div class="profile-card">
              <i :class="`ti ${profile.icon} profile-icon`" />
              <div class="profile-title">
                {{ profile.title }}
              </div>
              <div class="profile-text">
                {{ profile.text }}
              </div>
            </div>
          </VCol>
        </VRow>
      </VContainer>
    </section>

    <!-- ─── CONTACTO ──────────────────────────────────────────────── -->
    <section class="section-contact">
      <VContainer>
        <VRow justify="center">
          <VCol
            cols="12"
            md="7"
            class="text-center"
          >
            <i
              class="ti tabler-mail-forward contact-icon"
              aria-hidden="true"
            />
            <h2 class="section-title">
              ¿Tienes preguntas?
            </h2>
            <p class="section-desc">
              Si tienes dudas sobre el programa o tu postulación, no dudes en escribirnos.
              Nuestro equipo te responderá a la brevedad.
            </p>
            <VBtn
              size="large"
              class="contact-btn"
              rounded="pill"
              href="mailto:afiliados@motomundi.cl"
              elevation="0"
            >
              <i class="ti tabler-mail mr-2" />
              afiliados@motomundi.cl
            </VBtn>
          </VCol>
        </VRow>
      </VContainer>
    </section>

    <!-- ─── CTA POSTULAR ─────────────────────────────────────────── -->
    <section
      id="aplicar"
      class="section-apply"
    >
      <VContainer>
        <div class="apply-card">
          <div class="apply-badge">
            <i class="ti tabler-discount-check" /> Gratis y sin letra chica
          </div>
          <h2 class="apply-title">
            ¡Únete hoy a la<br>comunidad Motomundi!
          </h2>
          <p class="apply-subtitle">
            Miles de motociclistas confían en Motomundi. Ahora tú puedes ganar mientras
            compartes esa pasión con tu audiencia.
          </p>
          <VBtn
            size="x-large"
            class="apply-cta-btn"
            rounded="pill"
            elevation="0"
            href="mailto:afiliados@motomundi.cl?subject=Postulación%20Programa%20Afiliados"
          >
            <i class="ti tabler-user-plus mr-2" />
            Postularme como Afiliado
          </VBtn>
          <p class="apply-note">
            <i class="ti tabler-lock" /> Tu información está segura. No compartimos tus datos con terceros.
          </p>
        </div>
      </VContainer>
    </section>
  </div>
</template>

<script setup>
const stats = [
  { number: '+10.000', label: 'Productos disponibles' },
  { number: '7%',      label: 'Comisión máxima' },
  { number: '14 días', label: 'Duración cookie' },
  { number: '100%',    label: 'Gratis para unirse' },
]

const steps = [
  {
    icon: 'tabler-link',
    title: 'Comparte tu enlace',
    description:
      'Coloca tu banner o enlace de afiliado en tu sitio web, blog, redes sociales o canal de YouTube.',
  },
  {
    icon: 'tabler-shopping-cart',
    title: 'Tu audiencia compra',
    description:
      'Cuando un visitante hace clic en tu enlace y realiza una compra en Motomundi, la venta queda registrada.',
  },
  {
    icon: 'tabler-cash',
    title: 'Tú recibes tu comisión',
    description:
      'Recibes automáticamente una comisión sobre el valor de la venta. Simple, transparente y a tiempo.',
  },
]

const benefits = [
  {
    icon: 'tabler-gift',
    title: 'Ingreso a la plataforma 100% gratuito',
    text: 'Sin costos de inscripción ni compromisos. Empieza a ganar desde el día uno.',
  },
  {
    icon: 'tabler-news',
    title: 'Contenido listo para usar',
    text: 'Banners, textos y creatividades de alta calidad disponibles de inmediato.',
  },
  {
    icon: 'tabler-brand-instagram',
    title: 'Recursos para creadores',
    text: 'Newsletter, contenido pre-escrito y material gráfico adaptado a tu canal.',
  },
  {
    icon: 'tabler-users',
    title: 'Equipo dedicado',
    text: 'Un equipo especializado de gestión de afiliados disponible para apoyarte.',
  },
  {
    icon: 'tabler-chart-line',
    title: 'Panel de seguimiento en tiempo real',
    text: 'Monitorea tus clics, conversiones y comisiones en un tablero transparente.',
  },
  {
    icon: 'tabler-award',
    title: 'Marca líder en Chile',
    text: 'Recomienda el retailer #1 de equipamiento de motociclismo en Chile.',
  },
]

const profiles = [
  {
    icon: 'tabler-article',
    title: 'Bloggers',
    text: 'Blogs de motos, viajes en moto o lifestyle sobre dos ruedas.',
  },
  {
    icon: 'tabler-brand-youtube',
    title: 'Youtubers',
    text: 'Canales de reviews, tutoriales mecánicos o aventuras en ruta.',
  },
  {
    icon: 'tabler-brand-instagram',
    title: 'Influencers',
    text: 'Cuentas de Instagram, TikTok o Facebook con audiencia motociclista.',
  },
  {
    icon: 'tabler-world',
    title: 'Sitios Web',
    text: 'Foros, directorios, clubes de motos y comunidades online.',
  },
]
</script>

<style scoped>
/* ─── TOKENS ─────────────────────────────────────────────────── */
.affiliate-page {
  --brand:       #B21915;
  --brand-dark:  #8a100d;
  --brand-light: #fdf0ef;
  --text-primary:   #222;
  --text-secondary: #555555;
  --border:      #e8e8e8;
  --surface:     #f7f7f7;
  color: var(--text-primary);
  background: #fff;
  overflow-x: hidden;
}

/* ─── HERO ───────────────────────────────────────────────────── */
.hero-section {
  position: relative;
  background: var(--text-primary);
  padding: 100px 0 80px;
  overflow: hidden;
}

.hero-bg-pattern {
  position: absolute;
  inset: 0;
  background-image:
    repeating-linear-gradient(
      45deg,
      rgba(178,25,21,0.07) 0px,
      rgba(178,25,21,0.07) 1px,
      transparent 1px,
      transparent 40px
    );
  pointer-events: none;
}

/* diagonal red slash */
.hero-section::after {
  content: '';
  position: absolute;
  bottom: -2px;
  left: 0;
  right: 0;
  height: 60px;
  background: #fff;
  clip-path: polygon(0 100%, 100% 0, 100% 100%);
}

.hero-container { position: relative; z-index: 1; }

.hero-eyebrow {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  background: rgba(178,25,21,0.18);
  color: #ff7e7b;
  border: 1px solid rgba(178,25,21,0.4);
  border-radius: 999px;
  padding: 6px 16px;
  font-size: 0.78rem;
  font-weight: 600;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  margin-bottom: 24px;
}

.hero-title {
  font-size: clamp(2.6rem, 6vw, 4.2rem);
  font-weight: 900;
  line-height: 1.05;
  color: #fff;
  margin-bottom: 20px;
  letter-spacing: -0.03em;
}

.brand-text {
  color: var(--brand);
  display: inline-block;
  position: relative;
}

.hero-subtitle {
  font-size: 1.1rem;
  color: rgba(255,255,255,0.65);
  line-height: 1.7;
  max-width: 540px;
  margin: 0 auto 40px;
}

.hero-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  justify-content: center;
}

.apply-btn {
  background: var(--brand) !important;
  color: #fff !important;
  font-weight: 700 !important;
  letter-spacing: 0.02em;
  padding: 0 36px !important;
}
.apply-btn:hover { background: var(--brand-dark) !important; }

.learn-btn {
  border-color: rgba(255,255,255,0.35) !important;
  color: #fff !important;
  font-weight: 600 !important;
  padding: 0 32px !important;
}
.learn-btn:hover { border-color: rgba(255,255,255,0.7) !important; }

/* Stats */
.stats-row { padding-top: 20px; gap: 0; }

.stat-col { padding: 12px 8px; }

.stat-number {
  font-size: 2rem;
  font-weight: 900;
  color: var(--brand);
  letter-spacing: -0.04em;
  line-height: 1;
}

.stat-label {
  font-size: 0.8rem;
  color: rgba(255,255,255,0.5);
  margin-top: 4px;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

/* ─── SECTION SHARED ─────────────────────────────────────────── */
.section-header { margin-bottom: 56px; }

.section-tag {
  display: inline-block;
  background: var(--brand-light);
  color: var(--brand);
  border-radius: 999px;
  padding: 4px 14px;
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  margin-bottom: 14px;
}

.section-title {
  font-size: clamp(1.8rem, 3.5vw, 2.6rem);
  font-weight: 900;
  line-height: 1.1;
  letter-spacing: -0.03em;
  color: var(--text-primary);
  margin-bottom: 14px;
}

.section-desc {
  font-size: 1rem;
  color: var(--text-secondary);
  line-height: 1.7;
  max-width: 540px;
  margin: 0 auto;
}

/* ─── CÓMO FUNCIONA ──────────────────────────────────────────── */
.section-how {
  padding: 100px 0 80px;
  background: #fff;
}

.steps-row { align-items: flex-start; position: relative; }

.step-col {
  display: flex;
  align-items: flex-start;
  gap: 0;
  position: relative;
}

.step-card {
  flex: 1;
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 20px;
  padding: 36px 28px;
  position: relative;
  transition: transform 0.2s, box-shadow 0.2s, border-color 0.2s;
}
.step-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 16px 40px rgba(0,0,0,0.08);
  border-color: var(--brand);
}

.step-number {
  position: absolute;
  top: -18px;
  left: 28px;
  background: var(--brand);
  color: #fff;
  border-radius: 8px;
  font-size: 0.7rem;
  font-weight: 900;
  letter-spacing: 0.1em;
  padding: 4px 10px;
}

.step-icon-wrap {
  width: 52px;
  height: 52px;
  background: var(--brand-light);
  border-radius: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 18px;
  color: var(--brand);
  font-size: 1.6rem;
}

.step-title {
  font-size: 1.05rem;
  font-weight: 800;
  margin-bottom: 10px;
  color: var(--text-primary);
}

.step-desc {
  font-size: 0.92rem;
  color: var(--text-secondary);
  line-height: 1.65;
}

.step-arrow {
  display: flex;
  align-items: center;
  padding: 0 6px;
  padding-top: 60px;
  color: var(--brand);
  font-size: 1.4rem;
  flex-shrink: 0;
}

@media (max-width: 959px) {
  .step-arrow { display: none; }
}

/* ─── BENEFICIOS ─────────────────────────────────────────────── */
.section-benefits {
  padding: 100px 0;
  background: var(--surface);
}

.benefits-left {
  padding-right: 40px;
}

.benefits-left .section-desc {
  margin: 0 0 24px;
  max-width: 400px;
}

.highlight-pills {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.pill {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  background: var(--brand);
  color: #fff;
  border-radius: 999px;
  padding: 8px 18px;
  font-size: 0.85rem;
  font-weight: 700;
}

.benefits-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
}

@media (max-width: 599px) {
  .benefits-grid { grid-template-columns: 1fr; }
}

.benefit-card {
  background: #fff;
  border: 1px solid var(--border);
  border-radius: 16px;
  padding: 20px;
  display: flex;
  gap: 14px;
  align-items: flex-start;
  transition: border-color 0.2s, box-shadow 0.2s;
}
.benefit-card:hover {
  border-color: var(--brand);
  box-shadow: 0 8px 24px rgba(178,25,21,0.08);
}

.benefit-icon {
  flex-shrink: 0;
  width: 40px;
  height: 40px;
  background: var(--brand-light);
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--brand);
  font-size: 1.25rem;
}

.benefit-title {
  font-size: 0.88rem;
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: 4px;
}

.benefit-text {
  font-size: 0.82rem;
  color: var(--text-secondary);
  line-height: 1.5;
}

/* ─── COMMISSION BANNER ──────────────────────────────────────── */
.section-commission {
  padding: 0 0 80px;
  background: var(--surface);
}

.commission-banner {
  background: var(--text-primary);
  border-radius: 24px;
  padding: 48px 56px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 60px;
  flex-wrap: wrap;
}

.commission-left,
.commission-right {
  display: flex;
  align-items: center;
  gap: 20px;
}

.commission-icon {
  font-size: 2.6rem;
  color: var(--brand);
}

.commission-label {
  font-size: 0.82rem;
  color: rgba(255,255,255,0.5);
  text-transform: uppercase;
  letter-spacing: 0.08em;
  margin-bottom: 4px;
}

.commission-value {
  font-size: 1.9rem;
  font-weight: 900;
  color: #fff;
  letter-spacing: -0.03em;
}

.commission-value strong {
  color: var(--brand);
}

.commission-divider {
  width: 1px;
  height: 64px;
  background: rgba(255,255,255,0.12);
}

@media (max-width: 599px) {
  .commission-banner { padding: 36px 24px; gap: 32px; }
  .commission-divider { width: 80px; height: 1px; }
}

/* ─── PARA QUIÉN ─────────────────────────────────────────────── */
.section-who {
  padding: 100px 0;
  background: #fff;
}

.profile-card {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 20px;
  padding: 32px 24px;
  text-align: center;
  height: 100%;
  transition: transform 0.2s, border-color 0.2s, box-shadow 0.2s;
}
.profile-card:hover {
  transform: translateY(-4px);
  border-color: var(--brand);
  box-shadow: 0 12px 32px rgba(178,25,21,0.08);
}

.profile-icon {
  font-size: 2.2rem;
  color: var(--brand);
  display: block;
  margin-bottom: 16px;
}

.profile-title {
  font-size: 1rem;
  font-weight: 800;
  color: var(--text-primary);
  margin-bottom: 8px;
}

.profile-text {
  font-size: 0.86rem;
  color: var(--text-secondary);
  line-height: 1.6;
}

/* ─── CONTACTO ───────────────────────────────────────────────── */
.section-contact {
  padding: 80px 0;
  background: var(--brand-light);
}

.section-contact .section-title,
.section-contact .section-desc {
  text-align: center;
}

.contact-icon {
  font-size: 3rem;
  color: var(--brand);
  display: block;
  margin-bottom: 20px;
}

.contact-btn {
  background: var(--brand) !important;
  color: #fff !important;
  font-weight: 700 !important;
  margin-top: 28px;
  letter-spacing: 0.01em;
}
.contact-btn:hover { background: var(--brand-dark) !important; }

/* ─── APPLY CTA ──────────────────────────────────────────────── */
.section-apply {
  padding: 80px 0 100px;
  background: #fff;
}

.apply-card {
  background: var(--text-primary);
  border-radius: 28px;
  padding: 72px 48px;
  text-align: center;
  position: relative;
  overflow: hidden;
}

/* subtle diagonal pattern */
.apply-card::before {
  content: '';
  position: absolute;
  inset: 0;
  background-image: repeating-linear-gradient(
    -45deg,
    rgba(178,25,21,0.06) 0px,
    rgba(178,25,21,0.06) 1px,
    transparent 1px,
    transparent 36px
  );
  pointer-events: none;
}

/* red accent strip top */
.apply-card::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: var(--brand);
}

.apply-badge {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  background: rgba(178,25,21,0.2);
  color: #ff8f8c;
  border: 1px solid rgba(178,25,21,0.4);
  border-radius: 999px;
  padding: 6px 16px;
  font-size: 0.78rem;
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  margin-bottom: 28px;
  position: relative;
}

.apply-title {
  font-size: clamp(2rem, 4vw, 3rem);
  font-weight: 900;
  color: #fff;
  line-height: 1.1;
  letter-spacing: -0.03em;
  margin-bottom: 20px;
  position: relative;
}

.apply-subtitle {
  font-size: 1rem;
  color: rgba(255,255,255,0.6);
  line-height: 1.7;
  max-width: 480px;
  margin: 0 auto 36px;
  position: relative;
}

.apply-cta-btn {
  background: var(--brand) !important;
  color: #fff !important;
  font-weight: 800 !important;
  font-size: 1rem !important;
  padding: 0 44px !important;
  letter-spacing: 0.02em;
  position: relative;
  transition: background 0.2s, transform 0.15s, box-shadow 0.2s;
}
.apply-cta-btn:hover {
  background: var(--brand-dark) !important;
  transform: translateY(-2px);
  box-shadow: 0 12px 28px rgba(178,25,21,0.45) !important;
}

.apply-note {
  font-size: 0.8rem;
  color: rgba(255,255,255,0.35);
  margin-top: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  position: relative;
}

/* ─── UTILITIES ──────────────────────────────────────────────── */
.mr-2 { margin-right: 6px; }

/* tabler icon sizing */
.ti { font-size: inherit; line-height: inherit; }
</style>
