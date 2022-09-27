<script setup>
import { find } from 'lodash'
import { computed } from 'vue'

const props = defineProps({
  modelValue: String,
  items: Array,
  title: String,
  fieldKey: {
    type: String,
    default: 'key',
  },
  fieldValue: {
    type: String,
    default: 'value',
  },
})

const selectedItemName = computed(() => {
  const found = find(props.items, (el) => {
    return el[props.fieldKey] === parseInt(props.modelValue)
  })

  return found ? found[props.fieldValue] : null
})
</script>

<template>
  <b-dropdown
    position="bottom"
    v-if="items"
    :style="{
      color: 'var(--color-primary-10)',
      fontSize: '30px',
      cursor: 'pointer',
    }"
  >
    <template #selector>
      {{ title }}
      <span v-if="modelValue">({{ selectedItemName }})</span>
    </template>

    <b-dropdown-item
      v-for="item in items"
      :key="item[fieldKey]"
      :bold="modelValue && modelValue == item[fieldKey]"
      @click="$emit('update:modelValue', item[fieldKey])"
    >
      {{ item[fieldValue] }}
    </b-dropdown-item>
  </b-dropdown>
</template>
