<template>
  <div class="cart-page">

    <!-- ── PAGE HEADER ─────────────────────────────────────────── -->
    <div class="cart-header">
      <div class="cart-header__inner">
        <div class="cart-header__title-group">
          <h1 class="cart-title">
            <i class="ti ti-shopping-cart cart-title__icon" />
            Carro de Compra
          </h1>
          <span v-if="cartItems.length" class="cart-title__count">
            {{ totalItems }} {{ totalItems === 1 ? 'producto' : 'productos' }}
          </span>
        </div>

        <!-- Free-shipping progress bar -->
        <div v-if="cartItems.length" class="shipping-progress">
          <div class="shipping-progress__labels">
            <span v-if="freeShippingRemaining > 0" class="shipping-progress__text">
              <i class="ti ti-truck" />
              Agrega
              <strong>{{ formatPrice(freeShippingRemaining) }}</strong>
              más y obtén
              <strong>despacho gratis</strong>
            </span>
            <span v-else class="shipping-progress__text shipping-progress__text--achieved">
              <i class="ti ti-circle-check" />
              ¡Felicidades! Tienes <strong>despacho gratis</strong>
            </span>
            <span class="shipping-progress__threshold">{{ formatPrice(freeShippingThreshold) }}</span>
          </div>
          <div class="shipping-progress__bar">
            <div
              class="shipping-progress__fill"
              :style="{ width: shippingProgressPct + '%' }"
            />
          </div>
        </div>
      </div>
    </div>

    <!-- ── MAIN LAYOUT ──────────────────────────────────────────── -->
    <div class="cart-layout" v-if="cartItems.length">

      <!-- LEFT: ITEMS ──────────────────────────────────────────── -->
      <div class="cart-items-col">

        <!-- Item card -->
        <div
          v-for="item in cartItems"
          :key="item.id"
          class="cart-item"
          :class="{ 'cart-item--removing': removingId === item.id }"
        >
          <div class="cart-item__image-wrap">
            <img :src="item.image" :alt="item.name" class="cart-item__image" />
            <span v-if="item.badge" class="cart-item__badge" :class="`cart-item__badge--${item.badge.type}`">
              {{ item.badge.label }}
            </span>
          </div>

          <div class="cart-item__body">
            <div class="cart-item__meta">
              <span class="cart-item__brand">{{ item.brand }}</span>
              <span class="cart-item__category">{{ item.category }}</span>
            </div>
            <h3 class="cart-item__name">{{ item.name }}</h3>

            <div class="cart-item__variants">
              <span class="cart-item__variant-chip">
                <i class="ti ti-ruler-2" /> Talla: <strong>{{ item.size }}</strong>
              </span>
              <span class="cart-item__variant-chip">
                <i class="ti ti-palette" /> Color: <strong>{{ item.color }}</strong>
              </span>
            </div>

            <div class="cart-item__footer">
              <!-- Quantity control -->
              <div class="qty-control">
                <button class="qty-control__btn" @click="decreaseQty(item)" :disabled="item.qty <= 1">
                  <i class="ti ti-minus" />
                </button>
                <span class="qty-control__value">{{ item.qty }}</span>
                <button class="qty-control__btn" @click="increaseQty(item)">
                  <i class="ti ti-plus" />
                </button>
              </div>

              <!-- Price -->
              <div class="cart-item__pricing">
                <span v-if="item.originalPrice" class="cart-item__original-price">
                  {{ formatPrice(item.originalPrice) }}
                </span>
                <span class="cart-item__price">{{ formatPrice(item.price * item.qty) }}</span>
              </div>
            </div>
          </div>

          <!-- Actions -->
          <div class="cart-item__actions">
            <button class="cart-item__action-btn" @click="moveToWishlist(item)" title="Guardar para después">
              <i class="ti ti-heart" />
            </button>
            <button class="cart-item__action-btn cart-item__action-btn--remove" @click="removeItem(item)" title="Eliminar">
              <i class="ti ti-trash" />
            </button>
          </div>
        </div>

        <!-- Trust chips -->
        <div class="trust-row">
          <div class="trust-chip">
            <i class="ti ti-shield-lock" />
            <span>Pago 100% seguro</span>
          </div>
          <div class="trust-chip">
            <i class="ti ti-refresh" />
            <span>30 días de devolución</span>
          </div>
          <div class="trust-chip">
            <i class="ti ti-award" />
            <span>Productos originales</span>
          </div>
          <div class="trust-chip">
            <i class="ti ti-headset" />
            <span>Soporte experto</span>
          </div>
        </div>
      </div>

      <!-- RIGHT: ORDER SUMMARY ────────────────────────────────── -->
      <div class="cart-summary-col">
        <div class="order-summary">
          <h2 class="order-summary__title">Resumen de Pedido</h2>

          <!-- Line items -->
          <div class="order-summary__lines">
            <div class="order-summary__line">
              <span>Subtotal ({{ totalItems }} productos)</span>
              <span>{{ formatPrice(subtotal) }}</span>
            </div>
            <div class="order-summary__line" v-if="totalDiscount > 0">
              <span class="order-summary__discount-label">
                <i class="ti ti-tag" /> Descuento
              </span>
              <span class="order-summary__discount-value">-{{ formatPrice(totalDiscount) }}</span>
            </div>
            <div class="order-summary__line">
              <span>
                Despacho
                <span v-if="freeShippingRemaining <= 0" class="order-summary__free-tag">GRATIS</span>
              </span>
              <span v-if="freeShippingRemaining > 0">{{ formatPrice(shippingCost) }}</span>
              <span v-else class="order-summary__discount-value">Gratis</span>
            </div>
          </div>

          <!-- Coupon -->
          <div class="coupon-input">
            <input
              v-model="couponCode"
              type="text"
              class="coupon-input__field"
              placeholder="Código de descuento"
              @keyup.enter="applyCoupon"
            />
            <button class="coupon-input__btn" @click="applyCoupon">
              <i class="ti ti-arrow-right" />
            </button>
          </div>
          <p v-if="couponMessage" class="coupon-message" :class="couponApplied ? 'coupon-message--ok' : 'coupon-message--err'">
            <i :class="couponApplied ? 'ti ti-circle-check' : 'ti ti-alert-circle'" />
            {{ couponMessage }}
          </p>

          <!-- Total -->
          <div class="order-summary__total-row">
            <span class="order-summary__total-label">Total</span>
            <div class="order-summary__total-value-group">
              <span class="order-summary__total-value">{{ formatPrice(orderTotal) }}</span>
              <span class="order-summary__iva">IVA incluido</span>
            </div>
          </div>

          <!-- CTA -->
          <button class="btn-checkout" @click="goCheckout">
            <i class="ti ti-lock" />
            Pagar ahora
          </button>

          <!-- Payment methods -->
          <div class="payment-methods">
            <span class="payment-methods__label">Aceptamos</span>
            <div class="payment-methods__icons">
              <span class="payment-icon">Visa</span>
              <span class="payment-icon">MC</span>
              <span class="payment-icon">Webpay</span>
              <span class="payment-icon">Mach</span>
            </div>
          </div>

          <!-- Continue shopping -->
          <NuxtLink to="/tienda" class="btn-continue">
            <i class="ti ti-chevron-left" />
            Seguir comprando
          </NuxtLink>
        </div>
      </div>
    </div>

    <!-- ── EMPTY STATE ─────────────────────────────────────────── -->
    <div v-else class="cart-empty">
      <div class="cart-empty__icon-wrap">
        <i class="ti ti-shopping-cart-off cart-empty__icon" />
      </div>
      <h2 class="cart-empty__title">Tu carro está vacío</h2>
      <p class="cart-empty__subtitle">
        Equípate para tu próxima aventura en dos ruedas
      </p>
      <NuxtLink to="/tienda" class="btn-checkout">
        <i class="ti ti-helmet" />
        Explorar productos
      </NuxtLink>
    </div>

    <!-- ── CROSS-SELL SECTION ──────────────────────────────────── -->
    <section class="cross-sell" v-if="cartItems.length">
      <div class="cross-sell__header">
        <div class="cross-sell__header-left">
          <span class="cross-sell__eyebrow">Completa tu equipamiento</span>
          <h2 class="cross-sell__title">Los riders también compraron</h2>
        </div>
        <NuxtLink to="/tienda" class="cross-sell__see-all">
          Ver todos <i class="ti ti-arrow-right" />
        </NuxtLink>
      </div>

      <div class="cross-sell__grid">
        <div
          v-for="product in crossSellProducts"
          :key="product.id"
          class="product-card"
          @mouseenter="product.hovered = true"
          @mouseleave="product.hovered = false"
        >
          <div class="product-card__image-wrap">
            <img :src="product.image" :alt="product.name" class="product-card__image" />
            <span v-if="product.badge" class="product-card__badge" :class="`product-card__badge--${product.badge.type}`">
              {{ product.badge.label }}
            </span>
            <button
              class="product-card__quick-add"
              :class="{ 'product-card__quick-add--visible': product.hovered }"
              @click="quickAddToCart(product)"
            >
              <i class="ti ti-shopping-cart-plus" />
              Agregar al carro
            </button>
          </div>
          <div class="product-card__body">
            <span class="product-card__brand">{{ product.brand }}</span>
            <h3 class="product-card__name">{{ product.name }}</h3>
            <div class="product-card__rating">
              <span class="product-card__stars">
                <i v-for="s in 5" :key="s" class="ti" :class="s <= product.rating ? 'ti-star-filled' : 'ti-star'" />
              </span>
              <span class="product-card__reviews">({{ product.reviews }})</span>
            </div>
            <div class="product-card__price-row">
              <span v-if="product.originalPrice" class="product-card__original">{{ formatPrice(product.originalPrice) }}</span>
              <span class="product-card__price">{{ formatPrice(product.price) }}</span>
              <span v-if="product.originalPrice" class="product-card__discount">
                -{{ Math.round((1 - product.price / product.originalPrice) * 100) }}%
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ── SNACKBAR ────────────────────────────────────────────── -->
    <Transition name="snack">
      <div v-if="snackbar.show" class="snackbar" :class="`snackbar--${snackbar.type}`">
        <i :class="snackbar.icon" />
        {{ snackbar.message }}
      </div>
    </Transition>

  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

