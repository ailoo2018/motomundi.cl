import type {ShipmentInformation} from "@/types/checkout.types";


export const useCartSummary = () => {
  const checkoutStore = useCheckoutStore()
  const cartStore = useCartStore()

  const getTotalBeforeShipping = () =>{
    var country : Country = checkoutStore.getCountryData()

    if(country?.iso === "CL"){
      return cartStore.iva + cartStore.subtotal
    }
    return cartStore.subtotal
  }

  const getTotal = () =>{
    return getTotalBeforeShipping() + shippingCost.value
  }

  const shippingCost = computed (() => {
    console.log("computed shippingcost")

    const shippingInfo : ShipmentInformation | undefined =checkoutStore?.getShippingInfo()
    if(shippingInfo && shippingInfo.shipmentMethod){

      if(shippingInfo.shipmentMethod.freeShipping?.amount > 0){
        const freeShippingAmount : number = shippingInfo.shipmentMethod.freeShipping.amount
        if(getTotalBeforeShipping() >= freeShippingAmount)
          return 0
      }

      return shippingInfo.shipmentMethod?.price || 0
    }
    
    return 0
  })

  const subtotal = computed(() => {
    return cartStore.subtotal
  })

  const total = computed(() => {
    return getTotal()
  })

  return {
    shippingCost,
    subtotal,
    total,
  }
}
