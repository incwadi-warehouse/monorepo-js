<script setup>
import AuthorUpdate from '@/components/author/AuthorUpdate.vue'
import { useHead } from '@unhead/vue'

defineProps({
  id: Number,
})

useHead({
  title: "Author",
})
</script>

<template>
  <b-container size="m">
    <h1>{{ $t('edit_author') }}</h1>
  </b-container>

  <b-container size="m">
    <AuthorUpdate :id="id" />
  </b-container>
</template>
