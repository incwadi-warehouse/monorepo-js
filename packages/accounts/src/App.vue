<script setup>
import { useRequest } from '@baldeweg/ui'
import { useRoute } from 'vue-router'
import { ref, watch } from 'vue'
import { useConf } from 'shared'
import { useSnow, useParty } from 'shared'
import AppLogo from './components/AppLogo.vue'
import { useToken } from '@/composables/useToken.js'
import AccountPride from '@/components/AccountPride.vue'

const { config } = useRequest()
config.value.baseURL = import.meta.env.VUE_APP_API

const { auth, user } = useToken({ init: true, watch: true })

const about = import.meta.env.VUE_APP_ABOUT

const route = useRoute()

const { hasSnow } = useSnow()
const { hasParty } = useParty()
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

      getConf('snow').then((res) => {
        hasSnow.value = res
      })

      getConf('party').then((res) => {
        hasParty.value = res
      })

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

    <div class="footer">
      <b-container size="s">
        <div v-html="about" />
      </b-container>
    </div>

    <AccountPride :showPride="showPride" />
  </BApp>
</template>

<style scoped>
main {
  --masthead-top-height: 0;
}
.footer {
  border-top: 1px solid var(--color-neutral-02);
}
</style>
