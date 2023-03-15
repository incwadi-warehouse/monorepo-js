<script setup>
import { useTitle } from '@baldeweg/ui'
import { useI18n } from 'vue-i18n'
import { useSnow, useParty } from 'shared'
import { useConf } from 'shared'
import { watch } from 'vue'
import { useToken } from '@/composables/useToken.js'
import { useLogout } from '@/composables/useLogout.js'

const { t } = useI18n()

useTitle({ title: t('account') })

const { auth, user } = useToken()
const { logout } = useLogout()

const { hasSnow } = useSnow()
const { hasParty } = useParty()

const { getConf, setConf } = useConf(
  auth.value.token,
  import.meta.env.VUE_APP_CONF_API,
  'user',
  user.value.id
)

getConf('snow').then((res) => {
  hasSnow.value = res
})

watch(
  () => hasSnow.value,
  () => {
    setConf('snow', hasSnow.value)
  }
)
</script>

<template>
  <div v-if="user">
    <b-container size="s">
      <h1>{{ t('account') }} (Experiment)</h1>
    </b-container>

    <b-container size="s">
      <div class="card">
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
      </div>
    </b-container>

    <BContainer size="s">
      <div class="card">
        <h2>{{ $t('settings') }}</h2>

        <BSwitch v-model="hasSnow" label="Snow (Experiment)" />

        <BDivider />

        <BSwitch v-model="hasParty" label="Party (Experiment)" />
      </div>
    </BContainer>
  </div>
</template>

<style scoped>
.card {
  border: 1px solid var(--color-neutral-02);
  border-radius: 20px;
  padding: 20px;
}
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
