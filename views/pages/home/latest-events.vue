<script setup lang="ts">
import {getDataImageUrl} from "@core/utils/formatters"

const props = defineProps({
  widget: {
    type: Object,
  }
})

const {data: rs} = await useFetch(`/api/events/latest-events`, {
  query: {limit: 3},
  key: `events-latest-3`, // Explicit key helps hydration

})

const fmtDate = d => {
  return new Date(d).toLocaleDateString('es-CL', {
    month: 'long',   // "MMMM" (January)
    day: '2-digit',  // "dd"     (05)
    year: 'numeric'  // "yyyy"   (2026)
  })
}

const truncateText = (text: string, limit: number) => {
  if (!text) return ''
  return text.length > limit ? text.substring(0, limit) + '...' : text
}

const events = computed(() => {
  return rs.value.events
})
</script>

<template>

  <div
    :id="`home-block-${widget.id}`"
    class="block-container events-widget"
  >
    <div class="blog-block alt">
      <div class="container">
        <div class="row">
          <h2>
            <svg
              viewBox="0 0 24 24"
              style="width: 24px; height: 24px; margin-right: 4px;position:relative; top: 2px;"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <rect
                x="3"
                y="4"
                width="18"
                height="18"
                rx="2"
                ry="2"
              />
              <line
                x1="16"
                y1="2"
                x2="16"
                y2="6"
              />
              <line
                x1="8"
                y1="2"
                x2="8"
                y2="6"
              />
              <line
                x1="3"
                y1="10"
                x2="21"
                y2="10"
              />
            </svg>
            Próximos eventos
          </h2>
          <div class="gt-columns gt-column-3 gt-column-space-30">
            <div
              v-for="e in events"
              class="gt-col ng-scope"
            >
              <div class="gt-inner">
                <div
                  class="gt-event-style-3"
                  data-event-id="262"
                >
                  <div class="gt-image">
                    <a
                      target="_blank"
                      href="/calendario"
                    >

                      <img
                        decoding="async"
                        width="952"
                        height="579"
                        :src="getDataImageUrl(e.imageId, 600, getDomainId())"
                        class="attachment-eventchamp-event-list size-eventchamp-event-list wp-post-image"
                        alt=""
                        sizes="(max-width: 952px) 100vw, 952px"
                      ></a>
                  </div>
                  <div class="gt-content">
                    <div class="gt-title">
                      <a
                        target="_blank"
                        href="/calendario"
                      >{{e.title}}</a>
                    </div>
                    <div class="gt-details">
                      <div class="gt-category">
                        <ul>
                          <li class="gt-category-69">
                            <a href="/event-category/travel/?post_type=event"/>
                          </li>
                        </ul>
                      </div>
                      <div class="gt-date gt-start-date">
                        <svg
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        >
                          <rect
                            x="3"
                            y="4"
                            width="18"
                            height="18"
                            rx="2"
                            ry="2"
                          />
                          <line
                            x1="16"
                            y1="2"
                            x2="16"
                            y2="6"
                          />
                          <line
                            x1="8"
                            y1="2"
                            x2="8"
                            y2="6"
                          />
                          <line
                            x1="3"
                            y1="10"
                            x2="21"
                            y2="10"
                          />
                        </svg>
                        <span>{{fmtDate(e.startDate)}} </span>
                      </div>
                    </div>
                    <div class="gt-text ">
                      {{ truncateText( e.summary, 250 )}}
                    </div>
                    <div class="gt-details">
                      <div class="gt-location">
                        <svg
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        >
                          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                          <circle
                            cx="12"
                            cy="10"
                            r="3"
                          />
                        </svg>
                        <ul>
                          <li class="gt-category-111">
                            <a href="/calendario">{{e.location}}</a>
                          </li>
                        </ul>
                      </div>


                      <div v-if="e.price && e.price > 0" class="gt-price ng-scope">
                        <svg
                          fill="currentColor"
                          viewBox="0 -98 512 512"
                        >
                          <path
                            d="m492 0h-472c-11.046875 0-20 8.953125-20 20v275.335938c0 11.042968 8.953125 20 20 20h472c11.046875 0 20-8.957032 20-20v-275.335938c0-11.046875-8.953125-20-20-20zm-118.324219 275.335938h-235.351562c-8.453125-50.175782-48.148438-89.871094-98.324219-98.324219v-38.6875c50.175781-8.453125 89.871094-48.148438 98.324219-98.324219h235.351562c8.453125 50.175781 48.148438 89.871094 98.324219 98.324219v38.6875c-50.175781 8.453125-89.871094 48.148437-98.324219 98.324219zm98.324219-177.867188c-28.070312-7.25-50.21875-29.398438-57.46875-57.46875h57.46875zm-374.53125-57.46875c-7.25 28.070312-29.398438 50.21875-57.46875 57.46875v-57.46875zm-57.46875 177.867188c28.070312 7.25 50.21875 29.394531 57.46875 57.46875h-57.46875zm374.53125 57.46875c7.25-28.074219 29.398438-50.21875 57.46875-57.46875v57.46875zm-158.53125-216.335938c-54.40625 0-98.667969 44.261719-98.667969 98.667969 0 54.402343 44.261719 98.667969 98.667969 98.667969s98.667969-44.265626 98.667969-98.667969c0-54.40625-44.261719-98.667969-98.667969-98.667969zm0 157.335938c-32.347656 0-58.667969-26.320313-58.667969-58.667969 0-32.351563 26.320313-58.667969 58.667969-58.667969s58.667969 26.316406 58.667969 58.667969c0 32.347656-26.320313 58.667969-58.667969 58.667969zm0 0"
                          />
                        </svg>
                        <span><span>$</span>{{formatMoney(e.price)}} </span>
                      </div>

                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="blog-link">
            <a
              href="/calendario"
              class="button button--skewed"
            >
              Ver calendario de eventos
              <svg
                width="12"
                height="12"
                xmlns="http://www.w3.org/2000/svg"
                class="icon sprite-line-icons"
              >
                <use
                  href="/content/svg/motomundi.svg#i-icon-arrow-right-tail"
                  xlink:href="/content/svg/motomundi.svg#i-icon-arrow-right-tail"
                />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>

