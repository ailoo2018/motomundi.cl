<template>
  <section class="vulcanet-hero" aria-label="Vulcanet Hero Banner">
    <!-- Background Image with Overlay -->
    <div class="hero-bg">
      <img
        src="https://sf2.autoplus.fr/wp-content/uploads/autoplus/2019/01/vulcanet-nettoyant-revolutionnaire.jpg"
        alt="Vulcanet waterless cleaning product"
        class="hero-bg__img"
        loading="eager"
        fetchpriority="high"
      />
      <div class="hero-bg__overlay" />
      <div class="hero-bg__grain" />
    </div>

    <!-- Content -->
    <div class="hero-content">

      <!-- Left: Badge + Headline + USPs -->
      <div class="hero-content__left">

        <div class="hero-badge">
          <span class="hero-badge__dot" />
          <span class="hero-badge__text">INNOVACIÓN FRANCESA · DESDE 2008</span>
        </div>

        <h1 class="hero-headline">
          <span class="hero-headline__top">Limpia sin</span>
          <span class="hero-headline__accent">una gota</span>
          <span class="hero-headline__bottom">de agua.</span>
        </h1>

        <p class="hero-sub">
          El primer paño todo-en-uno con patente internacional que limpia,
          pule y protege tu moto — sin agua, sin esfuerzo, sin rayones.
        </p>

        <ul class="hero-usps">
          <li class="hero-usp">
            <span class="hero-usp__icon">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
            </span>
            <span>Limpieza completa interior y exterior — un solo producto</span>
          </li>
          <li class="hero-usp">
            <span class="hero-usp__icon">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
            </span>
            <span>Protección UV, lluvia, sal e insectos incluida</span>
          </li>
          <li class="hero-usp">
            <span class="hero-usp__icon">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
            </span>
            <span>Tejido alveolado patentado · 18 moléculas de alto rendimiento</span>
          </li>
          <li class="hero-usp">
            <span class="hero-usp__icon">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
            </span>
            <span>Úsalo en la calle, garaje o evento — sin equipo adicional</span>
          </li>
        </ul>

        <div class="hero-actions">
          <button class="btn-primary">
            Ver producto
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
          </button>
          <button class="btn-ghost">¿Cómo funciona?</button>
        </div>
      </div>

      <!-- Right: Award + Stats card -->
      <div class="hero-content__right">
        <div class="hero-card">
          <div class="hero-card__award">
            <div class="hero-card__award-icon">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="7"/><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"/></svg>
            </div>
            <div>
              <p class="hero-card__award-label">Premio a la Innovación</p>
              <p class="hero-card__award-year">Salón del Auto de Ginebra · 2008</p>
            </div>
          </div>

          <div class="hero-card__divider" />

          <div class="hero-card__stats">
            <div class="hero-card__stat">
              <span class="hero-card__stat-value">+15</span>
              <span class="hero-card__stat-label">años en el mercado</span>
            </div>
            <div class="hero-card__stat">
              <span class="hero-card__stat-value">333</span>
              <span class="hero-card__stat-label">productos vendidos/día</span>
            </div>
            <div class="hero-card__stat">
              <span class="hero-card__stat-value">2.245</span>
              <span class="hero-card__stat-label">puntos de venta</span>
            </div>
          </div>

          <div class="hero-card__divider" />

          <div class="hero-card__surfaces">
            <p class="hero-card__surfaces-label">Compatible con:</p>
            <div class="hero-card__surfaces-tags">
              <span class="tag">Carrocería</span>
              <span class="tag">Llantas</span>
              <span class="tag">Cromados</span>
              <span class="tag">Vidrios</span>
              <span class="tag">Plásticos</span>
              <span class="tag">Cuero</span>
              <span class="tag">Alcántara</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Bottom bar -->
    <div class="hero-bar">
      <div class="hero-bar__inner">
        <span>🇫🇷 Fórmula 100% Francesa</span>
        <span class="hero-bar__sep">·</span>
        <span>🌿 Sin agua · Eco-friendly</span>
        <span class="hero-bar__sep">·</span>
        <span>🏍️ Moto · Auto · Barco · Bicicleta</span>
        <span class="hero-bar__sep">·</span>
        <span>⭐ Patente Internacional N° 07.04121</span>
      </div>
    </div>
  </section>
</template>

<script setup>
// No props required — hero is self-contained.
// Extend with defineProps if you need dynamic product URL or CTA routing.
</script>

<style scoped>
/* ── Design Tokens ──────────────────────────────────── */
.vulcanet-hero {
  --brand:        #B21A15;
  --brand-light:  #d9231d;
  --brand-dim:    rgba(178, 26, 21, 0.18);
  --white:        #ffffff;
  --off-white:    #f5f3f0;
  --text-hero:    #ffffff;
  --text-muted:   rgba(255,255,255,0.65);
  --card-bg:      rgba(10, 6, 4, 0.72);
  --card-border:  rgba(255,255,255,0.10);
  --bar-bg:       rgba(178, 26, 21, 0.92);
  --radius-sm:    6px;
  --radius-md:    12px;
  --radius-lg:    20px;

  position: relative;
  width: 100%;
  min-height: 620px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  font-family: 'Barlow Condensed', 'Arial Narrow', sans-serif;
}

