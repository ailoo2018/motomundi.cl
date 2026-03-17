<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue'

useHead({
  title: 'Nueva Tienda Outlet — Arauco Premium Buenaventura | Motomundi',
  link: [
    {
      rel: 'stylesheet',
      href: 'https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@400;700;900&family=Barlow:wght@300;400;500;600&display=swap'
    }
  ]
})

// --- Countdown ---
const inaugDate = new Date('2026-03-18T10:00:00')
const now = ref(new Date())
let timer = null

const timeLeft = computed(() => {
  const diff = inaugDate - now.value
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 }
  return {
    days:    Math.floor(diff / 86400000),
    hours:   Math.floor((diff % 86400000) / 3600000),
    minutes: Math.floor((diff % 3600000)  / 60000),
    seconds: Math.floor((diff % 60000)    / 1000)
  }
})

const pad = n => String(n).padStart(2, '0')

// --- Slider ---
const slides = [

  {
    src: '/cms/outlet-2.jpeg',
    alt: ''
  },
  {
    src: '/cms/outlet-3.jpeg',
    alt: ''
  },
  {
    src: '/cms/outlet-4.jpeg',
    alt: ''
  },
  {
    src: '/cms/outlet-5.jpeg',
    alt: ''
  },
  {
    src: '/cms/outlet-6.jpeg',
    alt: ''
  },
  {
    src: '/cms/outlet-7.jpeg',
    alt: ''
  },
  {
    src: '/cms/outlet-8.jpeg',
    alt: ''
  }
]

const currentSlide = ref(0)
let slideTimer = null

const nextSlide = () => { currentSlide.value = (currentSlide.value + 1) % slides.length }
const prevSlide = () => { currentSlide.value = (currentSlide.value - 1 + slides.length) % slides.length }
const goToSlide = i => { currentSlide.value = i }

// --- Brands ---
const brands = [
  'Shoei','AGV','Arai','HJC','Alpinestars','Dainese','REV\'IT!','Spidi',
  'Klim','Rukka','Held','Sidi','TCX','Gaerne','Forma','Oxford'
]

onMounted(() => {
  timer = setInterval(() => { now.value = new Date() }, 1000)
  slideTimer = setInterval(nextSlide, 4500)
})
onUnmounted(() => {
  clearInterval(timer)
  clearInterval(slideTimer)
})
</script>

