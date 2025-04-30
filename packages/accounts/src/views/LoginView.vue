<script setup>
import { useHead } from '@unhead/vue'
import { useI18n } from 'vue-i18n'
import LoginForm from '@/components/LoginForm.vue'

const { t } = useI18n()

useTitle({ title: t('login') })
</script>

<template>
  <b-container size="s">
    <h1>{{ t('login') }}</h1>
  </b-container>

  <b-container size="s">
    <LoginForm />
  </b-container>
</template>
