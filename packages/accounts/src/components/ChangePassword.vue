<script setup>
import { usePassword } from '@/composables/usePassword.js'

const { update, password, hasSuccess, hasError, isUpdating } = usePassword()
</script>

<template>
  <details>
    <summary>{{ $t('changePassword') }}</summary>

    <b-alert type="success" v-if="hasSuccess">
      <p>{{ $t('password_update_success') }}</p>
    </b-alert>

    <b-alert type="error" v-if="hasError">
      <p>{{ $t('password_update_error') }}</p>
    </b-alert>

    <b-form @submit.prevent="update">
      <b-form-group>
        <b-form-item>
          <b-form-label for="password">
            {{ $t('new_password') }}
          </b-form-label>
        </b-form-item>
        <b-form-item>
          <b-form-input type="password" id="password" v-model="password" />
        </b-form-item>
      </b-form-group>

      <b-form-group buttons>
        <b-form-item>
          <b-button design="primary" v-if="!isUpdating">
            {{ $t('save') }}
          </b-button>
          <b-button design="outline" v-if="isUpdating">
            <b-spinner size="s" :style="{ margin: 'auto' }" />
          </b-button>
        </b-form-item>
      </b-form-group>
    </b-form>
  </details>
</template>
