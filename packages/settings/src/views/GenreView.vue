<script setup>
import { useTitle } from '@baldeweg/ui'
import GenreShow from '@/components/genre/GenreShow.vue'
import GenreCreate from '@/components/genre/GenreCreate.vue'
import { useGenre } from '@/composables/useGenre.js'

useTitle({ title: 'Genre' })

defineProps({
  auth: Object,
})

const genre = useGenre()
</script>

<template>
  <article>
    <b-container size="m">
      <h1>{{ $t('genres') }}</h1>
      <p>{{ $t('genres_desc') }}</p>
    </b-container>

    <b-container size="m">
      <GenreShow
        v-for="item in genre.state.genres"
        :key="item.id"
        :item="item"
        :isAdmin="auth.state.me.isAdmin"
        @update="genre.update"
        @remove="genre.remove"
      />
    </b-container>

    <b-container size="m" v-if="auth.state.me.isAdmin">
      <GenreCreate @create="genre.create" />
    </b-container>
  </article>
</template>
