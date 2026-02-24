import { defineStore } from 'pinia'

export const useWishlistStore = defineStore('wishlist', {
  state: () => ({
    // Initialize from cookie if it exists, otherwise empty array
    items: useCookie('wishlist_items', { default: () => [] }).value,
  }),
  actions: {

    isWished(productId) {
      const index = this.items.indexOf(productId)
      // console.log(`product: ${productId} is wished : ${index}`)
      return index !== -1
    },

    async toggleItem(productId) {
      const index = this.items.indexOf(productId)
      const cookie = useCookie('wishlist_items')

      let isSelected = false
      if (index === -1) {
        this.items.push(productId)
        isSelected = true
      } else {
        this.items.splice(index, 1)
      }

      let userId = useUser().getUserId()

      if (userId > 0) {

        try {
          await $fetch(`/api/account/wishlist/toggle?productId=${productId}`)
        } catch (error) {
          console.error('Error wishlist toggle: ' + url, error)
        }
      }

      cookie.value = this.items

      return isSelected
    },

    clear() {
      this.items = []

      const cookie = useCookie('wishlist_items')

      cookie.value = []
    },

    async sync(userId) {
      if (this.items.length > 0) {
        const data = await $fetch("/api/account/wishlist/sync", {
          method: "POST",
          body: {
            userId: userId,
            productIds: this.items, // Send the array from cookies/Pinia
          },
        })

        this.items = data.productIds

        const cookie = useCookie('wishlist_items')

        cookie.value = this.items
      }

    },


  },
})
