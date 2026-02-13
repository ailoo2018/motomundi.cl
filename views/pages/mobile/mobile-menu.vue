<script setup lang="ts">
import MobileMenuInicio from "@/views/pages/mobile/menu/mobile-menu-inicio.vue"
import MobileMenuCascos from "@/views/pages/mobile/menu/mobile-menu-cascos.vue"
import AccountMenu from "@/views/pages/account/account-menu.vue"
import MobileMenuCalle from "@/views/pages/mobile/menu/mobile-menu-calle.vue";
import MobileMenuOffroad from "@/views/pages/mobile/menu/mobile-menu-offroad.vue";
import MobileMenuAccesorios from "@/views/pages/mobile/menu/mobile-menu-accesorios.vue";
import MobileMenuLifestyle from "@/views/pages/mobile/menu/mobile-menu-lifestyle.vue";
import MobileMenuBrands from "@/views/pages/mobile/menu/mobile-menu-brands.vue";

const { logout } = useUser()


const isMenuOpen = defineModel({type: Boolean, default: false})
const isShowUserMenuTab = ref(false)

const currentMenu = ref(MobileMenuInicio)
const menuTitleUrl = ref('/')
const menuTitle = ref('Inicio')
const showMainMenu = ref(true)

const backToHome = () => {
  console.log("back to home")
  currentMenu.value = MobileMenuInicio
  menuTitle.value = "Inicio"
}

const getUserInitials = () => {
  return "JC"
}

const menuMap = {
  "cascos": MobileMenuCascos,
  "calle": MobileMenuCalle,
  "offroad": MobileMenuOffroad,
  "accesorios": MobileMenuAccesorios,
  "lifestyle": MobileMenuLifestyle,
  "marcas": MobileMenuBrands,
}


const onMenuChange = menu => {
  console.log("menu selectd", menu)
  currentMenu.value = menuMap[menu.name]
  menuTitle.value = menu.title

  if(currentMenu.value !== MobileMenuInicio){
    showMainMenu.value = false
  }
}

const getCurrentMenu = () => {
  return currentMenu.value
}

const isUserLoggedIn = () => {
  const accessToken = useCookie('accessToken').value

  return accessToken && accessToken.length > 0
}

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value
}
</script>

