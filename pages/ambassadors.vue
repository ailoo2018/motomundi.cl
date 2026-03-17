<script setup lang="ts">
import {
  IconArrowRight,
  IconBrandInstagram,
  IconBrandYoutube,
  IconMapPin,
  IconMotorbike,
  IconStar,
  IconUsers,
  IconWorld,
  IconChevronRight,
} from '@tabler/icons-vue'

interface Ambassador {
  id: number
  name: string
  country: string
  discipline: string
  bio: string
  image: string
  featured?: boolean
  social: {
    instagram?: string
    youtube?: string
  }
}

const disciplines = ['Todos', 'Enduro', 'Motocross', 'Trial', 'Track Day', 'Adventure', 'Supermoto']
const activeFilter = ref('Todos')

const ambassadors: Ambassador[] = [
  {
    id: 1,
    name: 'Rodrigo Castillo',
    country: 'Chile',
    discipline: 'Enduro',
    bio: 'Campeón Nacional de Enduro 2022 y 2023. Rodrigo ha conquistado los terrenos más exigentes de la Patagonia y el Atacama, representando a Motomundi en competencias internacionales.',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=900&q=80&auto=format&fit=crop',
    featured: true,
    social: { instagram: '@r.castillo', youtube: 'YouTube' },
  },
  {
    id: 2,
    name: 'Valentina Rojas',
    country: 'Colombia',
    discipline: 'Motocross',
    bio: 'Primera mujer en el programa de embajadores de Motomundi. Valentina compite en el circuito latinoamericano de MX y es una voz activa en el crecimiento del motocrós femenino.',
    image: 'https://images.unsplash.com/photo-1547887538-047f4e969ec4?w=600&q=80&auto=format&fit=crop',
    social: { instagram: '@vale.mx' },
  },
  {
    id: 3,
    name: 'Marcos Ibáñez',
    country: 'Argentina',
    discipline: 'Adventure',
    bio: 'Más de 80.000 km recorridos a través de América del Sur, África y Asia. Marcos documenta cada aventura con una autenticidad que ha conquistado a miles de seguidores.',
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&q=80&auto=format&fit=crop',
    social: { instagram: '@moto.marcos', youtube: 'YouTube' },
  },
  {
    id: 4,
    name: 'Felipe Arce',
    country: 'Chile',
    discipline: 'Track Day',
    bio: 'Instructor certificado de Track Day y piloto de Superbike amateur. Felipe lleva cinco años colaborando con Motomundi y es mentor de nuevos pilotos en el circuito de La Serena.',
    image: 'https://images.unsplash.com/photo-1449426468159-d96dbf08f19f?w=600&q=80&auto=format&fit=crop',
    social: { instagram: '@felarce' },
  },
  {
    id: 5,
    name: 'Camila Torres',
    country: 'México',
    discipline: 'Trial',
    bio: 'Camila lleva el trial al siguiente nivel con una precisión y equilibrio asombrosos. Sus videos de pruebas de habilidad han viralizado la disciplina en todo el continente.',
    image: 'https://images.unsplash.com/photo-1568772585407-9f40120eab65?w=600&q=80&auto=format&fit=crop',
    social: { instagram: '@cami.trial' },
  },
  {
    id: 6,
    name: 'Diego Fuentes',
    country: 'Perú',
    discipline: 'Supermoto',
    bio: 'El rey del derrape controlado. Diego compite en el campeonato sudamericano de Supermoto y es un apasionado divulgador de la cultura moto urbana en Lima.',
    image: 'https://images.unsplash.com/photo-1591154669695-5f2a8d20c089?w=600&q=80&auto=format&fit=crop',
    social: { instagram: '@diegosupermoto' },
  },
  {
    id: 7,
    name: 'Sebastián Morales',
    country: 'Brasil',
    discipline: 'Enduro',
    bio: 'Veterano del Rally dos Sertões y finalista en el Dakar 2024. Sebastián aporta una perspectiva única de la resistencia y la preparación mental en las competencias de larga distancia.',
    image: 'https://images.unsplash.com/photo-1517649763962-0c623066013b?w=600&q=80&auto=format&fit=crop',
    social: { instagram: '@sebmorales', youtube: 'YouTube' },
  },
]

const filteredAmbassadors = computed(() =>
  activeFilter.value === 'Todos'
    ? ambassadors
    : ambassadors.filter((a) => a.discipline === activeFilter.value),
)

const stats = [
  { value: '18', label: 'Embajadores', icon: IconUsers },
  { value: '9', label: 'Disciplinas', icon: IconMotorbike },
  { value: '12', label: 'Países', icon: IconWorld },
]
</script>

