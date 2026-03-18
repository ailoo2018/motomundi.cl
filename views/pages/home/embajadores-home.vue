<script setup lang="ts">
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Autoplay, FreeMode } from 'swiper/modules'
import { IconArrowRight, IconArrowNarrowRight, IconArrowNarrowLeft, IconBrandInstagram, IconMapPin } from '@tabler/icons-vue'
import type { Ambassador } from '@/server/api/home/embajadores'

const { data } = await useFetch<Ambassador[]>('/api/home/embajadores', { key: 'embajadores' })

const ambassadors = computed<Ambassador[]>(() =>
  [...(data.value ?? [])].sort(() => Math.random() - 0.5)
)

const swiperRef = ref<any>(null)
const onSwiper = (swiper: any) => { swiperRef.value = swiper }
const prev = () => swiperRef.value?.slidePrev()
const next = () => swiperRef.value?.slideNext()
</script>

<template>
  <section class="ambswipe">

    <!-- ── HEADER ── -->
    <div class="ambswipe__header">
      <div class="ambswipe__header-left">
<!--        <span class="ambswipe__eyebrow">Embajadores</span>-->
        <h2 class="ambswipe__heading">Embajadores <em>Motomundi</em></h2>
      </div>

      <div class="ambswipe__header-right">
<!--        <div class="ambswipe__nav">
          <button class="ambswipe__nav-btn" aria-label="Anterior" @click="prev">
            <IconArrowNarrowLeft :size="20" stroke-width="2" />
          </button>
          <button class="ambswipe__nav-btn" aria-label="Siguiente" @click="next">
            <IconArrowNarrowRight :size="20" stroke-width="2" />
          </button>
        </div>-->
        <NuxtLink to="/embajadores" class="button button--primary d-none d-md-block mtc-link">
          Ver todos <IconArrowRight :size="14" stroke-width="2.2" />
        </NuxtLink>
      </div>
    </div>

    <!-- ── SWIPER ── -->
    <div class="ambswipe__track">
      <ClientOnly>
      <Swiper
        :modules="[Autoplay, FreeMode]"
        :slides-per-view="'auto'"
        :space-between="2"
        :free-mode="{ enabled: true, momentum: true }"
        :autoplay="{ delay: 4500, disableOnInteraction: true, pauseOnMouseEnter: true }"
        :loop="true"
        :grab-cursor="true"
        class="ambswipe__swiper"
        @swiper="onSwiper"
      >
        <SwiperSlide
          v-for="amb in ambassadors"
          :key="amb.id"
          class="ambswipe__slide"
        >
          <NuxtLink to="/embajadores" class="ambswipe__card">

            <div class="ambswipe__photo">
              <v-img
                :src="amb.image"
                :alt="amb.name"
                cover
                height="100%"
                class="ambswipe__img"
              />
              <div class="ambswipe__overlay" />
              <span class="ambswipe__badge">{{ amb.discipline }}</span>
            </div>

            <div class="ambswipe__info">
              <div class="ambswipe__name">{{ amb.name }}</div>
              <div class="ambswipe__meta">
                <IconMapPin :size="11" stroke-width="2" class="ambswipe__pin" />
                {{ amb.country }}
              </div>
              <div class="ambswipe__social">
                <IconBrandInstagram :size="12" stroke-width="1.8" />
                {{ amb.social.instagram }}
              </div>
              <span class="ambswipe__cta">
                Ver perfil <IconArrowRight :size="12" stroke-width="2.2" />
              </span>
            </div>

          </NuxtLink>
        </SwiperSlide>



      </Swiper>
      </ClientOnly>
    </div>

  </section>
</template>

<style scoped>
@import 'swiper/css';

.ambswipe {
  --red: #d6001c;
  --black: #222;
  --gray: #6b6b6b;
  --white: #ffffff;
  --border: #e8e8e8;
  --card-w: 240px;

  background: #f5f5f5;
  padding: 48px 0;
  overflow: hidden;
}

/* ── HEADER ── */
.ambswipe__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 28px;
  margin-bottom: 28px;
}

.ambswipe__header-left {
  display: flex;
  align-items: baseline;
  gap: 18px;
}

.ambswipe__eyebrow {
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: var(--red);
  border-bottom: 2px solid var(--red);
  padding-bottom: 2px;
}

.ambswipe__heading {
  font-size: 36px;
  font-weight: 900;
  text-transform: uppercase;
  margin: 0px;


  /*
  font-size: 26px;
  font-weight: 900;
  text-transform: uppercase;
  */
  letter-spacing: -0.01em;
  line-height: 1;
  color: var(--black);

}
.ambswipe__heading em { font-style: italic; color: var(--red); }

