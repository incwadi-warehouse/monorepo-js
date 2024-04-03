<script setup>
import { useTitle } from '@baldeweg/ui'
import { computed, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useArticle } from '@/composables/useArticle.js'
import { useGenre } from '@/composables/useGenre.js'
import FindList from '@/components/find/FindList.vue'
import FindPagination from '@/components/find/FindPagination.vue'
import FindCheckboxFilter from '@/components/find/FindCheckboxFilter.vue'

useTitle({ title: 'Find' })

const props = defineProps({
  term: String,
  page: {
    type: Number,
    default: 1,
  },
  genre: Number,
})

const term = ref(props.term || null)
const page = ref(props.page || undefined)
const genre = ref(props.genre || null)

const router = useRouter()
const { genres } = useGenre()
const { articles, counter, isLoading, list } = useArticle()

const pages = computed(() => {
  return Math.ceil(counter.value / 20)
})

const find = () => {
  page.value = 1

  list(term.value, page.value, genre.value)

  router.push({
    name: 'find',
    query: { term: term.value, page: page.value, genres: genre.value },
  })
}

const reset = () => {
  term.value = ''
  page.value = undefined
  genre.value = null
}

onMounted(() => {
  if (term.value || genre.value) {
    find()
  }
})
</script>

<template>
  <BContainer size="m">
    <BSearch
      focus
      branded
      :placeholder="$t('searchInTitleAuthorGenre')"
      v-model="term"
      @submit.prevent="find"
      @reset="reset"
    />
  </BContainer>

  <BContainer size="m">
    <FindCheckboxFilter
      :items="genres"
      fieldKey="id"
      fieldValue="name"
      :title="$t('genres')"
      v-model="genre"
      @update:modelValue="find"
    />
  </BContainer>

  <BContainer size="m" v-if="isLoading">
    <BSpinner size="l" />
  </BContainer>

  <BContainer
    size="m"
    v-if="term != null && articles.length == 0 && !isLoading"
  >
    <BAlert type="warning">
      <p>{{ $t('foundNothing') }}</p>
    </BAlert>
  </BContainer>

  <BContainer size="m" v-if="articles.length >= 1">
    <FindList />
  </BContainer>

  <BContainer size="m" v-if="pages > 1">
    <FindPagination :pages="pages" :page="page" />
  </BContainer>
</template>
