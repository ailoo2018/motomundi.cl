import { useUserStore } from "@/stores/user"
import { useWishlistStore } from "@/stores/wishlist" // Import the new store


export const useUser = () => {

  const wishlistStore = useWishlistStore()

  const onLoggedIn = async data => {
    useCookie('user_id').value = data.userId
    useCookie('accessToken').value = data.accessToken

    // --- SYNC GUEST WISHLIST TO DB ---
    const wishlistStore = useWishlistStore()
    if (wishlistStore.items.length > 0) {
      await $fetch("/api/wishlist/sync", {
        method: "POST",
        body: {
          userId: data.userId,
          productIds: wishlistStore.items, // Send the array from cookies/Pinia
        },
      })
    }
  }


  const getInitials = () => {
    const userStore = useUserStore()

    if (!userStore.user || !userStore.user.id)
      return ""

    if (!userStore.user.person)
      return ""

    let fullName = userStore.user.person?.name

    return fullName
      .trim()                    // Remove leading/trailing whitespace
      .split(/\s+/)              // Split by one or more spaces
      .map(word => word[0])      // Take the first character of each word
      .join('')                  // Join them into a single string
      .toUpperCase()             // Ensure they are uppercase
      .slice(0, 3)              // Limit to the first 3 characters
  }

  const logout = async () => {
    console.log("clearing cookies")

    // 1. Clear the cookies
    useCookie("user_id").value = null
    useCookie("guest_id").value = null
    useCookie("accessToken").value = null

    const user = useState('user')

    user.value = null

    await navigateTo("/login", { replace: true })
  }

  const getUserId = () => {
    return useCookie("user_id").value
  }

  const listMotorcycles = async () => {
    const userId = getUserId()

    if (userId > 0) {
      return await $fetch("/api/motorcycles/list-user-bikes")
    }

    return []
  }

  const addToWishList = async productId => {

    wishlistStore.toggleItem(productId)

    /*const userId = getUserId()

    if (userId && wishlistStore.items.length > 0) {
      await $fetch("/api/wishlist/sync", {
        method: "POST",
        body: {
          userId: data.userId,
          productIds: wishlistStore.items, // Send the array from cookies/Pinia
        },
      })
    }
*/
    console.log(`Product ${productId} toggled in wishlist`)
  }

  const createAccount = async acct => {
    const data = await $fetch("/api/account/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: acct,
    })

    await onLoggedIn(data)

    return data
  }


  const login = async (email, password) => {
    const data = await $fetch("/api/login/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: {
        username: email,
        password: password,
      },
    })

    await onLoggedIn(data)


    return data
  }

  return {
    login,
    logout,
    getInitials,
    getUserId,
    listMotorcycles,
    createAccount,
    addToWishList,
  }
}