// ── HELPERS ────────────────────────────────────────────────────
const formatPrice = (n) =>
  new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP', maximumFractionDigits: 0 }).format(n)

// ── CONSTANTS ──────────────────────────────────────────────────
const freeShippingThreshold = 79990
const shippingCost = 4990

// ── CART STATE ─────────────────────────────────────────────────
const cartItems = ref([
  {
    id: 1,
    brand: 'Alpinestars',
    category: 'Cascos',
    name: 'Supertech R10 Carbon Solid',
    size: 'L',
    color: 'Negro Mate',
    price: 849990,
    originalPrice: 999990,
    qty: 1,
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop',
    badge: { type: 'sale', label: '-15%' },
  },
  {
    id: 2,
    brand: 'REV\'IT!',
    category: 'Chaquetas',
    name: 'Sand 4 H2O Jacket',
    size: 'XL',
    color: 'Caqui / Negro',
    price: 329990,
    originalPrice: null,
    qty: 1,
    image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=400&h=400&fit=crop',
    badge: null,
  },
  {
    id: 3,
    brand: 'Dainese',
    category: 'Guantes',
    name: 'Air-Maze Unisex Gloves',
    size: 'M',
    color: 'Negro / Rojo',
    price: 49990,
    originalPrice: 64990,
    qty: 2,
    image: 'https://images.unsplash.com/photo-1603808033192-082d6919d3e1?w=400&h=400&fit=crop',
    badge: { type: 'hot', label: 'Hot' },
  },
])

