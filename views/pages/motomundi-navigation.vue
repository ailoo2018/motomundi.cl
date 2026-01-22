<script>
import { defineComponent } from "vue"
import Cascos from "@/views/pages/navigation/cascos.vue"
import RopaCalle from "@/views/pages/navigation/ropa-calle.vue"
import RopaOffroad from "@/views/pages/navigation/ropa-offroad.vue"
import RopaCasual from "@/views/pages/navigation/ropa-casual.vue"
import Accesorios from "@/views/pages/navigation/accesorios.vue"
import Neumaticos from "@/views/pages/home/neumaticos.vue"
import Marcas from "@/views/pages/home/marcas.vue"
import Parts from "@/views/pages/navigation/parts.vue"
import PartsMegaMenuContent from "@/views/pages/navigation/parts-mega-menu-content.vue"
import DepartmentsMenu from "@/views/pages/navigation/departments-menu.vue";

const menuActivator = ref(null)
const isMenuOpen = ref(false)

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value
}

const closeMenu = () => {
  isMenuOpen.value = false
}

const selectDepartment = () => {

}


export default defineComponent({
  components: {DepartmentsMenu, PartsMegaMenuContent, Parts, Marcas, Neumaticos, Accesorios, RopaCasual, RopaOffroad, RopaCalle, Cascos },
})
</script>

<template>
  <div id="main-navigation" class="main-container">
    <nav id="nav">
      <DepartmentsMenu />
      <ul
        id="menu-anchor"
        class="u0"
      >
        <Cascos href="/cascos-para-moto" />
        <RopaCalle href="/ropa-calle-para-moto"/>
        <RopaOffroad href="/ropa-mx-para-moto"/>
        <RopaCasual href="/ropa-casual"/>
        <Parts href="/accesorios-para-motos"/>
        <Neumaticos href="/neumaticos-para-moto"/>
        <Marcas href="#"/>
      </ul>
    </nav>
  </div>
</template>

<style>



.centered-mega-menu {
  left: 50% !important;
  transform: translateX(-50%) !important;
  max-width: 1300px !important;
}
#nav {
  min-width: 800px;
  max-width: 1300px;
  margin-left: auto;
  margin-right: auto;
  background-color: #fff;

}

#nav ul {
  padding: 0;
  margin: 0;
}

#nav #segments li.open {
  color: #fff;
}

#nav ul li {
  display: inline-block;
  line-height: inherit;
}

#nav #segments li a {
  padding: 10px 5px 7px 8px;
  font-weight: 600;
  text-transform: uppercase;
}

#nav #segments li.open a {
  padding: 14px 14px 8px 15px;
  margin-top: -3px;
  font-weight: 700;
  background-color: #b21a15;
}

#nav ul.u0 {
  background-color: #b21a15;
}


#nav ul.u1 {
  position: absolute;
  left: 0px;
  z-index: 2000;
  box-sizing: border-box;
  width: 100%;
  background: #fff;
  border-bottom: solid 2px #b21a15;
  -webkit-box-shadow: 0 0 10px 0 rgba(0, 0, 0, .2);
  -moz-box-shadow: 0 0 10px 0 rgba(0, 0, 0, .2);
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, .2);
}

#nav ul.u0 li.l0:first-child > a {
  padding-left: 15px;
}

#nav ul.u0 ul.u1 {
  /*visibility: hidden;*/
  transition-delay: 300ms;
}

#nav ul.u0 li:hover ul.u1 {
  visibility: visible;
  transition-delay: 300ms;
  padding-bottom: 20px;
}

#nav ul.u0 li:hover ul.u1::after {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: -200px; /* Adjust this to cover the height of the dropdown */
  z-index: -1; /* Keeps it behind the content but counts for hover */
}

#nav .main-nav li:hover .submenu {
  display: block;
}

.subCategories {
  width: 100%;
}

#nav .container {
  width: 100%;
  max-width: 100%;
}

#nav #segments li.segment-float-right {
  float: right;
  padding-right: 24px;
}

#nav a {
  font-weight: normal;
}


#nav ul.u0 li.l0 > a {
  display: block;
  padding: 12px 14px 10px 13px;
  color: #fff;
  letter-spacing: -.5px;
}

#nav ul li a {
  display: block;
  color: inherit;
  font-size: 14px;
}

#nav .menu-tires .submenu__content.submenu__icon-buttons a img, #nav .submenu__content.submenu__icon-buttons span.mtc-link img {
  height: auto;
  margin-bottom: 3px;
  width: 100px;
}

