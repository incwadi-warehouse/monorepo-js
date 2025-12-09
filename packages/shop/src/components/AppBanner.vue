<script setup>
import { computed, ref } from 'vue'
import { marked } from 'marked'
import DOMPurify from 'dompurify'
import { useBranch } from '@/composables/useBranch.js'

const { branch } = useBranch()

const isClosed = ref(false)

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
      's',
      'ul',
      'ol',
      'li',
      'h1',
      'h2',
      'h3',
      'h4',
      'h5',
      'h6',
      'hr',
    ],
  })
})
</script>

<template>
  <div class="banner" :class="{ isClosed }" v-if="content">
    <BContainer size="m">
      <div class="banner_inner">
        <div class="banner_message">
          <div v-html="content" />
        </div>

        <div class="banner_close">
          <p @click.prevent="isClosed = !isClosed">
            <BMaterialIcon hover size="32">close</BMaterialIcon>
          </p>
        </div>
      </div>
    </BContainer>
  </div>
</template>

<style scope>
.banner {
  border-bottom: 1px solid var(--color-primary-10);
  color: var(--color-neutral-10);
}

.banner.isClosed {
  display: none;
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

.banner_close {
  flex-shrink: 0;
  width: 40px;
  padding-left: 20px;
  text-align: right;
  cursor: pointer;
}
</style>
