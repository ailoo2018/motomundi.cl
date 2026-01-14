<script setup lang="ts">
definePageMeta({
  alias: '/cuenta/perfil',
  layout: 'account',

})
</script>

<template>
  <div
    data-v-39c4a0d8=""
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
      <section
        class="profile__avatar-container"
        ng-controller="AccountCtrl"
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
              #if($user.Avatar.Length > 0)
              <img
                ng-show="avatarUrl == null"
                aasrc="$imageHelper.GetFromDataUrl($user.avatar, 600)"
                alt="user-avatar"
              >
              <img
                class="ng-hide"
                ng-show="avatarUrl != null"
                ng-src="{{avatarUrl}}"
                alt="user-avatar"
              >
              #else
              <img
                class="ng-cloak"
                ng-show="avatarUrl != null"
                ng-src="{{avatarUrl}}"
                alt="user-avatar"
              >
              ${formatHelper.GetUserInitials($user)}
              #end

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
                #parse("Account/CropperDialog.vm")
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
              ¡Hola,
              #if($user.Party.FirstName)
              ${user.Party.FirstName}!
              #else
              ${user.Party.Name}!
              #end
            </span>
            <span class="profile__email">$user.Username</span>
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
              #if($user.Party.BirthDay)
              <span>$user.Party.BirthDay.ToString("dd/MM/yy")</span>
              #else
              <span class="placeholder">Cumpleaños</span>
              #end
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
              #if($user.Party.Gender != 'Unknown' )
              <span>
                $formatHelper.FormatGender($user.Party.Gender)
              </span>
              #else
              <span class="placeholder">Género</span>
              #end
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
              #if($user.Party.Gender != 'Unknown' )
              <span>
                $user.Party.Phone
              </span>
              #else
              <span class="placeholder">Teléfono</span>
              #end
            </div>
          </div>
        </div>
      </section>
      <section class="profile__club">
        <h1>Club Motomundi</h1>
        <p>
          Tu pasión por las motos convertida en <strong>descuentos, ventajas y
            experiencias únicas</strong>.
        </p>
        <div
          data
          class="motocoins-card"
        >
          <div
            data
            class="motocoins-card__header"
          >
            <img
              data
              src="/content/images/mobile-menu/club-motomundi-card-name.png"
              alt="Club Motomundi"
              class="motocoins-card__name"
            >
            <p data>
              Tu saldo
            </p>
          </div>
          <div
            data
            class="motocoins-card__info"
          >
            <strong data>
              <span
                data
                class="motocoins-quantity"
              >$formatHelper.FormatLong($account.Balance.Amount)</span>
              mundipesos</strong>
            <span
              data
              class="motocoins-conversion"
            >($formatHelper.FormatMoney($account.Balance))</span>
          </div>
        </div>
        <a
          href="/cuenta/club-mi-motomundi"
          data-dr="true"
          class="button button--filled mtc-link"
          rel="nofollow"
        ><span>Aprovecha las ventajas</span></a>
      </section>
      <section
        class="profile__orders ng-hide"
        ng-controller="OrdersCtrl"
        data-limit="3"
        ng-show="latestOrders"
      >
        <h1>Últimos pedidos </h1>

        #parse('Account/PartialOrderList.vm')

        <a
          href="/cuenta/pedidos"
          data-dr="true"
          class="button--text-only mtc-link"
        >
          Ver todos
        </a>
      </section>
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


