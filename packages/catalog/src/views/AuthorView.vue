<script setup>
import AuthorResults from '@/components/author/AuthorResults.vue'
import AuthorSearch from '@/components/author/AuthorSearch.vue'
import { useHead } from '@unhead/vue'

const props = defineProps({
  auth: Object,
  term: String,
})

useHead({
  title: "Authors",
})
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
