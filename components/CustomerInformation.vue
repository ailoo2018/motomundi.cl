<script setup>
import { ref } from 'vue'
import { useCheckoutStore } from '~/stores/checkout'
import LoginDialog from "~/components/dialogs/LoginDialog.vue"

const checkoutStore = useCheckoutStore()

const { validatePhone, formatPhone } = usePhoneValidation()

const showLogin = ref(false)
const isLoading = ref(true)
const error = ref('')

const address = ref({
  id: 0,
  address: '',
  name: '',
  phone: '',
  email: '',
})

const config = useRuntimeConfig()
const addressForm = ref(null)
const user = ref(null)
const party = ref({ email: '' })

const contactEmail = ref('')
const contactPhone = ref('')
const disableEmail = ref(true)

console.log("CustomerInfo.vue")

const handleUserLoggedIn = async loginData => {
  console.log("loginData:::", loginData)
  showLogin.value = false
  await getCurrentUser(loginData)
  await getAddresses()
}

const closedLogin = () => {
  showLogin.value = false
}

const getCurrentUser = async (loginData) => {


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
    if (party.value)
      contactPhone.value = party.value.phone

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

const getAddresses = async () => {
  isLoading.value = true
  try {

    const accessToken = useCookie('accessToken').value
    if(!accessToken || accessToken === '') {
      return
    }
    console.log("accesToken: " + accessToken)

    const data = await $fetch('/api/account/addresses', {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    })



    if (data) {
      const addresses = data.addresses
      if (addresses && addresses.length > 0) {
        var defaultAddr = addresses.find(addr => addr.default)
        if (!defaultAddr) {
          defaultAddr = addresses[0]
        }

        address.value = defaultAddr
      }

    } else {
      throw new Error('No data received from the server')
    }
  } catch (err) {
    console.log("Error", err)
    error.value = err.message || 'Error al tratar de ingresar. Por favor probar nuevamente.'
  } finally {
    isLoading.value = false
  }
}

const getCustomerInfo = async () => {
  const addr = await addressForm.value.getAddress()
  if (!addr)
    return null

  const custInfo = {
    phone: contactPhone.value,
    email: contactEmail.value,
    address: addr,
  }

  checkoutStore.setCustomerInfo(custInfo)

  if (user.value) {
    checkoutStore.setCurrentUser(user.value)
  }

  console.log("CustomerInformation::getCustomerInfo", custInfo)

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
    address.value = checkoutStore.customerInfo.address

  } else {
    console.log("Loading address data")
    await getAddresses()
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
      <div
        v-if="!user"
        class="data__login-message"
      >
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
      </div>



      <div class="data__contact-details">
        <h2>Información de contacto</h2>
        <p>Usaremos estos datos para avisarte sobre el estado del pedido</p>


        <div class="form-fieldset">
          <div class="form-item half-width">
            <div class="input__group">
              <VTextField
                v-model="contactEmail"
                label="Email *"
                variant="solo"
                :disabled="disableEmail"
                class="custom-text-field"
                :rules="reqRules"
                required
              />
            </div>
          </div>
          <div class="form-item half-width">
            <div class="input__group">
              <VTextField
                v-model="contactPhone"
                label="Teléfono Movil *"
                required
                variant="solo"
                :rules="reqPhoneRules"
                class="custom-text-field"
                @input="handlePhoneInput"
              />
            </div>
          </div>
        </div>
      </div>


      <div class="data__personal-details">
        <VCard
          :loading="isLoading"
          elevation="0"
        >
          <h2>Tus datos</h2>
          <AddressForm
            ref="addressForm"
            v-model="address"
          />
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

.data__contact-details {
  margin: 10px auto 25px;
}


.data__login-message {
  background-color: #e9e9e9;
  margin: 7px auto 30px;
  padding: 20px;
  text-align: center;
}

.data {
  padding: 0 15px;
}

.steps__content > div.active {
  display: block;
}

@media only screen and (min-width: 601px) {
  .steps__content {
    padding: 15px;
  }
}

.custom-text-field {
  /* Apply styles to the container */
}

.custom-text-field :deep(.v-field__outline) {
  /* Change the border color to green */
  border-color: green !important;
}

.custom-text-field :deep(.v-field__input) {
  /* Change the background to white */
  background-color: white !important;
}

/* Ensure the background stays white when focused or filled */
.custom-text-field:hover :deep(.v-field__input),
.custom-text-field:focus-within :deep(.v-field__input) {
  background-color: white !important;
}


input#address-form__different-country33 {
  position: relative;
}
</style>