<template>
  <div class="ambassadors-section">

    <!-- ── HERO ── -->
    <section class="amb-hero">
      <div class="amb-hero__watermark" aria-hidden="true">EMBAJADORES</div>

      <v-container class="amb-hero__container" fluid>
        <v-row align="end" class="fill-height">
          <v-col cols="12" md="6" class="amb-hero__left">
            <span class="amb-label">Programa de Embajadores</span>
            <h1 class="amb-heading">
              Riders<br /><em>de élite.</em>
            </h1>
          </v-col>

          <v-col cols="12" md="6" class="amb-hero__right">
            <p class="amb-hero__desc">
              Los embajadores de Motomundi son la cara de nuestra pasión. Pilotos, aventureros y
              creadores que viven sobre dos ruedas y empujan los límites cada día.
            </p>
            <div class="amb-hero__stats">
              <div v-for="stat in stats" :key="stat.label" class="amb-stat">
                <component :is="stat.icon" class="amb-stat__icon" :size="20" stroke-width="1.5" />
                <strong class="amb-stat__value">{{ stat.value }}</strong>
                <span class="amb-stat__label">{{ stat.label }}</span>
              </div>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </section>

    <!-- ── FILTER BAR ── -->
    <div class="amb-filters">
      <span class="amb-filters__label">Disciplina</span>
      <div class="amb-filters__btns">
        <v-btn
          v-for="d in disciplines"
          :key="d"
          :class="['amb-filter-btn', { 'amb-filter-btn--active': activeFilter === d }]"
          variant="outlined"
          size="small"
          rounded="0"
          @click="activeFilter = d"
        >
          {{ d }}
        </v-btn>
      </div>
    </div>

    <!-- ── GRID ── -->
    <section class="amb-grid">
      <TransitionGroup name="amb-fade" tag="div" class="amb-grid__inner">
        <article
          v-for="(amb, index) in filteredAmbassadors"
          :key="amb.id"
          :class="['amb-card', { 'amb-card--featured': amb.featured && index === 0 }]"
          :style="{ animationDelay: `${index * 60}ms` }"
        >
          <!-- Photo -->
          <div class="amb-card__photo">
            <v-chip
              class="amb-card__badge"
              color="#d6001c"
              size="x-small"
              rounded="0"
              label
            >
              {{ amb.featured && index === 0 ? 'Destacado' : amb.discipline }}
            </v-chip>
            <span class="amb-card__num">#{{ String(amb.id).padStart(2, '0') }}</span>
            <v-img
              :src="amb.image"
              :alt="amb.name"
              cover
              height="100%"
              class="amb-card__img"
            />
          </div>

          <!-- Info -->
          <div class="amb-card__info">
            <div class="amb-card__name">{{ amb.name }}</div>
            <div class="amb-card__origin">
              <IconMapPin :size="13" stroke-width="2" class="amb-card__pin" />
              {{ amb.country }} ·
              <span class="amb-card__discipline">{{ amb.discipline }}</span>
            </div>
            <p class="amb-card__bio">{{ amb.bio }}</p>

            <div class="amb-card__footer">
              <div class="amb-card__social">
                <a
                  v-if="amb.social.instagram"
                  href="#"
                  class="amb-social-link"
                  :title="amb.social.instagram"
                >
                  <IconBrandInstagram :size="16" stroke-width="1.8" />
                  <span>{{ amb.social.instagram }}</span>
                </a>
                <a
                  v-if="amb.social.youtube"
                  href="#"
                  class="amb-social-link"
                  title="YouTube"
                >
                  <IconBrandYoutube :size="16" stroke-width="1.8" />
                </a>
              </div>
              <a class="amb-card__cta" href="#">
                Ver perfil
                <IconArrowRight :size="15" stroke-width="2.2" />
              </a>
            </div>
          </div>
        </article>
      </TransitionGroup>

      <!-- Empty state -->
      <div v-if="filteredAmbassadors.length === 0" class="amb-empty">
        <IconMotorbike :size="48" stroke-width="1" class="amb-empty__icon" />
        <p>No hay embajadores en esta disciplina por ahora.</p>
      </div>
    </section>

    <!-- ── JOIN CTA ── -->
    <section class="amb-join">
      <div class="amb-join__bg-text" aria-hidden="true">→</div>
      <div class="amb-join__content">
        <span class="amb-label amb-label--light">¿Eres piloto?</span>
        <h2 class="amb-join__heading">
          Sé parte del<br /><em>equipo</em> Motomundi.
        </h2>
        <p class="amb-join__desc">
          Buscamos riders apasionados en todas las disciplinas. Si vives sobre dos ruedas y
          quieres representar a la marca, postula a nuestro programa de embajadores.
        </p>
      </div>
      <v-btn
        class="amb-join__btn"
        color="#d6001c"
        size="large"
        rounded="0"
        :append-icon="IconChevronRight"
        href="#"
      >
        Postular ahora
      </v-btn>
    </section>

  </div>
</template>

