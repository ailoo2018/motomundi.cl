<script setup lang="ts">

</script>

<template>
  <div
    ng-mouseleave="onMouseLeave();"
    ng-mouseenter="onMouseEnter();"
    class="share-on__container"
  >
        <span class="share-on">
          <svg

            width="20"
            height="22"
            xmlns="http://www.w3.org/2000/svg"
            class="icon sprite-line-icons"
          >
            <use

              href="/content/images/svg/0b25363450c5afe3b3f9ba7fe4f4173b.svg#i-share-on"
              xlink:href="/content/images/svg/0b25363450c5afe3b3f9ba7fe4f4173b.svg#i-share-on"
            />
          </svg>
        </span>


    <div

      ng-class="{ show: showShare }"
      class="share-on__networks"
      style=""
    >
      <a

        ng-click="shareWhatsapp()"
        class="share-network-whatsapp"
        style="background-color: rgb(37, 211, 102);"
      ><i

        class="share-whatsapp"
      /></a>
      <a

        ng-click="shareTelegram()"
        class="share-network-telegram"
        style="background-color: rgb(0, 136, 204);"
      ><i

        class="share-telegram"
      /></a>
      <a

        ng-click="shareTwitter()"
        class="share-network-twitter"
        style="background-color: rgb(29, 161, 242);"
      ><i

        class="share-twitter"
      /></a>
      <a

        ng-click="shareFacebook()"
        class="share-network-facebook"
        style="background-color: rgb(24, 119, 242);"
      ><i

        class="share-facebook"
      /></a>
      <a

        ng-click="shareEmail()"
        class="share-network-email"
        style="background-color: rgb(51, 51, 51);"
      ><i

        class="share-email"
      /></a>
    </div>
  </div>

</template>

<style scoped lang="scss">

</style>
