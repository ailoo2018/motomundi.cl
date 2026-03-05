<script setup lang="ts">
const props = defineProps(
  {
    product: {
      type: Object,
    },
  },
)

const { data: reviewStats } = await useAsyncData(
  `stats-${props.product.id}`,
  () => $fetch("/api/reviews/stats", {
    query: { productId: props.product.id, modelId: props.product.model?.id },
  }),
  {
    // Transform data here to keep the component logic clean
    transform: data => {
      const stats = { ...data, stars: Math.floor(data.avgRating * 2) };

      ['1', '2', '3', '4', '5'].forEach(n => stats[n] = 0)
      data.groups?.forEach(r => {
        stats["" + r.ratingGroup] = (r.totalReviews / data.totalReviews) * 100
      })
      
      return stats
    },
  },
)


function formatName(str) {
  str = str.trim()

  const words = str.split(" ")
  const formattedWords = words.map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())

  return formattedWords.join(" ")
}

const reviews = ref([])
const loading = ref(false)


const currentPage = ref(1)
const pageSize = ref(10)
const ratingCriteria = ref({ rating: 0, selected: "TODOS", orderBy: "date", orderDir: "desc" })


const handleImageError = imageId => {

  console.log("handleImageError: " + props.product.id)
  $fetch("/api/images/sizes", {
    method: "POST",
    body: {
      imageId: imageId,
      sizes: [300],
      maintainAspectRatio: true,
    },
  })
  imageError.value = true

}

const nextPage = async () => {
  currentPage.value = currentPage.value + 1
  await listReviews()
}

const showAll = async () => {
  ratingCriteria.value.selected = "TODOS"
  ratingCriteria.value.rating = 0
  ratingCriteria.value.orderBy= "date"
  ratingCriteria.value.orderDir = "desc"
  reviews.value = []

  await listReviews()
}

const orderBy = async(field, dir, sel) => {
  ratingCriteria.value.selected = sel
  ratingCriteria.value.rating = 0
  ratingCriteria.value.orderBy= field
  ratingCriteria.value.orderDir = dir

  reviews.value = []
  await listReviews()

}





const getReviewInitial = review => {
  if(review.party != null && review.party.name != null && review.party.name.length > 0){
    return review.party.name[0].toUpperCase()
  }

  return "A"

}

const getReviewerName = review => {
  if(review.party != null && review.party.name != null){
    var arr = review.party.name.split(' ')

    return formatName( arr[0] )
  }

  return "Anónimo"
}

const selectRating = async stars => {
  ratingCriteria.value.rating = stars
  ratingCriteria.value.selected = ""
  reviews.value = []
  currentPage.value = 1

  await listReviews()
}


const listReviews = async () => {

  console.log("LOading products-rating list llll!!!!")
  loading.value = true

  try {
    const limit = pageSize.value
    const offset = (currentPage.value - 1) * pageSize.value

    var rs = await $fetch("/api/reviews/list", {
      key: "ratings-" + props.product.id,
      method: "GET",
      query: {
        productId: props.product.id,
        modelId: props.product.model?.id || 0,
        limit: limit,
        offset: offset,
        rating: ratingCriteria.value?.rating || null,
        orderBy: ratingCriteria.value.orderBy,
        orderDir: ratingCriteria.value.orderDir,
      },
    })


    if (rs.reviews)
      rs.reviews.forEach(r => {
        reviews.value.push(r)
      })
    else
      review.value = []

  }finally {
    loading.value = false
  }


}


// Add these new refs for the lightbox
const lightboxOpen = ref(false)
const lightboxImage = ref('')
const lightboxImages = ref([])
const lightboxIndex = ref(0)

const openLightbox = (images, index) => {
  lightboxImages.value = images
  lightboxIndex.value = index
  lightboxImage.value = getImageUrl(images[index].id, 'org', getDomainId())
  lightboxOpen.value = true
}

const closeLightbox = () => {
  lightboxOpen.value = false
}

const prevImage = () => {
  if (lightboxIndex.value > 0) {
    lightboxIndex.value--
    lightboxImage.value = getImageUrl(lightboxImages.value[lightboxIndex.value].id, 1200, getDomainId())
  }
}

