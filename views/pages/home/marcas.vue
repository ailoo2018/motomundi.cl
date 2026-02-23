<script setup>
const { data: brands } = useFetch("/api/product/brands", { key: "brands-all"})
</script>
<template>
  <!-- marcas -->
  <li
    class="l0 c3 main-nav"
    v-bind="props"
  >
    <a>
      <span>Marcas</span>
    </a>
    <ul class="u1 main-nav">
      <li class="l1 c0 primary subCategories">
        <div
          class="submenu"
          style="padding:20px 0;"
        >
          <div class="container">
            <div class="row">
              <div class="col s12 submenu__container">
                <div class="submenu__main-content submenu__no-border">
                  <div class="submenu__header">
                    <span class="h2">
                      <span>Marcas</span>
                    </span>
                  </div>
                  <div
                    class="submenu__content submenu__outstanding"
                    parent-menu-title="Marcas"
                    icon="/assets/menu/categories/134-marcas.svg"
                    order="7"
                    link=""
                    identifier="13"
                  >
                    <div class="submenu__outstanding-showcase brands">
                      <a
                        href="/agv"
                        class="mtc-link"
                        title="AGV"
                      ><span lazy="true"><img
                         src="https://cf-cdn.motocard.com/cdn-cgi/image/w=80,h=41,q=91,fit=cover,f=auto/brands/outstanding/brand-82.png"
                         class="cdn-img v-lazy-image v-lazy-image-loaded"
                         alt="AGV"
                         width="80"
                         height="41"
                       > </span>
                        <div class="submenu__outstanding-icon" />
                      </a>
                      <a
                        href="/alpinestars"
                        class="mtc-link"
                        title="ALPINESTARS"
                      ><span lazy="true"><img
                         src="https://cf-cdn.motocard.com/cdn-cgi/image/w=80,h=41,q=91,fit=cover,f=auto/brands/outstanding/brand-77.png"

                         class="cdn-img v-lazy-image v-lazy-image-loaded"
                         alt="ALPINESTARS"
                         width="80"
                         height="41"
                       > </span>
                        <div class="submenu__outstanding-icon" />
                      </a>
                      <a
                        href="/arai"
                        class="mtc-link"
                        title="ARAI"
                      ><span lazy="true"><img
                         src="https://cf-cdn.motocard.com/cdn-cgi/image/w=160,h=82,q=91,fit=cover,f=auto/brands/outstanding/brand-83.png"

                         class="cdn-img v-lazy-image v-lazy-image-loaded"
                         alt="ARAI"
                         width="80"
                         height="41"
                       > </span>
                        <div class="submenu__outstanding-icon" />
                      </a>

                      <a

                        href="/dainese"
                        class="mtc-link"
                        title="DAINESE"
                      ><span lazy="true"><img
                         src="https://cf-cdn.motocard.com/cdn-cgi/image/w=160,h=82,q=91,fit=cover,f=auto/brands/outstanding/brand-79.png"
                         class="cdn-img v-lazy-image v-lazy-image-loaded"
                         alt="DAINESE"
                         width="80"
                         height="41"
                       > </span>
                        <div class="submenu__outstanding-icon" />
                      </a>
                      <a

                        href="/givi"
                        class="mtc-link"
                        title="GIVI"
                      >
                        <span lazy="true"><img
                          src="https://www.motomundi.cl/content/assets/brands/brand-86.png"
                          class="cdn-img v-lazy-image v-lazy-image-loaded"
                          alt="GIVI"
                          width="80"
                          height="41"
                        >
                        </span>
                        <div class="submenu__outstanding-icon" />
                      </a>
                      <a
                        href="/hjc"
                        class="mtc-link"
                        title="HJC"
                      ><span lazy="true"><img
                         src="/content/assets/brands/brand-293.png"
                         class="cdn-img v-lazy-image v-lazy-image-loaded"
                         alt="HJC"
                         width="80"
                         height="41"
                       > </span>
                        <div class="submenu__outstanding-icon" />
                      </a>

                      <a
                        href="/shark"
                        class="mtc-link"
                        title="SHARK"
                      ><span lazy="true"><img
                         src="https://cf-cdn.motocard.com/cdn-cgi/image/w=160,h=82,q=91,fit=cover,f=auto/brands/outstanding/brand-106.png"

                         class="cdn-img v-lazy-image v-lazy-image-loaded"
                         alt="SHARK"
                         width="80"
                         height="41"
                       > </span>
                        <div class="submenu__outstanding-icon" />
                      </a>
                      <a
                        href="/shoei"
                        class="mtc-link"
                        title="SHOEI"
                      ><span lazy="true"><img
                         src="https://cf-cdn.motocard.com/cdn-cgi/image/w=160,h=82,q=91,fit=cover,f=auto/brands/outstanding/brand-78.png"

                         class="cdn-img v-lazy-image v-lazy-image-loaded"
                         alt="SHOEI"
                         width="80"
                         height="41"
                       > </span>
                        <div class="submenu__outstanding-icon" />
                      </a>
                    </div>
                    <div class="submenu__divider">
                      Otras marcas
                    </div>
                    <div class="submenu__outstanding-list">

                      <ul class="">
                        <li v-for="brand in brands.brands" :key="brand.id">
                           <a
                            :href="getBrandUrl(brand)"
                            class="mtc-link"
                            title="brand.name"
                          >
                            {{brand.name}}
                          </a>

                        </li>
                      </ul>

                    </div>
                  </div>
                </div>
              </div>
              <div class="col s12 submenu__extra-nav">
                <div class="extra__container" />
              </div>
            </div>
          </div>
        </div>
      </li>
    </ul>
  </li>


  <!-- /marcas -->
