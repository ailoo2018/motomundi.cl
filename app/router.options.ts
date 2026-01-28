import type { RouterConfig } from '@nuxt/schema'

export default <RouterConfig> {
  routes: (_routes) => {
    return  [
    ..._routes,
/*
    {
      name: 'moto-blog',
      path: '/moto-blog',
      component: () => import('~/pages/blog/index.vue')
    }
*/
  ]
  },
}
