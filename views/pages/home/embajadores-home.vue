<script setup lang="ts">
import {
  IconArrowRight,
  IconBrandInstagram,
  IconMapPin,
} from '@tabler/icons-vue'

import type { Ambassador } from "@/server/api/home/embajadores"

const { data } = await useFetch<Ambassador[]>('/api/home/embajadores', { key: 'embajadores' })

const ambassadors = computed<Ambassador[]>(() => {
  return [...(data.value ?? [])]
    .sort(() => Math.random() - 0.5)
    .slice(0, 4)
})</script>

<template>
  <section class="ambrow">

    <!-- ── TOP BAR ── -->
    <div class="ambrow__topbar">
      <div class="ambrow__topbar-left">
<!--
        <span class="ambrow__label">Embajadores</span>
-->
        <h2 class="ambrow__heading">La comunidad <em>Embajadores</em> </h2>
      </div>
      <NuxtLink to="/embajadores" class="ambrow__view-all">
        Ver todos
        <IconArrowRight :size="15" stroke-width="2.2" />
      </NuxtLink>
    </div>

    <!-- ── ROW ── -->
    <div class="ambrow__row">
      <NuxtLink
        v-for="amb in ambassadors"
        :key="amb.id"
        to="/embajadores"
        class="ambrow__card"
      >
        <div class="ambrow__photo">
          <v-img :src="amb.image" :alt="amb.name" cover height="100%" class="ambrow__img" />
          <div class="ambrow__overlay" />
          <span class="ambrow__badge">{{ amb.discipline }}</span>
        </div>

        <div class="ambrow__info">
          <div class="ambrow__name">{{ amb.name }}</div>
          <div class="ambrow__meta">
            <IconMapPin :size="11" stroke-width="2" class="ambrow__pin" />
            {{ amb.country }}
          </div>
          <div class="ambrow__social">
            <IconBrandInstagram :size="13" stroke-width="1.8" />
            {{ amb.social.instagram }}
          </div>
        </div>
      </NuxtLink>

      <!-- +N more tile -->
      <NuxtLink to="/embajadores" class="ambrow__card ambrow__card--more">
        <div class="ambrow__more-inner">
          <span class="ambrow__more-count">+3</span>
          <span class="ambrow__more-label">más embajadores</span>
          <span class="ambrow__more-cta">
            Ver todos <IconArrowRight :size="14" stroke-width="2.2" />
          </span>
        </div>
      </NuxtLink>
    </div>

  </section>
</template>

<style scoped>

.ambrow {
  --red: #d6001c;
  --black: #222;
  --gray: #6b6b6b;
  --light: #f5f5f5;
  --white: #ffffff;
  --border: #e8e8e8;
  --font-display: 'Barlow Condensed', sans-serif;
  --font-body: 'Barlow', sans-serif;

  background: var(--white);
  padding: 48px 26px 70px;
  border-top: 1px solid var(--border);
}

/* ── TOP BAR ── */
.ambrow__topbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 24px;
}

.ambrow__topbar-left {
  display: flex;
  align-items: baseline;
  gap: 20px;
}

.ambrow__label {
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: var(--red);
  padding-bottom: 2px;
  border-bottom: 2px solid var(--red);
}

/*
.ambrow__heading {
  font-size: 28px;
  font-weight: 900;
  text-transform: uppercase;
  letter-spacing: -0.01em;
  line-height: 1;
  color: var(--black);
  margin: 0;
}
*/

h2.ambrow__heading  {
  font-size: 36px;
  font-weight: 900;
  text-transform: uppercase;
  margin: 0px;
  line-height: 26.2px;
  margin-bottom: 30px;
}

.ambrow__heading em { font-style: italic; color: var(--red);   }

.ambrow__view-all {
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
  margin-bottom: 30px;
}
.ambrow__view-all:hover { gap: 12px; }

/* ── ROW ── */
.ambrow__row {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 2px;
  border: 1px solid var(--border);
  background: var(--border);
}

/* ── CARD ── */
.ambrow__card {
  background: var(--white);
  border: 1px solid var(--border);
  display: flex;
  flex-direction: column;
  text-decoration: none;
  color: inherit;
  overflow: hidden;
  animation: fadeUp 0.5s ease both;
}

.ambrow__card:nth-child(1) { animation-delay: 0.05s; }
.ambrow__card:nth-child(2) { animation-delay: 0.10s; }
.ambrow__card:nth-child(3) { animation-delay: 0.15s; }
.ambrow__card:nth-child(4) { animation-delay: 0.20s; }
.ambrow__card:nth-child(5) { animation-delay: 0.25s; }

/* Photo */
.ambrow__photo {
  position: relative;
  height: 220px;
  overflow: hidden;
  flex-shrink: 0;
}

.ambrow__img {
  transition: transform 0.65s cubic-bezier(0.25, 0.46, 0.45, 0.94), filter 0.4s !important;
  filter: grayscale(15%);
}

.ambrow__card:hover .ambrow__img {
  transform: scale(1.07);
  filter: grayscale(0%);
}

.ambrow__overlay {
  position: absolute;
  inset: 0;
  background: var(--red);
  opacity: 0;
  transition: opacity 0.4s;
  mix-blend-mode: multiply;
  z-index: 1;
  pointer-events: none;
}
.ambrow__card:hover .ambrow__overlay { opacity: 0.12; }

.ambrow__badge {
  position: absolute;
  top: 12px;
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
.ambrow__info {
  padding: 14px 16px 16px;
  border-top: 2.5px solid var(--black);
  transition: border-color 0.25s;
  display: flex;
  flex-direction: column;
  gap: 4px;
  flex: 1;
}
.ambrow__card:hover .ambrow__info { border-color: var(--red); }

.ambrow__name {
  font-size: 20px;
  font-weight: 900;
  text-transform: uppercase;
  letter-spacing: -0.01em;
  line-height: 1;
  color: var(--black);
}

.ambrow__meta {
  display: flex;
  align-items: center;
  gap: 3px;
  font-size: 10px;
  font-weight: 500;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--gray);
}
.ambrow__pin { color: var(--red); flex-shrink: 0; }

.ambrow__social {
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 10px;
  font-weight: 500;
  color: var(--gray);
  margin-top: 2px;
}

/* ── +MORE TILE ── */
.ambrow__card--more {
  background: var(--black);
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100%;
  transition: background 0.2s;
}
.ambrow__card--more:hover { background: var(--red); }

.ambrow__more-inner {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  text-align: center;
  padding: 24px;
}

.ambrow__more-count {
  font-size: 56px;
  font-weight: 900;
  color: var(--white);
  line-height: 1;
}

.ambrow__more-label {
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.5);
}

.ambrow__more-cta {
  display: flex;
  align-items: center;
  gap: 5px;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--white);
  margin-top: 8px;
}

/* ── ANIMATION ── */
@keyframes fadeUp {
  from { opacity: 0; transform: translateY(20px); }
  to   { opacity: 1; transform: translateY(0); }
}

/* ── RESPONSIVE ── */
@media (max-width: 960px) {
  .ambrow { padding: 40px 24px 0; }
  .ambrow__row { grid-template-columns: repeat(3, 1fr); }
  .ambrow__topbar-left { flex-direction: column; gap: 8px; align-items: flex-start; }
}

@media (max-width: 600px) {
  .ambrow { padding: 32px 20px 0; }
  .ambrow__row { grid-template-columns: repeat(2, 1fr); }
  .ambrow__card--more { display: none; }
  .ambrow__photo { height: 180px; }
}
</style>
