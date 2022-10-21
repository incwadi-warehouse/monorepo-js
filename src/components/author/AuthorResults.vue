<script setup>
import { useAuthor } from '@/composables/useAuthor.js'

const { authors, isSearching, remove } = useAuthor()
</script>

<template>
  <b-spinner size="l" v-if="isSearching" />

  <div v-if="authors">
    <p class="counter">
      {{ $tc('found_results', authors.length, { counter: authors.length }) }}
    </p>

    <b-list
      v-for="author in authors"
      :key="author.id"
      :route="{ name: 'author.update', params: { id: author.id } }"
      divider
    >
      <template #title>{{ author.surname }}, {{ author.firstname }}</template>

      <template #options>
        <b-dropdown>
          <template #selector>
            <b-icon type="meatballs" />
          </template>
          <b-dropdown-item
            icon="pencil"
            @click="
              $router.push({
                name: 'author.update',
                params: { id: author.id },
              })
            "
          >
            {{ $t('edit') }}
          </b-dropdown-item>
          <b-dropdown-item icon="bin" @click="remove(author.id)">
            {{ $t('remove') }}
          </b-dropdown-item>
        </b-dropdown>
      </template>
    </b-list>
  </div>
</template>

<style scoped>
.counter {
  text-align: right;
  color: var(--color-neutral-04);
}
</style>
