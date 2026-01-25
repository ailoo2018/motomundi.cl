<script setup>
import StoreCalendar from "@/views/pages/stores/store-calendar.vue"

definePageMeta({
  layout: 'motomundi',
  public: true,

})


const { data } = await useFetch("/api/stores/list", {
  key: 'stores',
})

const stores = ref([])

if (data.value) {
  stores.value = data.value.facilities.map(item => ({
    ...item,
    expanded: false
  }))
}


</script>

<template>

  <section class="content help pa-4">
    <div class="row full-width">
      <div class="l12 s12 col">
        <h1 class="main-heading">
          Tiendas
        </h1>
      </div>
      <div
        v-for="store in stores"
        :key="store.id"
        class="l12 s12 col"
      >
        <div
          id="shop"
          :class="store.expanded ? '' : 'collapsed'"
        >
          <div class="shop-header">
            <DIV class="row">
              <DIV class="l6 m12 s12 col">
                <DIV class="shop-name">
                  <h1>Motomundi {{ store.name }}</h1>
                  <SPAN><I class="icon-phone" />{{ store.phone }}
                    <i class="icon-location" />{{ store.postalAddress?.address }}
                  </SPAN>
                </DIV>
              </DIV>
              <DIV class="l6 m6 col">
                <SPAN class="department-container hide-for-small-only" />
                <A
                  class="toggle-collapse"
                  @click="store.expanded = !store.expanded"
                >
                  <VIcon
                    :class="store.expanded ? 'tabler-chevron-down' : 'tabler-chevron-up'"
                    size="sm"
                  />
                </A>
              </DIV>
            </DIV>
          </div>
          <DIV class="shop-body row">
            <DIV class="shop-info l7 m6 col">
              <DIV class="shop-address">
                <h2><i class="icon-home" /> Direcci&oacute;n y tel&eacute;fono</h2>
                <p>{{ store.postalAddress?.address }}</p>
                <p>{{ store.postalAddress?.comuna?.name }}</p>
                <p>{{ store.phone }}</p>
              </DIV>

              <StoreCalendar />


              <DIV
                v-if="store.postalAddress?.comment"
                class="shop-access"
              >
                <H2><I class="icon-split" /> Accesos</H2>
                {{ store.postalAddress?.comment }}
              </DIV>
            </DIV>
            <DIV class="shop-map l5 m6 s12 col">
              <div class="shop-photos">
                <img
                  v-for="si in store.images"
                  class="photo loading"
                  :src="si.Url"
                >
              </div>
              <h2><I class="icon-location" /> Localizaci&oacute;n</h2>
              <DIV class="map-wrapper">
                <iframe
                  :src="store.postalAddress?.gmapsUrl"
                  width="100%"
                  height="275"
                  frameborder="0"
                  style="border:0"
                  allowfullscreen
                />
              </DIV>
              <ul class="shop-features lblock-grid-3 small-up-3" />
            </DIV>
          </DIV>
        </div>
      </div>
      <div />
    </div>
  </section>
</template>

<style>
.cms .row {
  margin-bottom: 15px;
  margin-left: auto;
  margin-right: auto;
}

.main-heading {
  margin-top: 20px;
  font: 18px "Open Sans", Arial, sans-serif;
  text-transform: uppercase;
  border-left: 3px solid #c74044;
  padding-left: 14px;
  line-height: 2;
  margin-bottom: 20px;
  font-weight: 600;
}
 .cms-content h1 {
  font-weight: 800;
  line-height: 1.2em;
  margin-bottom: 40px;
  margin-top: 12px;
  text-transform: uppercase;
  font-size: 2em;
}

#shop {
  border-radius: 3px;
  background-color: #f6f6f6;
  overflow: hidden;
  margin-bottom: 10px;
  transition: all .1s linear;
  position: relative
}

.row .row {
  margin: 0;
}

#shop.collapsed {
  padding-bottom: 0
}

/*
#shop.collapsed .toggle-collapse:after {
  font-family: mc-icons;
  content: "\64" !important
}
*/

#shop.collapsed:hover {
  cursor: pointer;
  background-color: #e7e7e7
}

#shop.collapsed .shop-header {
  border: none
}

#shop.collapsed .shop-body {
  display: none
}

#shop h2, #shop h3 {
  text-transform: uppercase;
  font-weight: 600;
  font-size: .95rem;
  margin-bottom: .75rem;
  color: #484848
}

#shop h2 i, #shop h3 i {
  color: #c74044
}

