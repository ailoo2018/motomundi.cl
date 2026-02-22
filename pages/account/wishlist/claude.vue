<template>
  <div class="favorites-page">
    <!-- Header -->
    <div class="page-header">
      <div class="header-content">
        <div class="header-left">
          <div class="back-btn" @click="$router.back()">
            <i class="ti ti-arrow-left"></i>
          </div>
          <div>
            <p class="header-eyebrow">Mi Garage</p>
            <h1 class="header-title">
              Mis Favoritos
              <span class="count-badge" v-if="favorites.length">{{ favorites.length }}</span>
            </h1>
          </div>
        </div>
        <div class="header-actions">
          <button class="sort-btn" @click="toggleSortMenu">
            <i class="ti ti-arrows-sort"></i>
            <span>Ordenar</span>
          </button>
          <div class="sort-menu" v-if="showSortMenu">
            <button
              v-for="opt in sortOptions"
              :key="opt.value"
              :class="['sort-option', { active: sortBy === opt.value }]"
              @click="setSortBy(opt.value)"
            >
              <i :class="'ti ' + opt.icon"></i>
              {{ opt.label }}
            </button>
          </div>
        </div>
      </div>

      <!-- Category Filter -->
      <div class="filter-strip">
        <button
          v-for="cat in categories"
          :key="cat.value"
          :class="['filter-pill', { active: activeCategory === cat.value }]"
          @click="activeCategory = cat.value"
        >
          <i :class="'ti ' + cat.icon"></i>
          {{ cat.label }}
        </button>
      </div>
    </div>

    <!-- Empty State -->
    <div class="empty-state" v-if="filteredFavorites.length === 0">
      <div class="empty-icon">
        <i class="ti ti-heart-broken"></i>
      </div>
      <h2>Sin favoritos aún</h2>
      <p>Explora nuestro catálogo y guarda los productos que te interesen tocando el ícono <i class="ti ti-heart"></i></p>
      <button class="cta-btn" @click="$router.push('/productos')">
        <i class="ti ti-compass"></i>
        Explorar Catálogo
      </button>
    </div>

    <!-- Product Grid -->
    <div class="products-grid" v-else>
      <div
        v-for="(product, index) in filteredFavorites"
        :key="product.id"
        class="product-card"
        :style="{ '--delay': index * 0.06 + 's' }"
      >
        <!-- Badge -->
        <div class="badge-stack">
          <span class="badge new" v-if="product.isNew">NUEVO</span>
          <span class="badge sale" v-if="product.discount">-{{ product.discount }}%</span>
        </div>

        <!-- Remove Favorite -->
        <button class="heart-btn active" @click="removeFavorite(product.id)" title="Quitar de favoritos">
          <i class="ti ti-heart-filled"></i>
        </button>

        <!-- Product Image -->
        <div class="product-img-wrap" @click="goToProduct(product)">
          <img :src="product.image" :alt="product.name" class="product-img" />
          <div class="img-overlay">
            <span class="view-label">Ver Producto <i class="ti ti-arrow-right"></i></span>
          </div>
        </div>

        <!-- Product Info -->
        <div class="product-info">
          <span class="product-brand">{{ product.brand }}</span>
          <h3 class="product-name" @click="goToProduct(product)">{{ product.name }}</h3>

          <!-- Rating -->
          <div class="rating-row">
            <div class="stars">
              <i
                v-for="s in 5"
                :key="s"
                :class="['ti', s <= Math.round(product.rating) ? 'ti-star-filled' : 'ti-star']"
              ></i>
            </div>
            <span class="rating-count">({{ product.reviews }})</span>
          </div>

          <!-- Size Selector -->
          <div class="size-row" v-if="product.sizes && product.sizes.length">
            <button
              v-for="size in product.sizes"
              :key="size"
              :class="['size-btn', { selected: selectedSizes[product.id] === size }]"
              @click="selectSize(product.id, size)"
            >{{ size }}</button>
          </div>

          <!-- Price & Cart -->
          <div class="price-cart-row">
            <div class="price-block">
              <span class="price-old" v-if="product.priceOld">{{ formatPrice(product.priceOld) }}</span>
              <span class="price-current">{{ formatPrice(product.price) }}</span>
            </div>
            <button class="add-cart-btn" @click="addToCart(product)">
              <i class="ti ti-shopping-cart-plus"></i>
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Toast Notification -->
    <Transition name="toast">
      <div class="toast" v-if="toast.show">
        <i :class="'ti ' + toast.icon"></i>
        {{ toast.message }}
      </div>
    </Transition>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

