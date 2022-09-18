<script setup>
import { useTitle } from '@baldeweg/ui'
import { useI18n } from 'vue-i18n'
import ListApps from '@/components/ListApps.vue'
import { useToken } from '@/composables/useToken.js'
import { useLogout } from '@/composables/useLogout.js'

const { t } = useI18n()

useTitle({ title: t('account') })

const { user } = useToken()
const { logout } = useLogout()
</script>

<template>
  <b-container size="s" v-if="user">
    <h1>{{ t('account') }} (Experiment)</h1>
  </b-container>

  <b-container size="s" v-if="user">
    <b-flex-row :style="{ alignItems: 'center' }">
      <div :style="{ alignItems: 'center', width: '100%' }">
        <p>
          {{ $t('hello_name', { name: user.username }) }}
        </p>
      </div>
      <div :style="{ textAlign: 'right', width: '100%' }">
        <RouterLink :to="{ name: 'password' }">{{
          t('change_password')
        }}</RouterLink>
        <b-button design="outline" @click.prevent="logout">
          {{ $t('logout') }}
        </b-button>
      </div>
    </b-flex-row>
  </b-container>

  <b-container size="s" v-if="user">
    <h2>{{ t('apps') }}</h2>
    <ListApps />
  </b-container>
</template>
