<script setup>
import { useTitle } from '@baldeweg/ui'
import { useReservation } from '@/composables/useReservation.js'
import ReservationShow from '@/components/reservation/ReservationShow.vue'

useTitle({ title: 'Reservation' })

const { reservations, isLoading } = useReservation()
</script>

<template>
  <article>
    <b-container size="m">
      <h1>{{ $t('reservations') }}</h1>
    </b-container>

    <b-container size="m">
      <b-spinner size="l" v-if="isLoading" />
      <div v-if="reservations">
        <reservation-show
          v-for="item in reservations"
          :key="item.id"
          :reservation-id="item.id"
        />
      </div>
    </b-container>

    <b-container size="m">
      <div v-html="$tc('reservationDesc')" />
    </b-container>
  </article>
</template>
