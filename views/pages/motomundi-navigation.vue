<script setup>
import { defineComponent } from "vue"
import Cascos from "@/views/pages/navigation/cascos.vue"
import RopaCalle from "@/views/pages/navigation/ropa-calle.vue"
import RopaOffroad from "@/views/pages/navigation/ropa-offroad.vue"
import RopaCasual from "@/views/pages/navigation/ropa-casual.vue"
import Neumaticos from "@/views/pages/home/neumaticos.vue"
import Marcas from "@/views/pages/home/marcas.vue"
import Parts from "@/views/pages/navigation/parts.vue"
import DepartmentsMenu from "@/views/pages/navigation/departments-menu.vue"

const menuActivator = ref(null)
const isMenuOpen = ref(false)

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value
}

const closeMenu = () => {
  isMenuOpen.value = false
}



</script>

<template>
  <div id="main-navigation" class="main-container">
    <nav id="nav">
      <DepartmentsMenu/>
      <ul id="menu-anchor" class="u0">
        <Cascos href="/cascos-para-moto"/>
        <RopaCalle href="/ropa-calle-para-moto"/>
        <RopaOffroad href="/motocross-enduro-trial"/>
        <RopaCasual href="/ropa-casual"/>
        <Parts href="/accesorios-para-motos"/>
        <Neumaticos href="/neumaticos-para-moto"/>
        <Marcas href="#"/>
      </ul>
    </nav>
  </div>
</template>

