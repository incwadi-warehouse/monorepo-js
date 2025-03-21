<script setup>
import { useI18n } from 'vue-i18n'
import LoginForm from '@/components/LoginForm.vue'
import { useHead } from '@unhead/vue'

const { t } = useI18n()

useHead({
  title: t('login'),
})
</script>

<template>
  <b-container size="s">
    <h1>{{ t('login') }}</h1>
  </b-container>

  <b-container size="s">
    <LoginForm />
  </b-container>
</template>
