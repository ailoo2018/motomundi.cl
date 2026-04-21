<template>
  <section class="hero">
    <!-- Background image slot — replace src with your actual image -->
    <div class="hero__bg">
      <img
        src="/cms/home/cronicas-bg.jpg"
        alt="Crónicas a Dos Ruedas background"
        class="hero__bg-img"
      >
      <div class="hero__overlay" />
    </div>

    <div class="hero__content">
      <!-- Top label -->
      <p
        class="hero__label mt-4"
        data-animate="fade-up"
        style="--delay: 0ms"
      >
        <span class="hero__label-dot" />
        Motomundi presenta
      </p>

      <!-- Event title -->
      <h1
        class="hero__title"
        data-animate="fade-up"
        style="--delay: 80ms"
      >
        Crónicas<br>
        <em>a DOS Ruedas</em>
      </h1>

      <!-- Slogan -->
      <p
        class="hero__slogan"
        data-animate="fade-up"
        style="--delay: 160ms"
      >
        Aprende junto a los mejores influencers de motos
      </p>

      <!-- Divider -->
      <div
        class="hero__divider"
        data-animate="expand"
        style="--delay: 240ms"
      />

      <!-- Event meta row -->
      <div
        class="hero__meta"
        data-animate="fade-up"
        style="--delay: 300ms"
      >
        <div class="hero__meta-item">
          <svg
            class="hero__meta-icon"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="1.8"
          >
            <rect
              x="3"
              y="4"
              width="18"
              height="18"
              rx="2"
            />
            <line
              x1="16"
              y1="2"
              x2="16"
              y2="6"
            />
            <line
              x1="8"
              y1="2"
              x2="8"
              y2="6"
            />
            <line
              x1="3"
              y1="10"
              x2="21"
              y2="10"
            />
          </svg>
          <div>
            <span class="hero__meta-label">Fecha</span>
            <span class="hero__meta-value">Jueves 23 de Abril</span>
          </div>
        </div>

        <div class="hero__meta-sep" />

        <div class="hero__meta-item">
          <svg
            class="hero__meta-icon"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="1.8"
          >
            <circle
              cx="12"
              cy="12"
              r="9"
            />
            <polyline points="12 7 12 12 15.5 14" />
          </svg>
          <div>
            <span class="hero__meta-label">Horario</span>
            <span class="hero__meta-value">18:30 – 21:00 hrs</span>
          </div>
        </div>

        <div class="hero__meta-sep" />

        <div class="hero__meta-item">
          <svg
            class="hero__meta-icon"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="1.8"
          >
            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
            <circle
              cx="12"
              cy="9"
              r="2.5"
            />
          </svg>
          <div>
            <span class="hero__meta-label">Lugar</span>
            <span class="hero__meta-value">Las Tranqueras 56, Las Condes</span>
          </div>
        </div>
      </div>

      <!-- Participants -->
      <div
        class="hero__participants"
        data-animate="fade-up"
        style="--delay: 400ms"
      >
        <p class="hero__participants-title">
          Con la participación de
        </p>
        <ul class="hero__speakers ">
          <li class="hero__speaker  hero__speaker--host">
            <a
              href="https://www.instagram.com/mototrainer.jorge.villegas/"
              target="_blank" rel="noopener noreferrer"
            >
              <div class="hero__speaker-avatar ">

                <img

                  src="/cms/home/jorge-villegas.png"
                  alt="Jorge Villegas"
                  class="hero__speaker-avatar-img"
                >

              </div>
            </a>
            <a
              href="https://www.instagram.com/mototrainer.jorge.villegas/"
              target="_blank" rel="noopener noreferrer"
            >
              <span class="hero__speaker-name"><em style="color: #F4A61B;">Animador</em> <br> Jorge Villegas</span>
            </a>
          </li>
          <li
            v-for="(speaker, i) in speakers"
            :key="speaker.name"
            class="hero__speaker"
            :style="`--i: ${i}`"
          >
            <a
              :href="speaker.link"
              target="_blank"
            >
              <div class="hero__speaker-avatar ">

                <img
                  v-if="speaker.image"
                  :src="speaker.image"
                  :alt="speaker.name"
                  class="hero__speaker-avatar-img"
                  @error="e => e.target.style.display = 'none'"
                >


              </div>
            </a>
            <a
              :href="speaker.link"
              target="_blank" rel="noopener noreferrer"
            >
              <span class="hero__speaker-name">{{ speaker.name }}</span>
            </a>
          </li>

        </ul>
      </div>

      <!-- CTA -->
      <div
        data-animate="fade-up"
        style="--delay: 500ms"
      >
        <a
          href="https://lp.constantcontactpages.com/ev/reg/5vsk5jy"
          target="_blank"
          class="hero__cta"
        >
          Reserva tu lugar
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2.2"
          >
            <line
              x1="5"
              y1="12"
              x2="19"
              y2="12"
            />
            <polyline points="13 6 19 12 13 18" />
          </svg>
        </a>
      </div>
    </div>
  </section>
