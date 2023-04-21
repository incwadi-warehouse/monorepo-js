<script setup>
import { useI18n } from 'vue-i18n'
import { useConf } from 'shared'
import { ref, watch } from 'vue'
import { useToken } from '@/composables/useToken.js'

const { t } = useI18n()

const { auth, user } = useToken()

const hasSnow = ref(false)
const hasParty = ref(false)

const { getConf, setConf } = useConf(
  auth.value.token,
  import.meta.env.VUE_APP_CONF_API,
  'user',
  user.value.id
)

// Snow
getConf('snow').then((res) => {
  hasSnow.value = res
})

watch(
  () => hasSnow.value,
  () => {
    setConf('snow', hasSnow.value)
  }
)

// Party
getConf('party').then((res) => {
  hasParty.value = res
})

watch(
  () => hasParty.value,
  () => {
    setConf('party', hasParty.value)
  }
)

// Pride
const showPride = ref(false)
getConf('pride').then((res) => {
  showPride.value = res
})

watch(
  () => showPride.value,
  () => {
    setConf('pride', showPride.value)
  }
)

// Beach
const showBeach = ref(false)
getConf('beach').then((res) => {
  showBeach.value = res
})

watch(
  () => showBeach.value,
  () => {
    setConf('beach', showBeach.value)
  }
)
</script>

<template>
  <h2>{{ $t('settings') }}</h2>

  <BSwitch v-model="hasSnow" :label="t('snow')" />

  <BDivider />

  <BSwitch v-model="hasParty" :label="t('party')" />

  <BDivider />

  <BSwitch v-model="showPride" :label="t('pride')" />

  <BDivider />

  <BSwitch v-model="showBeach" :label="t('beach')" />
</template>
