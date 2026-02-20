<script setup>
import MotomundiHeaderbar from "@/views/pages/motomundi-headerbar.vue"
import MotomundiNavigation from "@/views/pages/motomundi-navigation.vue"
import MotomundiHeaderlogo from "@/views/pages/motomundi-headerlogo.vue"
import MotomundiFooter from "@/views/pages/motomundi-footer.vue"
import MobileHeader from "@/views/pages/mobile/mobile-header.vue"
import BlogRightContent from "@/layouts/blog/blog-right-content.vue"
import { getHeader } from "h3"
import MobileFooter from "@/views/pages/mobile/mobile-footer.vue"
import BlogMenu from "@/views/pages/blog/blog-menu.vue"

const { injectSkinClasses } = useSkins()

const { isMobile, isTablet, isDesktop } = useDevice()

const event = useRequestEvent()
const showBlogMenu = ref(false)

const ua = process.server && event
  ? (getHeader(event, 'user-agent') || '')
  : (process.client ? navigator.userAgent : '')

const deviceType = ua.match(/Mobile|Android|iPhone|iPad/) ? 'mobile' : 'desktop'




console.log("isMobile", isMobile)
console.log("isTable", isTablet)
console.log("isDesktop", isDesktop)


useHead({
  bodyAttrs: {
    class: computed(() => isMobile ? 'mobile' : 'desktoaaap'),
  },
})

const onShowBlogMenu = () => {
  console.log("showBlogMenu")
  showBlogMenu.value = !showBlogMenu.value
}

// ℹ️ This will inject classes in body tag for accurate styling
injectSkinClasses()
</script>

<template>
  <!-- mobile -->
  <div v-if="deviceType === 'mobile'">
    <main class="main-content">
      <MobileHeader />
      <div class="home-container">
        <main class="main-content">
          <div id="blogContent">
            <div
              id="blog-wrapper"
              class="home blog"
              style="background-color: #f5f5f5;"
            >
              <div class="menu-mobile-container">
                <button
                  type="button"
                  class="tcon tcon-menu--arrow tcon-menu--arrowup white home"
                  @click="onShowBlogMenu"
                >
                  <span class="tcon-menu__lines" />
                  <span class="tcon-visuallyhidden">toggle menu</span>

                </button>
                <div v-if="showBlogMenu">
                  <BlogMenu />
                </div>
              </div>
              <slot name="blog-top" />
              <div
                id="content"
                class="home-container"
              >
                <div
                  id="inner-content"
                  class="inner-content row"
                >
                  <div class="left-content">
                    <slot />
                  </div>
                  <BlogRightContent />
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
      <MobileFooter />
    </main>
  </div>
  <!-- /mobile -->

  <!-- desktop -->
  <div
    v-else
    class="layout-wrapper layout-blank"
  >
    <div class="landing-page-wrapper">
      <MotomundiHeaderbar />
      <MotomundiHeaderlogo />
      <MotomundiNavigation />

      <main class="main-content main-container">
        <div id="blogContent">
          <div
            id="blog-wrapper"
            class="home blog"
            style="background-color: #f5f5f5;"
          >
            <div class="off-canvas-wrapper">
              <div class="off-canvas-content">
                <div class="menu-mobile-container">
                  <button
                    type="button"
                    class="tcon tcon-menu--arrow tcon-menu--arrowup white home"
                    aria-label="toggle menu"
                    @click="showBlogMenu = !showBlogMenu;"
                  >
                    <span class="tcon-menu__lines" />
                    <span class="tcon-visuallyhidden">toggle menu</span>
                  </button>
                  <div
                    class="menu-mobile"
                    ng-show="showBlogMenu"
                  >

                  </div>
                </div>

                <slot name="blog-top" />


                <div
                  id="content"
                  class="home-container"
                >
                  <div
                    id="inner-content"
                    class="inner-content row"
                  >
                    <div class="left-content">
                      <slot />
                    </div>
                    <BlogRightContent />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>


        <!-- 👉 Footer -->
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