<template>
  <div
    class="menu-mobile "
    :class="isMenuOpen ? 'show' : ''"
  >
    <div class="menu-mobile__container">
      <div class="menu-mobile__main">
        <div class="menu-mobile__nav-header">
          <div class="nav-header__back">
            <button
              v-if="!showMainMenu"
              @click="backToHome"
            >
              <img
                src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI1IiBoZWlnaHQ9IjgiPjxwYXRoIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzAwMCIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBkPSJNNCA3TDEgNGwzLTMiLz48L3N2Zz4="
                alt="Back"
              >
            </button>
          </div>
          <div class="nav-header__title">
            <h1>
              <span v-if="!menuTitleUrl">{{ menuTitle }} {{ menuTitleUrl }}</span>
              <a
                v-if="menuTitleUrl"
                href="{{menuTitleUrl}}"
                class="mtc-link"
              >{{ menuTitle }}</a>
              <span style="display: none;"/>
            </h1>
          </div>
        </div>
        <Component
          :is="getCurrentMenu()"
          @on-menu-change="onMenuChange"
        />
      </div>
      <nav class="menu-mobile__tab-bar">
        <ul>
          <li class="menu-mobile__account">
            <a
              v-if="!isUserLoggedIn()"
              href="/login"
              class="mtc-link"
              rel="nofollow"
            >
              <img
                src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMSIgaGVpZ2h0PSIyMSI+PGcgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIiBzdHJva2U9IiMwMDAiIHN0cm9rZS1saW5lY2FwPSJzcXVhcmUiIHN0cm9rZS13aWR0aD0iLjgwOCI+PHBhdGggZD0iTTEwLjUgMTIuOTIzYzIuNjc2IDAgNC44NDYgMS45ODkgNC44NDYgNC40NDIgMCAuMjA4LS4wMTUuNDEyLS4wNDUuNjExYTguODM1IDguODM1IDAgMCAxLTQuODAxIDEuNDA5IDguODQzIDguODQzIDAgMCAxLTQuODAxLTEuNDA4IDQuMTIgNC4xMiAwIDAgMS0uMDQ1LS42MTJjMC0yLjQ1MyAyLjE3LTQuNDQyIDQuODQ2LTQuNDQyeiIvPjxjaXJjbGUgY3g9IjEwLjUiIGN5PSIxMC41IiByPSI4Ljg4NSIvPjxjaXJjbGUgY3g9IjEwLjUiIGN5PSI5LjY5MiIgcj0iMy4yMzEiLz48L2c+PC9zdmc+"
                alt="Account"
              >
              <span>Entra </span>
            </a>

            <span
              v-if="isUserLoggedIn()"
              class="mtc-link"
              style="transition: none;"
              @click="isShowUserMenuTab = !isShowUserMenuTab;"
            >
              <div
                class="account__user-avatar small"
                style="background: linear-gradient(45deg, rgb(120, 168, 188) 0%, rgb(127, 167, 26) 100%);"
              >
                <img
                  v-if="currentUser && currentUser.avatar"
                  :src="currentUser!.avatar"
                  alt="user-avatar"
                >
                {{ getUserInitials() }}
              </div>
              <span>Mi cuenta</span>
              <AccountMenu
                v-if="isShowUserMenuTab"
                @logout="logout"
                component-class="user-menu__account-content"
              />

            </span>
          </li>
          <li class="menu-mobile__my-orders">
            <a
              href="/cuenta/pedidos"
              class="mtc-link"
            >
              <img
                src="data:image/svg+xml;base64,PHN2ZyBoZWlnaHQ9IjIxIiB3aWR0aD0iMjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGcgc3R5bGU9ImZpbGw6bm9uZTtmaWxsLXJ1bGU6ZXZlbm9kZDtzdHJva2U6IzMwMzAzMDtzdHJva2UtbGluZWNhcDpyb3VuZDtzdHJva2UtbGluZWpvaW46cm91bmQ7c3Ryb2tlLXdpZHRoOi45NDQiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDIgMSkiPjxwYXRoIGQ9Im05LjAyNS4zNzcgNi42MyAzLjM0OGMuNTYzLjI4My45Mi44NjMuOTIgMS40OTl2Ny45NzZjMCAuNjM2LS4zNTcgMS4yMTYtLjkyIDEuNDk5bC02LjYzIDMuMzQ4YTEuNjQzIDEuNjQzIDAgMCAxIC0xLjQ4MyAwbC02LjYzLTMuMzQ3YTEuNjc2IDEuNjc2IDAgMCAxIC0uOTEyLTEuNTA3di03Ljk3YzAtLjYzNS4zNTctMS4yMTUuOTItMS40OThsNi42My0zLjM0OGExLjY0MyAxLjY0MyAwIDAgMSAxLjQ3NSAweiIvPjxwYXRoIGQ9Im0uMjY1IDQuMzIgOC4wMjMgNC4wNTEgOC4wMjItNC4wNTFtLTguMDIyIDEzLjg5NnYtOS44NDVtLTQuMTQ0LTYuMjc4IDguMjg3IDQuMTg1Ii8+PC9nPjwvc3ZnPg=="
                alt="Orders"
              >
              <span>Pedidos</span>
            </a>
            <ul style="display: none;">
              <li>
                <form class="order-tracking">
                  <span class="h3">Seguimiento de pedidos</span>
                  <ul>
                    <li>
                      <label for="order-tracking-input-order-id">Número
                        de Pedido</label> <input
                      id="order-tracking-input-order-id"
                      type="text"
                      required="required"
                    >
                    </li>
                    <li>
                      <label for="order-tracking-input-email">Correo
                        electrónico</label> <input
                      id="order-tracking-input-email"

                      type="email"
                      required="required"
                    >
                    </li>
                    <li class="error"/>
                    <li>
                      <button type="submit">
                        <span>Buscar</span>
                      </button>
                    </li>
                  </ul>
                </form>
              </li>
            </ul>
          </li>
          <li class="menu-mobile__favorites">
            <a
              href="/cuenta/favoritos"

              class="mtc-link"
              rel="nofollow"
            >
              <img
                src="data:image/svg+xml;base64,PHN2ZyBoZWlnaHQ9IjIxIiB2aWV3Qm94PSIwIDAgMjEgMjEiIHdpZHRoPSIyMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+PGZpbHRlciBpZD0iYSIgaGVpZ2h0PSIxMjguOCUiIHdpZHRoPSIxNjAlIiB4PSItMzAlIiB5PSItMTQuNCUiPjxmZU9mZnNldCBkeD0iMTAiIGR5PSIwIiBpbj0iU291cmNlQWxwaGEiIHJlc3VsdD0ic2hhZG93T2Zmc2V0T3V0ZXIxIi8+PGZlR2F1c3NpYW5CbHVyIGluPSJzaGFkb3dPZmZzZXRPdXRlcjEiIHJlc3VsdD0ic2hhZG93Qmx1ck91dGVyMSIgc3RkRGV2aWF0aW9uPSIyMCIvPjxmZUNvbG9yTWF0cml4IGluPSJzaGFkb3dCbHVyT3V0ZXIxIiByZXN1bHQ9InNoYWRvd01hdHJpeE91dGVyMSIgdHlwZT0ibWF0cml4IiB2YWx1ZXM9IjAgMCAwIDAgMCAgIDAgMCAwIDAgMCAgIDAgMCAwIDAgMCAgMCAwIDAgMC41IDAiLz48ZmVNZXJnZT48ZmVNZXJnZU5vZGUgaW49InNoYWRvd01hdHJpeE91dGVyMSIvPjxmZU1lcmdlTm9kZSBpbj0iU291cmNlR3JhcGhpYyIvPjwvZmVNZXJnZT48L2ZpbHRlcj48ZyBmaWxsPSJub25lIiBmaWx0ZXI9InVybCgjYSkiIHN0cm9rZT0iIzAwMCIgc3Ryb2tlLXdpZHRoPSIuODUiIHRyYW5zZm9ybT0idHJhbnNsYXRlKC0yNTcgLTYxOSkiPjxwYXRoIGQ9Im0yIDguNjk1NjUyMTdjMCAxLjEzMDQzNDc5LjE3NTI1NzczIDIuODY5NTY1MjMgMS43NTI1NzczMiA0LjQzNDc4MjYzIDEuNDAyMDYxODYgMS4zOTEzMDQzIDYuMDQ2MzkxNzUgNC41MjE3MzkxIDYuMjIxNjQ5NDggNC42OTU2NTIyLjE3NTI1NzcuMDg2OTU2NS4zNTA1MTU1LjE3MzkxMy41MjU3NzMyLjE3MzkxM3MuMzUwNTE1NS0uMDg2OTU2NS41MjU3NzMyLS4xNzM5MTNjLjE3NTI1NzctLjE3MzkxMzEgNC44MTk1ODc2LTMuMjE3MzkxMyA2LjIyMTY0OTUtNC42OTU2NTIyIDEuNTc3MzE5Ni0xLjU2NTIxNzQgMS43NTI1NzczLTMuMzA0MzQ3ODQgMS43NTI1NzczLTQuNDM0NzgyNjMgMC0yLjYwODY5NTY1LTIuMTAzMDkyOC00LjY5NTY1MjE3LTQuNzMxOTU4OC00LjY5NTY1MjE3LTEuNDAyMDYxOCAwLTIuODA0MTIzNy43ODI2MDg3LTMuNjgwNDEyMyAyLS44NzYyODg2OS0xLjIxNzM5MTMtMi4yNzgzNTA1NS0yLTMuODU1NjcwMTQtMi0yLjU0MTIzNzExIDAtNC43MzE5NTg3NiAyLjA4Njk1NjUyLTQuNzMxOTU4NzYgNC42OTU2NTIxN3oiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDI1NyA2MTkpIi8+PC9nPjwvc3ZnPg=="
                alt="Motocard favorites"
              > <span>Favoritos</span>
            </a>
          </li>
          <li>
            <span class="mtc-link">
              <img
                src="/content/images/flags/bandera_cl.png"
                alt="cl"
                class="mobile-menu__sec-locale"
              >
              <span>País/Idioma</span>
            </span>
            <div
              class="modal-wrapper"
              style="display: none;"
            >
              <div class="modal-backdrop"/>
              <div
                role="dialog"
                class="modal mobile-locale__modal"
              >
                <div class="modal__close-cont">
                  <button class="modal__close">
                    <svg
                      width="9"
                      height="9"
                      xmlns="http://www.w3.org/2000/svg"
                      class="icon sprite-line-icons"
                    >
                      <use
                        href="/content/svg/motomundi.svg#i-icon-cross"
                        xlink:href="/content/svg/motomundi.svg#i-icon-cross"
                      />
                    </svg>
                  </button>
                </div>
                <header class="modal-header"/>
                <section class="modal-body">
                  <div>
                    <div class="change-local-form"/>
                  </div>
                </section>
              </div>
            </div>
          </li>
        </ul>
      </nav>
    </div>
    <div
      class="menu-mobile__overlay"
      @click="toggleMenu"
    />
  </div>
