<script setup lang="ts">
import { register } from "swiper/element/bundle"
import { ref, computed } from 'vue'

const props = defineProps({
  widget: {
    type: Object,
  },
})

const youtubeResponse = ref()

const videos = computed(() => {
  if (!youtubeResponse.value) return []
  return youtubeResponse.value?.items?.slice(0, 5) || []
})

const formatDate = (dateStr: string) => {
  if (!dateStr) return ''
  const date = new Date(dateStr)
  return date.toLocaleDateString('es-CL', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  }).toUpperCase()
}

const getLatestVideos = async () => {
  try {
    youtubeResponse.value = await $fetch('/api/youtube/latest', { key: "yt-latest" })
  } catch (e) {
    console.error(e)
  }
}

await getLatestVideos()

register()
</script>

<template>
  <ClientOnly>
    <section id="youtube-block">
      <!-- Background texture overlay -->
      <div class="bg-texture" />

      <div class="yt-inner">

        <!-- Header -->
        <header class="yt-header">
          <div class="yt-header__eyebrow">
            <span class="yt-header__line" />
            <span class="yt-header__label">Canal oficial</span>
            <span class="yt-header__line" />
          </div>
          <h2 class="yt-header__title">
            <span class="yt-header__title--light">MOTOMUNDI</span>
            <span class="yt-header__title--bold">EN YOUTUBE</span>
          </h2>
          <p class="yt-header__sub">Los últimos videos de nuestro canal</p>
        </header>

        <!-- Slider -->
        <ClientOnly>
          <swiper-container
            :slides-per-view="1"
            :space-between="24"
            :navigation="true"
            :pagination="{ clickable: true }"
            :breakpoints="{
              640: { slidesPerView: 2, spaceBetween: 24 },
              1024: { slidesPerView: 3, spaceBetween: 24 },
            }"
            class="yt-swiper"
          >
            <swiper-slide
              v-for="vitem in videos"
              :key="vitem.id"
              class="yt-slide"
            >
              <article class="yt-card">
                <!-- Thumbnail -->
                <a
                  :href="`https://www.youtube.com/watch?v=${vitem.id.videoId}`"
                  target="_blank"
                  rel="noopener"
                  class="yt-card__thumb"
                  aria-label="Ver video en YouTube"
                >
                  <img
                    :src="vitem.snippet.thumbnails.high.url"
                    :alt="vitem.snippet.title"
                    loading="lazy"
                  >
                  <div class="yt-card__play">
                    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <circle cx="12" cy="12" r="12" fill="white" fill-opacity="0.15" />
                      <circle cx="12" cy="12" r="11" stroke="white" stroke-opacity="0.6" stroke-width="1" />
                      <path d="M10 8.5L16 12L10 15.5V8.5Z" fill="white" />
                    </svg>
                  </div>
                  <div class="yt-card__thumb-overlay" />
                </a>

                <!-- Content -->
                <div class="yt-card__body">
                  <time class="yt-card__date">{{ formatDate(vitem.snippet.publishedAt) }}</time>
                  <h3 class="yt-card__title">{{ vitem.snippet.title }}</h3>
                  <p class="yt-card__desc">{{ vitem.snippet.description }}</p>
                  <a
                    :href="`https://www.youtube.com/watch?v=${vitem.id.videoId}`"
                    target="_blank"
                    rel="noopener"
                    class="yt-card__cta"
                  >
                    <span>Ver video</span>
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M2 7H12M12 7L7.5 2.5M12 7L7.5 11.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                  </a>
                </div>
              </article>
            </swiper-slide>
          </swiper-container>
        </ClientOnly>

        <!-- Footer CTA -->
        <div class="yt-footer">
          <a
            href="https://www.youtube.com/MotoMundiTV"
            target="_blank"
            rel="noopener"
            class="yt-footer__btn"
          >
            <svg class="yt-footer__yt-icon" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
              <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
            </svg>
            Visita nuestro canal de YouTube
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg" class="yt-footer__arrow">
              <path d="M2 7H12M12 7L7.5 2.5M12 7L7.5 11.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </a>
        </div>

      </div>
    </section>
  </ClientOnly>
