<script setup>
import { useSearchIndex } from '@/composables/useSearchIndex.js'

defineProps({
  result: Object,
})

const { formatPrice, formatAuthor } = useSearchIndex()
</script>

<template>
  <BList :route="{ name: 'book.update', params: { id: result.id } }">
    <template #image v-if="result.image">
      <img width="100" :src="result.image" :alt="result.title" />
    </template>

    <template #title>{{ result.title }}</template>

    <template #subtitle>
      {{ $t('by') }}
      {{ formatAuthor(result.authorFirstname, result.authorSurname) }} &bull;
      {{ result.genre }}
    </template>

    <template #options
      >{{ formatPrice(result.price) }} {{ result.currency }}</template
    >
  </BList>
</template>
