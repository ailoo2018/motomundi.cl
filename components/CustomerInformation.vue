<script setup>
import { ref } from 'vue'
import { useCheckoutStore } from '~/stores/checkout'
import LoginDialog from "~/components/dialogs/LoginDialog.vue"
import { useCheckout } from "@/composables/useCheckout.js"


const checkoutStore = useCheckoutStore()

const { validatePhone, formatPhone } = usePhoneValidation()

const showLogin = ref(false)
const isLoading = ref(false)
// const isLoading = ref(true)
const error = ref('')



const config = useRuntimeConfig()
const addressForm = ref(null)
const user = ref(null)
const party = ref({ email: '' })

const contactEmail = ref('')
const contactPhone = ref('')
const disableEmail = ref(true)

console.log("CustomerInfo.vue")

// const { getAddresses, selectedAddress, isLoading } = useAddressForm()


const handleUserLoggedIn = async loginData => {
  console.log("CustomerInformation::handleUserLoggedIn", loginData)
  showLogin.value = false
  await getCurrentUser(loginData)
  await addressForm.value.getAddresses()
}

const closedLogin = () => {
  showLogin.value = false
}

const getCurrentUser = async loginData => {

  const accessToken = useCookie('accessToken').value

  if (accessToken || loginData) {

    const  data  = await $fetch('/api/account/user', {
      method: 'GET',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },

    })

    console.log("Return CurrentUser.rails", data)
    if (data && data.id > 0) {
      user.value = data
    }

    if (data && data.person && data.person.id > 0) {
      party.value = data.person
    }



    if (user.value)
      contactEmail.value = user.value.username
    if (party.value) {
      let phone = "" + party.value.phone
      contactPhone.value = phone.replace(/\D/g, "")
    }

    if (contactEmail.value && contactEmail.value.length > 0) {
      disableEmail.value = true
    } else {
      disableEmail.value = false
    }


    return user.value
  } else {
    return null
  }
}


const getCustomerInfo = async () => {
  console.log("CustomerInformation::getCustomerInfo")

  const addr = addressForm.value.getCustomerAddress()
  if (!addr)
    return null

  const custInfo = {
    phone: contactPhone.value,
    email: contactEmail.value,
    address: addr,
  }

  console.log("CustomerInformation::getCustomerInfo: " + JSON.stringify(custInfo))
  checkoutStore.setCustomerInfo(custInfo)



  if (user.value) {
    checkoutStore.setCurrentUser(user.value)
  }



  return custInfo
}

const validate = async () => {
  var errMsg = await addressForm.value.validate()
  if (errMsg) {
    return errMsg
  }

  if (!contactPhone.value || !contactEmail.value)
    return "Hay errores en el formulario. Por favor, revisa los campos e inténtalo de nuevo."

  return null
}

defineExpose({ getCustomerInfo, validate })


onMounted(async () => {

  // FOR SOME REASON I HAVE TO CALL TWICE. STARTED WHEN I CONFIGURED PROXY
  let currentUser = await getCurrentUser()
  if (!currentUser) {
    currentUser = await getCurrentUser()
  }

  console.log("CustomerInformation::onMounted currentUser", currentUser)

  disableEmail.value = (currentUser && currentUser.id > 0)

  if (
    checkoutStore.customerInfo && (
      (checkoutStore.user && currentUser && checkoutStore.user.id == currentUser.id)
      || (!checkoutStore.user && !currentUser))
  ) {
    console.log("Getting cached data ", checkoutStore.customerInfo)
    isLoading.value = false

    user.value = checkoutStore.user
    contactEmail.value = checkoutStore.customerInfo.email
    contactPhone.value = checkoutStore.customerInfo.phone
   // selectedAddress.value = checkoutStore.customerInfo.address

  } else {
    console.log("Loading address data")

  }

})

const reqRules = [
  v => !!v || 'El campo es requerido',
]

const reqPhoneRules = [
  v => !!v || 'El campo es requerido',
  v => {
    console.log("validate " + v, formatPhone(v))
    if (!validatePhone(v))
      return 'Teléfono no valido'

    return null
  },
]


const handlePhoneInput = event => {
  const input = event.target

  contactPhone.value = formatPhone(input.value)

//  isValid.value = validateRut(rut.value);
}
</script>

<template>
  <LoginDialog
    v-model:is-dialog-visible="showLogin"
    @user-logged-in="handleUserLoggedIn"
    @closed="closedLogin"
  />

  <div class="active">
    <div class="data">
      <VCard
        v-if="!user"
        elevation="0"
        class="data__login-message ma-2 rounded-0"
      >
        <VCardText class="pa-3">
          <p>Completa tu pedido más rápido</p>
          <a @click="showLogin = true">
            <span>Inicia sesión</span>
            <svg
              width="13"
              height="13"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 14 14"
              class="icon sprite-line-icons"
            >
              <title>Inicia sesión</title>
              <use
                href="/svg/ailoo.svg#i-icon-arrow-right"
                xlink:href="/svg/ailoo.svg#i-icon-arrow-right"
              />
            </svg>
          </a>
        </VCardText>
      </VCard>


      <VCard
        :loading="isLoading"
        elevation="0"
      >
        <VCardText class="pa-1 ma-1 pa-md-2 ma-md-2">
          <div>
            <h2>Información de contacto</h2>
            <p class="ma-2">
              Usaremos estos datos para avisarte sobre el estado del pedido
            </p>


            <VRow class="ma-0 pa-0  ">
              <VCol
                cols="12"
                md="6"
                lg="6"
                xl="6"
                class="pa-0 pr-2 mt-4"
              >
                <VTextField
                  v-model="contactEmail"
                  label="Email *"
                  variant="solo"
                  :disabled="disableEmail"
                  :rules="reqRules"
                  required
                />
              </VCol>
              <VCol
                cols="12"
                md="6"
                lg="6"
                xl="6"
                class="pa-0 mt-4"
              >
                <VTextField
                  v-model="contactPhone"
                  label="Teléfono Movil *"
                  required
                  variant="solo"
                  :rules="reqPhoneRules"
                  @input="handlePhoneInput"
                />
              </VCol>
            </VRow>
          </div>
        </VCardText>
      </VCard>


      <div class="data__personal-details">
        <VCard
          :loading="isLoading"
          elevation="0"
        >
          <VCardText class="pa-1 ma-1 pa-md-2 ma-md-2">
            <h2>Tus datos</h2>

            <AddressForm ref="addressForm"/>
          </VCardText>
        </VCard>
      </div>
    </div>
  </div>
</template>


<style scoped>
.checkout h2 {
  font-size: 18px;
  font-weight: 700;
  margin: 5px 0 20px;
  padding: 0;
  text-transform: uppercase;
}


.data__login-message {
  background-color: #e9e9e9;
  margin: 7px auto 30px;
  padding: 20px;
  text-align: center;
}


.steps__content > div.active {
  display: block;
}

@media only screen and (min-width: 601px) {
  .steps__content {
    padding: 15px;
  }
}

.custom-text-field :deep(.v-field__outline) {
  border-color: green !important;
}

.custom-text-field :deep(.v-field__input) {
  background-color: white !important;
}

.custom-text-field:hover :deep(.v-field__input),
.custom-text-field:focus-within :deep(.v-field__input) {
  background-color: white !important;
}


</style>
