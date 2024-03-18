<script setup>
import { useColorScheme } from '@baldeweg/ui'
import { useToast } from '@baldeweg/ui'
import { onMounted, onUnmounted, ref, watch } from 'vue'
import { useConf, useSnow, useParty } from 'shared'
import Cookies from 'js-cookie'
import AppPanel from '@/components/AppPanel.vue'
import AppMasthead from '@/components/AppMasthead.vue'
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

// Party
watch(
  () => auth.state.me,
  (to, from) => {
    if (from === null && typeof to === 'object') {
      const { hasParty } = useParty()

      const { getConf } = useConf(
        Cookies.get('token'),
        import.meta.env.VUE_APP_CONF_API,
        'user',
        auth.state.me.id
      )

      getConf('party').then((res) => {
        hasParty.value = res
      })
    }
  }
)

// Pride
const showPride = ref(false)

watch(
  () => auth.state.me,
  (to, from) => {
    if (from === null && typeof to === 'object') {
      const { getConf } = useConf(
        Cookies.get('token'),
        import.meta.env.VUE_APP_CONF_API,
        'user',
        auth.state.me.id
      )

      getConf('pride').then((res) => {
        showPride.value = res
      })
    }
  }
)
</script>

<template>
  <BApp>
    <AppMasthead
      :auth="auth"
      :orders="orders"
      @open-drawer="isPanelActive = true"
    />
    <RouterView :auth="auth" v-if="auth.state.isAuthenticated" />

    <BContainer size="s" v-if="!auth.state.isAuthenticated">
      <h1>{{ $t('login') }}</h1>
      <AuthLogin />
    </BContainer>

    <div class="footer">
      <BContainer size="m">
        <div v-html="about" />
      </BContainer>
    </div>

    <AppPanel
      :isPanelActive="isPanelActive"
      @close-panel="isPanelActive = false"
    />

    <div class="pride" v-if="showPride" />

    <BToast v-if="current" :type="current.type" :visible="true">
      {{ current.body }}
    </BToast>
  </BApp>
</template>

<style scoped>
.pride {
  position: fixed;
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
  z-index: 3;
}
.footer {
  border-top: 1px solid var(--color-neutral-02);
}
</style>
