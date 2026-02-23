<script setup lang="ts">
const props = defineProps<{
  product: {
    id: number | string;
    isWished: boolean;
  }
}>()

const emit = defineEmits(['toggle-wishlist'])

const addRemoveToWishList = async event => {
  event.preventDefault() // Prevent the parent link from being triggered
  event.stopPropagation() // Stop event bubbling

  try {
    await useUser().addToWishList(props.product.id)
    emit('toggle-wishlist', !props.product.isWished)
  }catch(err){
    console.error("Failed to update wishlist", err)
  }

}
</script>

<template>

  <button
    class="add-to-favs"
    :class="product.isWished ? 'wished' : ''"
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
  opacity: 0;
  padding: 0;
  position: absolute;
  right: 10px;
  top: 15px;
  transform: scale(0);
  transform-origin: center center;
  transition: all .2s ease;
  width: 29px;
  cursor: pointer;
  -webkit-tap-highlight-color: rgba(214, 0, 28, 0.1);
  border: none; /* Remove default button border */
  z-index: 10; /* Ensure it's above the product link */
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
  .add-to-favs:hover svg use {
    stroke: #d6001c;
  }

  button:hover {
    cursor: pointer;
  }

  .item:hover .add-to-favs {
    display: block;
    opacity: 1;
    transform: scale(1);
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
