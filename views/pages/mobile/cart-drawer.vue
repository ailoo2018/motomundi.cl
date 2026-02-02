<script setup lang="ts">
const isCartOpen = defineModel({ type: Boolean, default: false })

const getCartTotal = () => {
  return 1000
}

const getTotalPoints = () => {
  return 1000
}

const cartStore = useCartStore()
const wuid= useGuestUser().value

await cartStore.fetchCart(wuid)


const loadingCheckout = ref(false)
const loadingCart = ref(false)

const handleCheckout = async () =>{
  loadingCheckout.value = true
  await navigateTo("/checkout")
  loadingCheckout.value = false
  isCartOpen.value = false
}

const handleCart = async () => {
  loadingCart.value = true
  try {
    await navigateTo('/cart')
  }finally {
    loadingCart.value = false
  }
}
</script>

<template>
  <VNavigationDrawer
    v-model="isCartOpen"
    temporary
    :width="400"
    location="end"
    class="d-flex flex-column"
  >
    <AppDrawerHeaderSection
      title="Mi Cesta"

      @cancel="isCartOpen = false"
    />

    <VDivider />
    <VCardText class="flex-grow-1 overflow-y-auto pa-0">
      <div id="shop-cart" class="px-2">
        <CartContent />
      </div>
    </VCardText>

    <template #append>
      <div class="pa-4 border-t bg-surface">
        <VRow>
          <div data-v-4945e36c="" class="user-menu__cart-total">
            <p data-v-4945e36c="">
              Total: <strong data-v-4945e36c="" class="ng-binding">$0</strong>
            </p>
            <div data-v-c1c58a70="" data-v-4945e36c="" class="motocoins-claim">
              <svg data-v-c1c58a70="" width="18" height="18" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" class="icon sprite-icons">
                <use data-v-c1c58a70="" href="/content/svg/motomundi.svg#i-icon-motocoin" xlink:href="/content/svg/motomundi.svg#i-icon-motocoin"></use>
              </svg>
              <div data-v-c1c58a70="" class="motocoins-claim__info">
                            <span data-v-c1c58a70="" class="motocoins-claim__amount">
                                Acumula <strong class="ng-binding">0 mundipesos</strong> con esta compra.
                            </span>
              </div>
            </div>
          </div>
        </VRow>
        <VRow no-gutters>
          <VCol
            cols="6"
            class="pe-1"
          >
            <VBtn
              rounded="0"
              size="large"
              block
              color="secondary"
              variant="tonal"
              :loading="loadingCart"
              @click="handleCart"
            >
              <VIcon
                icon="tabler-shopping-cart"
                class="me-2"
              />
              Ver Cesta
            </VBtn>
          </VCol>
          <VCol
            cols="6"
            class="ps-1"
          >
            <VBtn
              block
              color="#41a334"
              rounded="0"
              size="large"
              :loading="loadingCheckout"
              @click="handleCheckout"
            >
              <VIcon
                icon="tabler-credit-card-pay"
                class="me-2"
              />
              Pagar
            </VBtn>
          </VCol>
        </VRow>
      </div>
    </template>
  </VNavigationDrawer>
</template>
