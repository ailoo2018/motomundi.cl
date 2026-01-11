<script setup>
import {formatMoney} from "~/@core/utils/formatters";
import {sleep} from "~/@core/utils/helpers.js";

const props = defineProps({
  couponDiscount: {
    type: Number,
    required: true,
  },
  modelValue: {
    type: Object,
    required: true,
  }
})

//const couponDiscount = ref(0)
const config = useRuntimeConfig()
const code = ref('')
const error = ref('')
const loading = ref(false)
const coupon = ref(null)
// const emit = defineEmits(['addCoupon'])


const checkoutService = inject('checkoutService')
const { couponDiscount } = checkoutService

if(props.modelValue){
  coupon.value = props.modelValue
}


watch(props,  props => {
//  couponDiscount.value = props.couponDiscount;
  coupon.value = props.modelValue;
}, { deep: true })

const handleSendCode = async () => {
  error.value = ""
  loading.value = true;
  try {
    const {data} = await useFetch(config.public.LEGACY_URL + '/Cart/AddPromoCode.rails', {
      credentials: 'include',
      method: 'POST',
      body: {
        code: code.value,
      }
    })


    console.log("Result AddCoupon", data.value);

    if (data.value.error) {
      error.value = data.value.error;
      return
    }

    coupon.value = {
      code: data.value.couponName,
      discountAmount: data.value.discount
    }

    code.value = ''
    await checkoutService.couponAdded(coupon.value)
  } finally {
    loading.value = false;
  }

}

const handleRemoveCoupon = async () => {

  if(!coupon.value){
    return;
  }

  const {data} = await useFetch(config.public.LEGACY_URL + '/Ajax/RemoveCoupon.rails?id=' + coupon.value.id, {
    credentials: 'include',
    method: 'GET',
  })

  coupon.value = null
  await checkoutService.couponAdded(null)
}

</script>

<template>

  <div class="promo-code">
    <div class="promo-code__content" style="display: block ;">
      <form class="promo-code__form" @submit.prevent="handleSendCode">
        <div class="input__group promo-code__group">
          <input id="promo-code__cart-summary" type="text" placeholder="" v-model="code">
          <label for="promo-code__cart-summary" >Código promocional o tarjeta regalo</label>
        </div>
        <div class="input__group promo-code__group">
          <button type="button" class="button button--filled" @click="handleSendCode" :disabled="loading">
            <span v-if="!loading">Aplicar</span>
            <div v-if="loading" class="spinner-container mc-spinner button-mode" style="">
              <span class="message" style="display: none;"></span>
            </div>
          </button>
        </div>
      </form>
      <span v-if="error" class="input-hint error">{{ error }}</span>
    </div>

    <article class="applied-promo-code" v-if="coupon">
      <div class="applied-promo-code__section">
        <div class="applied-promo-code__section--left">
          <div class="applied-promo-code__title"><span>PROMO CODE</span>
          </div>
          <div class="applied-promo-code__code">
            {{coupon?.code}}
          </div>
        </div>
        <div class="applied-promo-code__section--right">
          <div>
            {{ formatMoney( couponDiscount ) }}
          </div>
          <button type="button" class="applied-promo-code__delete-button">
            <span @click="handleRemoveCoupon">x</span>
          </button>
        </div>
      </div>
    </article>
  </div>

</template>

<style scoped>
.checkout .button:active, .checkout .button:focus, .checkout .button:hover {
  background-color: #000;
  border-color: #000;
  box-shadow: none;
}

.promo-code {
  margin: 40px 0;
  width:100%;
}

@media screen and (max-width: 600px){
  .promo-code {
    margin: 0 0;
    width:100%;
  }

}


.promo-code .promo-code__content {
  margin: 10px 0;
}


.promo-code .promo-code__form .promo-code__group input[type=text]:not(.browser-default):focus + label, .promo-code .promo-code__form .promo-code__group input[type=text]:not(.browser-default):not(:placeholder-shown) + label {
  font-size: 13px;
  left: 7px;
  letter-spacing: -.5px;
  line-height: 1em;
  top: 8px;
}

.applied-promo-code__section {
  align-items: center;
  display: flex;
  justify-content: space-between;
  padding: 5px 0;
  width: 100%;
}

.applied-promo-code__section--left .applied-promo-code__title {
  color: #747474;
  font-size: 11px;
  text-transform: uppercase;
}

.applied-promo-code__section--left .applied-promo-code__code {
  font-size: 15px;
}

.applied-promo-code__section--right {
  align-items: center;
  display: flex;
}

.applied-promo-code__section--right .applied-promo-code__delete-button {
  background: #e8e8e8;
  border: none;
  color: #000;
  cursor: pointer;
  font-size: 12px;
  height: 35px;
  margin-left: 15px;
  width: 35px;
}


.promo-code .promo-code__form .promo-code__group input[type=text]:not(.browser-default) + label {
  font-size: 14px;
  height: 45px;
  left: 10px;
  letter-spacing: -.5px;
  line-height: 1.1em;
}

.promo-code .promo-code__form .promo-code__group input[type=text]:not(.browser-default):focus + label, .promo-code .promo-code__form .promo-code__group input[type=text]:not(.browser-default):not(:placeholder-shown) + label {
  font-size: 13px;
  left: 7px;
  letter-spacing: -.5px;
  line-height: 0em;
}

.checkout .button:disabled {
  cursor: not-allowed;
  opacity: .4;
}

input:not([type]):focus:not([readonly]), input[type=date]:not(.browser-default):focus:not([readonly]), input[type=datetime-local]:not(.browser-default):focus:not([readonly]), input[type=datetime]:not(.browser-default):focus:not([readonly]), input[type=email]:not(.browser-default):focus:not([readonly]), input[type=number]:not(.browser-default):focus:not([readonly]), input[type=password]:not(.browser-default):focus:not([readonly]), input[type=search]:not(.browser-default):focus:not([readonly]), input[type=tel]:not(.browser-default):focus:not([readonly]), input[type=text]:not(.browser-default):focus:not([readonly]), input[type=time]:not(.browser-default):focus:not([readonly]), input[type=url]:not(.browser-default):focus:not([readonly]), textarea.materialize-textarea:focus:not([readonly]) {
  border-bottom: 1px solid #41a334;
  box-shadow: 0 1px 0 0 #41a334;
}

</style>