<script setup>
import { useLocale, useColorScheme } from '@baldeweg/ui'
import { useToast } from '@baldeweg/ui'
import { onMounted, onUnmounted, ref } from 'vue'
import pkg from './../package.json'
import AppPanel from '@/components/AppPanel.vue'
import AppMasthead from '@/components/AppMasthead.vue'
import { useConfetti } from '@/composables/useConfetti.js'
import { useReservation } from '@/composables/useReservation.js'
import AuthLogin from '@/components/auth/Login.vue'
import useAuth from '@/composables/useAuth.js'
import router from '@/router'

useLocale()
useColorScheme()

const auth = useAuth()

const about = import.meta.env.VUE_APP_ABOUT

const isPanelActive = ref(false)

onMounted(() => {
  router.beforeEach((_to, _from, next) => {
    isPanelActive.value = false
    next()
  })
})

const { current } = useToast()

const { reservations, list } = useReservation()
const reservationInterval = setInterval(list, 5000)

onUnmounted(() => {
  window.clearInterval(reservationInterval)
})

const version = pkg.version

const { hasSnow, hasParty } = useConfetti()
</script>

<template>
  <b-app>
    <AppMasthead
      :auth="auth"
      :reservations="reservations"
      @open-drawer="isPanelActive = true"
    />

    <BContainer size="m">
      <BTabs justify="flex-end">
        <BTabsLink>
          <RouterLink :to="{ name: 'reservation' }">
            {{ $t('reservations') }}
          </RouterLink>
        </BTabsLink>
        <BTabsLink>
          <RouterLink :to="{ name: 'order.list' }">
            {{ $t('list_view') }}
          </RouterLink>
        </BTabsLink>
      </BTabs>
    </BContainer>

    <router-view :auth="auth" v-if="auth.state.isAuthenticated" />

    <b-container size="s" v-if="!auth.state.isAuthenticated">
      <h1>{{ $t('login') }}</h1>
      <auth-login />
    </b-container>

    <b-container size="m">
      <div v-html="about" />
    </b-container>

    <b-container size="m">
      <BSwitch v-model="hasSnow" label="Snow (Experiment)" />
      <BSwitch v-model="hasParty" label="Party (Experiment)" />
    </b-container>

    <AppPanel
      :isPanelActive="isPanelActive"
      @close-panel="isPanelActive = false"
    />

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
