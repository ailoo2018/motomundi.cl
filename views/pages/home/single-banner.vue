<script setup lang="ts">
const props = defineProps({
  widget: {
    type: Object,
    required: true,
  },
})


const bgImg = computed(() => { return `url('https://www.motomundi.cl${props.widget.configuration.backgroundImage}')`})
</script>

<template>

  <div
    :id="`home-block-${widget.id}`"
    class="block-container"
  >
    <section
      class="banner-block banner-block__theme--red banner-block__layout--right"
      :style="{ backgroundImage: bgImg  }"
    >
      <div class="container">
        <div class="banner-block__content">
          <div
            class="banner-block__image"
            style="width:unset;"
          >
            <span>
              <img
                :src="'https://www.motomundi.cl' + widget.configuration.foregroundImage"
                srcset=""
                alt=""
                class="cdn-img"
              > <!----></span>
          </div> <!----> <!---->
          <div class="banner-link center">
            <a
              :href="widget.configuration.link"
              class="button button--primary"
            >
              {{widget.configuration.buttonTitle}}
              <svg
                width="12"
                height="12"
                xmlns="http://www.w3.org/2000/svg"
                class="icon sprite-line-icons"
              ><title>Right arrow</title>
                <use
                  href="/content/svg/motomundi.svg#i-icon-arrow-right-tail"
                  xlink:href="/content/svg/motomundi.svg#i-icon-arrow-right-tail"
                />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.container {
  margin: 0 auto;
  max-width: 1280px;
  width: 95%;
}

.button {
  background: none;
  border: 2px solid #000;
  box-sizing: border-box;
  color: #000;
  display: inline-block;
  font-size: 10px;
  font-weight: 700;
  letter-spacing: .5px;
  overflow: hidden;
  padding: 13px 25px;
  position: relative;
  text-align: center;
  text-transform: uppercase;
  transition: all .2s ease-in-out;
  z-index: 1;
}

.button.button--primary {
  background-color: #d6001c;
  border-color: #d6001c;
  color: #fff;
}

.button:active, .button:focus {
  background-color: #bd0019;
  border-color: #bd0019;
  box-shadow: inset 0 2px 4px 0 rgba(0, 0, 0, .3);
  color: #fff;
}

.button.button--primary use {
  stroke: #fff;
}
.banner-block {
  align-items: center;
  background-color: #f5f5f5;
  background-position: 50%;
  background-repeat: no-repeat;
  background-size: cover;
  box-sizing: border-box;
  display: flex;
  /* margin-top: 60px; */
  min-height: 500px;
  padding: 40px;
  width: 100%;
}

.banner-block .banner-block__content {
  max-width: 45%;
}

.banner-block .banner-block__image {
  height: auto;
  max-height: 261px;
  max-width: 100%;
  text-align: center;
  width: 512px;
}

.banner-block .banner-block__image span {
  display: block;
  max-height: 100%;
  max-width: 100%;
}
.banner-block .banner-block__image span .cdn-img {
  max-height: 261px;
  width: auto;
}

.banner-link {
  margin: 10px 0 0;
}
.banner-link.center {
  text-align: center;
}

.button.button--primary:active, .button.button--primary:focus {
  background-color: #bd0019;
  border-color: #bd0019;
  box-shadow: inset 0 2px 4px 0 rgba(0, 0, 0, .3);
}

.banner-link .button--primary svg {
  display: inline-block;
  margin-left: 5px;
  vertical-align: -2px;
}

.banner-block .container {
  align-items: center;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 0 40px;
}

.banner-block__layout--right .container {
  align-items: flex-end;
}
@media only screen and (min-width: 1281px) {
  .banner-block {
    height: 525px;
    min-height: 525px;
  }
}
</style>

