<template>

  <header class="header">
    <div class="header-inner">

      <!-- LOGO -->
      <NuxtLink to="/" class="logo-wrap" aria-label="Motomundi – inicio">
        <img
          src="http://www.motomundi.cl/logo-motomundi.png"
          alt="Motomundi"
          width="auto"
          height="44"
          fetchpriority="high"
        />
      </NuxtLink>

      <!-- SEARCH -->
      <MotomundiHeaderSearch />


      <!-- ACTIONS -->
      <div class="header-actions">

        <!-- Wishlist -->
        <NuxtLink to="/account/wishlist" class="action-btn tooltip-wrap" aria-label="Favoritos">
          <VIcon icon="tabler-heart" color="white"/>
          <span v-if="wishlistCount > 0" class="action-badge" aria-label="`${wishlistCount} favoritos`">
            {{ wishlistCount }}
          </span>

        </NuxtLink>



        <div class="action-divider" aria-hidden="true" />



        <!-- Account -->
        <NuxtLink to="/account/profile" class="action-btn action-btn-labeled" aria-label="Mi cuenta">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="1.8" aria-hidden="true">
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
            <circle cx="12" cy="7" r="4" />
          </svg>
          <span style="color: white;">Mi cuenta</span>

          <VMenu
            open-on-hover
            :close-delay="200"
            :open-delay="100"
            activator="parent"
            rounded="0"
            transition="slide-y-transition"
          >
            <AccountMenu class="user-menu__account-content" @logout="logout" />

          </VMenu>


        </NuxtLink>

        <div class="action-divider" aria-hidden="true" />

        <!-- Cart -->
        <NuxtLink to="/cart" class="action-btn tooltip-wrap" aria-label="`Carrito, ${cartCount} productos`">
         <VIcon icon="tabler-shopping-cart-filled" color="white"/>
          <span v-if="cartCount > 0" class="action-badge" :aria-label="`${cartCount} artículos`">
            {{ cartCount }}
          </span>

        </NuxtLink>

      </div>
    </div>
  </header>

</template>

<script setup lang="ts">
// ── Props ────────────────────────────────────────────────────────────────────
import MotomundiHeaderSearch from "@/views/pages/header-search/motomundi-header-search.vue";
import AccountMenu from "@/views/pages/account/account-menu.vue";

interface Props {
  cartCount?: number
  wishlistCount?: number
}
const props = withDefaults(defineProps<Props>(), {
  cartCount: 0,
  wishlistCount: 0,
})

// ── Emits ────────────────────────────────────────────────────────────────────
const emit = defineEmits<{
  search: [query: string]
}>()

// ── State ────────────────────────────────────────────────────────────────────
const searchQuery = ref('')
const selectedCategory = ref('Todo')
const searchInput = useTemplateRef<HTMLInputElement>('searchInput')

// ── Methods ──────────────────────────────────────────────────────────────────
function focusSearch() {
  searchInput.value?.focus()
}

function handleSearch() {
  if (searchQuery.value.trim()) {
    emit('search', searchQuery.value.trim())
  }
}
</script>

<style scoped>

/* ── Design tokens ───────────────────────────────────────────────────────── */
.header {
  --mm-black:       #0a0a0a;
  --mm-black-2:     #111111;
  --mm-black-3:     #1a1a1a;
  --mm-brand:       #B21915;
  --mm-brand-hover: #d41f1a;
  --mm-white:       white;
  --mm-grey-mid:    white;
  --mm-grey-light:  white;
  --mm-border:      rgba(178, 25, 21, 0.18);
  --mm-radius:      4px;
  --mm-transition:  0.22s cubic-bezier(0.4, 0, 0.2, 1);
}

/* ── Header shell ────────────────────────────────────────────────────────── */
.header {
  background: var(--mm-black-2);
  border-bottom: 2px solid var(--mm-brand);

  top: 0;
  z-index: 100;
  box-shadow:
    0 4px 32px rgba(0, 0, 0, 0.6),
    0 2px 0 var(--mm-brand);

}

