import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.VUE_APP_BASE_URL),
  linkActiveClass: 'isActive',
  linkExactActiveClass: 'isActiveExact',
  routes: [
    {
      path: '/',
      name: 'settings',
      component: () => import('../views/SettingsView.vue'),
      props: true,
    },
    {
      path: '/branch',
      name: 'branch',
      component: () => import('../views/BranchView.vue'),
      props: true,
    },
    {
      path: '/inventory',
      name: 'inventory',
      component: () => import('../views/InventoryView.vue'),
      props: true,
    },
    {
      path: '/condition',
      name: 'condition',
      component: () => import('../views/ConditionView.vue'),
      props: true,
    },
    {
      path: '/format',
      name: 'format',
      component: () => import('../views/FormatView.vue'),
      props: true,
    },
    {
      path: '/genre',
      name: 'genre',
      component: () => import('../views/GenreView.vue'),
      props: true,
    },
    {
      path: '/tag',
      name: 'tag',
      component: () => import('../views/TagView.vue'),
      props: true,
    },
    {
      path: '/:pathMatch(.*)',
      redirect: { name: 'settings' },
    },
  ],
  scrollBehavior() {
    return { top: 0 }
  },
})

export default router