#nav ul.u0 li.l0 + li.l0:before {
  content: "";
  display: block;
  height: 12px;
  border-left: solid 1px #cb3d01;
  position: absolute;
  bottom: 12px;
}

a, span.mtc-link {
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  color: #d6001c;
  cursor: pointer;
  -webkit-text-decoration: none;
  text-decoration: none;
}


#nav .main-nav li .submenu span.h2 {
  font-size: 18px;
  font-weight: 900;
  letter-spacing: 1px;
  line-height: 18px;
  margin: 0;
  text-transform: uppercase;
}

#nav .main-nav li .submenu span.h2 a, .main-nav li .submenu span.h2 span.mtc-link {
  background: transparent url(data:image/svg+xml;base64,PHN2ZyBoZWlnaHQ9IjciIHdpZHRoPSI0IiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxwYXRoIGQ9Ik0uOCA1LjhsMi40LTIuNEwuOCAxIiBmaWxsPSJub25lIiBzdHJva2U9IiNlYjAwMTIiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIgc3Ryb2tlLXdpZHRoPSIxLjIiLz48L3N2Zz4=) 100% no-repeat;
  color: #d6001c;
  display: inline-block;
  font-size: 9px;
  font-weight: 600;
  letter-spacing: 1px;
  line-height: 18px;
  padding-right: 8px;
  vertical-align: middle;
}

#nav .main-nav li .submenu span.h2 {
  font-size: 18px;
  font-weight: 900;
  letter-spacing: 1px;
  line-height: 18px;
  margin: 0;
  text-transform: uppercase;
}

#nav .main-nav li:hover .submenu {
  display: block;
}

#nav .main-nav li .submenu > .container > .row {
  margin-bottom: 0;
}

#nav .main-nav li .submenu .submenu__container, #nav .main-nav li .submenu .submenu__header {
  display: flex;
  justify-content: space-between;
  margin: 0 !important;
  width: 100%;
}

#nav .main-nav li .submenu .submenu__main-content {
  flex: 1 1 auto;
}

#nav .main-nav li .submenu .submenu__main-content.submenu__no-border {
  border-right: 0;
  margin-right: 0;
  /*padding-right: 0;*/
}

#nav .main-nav li .submenu .submenu__header {
  margin-bottom: 30px;
}


#nav .submenu__content.submenu__icon-buttons {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  /*flex-wrap: wrap;*/
  justify-content: flex-start;
}

#nav .submenu__content.submenu__icon-buttons a, #nav .submenu__content.submenu__icon-buttons span.mtc-link {
  display: block;
  margin-bottom: 30px;
  min-width: 16.6666%;
  text-align: center;
}

#nav .submenu__content.submenu__icon-buttons a img, #nav .submenu__content.submenu__icon-buttons span.mtc-link img {
  height: auto;
  margin-bottom: 3px;
  width: 70px;
}


#nav ul.u0 #ni_2529_marcas ul.u1 a {
  line-height: 5px;
}

#nav .main-nav li .submenu .submenu__container, #nav .main-nav li .submenu .submenu__header {
  display: flex;
  justify-content: space-between;
}


#nav .bike-search {
  flex: 0 0 25%;
  text-align: center;
}


#nav .submenu__divider:before {
  margin: 5px 10px 5px 0;
}

#nav .submenu__divider:after, #nav .submenu__divider:before {
  background-color: #e8e8e8;
  content: "";
  flex: 1;
  padding: 1px;
}

#nav .submenu__divider:after {
  margin: 5px 20px 5px 10px;
}

#nav .submenu__divider:after, #nav .submenu__divider:before {
  background-color: #e8e8e8;
  content: "";
  flex: 1;
  padding: 1px;
}

#nav .submenu__divider {
  align-items: center;
  display: flex;
  font-size: 11px;
  font-weight: 500;
  letter-spacing: 1px;
  margin: 15px 0 20px;
  text-transform: uppercase;
}

#nav .submenu__outstanding-list {
  font-size: 10px;
  font-weight: 500;
  letter-spacing: 1.25px;
  text-transform: uppercase;
}


#nav .submenu__outstanding-list ul.five-columns {
  -moz-columns: 100px 5;
  columns: 100px 5;
}


/* SECOND MENU */

#nav .main-nav li .submenu > .container > .row {
  margin-bottom: 0;
}

#nav .main-nav li .submenu .submenu__header {
  margin-bottom: 30px;
}