// ─── Mock Data ────────────────────────────────────────────────────────────────
const favorites = ref([
  {
    id: 1,
    name: 'Casco Shoei GT-Air 3',
    brand: 'Shoei',
    category: 'cascos',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80',
    price: 489990,
    priceOld: 579990,
    discount: 15,
    rating: 4.8,
    reviews: 142,
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    isNew: false,
  },
  {
    id: 2,
    name: 'Chaqueta Alpinestars T-GP Plus R v4',
    brand: 'Alpinestars',
    category: 'chaquetas',
    image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=600&q=80',
    price: 299990,
    priceOld: null,
    discount: null,
    rating: 4.6,
    reviews: 87,
    sizes: ['S', 'M', 'L', 'XL', '2XL'],
    isNew: true,
  },
  {
    id: 3,
    name: 'Guantes Dainese Carbon 4 Long',
    brand: 'Dainese',
    category: 'guantes',
    image: 'https://images.unsplash.com/photo-1504025468847-0e438279542c?w=600&q=80',
    price: 129990,
    priceOld: 159990,
    discount: 19,
    rating: 4.5,
    reviews: 63,
    sizes: ['S', 'M', 'L', 'XL'],
    isNew: false,
  },
  {
    id: 4,
    name: 'Botas Sidi Mag-1',
    brand: 'Sidi',
    category: 'botas',
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&q=80',
    price: 219990,
    priceOld: null,
    discount: null,
    rating: 4.9,
    reviews: 211,
    sizes: ['40', '41', '42', '43', '44', '45'],
    isNew: true,
  },
  {
    id: 5,
    name: 'Pantalón Rev\'it Mosca 2',
    brand: "Rev'it",
    category: 'pantalones',
    image: 'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=600&q=80',
    price: 189990,
    priceOld: 229990,
    discount: 17,
    rating: 4.3,
    reviews: 44,
    sizes: ['30', '32', '34', '36'],
    isNew: false,
  },
  {
    id: 6,
    name: 'Intercomunicador Sena 50S',
    brand: 'Sena',
    category: 'accesorios',
    image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=600&q=80',
    price: 349990,
    priceOld: 399990,
    discount: 13,
    rating: 4.7,
    reviews: 198,
    sizes: [],
    isNew: false,
  },
])

const categories = [
  { value: 'all', label: 'Todos', icon: 'ti-layout-grid' },
  { value: 'cascos', label: 'Cascos', icon: 'ti-helmet' },
  { value: 'chaquetas', label: 'Chaquetas', icon: 'ti-shirt' },
  { value: 'guantes', label: 'Guantes', icon: 'ti-hand-stop' },
  { value: 'botas', label: 'Botas', icon: 'ti-shoe' },
  { value: 'pantalones', label: 'Pantalones', icon: 'ti-package' },
  { value: 'accesorios', label: 'Accesorios', icon: 'ti-tools' },
]

const sortOptions = [
  { value: 'recent', label: 'Más recientes', icon: 'ti-clock' },
  { value: 'price-asc', label: 'Menor precio', icon: 'ti-sort-ascending-numbers' },
  { value: 'price-desc', label: 'Mayor precio', icon: 'ti-sort-descending-numbers' },
  { value: 'rating', label: 'Mejor valorados', icon: 'ti-star' },
]

