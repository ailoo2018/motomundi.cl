<script setup lang="ts">
console.log("in recover")

const route = useRoute()

const cartStore = useCartStore()

const recoverCart = async () => {
  const cart = await cartStore.findCart( route.query.id)

  useWuid().setWuid(cart.wuid)
}


onMounted(async () => {
  await recoverCart()
  navigateTo("/cart", { external: true } )

})
</script>




