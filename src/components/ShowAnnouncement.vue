<script setup>
import { ref } from 'vue'
import { useAnnouncement } from '@/composables/useAnnouncement.js'

const { announcements } = useAnnouncement()

const isVisible = ref(true)
const showDetails = ref(false)
</script>

<template>
  <b-container size="l" highlight v-if="isVisible && announcements.length >= 1">
    <b-icon type="close" @click="isVisible = false" class="close" />

    <p class="title">
      {{ announcements[0].title }}
      <b-button
        design="text"
        @click="showDetails = !showDetails"
        v-if="!showDetails"
      >
        {{ $t('show_details') }}
      </b-button>
    </p>

    <div class="body" v-if="showDetails">
      {{ announcements[0].body }}
      <b-button design="text" @click="showDetails = !showDetails">
        {{ $t('hide_details') }}
      </b-button>
    </div>
  </b-container>
</template>

<style scoped>
.close {
  float: right;
}
.title {
  font-weight: bold;
}
.body {
  font-size: 0.8rem;
}
</style>
