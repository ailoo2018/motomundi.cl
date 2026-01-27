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


const { injectSkinClasses } = useSkins()

const { isMobile, isTablet, isDesktop } = useDevice()

useHead({
  bodyAttrs: {
    class: computed(() => isMobile ? 'mobile' : 'desktop')
  }
})

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
  <div v-if="isMobile">
    <main class="main-content">
      <MobileHeader />
      <section class="account container ">
        <div class="account__content">
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
    <div class="landing-page-wrapper">
      <MotomundiHeaderbar />
      <MotomundiHeaderlogo />
      <MotomundiNavigation />

      <main class="main-content">
        <div class="row">
          <section
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
                <VCol class="col-sm-12 col-md-9 account__content">
                  <slot />
                </VCol>
              </div>
            </section>
          </section>
        </div>

        <MotomundiFooter />
      </main>
    </div>
  </div>
  <!-- /desktop -->
</template>

<style>
body:not(.mobile) {
  background: linear-gradient(to bottom, rgba(0, 0, 0, 0.36) 0%, rgba(0, 0, 0, 0) 400px) center/auto repeat-x,
  linear-gradient(to top, rgba(0, 0, 0, 0.36) 0%, rgba(0, 0, 0, 0) 400px) center/auto repeat-x,
  url("https://www.motomundi.cl/Content/uploads/1/_data/3/c2/3c25da0755aa485e9a984f5ca30cfe7f.jpg");
}

.row .col.l3 {
  width: 25%;
}

.layout-wrapper.layout-blank {
  flex-direction: column;
}


.main-content {
  width: 90%;
  min-width: 800px;
  max-width: 1300px;
  margin: auto;
  background-color: white;
}

@media (max-width: 960px) and (min-width: 600px) {
  .landing-page-wrapper {
    .v-container {
      padding-inline: 2rem !important;
    }
  }
}

@media (min-width: 960px) {
  .v-container {
    width: 90%;
    min-width: 800px;
    max-width: 1300px;

  }
}

 .container.account {
   margin-top: 15px;
 }

.big {
  font-size: 45px;
  height: 110px;
  line-height: 110px;
  margin-bottom: 20px;
  width: 110px;
}
.profile__avatar-text{
  margin-top: 20px;
}
.profile__edit span {
  -webkit-text-decoration: underline;
  text-decoration: underline;
}

.profile__personal-info>div svg use {
  stroke-width: 1.2;
}
.button {
  background: none;
  border: 2px solid #000;
  box-sizing: border-box;
  color: #000;
  display: inline-block;
  font-size: 10px;
  font-weight: 700;
  letter-spacing: .5px;
  overflow: hidden;
  padding: 13px 25px;
  position: relative;
  text-align: center;
  text-transform: uppercase;
  transition: all .2s ease-in-out;
  z-index: 1;
  width: unset;
}
.button.button--filled {
  background-color: #000;
  color: #fff;
}

.password-form form .modify-buttons {
  align-items: flex-start;
  display: flex;
  gap: 10px;
  margin-top: 14px;
}

@media only screen and (max-width: 600px) {
  .password-form form .modify-buttons {
    flex-wrap: wrap;
  }
}

.profile .account__user .user-avatar__container.club-member {
  padding-bottom: 20px;
}
.profile .account__user .user-avatar__container {
  margin: 0;
  padding-bottom: 10px;
}
.account__user .user-avatar__container {
  height: 130px;
  position: relative;
}

.account__content h1.account__title svg {
  vertical-align: -6px;
}

.account__content h1.account__title use {
  stroke: #000;
  stroke-width: .8;
  height: 30px;
  -webkit-transform: scale(1.5);
  transform: scale(1.5);
  width: 30px;
}

.sprite-line-icons use {
  fill-rule: evenodd;
  fill: none;
  stroke: #2a2a2a;
  stroke-width: 1.5;
  stroke-linecap: round;
  stroke-linejoin: round;
}

.account__content {
  box-sizing: border-box;
  font-weight: 400;
  padding-left: 30px !important;
}

.account__content-block {
  margin-bottom: 70px;
}
.profile section h1 {
  font-size: 18px;
  font-weight: 800;
  margin: 16px 0;
  text-transform: uppercase;
}

.account-order__detail .order-detail__estimate-date, .account-order__detail .order-detail__totals {
  font-size: 13px;
  line-height: 1.4em;
}

.account-order__detail.order__sent {
  border-left: 3px solid #000;
}

.account-order__detail .order-detail__header {
  display: flex;
  flex-wrap: wrap;
  gap: 14px;
  justify-content: space-between;
  justify-items: flex-start;
  padding: 7px 45px 14px 25px;
}
.account-order__detail .order-detail__header .order-detail__totals {
  border-top: none;
  display: block;
  padding: 0;
}

.account-order__detail .order-detail__header .order-detail__totals span {
  display: block;
}
.account-order__detail .order-detail__estimate-date span, .account-order__detail .order-detail__totals span {
  display: block;
}

.motocoins-card .motocoins-card__info strong {
  display: block;
  font-size: 1.5em;
  font-weight: 900;
}
.motocoins-card .motocoins-card__info span {
  font-size: 1em;
  font-weight: 600;
}
.motocoins-card .motocoins-card__header p {
  font-size: .8em;
  font-weight: 500;
  margin: 4px 0;
  text-transform: uppercase;
}

