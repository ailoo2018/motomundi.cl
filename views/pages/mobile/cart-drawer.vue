<script setup lang="ts">
const isCartOpen = defineModel({type: Boolean, default: false})

const getCartTotal = () => {
  return 1000
}

const getTotalPoints = () => {
  return 1000
}

const cartStore = useCartStore()
const wuid = useGuestUser().value

await cartStore.fetchCart(wuid)


const loadingCheckout = ref(false)
const loadingCart = ref(false)

const handleCheckout = async () => {
  loadingCheckout.value = true
  await navigateTo("/checkout")
  loadingCheckout.value = false
  isCartOpen.value = false
}

const handleCart = async () => {
  loadingCart.value = true
  try {
    await navigateTo('/cart')
  } finally {
    loadingCart.value = false
  }
}
</script>

<template>
  <VNavigationDrawer
    id="cart-drawer"
    v-model="isCartOpen"
    temporary
    :width="400"
    location="end"
    class="d-flex flex-column overflow-y-auto"
  >
    <AppDrawerHeaderSection
      title="MI CESTA"

      @cancel="isCartOpen = false"
    />

    <VDivider/>
    <VCardText class="flex-grow-1 pa-0" >
      <div
        id="shop-cart"
        class="px-2"
      >
        <CartContent/>
      </div>
    </VCardText>

    <template #append>
      <div class="pa-4 border-t bg-surface user-menu__buy-buttons">
        <VRow>
          <div class="user-menu__cart-total">
            <p>
              Total: <strong>{{formatMoney(cartStore.cart.total)}}</strong>
            </p>
            <div class="motocoins-claim">
              <VIcon class="tabler-coin-monero-filled" color="primary"></VIcon>
              <div class="motocoins-claim__info">
                <span class="motocoins-claim__amount">
                  Acumula <strong>{{formatMoney(cartStore.cart.points)}} mundipesos</strong> con esta compra.
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

<style>
#cart-drawer .v-navigation-drawer__content {
  flex: 0 1 auto;
  height: 100%;
  max-width: 100%;
  overflow-x: hidden;
  overflow-y: auto;

}

.user-menu__buy-buttons {
  background-color: #fff;
  display: flex;
  flex-wrap: wrap;
  margin-top: auto;
}

.user-menu__buy-buttons {
  background-color: #fff;
  display: flex;
  flex-wrap: wrap;
  margin-top: auto;
}

.user-menu__buy-buttons .user-menu__cart-total {
  box-sizing: border-box;
  flex: 0 0 100%;
  padding: 0 30px 10px;
}

.user-menu__buy-buttons .user-menu__cart-total p {
  border-top: 1px solid #000;
  font-weight: 700;
  line-height: 20px;
  margin-top: 0;
  padding-top: 25px;
}

.user-menu__buy-buttons .user-menu__cart-total p {
  margin-bottom: 10px;
  padding-top: 20px;
}

.user-menu__buy-buttons .user-menu__cart-total p strong {
  float: right;
  font-size: 20px;
  font-weight: 800;
}

.motocoins-claim {
  align-items: flex-start;
  display: flex;
  font-size: 12px;
  gap: 4px;
  justify-content: flex-start;
  line-height: 1.2em;
  padding: 2px 0;
}

.user-menu__buy-buttons .user-menu__cart-total p {
  border-top: 1px solid #000;
  font-weight: 700;
  line-height: 20px;
  margin-top: 0;
  padding-top: 25px;
}

@media only screen and (max-width: 600px) {
  .user-menu__buy-buttons .user-menu__cart-total {
    padding: 0 20px 25px;
  }
}

@media only screen and (max-width: 600px) {
  .user-menu__buy-buttons .user-menu__cart-total p {
    margin-bottom: 10px;
    padding-top: 20px;
  }
}
</style>
