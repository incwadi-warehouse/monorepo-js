<script setup>
import { useFilter } from '@/composables/useFilter.js'
import { useAuthor } from '@/composables/useAuthor.js'
import { useBook } from '@/composables/useBook.js'
import { debounce } from 'lodash'
import { useRouter } from 'vue-router'

const router = useRouter()

const { filter, reset: resetFilter } = useFilter()

const { authors, find: findAuthor } = useAuthor()

const { books, find: findBook } = useBook()

const search = () => {
  router.push({ name: 'search', query: filter })
  if (filter.term !== null) {
    findAuthor({ term: filter.term })
  }
  findBook({ options: filter })
}

var debounced = null

const delaySearch = () => {
  if (debounced !== null) {
    debounced.cancel()
  }

  debounced = debounce(() => {
    search()
  }, 1000)

  debounced()
}

const reset = () => {
  resetFilter()
  books.value = null
  authors.value = null
  router.push({ name: 'search' })
}
</script>

<template>
  <b-container size="l">
    <b-search
      :placeholder="$t('search_in_title_author_genre_tag')"
      filter
      branded
      @update:modelValue="delaySearch"
      @submit.prevent="search"
      @reset="reset"
      @filter="$emit('filter')"
      v-model="filter.term"
    />
  </b-container>
</template>
