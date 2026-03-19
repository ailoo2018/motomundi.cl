import {ref} from "vue";

const shippingCost = ref({ amount: 0, currency: "CLP"})
const selectedShippingMethod = ref(0)
const shippingMethods = ref([])


export function useShipping() {




  const setShippingCost = (amount, curr) => {
    console.log("set shippingcost")
    shippingCost.value = { amount, currency: curr }
  }

  const setShippingMethodType = id => {
    const sm  = shippingMethods.value?.find(m => m.type === id)
    if(sm) {
      setShippingCost(sm.price, sm.currency)
    }
  }

  const getShippingMethod = () => {
    return shippingMethods.value?.find(m => m.type === selectedShippingMethod.value)
  }




  const listShippingMethods = async (country: any, comuna: any) : Promise<any> => {

    console.log("listShippingMethods")
    const data : any = await $fetch("/api/shipping/methods", {
      method: "GET",
      headers: { 'Content-Type': 'application/json' },
      query: {
        country,
        comuna,
      },
      async onResponseError({ response }) {
        // Access error response data here
        const errorData = response._data  // or response.body

        console.log('Error data:', errorData)
        alert("Error calling ListShippingMethods")
      },
    })


    shippingMethods.value = data.methods

    return shippingMethods.value
  }



  return {
    shippingCost,
    selectedShippingMethod,
    shippingMethods,
    getShippingMethod,

    listShippingMethods,
    setShippingCost,
    setShippingMethodType,
  }
}
