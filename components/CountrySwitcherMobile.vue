<script setup>
import { useCountryDetection, COUNTRY_DATA } from '~/composables/useCountryDetection'

const { selectedCountry, selectedCountryData, changeCountry } = useCountryDetection()

const menuOpen = ref(false)
const wrapRef  = ref(null)
const triggerRef = ref(null)
const panelStyle = ref({})

/*
function toggleMenu() {
  menuOpen.value = !menuOpen.value
}
*/

function toggleMenu() {
  menuOpen.value = !menuOpen.value
  if (menuOpen.value) {
    const rect = triggerRef.value.getBoundingClientRect()

    panelStyle.value = {
      position: 'fixed',
      right: `${window.innerWidth - rect.right}px`,
      bottom: `${window.innerHeight - rect.top + 10}px`,
      zIndex: 9999,
    }
  }
}

function select(code) {
  console.log("Pressed select")
  changeCountry(code)
  menuOpen.value = false
}

const panelRef = ref(null)

function onClickOutside(e) {
  const inWrap  = wrapRef.value?.contains(e.target)
  const inPanel = panelRef.value?.contains(e.target)
  if (!inWrap && !inPanel) {
    menuOpen.value = false
  }
}

const iso = computed(() => {
  return selectedCountryData.value.iso?.toLowerCase()
})


onMounted(()  => document.addEventListener('mousedown', onClickOutside))
onUnmounted(() => document.removeEventListener('mousedown', onClickOutside))
</script>

<template>
  <div
    ref="wrapRef"
    class="cs-wrap"
  >
    <!-- Trigger button -->
    <span
      ref="triggerRef"
      class="mtc-link"
      @click="toggleMenu"
    >
      <img
        :src="`/content/images/flags/${iso}.png`  "
        alt="cl"
        class="mobile-menu__sec-locale"
      >
      <span>País/Idioma</span>
    </span>


    <!-- Dropdown panel -->
    <Teleport to="body">
      <div
        v-if="menuOpen"
        ref="panelRef"
        class="cs-panel"
        :style="panelStyle"
      >
        <div class="cs-panel-header">
          <svg
            width="13"
            height="13"
            viewBox="0 0 24 24"
            fill="none"
          >
            <circle
              cx="12"
              cy="12"
              r="10"
              stroke="#c74044"
              stroke-width="1.8"
            />
            <path
              d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10
                   15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"
              stroke="#c74044"
              stroke-width="1.8"
              stroke-linecap="round"
            />
          </svg>
          <span>Selecciona tu región</span>
        </div>

        <div class="cs-list">
          <button
            v-for="(data, code) in COUNTRY_DATA"
            :key="code"
            class="cs-item"
            :class="{ 'is-active': code === selectedCountry }"
            @click="select(code)"
          >
            <span class="cs-item-flag">
              <img :src="`/content/images/flags/${data.iso?.toLowerCase()}.png`">
            </span>
            <span class="cs-item-info">
              <span class="cs-item-name">{{ data.name }}</span>
              <span class="cs-item-currency">{{ data.currency }}</span>
            </span>
            <span class="cs-item-symbol">{{ data.symbol }}</span>
            <span
              v-if="code === selectedCountry"
              class="cs-item-check"
            >
              <svg
                width="11"
                height="11"
                viewBox="0 0 11 11"
                fill="none"
              >
                <path
                  d="M1.5 5.5l3 3 5-5"
                  stroke="#c74044"
                  stroke-width="1.8"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </span>
          </button>
        </div>
      </div>
    </Teleport>
  </div>
</template>

<style scoped>
/* ── Wrapper ──────────────────────────────────────────── */
.cs-wrap {
  position: relative;
  display: inline-block;
  font-family: 'DM Sans', 'Segoe UI', sans-serif;
}

/* ── Trigger ──────────────────────────────────────────── */
.cs-trigger {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;


  font-family: inherit;
  font-size: 0.83rem;
  font-weight: 500;
  color: white;
  cursor: pointer;
  white-space: nowrap;
  transition: border-color 0.15s, background 0.15s, box-shadow 0.15s;
  user-select: none;
}
.cs-trigger:hover,
.cs-trigger.is-open {
  color: #c74044
}
.cs-flag   { font-size: 1.05rem; line-height: 1; }
.cs-name   { font-weight: 600;  }
.cs-sep    {  font-size: 0.75rem; }
.cs-symbol {  font-size: 0.78rem; }

.cs-chevron {
  color: #fff;
  margin-left: 0.1rem;
  transition: transform 0.2s cubic-bezier(0.34, 1.56, 0.64, 1), color 0.15s;
  flex-shrink: 0;
}
.cs-chevron.is-open {
  transform: rotate(180deg);
  color: #c74044;
}

