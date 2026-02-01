<script setup>
import { ref } from 'vue'
import { useCheckoutStore } from '~/stores/checkout'
import AddressForm from "~/components/AddressForm.vue"
import ClickAndCollect from "~/components/Shipping/ClickAndCollect.vue"
import { formatChileanRUT, formatDeliveryDateRange, formatMoney, isEntre } from "../@core/utils/formatters.js"

const checkoutStore = useCheckoutStore()

const address = ref('')
const city = ref('')
const state = ref('')
const zipCode = ref('')
const country = ref('')
const loading = ref(false)
const error = ref('')
const toggleComments = ref(false)
const isChangeAddress = ref(false)
const storeSelected = ref(null)
const selectedShippingMethod = ref(0)
const shippingInformation = ref({})
const shippingAddress = ref(null)
const pickupOption = ref('')
const shippingMethods = ref([])
const config = useRuntimeConfig()
const shippingComments = ref('')
const shippingRemarks = ref('')

// const  cartService  = inject('cartService')


const ShippingMethods = {
  ClickAndCollect: 1,
  HomeDelivery: 2,
  ExpressDelivery: 3,
  PickupPoint: 4,
}


if (!shippingAddress.value || !shippingAddress.value.address) {
  // get from customer information
  shippingAddress.value = checkoutStore.customerInfo.address
}


const checkoutService = inject('checkoutService')

const setCarrier = async carrierId => {
  const data = await $fetch("/api/shipping/set-carrier?id=" + carrierId, {
    method: "GET",
    headers: { 'Content-Type': 'application/json' },
    async onResponseError({ response }) {
      const errorData = response._data  // or response.body

      console.log('Error data:', errorData)
      alert("Error calling SetCarrier")
    },
  })
}

watch(selectedShippingMethod, async shipMethodCatType => {
  if(shipMethodCatType > 0 && shippingMethods.value.length > 0 ) {
    const shipMethod = shippingMethods.value.find(item => item.type === shipMethodCatType)
    if(shipMethod == null) {
      alert("Something went wrong. Shipmethod not found for type: " + shipMethodCatType)
      
      return
    }


    await setCarrier(shipMethod.id)
    await checkoutService.setShippingMethod(shipMethod)
  }
  getShippingInfo()
  checkoutStore.saveToLocalStorage()
})

const handleClickAndCollect = (store, selPickupOption) => {
  console.log("changed!", storeSelected, selPickupOption)
  storeSelected.value = store
  pickupOption.value = selPickupOption

}

const setShippingMethod = methodId => {
  console.log("setShippingMethod:" + methodId)
  selectedShippingMethod.value = methodId
  if (ShippingMethods.HomeDelivery === methodId) {

  }
}

const getShippingInfo = () => {

  const shipMethod = shippingMethods.value.find(item => item.type === selectedShippingMethod.value)

  const shippingMethod = {
    method: selectedShippingMethod.value,
    address: shippingAddress.value,
    store: storeSelected.value,
    pickupOption: pickupOption.value,
    modifiedDate: new Date(),
    carrierId: shipMethod ? shipMethod.id : 0,
    comments: shippingComments.value,
    remarks: shippingRemarks.value,
  }


  console.log("getShippingMethod", shippingMethod)
  checkoutStore.setShippingInfo(shippingMethod)

  return shippingMethod
}

const validate = async () => {

  if(!selectedShippingMethod.value) {
    return "Selecciona un método de envío"
  }


  console.log("store selected", storeSelected.value)
  if(selectedShippingMethod.value === ShippingMethods.ClickAndCollect && storeSelected.value == null){
    return "Selecciona una tienda"
  }

  return null
}

defineExpose({ getShippingInfo, validate })

const isWithinLastThreeMinutes = modifiedDate => {
  const modified = new Date(modifiedDate)
  const now = new Date()
  const diffInMs = now - modified
  const threeMinutesInMs = 3 * 60 * 1000

  return diffInMs <= threeMinutesInMs
}


