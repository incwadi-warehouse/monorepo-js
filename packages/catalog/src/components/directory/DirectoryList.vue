<script setup>
import { useDirectory } from '@/composables/useDirectory.js'
import { onMounted, watch } from 'vue'
import DirectoryElement from './DirectoryElement.vue'

defineProps({
  id: String,
})

const emit = defineEmits([])

const { dir, elements, isLoading, listElements } = useDirectory(emit)

onMounted(listElements)

watch(dir, listElements)
</script>

<template>
  <article>
    <b-spinner size="m" v-if="isLoading" />

    <div v-if="elements != null">
      <!-- back -->
      <b-list v-if="elements.details.current.path != ''">
        <template #image>
          <span @click="dir = elements.details.parent.path">
            <b-icon type="directory" />
          </span>
        </template>
        <template #title>
          <span @click="dir = elements.details.parent.path">
            {{ $t('back') }}
          </span>
        </template>
      </b-list>

      <!-- item -->
      <DirectoryElement
        v-for="(element, index) in elements.contents"
        :key="index"
        :id="id"
        :element="element"
        @update="$emit('update')"
        @desc="$emit('desc', $event)"
      />
    </div>
  </article>
</template>
