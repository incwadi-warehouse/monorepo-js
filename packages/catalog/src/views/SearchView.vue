<script setup>
import { useTitle } from '@baldeweg/ui'
import { useSearch } from './../composables/useSearch.js'
import { useRouter } from 'vue-router'
import BookEdit from '@/components/book/BookEdit.vue'
import BookCreate from '@/components/book/BookCreate.vue'
import SearchScrollToTop from '../components/search/SearchScrollToTop.vue'
import SearchReservations from '../components/search/SearchReservations.vue'
import SearchBookResultHeading from '../components/search/SearchBookResultHeading.vue'
import SearchCart from '../components/search/SearchCart.vue'
import SearchBookResult from '../components/search/SearchBookResult.vue'
import SearchAuthorResult from '../components/search/SearchAuthorResult.vue'
import SearchFilter from '../components/search/SearchFilter.vue'
import SearchSearchbar from './../components/search/SearchSearchbar.vue'

useTitle({ title: 'Search' })

const props = defineProps({
  auth: Object,
  query: Object,
  id: String,
})

const { modal } = useSearch(props)

const router = useRouter()

const closeModal = (event) => {
  if (event === 'overlay') return

  modal.value = null
  router.push({ name: 'search' })
}
</script>

<template v-if="auth.state.me">
  <SearchReservations />

  <SearchCart />

  <SearchBookResultHeading @catalogue="modal = 'create'" />

  <SearchSearchbar @filter="modal = 'filter'" />

  <SearchBookResult />

  <SearchAuthorResult />

  <SearchScrollToTop />

  <SearchFilter :auth="auth" @close="modal = null" v-if="modal == 'filter'" />

  <BookEdit
    :book-id="id"
    :me="auth.state.me"
    @close="closeModal"
    v-if="modal == 'update'"
  />

  <KeepAlive>
    <BookCreate
      :me="auth.state.me"
      @close="closeModal"
      v-if="modal == 'create'"
    />
  </KeepAlive>
</template>
