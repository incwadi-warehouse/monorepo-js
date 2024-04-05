<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import SearchCheckboxFilter from '@/components/search/SearchCheckboxFilter.vue'
import { useGenre } from '@/composables/useGenre.js'
import Cart from '@/components/AppCart.vue'

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
</script>

<template>
  <div class="toolbar">
    <BContainer size="m">
      <div class="toolbar_inner">
        <div class="toolbar_item">
          <SearchCheckboxFilter
            :items="genres"
            fieldKey="id"
            fieldValue="name"
            :title="$t('genres')"
            v-model="genre"
            @update:modelValue="find"
          />
        </div>

        <div class="toolbar_item">
          <Cart />
        </div>
      </div>
    </BContainer>
  </div>
</template>

<style scope>
.toolbar {
  border-bottom: 1px solid var(--color-neutral-02);
}
.toolbar_inner {
  display: flex;
  justify-content: space-between;
}
</style>
