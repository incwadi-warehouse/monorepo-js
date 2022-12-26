<script setup>
import { useTitle } from '@baldeweg/ui'
import { useReservation } from '@/composables/useReservation.js'

useTitle({ title: 'Order' })

const { reservations, isLoading } = useReservation()

const toLocaleDateString = (data) => {
  let date = new Date(data * 1000)

  return date.toLocaleString()
}
</script>

<template>
  <BContainer size="m">
    <BChip>Experiment</BChip>
    <h1>{{ $t('orders') }}</h1>
  </BContainer>

  <BContainer size="m" v-if="isLoading">
    <BSpinner size="l" />
  </BContainer>

  <BContainer size="m" v-if="reservations">
    <BList
      v-for="item in reservations"
      :key="item.id"
      :route="{ name: 'order.detail', params: { id: item.id } }"
      divider
    >
      <template #title>
        {{ $t('order_from') }} {{ toLocaleDateString(item.createdAt) }}
        <BChip v-if="item.open">{{ $t('new') }}</BChip>
      </template>

      <template #options>
        <RouterLink :to="{ name: 'order.detail', params: { id: item.id } }">
          {{ $t('details') }}
        </RouterLink>
      </template>
    </BList>
  </BContainer>
</template>
