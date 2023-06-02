<script setup>
import { useGenre } from '@/composables/useGenre.js'

const props = defineProps({
  item: Object,
  isAdmin: Boolean,
})

const { genre, set } = useGenre()

set(props.item)
</script>

<template>
  <b-list divider v-if="genre">
    <template #title>
      <b-form
        @submit.prevent="$emit('update', genre)"
        :style="{ margin: '0' }"
        v-if="isAdmin"
      >
        <b-form-group>
          <b-form-item>
            <b-form-label for="name" hidden>
              {{ $t('name') }}
            </b-form-label>
          </b-form-item>
          <b-form-item>
            <b-form-input
              type="text"
              id="name"
              v-model="genre.name"
              @input="$emit('update', genre)"
            />
          </b-form-item>
        </b-form-group>
      </b-form>
      <span v-else>{{ genre.name }}</span>
    </template>

    <template #options>
      <b-dropdown v-if="isAdmin">
        <template #selector>
          <b-icon type="meatballs" />
        </template>
        <b-dropdown-item icon="bin" @click="$emit('remove', genre)">
          {{ $t('delete_item') }}
        </b-dropdown-item>
      </b-dropdown>
    </template>
  </b-list>
</template>