.blog-block {
  background-color: #f5f5f5;
  margin-top: 70px;
  padding: 50px 0;
}

.container {
  margin: 0 auto;
  max-width: 1280px;
  width: 95%;
}

h2 {
  font-weight: 900;
  margin: 0 0 40px;
  font-size: 1.5em;
  text-align: center;
  text-transform: uppercase;
}

*, ::after, ::before {
  box-sizing: border-box;
}

.gt-heading .gt-title {
  font-size: 3.231rem;
  line-height: 1.3;
}


.gt-heading .gt-separate {
  align-items: center;
  display: flex;
  margin: 30px auto 0;
}

.gt-heading .gt-text {
  opacity: .8;
  font-size: 1.077rem;
}

.gt-heading .gt-title + .gt-text, .gt-heading .gt-separate + .gt-text {
  margin-top: 40px;
}


.gt-categorized-contents .gt-nav > li {
  float: none;
  margin: 0;
  padding: 0 7.5px 7.5px;
  display: inline-block;
  position: relative;
}


.widget_archive ul li:before, .widget_categories ul li:before, .widget_pages ul li:before, .widget_meta ul li:before, .widget_recent_comments ul li:before, .widget_recent_entries ul li:before, .widget_nav_menu ul li:before, .fancybox-container .fancybox-thumbs__list a:before, .gt-like-box a.gt-liked, .gt-like-box a.gt-liked:visited, .gt-like-box a.gt-favorited, .gt-like-box a.gt-favorited:visited, .gt-like-box a:hover, .gt-like-box a:focus, .gt-countdown.gt-style-3 ul li > .gt-inner, .gt-footer .gt-app-box .gt-item a:hover, .gt-footer .gt-app-box .gt-item a:focus, .gt-footer.gt-style-1 .gt-app-box .gt-item a:hover, .gt-footer.gt-style-1 .gt-app-box .gt-item a:focus, .gt-post-style-1 .gt-bottom .gt-more, .gt-post-style-1 .gt-bottom .gt-more:visited, .gt-post-style-2 .gt-bottom .gt-more, .gt-post-style-2 .gt-bottom .gt-more:visited, .gt-pagination ul li > span, .gt-pagination ul li > a, .gt-pagination ul li > a:visited, .gt-post-pagination ul li a, .gt-post-pagination ul li a:visited, .gt-event-ticket.gt-style-1.gt-active-on, .gt-event-ticket.gt-style-2.gt-active-on, .gt-event-ticket.gt-style-3.gt-active-on, .gt-event-ticket.gt-style-4, .gt-event-ticket.gt-style-5.gt-active-on, .gt-event-ticket.gt-style-6.gt-active-on, .gt-event-ticket.gt-style-7.gt-active-on, .gt-button.gt-style-3 a, .gt-button.gt-style-3 a:visited, .gt-button.gt-style-2 a, .gt-button.gt-style-2 a:visited, .gt-button.gt-style-1 a:hover, .gt-button.gt-style-1 a:focus, .gt-button.gt-style-1 a, .gt-button.gt-style-1 a:visited, .gt-event-buttons ul li a, .gt-event-buttons ul li a:visited, .gt-event-schedule.gt-style-7 .gt-item > ul > li .gt-content > .gt-inner, .gt-event-schedule.gt-style-2 .gt-schedule-tabs > li > a, .gt-event-schedule.gt-style-2 .gt-schedule-tabs > li > a:visited, .gt-organizers.gt-style-2 ul li a:hover, .gt-organizers.gt-style-2 ul li a:focus, .gt-tags.gt-style-2 ul li a:hover, .gt-tags.gt-style-2 ul li a:focus, .gt-categories.gt-style-2 ul li a:hover, .gt-categories.gt-style-2 ul li a:focus, .gt-social-sharing.gt-style-7 ul li a:hover, .gt-social-sharing.gt-style-7 ul li a:focus, .gt-social-links-element.gt-style-7 ul li a:hover, .gt-social-links-element.gt-style-7 ul li a:focus, .gt-app-box .gt-item a:hover, .gt-app-box .gt-item a:focus, .gt-counter > .gt-number, .gt-testimonials-carousel .gt-slider-pagination .swiper-pagination-bullet:hover, .gt-testimonials-carousel .gt-slider-pagination .swiper-pagination-bullet:focus, .gt-testimonials-carousel .gt-slider-pagination .swiper-pagination-bullet.swiper-pagination-bullet-active, .gt-eventchamp-service-box.gt-style-1 .gt-title, .gt-eventchamp-service-box.gt-style-1 .gt-icon, .gt-blog-carousel .gt-slider-prev:hover, .gt-blog-carousel .gt-slider-prev:focus, .gt-blog-carousel .gt-slider-next:hover, .gt-blog-carousel .gt-slider-next:focus, .gt-blog-carousel .gt-all-button:hover, .gt-blog-carousel .gt-all-button:focus, .gt-dark .gt-slider-prev:hover, .gt-dark .gt-slider-prev:focus, .gt-dark .gt-slider-next:hover, .gt-dark .gt-slider-next:focus, .gt-dark .gt-all-button:hover, .gt-dark .gt-all-button:focus, .gt-venues-carousel.gt-white .gt-slider-prev:hover, .gt-venues-carousel.gt-white .gt-slider-prev:focus, .gt-venues-carousel.gt-white .gt-slider-next:hover, .gt-venues-carousel.gt-white .gt-slider-next:focus, .gt-venues-carousel.gt-white .gt-all-button:hover, .gt-venues-carousel.gt-white .gt-all-button:focus, .gt-events-carousel .gt-slider-prev:hover, .gt-events-carousel .gt-slider-prev:focus, .gt-events-carousel .gt-slider-next:hover, .gt-events-carousel .gt-slider-next:focus, .gt-events-carousel .gt-all-button:hover, .gt-events-carousel .gt-all-button:focus, .gt-categorized-contents .gt-all-button:hover, .gt-categorized-contents .gt-all-button:focus, .gt-categorized-contents .gt-nav > li > a.active, .gt-categorized-contents .gt-nav > li > a.active:visited, .gt-categorized-contents .gt-nav > li > a:hover, .gt-categorized-contents .gt-nav > li > a:focus, .gt-categorized-contents .gt-nav > li > a, .gt-categorized-contents .gt-nav > li > a:visited, .gt-eventchamp-slider .gt-slider-content .gt-buttons a:hover, .gt-eventchamp-slider .gt-slider-content .gt-buttons a:focus, .gt-countdown-slider.gt-style-2 > .gt-slider-content .gt-buttons a:hover, .gt-countdown-slider.gt-style-2 > .gt-slider-content .gt-buttons a:focus, .gt-countdown-slider.gt-style-1 > .gt-slider-content .gt-buttons a:hover, .gt-countdown-slider.gt-style-1 > .gt-slider-content .gt-buttons a:focus, .gt-events-slider .gt-slide-inner .gt-content .buttons a:hover, .gt-events-slider .gt-slide-inner .gt-content .buttons a:focus, .fc button, .fc-state-default, .gt-header.gt-style-1.gt-style-2 .gt-navbar .gt-menu li .gt-dropdown-menu, .gt-header.gt-style-3.gt-style-4 .gt-navbar .gt-menu li .gt-dropdown-menu, .gt-header.gt-style-5.gt-style-6 .gt-navbar .gt-menu li .gt-dropdown-menu, button, input[type="submit"], button:hover, input[type="submit"]:hover, button:active, input[type="submit"]:active, button:active:hover, input[type="submit"]:active:hover, button:active:focus, input[type="submit"]:active:focus, button:active:visited, input[type="submit"]:active:visited, button:focus, input[type="submit"]:focus, button, input[type="submit"] {
  border-color: #d6001c;
}

