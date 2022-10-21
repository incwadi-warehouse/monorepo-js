<script setup>
import { useTitle } from '@baldeweg/ui'
import AuthorUpdate from '@/components/author/AuthorUpdate.vue'

defineProps({
  id: Number,
})

useTitle({ title: 'Author' })
</script>

<template>
  <b-container size="m">
    <h1>{{ $t('edit_author') }}</h1>
  </b-container>

  <b-container size="m">
    <AuthorUpdate :id="id" />
  </b-container>
</template>
