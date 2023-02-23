<script setup>
import { useColorScheme } from '@baldeweg/ui'
import { useToast } from '@baldeweg/ui'
import { onMounted, onUnmounted, ref } from 'vue'
import AppPanel from '@/components/AppPanel.vue'
import AppMasthead from '@/components/AppMasthead.vue'
import { useConfetti } from '@/composables/useConfetti.js'
import { useOrder } from '@/composables/useOrder.js'
import AuthLogin from '@/components/auth/Login.vue'
import useAuth from '@/composables/useAuth.js'
import router from '@/router'

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

const { orders, list } = useOrder()
const orderInterval = setInterval(list, 5000)

onUnmounted(() => {
  window.clearInterval(orderInterval)
})

const { hasSnow, hasParty } = useConfetti()

const showPride = ref(false)
</script>

<template>
  <BApp>
    <AppMasthead
      :auth="auth"
      :orders="orders"
      @open-drawer="isPanelActive = true"
    />

    <div class="pride" v-if="showPride" />

    <RouterView :auth="auth" v-if="auth.state.isAuthenticated" />

    <BContainer size="s" v-if="!auth.state.isAuthenticated">
      <h1>{{ $t('login') }}</h1>
      <AuthLogin />
    </BContainer>

    <BContainer size="m">
      <div v-html="about" />
    </BContainer>

    <div v-if="auth.state.isAuthenticated">
      <BContainer size="m">
        <BSwitch v-model="hasSnow" label="Snow (Experiment)" />
      </BContainer>

      <BContainer size="m">
        <BSwitch v-model="hasParty" label="Party (Experiment)" />
      </BContainer>

      <BContainer size="m">
        <BSwitch v-model="showPride" label="Pride (Experiment)" />
      </BContainer>
    </div>

    <AppPanel
      :isPanelActive="isPanelActive"
      @close-panel="isPanelActive = false"
    />

    <BToast v-if="current" :type="current.type" :visible="true">
      {{ current.body }}
    </BToast>
  </BApp>
</template>

<style scoped>
.pride {
  position: absolute;
  top: 0;
  left: 0;
  background: linear-gradient(
    90deg,
    rgba(240, 0, 0, 1) 0%,
    rgba(255, 128, 0, 1) 20%,
    rgba(255, 255, 0, 1) 40%,
    rgba(0, 121, 64, 1) 60%,
    rgba(64, 64, 255, 1) 80%,
    rgba(160, 0, 192, 1) 100%
  );
  width: 100%;
  height: 2px;
  z-index: 6;
}
</style>
