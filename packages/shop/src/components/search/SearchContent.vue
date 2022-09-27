<script setup>
import { useBranch } from '@/composables/useBranch.js'
import { computed } from 'vue'
import { marked } from 'marked'
import DOMPurify from 'dompurify'

const { branch } = useBranch()

const content = computed(() => {
  if (!branch.value || !branch.value.content) return

  return DOMPurify.sanitize(marked.parse(branch.value.content), {
    ALLOWED_TAGS: ['p', 'a', 'img', 'b', 'strong', 'i', 'em', 'ul', 'li', 'h1', 'h2', 'h3'],
  })
})
</script>

<template>
  <b-container size="m"><p v-html="content" /></b-container>
</template>
