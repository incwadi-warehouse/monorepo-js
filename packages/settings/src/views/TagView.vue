<script setup>
import { useHead } from '@unhead/vue'
import TagShow from '@/components/tag/TagShow.vue'
import TagCreate from '@/components/tag/TagCreate.vue'
import { useTag } from '@/composables/useTag.js'

defineProps({
  auth: Object,
})

useTitle({ title: 'Tags' })

const { tags } = useTag()
</script>

<template>
  <b-container size="m">
    <h1>{{ $t('tags') }}</h1>
    <p>{{ $t('tags_desc') }}</p>
  </b-container>

  <b-container size="m">
    <TagShow
      v-for="item in tags"
      :key="item.id"
      :item="item"
      :isAdmin="auth.state.me.isAdmin"
    />
  </b-container>

  <b-container size="m">
    <TagCreate />
  </b-container>
</template>
