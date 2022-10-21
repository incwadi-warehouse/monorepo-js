<script setup>
import { computed, ref } from 'vue'

const props = defineProps({
  modelValue: String,
  title: String,
})

const id = Math.random().toString(36).substr(2, 8)

const start = ref(null)
const end = ref(null)

if (props.modelValue && props.modelValue.indexOf('..') !== -1) {
  start.value = props.modelValue.split('..')[0]
  end.value = props.modelValue.split('..')[1]
}

const selectedRange = computed(() => {
  return [start.value, end.value].join('..')
})

const formattedRange = computed(() => {
  return [start.value, end.value].join(' - ')
})
</script>

<template>
  <b-dropdown position="bottom" keep-open>
    <template #selector>
      {{ title }}
      <span v-if="modelValue">({{ formattedRange }})</span>
    </template>

    <b-dropdown-item no-hover>
      <label :for="id + '-range-start'">{{ $t('range_start') }}</label>
      <b-form-input
        type="number"
        :id="id + '-range-start'"
        v-model="start"
        @input="$emit('update:modelValue', selectedRange)"
      />
    </b-dropdown-item>

    <b-dropdown-item no-hover>
      <label :for="id + '-range-end'">{{ $t('range_end') }}</label>
      <b-form-input
        type="number"
        :id="id + '-range-end'"
        v-model="end"
        @input="$emit('update:modelValue', selectedRange)"
      />
    </b-dropdown-item>
  </b-dropdown>
</template>
