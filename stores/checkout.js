import { defineStore } from 'pinia'


export const useCheckoutStore = defineStore('checkout', {
  state: () => ({
    step: 1,
    customerInfo: null,
    shippingInfo: null,
    paymentInfo: null,
    user: null,
  }),
  actions: {
    setCustomerInfo(info) {
      this.customerInfo = info
      this.saveToLocalStorage()
    },
    setShippingInfo(info) {
      this.shippingInfo = info
      this.saveToLocalStorage()
    },
    setPaymentInfo(info) {
      this.paymentInfo = info
      this.saveToLocalStorage()
    },
    setCurrentUser(user) {
      this.user = user
      this.saveToLocalStorage()
    },

    saveToLocalStorage() {
      const checkoutCookie = useCookie('checkout-data', {
        maxAge: 24 * 60 * 60, // 24 hours
        sameSite: true,
      })

      checkoutCookie.value = {
        step: this.step,
        customerInfo: this.customerInfo,
        shippingInfo: this.shippingInfo,
        paymentInfo: this.paymentInfo,
      }
    },

    loadFromLocalStorage() {
      const checkoutCookie = useCookie('checkout-data')
      if (checkoutCookie.value) {
        const data = checkoutCookie.value

        this.step = data.step
        this.customerInfo = data.customerInfo
        this.shippingInfo = data.shippingInfo
        this.paymentInfo = data.paymentInfo
      }
    },

    clearCheckout() {
      this.$reset()

      const checkoutCookie = useCookie('checkout-data')

      checkoutCookie.value = null
    },
  },
  getters: {
    isCheckoutComplete() {
      return !!this.customerInfo && !!this.shippingInfo && !!this.paymentInfo
    },
  },

})
