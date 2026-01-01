<template>

  <VContainer style="color:white">
    <div class="d-flex justify-space-between">
      <div>
        <a href="/">
        <VImg :src="'https://www.motomundi.cl/Templates/MotoMundiDesktop/content/images/logo-motomundi.png'" width="400" />
        </a>
      </div>
      <div>
        <VTextField width="300" style="background-color: white;" variant="outline"/>
      </div>
    </div>
  </VContainer>

</template>


<style setup>
.filters__list li.extra-content {
  display: none;
}

.filters__list li.show-more button {
  font-weight: normal;
  font-size: 12px;
}

.filter > button.collapded:after {
  background: transparent url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxNCIgaGVpZ2h0PSIxMyI+PHBhdGggZmlsbD0ibm9uZSIgc3Ryb2tlPSIjRUIwMDEyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIHN0cm9rZS13aWR0aD0iMS4yOCIgZD0iTTEyLjQzIDYuNzczSDEuNTdNNyAxLjM0M3YxMC44NjEiLz48L3N2Zz4=) 50% no-repeat;
  content: "";
  display: block;
  height: 10px;
  position: absolute;
  right: 20px;
  top: 50%;
  -webkit-transform: translateY(-50%);
  transform: translateY(-50%);
  width: 10px;
}
</style>
<script setup lang="ts">
</script>
