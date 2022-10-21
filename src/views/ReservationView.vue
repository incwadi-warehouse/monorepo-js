<script setup>
import { useTitle } from '@baldeweg/ui'
import { useReservation } from '../composables/useReservation.js'
import { useCart } from '../composables/useCart.js'
import ReservationCreate from './../components/reservation/ReservationCreate.vue'
import ReservationShow from './../components/reservation/ReservationShow.vue'

useTitle({ title: 'Reservation' })

defineProps({
  auth: Object,
})

const { cart } = useCart()

const { reservations, isLoading, create, update, remove } = useReservation()
</script>

<template>
  <b-container size="m">
    <h1>{{ $t('reservation') }}</h1>
  </b-container>

  <b-container size="m">
    <h2>{{ $t('newReservation') }}</h2>
    <ReservationCreate :cart="cart" @create="create($event)" />
  </b-container>

  <b-container size="m">
    <h2>{{ $t('reservedBooks') }}</h2>

    <b-spinner size="l" v-if="isLoading" />

    <div v-if="reservations">
      <ReservationShow
        v-for="item in reservations"
        :key="item.id"
        :reservation="item"
        @update="update($event)"
        @remove="remove($event)"
      />
    </div>
  </b-container>

  <b-container size="m">
    <div v-html="$tc('reservationDesc')" />
  </b-container>
</template>
