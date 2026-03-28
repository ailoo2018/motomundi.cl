<script setup>
import {
  IconMapPin,
  IconPhone,
  IconClock,
  IconChevronRight,
  IconCalendarEvent,
  IconStarFilled,
  IconPackage,
  IconAlertCircle,
  IconBuildingStore,
  IconChevronLeft,
  IconExternalLink,
} from '@tabler/icons-vue'


// ─── Data ────────────────────────────────────────────────────────────────────
const props = defineProps({
  facilities: {
    type: Array,
    default: () => [],
  },
})

// ─── State ───────────────────────────────────────────────────────────────────
const selectedStore = ref(props.facilities[0] ?? null)



const calendarDate = ref(new Date())

// ─── Helpers ─────────────────────────────────────────────────────────────────
const BRAND = '#B21915'
const BASE_URL = 'https://www.motomundi.cl'

const DAY_KEYS = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday']
const DAY_LABELS = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb']
const DAY_FULL   = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado']
const MONTH_NAMES = [
  'Enero','Febrero','Marzo','Abril','Mayo','Junio',
  'Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre',
]

function imageUrl(url) {
  if (!url) return null
  url = url.replace("https://www.motomundi.cl", "")
  return `https://cdn.motomundi.cl${url}`
}

function formatIntervals(intervals) {
  if (!intervals || intervals.length === 0) return '—'
  return intervals.map(i => `${i.open} – ${i.close}`).join('  ·  ')
}

function storeHours(store) {
  return store?.configuration?.storeHours?.regular_hours ?? {}
}

function specialHours(store) {
  return store?.configuration?.storeHours?.special_hours ?? []
}

// ─── Open/Closed status ──────────────────────────────────────────────────────
function getStatus(store) {
  const now = new Date()
  const todayKey = DAY_KEYS[now.getDay()]
  const todayStr = now.toISOString().slice(0, 10)
  const hm = now.getHours() * 60 + now.getMinutes()

  // Check special hours first
  const special = specialHours(store).find(s => s.date === todayStr)
  const intervals = special
    ? (special.closed ? [] : special.intervals)
    : storeHours(store)[todayKey]?.intervals ?? []

  const isClosed = special
    ? special.closed
    : (storeHours(store)[todayKey]?.closed ?? true)

  if (isClosed || intervals.length === 0) return { open: false, label: 'Cerrado hoy' }

  for (const iv of intervals) {
    const [oh, om] = iv.open.split(':').map(Number)
    const [ch, cm] = iv.close.split(':').map(Number)
    if (hm >= oh * 60 + om && hm < ch * 60 + cm)
      return { open: true, label: `Abierto · Cierra ${iv.close}` }
  }
  // past last interval
  const last = intervals[intervals.length - 1]
  return { open: false, label: `Cerrado · Abrió hasta ${last.close}` }
}

// ─── Calendar logic ──────────────────────────────────────────────────────────
const calYear  = computed(() => calendarDate.value.getFullYear())
const calMonth = computed(() => calendarDate.value.getMonth())
const calTitle = computed(() => `${MONTH_NAMES[calMonth.value]} ${calYear.value}`)

function prevMonth() {
  const d = new Date(calendarDate.value)
  d.setMonth(d.getMonth() - 1)
  calendarDate.value = d
}
function nextMonth() {
  const d = new Date(calendarDate.value)
  d.setMonth(d.getMonth() + 1)
  calendarDate.value = d
}

