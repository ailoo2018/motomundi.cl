<script setup lang="ts">
import MobileSearch from "@/views/pages/mobile/mobile-search.vue"


const cart = ref({ items_quantity: 1 })

const currentUser = ref({
  avatar: "https://www.motomundi.cl/Content/uploads/1/_data/9/47/9476a7923b1c47219b0b9d9b2379cbf6_600_original.jpg",

})

const openLogin = () => {
  console.log("openLogin")
}

const isUserLoggedIn = () => {
  return false
}

const toggleSearch = () =>{
  console.log("toggleSearch")
}

const toggleCart = () => {
  console.log("toggle cart")
}

const toggleMenu = () => {
  console.log("toggle menu")
}

const toggleUserMenu = () => {
  console.log("toggle user menu")
}

const getUserInitials = () => {
  return ""
}

const getCartTotalItems = () => {
  return 1
}
</script>

<template>
  <header class="header-container">
    <div class="header">
      <div class="container">
        <div class="row">
          <div class="col s12">
            <div class="header__top">
              <button
                class="mobile-menu__toggle"
                @click="toggleMenu"
              >
                <svg
                  width="26"
                  height="26"
                  xmlns="http://www.w3.org/2000/svg"
                  class="icon sprite-line-icons"
                >
                  <use
                    href="/content/svg/motomundi.svg?v=1.4#i-icon-menu-ham"
                    xlink:href="/content/svg/motomundi.svg?v=1.4#i-icon-menu-ham"
                  />
                </svg>
                <span>Menú </span>
              </button>
              <div class="motomundi-logo">
                <a
                  href="/"
                  class="motomundi-logo-link mtc-link"
                >
                  <span>
                    <img
                      src="/logo-motomundi.png"
                      alt="Motomundi"
                      class="cdn-img"
                    >
                  </span>
                </a>
              </div>
              <!-- /logo -->

              <!-- user-menu -->
              <ul class="user-menu">
                <li class="user-menu__item">
                  <div class="search">
                    <div>
                      <a
                        class="mobile-search-toggle"
                        @click="toggleSearch"
                      >
                        <svg
                          width="26"
                          height="26"
                          xmlns="http://www.w3.org/2000/svg"
                          class="icon sprite-line-icons"
                        >
                          <use
                            href="/content/svg/motomundi.svg?v=1.4#i-menu-search"
                            xlink:href="/content/svg/motomundi.svg?v=1.4#i-menu-search"
                          />
                        </svg>
                        <span>Buscar</span>
                      </a>
                    </div>
                    <MobileSearch v-if="false" />
                  </div>
                </li>
                <!-- /buscar -->

                <!-- favoritos -->
                <li class="user-menu__item">
                  <a
                    href="/cuenta/favoritos"

                    rel="nofollow"
                    class="mtc-link"
                  >
                    <svg
                      width="26"
                      height="26"
                      xmlns="http://www.w3.org/2000/svg"
                      class="user-menu__icon icon sprite-line-icons"
                    >
                      <use
                        href="/content/svg/motomundi.svg?v=1.4#i-menu-favorites"
                        xlink:href="/content/svg/motomundi.svg?v=1.4#i-menu-favorites"
                      />
                    </svg>
                    <span class="user-menu__title">Favoritos</span></a>
                </li>
                <!-- /favoritos -->

                <!-- cuenta -->
                <li class="user-menu__item user-menu__account">
                  <a
                    v-if="!isUserLoggedIn()"
                    style="transition: none;"
                    class=""
                    @click="openLogin"
                  >
                    <svg
                      width="26"
                      height="26"
                      xmlns="http://www.w3.org/2000/svg"
                      class="user-menu__icon icon sprite-line-icons"
                    >
                      <use
                        href="/content/svg/motomundi.svg?v=1.4#i-menu-account"
                        xlink:href="/content/svg/motomundi.svg?v=1.4#i-menu-account"
                      />
                    </svg>
                    <span class="user-menu__title">Cuenta</span>
                  </a>
                  <a
                    v-if="isUserLoggedIn()"
                    class="logged ng-cloak"
                    style="transition: none;"
                    @click="toggleUserMenu"
                  >
                    <div
                      class="account__user-avatar small"
                      style="background:linear-gradient(45deg, rgb(120, 168, 188) 0%, rgb(127, 167, 26) 100%);"
                    >
                      <img
                        V-if="currentUser.avatar"
                        :src="currentUser.avatar"
                        alt="user-avatar"
                      >
                      JCF
                    </div>
                    <span class="user-menu__title">Cuenta</span>
                  </a>
                  <AccountMenu />
                </li>
                <!-- /cuenta -->

                <li
                  id="cartButton"
                  class="user-menu__cart user-menu__item"
                >
                  <a @click="toggleCart">
                    <svg
                      width="26"
                      height="26"
                      xmlns="http://www.w3.org/2000/svg"
                      class="user-menu__icon icon sprite-line-icons"
                    >
                      <use
                        href="/content/svg/motomundi.svg?v=1.4#i-menu-cart"
                        xlink:href="/content/svg/motomundi.svg?v=1.4#i-menu-cart"
                      />
                    </svg>
                    <span
                      v-if="cart.items_quantity > 0"
                      class="badge ng-cloak"
                    >{{ getCartTotalItems() }}</span>
                    <span class="user-menu__title text">Cesta</span>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<style scoped>