const removingId = ref(null)

const totalItems = computed(() => cartItems.value.reduce((s, i) => s + i.qty, 0))
const subtotal = computed(() => cartItems.value.reduce((s, i) => s + i.price * i.qty, 0))
const totalDiscount = computed(() =>
  cartItems.value.reduce((s, i) => s + (i.originalPrice ? (i.originalPrice - i.price) * i.qty : 0), 0)
)
const shippingProgressPct = computed(() =>
  Math.min(100, (subtotal.value / freeShippingThreshold) * 100)
)
const freeShippingRemaining = computed(() => Math.max(0, freeShippingThreshold - subtotal.value))
const orderTotal = computed(() =>
  subtotal.value - (couponApplied.value ? couponDiscount.value : 0) + (freeShippingRemaining.value > 0 ? shippingCost : 0)
)

// ── QUANTITY CONTROLS ──────────────────────────────────────────
const increaseQty = (item) => { item.qty++ }
const decreaseQty = (item) => { if (item.qty > 1) item.qty-- }

// ── REMOVE ITEM ────────────────────────────────────────────────
const removeItem = async (item) => {
  removingId.value = item.id
  await new Promise((r) => setTimeout(r, 320))
  cartItems.value = cartItems.value.filter((i) => i.id !== item.id)
  removingId.value = null
  showSnack('Producto eliminado del carro', 'info', 'ti ti-trash')
}

