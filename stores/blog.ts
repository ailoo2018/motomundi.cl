import {defineStore} from "pinia";
import type {ProfileState} from "@/stores/profile";


function extractVideoID(url) {
  const regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/
  const match = url.match(regExp)

  return (match && match[7].length === 11) ? match[7] : null
}


export const useBlogStore = defineStore('blog', {
    state: (): ProfileState => ({
      article: null,
      relatedProducts: [],
      isDirty: false,
      loading: false,
      hydrated: false,
    }),
    getters: {
      previewText: state => {
        return state.article?.configuration["preview-text"] || ""
      },
      youtubeVideo: state => {

        if(!state.article?.configuration["youtube-video"])
          return null
        return "https://www.youtube.com/embed/" + extractVideoID( state.article?.configuration["youtube-video"] )

      },
      previewImage: state => {
        return getBaseCDN() + state.article?.configuration["preview-image"] || null
      },
      relatedProductsIds: state => {
        return state.article?.configuration?.assets?.products?.map(p => p.id) || null
      }
    },

    actions: {

      async fetchRelatedProducts() {
        if(this.relatedProductsIds?.length  > 0 ) {
          const { data } = await useFetch("/api/product/list-by-ids", {
            "method": "POST",
            "key": "list-by-ids-" + this.relatedProductsIds,
            headers: {
              'Content-Type': 'application/json',
            },
            body: {
              ids: this.relatedProductsIds,
            },
          })

          this.relatedProducts = data.value.products;
        }
      },

      async fetchArticle(id) {
        const { data } = await useFetch(`/api/blog/articles/${id}`,
          { key: "blog-article-" + id }
        )
        this.article = data.value
      }

    }
  }
)
