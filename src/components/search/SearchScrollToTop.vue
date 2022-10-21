<script setup>
import { useBook } from '@/composables/useBook.js'
import { computed } from 'vue'

const { books } = useBook()

const hasBooks = computed(() => {
  if (books.value === null || books.value.books === null) return false
  return books.value.books.length >= 1
})

const scrollToTop = () => {
  window.scrollTo(0, 0)
}
</script>

<template>
  <button class="scroll-to-top" @click.prevent="scrollToTop" v-if="hasBooks">
    {{ $t('scroll_to_top') }}
  </button>
</template>

<style scoped>
.scroll-to-top {
  position: fixed;
  bottom: 0;
  right: 50px;
  border-radius: 25px;
  border: 0 hidden;
  background: var(--color-neutral-06);
  padding: 10px;
  margin: 20px;
  color: var(--color-neutral-00);
  font-size: 1.2rem;
  opacity: 0.7;
}
</style>

<style>
body {
  margin-bottom: 70px;
}
</style>