</template>


<style >
.menu-mobile > * {
  opacity: 0;
  pointer-events: none
}

.menu-mobile__nav-header {
  align-items: center;
  background-color: #f5f5f5;
  box-sizing: border-box;
  display: flex;
  height: 40px;
  left: 0;
  margin-bottom: 1px;
  max-width: 86vw;
  min-width: 86vw;
  overflow: hidden;
  padding: 0 12px;
  position: fixed;
  top: 0
}

.nav-header__back {
  display: flex;
  flex: 0 0 12%
}

.nav-header__back button {
  font-size: 8px;
  font-weight: 600;
  letter-spacing: .5px;
  line-height: normal;
  margin-left: -10px;
  padding: 10px;
  text-transform: uppercase
}


.menu-mobile.show .menu-mobile__container, .menu-mobile.show .menu-mobile__overlay {
  opacity: 1;
  pointer-events: auto;
  -webkit-transform: translateX(0);
  transform: translateX(0)
}

.menu-mobile .menu-mobile__container {
  background-color: #fff;
  bottom: 0;
  box-shadow: 30px 0 20px 0 rgba(0, 0, 0, .1), 30px 0 35px 0 rgba(0, 0, 0, .15);
  display: flex;
  flex-direction: column;
  height: 100vh;
  /*    height: calc(var(--vh, 1vh) * 100);*/
  isolation: isolate;
  justify-content: space-between;
  left: 0;
  max-width: 86vw;
  min-width: 86vw;
  opacity: 0;
  overflow: hidden;
  pointer-events: none;
  position: fixed;
  top: 0;
  -webkit-transform: translateX(-1000px);
  transform: translateX(-1000px);
  transition: all .3s ease-in;
  z-index: 1300
}

