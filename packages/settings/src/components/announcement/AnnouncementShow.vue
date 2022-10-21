<script setup>
import { useAnnouncement } from '@/composables/useAnnouncement.js'

const props = defineProps({
  item: Object,
})

const { announcement, set, remove } = useAnnouncement()

set(props.item)
</script>

<template>
  <b-list divider disabled v-if="announcement">
    <template #title>
      {{ announcement.title }}
    </template>

    <template #subtitle>
      {{ announcement.body }}
    </template>

    <template #options>
      <b-dropdown>
        <template #selector>
          <b-icon type="meatballs" />
        </template>
        <b-dropdown-item icon="bin" @click="remove">
          {{ $t('delete') }}
        </b-dropdown-item>
      </b-dropdown>
    </template>
  </b-list>
</template>
