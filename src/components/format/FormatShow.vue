<script setup>
import { useFormat } from '@/composables/useFormat.js'

const props = defineProps({
  item: Object,
  isAdmin: Boolean,
})

const { format, set } = useFormat()

set(props.item)
</script>

<template>
  <b-list divider v-if="format">
    <template #title>
      <b-form
        @submit.prevent="$emit('update', format)"
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
              v-model="format.name"
              @input="$emit('update', format)"
            />
          </b-form-item>
        </b-form-group>
      </b-form>
      <span v-else>{{ format.name }}</span>
    </template>

    <template #options>
      <b-dropdown v-if="isAdmin">
        <template #selector>
          <b-icon type="meatballs" />
        </template>
        <b-dropdown-item icon="bin" @click="$emit('remove', format)">
          {{ $t('delete') }}
        </b-dropdown-item>
      </b-dropdown>
    </template>
  </b-list>
</template>