</template>

<style scoped>

/* ── Variables ─────────────────────────────────────────────── */
:root {
  --yt-red:      #bd0019;
  --yt-red-dark: #9a0014;
  --yt-black:    #0f0f0f;
  --yt-card-bg:  #1a1a1a;
  --yt-white:    #ffffff;
  --yt-muted:    rgba(255,255,255,0.5);
  --yt-border:   rgba(255,255,255,0.08);
  --yt-radius:   4px;
}

/* ── Section shell ──────────────────────────────────────────── */
#youtube-block {
  position: relative;
  background-color: #bd0019;
  overflow: hidden;
  padding: 60px 0 50px;
}

/* Diagonal texture overlay */
.bg-texture {
  position: absolute;
  inset: 0;
  background-image:
    repeating-linear-gradient(
      -55deg,
      rgba(0,0,0,0.06) 0px,
      rgba(0,0,0,0.06) 1px,
      transparent 1px,
      transparent 28px
    );
  pointer-events: none;
  z-index: 0;
}

/* Subtle noise grain via pseudo */
#youtube-block::before {
  content: '';
  position: absolute;
  inset: 0;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E");
  opacity: 0.25;
  pointer-events: none;
  z-index: 0;
}

.yt-inner {
  position: relative;
  z-index: 1;
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 48px;
}

@media (max-width: 600px) {
  .yt-inner { padding: 0 16px; }
  #youtube-block { padding: 40px 0 36px; }
}

/* ── Header ─────────────────────────────────────────────────── */
.yt-header {
  text-align: center;
  margin-bottom: 42px;
}

.yt-header__eyebrow {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  margin-bottom: 12px;
}

.yt-header__line {
  display: block;
  width: 40px;
  height: 1px;
  background: rgba(255,255,255,0.45);
}

.yt-header__label {

  font-size: 11px;
  font-weight: 600;
  letter-spacing: 3px;
  text-transform: uppercase;
  color: rgba(255,255,255,0.65);
}

.yt-header__title {
  line-height: 0.92;
  margin: 0 0 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.yt-header__title--light {
  font-size: clamp(36px, 5vw, 58px);
  font-weight: 400;
  color: rgba(255,255,255,0.75);
  letter-spacing: 6px;
  text-transform: uppercase;
}

.yt-header__title--bold {
  font-size: clamp(44px, 7vw, 80px);
  font-weight: 900;
  color: #ffffff;
  letter-spacing: 2px;
  text-transform: uppercase;
  text-shadow: 0 2px 30px rgba(0,0,0,0.3);
}

.yt-header__sub {
  font-size: 13px;
  color: rgba(255,255,255,0.55);
  letter-spacing: 0.5px;
  margin: 0;
}

/* ── Swiper ─────────────────────────────────────────────────── */
.yt-swiper {
  width: 100%;
  padding-bottom: 48px !important;
}

.yt-slide {
  height: auto;
  display: flex;
}

/* ── Card ───────────────────────────────────────────────────── */
.yt-card {
  background: var(--yt-card-bg);
  border-radius: var(--yt-radius);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  width: 100%;
  border: 1px solid var(--yt-border);
  transition: transform 0.25s ease, box-shadow 0.25s ease;
}

.yt-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 20px 50px rgba(0,0,0,0.45);
}

/* Thumbnail */
.yt-card__thumb {
  position: relative;
  display: block;
  overflow: hidden;
  aspect-ratio: 16/9;
  flex-shrink: 0;
}

.yt-card__thumb img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  transition: transform 0.4s ease;
}

.yt-card:hover .yt-card__thumb img {
  transform: scale(1.05);
}

