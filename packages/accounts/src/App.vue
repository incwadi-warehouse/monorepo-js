<script setup>
import { useLocale, useColorScheme } from '@baldeweg/ui'
import AppLogo from './components/AppLogo.vue'

useLocale()
useColorScheme()
</script>

<template>
  <BApp>
    <AppLogo />
    <RouterView />
  </BApp>
</template>

<style scoped>
.logo {
  fill: var(--color-primary-10);
}
</style>
