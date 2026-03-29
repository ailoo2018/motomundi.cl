<template>
  <section
    class="himalaya-section"
    aria-label="Expedición Himalayas 2026"
  >
    <!-- Background image with cinematic overlay -->
    <div class="himalaya-bg">
      <img
        src="https://www.motomundi.cl/cms/himalaya/himalaya.jpg"
        alt="Himalayas motorcycle expedition"
        class="himalaya-bg__img"
        loading="eager"
        fetchpriority="high"
      >
      <div class="himalaya-bg__overlay" />
      <div class="himalaya-bg__vignette" />
    </div>

    <!-- Decorative top badge -->
    <div class="himalaya-badge animate-fade-in">
      <VIcon
        icon="tabler-mood-kid"
        size="13"
        class="badge-icon"
      />
      <span>KIDULT × MOTOMUNDI</span>
      <VIcon
        icon="tabler-mood-kid"
        size="13"
        class="badge-icon"
      />
    </div>

    <!-- Main content -->
    <div class="himalaya-content">
      <!-- Left column: copy -->
      <div class="himalaya-copy animate-slide-up">
        <p class="himalaya-eyebrow">
          <VIcon
            icon="tabler-map-pin"
            size="15"
            class="mr-1"
          />
          Himalayas · India · 2026
        </p>

        <h2 class="himalaya-headline">
          <span class="headline-thin">El techo</span>
          <span class="headline-bold">del mundo</span>
          <span class="headline-thin">sobre dos</span>
          <span class="headline-bold">ruedas.</span>
        </h2>

        <p class="himalaya-body">
          Hay rutas que se recorren y hay otras que te transforman.
          Del <strong>27 de junio al 9 de julio de 2026</strong> cruzaremos
          la cordillera más alta del mundo. No es sólo un viaje —
          es el desafío técnico y personal de conquistar los pasos de montaña
          más legendarios del planeta.
        </p>

        <!-- Stats strip -->
        <div class="himalaya-stats">
          <div class="stat-item">
            <VIcon
              icon="tabler-calendar-event"
              size="18"
              class="stat-icon"
            />
            <div>
              <span class="stat-value">13</span>
              <span class="stat-label">días de ruta</span>
            </div>
          </div>
          <div class="stat-divider" />
          <div class="stat-item">
            <VIcon
              icon="tabler-mountain"
              size="18"
              class="stat-icon"
            />
            <div>
              <span class="stat-value">5.600m</span>
              <span class="stat-label">altura máxima</span>
            </div>
          </div>
          <div class="stat-divider" />
          <div class="stat-item">
            <VIcon
              icon="tabler-flag-2"
              size="18"
              class="stat-icon"
            />
            <div>
              <span class="stat-value">∞</span>
              <span class="stat-label">adrenalina</span>
            </div>
          </div>
        </div>

        <!-- CTAs -->
        <div class="himalaya-actions">
          <VBtn
            class="cta-primary"
            size="large"
            rounded="0"
            elevation="0"
            href="/moto-blog/expedicion-2026-rodando-en-territorio-extremo"
            target="_blank"
            rel="noopener"
          >
            <VIcon
              icon="ti-arrow-right"
              start
              size="18"
            />
            Quiero ir al Himalaya
          </VBtn>

          <VBtn
            class="cta-secondary"
            size="large"
            variant="outlined"
            rounded="0"
            elevation="0"
            href="#"
          >
            <VIcon
              icon="ti-helmet"
              start
              size="18"
            />
            Ver equipamiento
          </VBtn>
        </div>
      </div>

      <!-- Right column: date card + quote -->
      <div class="himalaya-aside animate-slide-up animate-delay">
        <!-- Date card -->
        <div class="date-card">
          <div class="date-card__header">
            <VIcon
              icon="tabler-calendar-stats"
              size="16"
              class="mr-2"
            />
            FECHAS CONFIRMADAS
          </div>
          <div class="date-card__body">
            <div class="date-range">
              <div class="date-block">
                <span class="date-day">27</span>
                <span class="date-month">JUN</span>
              </div>
              <div class="date-arrow">
                <VIcon
                  icon="tabler-arrow-right"
                  size="22"
                />
              </div>
              <div class="date-block">
                <span class="date-day">09</span>
                <span class="date-month">JUL</span>
              </div>
              <div class="date-year">
                2026
              </div>
            </div>
          </div>
          <div class="date-card__footer">
            <VIcon
              icon="tabler-users"
              size="14"
              class="mr-1"
            />
            Cupos limitados · Organizado por Kidult
          </div>
        </div>

        <!-- Quote callout -->
        <div class="himalaya-quote">
          <VIcon
            icon="ti-quote"
            size="28"
            class="quote-icon"
          />
          <p>
            Paisajes de otro planeta,<br>
            cultura de altura y<br>
            la adrenalina de la ruta pura.
          </p>
        </div>

        <!-- Tag pills -->
        <div class="himalaya-tags">
          <span class="tag">
            <VIcon
              icon="ti-motorbike"
              size="13"
              class="mr-1"
            />Moto Adventure
          </span>
          <span class="tag">
            <VIcon
              icon="ti-camera"
              size="13"
              class="mr-1"
            />Fotografía
          </span>
          <span class="tag">
            <VIcon
              icon="ti-globe"
              size="13"
              class="mr-1"
            />India
          </span>
          <span class="tag">
            <VIcon
              icon="ti-stars"
              size="13"
              class="mr-1"
            />Expedición
          </span>
        </div>
      </div>
    </div>

    <!-- Bottom scroll hint -->
    <div class="scroll-hint animate-bounce">
      <VIcon
        icon="ti-chevron-down"
        size="20"
      />
    </div>
  </section>
