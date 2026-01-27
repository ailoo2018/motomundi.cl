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

const listReviews = () => {

}

const getReviewInitial = () => {
  return "JCF"
}

const getReviewerName = () => {
  return "Johnny"
}
</script>

<template>
  <div
    id="reviews"
    class="row ng-cloak"
    style="padding: 12px;"
    ng-if="reviews && reviewStats"
  >
    <div class="col s12">
      <aside
        id="ratings"
        class="row"
      >
        <div class="col s12">
          <div class="group-title">
            <h2>Valoraciones </h2>
          </div>
        </div>
        <div class="col s12 m4 l3">
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
              ng-class="{'rating-selected': ratingCriteria.rating == 5 }"
              ng-click="selectRating(5)"
            >
              <span>5 estrellas</span>
              <div class="rating-outer">
                <div

                  class="rating-inner"
                  style="width: {{ reviewStats['5'] }}%;"
                />
              </div>
            </div>
            <div

              class="rating-star-summary"
              ng-click="selectRating(4)"
              ng-class="{'rating-selected': ratingCriteria.rating == 4 }"
            >
              <span>4 estrellas</span>
              <div class="rating-outer">
                <div

                  class="rating-inner"
                  style="width: {{ reviewStats['4'] }}%;"
                />
              </div>
            </div>
            <div

              class="rating-star-summary"
              ng-click="selectRating(3)"
              ng-class="{'rating-selected': ratingCriteria.rating == 3 }"
            >
              <span>3 estrellas</span>
              <div class="rating-outer">
                <div

                  class="rating-inner"
                  style="width: {{ reviewStats['3'] }}%;"
                />
              </div>
            </div>
            <div
              class="rating-star-summary"
              ng-click="selectRating(2)"
              ng-class="{'rating-selected': ratingCriteria.rating == 2 }"
            >
              <span>2 estrellas</span>
              <div class="rating-outer">
                <div
                  class="rating-inner"
                  style="width: {{ reviewStats['2'] }}%;"
                />
              </div>
            </div>
            <div
              class="rating-star-summary"
              ng-click="selectRating(1)"
              ng-class="{'rating-selected': ratingCriteria.rating == 1 }"
            >
              <span>1 estrella</span>
              <div class="rating-outer">
                <div
                  class="rating-inner"
                  style="width: {{ reviewStats['1'] }}%;"
                />
              </div>
            </div>
          </div>
        </div>
        <div class="col s12 m7 l8 offset-l1 ratings-content">
          <div class="review-filters">
            <button
              ng-class="{'selected': ratingCriteria.selected == 'TODOS'}"
              ng-click="selectTodos()"
            >
              Todas
            </button>
            <button
              ng-class="{'selected': ratingCriteria.selected == 'MEJOR_VALORADO'}"
              ng-click="selectMejorValorado();"
            >
              Mejor valorado
            </button>
            <button
              ng-class="{'selected': ratingCriteria.selected == 'PEOR_VALORADO'}"
              ng-click="selectPeorValorado()"
            >
              Peor valorado
            </button>
            <button class="">
              Con fotos
            </button>
            <button class="">
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
                      ng-repeat="revImg in review.images"
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
        </div>
      </aside>
    </div>
  </div>
</template>