<template>
  <div class="outlet-page">

    <!-- ══════════════════════ HERO BAND ══════════════════════ -->
    <section class="hero-band">
      <div class="hero-band__noise"></div>
      <div class="hero-band__content">
        <div class="hero-band__eyebrow">
          <span class="pill">NUEVA APERTURA</span>
          <span class="pill pill--white">18 · 03 · 2026</span>
        </div>
        <h1 class="hero-band__title">
          <span class="hero-band__title-top">OUTLET</span>
          <span class="hero-band__title-brand">MOTOMUNDI</span>
        </h1>
        <p class="hero-band__sub">
          Arauco Premium Outlet <strong>Buenaventura</strong>
        </p>
        <div class="hero-band__discount">
          <span class="discount-badge">HASTA</span>
          <span class="discount-number">60%</span>
          <span class="discount-label">de descuento</span>
        </div>
      </div>
      <div class="hero-band__deco"></div>
    </section>

    <!-- ══════════════════════ COUNTDOWN ══════════════════════ -->
    <section class="countdown-section">
      <p class="countdown-section__label">INAUGURACIÓN EN</p>
      <div class="countdown-grid">
        <div class="countdown-item">
          <span class="countdown-num">{{ pad(timeLeft.days) }}</span>
          <span class="countdown-unit">días</span>
        </div>
        <span class="countdown-sep">:</span>
        <div class="countdown-item">
          <span class="countdown-num">{{ pad(timeLeft.hours) }}</span>
          <span class="countdown-unit">horas</span>
        </div>
        <span class="countdown-sep">:</span>
        <div class="countdown-item">
          <span class="countdown-num">{{ pad(timeLeft.minutes) }}</span>
          <span class="countdown-unit">min</span>
        </div>
        <span class="countdown-sep">:</span>
        <div class="countdown-item">
          <span class="countdown-num">{{ pad(timeLeft.seconds) }}</span>
          <span class="countdown-unit">seg</span>
        </div>
      </div>
    </section>

    <!-- ══════════════════════ SLIDER ══════════════════════ -->
    <section class="slider-section">
      <div class="slider">
        <div class="slider__track">
          <div
            v-for="(slide, i) in slides"
            :key="i"
            class="slider__slide"
            :class="{ 'slider__slide--active': i === currentSlide }"
          >
            <img :src="slide.src" :alt="slide.alt" class="slider__img" />
            <div class="slider__overlay"></div>
            <p class="slider__caption">{{ slide.alt }}</p>
          </div>
        </div>

        <button class="slider__btn slider__btn--prev" @click="prevSlide" aria-label="Anterior">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M15 18L9 12L15 6" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>
          </svg>
        </button>
        <button class="slider__btn slider__btn--next" @click="nextSlide" aria-label="Siguiente">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M9 18L15 12L9 6" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>
          </svg>
        </button>

        <div class="slider__dots">
          <button
            v-for="(_, i) in slides"
            :key="i"
            class="slider__dot"
            :class="{ 'slider__dot--active': i === currentSlide }"
            @click="goToSlide(i)"
            :aria-label="`Slide ${i + 1}`"
          />
        </div>
      </div>
    </section>

    <!-- ══════════════════════ HIGHLIGHTS ══════════════════════ -->
    <section class="highlights">
      <div class="highlights__inner">

        <div class="highlight-card highlight-card--red">
          <div class="highlight-card__icon">
            <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
              <path d="M20 4L34 12V28L20 36L6 28V12L20 4Z" stroke="currentColor" stroke-width="2"/>
              <path d="M20 10L28 15V25L20 30L12 25V15L20 10Z" fill="currentColor" opacity=".25"/>
              <path d="M14 20H26M20 14V26" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
            </svg>
          </div>
          <span class="highlight-card__num">60%</span>
          <span class="highlight-card__text">Descuentos<br>increíbles</span>
        </div>

        <div class="highlight-card">
          <div class="highlight-card__icon">
            <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
              <rect x="6" y="8" width="28" height="24" rx="2" stroke="currentColor" stroke-width="2"/>
              <path d="M13 8V6M27 8V6" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
              <path d="M6 16H34" stroke="currentColor" stroke-width="2"/>
              <circle cx="20" cy="25" r="4" fill="currentColor" opacity=".25"/>
              <path d="M18 25L19.5 26.5L22.5 23.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
            </svg>
          </div>
          <span class="highlight-card__num">18 MAR</span>
          <span class="highlight-card__text">Gran<br>Inauguración</span>
        </div>

        <div class="highlight-card">
          <div class="highlight-card__icon">
            <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
              <circle cx="20" cy="20" r="14" stroke="currentColor" stroke-width="2"/>
              <path d="M20 12V20L25 25" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
            </svg>
          </div>
          <span class="highlight-card__num">10–20h</span>
          <span class="highlight-card__text">Horario<br>de atención</span>
        </div>

        <div class="highlight-card">
          <div class="highlight-card__icon">
            <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
              <path d="M8 32L8 16L20 8L32 16V32H24V24H16V32H8Z" stroke="currentColor" stroke-width="2"/>
              <rect x="17" y="24" width="6" height="8" rx=".5" stroke="currentColor" stroke-width="1.5"/>
            </svg>
          </div>
          <span class="highlight-card__num">200 m²</span>
          <span class="highlight-card__text">Tienda<br>especializada</span>
        </div>

      </div>
    </section>

    <!-- ══════════════════════ SEGUNDA SELECCIÓN ══════════════════════ -->
    <section class="segunda-seleccion">
      <div class="segunda-seleccion__inner">
        <div class="segunda-seleccion__text">
          <span class="section-eyebrow">Exclusivo Outlet</span>
          <h2 class="segunda-seleccion__title">Segunda<br>Selección</h2>
          <p class="segunda-seleccion__body">
            Descubre nuestra sección de segunda selección con productos en perfectas condiciones a precios extraordinarios.
            Cascos, ropa de moto, guantes y accesorios con mínimas marcas de exhibición o embalaje abierto — sin compromiso en seguridad, con máximo ahorro.
          </p>
          <ul class="segunda-seleccion__list">
            <li>
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M3 9L7 13L15 5" stroke="#d6001c" stroke-width="2" stroke-linecap="round"/></svg>
              Productos inspeccionados y garantizados
            </li>
            <li>
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M3 9L7 13L15 5" stroke="#d6001c" stroke-width="2" stroke-linecap="round"/></svg>
              Precios únicos e irrepetibles
            </li>
            <li>
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M3 9L7 13L15 5" stroke="#d6001c" stroke-width="2" stroke-linecap="round"/></svg>
              Stock limitado — primero en llegar, primero en elegir
            </li>
          </ul>
        </div>
        <div class="segunda-seleccion__badge-wrap">
          <div class="ss-badge">
            <span class="ss-badge__top">2ª</span>
            <span class="ss-badge__mid">SELECCIÓN</span>
            <span class="ss-badge__bot">Precios<br>únicos</span>
          </div>
        </div>
      </div>
    </section>

    <!-- ══════════════════════ BRANDS ══════════════════════ -->
    <section class="brands-section">
      <span class="section-eyebrow section-eyebrow--center">Lo mejor de dos ruedas</span>
      <h2 class="brands-section__title">Todas Nuestras Marcas</h2>
      <div class="brands-marquee">
        <div class="brands-marquee__track">
          <span v-for="b in [...brands, ...brands]" :key="b + Math.random()" class="brands-marquee__item">
            {{ b }}
          </span>
        </div>
      </div>
      <p class="brands-section__note">Y muchas más en nuestra tienda de 200 m²</p>
    </section>

    <!-- ══════════════════════ HORARIO ══════════════════════ -->
    <section class="info-strip">
      <div class="info-strip__inner">
        <div class="info-strip__item">
          <svg class="info-strip__icon" width="32" height="32" viewBox="0 0 32 32" fill="none">
            <circle cx="16" cy="16" r="12" stroke="currentColor" stroke-width="2"/>
            <path d="M16 9V16L20 20" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
          </svg>
          <div>
            <strong>Horario</strong>
            <p>Lunes a domingo<br>10:00 – 20:00 hrs</p>
          </div>
        </div>
        <div class="info-strip__divider"></div>
        <div class="info-strip__item">
          <svg class="info-strip__icon" width="32" height="32" viewBox="0 0 32 32" fill="none">
            <path d="M16 4C11.582 4 8 7.582 8 12C8 18 16 28 16 28C16 28 24 18 24 12C24 7.582 20.418 4 16 4Z" stroke="currentColor" stroke-width="2"/>
            <circle cx="16" cy="12" r="3" stroke="currentColor" stroke-width="2"/>
          </svg>
          <div>
            <strong>Ubicación</strong>
            <p>Arauco Premium Outlet<br>Buenaventura</p>
          </div>
        </div>
        <div class="info-strip__divider"></div>
        <div class="info-strip__item">
          <svg class="info-strip__icon" width="32" height="32" viewBox="0 0 32 32" fill="none">
            <path d="M4 8C4 6.895 4.895 6 6 6H26C27.105 6 28 6.895 28 8V24C28 25.105 27.105 26 26 26H6C4.895 26 4 25.105 4 24V8Z" stroke="currentColor" stroke-width="2"/>
            <path d="M4 10L16 18L28 10" stroke="currentColor" stroke-width="2"/>
          </svg>
          <div>
            <strong>Contacto</strong>
            <p>+56 2 2666 0690<br>www.motomundi.cl</p>
          </div>
        </div>
      </div>
    </section>

    <!-- ══════════════════════ MAP ══════════════════════ -->
    <section class="map-section">
      <div class="map-section__inner">
        <div class="map-section__text">
          <span class="section-eyebrow">¿Cómo llegar?</span>
          <h2 class="map-section__title">Encuéntranos<br>en Buenaventura</h2>
          <p class="map-section__body">
            Estamos ubicados dentro de <strong>Arauco Premium Outlet Buenaventura</strong>.
            Fácil acceso en auto o transporte público.
          </p>
          <a
            href="https://maps.app.goo.gl/tZymjehVq5ZxsvXw8"
            target="_blank"
            rel="noopener noreferrer"
            class="btn-map"
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M10 2C7.238 2 5 4.238 5 7C5 11.5 10 18 10 18C10 18 15 11.5 15 7C15 4.238 12.762 2 10 2Z" stroke="currentColor" stroke-width="1.8"/>
              <circle cx="10" cy="7" r="2" stroke="currentColor" stroke-width="1.8"/>
            </svg>
            Ver en Google Maps
          </a>
        </div>
        <div class="map-section__embed">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3328.5!2d-70.58!3d-33.45!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzPCsDI3JzAwLjAiUyA3MMKwMzQnNDguMCJX!5e0!3m2!1ses!2scl!4v1"
            width="100%"
            height="100%"
            style="border:0;"
            allowfullscreen=""
            loading="lazy"
            referrerpolicy="no-referrer-when-downgrade"
            title="Arauco Premium Outlet Buenaventura"
          ></iframe>
        </div>
      </div>
    </section>

    <!-- ══════════════════════ CTA FINAL ══════════════════════ -->
    <section class="cta-final">
      <div class="cta-final__noise"></div>
      <div class="cta-final__inner">
        <p class="cta-final__eyebrow">TE ESPERAMOS EL</p>
        <h2 class="cta-final__date">18 · MARZO · 2026</h2>
        <p class="cta-final__sub">Arauco Premium Outlet Buenaventura · 10:00 hrs</p>
        <a href="https://www.motomundi.cl" class="cta-final__btn">
          Ver catálogo online
        </a>
      </div>
    </section>

  </div>
