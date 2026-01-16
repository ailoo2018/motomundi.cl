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

        const { data, pending } = await useFetch(`/api/account/user`, {
          key: `current-user-` + userId,
        })

        this.user = data
      }catch(e){
        console.error(e)
      } finally {
        this.loading = false
      }
    },


  },
})
