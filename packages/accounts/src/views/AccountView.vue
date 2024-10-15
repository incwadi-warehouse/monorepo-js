<script setup>
import { useTitle } from '@baldeweg/ui'
import { useI18n } from 'vue-i18n'
import AccountSettings from '@/components/AccountSettings.vue'
import AccountProfile from '@/components/AccountProfile.vue'

const { t } = useI18n()

useTitle({ title: t('account') })
</script>

<template>
  <b-container size="s">
    <h1>{{ t('account') }}</h1>
  </b-container>

  <b-container size="s">
    <div class="card">
      <AccountProfile />
    </div>
  </b-container>

  <BContainer size="s">
    <div class="card">
      <!-- <AccountSettings /> -->
    </div>
  </BContainer>
</template>

<style scoped>
.card {
  border: 1px solid var(--color-neutral-02);
  border-radius: 20px;
  padding: 20px;
}
</style>
