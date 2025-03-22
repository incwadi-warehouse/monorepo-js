<script setup>
import DirectoryList from '@/components/directory/DirectoryList.vue'
import DirectoryCreate from '@/components/directory/DirectoryCreate.vue'
import DirectoryUpload from '@/components/directory/DirectoryUpload.vue'
import { useHead } from '@unhead/vue'

useHead({
  title: "Directory",
})

defineProps({
  auth: Object,
})
</script>

<template>
  <b-container size="m">
    <h1>{{ $t('directory') }}</h1>
  </b-container>

  <b-container size="m">
    <DirectoryList />
  </b-container>

  <b-container size="m">
    <DirectoryCreate />
  </b-container>

  <b-container size="m">
    <DirectoryUpload />
  </b-container>
</template>
