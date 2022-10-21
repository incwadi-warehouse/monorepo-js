<script setup>
import SearchBookResults from '@/components/search/SearchBookResults.vue'
import { useBook } from '@/composables/useBook.js'
import { useInventory } from '@/composables/useInventory.js'
import { useCart } from '@/composables/useCart.js'
import { useFilter } from '@/composables/useFilter.js'
import { useAuthor } from '@/composables/useAuthor.js'
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

// author
const { find: findAuthor } = useAuthor()

//  filter
const { filter } = useFilter()

// inventory
const { hasActiveInventory } = useInventory()

const hasInventory = ref(false)

const canToggleInventory = computed(() => {
  return hasActiveInventory.value
})

// cart
const { add: addToCart } = useCart()

// book
const { books, find, sell, remove } = useBook()

const showCover = ref(false)

const search = () => {
  router.push({ name: 'search', query: filter })
  if (filter.term !== null) {
    findAuthor({ term: filter.term })
  }
  find({ options: filter })
}

const sellBook = (bookId) => {
  sell(bookId).then(() => {
    search()
  })
}

const removeBook = (bookId) => {
  remove(bookId).then(() => {
    search()
  })
}

const showAll = () => {
  filter.limit = books.value.counter
  search(true)
}
</script>

<template>
  <b-container size="l" v-if="books != null">
    <h2>{{ $t('books') }}</h2>
    <p>
      {{
        $tc('results_counter', books ? books.counter : 0, {
          show: books ? books.books.length : 0,
          counter: books ? books.counter : 0,
        })
      }}
    </p>
    <b-button
      design="text"
      :style="{ float: 'right' }"
      @click="hasInventory = !hasInventory"
      v-if="canToggleInventory"
      >{{ $t('inventory_mode') }}</b-button
    >
    <b-button
      design="text"
      :style="{ float: 'right' }"
      @click="showCover = !showCover"
      >{{ $t('show_cover') }}</b-button
    >
    <b-button design="text" :style="{ float: 'right' }" @click="showAll">{{
      $t('show_all')
    }}</b-button>
    <SearchBookResults
      :filter="filter"
      :books="books"
      :hasInventory="hasInventory"
      :showCover="showCover"
      @sell="sellBook"
      @remove="removeBook"
      @add-to-cart="addToCart"
      @search="search"
    />
  </b-container>
</template>
