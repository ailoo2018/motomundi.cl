<script setup>
import { Departments } from "@/models/index.js"

const route = useRoute()

const getDeptFromPath = (path) => {
  if (path === '/') return Departments.Road
  if (path.startsWith('/cafe-racer')) return Departments.CafeRacer
  if (path.startsWith('/motocross-enduro-trial')) return Departments.Mx
  if (path.startsWith('/ropa-casual')) return Departments.LifeStyle
  return null
}

const currDept = ref(getDeptFromPath(route.path))

// 👇 Reacts to every navigation, including client-side NuxtLink clicks
watch(() => route.path, (newPath) => {
  const dept = getDeptFromPath(newPath)
  if (dept !== null) {
    currDept.value = dept
    useCookie('user-department').value = dept
  }
}, { immediate: true }) // immediate: true replaces your onMounted logic

const goTo = (event, url, departmentId) => {
  useCookie('user-department').value = departmentId
}
</script>

<template>
  <!-- #segments -->
  <ul id="segments">
    <li
      class="c0  "
      :class="{ open: currDept === Departments.Road}"
      style="background-color: transparent;"
    >
      <NuxtLink
        to="/"
        title="Motomundi"
        @click="goTo($event,'/', Departments.Road) "
      >
        <span class="l">
          <span
            class="r"
            style="padding: 0 10px;"
          >Calle </span>
        </span>
      </NuxtLink>
    </li>
    <li
      class="c1 "
      :class="{ open: currDept === Departments.CafeRacer}"
      style="background-color: transparent;"
    >
      <NuxtLink
        to="/cafe-racer"
        title="Ropa Café Racer en Motomundi"
        @click="goTo($event,'/cafe-racer', Departments.CafeRacer) "
      >
        <span class="l">
          <span class="r">Café Racer</span>
          <i style=" font-size: 12px;font-weight: normal;text-transform: lowercase" />
        </span>
      </NuxtLink>
    </li>
    <li
      class="c2 "
      :class="{ open: currDept === Departments.Mx}"
      style="background-color: transparent;"
    >
      <NuxtLink
        to="/motocross-enduro-trial"
        title="Off-Road en Motomundi"
        @click="goTo($event, '/motocross-enduro-trial', Departments.Mx) "
      >
        <span class="l">
          <span class="r">Off-Road </span>
          <i style=" font-size: 12px;font-weight: normal;text-transform: lowercase" />
        </span>
      </NuxtLink>
    </li>
    <li
      class="c3 "
      :class="{ open: currDept === Departments.LifeStyle}"
      style="background-color: transparent;"
    >
      <NuxtLink
        to="/ropa-casual"
        title="Ropa Casual en Motomundi"
        @click="goTo($event, '/ropa-casual', Departments.LifeStyle) "
      >
        <span class="l">
          <span class="r">Ropa Casual</span>
          <i style=" font-size: 12px;font-weight: normal;text-transform: lowercase" />
        </span>
      </NuxtLink>
    </li>
    <li class="c4 segment-float-right hide-on-med-and-down">
      <NuxtLink
        to="/moto-blog"
        title="Blog de motos Motomundi"
      >
        <span class="l">
          <span class="r">Blog</span>
        </span>
      </NuxtLink>
    </li>
    <li class="c5 segment-float-right  hide-on-med-and-down">
      <NuxtLink
        to="/novedades"
        title="Novedades en equipamiento para moto"
      >
        <span class="l">
          <span class="r">Novedades</span>
        </span>
      </NuxtLink>
    </li>
    <li class="c6 segment-float-right  hide-on-med-and-down">
      <NuxtLink
        to="/outlet"
        title="Ofertas de equipamiento de moto"
      >
        <span class="l">
          <span class="r">Ofertas</span>
        </span>
      </NuxtLink>
    </li>
  </ul>
  <!-- /#segements -->
</template>