#shop .shop-header {
  cursor: pointer;
  border-bottom: 1px solid #ccc;
  padding: 20px;
  width: 100%;

}

#shop .shop-header .row {
  position: relative
}

#shop .shop-header img.departamento {
  max-height: 16px;
  max-width: 50px;
  margin: 0 0 0 15px;
  vertical-align: middle;
  display: inline-block
}

#shop .shop-name {
  overflow: hidden
}

#shop .shop-name h1 {
  text-transform: uppercase;
  font-size: 18px;
  font-weight: 600;
  color: #484848;
  margin-bottom: 0
}

#shop .shop-name span {
  font-weight: 400;
  color: #646464;
}

#shop .shop-name span i {
  color: #c74044
}

#shop .shop-name span i.icon-location {
  margin-left: .5rem
}

#shop .toggle-collapse {
  color: #c74044;
  font-size: 1.4rem;
  position: absolute;
  top: 50%;
  right: 20px;
  transform: translateY(-50%)
}

#shop .toggle-collapse:hover:after {
  color: #646464
}

/*
#shop .toggle-collapse:after {
  font-family: mc-icons;
  content: "\63"
}
*/

#shop .shop-info {
  padding-top: 14px
}

#shop .shop-body {
  display: block;
  padding: 0 20px 20px
}

#shop .shop-features {
  font-size: 12px;
  padding-top: 20px
}

#shop .shop-features [class*=feat-] {
  text-align: center;
  border-radius: 3px;
  text-transform: uppercase
}

#shop .shop-features [class*=feat-] div {
  border-radius: 60px;
  width: 30px;
  height: 30px;
  margin: 0 auto;
  color: #fff;
  line-height: 30px;
  margin-bottom: 5px
}

#shop .shop-features [class*=feat-].feat-min {
  color: #87201a
}

#shop .shop-features [class*=feat-].feat-min div {
  background-color: #87201a
}

#shop .shop-features [class*=feat-].feat-fin {
  color: #6d0e4a
}

#shop .shop-features [class*=feat-].feat-fin div {
  background-color: #6d0e4a
}

#shop .shop-features [class*=feat-].feat-tax {
  color: #35687e
}

#shop .shop-features [class*=feat-].feat-tax div {
  background-color: #35687e
}

#shop .shop-access, #shop .shop-address, #shop .shop-schedule {
  margin-bottom: 20px;
  padding-left: 20px
}

#shop .shop-access h2, #shop .shop-address h2, #shop .shop-schedule h2 {
  margin-left: -24px;
  text-align: left;
}

#shop .shop-schedule {
  border-top: 1px solid #ccc;
  padding-top: 20px;
  overflow: hidden
}

#shop h2 {
  margin-bottom: 10px;
  text-align: left;
}

#shop .shop-access {
  border-top: 1px solid #ccc;
  padding-top: 20px
}

#shop .shop-access p {
  margin-bottom: 15px;
  font-size: 12px;
  line-height: 20px
}

#shop .shop-access h3 {
  text-transform: uppercase;
  font-weight: 600;
  font-size: 12px
}

#shop .shop-map {
  float: right;
  padding-top: 14px
}

#shop .shop-photos {
  margin-bottom: 10px
}

#shop .shop-photos .photo {
  display: inline-block;
  margin-bottom: 0;
  margin-top: 15px;
}

#shop .shop-photos .photo:first-child {
  margin-top: 40px;
  max-width: 277px;
}

.department-container {
  float: right;
  margin-top: .7rem;
  margin-right: 2.5rem
}

.department-container img {
  width: auto;
  height: 14px;
  margin-right: .3rem
}

.calendar {
  background: transparent;
  border-collapse: collapse;
  color: #222;
  font-size: 13px;
  width: 280px;
  float: left;
  /*
  margin-right: 20px;
  margin-left: -20px;
  */
}

.calendar .days td {
  color: #8a8a8a !important;
  font-weight: 400 !important;
  background-color: #f6f6f6
}

.calendar td {
  border: 1px solid #f6f6f6;
  color: #444;
  line-height: 22px;
  text-align: center;
  padding: 3px 0
}

.calendar tr:first-child td {
  color: #222;
  font-weight: 700
}

.calendar-info {
  float: left
}

.calendar-info h3 {
  font-weight: 600;
  text-transform: uppercase
}

.calendar-info ul {
  font-size: 12px
}

.other-month {
  opacity: .5
}


@media only screen and (max-width: 600px) {
  #shop .shop-name span {
    font-weight: 400;
    color: #646464;
    font-size: 0.85em;
  }

}
</style>
