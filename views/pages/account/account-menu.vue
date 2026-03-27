<script setup>

const { logout } = useUser()

const route = useRoute()

const path = route.path

const props= defineProps({
  alias: "wish-list",
  componentClass: {
    type: String,
    default: '',
  },
})

const emit = defineEmits(['logout'])


</script>

<template>
  <ul class="account__nav" :class="componentClass">
    <li>
      <NuxtLink
        to="/account/profile"
        :prefetch="false"
        class="mtc-link"
        :class="route.path.includes('account/profile') ? 'nuxt-link-exact-active nuxt-link-active' : ''"
        rel="nofollow"
      >
        <svg
          width="19"
          height="19"
          xmlns="http://www.w3.org/2000/svg"
          class="icon sprite-line-icons"
        >
          <use
            href="/content/svg/motomundi.svg#i-account-user"
            xlink:href="/content/svg/motomundi.svg#i-account-user"
          />
        </svg>
        Mi perfil
      </NuxtLink>
    </li>

    <li>
      <NuxtLink
        :class="route.path.includes('account/garage') ? 'nuxt-link-exact-active nuxt-link-active' : ''"
        to="/account/garage"
        :prefetch="false"
        class="mtc-link"
        rel="nofollow"
      >
        <VIcon icon="tabler-motorbike"/>
        Mi garaje
      </NuxtLink>
    </li>
    <li>
      <NuxtLink
        to="/account/gear"
        :prefetch="false"
        class="mtc-link"
        :class="route.path.includes('account/gear') ? 'nuxt-link-exact-active nuxt-link-active' : ''"
        rel="nofollow"
      >
        <VIcon icon="tabler-helmet"/>
        Mi equipamiento
      </NuxtLink>
    </li>
    <li>
      <NuxtLink
        to="/account/addresses"
        :prefetch="false"
        class="mtc-link"
        :class="route.path.includes('account/addresses') ? 'nuxt-link-exact-active nuxt-link-active' : ''"
        rel="nofollow"
      >
        <svg
          width="19"
          height="19"
          xmlns="http://www.w3.org/2000/svg"
          class="icon sprite-line-icons"
        >
          <use
            href="/content/svg/motomundi.svg#i-account-address"
            xlink:href="/content/svg/motomundi.svg#i-account-address"
          />
        </svg>
        Mis direcciones
      </NuxtLink>
    </li>
    <li>
      <NuxtLink
        :class="route.path.includes('account/orders') ? 'nuxt-link-exact-active nuxt-link-active' : ''"
        to="/account/orders"
        :prefetch="false"
        class="mtc-link"
        rel="nofollow"
      >
        <svg
          width="19"
          height="19"
          xmlns="http://www.w3.org/2000/svg"
          class="icon sprite-line-icons"
        >
          <use
            href="/content/svg/motomundi.svg#i-account-orders"
            xlink:href="/content/svg/motomundi.svg#i-account-orders"
          />
        </svg>
        Pedidos
      </NuxtLink>
    </li>
    <li>
      <NuxtLink
        :class="route.path.includes('account/invoices') ? 'nuxt-link-exact-active nuxt-link-active' : ''"
        to="/account/invoices"
        :prefetch="false"
        class="mtc-link"
        rel="nofollow"
      >
        <VIcon icon="tabler-file-dollar"/>
        Facturación
      </NuxtLink>
    </li>
    <li>
      <NuxtLink
        :class="route.path.includes('account/wishlist') ? 'nuxt-link-exact-active nuxt-link-active' : ''"
        to="/account/wishlist"
        :prefetch="false"
        class="mtc-link"
        rel="nofollow"
      >
        <VIcon icon="tabler-heart"/>
        Mis favoritos
      </NuxtLink>
    </li>
    <li>
      <NuxtLink
        :class="route.path.includes('account/club') ? 'nuxt-link-exact-active nuxt-link-active' : ''"
        to="/account/club"
        :prefetch="false"
        class="mtc-link"
        rel="nofollow"
      >
        <img
          data-v-0e817c8e=""
          style="width:19px;height:19px;vertical-align: -4px;"
          src="data:image/svg+xml;base64,PHN2ZyB2ZXJzaW9uPSIxLjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIKIHdpZHRoPSIxNjcuMDAwMDAwcHQiIGhlaWdodD0iMTY3LjAwMDAwMHB0IiB2aWV3Qm94PSIwIDAgMTY3LjAwMDAwMCAxNjcuMDAwMDAwIgogcHJlc2VydmVBc3BlY3RSYXRpbz0ieE1pZFlNaWQgbWVldCI+CjxtZXRhZGF0YT4KQ3JlYXRlZCBieSBwb3RyYWNlIDEuMTYsIHdyaXR0ZW4gYnkgUGV0ZXIgU2VsaW5nZXIgMjAwMS0yMDE5CjwvbWV0YWRhdGE+CjxnIHRyYW5zZm9ybT0idHJhbnNsYXRlKDAuMDAwMDAwLDE2Ny4wMDAwMDApIHNjYWxlKDAuMTAwMDAwLC0wLjEwMDAwMCkiCmZpbGw9IiMwMDAwMDAiIHN0cm9rZT0ibm9uZSI+CjxwYXRoIGQ9Ik0zNTUgMTEwOSBjLTY5IC05IC05NyAtMjIgLTE0NSAtNjUgLTcwIC02MyAtODYgLTExMSAtMTMwIC0zODYgLTE5Ci0xMTYgLTIwIC0xMjkgLTYgLTE1NyAyNiAtNDkgNTIgLTYxIDEzNSAtNjEgNDEgMCA5MCA1IDEwOCAxMiAyNyAxMCAzOCAxMCA1MwowIDI5IC0xOCAxNjQgLTE1IDIwMCAzIDI3IDE0IDMzIDE0IDYwIDAgNDAgLTIxIDMzOCAtMjIgMzc4IC0xIDIzIDEyIDMxIDEyCjUyIDAgMzQgLTE4IDE2NyAtMTggMjAzIDEgMjUgMTMgMzIgMTMgNTcgMCAzMyAtMTcgMTQ1IC0yMCAxODQgLTUgMTYgNiAyNiAxNwoyNiAzMCAwIDEzIDcgMjAgMjAgMjAgMTEgMCAyMCAxIDIwIDMgMCAyIDkgNTIgMjAgMTEzIDQ5IDI2NCA1MSAzMDEgMjIgMzY2Ci0yMSA0OSAtNjYgOTEgLTEyMSAxMTQgLTI4IDEyIC01OCAxNCAtMTMxIDEwIC01MiAtMyAtMTA2IC01IC0xMjAgLTQgLTE0IDEKLTc0IDIgLTEzNSAyIC0xMTAgMSAtMTI2IC0zIC0xOTIgLTQ1IC0yMCAtMTIgLTI2IC0xMiAtNDUgMCAtNzUgNDggLTkzIDUyCi0yNDYgNTAgLTgxIDAgLTE2MyAxIC0xODIgMyAtMTkgMiAtNTcgMCAtODUgLTN6IG0xNzEgLTkyIGMyNiAtMTQgMzIgLTEzIDU5CjEgMjAgMTEgNTQgMTcgMTAwIDE2IDg3IDAgMTMwIC0yMiAxNjQgLTgzIDI1IC00NiAyNSAtNTggLTkgLTIzMSAtNSAtMjUgLTE0Ci03NCAtMjEgLTExMCAtNiAtMzYgLTE2IC03MSAtMjIgLTc3IC0xMSAtMTUgLTEzMyAtMTggLTE0MiAtNCAtMyA2IDYgNzIgMTkKMTQ4IDE0IDc2IDI2IDE1NiAyOCAxNzggbDMgNDAgLTQyIDMgYy00MSAzIC00MiAyIC01MiAtMzUgLTEwIC0zOCAtMjMgLTExMAotNDIgLTIzMyAtMTYgLTEwOCAtMTggLTExMCAtOTMgLTExMCAtNjMgMCAtOTYgMTYgLTgxIDM5IDMgNiAxMCAzNyAxNiA2OCA1MAoyOTQgNTAgMjczIDAgMjczIC0yMSAwIC00MyAtNiAtNDggLTEyIC02IC03IC0yMyAtODcgLTM4IC0xNzggLTE1IC05MSAtMzIKLTE3MSAtMzggLTE3NyAtMTQgLTE5IC0xMzYgLTE3IC0xNDMgMSAtNyAxOCA1MyAzNDYgNzEgMzg4IDIwIDQ4IDY4IDg5IDEyMgoxMDQgNTcgMTYgMTQ5IDEyIDE4OSAtOXogbTY3MCA3IGM0MyAtMTUgNTIgLTE0IDEwNyAxIDExNyAzMyAyMjQgLTggMjQ3IC05NAo2IC0yMiA2IC01OSAwIC05NiAtMTggLTEyNCAtNDIgLTI1MSAtNTEgLTI4MiAtMTEgLTMzIC0xMSAtMzMgLTc5IC0zMyAtNDYgMAotNjkgNCAtNzMgMTMgLTQgMTIgMyA2MSAzNSAyMzIgNiAzMyAxMiA3NiAxMiA5NSAxIDM0IDAgMzUgLTQxIDM4IC00MSAzIC00MgoyIC01MiAtMzUgLTUgLTIxIC0xOSAtOTUgLTMxIC0xNjUgLTMwIC0xODUgLTI1IC0xNzggLTExMCAtMTc4IC04NCAwIC04MSAtMTQKLTQ1IDE4NiAxNCA3NiAyNSAxNTEgMjUgMTY3IDAgMjUgLTMgMjcgLTQwIDI3IC01MCAwIC00OSAyIC04NCAtMjAwIC0xNSAtODUKLTMyIC0xNjAgLTM4IC0xNjcgLTEyIC0xNSAtMTM0IC0xOCAtMTQzIC0zIC0xMSAxNyA1NyAzNjUgNzkgNDA5IDQ1IDg1IDE3MQoxMjMgMjgyIDg1eiIvPgo8L2c+Cjwvc3ZnPgo="
          alt="Club Motomundi"
        >
        Club Motomundi
      </NuxtLink>
    </li>
    <li>
      <NuxtLink
        :class="route.path.includes('account/invita') ? 'nuxt-link-exact-active nuxt-link-active' : ''"
        to="/account/invita-tus-amigxs"
        :prefetch="false"
        class="mtc-link"
        rel="nofollow"
      >
        <VIcon icon="tabler-heart-handshake"/>
        Invita a tus amigxs
      </NuxtLink>
    </li>
    <li>
      <NuxtLink
        :class="route.path.includes('account/reviews') ? 'nuxt-link-exact-active nuxt-link-active' : ''"
        to="/account/reviews"
        :prefetch="false"
        class="mtc-link"
        rel="nofollow"
      >
        <svg
          width="19"
          height="19"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 -3 19 19"
          class="icon sprite-line-icons"
        >
          <use
            href="/content/svg/motomundi.svg#i-icon-star"
            xlink:href="/content/svg/motomundi.svg#i-icon-star"
          />
        </svg>
        Reviews
      </NuxtLink>
    </li>
    <li>
      <NuxtLink
        :class="route.path.includes('account/configuration') ? 'nuxt-link-exact-active nuxt-link-active' : ''"
        to="/account/configuration"
        :prefetch="false"
        class="mtc-link"
        rel="nofollow"
      >
        <svg
          width="19"
          height="19"
          xmlns="http://www.w3.org/2000/svg"
          class="icon sprite-line-icons"
        >
          <use
            href="/content/svg/motomundi.svg#i-account-settings"
            xlink:href="/content/svg/motomundi.svg#i-account-settings"
          />
        </svg>
        Configuración
      </NuxtLink>
    </li>
    <li class="account-menu__logout">
      <a
        href="#"
        rel="nofollow"
        @click.prevent="logout"
      >
        <svg
          width="19"
          height="19"
          xmlns="http://www.w3.org/2000/svg"
          class="icon sprite-line-icons"
        >
          <use
            href="/content/svg/motomundi.svg#i-account-logout"
            xlink:href="/content/svg/motomundi.svg#i-account-logout"
          />
        </svg>
        Desconectar
      </a>
    </li>
  </ul>
</template>
<style  lang="scss">
.account__nav a {
  border-left: 3px solid transparent;
  color: #000;
  display: block;
  padding: 10px 20px;
}



.account__nav li a.nuxt-link-exact-active {
  background-color: #f5f5f5;
  border-color: #d6001c;
  font-weight: 800;
}

.account__nav a svg {
  transition: all .2s ease;
  vertical-align: -4px;
}

@media only screen and (max-width: 600px) {
  .user-menu__account-content a {
    font-size: 10px;
    padding: 5px 0;
  }
}

</style>
