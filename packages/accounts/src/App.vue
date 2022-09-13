<script setup>
import { useLocale, useColorScheme } from '@baldeweg/ui'
import AppLogo from './components/AppLogo.vue'

useLocale()
useColorScheme()

const about = import.meta.env.VUE_APP_ABOUT
</script>

<template>
  <BApp>
    <b-container size="s" :align="'center'">
      <AppLogo />
    </b-container>

    <RouterView />

    <b-container size="s" highlight>
      <div v-html="about" />
    </b-container>
  </BApp>
</template>

<style scoped>
main {
  --masthead-top-height: 0;
}
</style>
