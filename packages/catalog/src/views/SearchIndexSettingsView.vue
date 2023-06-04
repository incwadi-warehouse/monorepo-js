<script setup>
import { useTitle } from '@baldeweg/ui'
import { useSearchIndexSettings } from '@/composables/useSearchIndexSettings.js'

const props = defineProps({
  auth: Object,
})

useTitle({ title: 'Search Index' })

const {
  indexes,
  indexName,
  createIndex,
  removeIndex,
  settings,
  saveSettings,
  rebuildIndex,
} = useSearchIndexSettings()
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
    <h2>Indexes</h2>
    <p>
      This search uses index "books". If there is no index called "books",
      create one. Other indexes will be ignored at the moment.
    </p>

    <ul v-if="indexes">
      <li v-for="index in indexes.results" :key="index.uid">
        {{ index.uid }} (<span @click.prevent="removeIndex(index.uid)">
          {{ $t('remove') }} </span
        >)
      </li>
    </ul>

    <form @submit.prevent="createIndex">
      <label for="indexName">Index Name</label>
      <input type="text" id="indexName" v-model="indexName" />
      <button>Add</button>
    </form>
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
