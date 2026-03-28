<script setup>
import { Departments } from "@/models/index"

const { setDepartment, currDept } = useDepartment()

const router = useRouter()

const goTo = async (event, url, departmentId) => {
  event.preventDefault()

  setDepartment( departmentId )
  await router.push(url)
}
</script>

<template>
  <!-- #segments -->
  <ClientOnly>
    <ul id="segments">
      <li
        class="c0"
        :class=" currDept === Departments.Road ? 'open' : ''"
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
            >Calle</span>
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
      <li style="color: #fff">
        {{currDept}}
      </li>
    </ul>
  </ClientOnly>
  <!-- /#segements -->
</template>

<style scoped>
#nav #segments li.open a {
  padding: 14px 14px 8px 15px;
  margin-top: -3px;
  font-weight: 700;
  background-color: #b21a15;
}
</style>