</template>

<style scoped>
/* ─── RESET & BASE ─────────────────────────────────────────────── */
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

.outlet-page {
  font-family: 'Barlow', sans-serif;
  background: #fff;
  color: #111;
  overflow-x: hidden;
}

/* ─── TOKENS ──────────────────────────────────────────────────── */
:root {
  --red: #d6001c;
  --red-dark: #a5001a;
  --black: #0d0d0d;
  --gray-100: #f5f5f5;
  --gray-200: #e8e8e8;
  --gray-500: #888;
}

/* ─── UTILS ───────────────────────────────────────────────────── */
.section-eyebrow {
  display: inline-block;
  font-family: 'Barlow Condensed', sans-serif;
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: #d6001c;
  margin-bottom: 0.75rem;
}
.section-eyebrow--center { display: block; text-align: center; }

/* ─── HERO BAND ────────────────────────────────────────────────── */
.hero-band {
  position: relative;
  background: #d6001c;
  padding: 4rem 2rem 3.5rem;
  overflow: hidden;
  text-align: center;
  min-height: 340px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.hero-band__noise {
  position: absolute; inset: 0;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='.06'/%3E%3C/svg%3E");
  pointer-events: none; opacity: 0.4;
}

.hero-band__deco {
  position: absolute; right: -60px; bottom: -80px;
  width: 400px; height: 400px;
  border-radius: 50%;
  border: 80px solid rgba(255,255,255,0.06);
  pointer-events: none;
}

.hero-band__eyebrow {
  display: flex; gap: 0.5rem; justify-content: center; margin-bottom: 1.25rem; flex-wrap: wrap;
}

.pill {
  font-family: 'Barlow Condensed', sans-serif;
  font-size: 0.7rem; font-weight: 700; letter-spacing: 0.18em;
  text-transform: uppercase; padding: 0.3rem 0.9rem; border-radius: 999px;
  background: rgba(255,255,255,0.15); color: #fff; border: 1px solid rgba(255,255,255,0.3);
}
.pill--white { background: #fff; color: #d6001c; border-color: #fff; }

.hero-band__title {
  display: flex; flex-direction: column; gap: 0; line-height: 1;
  font-family: 'Barlow Condensed', sans-serif;
}
.hero-band__title-top {
  font-size: clamp(4.5rem, 14vw, 9rem);
  font-weight: 900;
  color: #fff;
  text-transform: uppercase;
  letter-spacing: -0.02em;
  opacity: 0.2;
  line-height: 0.9;
}
.hero-band__title-brand {
  font-size: clamp(2.5rem, 8vw, 5.5rem);
  font-weight: 900;
  color: #fff;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  line-height: 1.1;
}
.hero-band__sub {
  margin-top: 1rem;
  font-size: 1rem; font-weight: 300; color: rgba(255,255,255,0.8);
  letter-spacing: 0.04em;
}
.hero-band__sub strong { font-weight: 600; color: #fff; }

.hero-band__discount {
  display: flex; align-items: center; gap: 0.5rem; justify-content: center;
  margin-top: 1.5rem;
}
.discount-badge {
  font-family: 'Barlow Condensed', sans-serif;
  font-size: 0.85rem; font-weight: 700; letter-spacing: 0.15em;
  color: rgba(255,255,255,0.75); text-transform: uppercase;
}
.discount-number {
  font-family: 'Barlow Condensed', sans-serif;
  font-size: clamp(3rem, 10vw, 6rem);
  font-weight: 900; color: #fff;
  line-height: 1;
  text-shadow: 0 4px 24px rgba(0,0,0,0.2);
}
.discount-label {
  font-family: 'Barlow Condensed', sans-serif;
  font-size: 0.85rem; font-weight: 700; letter-spacing: 0.12em;
  color: rgba(255,255,255,0.75); text-transform: uppercase;
  align-self: flex-end; padding-bottom: 0.6rem;
}

/* ─── COUNTDOWN ───────────────────────────────────────────────── */
.countdown-section {
  background: #0d0d0d;
  padding: 2rem 1rem;
  text-align: center;
}
.countdown-section__label {
  font-family: 'Barlow Condensed', sans-serif;
  font-size: 0.7rem; font-weight: 700; letter-spacing: 0.25em;
  text-transform: uppercase; color: #d6001c; margin-bottom: 1rem;
}
.countdown-grid {
  display: flex; align-items: center; justify-content: center; gap: 0.25rem; flex-wrap: wrap;
}
.countdown-item {
  display: flex; flex-direction: column; align-items: center;
  min-width: 70px;
}
.countdown-num {
  font-family: 'Barlow Condensed', sans-serif;
  font-size: clamp(2.5rem, 8vw, 4.5rem);
  font-weight: 900; color: #fff; line-height: 1;
  letter-spacing: -0.02em;
}
.countdown-unit {
  font-size: 0.65rem; font-weight: 500; letter-spacing: 0.15em;
  text-transform: uppercase; color: #888; margin-top: 0.2rem;
}
.countdown-sep {
  font-family: 'Barlow Condensed', sans-serif;
  font-size: 3rem; font-weight: 900; color: #d6001c;
  line-height: 1; align-self: flex-start; padding-top: 0.1rem;
}

/* ─── SLIDER ──────────────────────────────────────────────────── */
.slider-section {
  background: #0d0d0d;
  padding: 0 0 3rem;
}
.slider {
  position: relative; max-width: 1100px; margin: 0 auto;
  aspect-ratio: 16 / 7;
  overflow: hidden;
  border-radius: 0 0 4px 4px;
}
.slider__track { position: relative; width: 100%; height: 100%; }
.slider__slide {
  position: absolute; inset: 0;
  opacity: 0; transition: opacity 0.8s ease;
}
.slider__slide--active { opacity: 1; }
.slider__img { width: 100%; height: 100%; object-fit: cover; display: block; }
.slider__overlay {
  position: absolute; inset: 0;
  background: linear-gradient(to top, rgba(0,0,0,0.55) 0%, transparent 50%);
}
.slider__caption {
  position: absolute; bottom: 1.25rem; left: 1.5rem;
  font-size: 0.8rem; color: rgba(255,255,255,0.7);
  letter-spacing: 0.06em;
}
.slider__btn {
  position: absolute; top: 50%; transform: translateY(-50%);
  background: rgba(214,0,28,0.85); color: #fff; border: none; cursor: pointer;
  width: 44px; height: 44px; border-radius: 50%;
  display: flex; align-items: center; justify-content: center;
  transition: background 0.2s; z-index: 2;
}
.slider__btn:hover { background: #d6001c; }
.slider__btn--prev { left: 1rem; }
.slider__btn--next { right: 1rem; }
.slider__dots {
  position: absolute; bottom: 1.25rem; right: 1.5rem;
  display: flex; gap: 0.4rem; z-index: 2;
}
.slider__dot {
  width: 8px; height: 8px; border-radius: 50%;
  background: rgba(255,255,255,0.35); border: none; cursor: pointer;
  transition: background 0.2s, transform 0.2s;
}
.slider__dot--active {
  background: #d6001c; transform: scale(1.25);
}

/* ─── HIGHLIGHTS ──────────────────────────────────────────────── */
.highlights {
  padding: 3.5rem 1.5rem;
  background: #fff;
}
.highlights__inner {
  max-width: 1000px; margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(210px, 1fr));
  gap: 1.25rem;
}
.highlight-card {
  border: 2px solid #e8e8e8;
  border-radius: 8px;
  padding: 2rem 1.5rem;
  display: flex; flex-direction: column; gap: 0.5rem;
  transition: border-color 0.2s, transform 0.2s, box-shadow 0.2s;
  background: #fff;
}
.highlight-card:hover {
  border-color: #d6001c;
  transform: translateY(-4px);
  box-shadow: 0 12px 32px rgba(214,0,28,0.12);
}
.highlight-card--red {
  background: #d6001c; border-color: #d6001c; color: #fff;
}
.highlight-card__icon { color: #d6001c; margin-bottom: 0.25rem; }
.highlight-card--red .highlight-card__icon { color: rgba(255,255,255,0.7); }
.highlight-card__num {
  font-family: 'Barlow Condensed', sans-serif;
  font-size: 2.25rem; font-weight: 900; line-height: 1;
  color: #111;
}
.highlight-card--red .highlight-card__num { color: #fff; }
.highlight-card__text {
  font-size: 0.9rem; font-weight: 500; color: #555; line-height: 1.4;
}
.highlight-card--red .highlight-card__text { color: rgba(255,255,255,0.8); }

/* ─── SEGUNDA SELECCIÓN ───────────────────────────────────────── */
.segunda-seleccion {
  background: #f5f5f5;
  padding: 4rem 2rem;
}
.segunda-seleccion__inner {
  max-width: 1000px; margin: 0 auto;
  display: grid; grid-template-columns: 1fr auto; gap: 3rem; align-items: center;
}
.segunda-seleccion__title {
  font-family: 'Barlow Condensed', sans-serif;
  font-size: clamp(2.5rem, 6vw, 4rem);
  font-weight: 900; text-transform: uppercase;
  line-height: 0.95; margin-bottom: 1.25rem; color: #111;
}
.segunda-seleccion__body {
  font-size: 0.95rem; line-height: 1.7; color: #444; margin-bottom: 1.5rem;
}
.segunda-seleccion__list {
  list-style: none; display: flex; flex-direction: column; gap: 0.6rem;
}
.segunda-seleccion__list li {
  display: flex; align-items: center; gap: 0.6rem;
  font-size: 0.9rem; font-weight: 500; color: #333;
}
.ss-badge {
  width: 160px; height: 160px; border-radius: 50%;
  background: #d6001c; color: #fff;
  display: flex; flex-direction: column; align-items: center; justify-content: center;
  text-align: center; gap: 0.1rem;
  box-shadow: 0 8px 32px rgba(214,0,28,0.3);
  flex-shrink: 0;
}
.ss-badge__top {
  font-family: 'Barlow Condensed', sans-serif;
  font-size: 3.5rem; font-weight: 900; line-height: 1;
}
.ss-badge__mid {
  font-family: 'Barlow Condensed', sans-serif;
  font-size: 0.75rem; font-weight: 700; letter-spacing: 0.2em;
  text-transform: uppercase; opacity: 0.8;
}
.ss-badge__bot {
  font-size: 0.7rem; font-weight: 400; opacity: 0.7; margin-top: 0.2rem; line-height: 1.3;
}

/* ─── BRANDS MARQUEE ──────────────────────────────────────────── */
.brands-section {
  padding: 3.5rem 1.5rem 2.5rem;
  background: #fff;
  overflow: hidden;
}
.brands-section__title {
  font-family: 'Barlow Condensed', sans-serif;
  font-size: clamp(2rem, 5vw, 3.5rem);
  font-weight: 900; text-transform: uppercase;
  text-align: center; margin-bottom: 2.5rem; color: #111;
}
.brands-marquee {
  overflow: hidden;
  border-top: 2px solid #e8e8e8;
  border-bottom: 2px solid #e8e8e8;
  padding: 1rem 0;
}
.brands-marquee__track {
  display: flex; gap: 0;
  animation: marquee 22s linear infinite;
  white-space: nowrap;
}
.brands-marquee__item {
  font-family: 'Barlow Condensed', sans-serif;
  font-size: 1.1rem; font-weight: 700; letter-spacing: 0.15em;
  text-transform: uppercase; color: #ccc;
  padding: 0 2.5rem;
  transition: color 0.2s;
}
.brands-marquee__item:hover { color: #d6001c; }

@keyframes marquee {
  from { transform: translateX(0); }
  to   { transform: translateX(-50%); }
}

.brands-section__note {
  text-align: center; margin-top: 1.5rem;
  font-size: 0.85rem; color: #888; letter-spacing: 0.04em;
}

/* ─── INFO STRIP ──────────────────────────────────────────────── */
.info-strip {
  background: #0d0d0d;
  padding: 2.5rem 2rem;
}
.info-strip__inner {
  max-width: 900px; margin: 0 auto;
  display: flex; align-items: center; justify-content: center;
  gap: 2rem; flex-wrap: wrap;
}
.info-strip__item {
  display: flex; align-items: flex-start; gap: 1rem;
  color: #fff; flex: 1; min-width: 200px;
}
.info-strip__icon { color: #d6001c; flex-shrink: 0; margin-top: 0.2rem; }
.info-strip__item strong {
  display: block; font-family: 'Barlow Condensed', sans-serif;
  font-size: 1rem; font-weight: 700; letter-spacing: 0.08em;
  text-transform: uppercase; margin-bottom: 0.2rem;
}
.info-strip__item p { font-size: 0.85rem; color: #aaa; line-height: 1.55; }
.info-strip__divider {
  width: 1px; height: 60px; background: rgba(255,255,255,0.1); flex-shrink: 0;
}

/* ─── MAP ─────────────────────────────────────────────────────── */
.map-section { padding: 4rem 2rem; background: #fff; }
.map-section__inner {
  max-width: 1000px; margin: 0 auto;
  display: grid; grid-template-columns: 1fr 1fr; gap: 3rem; align-items: start;
}
.map-section__title {
  font-family: 'Barlow Condensed', sans-serif;
  font-size: clamp(2rem, 5vw, 3.2rem);
  font-weight: 900; text-transform: uppercase;
  line-height: 0.95; margin-bottom: 1rem; color: #111;
}
.map-section__body {
  font-size: 0.95rem; line-height: 1.7; color: #555; margin-bottom: 1.75rem;
}
.btn-map {
  display: inline-flex; align-items: center; gap: 0.6rem;
  background: #d6001c; color: #fff; text-decoration: none;
  font-family: 'Barlow Condensed', sans-serif;
  font-size: 0.9rem; font-weight: 700; letter-spacing: 0.1em;
  text-transform: uppercase; padding: 0.85rem 1.75rem;
  border-radius: 4px; transition: background 0.2s, transform 0.15s;
}
.btn-map:hover { background: #a5001a; transform: translateY(-2px); }
.map-section__embed {
  height: 340px; border-radius: 8px; overflow: hidden;
  box-shadow: 0 8px 32px rgba(0,0,0,0.12);
  border: 2px solid #e8e8e8;
}

/* ─── CTA FINAL ───────────────────────────────────────────────── */
.cta-final {
  position: relative;
  background: #d6001c;
  padding: 4.5rem 2rem;
  text-align: center; overflow: hidden;
}
.cta-final__noise {
  position: absolute; inset: 0;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='.07'/%3E%3C/svg%3E");
  pointer-events: none; opacity: 0.5;
}
.cta-final__inner { position: relative; z-index: 1; }
.cta-final__eyebrow {
  font-family: 'Barlow Condensed', sans-serif;
  font-size: 0.7rem; font-weight: 700; letter-spacing: 0.25em;
  text-transform: uppercase; color: rgba(255,255,255,0.6); margin-bottom: 0.5rem;
  display: block;
}
.cta-final__date {
  font-family: 'Barlow Condensed', sans-serif;
  font-size: clamp(2.5rem, 8vw, 6rem);
  font-weight: 900; color: #fff; text-transform: uppercase;
  letter-spacing: 0.04em; line-height: 1;
}
.cta-final__sub {
  margin-top: 0.75rem;
  font-size: 1rem; color: rgba(255,255,255,0.7);
  font-weight: 300; letter-spacing: 0.04em;
}
.cta-final__btn {
  display: inline-block; margin-top: 2rem;
  background: #fff; color: #d6001c; text-decoration: none;
  font-family: 'Barlow Condensed', sans-serif;
  font-size: 1rem; font-weight: 700; letter-spacing: 0.12em;
  text-transform: uppercase; padding: 1rem 2.5rem;
  border-radius: 4px; transition: background 0.2s, color 0.2s, transform 0.15s;
}
.cta-final__btn:hover {
  background: #111; color: #fff; transform: translateY(-2px);
}

/* ─── RESPONSIVE ──────────────────────────────────────────────── */
@media (max-width: 768px) {
  .segunda-seleccion__inner {
    grid-template-columns: 1fr;
    text-align: center;
  }
  .segunda-seleccion__list { align-items: center; }
  .ss-badge-wrap { display: flex; justify-content: center; }
  .map-section__inner { grid-template-columns: 1fr; }
  .map-section__embed { height: 260px; }
  .slider { aspect-ratio: 4 / 3; }
  .info-strip__divider { display: none; }
  .slider__btn { width: 36px; height: 36px; }
}
</style>
