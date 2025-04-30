<script setup>
import { useHead } from '@unhead/vue'
import FormatShow from '@/components/format/FormatShow.vue'
import FormatCreate from '@/components/format/FormatCreate.vue'
import { useFormat } from '@/composables/useFormat.js'

useTitle({ title: 'Profile' })

defineProps({
  auth: Object,
})

const format = useFormat()
</script>

<template>
  <article>
    <b-container size="m">
      <h1>{{ $t('formats') }}</h1>
      <p>{{ $t('formats_desc') }}</p>
    </b-container>

    <b-container size="m">
      <FormatShow
        v-for="item in format.state.formats"
        :key="item.id"
        :item="item"
        :isAdmin="auth.state.me.isAdmin"
        @update="format.update"
        @remove="format.remove"
      />
    </b-container>

    <b-container size="m" v-if="auth.state.me.isAdmin">
      <FormatCreate @create="format.create" />
    </b-container>
  </article>
</template>