.fc-state-default:hover, .fc-state-default:focus, .fc button:hover, .fc button:focus, .gt-post-style-1 .gt-bottom .gt-more:hover, .gt-post-style-1 .gt-bottom .gt-more:focus, .gt-post-style-2 .gt-bottom .gt-more:hover, .gt-post-style-2 .gt-bottom .gt-more:focus, .gt-pagination ul li > span.current, .gt-pagination ul li > a:hover, .gt-pagination ul li > a:focus, .gt-post-pagination ul li a:hover, .gt-post-pagination ul li a:focus, .gt-event-buttons ul li a:hover, .gt-event-buttons ul li a:focus, .gt-event-schedule.gt-style-2 .gt-schedule-tabs > li > a.active, .gt-event-schedule.gt-style-2 .gt-schedule-tabs > li > a.active:visited, .gt-event-schedule.gt-style-2 .gt-schedule-tabs > li > a:hover, .gt-event-schedule.gt-style-2 .gt-schedule-tabs > li > a:focus, .gt-detail-widget > ul > li.button-content a:hover, .gt-detail-widget > ul > li.button-content a:focus, .gt-categorized-contents .gt-nav > li > a.active, .gt-categorized-contents .gt-nav > li > a.active:visited, .gt-categorized-contents .gt-nav > li > a:hover, .gt-categorized-contents .gt-nav > li > a:focus, .gt-button.gt-style-3 a:hover, .gt-button.gt-style-3 a:focus, .gt-button.gt-style-2 a:hover, .gt-button.gt-style-2 a:focus, .gt-button.gt-style-1 a:hover, .gt-button.gt-style-1 a:focus {
  background: transparent;
}


