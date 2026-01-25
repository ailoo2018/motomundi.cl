<script setup lang="ts">
import { useUserStore } from "@/stores/user"
import AvatarContainer from "@/views/pages/account/profile/avatar-container.vue"
import Club from "@/views/pages/account/profile/club.vue"
import Orders from "@/views/pages/account/profile/orders.vue";

definePageMeta({
  alias: '/cuenta/perfil',
  layout: 'account',
  middleware: 'auth' // Must match the filename (auth.ts)
})

const userStore = useUserStore()


// Fetch once on mount
onMounted(async () => {
  try {
    await userStore.fetchUser()
  }finally{

  }
})
</script>

<template>
  <div
    v-if="userStore.user"
    class="account__content-block"
  >
    <div class="account__content-block-title">
      <h1 class="profile__title account__title">
        <svg
          width="30"
          height="30"
          xmlns="http://www.w3.org/2000/svg"
          class="icon sprite-line-icons"
        >
          <use
            href="/content/svg/motomundi.svg#i-account-user"
            xlink:href="/content/svg/motomundi.svg#i-account-user"
          />
        </svg>
        Mi perfil
      </h1>
      <a
        href="/account/editgeneralinfo.rails"
        data-dr="true"
        class="profile__edit mtc-link"
      >
        <svg
          width="12"
          height="12"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 17 17"
          class="icon sprite-line-icons"
        >
          <use
            href="/content/svg/motomundi.svg#i-icon-edit"
            xlink:href="/content/svg/motomundi.svg#i-icon-edit"
          />
        </svg>
        <span>Modificar</span>
      </a>
    </div>

    <div class="profile">
      <AvatarContainer />

      <Club />

      <Orders />

      <section class="profile__last-seen">
        <aside class="seen-lately">
          <div
            class="product-list"
            style="display: none;"
          >
            <div class="row">
              <div class="col s12">
                <div class="product-list__title">
                  <h2>
                    Vistos recientemente
                  </h2>
                </div>
              </div>
            </div>
            <div>
              <div class="row products banner--right" />
            </div>
          </div>
        </aside>
      </section>
    </div>
  </div>
</template>
<style >

</style>
