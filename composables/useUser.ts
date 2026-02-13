export const useUser = () => {
  const router = useRouter()

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

  return {
    logout
  }
}