// ── WISHLIST ───────────────────────────────────────────────────
const moveToWishlist = (item) => {
  showSnack(`"${item.name}" guardado en tu lista de deseos`, 'success', 'ti ti-heart')
}

// ── COUPON ────────────────────────────────────────────────────
const couponCode = ref('')
const couponMessage = ref('')
const couponApplied = ref(false)
const couponDiscount = ref(0)

const applyCoupon = () => {
  const code = couponCode.value.trim().toUpperCase()
  if (code === 'MOTO10') {
    couponDiscount.value = Math.round(subtotal.value * 0.1)
    couponApplied.value = true
    couponMessage.value = `¡Cupón aplicado! Descuento de ${formatPrice(couponDiscount.value)}`
  } else if (code === '') {
    couponMessage.value = 'Ingresa un código de descuento'
    couponApplied.value = false
  } else {
    couponMessage.value = 'Código inválido o expirado'
    couponApplied.value = false
  }
}

// ── CHECKOUT ──────────────────────────────────────────────────
const goCheckout = () => {
  showSnack('Redirigiendo al pago seguro…', 'success', 'ti ti-lock')
}

// ── CROSS-SELL ────────────────────────────────────────────────
const crossSellProducts = ref([
  {
    id: 10,
    brand: 'Sidi',
    name: 'Adventure 2 Gore Boots',
    price: 279990,
    originalPrice: 319990,
    rating: 5,
    reviews: 48,
    hovered: false,
    badge: { type: 'sale', label: '-12%' },
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=300&fit=crop',
  },
  {
    id: 11,
    brand: 'Klim',
    name: 'Induction Pro Pants',
    price: 199990,
    originalPrice: null,
    rating: 4,
    reviews: 31,
    hovered: false,
    badge: null,
    image: 'https://images.unsplash.com/photo-1561861422-a549073e547a?w=400&h=300&fit=crop',
  },
  {
    id: 12,
    brand: 'Shoei',
    name: 'X-SPR Pro Marquez 8',
    price: 1199990,
    originalPrice: 1349990,
    rating: 5,
    reviews: 112,
    hovered: false,
    badge: { type: 'new', label: 'Nuevo' },
    image: 'https://images.unsplash.com/photo-1599491143080-f59cad1b1f51?w=400&h=300&fit=crop',
  },
  {
    id: 13,
    brand: 'Alpinestars',
    name: 'Tech-Air Race Airbag Vest',
    price: 549990,
    originalPrice: null,
    rating: 5,
    reviews: 27,
    hovered: false,
    badge: { type: 'hot', label: 'Top' },
    image: 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=400&h=300&fit=crop',
  },
])

const quickAddToCart = (product) => {
  showSnack(`"${product.name}" agregado al carro`, 'success', 'ti ti-circle-check')
}

// ── SNACKBAR ──────────────────────────────────────────────────
const snackbar = ref({ show: false, message: '', type: 'success', icon: '' })
let snackTimer = null

const showSnack = (message, type = 'success', icon = 'ti ti-circle-check') => {
  clearTimeout(snackTimer)
  snackbar.value = { show: true, message, type, icon }
  snackTimer = setTimeout(() => { snackbar.value.show = false }, 3500)
}
</script>

<style scoped>
/* ── TOKENS ─────────────────────────────────────────────────── */
:root {
  --brand: #B21915;
  --brand-dark: #8a1210;
  --brand-light: #f9e8e7;
  --text: #0f0f0f;
  --text-muted: #6b6b6b;
  --text-light: #999;
  --border: #e8e8e8;
  --surface: #f7f7f7;
  --white: #ffffff;
  --success: #1a8a4a;
  --success-bg: #e8f5ee;
  --error: #c0392b;
  --error-bg: #fdf0ef;
  --radius: 12px;
  --radius-sm: 8px;
  --shadow: 0 2px 16px rgba(0,0,0,.07);
  --shadow-hover: 0 8px 32px rgba(0,0,0,.12);
  --transition: 0.22s cubic-bezier(.4,0,.2,1);
}