const nextImage = () => {
  if (lightboxIndex.value < lightboxImages.value.length - 1) {
    lightboxIndex.value++
    lightboxImage.value = getImageUrl(lightboxImages.value[lightboxIndex.value].id, 1200, getDomainId())
  }
}

if (import.meta.client) {
  // Only runs client-side, once
  console.log("Only runs client-side, once")

  //  await getStats()
  await listReviews()
}
</script>

<template>
  <ClientOnly>
    <VContainer>
      <VRow
        v-if="product.totalReviews > 0"
        id="reviews"
        style="padding: 12px;"
      >
        <VCol cols="12">
          <aside
            id="ratings"
            class="v-row"
          >
            <VCol cols="12">
              <div class="group-title">
                <h2>Valoraciones</h2>
              </div>
            </VCol>
            <VCol
              cols="12"
              md="4"
              lg="3"
            >
              <div
                v-if="reviewStats"
                class="ratings-summary"
              >
                <span class="rating-block">
                  <span>
                    <VRating
                      readonly
                      color="primary"
                      :model-value="reviewStats?.avgRating"
                    />
                  </span>
                </span>
                <p>
                  Basada en <strong>{{ reviewStats?.totalReviews }}</strong> valoraciones
                </p>
                <div
                  class="rating-star-summary"
                  :class="{'rating-selected': ratingCriteria.rating == 5 }"
                  @click="selectRating(5)"
                >
                  <span>5 estrellas</span>
                  <div class="rating-outer">
                    <div

                      class="rating-inner"
                      :style="`width: ${reviewStats['5']}%;`"
                    />
                  </div>
                </div>
                <div

                  class="rating-star-summary"
                  :class="{'rating-selected': ratingCriteria.rating == 4 }"
                  @click="selectRating(4)"
                >
                  <span>4 estrellas</span>
                  <div class="rating-outer">
                    <div

                      class="rating-inner"
                      :style="`width: ${reviewStats['4']}%;`"
                    />
                  </div>
                </div>
                <div

                  class="rating-star-summary"
                  :class="{'rating-selected': ratingCriteria.rating == 3 }"
                  @click="selectRating(3)"
                >
                  <span>3 estrellas</span>
                  <div class="rating-outer">
                    <div
                      class="rating-inner"
                      :style="`width: ${reviewStats['3']}%;`"
                    />
                  </div>
                </div>
                <div
                  class="rating-star-summary"
                  :class="{'rating-selected': ratingCriteria.rating == 2 }"
                  @click="selectRating(2)"
                >
                  <span>2 estrellas</span>
                  <div class="rating-outer">
                    <div
                      class="rating-inner"
                      :style="`width: ${reviewStats['2']}%;`"
                    />
                  </div>
                </div>
                <div
                  class="rating-star-summary"
                  :class="{'rating-selected': ratingCriteria.rating == 1 }"
                  @click="selectRating(1)"
                >
                  <span>1 estrella</span>
                  <div class="rating-outer">
                    <div
                      class="rating-inner"
                      :style="`width: ${reviewStats['1']}%;`"
                    />
                  </div>
                </div>
              </div>
            </VCol>
            <VCol
              cols="12"
              sm="12"
              md="7"
              lg="8"
              class="col-lg-offset-1"
            >
              <div class="review-filters">
                <button
                  :class="{'selected': ratingCriteria.selected == 'TODOS'}"
                  @click="showAll"
                >
                  Todas
                </button>
                <button
                  :class="{'selected': ratingCriteria.selected == 'MEJOR_VALORADO'}"
                  @click="orderBy('rating', 'desc', 'MEJOR_VALORADO')"
                >
                  Mejor valorado
                </button>
                <button
                  :class="{'selected': ratingCriteria.selected == 'PEOR_VALORADO'}"
                  @click="orderBy('rating', 'asc', 'PEOR_VALORADO')"
                >
                  Peor valorado
                </button>
                <button
                  :class="{'selected': ratingCriteria.selected == 'CON_FOTOS'}"
                  @click="ratingCriteria.selected = 'CON_FOTOS'"
                >
                  Con fotos
                </button>
                <button
                  :class="{'selected': ratingCriteria.selected == 'CON_VIDEOS'}"
                  @click="ratingCriteria.selected = 'CON_VIDEOS'"
                >
                  Con vídeos
                </button>
              </div>

              <!-- review entries -->
              <div
                v-for="review in reviews"
                class="user-reviews"
              >
                <div class="user-review-block">
                  <div>
                    <div class="rating">
                      <div class="rating-aside">
                        <span class="rating-block">
                          <span>
                            <VRating
                              readonly
                              color="primary"
                              density="compact"
                              size="x-small"
                              :model-value="review.rating / 2 "
                            />
   
                          </span>
                        </span>

                        <a
                          v-if="review.product"
                          :href="getProductUrl(review.product)"
                          class="rating-version mtc-link"
                        >
                          <span>{{ review.product?.fullName }}</span>
                          <span>
                            <img
                              :src="getImageUrl(review.product?.image, 300, getDomainId())"
                              class="cdn-img"
                              alt=""
                              width="21"
                              height="21"
                            > 
                          </span>
                        </a>
                      </div>
                      <h4>
                        <div
                          class="account__user-avatar small"
                          style="background: linear-gradient(45deg, rgb(127, 167, 26) 0%, rgb(119, 138, 191) 100%);"
                        >
                          <img
                            alt="user-avatar"
                            style="display: none;"
                          >
                          {{ getReviewInitial(review) }}
                        </div>
                        <span>{{ getReviewerName(review) }} • {{ formatDate( review.date, { day: '2-digit', month: '2-digit', year: 'numeric' } ) }}</span>
                        <svg
                          width="18"
                          height="18"
                          xmlns="http://www.w3.org/2000/svg"
                          class="language-icon icon sprite-icons"
                        >
                          <title>Español</title>
                          <use href="/content/svg/motomundi.svg#i-ratings-es" />
                        </svg>
                      </h4>
                      <p>
                        {{ review.comment }}
                      </p>

                      <!-- Replace the existing review-gallery div -->
                      <div
                        v-if="review.configuration?.images"
                        class="review-gallery"
                      >
                        <span
                          v-for="(revImg, imgIndex) in review.configuration.images"
                          :key="revImg.id"
                          class="image-cover"
                          style="cursor: pointer;"
                          @click="openLightbox(review.configuration.images, imgIndex)"
                        >
                          <img
                            v-if="revImg.id"
                            :src="getImageUrl(revImg.id, 300, getDomainId())"
                            class="cdn-img v-lazy-image v-lazy-image-loaded"
                            alt="Review image"
                            width="110"
                            height="70"
                            @error="handleImageError(revImg.id)"
                          >
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div
                v-if="loading"
                class="mt-10 pt-4 w-100 d-flex justify-center"
              >
                <VProgressCircular
                  indeterminate
                  color="primary"
                />
              </div>

              <div
                v-if="!loading && reviews.length == 0"
                class="empty-review"
              >
                <p>
                  <svg
                    width="16"
                    height="18"
                    xmlns="http://www.w3.org/2000/svg"
                    class="icon sprite-line-icons"
                  >
                    <use href="/content/images/svg/5a3436bd5fabb67d5b4db2b6a90371b1.svg#i-icon-thumbs-up" />
                  </svg>
                  <span>Aún no hay valoraciones</span>
                </p>
              </div>
              <div
                class="reviews-load-more"
                style=""
              >
                <button
                  class="button"
                  @click="nextPage"
                >
                  Ver más comentarios
                </button>
              </div>
            </VCol>
          </aside>
        </VCol>
      </VRow>


      <!-- Add this lightbox dialog BEFORE the closing </VContainer> -->
      <VDialog
        v-model="lightboxOpen"
        max-width="900"
        @keydown.esc="closeLightbox"
      >
        <VCard class="lightbox-card pa-0">
          <VToolbar
            density="compact"
            color="transparent"
            class="lightbox-toolbar"
          >
            <VSpacer />
            <span class="text-caption text-medium-emphasis">
              {{ lightboxIndex + 1 }} / {{ lightboxImages.length }}
            </span>
            <VBtn
              icon
              variant="text"
              @click="closeLightbox"
            >
              <VIcon>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ><path
                  stroke="none"
                  d="M0 0h24v24H0z"
                  fill="none"
                /><path d="M18 6l-12 12" /><path d="M6 6l12 12" /></svg>
              </VIcon>
            </VBtn>
          </VToolbar>

          <VCardText class="d-flex align-center justify-center pa-2 lightbox-content">
            <VBtn
              icon
              variant="text"
              :disabled="lightboxIndex === 0"
              class="lightbox-nav"
              @click="prevImage"
            >
              <VIcon>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ><path
                  stroke="none"
                  d="M0 0h24v24H0z"
                  fill="none"
                /><path d="M15 6l-6 6l6 6" /></svg>
              </VIcon>
            </VBtn>

            <img
              :src="lightboxImage"
              class="lightbox-img"
              alt="Review image"
            >

            <VBtn
              icon
              variant="text"
              :disabled="lightboxIndex === lightboxImages.length - 1"
              class="lightbox-nav"
              @click="nextImage"
            >
              <VIcon>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ><path
                  stroke="none"
                  d="M0 0h24v24H0z"
                  fill="none"
                /><path d="M9 6l6 6l-6 6" /></svg>
              </VIcon>
            </VBtn>
          </VCardText>

          <!-- Thumbnail strip (only shown if multiple images) -->
          <VCardText
            v-if="lightboxImages.length > 1"
            class="d-flex justify-center gap-2 pt-0 pb-3 flex-wrap"
          >
            <img
              v-for="(thumb, i) in lightboxImages"
              :key="thumb.id"
              :src="getImageUrl(thumb.id, 'org', getDomainId())"
              class="lightbox-thumb"
              :class="{ 'lightbox-thumb-active': i === lightboxIndex }"
              alt=""
              width="60"
              height="40"
              @click="lightboxIndex = i; lightboxImage = getImageUrl(thumb.id, 300, getDomainId())"
            >
          </VCardText>
        </VCard>
      </VDialog>
    </VContainer>
  </ClientOnly>