const calendarDays = computed(() => {
  if (!selectedStore.value) return []
  const year = calYear.value
  const month = calMonth.value
  const firstDay = new Date(year, month, 1).getDay()
  const daysInMonth = new Date(year, month + 1, 0).getDate()
  const today = new Date()
  const todayStr = today.toISOString().slice(0, 10)

  const specials = Object.fromEntries(
    specialHours(selectedStore.value).map(s => [s.date, s])
  )
  const regularHours = storeHours(selectedStore.value)

  const cells = []
  for (let i = 0; i < firstDay; i++) cells.push(null)

  for (let d = 1; d <= daysInMonth; d++) {
    const date = new Date(year, month, d)
    const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`
    const dayKey = DAY_KEYS[date.getDay()]
    const special = specials[dateStr]
    let isOpen, note, intervals

    if (special) {
      isOpen = !special.closed
      note = special.note
      intervals = special.intervals
    } else {
      const reg = regularHours[dayKey]
      isOpen = reg ? !reg.closed : false
      intervals = reg?.intervals ?? []
      note = null
    }

    cells.push({
      day: d,
      dateStr,
      isToday: dateStr === todayStr,
      isOpen,
      isSpecial: !!special,
      note,
      intervals,
    })
  }
  return cells
})

// ─── Pickup badge ─────────────────────────────────────────────────────────────
function allowsPickup(store) {
  return store?.allowPickup === 1
}

function selectStore(store) {
  selectedStore.value = store
}
</script>

<template>

  <div class="mm-locator">
    <!-- ── Header ── -->
    <div class="mm-header">
      <div class="mm-header__inner">
        <span class="mm-header__eyebrow">MotoMundi</span>
        <h1 class="mm-header__title">Nuestras Tiendas</h1>
        <p class="mm-header__sub">Visítanos en cualquiera de nuestros puntos de venta a lo largo de Chile</p>
      </div>
      <div class="mm-header__stripe" />
    </div>

    <!-- ── Layout ── -->
    <div class="mm-layout">

      <!-- ── Sidebar ── -->
      <aside class="mm-sidebar">
        <div
          v-for="store in facilities"
          :key="store.id"
          class="mm-store-pill"
          :class="{ 'mm-store-pill--active': selectedStore?.id === store.id }"
          @click="selectStore(store)"
        >
          <div class="mm-store-pill__img-wrap">
            <img
              v-if="store.images?.[0]?.url"
              :src="imageUrl(store.images[0].url)"
              :alt="store.name"
              class="mm-store-pill__img"
            />
            <div v-else class="mm-store-pill__img-placeholder">
              <IconBuildingStore :size="24" />
            </div>
          </div>
          <div class="mm-store-pill__info">
            <span class="mm-store-pill__name">{{ store.name }}</span>
            <span class="mm-store-pill__commune">
              {{ store.postalAddress?.comuna?.name ?? '' }}
            </span>
          </div>
          <div class="mm-store-pill__status" :class="getStatus(store).open ? 'status--open' : 'status--closed'">
            <span class="status-dot" />
          </div>
          <IconChevronRight :size="16" class="mm-store-pill__chevron" />
        </div>
      </aside>

      <!-- ── Detail ── -->
      <main class="mm-detail" v-if="selectedStore">

        <!-- Hero image + title -->
        <div class="mm-detail__hero">
          <img
            v-if="selectedStore.images?.[0]?.url"
            :src="imageUrl(selectedStore.images[0].url)"
            :alt="selectedStore.name"
            class="mm-detail__hero-img"
          />
          <div class="mm-detail__hero-overlay">
            <div class="mm-detail__hero-content">
              <div
                class="mm-status-badge"
                :class="getStatus(selectedStore).open ? 'badge--open' : 'badge--closed'"
              >
                <span class="status-dot" />
                {{ getStatus(selectedStore).label }}
              </div>
              <h2 class="mm-detail__name">{{ selectedStore.name }}</h2>
              <p class="mm-detail__address">
                <IconMapPin :size="15" />
                {{ selectedStore.postalAddress?.address }},
                {{ selectedStore.postalAddress?.comuna?.name }}
              </p>
            </div>
          </div>
        </div>

        <!-- Info row -->
        <div class="mm-info-row">
          <div class="mm-info-chip">
            <IconPhone :size="16" />
            <span>{{ selectedStore.phone }}</span>
          </div>
          <div v-if="allowsPickup(selectedStore)" class="mm-info-chip mm-info-chip--accent">
            <IconPackage :size="16" />
            <span>Retiro en tienda</span>
          </div>
          <a
            :href="selectedStore.postalAddress?.gmapsUrl?.replace('/embed?', '/search?')"
            target="_blank"
            rel="noopener"
            class="mm-info-chip mm-info-chip--link"
          >
            <IconExternalLink :size="16" />
            <span>Cómo llegar</span>
          </a>
        </div>

        <!-- Body grid: hours + map + calendar -->
        <div class="mm-body-grid">

          <!-- Hours table -->
          <section class="mm-card mm-hours">
            <div class="mm-card__head">
              <IconClock :size="18" />
              <span>Horarios</span>
            </div>
            <table class="mm-hours-table">
              <tbody>
              <tr
                v-for="(key, idx) in ['monday','tuesday','wednesday','thursday','friday','saturday','sunday']"
                :key="key"
                :class="{ 'row--today': new Date().getDay() === [1,2,3,4,5,6,0][idx] }"
              >
                <td class="day-label">{{ DAY_FULL[[1,2,3,4,5,6,0][idx]] }}</td>
                <td class="day-hours">
                  <span v-if="storeHours(selectedStore)[key]?.closed" class="closed-tag">Cerrado</span>
                  <span v-else>{{ formatIntervals(storeHours(selectedStore)[key]?.intervals) }}</span>
                </td>
              </tr>
              </tbody>
            </table>

            <!-- Special hours -->
            <template v-if="specialHours(selectedStore).length">
              <div class="mm-special-head">
                <IconAlertCircle :size="15" />
                Horarios especiales
              </div>
              <div
                v-for="sh in specialHours(selectedStore)"
                :key="sh.date"
                class="mm-special-row"
              >
                <span class="sp-date">{{ sh.date }}</span>
                <span class="sp-note">{{ sh.note }}</span>
                <span class="sp-hours">
                  <span v-if="sh.closed" class="closed-tag">Cerrado</span>
                  <span v-else>{{ formatIntervals(sh.intervals) }}</span>
                </span>
              </div>
            </template>
          </section>

          <!-- Right column: map + calendar -->
          <div class="mm-right-col">
            <!-- Map -->
            <section class="mm-card mm-map">
              <iframe
                :src="selectedStore.postalAddress?.gmapsUrl"
                class="mm-map__frame"
                loading="lazy"
                referrerpolicy="no-referrer-when-downgrade"
                allowfullscreen
              />
            </section>

            <!-- Calendar -->
            <section class="mm-card mm-calendar">
              <div class="mm-card__head">
                <IconCalendarEvent :size="18" />
                <span>Calendario</span>
              </div>

              <div class="cal-nav">
                <button class="cal-nav__btn" @click="prevMonth">
                  <IconChevronLeft :size="16" />
                </button>
                <span class="cal-nav__title">{{ calTitle }}</span>
                <button class="cal-nav__btn" @click="nextMonth">
                  <IconChevronRight :size="16" />
                </button>
              </div>

              <div class="cal-grid">
                <div v-for="d in DAY_LABELS" :key="d" class="cal-dow">{{ d }}</div>
                <template v-for="(cell, ci) in calendarDays" :key="ci">
                  <div v-if="cell === null" class="cal-cell cal-cell--empty" />
                  <div
                    v-else
                    class="cal-cell"
                    :class="{
                      'cal-cell--today':   cell.isToday,
                      'cal-cell--open':    cell.isOpen && !cell.isToday,
                      'cal-cell--closed':  !cell.isOpen && !cell.isToday,
                      'cal-cell--special': cell.isSpecial,
                    }"
                    :title="cell.note ?? formatIntervals(cell.intervals)"
                  >
                    {{ cell.day }}
                    <span v-if="cell.isSpecial" class="cal-cell__star">
                      <IconStarFilled :size="6" />
                    </span>
                  </div>
                </template>
              </div>

              <div class="cal-legend">
                <span class="leg leg--open">Abierto</span>
                <span class="leg leg--closed">Cerrado</span>
                <span class="leg leg--special">Horario especial</span>
              </div>
            </section>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<style >
/* ── Tokens ── */
:root {
  --brand:     #B21915;
  --brand-dk:  #8a110e;
  --brand-lt:  #fdf1f0;
  --gray-50:   #f9f9f9;
  --gray-100:  #f0f0f0;
  --gray-200:  #e4e4e4;
  --gray-400:  #a0a0a0;
  --gray-600:  #5a5a5a;
  --gray-900:  #141414;
  --open-clr:  #16a34a;
  --open-bg:   #f0fdf4;
  --closed-clr:#dc2626;
  --closed-bg: #fef2f2;
  --radius:    10px;
  --shadow:    0 2px 16px rgba(0,0,0,.08);
}

/* ── Reset scope ── */
.mm-locator * { box-sizing: border-box; margin: 0; padding: 0; }
.mm-locator {  background: #fff; color: var(--gray-900); }

/* ── Header ── */
.mm-header {
  position: relative;
  padding: 56px 40px 44px;
  background: var(--gray-900);
  overflow: hidden;
}
.mm-header__inner { position: relative; z-index: 1; }
.mm-header__eyebrow {
  display: inline-block;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: .18em;
  text-transform: uppercase;
  color: var(--brand);
  margin-bottom: 8px;
}
.mm-header__title {
  font-size: clamp(28px, 4vw, 48px);
  font-weight: 800;
  color: #fff;
  letter-spacing: -.02em;
  line-height: 1.05;
}
.mm-header__sub {
  margin-top: 10px;
  font-size: 15px;
  color: var(--gray-400);
  max-width: 480px;
}
.mm-header__stripe {
  position: absolute;
  right: -40px; top: -40px;
  width: 340px; height: 340px;
  border-radius: 50%;
  background: var(--brand);
  opacity: .08;
}

/* ── Layout ── */
.mm-layout {
  display: grid;
  grid-template-columns: 280px 1fr;
  min-height: 640px;
  border-top: 3px solid var(--brand);
}

/* ── Sidebar ── */
.mm-sidebar {
  background: var(--gray-50);
  border-right: 1px solid var(--gray-200);
  overflow-y: auto;
  padding: 12px 8px;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.mm-store-pill {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 12px;
  border-radius: 8px;
  cursor: pointer;
  transition: background .15s, transform .1s;
  position: relative;
}
.mm-store-pill:hover { background: var(--gray-100); }
.mm-store-pill--active {
  background: var(--brand-lt);
  box-shadow: inset 3px 0 0 var(--brand);
}
.mm-store-pill--active .mm-store-pill__name { color: var(--brand); }

.mm-store-pill__img-wrap {
  width: 44px; height: 44px;
  border-radius: 6px;
  overflow: hidden;
  flex-shrink: 0;
  background: var(--gray-200);
  display: flex; align-items: center; justify-content: center;
  color: var(--gray-400);
}
.mm-store-pill__img { width: 100%; height: 100%; object-fit: cover; }
.mm-store-pill__img-placeholder { display: flex; align-items: center; justify-content: center; width: 100%; height: 100%; }

.mm-store-pill__info { flex: 1; min-width: 0; }
.mm-store-pill__name {
  display: block;
  font-size: 13px;
  font-weight: 700;
  letter-spacing: .02em;
  white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
  color: var(--gray-900);
}
.mm-store-pill__commune {
  display: block;
  font-size: 11px;
  color: var(--gray-400);
  text-transform: capitalize;
  margin-top: 1px;
}

.mm-store-pill__status { flex-shrink: 0; }
.mm-store-pill__chevron { color: var(--gray-400); flex-shrink: 0; }

/* ── Status dots ── */
.status-dot {
  display: inline-block;
  width: 8px; height: 8px;
  border-radius: 50%;
}
.status--open .status-dot  { background: var(--open-clr); box-shadow: 0 0 0 3px rgba(22,163,74,.2); }
.status--closed .status-dot { background: var(--gray-400); }

/* ── Detail ── */
.mm-detail { overflow-y: auto; background: #fff; }

/* Hero */
.mm-detail__hero {
  position: relative;
  height: 220px;
  overflow: hidden;
  background: var(--gray-900);
}
.mm-detail__hero-img {
  width: 100%; height: 100%;
  object-fit: cover;
  opacity: .6;
}
.mm-detail__hero-overlay {
  position: absolute; inset: 0;
  background: linear-gradient(to top, rgba(20,20,20,.92) 0%, rgba(20,20,20,.3) 60%, transparent 100%);
  display: flex; align-items: flex-end;
}
.mm-detail__hero-content { padding: 20px 24px; }

.mm-status-badge {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: .06em;
  text-transform: uppercase;
  padding: 4px 10px;
  border-radius: 20px;
  margin-bottom: 8px;
}
.badge--open  { background: var(--open-bg); color: var(--open-clr); }
.badge--open .status-dot  { background: var(--open-clr); }
.badge--closed { background: var(--closed-bg); color: var(--closed-clr); }
.badge--closed .status-dot { background: var(--closed-clr); }

.mm-detail__name {
  font-size: 26px;
  font-weight: 800;
  color: #fff;
  letter-spacing: -.02em;
  line-height: 1.1;
}
.mm-detail__address {
  display: flex; align-items: center; gap: 4px;
  font-size: 13px;
  color: rgba(255,255,255,.7);
  margin-top: 4px;
}

/* Info row */
.mm-info-row {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  padding: 16px 24px;
  border-bottom: 1px solid var(--gray-100);
}
.mm-info-chip {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 13px;
  font-weight: 600;
  padding: 6px 14px;
  border-radius: 6px;
  background: var(--gray-100);
  color: var(--gray-600);
  text-decoration: none;
}
.mm-info-chip--accent { background: var(--brand-lt); color: var(--brand); }
.mm-info-chip--link   { background: var(--gray-900); color: #fff; transition: background .15s; }
.mm-info-chip--link:hover { background: var(--brand); }

/* Body grid */
.mm-body-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  padding: 20px 24px 28px;
}

/* Card base */
.mm-card {
  border: 1px solid var(--gray-200);
  border-radius: var(--radius);
  overflow: hidden;
  background: #fff;
  box-shadow: var(--shadow);
}
.mm-card__head {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 14px 16px 10px;
  font-size: 13px;
  font-weight: 700;
  letter-spacing: .04em;
  text-transform: uppercase;
  color: var(--gray-600);
  border-bottom: 1px solid var(--gray-100);
}
.mm-card__head svg { color: var(--brand); }

/* Hours */
.mm-hours-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 13px;
}
.mm-hours-table tr { border-bottom: 1px solid var(--gray-100); transition: background .1s; }
.mm-hours-table tr:last-child { border-bottom: none; }
.mm-hours-table tr.row--today { background: var(--brand-lt); }
.mm-hours-table tr.row--today .day-label { color: var(--brand); font-weight: 700; }
.day-label {
  padding: 9px 16px;
  color: var(--gray-600);
  font-weight: 600;
  white-space: nowrap;
  width: 110px;
}
.day-hours { padding: 9px 16px 9px 0; color: var(--gray-900); }
.closed-tag {
  font-size: 11px;
  font-weight: 700;
  letter-spacing: .05em;
  color: var(--gray-400);
  text-transform: uppercase;
}

/* Special hours */
.mm-special-head {
  display: flex; align-items: center; gap: 6px;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: .06em;
  text-transform: uppercase;
  color: #d97706;
  padding: 10px 16px 6px;
  border-top: 1px solid #fef3c7;
  background: #fffbeb;
}
.mm-special-row {
  display: grid;
  grid-template-columns: auto auto 1fr;
  gap: 8px;
  align-items: center;
  padding: 6px 16px;
  font-size: 12px;
  background: #fffbeb;
  border-top: 1px solid #fef3c7;
}
.sp-date { color: var(--gray-600); font-weight: 600; }
.sp-note { color: #d97706; font-weight: 700; }
.sp-hours { color: var(--gray-900); }

/* Right col */
.mm-right-col { display: flex; flex-direction: column; gap: 16px; }

/* Map */
.mm-map { padding: 0; height: 220px; }
.mm-map__frame { width: 100%; height: 100%; border: none; display: block; }

/* Calendar */
.cal-nav {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 16px;
  border-bottom: 1px solid var(--gray-100);
}
.cal-nav__title { font-size: 13px; font-weight: 700; color: var(--gray-900); }
.cal-nav__btn {
  display: flex; align-items: center; justify-content: center;
  width: 28px; height: 28px;
  border: 1px solid var(--gray-200);
  border-radius: 6px;
  background: none;
  cursor: pointer;
  color: var(--gray-600);
  transition: background .15s;
}
.cal-nav__btn:hover { background: var(--gray-100); }

.cal-grid {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 2px;
  padding: 10px 12px 6px;
}
.cal-dow {
  text-align: center;
  font-size: 10px;
  font-weight: 700;
  letter-spacing: .06em;
  text-transform: uppercase;
  color: var(--gray-400);
  padding-bottom: 6px;
}
.cal-cell {
  position: relative;
  aspect-ratio: 1;
  display: flex; align-items: center; justify-content: center;
  font-size: 12px;
  font-weight: 600;
  border-radius: 6px;
  cursor: default;
}
.cal-cell--empty { background: transparent; }
.cal-cell--open   { background: #dcfce7; color: #166534; }
.cal-cell--closed { background: var(--gray-100); color: var(--gray-400); }
.cal-cell--today  {
  background: var(--brand) !important;
  color: #fff !important;
  box-shadow: 0 2px 8px rgba(178,25,21,.4);
}
.cal-cell--special { outline: 2px solid #fbbf24; outline-offset: -2px; }
.cal-cell__star {
  position: absolute;
  top: 2px; right: 3px;
  color: #fbbf24;
  display: flex;
}

.cal-legend {
  display: flex;
  gap: 14px;
  padding: 8px 14px 14px;
  flex-wrap: wrap;
}
.leg {
  display: flex; align-items: center; gap: 5px;
  font-size: 10px;
  font-weight: 700;
  letter-spacing: .04em;
  text-transform: uppercase;
  color: var(--gray-600);
}
.leg::before {
  content: '';
  display: inline-block;
  width: 12px; height: 12px;
  border-radius: 3px;
}
.leg--open::before   { background: #dcfce7; border: 1px solid #16a34a; }
.leg--closed::before { background: var(--gray-100); border: 1px solid var(--gray-300,#d1d1d1); }
.leg--special::before { background: transparent; border: 2px solid #fbbf24; }

/* ── Responsive ── */
@media (max-width: 960px) {
  .mm-layout { grid-template-columns: 1fr; }
  .mm-sidebar { flex-direction: row; overflow-x: auto; overflow-y: visible; padding: 8px; gap: 6px; border-right: none; border-bottom: 1px solid var(--gray-200); }
  .mm-store-pill { min-width: 180px; }
  .mm-body-grid { grid-template-columns: 1fr; }
}
@media (max-width: 600px) {
  .mm-header { padding: 32px 20px 28px; }
  .mm-body-grid { padding: 14px 14px 20px; }
  .mm-info-row { padding: 12px 14px; }
  .mm-detail__hero { height: 180px; }
}
</style>