.gt-event-style-3 .gt-image > a, .gt-event-style-3 .gt-image > a:visited {
  /*
  position: relative;
  height: 100%;
  width: 100%;
  display: block;
  */


}

.gt-event-style-3 .gt-image img {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  min-height: calc(100% + 20px);
  width: auto;
}

.gt-event-style-3 .gt-image {
  /*
  position: relative;
  margin-bottom: 20px;
  */
  width: auto;
  padding: 10px;
  height: 200px;
  box-sizing: border-box;
  overflow: hidden;
  position: relative;

}

.gt-event-style-3 {
  width: 100%;
  position: relative;
  height: 100%; /* jcf */
}

.gt-columns.gt-column-space-30 > .gt-col > .gt-inner {
  padding: 0 15px 30px;
  height: 100%;
}

.gt-columns > .gt-col > .gt-inner {
  padding: 0 15px 30px;
}

.gt-columns.gt-column-3 > .gt-col {
  width: 33.33333333333333%;
}

.gt-columns > .gt-col {
  width: 100%;
  position: relative;
}

.gt-columns {
  display: flex;
  flex-wrap: wrap;
  margin: 0 -15px -30px;
}

.gt-columns.gt-column-space-30 {
  margin: 0 -15px -30px;
}

.irs-from:after, .irs-to:after, .irs-single:after, .gt-event-style-3 .gt-content, .gt-event-ticket.gt-style-4.gt-active-on:before, .gt-header.gt-style-1.gt-style-2 .gt-navbar .gt-menu li .gt-dropdown-menu, .gt-header.gt-style-3.gt-style-4 .gt-navbar .gt-menu li .gt-dropdown-menu, .gt-header.gt-style-5.gt-style-6 .gt-navbar .gt-menu li .gt-dropdown-menu, .gt-flex-menu {
  border-top-color: #d6001c;
}

.gt-event-style-3 .gt-title {
  font-size: 1.462rem;
  line-height: 1.4;
  font-weight: 700;
  margin-bottom: 15px;
}

.gt-event-style-3 .gt-details {
  margin: -5px -10px;
  width: 100%;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
}

.gt-event-style-3 .gt-details > div {
  padding: 5px 10px;
}

.gt-event-style-3 .gt-price, .gt-event-style-3 .gt-status, .gt-event-style-3 .gt-venue, .gt-event-style-3 .gt-stock, .gt-event-style-3 .gt-location, .gt-event-style-3 .gt-organizer, .gt-event-style-3 .gt-date, .gt-event-style-3 .gt-time {
  font-size: 0.9231rem;
  line-height: 0.9231rem;
  color: #777777;
  align-items: center;
  display: flex;
}

.gt-event-style-3 .gt-details + .gt-text {
  margin-top: 20px;
}

.gt-event-style-3 .gt-text {
  margin: 0 0 15px;
  font-size: 14px;
  color: #777777;
}

.gt-event-style-3 .gt-details > div {
  padding: 5px 10px;
}

