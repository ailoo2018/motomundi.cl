<script setup lang="ts">
const props = defineProps({
  isWished: {
    type: Boolean,
    default: false,
  }
})

const emit = defineEmits(['toggle-wishlist'])

const addRemoveToWishList = async event => {
  event.preventDefault() // Prevent the parent link from being triggered
  event.stopPropagation() // Stop event bubbling

  emit('toggle-wishlist', !props.isWished)
}
</script>

<template>

  <button
    class="add-to-favs"
    :class="isWished ? 'wished' : ''"
    @click="addRemoveToWishList"
    @touchstart.passive
  >
    <svg
      class="add icon sprite-line-icons"
      height="24"
      width="29"
      xmlns="http://www.w3.org/2000/svg"
    >
      <title>Añadir a favoritos </title>
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

.add-to-favs {
  background-color: transparent;
  height: 24px;
  padding: 0;
  position: absolute;
  right: 10px;
  top: 15px;
  cursor: pointer;
  border: none;
  z-index: 20; /* High z-index to ensure it's clickable over the product link */

  /* On mobile, we want it visible immediately */
  opacity: 1;
  transform: scale(1);
  transition: all .2s ease;
}

.add-to-favs svg {
  height: 24px;
  transition: all .2s ease;
  width: 29px;
}

.add-to-favs.wished svg use {
  fill: #d6001c;
  stroke: #d6001c;
}

.add-to-favs.wished {
  opacity: 1;
  transform: scale(1);
}

/* Only apply hover effects on devices that support hover */

@media (hover: hover) and (pointer: fine) {
  .add-to-favs {
    opacity: 0;
    transform: scale(0);
  }

  /* Target the parent container (assuming it's .item) */
  .item:hover .add-to-favs {
    opacity: 1;
    transform: scale(1);
  }

  .add-to-favs:hover svg use {
    stroke: #d6001c;
  }
}


/* On touch devices, show the button when the item is tapped/active */

@media (hover: none) {
  .item .add-to-favs {
    opacity: 1;
    transform: scale(1);
  }
}

</style>