</template>

<script setup>

// No props needed — all content is self-contained
</script>

<style>
/* ─── Google Fonts ──────────────────────────────────────────── */

/* ─── CSS Variables ─────────────────────────────────────────── */
:root {
  --hm-gold:    #f0c97a;
  --hm-gold-lt: #fae3a8;
  --hm-white:   #ffffff;
  --hm-white: #fff;
  --hm-dim:     rgba(255, 255, 255, 0.88);
  --hm-dark:    #0a0a0a;
  --hm-card-bg: rgba(10, 10, 10, 0.72);
  --hm-border:  rgba(240, 201, 122, 0.4);
}

/* ─── Section wrapper ───────────────────────────────────────── */
.himalaya-section {
  position: relative;
  width: 100%;
  max-height: 720px;
  height: 720px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;

  color: var(--hm-white);
}

/* ─── Background ────────────────────────────────────────────── */
.himalaya-bg {
  position: absolute;
  inset: 0;
  z-index: 0;
}

.himalaya-bg__img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center 30%;
  display: block;
}

/* Cinematic gradient: dark bottom, clear top-center */
.himalaya-bg__overlay {
  position: absolute;
  inset: 0;
  background:
    linear-gradient(
      to bottom,
      rgba(5, 5, 5, 0.15) 0%,
      rgba(5, 5, 5, 0.10) 30%,
      rgba(5, 5, 5, 0.55) 65%,
      rgba(5, 5, 5, 0.88) 100%
    ),
    linear-gradient(
      to right,
      rgba(5, 5, 5, 0.70) 0%,
      rgba(5, 5, 5, 0.05) 55%,
      rgba(5, 5, 5, 0.50) 100%
    );
}

/* Subtle left-edge vignette for text legibility */
.himalaya-bg__vignette {
  position: absolute;
  inset: 0;
  background: radial-gradient(
    ellipse 70% 100% at 0% 100%,
    rgba(5, 5, 5, 0.45) 0%,
    transparent 70%
  );
}

/* ─── Top badge ─────────────────────────────────────────────── */
.himalaya-badge {
  position: absolute;
  top: 28px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 10;
  display: flex;
  align-items: center;
  gap: 10px;

  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.3em;
  color: var(--hm-gold);
  background: rgba(10, 10, 10, 0.55);
  border: 1px solid var(--hm-border);
  padding: 6px 18px;
  backdrop-filter: blur(6px);
  white-space: nowrap;
}

.badge-icon {
  opacity: 0.7;
}

/* ─── Main content grid ─────────────────────────────────────── */
.himalaya-content {
  position: relative;
  z-index: 10;
  display: grid;
  grid-template-columns: 1fr 340px;
  gap: 0;
  align-items: end;
  padding: 0 56px 40px 56px;
  height: 100%;
  max-height: 720px;
  padding-top: 80px;
}

/* ─── Left: Copy ────────────────────────────────────────────── */
.himalaya-copy {
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding-bottom: 4px;
  padding-right: 48px;
}

