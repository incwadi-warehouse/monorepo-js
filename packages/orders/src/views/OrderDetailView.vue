<script setup>
import { useTitle } from '@baldeweg/ui'
import { useI18n } from 'vue-i18n'
import { useOrder } from '@/composables/useOrder.js'
import OrderAge from '@/components/order/OrderAge.vue'
import OrderTable from '@/components/order/OrderTable.vue'
import OrderStatus from '@/components/order/OrderStatus.vue'
import OrderCustomer from '@/components/order/OrderCustomer.vue'
import OrderDelete from '@/components/order/OrderDelete.vue'

const props = defineProps({
  id: String,
})

const { t } = useI18n()

useTitle({ title: t('order') })

const { reservation, show, update, remove, toLocaleDateString } = useOrder()

show(props.id)
</script>

<template>
  <div v-if="reservation">
    <BContainer size="m">
      <h1>
        {{ $t('order_from') }} {{ toLocaleDateString(reservation.createdAt) }}
      </h1>
      <RouterLink :to="{ name: 'index' }">{{ $t('back') }}</RouterLink>
    </BContainer>

    <OrderAge :created="reservation.createdAt" />

    <OrderTable :products="reservation.books" />

    <OrderStatus
      :open="reservation.open"
      @update:open="reservation.open = $event"
      @update="update"
    />

    <OrderCustomer
      :reservation="reservation"
      @update="update"
      @update:salutation="reservation.salutation = $event"
      @update:firstname="reservation.firstname = $event"
      @update:surname="reservation.surname = $event"
      @update:mail="reservation.mail = $event"
      @update:phone="reservation.phone = $event"
      @update:notes="reservation.notes = $event"
    />

    <OrderDelete :id="reservation.id" @remove="remove" />
  </div>
</template>
