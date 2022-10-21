<script setup>
import { useTitle } from '@baldeweg/ui'
import { onMounted } from 'vue'
import SettingsStats from '../components/settings/SettingsStats.vue'
import { useBook } from '@/composables/useBook.js'

useTitle({ title: 'Settings' })

defineProps({
  auth: Object,
})

const { stats, getStats } = useBook()

onMounted(getStats)

const round = (value) => {
  return parseFloat(value).toFixed(2)
}
</script>

<template>
  <article>
    <b-container size="m" v-if="auth && auth.state.me">
      <h1>{{ $t('settings_for_branch') }} "{{ auth.state.me.branch.name }}"</h1>
    </b-container>

    <b-container size="m" v-if="stats">
      <h2>{{ $t('stats') }}</h2>
    </b-container>

    <b-container size="m" v-if="stats">
      <SettingsStats :stats="stats" />
    </b-container>

    <b-container size="m" v-if="stats">
      <p>{{ $t('storage_usage') }}: {{ round(stats.storage) }} MB</p>
    </b-container>

    <b-container size="m" v-if="!stats">
      <b-spinner size="l" />
    </b-container>

    <b-container size="m">
      <b-list :route="{ name: 'branch' }" divider>
        <template #title>{{ $t('branch') }}</template>
      </b-list>
      <b-list :route="{ name: 'inventory' }" divider>
        <template #title>{{ $t('inventory') }}</template>
      </b-list>
      <b-list :route="{ name: 'condition' }" divider>
        <template #title>{{ $t('condition') }}</template>
      </b-list>
      <b-list :route="{ name: 'format' }" divider>
        <template #title>{{ $t('format') }}</template>
      </b-list>
      <b-list :route="{ name: 'genre' }" divider>
        <template #title>{{ $t('genre') }}</template>
      </b-list>
      <b-list :route="{ name: 'announcement' }" divider>
        <template #title>{{ $t('announcements') }}</template>
      </b-list>
      <b-list :route="{ name: 'tag' }" divider>
        <template #title>{{ $t('tags') }}</template>
      </b-list>
    </b-container>
  </article>
</template>