</template>

<style>
#reviews h2 {
  font-size: 24px;
  font-weight: 900;
  line-height: 26.2px;
  margin-bottom: 30px;
  text-transform: uppercase;
}

#reviews .group-title {
  overflow: hidden;
  border-bottom: none;
  padding-bottom: 0;
  padding-left: 0;
  margin-right: 10px;
  margin-bottom: 25px;
}

.ratings-summary .rating-star-summary {
  color: #363636;
  cursor: pointer;
  margin-bottom: .4rem;
  overflow: hidden;
  text-transform: uppercase;
}

.ratings-summary .rating-star-summary > span {
  display: block;
  float: left;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: -.05rem;
  width: 28%;
}

.ratings-summary .rating-star-summary {
  color: #363636;
  cursor: pointer;
  margin-bottom: .4rem;
  overflow: hidden;
  text-transform: uppercase;
}

.ratings-summary .rating-star-summary > span {
  display: block;
  float: left;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: -.05rem;
  width: 28%;
}

.ratings-summary .rating-star-summary {
  color: #363636;
  cursor: pointer;
  margin-bottom: .4rem;
  overflow: hidden;
  text-transform: uppercase;
}

.ratings-summary .rating-outer {
  background-color: #f5f5f5;
  float: left;
  height: 16px;
  overflow: hidden;
  width: 70%;
}