.menu-mobile .menu-mobile__overlay {
  background-color: hsla(0, 0%, 100%, .8);
  bottom: 0;
  content: "";
  display: block;
  left: 0;
  position: fixed;
  right: 0;
  top: 0;
  transition: all .4s ease-in;
  z-index: 1200
}

.menu-mobile__main {
  max-height: 100vh;
  opacity: 0;
  overflow-y: auto;
  padding-top: 40px;
  -webkit-transform: translateX(-1000px);
  transform: translateX(-1000px);
  transition: all .3s ease-in
}

.menu-mobile__nav {
  width: 100%
}

.menu-mobile__nav .menu-mobile__divider {
  background-color: #f5f5f5;
  font-size: 10px;
  font-weight: 600;
  letter-spacing: .5px;
  line-height: 25px;
  margin: 0;
  padding: 0 12px;
  text-align: center;
  text-transform: uppercase
}

.menu-mobile__nav .menu-mobile__grid-nav, .menu-mobile__nav .menu-mobile__list-nav {
  grid-column-gap: 0;
  grid-row-gap: 0;
  display: grid;
  grid-template-columns:repeat(2, 1fr);
  grid-template-rows:1fr
}

.menu-mobile__nav .menu-mobile__grid-nav li, .menu-mobile__nav .menu-mobile__list-nav li {
  background-color: #fff;
  box-shadow: inset -1px -1px 0 0 #f5f5f5;
  min-width: 0;
  overflow: hidden;
  padding: 15px 0;
  text-align: center
}

