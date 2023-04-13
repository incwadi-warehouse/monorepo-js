<script setup>
import { useLocale, useColorScheme } from '@baldeweg/ui'
import { useRequest } from '@baldeweg/ui'
import { useRoute } from 'vue-router'
import AppLogo from './components/AppLogo.vue'
import { useToken } from '@/composables/useToken.js'

useLocale()
useColorScheme()

const about = import.meta.env.VUE_APP_ABOUT

const { config } = useRequest()
config.value.baseURL = import.meta.env.VUE_APP_API

const { user } = useToken({ init: true, watch: true })

const route = useRoute()
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
  </BApp>
</template>

<style scoped>
main {
  --masthead-top-height: 0;
}
</style>
