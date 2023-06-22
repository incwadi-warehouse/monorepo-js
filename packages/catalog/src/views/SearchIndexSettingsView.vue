<script setup>
import { useTitle } from '@baldeweg/ui'
import { useSearchIndexSettings } from '@/composables/useSearchIndexSettings.js'

const props = defineProps({
  auth: Object,
})

useTitle({ title: 'Search Index' })

const { rebuildIndex } = useSearchIndexSettings()
</script>

<template>
  <BContainer size="m" :align="'right'">
    <RouterLink :to="{ name: 'search-index' }">Search</RouterLink>
  </BContainer>

  <BContainer size="m" v-if="auth.state.me.isAdmin">
    <h1>{{ $t('search_index') }} (Experiment)</h1>
  </BContainer>

  <BContainer size="m">
    <h2>Actions</h2>

    <BButton
      design="outline"
      @click.prevent="rebuildIndex(props.auth.state.me.branch.id)"
    >
      Rebuild Index
    </BButton>
  </BContainer>
</template>