.menu-mobile__nav .menu-mobile__grid-nav li:active, .menu-mobile__nav .menu-mobile__list-nav li:active {
  background-color: #f5f5f5
}

.menu-mobile__nav .menu-mobile__grid-nav li:active button, .menu-mobile__nav .menu-mobile__list-nav li:active button {
  color: #d6001c
}

.menu-mobile__nav .menu-mobile__grid-nav .mtc-link, .menu-mobile__nav .menu-mobile__grid-nav button, .menu-mobile__nav .menu-mobile__list-nav .mtc-link, .menu-mobile__nav .menu-mobile__list-nav button {
  color: #000;
  max-width: 100%;
  width: 100%
}

.menu-mobile__nav .menu-mobile__grid-nav .mtc-link span, .menu-mobile__nav .menu-mobile__grid-nav button span, .menu-mobile__nav .menu-mobile__list-nav .mtc-link span, .menu-mobile__nav .menu-mobile__list-nav button span {
  display: block;
  font-size: 8px;
  font-weight: 500;
  letter-spacing: .5px;
  margin-top: 5px;
  text-align: center;
  text-transform: uppercase
}

.menu-mobile__tab-bar {
  position: relative
}

.menu-mobile__tab-bar > ul {
  grid-column-gap: 1px;
  grid-row-gap: 1px;
  background-color: #fff;
  display: grid;
  grid-template-columns:repeat(4, minmax(70px, 1fr));
  grid-template-rows:1fr
}

.menu-mobile__tab-bar > ul > li {
  background-color: #f5f5f5;
  min-width: 0;
  overflow: hidden;
  padding: 12px 0;
  text-align: center
}

.menu-mobile__tab-bar > ul > li .mtc-link {
  color: #000;
  max-width: 100%
}

.menu-mobile__tab-bar > ul > li .mtc-link span {
  display: block;
  font-size: 8px;
  font-weight: 500;
  letter-spacing: .5px;
  overflow: hidden;
  text-align: center;
  text-overflow: ellipsis;
  text-transform: uppercase;
  white-space: nowrap
}

.menu-mobile__tab-bar > ul > li .badge {
  background-color: #d6001c;
  border-radius: 200px;
  color: #fff;
  flex-grow: 0;
  font-size: 8px;
  font-weight: 500;
  left: 20px;
  margin-left: 4px;
  padding: 3px 5px;
  position: absolute;
  top: -10px
}

.menu-mobile__tab-bar > ul .menu-mobile__account {
  overflow: visible;
  position: relative
}

.menu-mobile__tab-bar > ul .menu-mobile__account span > div {
  margin-bottom: 2px
}

.menu-mobile__tab-bar > ul .menu-mobile__account span .account__user-avatar {
  margin: 0 auto;
  position: relative
}

.menu-mobile__tab-bar > ul .menu-mobile__account span .account__user-avatar img {
  height: 26px;
  width: 26px
}

@media only screen and (max-width: 600px) {
  .menu-mobile__tab-bar > ul .menu-mobile__account span .account__user-avatar img {
    height: 22px;
    width: 22px
  }
}

.menu-mobile__tab-bar .mobile-menu__sec-locale {
  margin: 5px 0 6px;
  width: 20px;
}

