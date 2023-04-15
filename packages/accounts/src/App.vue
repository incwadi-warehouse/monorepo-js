<script setup>
import { useColorScheme } from '@baldeweg/ui'
import { useRequest } from '@baldeweg/ui'
import { useRoute } from 'vue-router'
import { ref, watch } from 'vue'
import { useConf } from 'shared'
import { useSnow, useParty } from 'shared'
import AppLogo from './components/AppLogo.vue'
import { useToken } from '@/composables/useToken.js'

useColorScheme()

const about = import.meta.env.VUE_APP_ABOUT

const { config } = useRequest()
config.value.baseURL = import.meta.env.VUE_APP_API

const { auth, user } = useToken({ init: true, watch: true })

const route = useRoute()

// Snow
const { hasSnow } = useSnow()

watch(
  () => user.value,
  (to, from) => {
    if (from === null && typeof to === 'object') {
      const { getConf } = useConf(
        auth.value.token,
        import.meta.env.VUE_APP_CONF_API,
        'user',
        user.value.id
      )

      getConf('snow').then((res) => {
        hasSnow.value = res
      })
    }
  }
)

// Party
const { hasParty } = useParty()

watch(
  () => user.value,
  (to, from) => {
    if (from === null && typeof to === 'object') {
      const { getConf } = useConf(
        auth.value.token,
        import.meta.env.VUE_APP_CONF_API,
        'user',
        user.value.id
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
  () => user.value,
  (to, from) => {
    if (from === null && typeof to === 'object') {
      const { getConf } = useConf(
        auth.value.token,
        import.meta.env.VUE_APP_CONF_API,
        'user',
        user.value.id
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
    <b-container size="s" :align="'center'">
      <AppLogo />
    </b-container>

    <RouterView v-if="user || route.name === 'login'" />

    <b-container size="s">
      <div v-html="about" />
    </b-container>

    <div class="pride" v-if="showPride" />
  </BApp>
</template>

<style scoped>
main {
  --masthead-top-height: 0;
}
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
</style>
