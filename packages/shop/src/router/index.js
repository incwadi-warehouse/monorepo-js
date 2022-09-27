import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.VUE_APP_BASE_URL),
  linkActiveClass: 'isActive',
  linkExactActiveClass: 'isActiveExact',
  routes: [
    {
      path: '/',
      name: 'index',
      redirect: { name: 'search' },
    },
    {
      path: '/search',
      name: 'search',
      component: () => import('../views/SearchView.vue'),
      props: (route) => ({
        term: route.query.term,
        page: parseInt(route.query.page) || undefined,
      }),
    },
    {
      path: '/product/:id',
      name: 'article',
      component: () => import('../views/ArticleView.vue'),
      props: true,
    },
    {
      path: '/:pathMatch(.*)',
      redirect: { name: 'search' },
    },
  ],
  scrollBehavior() {
    return { top: 0 }
  },
})

export default router
