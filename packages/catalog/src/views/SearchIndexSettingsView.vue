<script setup>
import { useTitle } from '@baldeweg/ui'
import { useSearchIndexSettings } from '@/composables/useSearchIndexSettings.js'

const props = defineProps({
  auth: Object,
})

useTitle({ title: 'Search Index' })

const { settings, saveSettings, rebuildIndex } = useSearchIndexSettings()
</script>

<template>
  <BContainer size="m" :align="'right'">
    <RouterLink :to="{ name: 'search-index' }">Search</RouterLink>
  </BContainer>

  <BContainer size="m">
    <h1>{{ $t('search_index') }} (Experiment)</h1>
  </BContainer>

  <BContainer size="m">
    <h2>Actions</h2>

    <button @click.prevent="rebuildIndex(props.auth.state.me.branch.id)">
      Rebuild Index
    </button>
  </BContainer>

  <BDivider />

  <BContainer size="m">
    <h2>Settings</h2>

    <form @submit.prevent="saveSettings">
      <textarea v-model="settings" cols="100" rows="10" />
      <br />
      <button>Save</button>
    </form>
  </BContainer>
</template>