.ambswipe__header-right {
  display: flex;
  align-items: center;
  gap: 20px;
}

/* Nav buttons */
.ambswipe__nav { display: flex; gap: 2px; }

.ambswipe__nav-btn {
  width: 36px;
  height: 36px;
  background: var(--white);
  border: 1.5px solid var(--border);
  color: var(--black);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.2s, color 0.2s, border-color 0.2s;
}
.ambswipe__nav-btn:hover {
  background: var(--red);
  border-color: var(--red);
  color: var(--white);
}

.ambswipe__view-all {
  display: inline-flex;
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
.ambswipe__view-all:hover { gap: 12px; }

/* ── TRACK ── */
.ambswipe__track { padding-left: 4px; }

.ambswipe__swiper { overflow: visible !important; }

/* ── SLIDE ── */
.ambswipe__slide { width: var(--card-w) !important; }

/* ── CARD ── */
.ambswipe__card {
  display: flex;
  flex-direction: column;
  text-decoration: none;
  color: inherit;
  background: var(--white);
  overflow: hidden;
  height: 100%;
  border: 1px solid var(--border);
  transition: border-color 0.25s;
}
.ambswipe__card:hover { border-color: var(--red); }

/* Photo */
.ambswipe__photo {
  position: relative;
  height: 290px;
  overflow: hidden;
  flex-shrink: 0;
}

.ambswipe__img {
  transition: transform 0.65s cubic-bezier(0.25, 0.46, 0.45, 0.94), filter 0.4s !important;
  filter: grayscale(20%);
}
.ambswipe__card:hover .ambswipe__img {
  transform: scale(1.07);
  filter: grayscale(0%);
}

.ambswipe__overlay {
  position: absolute;
  inset: 0;
  background: var(--red);
  opacity: 0;
  mix-blend-mode: multiply;
  transition: opacity 0.4s;
  z-index: 1;
  pointer-events: none;
}
.ambswipe__card:hover .ambswipe__overlay { opacity: 0.1; }

.ambswipe__badge {
  position: absolute;
  bottom: 12px;
  left: 12px;
  z-index: 2;
  background: var(--red);
  color: var(--white);
  font-size: 9px;
  font-weight: 700;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  padding: 3px 8px;
}

/* Info */
.ambswipe__info {
  padding: 14px 16px 16px;
  border-top: 2.5px solid var(--black);
  transition: border-color 0.25s;
  display: flex;
  flex-direction: column;
  gap: 4px;
}
.ambswipe__card:hover .ambswipe__info { border-color: var(--red); }

.ambswipe__name {
  font-size: 18px;
  font-weight: 900;
  text-transform: uppercase;
  letter-spacing: -0.01em;
  line-height: 1.1;
  color: var(--black);
}

.ambswipe__meta {
  display: flex;
  align-items: center;
  gap: 3px;
  font-size: 10px;
  font-weight: 500;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--gray);
}
.ambswipe__pin { color: var(--red); flex-shrink: 0; }

.ambswipe__social {
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 10px;
  color: var(--gray);
}

.ambswipe__cta {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--red);
  margin-top: 6px;
  transition: gap 0.2s;
}
.ambswipe__card:hover .ambswipe__cta { gap: 8px; }

/* ── CTA SLIDE ── */
.ambswipe__slide--cta { width: 180px !important; }

.ambswipe__cta-slide {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  min-height: 395px;
  background: var(--black);
  text-decoration: none;
  padding: 24px;
  gap: 6px;
  text-align: center;
  transition: background 0.2s;
}
.ambswipe__cta-slide:hover { background: var(--red); }

.ambswipe__cta-count {
  font-size: 52px;
  font-weight: 900;
  color: var(--white);
  line-height: 1;
}

.ambswipe__cta-label {
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: rgba(255,255,255,0.5);
}

.ambswipe__cta-link {
  display: flex;
  align-items: center;
  gap: 5px;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--white);
  margin-top: 10px;
}

/* ── RESPONSIVE ── */
@media (max-width: 960px) {
  .ambswipe__header { padding: 0 24px; }
  .ambswipe__track  { padding-left: 24px; }
}

@media (max-width: 600px) {
  .ambswipe__header { padding: 0 20px; flex-wrap: wrap; gap: 12px; }
  .ambswipe__header-left { flex-direction: column; gap: 6px; align-items: flex-start; }
  .ambswipe__track  { padding-left: 20px; }
  .ambswipe__slide  { width: 200px !important; }
}
</style>