/* ── Background ─────────────────────────────────────── */
.hero-bg {
  position: absolute;
  inset: 0;
  z-index: 0;
}

.hero-bg__img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center 30%;
  display: block;
}

.hero-bg__overlay {
  position: absolute;
  inset: 0;
  background:
    linear-gradient(105deg,
    rgba(5, 2, 2, 0.88) 0%,
    rgba(20, 6, 5, 0.72) 45%,
    rgba(0, 0, 0, 0.30) 100%
    );
}

.hero-bg__grain {
  position: absolute;
  inset: 0;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E");
  background-size: 200px;
  opacity: 0.4;
  pointer-events: none;
}

/* ── Main Content Layout ────────────────────────────── */
.hero-content {
  position: relative;
  z-index: 1;
  flex: 1;
  display: grid;
  grid-template-columns: 1fr 380px;
  gap: 40px;
  align-items: center;
  padding: 60px 64px 56px;
  max-width: 1360px;
  margin: 0 auto;
  width: 100%;
}

/* ── Left Column ────────────────────────────────────── */
.hero-badge {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: var(--brand-dim);
  border: 1px solid rgba(178, 26, 21, 0.4);
  border-radius: 100px;
  padding: 5px 14px 5px 10px;
  margin-bottom: 24px;
  backdrop-filter: blur(4px);
}

.hero-badge__dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--brand);
  box-shadow: 0 0 0 3px rgba(178, 26, 21, 0.3);
  animation: pulse 2s ease-in-out infinite;
}

@keyframes pulse {
  0%, 100% { box-shadow: 0 0 0 3px rgba(178, 26, 21, 0.3); }
  50%       { box-shadow: 0 0 0 6px rgba(178, 26, 21, 0.1); }
}

.hero-badge__text {
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.14em;
  color: var(--brand-light);
  text-transform: uppercase;
  font-family: 'Barlow', 'Arial', sans-serif;
}

/* Headline */
.hero-headline {
  display: flex;
  flex-direction: column;
  line-height: 0.92;
  margin: 0 0 20px;
  letter-spacing: -0.01em;
}

.hero-headline__top,
.hero-headline__bottom {
  font-size: clamp(54px, 7vw, 88px);
  font-weight: 800;
  color: var(--white);
  text-transform: uppercase;
}

.hero-headline__accent {
  font-size: clamp(72px, 9.5vw, 118px);
  font-weight: 900;
  color: var(--brand);
  text-transform: uppercase;
  text-shadow: 0 0 60px rgba(178, 26, 21, 0.45);
  line-height: 0.9;
}

/* Subheadline */
.hero-sub {
  font-family: 'Barlow', 'Arial', sans-serif;
  font-size: 16px;
  line-height: 1.6;
  color: var(--text-muted);
  max-width: 480px;
  margin: 0 0 28px;
  font-weight: 400;
}

/* USPs */
.hero-usps {
  list-style: none;
  margin: 0 0 36px;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 11px;
}

.hero-usp {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  font-family: 'Barlow', 'Arial', sans-serif;
  font-size: 14.5px;
  color: rgba(255,255,255,0.82);
  line-height: 1.4;
  font-weight: 400;
}

.hero-usp__icon {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  width: 22px;
  height: 22px;
  border-radius: 50%;
  background: var(--brand);
  color: #fff;
  margin-top: 1px;
}

/* Actions */
.hero-actions {
  display: flex;
  align-items: center;
  gap: 16px;
  flex-wrap: wrap;
}

.btn-primary {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: var(--brand);
  color: #fff;
  font-family: 'Barlow Condensed', 'Arial Narrow', sans-serif;
  font-size: 15px;
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  padding: 14px 28px;
  border-radius: var(--radius-sm);
  border: none;
  cursor: pointer;
  transition: background 0.2s, transform 0.15s, box-shadow 0.2s;
  box-shadow: 0 4px 24px rgba(178, 26, 21, 0.45);
}

.btn-primary:hover {
  background: var(--brand-light);
  transform: translateY(-2px);
  box-shadow: 0 8px 32px rgba(178, 26, 21, 0.55);
}

.btn-primary:active {
  transform: translateY(0);
}

.btn-ghost {
  background: transparent;
  color: rgba(255,255,255,0.7);
  font-family: 'Barlow', 'Arial', sans-serif;
  font-size: 14px;
  font-weight: 500;
  border: 1px solid rgba(255,255,255,0.25);
  padding: 13px 22px;
  border-radius: var(--radius-sm);
  cursor: pointer;
  transition: border-color 0.2s, color 0.2s, background 0.2s;
  letter-spacing: 0.02em;
}

