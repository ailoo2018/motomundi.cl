<script setup lang="ts">
const props = defineProps({
  order: {
    type: Object,
    default: () => ({}),
  },
})

// ── Derived address blocks ────────────────────────────────────────

const shipping = computed(() => {
  const a = props.order?.shippingAddress
  const c = props.order?.shippedTo ?? props.order?.customer
  if (!a) return null
  return {
    fullName:   [a.name, a.surname].filter(Boolean).join(' '),
    rut:        a.rut,
    address:    a.address,
    postalCode: a.postalCode,
    comuna:     a.comuna?.name,
    email:      c?.email,
    phone:      c?.phone,
  }
})

const billing = computed(() => {
  const inv = props.order?.invoicedTo
  const cus = props.order?.customer
  const sha = props.order?.shippingAddress

  if (inv) {
    return {
      fullName:   inv.name,
      rut:        inv.rut ?? cus?.rut ?? sha?.rut,
      address:    inv.address ?? sha?.address,
      postalCode: inv.postalCode ?? sha?.postalCode,
      comuna:     inv.comuna?.name ?? sha?.comuna?.name,
      email:      inv.email ?? cus?.email,
      phone:      inv.phone ?? cus?.phone,
    }
  }
  return {
    fullName:   cus?.name,
    rut:        cus?.rut ?? sha?.rut,
    address:    cus?.address ?? sha?.address,
    postalCode: cus?.postalCode ?? sha?.postalCode,
    comuna:     cus?.comuna?.name ?? sha?.comuna?.name,
    email:      cus?.email ?? props.order?.shippedTo?.email,
    phone:      cus?.phone ?? props.order?.shippedTo?.phone,
  }
})

/** Returns true when billing == shipping (no separate invoice address) */
const sameAsBilling = computed(() => {
  if (!shipping.value || !billing.value) return false
  return (
    shipping.value.address   === billing.value.address &&
    shipping.value.postalCode === billing.value.postalCode &&
    shipping.value.comuna    === billing.value.comuna
  )
})
</script>

<template>
  <div class="mma">

    <!-- ── Shipping ───────────────────────────────────────────────── -->
    <div v-if="shipping" class="mma__block">
      <div class="mma__block-header">
        <div class="mma__icon-wrap">
          <VIcon icon="tabler-truck-delivery" size="15" />
        </div>
        <span class="mma__block-title">Dirección de envío</span>
      </div>

      <div class="mma__body">
        <p class="mma__name">{{ shipping.fullName }}</p>
        <p v-if="shipping.rut" class="mma__line mma__line--muted">RUT {{ shipping.rut }}</p>

        <p class="mma__address">
          {{ shipping.address }}<br>
          <span v-if="shipping.postalCode">{{ shipping.postalCode }} — </span>
          {{ shipping.comuna }}
        </p>

        <div class="mma__contact">
          <span v-if="shipping.email" class="mma__contact-item">
            <VIcon icon="tabler-mail" size="13" class="mma__contact-icon" />
            {{ shipping.email }}
          </span>
          <span v-if="shipping.phone" class="mma__contact-item">
            <VIcon icon="tabler-phone" size="13" class="mma__contact-icon" />
            {{ shipping.phone }}
          </span>
        </div>
      </div>
    </div>

    <!-- ── Divider ────────────────────────────────────────────────── -->
    <div class="mma__divider" />

    <!-- ── Billing ────────────────────────────────────────────────── -->
    <div v-if="billing" class="mma__block">
      <div class="mma__block-header">
        <div class="mma__icon-wrap">
          <VIcon icon="tabler-receipt-2" size="15" />
        </div>
        <span class="mma__block-title">Dirección de facturación</span>
      </div>

      <!-- Same as shipping shortcut -->
      <div v-if="sameAsBilling" class="mma__same-badge">
        <VIcon icon="tabler-copy-check" size="13" class="mr-1" />
        Igual que la dirección de envío
      </div>

      <div v-else class="mma__body">
        <p class="mma__name">{{ billing.fullName }}</p>
        <p v-if="billing.rut" class="mma__line mma__line--muted">RUT {{ billing.rut }}</p>

        <p class="mma__address">
          {{ billing.address }}<br>
          <span v-if="billing.postalCode">{{ billing.postalCode }} — </span>
          {{ billing.comuna }}
        </p>

        <div class="mma__contact">
          <span v-if="billing.email" class="mma__contact-item">
            <VIcon icon="tabler-mail" size="13" class="mma__contact-icon" />
            {{ billing.email }}
          </span>
          <span v-if="billing.phone" class="mma__contact-item">
            <VIcon icon="tabler-phone" size="13" class="mma__contact-icon" />
            {{ billing.phone }}
          </span>
        </div>
      </div>
    </div>

  </div>
</template>

<style scoped>
/* ── Wrapper ─────────────────────────────────────────────────────── */
.mma {
  display: flex;
  flex-direction: column;
  gap: 0;
}

/* ── Block ───────────────────────────────────────────────────────── */
.mma__block {
  padding: 2px 0 12px;
}

.mma__block-header {
  display: flex;
  align-items: center;
  gap: 6px;
  margin-bottom: 10px;
}

.mma__icon-wrap {
  width: 26px;
  height: 26px;
  border-radius: 6px;
  background: rgba(178, 25, 21, 0.08);
  color: #B21915;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.mma__block-title {
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.07em;
  text-transform: uppercase;
  color: #555;
}

/* ── Body ────────────────────────────────────────────────────────── */
.mma__body {
  padding-left: 32px;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.mma__name {
  font-size: 0.875rem;
  font-weight: 600;
  color: #111;
  margin: 0;
}

.mma__line {
  font-size: 0.8rem;
  margin: 0;
}

.mma__line--muted {
  color: #888;
}

.mma__address {
  font-size: 0.825rem;
  color: #444;
  line-height: 1.55;
  margin: 0;
}

/* ── Contact ─────────────────────────────────────────────────────── */
.mma__contact {
  display: flex;
  flex-direction: column;
  gap: 3px;
  margin-top: 4px;
}

.mma__contact-item {
  font-size: 0.8rem;
  color: #666;
  display: flex;
  align-items: center;
  gap: 5px;
}

.mma__contact-icon {
  color: #B21915;
  flex-shrink: 0;
}

/* ── Divider ─────────────────────────────────────────────────────── */
.mma__divider {
  border-top: 1px dashed rgba(0, 0, 0, 0.1);
  margin: 4px 0 12px;
}

/* ── Same-as badge ───────────────────────────────────────────────── */
.mma__same-badge {
  margin-left: 32px;
  display: inline-flex;
  align-items: center;
  font-size: 0.78rem;
  color: #777;
  background: #f5f5f5;
  border-radius: 6px;
  padding: 4px 10px;
  border: 1px solid rgba(0,0,0,0.07);
}
</style>