// ─── State ────────────────────────────────────────────────────────────────────
const activeCategory = ref('all')
const sortBy = ref('recent')
const showSortMenu = ref(false)
const selectedSizes = ref({})
const toast = ref({ show: false, message: '', icon: '' })

// ─── Computed ─────────────────────────────────────────────────────────────────
const filteredFavorites = computed(() => {
  let list = favorites.value
  if (activeCategory.value !== 'all') {
    list = list.filter(p => p.category === activeCategory.value)
  }
  if (sortBy.value === 'price-asc') list = [...list].sort((a, b) => a.price - b.price)
  if (sortBy.value === 'price-desc') list = [...list].sort((a, b) => b.price - a.price)
  if (sortBy.value === 'rating') list = [...list].sort((a, b) => b.rating - a.rating)
  return list
})

// ─── Methods ──────────────────────────────────────────────────────────────────
const formatPrice = (p) => '$' + p.toLocaleString('es-CL')

const removeFavorite = (id) => {
  favorites.value = favorites.value.filter(p => p.id !== id)
  showToast('Producto eliminado de favoritos', 'ti-heart-broken')
}

const addToCart = (product) => {
  showToast(`${product.name} agregado al carro`, 'ti-shopping-cart-check')
}

const selectSize = (productId, size) => {
  selectedSizes.value[productId] = selectedSizes.value[productId] === size ? null : size
}

const goToProduct = (product) => {
  // In real Nuxt: navigateTo(`/productos/${product.id}`)
  console.log('Navigate to product', product.id)
}

const toggleSortMenu = () => { showSortMenu.value = !showSortMenu.value }

const setSortBy = (val) => {
  sortBy.value = val
  showSortMenu.value = false
}

let toastTimeout = null
const showToast = (message, icon) => {
  toast.value = { show: true, message, icon }
  clearTimeout(toastTimeout)
  toastTimeout = setTimeout(() => { toast.value.show = false }, 3000)
}
</script>

<style scoped>
/* ─── Variables ─────────────────────────────────────────────────────────── */
:root {
  --red: #d6001c;
  --red-dark: #a50015;
  --red-faint: #fff0f2;
  --black: #111111;
  --gray-900: #1a1a1a;
  --gray-700: #444;
  --gray-400: #999;
  --gray-100: #f5f5f5;
  --white: #ffffff;
  --radius: 16px;
  --radius-sm: 8px;
  --shadow: 0 4px 24px rgba(0,0,0,0.08);
  --shadow-hover: 0 12px 40px rgba(0,0,0,0.14);
}

/* ─── Page ──────────────────────────────────────────────────────────────── */
.favorites-page {
  min-height: 100vh;
  background: #ffffff;
  font-family: 'Barlow', 'Barlow Condensed', 'Segoe UI', sans-serif;
  padding-bottom: 80px;
}

/* ─── Header ────────────────────────────────────────────────────────────── */
.page-header {
  background: #fff;
  border-bottom: 1px solid #efefef;
  position: sticky;
  top: 0;
  z-index: 100;
  padding: 0 24px;
}

.header-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px 0 12px;
}

.header-left {
  display: flex;
  align-items: center;
  gap: 16px;
}

.back-btn {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: var(--gray-100);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: var(--gray-700);
  font-size: 18px;
  transition: background 0.2s, color 0.2s;
  flex-shrink: 0;
}
.back-btn:hover { background: var(--red-faint); color: var(--red); }

.header-eyebrow {
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--red);
  margin: 0 0 2px;
}

.header-title {
  font-size: 26px;
  font-weight: 800;
  color: var(--black);
  margin: 0;
  display: flex;
  align-items: center;
  gap: 10px;
  letter-spacing: -0.02em;
}

.count-badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 28px;
  height: 28px;
  padding: 0 8px;
  background: var(--red);
  color: #fff;
  border-radius: 100px;
  font-size: 14px;
  font-weight: 700;
}

/* ─── Sort ──────────────────────────────────────────────────────────────── */
.header-actions { position: relative; }

