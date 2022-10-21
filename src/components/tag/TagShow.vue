<script setup>
import { useTag } from '@/composables/useTag.js'

const props = defineProps({
  item: Object,
  isAdmin: Boolean,
})

const { tag, set, update, remove } = useTag()

set(props.item)
</script>

<template>
  <b-list divider v-if="tag">
    <template #title>
      <b-form @submit.prevent="update" :style="{ margin: '0' }" v-if="isAdmin">
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
              v-model="tag.name"
              @input="update"
            />
          </b-form-item>
        </b-form-group>
      </b-form>
      <span v-else>{{ tag.name }}</span>
    </template>

    <template #options>
      <b-flex-row>
        <span :style="{ marginRight: '20px' }">
          {{ tag.books }} {{ $t('books') }}
        </span>
        <b-dropdown v-if="isAdmin">
          <template #selector>
            <b-icon type="meatballs" />
          </template>
          <b-dropdown-item icon="bin" @click="remove">
            {{ $t('delete') }}
          </b-dropdown-item>
        </b-dropdown>
      </b-flex-row>
    </template>
  </b-list>
</template>
