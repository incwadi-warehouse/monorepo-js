<script setup>
import { useI18n } from 'vue-i18n'
import { useToken } from '@/composables/useToken.js'
import { useLogout } from '@/composables/useLogout.js'

const { t } = useI18n()
const { user } = useToken()
const { logout } = useLogout()
</script>

<template>
  <div class="media" />

  <h2>
    {{ $t('hello_name', { name: user.username }) }}
  </h2>

  <div class="branch">
    {{ user.branch.name }}
  </div>

  <BDivider />

  <div class="actions">
    <RouterLink :to="{ name: 'password' }">
      {{ t('change_password') }}
    </RouterLink>
    <b-button design="text" @click.prevent="logout">
      {{ $t('logout') }}
    </b-button>
  </div>
</template>

<style scoped>
.media {
  border-radius: 5px;
  background: var(--color-neutral-02);
  background: linear-gradient(
    90deg,
    var(--color-primary-10) 0%,
    var(--color-primary-05) 100%
  );
  height: 10px;
  margin-bottom: 20px;
}
.branch {
  color: var(--color-neutral-06);
}
.actions {
  margin-top: 20px;
  text-align: right;
}
.actions button {
  margin-left: 20px;
}
</style>