.sort-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  background: var(--gray-100);
  border: none;
  border-radius: 100px;
  padding: 10px 18px;
  font-size: 14px;
  font-weight: 600;
  color: var(--gray-700);
  cursor: pointer;
  transition: background 0.2s, color 0.2s;
}
.sort-btn:hover { background: var(--red-faint); color: var(--red); }

.sort-menu {
  position: absolute;
  right: 0;
  top: calc(100% + 8px);
  background: #fff;
  border-radius: var(--radius-sm);
  box-shadow: 0 8px 32px rgba(0,0,0,0.12);
  border: 1px solid #efefef;
  overflow: hidden;
  min-width: 200px;
  z-index: 200;
}

.sort-option {
  display: flex;
  align-items: center;
  gap: 10px;
  width: 100%;
  padding: 12px 16px;
  background: none;
  border: none;
  font-size: 14px;
  color: var(--gray-700);
  cursor: pointer;
  text-align: left;
  transition: background 0.15s;
}
.sort-option:hover { background: var(--gray-100); }
.sort-option.active { color: var(--red); font-weight: 600; }
.sort-option i { font-size: 16px; }

/* ─── Filter Strip ──────────────────────────────────────────────────────── */
.filter-strip {
  display: flex;
  gap: 8px;
  overflow-x: auto;
  padding: 12px 0 16px;
  scrollbar-width: none;
}
.filter-strip::-webkit-scrollbar { display: none; }

.filter-pill {
  display: flex;
  align-items: center;
  gap: 6px;
  flex-shrink: 0;
  padding: 8px 16px;
  border-radius: 100px;
  border: 1.5px solid #e8e8e8;
  background: #fff;
  font-size: 13px;
  font-weight: 600;
  color: var(--gray-700);
  cursor: pointer;
  transition: all 0.2s;
}
.filter-pill:hover { border-color: var(--red); color: var(--red); }
.filter-pill.active {
  background: var(--red);
  border-color: var(--red);
  color: #fff;
}
.filter-pill i { font-size: 15px; }

/* ─── Empty State ───────────────────────────────────────────────────────── */
.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 80px 24px;
  text-align: center;
}

.empty-icon {
  width: 96px;
  height: 96px;
  border-radius: 50%;
  background: var(--red-faint);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 24px;
  color: var(--red);
  font-size: 42px;
}

.empty-state h2 {
  font-size: 24px;
  font-weight: 800;
  color: var(--black);
  margin: 0 0 12px;
}

.empty-state p {
  font-size: 15px;
  color: var(--gray-400);
  max-width: 340px;
  line-height: 1.6;
  margin: 0 0 32px;
}

.cta-btn {
  display: flex;
  align-items: center;
  gap: 10px;
  background: var(--red);
  color: #fff;
  border: none;
  border-radius: 100px;
  padding: 14px 28px;
  font-size: 15px;
  font-weight: 700;
  cursor: pointer;
  transition: background 0.2s, transform 0.15s;
}
.cta-btn:hover { background: var(--red-dark); transform: translateY(-2px); }

/* ─── Grid ──────────────────────────────────────────────────────────────── */
.products-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 24px;
  padding: 32px 24px;
}

/* ─── Product Card ──────────────────────────────────────────────────────── */
.product-card {
  background: #fff;
  border-radius: var(--radius);
  border: 1px solid #efefef;
  overflow: hidden;
  position: relative;
  animation: fadeUp 0.4s both;
  animation-delay: var(--delay);
  transition: box-shadow 0.25s, transform 0.25s;
}
.product-card:hover {
  box-shadow: var(--shadow-hover);
  transform: translateY(-4px);
}

