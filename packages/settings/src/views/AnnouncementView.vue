<script setup>
import { useTitle } from '@baldeweg/ui'
import AnnouncementShow from '@/components/announcement/AnnouncementShow.vue'
import AnnouncementCreate from '@/components/announcement/AnnouncementCreate.vue'
import { useAnnouncement } from '@/composables/useAnnouncement.js'

defineProps({
  auth: Object,
})

useTitle({ title: 'Announcements' })

const { announcements } = useAnnouncement()
</script>

<template>
  <b-container size="m">
    <b-chip>Experiment</b-chip>
    <h1>{{ $t('announcements') }}</h1>
    <p>{{ $t('announcements_desc') }}</p>
  </b-container>

  <b-container size="m" v-if="auth.state.me.isAdmin">
    <h2>{{ $t('new_announcement') }}</h2>
    <AnnouncementCreate />
  </b-container>

  <b-container size="m">
    <h2>{{ $t('all_announcements') }}</h2>
    <AnnouncementShow
      v-for="item in announcements"
      :key="item.id"
      :item="item"
    />
  </b-container>
</template>
