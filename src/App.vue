<script setup>
import { useLocale, useColorScheme } from '@baldeweg/ui'
import { useToast } from '@baldeweg/ui'
import { onMounted, onUnmounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import Logo from './components/AppLogo.vue'
import pkg from './../package.json'
import { useReservation } from '@/composables/useReservation.js'
import useAuth from '@/composables/useAuth.js'
import AuthLogin from '@/components/auth/Login.vue'

useLocale()
useColorScheme()

const router = useRouter()

const auth = useAuth()

const about = import.meta.env.VUE_APP_ABOUT

const hasLogo = import.meta.env.VUE_APP_LOGO === 'false' ? false : true

const isDrawerActive = ref(false)

onMounted(() => {
  router.beforeEach((to, from, next) => {
    isDrawerActive.value = false
    next()
  })
})

const find = import.meta.env.VUE_APP_FIND
const settings = import.meta.env.VUE_APP_SETTINGS
const orders = import.meta.env.VUE_APP_ORDERS

const { current } = useToast()

const { reservations, list: listReservations } = useReservation()

const reservationInterval = setInterval(listReservations, 5000)

onUnmounted(() => {
  window.clearInterval(reservationInterval)
})

const navigateToOrders = () => {
  window.location = import.meta.env.VUE_APP_ORDERS
}

const version = pkg.version
</script>

<template>
  <b-app>
    <b-masthead>
      <b-masthead-item position="start" v-if="auth.state.isAuthenticated">
        <span @click="isDrawerActive = true">
          <b-icon type="hamburger" />
        </span>
      </b-masthead-item>

      <b-masthead-item position="center">
        <router-link :to="{ name: 'index' }">
          <Logo v-if="hasLogo" />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="50"
            height="50"
            viewBox="0 0 200 200"
            class="logo"
            v-else
          >
            <path
              d="M 27.435547 9.8710938 C 17.706307 9.8710935 9.8710935 17.706307 9.8710938 27.435547 L 9.8710938 172.56445 C 9.8710935 182.29369 17.706307 190.12891 27.435547 190.12891 L 172.56445 190.12891 C 182.29369 190.12891 190.12891 182.29369 190.12891 172.56445 L 190.12891 27.435547 C 190.12891 17.706307 182.29369 9.8710938 172.56445 9.8710938 L 27.435547 9.8710938 z M 55 40 L 145 40 L 145 160 L 100 124 L 55 160 L 55 40 z "
            />
          </svg>
        </router-link>
      </b-masthead-item>

      <b-masthead-item position="end" v-if="auth.state.isAuthenticated">
        <b-dropdown position="bottom" class="action">
          <template #selector>
            <span @click.prevent>
              <b-icon type="profile" />
            </span>
          </template>
          <b-dropdown-item no-hover v-if="auth.state.me">
            {{ $t('hello') }}, {{ auth.state.me.username }}!
          </b-dropdown-item>

          <b-dropdown-divider />

          <b-dropdown-item @click.prevent="$router.push({ name: 'profile' })">
            {{ $t('settings') }}
          </b-dropdown-item>
          <b-dropdown-item @click.prevent="auth.logout()">
            {{ $t('logout') }}
          </b-dropdown-item>
        </b-dropdown>
        
        <span class="action" @click.prevent="navigateToOrders">
          <b-badge :content="reservations && reservations.length" hide-empty>
            <b-icon type="euro" />
          </b-badge>
        </span>
      </b-masthead-item>
    </b-masthead>
    <router-view :auth="auth" v-if="auth.state.isAuthenticated" />

    <b-container size="s" v-if="!auth.state.isAuthenticated">
      <h1>{{ $t('login') }}</h1>
      <AuthLogin />
    </b-container>
    <b-container size="m">
      <div v-html="about" />
    </b-container>

    <b-panel :visible="isDrawerActive" @close="isDrawerActive = false">
      <div :style="{ padding: '20px' }">
        <b-list :route="{ name: 'search' }" divider active>
          <template #title>
            {{ $t('search') }}
          </template>
        </b-list>
        <b-list :route="{ name: 'author' }" divider active>
          <template #title>{{ $t('authors') }}</template>
        </b-list>
        <b-list :route="{ name: 'directory' }" divider active>
          <template #title>
            {{ $t('directory') }}
          </template>
        </b-list>
        <b-list divider>
          <template #title>
            <a :href="orders">
              {{ $t('reservation') }}
            </a>
          </template>
        </b-list>
        <b-list divider>
          <template #title>
            <a :href="settings">
              {{ $t('settings') }}
            </a>
          </template>
        </b-list>
        <b-list divider>
          <template #title>
            <a :href="find">
              {{ $t('shop') }}
            </a>
          </template>
        </b-list>
      </div>
    </b-panel>

    <div class="project">
      <a href="https://github.com/abaldeweg">baldeweg Open Source</a>
      &bull;
      <a href="https://github.com/incwadi-warehouse">{{ version }}</a>
    </div>

    <b-toast v-if="current" :type="current.type" :visible="true">
      {{ current.body }}
    </b-toast>
  </b-app>
</template>

<style scoped>
.logo {
  fill: var(--color-primary-10);
}
.action {
  float: right;
  margin-left: 20px;
}
.project {
  text-align: right;
  font-size: 0.6rem;
  margin: 0 20px;
  color: var(--color-neutral-04);
}
.project a,
.project a:hover {
  color: var(--color-neutral-04);
}
</style>