/* ── LAYOUT ─────────────────────────────────────────────────── */
.cart-page {
  max-width: 1280px;
  margin: 0 auto;
  padding: 32px 24px 80px;
  color: var(--text);
}

/* ── HEADER ─────────────────────────────────────────────────── */
.cart-header {
  margin-bottom: 32px;
}
.cart-header__inner {
  display: flex;
  flex-direction: column;
  gap: 16px;
}
.cart-header__title-group {
  display: flex;
  align-items: center;
  gap: 12px;
}
.cart-title {
  font-size: 26px;
  font-weight: 800;
  letter-spacing: -0.5px;
  display: flex;
  align-items: center;
  gap: 10px;
  margin: 0;
}
.cart-title__icon {
  color: var(--brand);
  font-size: 28px;
}
.cart-title__count {
  background: var(--brand);
  color: #fff;
  font-size: 12px;
  font-weight: 700;
  padding: 3px 10px;
  border-radius: 100px;
  letter-spacing: 0.3px;
}

/* Shipping progress */
.shipping-progress {
  background: var(--surface);
  border-radius: var(--radius-sm);
  padding: 12px 16px;
  border: 1px solid var(--border);
}
.shipping-progress__labels {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
  font-size: 13px;
  color: var(--text-muted);
}
.shipping-progress__text {
  display: flex;
  align-items: center;
  gap: 6px;
}
.shipping-progress__text--achieved {
  color: var(--success);
  font-weight: 600;
}
.shipping-progress__threshold {
  font-weight: 600;
  color: var(--text);
  font-size: 12px;
}
.shipping-progress__bar {
  background: var(--border);
  border-radius: 100px;
  height: 6px;
  overflow: hidden;
}
.shipping-progress__fill {
  height: 100%;
  background: linear-gradient(90deg, var(--brand) 0%, #e04843 100%);
  border-radius: 100px;
  transition: width 0.6s cubic-bezier(.4,0,.2,1);
}

/* ── MAIN GRID ──────────────────────────────────────────────── */
.cart-layout {
  display: grid;
  grid-template-columns: 1fr 360px;
  gap: 28px;
  align-items: start;
}

/* ── CART ITEMS COL ─────────────────────────────────────────── */
.cart-items-col {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

/* ── CART ITEM ──────────────────────────────────────────────── */
.cart-item {
  display: grid;
  grid-template-columns: 120px 1fr 44px;
  gap: 16px;
  background: var(--white);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  padding: 16px;
  box-shadow: var(--shadow);
  transition: transform var(--transition), box-shadow var(--transition), opacity var(--transition);
  position: relative;
  overflow: hidden;
}
.cart-item:hover {
  box-shadow: var(--shadow-hover);
  transform: translateY(-1px);
}
.cart-item--removing {
  opacity: 0;
  transform: translateX(-24px) scale(0.97);
}
.cart-item::before {
  content: '';
  position: absolute;
  top: 0; left: 0;
  width: 3px;
  height: 100%;
  background: var(--brand);
  opacity: 0;
  transition: opacity var(--transition);
}
.cart-item:hover::before {
  opacity: 1;
}

.cart-item__image-wrap {
  position: relative;
  border-radius: var(--radius-sm);
  overflow: hidden;
  background: var(--surface);
  aspect-ratio: 1;
  align-self: center;
}
.cart-item__image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.4s ease;
}
.cart-item:hover .cart-item__image {
  transform: scale(1.05);
}
.cart-item__badge {
  position: absolute;
  top: 6px; left: 6px;
  font-size: 10px;
  font-weight: 800;
  padding: 2px 7px;
  border-radius: 4px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}
.cart-item__badge--sale { background: var(--brand); color: #fff; }
.cart-item__badge--hot { background: #ff6b35; color: #fff; }
.cart-item__badge--new { background: #1a8a4a; color: #fff; }

.cart-item__body {
  display: flex;
  flex-direction: column;
  gap: 6px;
  min-width: 0;
}
.cart-item__meta {
  display: flex;
  align-items: center;
  gap: 8px;
}
.cart-item__brand {
  font-size: 11px;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.8px;
  color: var(--brand);
}
.cart-item__category {
  font-size: 11px;
  color: var(--text-light);
  border-left: 1px solid var(--border);
  padding-left: 8px;
}
.cart-item__name {
  font-size: 15px;
  font-weight: 700;
  margin: 0;
  line-height: 1.3;
  color: var(--text);
}
.cart-item__variants {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}
.cart-item__variant-chip {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  font-size: 11px;
  color: var(--text-muted);
  background: var(--surface);
  border: 1px solid var(--border);
  padding: 2px 9px;
  border-radius: 100px;
}
.cart-item__footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: auto;
  padding-top: 10px;
  border-top: 1px solid var(--border);
}

/* Qty control */
.qty-control {
  display: inline-flex;
  align-items: center;
  border: 1.5px solid var(--border);
  border-radius: var(--radius-sm);
  overflow: hidden;
}
.qty-control__btn {
  background: none;
  border: none;
  cursor: pointer;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--text-muted);
  transition: background var(--transition), color var(--transition);
}
.qty-control__btn:hover:not(:disabled) {
  background: var(--brand);
  color: #fff;
}
.qty-control__btn:disabled {
  opacity: 0.35;
  cursor: not-allowed;
}
.qty-control__value {
  min-width: 36px;
  text-align: center;
  font-size: 14px;
  font-weight: 700;
  color: var(--text);
}

/* Pricing */
.cart-item__pricing {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
}
.cart-item__original-price {
  font-size: 12px;
  color: var(--text-light);
  text-decoration: line-through;
}
.cart-item__price {
  font-size: 17px;
  font-weight: 800;
  color: var(--brand);
}

/* Actions */
.cart-item__actions {
  display: flex;
  flex-direction: column;
  gap: 8px;
  align-items: center;
  justify-content: flex-start;
  padding-top: 2px;
}
.cart-item__action-btn {
  background: none;
  border: 1.5px solid var(--border);
  border-radius: var(--radius-sm);
  width: 34px;
  height: 34px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: var(--text-muted);
  font-size: 16px;
  transition: all var(--transition);
}
.cart-item__action-btn:hover {
  border-color: var(--brand);
  color: var(--brand);
  background: var(--brand-light);
}
.cart-item__action-btn--remove:hover {
  border-color: var(--error);
  color: var(--error);
  background: var(--error-bg);
}

/* Trust chips */
.trust-row {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 10px;
  margin-top: 4px;
}
.trust-chip {
  display: flex;
  align-items: center;
  gap: 7px;
  font-size: 12px;
  color: var(--text-muted);
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--radius-sm);
  padding: 10px 12px;
  font-weight: 500;
}
.trust-chip i {
  color: var(--brand);
  font-size: 16px;
  flex-shrink: 0;
}

/* ── ORDER SUMMARY ──────────────────────────────────────────── */
.cart-summary-col {
  position: sticky;
  top: 24px;
}
.order-summary {
  background: var(--white);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  padding: 24px;
  box-shadow: var(--shadow);
}
.order-summary__title {
  font-size: 18px;
  font-weight: 800;
  margin: 0 0 20px;
  padding-bottom: 16px;
  border-bottom: 2px solid var(--brand);
  color: var(--text);
}
.order-summary__lines {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 20px;
}
.order-summary__line {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 14px;
  color: var(--text-muted);
}
.order-summary__line strong { color: var(--text); }
.order-summary__discount-label {
  display: flex;
  align-items: center;
  gap: 5px;
  color: var(--success);
}
.order-summary__discount-value { color: var(--success); font-weight: 700; }
.order-summary__free-tag {
  display: inline-block;
  background: var(--success);
  color: #fff;
  font-size: 9px;
  font-weight: 800;
  padding: 1px 5px;
  border-radius: 3px;
  letter-spacing: 0.5px;
  margin-left: 4px;
}

/* Coupon */
.coupon-input {
  display: flex;
  gap: 0;
  border: 1.5px solid var(--border);
  border-radius: var(--radius-sm);
  overflow: hidden;
  margin-bottom: 8px;
  transition: border-color var(--transition);
}
.coupon-input:focus-within { border-color: var(--brand); }
.coupon-input__field {
  flex: 1;
  border: none;
  outline: none;
  padding: 10px 14px;
  font-size: 13px;
  background: transparent;
  color: var(--text);
}
.coupon-input__field::placeholder { color: var(--text-light); }
.coupon-input__btn {
  background: var(--brand);
  border: none;
  color: #fff;
  padding: 0 16px;
  cursor: pointer;
  font-size: 18px;
  display: flex;
  align-items: center;
  transition: background var(--transition);
}
.coupon-input__btn:hover { background: var(--brand-dark); }
.coupon-message {
  font-size: 12px;
  display: flex;
  align-items: center;
  gap: 5px;
  margin: 0 0 16px;
}
.coupon-message--ok { color: var(--success); }
.coupon-message--err { color: var(--error); }

/* Total */
.order-summary__total-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 0;
  border-top: 1.5px solid var(--border);
  margin-bottom: 20px;
}
.order-summary__total-label {
  font-size: 16px;
  font-weight: 800;
  color: var(--text);
}
.order-summary__total-value-group {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
}
.order-summary__total-value {
  font-size: 24px;
  font-weight: 900;
  color: var(--brand);
  letter-spacing: -0.5px;
}
.order-summary__iva {
  font-size: 10px;
  color: var(--text-light);
  margin-top: 1px;
}

