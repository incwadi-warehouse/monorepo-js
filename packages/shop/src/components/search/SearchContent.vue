<script setup>
import { computed, ref } from 'vue'
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

const messageShort = computed(() => {
  if (!branch.value || !branch.value.content) return

  return DOMPurify.sanitize(marked.parse(branch.value.content), {
    ALLOWED_TAGS: [],
  }).substr(0, 90)
})

const showMore = ref(false)

const toggleMessage = () => {
  showMore.value = !showMore.value
}
</script>

<template>
  <div class="banner">
    <BContainer size="m">
      <p v-html="content" v-if="showMore" />
      <p v-html="messageShort" v-if="!showMore" />
      <span @click.prevent="toggleMessage" v-if="!showMore" class="more"
        >More</span
      >
      <span @click.prevent="toggleMessage" v-if="showMore" class="more"
        >Less</span
      >
    </BContainer>
  </div>
</template>

<style scope>
.banner {
  background: var(--color-primary-00);
  color: var(--color-neutral-00);
}
.more {
  float: right;
  cursor: pointer;
}
</style>
