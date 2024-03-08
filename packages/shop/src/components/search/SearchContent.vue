<script setup>
import { computed } from 'vue'
import { marked } from 'marked'
import DOMPurify from 'dompurify'
import { useBranch } from '@/composables/useBranch.js'

const { branch } = useBranch()

const content = computed(() => {
  if (!branch.value || !branch.value.content) return

  return DOMPurify.sanitize(marked.parse(branch.value.content), {
    ALLOWED_TAGS: [
      'p',
      'a',
      'img',
      'b',
      'strong',
      'i',
      'em',
      'ul',
      'li',
      'h1',
      'h2',
      'h3',
    ],
  })
})
</script>

<template>
  <BContainer size="m">
    <p v-html="content" />
  </BContainer>
</template>