.menu-mobile__tab-bar > ul .menu-mobile__my-orders ul {
  background-color: #fff;
  bottom: calc(100% + 10px);
  box-shadow: 0 2px 20px 0 rgba(0, 0, 0, .19);
  left: 10px;
  padding: 20px 15px;
  position: absolute;
  right: 10px
}

.menu-mobile__tab-bar > ul .menu-mobile__my-orders ul li {
  background-color: #fff;
  padding: 0;
  text-align: left
}

.menu-mobile__tab-bar > ul .menu-mobile__my-orders ul label {
  font-size: 8px;
  font-weight: 500;
  text-transform: uppercase
}

.menu-mobile__tab-bar > ul .menu-mobile__my-orders ul button, .menu-mobile__tab-bar > ul .menu-mobile__my-orders ul input, .menu-mobile__tab-bar > ul .menu-mobile__my-orders ul label {
  display: block;
  width: 100%
}

.menu-mobile__tab-bar > ul .menu-mobile__my-orders ul input {
  font-size: 12px;
  height: 2.4rem;
  line-height: 2.4rem;
  padding: 5px 10px
}

.menu-mobile__tab-bar > ul .menu-mobile__my-orders ul:after {
  border: 8px solid hsla(0, 0%, 100%, 0);
  border-top-color: #fff;
  content: " ";
  height: 0;
  left: 50%;
  margin-left: -8px;
  pointer-events: none;
  position: absolute;
  top: 100%;
  width: 0
}

.menu-mobile__tab-bar > ul .menu-mobile__my-orders .mtc-link {
  position: relative
}

.nav-header__title {
  flex: 0 1 76%;
  position: relative
}

.nav-header__title h1 {
  color: #d6001c;
  font-size: 11px;
  font-weight: 600;
  height: 40px;
  line-height: 40px;
  margin: 0;
  position: relative;
  text-align: center;
  text-transform: uppercase;
  width: 100%
}

.nav-header__title h1 .mtc-link, .nav-header__title h1 span {
  left: 50%;
  max-width: 100%;
  overflow: hidden;
  position: absolute;
  text-overflow: ellipsis;
  top: 50%;
  -webkit-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
  white-space: nowrap
}

.nav-header__shopping-bag {
  display: flex;
  flex: 0 0 12%;
  justify-content: flex-end
}

.nav-header__shopping-bag button {
  margin-right: -10px;
  padding: 10px
}

.menu-mobile__nav {
  width: 100%
}


.menu-mobile__nav .menu-mobile__grid-nav, .menu-mobile__nav .menu-mobile__list-nav {
  grid-column-gap: 0;
  grid-row-gap: 0;
  display: grid;
  grid-template-columns:repeat(2, 1fr);
  grid-template-rows:1fr
}

.menu-mobile__nav .menu-mobile__grid-nav li, .menu-mobile__nav .menu-mobile__list-nav li {
  background-color: #fff;
  box-shadow: inset -1px -1px 0 0 #f5f5f5;
  min-width: 0;
  overflow: hidden;
  padding: 15px 0;
  text-align: center
}

.menu-mobile__nav .menu-mobile__grid-nav li:active, .menu-mobile__nav .menu-mobile__list-nav li:active {
  background-color: #f5f5f5
}

.menu-mobile__nav .menu-mobile__grid-nav li:active button, .menu-mobile__nav .menu-mobile__list-nav li:active button {
  color: #d6001c
}

.menu-mobile__nav .menu-mobile__grid-nav .mtc-link, .menu-mobile__nav .menu-mobile__grid-nav button, .menu-mobile__nav .menu-mobile__list-nav .mtc-link, .menu-mobile__nav .menu-mobile__list-nav button {
  color: #000;
  max-width: 100%;
  width: 100%
}

