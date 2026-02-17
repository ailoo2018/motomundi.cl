<script setup lang="ts">
import BikeSelector from "@/views/pages/bike-selector.vue"

definePageMeta({
  alias: '/cuenta/garaje',
  layout: 'account',
  middleware: 'auth', // Must match the filename (auth.ts)
})

const userBikes = ref([])
const error = ref()
const loading = ref(false)
const bikeSelector = ref()
const { logToFile } = useRemoteLog()

logToFile("this is a test", {msg: "hello"})

const saveBike = async bike =>  {

  error.value = ""
  loading.value = true

  try {
    const req = { ...bike }
    const userId = useUser().getUserId()

    req.userId = userId

    const data = await $fetch("/api/motorcycles/add-user-bike", {
      method: "POST",
      body: req,
    })

    await listUserBikes()
  }catch(e){
    error.value = e.message

  }finally{
    loading.value = false
  }
}


const deleteBike = async bike => {

  console.log("bike: " + JSON.stringify(bike))
  await $fetch("/api/motorcycles/delete-user-bike", {
    method: "POST",
    body: bike,
  })

  await listUserBikes()
}

const listUserBikes = async () => {
  userBikes.value = await  useUser().listMotorcycles()

  userBikes.value.forEach(b => b.isShow = false)

}

await listUserBikes()

</script>

<template>
  <VAlert
    v-if="error"
    color="warning"
  >
    {{ error }}
  </VAlert>

  <div class="col s12 m9 l9 account__content">
    <div class="garage account__content-block">
      <div class="account__content-block-title">
        <h1 class="garage__title account__title">
          <svg
            width="30"
            height="30"
            xmlns="http://www.w3.org/2000/svg"
            class="icon sprite-line-icons"
          >
            <use
              href="/content/svg/motomundi.svg#i-account-garage"
              xlink:href="/content/svg/motomundi.svg#i-account-garage"
            />
          </svg>
          Mi garaje
        </h1>
      </div>
      <div class="field-group">
        <div class="bike-list ng-cloak">
          <div
            v-for="bike in userBikes.filter(ub => ub.manufacturer)"
            id="motorbike-24149"
            :class="bike.isShow ? 'expanded': ''"
            class="bike"
          >
            <div class="bike__header">
              <div class="bike__rs">
                <svg
                  width="95"
                  height="61"
                  xmlns="http://www.w3.org/2000/svg"
                  class="icon sprite-line-icons"
                >
                  <use
                    href="/content/svg/motomundi.svg#i-rs-sport"
                    xlink:href="/content/svg/motomundi.svg#i-rs-sport"
                  />
                </svg>
              </div>
              <div class="bike__container">
                <div class="bike__info">
                  <span class="bike__brand">{{ bike.manufacturer?.name }}</span>
                  <span class="bike__model">{{ bike.model?.name }} </span>
                  <span class="bike__year"> {{ ' ' + bike.year?.name }}</span>
                </div>
              </div>
              <div class="bike__actions">
                <button
                  class="action__expand"
                  @click="bike.isShow = !bike.isShow"
                >
                  mostrar accesorios 
                  <svg
                    width="14"
                    height="14"
                    xmlns="http://www.w3.org/2000/svg"
                    class="icon sprite-line-icons"
                  >
                    <use
                      href="/content/svg/motomundi.svg#i-icon-angle-up"
                      xlink:href="/content/svg/motomundi.svg#i-icon-angle-up"
                    />
                  </svg>
                </button>
                <button
                  class="action__remove"
                  @click="deleteBike(bike)"
                >
                  <svg
                    width="16"
                    height="18"
                    xmlns="http://www.w3.org/2000/svg"
                    class="icon sprite-line-icons"
                  >
                    <use
                      href="/content/svg/motomundi.svg#i-bike-delete"
                      xlink:href="/content/svg/motomundi.svg#i-bike-delete"
                    />
                  </svg>
                </button>
              </div>
            </div>
            <div
              v-if="bike.isShow"
              class="bike__accessories ng-hide"
            >
              <div class="bike__accessory">
                <div class="bike__accessory-img">
                  <span><img
                    src="/images/ebc.avif"
                    class="cdn-img v-lazy-image v-lazy-image-loaded"
                    alt="Disco de freno NG BRAKE DISC 451 Ø220 x Ø105 x 4"
                    width="64"
                    height="64"
                  > <noscript /></span>
                </div>
                <div class="bike__accessory-info">
                  <span class="accessory__brand">NG BRAKE DISC</span>
                  <span class="accessory__name">Disco de freno NG BRAKE DISC 451 Ø220 x Ø105 x 4</span>
                  <span class="accessory__price">55,75&nbsp;€
                    <!----></span>
                  <div class="tag">
                    10 %
                  </div>
                </div>
              </div>
              <div class="bike__accessory">
                <div class="bike__accessory-img">
                  <span><img
                    src="/images/ebc.avif"
                    class="cdn-img v-lazy-image v-lazy-image-loaded"
                    alt="Pastillas de freno EBC SFA264HH"
                    width="64"
                    height="64"
                  > <noscript /></span>
                </div>
                <div class="bike__accessory-info">
                  <span class="accessory__brand">EBC</span>
                  <span class="accessory__name">Pastillas de freno EBC SFA264HH</span> <span class="accessory__price">20,23&nbsp;€
                    <!----></span>
                  <div class="tag">
                    15 %
                  </div>
                </div>
              </div>
              <a class="bike__accessory-all"><span>Ver accesorios</span>
                <svg
                  width="14"
                  height="14"
                  xmlns="http://www.w3.org/2000/svg"
                  class="icon sprite-line-icons"
                >
                  <use
                    href="/content/svg/motomundi.svg#i-icon-angle-up"
                    xlink:href="/content/svg/motomundi.svg#i-icon-angle-up"
                  />
                </svg>
              </a>
            </div>
          </div>
        </div>

        <span class="bike-selector__title">Añade una moto</span>
        <BikeSelector
          ref="bikeSelector"
          :loading="loading"
          filter-bikes-with-products
          is-add-bike
          @on-bike-select="saveBike"
        />
      </div>
    </div>
  </div>
</template>

<style>
.bike-selector__title{
  color: black;
  padding-bottom: 4px;
}


.bike-list .bike .bike__header .bike__rs {
  border-right: 3px solid #fff;
  padding: 4px 6px;
}

.bike-list .bike {
  background-color: #f5f5f5;
  border-radius: 6px;
  margin-bottom: 8px;
  overflow: hidden;
}

.bike-list .bike:last-child {
  border-bottom: 0;
}

.bike-list .bike .bike__header {
  align-items: center;
  display: flex;
}

.bike-list .bike .bike__header .bike__rs {
  border-right: 3px solid #fff;
  padding: 4px 6px;
}

.bike-list .bike .bike__actions .action__expand {
  align-items: center;
  border-right: 1px solid #d8d8d8;
  display: flex;
  gap: 6px;
  margin-right: 6px;
  padding-right: 12px;
}

.bike-list .bike .bike__actions {
  align-items: center;
  box-sizing: border-box;
  display: flex;
  flex-align: middle;
  margin-left: auto;
  padding: 14px;
}

.bike-list .bike .bike__info {
  font-size: 16px;
}

.bike-list .bike .bike__header .bike__container {
  padding: 14px;
}

.bike-list .bike .bike__info .bike__brand {
  display: block;
  font-weight: 700;

  text-transform: uppercase;
}
</style>
