<script setup lang="ts">
import {getImageUrl} from "@core/utils/formatters"

const props = defineProps({
  pack: {
    type: Object,
  },
})

const emit = defineEmits(["open-pack"])

const onOpenPack = () => {
  emit("open-pack", props.pack)
}
</script>

<template>
  <div class="pack-container">
    <div class="pack-content">
      <div class="pack-header">
        <div class="pack-icon">
          P
        </div>
        <div class="pack-title">
          {{ pack.title }}
        </div>
      </div>

      <div class="product-visuals">
        <div class="pack-item__image">
          <a :href="pack.mainProduct.url">
            <img
              v-if="pack.mainProduct.image"
              :src="getImageUrl(pack.mainProduct.image, 300, getDomainId())"
              :alt="pack.mainProduct.productName"
              class="product-img"
            >
          </a>
        </div>
        <div
          v-for="slot in pack.products"
          class="pack-item__image"
        >
          <a :href="slot.url">
            <img
              :src="getImageUrl(slot.image, 300, getDomainId())"
              :alt="slot.productName"
              class="product-img"
            >
          </a>
        </div>
      </div>
    </div>

    <div class="pack-sidebar">
      <div class="savings-badge">
        AHORRAS {{ formatMoney(pack.savings * -1) }}
      </div>
      <div class="price-label">
        Total del Pack:
      </div>
      <div class="total-price">
        {{ formatMoney(pack.total) }}
      </div>

      <button class="pack-buy-button" @click="onOpenPack">
        Comprar Pack
        <svg
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M17 8l4 4m0 0l-4 4m4-4H3"
          />
        </svg>
      </button>
    </div>
  </div>
</template>

<style scoped lang="scss">
.pack-container {
  display: flex;
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  /*width: 700px;*/
  overflow: hidden;
  border: 1px solid #e0e0e0;
}

/* Left Section: Product Preview */
.pack-content {
  flex: 2;
  padding: 24px;
  display: flex;
  flex-direction: column;
}

.pack-header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 20px;
}

.pack-icon {
  background: #d32f2f;
  color: white;
  width: 32px;
  height: 32px;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
}

.pack-title {
  font-size: 1.0rem;
  font-weight: 700;
  color: #333;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.product-visuals {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 15px;
  margin-top: 10px;
}

.product-img {

  width: 100px;
  height: 100px;

  object-fit: contain;
  border: 1px solid #f0f0f0;
  border-radius: 8px;
  transition: transform 0.2s;
}

@media screen and (max-width: 993px) {
  .product-img {
    width: 60px;
    height: 60px;
  }

}

.product-img:hover {
  transform: scale(1.05);
}

.plus-sign {
  font-size: 24px;
  color: #d32f2f;
  font-weight: bold;
}

/* Right Section: Pricing & CTA */
.pack-sidebar {
  flex: 1;
  background-color: #f9f9f9;
  padding: 24px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  border-left: 1px solid #e0e0e0;
}

.savings-badge {
  background-color: #2e7d32;
  color: white;
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 0.85rem;
  font-weight: 600;
  align-self: flex-start;
  margin-bottom: 12px;
}

.price-label {
  font-size: 0.9rem;
  color: #666;
  margin-bottom: 4px;
}

.total-price {
  font-size: 1.8rem;
  font-weight: 800;
  color: #333;
  margin-bottom: 20px;
}

.pack-buy-button {
  background-color: #d32f2f !important;
  color: white;
  border: none;
  padding: 14px;
  border-radius: 8px;
  font-weight: 700;
  cursor: pointer;
  transition: background 0.3s;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  text-decoration: none;
}

.pack-buy-button:hover {
  background-color: #b71c1c;
}

.pack-buy-button svg {
  width: 18px;
  height: 18px;
}
</style>
