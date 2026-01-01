<script setup lang="ts">
import breadCrumbsChevron from '@images/svg/breadcrumb-chevron.svg'


</script>

<template>
  <!-- breadcrumbs -->
  <div class="breadcrumb-container">
    <ul class="breadcrumb">
      <li>
        <a
            href="/cascos-integrales-para-moto"
            data-dr="true"
            class="mtc-link"
        >
          Cascos Integrales
        </a>
      </li>
      <li>
        <a
            href="/cascos-integrales-para-moto-hjc"
            data-dr="true"
            class="mtc-link"
        >
          HJC
        </a>
      </li>
      <li><span class="breadcrumb-current">i71 Monocolor</span></li>
    </ul>

    <span class="desktop-reference">
              <span>M-2419884</span>
              <span class="product-code">2419884</span>
            </span>
  </div>
  <!-- /breadcrumbs -->
</template>

<style scoped lang="scss">
.breadcrumb-container {
  display: flex;
  margin-top: 15px;
}

.breadcrumb {
  font-size: 11px;
  list-style-type: none;
  margin: 0;
  padding: 0;
  text-transform: uppercase;
}

.breadcrumb li {
  display: inline;
}

.breadcrumb a, .breadcrumb span.mtc-link {
  color: #686868;
}

.breadcrumb li:last-child:after {
  background: unset;

}
.breadcrumb li:after {
  background: transparent url('@/assets/images/svg/breadcrumb-chevron.svg') 50% no-repeat;
  content: "";
  display: inline-block;
  height: 8px;
  opacity: .5;
  width: 10px;
}

li .mtc-link, li > a {
  color: #000;
  display: inline-block;
  font-size: 12px;
  font-weight: 500;
  letter-spacing: 0;
  /* line-height: 1.05em; */
  padding: 6px 18px;
  text-transform: uppercase;
}
</style>
