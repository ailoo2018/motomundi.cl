import { useUserStore } from "@/stores/user"

export const useUser = () => {
  const router = useRouter()

  const getInitials = () => {
    const userStore = useUserStore()

    if(!userStore.user || !userStore.user.id)
      return ""

    if(!userStore.user.person)
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

    // 2. Clear reactive state
    const user = useState('user')

    user.value = null

    // 3. Redirect
    // navigateTo is the Nuxt 3 standard for redirects
    await navigateTo("/login", { replace: true })
  }

  const getUserId = () => {
    return useCookie("user_id").value
  }

  const listMotorcycles = async () => {
    const userId = getUserId()
    
    if(userId > 0){
      return await $fetch("/api/motorcycles/list-user-bikes")
    }

    return []
  }

  return {
    logout,
    getInitials,
    getUserId,
    listMotorcycles,
  }
}