</template>


<style lang="scss">
#nav ul li {
  display: inline-block;
  line-height: inherit;
}
#nav ul.u0 #ni_2529_marcas ul.u1 a {
  line-height: 5px;
}

/*
#nav .submenu__outstanding-list ul li {
  margin-bottom: 3px;
  !*max-width: 90%;*!
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
*/

#nav .submenu__content li .mtc-link, .submenu__content li > a {
  display: flex;
  flex-wrap: wrap;
  font-size: 10px;
  font-weight: 500;
  line-height: 16px;
  text-transform: uppercase;
}

.submenu__outstanding-showcase {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin-bottom: 10px;
}

ul.u0 #ni_2529_marcas ul.u1 a {
  line-height: 5px;
}
.submenu__outstanding-showcase.brands .mtc-link, .submenu__outstanding-showcase.brands a {
  flex: 1 1 auto;
}

.submenu__outstanding-showcase .mtc-link, .submenu__outstanding-showcase a {
  display: block;
  flex: 0 1 18.6666%;
  margin-bottom: 8px;
}

.submenu__outstanding-showcase:has(>:last-child:nth-child(6)) a, .submenu__outstanding-showcase:has(>:last-child:nth-child(6)) span.mtc-link {
  flex: 1 1 16.66%;
}



.submenu__outstanding-showcase .mtc-link img, .submenu__outstanding-showcase a img {
  display: block;
  height: auto;
  margin: 0 auto 3px;
  width: 80px;
}

.submenu__outstanding-showcase .mtc-link span, .submenu__outstanding-showcase a span {
  color: #000;
  display: block;
  font-size: 10px;
  font-weight: 500;
  margin: 0;
  text-transform: uppercase;
}

.submenu__outstanding-icon {
  display: inline-block;
  text-align: center;
}
.submenu__outstanding-showcase {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin-bottom: 10px;
}

.submenu__outstanding-showcase .mtc-link, .submenu__outstanding-showcase a {
  display: block;
  flex: 0 1 18.6666%;
  margin-bottom: 8px;
}


.submenu__outstanding-list ul {
  -webkit-columns: 100px 6;
  -moz-columns: 100px 6;
  columns: 100px 6;
}
.submenu__outstanding-list ul li {
  margin-bottom: 0px;
  /*max-width: 90%;*/
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.submenu__content li .mtc-link, .submenu__content li > a {
  display: flex;
  flex-wrap: wrap;
  font-size: 10px;
  font-weight: 500;
  line-height: 16px;
  text-transform: uppercase;
}
</style>