.ratings-summary .rating-inner {
  background-color: #363636;
  height: 16px;
}

.ratings-summary .rating-star-summary {
  color: #363636;
  cursor: pointer;
  margin-bottom: .4rem;
  overflow: hidden;
  text-transform: uppercase;
}

/* /end left control */

.review-filters button.selected {
  background-color: #000;
  color: #fff;
}

.review-filters button {
  background-color: #f0f4f5;
  border-radius: 200px;
  font-size: 10px;
  font-weight: 500;
  margin: 3px;
  padding: .4rem .8rem;
  text-transform: uppercase;
}

.user-reviews {
  border-top: 1px solid #ebebeb;
  margin-top: 1.8rem;
  padding-top: 1.8rem;
}

.user-review-block .rating-aside {
  align-items: center;
  display: flex;
  justify-content: space-between;
}

.rating-block {
  display: inline-block;
  overflow: hidden;
}


.account__user-avatar {
  border-radius: 200px;
  color: #fff;
  font-weight: 700;
  text-align: center;
  text-transform: uppercase;
}


.user-review-block h4 {
  align-items: center;
  display: flex;
  font-size: 13px;
  font-weight: 700;
  margin: 15px 0 8px;
}

.account__user-avatar img {
  border-radius: 200px;
  height: 100%;
  left: 0;
  position: absolute;
  width: 100%;
}

