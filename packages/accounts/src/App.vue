<script setup>
import { useLocale, useColorScheme } from '@baldeweg/ui'
import { useRequest } from '@baldeweg/ui'
import AppLogo from './components/AppLogo.vue'
import { useAuth } from '@/composables/useAuth.js'

useLocale()
useColorScheme()

const about = import.meta.env.VUE_APP_ABOUT

const { config, setAuthHeader } = useRequest()
config.value.baseURL = import.meta.env.VUE_APP_API

const { token, watchToken, refresh } = useAuth()

setAuthHeader(token.value)

watchToken()

refresh()
</script>

<template>
  <BApp>
    <b-container size="s" :align="'center'">
      <AppLogo />
    </b-container>

    <RouterView />

    <b-container size="s">
      <div v-html="about" />
    </b-container>
  </BApp>
</template>

<style scoped>
main {
  --masthead-top-height: 0;
}
</style>
