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
    <p>
      {{
        $tc('results_counter_author', authors ? authors.length : 0, {
          counter: authors ? authors.length : 0,
        })
      }}
    </p>
    <SearchAuthorResults :authors="authors" @remove="removeAuthor" />
  </b-container>
</template>
