<script setup>
import App from "@/App.vue"

const loading = ref(false)

const selectedCountry = ref()
const selectedCurrency = ref()
const selectedAmount = ref(100)

const countries = [
  { id: "AR", name: "Argentina" },
  { id: "CL", name: "Chile" },
  { id: "BR", name: "Brazil" },
]

const handleCheckout = async () => {
  loading.value = true
  try {
    const { data } = await useFetch('/api/payments/dlocal', {
      method: 'POST',
      body: {
        amount: selectedAmount.value,
        currency: selectedCurrency.value,
        country: selectedCountry.value, // User's country code
      },
    })

    if (data.value?.redirect_url) {
      // Redirect the user to dLocal's hosted checkout
      window.location.href = data.value.redirect_url
    }
  } catch (err) {
    console.error("Payment initiation failed", err)
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <VContainer class="pa-5">
    <VCard
      max-width="700px"
      class="ma-auto pa-5"
      title="Prueba DLocal"
    >
      <VCardText>
        <AppSelect
          v-model="selectedCountry"
          :items="countries"
          item-title="name"
          item-value="id"
          label="País"
          placecholder="Seleccione moneda"
        />
        <AppSelect
          v-model="selectedCurrency"
          :items="['CLP', 'USD']"
          label="Moneda"
          placecholder="Seleccione moneda"
        />
        <AppTextField
          v-model="selectedAmount"
          label="Monto"
        />

      </VCardText>
      <VCardActions>
        <VBtn
          :disabled="loading"
          @click="handleCheckout"
        >
          {{ loading ? 'Processing...' : 'Pay with Local Methods' }}
        </VBtn>

      </VCardActions>
    </VCard>
  </VContainer>

</template>