const listShippingMethods = async () => {

  const { data, error: fetchError } = await useFetch ("/api/shipping/methods", {
    method: "GET",
    headers: { 'Content-Type': 'application/json' },
    async onResponseError({ response }) {
      // Access error response data here
      const errorData = response._data  // or response.body

      console.log('Error data:', errorData)
      alert("Error calling ListShippingMethods")
    },
  })


  shippingMethods.value = data.value.methods
  
  return shippingMethods.value
}

const setShippingComuna = async comunaId => {



  const wuid = useGuestUser().value

  const { data, error: fetchError } = await useFetch( "/api/cart/comuna", {
    method: "GET",
    headers: { 'Content-Type': 'application/json' },
    query: {comunaId: comunaId, wuid: wuid},
    async onResponseError({ response }) {
      alert("Error calling SetComuna", response._data)
    },
  })



}

const setShippibngAddress = async () => {
  isChangeAddress.value = false
}

const getShippingAddressName = () => {
  console.log("getShippingAddressName", shippingAddress.value)
  if(shippingAddress.value != null){
    return shippingAddress.value.name + " " + shippingAddress.value.surnames
  }
  
  return ""
}


onMounted(async () => {


  /**
   * we have a limit of three minutes, if not validate stock in store
   */
  if(checkoutStore.shippingInfo && checkoutStore.shippingInfo.modifiedDate && isWithinLastThreeMinutes( checkoutStore.shippingInfo.modifiedDate )) {
    selectedShippingMethod.value = checkoutStore.shippingInfo.method
    storeSelected.value = checkoutStore.shippingInfo.store
    shippingAddress.value = checkoutStore.shippingInfo.address
    pickupOption.value = checkoutStore.shippingInfo.pickupOption
    shippingComments.value = checkoutStore.shippingInfo.comments
    shippingRemarks.value = checkoutStore.shippingInfo.remarks

    toggleComments.value = checkoutStore.shippingInfo.comments || checkoutStore.shippingInfo.remarks

    if(selectedShippingMethod.value > 0 ){
      console.log("serarch!!!")
    }
  }else{
    console.log("Not loaded from cache")
  }

  if(shippingAddress.value && shippingAddress.value.comuna){
    console.log("shipping address", shippingAddress.value)
    await setShippingComuna(shippingAddress.value.comuna.id)
  }

  var methods = await listShippingMethods()


})
</script>