.account-order__detail .order-detail__thumbnails-list {
  align-items: flex-end;
  display: flex;
  flex: 0 0 100%;
  gap: 5px;
  overflow-x: hidden;
}
.profile .profile__orders {
  margin: 25px 0;
  width: 100%;
}

.profile .profile__orders .button--text-only {
  display: block;
  font-size: 12px;
  margin-top: 15px;
  text-align: center;
  text-transform: uppercase;
}
.account-order__detail.order__error .order-detail__type {
  color: #fd5f5f;
}
.account-order__detail .order-detail__type {
  display: block;
  font-size: 16px;
  font-weight: 900;
  padding: 14px 25px 7px;
  text-transform: uppercase;
}


.account-order__detail {
  background: #f9f9f9;
  margin-bottom: 5px;
  position: relative;
  transition: all 1s;
}

.account-order__detail:after {
  align-items: center;
  background: #d8d8d8 url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI2IiBoZWlnaHQ9IjEwIj48cGF0aCBmaWxsPSJub25lIiBzdHJva2U9IiM5Nzk3OTciIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIgc3Ryb2tlLXdpZHRoPSIxLjIiIGQ9Im0xIDkgNC00LTQtNCIvPjwvc3ZnPg==") no-repeat 50%;
  content: " ";
  display: flex;
  height: 100%;
  justify-content: center;
  position: absolute;
  right: 0;
  top: 0;
  transition: background .2s ease;
  width: 20px;
}

.account-order__detail.order__error {
  border-left: 3px solid #fd5f5f;
}

.account-order__detail .order-detail__type svg {
  position: relative;
  top: 1px;
}
.account-order__detail.order__error .order-detail__type svg use {
  stroke: #fd5f5f;
}

.account-order__detail .order-detail__type svg use {
  stroke-width: 2px;
}

@media only screen and (max-width: 992px) {
  .account__content {
    padding-left: 0 !important;
  }
}
@media only screen and (max-width: 992px) {
  .account__content {
    padding-left: 0 !important;
  }

  .account__content-block {
    margin-bottom: 60px;
  }
}

.svg-bar.green .circle {
  stroke: #41a334;
}

.account__content-block-title {
  align-items: baseline;
}

.account__content-block .account__content-block-title {
  align-items: flex-start;
  border-bottom: 1px solid #000;
  display: flex;
  justify-content: space-between;
  margin-bottom: 25px;
  padding-bottom: 15px;
}


@media only screen and (max-width: 600px) {
  .account[data-v-39c4a0d8] .user-avatar__container.club-member .account__user-avatar:after {
  }
}

.profile .account__user {
  border: 0;
  margin: 16px 0 0;
  padding: 0;
  width: 150px;
}

.account__user {
  border-bottom: 5px solid #f1f1f1;
  margin: 0 20px 30px;
  padding-bottom: 30px;
}

.account__user .user-avatar__container .account__user-avatar {
  left: 10px;
  position: absolute;
  top: 10px;
}

.svg-bar {
  left: 0;
  position: absolute;
  top: 0;
  -webkit-transform: rotate(-90deg);
  transform: rotate(-90deg);
  z-index: -1;
}
svg:not(:root) {
  overflow: hidden;
}
.account__user-avatar {
  border-radius: 200px;
  color: #fff;
  font-weight: 700;
  text-align: center;
  text-transform: uppercase;
}

:-webkit-any(article, aside, nav, section) h1 {
  font-size: 1.5em;
  margin-block-start: 0.83em;
  margin-block-end: 0.83em;
}

.account__content h1.account__title {
  font-size: 25px;
  font-weight: 900;
  margin: 0;
  text-transform: uppercase;
}

.profile__edit {
  color: #000;
  font-size: 13px;
  font-weight: 400;
  letter-spacing: .5px;
}

.account__user-avatar .edit-user-avatar .upload-image {
  height: 30px;
  width: 45px;
}

.account__user-avatar .edit-user-avatar .delete-image, .account__user-avatar .edit-user-avatar .upload-image {
  align-items: center;
  background: #000;
  border-radius: 200px;
  display: flex;
  justify-content: center;
}

.account__user-avatar img {
  border-radius: 200px;
  height: 100%;
  left: 0;
  position: absolute;
  width: 100%;
}

.profile {
  align-items: flex-start;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin-bottom: 80px;
}


.svg-bar .lane {
  fill: none;
  stroke: #f5f5f5;
  stroke-width: 5px;
  stroke-dasharray: 400;
  stroke-dashoffset: 0;
}
.svg-bar.orange .circle {
  stroke: #e4af08;
}
.svg-bar .circle {
  fill: none;
  stroke-width: 5px;
  stroke-dasharray: 400;
  stroke-linecap: round;
}

.account__user-avatar .edit-user-avatar .upload-image {
  height: 30px;
  width: 45px;
}




.placeholder {
  color: #adadad;
}

.profile__name span {
  display: block;
}
.profile__name {
  border-bottom: 1px solid #d8d8d8;
  font-size: 21px;
  font-weight: 800;
  margin-bottom: 12px;
  padding-bottom: 12px;
  text-transform: uppercase;
}



.account__user-avatar .edit-user-avatar input {
  cursor: pointer;
  height: 32px;
  opacity: 0;
  position: absolute;
  width: 32px;
  z-index: 1;
}
</style>
