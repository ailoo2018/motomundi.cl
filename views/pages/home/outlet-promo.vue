<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

// Subtle parallax on scroll
const parallaxY = ref(0)
let ticking = false

const onScroll = () => {
  if (!ticking) {
    requestAnimationFrame(() => {
      const el = document.getElementById('outlet-promo-section')
      if (el) {
        const rect = el.getBoundingClientRect()
        const progress = -rect.top * 0.25
        parallaxY.value = progress
      }
      ticking = false
    })
    ticking = true
  }
}

onMounted(() => window.addEventListener('scroll', onScroll, { passive: true }))
onUnmounted(() => window.removeEventListener('scroll', onScroll))
</script>

<template>
  <section id="outlet-promo-section" class="outlet-promo">

    <!-- Background image with parallax -->
    <div
      class="outlet-promo__bg"
      :style="{ transform: `translateY(${parallaxY}px)` }"
    ></div>

    <!-- Dark gradient overlay -->
    <div class="outlet-promo__overlay"></div>

    <!-- Red accent bar top -->
    <div class="outlet-promo__accent-bar"></div>

    <div class="outlet-promo__inner">

      <!-- Left: all the copy -->
      <div class="outlet-promo__content">

        <!-- "First ever" milestone ribbon -->
        <div class="outlet-promo__milestone">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <path d="M8 1L10 6H15L11 9.5L12.5 14.5L8 11.5L3.5 14.5L5 9.5L1 6H6L8 1Z" fill="#d6001c"/>
          </svg>
          <span>El primer outlet de Motomundi de nuestra historia</span>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <path d="M8 1L10 6H15L11 9.5L12.5 14.5L8 11.5L3.5 14.5L5 9.5L1 6H6L8 1Z" fill="#d6001c"/>
          </svg>
        </div>

        <div class="outlet-promo__eyebrow">
          <span class="tag tag--red">NUEVA APERTURA</span>
          <span class="tag">18 · MARZO · 2026</span>
        </div>

        <h2 class="outlet-promo__heading">
          Por primera vez,<br>
          <em>Tienda Outlet Motomundi.</em><br>
          <span class="outlet-promo__heading-brand">Las marcas que amas.<br>A precios que no creerás.</span>
        </h2>


        <div class="outlet-promo__stats">
          <div class="stat">
            <span class="stat__num">60%</span>
            <span class="stat__label">Dcto. máximo</span>
          </div>
          <div class="stat__divider"></div>
          <div class="stat">
            <span class="stat__num">200</span>
            <span class="stat__label">m² de producto</span>
          </div>
          <div class="stat__divider"></div>
          <div class="stat">
            <span class="stat__num">10–20h</span>
            <span class="stat__label">Todos los días</span>
          </div>
        </div>

        <NuxtLink to="/cms/nuevo-outlet-buenaventura" class="outlet-promo__cta">
          <span class="outlet-promo__cta-text">Descubre la tienda</span>
          <span class="outlet-promo__cta-arrow">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M4 10H16M11 5L16 10L11 15" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </span>
        </NuxtLink>

        <p class="outlet-promo__footnote">
          Arauco Premium Outlet Buenaventura &mdash; desde el 18 de marzo
        </p>
      </div>

      <!-- Right: floating badge -->
      <div class="outlet-promo__badge-wrap" aria-hidden="true">
        <div class="outlet-promo__badge">
          <span class="badge__up-to">hasta</span>
          <span class="badge__pct">60%</span>
          <span class="badge__off">descuento</span>
          <span class="badge__sub">en toda la tienda</span>
        </div>
        <div class="outlet-promo__badge-ring"></div>
      </div>

    </div>

    <!-- Red accent bar bottom -->
    <div class="outlet-promo__accent-bar outlet-promo__accent-bar--bottom"></div>

  </section>
</template>

<style scoped>
/* ── TOKENS ────────────────────────────────────────────────────── */
:root {
  --red: #d6001c;
  --red-dark: #a5001a;
}

