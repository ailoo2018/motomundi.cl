<script setup lang="ts">
const props = defineProps(
  {
    product: {
      type: Object,
    },
  },
)

const reviews = ref([])
const reviewStats = ref({})
const ratingCriteria = ref({ rating: 0, selected: "TODOS"})


const listReviews = () => {

}

const getReviewInitial = () => {
  return "JCF"
}

const getReviewerName = () => {
  return "Johnny"
}

const selectRating = stars => {
  ratingCriteria.value.rating = stars
}

const selectTodos = () => {

}


onMounted(async () => {
  var rs = await $fetch("/api/reviews/list?productId=" + props.product.id)
  if(rs.reviews)
    reviews.value = rs.reviews

  reviewStats.value = await $fetch("/api/reviews/stats?productId=" + props.product.id)

  reviewStats.value.stars = Math.floor(reviewStats.value.avgRating*2);

  reviewStats.value["5"] = 0;
  reviewStats.value["4"] = 0;
  reviewStats.value["3"] = 0;
  reviewStats.value["2"] = 0;
  reviewStats.value["1"] = 0;

  for(var r of reviewStats.value.groups){
    reviewStats.value["" + r.ratingGroup] = r.totalReviews / reviewStats.value.totalReviews * 100;
  }

})
</script>

<template>

  <VRow
    id="reviews"
    style="padding: 12px;"
    v-if="reviews.length > 0"
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
        <VCol cols="12" md="4" lg="3">
          <div class="ratings-summary">
            <span class="rating-block">
              <span>
                <VRating
                  readonly
                  :model-value="4"
                />
              </span>
            </span>
            <p>
              Basada en <strong>{{ reviewStats.totalReviews }}</strong> valoraciones
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
              @click="selectRating(4)"
              :class="{'rating-selected': ratingCriteria.rating == 4 }"
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
              @click="selectRating(3)"
              :class="{'rating-selected': ratingCriteria.rating == 3 }"
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
              @click="selectRating(2)"
              :class="{'rating-selected': ratingCriteria.rating == 2 }"
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
              @click="selectRating(1)"
              :class="{'rating-selected': ratingCriteria.rating == 1 }"
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
        <VCol cols="12" sm="12" md="7" lg="8" class="col-lg-offset-1" >
          <div class="review-filters">
            <button
              :class="{'selected': ratingCriteria.selected == 'TODOS'}"
              @click="ratingCriteria.selected = 'TODOS'"
            >
              Todas
            </button>
            <button
              :class="{'selected': ratingCriteria.selected == 'MEJOR_VALORADO'}"
              @click="ratingCriteria.selected = 'MEJOR_VALORADO'"
            >
              Mejor valorado
            </button>
            <button
              :class="{'selected': ratingCriteria.selected == 'PEOR_VALORADO'}"
              @click="ratingCriteria.selected = 'PEOR_VALORADO'"
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
                          :model-value="4"
                        />
   
                      </span>
                    </span>
                    <!--
                      <a data-v-0fe02913="" 
                      href="/cascos/ls2-ff327_challenger_gp_black_red_32.aspx" data-dr="true"
                      class="rating-version mtc-link"><span
                      data-v-0fe02913="">{{product.brand.name}} {{product.name}}</span>
                      <span data-v-0fe02913=""><img
                      src="https://images.motocard.com/eyJidWNrZXQiOiJtb3RvY2FyZCIsImtleSI6InByb2R1Y3RzL2ltYWdlcy8wOTI5My9sczItZmYzMjdfY2hhbGxlbmdlcl9ncF9ibGFja19yZWRfMzItNi1NLTA5MjkzNjY1LmpwZyIsImVkaXRzIjp7IndlYnAiOnsicXVhbGl0eSI6ODV9LCJqcGVnIjp7InF1YWxpdHkiOjkxfSwicmVzaXplIjp7IndpZHRoIjoyMSwiaGVpZ2h0IjoyMSwiZml0IjoiY292ZXIifX0sInYiOiJmMjczMDczNTc2MjMyODQxYTA4Y2YxODNkNDYxYTFkOCJ9"
                      class="cdn-img v-lazy-image v-lazy-image-loaded"
                      alt="FF327 Challenger GP Black / Red" width="21" height="21"
                      > <noscript></noscript></span></a>
                    -->
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
                    <span>{{ getReviewerName(review) }} • {{ review.date }}</span>
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
                  <div class="review-gallery">
                    <span
                      class="image-cover"
                      v-if="review.images"
                      v-for="revImg in review.images"
                    >
                      <img
                        v-if="revImg.image"
                        :src="revImg.image"
                        class="cdn-img v-lazy-image v-lazy-image-loaded"
                        alt="Review image"
                        width="110"
                        height="70"
                      >
                      <noscript />
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div
            v-if="reviews.length == 0"
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
              @click="listReviews"
            >
              Ver más comentarios
            </button>
          </div>
        </VCol>
      </aside>
    </VCol>
  </VRow>
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

</style>