<template>
  <div class="active">
    <div class="shipping">
      <div class="shipping-methods">
        <div
          v-for="shipping in shippingMethods"
          class="shipping-method"
        >
          <!-- RETIRO TIENDA -->
          <div
            v-if="shipping.type === ShippingMethods.ClickAndCollect"
            class="shipping-method__category"
            :class="{ 'current' : selectedShippingMethod === ShippingMethods.ClickAndCollect, 'valid' : storeSelected != null && storeSelected.id > 0}"
            @click="setShippingMethod(ShippingMethods.ClickAndCollect)"
          >
            <div class="shipping-method__heading">
              <div class="shipping-method__title">
                <h3>
                  <svg
                    width="22"
                    height="23"
                    alt="Click &amp; Collect"
                    xmlns="http://www.w3.org/2000/svg"
                    class="icon sprite-line-icons"
                  >
                    <use
                      href="/svg/ailoo.svg#i-icon-checkout-click-and-collect"
                      xlink:href="/svg/ailoo.svg#i-icon-checkout-click-and-collect"
                    />
                  </svg>
                  Retiro en Tienda
                </h3>
              </div>
              <div class="shipping-method__price">
                Gratis
              </div>
            </div>
            <div class="shipping-method__body">
              <div class="shipping-method__description">
                Recoge tu pedido en una de nuestras
                tiendas. ¡Ahora en 2 horas! (según disponibilidad).
              </div>
              <div
                v-if="selectedShippingMethod === ShippingMethods.ClickAndCollect"
                class="shipping-method__content"
                style=""
              >
                <ClickAndCollect
                  :store="storeSelected"
                  :pickup-option="pickupOption"
                  :shipping-method="shipping"
                  @store-selected="handleClickAndCollect"
                />
              </div>
              <div
                class="shipping-method__features"
                style="display: none;"
              >
                <span class="features__description">-$5.000 en tu próxima compra.</span>
              </div>
            </div>
          </div>
          <!-- PICKUP POINT -->
          <div
            v-if="shipping.type === ShippingMethods.PickupPoint"
            class="shipping-method__category "
            :class="{ 'current' : selectedShippingMethod === ShippingMethods.PickupPoint, 'valid' : selectedShippingMethod === ShippingMethods.PickupPoint}"
            @click="setShippingMethod(ShippingMethods.PickupPoint)"
          >
            <div class="shipping-method__heading">
              <div class="shipping-method__title">
                <h3>
                  <svg
                    width="22"
                    height="23"
                    alt="Punto de recogida"
                    xmlns="http://www.w3.org/2000/svg"
                    class="icon sprite-line-icons"
                  >
                    <use
                      href="/svg/ailoo.svg#i-icon-checkout-pickup"
                      xlink:href="/svg/ailoo.svg#i-icon-checkout-pickup"
                    />
                  </svg>
                  Punto de recogida
                </h3>
              </div>
              <div class="shipping-method__price">
                Gratis
                <span class="old-price">$4.900</span>
              </div>
            </div>
            <div class="shipping-method__body">
              <div class="shipping-method__description">
                Recíbelo entre el <strong>22 y el 23 de
                  octubre</strong>.
              </div>
              <div
                class="shipping-method__content"
                style="display:none;"
              />
            </div>
          </div>
          <!-- HOMEDELIVERY - NORMAL -->
          <div
            v-if="shipping.type === ShippingMethods.HomeDelivery"
            class="shipping-method__category"
            :class="{ 'current' : selectedShippingMethod === ShippingMethods.HomeDelivery, 'valid' : shippingAddress != null }"
            @click="setShippingMethod(ShippingMethods.HomeDelivery)"
          >
            <div class="shipping-method__heading">
              <div class="shipping-method__title">
                <h3>
                  <svg
                    width="22"
                    height="23"
                    alt="Envío a domicilio"
                    xmlns="http://www.w3.org/2000/svg"
                    class="icon sprite-line-icons"
                  >
                    <use
                      href="/svg/ailoo.svg#i-icon-checkout-shipping"
                      xlink:href="/svg/ailoo.svg#i-icon-checkout-shipping"
                    />
                  </svg>
                  Envío a domicilio
                </h3>
              </div>
              <div class="shipping-method__price">
                {{ shipping.price === 0 ? 'Gratis' : formatMoney(shipping.price) }}
                <span
                  v-if="shipping.oldPrice !== shipping.price"
                  class="old-price"
                >{{ formatMoney(shipping.oldPrice) }}</span>
              </div>
            </div>
            <div class="shipping-method__body">
              <div class="shipping-method__description">
                Recíbelo {{ isEntre(shipping.eta) }} <strong>{{ formatDeliveryDateRange( shipping.eta ) }}</strong>.
              </div>
              <div
                v-if="selectedShippingMethod === ShippingMethods.HomeDelivery"
                class="shipping-method__content"
                astyle="display:none;"
              >
                <div
                  class="home-delivery"
                  astyle="display:none;"
                >
                  <div>
                    <div class="address__info">
                      <div class="address__content">
                        <p class="address__name">
                          {{ getShippingAddressName() }}<span>, {{ formatChileanRUT( shippingAddress.rut ) }} </span>
                        </p>
                        <p class="address__address">
                          {{ shippingAddress.address }}, {{ shippingAddress.comuna != null ? shippingAddress.comuna.name : '' }}, Chile
                        </p>
                      </div>
                      <button
                        class="button button--light button--small address__modify"
                        @click="isChangeAddress = true"
                      >
                        Cambiar
                      </button>
                    </div>
                  </div>
                  <div
                    v-if="isChangeAddress"
                    xstyle="display:none;"
                  >
                    <AddressForm v-model="shippingAddress" />
                    <div class="form-actions align-left">
                      <button
                        class="button"
                        @click="setShippibngAddress"
                      >
                        Guardar
                      </button>
                      <button
                        class="button button--outline"
                        @click="isChangeAddress = false"
                      >
                        Cancelar
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- EXPRESS DELIVERY -->
          <div
            v-if="shipping.type === ShippingMethods.ExpressDelivery"
            class="shipping-method__category"
            :class="{ 'current' : selectedShippingMethod === ShippingMethods.ExpressDelivery, 'valid' : shippingAddress != null }"
            @click="setShippingMethod(ShippingMethods.ExpressDelivery)"
          >
            <div class="shipping-method__heading">
              <div class="shipping-method__title">
                <h3>
                  <svg
                    width="22"
                    height="23"
                    alt="Envío Express"
                    xmlns="http://www.w3.org/2000/svg"
                    class="icon sprite-line-icons"
                  >
                    <use
                      href="/svg/ailoo.svg#i-icon-checkout-express-shipping"
                      xlink:href="/svg/ailoo.svg#i-icon-checkout-express-shipping"
                    />
                  </svg>
                  Envío Express
                </h3>
              </div>
              <div class="shipping-method__price">
                {{ shipping.price === 0 ? 'Gratis' : formatMoney(shipping.price) }}
                <span
                  v-if="shipping.oldPrice !== shipping.price"
                  class="old-price"
                >{{ formatMoney(shipping.oldPrice) }}</span>
              </div>
            </div>
            <div class="shipping-method__body">
              <div class="shipping-method__description">
                Recíbelo el <strong>{{ shipping.eta }}</strong>.
              </div>
              <div class="shipping-method__content">
                <div class="express-delivery">
                  <div>
                    <div class="address__info">
                      <div class="address__content">
                        <p class="address__name">
                          {{ shippingAddress != null ? shippingAddress.name : '' }}<span>, {{ shippingAddress.rut }} </span>
                        </p>
                        <p class="address__address">
                          {{ shippingAddress.address }}, {{ shippingAddress.comuna != null ? shippingAddress.comuna.name : '' }}, Chile
                        </p>
                      </div>
                      <button class="button button--light button--small address__modify">
                        Cambiar
                      </button>
                    </div>
                  </div>
                  <div style="display:none;">
                    <div class="address-form form-fieldset">
                      <div class="form-item half-width">
                        <div class="input__group">
                          <input
                            id="address-form__name74"
                            type="text"
                            placeholder=" "
                            maxlength="255"
                            class=""
                          > <label for="address-form__name74">Nombre *</label>
                        </div>
                      </div>
                      <div class="form-item half-width">
                        <div class="input__group">
                          <input
                            id="address-form__surnames74"
                            type="text"
                            placeholder=" "
                            maxlength="255"
                            class=""
                          > <label for="address-form__surnames74">Apellido *</label>
                        </div>
                      </div>
                      <div class="form-item full-width">
                        <div class="input__group">
                          <div>
                            <input
                              id="address-form__address74"
                              type="text"
                              placeholder=" "
                              maxlength="255"
                              autocomplete="street-address"
                              value=""
                            > <label for="address-form__address74">Calle y número *</label>
                          </div>
                        </div>
                      </div>
                      <div class="form-item full-width">
                        <div class="input__group">
                          <input
                            id="address-form__floor74"
                            type="text"
                            placeholder=" "
                            maxlength="50"
                            class=""
                          > <label for="address-form__floor74">Piso, puerta, otros (Opcional)</label>
                        </div>
                      </div>
                      <div class="form-item half-width">
                        <div class="input__group">
                          <input
                            id="address-form__city74"
                            type="text"
                            placeholder=" "
                            maxlength="255"
                            class=""
                          > <label for="address-form__city74">Localidad *</label>
                        </div>
                      </div>
                      <div class="form-item half-width">
                        <div class="input__group">
                          <input
                            id="address-form__postal-code74"
                            type="text"
                            placeholder=" "
                            maxlength="255"
                            class=""
                          > <label for="address-form__postal-code74">Código Postal *</label>
                        </div>
                      </div>
                      <div class="form-item half-width">
                        <div class="input__group">
                          <div class="motocard-select select--light select--small select--with-label">
                            <div
                              dir="auto"
                              class="v-select vs--single vs--searchable"
                            >
                              <div
                                id="vs9__combobox"
                                role="combobox"
                                aria-expanded="false"
                                aria-owns="vs9__listbox"
                                aria-label="Search for option"
                                class="vs__dropdown-toggle"
                              >
                                <div class="vs__selected-options">
                                  <span class="vs__selected"><div>
                                    Málaga
                                  </div> </span> <input
                                    id="address-form__state74"
                                    aria-autocomplete="list"
                                    aria-labelledby="vs9__combobox"
                                    aria-controls="vs9__listbox"
                                    type="search"
                                    autocomplete="one-time-code"
                                    class="vs__search vs__hidden_input"
                                  >
                                </div>
                                <div class="vs__actions">
                                  <button
                                    type="button"
                                    title="Clear Selected"
                                    aria-label="Clear Selected"
                                    class="vs__clear"
                                    style="display: none;"
                                  >
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      width="10"
                                      height="10"
                                    >
                                      <path d="M6.895455 5l2.842897-2.842898c.348864-.348863.348864-.914488 0-1.263636L9.106534.261648c-.348864-.348864-.914489-.348864-1.263636 0L5 3.104545 2.157102.261648c-.348863-.348864-.914488-.348864-1.263636 0L.261648.893466c-.348864.348864-.348864.914489 0 1.263636L3.104545 5 .261648 7.842898c-.348864.348863-.348864.914488 0 1.263636l.631818.631818c.348864.348864.914773.348864 1.263636 0L5 6.895455l2.842898 2.842897c.348863.348864.914772.348864 1.263636 0l.631818-.631818c.348864-.348864.348864-.914489 0-1.263636L6.895455 5z" />
                                    </svg>
                                  </button>
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="14"
                                    height="10"
                                    role="presentation"
                                    class="vs__open-indicator"
                                  >
                                    <path d="M9.211364 7.59931l4.48338-4.867229c.407008-.441854.407008-1.158247 0-1.60046l-.73712-.80023c-.407008-.441854-1.066904-.441854-1.474243 0L7 5.198617 2.51662.33139c-.407008-.441853-1.066904-.441853-1.474243 0l-.737121.80023c-.407008.441854-.407008 1.158248 0 1.600461l4.48338 4.867228L7 10l2.211364-2.40069z" />
                                  </svg>
                                  <div
                                    class="vs__spinner"
                                    style="display: none;"
                                  >
                                    Loading...
                                  </div>
                                </div>
                              </div>
                              <ul
                                id="vs9__listbox"
                                role="listbox"
                                style="display: none; visibility: hidden;"
                              />
                            </div>
                          </div>
                          <label for="address-form__state74">Provincia</label>
                        </div>
                      </div>
                      <div class="form-item half-width">
                        <div class="input__group">
                          <div class="motocard-select select--light select--small select--with-label">
                            <div
                              dir="auto"
                              class="v-select vs--single vs--searchable vs--disabled"
                            >
                              <div
                                id="vs3__combobox"
                                role="combobox"
                                aria-expanded="false"
                                aria-owns="vs3__listbox"
                                aria-label="Search for option"
                                class="vs__dropdown-toggle"
                              >
                                <div class="vs__selected-options">
                                  <span class="vs__selected"><div>
                                    España
                                  </div> </span> <input
                                    id="address-form__country74"
                                    disabled="disabled"
                                    aria-autocomplete="list"
                                    aria-labelledby="vs3__combobox"
                                    aria-controls="vs3__listbox"
                                    type="search"
                                    autocomplete="one-time-code"
                                    value=""
                                    class="vs__search vs__hidden_input"
                                  >
                                </div>
                                <div class="vs__actions">
                                  <button
                                    disabled="disabled"
                                    type="button"
                                    title="Clear Selected"
                                    aria-label="Clear Selected"
                                    class="vs__clear"
                                    style="display:none;"
                                  >
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      width="10"
                                      height="10"
                                    >
                                      <path d="M6.895455 5l2.842897-2.842898c.348864-.348863.348864-.914488 0-1.263636L9.106534.261648c-.348864-.348864-.914489-.348864-1.263636 0L5 3.104545 2.157102.261648c-.348863-.348864-.914488-.348864-1.263636 0L.261648.893466c-.348864.348864-.348864.914489 0 1.263636L3.104545 5 .261648 7.842898c-.348864.348863-.348864.914488 0 1.263636l.631818.631818c.348864.348864.914773.348864 1.263636 0L5 6.895455l2.842898 2.842897c.348863.348864.914772.348864 1.263636 0l.631818-.631818c.348864-.348864.348864-.914489 0-1.263636L6.895455 5z" />
                                    </svg>
                                  </button>
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="14"
                                    height="10"
                                    role="presentation"
                                    class="vs__open-indicator"
                                  >
                                    <path d="M9.211364 7.59931l4.48338-4.867229c.407008-.441854.407008-1.158247 0-1.60046l-.73712-.80023c-.407008-.441854-1.066904-.441854-1.474243 0L7 5.198617 2.51662.33139c-.407008-.441853-1.066904-.441853-1.474243 0l-.737121.80023c-.407008.441854-.407008 1.158248 0 1.600461l4.48338 4.867228L7 10l2.211364-2.40069z" />
                                  </svg>
                                  <div
                                    class="vs__spinner"
                                    style="display:none;"
                                  >
                                    Loading...
                                  </div>
                                </div>
                              </div>
                              <ul
                                id="vs3__listbox"
                                role="listbox"
                                style="display:none;visibility:hidden;"
                              />
                            </div>
                          </div>
                          <label for="address-form__country74">País</label>
                        </div>
                      </div>
                    </div>
                    <div class="form-actions align-left">
                      <button class="button">
                        Guardar
                      </button>
                      <button class="button button--outline">
                        Cancelar
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>


      <div class="shipping__gift-options">
        <h3>
          <svg
            width="22"
            height="23"
            alt="¿Es un regalo?"
            xmlns="http://www.w3.org/2000/svg"
            class="icon sprite-line-icons"
          >
            <use
              href="/svg/ailoo.svg#i-icon-checkout-gift"
              xlink:href="/svg/ailoo.svg#i-icon-checkout-gift"
            />
          </svg>
          ¿Es un regalo?
        </h3>
        <div class="form-item full-width">
          <div class="input__group">
            <input
              id="gift-options"
              type="checkbox"
              class="styled-checkbox"
            > <label for="gift-options">
              Ocultar información de precios en la caja.
            </label>
          </div>
        </div>
      </div>
      <div
        class="shipping__extra-info "
        :class="{ 'collapsed' : !toggleComments}"
      >
        <h3
          class="toggle"
          @click="toggleComments = !toggleComments"
        >
          Comentarios sobre el pedido
          <svg
            width="14"
            height="14"
            xmlns="http://www.w3.org/2000/svg"
            class="icon sprite-line-icons"
          >
            <use
              href="/svg/ailoo.svg#i-icon-angle-up"
              xlink:href="/svg/ailoo.svg#i-icon-angle-up"
            />
          </svg>
        </h3>
        <div class="form-fieldset">
          <div class="form-item full-width">
            <div class="input__group">
              <textarea
                id="shipping__comments"
                v-model="shippingComments"
                placeholder=" "
                maxlength="75"
              >
                        wrap="off"></textarea>
              <label for="shipping__comments">
                Comentarios sobre la entrega o localización
              </label>
            </div>
          </div>
          <div class="form-item full-width">
            <div class="input__group">
              <textarea
                id="shipping__remarks"
                v-model="shippingRemarks"
                placeholder=" "
                maxlength="75"
              >
                        wrap="off"></textarea>
              <label for="shipping__remarks">
                Observaciones para Motomundi
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<style scoped>
.shipping-method__category .shipping-method__content {
  font-size: 14px;
  padding: 15px 0 5px;
}