.user-review-block h4 span {
  margin-left: 6px;
}

.user-review-block h4 {
  align-items: center;
  display: flex;
  font-size: 13px;
  font-weight: 700;
  margin: 15px 0 8px;
}

.user-review-block h4 svg {
  margin-left: 4px;
  -webkit-transform: scale(.9);
  transform: scale(.9);
  -webkit-transform-origin: center right;
  transform-origin: center right;
}

.user-review-block p {
  font-size: 14px;
  line-height: 20px;
}

.rating-version {
  align-items: center;
  background-color: #f5f5f5;
  border-radius: 200px;
  color: #000;
  display: flex;
  font-size: .6rem;
  font-weight: 500;
  padding: 2px 12px;
  text-transform: uppercase;
}

.reviews-load-more {
  border-top: 1px solid #ebebeb;
  margin-top: 3rem;
  padding-top: 3rem;
}

#reviews .button {
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

#reviews button, input, optgroup, select, textarea {
  border-radius: 0;
  box-sizing: border-box !important;
  color: #000;
  font-family: system, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
  font-weight: 500;
  outline: none;
}

#reviews .empty-review {
  font-size: 14px;
  font-weight: 600;
  line-height: 1;
  padding: 135px 0;
  text-align: center;
  text-transform: uppercase;
}

#reviews .empty-review svg {
  display: block;
  height: auto;
  margin: 0 auto 1rem;
  width: 35px;
}

.rating-version span:last-child {
  margin-left: 3px;
}

.ratings-summary .rating-selected {
  color: #d6001c;
}

.ratings-summary .rating-selected .rating-inner {
  background-color: #d6001c;
}

#reviews .review-filters button.selected {
  background-color: #000;
  color: #fff;
}

#reviews .review-filters button {
  background-color: #f0f4f5;
  border-radius: 200px;
  font-size: 10px;
  font-weight: 500;
  margin: 3px;
  padding: .4rem .8rem;
  text-transform: uppercase;
}

#reviews .user-reviews {
  border-top: 1px solid #ebebeb;
  margin-top: 1.8rem;
  padding-top: 1.8rem;
}

.rating .small {
  display: inline-block;
  font-size: 9px;
  font-style: normal;
  height: 26px;
  line-height: 27px;
  width: 26px;
  margin: 0;
}

/* Lightbox styles */
.image-cover {
  cursor: pointer;
  display: inline-block;
  transition: opacity 0.2s;
}

.image-cover:hover {
  opacity: 0.85;
}

.lightbox-card {
  background: #111 !important;
  border-radius: 8px;
  overflow: hidden;
}

.lightbox-toolbar {
  background: rgba(0,0,0,0.6) !important;
}

.lightbox-toolbar .v-btn,
.lightbox-toolbar span {
  color: #fff !important;
}

.lightbox-content {
  min-height: 300px;
  background: #111;
}

.lightbox-img {
  max-width: 100%;
  max-height: 70vh;
  object-fit: contain;
  display: block;
}

.lightbox-nav {
  color: #fff !important;
  flex-shrink: 0;
}

.lightbox-nav:disabled {
  opacity: 0.2;
}

.lightbox-thumb {
  object-fit: cover;
  border-radius: 3px;
  cursor: pointer;
  border: 2px solid transparent;
  transition: border-color 0.15s;
}

.lightbox-thumb-active {
  border-color: #fff;
}
</style>

