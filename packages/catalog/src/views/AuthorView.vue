<script setup>
import { useTitle } from '@baldeweg/ui'
import AuthorResults from '@/components/author/AuthorResults.vue'
import AuthorSearch from '@/components/author/AuthorSearch.vue'

const props = defineProps({
  auth: Object,
  term: String,
})

useTitle({ title: 'Authors' })
</script>

<template>
  <b-container size="m">
    <h1>{{ $t('authors') }} (Experiment)</h1>
  </b-container>

  <b-container size="m">
    <AuthorSearch :term="props.term" />
  </b-container>

  <b-container size="m">
    <AuthorResults />
  </b-container>
</template>