.gt-footer.gt-style-1 .gt-social-links-element.gt-style-6 ul li a:hover, .gt-footer.gt-style-1 .gt-social-links-element.gt-style-6 ul li a:focus, .gt-footer.gt-style-1 a:hover, .gt-footer.gt-style-1 a:focus, .gt-event-style-2 .gt-information > div a:focus, .gt-event-style-2 .gt-information > div a:hover, .gt-footer.gt-style-1 .post-list-style-3 .title a:hover, .gt-footer.gt-style-1 .post-list-style-3 .title a:focus, .gt-mobile-menu .gt-bottom .gt-social-links li a:hover, .gt-mobile-menu .gt-bottom .gt-social-links li a:focus, .gt-modal .gt-register-content .gt-modal-footer a:hover, .gt-modal .gt-register-content .gt-modal-footer a:focus, .gt-modal .gt-login-content .gt-modal-footer a:hover, .gt-modal .gt-login-content .gt-modal-footer a:focus, .gt-countdown.gt-style-3 ul li > .gt-inner, .gt-footer .post-list-style-3 .title a:hover, .gt-footer .post-list-style-3 .title a:focus, .gt-feature-box .gt-content .gt-title, .gt-feature-box .gt-icon, .gt-map.gt-events-map .gt-map-popup .gt-inner a:hover, .gt-map.gt-events-map .gt-map-popup .gt-inner a:focus, .gt-label.gt-style-4, .gt-post-style-1 .gt-bottom .gt-more:hover, .gt-post-style-1 .gt-bottom .gt-more:focus, .gt-post-style-1 .gt-bottom > ul a:hover, .gt-post-style-1 .gt-bottom > ul a:focus, .gt-post-style-2 .gt-bottom .gt-more:hover, .gt-post-style-2 .gt-bottom .gt-more:focus, .gt-post-style-2 .gt-bottom > ul a:hover, .gt-post-style-2 .gt-bottom > ul a:focus, .gt-page-content .gt-post-meta a:hover, .gt-page-content .gt-post-meta a:focus, .gt-pagination ul li > span.current, .gt-pagination ul li > a:hover, .gt-pagination ul li > a:focus, .gt-post-pagination ul li a:hover, .gt-post-pagination ul li a:focus, .gt-page-content .gt-post-meta ul li svg, .gt-event-ticket.gt-style-1 .gt-ticket-inner > .gt-details .gt-subtitle, .gt-event-ticket.gt-style-1 .gt-ticket-inner > .gt-details > .gt-price, .gt-event-ticket.gt-style-1 .gt-ticket-inner > .gt-ticket-features p > i, .gt-event-ticket.gt-style-2 .gt-ticket-inner .gt-title, .gt-event-ticket.gt-style-2 .gt-price, .gt-event-ticket.gt-style-3 .gt-ticket-inner .gt-title, .gt-event-ticket.gt-style-3 .gt-price, .gt-event-ticket.gt-style-4 .gt-price, .gt-event-ticket.gt-style-5 .gt-price, .gt-event-ticket .gt-ticket-inner .gt-ticket-features p > i, .gt-event-ticket.gt-style-6 .gt-ticket-features p > i, .gt-event-ticket.gt-style-6 .gt-ticket-header .gt-price, .gt-event-ticket.gt-style-7 .gt-ticket-features p > i, .gt-event-ticket.gt-style-7 .gt-ticket-header .gt-price, .gt-event-buttons ul li a:hover, .gt-event-buttons ul li a:focus, .gt-event-schedule.gt-style-2 .gt-schedule-tabs > li > a.active, .gt-event-schedule.gt-style-2 .gt-schedule-tabs > li > a.active:visited, .gt-event-schedule.gt-style-2 .gt-schedule-tabs > li > a:hover, .gt-event-schedule.gt-style-2 .gt-schedule-tabs > li > a:focus, .gt-speaker.gt-style-1 .gt-content .gt-name a:hover, .gt-speaker.gt-style-1 .gt-content .gt-name a:focus, .gt-speaker.gt-style-1 .gt-social-links ul li a:focus, .gt-speaker.gt-style-1 .gt-social-links ul li a:hover, .gt-speaker.gt-style-2 .gt-social-links ul li a:focus, .gt-speaker.gt-style-2 .gt-social-links ul li a:hover, .gt-speaker.gt-style-3 .gt-social-links ul li a:focus, .gt-speaker.gt-style-3 .gt-social-links ul li a:hover, .gt-speaker.gt-style-4 .gt-social-links ul li a:focus, .gt-speaker.gt-style-4 .gt-social-links ul li a:hover, .gt-speaker.gt-style-5 .gt-social-links ul li a:focus, .gt-speaker.gt-style-5 .gt-social-links ul li a:hover, .gt-speaker.gt-style-6 .gt-social-links ul li a:focus, .gt-speaker.gt-style-6 .gt-social-links ul li a:hover, .gt-content-detail-box > ul > li > .gt-content > .gt-inner a:hover, .gt-content-detail-box > ul > li > .gt-content > .gt-inner a:focus, .gt-content-detail-box > ul > li > .gt-icon > i, .gt-icon-list.gt-style-1 ul li i, .gt-icon-list.gt-style-2 ul li i, .gt-icon-list.gt-style-1 ul li svg, .gt-icon-list.gt-style-2 ul li svg, .gt-mailchimp-newsletter .title i, .gt-button.gt-style-6 a:hover, .gt-button.gt-style-6 a:focus, .gt-button.gt-style-5 a, .gt-button.gt-style-5 a:visited, .gt-button.gt-style-3 a:hover, .gt-button.gt-style-3 a:focus, .gt-button.gt-style-2 a:hover, .gt-button.gt-style-2 a:focus, .gt-button.gt-style-1 a:hover, .gt-button.gt-style-1 a:focus, .gt-contact-box svg, .gt-counter > .gt-title, .gt-counter > .gt-number, .gt-eventchamp-service-box.gt-style-1 .gt-title, .gt-eventchamp-service-box.gt-style-1 .gt-icon, .gt-categorized-contents .gt-nav > li > a.active, .gt-categorized-contents .gt-nav > li > a.active:visited, .gt-categorized-contents .gt-nav > li > a:hover, .gt-categorized-contents .gt-nav > li > a:focus, .gt-heading .gt-title span, .gt-eventchamp-slider .gt-slider-content .gt-title .gt-secondary, .gt-countdown-slider.gt-style-1 > .gt-slider-content .gt-title .gt-secondary, .gt-countdown-slider.gt-style-3 > .gt-slider-content > .gt-counter .gt-counter-inner > div, .gt-events-slider .gt-slide-inner .gt-content .gt-information > li i, .select2-container--default .select2-results__option--highlighted[aria-selected], .select2-container--default .select2-results__option--highlighted[data-selected], .select2-container--default .select2-results__option[aria-selected=true], .select2-container--default .select2-results__option[data-selected=true], .plyr__progress--played, .plyr__volume--display, .bootstrap-select.gt-select .dropdown-item:focus, .bootstrap-select.gt-select .dropdown-item:hover, .bootstrap-select.gt-select .dropdown-item.active, .bootstrap-select.gt-select .dropdown-item:active, blockquote:before, button:hover, input[type="submit"]:hover, button:active, input[type="submit"]:active, button:active:hover, input[type="submit"]:active:hover, button:active:focus, input[type="submit"]:active:focus, button:active:visited, input[type="submit"]:active:visited, button:focus, input[type="submit"]:focus, a:hover, a:focus, .gt-header.gt-style-1.gt-style-2 .gt-elements .gt-social-links li a:hover, .gt-header.gt-style-1.gt-style-2 .gt-elements .gt-social-links li a:focus, .gt-header.gt-style-1.gt-style-2 .gt-navbar .gt-menu > li a:hover, .gt-header.gt-style-1.gt-style-2 .gt-navbar .gt-menu > li a:focus, .gt-header.gt-style-1.gt-style-2 .gt-navbar .gt-menu > li:hover > a, .gt-header.gt-style-1.gt-style-2 .gt-navbar .gt-menu > li:hover > a:visited, .gt-header.gt-style-1.gt-style-2 .gt-navbar .gt-menu > li > a:hover, .gt-header.gt-style-1.gt-style-2 .gt-navbar .gt-menu > li > a:focus, .gt-header.gt-style-1.gt-style-2 .gt-navbar .gt-menu li .gt-dropdown-menu li a:hover, .gt-header.gt-style-1.gt-style-2 .gt-navbar .gt-menu li .gt-dropdown-menu li a:focus, .gt-header.gt-style-3.gt-style-4 .gt-elements .gt-social-links li a:hover, .gt-header.gt-style-3.gt-style-4 .gt-elements .gt-social-links li a:focus, .gt-header.gt-style-3.gt-style-4 .gt-navbar .gt-menu > li a:hover, .gt-header.gt-style-3.gt-style-4 .gt-navbar .gt-menu > li a:focus, .gt-header.gt-style-3.gt-style-4 .gt-navbar .gt-menu > li:hover > a, .gt-header.gt-style-3.gt-style-4 .gt-navbar .gt-menu > li:hover > a:visited, .gt-header.gt-style-3.gt-style-4 .gt-navbar .gt-menu > li > a:hover, .gt-header.gt-style-3.gt-style-4 .gt-navbar .gt-menu > li > a:focus, .gt-header.gt-style-3.gt-style-4 .gt-navbar .gt-menu li .gt-dropdown-menu li a:hover, .gt-header.gt-style-3.gt-style-4 .gt-navbar .gt-menu li .gt-dropdown-menu li a:focus, .gt-header.gt-style-5.gt-style-6 .gt-elements .gt-social-links li a:hover, .gt-header.gt-style-5.gt-style-6 .gt-elements .gt-social-links li a:focus, .gt-header.gt-style-5.gt-style-6 .gt-navbar .gt-menu > li a:hover, .gt-header.gt-style-5.gt-style-6 .gt-navbar .gt-menu > li a:focus, .gt-header.gt-style-5.gt-style-6 .gt-navbar .gt-menu > li:hover > a, .gt-header.gt-style-5.gt-style-6 .gt-navbar .gt-menu > li:hover > a:visited, .gt-header.gt-style-5.gt-style-6 .gt-navbar .gt-menu > li > a:hover, .gt-header.gt-style-5.gt-style-6 .gt-navbar .gt-menu > li > a:focus, .gt-header.gt-style-5.gt-style-6 .gt-navbar .gt-menu li .gt-dropdown-menu li a:hover, .gt-header.gt-style-5.gt-style-6 .gt-navbar .gt-menu li .gt-dropdown-menu li a:focus, .gt-footer a:hover, .gt-footer a:focus, .gt-page-title-bar .gt-breadcrumb nav > ol > li a:focus, .gt-page-title-bar .gt-breadcrumb nav > ol > li a:hover, .gt-page-title-bar .gt-breadcrumb nav > ol > li.gt-item-current, .gt-page-title-bar .gt-breadcrumb nav > ol > li.current-item > span, .gt-mobile-menu .gt-top .gt-menu .gt-dropdown-menu > .active > a, .gt-mobile-menu .gt-top .gt-menu .gt-dropdown-menu > .active > a:focus, .gt-mobile-menu .gt-top .gt-menu .gt-dropdown-menu > .active > a:hover, .gt-mobile-menu .gt-top .gt-menu > li a:hover, .gt-mobile-menu .gt-top .gt-menu > li a:focus, .gt-mobile-menu .gt-top .gt-menu li:hover > a, .gt-mobile-menu .gt-top .gt-menu li:focus > a:visited, .gt-mobile-menu .gt-top .gt-menu li:hover > i, .gt-mobile-menu .gt-top .gt-menu li:focus > i, .gt-flex-menu li a:focus, .gt-flex-menu li a:hover, .fc-state-default:hover, .fc-state-default:focus, .fc button:hover, .fc button:focus, .gt-post-style-1 .gt-bottom > ul > li svg, .gt-post-style-1 .gt-bottom .gt-more:hover, .gt-post-style-1 .gt-bottom .gt-more:focus, .gt-post-style-1 .gt-image .gt-category ul a, .gt-post-style-1 .gt-image .gt-category ul a:visited, .gt-post-style-1 .gt-image .gt-category ul, .gt-post-style-2 .gt-bottom > ul > li svg, .gt-post-style-2 .gt-bottom .gt-more:hover, .gt-post-style-2 .gt-bottom .gt-more:focus, .gt-post-style-2 .gt-image .gt-category ul a, .gt-post-style-2 .gt-image .gt-category ul a:visited, .gt-post-style-2 .gt-image .gt-category ul, .gt-post-style-3 .gt-information > div svg, .gt-event-style-1 .gt-venue a:focus, .gt-event-style-1 .gt-venue a:hover, .gt-event-style-1 .gt-location ul li a:focus, .gt-event-style-1 .gt-location ul li a:hover, .gt-event-style-1 .gt-location svg, .gt-event-style-1 .gt-organizer ul li a:focus, .gt-event-style-1 .gt-organizer ul li a:hover, .gt-event-style-1 .gt-organizer svg, .gt-event-style-1 .gt-date svg, .gt-event-style-1 .gt-time svg, .gt-event-style-1 .gt-venue svg, .gt-event-style-1 .gt-stock svg, .gt-event-style-1 .gt-event-status, .gt-event-style-2 .gt-information > div svg, .gt-event-style-3 .gt-venue a:focus, .gt-event-style-3 .gt-venue a:hover, .gt-event-style-3 .gt-location ul li a:focus, .gt-event-style-3 .gt-location ul li a:hover, .gt-event-style-3 .gt-organizer ul li a:focus, .gt-event-style-3 .gt-organizer ul li a:hover, .gt-event-style-3 .gt-price svg, .gt-event-style-3 .gt-status svg, .gt-event-style-3 .gt-location svg, .gt-event-style-3 .gt-organizer svg, .gt-event-style-3 .gt-date svg, .gt-event-style-3 .gt-time svg, .gt-event-style-3 .gt-stock svg, .gt-event-style-3 .gt-venue svg, .gt-event-style-4 .gt-venue a:focus, .gt-event-style-4 .gt-venue a:hover, .gt-event-style-4 .gt-location ul li a:focus, .gt-event-style-4 .gt-location ul li a:hover, .gt-event-style-4 .gt-organizer ul li a:focus, .gt-event-style-4 .gt-organizer ul li a:hover, .gt-event-style-4 .gt-price svg, .gt-event-style-4 .gt-status svg, .gt-event-style-4 .gt-location svg, .gt-event-style-4 .gt-organizer svg, .gt-event-style-4 .gt-date svg, .gt-event-style-4 .gt-time svg, .gt-event-style-4 .gt-venue svg, .gt-event-style-4 .gt-stock svg, .gt-white .gt-venue-style-1 .gt-title a:hover, .gt-white .gt-venue-style-1 .gt-title a:focus, .gt-venue-style-1 .gt-title a:hover, .gt-venue-style-1 .gt-title a:focus, .gt-venue-style-1 .gt-image .gt-location, .gt-venue-style-1 .gt-image .gt-location a, .gt-venue-style-1 .gt-image .gt-location a:visited, .gt-venue-style-1 .gt-image .gt-category, .gt-venue-style-1 .gt-image .gt-category a, .gt-venue-style-1 .gt-image .gt-category a:visited, .gt-venue-style-1 .gt-image .status, .gt-white .gt-venue-style-3 .gt-title a:hover, .gt-white .gt-venue-style-3 .gt-title a:focus, .gt-venue-style-3 .gt-title a:hover, .gt-venue-style-3 .gt-title a:focus, .gt-venue-style-3 .gt-image .status, .gt-venue-style-3 .gt-category svg, .gt-content-favorite-add-popup:before, .gt-content-favorite-remove-popup:before, .gt-content-like-add-popup:before, .gt-content-like-remove-popup:before, .edit-link a:focus, .edit-link a:hover {
  color: #d6001c;
}

