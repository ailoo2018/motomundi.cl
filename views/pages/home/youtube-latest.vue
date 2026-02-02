<script setup lang="ts">
import { ref } from 'vue'

const props = defineProps({
  widget: {
    type: Object,
  }
})


let youtubeResponse;

const videos = computed( () => {
  if(!youtubeResponse) {
    return []
  }
  return youtubeResponse.value?.items?.slice(0, 3) || []
})

const getLatestVideos = async () => {
  try {
     youtubeResponse = await $fetch('/api/youtube/latest')
  }catch(e){
    console.error(e)
  }
}

await getLatestVideos()

const formatDate = (dateStr: string) => {
  const date = new Date(dateStr)
  return date.toLocaleDateString('es-ES', { day: '2-digit', month: 'short', year: '2-digit' })
}
</script>

<template>

  <div  section="home" class="youtube-block">
    <div class="containeraa">
      <div class="row" style="margin-bottom: 0px;">
        <div class="col s12 l12">
          <h2>
            Motomundi en YouTube </h2>

          <ul class="youtube-block__content">

            <li v-for="vitem in videos" :key="vitem.id" class="video">

              <a
                target="_blank"
                :href="`https://www.youtube.com/watch?v=${vitem.id.videoId}`"
                class="video-thumb"
              >
                <img :src="vitem.snippet.thumbnails.high.url" alt="Video thumbnail">
              </a>

              <div class="home-youtube-post__content">
                <h3>{{ vitem.snippet.title }}</h3>
                <small>{{ formatDate(vitem.snippet.publishedAt) }}</small>
                <p>{{ vitem.snippet.description }}</p>

                <a
                  target="_blank"
                  :href="`https://www.youtube.com/watch?v=${vitem.id.videoId}`"
                  class="view-video-link"
                >
                  Ver vídeo
                  <img
                    src="data:image/svg+xml;base64,PHN2ZyBoZWlnaHQ9IjExIiB2aWV3Qm94PSIwIDAgNiAxMSIgd2lkdGg9IjYiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0ibTk4IDggNSA1IDUtNSIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjZWIwMDEyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIHRyYW5zZm9ybT0ibWF0cml4KDAgLTEgMSAwIC03LjUgMTA4LjUpIi8+PC9zdmc+"
                    alt="Angle icon"
                  >
                </a>
              </div>
            </li>

          </ul>

          <div class="youtube-link">
            <a href="https://www.youtube.com/MotoMundiTV" target="_blank" class="button button--skewed">
              Visita nuestro canal de YouTube
              <svg width="12" height="12" xmlns="http://www.w3.org/2000/svg" class="icon sprite-line-icons">
                <use
                  href="/content/svg/motomundi.svg#i-icon-arrow-right-tail"
                  style="stroke: white;"
                ></use>
              </svg>
            </a>
          </div>

        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
.youtube-block {
  padding: 0 40px 20px;
  margin-top: 0;
  background-color: #222222;

}

.youtube-block li.video > a img {
  width: 95%;
  margin: auto;
}

.youtube-block__content {
  display: flex;
  margin: 4px 0 30px;
  padding: 0;
  list-style-type: none;
  justify-content: space-between;
}

.youtube-block__content li {
  flex: 1;
  padding-top: 11px;
  border-radius: 3px;
  margin-left: 0.5em;
}

.video {
  position: relative;
  background-color: #f5f5f5;
}

.video-thumb, .video-thumb img {
  display: block;
}

.video-thumb {
  position: relative;
}

.home-youtube-post__content {
  padding: 20px 20px 20px;
}

.youtube-block h2 {
  padding: 30px 0;
  font-weight: 600;
  margin: 18px auto 18px;
  text-align: center;
  text-transform: uppercase;
  color: white;
}

.youtube-block h3 {
  font-size: 18px;
  font-weight: 900;
  line-height: 25px;
  margin: 0 0 3px;
}

.youtube-block p, .youtube-block small {
  line-height: 21px;
  margin-bottom: 15px;

}

.youtube-block small {
  font-size: 10px;
  font-weight: 500;
  display: block;
  text-transform: uppercase;
  color: #acacac;
}

.youtube-block p {
  font-size: 12px;
}

.video-thumb, .video-thumb img {
  display: block;
}

.youtube-link {
  text-align: center;
}

.youtube-link .button {
  font-size: 10px;
  font-weight: 700;
  position: relative;
  z-index: 1;
  display: inline-block;
  overflow: hidden;
  box-sizing: border-box;
  padding: 13px 25px;
  transition: all .2s ease-in-out;
  text-align: center;
  letter-spacing: .5px;
  text-transform: uppercase;
  color: #fff;

  background: #bd0019;
}

.video-thumb:before {
  content: "";
  display: block;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: transparent url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MCIgaGVpZ2h0PSI0NSI+PHBhdGggZmlsbD0iI0ZGRiIgZD0iTTUuMzcxIDQ0LjA3YTYuNDMgNi40MyAwIDAgMCAxLjc0NC0uMjU4Yy41ODgtLjE4IDEuMjc1LS40ODkgMi4wNjItLjk0N2wyNi42NjEtMTUuNTAyYzEuMDc2LS42MzggMS45NTMtMS4zNDUgMi42MS0yLjE0Mi42NDgtLjgwNy45NzctMS43NzQuOTc3LTIuOTIgMC0xLjE0NS0uMzI5LTIuMTEyLS45ODYtMi45MDktLjY1OC0uNzk3LTEuNTM1LTEuNTA0LTIuNjItMi4xMzJMOS4xNDYgMS43MzhDOC4zNiAxLjI4OSA3LjY3My45OCA3LjA3NS44QTYuMDUxIDYuMDUxIDAgMCAwIDUuMzIyLjUzMmMtMS4yNjYgMC0yLjM5MS40NTktMy40MDggMS4zODVDLjg5OCAyLjg0NC4zOSA0LjE1LjM5IDUuODMzVjM4LjcxYzAgMS42OTQuNDk4IDMgMS41MTQgMy45MjYgMS4wMDcuOTE2IDIuMTQyIDEuMzc1IDMuMzk4IDEuMzc1bC4wNy4wNnoiLz48L3N2Zz4=) 50% no-repeat;
  transition: all .35s ease-out;
  opacity: .8;
}


.video-thumb:hover:before {
  background-color: rgba(0, 0, 0, .25);
  opacity: 1
}

.youtube-block h2 {
  font-weight: 600;
  margin: 18px auto 18px;
  text-align: center;
  text-transform: uppercase;
  color: white;
}

.youtube-block__content .view-video-link {
  font-size: 10px;
  font-weight: 500;
  line-height: 21px;
  position: absolute;
  bottom: 15px;
  left: 30px;

  text-transform: uppercase;
  cursor: pointer;
  text-decoration: none;
  color: #d6001c;
  -webkit-tap-highlight-color: transparent;
}

.youtube-block__content .view-video-link img {
  top: 4px;
  position: absolute;
  margin-left: 4px;
}

</style>
