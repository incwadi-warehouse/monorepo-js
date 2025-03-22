<script setup>
import { useI18n } from 'vue-i18n'
import ChangePassword from '@/components/ChangePassword.vue'
import { useHead } from '@unhead/vue'

const { t } = useI18n()

useHead({
  title: t('password'),
})
</script>

<template>
  <b-container size="s">
    <RouterLink :to="{ name: 'account' }">&lang; {{ t('account') }}</RouterLink>
  </b-container>

  <b-container size="s">
    <h1>{{ t('password') }}</h1>
  </b-container>

  <b-container size="s">
    <ChangePassword />
  </b-container>
</template>
