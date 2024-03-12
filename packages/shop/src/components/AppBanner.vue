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

const contentShort = computed(() => {
  if (!branch.value || !branch.value.content) return

  return (
    DOMPurify.sanitize(marked.parse(branch.value.content), {
      ALLOWED_TAGS: [],
    }).substr(0, 90) + '...'
  )
})

const showMore = ref(false)

const toggleShowMore = () => {
  showMore.value = !showMore.value
}
</script>

<template>
  <div class="banner">
    <BContainer size="m">
      <div class="banner_inner">
        <div class="banner_message">
          <div v-html="content" v-if="showMore" />
          <p v-html="contentShort" v-else />
        </div>

        <div class="banner_more">
          <p @click.prevent="toggleShowMore">
            {{ !showMore ? $t('more') : $t('less') }}
          </p>
        </div>
      </div>
    </BContainer>
  </div>
</template>

<style scope>
.banner {
  border-top: 1px solid var(--color-primary-05);
  border-bottom: 1px solid var(--color-primary-05);
  background: var(--color-primary-10);
  color: var(--color-neutral-00);
}
.banner_inner {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
.banner_message {
  padding-right: 20px;
  flex-grow: 1;
}
.banner_more {
  border-left: 1px solid var(--color-primary-05);
  flex-shrink: 0;
  width: 80px;
  padding-left: 20px;
  text-align: right;
  cursor: pointer;
}
</style>
