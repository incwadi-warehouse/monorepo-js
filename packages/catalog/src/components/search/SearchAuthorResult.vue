<script setup>
import SearchAuthorResults from '@/components/search/SearchAuthorResults.vue'
import { useAuthor } from '@/composables/useAuthor.js'
import { useFilter } from '@/composables/useFilter.js'

const { authors, find, remove } = useAuthor()

const { filter } = useFilter()

const removeAuthor = (authorId) => {
  remove(authorId).then(() => {
    find({ term: filter.term })
  })
}
</script>

<template>
  <b-container size="l" v-if="authors != null">
    <h2>{{ $t('authors') }}</h2>
    <i18n-t
      keypath="results_counter_author"
      tag="p"
      :plural="authors ? authors.length : 0"
    >
      <template #counter>{{ authors ? authors.length : 0 }}</template>
    </i18n-t>
    <SearchAuthorResults :authors="authors" @remove="removeAuthor" />
  </b-container>
</template>