</template>

<script setup>
const speakers = [
  {
    name: 'Javier Valenzuela',
    initials: 'JV',
    image: '/cms/home/javier-valenzuela.png',
    link: 'https://www.instagram.com/idayvueltaenmoto/',
  },
  {
    name: 'Anonimoto',
    initials: 'AN',
    image: '/cms/home/anonimoto.jpg',
    link: 'https://www.instagram.com/anonimotojorge/',
  },
  {
    name: 'Ayleen Martínez',
    initials: 'AM',
    image: '/cms/home/ayleen.png',
    link: 'https://www.instagram.com/ayleen_al_limite/',
  },
  { name: 'Nivem',
    initials: 'NV',
    image: '/cms/home/nivem.png',
    link: 'https://www.instagram.com/nicolas_nivem/' },
]
</script>

<style>
:root {
  --amber: #F4A61B;
  --amber-d: #C47E00;
  --smoke: rgba(255, 255, 255, 0.08);
  --border: rgba(255, 255, 255, 0.12);
}
</style>

<style scoped>
/* ── Hero shell ─────────────────────────────────── */
.hero {
  position: relative;
  min-height: 100svh;
  display: flex;
  align-items: flex-end;
  padding-bottom: clamp(3rem, 8vh, 6rem);
  overflow: hidden;
  color: #fff;
}

/* ── Background ─────────────────────────────────── */
.hero__bg {
  position: absolute;
  inset: 0;
  z-index: 0;
}

.hero__bg-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center 30%;
  transform: scale(1.04);
  animation: slowZoom 18s ease-out forwards;
}

@keyframes slowZoom {
  to {
    transform: scale(1);
  }
}

.hero__overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(to right, rgba(0, 0, 0, 0.82) 0%, rgba(0, 0, 0, 0.42) 60%, rgba(0, 0, 0, 0.1) 100%),
  linear-gradient(to top, rgba(0, 0, 0, 0.90) 0%, transparent 55%);
}