/* Checkout button */
.btn-checkout {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  width: 100%;
  background: var(--brand);
  color: #fff;
  border: none;
  border-radius: var(--radius-sm);
  padding: 15px 20px;
  font-size: 15px;
  font-weight: 800;
  cursor: pointer;
  letter-spacing: 0.3px;
  transition: background var(--transition), transform var(--transition), box-shadow var(--transition);
  text-decoration: none;
}
.btn-checkout:hover {
  background: var(--brand-dark);
  transform: translateY(-1px);
  box-shadow: 0 6px 20px rgba(178,25,21,.35);
}
.btn-checkout:active {
  transform: translateY(0);
}

/* Payment icons */
.payment-methods {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-top: 16px;
  flex-wrap: wrap;
}
.payment-methods__label {
  font-size: 11px;
  color: var(--text-light);
  flex-shrink: 0;
}
.payment-methods__icons { display: flex; gap: 6px; }
.payment-icon {
  border: 1px solid var(--border);
  border-radius: 4px;
  padding: 3px 8px;
  font-size: 10px;
  font-weight: 700;
  color: var(--text-muted);
  background: var(--surface);
}

/* Continue shopping */
.btn-continue {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  width: 100%;
  color: var(--text-muted);
  font-size: 13px;
  font-weight: 600;
  text-decoration: none;
  margin-top: 16px;
  padding: 8px;
  border-radius: var(--radius-sm);
  transition: color var(--transition), background var(--transition);
}
.btn-continue:hover {
  color: var(--brand);
  background: var(--brand-light);
}

