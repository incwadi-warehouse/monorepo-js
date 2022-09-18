import { createRouter, createWebHistory } from 'vue-router'
import { useToken } from '@/composables/useToken.js'

const router = createRouter({
  history: createWebHistory(import.meta.env.VUE_APP_BASE_URL),
  linkActiveClass: 'isActive',
  linkExactActiveClass: 'isActiveExact',
  routes: [
    {
      path: '/',
      name: 'index',
      redirect: { name: 'account' },
    },
    {
      path: '/account',
      name: 'account',
      component: () => import('../views/AccountView.vue'),
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginView.vue'),
    },
    {
      path: '/:pathMatch(.*)',
      redirect: { name: 'account' },
    },
  ],
  scrollBehavior() {
    return { top: 0 }
  },
})

router.beforeEach((to) => {
  const { isAuthenticated } = useToken()

  if (!isAuthenticated.value && to.name !== 'login') {
    return { name: 'login' }
  }
})

export default router
