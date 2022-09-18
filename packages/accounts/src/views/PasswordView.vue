<script setup>
import { useTitle } from '@baldeweg/ui'
import { useI18n } from 'vue-i18n'
import { useToken } from '@/composables/useToken.js'
import ChangePassword from '@/components/ChangePassword.vue'

const { t } = useI18n()

useTitle({ title: t('password') })

const { user } = useToken()
</script>

<template>
  <b-container size="s" v-if="user">
    <RouterLink :to="{ name: 'account' }">&lang; {{ t('account') }}</RouterLink>
  </b-container>

  <b-container size="s" v-if="user">
    <h1>{{ t('password') }} (Experiment)</h1>
  </b-container>

  <b-container size="s" v-if="user">
    <ChangePassword />
  </b-container>
</template>
