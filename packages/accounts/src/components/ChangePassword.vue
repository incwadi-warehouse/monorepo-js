<script setup>
import { ref } from 'vue'
import { useAuth } from '@/composables/useAuth.js'

const passwordSuccessful = ref(null)
const passwordError = ref(null)

const { updatePassword, password } = useAuth()
</script>

<template>
  <details>
    <summary>{{ $t('changePassword') }}</summary>

    <b-form @submit.prevent="updatePassword">
      <b-form-group>
        <b-form-item>
          <b-form-label for="password">
            {{ $t('password') }}
          </b-form-label>
        </b-form-item>
        <b-form-item>
          <b-form-input type="password" id="password" v-model="password" />
        </b-form-item>
      </b-form-group>

      <b-form-group buttons>
        <b-form-item>
          <b-button design="primary">{{ $t('save') }}</b-button>
        </b-form-item>
      </b-form-group>
    </b-form>

    <b-toast type="success" ref="passwordSuccessful">
      <p>{{ $t('passwordSuccessful') }}</p>
    </b-toast>

    <b-toast type="error" ref="passwordError">
      <p>{{ $t('passwordError') }}</p>
    </b-toast>
  </details>
</template>
