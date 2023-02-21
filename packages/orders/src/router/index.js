import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.VUE_APP_BASE_URL),
  linkActiveClass: 'isActive',
  linkExactActiveClass: 'isActiveExact',
  routes: [
    {
      path: '/',
      name: 'index',
      redirect: { name: 'order.list' },
    },
    {
      path: '/order',
      name: 'order.list',
      component: () => import('../views/OrderListView.vue'),
    },
    {
      path: '/order/:id',
      name: 'order.detail',
      component: () => import('../views/OrderDetailView.vue'),
      props: true,
    },
    {
      path: '/profile',
      name: 'profile',
      component: () => import('../views/ProfileView.vue'),
    },
    {
      path: '/:pathMatch(.*)',
      redirect: { name: 'reservation' },
    },
  ],
  scrollBehavior() {
    return { top: 0 }
  },
})

export default router