.btn-ghost:hover {
  border-color: rgba(255,255,255,0.55);
  color: #fff;
  background: rgba(255,255,255,0.06);
}

/* ── Right Column: Card ─────────────────────────────── */
.hero-card {
  background: var(--card-bg);
  border: 1px solid var(--card-border);
  border-radius: var(--radius-lg);
  padding: 28px;
  backdrop-filter: blur(18px);
  -webkit-backdrop-filter: blur(18px);
  display: flex;
  flex-direction: column;
  gap: 0;
}

.hero-card__award {
  display: flex;
  align-items: center;
  gap: 14px;
  padding-bottom: 22px;
}

.hero-card__award-icon {
  flex-shrink: 0;
  width: 52px;
  height: 52px;
  border-radius: 14px;
  background: linear-gradient(135deg, rgba(178,26,21,0.25) 0%, rgba(178,26,21,0.10) 100%);
  border: 1px solid rgba(178,26,21,0.35);
  color: var(--brand-light);
  display: flex;
  align-items: center;
  justify-content: center;
}

.hero-card__award-label {
  font-family: 'Barlow Condensed', 'Arial Narrow', sans-serif;
  font-size: 15px;
  font-weight: 700;
  color: var(--white);
  text-transform: uppercase;
  letter-spacing: 0.04em;
  margin: 0 0 2px;
}

.hero-card__award-year {
  font-family: 'Barlow', 'Arial', sans-serif;
  font-size: 11.5px;
  color: var(--text-muted);
  margin: 0;
  letter-spacing: 0.03em;
}

.hero-card__divider {
  height: 1px;
  background: var(--card-border);
  margin: 0 0 22px;
}

.hero-card__stats {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 4px;
  padding-bottom: 22px;
}

.hero-card__stat {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 3px;
}

.hero-card__stat-value {
  font-family: 'Barlow Condensed', 'Arial Narrow', sans-serif;
  font-size: 28px;
  font-weight: 800;
  color: var(--brand-light);
  letter-spacing: -0.01em;
  line-height: 1;
}

.hero-card__stat-label {
  font-family: 'Barlow', 'Arial', sans-serif;
  font-size: 10.5px;
  color: var(--text-muted);
  text-align: center;
  line-height: 1.3;
  letter-spacing: 0.01em;
}

.hero-card__surfaces-label {
  font-family: 'Barlow', 'Arial', sans-serif;
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: var(--text-muted);
  margin: 0 0 10px;
}

.hero-card__surfaces-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}

.tag {
  font-family: 'Barlow', 'Arial', sans-serif;
  font-size: 11.5px;
  color: rgba(255,255,255,0.75);
  background: rgba(255,255,255,0.07);
  border: 1px solid rgba(255,255,255,0.13);
  border-radius: 100px;
  padding: 3px 10px;
  white-space: nowrap;
  transition: background 0.2s, color 0.2s;
}

.tag:hover {
  background: var(--brand-dim);
  color: #fff;
  border-color: rgba(178,26,21,0.35);
}

/* ── Bottom Bar ─────────────────────────────────────── */
.hero-bar {
  position: relative;
  z-index: 1;
  background: var(--bar-bg);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  padding: 12px 24px;
  border-top: 1px solid rgba(255,255,255,0.08);
}

.hero-bar__inner {
  max-width: 1360px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  font-family: 'Barlow', 'Arial', sans-serif;
  font-size: 12.5px;
  font-weight: 600;
  letter-spacing: 0.04em;
  color: rgba(255,255,255,0.90);
  flex-wrap: wrap;
  text-transform: uppercase;
}

.hero-bar__sep {
  color: rgba(255,255,255,0.30);
}

/* ── Responsive ─────────────────────────────────────── */
@media (max-width: 1024px) {
  .hero-content {
    grid-template-columns: 1fr;
    padding: 48px 40px 44px;
    gap: 36px;
  }

  .hero-content__right {
    display: none;
  }

  .hero-headline__top,
  .hero-headline__bottom {
    font-size: clamp(46px, 8vw, 70px);
  }

  .hero-headline__accent {
    font-size: clamp(62px, 10.5vw, 92px);
  }
}

@media (max-width: 640px) {
  .hero-content {
    padding: 36px 24px 32px;
  }

  .hero-headline__top,
  .hero-headline__bottom {
    font-size: 44px;
  }

  .hero-headline__accent {
    font-size: 58px;
  }

  .hero-sub {
    font-size: 14.5px;
  }

  .hero-actions {
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
  }

  .btn-primary,
  .btn-ghost {
    width: 100%;
    justify-content: center;
  }

  .hero-bar__inner {
    gap: 8px;
    font-size: 11px;
  }
}
</style>
