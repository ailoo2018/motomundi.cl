<script setup>
import { Departments } from "@/models/index.js"


const route = useRoute()


const currDept = ref()

if (route.path === ( '/' ) ) {
  currDept.value =Departments.Road
}else if (route.path.startsWith( '/cafe-racer' ) ) {
  currDept.value =Departments.CafeRacer
}else if(route.path.startsWith("/motocross-enduro-trial")){
  currDept.value =Departments.Mx
}else if(route.path.startsWith("/ropa-casual")){
  currDept.value =Departments.Mx
}

const goTo = ( event, url, departmentId) => {
  event.preventDefault()
  useCookie('user-department').value = departmentId
  console.log("set cookie: " + useCookie('user-department').value + " : " + departmentId)
  navigateTo(`${url}`)
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
        href="/"
        title="Motomundi"
        @click="goTo($event,'/', Departments.Road) "
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
        href="/cafe-racer"
        title="Ropa Café Racer en Motomundi"
        @click="goTo($event,'/cafe-racer', Departments.CafeRacer) "
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
        href="/motocross-enduro-trial"
        title="Off-Road en Motomundi"
        @click="goTo($event, '/motocross-enduro-trial', Departments.Mx) "
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
        href="/ropa-casual"
        title="Ropa Casual en Motomundi"
        @click="goTo($event, '/ropa-casual', Departments.LifeStyle) "
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


