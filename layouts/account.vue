<script setup>
import MotomundiHeaderbar from "@/views/pages/motomundi-headerbar.vue"
import MotomundiNavigation from "@/views/pages/motomundi-navigation.vue"
import MotomundiHeaderlogo from "@/views/pages/motomundi-headerlogo.vue"
import swiper from "@/views/pages/home/swiper.vue"
import FeaturedProducts from "@/views/pages/home/featured-products.vue"
import ScrollingText from "@/views/pages/home/scrolling-text.vue"
import MotomundiFooter from "@/views/pages/motomundi-footer.vue"
import AddedValues from "@/views/pages/home/added-values.vue"
import HomeCategories from "@/views/pages/home/home-categories.vue"
import AccountMenu from "@/views/pages/account/account-menu.vue"
import MobileHeader from "@/views/pages/mobile/mobile-header.vue"
import { getHeader } from "h3"


const { injectSkinClasses } = useSkins()

const { isMobile, isTablet, isDesktop } = useDevice()

// Get user-agent from request event
const event = useRequestEvent()
const ua = process.server && event
  ? (getHeader(event, 'user-agent') || '')
  : (process.client ? navigator.userAgent : '')

const deviceType = ua.match(/Mobile|Android|iPhone|iPad/) ? 'mobile' : 'desktop'




const router = useRouter()

const logout = async () => {
  // 1. Clear the cookies
  // Setting to null tells Nuxt to expire the cookie
  useCookie("user_id").value = null
  useCookie("guest_id").value = null
  useCookie("accessToken").value = null

  // 2. Clear any reactive state (if you are using useState)
  const user = useState('user')

  user.value = null

  // 3. Redirect
  // Using 'replace: true' prevents the user from hitting 'back' to the logged-in page
  await navigateTo("/login", { replace: true })
}


// ℹ️ This will inject classes in body tag for accurate styling
injectSkinClasses()
</script>

<template>
  <!-- mobile -->
  <div v-if="deviceType === 'mobile'">
    <main class="main-content">
      <MobileHeader />
      <section class="account container col-sm-12 pa-3">
        <div class="home-container account__content">
          <slot />
        </div>
      </section>
    </main>
  </div>
  <!-- /mobile -->

  <!-- desktop -->
  <div
    v-else
    class="layout-wrapper layout-blank"
  >
    <div class="landing-page-wrapper  desktop-only-container">
      <MotomundiHeaderbar />
      <MotomundiHeaderlogo />
      <MotomundiNavigation />

      <main class="main-content">
        <div class="row">
          <VContainer
            class="row col s12 account-container"
            AAstyle="width:95%;"
          >
            <section class="account container ">
              <div class="v-row">
                <aside
                  style="max-width: 240px"
                  class="v-col col-sm-12 col-md-3 col-lg-3 hide-on-small-and-down"
                >
                  <AccountMenu @logout="logout" />
                </aside>
                <VCol class="col-sm-12 col-md-9 account__content w-100" >
                  <slot />
                </VCol>
              </div>
            </section>
          </VContainer>
        </div>

        <MotomundiFooter />
      </main>
    </div>
  </div>
  <!-- /desktop -->
</template>
<style>

/* Background for Desktop */
@media (min-width: 961px) {
  body {
    background: linear-gradient(to bottom, rgba(0, 0, 0, 0.36) 0%, rgba(0, 0, 0, 0) 400px) center/auto repeat-x,
    linear-gradient(to top, rgba(0, 0, 0, 0.36) 0%, rgba(0, 0, 0, 0) 400px) center/auto repeat-x,
    url("/mm-bg.jpg");
  }

  .desktop-only-container .main-content {
    width: 90%;
    min-width: 800px;
    max-width: 1300px;
    margin: auto;
    background-color: white;
  }
}

/* Main Content for Mobile */
@media (max-width: 960px) {
  .mobile-only-container .main-content {
    width: 100%;
    margin: auto;
    background-color: white;
  }
}

.layout-wrapper.layout-blank {
  flex-direction: column;
}

@media (max-width: 960px) and (min-width: 600px) {
  .landing-page-wrapper .v-container {
    padding-inline: 2rem !important;
  }
}

@media (min-width: 960px) {
  .v-container {
    width: 90%;
    min-width: 800px;
    max-width: 1300px;
  }
}




.layout-wrapper.layout-blank {
  flex-direction: column;
}


</style>
