<script setup>
import { useLogin } from '@/composables/useLogin.js'

const { username, password, hasError, login, isLoggingIn } = useLogin()
</script>

<template>
  <b-alert type="error" v-if="hasError">
    <p>{{ $t('login_error') }}</p>
  </b-alert>

  <b-form @submit.prevent="login">
    <!-- username -->
    <b-form-group>
      <b-form-item>
        <b-form-label for="username">{{ $t('username') }}</b-form-label>
      </b-form-item>
      <b-form-item>
        <b-form-input type="text" id="username" autofocus v-model="username" />
      </b-form-item>
    </b-form-group>

    <!-- password -->
    <b-form-group>
      <b-form-item>
        <b-form-label for="password">{{ $t('password') }}</b-form-label>
      </b-form-item>
      <b-form-item>
        <b-form-input type="password" id="password" v-model="password" />
      </b-form-item>
    </b-form-group>

    <!-- buttons -->
    <b-form-group buttons>
      <b-form-item>
        <b-button design="primary_wide" v-if="!isLoggingIn">
          {{ $t('login') }}
        </b-button>
        <b-button design="outline_wide" v-if="isLoggingIn">
          <b-spinner size="s" :style="{ margin: 'auto' }" />
        </b-button>
      </b-form-item>
    </b-form-group>
  </b-form>
</template>
