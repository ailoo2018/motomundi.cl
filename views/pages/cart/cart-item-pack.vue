<script setup>
import emptyImage from '@images/empty-image.avif'

const props = defineProps({
  cartItem: { type: Object, required: true },
})

const cartStore = useCartStore()
const wuid = useGuestUser().value // Access your guest ID

const increment = () => {
  cartStore.updateQuantity(wuid, props.cartItem.id, props.cartItem.quantity + 1)
}

const decrement = () => {
  if (props.cartItem.quantity > 1) {
    cartStore.updateQuantity(wuid, props.cartItem.id, props.cartItem.quantity - 1)
  }
}

const removeCartItem = () => {
  cartStore.removeItem(props.cartItem)
}
</script>

<template>
  <header v-if="cartItem.packContents && cartItem.packContents.length > 0">
    <div class="cart-product__wrapper header">
      <a
        class="cart-product mtc-link"
        :href="cartItem.url"
      >

        <span
          v-if="cartItem.packId > 0"
          class="promo-image"
          style="flex: 0 0 45px;"
        >
          <img
            src="data:image/svg+xml,%3csvg%20height='32'%20viewBox='0%200%2032%2032'%20width='32'%20xmlns='http://www.w3.org/2000/svg'%3e%3cg%20style='stroke:%23000;stroke-width:1.4;fill:none;fill-rule:evenodd;stroke-linecap:round;stroke-linejoin:round'%3e%3ccircle%20cx='13'%20cy='13'%20r='2'/%3e%3cpath%20d='m9%2016h13'%20transform='matrix(.70710678%20-.70710678%20.70710678%20.70710678%20-6.773864%2015.646447)'/%3e%3ccircle%20cx='18'%20cy='19'%20r='2'/%3e%3cpath%20d='m26.0909091%2020.0909091c-.3713815.8414864-.1931808%201.8242908.45%202.4818182l.0818182.0818182c.5121192.5115497.7998727%201.205702.7998727%201.9295454s-.2877535%201.4179957-.7998727%201.9295455c-.5115498.5121192-1.2057021.7998727-1.9295455.7998727s-1.4179956-.2877535-1.9295454-.7998727l-.0818182-.0818182c-.6575274-.6431808-1.6403317-.8213816-2.4818182-.45-.8242781.3532749-1.3600597%201.1623051-1.3636364%202.0590909v.2318182c0%201.5062311-1.2210416%202.7272727-2.7272727%202.7272727s-2.7272727-1.2210416-2.7272727-2.7272727v-.1227273c-.0216046-.9236307-.6056294-1.7401839-1.4727273-2.0590909-.8414864-.3713815-1.8242908-.1931808-2.48181817.45l-.08181818.0818182c-.5115498.5121192-1.20570206.7998727-1.92954546.7998727s-1.41799566-.2877535-1.92954545-.7998727c-.51211921-.5115498-.7998727-1.2057021-.7998727-1.9295455s.28775349-1.4179956.7998727-1.9295454l.08181818-.0818182c.64318074-.6575274.82138153-1.6403317.45-2.4818182-.35327493-.8242781-1.16230511-1.3600597-2.05909091-1.3636364h-.23181818c-1.50623114%200-2.72727273-1.2210416-2.72727273-2.7272727s1.22104159-2.7272727%202.72727273-2.7272727h.12272727c.9236307-.0216046%201.74018385-.6056294%202.05909091-1.4727273.37138153-.8414864.19318074-1.8242908-.45-2.48181817l-.08181818-.08181818c-.51211921-.5115498-.7998727-1.20570206-.7998727-1.92954546s.28775349-1.41799566.7998727-1.92954545c.51154979-.51211921%201.20570205-.7998727%201.92954545-.7998727.72384341%200%201.41799566.28775349%201.92954546.7998727l.08181818.08181818c.65752736.64318074%201.64033168.82138153%202.48181818.45h.1090909c.8242781-.35327493%201.3600597-1.16230511%201.3636364-2.05909091v-.23181818c0-1.50623114%201.2210416-2.72727273%202.7272727-2.72727273s2.7272727%201.22104159%202.7272727%202.72727273v.12272727c.0035767.8967858.5393583%201.70581598%201.3636364%202.05909091.8414864.37138153%201.8242908.19318074%202.4818182-.45l.0818182-.08181818c.5115497-.51211921%201.205702-.7998727%201.9295454-.7998727s1.4179957.28775349%201.9295455.7998727c.5121192.51154979.7998727%201.20570205.7998727%201.92954545%200%20.72384341-.2877535%201.41799566-.7998727%201.92954546l-.0818182.08181818c-.6431808.65752736-.8213816%201.64033168-.45%202.48181818v.1090909c.3532749.8242781%201.1623051%201.3600597%202.0590909%201.3636364h.2318182c1.5062311%200%202.7272727%201.2210416%202.7272727%202.7272727s-1.2210416%202.7272727-2.7272727%202.7272727h-.1227273c-.8967858.0035767-1.705816.5393583-2.0590909%201.3636364z'/%3e%3c/g%3e%3c/svg%3e"
            alt="Cambio de talla gratuito"
            width="40"
            height="40"
            class="cdn-img"
          >
        </span>
        <span
          v-if="!(cartItem.packId > 0) && cartItem.product"
          class="promo-image"
          style="flex: 0 0 45px;"
        >
          <VImg
            width="120"
            height="120"
            :src="getImageUrl(cartItem.product.image, 300, getDomainId()) || emptyImage"
            alt="packItem.productName"
            class="cdn-img "
          >
            <template #error>
              <VImg
                :src="emptyImage"
                width="120"
                height="120"
                class="cdn-img "
              />
            </template>
          </VImg>        </span>

        <div class="cart-product__info">
          <h1 class="cart-product__name mb-1">{{ cartItem.name }}</h1>
          <p class="cart-product__price">
            <span class="tag-wrapper">
              <span
                v-if="cartItem.discount > 0"
                class="tag product-tag product-tag--old product-tag--sales mr-3"
              >
                <span class="discount">
                  Rebajas -{{ Math.round(cartItem.discount / cartItem.oldPrice * 100) }}% pack
                </span>
              </span>
            </span>
            <span class="price ">{{ formatMoney(cartItem.price) }}</span>
            <span
              v-if="cartItem.discount > 0"
              class="product-old-price strike ml-1"
            >{{ formatMoney(cartItem.oldPrice) }}</span>
          </p>
        </div>
      </a>
      <div class="cart-product__tools">
        <div class="cart-product__quantity">
          <div class="quantity-buttons">
            <button
              class="increase"
              @click="increment(cartItem)"
            >
              <svg
                class="sprite-line-icons"
                width="14"
                height="14"
              >
                <use href="/content/svg/motomundi.svg#i-icon-angle-up" />
              </svg>
            </button>
            <button
              class="decrease"
              @click="decrement(cartItem)"
            >
              <svg
                class="sprite-line-icons"
                width="14"
                height="14"
              >
                <use href="/content/svg/motomundi.svg#i-icon-angle-down" />
              </svg>
            </button>
          </div>
          <input
            class="remove-arrows"
            type="number"
            min="1"
            step="1"
            value="1"
            ng-model="cartItem.quantity"
          >
        </div>
        <button
          class="cart-product__remove ml-3"
          tabindex="-1"
          @click="removeCartItem"
        >
          <svg
            class="sprite-line-icons"
            width="9"
            height="9"
          ><title>Cross
             icon</title>
            <use href="/content/svg/motomundi.svg#i-icon-cross" />
          </svg>
          <span class="d-none d-md-inline">Eliminar</span>
        </button>
      </div>
    </div>
    <p class="cart-product__content mt-3 mb-3">
      Contenido del pack:
    </p>
  </header>
  <article
    v-for="packItem in cartItem.packContents"
    class="cart-product__wrapper"
  >
    <a
      class="cart-product mtc-link"
      :href="packItem.url"
    >
      <span>

        <VImg
          :src="getImageUrl(packItem.image, 300, getDomainId()) || emptyImage"
          alt="packItem.productName"
          style="min-width: 70px"
          class="cdn-img "
        >
          <template #error>
            <VImg
              :src="emptyImage"
              width="120"
              height="120"
              class="cdn-img "
            />
          </template>
        </VImg>
      </span>
      <div class="cart-product__info">
        <h1 class="cart-product__name">
          {{ packItem.product?.name }}</h1>
        <p
          v-if="packItem.color"
          class="cart-product__details"
        >
          <span class="cart-product__size">
            Color: {{ packItem.color?.name }}
          </span>
        </p>
        <p
          v-if="packItem.size"
          class="cart-product__details"
        >
          <span class="cart-product__size">
            Talla: {{ packItem.size?.name }}
          </span>
        </p>
        <p class="cart-product__price">
          <span class="price">{{ formatMoney(packItem.price) }}</span>
          <span
            v-if="packItem.discount > 0"
            class="product-old-price strike"
          >
            {{ formatMoney(packItem.oldPrice) }}</span>
        </p></div>
    </a>
  </article>
</template>

<style scoped>

</style>