.header-inner {
  max-width: 1350px;
  margin: 0 auto;
  padding: 0 20px;
  height: 92px;
  display: grid;
  grid-template-columns: auto 1fr auto;
  align-items: center;
  gap: 2.5rem;
}

/* ── Logo ────────────────────────────────────────────────────────────────── */
.logo-wrap {
  display: flex;
  align-items: center;
  text-decoration: none;
  flex-shrink: 0;
}

.logo-wrap img {
  height: 64px;
  width: auto;
  display: block;
  filter: brightness(1.1) contrast(1.05);
  transition:
    filter var(--mm-transition),
    transform var(--mm-transition);
}

.logo-wrap:hover img {
  filter: brightness(1.3) drop-shadow(0 0 8px var(--mm-brand));
  transform: scale(1.03);
}


/* ── Action strip ────────────────────────────────────────────────────────── */
.header-actions {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-shrink: 0;
}

/* base icon button */
.action-btn {
  position: relative;
  background: transparent;
  border: none;
  color: var(--mm-grey-light);
  cursor: pointer;
  width: 44px;
  height: 44px;
  border-radius: var(--mm-radius);
  display: flex;
  align-items: center;
  justify-content: center;
  transition:
    background var(--mm-transition),
    color var(--mm-transition),
    transform var(--mm-transition);
  text-decoration: none;
}

.action-btn:hover {
  background: rgba(178, 25, 21, 0.12);
  color: var(--mm-brand);
  transform: translateY(-1px);
}

.action-btn:active {
  transform: translateY(0) scale(0.95);
}

/* labeled variant */
.action-btn-labeled {
  width: auto;
  padding: 0 12px;
  gap: 7px;
  font-family: 'Barlow', sans-serif;
  font-size: 13px;
  font-weight: 600;
  letter-spacing: 0.01em;
}

.action-btn-labeled span {
  white-space: nowrap;
}

/* notification badge */
.action-badge {
  position: absolute;
  top: 5px;
  right: 5px;
  background: var(--mm-brand);
  color: #fff;
  font-family: 'Barlow Condensed', sans-serif;
  font-size: 10px;
  font-weight: 700;
  line-height: 1;
  min-width: 16px;
  height: 16px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 3px;
  border: 1.5px solid var(--mm-black-2);
  animation: badge-pop 0.3s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
}

@keyframes badge-pop {
  from { transform: scale(0); opacity: 0; }
  to   { transform: scale(1); opacity: 1; }
}

/* vertical divider */
.action-divider {
  width: 1px;
  height: 28px;
  background: rgba(255, 255, 255, 0.5);
  margin: 0 4px;
  flex-shrink: 0;
}

/* ── Tooltip ─────────────────────────────────────────────────────────────── */
.tooltip-wrap {
  position: relative;
}

.tooltip {
  position: absolute;
  top: calc(100% + 8px);
  left: 50%;
  transform: translateX(-50%);
  background: var(--mm-black-3);
  color: var(--mm-grey-light);
  font-family: 'Barlow Condensed', sans-serif;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  white-space: nowrap;
  padding: 5px 10px;
  border-radius: 3px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  pointer-events: none;
  opacity: 0;
  transition:
    opacity var(--mm-transition),
    top var(--mm-transition);
  z-index: 200;
}

.tooltip::before {
  content: '';
  position: absolute;
  bottom: 100%;
  left: 50%;
  transform: translateX(-50%);
  border: 5px solid transparent;
  border-bottom-color: rgba(255, 255, 255, 0.1);
}

.tooltip-wrap:hover .tooltip {
  opacity: 1;
  top: calc(100% + 6px);
}

/* ── Responsive ──────────────────────────────────────────────────────────── */
@media (max-width: 1024px) {
  .search-wrap {
    max-width: 100%;
  }
  .action-btn-labeled span {
    display: none;
  }
  .action-btn-labeled {
    width: 44px;
    padding: 0;
  }
}

@media (max-width: 768px) {
  .header-inner {

    padding: 0 5rem;
    gap: 1rem;
  }
  .search-category {
    display: none;
  }
  .search-wrap input {
    padding-left: 40px;
  }
  .search-icon {
    left: 12px;
  }
}
</style>
