import { defineStore } from 'pinia'

export const useWishlistStore = defineStore('wishlist', {
  state: () => ({
    // Initialize from cookie if it exists, otherwise empty array
    items: useCookie('wishlist_items', { default: () => [] }).value,
  }),
  actions: {
    toggleItem(productId) {
      const index = this.items.indexOf(productId)
      const cookie = useCookie('wishlist_items')

      if (index === -1) {
        this.items.push(productId)
      } else {
        this.items.splice(index, 1)
      }

      // Sync the cookie with the new state
      cookie.value = this.items
    },

    clear() {
      this.items = []

      const cookie = useCookie('wishlist_items')

      cookie.value = []


      console.log("Wishlist cleared")
    },

    async sync(userId) {
      if (this.items.length > 0) {
        const data = await $fetch("/api/wishlist/sync", {
          method: "POST",
          body: {
            userId: userId,
            productIds: this.items, // Send the array from cookies/Pinia
          },
        })

        //
      }

    }


  },
})
