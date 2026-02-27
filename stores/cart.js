import { defineStore } from 'pinia'

export const useCartStore = defineStore('cart', {
  state: () => ({
    coupon: null,
    cart: { wuid: null, items: [] },
    loading: false,
    isApplyingCoupon: false,
  }),
  getters: {
    points: state => state.total * .02,
    items: state => state.items,
    subtotal: state => state.cart.items.reduce((acc, item) => acc + (item.price * item.quantity)/1.19, 0),
    total: state => {
      let discount = state.coupon?.discount || 0

      return (state.cart.items.reduce((acc, item) => acc + (item.price * item.quantity), 0) ) - discount || 0
    },
    iva: state =>{
      return (state.total - state.subtotal) || 0
    },
  },
  actions: {

    async onCartModified(){
      await this.reapplyCoupon()
    },

    async reapplyCoupon() {
      if (!this.coupon) return

      try {
        this.isApplyingCoupon = true

        console.log("reapply: " + this.coupon.name)
        await this.addCoupon(this.coupon.name)
      } catch (e) {
        // If the cart no longer meets coupon requirements, clear it

        this.coupon = null
      }finally{
        this.isApplyingCoupon = false
      }
    },

    async findCart(id){
      this.loading = true
      try {
        const data = await $fetch('/api/cart/find-by-id', { query: { id } })

        this.cart = data
        this.cart.wuid = data.wuid
        this.cart.items.forEach(i => i.loading = false)
        
        return this.cart
      } finally {
        this.loading = false
      }

    },


    async addCoupon(code) {
      this.loading = true
      try {
        const data = await $fetch('/api/checkout/promocode', {
          credentials: 'include',
          method: 'POST',
          body: {
            code: code,
          },
        })

        this.coupon = data.coupon
      }finally {
        this.loading = false
      }


    },

    async fetchCart(wuid) {
      this.loading = true
      try {
        const data = await $fetch('/api/cart/', { query: { wuid } })

        this.cart = data
        this.cart.wuid = wuid
        this.cart.items.forEach(i => i.loading = false)


      } finally {
        this.loading = false
      }
    },

    async setUser(wuid, userId) {

      this.loading = true
      try {
        const data = await $fetch('/api/cart/set-user', {
          method: "POST",
          headers: {
            'Content-Type': 'application/json',
          },
          body: { wuid, userId },
        })

        this.cart = data
        this.cart.wuid = wuid
        this.cart.items.forEach(i => i.loading = false)
      }catch(e){
        console.error(e)
      }finally{
        this.loading = false
      }
    },

    async add(item, wuid){
      item.wuid = wuid

      const resAdd = await $fetch(`/api/cart/add`, {
        method: "POST",
        body: JSON.stringify(item),
      },
      )

      await this.fetchCart(resAdd.wuid)
      await this.onCartModified()
    },

    async removeItem(cartItem) {
      try {
        cartItem.loading = true

        const cart = await $fetch('/api/cart/remove-item', {
          method: 'GET',
          query: { wuid: this.cart.wuid, itemId: cartItem.id, type: cartItem.type },
        })

        this.cart = cart
        await this.onCartModified()
      } catch (e) {
        console.error(e)
      } finally {
        cartItem.loading = true
      }
    },

    async emptyCart() {

      const data = await $fetch('/api/cart/empty', {
        method: 'GET',
        query: { wuid: this.wuid },
      })

      this.cart = data
      this.coupon = null

    },

    async updateQuantity(wuid, itemId, newQty) {
      // 1. Optimistic Update (Immediate UI response)
      const item = this.cart.items.find(i => i.id === itemId)
      if (!item) return

      const previousQty = item.quantity

      item.quantity = newQty
      item.loading = true

      try {
        // 2. Server Sync
        await $fetch('/api/cart/update-quantity', {
          method: 'POST',
          body: { wuid, itemId, quantity: newQty },
        })


        await this.onCartModified()


      } catch (error) {
        // 4. Rollback if API fails
        item.quantity = previousQty
        console.error("Failed to update cart", error)
      } finally {
        item.loading = false
      }
    },
  },
})