.address__info .address__content .address__name {
  font-weight: 700;
}

.shipping-method__category {
  border: 1px solid #d3d3d3;
  border-radius: 4px;
  cursor: pointer;
  margin: 10px;
  padding: 15px 12px 18px;
  transition: all .4s ease;
}

.shipping-method__category .shipping-method__heading .shipping-method__title {
  align-items: center;
  display: flex;
  gap: 5px;
  justify-content: flex-start;
}

.shipping-method__category .shipping-method__heading .shipping-method__price {
  font-weight: 700;
  position: relative;
  text-transform: uppercase;
}

.shipping-method__category .shipping-method__heading .shipping-method__title h3 {
  align-items: center;
  display: flex;
  font-size: 16px;
  gap: 5px;
  margin: 5px 0;
}

.shipping-method__category .shipping-method__heading {
  align-items: center;
  display: flex;
  justify-content: space-between;
}

.shipping-method__category .shipping-method__features {
  font-size: 14px;
  font-weight: 700;
  margin-top: 7px;
}

.shipping-method__category .shipping-method__features .features__description {
  color: #41a334;
}

.shipping__extra-info textarea {
  min-height: 0;
  min-height: auto;
  overflow: hidden;
  resize: none;
}

.input__group input[type=checkbox] ~ label, .input__group input[type=radio] ~ label {
  cursor: pointer;
  position: relative;
  width: 100%;
}