#nav .main-nav li .submenu .submenu__main-content {
  flex: 1 1 auto;
}

#nav .main-nav li .submenu .submenu__container, #nav .main-nav li .submenu .submenu__header {
  display: flex;
  justify-content: space-between;
}


#nav .main-nav li .submenu span.h2 {
  font-size: 18px;
  font-weight: 900;
  letter-spacing: 1px;
  line-height: 18px;
  margin: 0;
  text-transform: uppercase;
}

#nav .main-nav li .submenu span.h2 a, .main-nav li .submenu span.h2 span.mtc-link {
  background: transparent url(data:image/svg+xml;base64,PHN2ZyBoZWlnaHQ9IjciIHdpZHRoPSI0IiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxwYXRoIGQ9Ik0uOCA1LjhsMi40LTIuNEwuOCAxIiBmaWxsPSJub25lIiBzdHJva2U9IiNlYjAwMTIiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIgc3Ryb2tlLXdpZHRoPSIxLjIiLz48L3N2Zz4=) 100% no-repeat;
  color: #d6001c;
  display: inline-block;
  font-size: 9px;
  font-weight: 600;
  letter-spacing: 1px;
  line-height: 18px;
  padding-right: 8px;
  vertical-align: middle;
}

#nav .submenu__content.submenu__icon-buttons {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  /* flex-wrap: wrap; */
  justify-content: flex-start;
}

#nav .submenu__main-content {
  padding: 20px 30px 8px;
}


#nav .main-nav li .submenu span.h2 {
  font-size: 18px;
  font-weight: 900;
  letter-spacing: 1px;
  line-height: 18px;
  margin: 0;
  text-transform: uppercase;
}

#nav .submenu__content.submenu__icon-buttons a img, #nav .submenu__content.submenu__icon-buttons span.mtc-link img {
  height: auto;
  margin-bottom: 3px;
  width: 70px;
}


.col.s12.submenu__extra-nav {
  padding: 0;
}

.extra__brands {
  border-top: 1px solid #f5f5f5;
  margin-top: 10px;
  padding: 10px 0;
}

.extra__brands > .container span.h3 {
  display: block;
  font-size: 10px;
  font-weight: 800;
  letter-spacing: .5px;
  line-height: 16px;
  margin: 0;
  text-align: center;
  text-transform: uppercase;
}

.extra__brands > .container {
  align-items: center;
  display: flex;
  flex: 0 0 100%;
  justify-content: space-between;
}

#nav .extra__container .container {
  padding-left: 20px;
  padding-right: 20px;
}

.submenu__riding-styles {
  background-color: #f5f5f5;
  border-top: 1px solid #fff;
  padding: 12px 0;
}

#nav .extra__container .container {
  padding-left: 20px;
  padding-right: 20px;
}

.extra__brands a, .extra__brands span.mtc-link {
  align-items: center;
  color: #000;
  display: block;
  display: flex;
  font-size: 9px;
  font-weight: 500;
  padding: 0 10px;
  text-align: center;
  text-transform: uppercase;
}

.submenu__riding-styles span.h3 {
  display: block;
  font-size: 10px;
  font-weight: 800;
  letter-spacing: .5px;
  line-height: 16px;
  margin: 0;
  text-align: center;
  text-transform: uppercase;
}

.extra__brands {
  border-top: 1px solid #f5f5f5;
  margin-top: 10px;
  padding: 10px 0;
}

.extra__brands li {
  display: inline-block;
  overflow: hidden;
}

/*
.desktop {
  display: flex;
  justify-content: space-between;
}
*/

#nav ul.u0 ul.u1 a {
  transition: unset;
}

#nav ul li a {
  display: block;
  color: inherit;
  font-size: 14px;
}


.submenu__riding-styles > .container {
  align-items: center;
  display: flex;
  flex: 0 0 100%;
  justify-content: space-between;
}

/*.desktop a, .desktop span.mtc-link {
  align-items: center;
  color: #000;
  display: block;
  display: flex;
  font-size: 9px;
  font-weight: 500;
  padding: 0 10px;
  text-align: center;
  text-transform: uppercase;
}*/

.desktop li img {
  display: block;
  height: 23px;
  margin-right: 3px;
  width: 35px;
}

.desktop a p, .desktop span.mtc-link p {
  margin: 0;
}

li .mtc-link, li > a {
  color: #000;
  display: inline-block;
  font-size: 12px;
  font-weight: 500;
  letter-spacing: 0;
  text-transform: uppercase;
}
</style>

