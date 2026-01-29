<script setup lang="ts">

const props = {
  product: {
    type: Object,
  }
}

const addRemoveToWishList = () => {
  console.log("addRemoveToWishList")
}

</script>

<template>
  <button
    class="add-to-favs "
    @click="addRemoveToWishList"
  >
    <svg
      class="add icon sprite-line-icons"
      height="24"
      width="29"
      xmlns="http://www.w3.org/2000/svg"
    >
      <title>Añadir a favoritos</title>
      <use
        href="/content/svg/motomundi.svg#i-icon-favorite"
        xlink:href="/content/svg/motomundi.svg#i-icon-favorite"
      />
    </svg>
  </button>
</template>

<style scoped lang="scss">
/********************** fav button on products **********/
.sprite-line-icons use {
  fill-rule: evenodd;
  fill: none;
  stroke: #2a2a2a;
  stroke-width: 1.5;
  stroke-linecap: round;
  stroke-linejoin: round;
}

.add-to-favs:hover svg use {
  stroke: #d6001c;
}

.item:hover .add-to-favs {
  display: block;
  opacity: 1;
  -webkit-transform: scale(1);
  transform: scale(1);
}

.add-to-favs:hover svg use {
  stroke: #d6001c;
}

button:hover {
  cursor: pointer;
}

.add-to-favs.wished svg use {
  fill: #d6001c;
  stroke: #d6001c;
}

.add-to-favs.wished {
  opacity: 1;
  -webkit-transform: scale(1);
  transform: scale(1);
}

.add-to-favs {
  background-color: transparent;
  height: 24px;
  opacity: 0;
  padding: 0;
  position: absolute;
  right: 10px;
  top: 15px;
  -webkit-transform: scale(0);
  transform: scale(0);
  -webkit-transform-origin: center center;
  transform-origin: center center;
  transition: all .2s ease;
  width: 29px;
}

.add-to-favs svg {
  height: 24px;
  transition: all .2s ease;
  width: 29px;
}

</style>