/* ── EMPTY STATE ────────────────────────────────────────────── */
.cart-empty {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 80px 24px;
  gap: 16px;
}
.cart-empty__icon-wrap {
  width: 96px;
  height: 96px;
  background: var(--surface);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 8px;
}
.cart-empty__icon {
  font-size: 48px;
  color: var(--border);
}
.cart-empty__title {
  font-size: 24px;
  font-weight: 800;
  margin: 0;
}
.cart-empty__subtitle {
  font-size: 15px;
  color: var(--text-muted);
  margin: 0 0 8px;
}
.cart-empty .btn-checkout { width: auto; padding: 14px 32px; }

/* ── CROSS-SELL ─────────────────────────────────────────────── */
.cross-sell {
  margin-top: 56px;
  padding-top: 48px;
  border-top: 1px solid var(--border);
}
.cross-sell__header {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-bottom: 28px;
}
.cross-sell__header-left {
  display: flex;
  flex-direction: column;
  gap: 4px;
}
.cross-sell__eyebrow {
  font-size: 11px;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 1.5px;
  color: var(--brand);
}
.cross-sell__title {
  font-size: 22px;
  font-weight: 800;
  margin: 0;
  letter-spacing: -0.4px;
}
.cross-sell__see-all {
  display: flex;
  align-items: center;
  gap: 5px;
  font-size: 13px;
  font-weight: 600;
  color: var(--brand);
  text-decoration: none;
  transition: gap var(--transition);
}
.cross-sell__see-all:hover { gap: 9px; }

/* Product grid */
.cross-sell__grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
}

