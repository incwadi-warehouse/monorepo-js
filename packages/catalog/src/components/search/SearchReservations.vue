<script setup>
import { onUnmounted } from 'vue'
import { useReservation } from '@/composables/useReservation.js'

const { counter, status } = useReservation()

const interval = window.setInterval(() => {
  status()
}, 5000)

onUnmounted(() => {
  window.clearInterval(interval)
})

const orders = import.meta.env.VUE_APP_ORDERS
</script>

<template>
  <b-container size="l" v-if="counter && counter.open >= 1">
    <b-alert type="error">
      <span :style="{ float: 'right' }"><b-icon type="euro" no-hover /></span>
      <a :href="orders">
        {{ $t('current_open_reservations') }}:
        {{ counter.open }}
      </a>
    </b-alert>
  </b-container>
</template>
