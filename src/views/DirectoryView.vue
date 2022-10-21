<script setup>
import { useTitle } from '@baldeweg/ui'
import DirectoryList from '@/components/directory/DirectoryList.vue'
import DirectoryCreate from '@/components/directory/DirectoryCreate.vue'
import DirectoryUpload from '@/components/directory/DirectoryUpload.vue'

useTitle({ title: 'Directory' })

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