.menu-mobile__nav .menu-mobile__grid-nav .mtc-link span, .menu-mobile__nav .menu-mobile__grid-nav button span, .menu-mobile__nav .menu-mobile__list-nav .mtc-link span, .menu-mobile__nav .menu-mobile__list-nav button span {
  display: block;
  font-size: 8px;
  font-weight: 500;
  letter-spacing: .5px;
  margin-top: 5px;
  text-align: center;
  text-transform: uppercase
}

.menu-mobile__tab-bar {
  position: relative
}

.menu-mobile__tab-bar > ul {
  grid-column-gap: 1px;
  grid-row-gap: 1px;
  background-color: #fff;
  display: grid;
  grid-template-columns:repeat(4, minmax(70px, 1fr));
  grid-template-rows:1fr
}

.menu-mobile__tab-bar > ul > li {
  background-color: #f5f5f5;
  min-width: 0;
  overflow: hidden;
  padding: 12px 0;
  text-align: center
}

.menu-mobile__tab-bar > ul > li .mtc-link {
  color: #000;
  max-width: 100%
}

.menu-mobile__tab-bar > ul > li .mtc-link span {
  display: block;
  font-size: 8px;
  font-weight: 500;
  letter-spacing: .5px;
  overflow: hidden;
  text-align: center;
  text-overflow: ellipsis;
  text-transform: uppercase;
  white-space: nowrap
}

.menu-mobile__tab-bar > ul > li .badge {
  background-color: #d6001c;
  border-radius: 200px;
  color: #fff;
  flex-grow: 0;
  font-size: 8px;
  font-weight: 500;
  left: 20px;
  margin-left: 4px;
  padding: 3px 5px;
  position: absolute;
  top: -10px
}

.menu-mobile__tab-bar > ul .menu-mobile__account {
  overflow: visible;
  position: relative
}

.menu-mobile__tab-bar > ul .menu-mobile__account span > div {
  margin-bottom: 2px
}

.menu-mobile__tab-bar > ul .menu-mobile__account span .account__user-avatar {
  position: relative
}

.menu-mobile__tab-bar > ul .menu-mobile__account span .account__user-avatar img {
  height: 26px;
  width: 26px
}

@media only screen and (max-width: 600px) {
  .menu-mobile__tab-bar > ul .menu-mobile__account span .account__user-avatar img {
    height: 22px;
    width: 22px
  }
}

.menu-mobile__tab-bar > ul .menu-mobile__my-orders ul {
  background-color: #fff;
  bottom: calc(100% + 10px);
  box-shadow: 0 2px 20px 0 rgba(0, 0, 0, .19);
  left: 10px;
  padding: 20px 15px;
  position: absolute;
  right: 10px
}

.menu-mobile__tab-bar > ul .menu-mobile__my-orders ul li {
  background-color: #fff;
  padding: 0;
  text-align: left
}

.menu-mobile__tab-bar > ul .menu-mobile__my-orders ul label {
  font-size: 8px;
  font-weight: 500;
  text-transform: uppercase
}

.menu-mobile__tab-bar > ul .menu-mobile__my-orders ul button, .menu-mobile__tab-bar > ul .menu-mobile__my-orders ul input, .menu-mobile__tab-bar > ul .menu-mobile__my-orders ul label {
  display: block;
  width: 100%
}

.menu-mobile__tab-bar > ul .menu-mobile__my-orders ul input {
  font-size: 12px;
  height: 2.4rem;
  line-height: 2.4rem;
  padding: 5px 10px
}

.menu-mobile__tab-bar > ul .menu-mobile__my-orders ul:after {
  border: 8px solid hsla(0, 0%, 100%, 0);
  border-top-color: #fff;
  content: " ";
  height: 0;
  left: 50%;
  margin-left: -8px;
  pointer-events: none;
  position: absolute;
  top: 100%;
  width: 0
}


.menu-mobile__tab-bar > ul .menu-mobile__my-orders .mtc-link {
  position: relative
}

.show .menu-mobile__main {
  opacity: 1;
  -webkit-transform: translateX(0);
  transform: translateX(0);
}


