<script setup>
import { useTitle } from '@baldeweg/ui'
import { computed, onMounted, ref, toRefs, watch } from 'vue'
import { debounce } from 'lodash'
import { useRouter } from 'vue-router'
import { useArticle } from '@/composables/useArticle.js'
import { useGenre } from '@/composables/useGenre.js'
import SearchList from '@/components/search/SearchList.vue'
import RecommendationShow from '@/components/recommendation/RecommendationShow.vue'
import SearchPagination from '@/components/search/SearchPagination.vue'
import SearchContent from '@/components/search/SearchContent.vue'
import SearchCheckboxFilter from '@/components/search/SearchCheckboxFilter.vue'

useTitle({ title: 'Search' })

const props = defineProps({
  term: String,
  page: Number,
})

const router = useRouter()

const { term, page } = toRefs(props)

const { articles, counter, isLoading, list } = useArticle()

const pages = computed(() => {
  return Math.ceil(counter.value / 20)
})

const filterGenres = ref(router.currentRoute.value.query.genres || null)

const search = () => {
  if (!term.value) return

  list(term.value, page.value, filterGenres.value)
}

onMounted(search)

watch([() => term.value, () => page.value], () => {
  if (!term.value) {
    articles.value = []
    counter.value = 0
  }
  search()
})

let request = null

const searchOnInput = (t) => {
  if (request !== null) {
    request.cancel()
  }

  request = debounce(() => {
    if (t === null) return

    router.push({
      name: 'search',
      query: { term: t, page: page.value, genres: filterGenres.value },
    })
  }, 500)

  request()
}

const filter = () => {
  router.push({
    name: 'search',
    query: { term: term.value, page: page.value, genres: filterGenres.value },
  })
  search()
}

const { genres } = useGenre()
</script>

<template>
  <article>
    <SearchContent />

    <b-container size="m">
      <b-search
        focus
        branded
        :placeholder="$t('searchInTitleAuthorGenre')"
        :modelValue="term"
        @update:modelValue="searchOnInput"
        @submit.prevent="search"
        @reset="
          $router.push({
            name: 'search',
          })
        "
      />
    </b-container>

    <b-container size="m">
      <p>Filter:</p>
      <SearchCheckboxFilter
        :items="genres"
        fieldKey="id"
        fieldValue="name"
        :title="$t('genres')"
        v-model="filterGenres"
        @update:modelValue="filter"
      />
    </b-container>

    <b-container size="m" v-if="isLoading">
      <b-spinner size="l" />
    </b-container>

    <b-container
      size="m"
      v-if="term != null && articles.length == 0 && !isLoading"
    >
      <b-alert type="warning">
        <p>{{ $t('foundNothing') }}</p>
      </b-alert>
    </b-container>

    <b-container size="m" v-if="articles.length >= 1">
      <SearchList />
    </b-container>

    <b-container size="m" v-if="pages > 1">
      <SearchPagination :pages="pages" :page="page" />
    </b-container>

    <div v-if="term == null || articles.length == 0">
      <b-container size="m">
        <h3>{{ $t('recommendations') }}</h3>
        <RecommendationShow />
      </b-container>
    </div>
  </article>
</template>