.gt-event-style-3 .gt-price, .gt-event-style-3 .gt-status, .gt-event-style-3 .gt-venue, .gt-event-style-3 .gt-stock, .gt-event-style-3 .gt-location, .gt-event-style-3 .gt-organizer, .gt-event-style-3 .gt-date, .gt-event-style-3 .gt-time {
  font-size: 0.9231rem;
  line-height: 0.9231rem;
  color: #777777;
  align-items: center;
  display: flex;
}

.gt-event-style-3 .gt-price svg, .gt-event-style-3 .gt-status svg, .gt-event-style-3 .gt-venue svg, .gt-event-style-3 .gt-stock svg, .gt-event-style-3 .gt-location svg, .gt-event-style-3 .gt-organizer svg, .gt-event-style-3 .gt-date svg, .gt-event-style-3 .gt-time svg {
  width: 16px;
  margin-right: 8px;
}

.gt-event-style-3 .gt-title {
  font-size: 1.462rem;
  line-height: 1.4;
  font-weight: 700;
  margin-bottom: 15px;
}

.gt-date svg {
  width: 24px;
  height: 24px;
  margin-right: 5px;
}

.gt-event-style-3 .gt-content {
  background: #FFFFFF;
  position: relative;
  z-index: 2;
  margin: -65px 20px 0;
  padding: 20px;
  border-radius: 5px;
  overflow: hidden;
  border-top-width: 3px;
  border-top-style: solid;
  height: 70%;
}

