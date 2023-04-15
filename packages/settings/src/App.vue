<script setup>
import { useLocale, useColorScheme } from '@baldeweg/ui'
import { useToast } from '@baldeweg/ui'
import { onMounted, onUnmounted, ref, watch } from 'vue'
import { useConf, useSnow } from 'shared'
import Cookies from 'js-cookie'
import Logo from './components/AppLogo.vue'
import AuthLogin from '@/components/auth/Login.vue'
import useAuth from '@/composables/useAuth.js'
import { useReservation } from '@/composables/useReservation.js'
import router from '@/router'

useLocale()
useColorScheme()

const auth = useAuth()

const find = import.meta.env.VUE_APP_FIND

const catalog = import.meta.env.VUE_APP_CATALOG

const orders = import.meta.env.VUE_APP_ORDERS

const about = import.meta.env.VUE_APP_ABOUT

const hasLogo = import.meta.env.VUE_APP_LOGO === 'false' ? false : true

const isDrawerActive = ref(false)

onMounted(() => {
  router.beforeEach((_to, _from, next) => {
    isDrawerActive.value = false
    next()
  })
})

const navigateToOrders = () => {
  window.location = orders
}

const { current } = useToast()

const { state: stateReservation, list: listReservations } = useReservation()

if (auth.state.isAuthenticated) {
  listReservations()
}

const reservationInterval = setInterval(() => {
  if (auth.state.isAuthenticated) {
    listReservations()
  }
}, 5000)

onUnmounted(() => {
  window.clearInterval(reservationInterval)
})

// Snow
watch(
  () => auth.state.me,
  (to, from) => {
    if (from === null && typeof to === 'object') {
      const { hasSnow } = useSnow()

      const { getConf } = useConf(
        Cookies.get('token'),
        import.meta.env.VUE_APP_CONF_API,
        'user',
        auth.state.me.id
      )

      getConf('snow').then((res) => {
        hasSnow.value = res
      })
    }
  }
)
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
        <a :href="catalog">
          <logo v-if="hasLogo" />
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
        </a>
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
          <b-badge
            :content="
              stateReservation.reservations &&
              stateReservation.reservations.length
            "
            hide-empty
          >
            <b-icon type="euro" />
          </b-badge>
        </span>
      </b-masthead-item>
    </b-masthead>

    <router-view :auth="auth" v-if="auth.state.isAuthenticated" />

    <b-container size="s" v-if="!auth.state.isAuthenticated">
      <h1>{{ $t('login') }}</h1>
      <auth-login />
    </b-container>

    <b-container size="m">
      <div v-html="about" />
    </b-container>

    <b-panel :visible="isDrawerActive" @close="isDrawerActive = false">
      <div :style="{ padding: '20px' }">
        <b-list divider>
          <template #title>
            <a :href="catalog + '/search'">
              {{ $t('search') }}
            </a>
          </template>
        </b-list>
        <b-list divider>
          <template #title>
            <a :href="catalog + '/directory'">
              {{ $t('directory') }}
            </a>
          </template>
        </b-list>
        <b-list divider>
          <template #title>
            <a :href="orders + '/'">
              {{ $t('reservation') }}
            </a>
          </template>
        </b-list>
        <b-list :route="{ name: 'settings' }" divider>
          <template #title>
            {{ $t('settings') }}
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
</style>