/* ── MILESTONE RIBBON ──────────────────────────────────────────── */
.outlet-promo__milestone {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: rgba(214, 0, 28, 0.12);
  border: 1px solid rgba(214, 0, 28, 0.35);
  border-radius: 4px;
  padding: 0.45rem 1rem;
  margin-bottom: 1.25rem;
  font-family: 'Barlow Condensed', sans-serif;
  font-size: 0.78rem;
  font-weight: 700;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: #fff;
  backdrop-filter: blur(4px);
}

/* ── SECTION ───────────────────────────────────────────────────── */
.outlet-promo {
  position: relative;
  min-height: 600px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  font-family: 'Barlow', 'Barlow Condensed', sans-serif;
}

/* ── BACKGROUND ────────────────────────────────────────────────── */
.outlet-promo__bg {
  position: absolute;
  inset: -80px 0;          /* extra height for parallax travel */
  background-image: url('/cms/outlet-6.jpeg');
  background-size: cover;
  background-position: center;
  will-change: transform;
  transition: transform 0.05s linear;
}


/* ── OVERLAY ───────────────────────────────────────────────────── */
.outlet-promo__overlay {
  position: absolute; inset: 0;
  background: linear-gradient(
    105deg,
    rgba(10, 10, 10, 0.88) 0%,
    rgba(10, 10, 10, 0.72) 55%,
    rgba(10, 10, 10, 0.35) 100%
  );
  z-index: 1;
}

/* ── ACCENT BARS ───────────────────────────────────────────────── */
.outlet-promo__accent-bar {
  position: absolute; top: 0; left: 0; right: 0;
  height: 4px;
  background: #d6001c;
  z-index: 3;
}
.outlet-promo__accent-bar--bottom {
  top: auto; bottom: 0;
  height: 2px;
  background: rgba(214, 0, 28, 0.4);
}

/* ── INNER LAYOUT ──────────────────────────────────────────────── */
.outlet-promo__inner {
  position: relative; z-index: 2;
  max-width: 1100px;
  margin: 0 auto;
  padding: 4.5rem 2rem;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 3rem;
  flex: 1;
}

/* ── CONTENT ───────────────────────────────────────────────────── */
.outlet-promo__content {
  max-width: 620px;
}

/* Eyebrow tags */
.outlet-promo__eyebrow {
  display: flex; gap: 0.5rem; flex-wrap: wrap;
  margin-bottom: 1.5rem;
}
.tag {
  font-family: 'Barlow Condensed', sans-serif;
  font-size: 0.68rem; font-weight: 700; letter-spacing: 0.2em;
  text-transform: uppercase; padding: 0.3rem 0.9rem;
  border-radius: 999px;
  background: rgba(255,255,255,0.1);
  color: rgba(255,255,255,0.75);
  border: 1px solid rgba(255,255,255,0.2);
  backdrop-filter: blur(4px);
}
.tag--red {
  background: #d6001c;
  color: #fff;
  border-color: #d6001c;
  animation: pulse-tag 2.5s ease-in-out infinite;
}
@keyframes pulse-tag {
  0%, 100% { box-shadow: 0 0 0 0 rgba(214,0,28,0.5); }
  50%       { box-shadow: 0 0 0 8px rgba(214,0,28,0); }
}

/* Heading */
.outlet-promo__heading {

  font-size: 58px;
  font-weight: 900;
  line-height: 1.0;
  color: #fff;
  text-transform: uppercase;
  letter-spacing: -0.01em;
  margin-bottom: 1.5rem;
}
.outlet-promo__heading em {
  font-style: normal;
  color: #d6001c;
}
.outlet-promo__heading-brand {
  font-size: 0.62em;
  color: rgba(255,255,255,0.6);
  display: block;
  margin-top: 0.2rem;
}

/* Body copy */
.outlet-promo__body {
  font-size: 1rem;
  line-height: 1.75;
  color: rgba(255,255,255,0.65);
  margin-bottom: 2rem;
  max-width: 520px;
}
.outlet-promo__body strong {
  color: #fff;
  font-weight: 600;
}

