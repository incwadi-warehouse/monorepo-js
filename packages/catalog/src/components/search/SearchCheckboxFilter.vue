<script setup>
import { computed, onMounted, ref } from 'vue'

const props = defineProps({
  modelValue: [String, Array],
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

const emit = defineEmits(['update:modelValue'])

const id = Math.random().toString(36).substr(2, 8)

const selectedItemName = computed(() => {
  return props.modelValue.length
})

const selected = ref([])

onMounted(() => {
  selected.value = selected.value.concat(props.modelValue)
})

const selectAll = () => {
  document
    .querySelectorAll("input[id^='" + id + "-genre-']")
    .forEach((element) => {
      element.checked = true
      selected.value.push(element.value)
      emit('update:modelValue', selected)
    })
}

const selectNone = () => {
  document
    .querySelectorAll("input[id^='" + id + "-genre-']")
    .forEach((element) => {
      element.checked = false
    })
  selected.value = []
  emit('update:modelValue', selected)
}
</script>

<template>
  <b-dropdown position="bottom" v-if="items" keep-open>
    <template #selector>
      {{ title }}
      <span v-if="modelValue && modelValue.length >= 1"
        >({{ selectedItemName }})</span
      >
    </template>

    <b-dropdown-item>
      <span @click="selectAll">{{ $t('all') }}</span>
      &bull;
      <span @click="selectNone">{{ $t('none') }}</span>
    </b-dropdown-item>

    <b-dropdown-item
      v-for="(item, index) in items"
      :key="item[fieldKey]"
      :bold="modelValue && modelValue == item[fieldKey]"
    >
      <input
        type="checkbox"
        :id="id + '-genre-' + index"
        :value="item[fieldKey]"
        v-model="selected"
        @change="$emit('update:modelValue', selected)"
      />
      <label :for="id + '-genre-' + index">{{ item[fieldValue] }}</label>
    </b-dropdown-item>
  </b-dropdown>
</template>
