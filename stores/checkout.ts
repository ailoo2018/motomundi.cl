import { defineStore } from 'pinia'
import {Customer} from "mercadopago";
import type {CustomerInformation, ShipmentInformation} from "@/types/checkout.types";

interface CheckoutState {
  step: number;
  countryData: Country | null;
  customerInfo: CustomerInformation | null;
  shippingInfo: ShipmentInformation | null;
  paymentInfo: any | null;
  user: any | null;
}


export const useCheckoutStore = defineStore('checkout', {
  state: (): CheckoutState => ({
    step: 1,
    countryData: null,
    customerInfo:  null,
    shippingInfo: null,
    paymentInfo: null,
    user: null,
  }),
  actions: {
    setCustomerInfo(info : CustomerInformation) {
      console.log("useCheckoutStore::setCustomerInfo: " + JSON.stringify(info))
      this.customerInfo = info
      this.saveToLocalStorage()
    },
    setCountryData(countryData : Country) {
      this.countryData = countryData
      this.saveToLocalStorage()
    },
    getCountryData() : Countrty {
      return this.countryData
    },
    setShippingInfo(info : ShipmentInformation) {
      this.shippingInfo = info
      this.saveToLocalStorage()
    },
    getShippingInfo() : ShipmentInformation{
      return this.shippingInfo
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
        countryData: this.countryData,
        shippingInfo: this.shippingInfo,
        paymentInfo: this.paymentInfo,
      }
    },

    loadFromLocalStorage() {

      console.log("useCheckoutStore::loadFromLocalStorage")
      const checkoutCookie = useCookie('checkout-data')
      if (checkoutCookie.value) {
        const data = checkoutCookie.value

        this.step = data.step
        this.customerInfo = data.customerInfo
        this.countryData = data.countryData
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
