<script setup>
import { useTitle } from '@baldeweg/ui'
import { useI18n } from 'vue-i18n'
import ChangePassword from '@/components/ChangePassword.vue'

const { t } = useI18n()

useTitle({ title: t('password') })
</script>

<template>
  <b-container size="s">
    <RouterLink :to="{ name: 'account' }">&lang; {{ t('account') }}</RouterLink>
  </b-container>

  <b-container size="s">
    <h1>{{ t('password') }} (Experiment)</h1>
  </b-container>

  <b-container size="s">
    <ChangePassword />
  </b-container>
</template>