.yt-card__thumb-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    to bottom,
    transparent 50%,
    rgba(0,0,0,0.55) 100%
  );
  transition: opacity 0.3s ease;
}

.yt-card:hover .yt-card__thumb-overlay {
  background: linear-gradient(
    to bottom,
    rgba(0,0,0,0.15) 0%,
    rgba(0,0,0,0.6) 100%
  );
}

/* Play button */
.yt-card__play {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2;
}

.yt-card__play svg {
  width: 52px;
  height: 52px;
  filter: drop-shadow(0 2px 8px rgba(0,0,0,0.5));
  transition: transform 0.25s ease, opacity 0.25s ease;
  opacity: 0.85;
}

.yt-card:hover .yt-card__play svg {
  transform: scale(1.12);
  opacity: 1;
}

/* Body */
.yt-card__body {
  padding: 20px 22px 22px;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  gap: 8px;
}

.yt-card__date {
  font-size: 10px;
  font-weight: 600;
  letter-spacing: 2px;
  text-transform: uppercase;
  color: #bd0019;
  display: block;
}

.yt-card__title {
  font-size: 17px;
  font-weight: 800;
  line-height: 1.25;
  color: #EFC2C7;
  margin: 0;
  letter-spacing: 0.3px;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;

}

.yt-card__desc {
  font-size: 12px;
  line-height: 1.6;
  color: rgba(255,255,255,0.45);
  margin: 0;
  flex-grow: 1;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.yt-card__cta {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  margin-top: 6px;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 1.5px;
  text-transform: uppercase;
  color: #bd0019;
  text-decoration: none;
  transition: gap 0.2s ease, color 0.2s ease;
}

.yt-card__cta:hover {
  gap: 10px;
  color: #e0001f;
}

/* ── Swiper nav overrides ────────────────────────────────────── */
swiper-container {
  --swiper-pagination-bullet-inactive-color: rgba(255,255,255,0.3);
  --swiper-pagination-bullet-inactive-opacity: 1;
  --swiper-pagination-color: #ffffff;
  --swiper-pagination-bullet-size: 6px;
  --swiper-pagination-bullet-horizontal-gap: 4px;
}

swiper-container::part(button-prev),
swiper-container::part(button-next) {
  width: 40px;
  height: 40px;
  background: rgba(0, 0, 0, 0.55);
  border: 1px solid rgba(255,255,255,0.15);
  border-radius: 2px;
  color: white;
  --swiper-navigation-size: 16px;
  backdrop-filter: blur(4px);
  transition: background 0.2s ease;
}

swiper-container::part(button-prev):hover,
swiper-container::part(button-next):hover {
  background: rgba(0,0,0,0.8);
}

swiper-container::part(button-prev) { left: -8px; }
swiper-container::part(button-next) { right: -8px; }

/* ── Footer CTA ─────────────────────────────────────────────── */
.yt-footer {
  text-align: center;
  margin-top: 8px;
}

.yt-footer__btn {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  background: rgba(0,0,0,0.35);
  border: 1px solid rgba(255,255,255,0.2);
  color: #ffffff;
  text-decoration: none;
  padding: 13px 28px;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 2px;
  text-transform: uppercase;
  border-radius: var(--yt-radius);
  backdrop-filter: blur(4px);
  transition: background 0.25s ease, border-color 0.25s ease, gap 0.2s ease;
}

.yt-footer__btn:hover {
  background: rgba(0,0,0,0.6);
  border-color: rgba(255,255,255,0.4);
  gap: 14px;
}

.yt-footer__yt-icon {
  width: 16px;
  height: 16px;
  flex-shrink: 0;
  opacity: 0.85;
}

.yt-footer__arrow {
  flex-shrink: 0;
  transition: transform 0.2s ease;
}

.yt-footer__btn:hover .yt-footer__arrow {
  transform: translateX(3px);
}
</style>