<style scoped>
/* ── FONTS ── */
@import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:ital,wght@0,300;0,600;0,700;0,900;1,700&family=Barlow:wght@300;400;500&display=swap');

/* ── TOKENS ── */
.ambassadors-section {
  --red: #d6001c;
  --red-dark: #a80016;
  --black: #0e0e0e;
  --gray: #6b6b6b;
  --light: #f5f5f5;
  --white: #ffffff;
  --border: #e8e8e8;

  background: var(--white);
  color: var(--black);
  overflow-x: hidden;
}

/* ── SHARED ── */
.amb-label {
  display: inline-block;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: var(--red);
  padding-bottom: 8px;
  border-bottom: 2px solid var(--red);
  margin-bottom: 20px;
}
.amb-label--light { color: rgba(255, 255, 255, 0.7); border-color: var(--red); }

.amb-heading {
  font-weight: 900;
  font-size: clamp(64px, 8vw, 110px);
  line-height: 0.92;
  text-transform: uppercase;
  letter-spacing: -0.02em;
  color: var(--black);
}
.amb-heading em { font-style: italic; color: var(--red); }

/* ── HERO ── */
.amb-hero {
  position: relative;
  padding: 80px 56px 72px;
  border-bottom: 2px solid var(--black);
  overflow: hidden;
}

.amb-hero__watermark {
  position: absolute;
  top: 50%;
  right: -60px;
  transform: translateY(-50%) rotate(90deg);
  font-weight: 900;
  font-size: 130px;
  color: var(--light);
  pointer-events: none;
  white-space: nowrap;
  z-index: 0;
}

.amb-hero__container { padding: 0 !important; position: relative; z-index: 1; }

.amb-hero__left {
  animation: fadeUp 0.7s ease both;
}

.amb-hero__right {
  animation: fadeUp 0.7s 0.15s ease both;
}

.amb-hero__desc {
  font-size: 17px;
  font-weight: 300;
  line-height: 1.75;
  color: var(--gray);
  max-width: 420px;
  margin-left: auto;
}

.amb-hero__stats {
  display: flex;
  gap: 40px;
  margin-top: 36px;
}

.amb-stat {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 2px;
}

.amb-stat__icon { color: var(--red); margin-bottom: 4px; }

.amb-stat__value {
  font-size: 42px;
  font-weight: 900;
  color: var(--red);
  line-height: 1;
}

.amb-stat__label {
  font-size: 11px;
  font-weight: 500;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--gray);
}

/* ── FILTERS ── */
.amb-filters {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 24px 56px;
  border-bottom: 1px solid var(--border);
  flex-wrap: wrap;
}

.amb-filters__label {
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--gray);
  margin-right: 8px;
}

.amb-filters__btns {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

.amb-filter-btn {
  font-size: 12px !important;
  font-weight: 700 !important;
  letter-spacing: 0.12em !important;
  text-transform: uppercase !important;
  color: var(--gray) !important;
  border-color: #d0d0d0 !important;
  transition: all 0.2s !important;
  height: 36px !important;
}

.amb-filter-btn:hover {
  color: var(--red) !important;
  border-color: var(--red) !important;
}

.amb-filter-btn--active {
  background: var(--red) !important;
  border-color: var(--red) !important;
  color: var(--white) !important;
}

/* ── GRID ── */
.amb-grid {
  padding: 2px;
  background: var(--border);
}

.amb-grid__inner {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2px;
}

/* ── CARD ── */
.amb-card {
  background: var(--white);
  overflow: hidden;
  cursor: pointer;
  animation: fadeUp 0.6s ease both;
  display: flex;
  flex-direction: column;
}

.amb-card--featured {
  grid-column: span 2;
}

.amb-card:hover .amb-card__img {
  transform: scale(1.06);
  filter: grayscale(0%);
}

.amb-card:hover .amb-card__overlay { opacity: 0.15; }

.amb-card:hover .amb-card__info-border {
  border-top-color: var(--red);
}

/* Photo */
.amb-card__photo {
  position: relative;
  height: 380px;
  overflow: hidden;
  flex-shrink: 0;
}

.amb-card--featured .amb-card__photo { height: 480px; }

.amb-card__img {
  transition: transform 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94), filter 0.4s !important;
  filter: grayscale(20%);
}

.amb-card__overlay {
  position: absolute;
  inset: 0;
  background: var(--red);
  opacity: 0;
  transition: opacity 0.4s;
  mix-blend-mode: multiply;
  z-index: 1;
  pointer-events: none;
}

.amb-card__badge {
  position: absolute;
  top: 18px;
  left: 18px;
  z-index: 2;
  font-size: 10px !important;
  font-weight: 700 !important;
  letter-spacing: 0.16em !important;
  text-transform: uppercase !important;
}