.content-container, .main-content, body {
  min-height: 100vh;
  width: unset;
  min-width: unset;
  max-width: unset;
  margin:unset;
}

.header-container {
  border-bottom: 2px solid #efefef;
}

.header-container > div {
  background-color: #fff;
}

.container {
  align-items: center;
  display: flex;
  height: 61px;
  width: 95%;
}

.container {
  margin: 0 auto;
  max-width: unset;
  width: 100%;
  padding: 4px;
  background-color: black;
  color: white;
}

.container > .row {
  margin-bottom: 0;
  width: 100%;
  margin-left: auto;
  margin-right: auto;
}

.row .col.s12 {
  width: 100%;
}

.user-menu{
  align-content: center;
  align-items: center;
  display: flex;
  flex: 0 0 33.33%;
  justify-content: flex-end;
  list-style-type: none;
  margin: 0;
  padding: 0;
}

.header__top .user-menu{
  margin-left: auto;
}

.mobile-search-toggle > svg{
  display: block;
  margin: 0 auto 2px;
}

.container use {
  stroke: white;
}
.mobile-menu__toggle svg use {
  stroke-width: 1;
}

.mobile-search-toggle use {
  stroke: white;
  stroke-width: 1;
  transition: all .2s ease-out;
}

.mobile-search-toggle {
  display: block;
  float: right;
  padding: 5px 2px;
}

.mobile-search-toggle > span {
  color: #000;
  display: block;
  font-size: 7px;
  font-weight: 500;
  letter-spacing: .2px;
  line-height: 1;
  text-transform: uppercase;
}

.user-menu .user-menu__item a > svg use {
  stroke: white;
}

.user-menu .user-menu__item a {
  text-align: center;
}
.container li .mtc-link, li > a {
  stroke: white;
}

.user-menu .user-menu__item a span {
  color: white;
}

.mobile-search-toggle > span {
  color: white;
}

.header__top {
  align-content: center;
  align-items: center;
  display: flex;
  flex-direction: row;
  padding: 18px 0 0;
}

.account__user-avatar img{
  border-radius: 200px;
  height: 100%;
  left: 0;
  position: absolute;
  width: 100%;
}

.mobile-menu__toggle{
  background-color: transparent;
  margin: 0 5px 0 -5px;
  padding: 5px 2px 5px 0;
}

.mobile-menu__toggle svg {
  display: block;
  margin: 0 auto;
  -webkit-transform: scale(.8);
  transform: scale(.8);
}


.user-menu .user-menu__item a > svg use {
  stroke: #000;
  stroke-width: 1;
  transition: all .2s ease-out;
}

.user-menu .user-menu__item a > svg use{
  stroke: white;
}

@media only screen and (max-width: 600px) {
  .user-menu .user-menu__item a > svg {
    margin: 0 auto -1px;
    -webkit-transform: scale(.8);
    transform: scale(.8);
  }
}

@media only screen and (max-width: 600px) {
  .header-container .user-menu a {
    padding: 5px 2px;
  }
}

@media (max-width: 771px) {
  li .mtc-link, li > a {
    font-size: 9px;
    letter-spacing: -.5px;
    padding: 6px;
  }
}

@media only screen and (max-width: 600px) {
  .header__top{
    padding: 0;
  }
}

@media (max-width: 374px) {
  .mobile-menu__toggle span {
    display: none !important;
  }
}

@media (max-width: 374px) {
  .user-menu .user-menu__item a span {
    display: none;
  }
}

@media only screen and (max-width: 600px) {
  .mobile-menu__toggle {
    flex: 0 0 10%;
  }
}

@media (max-width: 374px) {
  .mobile-search-toggle > span {
    display: none;
  }
}

@media only screen and (max-width: 600px) {
  .user-menu .user-menu__item a  .account__user-avatar img {
    height: 22px;
    width: 22px;
  }
}

@media only screen and (max-width: 600px) {
  .user-menu a[data-v-6d3849da] {
    padding: 5px 2px;
  }
}

@media only screen and (max-width: 600px) {
  .mobile-search-toggle > svg {
    margin: 0 auto -1px;
    -webkit-transform: scale(.8);
    transform: scale(.8);
  }
}

@media only screen and (max-width: 600px) {
  .motomundi-logo{
    flex-direction: row-reverse;
  }
}
@media only screen and (max-width: 600px) {
  .header__top .motomundi-logo .motomundi-logo-link {
    margin-top: 8px;
  }
}
@media only screen and (max-width: 600px) {
  .header__top .motomundi-logo img {
    max-width: 165px;
  }
}

@media only screen and (max-width: 600px) {
  .header-container {
    border: 0;
    z-index: 1000 !important;
  }
}

@media only screen and (max-width: 600px) {
  .mobile-search-toggle > svg {
    margin: 0 auto -1px;
    -webkit-transform: scale(.8);
    transform: scale(.8);
  }
}

@media only screen and (max-width: 600px) {
  .header__top .motomundi-logo{
    height: auto;
    margin-top: 0 !important;
    /* max-width: 124px; */
  }
}

@media only screen and (max-width: 600px) {
  .search {
    flex: 0 0 15%;
  }
}
</style>


