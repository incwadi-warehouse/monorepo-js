<script setup>
import { useTitle } from '@baldeweg/ui'
import AuthPassword from '@/components/auth/Password.vue'
import ProfileLocale from '@/components/profile/Locale.vue'
import ProfileTheme from '@/components/profile/Theme.vue'

useTitle({ title: 'Profile' })

defineProps({
  auth: Object,
})
</script>

<template>
  <b-container size="m">
    <h1>{{ $t('profile') }}</h1>
  </b-container>

  <b-container size="m">
    <AuthPassword />
  </b-container>

  <b-container size="m">
    <ProfileLocale />
  </b-container>

  <b-container size="m">
    <ProfileTheme />
  </b-container>
</template>
