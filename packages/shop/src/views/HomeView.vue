<script setup>
import { useTitle } from '@baldeweg/ui'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useGenre } from '@/composables/useGenre.js'
import RecommendationShow from '@/components/recommendation/RecommendationShow.vue'
import SearchContent from '@/components/search/SearchContent.vue'
import SearchCheckboxFilter from '@/components/search/SearchCheckboxFilter.vue'

useTitle({ title: 'Home' })

const router = useRouter()
const { genres } = useGenre()

const term = ref('')
const genre = ref(null)

const find = () => {
  router.push({
    name: 'find',
    query: { term: term.value, genre: genre.value },
  })
}

const reset = () => {
  term.value = ''
  genre.value = null
}
</script>

<template>
  <SearchContent />

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
    <SearchCheckboxFilter
      :items="genres"
      fieldKey="id"
      fieldValue="name"
      :title="$t('genres')"
      v-model="genre"
      @update:modelValue="find"
    />
  </BContainer>

  <BContainer size="m">
    <h2>{{ $t('recommendations') }}</h2>
    <RecommendationShow />
  </BContainer>
</template>
