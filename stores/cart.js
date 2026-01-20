import { defineStore } from 'pinia'

export const useCartStore = defineStore('cart', {
  state: () => ({
    cart: { wuid: null, items: [] },
    loading: false,
  }),

  actions: {
    async fetchCart(wuid) {
      this.loading = true
      try {
        const data = await $fetch('/api/cart/', { query: { wuid } })

        this.cart = data
        this.cart.wuid = wuid
      } finally {
        this.loading = false
      }
    },

    async removeItem(cartItem){
      try {
        this.loading = true

        const cart = await $fetch('/api/cart/remove-item', {
          method: 'GET',
          query: { wuid: this.cart.wuid, itemId: cartItem.id, type: cartItem.type },
        })

        console.log("returned cart", cart)

        this.cart = cart

        // this.cart = await $fetch('/api/cart/', { query: { wuid } })

      }catch(e){
        console.error(e)
      }finally{
        this.loading = false
      }
    },

    async updateQuantity(wuid, itemId, newQty) {
      // 1. Optimistic Update (Immediate UI response)
      const item = this.cart.items.find(i => i.id === itemId)
      if (!item) return

      const previousQty = item.quantity

      item.quantity = newQty

      try {
        // 2. Server Sync
        await $fetch('/api/cart/update-quantity', {
          method: 'POST',
          body: { wuid, itemId, quantity: newQty },
        })


        // 3. Optional: refresh cart to get updated totals/discounts
        const updatedCart = await $fetch('/api/cart/', { query: { wuid } })

        this.cart = updatedCart
      } catch (error) {
        // 4. Rollback if API fails
        item.quantity = previousQty
        console.error("Failed to update cart", error)
      }
    },
  },
})
