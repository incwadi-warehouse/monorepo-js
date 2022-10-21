<script setup>
import { useDirectory } from '@/composables/useDirectory.js'
import { ref, toRefs, watchEffect } from 'vue'

const props = defineProps({
  id: String,
  element: Object,
})

const emit = defineEmits(['desc'])

const { element } = toRefs(props)

const { dir, removeElement, editElement, uploadCover } = useDirectory(emit)

const isEditing = ref(false)

const oldName = ref(null)
const newName = ref(null)

watchEffect(() => {
  oldName.value = element.value.name
  newName.value = element.value.name
})

const edit = () => {
  editElement(oldName.value, newName.value).then(() => {
    isEditing.value = false
  })
}
</script>

<template>
  <b-list
    :disabled="element.isFile"
    image-position="start"
    actions-position="start"
  >
    <template #image>
      <span v-if="element.isDir" @click="dir = element.path">
        <b-icon type="directory" />
      </span>
      <span v-if="element.isFile">
        <b-icon type="file" no-hover />
      </span>
    </template>

    <template #title>
      <span v-if="element.isDir && !isEditing" @click="dir = element.path">
        {{ element.name }}
      </span>
      <span v-if="element.isFile && !isEditing">
        {{ element.name }} ({{ element.size }} {{ $t('bytes') }})
      </span>

      <b-form @submit.prevent="edit" v-if="isEditing">
        <b-form-group>
          <b-form-item>
            <b-form-label for="name" hidden>{{ $t('name') }}</b-form-label>
          </b-form-item>
          <b-form-item>
            <b-form-input id="name" v-model="newName" />
          </b-form-item>
        </b-form-group>
      </b-form>
    </template>

    <template #subtitle v-if="element.doc || element.preview">
      <span v-if="element.doc">{{ element.doc }}</span>
      <span v-if="element.preview"><img :src="element.preview" /></span>
    </template>

    <template #options>
      <b-dropdown position="selector">
        <template #selector>
          <b-icon type="meatballs" />
        </template>
        <b-dropdown-item @click.prevent="isEditing = true">
          {{ $t('rename') }}
        </b-dropdown-item>
        <b-dropdown-item @click.prevent="removeElement(element.name)">
          {{ $t('remove') }}
        </b-dropdown-item>
        <b-dropdown-item
          @click.prevent="uploadCover(id, element.path)"
          v-if="id && element.isFile && !element.doc"
        >
          {{ $t('use_as_cover') }}
        </b-dropdown-item>
        <b-dropdown-item
          @click.prevent="$emit('desc', element.doc)"
          v-if="id && element.isFile && element.doc"
        >
          {{ $t('use_as_desc') }}
        </b-dropdown-item>
      </b-dropdown>
    </template>
  </b-list>
</template>
