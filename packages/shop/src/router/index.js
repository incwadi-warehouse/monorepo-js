import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.VITE_BASE_URL),
  linkActiveClass: 'isActive',
  linkExactActiveClass: 'isActiveExact',
  routes: [
    {
      path: '/',
      name: 'index',
      redirect: { name: 'home' },
    },
    {
      path: '/home',
      name: 'home',
      component: () => import('../views/HomeView.vue'),
    },
    {
      path: '/find',
      name: 'find',
      component: () => import('../views/FindView.vue'),
      props: (route) => ({
        term: route.query.term,
        page: parseInt(route.query.page) || undefined,
        genre: route.query.genre,
      }),
    },
    {
      path: '/product/:id',
      name: 'product',
      component: () => import('../views/ProductView.vue'),
      props: true,
    },
    {
      path: '/:pathMatch(.*)',
      redirect: { name: 'home' },
    },
  ],
  scrollBehavior(to, from, savedPosition) {
    if (to.name === 'find' && from.name === 'product') {
      return new Promise((resolve) => {
        setTimeout(() => {
          savedPosition.behavior = 'smooth'
          resolve(savedPosition)
        }, 500)
      })
    }

    return { top: 0 }
  },
})

export default router
