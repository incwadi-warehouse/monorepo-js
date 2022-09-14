<script setup>
import { useTitle } from '@baldeweg/ui'
import { useI18n } from 'vue-i18n'
import { useAuth } from '@/composables/useAuth.js'
import LoginForm from '@/components/LoginForm.vue'
import ChangePassword from '@/components/ChangePassword.vue'

const { t } = useI18n()

useTitle({ title: t('login') })

const { isAuthenticated, user, logout } = useAuth()

const catalog = import.meta.env.VUE_APP_CATALOG
const settings = import.meta.env.VUE_APP_SETTINGS
const orders = import.meta.env.VUE_APP_ORDERS
</script>

<template>
  <b-container size="s" v-if="isAuthenticated && user">
    <p>{{ $t('hello_name', { name: user.username }) }}</p>
  </b-container>

  <b-container size="s" v-if="isAuthenticated && user">
    <b-button design="outline" @click.prevent="logout">
      {{ $t('logout') }}
    </b-button>
  </b-container>

  <b-container size="s" v-if="isAuthenticated && user">
    <ul>
      <li>
        <a :href="catalog">{{ $t('catalog') }}</a>
      </li>
      <li>
        <a :href="settings">{{ $t('settings') }}</a>
      </li>
      <li>
        <a :href="orders">{{ $t('orders') }}</a>
      </li>
    </ul>
  </b-container>

  <b-container size="s" v-if="!isAuthenticated">
    <h1>{{ $t('login') }}</h1>

    <LoginForm />
  </b-container>

  <b-container size="s" v-if="isAuthenticated && user">
    <ChangePassword />
  </b-container>
</template>