a.fc-day-grid-event.fc-h-event.fc-event.fc-start.fc-end.b-l.b-2x.b-info.fc-draggable {
  background: antiquewhite;
}

.calendar {
  margin-bottom: 20px;
}

.fc-day-grid-event .fc-content .fc-time {
  display: none;
}

a.fc-day-grid-event.fc-h-event.fc-event.fc-start.fc-not-end {
  background-color: aliceblue;
}

a.fc-day-grid-event.fc-h-event.fc-event.fc-not-start.fc-end {
  background-color: aliceblue;
}

@media (max-width: 767px) {
  .gt-columns.gt-column-10 .gt-col, .gt-columns.gt-column-9 .gt-col, .gt-columns.gt-column-8 .gt-col, .gt-columns.gt-column-7 .gt-col, .gt-columns.gt-column-6 .gt-col, .gt-columns.gt-column-5 .gt-col, .gt-columns.gt-column-4 .gt-col, .gt-columns.gt-column-3 .gt-col, .gt-columns.gt-column-2 .gt-col {
    width: 100%;
  }
}

@media (max-width: 767px) {
  .gt-event-style-3 .gt-title {
    font-size: 1.231rem;
  }
}

@media (max-width: 767px) {
  .gt-event-style-3 .gt-content {
    margin-top: -20px;
    margin-left: 0;
    margin-right: 0;
    border-radius: 0;
    height: 70%;
  }
}

h2[data-v-73681564] {
  font-weight: 900;
  margin: 0 0 40px;
  font-size: 1.5em;
  text-align: center;
  text-transform: uppercase;
}

.blog-block[data-v-73681564] {
  background-color: #f5f5f5;
  margin-top: 70px;
  padding: 50px 0;
}


.events-widget .gt-columns {
  margin: 0 0 40px;
}


.gt-title > a {
  color: black;
}

.blog-link {
  text-align: center;
  margin-top: 40px;
}

.button {
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

.button.button--skewed:hover {
  background-color: #bd0019;
  border-color: #d6001c;
  color: #fff;
}

.button:active, .button:focus {
  background-color: #bd0019;
  border-color: #bd0019;
  box-shadow: inset 0 2px 4px 0 rgba(0, 0, 0, .3);
  color: #fff;
}

.button .sprite-line-icons use {
  stroke: #000;
  stroke-width: 1;
  transition: all .2s ease-in-out;
}
.button.button--skewed:hover use {
  stroke: #fff;
}



</style>


