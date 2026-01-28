<script setup>


import { Departments } from "@/models/index.js"


const currDept = ref()
currDept.value = useCookie('user-department').value

const goTo = ( url, departmentId) => {
  useCookie('user-department').value = departmentId
  nextTick()
  console.log("set cookie: " + useCookie('user-department').value + " : " + departmentId)
  window.location = (`${url}`)
}

onMounted(() => {


  if(!useCookie('user-department').value){
    useCookie('user-department').value = Departments.Road
  }


  currDept.value = useCookie('user-department').value
  console.log("currDept:" + currDept.value)
})

</script>

<template>
  <!-- #segments -->
  <ul id="segments">
    <li
      class="c0  "
      :class="{ open: currDept === Departments.Road}"
      style="background-color: transparent;"
    >
      <a
        title="Motomundi"
        @click="goTo('/', Departments.Road) "
      >
        <span class="l">
          <span
            class="r"
            style="padding: 0 10px;"
          >Calle </span>
        </span>
      </a>
    </li>
    <li
      class="c1 "
      :class="{ open: currDept === Departments.CafeRacer}"
      style="background-color: transparent;"
    >
      <a
        @click="goTo('/cafe-racer', Departments.CafeRacer) "
        title="Ropa Café Racer en Motomundi"
      >
        <span class="l">
          <span class="r">Café Racer</span>
          <i style=" font-size: 12px;font-weight: normal;text-transform: lowercase" />
        </span>
      </a>
    </li>
    <li
      class="c2 "
      :class="{ open: currDept === Departments.Mx}"
      style="background-color: transparent;"
    >
      <a
        @click="goTo('/motocross-enduro-trial', Departments.Mx) "
        title="Off-Road en Motomundi"
      >
        <span class="l">
          <span class="r">Off-Road </span>
          <i style=" font-size: 12px;font-weight: normal;text-transform: lowercase" />
        </span>
      </a>
    </li>
    <li
      class="c3 "
      :class="{ open: currDept === Departments.LifeStyle}"
      style="background-color: transparent;"
    >
      <a
        @click="goTo('/ropa-casual', Departments.LifeStyle) "
        title="Ropa Casual en Motomundi"
      >
        <span class="l">
          <span class="r">Ropa Casual</span>
          <i style=" font-size: 12px;font-weight: normal;text-transform: lowercase" />
        </span>
      </a>
    </li>
    <li class="c4 segment-float-right hide-on-med-and-down">
      <a
        href="/moto-blog"
        title="Blog de motos Motomundi"
      >
        <span class="l">
          <span class="r">Blog</span>
        </span>
      </a>
    </li>
    <li class="c5 segment-float-right  hide-on-med-and-down">
      <a
        href="/novedades"
        title="Novedades en equipamiento para moto"
      >
        <span class="l">
          <span class="r">Novedades</span>
        </span>
      </a>
    </li>
    <li class="c6 segment-float-right  hide-on-med-and-down">
      <a
        href="/outlet"
        title="Ofertas de equipamiento de moto"
      >
        <span class="l">
          <span class="r">Ofertas</span>
        </span>
      </a>
    </li>
  </ul>
  <!-- /#segements -->
</template>


