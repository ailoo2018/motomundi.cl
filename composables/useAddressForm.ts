import {useCountryDetection} from "@/composables/useCountryDetection"
import {computed, ref, watch} from "vue"
import {COUNTRIES} from "@/models/countries"


const selectedAddress = ref()


const isLoading = ref(false)
const idNumber = ref('')
const name = ref('')
const surname = ref('')
const addressLine1 = ref('')
const addressLine2 = ref('')
const state = ref('')
const city = ref('')
const postalCode = ref('')
const comuna = ref('')
const selectedIdType = ref('')


export function useAddressForm() {

  console.log("useAddressForm")


  const isLoading = ref(false)

  const {selectedCountryData, changeCountry} = useCountryDetection()


  const selectedCountry = computed({
    get() {
      return COUNTRIES.find(c => {
        return c.code.toLowerCase() === selectedCountryData?.value.iso.toLowerCase()
      })
    },

    set(newValue) {
      changeCountry(newValue.value)
    },
  })

  const countryItems = computed(() =>
    COUNTRIES.map(c => ({name: `${c.name}`, value: c.code})),
  )

  const country = computed(() =>
    COUNTRIES.find(c => c.code === selectedCountry.value?.code) || COUNTRIES[0],
  )

  const getAddresses = async () => {
    isLoading.value = true
    try {

      const accessToken = useCookie('accessToken').value
      if (!accessToken || accessToken === '') {
        return
      }
      console.log("accesToken: " + accessToken)

      const data = await $fetch('/api/account/addresses', {
        method: 'GET',
        headers: {'Content-Type': 'application/json'},
      })

      if((!addressLine1.value || addressLine1.value.length === 0) && data.addresses?.length > 0){
        setAddress(data.addresses[0])
      }

      return data.addresses

    } catch (err) {
      console.log("Error", err)
      error.value = err.message || 'Error al tratar de ingresar. Por favor probar nuevamente.'
    } finally {
      isLoading.value = false
    }
  }


  const getAddress = () => {


    return {
      countryCode: selectedCountry.value?.code,
      countryName: country.value?.name,
      idType: selectedIdType.value,
      nif: idNumber.value,
      name: name.value,
      surnames: surname.value,
      address: addressLine1.value,
      address2: addressLine2.value,
      state: state.value,
      city: city.value,
      comuna: comuna.value,
      postalCode: postalCode.value,
      dialCode: country.value?.dialCode,
    }
  }

  const setIdType = () => {
    let idType = null
    if (!idType && selectedCountry.value) {
      selectedIdType.value = selectedCountry.value?.idTypes[0]?.value || ''
    }
  }


  const setAddress = addr => {

    if(!addr)
      return

    console.log("useAddressForm::setAddress " + JSON.stringify(addr))
    name.value = addr.name
    surname.value = addr.surnames
    idNumber.value = addr.nif
    name.value = addr.name
    surname.value = addr.surnames
    addressLine1.value = addr.address
    addressLine2.value = addr.address2
    postalCode.value = addr.postalCode
    comuna.value = addr.comuna
    state.value = addr.state
    city.value = addr.city
    selectedIdType.value = addr.idType

    if (addr.country === "CL") {
      selectedIdType.value = selectedIdType.value = selectedCountry.value?.idTypes[0]?.value || ''
    }


    /*
      const state = ref(props.modelValue?.state || '')
      const city = ref(props.modelValue?.city || '')
    */

  }

  const isChile = computed(() => selectedCountry.value?.code === 'CL')

  watch(selectedAddress, newVal => {
    setAddress(newVal)
  })

  watch(postalCode, (newVal, oldVal) => {
    console.log("Postal code changed! " + newVal + " " + oldVal)
  })

  watch(selectedCountry, newVal => {
    setIdType()
    comuna.value = null
  //  form.value?.resetValidation()
  })

  return {
    COUNTRIES,
    selectedCountry,
    selectedIdType,
    country,
    countryItems,
    isChile,
    setIdType,

    getAddresses,
    setAddress,
    getAddress,

    selectedAddress,
    isLoading,

    idNumber,
    name,
    surname,
    addressLine1,
    addressLine2,
    state,
    city,
    postalCode,
    comuna,

  }
}