.shipping__gift-options .input__group, .shipping__gift-options h3 {
  align-items: center;
  display: flex;
  gap: 5px;
}

.shipping__gift-options .input__group input[type=checkbox] ~ label {
  font-size: 14px;
}

.shipping__gift-options .input__group input[type=checkbox] ~ label {
  font-size: 14px;
}

.shipping__gift-options .input__group, .shipping__gift-options h3 {
  align-items: center;
  display: flex;
  gap: 5px;
}

.shipping-method__category.current.valid {
  background-color: #d9edd7;
  border-color: #96cd91;
}

.shipping-method__category:hover {
  background-color: #eaeaea;
  border-color: #b4b4b4;
}

.shipping__extra-info {
  padding: 0 15px;
}

.shipping__extra-info h3 {
  align-items: center;
  display: flex;
  font-size: 16px;
  gap: 5px;
  margin: 5px 0 10px;
}

.shipping__extra-info.collapsed svg {
  -webkit-transform: rotate(180deg);
  transform: rotate(180deg);
}

.shipping-method__category.current.valid {
  background-color: #d9edd7;
  border-color: #96cd91;
}

.shipping-method__category {
  border: 1px solid #d3d3d3;
  border-radius: 4px;
  cursor: pointer;
  margin: 10px;
  padding: 15px 12px 18px;
  transition: all .4s ease;
}

.address__info {
  align-items: center;
  display: flex;
  gap: 10px;
  justify-content: space-between;
  padding: 7px 0;
}

.address__info .address__modify {
  flex: 0 0 auto;
  margin: 0 !important;
}


.shipping-method__category.current {
  background-color: #e9e9e9;
  border-color: #8e8e8e;
  cursor: default;
}

.shipping__extra-info .form-fieldset {
  height: auto;
  opacity: 1;
}

.shipping__extra-info.collapsed .form-fieldset {
  height: 0;
  opacity: 0;
}

.shipping__gift-options {
  margin: 30px 0;
  padding: 0 15px;
}

.shipping-method__category .shipping-method__heading .shipping-method__price .old-price {
  display: block;
  font-size: 12px;
  font-weight: 400;
  margin: 0;
  text-align: right;
  -webkit-text-decoration: line-through;
  text-decoration: line-through;
}


.shipping__gift-options {
  margin: 30px 0;
  padding: 0 15px;
}

.shipping__gift-options .input__group[data-v-ab1eaab8], .shipping__gift-options h3 {
  align-items: center;
  display: flex;
  gap: 5px;
  padding: 10px 0;
}


textarea {
  border: 1px solid #d8d8d8;
}
</style>