/* Stats row */
.outlet-promo__stats {
  display: flex;
  align-items: center;
  gap: 1.25rem;
  margin-bottom: 2.25rem;
}
.stat {
  display: flex; flex-direction: column; gap: 0.1rem;
}
.stat__num {
  font-family: 'Barlow Condensed', sans-serif;
  font-size: 1.75rem;
  font-weight: 900;
  color: #fff;
  line-height: 1;
}
.stat__label {
  font-size: 0.7rem;
  font-weight: 500;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: rgba(255,255,255,0.45);
}
.stat__divider {
  width: 1px; height: 36px;
  background: rgba(255,255,255,0.15);
}

/* CTA Button */
.outlet-promo__cta {
  display: inline-flex;
  align-items: center;
  gap: 0;
  text-decoration: none;
  overflow: hidden;
  border-radius: 4px;
}
.outlet-promo__cta-text {
  font-family: 'Barlow Condensed', sans-serif;
  font-size: 0.95rem;
  font-weight: 700;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: #fff;
  background: #d6001c;
  padding: 0.9rem 1.75rem;
  transition: background 0.2s;
}
.outlet-promo__cta-arrow {
  display: flex;
  align-items: center;
  justify-content: center;
  background: #a5001a;
  color: #fff;
  padding: 0.9rem 1rem;
  transition: background 0.2s, transform 0.2s;
}
.outlet-promo__cta:hover .outlet-promo__cta-text { background: #b5001a; }
.outlet-promo__cta:hover .outlet-promo__cta-arrow {
  background: #d6001c;
  transform: translateX(3px);
}

/* Footnote */
.outlet-promo__footnote {
  margin-top: 1rem;
  font-size: 0.75rem;
  color: rgba(255,255,255,0.35);
  letter-spacing: 0.06em;
}

/* ── FLOATING BADGE ─────────────────────────────────────────────── */
.outlet-promo__badge-wrap {
  position: relative;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}
.outlet-promo__badge {
  width: 190px; height: 190px;
  border-radius: 50%;
  background: #d6001c;
  display: flex; flex-direction: column;
  align-items: center; justify-content: center;
  text-align: center;
  gap: 0;
  box-shadow: 0 0 0 12px rgba(214,0,28,0.18), 0 0 0 24px rgba(214,0,28,0.07);
  animation: badge-float 4s ease-in-out infinite;
  position: relative; z-index: 1;
}
@keyframes badge-float {
  0%, 100% { transform: translateY(0); }
  50%       { transform: translateY(-10px); }
}
.badge__up-to {
  font-family: 'Barlow Condensed', sans-serif;
  font-size: 0.7rem; font-weight: 700; letter-spacing: 0.2em;
  text-transform: uppercase; color: rgba(255,255,255,0.65);
}
.badge__pct {
  font-family: 'Barlow Condensed', sans-serif;
  font-size: 4.5rem; font-weight: 900; color: #fff;
  line-height: 1; letter-spacing: -0.04em;
}
.badge__off {
  font-family: 'Barlow Condensed', sans-serif;
  font-size: 1rem; font-weight: 700; letter-spacing: 0.12em;
  text-transform: uppercase; color: #fff;
  margin-top: -4px;
}
.badge__sub {
  font-size: 0.65rem; color: rgba(255,255,255,0.55);
  letter-spacing: 0.08em; margin-top: 4px;
}
.outlet-promo__badge-ring {
  position: absolute;
  width: 230px; height: 230px;
  border-radius: 50%;
  border: 1.5px dashed rgba(214,0,28,0.3);
  animation: spin-ring 18s linear infinite;
}
@keyframes spin-ring {
  from { transform: rotate(0deg); }
  to   { transform: rotate(360deg); }
}

/* ── RESPONSIVE ─────────────────────────────────────────────────── */
@media (max-width: 820px) {
  .outlet-promo__badge-wrap { display: none; }
  .outlet-promo__heading { font-size: clamp(2rem, 8vw, 3rem); }
  .outlet-promo__inner { padding: 3.5rem 1.25rem; }
}

@media (max-width: 480px) {
  .outlet-promo__stats { gap: 0.75rem; }
  .stat__num { font-size: 1.4rem; }
  .outlet-promo__body { font-size: 0.9rem; }
}
</style>