.account__user-avatar {
  border-radius: 200px;
  color: #fff;
  font-weight: 700;
  text-align: center;
  text-transform: uppercase;
}

.menu-mobile__tab-bar > ul .menu-mobile__account span > div {
  margin-bottom: 2px;
}


/******************************** secondary menu **********************************************/

.menu-mobile__nav-sec {
  opacity: 1;
  transition: opacity 0.5s ease-in-out;
}

.menu-mobile__nav-sec ul {
  grid-column-gap: 0;
  grid-row-gap: 0;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: 1fr;
}

.menu-mobile__nav-sec li {
  background-color: #fff;
  box-shadow: inset -1px -1px 0 0 #f5f5f5;
  min-width: 0;
  overflow: hidden;
  padding: 15px 0;
  text-align: center;
}

.menu-mobile__nav-sec h2 {
  background-color: #000;
  color: #fff;
  font-size: 10px;
  font-weight: 600;
  letter-spacing: 1px;
  line-height: 25px;
  margin: 0;
  padding: 0 12px;
  text-transform: uppercase;
}


.menu-mobile__nav-sec .mtc-link span {
  display: block;
  font-size: 8px;
  font-weight: 500;
  letter-spacing: .5px;
  margin-top: 5px;
  overflow: hidden;
  text-align: center;
  text-overflow: ellipsis;
  text-transform: uppercase;
  white-space: nowrap;
}


/*************************************************************************** account menu */


.menu-mobile__tab-bar > ul .menu-mobile__account .user-menu__account-content {
  bottom: calc(100% + 10px);
  left: 20px;
  right: auto;
  text-align: left;
  top: auto
}

.menu-mobile__tab-bar > ul .menu-mobile__account .user-menu__account-content:after {
  border-bottom: 0;
  border-top-color: #fff;
  bottom: 0;
  left: 40px;
  right: auto;
  top: 100%
}


.user-menu__account-content:after {
  border: 8px solid rgba(136, 183, 213, 0);
  border-bottom-color: #fff;
  bottom: 100%;
  content: "";
  height: 0;
  margin-left: -8px;
  pointer-events: none;
  position: absolute;
  right: 22px;
  width: 0;
}

.user-menu__account-content {
  background-color: #fff;
  box-shadow: 0 0 20px 0 rgba(0, 0, 0, .1), 0 0 35px 0 rgba(0, 0, 0, .15);
  padding: 30px;
  position: absolute;
  right: 0;
  top: 100%;
  width: auto;
  z-index: 260;
}

.menu-mobile__account > ul li {
  background-color: #f5f5f5;
  min-width: 0;
  overflow: hidden;
  padding: 2px 0;
  text-align: center
}

.user-menu__account-content svg {
  vertical-align: -5px;
}


.user-menu__account-content {
  background-color: #fff;
  box-shadow: 0 0 20px 0 rgba(0, 0, 0, .1), 0 0 35px 0 rgba(0, 0, 0, .15);
  padding: 30px;
  position: absolute;
  right: 0;
  top: 100%;
  width: auto;
  z-index: 260;
}


.user-menu__account-content a {
  color: #000;
  display: block;
  font-size: 12px;
  font-weight: 600;
  padding: 10px 0;
  text-transform: uppercase;
  white-space: nowrap;
}

@media (max-width: 771px) {
  li .mtc-link, li > a {
    font-size: 9px;
    letter-spacing: -.5px;
    padding: 6px;
  }
}

@media only screen and (max-width: 600px) {
  .user-menu__account-content {
    padding: 15px;
    top: 105%;
  }

  .user-menu__account-content:after {
    right: 10px;
  }

  .user-menu__account-content a {
    font-size: 10px;
    padding: 5px 0;
  }

  .menu-mobile__tab-bar > ul .menu-mobile__account span .account__user-avatar img {
    height: 22px;
    width: 22px;
  }

  .small {
    height: 22px;
    line-height: 22px;
    width: 22px;
  }

  .mobile .mtc-link p {
    letter-spacing: .5px;
  }
}
</style>
