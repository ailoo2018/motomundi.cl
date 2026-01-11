import { defineStore } from 'pinia'

export const useCartStore = defineStore('cart', {
  state: () => ({
    cart: { items: [] },
    loading: false,
  }),

  actions: {
    async fetchCart(wuid) {
      this.loading = true
      try {
        const data = await $fetch('/api/cart/', { query: { wuid } })

        this.cart = data
      } finally {
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
