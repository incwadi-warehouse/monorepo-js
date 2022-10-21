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
        query: route.query,
      }),
    },
    {
      path: '/search/book/:id',
      name: 'book.update',
      component: () => import('../views/SearchView.vue'),
      props: (route) => ({
        query: route.query,
        id: route.params.id,
      }),
    },
    {
      path: '/author',
      name: 'author',
      component: () => import('../views/AuthorView.vue'),
      props: (route) => ({
        term: route.query.term || null,
      }),
    },
    {
      path: '/author/:id',
      name: 'author.update',
      component: () => import('../views/AuthorUpdateView.vue'),
      props(route) {
        const props = route.params
        props.id = +props.id
        return props
      },
    },
    {
      path: '/reservation',
      name: 'reservation',
      component: () => import('../views/ReservationView.vue'),
      props: true,
    },
    {
      path: '/directory',
      name: 'directory',
      component: () => import('../views/DirectoryView.vue'),
      props: true,
    },
    {
      path: '/profile',
      name: 'profile',
      component: () => import('../views/ProfileView.vue'),
      props: true,
    },
    {
      path: '/:pathMatch(.*)',
      redirect: { name: 'index' },
    },
  ],
  scrollBehavior(to, from) {
    if (to.name === 'book.update' || from.name === 'book.update') return
    return { top: 0 }
  },
})

export default router