.himalaya-eyebrow {

  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.22em;
  color: var(--hm-gold);
  text-transform: uppercase;
  margin: 0 0 16px 0;
  display: flex;
  align-items: center;
}

.himalaya-headline {
  font-family: 'Cormorant Garamond', serif;
  line-height: 1.0;
  margin: 0 0 20px 0;
  display: flex;
  flex-direction: column;
}

.headline-thin {
  font-size: clamp(42px, 5.5vw, 68px);
  font-weight: 300;
  font-style: italic;
  color: rgba(255, 255, 255, 0.92);
  letter-spacing: 0.01em;
}

.headline-bold {
  font-size: clamp(50px, 7vw, 86px);
  font-weight: 700;
  font-style: normal;
  color: var(--hm-white);
  letter-spacing: -0.01em;
  line-height: 0.95;
}

.himalaya-body {

  font-size: 15px;
  font-weight: 400;
  line-height: 1.65;
  color: rgba(255, 255, 255, 0.90);
  max-width: 480px;
  margin: 0 0 24px 0;
}

.himalaya-body strong {
  color: var(--hm-gold-lt);
  font-weight: 600;
}

/* ─── Stats strip ───────────────────────────────────────────── */
.himalaya-stats {
  display: flex;
  align-items: center;
  gap: 0;
  margin-bottom: 28px;
}

.stat-item {
  display: flex;
  align-items: center;
  gap: 10px;
  height: 80px;
  padding: 10px 20px;
  background: rgba(200, 169, 110, 0.08);
  border: 1px solid var(--hm-border);
}

.stat-item:first-child {
  padding-left: 16px;
}

.stat-icon {
  color: var(--hm-gold);
  flex-shrink: 0;
}

.stat-item > div {
  display: flex;
  flex-direction: column;
  line-height: 1.2;
}

.stat-value {

  font-size: 19px;
  font-weight: 700;
  color: var(--hm-white);
  letter-spacing: 0.02em;
}

.stat-label {

  font-size: 10px;
  font-weight: 500;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--hm-gold);
}

.stat-divider {
  width: 1px;
  height: 38px;
  background: var(--hm-border);
}

/* ─── Action buttons ────────────────────────────────────────── */
.himalaya-actions {
  display: flex;
  gap: 14px;
  flex-wrap: wrap;
}

.cta-primary.v-btn {
  background: var(--hm-gold) !important;
  color: #0a0a0a !important;

  font-size: 14px !important;
  font-weight: 700 !important;
  letter-spacing: 0.12em !important;
  text-transform: uppercase !important;
  padding: 0 28px !important;
  height: 48px !important;
  transition: background 0.25s ease, transform 0.2s ease !important;
}

.cta-primary.v-btn:hover {
  background: var(--hm-gold-lt) !important;
  transform: translateY(-2px);
}

.cta-secondary.v-btn {
  border-color: rgba(200, 169, 110, 0.5) !important;
  color: var(--hm-gold-lt) !important;

  font-size: 14px !important;
  font-weight: 600 !important;
  letter-spacing: 0.12em !important;
  text-transform: uppercase !important;
  padding: 0 28px !important;
  height: 48px !important;
  transition: border-color 0.25s, background 0.25s, transform 0.2s !important;
}

.cta-secondary.v-btn:hover {
  border-color: var(--hm-gold) !important;
  background: rgba(200, 169, 110, 0.08) !important;
  transform: translateY(-2px);
}

/* ─── Right: Aside ──────────────────────────────────────────── */
.himalaya-aside {
  display: flex;
  flex-direction: column;
  gap: 14px;
  justify-content: flex-end;
  padding-bottom: 4px;
}

/* ─── Date card ─────────────────────────────────────────────── */
.date-card {
  background: var(--hm-card-bg);
  border: 1px solid var(--hm-border);
  backdrop-filter: blur(12px);
  overflow: hidden;
}

.date-card__header {

  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.25em;
  text-transform: uppercase;
  color: var(--hm-gold);
  background: rgba(200, 169, 110, 0.1);
  border-bottom: 1px solid var(--hm-border);
  padding: 8px 16px;
  display: flex;
  align-items: center;
}

.date-card__body {
  padding: 16px 20px;
}

.date-range {
  display: flex;
  align-items: center;
  gap: 10px;
}

.date-block {
  display: flex;
  flex-direction: column;
  align-items: center;
  line-height: 1;
}

