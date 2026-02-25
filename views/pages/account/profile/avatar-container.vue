<script setup lang="ts">
import { useUserStore } from "@/stores/user"
import AccountProfileCropper from "@/views/pages/account/profile/account-profile-cropper.vue";

const file = ref()

const userStore = useUserStore()
const accessToken = useCookie('accessToken').value


const party = computed(() => {
  return userStore.user.person
})

const userInitials = computed(() => {
  return useUser().getInitials()
})

const isUploading = ref(false)
const userAvatarUrl = ref() // Local preview state

if(userStore.user.avatar)
  userAvatarUrl.value = getImageUrl( userStore.user.avatar, 300, getDomainId())
console.log("userAvatarUrl:" + userAvatarUrl.value)

const dataURLtoBlob = (dataurl: string) => {
  const arr = dataurl.split(',')
  const mime = arr[0].match(/:(.*?);/)?.[1]
  const bstr = atob(arr[1])
  let n = bstr.length
  const u8arr = new Uint8Array(n)
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n)
  }
  return new Blob([u8arr], { type: mime })
}

const uploadAvatar = async (croppedDataUrl: string) => {
  try {
    isUploading.value = true

    const blob = dataURLtoBlob(croppedDataUrl)
    const formData = new FormData()

    formData.append('image', blob, 'user-avatar.png')

    const response = await $fetch('/api/account/upload-avatar', {
      method: 'POST',
      body: formData,
    })

    if(response.uploads?.length > 0) {
      userAvatarUrl.value = getImageUrl(response.uploads[0].imageId, 300, getDomainId())
    }

    console.log('Upload successful!')
  } catch (error) {
    console.error('Upload failed:', error)
    // Add a toast notification here if you have one
  } finally {
    isUploading.value = false
  }
}
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
          @click="uploadAvatar"
          class="account__user-avatar big"
          style="cursor: pointer;background: linear-gradient(45deg, rgb(120, 168, 188) 0%, rgb(127, 167, 26) 100%);"
        >
          <div v-if="isUploading" style="position: relative;" class="d-flex align-center justify-center fill-height">
            <VProgressCircular indeterminate color="primary" />
          </div>

          <img
            v-if="userAvatarUrl"
            :src="userAvatarUrl"
            alt="user-avatar"
          >
          {{ userInitials }}


          <AccountProfileCropper @cropped="uploadAvatar" />
          <!-- /cropper-wrapper -->

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

.account__user-avatar .edit-user-avatar svg {
  cursor: pointer;
}
.account__user-avatar .edit-user-avatar svg.edit-icon use {
  stroke: #fff;
  stroke-width: .8;
}
.account__user-avatar .edit-user-avatar input {
  height: 0;
  opacity: 0;
  position: absolute;
  width: 0;
  z-index: 1;
}

.cropper-wrapper .delete-image svg {
  transform: scale(1);
  transform-origin: center center;
}

.cropper-wrapper .delete-image svg use {
  stroke-width: 1;
  stroke: #fff;
}
.cropper-wrapper:hover .edit-user-avatar {
  background-color: #fffc;
}
.cropper-wrapper .delete-image {
  align-items: center;
  background: #000;
  border-radius: 200px;
  display: flex;
  height: 20px;
  justify-content: center;
  left: 50%;
  opacity: 0;
  position: absolute;
  top: -15px;
  transform: translate(-50%);
  transition: opacity .2s ease;
  width: 20px;
}
.cropper-wrapper:hover .delete-image, .cropper-wrapper:hover .edit-user-avatar {
  cursor: pointer;
  opacity: 1;
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
