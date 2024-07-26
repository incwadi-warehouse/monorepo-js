import { createRouter, createWebHistory } from 'vue-router'
import useAuth from '@/composables/useAuth.js'

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
      path: '/:pathMatch(.*)',
      redirect: { name: 'order.list' },
    },
  ],
  scrollBehavior() {
    return { top: 0 }
  },
})

router.beforeEach(() => {
  const { state, me } = useAuth()

  me().then(() => {
    if (!state.isAuthenticated) {
      if (import.meta.env.MODE === 'development') return
      window.location.href = import.meta.env.VUE_APP_ACCOUNTS
    }
  })
})

export default router
