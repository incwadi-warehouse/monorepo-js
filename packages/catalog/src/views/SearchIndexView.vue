<script setup>
import { useTitle } from '@baldeweg/ui'
import SearchResult from '@/components/searchindex/SearchResult.vue'
import { useSearchIndex } from '@/composables/useSearchIndex.js'

useTitle({ title: 'Search Index' })

const { query, results, find, removeGenreFilter, setGenreFilter } =
  useSearchIndex()
</script>

<template>
  <BContainer size="m" :align="'right'">
    <RouterLink :to="{ name: 'search-index.settings' }">{{
      $t('settings')
    }}</RouterLink>
  </BContainer>

  <BContainer size="m">
    <h1>{{ $t('search_index') }} (Experiment)</h1>
  </BContainer>

  <BContainer size="m">
    <BSearch
      @submit.prevent="find"
      :placeholder="$t('search_for_products')"
      branded
      focus
      v-model="query.q"
    />
  </BContainer>

  <BContainer
    size="m"
    :align="'right'"
    v-if="results.hits && results.hits.length >= 1"
  >
    <p :style="{ fontSize: '0.8rem' }">
      ~{{ results.estimatedTotalHits }} {{ $t('hits') }}
    </p>
  </BContainer>

  <BContainer size="m" v-if="results.hits && results.hits.length >= 1">
    <div class="wrapper">
      <div class="filter">
        <BContainer size="m" :style="{ padding: '0', paddingBottom: '40px' }">
          <BSubheader>{{ $t('genre') }}</BSubheader>
          <ul class="genres" v-if="results.facetDistribution">
            <li
              v-for="(genre, key, index) in results.facetDistribution.genre"
              :key="index"
              class="genres_item"
            >
              <span @click="setGenreFilter(key)">{{ key }} ({{ genre }})</span>
            </li>
          </ul>

          <BButton design="outline" type="button" @click="removeGenreFilter">
            {{ $t('reset') }}
          </BButton>
        </BContainer>

        <BContainer size="m" :style="{ padding: '0', paddingBottom: '40px' }">
          <BSubheader>{{ $t('limit') }}</BSubheader>
          <BForm @submit.prevent>
            <BFormInput type="number" v-model="query.limit" />
          </BForm>
        </BContainer>
      </div>

      <div class="results">
        <BContainer size="m" :style="{ padding: '0' }">
          <div v-for="result in results.hits" :key="result.id">
            <SearchResult :result="result" />
            <BDivider />
          </div>
        </BContainer>
      </div>
    </div>
  </BContainer>
</template>

<style scoped>
.wrapper {
  display: flex;
}
.filter {
  width: 25%;
  font-size: 0.8rem;
  border-right: 2px solid var(--color-neutral-02);
  padding-right: 20px;
}
.results {
  width: 75%;
  padding-left: 20px;
}
.genres {
  list-style: none;
  padding: 0;
}
.genres_item {
  cursor: pointer;
  color: var(--color-neutral-10);
}
.genres_item:hover {
  color: var(--color-neutral-08);
}
</style>