.date-day {
  font-family: 'Cormorant Garamond', serif;
  font-size: 46px;
  font-weight: 700;
  color: var(--hm-white);
  line-height: 1;
}

.date-month {
  font-family: 'Barlow Condensed', sans-serif;
  font-size: 13px;
  font-weight: 700;
  letter-spacing: 0.18em;
  color: var(--hm-gold);
  margin-top: 2px;
}

.date-arrow {
  color: var(--hm-gold);
  flex-shrink: 0;
  opacity: 0.7;
}

.date-year {
  font-family: 'Cormorant Garamond', serif;
  font-size: 36px;
  font-weight: 300;
  font-style: italic;
  color: rgba(255, 255, 255, 0.80);
  margin-left: auto;
}

.date-card__footer {
  font-family: 'Barlow', sans-serif;
  font-size: 10.5px;
  letter-spacing: 0.08em;
  color: rgba(255, 255, 255, 0.70);
  border-top: 1px solid var(--hm-border);
  padding: 8px 16px;
  display: flex;
  align-items: center;
}

/* ─── Quote ─────────────────────────────────────────────────── */
.himalaya-quote {
  border-left: 2px solid var(--hm-gold);
  padding: 10px 16px;
  background: rgba(200, 169, 110, 0.05);
}

.quote-icon {
  color: var(--hm-gold);
  opacity: 0.4;
  display: block;
  margin-bottom: 6px;
}

.himalaya-quote p {
  font-family: 'Cormorant Garamond', serif;
  font-size: 17px;
  font-weight: 300;
  font-style: italic;
  line-height: 1.6;
  color: rgba(255, 255, 255, 0.90);
  margin: 0;
}

/* ─── Tags ──────────────────────────────────────────────────── */
.himalaya-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.tag {
  display: inline-flex;
  align-items: center;
  font-family: 'Barlow Condensed', sans-serif;
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--hm-gold);
  background: rgba(200, 169, 110, 0.1);
  border: 1px solid var(--hm-border);
  padding: 4px 10px;
}

/* ─── Scroll hint ───────────────────────────────────────────── */
.scroll-hint {
  position: absolute;
  bottom: 14px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 10;
  color: rgba(255, 255, 255, 0.55);
}

/* ─── Animations ────────────────────────────────────────────── */
@keyframes fadeIn {
  from { opacity: 0; }
  to   { opacity: 1; }
}

@keyframes slideUp {
  from { opacity: 0; transform: translateY(28px); }
  to   { opacity: 1; transform: translateY(0); }
}

@keyframes bounceY {
  0%, 100% { transform: translateX(-50%) translateY(0); }
  50%       { transform: translateX(-50%) translateY(6px); }
}

.animate-fade-in {
  animation: fadeIn 0.8s ease both;
}

.animate-slide-up {
  animation: slideUp 0.9s cubic-bezier(0.22, 1, 0.36, 1) 0.2s both;
}

.animate-delay {
  animation-delay: 0.38s;
}

.animate-bounce {
  animation: bounceY 2.2s ease-in-out infinite;
}

/* ─── Responsive ────────────────────────────────────────────── */
@media (max-width: 960px) {
  .himalaya-content {
    grid-template-columns: 1fr;
    padding: 0 28px 32px 28px;
    gap: 20px;
    align-items: end;
  }

  .himalaya-aside {
    flex-direction: row;
    flex-wrap: wrap;
    gap: 12px;
  }


  .stat-item {
    gap: 0;
    padding: 5px 5px;
  }

  .date-card {
    flex: 1;
    min-width: 240px;
  }

  .himalaya-quote {
    display: none;
  }

  .himalaya-copy {
    padding-right: 0;
  }

  .headline-thin  { font-size: 36px; }
  .headline-bold  { font-size: 48px; }
}

@media (max-width: 600px) {
  .himalaya-content {
    padding: 0 20px 28px 20px;
  }
  .stat-item {
    gap: 0;
    padding: 5px 5px;
  }


  .himalaya-stats {
    overflow-x: auto;

    scrollbar-width: none;
  }

  .himalaya-actions {
    flex-direction: column;
  }

  .himalaya-aside {
    display: none;
  }

  .himalaya-badge {
    font-size: 9px;
    letter-spacing: 0.2em;
    padding: 5px 12px;
  }
}
</style>