/* Product card */
.product-card {
  background: var(--white);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  overflow: hidden;
  cursor: pointer;
  transition: transform var(--transition), box-shadow var(--transition);
  box-shadow: var(--shadow);
}
.product-card:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-hover);
}
.product-card__image-wrap {
  position: relative;
  overflow: hidden;
  aspect-ratio: 4/3;
  background: var(--surface);
}
.product-card__image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
}
.product-card:hover .product-card__image { transform: scale(1.07); }
.product-card__badge {
  position: absolute;
  top: 8px; left: 8px;
  font-size: 10px;
  font-weight: 800;
  padding: 2px 7px;
  border-radius: 4px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  z-index: 2;
}
.product-card__badge--sale { background: var(--brand); color: #fff; }
.product-card__badge--hot  { background: #ff6b35; color: #fff; }
.product-card__badge--new  { background: #1a8a4a; color: #fff; }

.product-card__quick-add {
  position: absolute;
  bottom: 0; left: 0; right: 0;
  background: rgba(178,25,21,0.92);
  color: #fff;
  border: none;
  padding: 11px;
  font-size: 13px;
  font-weight: 700;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 7px;
  transform: translateY(100%);
  transition: transform var(--transition);
  backdrop-filter: blur(4px);
}
.product-card__quick-add--visible { transform: translateY(0); }

.product-card__body {
  padding: 14px 14px 16px;
  display: flex;
  flex-direction: column;
  gap: 5px;
}
.product-card__brand {
  font-size: 10px;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.8px;
  color: var(--brand);
}
.product-card__name {
  font-size: 14px;
  font-weight: 700;
  margin: 0;
  line-height: 1.3;
  color: var(--text);
}
.product-card__rating {
  display: flex;
  align-items: center;
  gap: 5px;
}
.product-card__stars {
  display: flex;
  gap: 1px;
  color: #f59e0b;
  font-size: 12px;
}
.product-card__reviews {
  font-size: 11px;
  color: var(--text-light);
}
.product-card__price-row {
  display: flex;
  align-items: center;
  gap: 7px;
  margin-top: 4px;
}
.product-card__original {
  font-size: 11px;
  color: var(--text-light);
  text-decoration: line-through;
}
.product-card__price {
  font-size: 16px;
  font-weight: 800;
  color: var(--brand);
}
.product-card__discount {
  font-size: 11px;
  font-weight: 700;
  color: #fff;
  background: var(--brand);
  border-radius: 4px;
  padding: 1px 5px;
}

/* ── SNACKBAR ────────────────────────────────────────────────── */
.snackbar {
  position: fixed;
  bottom: 28px;
  left: 50%;
  transform: translateX(-50%);
  background: var(--text);
  color: #fff;
  padding: 12px 22px;
  border-radius: 100px;
  font-size: 13px;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 8px;
  box-shadow: 0 8px 32px rgba(0,0,0,.2);
  z-index: 9999;
  white-space: nowrap;
}
.snackbar--success { background: #0d7240; }
.snackbar--info { background: #2563eb; }
.snack-enter-active, .snack-leave-active { transition: all 0.32s cubic-bezier(.4,0,.2,1); }
.snack-enter-from, .snack-leave-to { opacity: 0; transform: translateX(-50%) translateY(16px); }

/* ── RESPONSIVE ─────────────────────────────────────────────── */
@media (max-width: 1100px) {
  .cart-layout { grid-template-columns: 1fr 320px; }
  .cross-sell__grid { grid-template-columns: repeat(2, 1fr); }
  .trust-row { grid-template-columns: repeat(2, 1fr); }
}

@media (max-width: 768px) {
  .cart-page { padding: 20px 16px 60px; }
  .cart-layout {
    grid-template-columns: 1fr;
  }
  .cart-summary-col { position: static; }
  .cart-item {
    grid-template-columns: 96px 1fr;
    grid-template-rows: 1fr auto;
  }
  .cart-item__actions {
    flex-direction: row;
    grid-column: 1 / -1;
    border-top: 1px solid var(--border);
    padding-top: 12px;
    justify-content: flex-end;
  }
  .cross-sell__grid { grid-template-columns: repeat(2, 1fr); }
  .trust-row { grid-template-columns: 1fr 1fr; }
  .cross-sell__header { flex-direction: column; align-items: flex-start; gap: 12px; }
}

@media (max-width: 480px) {
  .cross-sell__grid { grid-template-columns: 1fr; }
  .trust-row { grid-template-columns: 1fr; }
  .snackbar { max-width: calc(100vw - 40px); white-space: normal; }
}
</style>