/* ── Panel ────────────────────────────────────────────── */
/* ── Panel ────────────────────────────────────────────── */
.cs-panel {
  position: absolute;
  bottom: calc(100% + 10px); /* ← was top: calc(100% + 8px) */
  top: auto;                  /* ← reset top */
  right: 0;
  min-width: 250px;
  background: #fff;
  border: 1px solid #f0f0f0;
  box-shadow:
    0 0 0 1px rgba(0,0,0,0.04),
    0 4px 6px rgba(0,0,0,0.04),
    0 12px 32px rgba(0,0,0,0.10);
  overflow: visible;          /* ← was hidden, needed for the triangle */
  z-index: 10000;
}

/* ── Triangle caret at the bottom ────────────────────── */
.cs-panel::after {
  content: '';
  position: absolute;
  bottom: -7px;               /* pokes out below the panel */
  right: 16px;                /* align toward the trigger */
  width: 0;
  height: 0;
  border-left: 7px solid transparent;
  border-right: 7px solid transparent;
  border-top: 7px solid #fff; /* filled triangle */
  filter: drop-shadow(0 2px 1px rgba(0,0,0,0.08));
}
.cs-panel::after {
  content: '';
  position: absolute;
  bottom: -7px;               /* pokes out below the panel */
  right: 16px;                /* align toward the trigger */
  width: 0;
  height: 0;
  border-left: 7px solid transparent;
  border-right: 7px solid transparent;
  border-top: 7px solid #fff; /* filled triangle */
  filter: drop-shadow(0 2px 1px rgba(0,0,0,0.08));
}

/* Border colour outline for the caret */
.cs-panel::before {
  content: '';
  position: absolute;
  bottom: -8px;
  right: 15px;
  width: 0;
  height: 0;
  border-left: 8px solid transparent;
  border-right: 8px solid transparent;
  border-top: 8px solid #f0f0f0; /* matches panel border colour */
}
/* ── Panel header ─────────────────────────────────────── */
.cs-panel-header {
  display: flex;
  align-items: center;
  gap: 0.45rem;
  padding: 0.75rem 0.85rem 0.6rem;
  border-bottom: 1px solid #f5f5f5;
  font-size: 0.68rem;
  font-weight: 700;
  letter-spacing: 0.09em;
  text-transform: uppercase;
  color: #bbb;
}

/* ── Scrollable list ──────────────────────────────────── */
.cs-list {
  max-height: 320px;
  overflow-y: auto;
  padding: 0.4rem;
  padding-right: 16px;
  scrollbar-width: thin;
  scrollbar-color: #f0f0f0 transparent;
}
.cs-list::-webkit-scrollbar       { width: 4px; }
.cs-list::-webkit-scrollbar-thumb { background: #e8e8e8; border-radius: 4px; }

/* ── Row item ─────────────────────────────────────────── */
.cs-item {
  display: flex;
  align-items: center;
  gap: 0.55rem;
  width: 100%;
  padding: 0.55rem 0.7rem;

  border: none;
  background: transparent;
  font-family: inherit;
  font-size: 0.85rem;
  color: #333;
  cursor: pointer;
  text-align: left;
  transition: background 0.12s;
}
.cs-item:hover    { background: #fdf2f2; }
.cs-item.is-active {
  background: #fdf2f2;
  color: #c74044;
}

.cs-item-flag { font-size: 1.05rem; flex-shrink: 0; }

.cs-item-info {
  display: flex;
  flex-direction: column;
  flex: 1;
  min-width: 0;
  line-height: 1.25;
}
.cs-item-name {
  font-weight: 600;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.cs-item-currency {
  font-size: 0.7rem;
  color: #aaa;
  font-weight: 400;
}
.cs-item.is-active .cs-item-currency { color: rgba(199,64,68,0.55); }

.cs-item-symbol {
  font-size: 0.78rem;
  font-weight: 600;
  color: #bbb;
  flex-shrink: 0;
  margin-left: auto;
  padding-left: 0.4rem;
}
.cs-item.is-active .cs-item-symbol { color: #c74044; }

.cs-item-check {
  flex-shrink: 0;
  width: 18px;
  height: 18px;
  background: rgba(199, 64, 68, 0.1);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* ── Transition ───────────────────────────────────────── */
.cs-drop-enter-active {
  transition: opacity 0.18s ease, transform 0.22s cubic-bezier(0.34, 1.56, 0.64, 1);
}
.cs-drop-leave-active {
  transition: opacity 0.14s ease, transform 0.14s ease;
}
.cs-drop-enter-from {
  opacity: 0;
  transform: translateY(6px) scale(0.97); /* ← was -6px */
}
.cs-drop-leave-to {
  opacity: 0;
  transform: translateY(4px) scale(0.98); /* ← was -4px */
}
</style>
