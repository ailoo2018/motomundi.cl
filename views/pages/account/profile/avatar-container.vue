<script setup lang="ts">
import { useUserStore } from "@/stores/user"

const userStore = useUserStore()
const accessToken = useCookie('accessToken').value
const party = computed(() => {
  return userStore.user.person
})

const userInitials = computed(() => {
  return useUser().getInitials()
})
</script>

<template>


  <section
    v-if="party"
    class="profile__avatar-container"
  >
    <div
      class="account__user"
      style="z-index:0;"
    >
      <div class="user-avatar__container club-member">
        <div
          ng-click="uploadAvatar()"

          class="account__user-avatar big"
          style="cursor: pointer;background: linear-gradient(45deg, rgb(120, 168, 188) 0%, rgb(127, 167, 26) 100%);"
        >
          <img
            v-if="userStore.user.avatar"
            ng-show="avatarUrl == null"
            :src="getDataImageUrl(userStore.user.avatar, 600, getDomainId())"
            alt="user-avatar"
          >


          {{ userInitials }}


          <div class="cropper-wrapper">
            <div class="edit-user-avatar">
              <div class="upload-image">
                <input
                  type="file"
                  ngf-select
                  ng-model="file"
                  name="file"
                  ngf-max-size="20MB"
                  accept="image/*"
                >
                <svg
                  width="11"
                  height="11"
                  xmlns="http://www.w3.org/2000/svg"
                  class="edit-icon icon sprite-line-icons"
                >
                  <title>Upload image</title>
                  <use
                    href="/content/svg/motomundi.svg#i-icon-upload"
                    xlink:href="/content/svg/motomundi.svg#i-icon-upload"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
        <svg
          width="130"
          height="130"
          view-box="0 0 130 130"
          stroke-dashoffset="228"
          class="svg-bar orange"
        >
          <circle
            cx="65"
            cy="65"
            r="61"
            class="lane"
          />
          <circle
            cx="65"
            cy="65"
            r="61"
            class="circle"
          />
        </svg>
      </div>
    </div>
    <div class="profile__avatar-text">
      <div class="profile__name">
        <span>
          ¡Hola,  {{ party?.firstName }}!
        </span>
        <span class="profile__email">{{ userStore.user.username }}</span>
      </div>
      <div class="profile__personal-info">
        <div>
          <svg
            width="24"
            height="25"
            xmlns="http://www.w3.org/2000/svg"
            class="icon sprite-line-icons"
          >
            <use
              href="/content/svg/motomundi.svg#i-profile-birthday"
              xlink:href="/content/svg/motomundi.svg#i-profile-birthday"
            />
          </svg>

          <span v-if="party.birthDay">{{ party?.birthDay }}</span>
          <span
            v-else
            class="placeholder"
          >Cumpleaños</span>
        </div>
        <div>
          <svg
            width="24"
            height="25"
            xmlns="http://www.w3.org/2000/svg"
            class="fill icon sprite-line-icons"
          >
            <use
              href="/content/svg/motomundi.svg#i-profile-gender"
              xlink:href="/content/svg/motomundi.svg#i-profile-gender"
            />
          </svg>

          <span v-if="party.gender">
            {{ party.gender === 1 ? "HOMBRE" : "MUJER" }}
          </span>
          <span
            v-else
            class="placeholder"
          >Género</span>
        </div>
        <div>
          <svg
            width="24"
            height="25"
            xmlns="http://www.w3.org/2000/svg"
            class="icon sprite-line-icons"
          >
            <use
              href="/content/svg/motomundi.svg#i-profile-phone"
              xlink:href="/content/svg/motomundi.svg#i-profile-phone"
            />
          </svg>

          <span v-if="party.phone">
            {{ party.phone }}
          </span>
          <span
            v-else
            class="placeholder"
          >Teléfono</span>
        </div>
      </div>
    </div>
  </section>
</template>

<style  lang="scss">
.profile__personal-info {
  color: #4a4a4a;
  display: flex;
  font-size: 12px;
  font-weight: 600;
  gap: 20px;
  text-transform: uppercase;
}


.profile__personal-info > div {
  align-items: center;
  display: flex;
}



.profile .profile__avatar-container {
  align-items: center;
  display: flex;
  flex-direction: column;
  margin-bottom: 25px;
  text-align: center;
}




.profile .profile__orders {
  margin: 25px 0;
  width: 100%;
}

.account__user-avatar .edit-user-avatar {
  align-items: center;
  background-color: hsla(0,0%,100%,0);
  border-radius: 200px;
  bottom: 0;
  display: flex;
  height: 100%;
  justify-content: center;
  left: 0;
  opacity: 0;
  position: absolute;
  right: 0;
  top: 0;
  transition: all .2s ease;
  width: 100%;
}

.account .user-avatar__container.club-member .account__user-avatar:after {
  background: transparent url(https://cdn.motomundi.cl/Templates/MotoMundiDesktop/content/images/mmclub.png) 50% no-repeat;
  background-size: contain;
  content: "";
  display: block;
  height: 30px;
  left: 0;
  margin: -10px auto 10px;
  position: absolute;
  right: 0;
  width: 55px;
  top: 110px;
}

@media only screen and (min-width: 601px) {
  .profile .profile__orders {
    order: 4;
  }
}

@media only screen and (min-width: 601px) {
  .profile .profile__avatar-container {
    order: 1;
    width: 50%;
  }
}
</style>
