<script setup>
import { useTitle } from '@baldeweg/ui'
import { useI18n } from 'vue-i18n'
import { useRequest, useJWTAuth } from '@baldeweg/ui'
import LoginForm from '@/components/LoginForm.vue'

const { t } = useI18n()

useTitle({ title: t('login') })

const { config, setAuthHeader } = useRequest()
config.value.baseURL = import.meta.env.VUE_APP_API

const { token, watchToken } = useJWTAuth()

setAuthHeader(token.value)

watchToken()
</script>

<template>
  <b-container size="s">
    <h1>{{ $t('login') }}</h1>

    <LoginForm />
  </b-container>
</template>