/* ── Content container ──────────────────────────── */
.hero__content {
  position: relative;
  z-index: 1;
  max-width: 760px;
  padding-inline: clamp(1.5rem, 6vw, 5rem);
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

/* ── Entrance animations ────────────────────────── */
[data-animate="fade-up"] {
  opacity: 0;
  transform: translateY(24px);
  animation: fadeUp 0.7s cubic-bezier(0.22, 1, 0.36, 1) forwards;
  animation-delay: var(--delay, 0ms);
}

[data-animate="expand"] {
  width: 0;
  animation: expand 0.6s cubic-bezier(0.22, 1, 0.36, 1) forwards;
  animation-delay: var(--delay, 0ms);
}

@keyframes fadeUp {
  to {
    opacity: 1;
    transform: none;
  }
}

@keyframes expand {
  to {
    width: 80px;
  }
}

/* ── Label ──────────────────────────────────────── */
.hero__label {
  display: flex;
  align-items: center;
  gap: 0.55rem;
  font-size: 0.78rem;
  font-weight: 600;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: var(--amber);
  margin: 0;
}

.hero__label-dot {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: var(--amber);
  box-shadow: 0 0 8px var(--amber);
  animation: pulse 2s ease-in-out infinite;
}

@keyframes pulse {
  0%, 100% {
    opacity: 1;
    box-shadow: 0 0 8px var(--amber);
  }
  50% {
    opacity: 0.5;
    box-shadow: 0 0 3px var(--amber);
  }
}

/* ── Title ──────────────────────────────────────── */
.hero__title {
  font-size: 5rem;
  line-height: 0.92;
  letter-spacing: 0.01em;
  margin: 0;
  text-transform: uppercase;
  color: #fff;
}

.hero__title em {
  font-style: normal;
  color: var(--amber);
  display: block;
}

/* ── Slogan ─────────────────────────────────────── */
.hero__slogan {
  font-size: clamp(1rem, 2vw, 1.2rem);
  font-weight: 300;
  letter-spacing: 0.02em;
  color: rgba(255, 255, 255, 0.78);
  max-width: 42ch;
  margin: 0;
  line-height: 1.5;
}

/* ── Divider ─────────────────────────────────────── */
.hero__divider {
  height: 2px;
  background: linear-gradient(to right, var(--amber), transparent);
  border-radius: 2px;
}

/* ── Meta row ───────────────────────────────────── */
.hero__meta {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem 0;
  align-items: stretch;
}

.hero__meta-item {
  display: flex;
  align-items: center;
  gap: 0.7rem;
  padding-inline: 1.1rem;
  background: var(--smoke);
  border: 1px solid var(--border);
  border-radius: 8px;
  backdrop-filter: blur(8px);
  padding-block: 0.65rem;
  flex: 1 1 auto;
  min-width: 160px;
}

.hero__meta-item:first-child {
  padding-left: 0.9rem;
}

.hero__meta-icon {
  width: 18px;
  height: 18px;
  color: var(--amber);
  flex-shrink: 0;
}

.hero__meta-item div {
  display: flex;
  flex-direction: column;
  gap: 0.1rem;
}

.hero__meta-label {
  font-size: 0.65rem;
  font-weight: 600;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: var(--amber);
}

.hero__meta-value {
  font-size: 0.85rem;
  font-weight: 500;
  color: rgba(255, 255, 255, 0.9);
  white-space: nowrap;
}

.hero__meta-sep {
  width: 1px;
  align-self: stretch;
  background: var(--border);
}

/* ── Participants ────────────────────────────────── */
/* ── Participants ────────────────────────────────── */
.hero__participants {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.hero__participants-title {
  font-size: 0.72rem;
  font-weight: 600;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.45);
  margin: 0;
}

.hero__speakers {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(5, auto); /* 4 in a row on desktop */
  justify-content: start;
  gap: 1rem;
}


/* ── Each speaker card ───────────────────────────── */
.hero__speaker {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.55rem;
  opacity: 0;
  animation: fadeUp 0.5s cubic-bezier(0.22, 1, 0.36, 1) forwards;
  animation-delay: calc(420ms + 1 * 70ms);
  cursor: default;
}

/* ── Avatar ring + image ─────────────────────────── */
.hero__speaker-avatar {
  width: 122px;
  height: 122px;
  border-radius: 50%;
  background: linear-gradient(135deg, var(--amber-d), var(--amber));
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  overflow: hidden;
  position: relative;
  outline: 2px solid transparent;
  outline-offset: 3px;
  transition: outline-color 0.2s;
}

.hero__speaker:hover .hero__speaker-avatar {
  outline-color: var(--amber);
}

.hero__speaker-avatar-img {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 50%;
  border: 2px solid var(--amber);
}

.hero__speaker-avatar-fallback {
  font-size: 1.1rem;
  font-weight: 700;
  letter-spacing: 0.03em;
  color: #000;
  z-index: 1;
}

/* ── Name below avatar ───────────────────────────── */
.hero__speaker-name {
  font-size: 0.75rem;
  font-weight: 500;
  color: rgba(255, 255, 255, 0.80);
  text-align: center;
  max-width: 100%;
  height: 20px;
  line-height: 1.3;
}

@media (max-width: 900px) {
  .hero__title {
    font-size: 32px;
    font-weight: 600;
  }

  .hero__speakers {
    grid-template-columns: repeat(2, 1fr); /* exactly 2 per row on mobile */
    width: 100%;
  }

  .hero__speaker {
    align-items: center;
  }

  .hero__speaker-name {
    max-width: none; /* let name use full column width */
    text-align: center;
  }
}
/* ── CTA button ─────────────────────────────────── */
.hero__cta {
  display: inline-flex;
  align-items: center;
  gap: 0.6rem;
  padding: 0.85rem 2rem;
  background: var(--amber);
  color: #000;
  font-size: 0.9rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  text-decoration: none;
  border-radius: 4px;
  transition: background 0.2s, transform 0.15s, box-shadow 0.2s;
  box-shadow: 0 4px 24px rgba(244, 166, 27, 0.35);
}

.hero__cta svg {
  width: 17px;
  height: 17px;
  transition: transform 0.2s;
}

.hero__cta:hover {
  background: #FFB93A;
  transform: translateY(-2px);
  box-shadow: 0 8px 32px rgba(244, 166, 27, 0.50);
}

.hero__cta:hover svg {
  transform: translateX(4px);
}

.hero__cta:active {
  transform: translateY(0);
}

/* ── Responsive ─────────────────────────────────── */
@media (max-width: 640px) {
  .hero {
    align-items: flex-end;
    padding-bottom: 2.5rem;
  }

  .hero__meta {
    flex-direction: column;
  }

  .hero__meta-sep {
    display: none;
  }

  .hero__meta-item {
    min-width: unset;
  }
}

/********** host ************/

/* ── Animador / Host ─────────────────────────────── */
.hero__speaker--host .hero__speaker-avatar {
  width: 140px;
  height: 140px;
  outline: 2px solid var(--amber);        /* siempre visible */
  box-shadow: 0 0 20px rgba(244, 166, 27, 0.35);
}

.hero__speaker--host .hero__speaker-avatar::after {
  content: "Animador";
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  background: var(--amber);
  color: #000;
  font-size: 0.58rem;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  padding: 2px 8px;
  border-radius: 0 0 50px 50px;
  white-space: nowrap;
}

.hero__speaker--host .hero__speaker-name {
  color: #fff;
  font-weight: 700;
}

/* móvil */
@media (max-width: 900px) {
  .hero__speaker--host .hero__speaker-avatar {
    width: 122px;
    height: 122px;
  }
}
</style>