@keyframes fadeUp {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

/* Badges */
.badge-stack {
  position: absolute;
  top: 12px;
  left: 12px;
  z-index: 2;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.badge {
  display: inline-block;
  padding: 3px 8px;
  border-radius: 4px;
  font-size: 10px;
  font-weight: 800;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}
.badge.new { background: #111; color: #fff; }
.badge.sale { background: var(--red); color: #fff; }

/* Heart button */
.heart-btn {
  position: absolute;
  top: 12px;
  right: 12px;
  z-index: 2;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  border: none;
  background: rgba(255,255,255,0.92);
  backdrop-filter: blur(4px);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 18px;
  color: var(--gray-400);
  transition: all 0.2s;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}
.heart-btn.active { color: var(--red); }
.heart-btn:hover { transform: scale(1.12); }

/* Image */
.product-img-wrap {
  position: relative;
  overflow: hidden;
  aspect-ratio: 4/3;
  cursor: pointer;
  background: var(--gray-100);
}

.product-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.4s ease;
}
.product-card:hover .product-img { transform: scale(1.06); }

.img-overlay {
  position: absolute;
  inset: 0;
  background: rgba(0,0,0,0.35);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s;
}
.product-card:hover .img-overlay { opacity: 1; }

.view-label {
  color: #fff;
  font-size: 14px;
  font-weight: 700;
  display: flex;
  align-items: center;
  gap: 6px;
  letter-spacing: 0.04em;
}

/* Info */
.product-info {
  padding: 16px;
}

.product-brand {
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--red);
}

.product-name {
  font-size: 15px;
  font-weight: 700;
  color: var(--black);
  margin: 4px 0 8px;
  line-height: 1.3;
  cursor: pointer;
}
.product-name:hover { color: var(--red); }

/* Rating */
.rating-row {
  display: flex;
  align-items: center;
  gap: 6px;
  margin-bottom: 12px;
}
.stars { display: flex; gap: 2px; color: #f5a623; font-size: 13px; }
.rating-count { font-size: 12px; color: var(--gray-400); }

/* Sizes */
.size-row {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-bottom: 14px;
}

.size-btn {
  padding: 4px 10px;
  border-radius: 6px;
  border: 1.5px solid #e8e8e8;
  background: #fff;
  font-size: 12px;
  font-weight: 600;
  color: var(--gray-700);
  cursor: pointer;
  transition: all 0.15s;
}
.size-btn:hover { border-color: var(--red); color: var(--red); }
.size-btn.selected { background: var(--red); border-color: var(--red); color: #fff; }

/* Price & Cart */
.price-cart-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.price-block {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.price-old {
  font-size: 12px;
  color: var(--gray-400);
  text-decoration: line-through;
}

.price-current {
  font-size: 20px;
  font-weight: 800;
  color: var(--black);
  letter-spacing: -0.02em;
}

.add-cart-btn {
  width: 42px;
  height: 42px;
  border-radius: 12px;
  background: var(--red);
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-size: 20px;
  cursor: pointer;
  transition: background 0.2s, transform 0.15s;
  flex-shrink: 0;
}
.add-cart-btn:hover { background: var(--red-dark); transform: scale(1.06); }

/* ─── Toast ─────────────────────────────────────────────────────────────── */
.toast {
  position: fixed;
  bottom: 32px;
  left: 50%;
  transform: translateX(-50%);
  background: var(--gray-900);
  color: #fff;
  padding: 14px 22px;
  border-radius: 100px;
  font-size: 14px;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 10px;
  z-index: 999;
  box-shadow: 0 8px 32px rgba(0,0,0,0.2);
  white-space: nowrap;
}
.toast i { font-size: 18px; color: var(--red); }

.toast-enter-active, .toast-leave-active { transition: all 0.3s ease; }
.toast-enter-from, .toast-leave-to { opacity: 0; transform: translateX(-50%) translateY(16px); }

/* ─── Responsive ────────────────────────────────────────────────────────── */
@media (max-width: 640px) {
  .products-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 12px;
    padding: 16px;
  }
  .header-title { font-size: 20px; }
  .page-header { padding: 0 16px; }
  .price-current { font-size: 16px; }
  .product-brand { font-size: 10px; }
}

@media (max-width: 380px) {
  .products-grid { grid-template-columns: 1fr; }
}
</style>
