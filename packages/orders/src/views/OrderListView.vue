<script setup>
import { useTitle } from '@baldeweg/ui'
import { useI18n } from 'vue-i18n'
import { onMounted } from 'vue'
import { useOrder } from '@/composables/useOrder.js'

const { t } = useI18n()

useTitle({ title: t('orders') })

const { orders, isLoading, list, toLocaleDateString } = useOrder()

onMounted(list)
</script>

<template>
  <BContainer size="m">
    <h1>{{ $t('orders') }}</h1>
  </BContainer>

  <BContainer size="m" v-if="isLoading">
    <BSpinner size="l" />
  </BContainer>

  <BContainer size="m" v-if="orders">
    <BList
      v-for="item in orders"
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