.amb-card__num {
  position: absolute;
  top: 16px;
  right: 18px;
  z-index: 2;
  font-size: 13px;
  font-weight: 700;
  color: rgba(255, 255, 255, 0.55);
  letter-spacing: 0.08em;
}

/* Info */
.amb-card__info {
  padding: 22px 26px 26px;
  border-top: 3px solid var(--black);
  transition: border-color 0.25s;
  flex: 1;
  display: flex;
  flex-direction: column;
}

.amb-card:hover .amb-card__info { border-color: var(--red); }

.amb-card__name {
  font-size: 30px;
  font-weight: 900;
  text-transform: uppercase;
  letter-spacing: -0.01em;
  line-height: 1;
  color: var(--black);
}

.amb-card--featured .amb-card__name { font-size: 42px; }

.amb-card__origin {
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 12px;
  font-weight: 500;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--gray);
  margin-top: 6px;
}

.amb-card__pin { color: var(--red); flex-shrink: 0; }
.amb-card__discipline { color: var(--red); font-weight: 700; }

.amb-card__bio {
  font-size: 14px;
  font-weight: 300;
  line-height: 1.65;
  color: var(--gray);
  margin-top: 12px;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  flex: 1;
}

/* Footer */
.amb-card__footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 18px;
}

.amb-card__social {
  display: flex;
  align-items: center;
  gap: 14px;
}

.amb-social-link {
  display: flex;
  align-items: center;
  gap: 5px;
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--gray);
  text-decoration: none;
  transition: color 0.2s;
}
.amb-social-link:hover { color: var(--red); }

.amb-card__cta {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: var(--red);
  text-decoration: none;
  transition: gap 0.2s;
}
.amb-card__cta:hover { gap: 12px; }

/* ── EMPTY STATE ── */
.amb-empty {
  grid-column: span 3;
  padding: 80px 24px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  background: var(--white);
  color: var(--gray);
  font-size: 15px;
  font-weight: 300;
}
.amb-empty__icon { color: var(--border); }

/* ── JOIN CTA ── */
.amb-join {
  /*margin: 0 56px 80px;*/
  background: #222;
  padding: 72px 64px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 40px;
  position: relative;
  overflow: hidden;
}

.amb-join__bg-text {
  position: absolute;
  right: -40px;
  top: 50%;
  transform: translateY(-50%);
  font-weight: 900;
  font-size: 400px;
  line-height: 1;
  color: rgba(255, 255, 255, 0.03);
  pointer-events: none;
  user-select: none;
}

.amb-join__content { position: relative; z-index: 1; }

.amb-join__heading {
  font-weight: 900;
  font-size: 52px;
  line-height: 0.95;
  text-transform: uppercase;
  letter-spacing: -0.01em;
  color: var(--white);
  margin-bottom: 0;
}
.amb-join__heading em { font-style: italic; color: var(--red); }

.amb-join__desc {
  color: rgba(255, 255, 255, 0.45);
  font-size: 15px;
  font-weight: 300;
  line-height: 1.7;
  margin-top: 14px;
  max-width: 480px;
}

.amb-join__btn {
  font-size: 14px !important;
  font-weight: 700 !important;
  letter-spacing: 0.18em !important;
  text-transform: uppercase !important;
  height: 52px !important;
  padding: 0 40px !important;
  flex-shrink: 0;
  position: relative;
  z-index: 1;
  transition: transform 0.2s !important;
}
.amb-join__btn:hover { transform: translateX(4px); }

/* ── TRANSITIONS ── */
.amb-fade-enter-active,
.amb-fade-leave-active { transition: opacity 0.35s, transform 0.35s; }
.amb-fade-enter-from  { opacity: 0; transform: translateY(16px); }
.amb-fade-leave-to    { opacity: 0; transform: translateY(-8px); }

/* ── KEYFRAMES ── */
@keyframes fadeUp {
  from { opacity: 0; transform: translateY(30px); }
  to   { opacity: 1; transform: translateY(0); }
}

/* ── RESPONSIVE ── */
@media (max-width: 960px) {
  .amb-hero { padding: 60px 24px; }
  .amb-hero__watermark { display: none; }
  .amb-hero__desc { margin-left: 0; }
  .amb-filters { padding: 20px 24px; }
  .amb-grid__inner { grid-template-columns: 1fr 1fr; }
  .amb-card--featured { grid-column: span 2; }
  .amb-join { flex-direction: column; align-items: flex-start;  padding: 48px 36px; }
  .amb-join__heading { font-size: 40px; }
}

@media (max-width: 600px) {
  .amb-hero { padding: 48px 20px; }
  .amb-hero__stats { gap: 24px; }
  .amb-filters { padding: 16px 20px; }
  .amb-grid__inner { grid-template-columns: 1fr; }
  .amb-card--featured { grid-column: span 1; }
  .amb-join { padding: 40px 28px; }
}
</style>
