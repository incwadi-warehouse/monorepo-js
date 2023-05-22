<script setup>
import { useOrder } from '@/composables/useOrder.js'

const props = defineProps({
  order: Object,
})

const { toLocaleDateString } = useOrder()

const printCustomer = () => {
  var content = document.getElementById('print_customer')
  var WinPrint = window.open(
    '',
    '',
    'left=0,top=0,width=800,height=900,toolbar=0,scrollbars=0,status=0'
  )
  WinPrint.document.write(content.innerHTML)
  WinPrint.document.close()
  WinPrint.focus()
  WinPrint.print()
  WinPrint.close()
}
</script>

<template>
  <BContainer size="m">
    <h2>{{ $t('print') }}</h2>

    <BButton design="outline" @click="printCustomer">{{ $t('print') }}</BButton>
  </BContainer>

  <div id="print_customer" :style="{ display: 'none' }">
    <h2>
      {{ $t('order_from') }} {{ toLocaleDateString(props.order.createdAt) }}
    </h2>

    <p>{{ $t('salutation') }}: {{ props.order.salutation }}</p>
    <p>{{ $t('firstname') }}: {{ props.order.firstname }}</p>
    <p>{{ $t('surname') }}: {{ props.order.surname }}</p>
    <p>{{ $t('mail') }}: {{ props.order.mail }}</p>
    <p>{{ $t('phone') }}: {{ props.order.phone }}</p>
    <p>{{ $t('notes') }}: {{ props.order.notes }}</p>
  </div>
</template>
