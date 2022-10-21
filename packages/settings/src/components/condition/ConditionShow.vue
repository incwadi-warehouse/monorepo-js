<script setup>
import { useCondition } from '@/composables/useCondition.js'

const props = defineProps({
  item: Object,
  isAdmin: Boolean,
})

const { condition, set } = useCondition()

set(props.item)
</script>

<template>
  <b-list divider v-if="condition">
    <template #title>
      <b-form
        @submit.prevent="$emit('update', condition)"
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
              v-model="condition.name"
              @input="$emit('update', condition)"
            />
          </b-form-item>
        </b-form-group>
      </b-form>
      <span v-else>{{ condition.name }}</span>
    </template>

    <template #options>
      <b-dropdown v-if="isAdmin">
        <template #selector>
          <b-icon type="meatballs" />
        </template>
        <b-dropdown-item icon="bin" @click="$emit('remove', condition)">
          {{ $t('delete') }}
        </b-dropdown-item>
      </b-dropdown>
    </template>
  </b-list>
</template>
