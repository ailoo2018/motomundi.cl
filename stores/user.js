import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  state: () => ({
    user: { id: null, username: '' },
    loading: false,
  }),

  actions: {
    async fetchUser(wuid) {
      this.loading = true
      try {

        const userId = useCookie("user_id").value
        if(!userId || !(userId > 0)) return

        this.user = await $fetch(`/api/account/user`)
      }catch(e){
        console.error(e)
      } finally {
        this.loading = false
      }
    },


  },
})
