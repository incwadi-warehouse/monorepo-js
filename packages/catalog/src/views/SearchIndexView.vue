<script setup>
import { useHead } from '@unhead/vue'
import SearchResult from '@/components/searchindex/SearchResult.vue'
import { useSearchIndex } from '@/composables/useSearchIndex.js'

useTitle({ title: 'Search Index' })

const props = defineProps({
  auth: Object,
})

const {
  query,
  results,
  find,
  removeGenreFilter,
  setGenreFilter,
  rebuildIndex,
} = useSearchIndex()
</script>

<template>
  <BContainer size="l">
    <BChip>Experiment</BChip>
  </BContainer>

  <BContainer size="l" :align="'right'">
    <p>
      At the moment you have to trigger the build and update of the index
      manually by hitting the "Rebuild Index" button!
    </p>
    <BButton
      design="outline"
      @click.prevent="rebuildIndex(props.auth.state.me.branch.id)"
    >
      {{ $t('rebuild_index') }}
    </BButton>
  </BContainer>

  <BContainer size="l" class="visuallyHidden">
    <h1>{{ $t('search_index') }}</h1>
  </BContainer>

  <BContainer size="l">
    <BSearch
      @submit.prevent="find(props.auth.state.me.branch.id)"
      :placeholder="$t('search_for_products')"
      branded
      focus
      v-model="query.q"
    />
  </BContainer>

  <BContainer
    size="l"
    :align="'right'"
    v-if="results.hits && results.hits.length >= 1"
  >
    <p :style="{ fontSize: '0.8rem' }">
      ~{{ results.estimatedTotalHits }} {{ $t('hits') }}
    </p>
  </BContainer>

  <BContainer size="l" v-if="results.hits && results.hits.length >= 1">
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
        <BContainer size="l" :style="{ padding: '0' }">
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
